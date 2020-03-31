import { StoreInstance, createStoreInstance } from './StoreInstance'
import { Middleware } from './Middleware'
import { StoreInterface } from './StoreInterface'
import { StoreState } from './State'
import { MessageHandlers } from './MessageHandler'
import { DevToolsOptions } from './DevTools'

// Options passed to createStoreClass()
export interface CreateStoreClassOptions<T extends StoreInterface> {
  initialState: StoreState<T>
  messageHandlers: MessageHandlers<T>
  middleware?: Middleware<T> | Middleware<T>[]
  devToolsOptions?: DevToolsOptions<T>
}

// Defines Shape and Behaviour of a Store.
export interface StoreClass<T extends StoreInterface> {
  defaultInstance: StoreInstance<T>
  createInstance(options: {
    initialState?: StoreState<T>
    devToolsOptions?: DevToolsOptions<T>
  }): StoreInstance<T>
}

export function createStoreClass<T extends StoreInterface>(
  options: CreateStoreClassOptions<T>
): StoreClass<T> {
  return {
    defaultInstance: createStoreInstance(options),
    createInstance: ({ initialState, devToolsOptions }) =>
      createStoreInstance({
        ...options,
        initialState: initialState ?? options.initialState,
        devToolsOptions,
      }),
  }
}
