import { StoreInstance, createStoreInstance } from './StoreInstance'
import { StoreShape, StoreState } from './StoreShape'

// Options passed to setupStore()
export interface SetupStoreOptions<TShape extends StoreShape> {
  initialState: StoreState<TShape>
}

// Values created by setupStore()
export interface SetupStoreResult<TShape extends StoreShape> {
  defaultInstance: StoreInstance<TShape>
}

export function setupStore<TShape extends StoreShape>(
  options: SetupStoreOptions<TShape>
): SetupStoreResult<TShape> {
  const defaultInstance = createStoreInstance(options)

  return {
    defaultInstance,
  }
}
