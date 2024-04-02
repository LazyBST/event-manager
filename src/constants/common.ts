export const AUTOMATION_DLQ_DEFAULT_TOPIC = 'automation.events.dlq'

const AUTOMATION_KF_TOPIC = process.env.AUTOMATION_KF_TOPIC
const AUTOMATION_DLQ_TOPIC = process.env.AUTOMATION_KF_TOPIC

export enum EventType {
  AUTOMATION_EVENT = 'AUTOMATION_EVENT',
  AUTOMATION_DLQ_EVENT = 'AUTOMATION_DLQ_EVENT',
}

export const eventTypeTopicMap = {
  [EventType.AUTOMATION_EVENT.toString()]: AUTOMATION_KF_TOPIC,
  [EventType.AUTOMATION_DLQ_EVENT.toString()]:
    AUTOMATION_DLQ_TOPIC || AUTOMATION_DLQ_DEFAULT_TOPIC,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum AUTOMATION_TRIGGER {
  'app-cp-created' = 'app-cp-created',
  'dashboard-cp-created' = 'dashboard-cp-created',
  'app-cp-edited' = 'app-cp-edited',
  'dashboard-cp-edited' = 'dashboard-cp-edited',
}
