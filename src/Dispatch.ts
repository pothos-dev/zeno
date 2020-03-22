import { DefinesMessages, AnyMessage } from './Messages'

export type Dispatch<T extends DefinesMessages> = (
  message: AnyMessage<T>
) => void
