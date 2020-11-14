package com.tests.web.controler;

import com.tests.bean.QuestionnairesBean;
import com.tests.dao.emoU.EmoUProperties;
import com.tests.dao.emoU.EmoUResultProperties;
import com.tests.entity.emoU.EmoU;
import com.tests.entity.emoU.EmoUResult;
import com.tests.proxy.MuserProxy;
import com.tests.web.exceptions.QuestioneNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class TestEmoUContoler {
    @Autowired
    EmoUResultProperties emoUResultProperties;
    @Autowired
    EmoUProperties emoUProperties;
    @Autowired
    MuserProxy proxy;

    @GetMapping(value = "/listQuestionEmoU")
    public List<EmoU> listQuestionEmoU() {
        return emoUProperties.findAll();
    }

    @GetMapping(value = "/listResultatEmoU")
    public List<EmoUResult> listResultatEmoU() {
        return emoUResultProperties.findAll();
    }


    @GetMapping(value = "/questionEmoU/{id}")
    public Optional<EmoU> questionEmoU(@PathVariable("id") int id) {
        Optional<EmoU> question = emoUProperties.findById(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return question;
    }

    @GetMapping(value = "/resultClientEmoU/{id}")
    public Optional<EmoUResult> resultClientEmoU(@PathVariable("id") int id) {
        Optional<EmoUResult> resultatClient = emoUResultProperties.findByClient(id);
        if (!resultatClient.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de test");
        return resultatClient;
    }

    @PostMapping(value = "saveClientEmoU")
    public EmoUResult saveClientEmoU(@RequestBody EmoUResult emoUResult) {
        emoUResult.setAdaptabilite(0.0);
        emoUResult.setAssertivite(0.);
        emoUResult.setAutomotivation(0.0);
        emoUResult.setConfiance(0.0);
        emoUResult.setConnaissance(0.0);
        emoUResult.setEmpathie(0.0);
        emoUResult.setEstime(0.0);
        emoUResult.setInfluence(0.0);
        emoUResult.setMaitrise(0.0);
        emoUResult.setOptimisme(0.0);
        emoUResult.setRelationnelle(0.0);
        emoUResult.setResilience(0.0);
        emoUResult.setQuestion(1);

        return emoUResultProperties.save(emoUResult);
    }

    @PutMapping(value = "saveResutatEmoU")
    public void saveResutatEmoU(@RequestBody EmoUResult emoUResult ) {
        emoUResultProperties.save(emoUResult);
        Optional<QuestionnairesBean> questionnairesBean=proxy.questionnairesUser(emoUResult.getClient());

        if(questionnairesBean.get().getEmoU()){
            emoUResult.setResilience(claculEmoU(emoUResult.getResilience()));
            emoUResult.setRelationnelle(claculEmoU(emoUResult.getRelationnelle()));
            emoUResult.setOptimisme(claculEmoU(emoUResult.getOptimisme()));
            emoUResult.setInfluence(claculEmoU(emoUResult.getInfluence()));
            emoUResult.setEstime(claculEmoU(emoUResult.getEstime()));
            emoUResult.setEmpathie(claculEmoU(emoUResult.getEmpathie()));
            emoUResult.setConnaissance(claculEmoU(emoUResult.getConnaissance()));
            emoUResult.setConfiance(claculEmoU(emoUResult.getConfiance()));
            emoUResult.setAutomotivation(claculEmoU(emoUResult.getAutomotivation()));
            emoUResult.setAdaptabilite(claculEmoU(emoUResult.getAdaptabilite()));
            emoUResult.setAssertivite(claculEmoU(emoUResult.getAssertivite()));
            emoUResult.setMaitrise(claculEmoU(emoUResult.getMaitrise()));

            emoUResultProperties.save(emoUResult);

        }


    }

    private double claculEmoU(double result){
        return Math.round((result*10)/35);
    }



}
