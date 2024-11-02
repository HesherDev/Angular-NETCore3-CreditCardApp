using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using FBTarjeta;

var builder = WebApplication.CreateBuilder(args);

// Agregar el servicio de Entity Framework Core con SQL Server
builder.Services.AddDbContext<AplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Agregar servicios al contenedor
builder.Services.AddControllers();

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", policy =>
        policy.WithOrigins("http://localhost:4200")  // Cambia el origen a HTTP si tu app Angular está en desarrollo
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials()); // Permitir credenciales
});

// Configurar Swagger con opciones adicionales
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "FBTarjeta API", Version = "v1" });
    c.EnableAnnotations(); // Activa las anotaciones para permitir ejemplos en modelos
});

var app = builder.Build();

// Configurar el pipeline de solicitudes HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Asegúrate de que UseCors esté antes de UseAuthorization
app.UseCors("AllowOrigin");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
