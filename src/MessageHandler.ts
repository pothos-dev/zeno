// Creates an Object where the keys are `'messageType'`

import { StoreShape } from './StoreShape'
import { Thunk } from './Thunk'
import { MessageTypesOf, StoreMessagePayload } from './Messages'
import { StoreState } from './State'
import { StoreInstance } from './StoreInstance'

// and the values are MessageHandlers for these messages.
export type MessageHandlers<T extends StoreShape> = {
  [MessageType in keyof T['messages']]: MessageHandler<T, MessageType>
}

// A MessageHandler takes State, Payload and Dispatch and either updates the
// State in-place, or returns a new State object. It can also run side-effects
// and dispatch more messages.
export type MessageHandler<
  TStoreShape extends StoreShape,
  TMessageType extends MessageTypesOf<TStoreShape>
> = (
  state: StoreState<TStoreShape>,
  payload: StoreMessagePayload<TStoreShape, TMessageType>,
  storeInstance: StoreInstance<TStoreShape>
) => StoreState<TStoreShape> | Thunk<TStoreShape> | void
