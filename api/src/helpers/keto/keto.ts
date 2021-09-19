import type { AxiosError } from 'axios'
import { UserInputError } from '@redwoodjs/api'

import { CheckURL, DeleteURL, WriteURL } from 'src/constants/keto'
import type { KetoRelationTuple } from 'src/constants/keto'

import { logger } from 'src/lib/logger'

import { fetch } from 'src/util/fetch'

/**
 * @throws
 *  * 'keto-tuple-write' - When an error occurs writing the relation tuple to the configured Keto instance.
 */
export const writeTuple = async (tuple: KetoRelationTuple) => {
  logger.trace({ tuple }, 'Writing Keto relation tuple.')

  let res: KetoRelationTuple

  try {
    res = await fetch.PUT<KetoRelationTuple>(WriteURL, tuple)
  } catch (err) {
    logger.error({ err }, 'Keto error writing tuple.')
    throw new UserInputError('keto-tuple-write')
  }

  return res
}

interface CheckTupleResult {
  allowed: boolean
}
/**
 * @throws
 *  * 'keto-tuple-check' - When an error occurs checking the relation tuple using the configured Keto instance.
 */
export const checkTuple = async (tuple: KetoRelationTuple) => {
  logger.trace({ tuple }, 'Checking Keto relation tuple.')

  let res: CheckTupleResult

  try {
    res = await fetch.POST<CheckTupleResult>(CheckURL, tuple)
  } catch (err) {
    const { response } = err as AxiosError<CheckTupleResult>

    if (!response) {
      logger.error({ err }, 'Error retrieving error from Keto service.')
      throw new UserInputError('keto-tuple-check')
    }

    const { status } = response

    if (status === 403) {
      const { data } = response

      res = data
      return
    }

    logger.error({ err }, 'Keto error checking tuple.')
    throw new UserInputError('keto-tuple-check')
  }

  return res.allowed
}

/**
 * @deprecated Pending implementation
 */
export const readTuple = async () => {}

/**
 * @deprecated Pending implementation
 */
export const patchTuple = async () => {}

/**
 * @throws
 *  * 'keto-tuple-delete' - When an error occurs deleting the relation tuple from the configured Keto instance.
 */
export const deleteTuple = async ({
  namespace,
  object,
  relation,
  subject,
}: KetoRelationTuple) => {
  namespace = encodeURIComponent(namespace)
  object = encodeURIComponent(object)
  relation = encodeURIComponent(relation)
  subject = encodeURIComponent(subject)

  const url = `${DeleteURL}?namespace=${namespace}&object=${object}&relation=${relation}&subject=${subject}`

  logger.trace({ url }, 'Deleting Keto relation tuple.')

  let res: null

  try {
    res = await fetch.DELETE(url)
  } catch (err) {
    logger.error({ err }, 'Keto error deleting tuple.')
    throw new UserInputError('keto-tuple-delete')
  }

  return res
}
