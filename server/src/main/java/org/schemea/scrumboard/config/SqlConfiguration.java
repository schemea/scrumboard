package org.schemea.scrumboard.config;

import org.apache.ibatis.datasource.pooled.PooledDataSource;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.session.SqlSessionManager;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;
import org.schemea.scrumboard.mappers.StoryMapper;
import org.schemea.scrumboard.mappers.PersonMapper;

import javax.sql.DataSource;

public class SqlConfiguration {
    private static final SqlSessionManager sessionManager = SqlSessionManager.newInstance(buildSessionFactory());

    public static SqlSessionFactory buildSessionFactory() {
        DataSource dataSource = new PooledDataSource("org.postgresql.Driver", "jdbc:postgresql://localhost:5432/scrumboard", "postgres", "password");
        Environment environment = new Environment("Dev", new JdbcTransactionFactory(), dataSource);
        Configuration configuration = new Configuration(environment);
        configuration.addMapper(StoryMapper.class);
        configuration.addMapper(PersonMapper.class);

        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();

        return builder.build(configuration);
    }

    public static SqlSessionManager getSessionManager() {
        return sessionManager;
    }
}
