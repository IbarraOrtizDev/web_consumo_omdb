using Peliculas.Domain.DTOs;
using Peliculas.Domain.DTOs.ResponseById;
using Peliculas.Domain.DTOs.ResponseByNameList;
using Peliculas.Domain.Interface;

namespace Peliculas.Domain.Service
{
    public class SearchOmdbApi : ISearchOmdbApi
    {
        public Task<ResponseByIdOmdbApiDto> SearchMovieById(SearchOmdbApiByIdDto parameterQueryById)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<ResponseListOmdbApiDto>> SearchMoviesByName(SearchOmdbApiByNameDto parameterQueryByName)
        {
            throw new NotImplementedException();
        }
    }
}
