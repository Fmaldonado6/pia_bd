export interface BaseRepository<T extends any> {

    add(obj: T): Promise<void>;

    get(id: string): Promise<T | null>;

    findAll(): Promise<T[]>;

    update(obj: T): Promise<T>;

    delete(id: string): Promise<T>;

}