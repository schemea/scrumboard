package org.schemea.scrumboard.api;

import graphql.annotations.annotationTypes.GraphQLField;
import graphql.annotations.annotationTypes.GraphQLInvokeDetached;
import org.apache.ibatis.session.SqlSessionManager;
import org.schemea.scrumboard.entities.StoryEntity;
import org.schemea.scrumboard.entities.PersonEntity;
import org.schemea.scrumboard.mappers.StoryMapper;
import org.schemea.scrumboard.mappers.PersonMapper;
import org.schemea.scrumboard.config.SqlConfiguration;

import java.util.List;

public class Query {
    SqlSessionManager sessionManager = SqlConfiguration.getSessionManager();

    @GraphQLField
    @GraphQLInvokeDetached
    public StoryEntity allStoriesByTitle(String title) {
        final StoryMapper mapper = sessionManager.getMapper(StoryMapper.class);

        return mapper.findByTitle(title);
    }

    @GraphQLField
    @GraphQLInvokeDetached
    public List<PersonEntity> allUsersByName(String firstname, String lastname) {
        final PersonMapper mapper = sessionManager.getMapper(PersonMapper.class);

        return mapper.findAllByName(firstname, lastname);
    }
}
