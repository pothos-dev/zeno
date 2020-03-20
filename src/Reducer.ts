// A Reducer takes some State and a Message, and returns new State.

import { StoreShape, SingleMessageOf, StateOf } from './Shapes'
import { SetupStoreOptions } from './Store'

// The Reducer must not modify the original State.
export type Reducer<TState, TMessage> = (
  state: TState,
  message: TMessage
) => TState

export function createReducer<T extends StoreShape>(
  options: SetupStoreOptions<T>
): Reducer<StateOf<T>, SingleMessageOf<T>> {
  // TODO
  return (s, m) => s
}
