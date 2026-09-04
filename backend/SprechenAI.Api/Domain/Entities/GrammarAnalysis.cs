namespace SprechenAI.Api.Domain.Entities;

public sealed class GrammarAnalysis : BaseEntity
{
    public Guid MessageId { get; set; }
    public required string SelectedPhrase { get; set; }
    public string? BaseNoun { get; set; }
    public string? BaseArticle { get; set; }
    public string? GrammaticalCase { get; set; }
    public required string Explanation { get; set; }
    public string? ArticleTransformation { get; set; }
    public string? GrammarLabelsJson { get; set; }

    public Message? Message { get; set; }
}

