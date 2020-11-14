package com.tests.web.controler;

import com.tests.bean.QuestionnairesBean;
import com.tests.dao.commercial.ComResultProperties;
import com.tests.dao.commercial.CommerceProperties;
import com.tests.entity.commercial.Commercial;
import com.tests.entity.commercial.CommercialResult;
import com.tests.proxy.MuserProxy;
import com.tests.web.exceptions.QuestioneNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class TestComComtroler {
    @Autowired
    CommerceProperties commerceProperties;
    @Autowired
    ComResultProperties comResultProperties;
    @Autowired
    MuserProxy proxy;

    @GetMapping(value = "/listQuestionCommercial")
    public List<Commercial> listQuestionCommercial() {
        return commerceProperties.findAll();
    }

    @GetMapping(value = "/listResultatCommercial")
    public List<CommercialResult> listResultatCommercial() {
        return comResultProperties.findAll();
    }


    @GetMapping(value = "/questionCommercial/{id}")
    public Optional<Commercial> questionCommercial(@PathVariable("id") int id) {
        Optional<Commercial> question = commerceProperties.findById(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return question;
    }

    @GetMapping(value = "/resultClientCom/{id}")
    public Optional<CommercialResult> resultClientCom(@PathVariable("id") int id) {
        Optional<CommercialResult> resultatClient = comResultProperties.findByClient(id);
        if (!resultatClient.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de test");
        return resultatClient;
    }

    @PostMapping(value = "/saveClientCom")
    public CommercialResult saveClientCom(@RequestBody CommercialResult commercialResult) {
        commercialResult.setAffirmation(0.0);
        commercialResult.setApproche(0.0);
        commercialResult.setArgumentations(0.0);
        commercialResult.setCombativite(0.0);
        commercialResult.setComprehension(0.0);
        commercialResult.setControle(0.0);
        commercialResult.setJeu(0.0);
        commercialResult.setProspection(0.0);
        commercialResult.setReseau(0.0);
        commercialResult.setSatisfaction(0.0);
        commercialResult.setStrategiques(0.0);
        commercialResult.setQuestion(1);

        return comResultProperties.save(commercialResult);
    }

    @PutMapping(value = "/saveResutatCom")
    public void saveResutatCom(@RequestBody CommercialResult entreprResult ) {
        comResultProperties.save(entreprResult);
        Optional<QuestionnairesBean> questionnairesBean=proxy.questionnairesUser(entreprResult.getClient());

        if(questionnairesBean.get().getCommercial()){
            entreprResult.setStrategiques(caLcul(entreprResult.getStrategiques()));
            entreprResult.setSatisfaction(caLcul(entreprResult.getSatisfaction()));
            entreprResult.setReseau(caLcul(entreprResult.getReseau()));
            entreprResult.setProspection(caLcul(entreprResult.getProspection()));
            entreprResult.setJeu(caLcul(entreprResult.getJeu()));
            entreprResult.setControle(caLcul(entreprResult.getControle()));
            entreprResult.setComprehension(caLcul(entreprResult.getComprehension()));
            entreprResult.setCombativite(caLcul(entreprResult.getCombativite()));
            entreprResult.setArgumentations(caLcul(entreprResult.getArgumentations()));
            entreprResult.setApproche(caLcul(entreprResult.getApproche()));
            entreprResult.setAffirmation(caLcul(entreprResult.getAffirmation()));

            comResultProperties.save(entreprResult);
        }
    }
    private double caLcul(double result){
        return Math.round((result*10)/12);
    }


}





