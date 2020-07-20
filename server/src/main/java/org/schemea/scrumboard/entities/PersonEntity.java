package org.schemea.scrumboard.entities;

import graphql.annotations.annotationTypes.GraphQLField;
import graphql.annotations.annotationTypes.GraphQLID;
import graphql.annotations.annotationTypes.GraphQLMutation;
import graphql.annotations.annotationTypes.GraphQLNonNull;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@GraphQLMutation
public class PersonEntity {
    @GraphQLID
    @GraphQLField
    private UUID id;
    @GraphQLField
    @GraphQLNonNull
    private String firstname;
    @GraphQLField
    @GraphQLNonNull
    String lastname;
}
