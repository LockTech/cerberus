import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'
import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './css/index.css'
import './i18n'

const App = () => {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider>
        <RecoilRoot>
          <AuthProvider type="dbAuth">
            <RedwoodApolloProvider>
              <Toaster
                toastOptions={{
                  className: 'toast',
                  error: {
                    iconTheme: {
                      primary: '#fb7185',
                      secondary: '#881337',
                    },
                  },
                  loading: {
                    iconTheme: {
                      primary: '#4D4D5C',
                      secondary: '#B6B6BE',
                    },
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#064e3b',
                    },
                  },
                }}
                position="top-right"
              />
              <Routes />
            </RedwoodApolloProvider>
          </AuthProvider>
        </RecoilRoot>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
