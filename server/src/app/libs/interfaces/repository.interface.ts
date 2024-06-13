import { Entity } from '../entities/entity';

export interface Repository<T extends Entity> {
  create(entity: T): Promise<unknown>;
  findById(entityId: T['id']): Promise<T | null>;
  updateById(entityId: T['id'], updatedFields: Partial<T>): Promise<T | null>;
  deleteById(entityId: T['id']): Promise<void>;
}
