import { StoreShape } from './StoreShape'
import { Dispatch } from './Dispatch'
import { DefineStoreOptions } from './StoreClass'
import { StoreReducer } from './Reducer'
import { StoreInstance } from './StoreInstance'
import { SingleMessageOf } from './Messages'
import { StateOf } from './State'

export type Middleware<T extends StoreShape> = (
  storeInstance: StoreInstance<T>
) => (next: MiddlewareNext<T>) => MiddlewareNext<T>

type MiddlewareNext<T extends StoreShape> = (
  message: SingleMessageOf<T>
) => StateOf<T>

type MiddlewareAPI<T extends StoreShape> = {
  dispatch: Dispatch<T>
  getState(): StateOf<T>
}

export function createExecuteMiddleware<T extends StoreShape>(
  options: DefineStoreOptions<T>,
  storeInstance: StoreInstance<T>,
  reducer: StoreReducer<T>
): (action: any) => any {
  const innerNext = (action: SingleMessageOf<T>) => {
    return reducer(storeInstance.getState(), action)
  }

  let middlewareChain = [innerNext]
  for (const middleware of middlewareAsList(options.middleware)) {
    const next = middlewareChain[0]
    const current = middleware(storeInstance)(next)
    middlewareChain = [current, ...middlewareChain]
  }

  return (action) => middlewareChain[0](action)
}

function middlewareAsList<T extends StoreShape>(
  middleware?: Middleware<T> | Middleware<T>[]
): Middleware<T>[] {
  if (!middleware) return []
  if (!Array.isArray(middleware)) return [middleware]
  return middleware.reverse()
}
