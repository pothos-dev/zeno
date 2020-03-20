import { Dictionary } from './types'
import { StoreInstance, createStoreInstance } from './StoreInstance'

// All user-defined Store types must conform to this shape
export interface StoreShape {
  // State must be an object
  state: Dictionary

  // Message types are defined as string keys in `messages`,
  // where the corresponding values are the payload types for these
  // messages.
  messages: Dictionary<Dictionary>
}

// Options passed to setupStore()
export interface SetupStoreOptions<TShape extends StoreShape> {
  initialState: TShape['state']
}

// Values created by setupStore()
export interface SetupStoreResult<TShape extends StoreShape> {
  defaultInstance: StoreInstance<TShape>
}

export function setupStore<TShape extends StoreShape>(
  options: SetupStoreOptions<TShape>
): SetupStoreResult<TShape> {
  const defaultInstance = createStoreInstance(options)

  return {
    defaultInstance,
  }
}
