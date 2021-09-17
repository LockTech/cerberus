import { useTranslation } from 'react-i18next'

import DangerCard from 'src/components/Card/DangerCard'
import OrganizationDeleteModal from 'src/components/Organization/OrganizationDeleteModal'

const OrganizationDangerCard = () => {
  const { t } = useTranslation()

  return (
    <DangerCard>
      <div className="action">
        <div className="space-y-1">
          <p className="text">{t('Organization.Danger.Card.delete.title')}</p>
          <p className="muted hint">
            {t('Organization.Danger.Card.delete.subtitle')}
          </p>
        </div>
        <OrganizationDeleteModal />
      </div>
    </DangerCard>
  )
}

export default OrganizationDangerCard
