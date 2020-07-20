package org.schemea.scrumboard.servlets;

import graphql.kickstart.servlet.core.GraphQLServletListener;
import org.apache.ibatis.session.SqlSessionManager;
import org.schemea.scrumboard.config.SqlConfiguration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RequestListener implements GraphQLServletListener {
    private final SqlSessionManager sessionManager = SqlConfiguration.getSessionManager();

    private void setCORSHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with, content-type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    @Override
    public GraphQLServletListener.RequestCallback onRequest(HttpServletRequest request, HttpServletResponse response) {
        setCORSHeaders(response);
        return new ResponseListener(sessionManager, request);
    }
}
