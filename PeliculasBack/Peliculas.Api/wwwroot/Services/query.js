import env from '../env.js'
class QueryApi{
    static async getById(id){
        let movie = await fetch(env.url+id)
        if(movie.status === 200) return await movie.json()
        return {}
    }
    static async getByName(name, page){
        let movie = await fetch(env.url+'?movieName='+name+'&page='+page)
        if(movie.status === 200) return await movie.json()
        return {}
    }
}

export default QueryApi