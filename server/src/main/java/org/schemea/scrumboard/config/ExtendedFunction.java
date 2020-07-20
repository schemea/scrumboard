package org.schemea.scrumboard.config;

import graphql.annotations.processor.ProcessingElementsContainer;
import graphql.annotations.processor.typeFunctions.TypeFunction;
import graphql.schema.GraphQLScalarType;
import graphql.schema.GraphQLType;

import java.lang.reflect.AnnotatedType;

public class ExtendedFunction implements TypeFunction {

    private final GraphQLScalarType scalarType;
    private final Class<?> javaClass;

    public ExtendedFunction(GraphQLScalarType scalarType, Class<?> javaClass) {
        this.scalarType = scalarType;
        this.javaClass = javaClass;
    }

    @Override
    public String getTypeName(Class<?> aClass, AnnotatedType annotatedType) {
        return scalarType.getName();
    }

    @Override
    public boolean canBuildType(Class<?> aClass, AnnotatedType annotatedType) {
        return aClass == this.javaClass;
    }

    @Override
    public GraphQLType buildType(boolean input, Class<?> aClass, AnnotatedType annotatedType, ProcessingElementsContainer container) {
        return buildType(input, aClass, annotatedType);
    }

    private GraphQLType buildType(boolean inputType, Class<?> aClass, AnnotatedType annotatedType) {
        return scalarType;
    }
}
