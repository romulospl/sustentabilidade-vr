
import { showLog } from '@/system/showLogs'
import { ManipuladorObjects } from '@/util/manipuladorObjects'

AFRAME.registerComponent('start-button', {
    schema: {
    },
    init: function () {
        try {
            this.manipulador = new ManipuladorObjects(this.el)

            this.bindMethods()
            this.el.addEventListener('grab-start', this.hoverStart)
            // setTimeout(() => this.hoverStart(), 3000)
        } catch (error) {
            showLog(error)
        }
    },
    bindMethods: function () {
        this.hoverStart = this.hoverStart.bind(this)
    },
    hoverStart: function () {
        this.el.removeEventListener('grab-start', this.hoverStart)
        try {
            let manipuladorButtonModel = new ManipuladorObjects(document.querySelector('#button-start'))
            manipuladorButtonModel.setPosition('0 -10 0')
            this.manipulador.setPosition('0 -10 0')

            this.el.emit('startgame')
        } catch (error) {
            showLog(error)
        }
    },
});

