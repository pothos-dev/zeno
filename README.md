# Zeno

Zeno is a variant of the [Redux](https://github.com/reduxjs/redux) pattern, but is written from the ground up to make the best use of Typescripts powerful type inference capabilities.

It aims to:

- provide auto-completion
- minimize the amount of boilerplate
- without sacrificing type safety

It is also opinionated in these ways:

- include React Hooks in the library
- use [Immer](https://github.com/immerjs/immer) to allow for direct state mutation
- use different terms as the original Redux

If you're coming from Redux, here is a glossary with the terms you are familiar with:

| Redux    | Zeno           |     |
| -------- | -------------- | --- |
| Store    | Store          | ✔️  |
| State    | State          | ✔️  |
| Dispatch | Dispatch       | ✔️  |
| Action   | Message        | ❗  |
| Reducer  | MessageHandler | ❗  |

## Defining Types

Here is an example for the **Store type** of a Todo App:

```ts
type TodoItem = { id: number; text: string; done?: boolean }

type TodoStore = {
  state: {
    // List of Todos
    todos: TodoItem[]

    // The id to be assigned to the next TodoItem
    nextId: number
  }

  messages: {
    // Create a new TodoItem.
    createTodo: { text: string }

    // Change the name of an existing TodoItem.
    changeText: { id: number; newText: string }

    // Mark an existing item as done.
    markAsDone: { id: number }
  }
}
```

As you see, you define the types for the `state`, as well as the names and payloads of `messages` all in one place, without the need for any helper functions or generic types.

This is the only place where you need to mention these types, they will be inferred automatically everywhere else.

## Creating a Store

We have to differentiate between a **Store definition** and a **Store instance**.

Store definitions:

- define `state` and `messages` types (as shown above)
- defines behavior using `messageHandlers`
- include at least 1 **Store instance**, but can spawn additional instances

Store instance:

- contains the actual `state` values
- receives `messages` and executes the `messageHandlers`

In most cases, you will only ever use the singular **Store instance**, but there might be cases where different parts of your application want to manage their own copy of the state.

To create both the **Store definition**, use the `setupStore` method:

```ts
const storeDefinition = setupStore<TodoStore>({
  initialState: {
    // Start with an empty list of Todos.
    todos: [],
  },

  messageHandlers: {
    // Create a new TodoItem.
    createTodo(s, m) {
      const todo = { id: s.nextId, text: m.text }
      s.todos.push(todo)
      s.nextId++
    },

    // Change the name of an existing TodoItem.
    changeText(s, m) {
      const todo = s.todos.find((todo) => todo.id == m.id)!
      todo.text = m.newText
    },

    // Mark an existing item as done.
    markAsDone(s, m) {
      const todo = s.todos.find((todo) => todo.id == m.id)!
      todo.done = true
    },
  },
})
```

The shape of this code mirrors the Type definition we created above.

By passing the **Store type** as generic argument to `setupStore`, the compiler will autocomplete the names of the messages and provide correct type information for the state type (`s`) and the message payloads (`m`).

The **Store definition** can be destructured into these values:

```ts
const { defaultInstance } = storeDefinition
```

## Dispatching messages

A `message` must be dispatched to a specific `Store instance`:

```ts
storeInstance.dispatch({ type: 'markAsDone', id: 42 })
```

The `dispatch` function is fully typed and will autocomplete message types and their corresponding payloads.

## Reading Store state

The `state` must be read from a specific `Store instance`:

```ts
const currentState = storeInstance.getState()
```

## Side effects and async functions

The Redux pattern is synchronous - at each point in time, the `state` must be valid. This is a problem when interacting with asynchronous operations, like fetching data from the network.

The usual workaround is to define a `message` that starts an asynchronous operation, and then another message that updates the Store when the operation completes. Zeno opts to provide a simple callback to `dispatch` messages back to the store.

Zeno allows you to dispatch these messages both synchronously and asynchronously from within the `messageHandler`.

See this example:

```ts
type Store = {
  state: {
    data?: any
    lastError?: string
    fetchInProgress: boolean
  }

  messages: {
    fetch: {}
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
    fetch(s, m, dispatch) {
      // The messageHandler updates the state synchronously...
      if (s.fetchInProgress) {
        s.lastError = 'Another fetch is already in progress.'
      } else {
        s.fetchInProgress = true
        // ...and starts of an asynchronous operation,
        // which will dispatch another message when done.
        downloadDataAsync().then(({ data, error }) => {
          dispatch({ type: 'fetchFinished', data, error })
        })
      }
    },

    fetchFinished(s, m, dispatch) {
      s.fetchInProgress = false
      s.data = m.data
      // A messageHandler may also dispatch synchronously.
      // The dispatched message will be executed immediately afterwards,
      // before the views have a chance to re-render.
      dispatch({ type: 'clearError' })
    },

    clearError(s) {
      s.lastError = undefined
    },
  },
})
```

# Future Work:

- Hooks
- Context Providers
- Redux Middleware
- Error Handler
- DevTools Integration
- Slices
- Internal Messages
