export const EEvent = {
  TakeWithProduct: 'TakeWithProduct',
} as const

type EventName = (typeof EEvent)[keyof typeof EEvent]

interface EventPayload {
  userGroup?: string
  title?: string
}

export const eventAppMetrica = async (event: EventName, payload: EventPayload) => {
  console.log('[appMetrica]', event, payload)
}
