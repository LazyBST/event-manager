import { isEmpty } from 'lodash'
import { KafkaClient } from '../service/kafka.service'
import { IKafkaConfig, IKafkaEvent } from '../interface/kafka'

export class Emitter {
  private kafkaClient: KafkaClient

  constructor(config: IKafkaConfig) {
    this.kafkaClient = new KafkaClient(config)
  }

  emitEvents = async <IEvent>(
    kfTopic: string,
    events: IKafkaEvent<IEvent>[]
  ) => {
    try {
      if (isEmpty(kfTopic)) {
        throw new Error('invalid kafka topic :: ' + kfTopic)
      }

      const stringifiedEvents = events.map((event) => {
        const { event: msg, kfHeader } = event

        console.log({ msg: JSON.stringify(msg) })

        return {
          msg: JSON.stringify(msg),
          headers: kfHeader,
        }
      })
      const kafkaEvents = stringifiedEvents.map(({ msg, headers }) => ({
        value: msg,
        headers,
      }))

      console.log('kafkaEvents', kafkaEvents)

      await this.kafkaClient.emitEventsToTopic(kfTopic, [
        {
          value: '',
          headers: {
            err: '',
          },
        },
      ])
    } catch (err) {
      throw new Error(`unable to emit event :: ${err}`)
    }
  }

  disconnect = async () => {
    await this.kafkaClient.disconnect()
  }
}
