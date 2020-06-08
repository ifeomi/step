package com.google.sps.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.DatastoreService;

@WebServlet("/delete-data")
public class DeleteDataServlet extends HttpServlet{
  
  private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  private Key homepageCommentKey = KeyFactory.createKey("Comments", "homepage comments");

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // Delete all comments data
    Query query = new Query("Comment").setAncestor(homepageCommentKey).setKeysOnly();
    PreparedQuery resultKeys = datastore.prepare(query);

    for (Entity entity : resultKeys.asIterable()) {
      datastore.delete(entity.getKey());
    }
  }
}