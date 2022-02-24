const numbers = document.querySelectorAll('[data-number]')
const operators = document.querySelectorAll('[operator]')
const del = document.querySelector('[delete]')
const cl = document.querySelector('[allClear]')
const eq = document.querySelector('[equal]')
const display = document.querySelector('[display]')
const invert = document.querySelector('[invert]')
const decimal = document.querySelector('[decimals]')
const prcnt = document.querySelector('[percent]')
let curr = ''
let oper = ''
let prev = ''
let nf = Intl.NumberFormat("pt-br")
function addNum(number) {
    curr += number
    show()

}
function clear() {
    curr = ''
    oper = ''
    prev = ''
    show()
}
function delet() {
    if (curr != '') {
        console.log('delete')
        curr = curr.split('').slice(0, -1).join('')
    } else
        if (oper != '') {
            oper = ''
            curr = prev
            prev = ''
        }

    show()
}
function addDec(num) {
    if (num.toString().indexOf('.') == -1) {
        return num + '.'
    } else {
        return num
    }
}
function format(num) {
    console.log(num)
    formnum = num.split('.')
    numb = formnum[0]
    dec = formnum[1]
    console.log(dec)
    return numb.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + (dec != undefined ? dec.length == 0 ? ',' : ',' + dec : '')
}
function show() {
    display.innerHTML = `${prev != '' ? format(prev) : prev} ${oper == "*" ? oper.replace(oper, '&#215') : oper == "/" ? oper.replace(oper, '&#247') : oper} ${curr != '' ? format(curr) : curr}`
}
function operation(op) {
    if (prev != '') {
        switch (op) {
            case '+':
                res = parseFloat(prev) + parseFloat(curr)
                break;
            case '-':
                res = parseFloat(prev) - parseFloat(curr)
                break;
            case '*':
                res = parseFloat(prev) * parseFloat(curr)
                break;
            case '/':
                res = parseFloat(prev) / parseFloat(curr)
                break;
        }
        return res.toString()
    }
    // curr = curr.toString()
    // prev = ''
    // show()
}

function inverter(number) {
    if (number < 0) {
        return Math.abs(number)
    } else {
        return -number
    }
}

function encode(str) {
    var encodedStr = str.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
    return encodedStr
}
numbers.forEach((number, index) => {
    number.addEventListener("click", () => {
        addNum(index)
    })
})
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if (curr != '') {
            if (oper != '') {
                curr = operation(oper)
                switch (encode(operator.innerHTML)) {
                    case '&#215;':
                        oper = '*'
                        break
                    case '&#247;':
                        oper = '/'
                        break
                    default:
                        oper = operator.innerHTML
                        break
                }
            }
            switch (encode(operator.innerHTML)) {
                case '&#215;':
                    oper = '*'
                    break
                case '&#247;':
                    oper = '/'
                    break
                default:
                    oper = operator.innerHTML
                    break


            }
            prev = curr.toString()
            curr = ''
            show()
        } else {
            switch (encode(operator.innerHTML)) {
                case '&#215;':
                    oper = '*'
                    break
                case '&#247;':
                    oper = '/'
                    break
                default:
                    oper = operator.innerHTML
                    break


            }
            show()
        }


    })
})
invert.addEventListener('click', () => {
    curr = inverter(curr)
    show()
})
eq.addEventListener('click', () => {
    prev = operation(oper)
    curr = ''
    oper = ''
    show()
})
del.addEventListener('click', () => delet())
cl.addEventListener('click', () => clear())
decimal.addEventListener('click', () => {
    curr = addDec(curr)
    show()
})
prcnt.addEventListener('click', () => {
    
    percent()
})