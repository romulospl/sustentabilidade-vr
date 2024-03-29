import { ManipuladorObjects } from '@/util/manipuladorObjects'
import { showLog } from '@/system/showLogs'

const posicaoInicial = "0 1.7 -63.14484"

function sortearGoal(el) {
    let filhos = el.children
    let indiceAleatorio = Math.floor(Math.random() * filhos.length)
    let elementoAleatorio = filhos[indiceAleatorio]
    // while (elementoAleatorio.id == anterior) {
    //     indiceAleatorio = Math.floor(Math.random() * filhos.length)
    //     elementoAleatorio = filhos[indiceAleatorio]
    // }

    return document.getElementById(elementoAleatorio.id)
}


AFRAME.registerComponent('goal-object-left', {
    schema: {
        toPosition: { default: '0 0 16.15' },
    },
    init: function () {
        try {
            this.manipulador = new ManipuladorObjects(this.el)

            this.manipuladorScape = new ManipuladorObjects(document.querySelector('#scape-left'))

            this.irParaPosicaoInicial()

            let buttonStart = document.querySelector('#button-start-contato')

            this.bindMethods()
            buttonStart.addEventListener('startgame', this.iniciarJogo)
            this.iniciarJogo()

        } catch (error) {
            showLog(error)
            console.log(error)
        }
    },
    bindMethods: function () {
        this.iniciarJogo = this.iniciarJogo.bind(this)
        this.selecionarModelo = this.selecionarModelo.bind(this)
        this.irParaPosicaoInicial = this.irParaPosicaoInicial.bind(this)
        this.iniciarAnimacao = this.iniciarAnimacao.bind(this)
        this.verificarAreaEscape = this.verificarAreaEscape.bind(this)
    },
    iniciarJogo: function () {
        this.selecionarModelo()
        this.iniciarAnimacao()
        this.el.addEventListener('collisionstarted', this.verificarAreaEscape)
    },
    selecionarModelo: function () {
        this.modeloSorteado = sortearGoal(this.el)

        let manipuladorModeloSorteado = new ManipuladorObjects(this.modeloSorteado)
        manipuladorModeloSorteado.setPosition(`${manipuladorModeloSorteado.getPosition("x")} ${manipuladorModeloSorteado.getPosition("y") + 10} ${manipuladorModeloSorteado.getPosition("z")}`)
    },
    irParaPosicaoInicial: function () {
        this.manipulador.setPosition("0 1.7 -63.14484")
    },
    iniciarAnimacao: function () {
        this.manipulador.addAnimation("-1.44571 1.42002 4.9347", 8000)
    },
    verificarAreaEscape: function (){
        showLog("area escape")
    }

});


AFRAME.registerComponent('goal-object-right', {
    schema: {
        toPosition: { default: '0 0 16.15' },
    },
    init: function () {

    },
    bindMethods: function () {

    },

});



