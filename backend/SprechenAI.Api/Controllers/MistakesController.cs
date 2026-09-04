using Microsoft.AspNetCore.Mvc;
using SprechenAI.Api.Contracts;
using SprechenAI.Api.Services;

namespace SprechenAI.Api.Controllers;

[ApiController]
[Route("api/mistakes")]
public sealed class MistakesController(IProgressService service) : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<MistakeResponse>> Get() => Ok(service.GetMistakes());
}
