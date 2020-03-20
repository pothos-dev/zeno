import { SetupStoreOptions } from './Store'
import { StoreShape, StateOf, SingleMessageOf } from './Shapes'
import { Dispatch } from './Dispatch'
import { createSerialMessageExecutor } from './MessageExecutor'

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

  // Executes a message by updating the state.
  function processMessage(message: SingleMessageOf<T>): void {
    // TODO
  }

  // Make sure that dispatched Messages are passed one-by-one to processMessage
  const dispatch = createSerialMessageExecutor(processMessage)

  function getState(): StateOf<T> {
    return currentValue
  }

  return { getState, dispatch }
}
