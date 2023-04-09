export class InputSearch extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode:'open'})
    }
    connectedCallback() {

        this.shadowRoot.innerHTML=/*html*/`
        <style>
            *{
                margin: 0px;
                padding:0px;
                font-size: 18px;
                font-family: Arial, Helvetica, sans-serif;
                letter-spacing: 0.5px;
            }
            .input-search {
                max-width: 400px;
                width: 100%;
            }
            .input-search>input{
                height: 40px;
                outline: none;
                border: none;
                border-radius: 20px 0px 0px 20px;
                width: 100%;
                box-sizing: border-box;
                padding-left:15px;
            }

            .content-search{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
            }
            .icon-search{
                background-color: white;
                height: 40px;
                border-radius: 0px 20px 20px 0px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-right: 10px;
                cursor: pointer;
            }
            .icon-search svg {
                fill: var(--cl-gris-oscuro)
            }
        </style>
        <div class="content-search">
            <div class="input-search">
                <input type="text" id="search" placeholder="Search"/>
            </div>
            <div class="icon-search" id="searchBtn">
                <svg style="width:30px" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>
            </div>
        </div>`
        this.shadowRoot.getElementById('searchBtn').addEventListener('click', ()=>{
            let valor = this.shadowRoot.getElementById('search').value
            const searchEvent = new CustomEvent("search-movie", {
                detail:valor,
                composed:true,
                bubbles:true
            })
            this.dispatchEvent(searchEvent)
        })
    }
}

customElements.define('search-movies', InputSearch)