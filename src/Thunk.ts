import { Dispatch } from './Dispatch'
import { StoreShape } from './StoreShape'
import { State } from './State'

export type Thunk<T extends StoreShape> = (
  dispatch: Dispatch<T>,
  getState: () => State<T>
) => void
