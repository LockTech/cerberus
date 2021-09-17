import { TrashIcon } from '@heroicons/react/outline'

export type DeleteModalTitleProps = {
  children: React.ReactNode
}

const DeleteModalTitle = ({ children }: DeleteModalTitleProps) => {
  return (
    <div className="flex flex-row items-center space-x-4 sm:space-x-6">
      <div
        aria-hidden="true"
        className="flex-shrink-0 text-red-600 dark:text-red-400 h-10 w-10"
      >
        <TrashIcon />
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

export default DeleteModalTitle
