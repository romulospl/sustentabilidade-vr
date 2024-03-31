import './src/components/goals'
import './src/components/startButton'
import './src/system/collision-detector'
import './src/components/temporizador'

let somAmbiente = document.querySelector('#fundo-sound')
let atributo = 'src: #fundo-sound-model;autoplay: true; volume: 0.2; loop: true'

setTimeout(() => somAmbiente.setAttribute('sound', atributo), 2000)
