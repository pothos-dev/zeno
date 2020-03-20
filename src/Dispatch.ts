import { SingleMessageOf, DefinesMessages } from './Shapes'

export type Dispatch<T extends DefinesMessages> = (
  message: SingleMessageOf<T>
) => void
