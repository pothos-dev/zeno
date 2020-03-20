import { StoreInstance, createStoreInstance } from './StoreInstance'
import { Middleware } from './Middleware'
import { StoreShape } from './StoreShape'
import { StateOf } from './State'
import { MessageHandlersOf } from './MessageHandler'

// Options passed to defineStore()
export interface DefineStoreOptions<T extends StoreShape> {
  initialState: StateOf<T>
  messageHandlers: MessageHandlersOf<T>
  middleware?: Middleware<T> | Middleware<T>[]
}

export interface StoreDefinition<T extends StoreShape> {
  defaultInstance: StoreInstance<T>
  createInstance(): StoreInstance<T>
}

export function defineStore<T extends StoreShape>(
  options: DefineStoreOptions<T>
): StoreDefinition<T> {
  return {
    defaultInstance: createStoreInstance(options),
    createInstance: () => createStoreInstance(options),
  }
}
