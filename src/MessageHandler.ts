// Creates an Object where the keys are `'messageType'`

import { StoreInterface } from './StoreInterface'
import { Thunk } from './Thunk'
import { MessageTypesOf, StoreMessagePayload } from './Messages'
import { StoreState } from './State'
import { StoreInstance } from './StoreInstance'

// and the values are MessageHandlers for these messages.
export type MessageHandlers<T extends StoreInterface> = {
  [MessageType in keyof T['messages']]: MessageHandler<T, MessageType>
}

// A MessageHandler takes State, Payload and Dispatch and either updates the
// State in-place, or returns a new State object. It can also run side-effects
// and dispatch more messages.
export type MessageHandler<
  TStoreInterface extends StoreInterface,
  TMessageType extends MessageTypesOf<TStoreInterface>
> = (
  state: StoreState<TStoreInterface>,
  payload: StoreMessagePayload<TStoreInterface, TMessageType>,
  storeInstance: StoreInstance<TStoreInterface>
) => StoreState<TStoreInterface> | Thunk<TStoreInterface> | void
