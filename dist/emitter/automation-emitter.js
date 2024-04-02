"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationEmitter = void 0;
const lodash_1 = require("lodash");
const common_1 = require("../constants/common");
const automation_service_1 = require("../service/automation.service");
const emitter_1 = require("./emitter");
const schema_validator_1 = require("../utils/schema-validator");
const automation_event_1 = require("../schema/automation-event");
class AutomationEmitter {
    emitter;
    constructor(config) {
        this.emitter = new emitter_1.Emitter(config);
    }
    isValidEventSchema = (event) => {
        const schemaValidatory = (0, schema_validator_1.validatorFactory)(automation_event_1.AutomationEventSchema);
        return schemaValidatory.verify(event);
    };
    isValidAutomationEvent = async (event) => {
        const validatedEvent = this.isValidEventSchema(event);
        const acceptedTriggers = await (0, automation_service_1.getTriggersForCompany)(validatedEvent.companyCode);
        if (acceptedTriggers.includes(validatedEvent.trigger)) {
            return true;
        }
        return false;
    };
    emitEvent = async (event, topic) => {
        try {
            const isValid = await this.isValidAutomationEvent(event);
            if (!isValid) {
                throw new Error('invalid automation event');
            }
            const kfTopic = topic || common_1.eventTypeTopicMap[common_1.EventType.AUTOMATION_EVENT];
            if ((0, lodash_1.isNil)(kfTopic)) {
                throw new Error('missing AUTOMATION_KF_TOPIC env variable, no sutiable kafka topic found for automation events');
            }
            await this.emitter.emitEvents(kfTopic, [event]);
        }
        catch (err) {
            const kfTopic = common_1.eventTypeTopicMap[common_1.EventType.AUTOMATION_DLQ_EVENT] ||
                common_1.AUTOMATION_DLQ_DEFAULT_TOPIC;
            await this.emitter
                .emitEvents(kfTopic, [event])
                .catch((error) => {
                throw new Error(error);
            });
        }
    };
}
exports.AutomationEmitter = AutomationEmitter;
