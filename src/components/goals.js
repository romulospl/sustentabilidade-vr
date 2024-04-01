import { ManipuladorObjects } from '@/util/manipuladorObjects'
import { showLog, showLog2 } from '@/system/showLogs'

// const posicaoInicial = "0 1.7 -63.14484"
const posicaoInicial = "0 1.7 -44.78514"
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
    let valor = getInfoModelo(elementoAleatorio.id).value == 1 ? true : false
    return { sorteado: document.getElementById(elementoAleatorio.id), value: getInfoModelo(elementoAleatorio.id).value }
}

function getTempoAleatorio() {
    return (Math.floor(Math.random() * (2 - 1 + 1)) + 1) * 1000;
}

const pontuacaoFinal = 5
let pontuacao = 0
// atualizarPontuacao()

function atualizarPontuacao() {
    document.querySelector('#pontuacao').setAttribute('text', {
        value: `${pontuacao}/${pontuacaoFinal}`,
        color: 'green'
    })
}
let modelosEscolhidos = []

setInterval(function () {
    atualizarPontuacao()
    if (modelosEscolhidos.length > 15) modelosEscolhidos = []
}, 100);

const somPontuado = document.querySelector('#pontuado-som')
const somWrong = document.querySelector('#wrong-sound')
const somSucess = document.querySelector('#sucess-sound')

const msgPontuacaoAtingida = document.querySelector('#msg-desafio-concluido')

function showPontuacaoAtingida() {
    msgPontuacaoAtingida.setAttribute('visible', 'true')
    setTimeout(() => msgPontuacaoAtingida.setAttribute('visible', 'false'), 5000)
}

/*
STATUS:
{
    'pronto' : PRONTO PARA INICIAR
    'iniciado': INICIO
    'hoverStart': HOVER START
    'aguardando': AGUARDANDO O RESTART OU OUTRO GOAL FINALIZAR O FLUXO
}
*/

