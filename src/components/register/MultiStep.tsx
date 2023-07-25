import clsx from 'clsx'

interface MultiStepProps {
  size: number
  currentStep?: number
}

export function MultiStep({ size, currentStep = 1 }: MultiStepProps) {
  return (
    <div className="px-6">
      <span className="text-xs text-zinc-200">
        Passo {currentStep} de {size}
      </span>

      <div
        className="mt-1 grid gap-2"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return (
            <div
              key={step}
              className={clsx('h-1 rounded-full bg-zinc-600', {
                'bg-gray-300': currentStep >= step,
              })}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
