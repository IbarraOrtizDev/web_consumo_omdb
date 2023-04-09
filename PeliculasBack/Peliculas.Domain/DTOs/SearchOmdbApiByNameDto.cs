namespace Peliculas.Domain.DTOs
{
    public class SearchOmdbApiByNameDto
    {
        public string movieName { get; set; } = String.Empty;
        public int page { get; set; } = 1;
    }
}
