import { IncomingMessage } from "http";

const https = require('https');

export const translate = (word:string)=>{
  console.log('fuck',word)
  const options = {
    hostname: 'www.baidu.com',
    port: 443,
    path: '/',
    method: 'GET'
  };
  
  const req = https.request(options, (res:IncomingMessage) => {
    
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e: any) => {
    console.error(e);
  });

  req.end();
}