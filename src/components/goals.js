


AFRAME.registerComponent('goal-object-left', {
    schema: {
        toPosition: { default: '0 0 16.15' },
    },
    init: function () {
        this.initialPosition = "0 1.7 -63.14484"

        this.el.setAttribute('animation', {
            property: 'position',
            to: this.schema.toPosition,
            dur: 5500,
            easing: 'linear',
            loop: false
        })
    },
    bindMethods: function () {

    },

});

AFRAME.registerComponent('goal-object-right', {
    schema: {
        toPosition: { default: '0 0 16.15' },
    },
    init: function () {
        this.el.setAttribute('animation', {
            property: 'position',
            to: `0 0 0`,
            dur: 5500,
            easing: 'linear',
            loop: false
        })
    },
    bindMethods: function () {

    },

});



