import { DefinesMessages, SingleMessageOf } from './Messages'

export type Dispatch<T extends DefinesMessages> = (
  message: SingleMessageOf<T>
) => void
