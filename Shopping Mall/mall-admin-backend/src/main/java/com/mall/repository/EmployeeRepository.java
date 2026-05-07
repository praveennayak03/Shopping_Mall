package com.mall.repository;

import com.mall.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class EmployeeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Employee> mapper = new RowMapper<Employee>() {
        public Employee mapRow(ResultSet rs, int rowNum)
                throws SQLException {
            Employee e = new Employee();
            e.setId(rs.getInt("id"));
            e.setName(rs.getString("name"));
            e.setRole(rs.getString("role"));
            e.setShopId(rs.getInt("shop_id"));
            e.setPhone(rs.getString("phone"));
            e.setEmail(rs.getString("email"));
            return e;
        }
    };

    public List<Employee> getAll() {
        return jdbcTemplate.query("SELECT * FROM employee", mapper);
    }

    public int add(Employee e) {
        return jdbcTemplate.update(
            "INSERT INTO employee(name,role,shop_id,phone,email) VALUES(?,?,?,?,?)",
            e.getName(), e.getRole(), e.getShopId(),
            e.getPhone(), e.getEmail());
    }

    public int delete(int id) {
        return jdbcTemplate.update(
            "DELETE FROM employee WHERE id=?", id);
    }
}