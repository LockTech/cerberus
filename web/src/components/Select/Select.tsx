import clsx from 'clsx'
import { useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Listbox, Transition } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'

import './Select.css'

export interface SelectValue {
  /**
   * An i18next `key` which a translation can be found at.
   */
  name: string
  /**
   * A unique or otherwise identifying value used to represent an individual option.
   */
  value: string
}

export interface SelectProps {
  defaultValue?: SelectValue
  /**
   * The `react-hook-form` 'name' used to identify this Select component
   * within the current `<Form>` context.
   */
  name: string
  values: SelectValue[]
}

const Select = ({ defaultValue, name, values }: SelectProps) => {
  const { t } = useTranslation()

  const {
    field: { ref: _r, ...rest },
  } = useController({ name, defaultValue })

  return (
    <Listbox as="div" className="select" {...rest}>
      <Listbox.Button className="select-trigger">
        <span>{t(rest.value?.name)}</span>
        <SelectorIcon className="icon" />
      </Listbox.Button>
      <Transition
        as={React.Fragment}
        leave="duration-200 ease-out origin-bottom sm:origin-top transform transition"
        leaveFrom="scale-100 opacity-100"
        leaveTo="opacity-0 scale-y-90"
      >
        <Listbox.Options as="div" className="select-items">
          {values.map((val, index) => (
            <Listbox.Option
              as="button"
              className={({ active, selected }) =>
                clsx(
                  'select-item',
                  active && 'select-item-active',
                  selected && 'select-item-selected'
                )
              }
              key={index}
              type="button"
              value={val}
            >
              {t(val.name)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}

export default Select
