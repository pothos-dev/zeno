// Creates an Object where the keys are `'messageType'`

import { StoreShape } from './StoreShape'
import { Dispatch } from './Dispatch'
import { Thunk } from './Thunk'
import { MessageTypesOf } from './Messages'
import { StateOf } from './State'

// and the values are MessageHandlers for these messages.
export type MessageHandlersOf<T extends StoreShape> = {
  [MessageType in keyof T['messages']]: MessageHandlerOf<T, MessageType>
}

// A MessageHandler takes State, Payload and Dispatch and either updates the
// State in-place, or returns a new State object. It can also run side-effects
// and dispatch more messages.
export type MessageHandlerOf<
  TStoreShape extends StoreShape,
  TMessageType extends MessageTypesOf<TStoreShape>
> = (
  state: StateOf<TStoreShape>,
  payload: TStoreShape['messages'][TMessageType],
  dispatch: Dispatch<TStoreShape>
) => StateOf<TStoreShape> | Thunk<TStoreShape> | void
