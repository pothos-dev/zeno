import { SetupStoreOptions } from './Store'
import { StoreShape, StateOf, SingleMessageOf } from './Shapes'
import { Dispatch } from './Dispatch'
import { createSerialMessageExecutor } from './MessageExecutor'
import { createReducer } from './Reducer'

// A StoreInstance is the object that actually contains the state.
// There's always at least 1 instance, but more can be created
// by using the ReactContextRoot component.
export interface StoreInstance<T extends StoreShape> {
  // Reads the current State from the Store.
  getState(): StateOf<T>

  // Dispatches a Message to the Store, which will update its State.
  dispatch: Dispatch<T>
}

export function createStoreInstance<T extends StoreShape>(
  options: SetupStoreOptions<T>
): StoreInstance<T> {
  let currentValue = options.initialState

  // There's a circular dependency here: dispatch -> processMessage -> reducer -> dispatch

  // Make sure that dispatched Messages are passed one-by-one to processMessage
  const dispatch = createSerialMessageExecutor(processMessage)

  // The Reducer of this store needs access to the dispatch, as individual messageHandlers might want to
  // dispatch additional messages.
  const reducer = createReducer(options, dispatch)

  // Executes a Message by running it through the reducer, thereby updating the State.
  function processMessage(message: SingleMessageOf<T>): void {
    currentValue = reducer(currentValue, message)
  }

  function getState(): StateOf<T> {
    return currentValue
  }

  return { getState, dispatch }
}
