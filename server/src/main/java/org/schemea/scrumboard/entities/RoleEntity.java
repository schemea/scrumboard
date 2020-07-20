package org.schemea.scrumboard.entities;

import graphql.annotations.annotationTypes.GraphQLField;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleEntity {
    // @GraphQLField
    private UUID id;
    @GraphQLField
    private String name;
    @GraphQLField
    private String description;
    @GraphQLField
    private int score;
}
