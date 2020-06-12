package com.google.sps.data;

import java.util.Date;
import java.util.HashMap;

/** Class containing comments */
public final class Comment {

  private final String author;
  private final String email;
  private final Date timestamp;
  private final String message;
  private final float sentimentScore;
  private final HashMap<String, Float> sentenceScores;

  public Comment(String author, String email, Date timestamp, String message, float sentimentScore, HashMap<String, Float> sentenceScores) {
    this.author = author;
    this.email = email;
    this.timestamp = timestamp;
    this.message = message;
    this.sentimentScore = sentimentScore;
    this.sentenceScores = sentenceScores;
  }

  public String getAuthor() {
    return author;
  }

  public String getEmail() {
    return email;
  }

  public Date getTimestamp() {
    return timestamp;
  }

  public String getMessage() {
    return message;
  }

  public float getSentimentScore() {
    return sentimentScore;
  }

  public HashMap<String, Float> getSentenceScores() {
    return sentenceScores;
  }
}