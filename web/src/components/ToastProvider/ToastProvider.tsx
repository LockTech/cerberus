import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { Transition } from '@headlessui/react'
import { resolveValue, Toaster } from '@redwoodjs/web/toast'
import type { Toast } from '@redwoodjs/web/toast'

import LoadingSpinner from 'src/components/LoadingSpinner'

import './ToastProvider.css'
import { useScreenWidth } from 'src/hooks/useScreenWidth'

const ToastIcon = (type: Toast['type'], customIcon?: unknown) => {
  switch (type) {
    case 'blank':
      return null

    case 'custom':
      return customIcon

    case 'error':
      return <ExclamationCircleIcon className="toast-icon toast-error-icon" />

    case 'loading':
      return <LoadingSpinner className="toast-icon" />

    case 'success':
      return <CheckCircleIcon className="toast-icon toast-success-icon" />
  }
}

const ToastProvider = () => {
  const screenWidth = useScreenWidth()

  return (
    <Toaster
      toastOptions={{
        duration: 4000,
        position: screenWidth >= 640 ? 'top-center' : 'bottom-center',
        loading: {
          duration: 1000000,
        },
      }}
    >
      {(t) => (
        <Transition
          appear={true}
          as="div"
          className="toast"
          enter="duration-300 ease-in-out origin-bottom sm:origin-top transition transform"
          enterFrom="opacity-0 scale-90"
          enterTo="opacity-100 scale-100"
          leave="duration-300 ease-in-out origin-bottom sm:origin-top transition transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-[.8]"
          show={t.visible}
        >
          <div>{ToastIcon(t.type)}</div>
          <p className="toast-text">{resolveValue(t.message, t)}</p>
        </Transition>
      )}
    </Toaster>
  )
}

export default ToastProvider
