
import { CONSTANT } from './util/constant.js'
import fs from 'fs'
const dirname = process.cwd()



const reNameQuestion = [
    {
        type: 'confirm',
        name: CONSTANT.RENAME + '.status',
        message: '是否需要重命名(注:重命名后将不可进行其他如正则替换，分隔符等操作)>',
        default: false
    },
    {
        type: 'number',
        message: '（重命名）开始数字>',
        default: 1,
        name: CONSTANT.RENAME + '.start',
        when: (answers) => {
            return answers[CONSTANT.RENAME].status
        }
    }, {
        type: 'rawlist',
        message: '（重命名）数字类型>',
        default: CONSTANT.RENAME_TYPE.num,
        name: CONSTANT.RENAME + '.type',
        choices: [
            {
                name: '阿拉伯数字',
                value: CONSTANT.RENAME_TYPE.num
            },
            {
                name: '中文小写数字',
                value: CONSTANT.RENAME_TYPE.zhLowerNum
            },
            {
                name: '中文大写数字',
                value: CONSTANT.RENAME_TYPE.zhUpperNum
            },
            {
                name: '英文小写数字',
                value: CONSTANT.RENAME_TYPE.enLowerNum
            },
            {
                name: '英文大写数字',
                value: CONSTANT.RENAME_TYPE.enUpperNum
            },
        ],
        when: (answers) => {
            return answers[CONSTANT.RENAME].status
        }
    },
    {
        type: 'input',
        message: '（重命名）前置字符>',
        default: '',
        name: CONSTANT.RENAME + '.startStr',
        when: (answers) => {
            return answers[CONSTANT.RENAME].status
        }
    },
    {
        type: 'input',
        name: CONSTANT.RENAME + '.endStr',
        message: '（重命名）后置字符>',
        default: '',
        when: (answers) => {
            return answers[CONSTANT.RENAME].status
        }
    }
]

const replaceQuestion = [{
    name: CONSTANT.REPLACE + '.inputvalue',
    type: 'input',
    default: '',
    message: '文字替换a b(a可以是正则,左边是被替换字符,右边是替换字符)如:[0-9]2 23>',
    when: (answers) => {
        console.log(answers)
        return (answers.doCheckBox.includes(CONSTANT.REPLACE))
    },
    validate: (input) => {
        var arr = input.split(' ')
        if (arr.length !== 2) {
            console.log("请正确输入格式")
        }
        return arr.length === 2
    }
}]

const pathQuestion = [{
    type: 'input',
    name: CONSTANT.PATH,
    message: '请输入目录路径>',
    default: dirname,
    validate: (input) => {
        // check if directory exists
        if (fs.existsSync(input)) {
            console.log('Directory exists!');
            return true
        } else {
            console.log('Directory not found.');
            return false
        }
    }
}]

const CheckBokQuestion = [{
    name: 'doCheckBox',
    type: 'checkbox',
    message: '需要处理的动作',
    choices: [
        {
            name: "过滤选择",
            value: CONSTANT.FILTER
        },
        {
            name: "文本替换",
            value: CONSTANT.REPLACE,
            disabled: (answers) => {
                console.log('checobokx ')

                return answers[CONSTANT.RENAME].status
            }
        },
        {
            name: "设置分隔符",
            value: CONSTANT.SEPARATOR,
            disabled: (answers) => {
                return answers[CONSTANT.RENAME].status

            }
        },
        {
            name: "添加字符",
            value: CONSTANT.ADDSTR,
            disabled: (answers) => {
                return answers[CONSTANT.RENAME].status

            }
        },
        {
            name: "设置xls参数",
            value: CONSTANT.XLS,
        },
        {
            name: "修改文件名",
            value: CONSTANT.RENAME_FILE,
        }
    ]
}]

const filterQuestion = [
    {
        type: 'rawlist',
        name: CONSTANT.FILTER + '.way',
        when: (answers) => {
            return (answers.doCheckBox.includes(CONSTANT.FILTER))
        },
        message: '过滤类型',
        choices: [{
            name: '包含',
            value: CONSTANT.FILTER_WAY.include
        },
        {
            name: '不包含',
            value: CONSTANT.FILTER_WAY.exclude
        }],

    },
    {
        type: 'input',
        message: "过滤值(可以多个值用','号隔开，*代表全部)>",
        name: CONSTANT.FILTER + '.value',
        default: CONSTANT.FILTER_ALL,
        when: (answers) => {
            return (answers.doCheckBox.includes(CONSTANT.FILTER))
        },
        // default: (answers) => {
        //     if (answers[CONSTANT.FILTER].way == CONSTANT.FILTER_WAY.include) {
        //         console.log('包含全部')
        //         return CONSTANT.FILTER_ALL
        //     }
        //     return ''
        //     // return answers[CONSTANT.FILTER].way == CONSTANT.FILTER_WAY.include ? CONSTANT.FILTER_ALL : ''
        // },
        filter: (input) => {
            return input.split(',')
        }
    },
]

const addQuestion = [
    {
        name: CONSTANT.ADDSTR + '.index',
        type: 'number',
        default: CONSTANT.ADDSTR_INDEX.start,
        message: '(添加字符):添加位置(' + CONSTANT.ADDSTR_INDEX.start + '是开头，' + CONSTANT.ADDSTR_INDEX.end + '是结尾,n是具体位置):>',
        when: (answers) => {
            return (answers.doCheckBox.includes(CONSTANT.ADDSTR))
        }
    }
    , {
        name: CONSTANT.ADDSTR + '.value',
        type: 'input',
        default: '',
        message: '(添加字符):设置字符:>',
        when: (answers) => {
            return (answers.doCheckBox.includes(CONSTANT.ADDSTR))
        }
    }
]

