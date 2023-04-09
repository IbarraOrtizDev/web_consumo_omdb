using Peliculas.Application.DTOs;
using Peliculas.Application.DTOs.ResponseById;
using Peliculas.Application.DTOs.ResponseByNameList;

namespace Peliculas.Application.Interface
{
    public interface ISearchOmdbApiService
    {
        public Task<ResponseListOmdbApiDto> SearchMoviesByName(SearchOmdbApiByNameDto parameterQueryByName);
        public Task<ResponseByIdOmdbApiDto> SearchMovieById(string parameterId);
    }
}
