package com.example.demo;

import java.util.List;

public class AlbumInfo {
    private String coverArtUrl;
    private List<String> tracks;

    private String artist;

    private String name;

    private String id;


    public AlbumInfo (String coverArtUrl, List<String> tracks, String artist, String name, String Id) {
        this.coverArtUrl = coverArtUrl;
        this.tracks = tracks;
        this.artist = artist;
        this.name = name;
        this.id = Id;
    }

    public AlbumInfo (String coverArtUrl, String artist, String name, String id) {
        this.coverArtUrl = coverArtUrl;
        this.name = name;
        this.id = id;
        this.artist = artist;
    }


    public String getCoverArtUrl() {
        return coverArtUrl;
    }

    public void setCoverArtUrl(String coverArtUrl) {
        this.coverArtUrl = coverArtUrl;
    }

    public List<String> getTracks() {
        return tracks;
    }

    public void setTracks(List<String> tracks) {
        this.tracks = tracks;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
