import { Dispatch } from './Dispatch'
import { StoreShape } from './StoreShape'
import { StoreState } from './State'

export type Thunk<T extends StoreShape> = (
  dispatch: Dispatch<T>,
  getState: () => StoreState<T>
) => void
