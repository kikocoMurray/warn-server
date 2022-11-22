/** @format */
import express, { Request, Response } from 'express'
import { sendError } from 'lib/firepower/send-error'
import seed from 'lib/firepower/seed'
const router = express()
const defaultHook = 'https://hooks.slack.com/services/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'
// middleware
const SLACK_HOOK_DEV_URL: SLACK_HOOK_DEV_URL = process.env.SLACK_HOOK_DEV_URL as SLACK_HOOK_DEV_URL
const SLACK_HOOK_QA_URL: SLACK_HOOK_QA_URL = process.env.SLACK_HOOK_QA_URL as SLACK_HOOK_QA_URL
const SLACK_HOOK_PRD_URL: SLACK_HOOK_PRD_URL = process.env.SLACK_HOOK_PRD_URL as SLACK_HOOK_PRD_URL

const findHook = (host:string): {channel: string, url: typeof SLACK_HOOK_DEV_URL | typeof SLACK_HOOK_QA_URL | typeof SLACK_HOOK_PRD_URL | typeof defaultHook} => {
  switch(true){
    case process.env.DEV_DOMAIN_GROUP?.replace(/\s+/g,"")?.split(';').includes(host):
      return {
        channel:"#告警_前端請求_測試",
        url: SLACK_HOOK_DEV_URL,
      }
    case process.env.QA_DOMAIN_GROUP?.replace(/\s+/g,"")?.split(';').includes(host):
      return {
        channel:"#告警_前端請求_測試",
        url: SLACK_HOOK_DEV_URL,
      }
    case process.env.PRD_DOMAIN_GROUP?.replace(/\s+/g,"")?.split(';').includes(host):
      return {
        channel:"#告警_前端請求_正式",
        url: SLACK_HOOK_PRD_URL,
      }
    default:
      return {
        channel:"#告警_前端請求_測試",
        url: SLACK_HOOK_DEV_URL,
      }
  }
}

// url: /api/send
/**
 * @params req
 */
type reqData = {
  account: string
  host: string
  issues: string
  error: string
  code: string
  time: string
  token: string
  payload: string
  agent: string
}
router.get('/send', async (req: Request, res: Response): Promise<void> => {
  const { host,account,issues,error, code, token, payload,agent, time } = req.query as unknown as reqData
  const hook = await findHook(host)
  const ip = (<string>req.headers['x-forwarded-for'])?.split(', ')[0] || req.socket.remoteAddress || req.ip

  const data = seed(`${JSON.parse(error).config.url}${account}${ip}`)
  if(code === '401') {
    res.send({
      code: 200,
      result: {
        message: `401 token pass this message`,
      },
    })

    res.end()
    return
  }
  if(data) {
    res.send({
      code: 200,
      result: {
        message: `Cache Filter`,
      },
    })

    res.end()
    return
  }


  await sendError({
    ip,
    hook,
    host,
    code,
    agent,
    token,
    error,
    time,
    issues,
    payload,
    account: `${account}_${ip}`,
  })
    .then(() => {
      res.send({
        code: 200,
        result: {
          message: `Message Code`,
        },
      })
    })
    .catch(e=>{
      res.send(`There was a error with the request ${e}`)
    })
    .finally(()=>{
      res.end()
    })
})


export default router
