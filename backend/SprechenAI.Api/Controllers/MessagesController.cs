using Microsoft.AspNetCore.Mvc;
using SprechenAI.Api.Contracts;
using SprechenAI.Api.Services;

namespace SprechenAI.Api.Controllers;

[ApiController]
[Route("api/messages")]
public sealed class MessagesController(IConversationService service) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<MessageResponse>> Send(SendMessageRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Text))
        {
            return BadRequest(new { message = "Mesaj boş olamaz." });
        }

        try
        {
            var response = await service.SendMessageAsync(request, cancellationToken);
            return response is null ? NotFound(new { message = "Konuşma bulunamadı." }) : Ok(response);
        }
        catch (OpenAiNotConfiguredException exception)
        {
            return Problem(exception.Message, statusCode: StatusCodes.Status503ServiceUnavailable, title: "OpenAI bağlantısı hazır değil");
        }
        catch (OpenAiServiceException exception)
        {
            return Problem(exception.Message, statusCode: StatusCodes.Status502BadGateway, title: "AI servisine ulaşılamadı");
        }
    }
}
