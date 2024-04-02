"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
const kafka_service_1 = require("../service/kafka.service");
class Subscriber {
    kafkaClient;
    constructor(config) {
        this.kafkaClient = new kafka_service_1.KafkaClient(config);
    }
    start = async (topic, groupId, msgHandler) => {
        await this.kafkaClient.initConsumer(topic, groupId, msgHandler);
    };
    disconnect = async () => {
        await this.kafkaClient.disconnect();
    };
}
exports.Subscriber = Subscriber;
