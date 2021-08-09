import { useAuth } from '@redwoodjs/auth'

import OrganizationCreateModal from 'src/components/OrganizationCreateModal'

type CreateOrganizationLayoutProps = {
  children?: React.ReactNode
}

const CreateOrganizationLayout = ({
  children,
}: CreateOrganizationLayoutProps) => {
  const { currentUser } = useAuth()

  return (
    <>
      <OrganizationCreateModal open={currentUser?.organizationId === null} />
      {children}
    </>
  )
}

export default CreateOrganizationLayout
