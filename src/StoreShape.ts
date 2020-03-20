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

export type StoreState<TShape extends StoreShape> = TShape['state']
