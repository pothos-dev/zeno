import { createStoreClass } from '../src'

test('single middleware', () => {
  type Store = {
    state: { counter: number }
    messages: { ping: {} }
  }

  let messages: any[] = []
  const storeDef = createStoreClass<Store>({
    initialState: { counter: 0 },
    messageHandlers: {
      ping(s, m) {
        s.counter++
      },
    },
    middleware: (store) => (next) => (message) => {
      messages.push('in middleware')
      messages.push(store.getState())
      const nextState = next(message)
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

test('double middleware', () => {
  type Store = {
    state: { counter: number }
    messages: { ping: {} }
  }

  let messages: any[] = []
  const storeDef = createStoreClass<Store>({
    initialState: { counter: 0 },
    messageHandlers: {
      ping(s, m) {
        s.counter++
      },
    },
    middleware: [
      (store) => (next) => (message) => {
        messages.push('entry A')
        const nextState = next(message)
        messages.push('exit A')
        return nextState
      },
      (store) => (next) => (message) => {
        messages.push('entry B')
        const nextState = next(message)
        messages.push('exit B')
        return nextState
      },
    ],
  })

  storeDef.defaultInstance.dispatch({ type: 'ping' })

  expect(messages).toEqual(['entry A', 'entry B', 'exit B', 'exit A'])
})

test('logger and exception handler middleware', () => {
  type Store = {
    state: { counter: number }
    messages: { ping: {} }
  }

  let messages: any[] = []
  const storeDef = createStoreClass<Store>({
    initialState: { counter: 0 },
    messageHandlers: {
      ping(s, m) {
        throw Error('invalid operation')
      },
    },
    middleware: [
      (store) => (next) => (message) => {
        messages.push('start message ' + message.type)
        const nextState = next(message)
        messages.push('stop message ' + message.type)
        return nextState
      },
      (store) => (next) => (message) => {
        const prevState = store.getState()
        try {
          const nextState = next(message)
          return nextState
        } catch (error) {
          messages.push(error.message)
          return prevState
        }
      },
    ],
  })

  storeDef.defaultInstance.dispatch({ type: 'ping' })

  expect(messages).toEqual([
    'start message ping',
    'invalid operation',
    'stop message ping',
  ])
})
