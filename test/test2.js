import { CONSTANT } from "../util/constant.js"
const fileConfig = {
    path: './uploads',//需要处理的目录地址  默认为当前路径
    // 注意：所有的都不包含文件夹（就是文件夹不处理） 

    rules2: {
        [CONSTANT.REGEXP]: '',
        [CONSTANT.ADDSTR]: {
            index: CONSTANT.ADDSTR_INDEX.start,
            value: ''
        },
        [CONSTANT.FILTER]: {
            value: ['xlsx', '*'],
            way: CONSTANT.FILTER_WAY.exclude
        },
        [CONSTANT.REPLACE]: {
            value: '',
            replace: ''
        },
        [CONSTANT.SEPARATOR]: {
            value: '-'
        },
        [CONSTANT.RENAME]: {
            startStr: '测试开始--',
            start: 1,
            type: CONSTANT.RENAME_TYPE.num,
            endStr: '---测试结束',
            status: 0//如果采用重命名模式则除了过滤以外的都不执行
        }
    },
    xls: {
        name: '',//默认名为 (项目名)+年月日+4位随机数 如：tongji_20221214_9876.xlsx
        sheetName: '',
        titles: [],
        outdir: '',//默认为处理目录/name.xlsx 如：d:\Documents\node\uploads\tongji_20221214_9876.xlsx
    }
}
console.log(fileConfig)