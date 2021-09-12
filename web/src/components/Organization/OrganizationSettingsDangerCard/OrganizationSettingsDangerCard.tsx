import { useTranslation } from 'react-i18next'

import DangerCard from 'src/components/Card/DangerCard'

const OrganizationSettingsDangerCard = () => {
  const { t } = useTranslation()

  return (
    <DangerCard>
      <div className="action">
        <div className="space-y-1">
          <p className="text">
            {t('Organization.Settings.Danger.Card.delete.title')}
          </p>
          <p className="muted hint">
            {t('Organization.Settings.Danger.Card.delete.subtitle')}
          </p>
        </div>
        <button className="btn btn-red-ghost">
          {t('Organization.Settings.Danger.Card.delete.action')}
        </button>
      </div>
    </DangerCard>
  )
}

export default OrganizationSettingsDangerCard
