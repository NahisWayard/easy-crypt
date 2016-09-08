var prompt = require('prompt')
var fs = require('fs')
var fast = true
var fastOptions = {
    path: 'test',
    key: 'azerty'
}

function stringToASCIIArray(string) {
    array = []
    for (var i = 0; i < string.length; i++) {
        array[i] = string.charCodeAt(i)
    }
    return array
}

function generateVerifCode(array) {
    verifCode = 0
    for (var i = 0; i < array.length; i++) {
        if (i % 2 == 0)
            verifCode = verifCode + 3 * array[i]
        if (i % 2 != 0)
            verifCode = verifCode + array[i]
    }
    return verifCode
}

function keyTotal(string) {
    keyTotal = 0
    for (var i = 0; i < string.length; i++) {
        keyTotal = keyTotal + string.charCodeAt(i)
    }
    return keyTotal
}

function encode(string, key) {
    keyTotal = keyTotal(key)
    array = stringToASCIIArray(string)
    array[array.length] = generateVerifCode(array)
    tempArray = []
    for (var i = 0; i < array.length; i++) {
        tempArray[i] = array[i] * keyTotal
    }
    return tempArray
}

function decode(string, key) {
    keyTotal = keyTotal(key)
    array = string.split(',')
    tempArray = []
    for (var i = 0; i < array.length; i++) {
        tempArray[i] = array[i] / keyTotal
    }
    stringDecoded = ""
    for (var i = 0; i < tempArray.length - 1; i++) {
        stringDecoded.concat(String.fromCharCode(tempArray[i]))
        console.log(String.fromCharCode(tempArray[i]));
    }
    return stringDecoded
}

prompt.start()
prompt.get(['path', 'key'], function(err, results) {
    if (fast)
        results = fastOptions
    console.log(results);
    fileText = fs.readFileSync(results.path).toString()
    console.log(decode(fileText, results.key));
})
