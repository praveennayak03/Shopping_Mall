package com.mall.repository;

import com.mall.model.MallAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class AdminRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public MallAdmin login(String username, String password) {
        String sql = "SELECT * FROM mall_admin WHERE username = ? AND password = ?";
        List<MallAdmin> list = jdbcTemplate.query(sql,
            new RowMapper<MallAdmin>() {
                public MallAdmin mapRow(ResultSet rs, int rowNum)
                        throws SQLException {
                    MallAdmin a = new MallAdmin();
                    a.setId(rs.getInt("id"));
                    a.setUsername(rs.getString("username"));
                    a.setPassword(rs.getString("password"));
                    a.setEmail(rs.getString("email"));
                    return a;
                }
            }, username, password);
        return list.isEmpty() ? null : list.get(0);
    }
}