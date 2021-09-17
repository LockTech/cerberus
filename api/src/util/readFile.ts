import { readFileSync, readdirSync } from 'fs'

import { isStr } from 'src/util/asserters'

/**
 * @throws
 *  * 'file-path' - When `path` is not a string
 */
export const readFile = (path: string) => {
  if (!isStr(path)) throw new Error('file-path')
  return readFileSync(path).toString()
}

/**
 * @throws
 *  * 'file-path' - When `path` is not a string
 */
export const readDir = (path: string) => {
  if (!isStr(path)) throw new Error('file-path')
  return readdirSync(path).toString()
}
