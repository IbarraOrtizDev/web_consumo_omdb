namespace Peliculas.Application.DTOs.ResponseByNameList
{
    public class ResponseListOmdbApiDto
    {
        public ICollection<ResponseMovieOmdbApiDtoSort>? Search { get; set; }
        public string totalResults { get; set; } = string.Empty;
        public string Response { get; set; } = string.Empty;
    }
}
