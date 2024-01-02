#!/usr/bin/env node 


import Nzh from "nzh"; //直接使用简体中文
import {fileHandler} from "./fileHandler/index.js";
import xlsxUtil, {getXlsxData} from "./util/xlsxUtil.js";




const main = async (fileConfig) => {
    const filesArr = await getFiles(fileConfig.path, fileConfig.rules2, fileHandler)
    const data = getXlsxData(filesArr,fileConfig)

    var currData = new Date().toLocaleDateString().replace(new RegExp('\/', 'g'), '')

    var filename = fileConfig.xls.name || "tongji" + currData + Math.floor(Math.random() * (9999 - 1000))
    var title = fileConfig.xls.titles || []
    var sheetName = fileConfig.xls.sheetName || '数据'
    // console.log(filename,title,sheetName)
    xlsxUtil.createXlsxAndWrite(filename, sheetName, title, data)
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