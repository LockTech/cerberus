import { useTranslation } from 'react-i18next'
import { QuestionMarkCircleIcon, UserCircleIcon } from '@heroicons/react/solid'

import './Appbar.css'

const Appbar = () => {
  const { t } = useTranslation()

  return (
    <div className="appbar">
      <div className="actions">
        <button>
          <abbr title={t('Appbar.actions.manual')}>
            <QuestionMarkCircleIcon
              aria-label={t('Appbar.actions.manual')}
              className="icon"
            />
          </abbr>
        </button>
        <button>
          <abbr title={t('Appbar.actions.userProfile')}>
            <UserCircleIcon
              aria-label={t('Appbar.actions.userProfile')}
              className="icon"
            />
          </abbr>
        </button>
      </div>
    </div>
  )
}

export default Appbar
