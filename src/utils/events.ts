import type { EventContentArg, EventInput, EventSourceInput } from '@fullcalendar/core'
import type { EventImpl } from '@fullcalendar/core/internal'

export type EventColor = 0 | 1 | 2

export type CustomEvent = {
  scheduleId?: string
  title?: string
  description?: string
  start: string
  end: string
  all: boolean
  createUser: string
  color: EventColor
}

export const customEventToFcEvent = (customEvent: CustomEvent): EventInput => {
  const res: EventInput = {
    id: customEvent.scheduleId,
    title: customEvent.title,
    start: customEvent.start,
    end: customEvent.end,
    allDay: true,
    color: eventColorToFcColor(customEvent.color)
  }
  return res
}

export const fcEventToCustomEvent = (
  fcEvent: EventImpl,
  oldCustomEvent: CustomEvent
): CustomEvent => {
  return {
    scheduleId: fcEvent.id,
    title: fcEvent.title,
    start: fcEvent.startStr,
    end: fcEvent.endStr,
    all: fcEvent.allDay,
    createUser: oldCustomEvent.createUser,
    color: oldCustomEvent.color,
    description: oldCustomEvent.description
  }
}

const eventColorToFcColor = (color: EventColor) => {
  switch (color) {
    case 0:
      return 'red'
    case 1:
      return 'green'
    case 2:
      return 'lightblue'
    default:
      return 'blue'
  }
}
