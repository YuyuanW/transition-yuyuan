import commander, { args } from 'commander';
import { translate } from './main';
const program = new commander.Command();

program
    .version('0.0.2')
    .name('transition')
    .usage('<word>')
    .arguments('<word>')
    .action(function (word:string) {
        translate(word)
  });

    
program.parse(process.argv);

const a= [
    'http://api.fanyi.baidu.com/api/trans/vip/translate?q=banana&from=en&to=zh&appid=20220508001208209&salt=1435660288&sign=3ca61017ca185101111b538aad40ee5c',
    'http://api.fanyi.baidu.com/api/trans/vip/translate?q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4'
]
