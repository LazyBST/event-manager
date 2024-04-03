"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTriggersForCompany = void 0;
const lodash_1 = require("lodash");
const http_client_1 = require("../utils/http-client");
const logger_1 = require("../utils/logger");
// TODO: missing env should fail while loading config module
const AUTOMATION_SVC_URI = process.env.AUTOMATION_SVC_URI;
const getTriggersForCompany = async (companyCode) => {
    try {
        console.log({ AUTOMATION_SVC_URI });
        const resp = await http_client_1.httpClient.get(`${AUTOMATION_SVC_URI}/triggers?companyCode=${companyCode}`);
        const status = resp.status;
        if (status !== 200) {
            throw new Error('unable to fetch accpeted trigers of company: ' + companyCode);
        }
        const triggers = resp.data?.data?.triggers;
        if ((0, lodash_1.isNil)(triggers?.length)) {
            throw new Error('unable to fetch accpeted trigers of company: ' + companyCode);
        }
        return triggers;
    }
    catch (err) {
        logger_1.logger.error('get automation api error: ' + err);
        return [];
    }
};
exports.getTriggersForCompany = getTriggersForCompany;
