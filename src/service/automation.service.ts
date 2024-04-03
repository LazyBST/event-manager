import { isNil } from 'lodash'
import { GetAutomationResponse } from '../interface/automation'
import { httpClient } from '../utils/http-client'
import { logger } from '../utils/logger'
import { AUTOMATION_TRIGGER } from '../constants'

// TODO: missing env should fail while loading config module
const AUTOMATION_SVC_URL = process.env.AUTOMATION_SVC_URL as string

export const getTriggersForCompany = async (
  companyCode: string
): Promise<AUTOMATION_TRIGGER[]> => {
  try {
    console.log({ AUTOMATION_SVC_URL })
    const resp = await httpClient.get<GetAutomationResponse>(
      `${AUTOMATION_SVC_URL}/triggers?companyCode=${companyCode}`
    )
    const status = resp.status

    if (status !== 200) {
      throw new Error(
        'unable to fetch accpeted trigers of company: ' + companyCode
      )
    }

    const triggers = resp.data?.data?.triggers

    if (isNil(triggers?.length)) {
      throw new Error(
        'unable to fetch accpeted trigers of company: ' + companyCode
      )
    }

    return triggers
  } catch (err) {
    logger.error('get automation api error: ' + err)

    return []
  }
}
