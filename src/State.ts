import { Dictionary } from './types'

export interface DefinesState {
  // State must be an object
  state: Dictionary
}
export type StateOf<T extends DefinesState> = T['state']
