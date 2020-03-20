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

test('cascading messages are serialized', () => {
  type CascadingMessagesStore = {
    state: { counter: 0 }
    messages: { addOneAndCascade: { level: number } }
  }

  let observed: { counter: number; level: number }[] = []
  let isActive = false

  const store = setupStore<CascadingMessagesStore>({
    initialState: { counter: 0 },
    messageHandlers: {
      addOneAndCascade(s, m, dispatch) {
        observed.push({
          counter: s.counter,
          level: m.level,
        })

        expect(isActive).toBe(false)
        isActive = true

        if (s.counter < 10) {
          dispatch({ type: 'addOneAndCascade', level: m.level + 1 })
          dispatch({ type: 'addOneAndCascade', level: m.level + 1 })
        }
        s.counter++

        isActive = false
      },
    },
  })

  store.defaultInstance.dispatch({ type: 'addOneAndCascade', level: 0 })

  expect(observed).toEqual([
    { counter: 0, level: 0 },
    { counter: 1, level: 1 },
    { counter: 2, level: 1 },
    { counter: 3, level: 2 },
    { counter: 4, level: 2 },
    { counter: 5, level: 2 },
    { counter: 6, level: 2 },
    { counter: 7, level: 3 },
    { counter: 8, level: 3 },
    { counter: 9, level: 3 },
    { counter: 10, level: 3 },
    { counter: 11, level: 3 },
    { counter: 12, level: 3 },
    { counter: 13, level: 3 },
    { counter: 14, level: 3 },
    { counter: 15, level: 4 },
    { counter: 16, level: 4 },
    { counter: 17, level: 4 },
    { counter: 18, level: 4 },
    { counter: 19, level: 4 },
    { counter: 20, level: 4 },
  ])

  // 1 ->
})
