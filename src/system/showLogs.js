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
    }, timer || 3000)
}