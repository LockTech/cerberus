import { useCurrentAccount } from 'src/hooks/useCurrentAccount'

import OrganizationCreateModal from 'src/components/OrganizationCreateModal'

type CreateOrganizationLayoutProps = {
  children?: React.ReactNode
}

const CreateOrganizationLayout = ({
  children,
}: CreateOrganizationLayoutProps) => {
  const currentAccount = useCurrentAccount()

  return (
    <>
      <OrganizationCreateModal
        open={currentAccount?.organization?.id === null}
      />
      {children}
    </>
  )
}

export default CreateOrganizationLayout
