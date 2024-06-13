import { StorableEntityInterface } from './storable-entity.interface';

export interface EntityFactoryInterface<T extends StorableEntityInterface<ReturnType<T['toPOJO']>>> {
  create(entityPlainData: ReturnType<T['toPOJO']>): T
}
