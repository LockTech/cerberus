import { Toaster } from '@redwoodjs/web/toast'

const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        className: 'toast',
        duration: 3000,
        position: 'bottom-right',
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
  )
}

export default ToastProvider
