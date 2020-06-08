package com.google.sps.servlets;

import java.io.IOException;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class LoginServlet extends HttpServlet{

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    UserService userService = UserServiceFactory.getUserService();
    System.out.println(userService.getCurrentUser());
    if (userService.isUserLoggedIn()) {
      String userEmail = userService.getCurrentUser().getEmail();
      String logoutURL = userService.createLogoutURL("/");
      response.getWriter().println(createJson(userService.isUserLoggedIn(), userEmail, logoutURL));
    } else {
      String loginURL = userService.createLoginURL("/");
      response.getWriter().println(createJson(userService.isUserLoggedIn(), null, loginURL));
    }
  }

  private String createJson(Boolean loggedIn, String email, String url) {
    String json = "{\"loggedIn\": ";
    json +=  loggedIn;
    json += ", \"email\": \"";
    json += email;
    json += "\", \"url\": \"";
    json += url;
    json += "\"}";
    return json;    
  }
  
}