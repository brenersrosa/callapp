import { ChevronLeft, ChevronRight } from 'lucide-react'

import { getWeekDays } from '@/utils/get-week-days'

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <p className="font-medium">
          Setembro <span className="text-zinc-400">2022</span>
        </p>

        <div className="flex gap-2">
          <button className="flex cursor-pointer items-center justify-center rounded-sm p-1 leading-[0] transition-colors hover:bg-zinc-700">
            <ChevronLeft className="h-5 w-5 text-zinc-200" />
          </button>

          <button className="flex cursor-pointer items-center justify-center rounded-sm p-1 leading-[0] transition-colors hover:bg-zinc-700">
            <ChevronRight className="h-5 w-5 text-zinc-200" />
          </button>
        </div>
      </div>

      <table className="mt-6 w-full table-fixed border-spacing-1">
        <thead>
          <tr className="text-sm font-medium text-zinc-400">
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>

        <tbody className="before:block before:leading-3 before:text-zinc-800 before:content-['.']">
          <tr>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              ></button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              ></button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              ></button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              ></button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                1
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                2
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                3
              </button>
            </td>
          </tr>

          <tr>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                4
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                5
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                6
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                7
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                8
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                9
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                10
              </button>
            </td>
          </tr>

          <tr>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                11
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800">
                12
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                13
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                14
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                15
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800">
                16
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                17
              </button>
            </td>
          </tr>

          <tr>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                18
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                19
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                20
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                21
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800">
                22
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800">
                23
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                24
              </button>
            </td>
          </tr>

          <tr>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                25
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                26
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                27
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800">
                28
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800">
                29
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              >
                30
              </button>
            </td>
            <td className="box-border p-[2px]">
              <button
                disabled
                className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
