namespace SprechenAI.Api.Domain.Entities;

public sealed class UserProgress : BaseEntity
{
    public Guid UserId { get; set; }
    public required string Topic { get; set; }
    public int MasteryPercentage { get; set; }
    public int Attempts { get; set; }
    public DateTimeOffset LastPracticedAt { get; set; } = DateTimeOffset.UtcNow;

    public User? User { get; set; }
}

