

import { readdir } from "fs";
import path from 'path';
import Nzh from "nzh"; 
var nzhcn = Nzh.cn;//F
import util from './util/index.js'
import xlsxutil from "./xlsxutil.js";

// const CONSTANT = {
//     REGEXP: 'regexp',
//     REPLACE: 'replace',
//     SEPARATOR: 'separator',
//     ADDSTR: 'addstr',
//     FILTER: 'filter',
//     RENAME: 'rename',//重命名
//     FILTER_WAY: {
//         exclude: 1,
//         include: 0,
//     },
//     RENAME_TYPE: {
//         num: 0,//阿拉伯数字
//         zhLowerNum: 1,//中文小写数字
//         zhUpperNum: 2,//中文大写数字
//         enLowerNum: 3,//英文小写数字
//         enUpperNum: 4,//英文大写数字
//     },
//     FILTER_ALL: '*',
//     ADDSTR_INDEX: {
//         start: 0,
//         end: -1,
//     }
// }
// const fileConfig = {
//     path: '../uploads',//需要处理的目录地址  默认为当前路径
//     // 注意：所有的都不包含文件夹（就是文件夹不处理） 
//     rules: [
//         {
//             key: 'regexp',//正则
//             value: '',
//             status: 1//输入配置方案二  该配置激活  0-》未激活
//         },
//         {
//             key: 'replace',//替换  输入的可以是字符串也可以是正则
//             value: '',
//             replace: '',
//             status: 1//输入配置方案二  该配置激活  0-》未激活
//         },
//         {
//             key: 'separator',//分隔符
//             value: ''
//             ,
//             status: 1//输入配置方案二  该配置激活  0-》未激活
//         },
//         {
//             key: 'addstr',
//             value: '',
//             index: 0//0 前加 ,-1 后加（-2 倒数第二个加）   [1-n] 指定位置加
//             ,
//             status: 1//输入配置方案二  该配置激活  0-》未激活
//         }, {
//             key: 'filter',
//             value: 'xlsx', // * 所有文件 js->js文件  css->css文件  注意：所有的都不包含文件夹（就是文件夹不处理） ，
//             way: 'exclude' //过滤方式 include->包含  exclude->排除
//             ,
//             status: 1//输入配置方案二  该配置激活  0-》 未激活
//         }
//     ],
//     rules2: {
//         [CONSTANT.REGEXP]: '',
//         [CONSTANT.ADDSTR]: {
//             index: CONSTANT.ADDSTR_INDEX.start,
//             value: ''
//         },
//         [CONSTANT.FILTER]: {
//             value: 'xlsx',
//             way: CONSTANT.FILTER_WAY.exclude
//         },
//         [CONSTANT.REPLACE]: {
//             value: '',
//             replace: ''
//         },
//         [CONSTANT.SEPARATOR]: {
//             value: '-'
//         },
//         [CONSTANT.RENAME]: {
//             startStr: '测试开始--',
//             start: 1,
//             type: CONSTANT.RENAME_TYPE.num,
//             endStr: '---测试结束',
//             status: 0//如果采用重命名模式则除了过滤以外的都不执行
//         }
//     },
//     xls: {
//         name: '',//默认名为 (项目名)+年月日+4位随机数 如：tongji_20221214_9876.xlsx
//         sheetName: '',
//         titles: [],
//         outdir: '',//默认为处理目录/name.xlsx 如：d:\Documents\node\uploads\tongji_20221214_9876.xlsx
//     }
// }

const getFiles = (filepath, fileRules, fileHandler) => {
    return new Promise((resolve, rejects) => {
        readdir(filepath, (err, files) => {
            if (err) {
                rejects(err)
            }
           var res = fileHandler(err, files, fileRules)
            resolve(res)
        });
    })
}


const separatorFile = (filename, fileRules) => {
    var Separator = fileRules[CONSTANT.SEPARATOR]
    var reg = RegExp(Separator.value)
    if (Separator.value.length > 0) {
        var res = filename.split(reg)
        return res;
    }
    return [filename];
}

const main = async (fileConfig) => {
    const filesArr = await getFiles(fileConfig.path, fileConfig.rules2, fileHandler)
    const data = getXlsxData(filesArr)

    var currData = new Date().toLocaleDateString().replace(new RegExp('\/', 'g'), '')

    var filename = fileConfig.xls.name || "tongji" + currData + Math.floor(Math.random() * (9999 - 1000))
    var title = fileConfig.xls.titles || []
    var sheetName = fileConfig.xls.sheetName || '数据'
    // console.log(filename,title,sheetName)
    xlsxutil.createXlsxAndWrite(filename, sheetName, title, data)
}
const getXlsxData = (filesArr) => {
    var res = []
    console.log('000000000000')
    filesArr.forEach((item) => {
        console.log(separatorFile(item, fileConfig.rules2))
        res.push(separatorFile(item, fileConfig.rules2))
    })
    console.log('000000000000')
    return res;
}


main(fileConfig)



export default {
    main,
    getXlsxData
}

/**
 * 控制台设计：
 * 根据步骤输入:
 * 如
 * 第一步先输入 path（直接回车表示使用默认，当前路径）
 * 
 * 配置两个方案（1）：
 *      根据可选配置添加：
 *          如：
 *          1.regexp
 *          2.separator
 *          3.addstr
 *          4.filter
 *          5.exit
 *          input config index>3
 *          input addstrIndex(0.前加,n.指定位置加，-1.后加)>0
 *          input addStr>abc
 *          //第二轮，因为没有exit
 *          1.regexp
 *          2.separator
 *          3.filter
 *          4.exit
 *          input config index>4
 * 方案二：
 *      直接让用户顺序输入配置：
 *         如：
 *          1.regexp
 *          input regexpStr(default（no regexp）)>aaa
 * 
 * 
 * 第三步：输入xls的配置，如第二步，方案二
 *       
 * 
 * 第四步：是否预览，如果是太大的则预览前10条，方案二（可以选择下一页直到最后一页），如果不满意可以重新第二步
 * 
 * 
 * 第五步：提交，生产xlsx
 * 
 * 
 * 
 */