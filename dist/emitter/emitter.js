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
            const stringifiedEvents = events.map((event) => JSON.stringify(event));
            const kafkaEvents = stringifiedEvents.map((event) => ({
                value: event,
            }));
            await this.kafkaClient.emitEventsToTopic(kfTopic, kafkaEvents);
        }
        catch (err) {
            throw new Error(`unable to emit event :: ${err}`);
        }
    };
}
exports.Emitter = Emitter;
