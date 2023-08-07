package com.example.demo;

import jakarta.persistence.*;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reviewText;
    private String albumName;

    private String albumId;

    public Review () {

    }
    public Review (String reviewText, String albumName)
    {
        this.albumName = albumName;
        this.reviewText = reviewText;
    }

    public Review (String reviewText, String albumName, String albumId) {
        this.albumName = albumName;
        this.reviewText = reviewText;
        this.albumId = albumId;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getAlbumId() {
        return albumId;
    }

    public void setAlbumId(String albumId) {
        this.albumId = albumId;
    }
}
