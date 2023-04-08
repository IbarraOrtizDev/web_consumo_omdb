namespace Peliculas.Infraestructure.Config
{
    public class UrlConfig
    {
        public UrlConfig(string url, string apikey)
        {
            this.url = $"{url}?apikey={apikey}";
        }

        public string url { get; set; }
    }
}
