import { createStoreClass } from '../src'

test('subscribe to store', () => {
  let values: number[] = []

  type Store = {
    state: { counter: number }
    messages: { add1: {} }
  }
  const { defaultInstance } = createStoreClass<Store>({
    initialState: { counter: 0 },
    messageHandlers: {
      add1(s) {
        s.counter++
      },
    },
  })

  defaultInstance.subscribe((s) => values.push(s.counter), true)

  defaultInstance.dispatch({ type: 'add1' })
  defaultInstance.dispatch({ type: 'add1' })

  expect(values).toEqual([0, 1, 2])
})
