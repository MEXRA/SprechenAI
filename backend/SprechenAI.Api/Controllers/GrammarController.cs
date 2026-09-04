using Microsoft.AspNetCore.Mvc;
using SprechenAI.Api.Contracts;
using SprechenAI.Api.Services;

namespace SprechenAI.Api.Controllers;

[ApiController]
[Route("api/grammar")]
public sealed class GrammarController(IAiConversationClient client) : ControllerBase
{
    [HttpPost("analyze")]
    public async Task<ActionResult<GrammarAnalysisResponse>> Analyze(AnalyzeGrammarRequest request, CancellationToken cancellationToken) =>
        Ok(await client.AnalyzeAsync(request, cancellationToken));
}