const separatorQuestion = [{
    name: CONSTANT.SEPARATOR + '.value',
    type: 'input',
    message: '输入分隔符:',
    when: (answers) => {
        return (answers.doCheckBox.includes(CONSTANT.SEPARATOR))
    }
}]


const xlsQuestion = [
    {
        type: 'input',
        name: CONSTANT.XLS + '.name',
        default: "tongji"+ Math.floor(Math.random() * (9999 - 1000)),
        message: '(xls)设置xls文件名>',
        when: (answers) => {
            return (answers.doCheckBox.includes(CONSTANT.XLS))
        }
    },
    {
        type: 'input',
        name: CONSTANT.XLS + '.sheetName',
        message: '(xls)设置sheetn名>',
        default: '数据',
        when: (answers) => {
            return (answers.doCheckBox.includes(CONSTANT.XLS))
        }
    },
    {
        type: 'input',
        name: CONSTANT.XLS + '.titles',
        message: '(xls)设置xls列标题多个标题逗号隔开>',
        default: [],
        when: (answers) => {
            return (answers.doCheckBox.includes(CONSTANT.XLS))
        }
    }, {
        type: 'input',
        name: CONSTANT.XLS + '.outdir',
        message: '(xls)设置xls输出路径>',
        default: dirname,
        validate: (input) => {
            // check if directory exists
            if (fs.existsSync(input)) {
                console.log('Directory exists!');
                return true
            } else {
                console.log('Directory not found.');
                return false
            }
        }
        ,
        when: (answers) => {
            return (answers.doCheckBox.includes(CONSTANT.XLS))
        }
    }
]
var questions = []



//路径 1
questions = questions.concat(pathQuestion)

//重命名需放在第二
questions = questions.concat(reNameQuestion)
// 复选框应该放在第三
questions = questions.concat(CheckBokQuestion)

questions = questions.concat(filterQuestion)
questions = questions.concat(separatorQuestion)
questions = questions.concat(replaceQuestion)
questions = questions.concat(addQuestion)
questions = questions.concat(xlsQuestion)

// console.log(questions.concat(reNameQuestion))
//  console.log(questions)
/*output:
[
  {
    type: 'input',
    name: 'path',
    message: '请输入目录路径>',
    default: 'D:\\projects\\nodeproject\\Tabularstatisticstools',
    validate: [Function: validate]
  },
  {
    type: 'confirm',
    name: 'rename.status',
    message: '是否需要重命名(注:重命名后将不可进行其他如正则替换，分隔符等操作)>',
    default: false
  },
  {
    type: 'number',
    message: '（重命名）开始数字>',
    default: 1,
    name: 'rename.start',
    when: [Function: when]
  },
  {
    type: 'rawlist',
    message: '（重命名）数字类型>',
    default: 0,
    name: 'rename.type',
    choices: [ [Object], [Object], [Object], [Object], [Object] ],
    when: [Function: when]
  },
  {
    type: 'input',
    message: '（重命名）前置字符>',
    default: '',
    name: 'rename.startStr',
    when: [Function: when]
  },
  {
    type: 'input',
    name: 'rename.endStr',
    message: '（重命名）后置字符>',
    default: '',
    when: [Function: when]
  },
  {
    name: 'doCheckBox',
    type: 'checkbox',
    message: '需要处理的动作',
    choices: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
  },
  {
    type: 'rawlist',
    name: 'filter.way',
    when: [Function: when],
    message: '过滤类型',
    choices: [ [Object], [Object] ]
  },
  {
    type: 'input',
    message: "过滤值(可以多个值用','号隔开，*代表全部)>",
    name: 'filter.value',
    default: [Function: default],
    when: [Function: when],
    filter: [Function: filter]
  },
  {
    name: 'separator.value',
    type: 'input',
    message: '输入分隔符:',
    when: [Function: when]
  },
  {
    name: 'replace.inputvalue',
    type: 'input',
    default: '',
    message: '文字替换a b(a可以是正则,左边是被替换字符,右边是替换字符)如:[0-9]2 23>',
    when: [Function: when],
    validate: [Function: validate]
  },
  {
    name: 'addstr.index',
    type: 'number',
    default: 0,
    message: '(添加字符):添加位置(0是开头，-1是结尾,n是具体位置):>',
    when: [Function: when]
  },
  {
    name: 'addstr.value',
    type: 'input',
    default: '',
    message: '(添加字符):设置字符:>',
    when: [Function: when]
  },
  {
    type: 'input',
    name: 'xls.name',
    default: 'tongji8801',
    message: '(xls)设置xls文件名>',
    when: [Function: when]
  },
  {
    type: 'input',
    name: 'xls.sheetName',
    message: '(xls)设置sheetn名>',
    default: '数据',
    when: [Function: when]
  },
  {
    type: 'input',
    name: 'xls.titles',
    message: '(xls)设置xls列标题多个标题逗号隔开>',
    default: [],
    when: [Function: when]
  },
  {
    type: 'input',
    name: 'xls.outdir',
    message: '(xls)设置xls输出路径>',
    default: 'D:\\projects\\nodeproject\\Tabularstatisticstools',
    validate: [Function: validate],
    when: [Function: when]
  }
]


 */
export default {
    questions
}