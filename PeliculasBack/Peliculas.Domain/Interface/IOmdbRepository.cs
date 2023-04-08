using Peliculas.Domain.DTOs.ResponseById;
using Peliculas.Domain.DTOs.ResponseByNameList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Peliculas.Domain.Interface
{
    public interface IOmdbRepository
    {
        public Task<ResponseListOmdbApiDto> SearchByName(string parameterQuery);
        public Task<ResponseByIdOmdbApiDto> SearchById(string parameterQuery);
    }
}
