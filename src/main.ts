import { IncomingMessage } from "http";

const querystring = require('querystring');
const https = require('https');

const md5 = require('js-md5');
const iconv = require('iconv-jschardet');
// iconv.encode(SarchName, 'gbk');

export const translate = (word:string)=>{
  console.log('fuck',word)
  const q=word
  const from = 'en'
  const to = 'zh'
  const appid  = '20220508001208209'
  const salt = '1435660288'
  const code = 'I7Me033g5kN7DjZ9rDnZ'
  const sign = md5(appid+q+salt+code)
  
  const queryList:string = querystring.stringify({ 
    q,from,to,appid,salt,code,sign
  });
  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate/?'+queryList,
    method: 'GET',
  };


  const req = https.request(options, (res:IncomingMessage) => {
    console.log('header',res.headers)
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e: any) => {
    console.error(e);
  });

  // req.setHeader('Content-type','application/json;charset=gbk')

  req.end();
}

