import { SetupStoreOptions } from './Store'
import { StoreShape, StateOf, SingleMessageOf } from './Shapes'
import { Dispatch } from './Dispatch'
import { createSerialMessageExecutor } from './MessageExecutor'
import { createReducer } from './Reducer'
import { createExecuteMiddleware } from './Middleware'

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
  let currentState = options.initialState
  const getState = () => currentState

  // Make sure that dispatched Messages are passed one-by-one to processMessage
  const dispatch = createSerialMessageExecutor(processMessage)

  // The Reducer of this store needs access to the dispatch, as individual messageHandlers might want to
  // dispatch additional messages.
  const reducer = createReducer(options, dispatch)

  // storeInstance conforms to Redux' Store type
  const storeInstance = { getState, dispatch }

  // Build up the chain of middlewares
  const executeMiddleware = createExecuteMiddleware(
    options,
    storeInstance,
    reducer
  )

  // There's a circular dependency here: dispatch -> processMessage -> reducer -> dispatch,
  // so the processMessage function will get hoisted

  // Executes a Message by running it through the reducer, thereby updating the State.
  function processMessage(message: SingleMessageOf<T>): void {
    const nextState = executeMiddleware(message)
    currentState = nextState
  }

  return storeInstance
}
