import { StoreInstance, createStoreInstance } from './StoreInstance'
import { Middleware } from './Middleware'
import { StoreInterface } from './StoreInterface'
import { StoreState } from './State'
import { MessageHandlers } from './MessageHandler'

// Options passed to createStoreClass()
export interface CreateStoreClassOptions<T extends StoreInterface> {
  initialState: StoreState<T>
  messageHandlers: MessageHandlers<T>
  middleware?: Middleware<T> | Middleware<T>[]
}

// Defines Shape and Behaviour of a Store.
export interface StoreClass<T extends StoreInterface> {
  defaultInstance: StoreInstance<T>
  createInstance(initialState?: StoreState<T>): StoreInstance<T>
}

export function createStoreClass<T extends StoreInterface>(
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
