package org.schemea.scrumboard.servlets;

import graphql.kickstart.servlet.core.GraphQLServletListener;
import org.apache.ibatis.session.SqlSessionManager;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.http.HttpRequest;

public class ResponseListener implements GraphQLServletListener.RequestCallback {
    private final SqlSessionManager sessionManager;
    private final HttpServletRequest request;

    ResponseListener(SqlSessionManager sessionManager, HttpServletRequest request) {
        this.sessionManager = sessionManager;
        this.request = request;

        sessionManager.startManagedSession();
    }

    @Override
    public void onSuccess(HttpServletRequest request, HttpServletResponse response) { }

    @Override
    public void onError(HttpServletRequest request, HttpServletResponse response, Throwable throwable) { }

    @Override
    public void onFinally(HttpServletRequest request, HttpServletResponse response) {
        sessionManager.close();
    }
}
