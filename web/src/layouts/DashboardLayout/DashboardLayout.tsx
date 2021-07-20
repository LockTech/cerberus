import Appbar from 'src/components/Appbar'
import Sidebar from 'src/components/Sidebar'

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      <Appbar />
      <div className="flex flex-row h-full">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
