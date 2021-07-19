import { useTranslation } from 'react-i18next'
import { Link, routes } from '@redwoodjs/router'
import { Helmet } from '@redwoodjs/web'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Home.Page.Helmet.title')}</title>
      </Helmet>
      <div className="text">
        <h1>HomePage</h1>
        <p>
          Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
        </p>
        <p>
          My default route is named <code>home</code>, link to me with `
          <Link to={routes.home()}>Home</Link>`
        </p>
      </div>
    </>
  )
}

export default HomePage
