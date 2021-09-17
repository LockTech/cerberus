import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import Routes from 'src/Routes'

import ToastProvider from 'src/components/ToastProvider'

import FatalErrorPage from 'src/pages/FatalErrorPage/FatalErrorPage'
import LoadingPage from 'src/pages/LoadingPage/LoadingPage'

import './index.css'
import './i18n'

const App = () => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider>
        <Suspense fallback={<LoadingPage />}>
          <RecoilRoot>
            <ToastProvider />
            <AuthProvider type="dbAuth">
              <RedwoodApolloProvider>
                <Routes />
              </RedwoodApolloProvider>
            </AuthProvider>
          </RecoilRoot>
        </Suspense>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
