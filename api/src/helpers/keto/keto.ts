import { UserInputError } from '@redwoodjs/api'

import { CheckURL, DeleteURL, WriteURL } from 'src/constants/keto'

import { fetch } from 'src/lib/fetch'
import { logger } from 'src/lib/logger'

export interface KetoRelationTuple {
  namespace: string
  object: string
  relation: string
  subject: string
}
/**
 * @throws
 *  * 'keto-tuple-write' - When an error occurs writing the relation tuple to the configured Keto instance.
 */
export const writeTuple = async (tuple: KetoRelationTuple) => {
  let res: KetoRelationTuple

  try {
    res = await fetch.PUT<KetoRelationTuple>(WriteURL, tuple)
  } catch (err) {
    logger.error({ err }, 'Error writing Keto relation-tuple.')
    throw new UserInputError('keto-tuple-write')
  }

  return res
}

interface CheckTupleResult {
  allowed: boolean
}
/**
 * @throws
 *  * 'keto-tuple-delete' - When an error occurs checking the relation tuple using the configured Keto instance.
 */
export const checkTuple = async (tuple: KetoRelationTuple) => {
  let res: CheckTupleResult

  try {
    res = await fetch.POST<CheckTupleResult>(CheckURL, tuple)
  } catch (err) {
    logger.error({ err }, 'Error checking Keto relation-tuple.')
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
  let res: null

  try {
    res = await fetch.DELETE<null>(
      `${DeleteURL}?namespace=${namespace}&object=${object}&relation=${relation}&subject=${subject}`
    )
  } catch (err) {
    logger.error({ err }, 'Error deleting Keto relation-tuple.')
    throw new UserInputError('keto-tuple-delete')
  }

  return res
}
