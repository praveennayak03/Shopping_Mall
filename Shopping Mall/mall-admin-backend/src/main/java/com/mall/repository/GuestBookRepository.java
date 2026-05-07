package com.mall.repository;

import com.mall.model.GuestBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class GuestBookRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<GuestBook> getAllEntries() {
        return jdbcTemplate.query(
            "SELECT * FROM guest_book",
            new RowMapper<GuestBook>() {
                public GuestBook mapRow(ResultSet rs, int rowNum)
                        throws SQLException {
                    GuestBook g = new GuestBook();
                    g.setId(rs.getInt("id"));
                    g.setVisitorName(rs.getString("visitor_name"));
                    g.setPhone(rs.getString("phone"));
                    g.setPurpose(rs.getString("purpose"));
                    return g;
                }
            });
    }

    public int addEntry(GuestBook g) {
        return jdbcTemplate.update(
            "INSERT INTO guest_book(visitor_name,phone,purpose) VALUES(?,?,?)",
            g.getVisitorName(), g.getPhone(), g.getPurpose());
    }
}