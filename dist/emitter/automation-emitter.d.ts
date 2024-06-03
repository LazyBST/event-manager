import { TAutomationEvent } from '../type/automation';
import { IEmitterConfig } from '../interface/emitter';
export declare class AutomationEmitter {
    private emitter;
    constructor(config: IEmitterConfig);
    validateEventSchema: (event: TAutomationEvent) => {
        user: {
            gid?: string | undefined;
            userType: string;
            phoneNumber: string;
            otherDetails: {
                custom: {
                    [x: string]: {
                        valueId?: string | undefined;
                        value?: string | undefined;
                    };
                };
            };
        };
        trigger: import("..").AUTOMATION_TRIGGER;
        companyCode: string;
    };
    isValidAutomationEvent: (event: TAutomationEvent) => Promise<boolean>;
    emitEvent: (event: TAutomationEvent, topic?: string) => Promise<void>;
    emitDlqEvent: (event: any, error: Record<string, string>, topic?: string) => Promise<void>;
    disconnect: () => Promise<void>;
}
