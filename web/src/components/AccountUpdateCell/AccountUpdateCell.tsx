import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import type { AccountUpdateQuery } from 'types/graphql'

export const QUERY = gql`
  query AccountUpdateQuery($id: ID!) {
    account(id: $id) {
      id
      name
      email
      lastLoginAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ account }: CellSuccessProps<AccountUpdateQuery>) => {
  return <div>{JSON.stringify(account)}</div>
}
