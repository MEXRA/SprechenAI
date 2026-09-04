namespace SprechenAI.Api.Domain.Entities;

public sealed class Message : BaseEntity
{
    public Guid ConversationId { get; set; }
    public required string Role { get; set; }
    public required string GermanText { get; set; }
    public string? TurkishTranslation { get; set; }

    public Conversation? Conversation { get; set; }
    public GrammarAnalysis? GrammarAnalysis { get; set; }
}

