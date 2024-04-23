"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
const lodash_1 = require("lodash");
const kafka_service_1 = require("../service/kafka.service");
class Emitter {
    kafkaClient;
    constructor(config) {
        this.kafkaClient = new kafka_service_1.KafkaClient(config);
    }
    emitEvents = async (kfTopic, events) => {
        try {
            if ((0, lodash_1.isEmpty)(kfTopic)) {
                throw new Error('invalid kafka topic :: ' + kfTopic);
            }
            const stringifiedEvents = events.map((event) => {
                const { event: msg, kfHeader } = event;
                console.log({ msg: JSON.stringify(msg) });
                return {
                    msg: JSON.stringify(msg),
                    headers: kfHeader,
                };
            });
            const kafkaEvents = stringifiedEvents.map(({ msg, headers }) => ({
                value: msg,
                headers,
            }));
            console.log('kafkaEvents', kafkaEvents);
            await this.kafkaClient.emitEventsToTopic(kfTopic, kafkaEvents);
        }
        catch (err) {
            throw new Error(`unable to emit event :: ${err}`);
        }
    };
    disconnect = async () => {
        await this.kafkaClient.disconnect();
    };
}
exports.Emitter = Emitter;
