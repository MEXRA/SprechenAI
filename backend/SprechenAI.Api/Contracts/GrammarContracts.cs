namespace SprechenAI.Api.Contracts;

public sealed record AnalyzeGrammarRequest(string Sentence, string? SelectedPhrase = null, string ExplanationDetail = "Deep");

public sealed record GrammarAnalysisResponse(
    string SelectedPhrase,
    string? BaseNoun,
    string? BaseArticle,
    string Case,
    string Reason,
    string? ArticleTransformation,
    string GrammarRule,
    string Example,
    string Meaning,
    IReadOnlyList<string> Labels);

