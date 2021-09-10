import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ChildrenProps {
  children: ReactNode
}

const ModalDescription = (props: ChildrenProps) => (
  <Dialog.Description {...props} as="p" className="muted hint" />
)
const ModalTitle = (props: ChildrenProps) => (
  <Dialog.Title {...props} as="h2" className="font-semibold text text-2xl" />
)

export interface ModalProps extends ChildrenProps {
  initialFocus?: React.MutableRefObject<HTMLElement>
  onClose: (open: boolean) => void
  open: boolean
}

type ModalComponent = (props: ModalProps) => JSX.Element
type ModalType = ModalComponent & {
  Description: typeof ModalDescription
  Title: typeof ModalTitle
}

/**
 * Stylistic wrapper around HeadlessUI's `Dialog` component. Provides:
 * * `Transitions`
 * * `Dialog.Overlay` functionality
 * * `Dialog.Description` and `Dialog.Title` wrappers (`Modal.` respectively)
 */
const Modal: ModalType = ({
  children,
  initialFocus,
  onClose,
  open,
}: ModalProps) => {
  useEffect(() => {
    if (open) {
      window.scrollTo({ top: 0 })
    }
  }, [open])

  return (
    <Transition as={React.Fragment} show={open}>
      <Dialog
        className="modal"
        initialFocus={initialFocus}
        onClose={onClose}
        open={open}
      >
        <Transition.Child
          as={Dialog.Overlay}
          className="modal-overlay"
          enter="duration-200 ease-in-out transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in-out transition-opacity"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        />
        <div className="modal-wrapper">
          <Transition.Child
            as={React.Fragment}
            enter="duration-200 ease-in-out origin-center transition-all transform-gpu"
            enterFrom="opacity-0 scale-75"
            enterTo="opacity-100 scale-100"
            leave="duration-200 ease-in-out origin-center transition-all transform-gpu"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

Modal.Description = ModalDescription
Modal.Title = ModalTitle

export default Modal
