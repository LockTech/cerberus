import { useTranslation } from 'react-i18next'
import { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import AccountDangerCard from 'src/components/Account/AccountDangerCard'
import AccountUpdateCard from 'src/components/Account/AccountUpdateCard'
import AccountRoleCell from 'src/components/Account/AccountRoleCell'
import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'

import type { AccountDetailQuery } from 'types/graphql'

import './AccountDetailCell.css'

export const QUERY = gql`
  query AccountDetailQuery($id: ID!) {
    account(id: $id) {
      email
      id
      name
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Account.Detail.Cell.Loading')}</p>
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

export const Success = ({ account }: CellSuccessProps<AccountDetailQuery>) => {
  return (
    <div className="page-layout">
      <AccountUpdateCard account={account} />
      <AccountRoleCell id={account.id} />
      <AccountDangerCard account={account} />
    </div>
  )
}
