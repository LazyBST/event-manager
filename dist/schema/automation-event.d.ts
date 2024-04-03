import { AUTOMATION_TRIGGER } from '../constants';
export declare const AutomationEventSchema: import("@sinclair/typebox").TObject<{
    ctx: import("@sinclair/typebox").TObject<{
        headers: import("@sinclair/typebox").TObject<{
            authToken: import("@sinclair/typebox").TString;
        }>;
    }>;
    user: import("@sinclair/typebox").TObject<{
        userType: import("@sinclair/typebox").TString;
        phoneNumber: import("@sinclair/typebox").TString;
        gid: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        otherDetails: import("@sinclair/typebox").TObject<{
            custom: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TObject<{
                valueId: import("@sinclair/typebox").TString;
                value: import("@sinclair/typebox").TString;
            }>>;
        }>;
    }>;
    trigger: import("@sinclair/typebox").TEnum<typeof AUTOMATION_TRIGGER>;
    companyCode: import("@sinclair/typebox").TString;
}>;
