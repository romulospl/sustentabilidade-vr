export function isCollision(area, target) {
    if (area == '') return
    var areaTridimensional = area;
    var objetoPosicao = target.object3D.position.clone(); // Posição do objeto
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
        return true
    } else {
        return false
    }
}