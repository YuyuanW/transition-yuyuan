#!/usr/bin/env node

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


