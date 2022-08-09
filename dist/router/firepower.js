/** @format */
import express from 'express';
import https from 'https';
const router = express();
// middleware
// router.use()
const WebHookURL = 'https://hooks.slack.com/services/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';
/**
 * @param webhookURL
 * @param message
 * @return {Promise}
 */
const sendSlackMessage = (webhookURL, message) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
        };
        const req = https.request(webhookURL, options, (res) => {
            res.on('data', (chunk) => {
                console.log(`可用的数据块: ${chunk}`);
            });
            res.on('end', () => resolve(res));
        });
        req.on('error', (e) => reject(e));
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
    });
};
router.get('/send', async (req, res) => {
    const request = req;
    sendSlackMessage(WebHookURL, request)
        .then(data => {
        res.send({
            code: data.statusCode,
            result: {
                message: `Message Code`,
            },
        });
    })
        .catch(e => {
        res.send(`There was a error with the request ${e}`);
    })
        .finally(() => {
        res.end();
    });
});
export default router;
//# sourceMappingURL=firepower.js.map