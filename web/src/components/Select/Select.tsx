import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useController } from 'react-hook-form'
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
  const [hSelected, setHSelected] = useState<string>(defaultValue.value)

  const {
    field: { ref: _r, value: fSelected, onChange: setFSelected, ...rest },
  } = useController({ name, defaultValue })

  const onChange = useCallback(
    (changeVal: string) => {
      setHSelected(changeVal)
      setFSelected(values.find((v) => v.value === changeVal))
    },
    [setFSelected, setHSelected, values]
  )

  return (
    <Listbox
      as="div"
      className="select"
      onChange={onChange}
      value={hSelected}
      {...rest}
    >
      <Listbox.Button className="select-trigger">
        <span>{fSelected?.name}</span>
        <SelectorIcon className="icon" />
      </Listbox.Button>
      <Transition
        as={React.Fragment}
        leave="duration-200 ease-out origin-bottom sm:origin-top transform transition"
        leaveFrom="scale-100 opacity-100"
        leaveTo="opacity-0 scale-y-90"
      >
        <Listbox.Options as="div" className="select-items">
          {values.map(({ name, value }) => {
            return (
              <Listbox.Option
                as="button"
                className={({ active, selected }) =>
                  clsx(
                    'select-item',
                    active && 'select-item-active',
                    selected && 'select-item-selected'
                  )
                }
                key={value}
                type="button"
                value={value}
              >
                {name}
              </Listbox.Option>
            )
          })}
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}

export default Select
