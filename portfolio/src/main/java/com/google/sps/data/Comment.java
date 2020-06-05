package com.google.sps.data;

import java.util.Date;

/** Class containing comments */
public final class Comment {

  private final String author;
  private final Date timestamp;
  private final String message;

  public Comment(String author, Date timestamp, String message) {
    this.author = author;
    this.timestamp = timestamp;
    this.message = message;
  }

  public String getAuthor() {
    return author;
  }

  public Date getTimestamp() {
    return timestamp;
  }

  public String getMessage() {
    return message;
  }
}