AFRAME.registerComponent('goal-object', {
    schema: {
        toPosition: { default: '0 0 16.15' },
        caixaSustentavel: { default: '' },
        caixaNaoSustentavel: { default: '' },
    },
    init: function () {
        try {
            this.manipulador = new ManipuladorObjects(this.el)
            this.posicaoAlvo = this.data.toPosition
            this.bindMethods()

            this.otherGoals = document.querySelectorAll(`[goal-object]:not([id="${this.manipulador.getElementId()}"])`);
            this.caixaSustentavel = document.querySelector(this.data.caixaSustentavel)
            this.caixaNaoSustentavel = document.querySelector(this.data.caixaNaoSustentavel)
            this.placar = document.querySelector('#pontuacao')
            let buttonStart = document.querySelector('#button-start-contato')
            let temporizador = document.querySelector('#tempo')

            console.log(this.caixaSustentavel)
            console.log(this.caixaNaoSustentavel)
            buttonStart.addEventListener('startgame', this.startPressionado)
            temporizador.addEventListener('tempoesgotado', this.resetarGoal)
            this.el.addEventListener('hover-start', this.irParaAreaCentralizada)
            this.el.addEventListener('collisionstarted', this.reiniciarGoal)
            this.placar.addEventListener('pontuacaoatingida', this.resetarGoal)

            const self = this
            this.otherGoals.forEach(function (elemento) {
                elemento.addEventListener('resetarGoal', self.resetarGoal)
                elemento.addEventListener('liberarmodelo', self.liberarStatus)
            });
        } catch (error) {
            showLog(error)
            console.log(error)
        }
    },
    bindMethods: function () {
        this.resetarGoal = this.resetarGoal.bind(this)
        this.liberarStatus = this.liberarStatus.bind(this)
        this.startPressionado = this.startPressionado.bind(this)
        this.irParaPosicaoInicial = this.irParaPosicaoInicial.bind(this)
        this.iniciarJogo = this.iniciarJogo.bind(this)
        this.reiniciarGoal = this.reiniciarGoal.bind(this)
        this.adicionarAnimacao = this.adicionarAnimacao.bind(this)
        this.removerAnimacao = this.removerAnimacao.bind(this)
        this.removerModelo = this.removerModelo.bind(this)
        this.irParaAreaCentralizada = this.irParaAreaCentralizada.bind(this)
        this.selecionarModelo = this.selecionarModelo.bind(this)
        this.verificarCaixotePositivo = this.verificarCaixotePositivo.bind(this)
        this.resetarOpcoesCaixote = this.resetarOpcoesCaixote.bind(this)
    },
    resetarGoal: function () {
        try {
            this.status = 'aguardando'
            this.removerAnimacao()
            this.reiniciarGoal()
        } catch (error) {
            showLog(error)
            showLog2("resetarGoal")
            console.log(error)
        }
    },
    reiniciarGoal: function () {
        try {
            this.removerModelo()
            this.irParaPosicaoInicial()
            setTimeout(() => {
                if (pontuacao >= pontuacaoFinal) {
                    // this.endGame()
                    return
                } else {
                    this.iniciarJogo()
                }
            }, 500)
        } catch (error) {
            showLog(error)
            showLog2("reiniciarGoal")
            console.log(error)
        }
    },
    removerModelo: function () {
        try {
            let manipuladorModeloSorteado = new ManipuladorObjects(this.modeloSorteado)
            if (manipuladorModeloSorteado.getPosition("y") > -2) {
                manipuladorModeloSorteado.setPosition(`${manipuladorModeloSorteado.getPosition("x")} ${manipuladorModeloSorteado.getPosition("y") - 10} ${manipuladorModeloSorteado.getPosition("z")}`)
            }
        } catch (error) {
            showLog(error)
            showLog2("removerModelo")
            console.log(error)
        }
    },
    liberarStatus: function () {
        try {
            this.status = 'pronto'
            this.reiniciarGoal()
        } catch (error) {
            showLog(error)
            console.log(error)
            showLog2("liberarStatus")
        }
    },
    startPressionado: function () {
        try {
            this.status = 'pronto'
            this.irParaPosicaoInicial()
            this.iniciarJogo()
        } catch (error) {
            showLog(error)
            console.log(error)
            showLog2("startPressionado")
        }
    },
    iniciarJogo: function () {
        try {
            if (this.status === 'pronto') {
                this.selecionarModelo()
                setTimeout(() => this.adicionarAnimacao(), getTempoAleatorio())
                this.status = 'iniciado'
            }
        } catch (error) {
            showLog(error)
            console.log(error)
            showLog2("iniciarJogo")
        }
    },
    irParaPosicaoInicial: function () {
        try {
            this.manipulador.setPosition(posicaoInicial)
            if (this.status === 'aguardando') return
            this.status = 'pronto'
            this.el.addEventListener('hover-start', this.irParaAreaCentralizada)
        } catch (error) {
            showLog(error)
            console.log(error)
            showLog2("irParaPosicaoInicial")
        }
    },
    selecionarModelo: function () {
        try {
            let modeloSorteado = sortearGoal(this.el)
            let manipuladorModeloSorteado = new ManipuladorObjects(modeloSorteado.sorteado)
            while (modelosEscolhidos.includes(manipuladorModeloSorteado.getElementId())) {
                modeloSorteado = sortearGoal(this.el)
                manipuladorModeloSorteado = new ManipuladorObjects(modeloSorteado.sorteado)
            }

            this.modeloSorteado = modeloSorteado.sorteado
            this.pontuacao = modeloSorteado.value

            // console.log(`pontuação: ${this.modeloSorteado}`)
            modelosEscolhidos.push(manipuladorModeloSorteado.getElementId())
            let infoModelo = getInfoModelo(manipuladorModeloSorteado.getElementId())
            if (manipuladorModeloSorteado.getPosition("y") < -2) {
                manipuladorModeloSorteado.setPosition(`${manipuladorModeloSorteado.getPosition("x")} ${infoModelo.altura} ${manipuladorModeloSorteado.getPosition("z")}`)
            }
        } catch (error) {
            showLog(error)
            console.log(error)
            showLog2("selecionarModelo")
        }
    },
    adicionarAnimacao: function () {
        try {
            this.removerAnimacao()
            this.manipulador.addAnimation(this.posicaoAlvo, tempoDeAnimacao)
        } catch (error) {
            showLog(error)
            console.log(error)
            showLog2("adicionarAnimacao")
        }
    },
    removerAnimacao: function () {
        try {
            this.manipulador.deleteAnimation()
        } catch (error) {
            showLog(error)
            console.log(error)
            showLog2("removerAnimacao")
        }
    },
    irParaAreaCentralizada: function () {
        try {
            if (this.status != 'iniciado') return
            this.el.removeEventListener('hover-start', this.irParaAreaCentralizada)
            this.status = 'hoverStart'
            this.el.emit('resetarGoal')
            let tempo = 2000
            this.removerAnimacao()
            this.manipulador.addAnimation(posicaoCentralizada, tempo)
            this.manipulador.removeAttribute('hoverable')
            setTimeout(() => {
                this.caixaSustentavel.addEventListener('collisionstarted', this.verificarCaixotePositivo)
                this.caixaNaoSustentavel.addEventListener('collisionstarted', this.resetarOpcoesCaixote)
                this.manipulador.addAttribute('grabbable')
                this.removerAnimacao()
            }, (tempo + 500))

        } catch (error) {
            showLog(error)
            console.log(error)
            showLog2("irParaAreaCentralizada")
        }
    },
    verificarCaixotePositivo: function () {
        try {
            this.resetarOpcoesCaixote()
            if (this.pontuacao == 1) {
                somPontuado.components.sound.playSound()
                pontuacao++
            } else {
                somWrong.components.sound.playSound()
                // showLog("Errou")
            }
        } catch (error) {
            showLog(error)
            console.log(error)
            showLog2("verificarCaixotePositivo")
        }
    },
    resetarOpcoesCaixote: function () {
        try {
            this.caixaSustentavel.removeEventListener('collisionstarted', this.verificarCaixotePositivo)
            this.caixaNaoSustentavel.removeEventListener('collisionstarted', this.verificarCaixoteNegativo)
            this.reiniciarGoal()
            this.el.emit('liberarmodelo')
        } catch (error) {
            showLog(error)
            console.log(error)
            showLog2("resetarOpcoesCaixote")
        }
    },
})

AFRAME.registerComponent('pontuacao', {
    init: function () {
        try {
            this.bindMethods()
            this.manipulador = new ManipuladorObjects(this.el)

            let buttonStart = document.querySelector('#button-start-contato')
            let temporizador = document.querySelector('#tempo')

            temporizador.addEventListener('tempoesgotado', this.pararContabilizador)
            buttonStart.addEventListener('startgame', this.contabilizarPlacar)
        } catch (error) {
            showLog(error)
        }
    },
    bindMethods: function () {
        this.contabilizarPlacar = this.contabilizarPlacar.bind(this)
        this.zerarPlacar = this.zerarPlacar.bind(this)
        this.pararContabilizador = this.pararContabilizador.bind(this)
    },
    contabilizarPlacar: function () {
        const self = this
        pontuacao = 0

        this.contabilizador = setInterval(function () {
            if (pontuacao >= pontuacaoFinal) {
                clearInterval(self.contabilizador)
                somSucess.components.sound.playSound()
                showPontuacaoAtingida()
                self.el.emit('pontuacaoatingida')
                return
            }
        }, 100);
    },
    zerarPlacar: function () {
        pontuacao = 0
    },
    pararContabilizador: function () {
        clearInterval(this.contabilizador)
    }
});



