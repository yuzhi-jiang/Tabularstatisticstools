import inquirer from 'inquirer'
import fs from 'fs'
import { CONSTANT } from './util/constant.js'
const dirname = process.cwd()


function inputConigToFileConfig(inputConfig) {
    var fileConfigT = {}
    fileConfigT.rule = {}



    //path
    fileConfigT.path = inputConfig.path

    //filter
    fileConfigT.rule[CONSTANT.FILTER] = {
        way: CONSTANT.FILTER_WAY.include,
        value: [CONSTANT.FILTER_ALL]
    }
    if (inputConfig.doCheckBox.includes(CONSTANT.FILTER)) {
        fileConfigT.rule[CONSTANT.FILTER] = {
            way: inputConfig[CONSTANT.FILTER].way,
            value: [].concat(inputConfig[CONSTANT.FILTER].value.join())
        }

        // fileConfigT.rule[CONSTANT.FILTER].way = inputConfig[CONSTANT.FILTER].way
        // fileConfigT.rule[CONSTANT.FILTER].value = inputConfig[CONSTANT.FILTER].value
    }

    //replace
    if (inputConfig.doCheckBox.includes(CONSTANT.REPLACE)) {
        fileConfigT.rule[CONSTANT.REPLACE] = {}

        const rpArr = inputConfig[CONSTANT.REPLACE].inputvalue.split(' ')
        fileConfigT.rule[CONSTANT.REPLACE].value = inputConfig[CONSTANT.REPLACE].inputvalue.split(' ')[0]
        fileConfigT.rule[CONSTANT.REPLACE].replace = ''
        if (rpArr.length > 1) {
            fileConfigT.rule[CONSTANT.REPLACE].replace = inputConfig[CONSTANT.REPLACE].inputvalue.split(' ')[1]
        }
    }



    //separator
    if (inputConfig.doCheckBox.includes(CONSTANT.SEPARATOR)) {


        fileConfigT.rule[CONSTANT.SEPARATOR] = {
            value: inputConfig[CONSTANT.SEPARATOR].value
        }
        // console.log(CONSTANT.SEPARATOR + ":")
        // console.log(inputConfig[CONSTANT.SEPARATOR])
        // fileConfig.rule[CONSTANT.SEPARATOR].value = inputConfig[CONSTANT.SEPARATOR].value
    }

    //rename

    if (inputConfig.doCheckBox.includes(CONSTANT.RENAME)) {

        fileConfigT.rule[CONSTANT.RENAME] = {}
        fileConfig.rule[CONSTANT.RENAME] = inputConfig[CONSTANT.RENAME]
    }

    //addstr
    if (inputConfig.doCheckBox.includes(CONSTANT.ADDSTR)) {
        console.log(CONSTANT.ADDSTR + ":")
        console.log(inputConfig[CONSTANT.ADDSTR])
        fileConfigT.rule[CONSTANT.ADDSTR] = {
            index: inputConfig[CONSTANT.ADDSTR].index,
            value: inputConfig[CONSTANT.ADDSTR].value
        }

        // fileConfig.rule[CONSTANT.ADDSTR].index = inputConfig[CONSTANT.ADDSTR].index
        // fileConfig.rule[CONSTANT.ADDSTR].value = inputConfig[CONSTANT.ADDSTR].value
    }


    return fileConfigT
}


import questions from './questions.js'
var Questions = questions.questions


export function getNewConfig() {
    return new Promise((resolve, rejects) => {

        inquirer.prompt(
            Questions).then((res) => {
                const aab = res
                console.log(res)

                console.log('====================')
                const ress = inputConigToFileConfig(res)
                console.log(ress)
                console.log(ress.rule.filter)
                console.log(ress.rule.filter.value)
                console.log('====================')
                resolve(res)

            }).catch(err => {
                rejects(err)
            })
    })
}


export function getNewConfigByQuestion(questions) {
    var tempQ = questions || Questions
    return new Promise((resolve, rejects) => {
        inquirer.prompt(
            tempQ).then((res) => {
                const aab = res
                resolve(res)
                console.log(res)
            }).catch(err => {
                rejects(err)
            })
    })
}

export function getNewConfigByQuestionAndAnswers(questions, answers) {
    var tempQ = questions || Questions
    return new Promise((resolve, rejects) => {
        inquirer.prompt(
            tempQ
            , answers).then((res) => {
                const aab = res
                resolve(res)
                console.log(res)
            }).catch(err => {
                rejects(err)
            })
    })
}
