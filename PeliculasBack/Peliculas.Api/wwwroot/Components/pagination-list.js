export class PaginationList extends HTMLElement{
    style = /*css*/`
        
        .flex{
            display:flex;
            gap:10px;
            justify-content:center
        }
        .content-btn>div{
            background-color:white;
            width:25px;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:5px;
            border-radius:5px
        }
        .content-btn>div:hover{
            background-color:#E0E0E0;
            cursor:pointer
        }
        .actualy {
            background-color:#2EA2F6 !important;
            color:white;
            cursor:none !important
        }
        .sombra{
            box-shadow: 0px 3px 5px 3px #E0E0E0;
        }
    `
    constructor(){
        super()
        this.attachShadow({mode:'open'})
        this.total = 1;
        this.actual = 1;
    }
    connectedCallback() {
        this.shadowRoot.innerHTML='Paginación'
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "total"){
            this.total= newValue === 'undefined' ? 0 : parseInt(newValue)
            this.numPages = this.total === 0 ? 1 : Math.ceil(this.total/10)
            this.ordenar()
        }
        
    }
    ordenar(){
        let data = /*html*/`
            <style>${this.style}</style>
            <div class="flex content-btn">
                <div class="sombra" id="reduce">
                    <svg style="width:25px" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"/></svg>
                </div>
                <div  class="sombra" id="first">${1}</div>
                <div  class="actualy sombra">${this.actual}</div>
                <div  class="sombra" id="end">${this.numPages??1}</div>
                <div  class="sombra" id="add">
                    <svg style="width:25px" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"/></svg>
                </div>
            </div>
        `
        this.shadowRoot.innerHTML=data
        this.paginar()
    }
    paginar(){
        this.shadowRoot.getElementById('reduce').addEventListener('click', ()=>{
            if(this.actual !== 1){
                this.actual= this.actual-1
                this.ordenar()
                this.changePage()
            }
        })
        this.shadowRoot.getElementById('first').addEventListener('click', ()=>{
            if(this.actual !== 1){
                this.actual = 1
                this.ordenar()
                this.changePage()
            }
        })

        this.shadowRoot.getElementById('end').addEventListener('click', ()=>{
            if(this.actual !== this.numPages){
                this.actual = this.numPages
                this.ordenar()
                this.changePage()
            }
        })
        this.shadowRoot.getElementById('add').addEventListener('click', ()=>{
            if(this.actual !== this.numPages){
                this.actual = this.actual+1
                this.ordenar()
                this.changePage()
            }
        })
    }
    static get observedAttributes() { return ['total']; }
    changePage(){
        const changePageEvent = new CustomEvent("change-page", {
            detail:this.actual,
            composed:true,
            bubbles:true
        })
        this.dispatchEvent(changePageEvent)
    }
}

customElements.define('pagination-list', PaginationList)