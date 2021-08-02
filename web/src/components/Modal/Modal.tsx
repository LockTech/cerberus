import type { ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ChildrenProps {
  children: ReactNode
}

const ModalDescription = (props: ChildrenProps) => (
  <Dialog.Description {...props} as="p" className="modal-subtitle" />
)
const ModalTitle = (props: ChildrenProps) => (
  <Dialog.Title {...props} as="h2" className="modal-title" />
)

export interface ModalProps extends ChildrenProps {
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
const Modal: ModalType = ({ children, onClose, open }: ModalProps) => {
  return (
    <Transition as={React.Fragment} show={open}>
      <Dialog className="modal" onClose={onClose}>
        <Transition.Child
          as={Dialog.Overlay}
          className="modal-overlay"
          enter="duration-150 ease-in-out transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in-out transition-opacity"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        />
        <Transition.Child
          as="div"
          className="modal-layout"
          enter="duration-200 ease-in-out origin-top transition-all transform-gpu"
          enterFrom="opacity-0 scale-75"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in-out origin-top transition-all transform-gpu"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <div className="modal-body">{children}</div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

Modal.Description = ModalDescription
Modal.Title = ModalTitle

export default Modal
