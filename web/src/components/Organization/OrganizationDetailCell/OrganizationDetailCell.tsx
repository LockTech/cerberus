import { useTranslation } from 'react-i18next'
import { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'
import OrganizationDangerCard from 'src/components/Organization/OrganizationDangerCard'
import OrganizationUpdateCard from 'src/components/Organization/OrganizationUpdateCard'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { OrganizationDetailQuery } from 'types/graphql'

export const QUERY = gql`
  query OrganizationDetailQuery {
    organization {
      name
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Organization.Detail.Cell.Loading')}</p>
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

export const Success = ({
  organization,
}: CellSuccessProps<OrganizationDetailQuery>) => {
  return (
    <div className="page-layout">
      <OrganizationUpdateCard organization={organization} />
      <OrganizationDangerCard />
    </div>
  )
}
