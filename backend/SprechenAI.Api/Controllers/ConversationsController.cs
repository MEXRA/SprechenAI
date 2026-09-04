using Microsoft.AspNetCore.Mvc;
using SprechenAI.Api.Contracts;
using SprechenAI.Api.Services;

namespace SprechenAI.Api.Controllers;

[ApiController]
[Route("api/conversations")]
public sealed class ConversationsController(IConversationService service) : ControllerBase
{
    [HttpPost]
    public ActionResult<ConversationResponse> Create(CreateConversationRequest request)
    {
        var conversation = service.Create(request);
        return CreatedAtAction(nameof(Get), new { id = conversation.Id }, conversation);
    }

    [HttpGet("{id:guid}")]
    public ActionResult<ConversationResponse> Get(Guid id)
    {
        var conversation = service.Get(id);
        return conversation is null ? NotFound() : Ok(conversation);
    }
}

