import { showLog } from '@/system/showLogs'
import { ManipuladorObjects } from '@/util/manipuladorObjects'

function escreverTempo(text){
    const minutosFormatados = minutos.toString().padStart(2, '0');
    const segundosFormatados = segundos.toString().padStart(2, '0');
    
    const tempoFormatado = `${minutosFormatados}:${segundosFormatados}`;
    
    document.querySelector('#tempo').setAttribute('text', {
        value: tempoFormatado,
        color: (minutos == 0 && segundos <= 30) ? 'red' : 'black'
    });
}


let minutos = 1;
let segundos = 0;

AFRAME.registerComponent('temporizador', {
    schema: {
    },
    init: function () {
        try {
            this.bindMethods()
            this.manipulador = new ManipuladorObjects(this.el)

            let buttonStart = document.querySelector('#button-start-contato')

            buttonStart.addEventListener('startgame', this.iniciarTemporizador)
        } catch (error) {
            showLog(error)
        }
    },
    bindMethods: function () {
        this.iniciarTemporizador = this.iniciarTemporizador.bind(this)
    },
    iniciarTemporizador: function () {
        const self = this
        const temporizador = setInterval(function() {
            segundos--;
        
            if (segundos < 0) {
                segundos = 59;
                minutos--;
            }
        
            if (minutos == 0 && segundos <= 0) {
                clearInterval(temporizador);
                escreverTempo(0, 0);
                self.el.emit('tempoesgotado')
                return;
            }
        
            escreverTempo(minutos, segundos);
        }, 100);
    },
    
});

