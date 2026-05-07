package com.mall.repository;

import com.mall.model.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ShopRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Shop> shopMapper = new RowMapper<Shop>() {
        public Shop mapRow(ResultSet rs, int rowNum) throws SQLException {
            Shop s = new Shop();
            s.setId(rs.getInt("id"));
            s.setShopName(rs.getString("shop_name"));
            s.setOwnerName(rs.getString("owner_name"));
            s.setCategory(rs.getString("category"));
            s.setFloorNumber(rs.getInt("floor_number"));
            s.setStatus(rs.getString("status"));
            return s;
        }
    };

    public List<Shop> getAllShops() {
        return jdbcTemplate.query("SELECT * FROM shop", shopMapper);
    }

    public int updateStatus(int id, String status) {
        return jdbcTemplate.update(
            "UPDATE shop SET status=? WHERE id=?", status, id);
    }

    public int addShop(Shop shop) {
        return jdbcTemplate.update(
            "INSERT INTO shop(shop_name,owner_name,category,floor_number,status) VALUES(?,?,?,?,?)",
            shop.getShopName(), shop.getOwnerName(),
            shop.getCategory(), shop.getFloorNumber(), "PENDING");
    }
}