namespace SprechenAI.Api.Services;

public sealed class OpenAiNotConfiguredException()
    : Exception("OpenAI API anahtarı tanımlı değil. Backend için OpenAI:ApiKey user secret değerini ekleyin.");

public sealed class OpenAiServiceException(string message, Exception? innerException = null)
    : Exception(message, innerException);
