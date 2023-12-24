package com.example.demo.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "user_account") // Specify a different table name
public class User {

    //    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //    private Long id;

    public User(String displayName, String email, Boolean emailVerified, String photoURL, String tenantId, String uid) {
        this.displayName = displayName;
        this.email = email;
        this.emailVerified = emailVerified;
        this.photoURL = photoURL;
        this.tenantId = tenantId;
        this.uid = uid;
    }

    private String displayName;

    @Id
    private String email;
    private Boolean emailVerified;
    private Boolean isAnonymous;
    private String phoneNumber;
    private String photoURL;
    private String providerId;

    private String tenantId;

    private String uid;

    public User() {

    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public Boolean getAnonymous() {
        return isAnonymous;
    }

    public void setAnonymous(Boolean anonymous) {
        isAnonymous = anonymous;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    //    public void setId(Long id) {
    //        this.id = id;
    //    }
    //
    //    public Long getId() {
    //        return id;
    //    }
}
