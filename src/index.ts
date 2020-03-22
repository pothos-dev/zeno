import {
  createStoreClass,
  StoreClass,
  CreateStoreClassOptions,
} from './StoreClass'
import { StoreInstance } from './StoreInstance'
import { MessageHandler } from './MessageHandler'
import { Dispatch } from './Dispatch'
import { AnyMessage, AllMessages } from './Messages'
import { Thunk } from './Thunk'
import { Middleware } from './Middleware'
import { StoreShape } from './StoreShape'
import { StoreState } from './State'

export {
  // Primary function required to use Zeno.
  createStoreClass,
  // Options passed to createStoreClass()
  CreateStoreClassOptions,
  // All user-defined Store types must conform to this shape.
  StoreShape,
  // Defines Shape and Behaviour of a Store.
  StoreClass,
  // Created from a StoreClass, holds the actual state of a Store.
  StoreInstance,
  // Extract the State type from a StoreShape.
  StoreState,
  // Union of all messages defined for a Store.
  AnyMessage,
  // Object of all messages defined for a Store.
  AllMessages,
  // Function that receives a message and updates the Store state.
  MessageHandler,
  // Function that dispatches a message to a Store.
  Dispatch,
  // Function that can be returned from a MessageHandler to perform side-effects.
  Thunk,
  // Function that can alter the behavior of a Store.
  Middleware,
}
