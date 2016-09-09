var fs = require('fs')

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
        stringDecoded = stringDecoded.concat(String.fromCharCode(tempArray[i]))
    }
    return stringDecoded
}

console.log('-------------------------------------------------------------------')
console.log('-----------------------------EasyCrypt-----------------------------')
console.log('-------------------------------------------------------------------')
console.log('')
console.log('Do you want to encode or decode a file ?')
console.log('1) Encode')
console.log('2) Decode')
console.log('3) Exit')

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', function(input) {
    input = parseInt(input)
    if (!isNaN(input) && 1 <= input && input <= 3) {
        process.stdin.removeAllListeners('data')
        switch (input) {
            case 1:
                console.log('Please enter the path of the file that you want to encode: ')
                process.stdin.on('data', function(input) {
                    process.stdin.removeAllListeners('data')
                    path = input.trim()
                    console.log('Please enter the key that you want to use to encode your file: ')
                    process.stdin.on('data', function(input) {
                        process.stdin.removeAllListeners('data')
                        key = input

                        fs.writeFileSync(path, encode(fs.readFileSync(path, 'utf8').toString(), key))
                        console.log('File encoded.')
                        process.exit()
                    })
                })
                break;
            case 2:
                console.log('Please enter the path of the file that you want to decode: ')
                process.stdin.on('data', function(input) {
                    process.stdin.removeAllListeners('data')
                    path = input.trim()
                    console.log('Please enter the key that you want to use to decode your file: ')
                    process.stdin.on('data', function(input) {
                        process.stdin.removeAllListeners('data')
                        key = input

                        fs.writeFileSync('Output Decoded - ' + path + '.txt', decode(fs.readFileSync(path, 'utf8').toString(), key))
                        console.log('File decoded.')
                        process.exit()
                    })
                })
                break;
            case 3:
                console.log('Exit');
                process.exit()
                break;
            default:

        }
    } else {
        console.log('Please enter a number between 1 and 3.')
    }
})
