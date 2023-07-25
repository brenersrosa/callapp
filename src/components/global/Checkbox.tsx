import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

interface CheckboxProps extends CheckboxRadix.CheckboxProps {
  checked?: boolean
  onChange?: () => void
}

export function Checkbox({ checked, onChange, ...rest }: CheckboxProps) {
  return (
    <CheckboxRadix.Root
      className="group focus:outline-none disabled:cursor-not-allowed"
      checked={checked}
      onCheckedChange={onChange}
      {...rest}
    >
      <div className="group-focus:ring-offset-background flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 transition-colors group-focus:ring-2 group-focus:ring-ignite-500 group-focus:ring-offset-2 group-data-[state=checked]:border-ignite-500 group-data-[state=checked]:bg-ignite-500">
        <CheckboxRadix.Indicator>
          <Check className="h-4 w-4 text-white" />
        </CheckboxRadix.Indicator>
      </div>
    </CheckboxRadix.Root>
  )
}
