
import { showLog } from '@/system/showLogs'
import { ManipuladorObjects } from '@/util/manipuladorObjects'

AFRAME.registerComponent('start-button', {
    schema: {
    },
    init: function () {
        try {
            this.manipulador = new ManipuladorObjects(this.el)

            this.bindMethods()

            let temporizador = document.querySelector('#tempo')
            temporizador.addEventListener('tempoesgotado', this.colocarPosicaoInicial)
            this.el.addEventListener('grab-start', this.hoverStart)
            // setTimeout(() => this.hoverStart(), 3000)
        } catch (error) {
            showLog(error)
        }
    },
    bindMethods: function () {
        this.hoverStart = this.hoverStart.bind(this)
        this.colocarPosicaoInicial = this.colocarPosicaoInicial.bind(this)
    },
    hoverStart: function () {
        this.el.removeEventListener('grab-start', this.hoverStart)
        try {
            let manipuladorButtonModel = new ManipuladorObjects(document.querySelector('#button-start'))
            manipuladorButtonModel.setPosition('0 -10 0')
            this.manipulador.setPosition('0 -10 0')

            setTimeout(() => this.el.addEventListener('grab-start', this.hoverStart), 2000)
            this.el.emit('startgame')
        } catch (error) {
            showLog(error)
        }
    },
    colocarPosicaoInicial: function () {
        let manipuladorButtonModel = new ManipuladorObjects(document.querySelector('#button-start'))
        setTimeout(() => {
            manipuladorButtonModel.setPosition('-0.003 0.7 -0.49497')
            this.manipulador.setPosition('0 0.831 -0.46235')
        }, 3000)
    }
});

