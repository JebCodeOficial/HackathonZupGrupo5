package com.br.hackathon.DesafioGrupo5.Controller;

import com.br.hackathon.DesafioGrupo5.Service.RepoService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/document")
public class RepoController {

    private final RepoService repoService;

    public RepoController(RepoService repoService) {
        this.repoService = repoService;
    }

    @GetMapping("/fetchReadme")
    public String fetchReadme(@RequestParam String repoUrl) throws IOException {
        return repoService.fetchReadmeContent(repoUrl);
    }

    @PostMapping("/download")
    public ResponseEntity<InputStreamResource> downloadDocument(
            @RequestParam String repoUrl,
            @RequestParam String format) throws IOException {

        String markdownContent = repoService.fetchReadmeContent(repoUrl);
        ByteArrayInputStream documentStream;
        String filename;
        MediaType mediaType;

        if ("pdf".equalsIgnoreCase(format)) {
            documentStream = repoService.convertToPDF(markdownContent);
            filename = "readme.pdf";
            mediaType = MediaType.APPLICATION_PDF;
        } else if ("html".equalsIgnoreCase(format)) {
            documentStream = repoService.convertToHtml(markdownContent);
            filename = "readme.html";
            mediaType = MediaType.TEXT_HTML;
        } else if ("md".equalsIgnoreCase(format)) {
            documentStream = repoService.convertToMd(markdownContent);
            filename = "readme.md";
            mediaType = MediaType.TEXT_MARKDOWN;
        } else if ("rtf".equalsIgnoreCase(format)) {
            documentStream = repoService.convertToRtf(markdownContent);
            filename = "readme.rtf";
            mediaType = MediaType.valueOf("application/rtf");
        } else {
            documentStream = repoService.convertToTxt(markdownContent);
            filename = "readme.txt";
            mediaType = MediaType.TEXT_PLAIN;
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(mediaType)
                .body(new InputStreamResource(documentStream));
    }
}
