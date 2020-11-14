package com.tests.web.controler;

import com.tests.dao.compVerbale.CompVerbale1Properties;
import com.tests.dao.compVerbale.CompVerbale2Properties;
import com.tests.dao.compVerbale.CompVerbale3Properties;
import com.tests.dao.compVerbale.VerbaleResultProperties;
import com.tests.entity.compVerbale.CompVerbale1;
import com.tests.entity.compVerbale.CompVerbale2;
import com.tests.entity.compVerbale.CompVerbale3;
import com.tests.entity.compVerbale.VerbaleResult;
import com.tests.entity.profilU.ProfilU;
import com.tests.entity.profilU.ResultatRa;
import com.tests.proxy.MuserProxy;
import com.tests.web.exceptions.QuestioneNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class TestVerbaleControler {
    @Autowired
    MuserProxy proxy;
    @Autowired
    CompVerbale2Properties compVerbale2Properties;
    @Autowired
    CompVerbale1Properties compVerbale1Properties;
    @Autowired
    CompVerbale3Properties compVerbale3Properties;
    @Autowired
    VerbaleResultProperties verbaleResultProperties;



    @GetMapping(value = "exercice1All")
    public List<CompVerbale1>exercice1All(){
        return compVerbale1Properties.findAll();
    }
    @GetMapping(value = "exercice2All")
    public List<CompVerbale2>exercice2All(){
        return compVerbale2Properties.findAll();
    }
    @GetMapping(value = "exercice3All")
    public List<CompVerbale3>exercice3All(){
        return compVerbale3Properties.findAll();
    }
    @GetMapping(value = "exercice1/{id}")
    public Optional<CompVerbale1>exercice1(@PathVariable("id") int id){
        Optional<CompVerbale1> question = compVerbale1Properties.findById(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return question;
    }

    @GetMapping(value = "exercice2/{id}")
    public Optional<CompVerbale2>exercice2(@PathVariable("id") int id){
        Optional<CompVerbale2> question = compVerbale2Properties.findById(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return question;
    }
    @GetMapping(value = "exercice3/{id}")
    public Optional<CompVerbale3>exercice3(@PathVariable("id") int id){
        Optional<CompVerbale3> question = compVerbale3Properties.findById(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return question;
    }

    @GetMapping(value = "/listVerbaleAll")
    public List<VerbaleResult> listVerbaleAll() {
        return verbaleResultProperties.findAll();

    }

    @GetMapping(value = "/resultatVerbaleClient/{id}")
    public Optional<VerbaleResult>resultatVerbaleClient(@PathVariable("id") int id){
        Optional<VerbaleResult> question = verbaleResultProperties.findByClient(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de résultat de ce test");
        return question;
    }


    @PostMapping(value = "saveVerbale")
    public VerbaleResult saveVerbale(@RequestBody VerbaleResult verbaleResult) {
        verbaleResult.setExercice1(false);
        verbaleResult.setExercice2(false);
        verbaleResult.setQuestion(1);
        verbaleResult.setResultat(0);
        return verbaleResultProperties.save(verbaleResult);

    }

    @PutMapping(value = "changeVerbale")
    public void changeVerbale(@RequestBody VerbaleResult verbaleResult) {
        verbaleResultProperties.save(verbaleResult);
    }




    }






