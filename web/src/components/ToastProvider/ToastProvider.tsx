import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XIcon,
} from '@heroicons/react/solid'
import { Transition } from '@headlessui/react'
import { resolveValue, toast, Toaster } from '@redwoodjs/web/toast'
import type { Toast } from '@redwoodjs/web/toast'

import LoadingSpinner from 'src/components/LoadingSpinner'

const ToastIcon = (type: Toast['type'], customIcon?: unknown) => {
  switch (type) {
    case 'blank':
      return null

    case 'custom':
      return customIcon

    case 'error':
      return <ExclamationCircleIcon aria-hidden="true" />

    case 'loading':
      return <LoadingSpinner aria-hidden="true" />

    case 'success':
      return <CheckCircleIcon aria-hidden="true" />
  }
}

const ToastProvider = () => {
  const { t: translate } = useTranslation()

  return (
    <Toaster
      toastOptions={{
        duration: 3000,
        position: 'bottom-right',
        loading: {
          duration: 1000000,
        },
      }}
    >
      {(t) => {
        return (
          <Transition
            appear={true}
            as="div"
            className={clsx('toast', t.type)}
            enter="duration-300 ease-in-out origin-bottom sm:origin-right transition transform"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="duration-300 ease-in-out origin-bottom sm:origin-right transition transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-[.8]"
            show={t.visible}
          >
            <div className="toast-content">
              <div className="toast-icon">{ToastIcon(t.type)}</div>
              <p className="toast-text">{resolveValue(t.message, t)}</p>
            </div>
            <button
              aria-label={translate('Toast.close')}
              className="toast-close-button"
              onClick={() => toast.dismiss(t.id)}
            >
              <XIcon />
            </button>
          </Transition>
        )
      }}
    </Toaster>
  )
}

export default ToastProvider
