import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import type { AccountListQuery } from 'types/graphql'

import './AccountListCell.css'

export const QUERY = gql`
  query AccountListQuery {
    accounts {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ accounts }: CellSuccessProps<AccountListQuery>) => {
  return (
    <div className="account-list">
      {accounts.map((account) => (
        <div className="card card-body" key={account.id}>
          <p className="text">{account.name}</p>
        </div>
      ))}
    </div>
  )
}
