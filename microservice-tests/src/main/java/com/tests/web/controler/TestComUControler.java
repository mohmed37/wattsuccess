package com.tests.web.controler;

import com.tests.bean.QuestionnairesBean;
import com.tests.dao.comU.ComUProperties;
import com.tests.dao.comU.ComUResultProperties;
import com.tests.entity.comU.ComU;
import com.tests.entity.comU.ComUResult;
import com.tests.proxy.MuserProxy;
import com.tests.web.exceptions.QuestioneNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class TestComUControler {
    @Autowired
    MuserProxy proxy;
    @Autowired
    ComUProperties comUProperties;
    @Autowired
    ComUResultProperties comUResultProperties;

    @GetMapping(value = "/listQuestionComU")
    public List<ComU> listQuestionComU() {
        return comUProperties.findAll();
    }

    @GetMapping(value = "/listResultatComU")
    public List<ComUResult> listResultatComU() {
        return comUResultProperties.findAll();
    }


    @GetMapping(value = "/questionComU/{id}")
    public Optional<ComU> questionComU(@PathVariable("id") int id) {
        Optional<ComU> question = comUProperties.findById(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return question;
    }

    @GetMapping(value = "/resultClientComU/{id}")
    public Optional<ComUResult> resultClientComU(@PathVariable("id") int id) {
        Optional<ComUResult> resultatClient = comUResultProperties.findByClient(id);
        if (!resultatClient.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de test");
        return resultatClient;
    }

    @PostMapping(value = "saveClientComU")
    public ComUResult saveClientComU(@RequestBody ComUResult comUResult) {
        comUResult.setAutorite(0.0);
        comUResult.setEcoute(0.);
        comUResult.setEncensement(0.0);
        comUResult.setExpression(0.0);
        comUResult.setNonverbal(0.0);
        comUResult.setObservation(0.0);
        comUResult.setPersuasion(0.0);
        comUResult.setPression(0.0);
        comUResult.setRationalite(0.0);
        comUResult.setRedactionnelle(0.0);
        comUResult.setReserve(0.0);
        comUResult.setSympathie(0.0);
        comUResult.setQuestion(1);

        return comUResultProperties.save(comUResult);
    }

    @PutMapping(value = "saveResutatComU")
    public void saveResutatComU(@RequestBody ComUResult comUResult ) {
        comUResultProperties.save(comUResult);
        Optional<QuestionnairesBean> questionnairesBean=proxy.questionnairesUser(comUResult.getClient());

        if(questionnairesBean.get().getComU()){
            comUResult.setSympathie(claculEmoU(comUResult.getSympathie()));
            comUResult.setReserve(claculEmoU(comUResult.getReserve()));
            comUResult.setRedactionnelle(claculEmoU(comUResult.getRedactionnelle()));
            comUResult.setRationalite(claculEmoU(comUResult.getRationalite()));
            comUResult.setPression(claculEmoU(comUResult.getPression()));
            comUResult.setPersuasion(claculEmoU(comUResult.getPersuasion()));
            comUResult.setObservation(claculEmoU(comUResult.getObservation()));
            comUResult.setNonverbal(claculEmoU(comUResult.getNonverbal()));
            comUResult.setExpression(claculEmoU(comUResult.getExpression()));
            comUResult.setEncensement(claculEmoU(comUResult.getEncensement()));
            comUResult.setAutorite(claculEmoU(comUResult.getAutorite()));
            comUResult.setEcoute(claculEmoU(comUResult.getEcoute()));

            comUResultProperties.save(comUResult);

        }


    }

    private double claculEmoU(double result){
        return Math.round((result*10)/35);
    }





}
