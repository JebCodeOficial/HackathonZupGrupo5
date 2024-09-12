package com.br.hackathon.DesafioGrupo5.Service;

import org.springframework.stereotype.Service;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;
import java.util.Scanner;

@Service
public class RepoService {

    public String fetchReadmeContent(String repoUrl) throws IOException {
        String apiUrl = repoUrl.replace("https://github.com/", "https://api.github.com/repos/") + "/contents/README.md";
        URL url = new URL(apiUrl);

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Accept", "application/vnd.github.v3+json");

        if (connection.getResponseCode() != 200) {
            throw new IOException("Erro ao buscar o README: " + connection.getResponseMessage());
        }

        Scanner scanner = new Scanner(connection.getInputStream());
        StringBuilder content = new StringBuilder();
        while (scanner.hasNext()) {
            content.append(scanner.nextLine());
        }
        scanner.close();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(content.toString());

        String encodedContent = jsonNode.get("content").asText().replaceAll("\\n", "");
        return new String(Base64.getDecoder().decode(encodedContent));
    }

    public ByteArrayInputStream convertToTxt(String markdownContent) {
        return new ByteArrayInputStream(markdownContent.getBytes());
    }

    public ByteArrayInputStream convertToPDF(String markdownContent) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        PDPageContentStream contentStream = new PDPageContentStream(document, page);
        contentStream.setFont(PDType1Font.HELVETICA, 12);
        contentStream.beginText();
        contentStream.newLineAtOffset(100, 700);

        String[] lines = markdownContent.split("\n");
        for (String line : lines) {
            contentStream.showText(line);
            contentStream.newLineAtOffset(0, -15); // Move para a próxima linha
        }

        contentStream.endText();
        contentStream.close();

        document.save(outputStream);
        document.close();

        return new ByteArrayInputStream(outputStream.toByteArray());
    }

    public ByteArrayInputStream convertToHtml(String markdownContent) {
        String htmlContent = "<html><body><pre>" + markdownContent + "</pre></body></html>";
        return new ByteArrayInputStream(htmlContent.getBytes());
    }

    public ByteArrayInputStream convertToMd(String markdownContent) {
        return new ByteArrayInputStream(markdownContent.getBytes());
    }

    public ByteArrayInputStream convertToRtf(String markdownContent) {
        StringBuilder rtfContent = new StringBuilder();
        rtfContent.append("{\\rtf1\\ansi\\deff0\n");
        String[] lines = markdownContent.split("\n");
        for (String line : lines) {
            rtfContent.append(line).append("\\line\n");
        }
        rtfContent.append("}");
        return new ByteArrayInputStream(rtfContent.toString().getBytes());
    }
}
