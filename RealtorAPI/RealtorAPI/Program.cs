using Microsoft.EntityFrameworkCore;
using Realtor.BLL.AutoMapper;
using Realtor.BLL.Interfaces;
using Realtor.BLL.Service;
using Realtor.DAL.EF;
using Realtor.DAL.Repositories;
using Realtor.DAL.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder();

// Add services to the container.
builder.Services.AddAutoMapper(typeof(ApartmentProfile).Assembly);
builder.Services.AddControllers();
//DbContext
builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//Repositories
builder.Services.AddScoped<IApartmentsRepository, ApartmentRepository>();
//Service
builder.Services.AddScoped<IApartmentService, ApartmentService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
