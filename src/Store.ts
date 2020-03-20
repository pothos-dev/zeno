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

// Values created by defineStore()
export interface DefineStoreResult<T extends StoreShape> {
  defaultInstance: StoreInstance<T>
}

export function defineStore<T extends StoreShape>(
  options: DefineStoreOptions<T>
): DefineStoreResult<T> {
  const defaultInstance = createStoreInstance(options)
  return { defaultInstance }
}
