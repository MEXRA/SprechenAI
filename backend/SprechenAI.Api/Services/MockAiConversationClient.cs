using SprechenAI.Api.Contracts;

namespace SprechenAI.Api.Services;

public sealed class MockAiConversationClient : IAiConversationClient
{
    public Task<MessageResponse> ReplyAsync(AiCoachRequest request, CancellationToken cancellationToken)
    {
        var containsMistake = request.UserText.Contains("mit meinen Freund", StringComparison.OrdinalIgnoreCase);
        var correction = containsMistake
            ? new CorrectionResponse(
                false,
                request.UserText.Replace("mit meinen Freund", "mit meinem Freund", StringComparison.OrdinalIgnoreCase),
                "‘mit’ edatı her zaman Dativ ister.",
                [new MistakeDetailResponse("mit meinen Freund", "mit meinem Freund", "Dativ", "mit + Dativ", "Eril Dativ'te mein → meinem olur.")])
            : new CorrectionResponse(true, null, "Cümlen doğru. Sohbete devam edebilirsin.", []);

        return Task.FromResult(new MessageResponse(
            Guid.NewGuid(),
            "coach",
            "Sehr gut! Was möchten Sie danach machen?",
            "Çok iyi! Daha sonra ne yapmak istersiniz?",
            correction));
    }

    public Task<GrammarAnalysisResponse> AnalyzeAsync(AnalyzeGrammarRequest request, CancellationToken cancellationToken)
    {
        var response = new GrammarAnalysisResponse(
            request.SelectedPhrase ?? "mit meinem Freund",
            "Freund",
            "der",
            "Dativ",
            "The preposition mit always requires Dativ.",
            "der Freund → dem Freund; mein Freund → meinem Freund",
            "Masculine possessive articles take -em in Dativ.",
            "Ich spreche mit meinem Bruder.",
            "with my friend · arkadaşımla",
            ["DAT", "PREPOSITION"]);

        return Task.FromResult(response);
    }
}
