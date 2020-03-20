import { SetupStoreOptions } from './Store'
import { StoreState, StoreShape } from './StoreShape'

// A StoreInstance is the object that actually contains the state.
// There's always at least 1 instance, but more can be created
// by using the ReactContextRoot component.
export interface StoreInstance<TShape extends StoreShape> {
  getState(): StoreState<TShape>
}

export function createStoreInstance<TShape extends StoreShape>(
  options: SetupStoreOptions<TShape>
): StoreInstance<TShape> {
  // Reads the current State from the underlying Redux store(?)
  function getState(): StoreState<TShape> {
    // TODO
    return options.initialState
  }

  return {
    getState,
  }
}
