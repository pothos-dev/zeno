import immer from 'immer'
import { StoreShape, SingleMessageOf, StateOf } from './Shapes'
import { SetupStoreOptions } from './Store'
import { Dispatch } from './Dispatch'

// A Reducer takes some State and a Message, and returns new State.
// The Reducer must not modify the original State.
export type Reducer<TState, TMessage> = (
  state: TState,
  message: TMessage
) => TState

export function createReducer<T extends StoreShape>(
  options: SetupStoreOptions<T>,
  dispatch: Dispatch<T>
): Reducer<StateOf<T>, SingleMessageOf<T>> {
  return (prevState, message) => {
    // Extract message type and payload from the message
    const { type, ...payload } = message

    // Find the messageHandler for that message type
    const messageHandler = options.messageHandlers[type]

    // Reducer must not mutate prevState, so pass it to immer to allow for mutation
    const nextState = immer(prevState, (draft) => {
      // Pass the draft into the messageHandler, which might mutate it.
      // Unfortunately, TypeScript does not realize that the payload is valid here.
      return messageHandler(draft, payload as any, dispatch)
    })

    return nextState
  }
}
