import { PrismaClientService } from '../../prisma-client/prisma-client.service';
import { Entity } from '../entities/';
import { Repository } from '../interfaces/repository.interface';
import { EntityFactoryInterface, StorableEntityInterface } from '../interfaces';

export abstract class BasePostgresRepository<
  T extends Entity & StorableEntityInterface<ReturnType<T['toPOJO']>>,
  DocumentType = ReturnType<T['toPOJO']>
> implements Repository<T> {

  constructor(
    protected entityFactory: EntityFactoryInterface<T>,
    protected readonly dbClient: PrismaClientService,
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (! document) {
      return null;
    }

    return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
  }

  public async findById(id: T['id']): Promise<T | null> {
    throw new Error('Not implemented');
  }

  public async create(entity: T): Promise<T> {
    throw new Error('Not implemented');
  }

  public async updateById(id: T['id'], updatedFields: Partial<T>): Promise<T | null> {
    throw new Error('Not implemented');
  }

  public async deleteById(id: T['id']): Promise<void> {
    throw new Error('Not implemented');
  }

  // Support methods
  public calculateItemsPage(totalCount: number, limit: number): number {
    const postsPages = Math.ceil(totalCount / limit);
    return postsPages;
  }
}
