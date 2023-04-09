using Peliculas.Api.Controllers;
using Peliculas.Application.Interface;
using Peliculas.Application.Service;
using Peliculas.Infraestructure.Adapters;
using Microsoft.Extensions.Http;
using Xunit;
using Microsoft.Extensions.DependencyInjection;
using Peliculas.Infraestructure.Config;
using Peliculas.Application.DTOs;

namespace ApiTestUnit
{
    public class MovieTesting
    {
        private readonly MovieController _controller;
        private readonly ISearchOmdbApiService _service;
        private readonly IOmdbRepository _repository;


        public MovieTesting()
        {
            var services = new ServiceCollection();
            services.AddHttpClient();
            var serviceProvider = services.BuildServiceProvider();
            var _client = serviceProvider.GetService<IHttpClientFactory>();
            UrlConfig _config = new UrlConfig(
                "http://www.omdbapi.com",
                "7d164cc4"
             );

            _repository = new OmdbRepository(_client, _config);
            _service = new SearchOmdbApiService(_repository);
            _controller = new MovieController(_service);
        }

        [Fact]
        public async void Test0()
        {
            SearchOmdbApiByNameDto byName = new();
            byName.movieName = "";
            byName.page = 1;
            var respuesta = await _controller.getByName(byName);
            Assert.NotNull(respuesta);
            Assert.True(respuesta.Response == "False");
        }

        [Fact]
        public async void Test1()
        {
            SearchOmdbApiByNameDto byName = new();
            byName.movieName = "Batman";
            byName.page= 1;
            var respuesta = await _controller.getByName(byName);
            Assert.NotNull(respuesta);
            Assert.True(respuesta.Response == "True");
        }
        [Fact]
        public async void Test2()
        {
            SearchOmdbApiByNameDto byName = new();
            var respuesta = await _controller.getById("");
            Assert.NotNull(respuesta);
            Assert.True(respuesta.Response == "False");
        }
        [Fact]
        public async void Test3()
        {
            SearchOmdbApiByNameDto byName = new();
            var respuesta = await _controller.getById("tt0364980");
            Assert.NotNull(respuesta);
            Assert.True(respuesta.Response == "True");
        }
    }
}