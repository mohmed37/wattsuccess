package com.tests.web.controler;

import com.tests.dao.cgu.CguProperties;
import com.tests.entity.cgu.Cgu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cgu")
public class cguControler {

    @Autowired
    CguProperties cguProperties;

    @PostMapping(value = "/saveCgu")
    public Cgu saveFicheMetier(@RequestBody Cgu cgu, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return null;
        }
        Optional<Cgu> cgu1=cguProperties.findById(0);
        if(cgu1.isPresent()){
            cgu1.get().setDate(cgu.getDate());
            cgu1.get().setTexte(cgu.getTexte());
            return cguProperties.save(cgu1.get());
        }

        return cguProperties.save(cgu);}

    @GetMapping(value = "getCgu")
    public Optional<Cgu> getCgu() {
        return cguProperties.findById(0);
    }
}
