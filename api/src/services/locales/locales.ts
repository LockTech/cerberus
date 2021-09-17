import { resolve } from 'path'
import { BeforeResolverSpecType } from '@redwoodjs/api'

import { logger } from 'src/lib/logger'

import { readDir } from 'src/util/readFile'

export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.skip({ only: ['locales'] })
}

export const locales = () => {
  logger.trace({}, 'Reading available locales.')

  const directories = readDir(resolve(__dirname, '../../../locales')).split(',')

  logger.info({ directories }, 'Found locales.')

  return directories
}
