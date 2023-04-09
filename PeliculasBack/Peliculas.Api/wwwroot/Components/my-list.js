import QueryApi  from '../Services/query.js'
export class MyList extends HTMLElement{
    style =/*css*/`
    .content{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: #00000021;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content>div{
        max-width: 400px;
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        max-height: 80vh;
        overflow-y: scroll;
        display:grid;
        grid-template-rows:40px 1fr
    }
    .sombra{
        box-shadow: 0px 3px 5px 3px #E0E0E0;
    }
    .closed {
        display:flex;
        justify-content:end
    }
    .closed>div {
        padding: 5px;
        line-height: 20px;
        width: 20px;
        text-align: center;
        cursor: pointer;
        border-radius: 50%;
        color: red;
        font-size: 24px;
    }
    `
    constructor(){
        super()
        this.attachShadow({mode:'open'})
    }
    async connectedCallback() {
        this.visible = false;
        let show= this.getAttribute('show')
        if(show !== null && show === "1"){
            this.visible=true;
            this.render()
            this.asignarLista(await this.organizarList())
        }

        //JSON.stringify(listaPeliculas.search)
    }
    async asignarLista(data){
        if(data[0] === "") data.shift()
        this.shadowRoot.getElementById("moviesList2").setAttribute("movies", JSON.stringify(data))
    }
    async organizarList(){
        let myList = localStorage.getItem('moviesSelect')
        return Promise.all(await myList.split(',').map(async ele=>{
            if(ele === '') return ''
            return await QueryApi.getById(ele)
        }))
    }
    
    render(){
        this.shadowRoot.innerHTML=/*html*/`<style>${this.style}</style><div id="content" class="content">
            <div class="sombra">
                <div class="closed">
                    <div id="closed">X</div>
                </div>
                <list-movies id="moviesList2" btn="0" movies="[]"></list-movies>
            </div>
        </div>`
        this.shadowRoot.getElementById('content').addEventListener('click', (event)=>{
            if(event.target.getAttribute('id') === "content"){
                this.closeList()
            }
        })
        this.shadowRoot.getElementById('closed').addEventListener('click', (event)=>{
            this.closeList()
        })
        this.shadowRoot.getElementById('moviesList2').addEventListener('ver-todo', (event)=>{
            const verAllEvent = new CustomEvent("ver-todo", {
                detail:event.detail,
                composed:true,
                bubbles:true
            })
            this.dispatchEvent(verAllEvent)
         })
    }
    static get observedAttributes() { return ['show']; }

    async attributeChangedCallback(name, oldValue, newValue) {
        if(name === "show"){
            if(newValue === "1"){
                this.render()
                this.asignarLista(await this.organizarList())
            }else{
                this.closeList()
            }
        }
        
    }
    
    closeList(){
        this.setAttribute('show', '0')
        this.shadowRoot.innerHTML = ''
    }
}

customElements.define('my-list', MyList)