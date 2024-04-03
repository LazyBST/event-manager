import { IKafkaConfig } from '../interface/kafka';
import { TAutomationEvent } from '../type/automation';
export declare class AutomationEmitter {
    private emitter;
    constructor(config: IKafkaConfig);
    isValidEventSchema: (event: TAutomationEvent) => {
        ctx: {
            headers: {
                authToken: string;
            };
        };
        user: {
            gid?: string | undefined;
            userType: string;
            phoneNumber: string;
            otherDetails: {
                custom: {
                    [x: string]: {
                        valueId: string;
                        value: string;
                    };
                };
            };
        };
        trigger: import("..").AUTOMATION_TRIGGER;
        companyCode: string;
    };
    isValidAutomationEvent: (event: TAutomationEvent) => Promise<boolean>;
    emitEvent: (event: TAutomationEvent, topic?: string) => Promise<void>;
    disconnect: () => Promise<void>;
}
