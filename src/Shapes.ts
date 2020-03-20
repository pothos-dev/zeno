import { Dictionary, UnionOfValues } from './types'

// All user-defined Store types must conform to this shape
export interface StoreShape extends DefinesMessages, DefinesState {}

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
