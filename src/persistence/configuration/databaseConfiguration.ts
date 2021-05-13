import { SQL_FOLDER } from '../../utils/paths';
import { Reader } from './../../utils/fileReader';
import { database } from './../database';
class DatabaseConfiguration {

    async config() {
        await this.createTables()
        await this.fillTables()
    }

    async createDatabase() {
        try {
            const query = "IF DB_ID('barDB') IS NULL CREATE DATABASE barDB"
            await database.executeQuery(query)
        } catch (error) {
            console.error(error)
        }
    }

    async createTables() {

        const query = await Reader.readFile(SQL_FOLDER, "configuration.sql")

        await database.executeQuery(query)

    }

    async fillTables() {

        try {
            const query = await Reader.readFile(SQL_FOLDER, "paises.sql")

            await database.executeQuery(query)

            const municipios = await Reader.readFile(SQL_FOLDER, "municipios.sql")

            await database.executeQuery(municipios)

            const privilegios = await Reader.readFile(SQL_FOLDER, "privilegios.sql")

            await database.executeQuery(privilegios)

            const tipoEmpleado = await Reader.readFile(SQL_FOLDER, "tipoEmpleado.sql")

            await database.executeQuery(tipoEmpleado)
        } catch (error) {
            console.error(error)
        }
    }



}

export const databaseConfiguration = new DatabaseConfiguration()