import { Dictionary, UnionOfValues } from './types'
import { Dispatch } from './Dispatch'
import { Thunk } from './Thunk'

// All user-defined Store types must conform to this shape
export interface StoreShape extends DefinesMessages, DefinesState {}

// Creates an Object where the keys are `'messageType'`
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

/**
 * State related stuff
 */

export interface DefinesState {
  // State must be an object
  state: Dictionary
}
export type StateOf<T extends DefinesState> = T['state']

/**
 * Message related stuff
 */

export interface DefinesMessages {
  // Message types are defined as string keys in `messages`,
  // where the corresponding values are the payload types for these
  // messages.
  messages: Dictionary<Dictionary>
}

export type MessageTypesOf<T extends DefinesMessages> = keyof T['messages']

// Creates an Object where the keys are `'messageType'`
// and the values are `MessagePayload & { type: 'messageType' }`
export type AllMessagesOf<T extends DefinesMessages> = {
  [MessageType in keyof T['messages']]: T['messages'][MessageType] & {
    type: MessageType
  }
}

// Creates a Union of all messages defined on T.
export type SingleMessageOf<T extends DefinesMessages> = UnionOfValues<
  AllMessagesOf<T>
>
