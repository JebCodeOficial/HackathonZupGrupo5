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
import java.util.HashMap;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/engines/%s/completions";

    public String gerarTextoIA(String prompt, String model) {
        try {
            // Usando ObjectMapper para construir o JSON de forma segura
            ObjectMapper objectMapper = new ObjectMapper();

            // Criação do corpo da requisição como um Map
            Map<String, Object> requestBodyMap = new HashMap<>();
            requestBodyMap.put("model", model);

            // Construindo o array messages com o prompt
            Map<String, String> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);
            requestBodyMap.put("messages", new Map[] { message });
            requestBodyMap.put("max_tokens", 1000);

            // Convertendo o Map em JSON String
            String requestBody = objectMapper.writeValueAsString(requestBodyMap);

            // Construindo a requisição HTTP
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody, StandardCharsets.UTF_8))
                    .build();

            // Enviando a requisição e lidando com a resposta
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode rootNode = objectMapper.readTree(response.body());
                return rootNode.path("choices").get(0).path("message").path("content").asText();
            } else {
                JsonNode errorNode = objectMapper.readTree(response.body());
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
