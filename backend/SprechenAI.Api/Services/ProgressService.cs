using SprechenAI.Api.Contracts;

namespace SprechenAI.Api.Services;

public sealed class ProgressService : IProgressService
{
    public IReadOnlyList<ProgressTopicResponse> GetProgress() =>
    [
        new("Akkusativ", 76), new("Dativ", 58), new("Articles", 67),
        new("Possessivartikel", 51), new("Word Order", 84), new("Prepositions", 46)
    ];

    public IReadOnlyList<MistakeResponse> GetMistakes() =>
    [
        new("mit meinen Freund", "mit meinem Freund", "Dativ", 4, "mit requires Dativ; masculine possessive mein becomes meinem.")
    ];
}

