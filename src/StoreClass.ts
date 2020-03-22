import { StoreInstance, createStoreInstance } from './StoreInstance'
import { Middleware } from './Middleware'
import { StoreShape } from './StoreShape'
import { StoreState } from './State'
import { MessageHandlers } from './MessageHandler'

// Options passed to createStoreClass()
export interface CreateStoreClassOptions<T extends StoreShape> {
  initialState: StoreState<T>
  messageHandlers: MessageHandlers<T>
  middleware?: Middleware<T> | Middleware<T>[]
}

// Defines Shape and Behaviour of a Store.
export interface StoreClass<T extends StoreShape> {
  defaultInstance: StoreInstance<T>
  createInstance(initialState?: StoreState<T>): StoreInstance<T>
}

export function createStoreClass<T extends StoreShape>(
  options: CreateStoreClassOptions<T>
): StoreClass<T> {
  return {
    defaultInstance: createStoreInstance(options),
    createInstance: (initialState) =>
      createStoreInstance({
        ...options,
        initialState: initialState ?? options.initialState,
      }),
  }
}
