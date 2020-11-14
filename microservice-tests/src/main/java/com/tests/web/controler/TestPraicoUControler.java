package com.tests.web.controler;

import com.tests.dao.praicoU.*;
import com.tests.entity.praicoU.*;
import com.tests.web.exceptions.QuestioneNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class TestPraicoUControler {
    @Autowired
    ResultRepository resultRepository;
    @Autowired
    Qcm1Repository qcm1Repository;
    @Autowired
    Qcm2Repository qcm2Repository;
    @Autowired
    Qcm3Repository qcm3Repository;
    @Autowired
    Qcm4Repository qcm4Repository;

    @PutMapping(value = "modifResultPraicoU")
    public void modifResultPraicoU(@RequestBody ResultPraicoU resultPraicoU) {
        resultRepository.save(resultPraicoU);
    }

    @PostMapping(value = "saveResultPraicoU")
    public ResultPraicoU saveResultPraicoU(@RequestBody ResultPraicoU resultPraicoU) {
        List<ResultPraicoU>praicoUList=resultRepository.findAll();
        for (ResultPraicoU clientPraico:praicoUList)
            if(clientPraico.getClient().equals(resultPraicoU.getClient())){
            clientPraico.setNombreA(clientPraico.getNombreA()+resultPraicoU.getNombreA());
            clientPraico.setNombreC(clientPraico.getNombreC()+resultPraicoU.getNombreC());
            clientPraico.setNombreI(clientPraico.getNombreI()+resultPraicoU.getNombreI());
            clientPraico.setNombreO(clientPraico.getNombreO()+resultPraicoU.getNombreO());
            clientPraico.setNombreP(clientPraico.getNombreP()+resultPraicoU.getNombreP());
            clientPraico.setNombreR(clientPraico.getNombreR()+resultPraicoU.getNombreR());
            return resultRepository.save(clientPraico);}


        return resultRepository.save(resultPraicoU);
    }

    @GetMapping(value = "/praicoIdClient/{id}")
    public Optional<ResultPraicoU> praicoIdClient(@PathVariable("id") int id) {
        Optional<ResultPraicoU> resutatClient = resultRepository.findByClient(id);
        if (!resutatClient.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");

        return resutatClient;
    }

    @GetMapping(value = "/praicoAll")
    public List<ResultPraicoU> praicoALL() {
       return resultRepository.findAll();
    }

    @GetMapping(value = "/questionnaire1/{id}")
    public Optional<Qcm1> questionnnaire1(@PathVariable("id") int id) {
        Optional<Qcm1> questionnaire1 = qcm1Repository.findById(id);
        if (!questionnaire1.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return questionnaire1;
    }
    @GetMapping(value = "/questionnaire2/{id}")
    public Optional<Qcm2> questionnnaire2(@PathVariable("id") int id) {
        Optional<Qcm2> questionnaire2 = qcm2Repository.findById(id);
        if (!questionnaire2.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return questionnaire2;
    }
    @GetMapping(value = "/questionnaire3/{id}")
    public Optional<Qcm3> questionnnaire3(@PathVariable("id") int id) {
        Optional<Qcm3> questionnaire3 = qcm3Repository.findById(id);
        if (!questionnaire3.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return questionnaire3;
    }
    @PostMapping(value = "saveQcm4")
    public Qcm4 saveQcm4(@RequestBody Qcm4 qcm4){
        return qcm4Repository.save(qcm4);

    }

    @GetMapping(value = "/questionnaire4")
    public List<Qcm4> questionnnaire4() {
        return qcm4Repository.findAll();
    }

}
