using SprechenAI.Api.Contracts;

namespace SprechenAI.Api.Services;

public interface IConversationService
{
    ConversationResponse Create(CreateConversationRequest request);
    ConversationResponse? Get(Guid id);
    Task<MessageResponse?> SendMessageAsync(SendMessageRequest request, CancellationToken cancellationToken);
}
