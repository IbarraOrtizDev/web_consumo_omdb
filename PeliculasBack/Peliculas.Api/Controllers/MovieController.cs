
using Microsoft.AspNetCore.Mvc;
using Peliculas.Application.DTOs;
using Peliculas.Application.DTOs.ResponseById;
using Peliculas.Application.DTOs.ResponseByNameList;
using Peliculas.Application.Interface;

namespace Peliculas.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieController : Controller
    {
        private readonly ISearchOmdbApiService _searchOmdbApiService;

        public MovieController(ISearchOmdbApiService searchOmdbApiService)
        {
            _searchOmdbApiService = searchOmdbApiService;
        }

        [HttpGet(Name = "ByName")]
        public async Task<ResponseListOmdbApiDto> getByName([FromQuery] SearchOmdbApiByNameDto search)
        {
            return await _searchOmdbApiService.SearchMoviesByName(search);
        }
        [HttpGet("{id}")]
        public async Task<ResponseByIdOmdbApiDto> getById(string id)
        {
            return await _searchOmdbApiService.SearchMovieById(id);
        }
    }
}
