import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@redwoodjs/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'
import './i18n'

const App = () => {
  useEffect(() => {
    // window.document.body.classList.add('dark')
  }, [])

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider>
        <AuthProvider type="dbAuth">
          <RedwoodApolloProvider>
            <Toaster position="top-right" />
            <Routes />
          </RedwoodApolloProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
