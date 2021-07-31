import { useCurrentAccount } from 'src/hooks/useCurrentAccount'

type CurrentAccountLayoutProps = {
  children?: React.ReactNode
}

const CurrentAccountLayout = ({ children }: CurrentAccountLayoutProps) => {
  useCurrentAccount()
  return <>{children}</>
}

export default CurrentAccountLayout
