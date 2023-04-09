using Peliculas.Domain.Interface;
using Peliculas.Domain.Service;
using Peliculas.Infraestructure.Adapters;
using Peliculas.Infraestructure.Config;

var builder = WebApplication.CreateBuilder(args);

string[] origins = builder.Configuration.GetSection("Cross:UrlOrigins").Get<IEnumerable<string>>().ToArray();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builderx => builderx.WithOrigins(origins)
                            .AllowAnyHeader()
                            .WithMethods("GET", "POST", "PUT")
                            .AllowCredentials());
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Variables de entorno
string urlApiOmdb = Environment.GetEnvironmentVariable("URL_API_OMDB") ?? builder.Configuration.GetValue<string>("omdbApi:Url");
string apiKey = Environment.GetEnvironmentVariable("API_KEY_OMDB") ?? builder.Configuration.GetValue<string>("omdbApi:Key");

UrlConfig apiKeyConfig = new(urlApiOmdb, apiKey);
builder.Services.AddSingleton(x=>apiKeyConfig);


builder.Services.AddHttpClient();
builder.Services.AddTransient(typeof(IOmdbRepository), typeof(OmdbRepository));
builder.Services.AddTransient(typeof(ISearchOmdbApiService), typeof(SearchOmdbApiService));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
