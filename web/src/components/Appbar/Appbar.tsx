// import { useTranslation } from 'react-i18next'
import { UserCircleIcon } from '@heroicons/react/outline'

import './Appbar.css'

const Appbar = () => {
  // const { t } = useTranslation()

  return (
    <div className="appbar">
      <div className="actions">
        <button>
          <UserCircleIcon className="icon" />
        </button>
      </div>
    </div>
  )
}

export default Appbar
