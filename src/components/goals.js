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
            this.el.addEventListener('collisionstarted', this.verificarAreaEscape)
            this.el.addEventListener('hover-start', this.hoverStart)
            buttonStart.addEventListener('startgame', this.iniciarJogo)
        } catch (error) {
            showLog(error)
            console.log(error)
        }
    },
    bindMethods: function () {
        this.iniciarJogo = this.iniciarJogo.bind(this)
        this.selecionarModelo = this.selecionarModelo.bind(this)
        this.irParaPosicaoInicial = this.irParaPosicaoInicial.bind(this)
        this.adicionarAnimacao = this.adicionarAnimacao.bind(this)
        this.removerAnimacao = this.removerAnimacao.bind(this)
        this.verificarAreaEscape = this.verificarAreaEscape.bind(this)
        this.removerModelo = this.removerModelo.bind(this)
        this.reiniciarGoal = this.reiniciarGoal.bind(this)
        this.hoverStart = this.hoverStart.bind(this)
    },
    iniciarJogo: function () {
        this.selecionarModelo()
        this.adicionarAnimacao()

    },
    selecionarModelo: function () {
        this.modeloSorteado = sortearGoal(this.el)

        let manipuladorModeloSorteado = new ManipuladorObjects(this.modeloSorteado)
        if (manipuladorModeloSorteado.getPosition("y") < -2) {
            manipuladorModeloSorteado.setPosition(`${manipuladorModeloSorteado.getPosition("x")} ${manipuladorModeloSorteado.getPosition("y") + 10} ${manipuladorModeloSorteado.getPosition("z")}`)
        }
    },
    removerModelo: function () {
        let manipuladorModeloSorteado = new ManipuladorObjects(this.modeloSorteado)
        if (manipuladorModeloSorteado.getPosition("y") > -2) {
            manipuladorModeloSorteado.setPosition(`${manipuladorModeloSorteado.getPosition("x")} ${manipuladorModeloSorteado.getPosition("y") - 10} ${manipuladorModeloSorteado.getPosition("z")}`)
        }
    },
    irParaPosicaoInicial: function () {
        this.manipulador.setPosition(posicaoInicial)
    },
    adicionarAnimacao: function () {
        this.removerAnimacao()
        this.manipulador.addAnimation("-1.12442 1.42 4.935", 8000)
    },
    removerAnimacao: function () {
        this.manipulador.deleteAnimation()
    },
    verificarAreaEscape: function () {
        showLog("area escape")
        this.reiniciarGoal()
    },
    reiniciarGoal: function () {
        this.removerModelo()
        this.irParaPosicaoInicial()
        this.iniciarJogo()
    },
    hoverStart: function () {
        showLog("hoverStart")
        this.removerAnimacao()
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



