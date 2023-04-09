using Peliculas.Application.DTOs;
using Peliculas.Application.DTOs.ResponseById;
using Peliculas.Application.DTOs.ResponseByNameList;
using Peliculas.Application.Interface;

namespace Peliculas.Application.Service
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
