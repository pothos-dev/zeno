import { StoreInstance, createStoreInstance } from './StoreInstance'
import { StoreShape, StateOf } from './Shapes'

// Options passed to setupStore()
export interface SetupStoreOptions<T extends StoreShape> {
  initialState: StateOf<T>
}

// Values created by setupStore()
export interface SetupStoreResult<T extends StoreShape> {
  defaultInstance: StoreInstance<T>
}

export function setupStore<T extends StoreShape>(
  options: SetupStoreOptions<T>
): SetupStoreResult<T> {
  const defaultInstance = createStoreInstance(options)
  return { defaultInstance }
}
