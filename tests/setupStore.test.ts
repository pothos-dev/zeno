import { setupStore } from '../src'

type MyStore = {
  state: {
    counter: number
  }
  messages: {
    increment: { by: number }
    decrement: { by: number }
  }
}

test('setupStore', () => {
  const store = setupStore<MyStore>({
    initialState: {
      counter: 123,
    },
  })

  expect(store.defaultInstance.getState().counter).toBe(123)
})
