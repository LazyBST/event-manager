import { AUTOMATION_TRIGGER } from '../constants';
export interface ICompanyTrigger {
    companyCode: string;
    triggers: AUTOMATION_TRIGGER[];
}
export interface GetAutomationResponse {
    data: ICompanyTrigger;
}
