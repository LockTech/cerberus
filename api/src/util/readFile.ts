import { readFileSync } from 'fs'

import { isStr } from 'src/util/asserters'

/**
 * @throws
 *  * 'file-path' - When `path` is not a string
 *  * 'file-read' - When reading the file at `path` and converting it to a `string` fails.
 */
export const readFile = (path: string) => {
  if (!isStr(path)) {
    throw new Error('file-path')
  }

  let res: string

  try {
    res = readFileSync(path).toString()
  } catch (err) {
    throw new Error('file-read')
  }

  return res
}
