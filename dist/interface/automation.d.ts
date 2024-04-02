import { AUTOMATION_TRIGGER } from '../constants/common';
export interface ICompanyTrigger {
    companyCode: string;
    triggers: AUTOMATION_TRIGGER[];
}
export interface GetAutomationResponse {
    data: ICompanyTrigger;
}
