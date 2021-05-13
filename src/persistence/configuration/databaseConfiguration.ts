import { SQL_FOLDER } from '../../utils/paths';
import { Reader } from './../../utils/fileReader';
import { database } from './../database';
class DatabaseConfiguration {

    async config() {
        await this.createDatabase()
        await this.createTables()
        await this.fillTables()
    }

    async createDatabase() {
        const query = "IF DB_ID('barDB') IS NULL CREATE DATABASE barDB"
        await database.executeQuery(query)
    }

    async createTables() {

        const query = await Reader.readFile(SQL_FOLDER, "configuration.sql")

        await database.executeQuery(query)

    }

    async fillTables() {

        const query = await Reader.readFile(SQL_FOLDER, "paises.sql")

        await database.executeQuery(query)

        const municipios = await Reader.readFile(SQL_FOLDER, "municipios.sql")

        await database.executeQuery(municipios)

    }



}

export const databaseConfiguration = new DatabaseConfiguration()