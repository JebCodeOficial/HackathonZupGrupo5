package com.br.hackathon.DesafioGrupo5;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ContentInPath { // Getters and Setters
    private String name;
    private String path;
    private String downloadUrl;
    private String url;
    private String type; // "dir" or "file"

}
