using Peliculas.Api.Controllers;

namespace TestApi
{
    public class Tests
    {
        private MovieController controller;

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            Assert.Pass();
        }
    }
}