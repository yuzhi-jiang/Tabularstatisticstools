
import { readdir } from "fs";
import path from 'path';
import Nzh from "nzh";
var nzhcn = Nzh.cn;//使用简体中文
import util from '../util/index.js'
import {CONSTANT} from "../util/constant.js";


const renameFile = (fileRules, currIndex) => {
    var Rename = fileRules[CONSTANT.RENAME]

    if (Rename.status == 1) {
        var newName = ''
        var startStr = Rename.startStr
        var endStr = Rename.endStr
        switch (Rename.type) {
            case CONSTANT.RENAME_TYPE.num:
                newName = currIndex
                break;
            case CONSTANT.RENAME_TYPE.zhLowerNum:
                newName = nzhcn.encodeS(currIndex)
                break;
            case CONSTANT.RENAME_TYPE.zhUpperNum:
                newName = nzhcn.encodeB(currIndex)
                break;
            case CONSTANT.RENAME_TYPE.enLowerNum:
                newName = util.toAlphaLower(currIndex)
                break
            case CONSTANT.RENAME_TYPE.enUpperNum:
                newName = util.toAlphaUper(currIndex)
                break
            default:
                newName = currIndex
                break;
        }
        return startStr + newName + endStr;
    }
}
export const separatorFile = (filename, fileRules) => {
    var Separator = fileRules[CONSTANT.SEPARATOR]
    var reg = RegExp(Separator.value)
    if (Separator.value.length > 0) {
        var res = filename.split(reg)
        return res;
    }
    return [filename];
}

function insertStr(soure, start, addChars) {
    return soure.slice(0, start) + addChars + soure.slice(start);
}


const addStr = (filename, fileRules) => {
    var AddStr = fileRules[CONSTANT.ADDSTR]
    if(!AddStr){
        return filename
    }
    var addvalue = AddStr.value
    var addIndex = AddStr.index

    const len = filename.length

    if (AddStr) {
        if (addIndex == CONSTANT.ADDSTR_INDEX.start) {
            filename = addvalue + filename;
        }
        else if (addIndex == CONSTANT.ADDSTR_INDEX.end) {
            filename = filename + addvalue
        }
        //index =n 0< n <len
        else if (addIndex >= 0 && addIndex <= len) {
            filename = insertStr(filename, addIndex, addvalue)
        }
    }
    return filename

}

const filter = (filename, fileRules) => {
    var fileExtension = filename.split('.').pop().toLowerCase();//后缀

    var filterRule = fileRules.filter
    //包含的方式，没有包含* || 不是后缀相等
    if (filterRule.way == CONSTANT.FILTER_WAY.include && (!filterRule.value.includes(CONSTANT.FILTER_ALL) && !filterRule.value.includes(fileExtension))) {
        return false
    }
    //排除的方式，排除的是* 或者 排除的与后缀相等
    else if (filterRule.way == CONSTANT.FILTER_WAY.exclude && (filterRule.value.includes(CONSTANT.FILTER_ALL) || filterRule.value.includes(fileExtension))) {
        return false
    }
    return true;

}
const replaceStr = (filename, fileRules) => {
    var Replace = fileRules[CONSTANT.REPLACE]
    if (Replace) {
        // var reg = /aaa/;
        var reg = new RegExp(Replace.value, 'g')
        var replaceValue = Replace.replace
        var res = filename.replace(reg, replaceValue);
        return res;
    }
    return filename
}



export const fileHandler = ( files, fileRules) => {


    var resArr = []

    if(!fileRules){
        return files
    }

    files.forEach((file, index) => {
        var fileExtension = file.split('.').pop().toLowerCase();//后缀

        var filename = file.substring(0, file.lastIndexOf('\.'))//不带后缀


        //是否排除
        if (!filter(file, fileRules)) {
            return
        }

        //是否需要重命名
        var Reanem = fileRules[CONSTANT.RENAME]
        if (Reanem && Reanem.status == 1) {
            filename = renameFile(fileRules, index + Reanem.start)
            resArr.push(filename)
            return
        }
        //添加字符
        filename = addStr(filename, fileRules)

        //替换字符
        filename = replaceStr(filename, fileRules)

        resArr.push(filename)

    });
    return resArr
}
