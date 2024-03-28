export class manipuladorObjects {

    constructor(elemento) {
        this.el = elemento
    }

    addAnimation(to, dur, property) {
        this.el.setAttribute('animation', {
            property: property || 'position',
            to: to || `0 0 0`,
            dur: dur || 5500,
            easing: 'linear',
            loop: false
        })
    }

    deleteAnimation() {
        this.el.removeAttribute('animation')
    }

    getElementId(){
        return this.el.getAttribute("id")
    }

    setPosition(to) {
        this.el.setAttribute('position', to)
    }

    getPosition() {
        return this.el.getAttribute('position')
    }

    addClass(classe) {
        this.el.classList.add(classe)
    }

    getDataset(dataset) {
        for (const chave in this.el.dataset) {
            if (this.el.dataset.hasOwnProperty(chave) && this.el.dataset.hasOwnProperty(dataset)) {
                const valor = this.el.dataset[chave];
                if(valor == 'true') return true
                if(valor == 'false') return false
                return valor
            }
        }
        return null
    }
}