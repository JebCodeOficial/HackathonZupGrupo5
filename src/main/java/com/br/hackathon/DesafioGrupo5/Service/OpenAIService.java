package com.br.hackathon.DesafioGrupo5.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/engines/%s/completions";

    public String gerarTextoIA(String prompt, String model) {
        try {
            String requestBody = String.format("{\"model\":\"%s\",\"messages\":[{\"role\":\"user\",\"content\":\"%s\"}],\"max_tokens\":4096}", model, prompt);

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode rootNode = new ObjectMapper().readTree(response.body());
                return rootNode.path("choices").get(0).path("message").path("content").asText();
            } else {
                // Lida com os erros retornados pela API da OpenAI
                JsonNode errorNode = new ObjectMapper().readTree(response.body());
                String errorMessage = errorNode.path("error").path("message").asText();
                if (errorNode.path("error").path("code").asText().equals("insufficient_quota")) {
                    return "Erro: Cota excedida. Por favor, verifique seu plano e detalhes de faturamento.";
                }
                return "Erro ao gerar texto com a IA: " + errorMessage;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Erro ao gerar texto usando IA";
        }
    }

}
