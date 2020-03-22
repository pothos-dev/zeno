import { Dictionary, UnionOfValues } from './types'
import { StoreShape } from './StoreShape'

export type DefinesMessages = Pick<StoreShape, 'messages'>

export type MessageTypesOf<T extends DefinesMessages> = keyof T['messages']

// Creates an Object where the keys are `'messageType'`
// and the values are `MessagePayload & { type: 'messageType' }`
export type AllMessages<T extends DefinesMessages> = {
  [MessageType in keyof T['messages']]: ValidMessagePayload<
    T['messages'][MessageType]
  > & {
    type: MessageType
  }
}

// Creates a Union of all messages defined on T.
export type AnyMessage<T extends DefinesMessages> = UnionOfValues<
  AllMessages<T>
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
