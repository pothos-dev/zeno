import { Dispatch } from './Dispatch'
import { StoreShape } from './StoreShape'
import { StateOf } from './State'

export type Thunk<T extends StoreShape> = (
  dispatch: Dispatch<T>,
  getState: () => StateOf<T>
) => void
