package com.google.sps.servlets;

import java.io.IOException;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.data.LoginStatus;

@WebServlet("/login")
public class LoginServlet extends HttpServlet{

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();

    if (userService.isUserLoggedIn()) {
      String userEmail = userService.getCurrentUser().getEmail();
      String logoutURL = userService.createLogoutURL("/");
      LoginStatus loginStatus = new LoginStatus(true, userEmail, logoutURL);
      response.getWriter().println((new Gson()).toJson(loginStatus));
    } else {
      String loginURL = userService.createLoginURL("/");
      LoginStatus loginStatus = new LoginStatus(false, null, loginURL);
      response.getWriter().println((new Gson()).toJson(loginStatus));
    }
  }
}