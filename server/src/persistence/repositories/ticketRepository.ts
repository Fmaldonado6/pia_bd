import { Ticket } from '../../models/models';
import { BaseRepository } from './baseRepository';
class TicketRepository implements BaseRepository<Ticket>{
    add(obj: Ticket): Promise<Ticket> {
        throw new Error('Method not implemented.');
    }
    get(id: number): Promise<Ticket | null> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Ticket[]> {
        throw new Error('Method not implemented.');
    }
    update(obj: Ticket): Promise<Ticket> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

}