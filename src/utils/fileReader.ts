import { promises as fs } from 'fs'
import path from 'path'

export class Reader {

    static async readFile(folder: string, filename: string) {
        const dir = path.join(folder, filename)
        const text = await fs.readFile(dir)
        return text.toString()
    }
}
