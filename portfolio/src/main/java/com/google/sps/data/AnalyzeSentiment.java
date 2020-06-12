package com.google.sps.data;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import com.google.cloud.language.v1.AnalyzeSentimentResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentence;
import com.google.cloud.language.v1.Sentiment;

/** Class analyzing sentiment of a message */
public final class AnalyzeSentiment {

  private float messageSentiment;
  private HashMap<String, Float> sentenceSentiments = new HashMap<String, Float>();

  public AnalyzeSentiment(String message) {
      analyzeSentiment(message);
  }

  public float getMessageSentiment() {
    return messageSentiment;
  }

  public HashMap<String, Float> getSentenceSentiments() {
    return sentenceSentiments;
  }

  private void analyzeSentiment(String message) {
    Document doc =
        Document.newBuilder().setContent(message).setType(Document.Type.PLAIN_TEXT).build();
    try (LanguageServiceClient languageService = LanguageServiceClient.create()) {
      AnalyzeSentimentResponse resp = languageService.analyzeSentiment(doc);
      Sentiment sentiment = resp.getDocumentSentiment();
      List<Sentence> sentences = resp.getSentencesList();
      messageSentiment = sentiment.getScore();
      // Create HashMap of sentences to their sentiment score
      for (Sentence sentence : sentences) {
        sentenceSentiments.put(sentence.getText().getContent(), new Float(sentence.getSentiment().getScore()));
      }
    } catch (IOException e) {
      messageSentiment = 0f;
      e.printStackTrace();
    }
  }
}