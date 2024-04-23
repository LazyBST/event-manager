import { TAutomationEvent } from '../type/automation';
import { IEmitterConfig } from '../interface/emitter';
export declare class AutomationEmitter {
    private emitter;
    constructor(config: IEmitterConfig);
    isValidEventSchema: (event: TAutomationEvent) => {
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
    emitDlqEvent: (event: any, error: Record<string, any>, topic?: string) => Promise<void>;
    disconnect: () => Promise<void>;
}
