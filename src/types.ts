// A Dictionary is a plain JS object with string keys
export type Dictionary<TValue = any> = Record<string, TValue>

// Given an object type, creates a union of all its values
export type UnionOfValues<TDict extends Dictionary> = {
  [Key in keyof TDict]: TDict[Key]
}[keyof TDict]
