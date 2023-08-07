package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByAlbumName(String albumName);

    Optional<Review> findByAlbumName(String albumName);

    Optional<Review> findByAlbumId(String albumId);
}
