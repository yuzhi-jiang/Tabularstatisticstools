import {main} from "../index.js";
import {inputConigToFileConfig} from "../getConfig.js";
var config={
    path: 'D:\\projects\\nodeproject\\Tabularstatisticstools\\uploads',
    rename: { status: false },
    doCheckBox: [ 'separator', 'xls' ],
    separator: { value: '-' },
}

var config1={
    path: 'D:\\\\projects\\\\nodeproject\\\\Tabularstatisticstools\\\\uploads',
    rename: { status: false },
    doCheckBox: [ 'filter', 'separator' ],
    filter: { way: 0, value: [ 'txt' ] },
    separator: { value: '-' }
}

const a=inputConigToFileConfig(config)
console.log(a)
main(a)