import { getNewConfig } from "../getconfig.js";
import questions from '../questions.js'
import { CONSTANT } from "../util/constant.js";

const res = await getNewConfig()
console.log('---------------')
console.log(res)
console.log('---------------')
