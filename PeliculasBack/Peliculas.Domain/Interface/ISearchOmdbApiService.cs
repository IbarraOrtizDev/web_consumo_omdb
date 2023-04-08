using Peliculas.Domain.DTOs;
using Peliculas.Domain.DTOs.ResponseById;
using Peliculas.Domain.DTOs.ResponseByNameList;

namespace Peliculas.Domain.Interface
{
    public interface ISearchOmdbApiService
    {
        public Task<ResponseListOmdbApiDto> SearchMoviesByName(SearchOmdbApiByNameDto parameterQueryByName);
        public Task<ResponseByIdOmdbApiDto> SearchMovieById(string parameterId);
    }
}
