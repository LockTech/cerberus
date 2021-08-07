import { UserInputError } from '@redwoodjs/api'
import { fetch } from '../lib/fetch-client'
import { logger } from '../lib/logger'

const KetoURL = process.env.KETO_URL
const CheckURL = `${KetoURL}/check`
const DeleteURL = `${KetoURL}/relation-tuples`
const WriteURL = `${KetoURL}/relation-tuples`

// ==
export interface KetoRelationTuple {
  namespace: string
  object: string
  relation: string
  subject: string
}
//

// == C
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
//

// == R
interface CheckTupleResult {
  allowed: boolean
}
export const checkTuple = async (tuple: KetoRelationTuple) => {
  let res: CheckTupleResult

  try {
    res = await fetch.POST<CheckTupleResult>(CheckURL, tuple)
  } catch (err) {
    logger.error({ err }, 'Error writing Keto relation-tuple.')
    throw new UserInputError('keto-tuple-check')
  }

  return res.allowed
}

/**
 * @deprecated Pending implementation
 */
export const readTuple = async () => {}
//

// == U
/**
 * @deprecated Pending implementation
 */
export const patchTuple = async () => {}
//

// == D
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
    logger.error({ err }, 'Error writing Keto relation-tuple.')
    throw new UserInputError('keto-tuple-delete')
  }

  return res
}
//
