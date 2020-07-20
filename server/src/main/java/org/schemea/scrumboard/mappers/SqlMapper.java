package org.schemea.scrumboard.mappers;

import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectProvider;
import org.mybatis.dynamic.sql.insert.render.InsertStatementProvider;
import org.mybatis.dynamic.sql.select.render.SelectStatementProvider;
import org.mybatis.dynamic.sql.util.SqlProviderAdapter;
import org.schemea.scrumboard.entities.PersonEntity;

import java.util.List;

@Mapper
public interface SqlMapper<T> {
    @SelectProvider(type = SqlProviderAdapter.class, method = "select")
    PersonEntity selectOne(SelectStatementProvider statement);

    @SelectProvider(type = SqlProviderAdapter.class, method = "select")
    List<PersonEntity> selectMany(SelectStatementProvider statement);

    @InsertProvider(type = SqlProviderAdapter.class, method = "insert")
    PersonEntity insertOne(InsertStatementProvider<T> statement);

    @InsertProvider(type = SqlProviderAdapter.class, method = "insert")
    List<PersonEntity> insertMany(InsertStatementProvider<T> statement);
}
