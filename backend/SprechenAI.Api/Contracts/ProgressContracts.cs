namespace SprechenAI.Api.Contracts;

public sealed record ProgressTopicResponse(string Topic, int Percentage);
public sealed record MistakeResponse(string Incorrect, string Correct, string Topic, int MistakeCount, string Explanation);

