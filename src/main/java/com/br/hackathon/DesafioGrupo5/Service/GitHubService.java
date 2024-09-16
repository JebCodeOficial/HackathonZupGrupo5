package com.br.hackathon.DesafioGrupo5.Service;

import com.br.hackathon.DesafioGrupo5.ContentInPath;
import com.br.hackathon.DesafioGrupo5.ContentToFeed;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@Service
public class GitHubService {

    @Value("${github.token}")
    private String githubToken;

    private final HttpClient httpClient = HttpClient.newHttpClient();

    public List<ContentToFeed> fetchDataFromRepo(String normalRepoUrl) {
        try {
            String apiRepoUrl = turnNormalRepoIntoApiRepo(normalRepoUrl);
            List<ContentInPath> readableFiles = new ArrayList<>();
            fetchAllReadableFilesFromRepo(apiRepoUrl + "/contents", readableFiles);
            return turnReadableFilesIntoFeedContent(readableFiles);
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private String turnNormalRepoIntoApiRepo(String normalRepoUrl) {
        String[] parts = normalRepoUrl.split("/");
        if (parts.length < 5) return "";
        String username = parts[3];
        String repo = parts[4];
        return "https://api.github.com/repos/" + username + "/" + repo;
    }

    private void fetchAllReadableFilesFromRepo(String repoUrl, List<ContentInPath> filesToRead) throws Exception {
        List<ContentInPath> contentsInPath = fetchContentsFromRepoPath(repoUrl);
        for (ContentInPath content : contentsInPath) {
            String fileExtension = content.getName() != null ? content.getName().substring(content.getName().lastIndexOf('.') + 1) : "";
            List<String> extensionsToIgnore = List.of("jpg", "jpeg", "svg", "png", "gif", "webp", "mp4", "mkv", "avi", "mp3", "ico");

            if (extensionsToIgnore.contains(fileExtension)) {
                continue;
            }

            if ("file".equals(content.getType())) {
                filesToRead.add(content);
            } else {
                fetchAllReadableFilesFromRepo(content.getUrl(), filesToRead);
            }
        }
    }

    private List<ContentInPath> fetchContentsFromRepoPath(String pathUrl) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(pathUrl))
                .header("Authorization", "Bearer " + githubToken)
                .header("Accept", "application/vnd.github.v3.raw")
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        return parseJsonToContentInPathList(response.body());
    }

    private List<ContentInPath> parseJsonToContentInPathList(String json) throws JsonProcessingException {
        // Use a JSON library like Jackson or Gson to parse the JSON response
        // Example with Jackson:
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, new TypeReference<List<ContentInPath>>() {});
    }

    private List<ContentToFeed> turnReadableFilesIntoFeedContent(List<ContentInPath> readableFiles) throws Exception {
        List<ContentToFeed> contentToFeed = new ArrayList<>();
        for (ContentInPath fileData : readableFiles) {
            if (fileData.getDownloadUrl() == null || fileData.getPath() == null) continue;

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fileData.getDownloadUrl()))
                    .header("Accept", "application/vnd.github.v3.raw")
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            contentToFeed.add(new ContentToFeed(fileData.getPath(), response.body()))
        }
        return contentToFeed;
    }
}
