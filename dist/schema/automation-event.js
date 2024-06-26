"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationEventSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const constants_1 = require("../constants");
const IUserOtherDetials = typebox_1.Type.Object({
    custom: typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Object({
        valueId: typebox_1.Type.Optional(typebox_1.Type.String()),
        value: typebox_1.Type.Optional(typebox_1.Type.String()),
    })),
});
const IClusterUser = typebox_1.Type.Object({
    userType: typebox_1.Type.String(),
    phoneNumber: typebox_1.Type.String(),
    gid: typebox_1.Type.Optional(typebox_1.Type.String()),
    otherDetails: IUserOtherDetials,
});
exports.AutomationEventSchema = typebox_1.Type.Object({
    user: IClusterUser,
    trigger: typebox_1.Type.Enum(constants_1.AUTOMATION_TRIGGER),
    companyCode: typebox_1.Type.String(),
});
