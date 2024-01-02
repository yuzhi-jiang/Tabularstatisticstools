import {main} from "../index.js";
import {inputConigToFileConfig} from "../getConfig.js";
var config={
    path: 'D:\\projects\\nodeproject\\Tabularstatisticstools\\uploads',
    rename: { status: false },
    doCheckBox: [ 'separator', 'xls' ],
    separator: { value: '-' },
}

const a=inputConigToFileConfig(config)
console.log(a)
main(a)