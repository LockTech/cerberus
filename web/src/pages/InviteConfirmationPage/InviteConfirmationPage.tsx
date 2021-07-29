import { useTranslation } from 'react-i18next'
import { Helmet } from '@redwoodjs/web'

const InviteConfirmationPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Invite.Confirmation.Page.Helmet.title')}</title>
      </Helmet>
    </>
  )
}

export default InviteConfirmationPage
