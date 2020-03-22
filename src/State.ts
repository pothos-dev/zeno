import { StoreShape } from '.'

export type DefinesState = Pick<StoreShape, 'state'>
export type StoreState<T extends DefinesState> = T['state']
