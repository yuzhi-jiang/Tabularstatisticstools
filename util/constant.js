export const CONSTANT = {
    PATH: 'path',
    REGEXP: 'regexp',
    REPLACE: 'replace',
    SEPARATOR: 'separator',
    ADDSTR: 'addstr',
    FILTER: 'filter',
    RENAME: 'rename',//重命名
    XLS: 'xls',//xls
    RENAME_FILE:'renameFile',
    RENAME_FILE_INDEX: {//使用第几列的结果,可能经过分隔符后有多个列表
        one: 0,
        tow: 1,
        third:2
    },

    FILTER_WAY: {
        exclude: 1,
        include: 0,
    },
    RENAME_START: {
        start: 0,
        end: -1,
    },
    RENAME_TYPE: {
        num: 0,//阿拉伯数字
        zhLowerNum: 1,//中文小写数字
        zhUpperNum: 2,//中文大写数字
        enLowerNum: 3,//英文小写数字
        enUpperNum: 4,//英文大写数字
    },
    FILTER_ALL: '*',
    ADDSTR_INDEX: {
        start: 0,
        end: -1,
    }
}