namespace SprechenAI.Api.Domain.Entities;

public sealed class User : BaseEntity
{
    public required string DisplayName { get; set; }
    public required string Email { get; set; }
    public string LearningLevel { get; set; } = "A2";

    public ICollection<Conversation> Conversations { get; set; } = [];
    public ICollection<Mistake> Mistakes { get; set; } = [];
    public ICollection<UserProgress> ProgressEntries { get; set; } = [];
}

