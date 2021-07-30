import { useRecoilValue } from 'recoil'

import { AppbarTitleAtom } from 'src/atoms/AppbarTitle'

import AccountMenu from 'src/components/AccountMenu'

import './Appbar.css'

const Appbar = () => {
  const title = useRecoilValue(AppbarTitleAtom)

  return (
    <div className="appbar">
      {title !== '' && typeof title === 'string' && <h2>{title}</h2>}
      <div className="actions">
        {/* <button>
          <abbr title={t('Appbar.actions.manual')}>
            <QuestionMarkCircleIcon
              aria-label={t('Appbar.actions.manual')}
              className="icon"
            />
          </abbr>
        </button> */}
        <AccountMenu />
      </div>
    </div>
  )
}

export default Appbar
