
import { showLog } from '../system/showLogs'

AFRAME.registerComponent('start-button', {
    schema: {
    },
    init: function () {
        this.bindMethods()
        this.el.addEventListener('grab-start', this.hoverStart)
    },
    bindMethods: function () {
        this.hoverStart = this.hoverStart.bind(this)
    },
    hoverStart: function () {
        showLog("pressionado")
        // let message = document.querySelector('#desafioconclusion')
        // message.setAttribute('visible', 'false')
        // this.manipulador.setPosition('0 -10 0')
        // this.modelButton.setPosition('0 -10 0')
        // this.modelRestartButton.setPosition('0 -10 0')
        // this.el.emit('startgame')
    },
});

