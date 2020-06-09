package com.google.sps.data;

public class LoginStatus {
  private final Boolean loggedIn;
  private final String email;
  private final String url;

  public LoginStatus(Boolean loggedIn, String email, String url) {
    this.loggedIn = loggedIn;
    this.email = email;
    this.url = url;
  }

  public Boolean getLoggedIn() {
    return loggedIn;
  }

  public String getEmail() {
    return email;
  }

  public String getUrl() {
    return url;
  }
}