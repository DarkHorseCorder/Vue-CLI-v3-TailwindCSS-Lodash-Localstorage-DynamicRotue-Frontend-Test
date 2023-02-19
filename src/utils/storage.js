import { initial, last, get as getPath, set as setPath, omit, curry } from 'lodash'

/**
 * Retrieves a path from localStorage
 * @param {string[] | string} keys The keys of the path
 */
export const get = (keys) => getOr(keys, null)

/**
 * Retrieves a path from localStorage or returns the fallback value
 */
export const getOr = (keys, defaultTo) => {
  const path = [].concat(keys)
  const found = JSON.parse(localStorage.getItem(path[0]))
  if (path.length === 1) {
    if (found !== null) return found
    return defaultTo
  }
  return getPath(found, path.slice(1), defaultTo)
}

/**
 * Saves a nested value in localStorage.
 * The first key identifies the item in localstorage,
 * the others are used for the nested object.
 * Returns the outermost object.
 */
export const set = curry((keys, value) => {
  const path = [].concat(keys)
  // If it's saving the record just save and returns
  if (path.length === 1) {
    localStorage.setItem(path[0], JSON.stringify(value))
    return value
    // If it wants to do nesting set
  } else {
    // Get the outermost key
    const found = getOr(path[0], {})
    // Populate the inenr object
    const updated = setPath(found, path.slice(1), value)
    // Update the outermost key
    set(path[0], updated)
    return value
  }
})

/**
 * Passed a key or a path gets a value from the localStorage.
 * If the value is not present is created and then returned.
 */
export const getOrSet = (keys, value) => {
  const found = get(keys)
  if (!found) return set(keys, value)
  return found
}

/**
 * Passed a key or a path will remove the key and save the updated object
 */
export const removeKey = (keys) => {
  const path = [].concat(keys)
  if (path.length > 1) {
    // Provided the last key is the one to remove, we need the last but one
    const pathToObjectToEdit = initial(path)
    const exists = get(pathToObjectToEdit)
    if (exists) {
      const updated = omit(exists, [last(path)])
      return set(pathToObjectToEdit, updated)
    }
  } else {
    localStorage.removeItem(path[0])
  }
}