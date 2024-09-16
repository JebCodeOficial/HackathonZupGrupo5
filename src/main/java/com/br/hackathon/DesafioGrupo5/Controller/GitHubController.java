package com.br.hackathon.DesafioGrupo5.Controller;
import com.br.hackathon.DesafioGrupo5.ContentToFeed;
import com.br.hackathon.DesafioGrupo5.Service.GitHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GitHubController {

    @Autowired
    private GitHubService gitHubService;

    @GetMapping("/fetch-repo-data")
    public List<ContentToFeed> fetchRepoData(@RequestParam String repoUrl) {
        return gitHubService.fetchDataFromRepo(repoUrl);
    }
}
