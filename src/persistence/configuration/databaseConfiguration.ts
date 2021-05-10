import { database } from './../database';
class DatabaseConfiguration {

    async config() {
        await this.createDatabase()
        await this.createTables()
    }

    async createDatabase() {
        const query = "IF DB_ID('barDB') IS NULL CREATE DATABASE barDB"
        await database.executeQuery(query)
    }

    async createTables() {
        await database.executeQuery(`IF OBJECT_ID('TipoAlimento','U') IS NULL CREATE TABLE TipoAlimento(
            idTipoAlimento INT NOT NULL IDENTITY(1,1),
            constraint pkTipoAlimento primary key (idTipoAlimento),
            nombre varchar(200) NOT NULL
        )`)

    }



}

export const databaseConfiguration = new DatabaseConfiguration()