import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AccountInviteModal from 'src/components/Account/AccountInviteModal'
import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'
import RoleBadge from 'src/components/Role/RoleBadge'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { AccountListQuery } from 'types/graphql'

export const QUERY = gql`
  query AccountListQuery {
    accounts {
      email
      id
      lastLoginAt
      name
      verifiedAt
      roles {
        color
        id
        name
      }
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Account.List.Cell.Loading')}</p>
    </LoadingCard>
  )
}

export const Failure = ({ error }: CellFailureProps) => {
  const { et } = useErrorTranslation()

  return (
    <FailureCard>
      <p className="text">{et(error)}</p>
    </FailureCard>
  )
}

export const Success = ({ accounts }: CellSuccessProps<AccountListQuery>) => {
  const { t } = useTranslation()

  return (
    <div className="page-layout">
      <AccountInviteModal />
      <div className="list-layout">
        {accounts.map((account) => {
          const email = account.email
          const id = account.id
          const lastLogin = account.lastLoginAt
          const name = account.name
          const verifiedAt = account.verifiedAt
          const roles = account.roles

          return (
            <Link
              className="card card-interactive outline-none space-y-3 text-center"
              key={id}
              to={routes.account({ id })}
            >
              <div className="space-y-1">
                <h2 className="text title">{name}</h2>
                <p className="muted tracking-wide">{email}</p>
                <p className="muted">
                  {t('Account.List.Cell.Success.lastLogin', {
                    time: lastLogin,
                    date: lastLogin,
                  })}
                </p>
              </div>
              <div
                className={clsx(
                  'flex flex-row flex-wrap justify-center',
                  roles.length === 0 && 'hidden'
                )}
              >
                {roles.map((role) => (
                  <RoleBadge className="m-1" key={role.id} {...role} />
                ))}
              </div>
              <p className="muted hint italic">
                {t('Account.List.Cell.Success.verified', {
                  date: verifiedAt,
                })}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
