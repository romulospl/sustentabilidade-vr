
import { showLog } from '@/system/showLogs'
import { ManipuladorObjects } from '@/util/manipuladorObjects'


function hideMessages() {
    document.querySelector('#msg-desafio-concluido').setAttribute('visible', 'false')
    document.querySelector('#msg-tempo-esgotado').setAttribute('visible', 'false')
}

function hoverStart(el) {
    try {
        let manipulador = new ManipuladorObjects(el)
        el.removeEventListener('grab-start', () => hoverStart(el))
        let manipuladorButtonModel = new ManipuladorObjects(document.querySelector('#button-start'))
        manipuladorButtonModel.setPosition('0 -10 0')
        manipulador.setPosition('0 -10 0')
        setTimeout(() => el.addEventListener('grab-start', () => hoverStart(el)), 2000)
        hideMessages()
        el.emit('startgame')
    } catch (error) {
        showLog(error)
    }
}

function resetarPosicao(el){
    try{
        let manipulador = new ManipuladorObjects(el)
        let manipuladorButtonModel = new ManipuladorObjects(document.querySelector('#button-start'))
        setTimeout(() => {
            manipuladorButtonModel.setPosition('-0.003 0.7 -0.49497')
            manipulador.setPosition('0 0.831 -0.46235')
        }, 3000)
    } catch (error){
        showLog(error)
    }
}


AFRAME.registerComponent('start-button', {
    schema: {
    },
    init: function () {
        try {
            this.manipulador = new ManipuladorObjects(this.el)

            let temporizador = document.querySelector('#tempo')
            let placar = document.querySelector('#pontuacao')

            temporizador.addEventListener('tempoesgotado', () => resetarPosicao(this.el))
            placar.addEventListener('pontuacaoatingida', () => resetarPosicao(this.el))
            this.el.addEventListener('grab-start', () => hoverStart(this.el))
        } catch (error) {
            showLog(error)
        }
    },
});

