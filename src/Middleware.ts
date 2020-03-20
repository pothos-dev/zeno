import { StoreShape, StateOf, SingleMessageOf, MessageTypesOf } from './Shapes'
import { Dispatch } from './Dispatch'
import { SetupStoreOptions } from './Store'
import { StoreReducer } from './Reducer'
import { StoreInstance } from './StoreInstance'

export type Middleware<T extends StoreShape> = (
  api: MiddlewareAPI<T>
) => (next: Dispatch<T>) => (message: SingleMessageOf<T>) => any

type MiddlewareAPI<T extends StoreShape> = {
  dispatch: Dispatch<T>
  getState(): StateOf<T>
}

export function createExecuteMiddleware<T extends StoreShape>(
  options: SetupStoreOptions<T>,
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
