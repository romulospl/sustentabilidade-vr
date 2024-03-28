import { manipuladorObjects } from '../util/manipuladorObjects'

const posicaoInicial = "0 1.7 -63.14484"

AFRAME.registerComponent('goal-object-left', {
    schema: {
        toPosition: { default: '0 0 16.15' },
    },
    init: function () {
        this.manipulador = new manipuladorObjects(this.el)
        this.manipulador.setPosition(posicaoInicial)

    },
    bindMethods: function () {

    },

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



