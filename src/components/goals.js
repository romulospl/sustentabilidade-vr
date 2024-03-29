import { ManipuladorObjects } from '@/util/manipuladorObjects'
import { showLog } from '@/system/showLogs'

const posicaoInicial = "0 1.7 -63.14484"
const posicaoCentralizada = "0.03156 1.3189 -0.83031"
const tempoDeAnimacao = 8000
const regex = /(-left|-right)/g;

const valorModels = [
    { id: 'agricutura-sustentavel' , value: 1 },
    { id: 'biocombustivel', value: 1},
    { id: 'bioeletricidade', value: 1},
    { id: 'cana-acucar', value: 1},
    { id: 'conservacao-de-recursos-naturais', value: 1},
    { id: 'descarbonizacao', value: 1},
    { id: 'desenvolvimento-sustentavel', value: 1},
    { id: 'eficiencia-energetica', value: 1},
    { id: 'etanol-model', value: 1},
    { id: 'reducao-de-emissoes-de-co2', value: 1},
    { id: 'sustentabilidade-hidrica', value: 1},
    // { id: , value: 1},
    // { id: , value: 1},
    // { id: , value: 1},

]

function sortearGoal(el) {
    let filhos = el.children
    let indiceAleatorio = Math.floor(Math.random() * filhos.length)
    let elementoAleatorio = filhos[indiceAleatorio]
    // while (elementoAleatorio.id == anterior) {
    //     indiceAleatorio = Math.floor(Math.random() * filhos.length)
    //     elementoAleatorio = filhos[indiceAleatorio]
    // }
    
    let d = document.getElementById(elementoAleatorio.id)
    let elementoId = elementoAleatorio.id.replace(regex, "")
    let filtro = valorModels.filter(v => v.id == elementoId).map(v => v.value)
    return { sorteado: document.getElementById(elementoAleatorio.id), value: filtro[0]}
}

/*
STATUS:
{
    'inicio': INICIO
    'hoverStart': HOVER START
    3: 
}
*/

AFRAME.registerComponent('goal-object-left', {
    schema: {
        toPosition: { default: '0 0 16.15' },
    },
    init: function () {
        try {
            this.manipulador = new ManipuladorObjects(this.el)
            this.posicaoAlvo = "-1.12442 1.42 4.935"

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
        this.irParaAreaCentralizada = this.irParaAreaCentralizada.bind(this)
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
        let { sorteado, value } = sortearGoal(this.el)
        this.modeloSorteado = sorteado
        this.pontuacao = value

        console.log(`pontuação: ${this.pontuacao}`)
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
        this.status = 'inicio'
        this.manipulador.setPosition(posicaoInicial)
    },
    adicionarAnimacao: function () {
        this.removerAnimacao()
        this.manipulador.addAnimation(this.posicaoAlvo, tempoDeAnimacao)
    },
    removerAnimacao: function () {
        this.manipulador.deleteAnimation()
    },
    verificarAreaEscape: function () {
        showLog("area escape")
        // this.removerAnimacao()
        this.reiniciarGoal()
    },
    reiniciarGoal: function () {
        this.removerModelo()
        this.irParaPosicaoInicial()
        this.iniciarJogo()
    },
    hoverStart: function () {
        if (this.status === 'inicio') this.irParaAreaCentralizada()
    },
    irParaAreaCentralizada: function () {
        this.status = 'hoverStart'
        let time = 2000
        try {
            showLog(this.status)
            this.removerAnimacao()
            this.manipulador.addAnimation(posicaoCentralizada, time)
            this.manipulador.removeAttribute('hoverable')
            setTimeout(() => {
                this.manipulador.addAttribute('grabbable')
                this.removerAnimacao()
            }, (time + 500))
        } catch (error) {
            showLog(error)
        }
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



