using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SprechenAI.Api.Data;

namespace SprechenAI.Api.Controllers;

[ApiController]
[Route("health")]
public sealed class HealthController(SprechenAiDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { status = "healthy", service = "SprechenAI.Api", utc = DateTimeOffset.UtcNow });

    [HttpGet("database")]
    public async Task<IActionResult> GetDatabase(CancellationToken cancellationToken)
    {
        var canConnect = await dbContext.Database.CanConnectAsync(cancellationToken);
        return canConnect
            ? Ok(new { status = "healthy", database = "PostgreSQL" })
            : StatusCode(StatusCodes.Status503ServiceUnavailable, new { status = "unhealthy", database = "PostgreSQL" });
    }
}

