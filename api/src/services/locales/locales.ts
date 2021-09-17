import { BeforeResolverSpecType } from '@redwoodjs/api'

import { logger } from 'src/lib/logger'

import { readDir } from 'src/util/readFile'

import { validateAuth } from 'src/validators/auth'
import { LocaleDirectory } from 'src/constants/locales'

export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(validateAuth)
}

export const locales = () => {
  logger.trace({}, 'Reading available locales.')

  const directories = readDir(LocaleDirectory).split(',')

  logger.info({ directories }, 'Found locales.')

  return directories
}
