import { isEmpty, isNil } from 'lodash'
import { EventType, eventTypeTopicMap } from '../constants/common'
import { getTriggersForCompany } from '../service/automation.service'
import { Emitter } from './emitter'
import { TAutomationEvent } from '../type/automation'
import { validatorFactory } from '../utils/schema-validator'
import { AutomationEventSchema } from '../schema/automation-event'
import { IEmitterConfig } from '../interface/emitter'

export class AutomationEmitter {
  private emitter: Emitter

  constructor(config: IEmitterConfig) {
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

      await this.emitter.emitEvents<TAutomationEvent>(kfTopic, [{ event }])
    } catch (err) {
      const stringifiedErr = JSON.stringify(err || 'unknown error')

      await this.emitDlqEvent(event, {
        error: stringifiedErr,
      })
    }
  }

  emitDlqEvent = async (
    event: any,
    error: Record<string, any>,
    topic?: string
  ) => {
    try {
      const kfTopic = topic || eventTypeTopicMap[EventType.AUTOMATION_DLQ_EVENT]
      if (isNil(kfTopic)) {
        throw new Error(
          'missing AUTOMATION_DLQ_TOPIC env, no sutiable kafka topic found for automation error events'
        )
      }

      await this.emitter.emitEvents(kfTopic, [{ kfHeader: error, event }])
    } catch (err: any) {
      throw new Error(err)
    }
  }

  disconnect = async () => {
    await this.emitter.disconnect()
  }
}
