import { StoreInstance, createStoreInstance } from './StoreInstance'
import { StoreShape, StateOf, MessageHandlersOf } from './Shapes'
import { Middleware } from './Middleware'

// Options passed to setupStore()
export interface SetupStoreOptions<T extends StoreShape> {
  initialState: StateOf<T>
  messageHandlers: MessageHandlersOf<T>
  middleware?: Middleware<T> | Middleware<T>[]
}

// Values created by setupStore()
export interface SetupStoreResult<T extends StoreShape> {
  defaultInstance: StoreInstance<T>
}

export function setupStore<T extends StoreShape>(
  options: SetupStoreOptions<T>
): SetupStoreResult<T> {
  const defaultInstance = createStoreInstance(options)
  return { defaultInstance }
}
