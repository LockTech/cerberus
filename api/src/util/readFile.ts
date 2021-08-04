import { readFileSync } from 'fs'

import { logger } from 'src/lib/logger'

import { isStr } from 'src/util/asserters'

/**
 * Read a file at `path`, converting the results to a `string`.
 */
export const readFile = (path: string) => {
  if (!isStr(path)) {
    throw new Error('Invalid file path.')
  }

  let res: string

  try {
    res = readFileSync(path).toString()
  } catch (err) {
    logger.error({ err, path }, 'Error trying to read file.')
    throw new Error('Error trying to read file.')
  }

  return res
}
