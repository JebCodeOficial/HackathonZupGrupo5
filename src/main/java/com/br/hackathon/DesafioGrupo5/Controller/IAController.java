package com.br.hackathon.DesafioGrupo5.Controller;

import com.br.hackathon.DesafioGrupo5.Service.OpenAIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class IAController {

    private final OpenAIService openAIService;

    public IAController(OpenAIService openAIService) {
        this.openAIService = openAIService;
    }

    @PostMapping("/descrever-imagem")
    public ResponseEntity<Map<String, String>> descreverImagem(@RequestParam("url") String imageUrl, @RequestParam("model") String model) {
        try {
            String prompt = "Descreva a imagem encontrada no seguinte URL: " + imageUrl;
            String descricao = openAIService.gerarTextoIA(prompt, model);
            System.out.println("Descrição da imagem: " + descricao);  // Log para verificar a descrição

            // Usando Map para garantir que o JSON seja gerado corretamente
            Map<String, String> response = new HashMap<>();
            response.put("description", descricao);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erro ao descrever a imagem: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    @PostMapping("/simplificar-texto")
    public ResponseEntity<Map<String, String>> simplificarTexto(@RequestBody Map<String, String> request) {
        String texto = request.get("text");
        if (texto == null || texto.isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Texto para simplificação não fornecido.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        try {
            String prompt = "Simplifique o seguinte texto: " + texto;
            System.out.println("Prompt enviado para a IA: " + prompt);  // Log para verificar o prompt
            String textoSimplificado = openAIService.gerarTextoIA(prompt, "gpt-3.5-turbo");
            System.out.println("Texto simplificado retornado pela IA: " + textoSimplificado);  // Log para verificar a resposta da IA

            Map<String, String> response = new HashMap<>();
            response.put("simplified_text", textoSimplificado);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();  // Log de exceção no servidor
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erro ao simplificar o texto: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

}
