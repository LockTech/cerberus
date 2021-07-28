import BrandBanner from 'src/components/BrandBanner'

import './AuthLayout.css'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth-layout">
      <BrandBanner />
      {children}
    </div>
  )
}

export default AuthLayout
