/** @format */
import express, { Request, Response } from 'express'
import https from 'https'
const router = express()
// middleware
// router.use()

/**
 * @param webhookURL
 * @param message
 * @return {Promise}
 */

const sendSlackMessage = (webhookURL: string, message: reqData) => {
  return new Promise< any >((resolve,reject)=>{
    const options = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
    }

    const req = https.request(webhookURL, options, (res) => {
      res.on('data', (chunk) => {
        console.log(`可用的数据块: ${chunk}`)
      } )
      res.on('end', () => resolve(res))
    });

    req.on('error', (e) => reject(e))

    // send our message body (was parsed to JSON beforehand)
    req.write(JSON.stringify({
      'username': '前端前台 API 出事拉 !!!',
      'text': `出事拉 !!! 前端前台發生錯誤，詳情如下：`,
      'icon_emoji': ':bangbang:',
      'attachments': [
        {
          'color': '#eed140',
          'fields': [
            {
              'title': 'Service',
              'value': message.services,
              'short': true,
            },
            {
              'title': '錯誤 Code',
              'value': message.issues,
              'short': true,
            },
            {
              'title': 'API',
              'value': message.api,
              'short': false,
            },
          ]
        }
      ]
    }));
    req.end();
  })
}

// url: /api/send
/**
 * @params req
 */
type reqData = {
  services: string
  issues: number
  api: string
}
router.get('/send', async (req: Request, res: Response): Promise<void> => {
  const request = req as unknown as reqData

  sendSlackMessage(WebHookURL, request)
    .then(data => {
      res.send({
        code: data.statusCode,
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
