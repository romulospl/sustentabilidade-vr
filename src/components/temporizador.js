import { showLog } from '@/system/showLogs'
import { ManipuladorObjects } from '@/util/manipuladorObjects'

function escreverTempo(text) {
    const minutosFormatados = minutos.toString().padStart(2, '0');
    const segundosFormatados = segundos.toString().padStart(2, '0');

    const tempoFormatado = `${minutosFormatados}:${segundosFormatados}`;

    document.querySelector('#tempo').setAttribute('text', {
        value: tempoFormatado,
        color: (minutos == 0 && segundos <= 30) ? 'red' : 'black'
    });
}

let minutoOriginal = 5
let segundoOriginal = 0
let minutos = minutoOriginal;
let segundos = segundoOriginal;

AFRAME.registerComponent('temporizador', {
    schema: {
    },
    init: function () {
        try {
            this.bindMethods()
            this.manipulador = new ManipuladorObjects(this.el)

            let buttonStart = document.querySelector('#button-start-contato')
            let placar = document.querySelector('#pontuacao')

            buttonStart.addEventListener('startgame', this.iniciarTemporizador)
            placar.addEventListener('pontuacaoatingida', this.pararTempo)
        } catch (error) {
            showLog(error)
        }
    },
    bindMethods: function () {
        this.iniciarTemporizador = this.iniciarTemporizador.bind(this)
        this.avisarTempoEsgotado = this.avisarTempoEsgotado.bind(this)
        this.pararTempo = this.pararTempo.bind(this)
    },
    iniciarTemporizador: function () {
        this.zerarTempo()
        const self = this
        this.temporizador = setInterval(function () {
            segundos--;

            if (segundos < 0) {
                segundos = 59;
                minutos--;
            }

            if (minutos == 0 && segundos <= 0) {
                clearInterval(self.temporizador);
                escreverTempo(0, 0);
                self.avisarTempoEsgotado()
                self.el.emit('tempoesgotado')
                return;
            }

            escreverTempo(minutos, segundos);
        }, 1000);
    },
    pararTempo: function () {
        clearInterval(this.temporizador)
    },
    avisarTempoEsgotado: function () {
        showLog("Tempo esgotado")
    },
    zerarTempo: function(){
        minutos = minutoOriginal;
        segundos = segundoOriginal;
    }

});

