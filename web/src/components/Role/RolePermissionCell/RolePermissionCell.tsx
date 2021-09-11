import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import type { RolePermissionQuery } from 'types/graphql'

export const QUERY = gql`
  query RolePermissionQuery {
    permissions {
      application
      id
      namespace
      object
      relation
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  permissions,
}: CellSuccessProps<RolePermissionQuery>) => {
  return <div>{JSON.stringify(permissions)}</div>
}
