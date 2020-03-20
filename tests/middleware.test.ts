import { setupStore } from '../src'

test('single middleware', () => {
  type Store = {
    state: { counter: number }
    messages: { ping: {} }
  }

  let messages: any[] = []
  const storeDef = setupStore<Store>({
    initialState: { counter: 0 },
    messageHandlers: {
      ping(s, m) {
        s.counter++
      },
    },
    middleware: (store) => (next) => (action) => {
      messages.push('in middleware')
      messages.push(store.getState())
      const nextState = next(action)
      messages.push(nextState)
      return nextState
    },
  })

  storeDef.defaultInstance.dispatch({ type: 'ping' })
  storeDef.defaultInstance.dispatch({ type: 'ping' })

  expect(messages).toEqual([
    'in middleware',
    { counter: 0 },
    { counter: 1 },
    'in middleware',
    { counter: 1 },
    { counter: 2 },
  ])
})
