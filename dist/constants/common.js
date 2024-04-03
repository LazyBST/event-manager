"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventTypeTopicMap = exports.EventType = exports.AUTOMATION_DLQ_DEFAULT_TOPIC = void 0;
exports.AUTOMATION_DLQ_DEFAULT_TOPIC = 'automation.events.dlq';
const AUTOMATION_KF_TOPIC = process.env.AUTOMATION_KF_TOPIC;
const AUTOMATION_DLQ_TOPIC = process.env.AUTOMATION_KF_TOPIC;
var EventType;
(function (EventType) {
    EventType["AUTOMATION_EVENT"] = "AUTOMATION_EVENT";
    EventType["AUTOMATION_DLQ_EVENT"] = "AUTOMATION_DLQ_EVENT";
})(EventType || (exports.EventType = EventType = {}));
exports.eventTypeTopicMap = {
    [EventType.AUTOMATION_EVENT.toString()]: AUTOMATION_KF_TOPIC,
    [EventType.AUTOMATION_DLQ_EVENT.toString()]: AUTOMATION_DLQ_TOPIC || exports.AUTOMATION_DLQ_DEFAULT_TOPIC,
};
