package org.schemea.scrumboard.entities;

import graphql.annotations.annotationTypes.GraphQLField;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoryEntity {
    private UUID id;
    @GraphQLField
    private String title;
    @GraphQLField
    private String description;
    @GraphQLField
    private Integer effort;
    @GraphQLField
    private Integer value;
}
