using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using SprechenAI.Api.Configuration;
using SprechenAI.Api.Data;
using SprechenAI.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var connectionString = builder.Configuration.GetConnectionString("Postgres")
    ?? throw new InvalidOperationException("Connection string 'Postgres' is not configured.");

builder.Services.AddDbContext<SprechenAiDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddProblemDetails();
builder.Services.Configure<OpenAiOptions>(builder.Configuration.GetSection(OpenAiOptions.SectionName));
builder.Services.AddScoped<IConversationService, ConversationService>();
builder.Services.AddScoped<IProgressService, ProgressService>();
builder.Services.AddHttpClient<IAiConversationClient, OpenAiConversationClient>(client =>
    client.Timeout = TimeSpan.FromSeconds(60));

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins(builder.Configuration["Frontend:Origin"] ?? "http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseExceptionHandler();
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseCors("Frontend");
app.MapControllers();

app.Run();

public partial class Program;
