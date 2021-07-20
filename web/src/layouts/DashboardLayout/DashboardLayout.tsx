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
        <div className="flex flex-col w-full">
          <Appbar />
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
