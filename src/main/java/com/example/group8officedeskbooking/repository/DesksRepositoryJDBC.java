package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.model.DeskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DesksRepositoryJDBC implements DesksRepository{

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public DesksRepositoryJDBC(JdbcTemplate aTemplate){
        jdbcTemplate = aTemplate;
    }

    @Override
    public List<DeskDTO> findAllDesks() {

        return jdbcTemplate.query(
                "select * from Desk_Status where desk_type='desk'",
                new DeskMapper()
        );
    }

    @Override
    public List<DeskDTO> findDesksByCities(String cities) {

        return jdbcTemplate.query(
                "select * from Desk_Status where desk_type='desk' and cities=?",
                new DeskMapper(),
                new Object[] {cities}
        );
    }

    @Override
    public void insertDeskBooking(List<DeskDTO> input){
        List<DeskDTO> asd= jdbcTemplate.query( //If user has booked a desk at that day already
                "SELECT * from Desk_Status where bookedName=? AND bookedDate=? AND cities =? ",
                new DeskMapper(),
                new Object[] {input.get(0).getBookedName(),input.get(0).getBookedDate(),input.get(0).getCities()}
        );
        if(asd.size() > 0){
            return;
        }
        for(int i =0; i < input.size(); i++) {
            //System.out.print( input.get(i).getDeskId());
            asd= jdbcTemplate.query(
                "SELECT * from Desk_Status where desk_id=? AND bookedDate=? AND cities =?",
                    new DeskMapper(),
                    new Object[] {input.get(i).getDeskId(),input.get(i).getBookedDate(),input.get(i).getCities()}
            );

            if(asd.size() == 0) {
                jdbcTemplate.update(
                        "INSERT INTO Desk_Status (desk_id, desk_type, bookedDate, bookedName, cities) VALuES (?,'desk',?,?,?)",
                        input.get(i).getDeskId(), input.get(i).getBookedDate(), input.get(i).getBookedName(), input.get(i).getCities()

                );
                return;

            }
        }
    }
    @Override
    public void adminBooking(List<DeskDTO> input){
        for(int i =0; i < input.size(); i++) {
            System.out.println( input.get(i).getDeskId());
            System.out.println( input.get(i).getBookedName());
            jdbcTemplate.update(
                    "DELETE FROM Desk_Status WHERE desk_id=? AND bookedDate=? AND cities =?",
                    input.get(i).getDeskId(),input.get(i).getBookedDate(),input.get(i).getCities()
            );
            if(input.get(i).getBookedName().equals("2")){
                System.out.println("skipped");
                continue; //Cancel the booking only
            }
            jdbcTemplate.update(
                    "INSERT INTO Desk_Status (desk_id, desk_type, bookedDate, bookedName, cities) VALuES (?,'desk',?,?,?)",
                    input.get(i).getDeskId(), input.get(i).getBookedDate(), input.get(i).getBookedName(), input.get(i).getCities()
            );
        }

    }
}
