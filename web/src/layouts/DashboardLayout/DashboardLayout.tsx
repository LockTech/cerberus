import Appbar from 'src/components/Appbar'
import Sidebar from 'src/components/Sidebar'

import './DashboardLayout.css'

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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
