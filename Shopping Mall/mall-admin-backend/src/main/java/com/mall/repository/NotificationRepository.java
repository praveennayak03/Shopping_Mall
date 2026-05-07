package com.mall.repository;

import com.mall.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class NotificationRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Notification> mapper = new RowMapper<Notification>() {
        public Notification mapRow(ResultSet rs, int rowNum)
                throws SQLException {
            Notification n = new Notification();
            n.setId(rs.getInt("id"));
            n.setTitle(rs.getString("title"));
            n.setMessage(rs.getString("message"));
            n.setSentTo(rs.getString("sent_to"));
            return n;
        }
    };

    public List<Notification> getAll() {
        return jdbcTemplate.query(
            "SELECT * FROM notification ORDER BY created_at DESC",
            mapper);
    }

    public int send(Notification n) {
        return jdbcTemplate.update(
            "INSERT INTO notification(title, message, sent_to) VALUES(?,?,?)",
            n.getTitle(), n.getMessage(), n.getSentTo());
    }

    public int delete(int id) {
        return jdbcTemplate.update(
            "DELETE FROM notification WHERE id=?", id);
    }
}