package org.schemea.scrumboard.servlets;

import com.fasterxml.jackson.annotation.JacksonInject;
import graphql.kickstart.servlet.core.GraphQLServletListener;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.schemea.scrumboard.services.TokenService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;
import java.util.UUID;

@Data
public class JwtListener implements GraphQLServletListener {
    private final TokenService service;

    public JwtListener() {
        service = new TokenService();
    }

    @Override
    public RequestCallback onRequest(HttpServletRequest request, HttpServletResponse response) {
        final String authorization = request.getHeader("Authorization");

        try {
            try {
                if (Objects.nonNull(authorization) && authorization.startsWith("Bearer ")) {
                    final String jwt = authorization.substring(7);

                    final Jws<Claims> claims = service.parse(jwt);
                    final Claims body = claims.getBody();

                    final UUID userID = UUID.fromString(body.getSubject());
                    final String username = body.get(TokenService.USERNAME, String.class);
                    final ArrayList<?> roles = body.get(TokenService.AUTHORITIES, ArrayList.class);

                    // final Set<SimpleGrantedAuthority> authorities = roles.stream()
                    //         .map(String.class::cast)
                    //         .map(SimpleGrantedAuthority::new)
                    //         .collect(Collectors.toSet());
                    //
                    // final CustomUserPrincipal principal = new CustomUserPrincipal(userID, username, null, authorities);
                    // final UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(principal, null, authorities);
                    //
                    // SecurityContextHolder.getContext().setAuthentication(token);
                }
            } catch (SignatureException e) {
                response.sendError(401, "invalid token");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
