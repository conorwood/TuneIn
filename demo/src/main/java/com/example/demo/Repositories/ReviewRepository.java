package com.example.demo.Repositories;

import com.example.demo.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByAlbumNameAndUserEmail(String albumName, String userEmail);

    boolean existsByAlbumName(String albumName);

    Optional<Review> findByAlbumName(String albumName);

    Optional<Review> findByAlbumId(String albumId);

    List<Review> findByUserEmail(String userEmail);

    Optional<Review> findByAlbumIdAndUserEmail(String albumId, String userEmail);
}
