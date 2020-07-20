package org.schemea.scrumboard.api;

import graphql.annotations.annotationTypes.GraphQLField;
import graphql.annotations.annotationTypes.GraphQLInvokeDetached;
import org.apache.ibatis.session.SqlSessionManager;
import org.schemea.scrumboard.entities.PersonEntity;
import org.schemea.scrumboard.mappers.PersonMapper;
import org.schemea.scrumboard.config.SqlConfiguration;

public class Mutation {
    @GraphQLField
    @GraphQLInvokeDetached
    public String newUser(PersonEntity user) {
        System.out.println(user.getFirstname());
        SqlSessionManager sessionManager = SqlConfiguration.getSessionManager();
        final PersonMapper mapper = sessionManager.getMapper(PersonMapper.class);

        mapper.insert(user);

        System.out.println(user);

        return user.getId().toString();
    }
}
