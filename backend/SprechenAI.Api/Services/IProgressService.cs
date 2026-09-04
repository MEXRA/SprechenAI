using SprechenAI.Api.Contracts;

namespace SprechenAI.Api.Services;

public interface IProgressService
{
    IReadOnlyList<ProgressTopicResponse> GetProgress();
    IReadOnlyList<MistakeResponse> GetMistakes();
}

