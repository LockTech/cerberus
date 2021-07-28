import { readFileSync } from 'fs'

import { isStr } from 'src/util/asserters'

/**
 * Read a file at `path`, converting the results to a `string`.
 */
export const readFile = (path: string) => {
  if (!isStr(path)) {
    throw new Error('Invalid file path.')
  }

  return readFileSync(path).toString()
}
