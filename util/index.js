const toAlphaUper = (num) => {
    var res = '';
    while (num > 0) {
        var temp = Math.floor(num / 26);
        res += _toAlphaUp(num % 26)
        num = temp;
    }
    return res.split("").reverse().join("");
};
const toAlphaLower = (num) => {
    var res = '';
    while (num > 0) {
        var temp = Math.floor(num / 26);
        res += _toAlphaLower(num % 26)
        num = temp;
    }
    return res.split("").reverse().join("");
};


const _toAlphaUp = (num) => {
    if (num < 1 || num > 26 || typeof num !== 'number') {
        return -1;
    }
    const leveller = 64;
    //因为实际上A用65表示，所以我们想用
    return String.fromCharCode(num + leveller);
}


const _toAlphaLower = (num) => {
    if (num < 1 || num > 26 || typeof num !== 'number') {
        return -1;
    }
    const leveller = 96;
    //因为实际上A用65表示，所以我们想用
    return String.fromCharCode(num + leveller);
}

const insertStr=(soure, start, addChars) =>{
    return soure.slice(0, start) + addChars + soure.slice(start);
}


export default {
    toAlphaLower,
    toAlphaUper,
    insertStr
}