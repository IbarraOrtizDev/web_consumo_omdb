export class ViewMovie extends HTMLElement{
    constructor(){
        super()
        this.movie = {}
    }
    connectedCallback() {
        this.innerHTML=this.renderHtml()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "movie"){
            this.movie = JSON.parse(newValue)
            this.innerHTML = this.renderHtml()
        }
        
    }
    static get observedAttributes() { return ['movie']; }

    renderHtml(){
        if(!this.movie.title) return 'Selecte a movie for view more information about it'
        return /*html*/`<div>
                    <img src="${this.movie.poster}" alt="">
                </div>
                <h1>${this.movie.title}</h1>
                <div>${this.movie.year} - ${this.movie.rated} - ${this.movie.runtime}</div>
                <br>
                <p>
                    <b>Actors: </b> ${this.movie.actors}
                </p>
                <br>
                <p>
                    <b>Plot: </b> ${this.movie.plot}
                </p>
                <br>
                <div>
                    <p><b>Rattings</b></p>
                    <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:10px">
                        ${this.ratings(this.movie.ratings)}
                    </div>
                </div>
                <br>
                <p>
                    <b>Box Office: </b> ${this.movie.boxOffice}
                </p>
                <br>
                <p>
                    <b>Awards: </b> ${this.movie.awards}
                </p>
                <br>
                <p>
                    <b>Country: </b> ${this.movie.country}
                </p>
                <br>
                <p>
                    <b>Language: </b> ${this.movie.language}
                </p>`
    }
    ratings(ratings){
        return ratings.map(rating=>{
            let porcentaje = rating.value
            if(rating.value.search('10') !== -1 && rating.value.search('%') === -1){
                let num = rating.value.split('/')
                porcentaje = num[1] === "100" ? num[0]+'%' : (parseFloat(num[0])*10)+'%'
            }
            return `<div class="sombra" style="background-color:white;width:100px;padding:10px;border-radius:10px">
            <div style="text-align:center; color:#2EA2F6">
              ${porcentaje}
            </div>
            <div style="font-size:10px; padding-top:10px; text-align:center;">
              ${rating.source}
            </div>
          </div>`
        }).join('')
    }
}

customElements.define('view-movie', ViewMovie)