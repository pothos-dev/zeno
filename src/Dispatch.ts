import { StoreShape } from './StoreShape'
import { Dictionary } from './types'

export type Dispatch<TShape extends StoreShape> = (
  message: SingleMessage<TShape>
) => void

export type SingleMessage<TShape extends StoreShape> = OneOf<
  StoreMessages<TShape>
>

// Creates an Object where the keys are `'messageType'`
// and the values are `MessagePayload & { type: 'messageType' }`
type StoreMessages<TShape extends StoreShape> = {
  [MessageType in keyof TShape['messages']]: TShape['messages'][MessageType] & {
    type: MessageType
  }
}

type OneOf<TDict extends Dictionary> = {
  [Key in keyof TDict]: TDict[Key]
}[keyof TDict]
