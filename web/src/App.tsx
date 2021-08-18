import { RecoilRoot } from 'recoil'
import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import Routes from 'src/Routes'

import ToastProvider from 'src/components/ToastProvider'

import FatalErrorPage from 'src/pages/FatalErrorPage'

import './index.css'
import './i18n'

const App = () => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider>
        <RecoilRoot>
          <AuthProvider type="dbAuth">
            <RedwoodApolloProvider>
              <ToastProvider />
              <Routes />
            </RedwoodApolloProvider>
          </AuthProvider>
        </RecoilRoot>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
