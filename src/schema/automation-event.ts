import { Type } from '@sinclair/typebox'
import { AUTOMATION_TRIGGER } from '../constants'

const IUserOtherDetials = Type.Object({
  custom: Type.Record(
    Type.String(),
    Type.Object({
      valueId: Type.String(),
      value: Type.String(),
    })
  ),
})

const IClusterUser = Type.Object({
  userType: Type.String(),
  phoneNumber: Type.String(),
  gid: Type.Optional(Type.String()),
  otherDetails: IUserOtherDetials,
})

export const AutomationEventSchema = Type.Object({
  user: IClusterUser,
  trigger: Type.Enum(AUTOMATION_TRIGGER),
  companyCode: Type.String(),
})
