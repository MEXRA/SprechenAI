namespace SprechenAI.Api.Domain.Entities;

public sealed class Mistake : BaseEntity
{
    public Guid UserId { get; set; }
    public required string IncorrectText { get; set; }
    public required string CorrectText { get; set; }
    public required string Topic { get; set; }
    public required string Explanation { get; set; }
    public int OccurrenceCount { get; set; } = 1;
    public DateTimeOffset LastSeenAt { get; set; } = DateTimeOffset.UtcNow;

    public User? User { get; set; }
}

