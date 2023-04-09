export class ListMovies extends HTMLElement{
    style = /*css*/`
        img{
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
        }
        .list-item{
            display: grid;
            grid-template-columns: 150px 1fr;
            grid-gap: 10px;
            padding: 15px;
            background-color: white;
            margin: 15px;
            border-radius: 10px;
        }
        .text-list-item {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 15px 0px;
            position: relative;
        }
        .sombra{
            box-shadow: 0px 3px 5px 3px #E0E0E0;
        }
        .centrar-imagen{
            display: flex;
            align-items: center;
        }
        
        .btn-content{
            display:flex;
            gap:5px
        }
        .btn-content>div{
            padding:5px 10px;
            border-radius:5px;
            color:white;
            background-color:#2EA2F6;
            font-size:14px;
            cursor:pointer;
        }
        .btn-content>div:hover{
            box-shadow:none
        }
        @media(max-width:460px) {
            .list-item{
                display:flex;
                flex-direction:column;
            }
            .centrar-imagen{
                display:block;
                text-align:center
            }
            .text-list-item{
                display:block;
                padding-top:0px
            }
        }
    `
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        let moviesSelect = localStorage.getItem("moviesSelect")
        if(moviesSelect === null){
            localStorage.setItem("moviesSelect", "")
            this.moviesMe = []
        }else{
            this.moviesMe = moviesSelect.split(',')
        }
        let btn = this.getAttribute('btn')
        this.verBtn = true
        if(btn !== null && btn === "0"){
            console.log('r')
            this.verBtn = false
        }
        this.listMovies = [];
        this.imagenError = 'https://static.vecteezy.com/system/resources/previews/012/942/784/non_2x/broken-image-icon-isolated-on-a-white-background-no-image-symbol-for-web-and-mobile-apps-free-vector.jpg'
    }
    connectedCallback() {
        this.innerHTML = /*html*/`<div>Cargando información...</div>`
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "movies" && newValue !== "undefined"){
            this.listMovies = JSON.parse(newValue)
            this.organizarLista()
        }
    }
    organizarLista(){
        this.shadowRoot.innerHTML = this.listMovies.map((dat, index)=> /*html*/`
            <div class="list-item sombra" id="${index}">
                <style>${this.style}</style>
                <div class="centrar-imagen">
                    <img src="${dat.poster === 'N/A' ? this.imagenError : dat.poster}">
                </div>
                <div class="text-list-item">
                    <p>
                        <b>Name:</b> ${dat.title}
                    </p>
                    <p>
                        <b>Category:</b> ${dat.type}
                    </p>
                    <p>
                        <b>Year publication:</b> ${dat.year}
                    </p>
                    <div class="btn-content">
                        <div class="more sombra" id="${index}">See more</div>
                        ${this.validarSelect(dat.imdbID)}
                    </div>
                </div>
            </div>
        `).join('')
        this.shadowRoot.querySelectorAll('.more').forEach(element=>{
            element.addEventListener('click', (event)=>{this.clickViewAll(element.getAttribute("id"))})
        });
        this.shadowRoot.querySelectorAll('.addList').forEach(element=>{
            element.addEventListener('click', (event)=>{this.clickAddRemoveToList(element.getAttribute("id"))})
        });
    }
    validarSelect(id){
        let index = this.moviesMe.findIndex(x=> x===id)
        if(!this.verBtn) return '' 
        if(index !== -1){
            return `<svg class="addList" id="${id}" style="width:25px; position:absolute; right:10px; bottom:10px;fill:#ffd27d" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="info"/><g id="icons"><path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z" id="favorite"/></g></svg>`
        }else{
            return `<div class="addList sombra" id="${id}">Add to list</div>`
        }
    }
    clickViewAll(id){
        const verAllEvent = new CustomEvent("ver-todo", {
            detail:this.listMovies[id],
            composed:true,
            bubbles:true
        })
        this.dispatchEvent(verAllEvent)
    }
    clickAddRemoveToList(id){
        let index = this.moviesMe.findIndex(x=> x===id)
        if(index === -1){
            this.moviesMe.push(id)
            localStorage.setItem("moviesSelect", this.moviesMe.join(','))
            this.organizarLista()
        }else{
            this.moviesMe.splice(index,1)
            localStorage.setItem("moviesSelect", this.moviesMe.join(','))
            this.organizarLista()
        }
    }
    static get observedAttributes() { 
        return ['movies']; 
    }
}

customElements.define('list-movies', ListMovies)