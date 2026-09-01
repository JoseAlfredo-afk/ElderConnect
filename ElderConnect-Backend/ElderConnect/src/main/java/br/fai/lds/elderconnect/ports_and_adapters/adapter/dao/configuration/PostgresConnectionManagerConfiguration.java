package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.configuration;

import br.fai.lds.elderconnect.ports_and_adapters.port.service.tools.ResourceFilesService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.DependsOn;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.*;

public class PostgresConnectionManagerConfiguration {

    @Value("${spring.datasource.base.url}")
    private String databaseBaseUrl;
    @Value("${spring.datasource.name}")
    private String databaseName;
    @Value("${spring.datasource.username}")
    private String databaseUsername;
    @Value("${spring.datasource.password}")
    private String databasePassword;
    @Value("${spring.datasource.url}")
    private String databaseUrl;

    ResourceFilesService resourceFilesService;


    @Bean
    public DataSource dataSource() throws SQLException{

        final DataSource build = DataSourceBuilder
                .create()
                .url(databaseBaseUrl)
                .username(databaseUsername)
                .password(databasePassword)
                .build();

        final Connection connection = build.getConnection();

        createDatabaseIfNotExists(connection);

        return build;
    }

    @Bean
    @DependsOn("dataSource")
    public Connection getConnection() throws SQLException{
        HikariConfig hikariConfig = new HikariConfig();

        hikariConfig.setJdbcUrl(databaseUrl);
        hikariConfig.setUsername(databaseUsername);
        hikariConfig.setPassword(databasePassword);

        return  new HikariDataSource(hikariConfig).getConnection();

    }

    private void createDatabaseIfNotExists(Connection connection) throws SQLException {

        final Statement statement = connection.createStatement();

        String sql = " SELECT COUNT(*) AS dbs ";
        sql += " FROM pg_catalog.pg_database ";
        sql += " WHERE lower(datname) = '" + databaseName + "'; ";

        ResultSet resultSet = statement.executeQuery(sql);

        boolean dbExists = resultSet.next();
        if(!dbExists || resultSet.getInt("dbs") == 0){
            String createDbSql = " CREATE DATABASE " + databaseName + " WITH ";
            createDbSql += " OWNER = postgres ENCODING = 'UTF8' ";
            createDbSql += " CONNECTION LIMIT = -1;";

            PreparedStatement preparedStatement = connection.prepareStatement(createDbSql);
            preparedStatement.executeUpdate();
            preparedStatement.close();
        }


    }

    private String getInsertScript(){
        return "/insert-data-postgres-basic.sql";
    }

    @Bean
    @DependsOn("getConnection")
    public boolean createTableAndInsertData() throws IOException, SQLException {

        Connection connection = getConnection();

        final String basePath = "elderconnect-db-scripts";

        final String createTablesSql = resourceFilesService.read(basePath + "/create-tables-postgres.sql");

        PreparedStatement createStatement = connection.prepareStatement(createTablesSql);
        createStatement.executeUpdate();
        createStatement.close();

        final String insertDataSql = resourceFilesService.read(basePath + "/insert-data-postgres-basic.sql");
        final PreparedStatement insertStatement = connection.prepareStatement(insertDataSql);
        insertStatement.execute();
        insertStatement.close();
        return true;
    }


}
