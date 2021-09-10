import { ExclamationIcon } from '@heroicons/react/solid'

export type UndoneNoticeProps = {
  children: string
}

const UndoneNotice = ({ children }: UndoneNoticeProps) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-3">
      <ExclamationIcon
        aria-disabled="true"
        className="text-yellow-600 dark:text-yellow-300 h-6 w-6"
      />
      <p className="text font-semibold">{children}</p>
      <ExclamationIcon
        aria-disabled="true"
        className="text-yellow-600 dark:text-yellow-300 h-6 w-6"
      />
    </div>
  )
}

export default UndoneNotice
