package org.schemea.scrumboard.servlets;

import graphql.annotations.AnnotationsSchemaCreator;
import graphql.kickstart.servlet.GraphQLConfiguration;
import graphql.kickstart.servlet.GraphQLHttpServlet;
import graphql.scalars.ExtendedScalars;
import graphql.schema.GraphQLSchema;
import lombok.Getter;
import org.schemea.scrumboard.api.Mutation;
import org.schemea.scrumboard.api.Query;
import org.schemea.scrumboard.config.ExtendedFunction;

import javax.servlet.annotation.WebServlet;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@WebServlet(name = "GraphQL", urlPatterns = "/*")
public class GraphQLServlet extends GraphQLHttpServlet {

    public GraphQLServlet() {
        System.out.println("------------------------Starting GraphQL Servlet------------------------");
    }

    private GraphQLSchema createSchema() {
        return AnnotationsSchemaCreator.newAnnotationsSchema()
                .query(Query.class)
                .mutation(Mutation.class)
                .typeFunction(new ExtendedFunction(ExtendedScalars.UUID, UUID.class))
                .typeFunction(new ExtendedFunction(ExtendedScalars.DateTime, LocalDateTime.class))
                .typeFunction(new ExtendedFunction(ExtendedScalars.Date, LocalDate.class))
                .build();
    }

    @Override
    protected GraphQLConfiguration getConfiguration() {
        final GraphQLConfiguration configuration = GraphQLConfiguration
                .with(createSchema())
                .build();

        configuration.add(new RequestListener());
        configuration.add(new JwtListener());

        return configuration;
    }
}
