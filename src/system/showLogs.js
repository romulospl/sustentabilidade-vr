export function showLog(message, color, timer) {
    var texto = document.getElementById('log');
    texto.setAttribute('visible', 'true')
    texto.setAttribute('material', {
        color: 'black'
    })
    texto.setAttribute('text', {
        value: message,
        color: color || 'red'
    })
    setTimeout(() => {
        texto.setAttribute('visible', 'false')
    }, timer || 4000)
}

export function showLog2(message, color, timer) {
    var texto = document.getElementById('log2');
    texto.setAttribute('visible', 'true')
    texto.setAttribute('material', {
        color: 'black'
    })
    texto.setAttribute('text', {
        value: message,
        color: color || 'blue'
    })
    setTimeout(() => {
        texto.setAttribute('visible', 'false')
    }, timer || 6000)
}