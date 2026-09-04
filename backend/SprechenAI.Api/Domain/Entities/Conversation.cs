namespace SprechenAI.Api.Domain.Entities;

public sealed class Conversation : BaseEntity
{
    public Guid UserId { get; set; }
    public required string Scenario { get; set; }
    public string LearningLevel { get; set; } = "A2";
    public string ExplanationDetail { get; set; } = "Deep";
    public DateTimeOffset? CompletedAt { get; set; }

    public User? User { get; set; }
    public ICollection<Message> Messages { get; set; } = [];
}

