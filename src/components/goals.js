import { ManipuladorObjects } from '@/util/manipuladorObjects'
import { showLog } from '@/system/showLogs'

const posicaoInicial = "0 1.7 -63.14484"
const posicaoCentralizada = "0.03156 1.3189 -0.83031"
const tempoDeAnimacao = 8000


const valorModels = [
    { id: 'agricutura-sustentavel', value: 1, altura: -0.52155 },
    { id: 'biocombustivel', value: 1, altura: -0.52065 },
    { id: 'bioeletricidade', value: 1, altura: -0.49548 },
    { id: 'cana-acucar', value: 1, altura: -0.3 },
    { id: 'conservacao-de-recursos-naturais', value: 1, altura: -0.5 },
    { id: 'descarbonizacao', value: 1, altura: -0.45277 },
    { id: 'desenvolvimento-sustentavel', value: 1, altura: -0.53 },
    { id: 'eficiencia-energetica', value: 1, altura: -0.56 },
    { id: 'etanol-model', value: 1, altura: -0.59494 },
    { id: 'reducao-de-emissoes-de-co2', value: 1, altura: -0.55 },
    { id: 'sustentabilidade-hidrica', value: 1, altura: -0.51 },
    { id: 'combustivel-fossil', value: 0, altura: 1.47252 },
    { id: 'desmatamento', value: 0, altura: 1.473 },
    { id: 'desperdicio', value: 0, altura: 1.413 },
    { id: 'emissoes-de-co2', value: 0, altura: 1.413 },
    { id: 'energia-nao-renovavel', value: 0, altura: 1.413 },
    { id: 'escassez-de-agua', value: 0, altura: 1.423 },
    { id: 'gasolina', value: 0, altura: 1.413 },
    { id: 'petroleo', value: 0, altura: 1.413 },
    { id: 'poluicao-do-ar', value: 0, altura: 1.413 },
    { id: 'queimandas', value: 0, altura: 1.413 },

]

function getInfoModelo(id) {
    const regex = /(-left|-right)/g;
    let elementoId = id.replace(regex, "")
    return valorModels.filter(v => v.id == elementoId)[0]
}

function sortearGoal(el) {
    let filhos = el.children
    let indiceAleatorio = Math.floor(Math.random() * filhos.length)
    let elementoAleatorio = filhos[indiceAleatorio]
    let filtro = getInfoModelo(elementoAleatorio.id).value
    return { sorteado: document.getElementById(elementoAleatorio.id), value: filtro[0] ? filtro[0] : 0 }
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
            this.modelosEscolhidos = []

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
        // console.clear();
        let modeloSorteado = sortearGoal(this.el)
        let manipuladorModeloSorteado = new ManipuladorObjects(modeloSorteado.sorteado)
        while (this.modelosEscolhidos.includes(manipuladorModeloSorteado.getElementId())) {
            modeloSorteado = sortearGoal(this.el)
            manipuladorModeloSorteado = new ManipuladorObjects(modeloSorteado.sorteado)
        }

        this.modeloSorteado = modeloSorteado.sorteado
        this.pontuacao = modeloSorteado.value

        console.log(`pontuação: ${this.pontuacao}`)
        this.modelosEscolhidos.push(manipuladorModeloSorteado.getElementId())
        let infoModelo = getInfoModelo(manipuladorModeloSorteado.getElementId())
        if (manipuladorModeloSorteado.getPosition("y") < -2) {
            manipuladorModeloSorteado.setPosition(`${manipuladorModeloSorteado.getPosition("x")} ${infoModelo.altura} ${manipuladorModeloSorteado.getPosition("z")}`)
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
    },
    tick: function () {
        if (this.modelosEscolhidos.length > 7) this.modelosEscolhidos = []
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



