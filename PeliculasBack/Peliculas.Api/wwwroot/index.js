import * as inputSearch from './Components/input-search.js'
import * as listMovies from './Components/list-movies.js' 
import * as viewMovieEl from './Components/view-movie.js' 
import * as paginationList from './Components/pagination-list.js';
import * as myListElement from './Components/my-list.js';

import QueryApi  from './Services/query.js'
let listaPeliculas = {}
let viewMovie = {}

let name = "bat";
let page = 1;

 let moviesList= document.getElementById('moviesList')
 let contentMovieElement = document.getElementById('movieView')
 let paginationElement = document.getElementById('pagination')
 let search = document.getElementById('search')
 let closed = document.querySelector('.closed')
 let btnList = document.getElementById('btnViewList')
 let myList = document.getElementById('myList')

 paginationElement.setAttribute('total', listaPeliculas.totalResults)
 moviesList.setAttribute("movies", JSON.stringify(listaPeliculas.Search))
 contentMovieElement.setAttribute("movie", JSON.stringify(viewMovie))

 paginationElement.addEventListener('change-page', (event)=>{
    page = event.detail
    buscarMovieByName()
 })
 moviesList.addEventListener('ver-todo', (event)=>{
    buscarById(event.detail)
 })

 myList.addEventListener('ver-todo', (event)=>{
    buscarById(event.detail)
 })

 search.addEventListener('search-movie', (event)=>{
    name = event.detail
    buscarMovieByName()
 })

 btnList.addEventListener('click', ()=>{
    document.getElementById('myList').setAttribute('show','1')
 })

 closed.addEventListener('click', ()=>{
    document.querySelector('.movie-select').classList.add('display-none')
 })


async function buscarMovieByName(){
    let response = await QueryApi.getByName(name, page)
    listaPeliculas = response
    if(listaPeliculas.search === null){
        listaPeliculas = {
            "search": [],
            "totalResults": "0",
            "response": "False"
        }
    }
    paginationElement.setAttribute('total', listaPeliculas.totalResults)
    moviesList.setAttribute("movies", JSON.stringify(listaPeliculas.search))
}
async function buscarById(id){
    document.querySelector('.movie-select').classList.remove('display-none')
    let response = await QueryApi.getById(id.imdbID)
    viewMovie = response
    contentMovieElement.setAttribute("movie", JSON.stringify(viewMovie))
}

async function main(){
    await buscarMovieByName()
    contentMovieElement.setAttribute("movie", JSON.stringify(viewMovie))
}

main()