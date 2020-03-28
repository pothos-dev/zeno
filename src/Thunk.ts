import { Dispatch } from './Dispatch'
import { StoreInterface } from './StoreInterface'
import { StoreState } from './State'

export type Thunk<T extends StoreInterface> = (
  dispatch: Dispatch<T>,
  getState: () => StoreState<T>
) => void
