using Newtonsoft.Json;
using Peliculas.Domain.DTOs.ResponseById;
using Peliculas.Domain.DTOs.ResponseByNameList;
using Peliculas.Domain.Interface;
using Peliculas.Infraestructure.Config;

namespace Peliculas.Infraestructure.Adapters
{
    public class OmdbRepository : IOmdbRepository
    {
        private readonly IHttpClientFactory _httpClient;
        private readonly string _urlConfig="";

        public OmdbRepository(
            IHttpClientFactory httpClient,
            UrlConfig urlConfig
        )
        {
            _httpClient = httpClient;
            _urlConfig = urlConfig.url;
        }

        public async Task<ResponseListOmdbApiDto> SearchByName(string parameterQuery)
        {
            var client = _httpClient.CreateClient();
            var response = await client.GetAsync(_urlConfig + "&" + parameterQuery);
            if (response.IsSuccessStatusCode)
            {
                string responseText = await response.Content.ReadAsStringAsync();
                var responseListOmdbApiDto = JsonConvert.DeserializeObject<ResponseListOmdbApiDto>(responseText);
                return responseListOmdbApiDto ?? throw new Exception("Error deserializando objeto");
            }

            throw new Exception(await response.Content.ReadAsStringAsync());

        }

        public async Task<ResponseByIdOmdbApiDto> SearchById(string parameterQuery)
        {
            var client = _httpClient.CreateClient();
            var response = await client.GetAsync(_urlConfig + "&" + parameterQuery);
            if (response.IsSuccessStatusCode)
            {
                string responseText = await response.Content.ReadAsStringAsync();
                var responseListOmdbApiDto = JsonConvert.DeserializeObject<ResponseByIdOmdbApiDto>(responseText);
                return responseListOmdbApiDto ?? throw new Exception("Error deserializando objeto");
            }

            throw new Exception(await response.Content.ReadAsStringAsync());
        }
    }
}
