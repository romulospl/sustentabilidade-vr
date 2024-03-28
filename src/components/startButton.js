
import { showLog } from '../system/showLogs'
import { manipuladorObjects } from '../util/manipuladorObjects'

AFRAME.registerComponent('start-button', {
    schema: {
    },
    init: function () {
        try {
            this.manipulador = new manipuladorObjects(this.el)

            this.bindMethods()
            this.el.addEventListener('grab-start', this.hoverStart)
        } catch (error) {
            showLog(error)
        }


    },
    bindMethods: function () {
        this.hoverStart = this.hoverStart.bind(this)
    },
    hoverStart: function () {
        try {
            let manipuladorButtonModel = new manipuladorObjects(document.querySelector('#button-start'))

            manipuladorButtonModel.setPosition('0 -10 0')
            this.manipulador.setPosition('0 -10 0')
            showLog("pressionado")

            this.el.emit('startgame')
        } catch (error) {

        }
    },
});

