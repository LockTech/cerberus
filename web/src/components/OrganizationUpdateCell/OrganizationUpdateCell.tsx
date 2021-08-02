import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import type { OrganizationUpdateQuery } from 'types/graphql'

export const QUERY = gql`
  query OrganizationUpdateQuery {
    organization {
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  organization,
}: CellSuccessProps<OrganizationUpdateQuery>) => {
  return <div className="card card-body">{JSON.stringify(organization)}</div>
}
