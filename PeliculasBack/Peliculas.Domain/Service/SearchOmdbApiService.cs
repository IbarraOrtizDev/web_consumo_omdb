using Peliculas.Domain.DTOs;
using Peliculas.Domain.DTOs.ResponseById;
using Peliculas.Domain.DTOs.ResponseByNameList;
using Peliculas.Domain.Interface;

namespace Peliculas.Domain.Service
{
    public class SearchOmdbApiService : ISearchOmdbApiService
    {
        private readonly IOmdbRepository _omdbRepository;

        public SearchOmdbApiService(IOmdbRepository omdbRepository)
        {
            _omdbRepository = omdbRepository;
        }

        public async Task<ResponseByIdOmdbApiDto> SearchMovieById(string parameterId)
        {
            var uriComplement = $"&i={parameterId}&plot=full";
            return await _omdbRepository.SearchById(uriComplement);
        }

        public async Task<ResponseListOmdbApiDto> SearchMoviesByName(SearchOmdbApiByNameDto parameterQueryByName)
        {
            var uriComplement = "&s=" + parameterQueryByName.movieName+"&page="+parameterQueryByName.page;

            return await _omdbRepository.SearchByName(uriComplement);
        }
    }
}
