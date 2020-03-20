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

const setupTestStore = () =>
  setupStore<MyStore>({
    initialState: {
      counter: 123,
    },
    messageHandlers: {
      increment(s, m) {
        s.counter += m.by
      },
      decrement(s, m) {
        s.counter -= m.by
      },
      double(s, m) {
        s.counter *= 2
      },
    },
  })

test('store reads initial state', () => {
  const store = setupTestStore()
  expect(store.defaultInstance.getState().counter).toBe(123)
})

test('store received message', () => {
  const store = setupTestStore()
  store.defaultInstance.dispatch({ type: 'increment', by: 1 })
  store.defaultInstance.dispatch({ type: 'decrement', by: 2 })
  expect(store.defaultInstance.getState().counter).toBe(123 + 1 - 2)
})
