import { UserCircleIcon } from '@heroicons/react/solid'
import './Appbar.css'

const Appbar = () => {
  return (
    <div className="appbar">
      <button>
        <UserCircleIcon className="appbar-icon" />
      </button>
    </div>
  )
}

export default Appbar
