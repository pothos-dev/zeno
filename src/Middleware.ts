import { StoreShape } from './StoreShape'
import { Dispatch } from './Dispatch'
import { DefineStoreOptions } from './StoreClass'
import { StoreReducer } from './Reducer'
import { StoreInstance } from './StoreInstance'
import { SingleMessage } from './Messages'
import { State } from './State'

export type Middleware<T extends StoreShape> = (
  storeInstance: StoreInstance<T>
) => (next: MiddlewareNext<T>) => MiddlewareNext<T>

type MiddlewareNext<T extends StoreShape> = (
  message: SingleMessage<T>
) => State<T>

export function createExecuteMiddleware<T extends StoreShape>(
  options: DefineStoreOptions<T>,
  storeInstance: StoreInstance<T>,
  reducer: StoreReducer<T>
): (action: any) => any {
  const innerNext = (action: SingleMessage<T>) => {
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
