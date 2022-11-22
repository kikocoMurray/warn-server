import fetch from "node-fetch"

const createCodeBlock =  (title, code) =>{
  code = (typeof code === 'string') ? code.trim() : JSON.stringify(code, null, 2)
  const tripleBackticks = '```'
  return `_${title}_${tripleBackticks}${code}${tripleBackticks}\n`
}

const rgbToHex = (r : number,g:number,b:number): string =>{
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

export const sendError = ({
    hook,
    host,
    token,
    agent,
    error,
    time,
    payload,
    account,
    code,
    ip,
    issues,
  }: {
    hook: {channel:string, url: string}
    host: string
    error: string
    agent: string
    account: string
    payload: string
    token: string
    code: string
    ip?: string
    time: string
    issues: string
  }) => {
  const err = JSON.parse(error)

  const request = {
    method: err.config.method,
    url: err.config.url,
    stack: err.stack,
    data: err.config.data,
    params: err.config.params,
  }
  const [,r,g,b] = (<string>ip)?.split('.')
  const message = Object.assign({},{
    channel: hook.channel,
    attachments:[{
      fallback: `${host} account:${account}`,
      color: rgbToHex(parseInt(r,10),parseInt(g,10),parseInt(b,10)),
      title: `${host} \n account:${account}`,
      text: [
        { title:'Stack',code: request.stack}
      ].map(({title,code})=>createCodeBlock(title,code)).join(''),
      fields: [
        { title: 'Request URL', value: request.url, short: true },
        { title: 'Request Method', value: request.method, short: true },
        { title: 'Request Status Code', value: code, short: true },
        { title: 'IP', value: ip, short: true},
        { title: 'Error Code', value: issues, short: true },
        { title: 'Payload', value: payload, short: true},
        { title: 'User Agent', value: agent, short: true},
        { title: 'Error Time', value: time, short: true},
      ],
      mrkdwn_in: ['text'],
      footer: token,
      ts: Math.floor(Date.now() / 1000)
    }]
  })

  return new Promise<void>((resolve,reject)=>{
    fetch(
      hook.url,
      {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {'Content-Type': 'application/json'},
      }
    )
      .then(()=>{
        console.log('送出訊息成功')
        return resolve()
      })
      .catch((err)=>{
        console.log('error')
        return reject(err)
      })
  })
}