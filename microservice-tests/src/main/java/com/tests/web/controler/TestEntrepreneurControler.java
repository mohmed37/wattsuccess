package com.tests.web.controler;

import com.tests.bean.QuestionnairesBean;
import com.tests.dao.entrepreneur.EntreResultProperties;
import com.tests.dao.entrepreneur.EntrepProperties;
import com.tests.entity.emoU.EmoU;
import com.tests.entity.emoU.EmoUResult;
import com.tests.entity.entrepreneur.EntreprResult;
import com.tests.entity.entrepreneur.Entrepreneur;
import com.tests.proxy.MuserProxy;
import com.tests.web.exceptions.QuestioneNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class TestEntrepreneurControler {
    @Autowired
    EntrepProperties entrepProperties;
    @Autowired
    EntreResultProperties entreResultProperties;
    @Autowired
    MuserProxy proxy;


    @GetMapping(value = "/listQuestionEntrepreneur")
    public List<Entrepreneur>listQuestionEntrepreneur() {
        return entrepProperties.findAll();
    }

    @GetMapping(value = "/listResultatEntrepreneur")
    public List<EntreprResult> listResultatEntrepreneur() {
        return entreResultProperties.findAll();
    }


    @GetMapping(value = "/questionEntrepreneur/{id}")
    public Optional<Entrepreneur> questionEntrepreneur(@PathVariable("id") int id) {
        Optional<Entrepreneur> question = entrepProperties.findById(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return question;
    }

    @GetMapping(value = "/resultClientEntrepr/{id}")
    public Optional<EntreprResult> resultClientEntrepr(@PathVariable("id") int id) {
        Optional<EntreprResult> resultatClient = entreResultProperties.findByClient(id);
        if (!resultatClient.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de test");
        return resultatClient;
    }

    @PostMapping(value = "/saveClientEntrep")
    public EntreprResult saveClientEntrep(@RequestBody EntreprResult entreprResult) {
        entreprResult.setAction(0.0);
        entreprResult.setAutonomie(0.0);
        entreprResult.setConfiance(0.0);
        entreprResult.setCreativie(0.0);
        entreprResult.setDefi(0.0);
        entreprResult.setDestin(0.0);
        entreprResult.setPerseverance(0.0);
        entreprResult.setPouvoir(0.0);
        entreprResult.setRealisation(0.0);
        entreprResult.setTolerance(0.0);
        entreprResult.setQuestion(1);

        return entreResultProperties.save(entreprResult);
    }

    @PutMapping(value = "/saveResutatEntrep")
    public void saveResutatEntrep(@RequestBody EntreprResult entreprResult ) {
        entreResultProperties.save(entreprResult);
        Optional<QuestionnairesBean> questionnairesBean=proxy.questionnairesUser(entreprResult.getClient());

        if(questionnairesBean.get().getEntrepreneur()){
            entreprResult.setAutonomie(clacul4(entreprResult.getAutonomie()));
            entreprResult.setConfiance(clacul4(entreprResult.getConfiance()));
            entreprResult.setPerseverance(clacul4(entreprResult.getPerseverance()));
            entreprResult.setRealisation(clacul5(entreprResult.getRealisation()));
            entreprResult.setDefi(clacul5(entreprResult.getDefi()));
            entreprResult.setPouvoir(clacul5(entreprResult.getPouvoir()));
            entreprResult.setAction(clacul5(entreprResult.getAction()));
            entreprResult.setTolerance(clacul6(entreprResult.getTolerance()));
            entreprResult.setCreativie(clacul6(entreprResult.getCreativie()));
            entreprResult.setDestin(clacul6(entreprResult.getDestin()));

           entreResultProperties.save(entreprResult);

        }


    }

    private double clacul4(double result){
        return Math.round((result*10)/16);
    }
    private double clacul5(double result){
        return Math.round((result*10)/20);
    }
    private double clacul6(double result){
        return Math.round((result*10)/24);
    }


}
