using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SprechenAI.Api.Configuration;

namespace SprechenAI.Api.Controllers;

[ApiController]
[Route("api/config")]
public sealed class ConfigurationController(IOptions<OpenAiOptions> options) : ControllerBase
{
    [HttpGet("status")]
    public IActionResult GetStatus() => Ok(new
    {
        aiConfigured = !string.IsNullOrWhiteSpace(options.Value.ApiKey),
        model = options.Value.Model
    });
}
