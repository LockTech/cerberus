import { LocaleDirectory } from 'src/constants/locales'

import { logger } from 'src/lib/logger'

import { readDir } from 'src/util/readFile'

export const locales = () => {
  logger.trace({}, 'Reading available locales.')

  const directories = readDir(LocaleDirectory).split(',')

  logger.info({ directories }, 'Found locales.')

  return directories
}
