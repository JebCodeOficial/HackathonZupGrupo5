package com.br.hackathon.DesafioGrupo5;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ContentToFeed {
    // Getters and Setters
    private String path;
    private String content;

    public ContentToFeed(String path, String content) {
    }
}