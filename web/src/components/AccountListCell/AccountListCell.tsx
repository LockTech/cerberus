import { useTranslation } from 'react-i18next'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LoadingCard from 'src/components/LoadingCard'

import type { AccountListQuery } from 'types/graphql'

import './AccountListCell.css'

export const QUERY = gql`
  query AccountListQuery {
    accounts {
      id
      name
      email
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Account.List.Cell.loading')}</p>
    </LoadingCard>
  )
}

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ accounts }: CellSuccessProps<AccountListQuery>) => {
  return (
    <div className="account-list">
      {accounts.map((account) => (
        <button className="card card-body card-interactive" key={account.id}>
          <div className="title-group">
            <h3 className="account-name text">{account.name}</h3>
            <p className="account-email hint">{account.email}</p>
          </div>
          <p className="text">
            Last seen at {new Date().toLocaleTimeString()} on{' '}
            {new Date().toLocaleDateString()}
          </p>
        </button>
      ))}
    </div>
  )
}
