import { setupStore } from '../src'

test('async and sync dispatch', async (done) => {
  const store = storeDefinition.defaultInstance

  expect(store.getState().fetchInProgress).toBe(false)
  expect(store.getState().lastError).toBe(undefined)

  store.dispatch({ type: 'fetch', fail: true })
  expect(store.getState().fetchInProgress).toBe(true)
  expect(store.getState().lastError).toBe(undefined)

  store.dispatch({ type: 'fetch', fail: false })
  expect(store.getState().fetchInProgress).toBe(true)
  expect(store.getState().lastError).toBe(
    'Another fetch is already in progress.'
  )

  await delay(150)
  expect(store.getState().fetchInProgress).toBe(false)
  expect(store.getState().lastError).toBe('download failed')

  store.dispatch({ type: 'fetch', fail: false })
  expect(store.getState().fetchInProgress).toBe(true)
  expect(store.getState().lastError).toBe('download failed')

  await delay(150)
  expect(store.getState().fetchInProgress).toBe(false)
  expect(store.getState().lastError).toBe(undefined)
  expect(store.getState().data).toBe(123)

  done()
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const downloadDataAsync = async (fail: boolean) => {
  await delay(100)
  if (fail) return { error: 'download failed' }
  else return { data: 123 }
}

type Store = {
  state: {
    data?: any
    lastError?: string
    fetchInProgress: boolean
  }

  messages: {
    fetch: { fail: boolean }
    fetchFinished: { data?: any; error?: string }
    clearError: {}
  }
}

const storeDefinition = setupStore<Store>({
  initialState: {
    fetchInProgress: false,
  },

  messageHandlers: {
    // The third parameter in any messageHandler
    // is the dispatch function of the current Store instance.
    fetch(s, m) {
      // The messageHandler updates the state synchronously...
      if (s.fetchInProgress) {
        s.lastError = 'Another fetch is already in progress.'
      } else {
        s.fetchInProgress = true
        // ...and starts of an asynchronous operation,
        // which will dispatch another message when done.
        return async (dispatch) => {
          const { data, error } = await downloadDataAsync(m.fail)
          dispatch({ type: 'fetchFinished', data, error })
        }
      }
    },

    fetchFinished(s, m, { dispatch }) {
      s.data = m.data
      s.fetchInProgress = false

      if (m.error) {
        s.lastError = m.error
      } else {
        // A messageHandler may also dispatch synchronously.
        // The dispatched message will be executed immediately afterwards,
        // before the views have a chance to re-render.
        dispatch({ type: 'clearError' })
      }
    },

    clearError(s) {
      s.lastError = undefined
    },
  },
})
