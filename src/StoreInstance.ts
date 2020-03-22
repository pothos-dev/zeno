import { CreateStoreClassOptions } from './StoreClass'
import { StoreShape } from './StoreShape'
import { Dispatch } from './Dispatch'
import { createSerialMessageExecutor } from './MessageExecutor'
import { createReducer } from './Reducer'
import { createExecuteMiddleware } from './Middleware'
import { StoreState } from './State'
import { AnyMessage } from './Messages'
import {
  Subscriber,
  Unsubscribe,
  createSubscribableState,
} from './Subscription'

// A StoreInstance is the object that actually contains the state.
// There's always at least 1 instance, but more can be created
// by using the ReactContextRoot component.
export interface StoreInstance<T extends StoreShape> {
  // Reads the current State from the Store.
  getState(): StoreState<T>

  // Dispatches a Message to the Store, which will update its State.
  dispatch: Dispatch<T>

  subscribe(
    subscriber: Subscriber<StoreState<T>>,
    sendImmediate?: boolean
  ): Unsubscribe
}

export function createStoreInstance<T extends StoreShape>(
  options: CreateStoreClassOptions<T>
): StoreInstance<T> {
  const { getState, setState, subscribe } = createSubscribableState(
    options.initialState
  )

  const storeInstance = {
    getState,
    subscribe,

    // Make sure that dispatched Messages are passed one-by-one to processMessage
    dispatch: createSerialMessageExecutor(processMessage),
  }

  // The Reducer of this store needs access to the dispatch, as individual messageHandlers might want to
  // dispatch additional messages.
  const reducer = createReducer(options, storeInstance)

  // storeInstance conforms to Redux' Store type

  // Build up the chain of middlewares
  const executeMiddleware = createExecuteMiddleware(
    options,
    storeInstance,
    reducer
  )

  // There's a circular dependency here: dispatch -> processMessage -> reducer -> dispatch,
  // so the processMessage function will get hoisted

  function processMessage(message: AnyMessage<T>): void {
    const nextState = executeMiddleware(message)
    // This is where the state gets updated
    setState(nextState)
  }

  return storeInstance
}
