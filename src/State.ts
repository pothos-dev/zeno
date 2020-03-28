import { StoreInterface } from '.'

export type DefinesState = Pick<StoreInterface, 'state'>
export type StoreState<T extends DefinesState> = T['state']
