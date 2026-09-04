using SprechenAI.Api.Contracts;

namespace SprechenAI.Api.Services;

public interface IAiConversationClient
{
    Task<MessageResponse> ReplyAsync(AiCoachRequest request, CancellationToken cancellationToken);
    Task<GrammarAnalysisResponse> AnalyzeAsync(AnalyzeGrammarRequest request, CancellationToken cancellationToken);
}

public sealed record AiCoachRequest(
    string Scenario,
    string LearningLevel,
    string ExplanationDetail,
    IReadOnlyList<MessageResponse> History,
    string UserText);
