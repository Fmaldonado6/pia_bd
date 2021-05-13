export interface BaseRepository<T extends any> {

    add(obj: T): Promise<void>;

    get(id: number): Promise<T | null>;

    findAll(): Promise<T[]>;

    update(obj: T): Promise<T>;

    delete(id: number): Promise<void>;

}