import clsx from 'clsx'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Listbox } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'

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

  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ onChange, value }) => (
        <Listbox as="div" className="select" onChange={onChange} value={value}>
          <Listbox.Button className="select-button">
            <span>{t(value?.name)}</span>
            <SelectorIcon className="icon" />
          </Listbox.Button>
          <Listbox.Options className="select-items">
            {values.map((val, index) => (
              <Listbox.Option key={index} value={val}>
                {({ active, selected }) => (
                  <button
                    className={clsx(
                      'select-item',
                      active && 'active',
                      selected && 'selected'
                    )}
                  >
                    {t(val.name)}
                  </button>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      )}
    />
  )
}

export default Select
