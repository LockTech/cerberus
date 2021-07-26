import { context, ValidationError } from '@redwoodjs/api'

import { getContextUser } from 'src/lib/context'
import { logger } from 'src/lib/logger'

import { isStr } from 'src/util/asserters'

export const validateCurrentUser = (name: string) => {
  if (!context.currentUser) {
    logger.warn(`[${name}]: Could not validate current user.`)
    throw new ValidationError('authentication')
  }
}

export const validateAccountOrganization = (name: string) => {
  const currentAccount = getContextUser()

  const organizationId = currentAccount?.organizationId || undefined

  if (!isStr(organizationId)) {
    logger.warn(`[${name}]: Could not validate organization exist.`)
    throw new ValidationError('exist.organizationId')
  }

  // add validation for organization existing in DB
}

export const validateAccountId = (name: string) => {
  const currentAccount = getContextUser()

  const id = currentAccount?.id || undefined

  if (!isStr(id)) {
    logger.warn(`[${name}]: Could not validate current user has an ID.`)
    throw new ValidationError('exist.accountid')
  }
}

export const validateAccountName = (name: string) => {
  const currentAccount = getContextUser()

  const firstName = currentAccount?.firstName || undefined
  const lastName = currentAccount?.lastName || undefined

  if (!isStr(firstName) || !isStr(lastName)) {
    logger.warn(
      `[${name}]: Could not validate current user has a first and last name.`
    )
    throw new ValidationError('exit.accountName')
  }
}
