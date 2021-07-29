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
    logger.error(
      { err, path },
      'An error occured trying to read a file from disk.'
    )
    throw new Error('Error trying to read a file from disk.')
  }

  return res
}
