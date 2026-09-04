using Microsoft.EntityFrameworkCore;
using SprechenAI.Api.Domain.Entities;

namespace SprechenAI.Api.Data;

public sealed class SprechenAiDbContext(DbContextOptions<SprechenAiDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Conversation> Conversations => Set<Conversation>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<GrammarAnalysis> GrammarAnalyses => Set<GrammarAnalysis>();
    public DbSet<Mistake> Mistakes => Set<Mistake>();
    public DbSet<UserProgress> UserProgress => Set<UserProgress>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(user => user.Email).IsUnique();
            entity.Property(user => user.Email).HasMaxLength(320);
            entity.Property(user => user.DisplayName).HasMaxLength(120);
            entity.Property(user => user.LearningLevel).HasMaxLength(2);
        });

        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.Property(item => item.Scenario).HasMaxLength(120);
            entity.Property(item => item.LearningLevel).HasMaxLength(2);
            entity.Property(item => item.ExplanationDetail).HasMaxLength(16);
            entity.HasOne(item => item.User).WithMany(user => user.Conversations).HasForeignKey(item => item.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.Property(item => item.Role).HasMaxLength(20);
            entity.HasOne(item => item.Conversation).WithMany(conversation => conversation.Messages).HasForeignKey(item => item.ConversationId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<GrammarAnalysis>(entity =>
        {
            entity.HasOne(item => item.Message).WithOne(message => message.GrammarAnalysis).HasForeignKey<GrammarAnalysis>(item => item.MessageId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Mistake>(entity =>
        {
            entity.Property(item => item.Topic).HasMaxLength(80);
            entity.HasOne(item => item.User).WithMany(user => user.Mistakes).HasForeignKey(item => item.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<UserProgress>(entity =>
        {
            entity.Property(item => item.Topic).HasMaxLength(80);
            entity.HasIndex(item => new { item.UserId, item.Topic }).IsUnique();
            entity.HasOne(item => item.User).WithMany(user => user.ProgressEntries).HasForeignKey(item => item.UserId).OnDelete(DeleteBehavior.Cascade);
        });
    }
}

