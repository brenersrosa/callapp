import {
  InputHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'
import InputMask from 'react-input-mask'
import clsx from 'clsx'

interface PhoneNumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  disabled?: boolean
}

const PhoneNumberInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  PhoneNumberInputProps
> = ({ label, disabled = false, ...rest }) => {
  return (
    <div
      className={clsx('relative flex flex-col gap-2', {
        'cursor-not-allowed opacity-70': disabled === true,
      })}
    >
      {label && (
        <label className="text-sm leading-relaxed text-zinc-100">{label}</label>
      )}

      <div className="flex h-12 items-center rounded-lg border-2 border-transparent bg-zinc-900 px-4 focus-within:border-ignite-500 disabled:cursor-not-allowed">
        <InputMask
          mask="(99) 99999-9999"
          placeholder="(99) 99999-9999"
          id="phone"
          type="text"
          className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none disabled:cursor-not-allowed"
          disabled={disabled}
          {...rest}
        />
      </div>
    </div>
  )
}

export const PhoneNumberInput = forwardRef(PhoneNumberInputBase)
