import type { Schedule } from "./Schedule"

export type Calendar = {
    calenderId: string
    name: string
    color: number
    createUser: string
    createdAt: Date
    lastUpdateUser: string
    updatdAt: Date
    description: string
    openState: string,
    schedules: Schedule[] 
}