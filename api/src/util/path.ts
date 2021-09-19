/**
 * Drops all characters in `fullPath` which appear before the first occurance of `droppable`.
 *
 * Useful for removing the beginning portion of a serverless function's `event.path`, to access potentially dynamic data appearing after.
 *
 * @param fullPath The full path, typically accessible through a function's given `event` object.
 * @param droppable An inclusive part of the path which marks the end of where a path will be dropped.
 * @returns `fullPath` with `droppable` and all characters which appeared before it dropped.
 *
 * @example
 * const path = '/my/path/to/a'
 *
 * const droppedPath = dropPath(path, '/path')
 *
 * console.log(droppedPath) // '/to/a'
 */
export const dropPath = (fullPath: string, droppable: string) => {
  const index = fullPath.indexOf(droppable)
  return index > 0
    ? fullPath.substr(index, fullPath.length).replace(droppable, '')
    : fullPath.replace(droppable, '')
}
