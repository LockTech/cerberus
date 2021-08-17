import { UserInputError } from '@redwoodjs/api'

import { CheckURL, DeleteURL, WriteURL } from 'src/constants/keto'
import type { KetoRelationTuple } from 'src/constants/keto'

import { logger } from 'src/lib/logger'

import { fetch } from 'src/util/fetch'
import type { Response } from 'src/util/fetch'

/**
 * @throws
 *  * 'keto-error' - When `ok` is `false`; i.e. `status` is not in the 199 < x < 300 range
 */
export const handleKetoError = <T>({
  ok,
  res,
  status,
  statusText,
}: Response<T>): T => {
  if (!ok) {
    logger.error({ res, status, statusText }, 'Keto instance error')
    throw new UserInputError('keto-error')
  }

  return res as T
}

/**
 * @throws
 *  * 'keto-tuple-write' - When an error occurs writing the relation tuple to the configured Keto instance.
 */
export const writeTuple = async (tuple: KetoRelationTuple) => {
  let netRes: Response<KetoRelationTuple>

  try {
    netRes = await fetch.PUT<KetoRelationTuple>(WriteURL, tuple)
  } catch (err) {
    logger.error({ err }, 'Keto network error writing tuple.')
    throw new UserInputError('keto-tuple-write')
  }

  const res = handleKetoError(netRes)

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
  let netRes: Response<CheckTupleResult>

  try {
    netRes = await fetch.POST<CheckTupleResult>(CheckURL, tuple)
  } catch (err) {
    logger.error({ err }, 'Keto network error checking tuple.')
    throw new UserInputError('keto-tuple-check')
  }

  const res = handleKetoError(netRes)

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
  let netRes: Response<null>

  try {
    netRes = await fetch.DELETE(
      `${DeleteURL}?namespace=${namespace}&object=${object}&relation=${relation}&subject=${subject}`
    )
  } catch (err) {
    logger.error({ err }, 'Keto network error deleting tuple.')
    throw new UserInputError('keto-tuple-delete')
  }

  const res = handleKetoError(netRes)

  return res
}
