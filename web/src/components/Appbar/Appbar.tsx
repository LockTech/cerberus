import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { UserCircleIcon } from '@heroicons/react/solid'

import { AppbarTitleAtom } from 'src/atoms/AppbarTitleAtom'

import './Appbar.css'

const Appbar = () => {
  const { t } = useTranslation()

  const title = useRecoilValue(AppbarTitleAtom)

  return (
    <div className="appbar">
      {title !== '' && <h2>{title}</h2>}
      <div className="actions">
        {/* <button>
          <abbr title={t('Appbar.actions.manual')}>
            <QuestionMarkCircleIcon
              aria-label={t('Appbar.actions.manual')}
              className="icon"
            />
          </abbr>
        </button> */}
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
