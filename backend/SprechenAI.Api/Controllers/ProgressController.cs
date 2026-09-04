using Microsoft.AspNetCore.Mvc;
using SprechenAI.Api.Contracts;
using SprechenAI.Api.Services;

namespace SprechenAI.Api.Controllers;

[ApiController]
[Route("api/progress")]
public sealed class ProgressController(IProgressService service) : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<ProgressTopicResponse>> Get() => Ok(service.GetProgress());
}

