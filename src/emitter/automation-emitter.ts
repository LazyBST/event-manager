import { isNil } from 'lodash'
import {
  AUTOMATION_DLQ_DEFAULT_TOPIC,
  EventType,
  eventTypeTopicMap,
} from '../constants/common'
import { IKafkaConfig } from '../interface/kafka'
import { getTriggersForCompany } from '../service/automation.service'
import { Emitter } from './emitter'
import { TAutomationEvent } from '../type/automation'
import { validatorFactory } from '../utils/schema-validator'
import { AutomationEventSchema } from '../schema/automation-event'

export class AutomationEmitter {
  private emitter: Emitter

  constructor(config: IKafkaConfig) {
    this.emitter = new Emitter(config)
  }

  isValidEventSchema = (event: TAutomationEvent) => {
    const schemaValidatory = validatorFactory<TAutomationEvent>(
      AutomationEventSchema
    )

    return schemaValidatory.verify(event)
  }

  isValidAutomationEvent = async (
    event: TAutomationEvent
  ): Promise<boolean> => {
    const validatedEvent = this.isValidEventSchema(event)

    const acceptedTriggers = await getTriggersForCompany(
      validatedEvent.companyCode
    )
    if (acceptedTriggers.includes(validatedEvent.trigger)) {
      return true
    }

    return false
  }

  emitEvent = async (event: TAutomationEvent, topic?: string) => {
    try {
      const isValid = await this.isValidAutomationEvent(event)

      if (!isValid) {
        throw new Error('invalid automation event')
      }

      const kfTopic = topic || eventTypeTopicMap[EventType.AUTOMATION_EVENT]
      if (isNil(kfTopic)) {
        throw new Error(
          'missing AUTOMATION_KF_TOPIC env variable, no sutiable kafka topic found for automation events'
        )
      }

      await this.emitter.emitEvents<TAutomationEvent>(kfTopic, [event])
    } catch (err) {
      const kfTopic =
        eventTypeTopicMap[EventType.AUTOMATION_DLQ_EVENT] ||
        AUTOMATION_DLQ_DEFAULT_TOPIC
      await this.emitter
        .emitEvents<TAutomationEvent>(kfTopic, [event])
        .catch((error) => {
          throw new Error(error)
        })
    }
  }

  disconnect = async () => {
    await this.emitter.disconnect()
  }
}
