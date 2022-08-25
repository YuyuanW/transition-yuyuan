import { IncomingMessage } from "http";
import { appid, code } from "./private.data";

const querystring = require('querystring');
const https = require('https');

const md5 = require('js-md5');

export const translate = (word:string)=>{
  const q=word
  const from = 'en'
  const to = 'zh'
  const salt = '1435660288'
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
    // console.log('header',res.headers)
    const arr:any = []
    res.on('data', (chunk:any) => {
      arr.push(chunk)
      // process.stdout.write(d);
    });
    res.on('end',()=>{
      type BaiduResult = {
        from : string;
        to :string;
        trans_result : {src:string,dst:string}[];
        error_code ?: string;
        error_msg?:string;
      }
      const result = Buffer.concat(arr).toString()
      const outputResult:BaiduResult =  JSON.parse(result)
      if(outputResult.error_code){
        console.error(outputResult.error_code,outputResult.error_msg)
      }else{
        console.log(outputResult.trans_result[0].dst)
      }
    })
  }); 
  req.on('error', (e: any) => {
    console.error(e);
  });
  // req.setHeader('Content-type','application/json;charset=gbk')
  req.end();
}

