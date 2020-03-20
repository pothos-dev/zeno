import { setupStore } from '../src'

type MyStore = {
  state: {
    counter: number
  }
  messages: {
    increment: { by: number }
    decrement: { by: number }
    double: {}
  }
}

test('store reads initial state', () => {
  const store = setupStore<MyStore>({
    initialState: { counter: 123 },
  })
  expect(store.defaultInstance.getState().counter).toBe(123)
})

test('store received message', () => {
  const store = setupStore<MyStore>({
    initialState: { counter: 123 },
  })
  store.defaultInstance.dispatch({ type: 'increment', by: 1 })
  store.defaultInstance.dispatch({ type: 'decrement', by: 2 })
})
