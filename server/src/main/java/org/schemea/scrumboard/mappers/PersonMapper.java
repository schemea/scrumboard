package org.schemea.scrumboard.mappers;

import org.apache.ibatis.annotations.Insert;
import org.mybatis.dynamic.sql.SqlColumn;
import org.mybatis.dynamic.sql.SqlTable;
import org.mybatis.dynamic.sql.render.RenderingStrategies;
import org.mybatis.dynamic.sql.select.QueryExpressionDSL;
import org.mybatis.dynamic.sql.select.SelectModel;
import org.schemea.scrumboard.entities.PersonEntity;

import java.util.List;

import static org.mybatis.dynamic.sql.SqlBuilder.isEqualTo;
import static org.mybatis.dynamic.sql.SqlBuilder.select;

public interface PersonMapper extends SqlMapper<PersonEntity> {
    SqlTable table = SqlTable.of("users");

    class Columns {
        public static SqlColumn<String> firstname = SqlColumn.of("firstname", table);
        public static SqlColumn<String> lastname = SqlColumn.of("lastname", table);
        public static SqlColumn<Object> all = SqlColumn.of("*", table);
    }

    default List<PersonEntity> findAllByName(String firstname, String lastname) {
        final SqlTable users = SqlTable.of("persons");

        final QueryExpressionDSL<SelectModel> query = select(Columns.all).from(users);

        if (firstname != null) {
            query.where(Columns.firstname, isEqualTo(firstname));
        }

        if (lastname != null) {
            query.where(Columns.lastname, isEqualTo(lastname));
        }

        return selectMany(query.build().render(RenderingStrategies.MYBATIS3));
    }

    @Insert("INSERT INTO users(firstname, lastname) VALUES (#{firstname}, #{lastname})")
    void insert(PersonEntity user);
}
