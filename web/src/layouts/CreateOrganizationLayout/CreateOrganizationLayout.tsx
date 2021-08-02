import { useCurrentAccount } from 'src/hooks/useCurrentAccount'

import CreateOrganizationModal from 'src/components/CreateOrganizationModal'

type CreateOrganizationLayoutProps = {
  children?: React.ReactNode
}

const CreateOrganizationLayout = ({
  children,
}: CreateOrganizationLayoutProps) => {
  const currentAccount = useCurrentAccount()

  return (
    <>
      <CreateOrganizationModal
        open={currentAccount?.organization?.id === null}
      />
      {children}
    </>
  )
}

export default CreateOrganizationLayout
