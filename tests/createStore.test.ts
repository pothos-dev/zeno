import { createStore } from '../src'

type MyStore = {
  state: {
    counter: 0
  }
  messages: {
    increment: { by: number }
    decrement: { by: number }
  }
}

test('createStore', () => {
  const store = createStore<MyStore>({
    initialState: {
      counter: 0,
    },
  })
})
