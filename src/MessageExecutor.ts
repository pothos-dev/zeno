export interface MessageExecutor<T> {
  (message: T): void
}

// A SerialMessageExecutor receives messages of type T and passes them one by one into
// some other MessageExecutor.
//
// If another message is added while the execution is still active, the message will
// be stored temporarily, and then executed once the previous execution has finished.
//
// If no execution is active, the message will be executed immediately on receive.
export type SerialMessageExecutor<T> = MessageExecutor<T>

export function createSerialMessageExecutor<T>(
  executor: MessageExecutor<T>
): SerialMessageExecutor<T> {
  let queue: T[] = []
  let active = false

  return function(message: T) {
    // If execution is currently active, add the message to the back of the queue
    if (active) {
      queue.push(message)
      return
    }

    // Otherwise, start execution with this message.
    active = true

    try {
      // Once active, we will process messages in the queue until it is empty, before becoming inactive again
      let nextMessage: T | undefined = message
      while (nextMessage) {
        executor(nextMessage)
        // take messages from the front of the queue - first in, first out
        nextMessage = queue.shift()
      }
    } catch (error) {
      // Rethrow errors
      throw error
    } finally {
      // But make sure that exceptions in the executor won't break the MessageQueue
      active = false
    }
  }
}
