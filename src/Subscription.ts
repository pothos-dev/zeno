export type Subscriber<T> = (value: T) => void
export type Unsubscribe = () => void

export function createSubscribableState<T>(initialState: T) {
  let state = initialState
  let subscribers: Set<Subscriber<T>>

  function setState(newState: T) {
    state = newState
    subscribers.forEach((subscriber) => subscriber(newState))
  }

  function getState() {
    return state
  }

  function subscribe(subscriber: Subscriber<T>, sendImmediate?: boolean) {
    if (sendImmediate) {
      subscriber(state)
    }

    subscribers.add(subscriber)
    const unsubscribe = () => subscribers.delete(subscriber)

    return unsubscribe
  }

  return { getState, setState, subscribe }
}
