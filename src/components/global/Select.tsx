import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  ForwardRefRenderFunction,
  SelectHTMLAttributes,
  forwardRef,
  useState,
} from 'react'
import { FieldError } from 'react-hook-form'

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string
  placeholder?: string
  data: string[] | { id: string; label: string }[]
  disabled?: boolean
  error?: FieldError
  onChange?: (value: string) => void
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  {
    label,
    placeholder,
    data,
    disabled = false,
    error = null,
    onChange,
    ...rest
  },
  ref,
) => {
  const [selectedValue, setSelectedValue] = useState('')

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div
      className={clsx('flex flex-col gap-2', {
        'cursor-not-allowed opacity-70 outline-none': disabled === true,
      })}
    >
      {label && (
        <span className="text-sm leading-relaxed text-zinc-100">{label}</span>
      )}

      <SelectRadix.Root onValueChange={handleValueChange} disabled={disabled}>
        <SelectRadix.Trigger
          className={clsx(
            'flex h-12 w-full items-center justify-between rounded-lg border-2 border-transparent bg-zinc-900 px-4 placeholder-zinc-500 focus:border-ignite-500',
            {
              'cursor-not-allowed focus:outline-none': disabled === true,
            },
          )}
        >
          <SelectRadix.Value placeholder={placeholder} ref={ref} {...rest} />
          <SelectRadix.Icon>
            <ChevronDown size={24} className="text-gray-400" />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Content>
          <SelectRadix.ScrollUpButton className="flex items-center justify-center text-gray-700">
            <ChevronUp />
          </SelectRadix.ScrollUpButton>
          <SelectRadix.Viewport className="absolute rounded-lg border-2 border-zinc-600 bg-zinc-800">
            <SelectRadix.Group>
              {data.map((value, i, id) => (
                <SelectRadix.Item
                  key={`${id}-${i}`}
                  value={typeof value === 'object' ? value.label : value}
                  className="relative cursor-pointer border-2 border-transparent p-4 hover:rounded-md hover:border-ignite-500 hover:bg-zinc-900 focus:outline-none disabled:cursor-not-allowed"
                >
                  <SelectRadix.ItemText>
                    {typeof value === 'object' ? value.label : value}
                  </SelectRadix.ItemText>
                </SelectRadix.Item>
              ))}
            </SelectRadix.Group>
          </SelectRadix.Viewport>
          <SelectRadix.ScrollDownButton className="flex items-center justify-center text-gray-700">
            <ChevronDown />
          </SelectRadix.ScrollDownButton>
        </SelectRadix.Content>
      </SelectRadix.Root>

      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const Select = forwardRef(SelectBase)
