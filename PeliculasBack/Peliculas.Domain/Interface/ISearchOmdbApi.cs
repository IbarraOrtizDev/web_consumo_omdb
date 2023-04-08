using Peliculas.Domain.DTOs;
using Peliculas.Domain.DTOs.ResponseById;
using Peliculas.Domain.DTOs.ResponseByNameList;

namespace Peliculas.Domain.Interface
{
    public interface ISearchOmdbApi
    {
        public Task<ICollection<ResponseListOmdbApiDto>> SearchMoviesByName(SearchOmdbApiByNameDto parameterQueryByName);
        public Task<ResponseByIdOmdbApiDto> SearchMovieById(SearchOmdbApiByIdDto parameterQueryById);
    }
}
