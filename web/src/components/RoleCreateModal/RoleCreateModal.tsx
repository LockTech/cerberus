import { useTranslation } from 'react-i18next'

const RoleCreateModal = () => {
  const { t } = useTranslation()

  return (
    <>
      <button className="button-primary-fill w-full">
        {t('Role.Create.Modal.createRole')}
      </button>
    </>
  )
}

export default RoleCreateModal
