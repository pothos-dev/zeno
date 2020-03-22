import { Dictionary, UnionOfValues } from './types'
import { StoreShape } from './StoreShape'

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
  [MessageType in keyof T['messages']]: ValidMessagePayload<
    T['messages'][MessageType]
  > & {
    type: MessageType
  }
}

// Creates a Union of all messages defined on T.
export type SingleMessageOf<T extends DefinesMessages> = UnionOfValues<
  AllMessagesOf<T>
>

// Prevent a MessagePayload from containing the property `type`, as this is
// a reserved word.
export type ValidMessagePayload<TMessagePayload> = TMessagePayload extends {
  type: any
}
  ? unknown
  : TMessagePayload

// Gets the payload for a specific store and message type.
export type StoreMessagePayload<
  TStoreShape extends StoreShape,
  TMessageType extends keyof TStoreShape['messages']
> = ValidMessagePayload<TStoreShape['messages'][TMessageType]>
