using System.Collections.Concurrent;
using SprechenAI.Api.Contracts;

namespace SprechenAI.Api.Services;

public sealed class ConversationService(IAiConversationClient aiClient) : IConversationService
{
    private static readonly ConcurrentDictionary<Guid, ConversationState> Conversations = new();

    public ConversationResponse Create(CreateConversationRequest request)
    {
        var scenario = string.IsNullOrWhiteSpace(request.Scenario) ? "Günlük hayat" : request.Scenario.Trim();
        var greeting = new MessageResponse(
            Guid.NewGuid(),
            "coach",
            $"Hallo! Heute sprechen wir über „{scenario}“. Erzähl mir etwas dazu!",
            $"Merhaba! Bugün “{scenario}” hakkında konuşacağız. Bana bununla ilgili bir şey anlat!");
        var state = new ConversationState(
            Guid.NewGuid(),
            scenario,
            NormalizeLevel(request.LearningLevel),
            NormalizeDetail(request.ExplanationDetail),
            [greeting]);
        Conversations[state.Id] = state;
        return state.ToResponse();
    }

    public ConversationResponse? Get(Guid id) =>
        Conversations.TryGetValue(id, out var state) ? state.ToResponse() : null;

    public async Task<MessageResponse?> SendMessageAsync(SendMessageRequest request, CancellationToken cancellationToken)
    {
        if (!Conversations.TryGetValue(request.ConversationId, out var state))
        {
            return null;
        }

        await state.Gate.WaitAsync(cancellationToken);
        try
        {
            var userMessage = new MessageResponse(Guid.NewGuid(), "user", request.Text.Trim(), null);
            var history = state.Messages.ToArray();
            var coachMessage = await aiClient.ReplyAsync(
                new AiCoachRequest(state.Scenario, state.LearningLevel, state.ExplanationDetail, history, userMessage.GermanText),
                cancellationToken);

            state.Messages.Add(userMessage);
            state.Messages.Add(coachMessage);
            return coachMessage;
        }
        finally
        {
            state.Gate.Release();
        }
    }

    private static string NormalizeLevel(string level) =>
        level is "A1" or "A2" or "B1" or "B2" ? level : "A2";

    private static string NormalizeDetail(string detail) =>
        detail is "Quick" or "Normal" or "Deep" ? detail : "Deep";

    private sealed class ConversationState(
        Guid id,
        string scenario,
        string learningLevel,
        string explanationDetail,
        List<MessageResponse> messages)
    {
        public Guid Id { get; } = id;
        public string Scenario { get; } = scenario;
        public string LearningLevel { get; } = learningLevel;
        public string ExplanationDetail { get; } = explanationDetail;
        public List<MessageResponse> Messages { get; } = messages;
        public SemaphoreSlim Gate { get; } = new(1, 1);

        public ConversationResponse ToResponse() =>
            new(Id, Scenario, LearningLevel, ExplanationDetail, Messages.ToArray());
    }
}
