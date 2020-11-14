package com.tests.web.controler;

import com.tests.dao.personnalite.PersoProperties;
import com.tests.dao.personnalite.PersoResultProperties;
import com.tests.entity.personnalite.Personnalite;
import com.tests.entity.personnalite.PersonnaliteResult;
import com.tests.proxy.MuserProxy;
import com.tests.web.exceptions.QuestioneNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class TestPersoControler {
    @Autowired
    MuserProxy proxy;
    @Autowired
    PersoResultProperties persoResultProperties;
    @Autowired
    PersoProperties persoProperties;

    @GetMapping(value = "/listQuestionPerso")
    public List<Personnalite> listQuestionPerso() {
        return persoProperties.findAll();
    }

    @GetMapping(value = "/listResultatPerso")
    public List<PersonnaliteResult> listResultatPerso() {
        return persoResultProperties.findAll();
    }


    @GetMapping(value = "/questionPerso/{id}")
    public Optional<Personnalite> questionPerso(@PathVariable("id") int id) {
        Optional<Personnalite> question = persoProperties.findById(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return question;
    }

    @GetMapping(value = "/resultClientPerso/{id}")
    public Optional<PersonnaliteResult> resultClientPerso(@PathVariable("id") int id) {
        Optional<PersonnaliteResult> resultatClient = persoResultProperties.findByClient(id);
        if (!resultatClient.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de test");
        return resultatClient;
    }

    @PostMapping(value = "/saveClientPerso")
    public PersonnaliteResult saveClientPerso(@RequestBody PersonnaliteResult personnaliteResult) {
        personnaliteResult.setAltruisme(0);
        personnaliteResult.setEquilibre(0);
        personnaliteResult.setExperience(0);
        personnaliteResult.setExtraversion(0);
        personnaliteResult.setMeticulosite(0);
        personnaliteResult.setQuestion(1);

        return persoResultProperties.save(personnaliteResult);
    }

    @PutMapping(value = "/saveResutatPerso")
    public void ssaveResutatPerso(@RequestBody PersonnaliteResult entreprResult ) {
        persoResultProperties.save(entreprResult);}


}
