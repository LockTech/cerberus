import { navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/hooks/useAuth'

import Appbar from 'src/components/App/Appbar'
import Sidebar from 'src/components/Sidebar'

import './DashboardLayout.css'

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { organization } = useAuth().currentUser

  if (organization === null) {
    navigate(routes.signupOrganization())
  }

  return (
    <>
      <div className="layout">
        <Sidebar />
        <section className="content">
          <Appbar />
          <main>{children}</main>
        </section>
      </div>
    </>
  )
}

export default DashboardLayout
