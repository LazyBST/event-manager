import { Static } from '@sinclair/typebox';
import { AutomationEventSchema } from '../schema/automation-event';
export type TAutomationEvent = Static<typeof AutomationEventSchema>;
