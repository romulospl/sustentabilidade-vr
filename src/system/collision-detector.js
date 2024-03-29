import { showLog } from '@/system/showLogs'


AFRAME.registerComponent('collision', {
    schema: {
        area: { default: '' },
    },
    tick: function () {
        if (this.data.area == '') return
        var areaTridimensional = document.querySelector(`${this.data.area}`);

        if(!areaTridimensional) return
        var objetoPosicao = this.el.object3D.position.clone(); // Posição do objeto
        var areaTridimensionalPosicao = areaTridimensional.object3D.position.clone(); // Posição da área tridimensional
        var areaTridimensionalEscala = areaTridimensional.getAttribute('scale').clone(); // Escala da área tridimensional

        if (
            objetoPosicao.x >= areaTridimensionalPosicao.x - areaTridimensionalEscala.x / 2 &&
            objetoPosicao.x <= areaTridimensionalPosicao.x + areaTridimensionalEscala.x / 2 &&
            objetoPosicao.y >= areaTridimensionalPosicao.y - areaTridimensionalEscala.y / 2 &&
            objetoPosicao.y <= areaTridimensionalPosicao.y + areaTridimensionalEscala.y / 2 &&
            objetoPosicao.z >= areaTridimensionalPosicao.z - areaTridimensionalEscala.z / 2 &&
            objetoPosicao.z <= areaTridimensionalPosicao.z + areaTridimensionalEscala.z / 2
        ) {
            this.el.emit('collisionstarted'); // emite o inicio da colisão
        } else {
            // this.el.emit('isnotcolision');
            this.el.emit('collisionended'); // emite o fim da colisão
        }

    }
});