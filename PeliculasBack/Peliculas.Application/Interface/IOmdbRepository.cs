using Peliculas.Application.DTOs.ResponseById;
using Peliculas.Application.DTOs.ResponseByNameList;

namespace Peliculas.Application.Interface
{
    public interface IOmdbRepository
    {
        public Task<ResponseListOmdbApiDto> SearchByName(string parameterQuery);
        public Task<ResponseByIdOmdbApiDto> SearchById(string parameterQuery);
    }
}
