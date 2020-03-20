import { Dictionary } from './types'

// All user-defined Store types must conform to this shape
export interface StoreShape {
  // State must be an object
  state: Dictionary

  // Message types are defined as string keys in `messages`,
  // where the corresponding values are the payload types for these
  // messages.
  messages: Dictionary<Dictionary>
}

// Options passed to createStore()
interface CreateStoreOptions<TStore extends StoreShape> {
  initialState: TStore['state']
}

// Values created by createStore()
interface CreateStoreResult<TStore extends StoreShape> {}

export function createStore<TStore extends StoreShape>(
  options: CreateStoreOptions<TStore>
) {
  return {}
}
