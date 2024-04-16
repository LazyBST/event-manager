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
                const kfHeader = event?.kfHeader;
                let header;
                if (!(0, lodash_1.isEmpty)(kfHeader)) {
                    header = JSON.stringify(kfHeader);
                    delete event?.kfHeader;
                }
                return {
                    msg: JSON.stringify(event),
                    header,
                };
            });
            const kafkaEvents = stringifiedEvents.map(({ msg, header }) => ({
                value: msg,
                header,
            }));
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
