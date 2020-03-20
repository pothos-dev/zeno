import { Dispatch } from './Dispatch'
import { StoreShape, StateOf } from './Shapes'

export type Thunk<T extends StoreShape> = (
  dispatch: Dispatch<T>,
  getState: () => StateOf<T>
) => void
