import { DefinesMessages, SingleMessage } from './Messages'

export type Dispatch<T extends DefinesMessages> = (
  message: SingleMessage<T>
) => void
