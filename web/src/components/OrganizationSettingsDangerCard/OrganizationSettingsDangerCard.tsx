import { useTranslation } from 'react-i18next'
import { ExclamationIcon } from '@heroicons/react/solid'

import './OrganizationSettingsDangerCard.css'

const OrganizationSettingsDangerCard = () => {
  const { t } = useTranslation()

  return (
    <div className="org-danger-settings">
      <header className="title-group">
        <div className="title-icon">
          <ExclamationIcon aria-hidden="true" className="icon" />
          <h2 className="title-red">
            {t('Organization.Settings.Danger.Card.title')}
          </h2>
        </div>
        <p className="hint">
          {t('Organization.Settings.Danger.Card.subtitle')}
        </p>
      </header>
      <div className="action">
        <div className="group">
          <p className="font-semibold text">
            {t('Organization.Settings.Danger.Card.delete.title')}
          </p>
          <p className="hint">
            {t('Organization.Settings.Danger.Card.delete.label')}
          </p>
        </div>
        <button className="button-red-outline form-button">
          {t('Organization.Settings.Danger.Card.delete.action')}
        </button>
      </div>
    </div>
  )
}

export default OrganizationSettingsDangerCard
