import { IncomingMessage } from "http";
import { appid, code } from "./private.data";

const querystring = require('querystring');
const https = require('https');

const md5 = require('js-md5');

const errorMap:ErrorMap = {
  52001:'请求超时',
  52002:'系统错误',
  52003:'用户认证失败',
  54000:'必填参数为空',
  54001:'签名错误',
  58000 :'客户端IP非法',
  unknown : '服务器繁忙'
}

type ErrorMap = {
  52001:string,
  52002:string,
  52003:string,
  54000:string,
  54001:string,
  58000 :string,
  unknown : string
}
type Map = keyof ErrorMap;


export const translate = (word:string)=>{
  let from = 'en'
  let to = 'zh'
  if(/[a-zA-Z]/.test(word)){
    [from,to] = [from,to]
  }else{
    from = [to, to = from][0]
  }

  const q=word
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
        error_code ?: Map;
        error_msg?:string;
      }
      const result = Buffer.concat(arr).toString()
      const outputResult:BaiduResult =  JSON.parse(result)
      if(outputResult.error_code){
        console.error( errorMap[outputResult.error_code] || outputResult.error_msg)
        process.exit(2)
      }else{
        console.log(outputResult.trans_result[0].dst)
        process.exit(0)
      }
    })
  }); 
  req.on('error', (e: any) => {
    console.error(e);
  });
  // req.setHeader('Content-type','application/json;charset=gbk')
  req.end();
}

