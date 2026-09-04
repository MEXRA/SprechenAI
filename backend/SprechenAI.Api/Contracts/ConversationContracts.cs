namespace SprechenAI.Api.Contracts;

public sealed record CreateConversationRequest(string Scenario, string LearningLevel = "A2", string ExplanationDetail = "Deep");

public sealed record ConversationResponse(
    Guid Id,
    string Scenario,
    string LearningLevel,
    string ExplanationDetail,
    IReadOnlyList<MessageResponse> Messages);

public sealed record SendMessageRequest(Guid ConversationId, string Text);

public sealed record MessageResponse(
    Guid Id,
    string Role,
    string GermanText,
    string? TurkishTranslation,
    CorrectionResponse? Correction = null);

public sealed record CorrectionResponse(
    bool IsCorrect,
    string? CorrectedGerman,
    string ExplanationTurkish,
    IReadOnlyList<MistakeDetailResponse> Mistakes);

public sealed record MistakeDetailResponse(
    string Incorrect,
    string Correct,
    string Category,
    string RuleTurkish,
    string ExplanationTurkish);
