// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.QueryResultList;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Comment;

/** Servlet that returns comments data */
@WebServlet("/data")
public class CommentServlet extends HttpServlet {

  private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  private String entityKind = "Comment";
  private Key homepageCommentKey = KeyFactory.createKey("Comments", "homepage comments");
  private UserService userService = UserServiceFactory.getUserService();
  private String userEmail;
  private int max;

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // If there's no max parameter, load all the comments
    max = request.getParameter("max") != null ? Integer.parseInt(request.getParameter("max")) : Integer.MAX_VALUE;
    FetchOptions fetchOptions = FetchOptions.Builder.withLimit(max);

    String startCursor = request.getParameter("cursor");
    System.out.println(startCursor.equals("undefined"));
    if (!startCursor.equals("undefined") && startCursor != null) {
        fetchOptions.startCursor(Cursor.fromWebSafeString(startCursor));
    }

    Query query = new Query(entityKind).setAncestor(homepageCommentKey)
                      .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery pq = datastore.prepare(query);
    QueryResultList<Entity> results;
    try {
      results = pq.asQueryResultList(fetchOptions);
    } catch (IllegalArgumentException e) {
      response.sendRedirect("/index.html");
      return;
    }
    List<Comment> comments = new ArrayList<>();
    
    for (Entity entity : results) {
      comments.add(entityToComment(entity));
    }
    String cursorString = results.getCursor().toWebSafeString();

    HashMap<String, Object> commentResponse = new HashMap<String, Object>();
    commentResponse.put("comments", comments);
    commentResponse.put("nextCursor", cursorString);
    
    response.setContentType("application/json;");
    response.getWriter().println((new Gson()).toJson(commentResponse)); 
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    if (!userService.isUserLoggedIn()) {
      response.sendRedirect("/index.html");
      return;
    }
    userEmail = userService.getCurrentUser().getEmail();
    datastore.put(commentRequestToEntity(request));
    response.sendRedirect("/index.html");
  }

  private String convertToJsonUsingGson(List<Comment> array) {
    Gson gson = new Gson();
    String json = gson.toJson(array);
    return json;
  }

  private Comment entityToComment(Entity entity) {
    String author = (String) entity.getProperty("author");
    String email = (String) entity.getProperty("email");
    Date timestamp = (Date) entity.getProperty("timestamp");
    String message = (String) entity.getProperty("message");
    
    Comment comment = new Comment(author, email, timestamp, message);
    return comment;
  }

  private Entity commentRequestToEntity(HttpServletRequest request) {
    String author = request.getParameter("name");
    Date timestamp = new Date();
    String message = request.getParameter("message");

    Entity commentEntity = new Entity(entityKind, homepageCommentKey);
    commentEntity.setProperty("author", author);
    commentEntity.setProperty("email", userEmail);
    commentEntity.setProperty("timestamp", timestamp);
    commentEntity.setProperty("message", message);
    return commentEntity;
  }
}
