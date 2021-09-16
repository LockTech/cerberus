import { ExclamationIcon } from '@heroicons/react/solid'

import './UndoneNotice.css'

export type UndoneNoticeProps = {
  children: string
}

const UndoneNotice = ({ children }: UndoneNoticeProps) => {
  return (
    <div className="undoneNotice">
      <ExclamationIcon aria-hidden="true" className="icon" />
      <p className="text font-semibold">{children}</p>
      <ExclamationIcon aria-hidden="true" className="icon" />
    </div>
  )
}

export default UndoneNotice
