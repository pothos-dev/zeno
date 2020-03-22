import { StoreShape } from './StoreShape'
import { DefineStoreOptions } from './StoreClass'
import { StoreReducer } from './Reducer'
import { StoreInstance } from './StoreInstance'
import { AnyMessage } from './Messages'
import { StoreState } from './State'

export type Middleware<T extends StoreShape> = (
  storeInstance: StoreInstance<T>
) => (next: MiddlewareNext<T>) => MiddlewareNext<T>

type MiddlewareNext<T extends StoreShape> = (
  message: AnyMessage<T>
) => StoreState<T>

export function createExecuteMiddleware<T extends StoreShape>(
  options: DefineStoreOptions<T>,
  storeInstance: StoreInstance<T>,
  reducer: StoreReducer<T>
): (action: any) => any {
  const innerNext = (action: AnyMessage<T>) => {
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
