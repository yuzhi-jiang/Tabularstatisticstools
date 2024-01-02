// const xlsx = require("node-xlsx"); //引入模块
// const fs = require('fs'); //引入模块
import xlsx from 'node-xlsx'
import fs from 'fs'
import {separatorFile} from "../fileHandler/index.js";
// var buffer = xlsx.build([{ name: 'mySheetName', data: data }]); // Returns a buffer

// fs.writeFileSync('./the_content.xlsx', buffer, { 'flag': 'w' })

const createXlsx = (sheetName, titles, data) => {
    var xlsdata = []
    xlsdata.push(titles)
    // xlsdata.push(data)
    data.forEach(element => {
        xlsdata.push(element)
    });

    var buffer = xlsx.build([{ name: sheetName, data: xlsdata }]); // Returns a buffer
    return buffer
}
const writeXlsxSync = (filename, buffer) => {
    fs.writeFileSync(filename + '.xlsx', buffer, { 'flag': 'w' })
}
const createXlsxAndWrite = (fileName, sheetName, titles, data) => {
    const buffer = createXlsx(sheetName, titles, data)
    writeXlsxSync(fileName, buffer)
}
export const getXlsxData = (filesArr,fileConfig) => {
    var res = []
    console.log('000000000000')
    filesArr.forEach((item) => {
        console.log(separatorFile(item, fileConfig.rules2))
        res.push(separatorFile(item, fileConfig.rules2))
    })
    console.log('000000000000')
    return res;
}
export default {
    createXlsx,
    writeXlsxSync,
    createXlsxAndWrite
}
// module.exports = {


// };


