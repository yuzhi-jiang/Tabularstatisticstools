import { getNewConfig } from "../getconfig.js";
import questions from '../questions.js'
import { CONSTANT } from "../util/constant.js";
// console.log(questions)


const res = await getNewConfig()
console.log('---------------')
console.log(res)
console.log('---------------')


// var a = {
//     b: {
//         c:1
//     }
// }
// a.b = {}
// a.b.d=3
// console.log(a)

// var a = true
// if (a==1) {
//     console.log('aa')
// } else {
//     console.log('bb')
// }
