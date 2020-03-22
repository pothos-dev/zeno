import { StoreInstance, createStoreInstance } from './StoreInstance'
import { Middleware } from './Middleware'
import { StoreShape } from './StoreShape'
import { StateOf } from './State'
import { MessageHandlersOf } from './MessageHandler'

// Options passed to createStoreClass()
export interface DefineStoreOptions<T extends StoreShape> {
  initialState: StateOf<T>
  messageHandlers: MessageHandlersOf<T>
  middleware?: Middleware<T> | Middleware<T>[]
}

export interface StoreClass<T extends StoreShape> {
  defaultInstance: StoreInstance<T>
  createInstance(initialState?: StateOf<T>): StoreInstance<T>
}

export function createStoreClass<T extends StoreShape>(
  options: DefineStoreOptions<T>
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
