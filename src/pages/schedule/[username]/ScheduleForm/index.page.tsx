import { useState } from 'react'

import CalendarStep from './CalendarStep/index.page'
import ConfirmStep from './ConfirmStep/index.page'

export default function ScheduleForm() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  function handleClearSelectedDateTime() {
    setSelectedDateTime(null)
  }

  return (
    <>
      {selectedDateTime ? (
        <ConfirmStep
          schedulingDate={selectedDateTime}
          onReturnToCalendar={handleClearSelectedDateTime}
        />
      ) : (
        <CalendarStep onSelectDateTime={setSelectedDateTime} />
      )}
    </>
  )
}
