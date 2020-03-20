import { DefinesMessages } from './Messages'
import { DefinesState } from './State'

// All user-defined Store types must conform to this shape
export interface StoreShape extends DefinesMessages, DefinesState {}
