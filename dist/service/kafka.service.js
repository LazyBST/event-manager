"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaClient = void 0;
const kafkajs_1 = require("kafkajs");
const lodash_1 = require("lodash");
class KafkaClient {
    kafkaClient;
    consumer = null;
    producer = null;
    constructor(config) {
        const kafka = new kafkajs_1.Kafka(config);
        this.kafkaClient = kafka;
    }
    getProducer = async () => {
        if ((0, lodash_1.isNil)(this.producer)) {
            const kafka = this.kafkaClient;
            const producer = kafka.producer();
            await producer.connect();
            this.producer = producer;
        }
        return this.producer;
    };
    initConsumer = async (topic, groupId, msgHandler) => {
        const kafka = this.kafkaClient;
        const consumer = kafka.consumer({ groupId });
        await consumer.connect();
        this.consumer = consumer;
        await consumer.subscribe({ topic });
        await consumer.run({
            eachMessage: msgHandler,
        });
    };
    emitEventsToTopic = async (topic, messages) => {
        const producer = await this.getProducer();
        await producer.send({
            topic,
            messages,
        });
    };
    disconnect = async () => {
        await this.producer?.disconnect();
        await this.consumer?.disconnect();
    };
}
exports.KafkaClient = KafkaClient;
