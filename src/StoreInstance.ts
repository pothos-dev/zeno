import { StoreShape, SetupStoreOptions } from './Store'

// A StoreInstance is the object that actually contains the state.
// There's always at least 1 instance, but more can be created
// by using the ReactContextRoot component.
export interface StoreInstance<TShape extends StoreShape> {
  getState(): TShape['state']
}

export function createStoreInstance<TShape extends StoreShape>(
  options: SetupStoreOptions<TShape>
): StoreInstance<TShape> {
  // Reads the current State from the underlying Redux store(?)
  function getState(): TShape['state'] {
    // TODO
    return options.initialState
  }

  return {
    getState,
  }
}
