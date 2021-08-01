import { useQueryCurrentAccount } from 'src/hooks/useCurrentAccount'

type CurrentAccountLayoutProps = {
  children?: React.ReactNode
}

const CurrentAccountLayout = ({ children }: CurrentAccountLayoutProps) => {
  useQueryCurrentAccount()
  return <>{children}</>
}

export default CurrentAccountLayout
