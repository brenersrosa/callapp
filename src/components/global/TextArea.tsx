import clsx from 'clsx'
import {
  ChangeEvent,
  ForwardRefRenderFunction,
  ReactNode,
  TextareaHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import { FieldError } from 'react-hook-form'

interface MultilineInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  complement?: string
  icon?: ReactNode
  error?: FieldError
  limit?: number
  totalCharacters?: number
}

const TextAreaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  MultilineInputProps
> = (
  { label, complement, error = null, limit = 1000, totalCharacters, ...rest },
  ref,
) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {label && (
        <label className="text-sm leading-relaxed text-zinc-100">{label}</label>
      )}

      <div
        className={clsx(
          'rounded-lg border border-transparent bg-zinc-900 px-2 py-3 focus-within:border-ignite-500',
          {
            'focus-within:border-red-500': error?.message,
          },
        )}
      >
        <textarea
          className="h-full w-full resize-none rounded-lg border border-transparent bg-zinc-900 px-2 text-zinc-100 placeholder-zinc-500 focus:outline-none disabled:cursor-not-allowed"
          rows={4}
          maxLength={limit}
          ref={ref}
          {...rest}
        />

        <span className="flex flex-1 justify-end px-2 text-xs text-zinc-600">
          {totalCharacters}/{limit} caracteres
        </span>
      </div>

      <span className="text-sm leading-relaxed text-zinc-400">
        {complement}
      </span>

      {!!error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export const TextArea = forwardRef<HTMLTextAreaElement, MultilineInputProps>(
  TextAreaBase,
)
