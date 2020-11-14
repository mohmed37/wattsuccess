package com.tests.web.controler;

import com.tests.bean.QuestionnairesBean;
import com.tests.dao.motivU.MotivUProperties;
import com.tests.dao.motivU.MotivUResultProperties;
import com.tests.entity.motivU.MotivU;
import com.tests.entity.motivU.MotivUResult;
import com.tests.proxy.MuserProxy;
import com.tests.web.exceptions.QuestioneNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class TestMotivUControleur {
    @Autowired
    MuserProxy proxy;
    @Autowired
    MotivUResultProperties motivUResultProperties;
    @Autowired
    MotivUProperties motivUProperties;

    @GetMapping(value = "/listQuestionMotivU")
    public List<MotivU> listQuestionMotivUr() {
        return motivUProperties.findAll();
    }

    @GetMapping(value = "/listResultatMotivU")
    public List<MotivUResult> listResultatMotivU() {
        return motivUResultProperties.findAll();
    }


    @GetMapping(value = "/questionMotivU/{id}")
    public Optional<MotivU> questionMotivU(@PathVariable("id") int id) {
        Optional<MotivU> question = motivUProperties.findById(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return question;
    }

    @GetMapping(value = "/resultClientMotivU/{id}")
    public Optional<MotivUResult> resultClientMotivU(@PathVariable("id") int id) {
        Optional<MotivUResult> resultatClient = motivUResultProperties.findByClient(id);
        if (!resultatClient.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de test");
        return resultatClient;
    }

    @PostMapping(value = "/saveClientMotivU")
    public MotivUResult saveClientMotivU(@RequestBody MotivUResult motivUResult) {
        motivUResult.setChallenge(0.0);
        motivUResult.setAutonomie(0.0);
        motivUResult.setHonnetete(0.0);
        motivUResult.setMobilite(0.0);
        motivUResult.setPersonnel(0.0);
        motivUResult.setRencontres(0.0);
        motivUResult.setResponsabilite(0.0);
        motivUResult.setRetribution(0.0);
        motivUResult.setSocial(0.0);
        motivUResult.setStatut(0.0);
        motivUResult.setUtilite(0.0);
        motivUResult.setUtilite(0.0);
        motivUResult.setConnaissances(0.0);
        motivUResult.setQuestion(1);

        return motivUResultProperties.save(motivUResult);
    }

    @PutMapping(value = "/saveResutatMotiv")
    public void saveResutatMotivU(@RequestBody MotivUResult motivUResult ) {
        motivUResultProperties.save(motivUResult);
        Optional<QuestionnairesBean> questionnairesBean=proxy.questionnairesUser(motivUResult.getClient());

        if(questionnairesBean.get().getMotivU()){
            motivUResult.setAutonomie(clacul(motivUResult.getAutonomie()));
            motivUResult.setUtilite(clacul(motivUResult.getUtilite()));
            motivUResult.setStatut(clacul(motivUResult.getStatut()));
            motivUResult.setSocial(clacul(motivUResult.getSocial()));
            motivUResult.setRetribution(clacul(motivUResult.getRetribution()));
            motivUResult.setResponsabilite(clacul(motivUResult.getResponsabilite()));
            motivUResult.setRencontres(clacul(motivUResult.getRencontres()));
            motivUResult.setPersonnel(clacul(motivUResult.getPersonnel()));
            motivUResult.setMobilite(clacul(motivUResult.getMobilite()));
            motivUResult.setHonnetete(clacul(motivUResult.getHonnetete()));
            motivUResult.setChallenge(clacul(motivUResult.getChallenge()));
            motivUResult.setConnaissances(clacul(motivUResult.getConnaissances()));
            motivUResultProperties.save(motivUResult);
        }
    }

    private double clacul(double result){
        return Math.round((result/5)*2);
    }





}
