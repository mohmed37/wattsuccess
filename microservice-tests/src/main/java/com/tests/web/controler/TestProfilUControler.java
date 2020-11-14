package com.tests.web.controler;

import com.tests.dao.profilU.ProfiluRepository;
import com.tests.dao.profilU.RestititutionRepository;
import com.tests.dao.profilU.ResultatRaRepository;
import com.tests.entity.profilU.ProfilU;
import com.tests.entity.profilU.RestitutionProfilU;
import com.tests.entity.profilU.ResultatRa;
import com.tests.proxy.MuserProxy;
import com.tests.web.exceptions.QuestioneNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static java.lang.Math.round;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class TestProfilUControler {
    @Autowired
    ResultatRaRepository resultatRaRepository;
    @Autowired
    ProfiluRepository profiluRepository;
    @Autowired
    RestititutionRepository restititutionRepository;
    @Autowired
    MuserProxy muserProxy;




    @GetMapping(value = "/listQuestion")
    public List<ProfilU> listDesQuestion() {
        return profiluRepository.findAll();
    }

    @GetMapping(value = "/listResultat")
    public List<ResultatRa> listResultat() {
        return resultatRaRepository.findAll();
    }


    @GetMapping(value = "/question/{id}")
    public Optional<ProfilU> question(@PathVariable("id") int id) {
        Optional<ProfilU> question = profiluRepository.findById(id);
        if (!question.isPresent()) throw new QuestioneNotFoundException("Cette question n'existe pas");
        return question;
    }

    @GetMapping(value = "/questionClient/{id}")
    public Optional<ResultatRa> questionClient(@PathVariable("id") int id) {
        Optional<ResultatRa> resultatClient = resultatRaRepository.findByIdclient(id);
        if (!resultatClient.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de test");
        return resultatClient;
    }


    @PostMapping(value = "saveClientRa")
    public ResultatRa saveClientRa(@RequestBody ResultatRa resultatRa) {
        List<ResultatRa>listClient=resultatRaRepository.findAll();
        for (ResultatRa clientRa:listClient){
            if (clientRa.getIdclient().equals(resultatRa.getIdclient())){
                return null;
            }
        }
        resultatRa.setAuthenticite((double) round(resultatRa.getAuthenticite()));
        resultatRa.setDirective((double) round(resultatRa.getDirective()));
        resultatRa.setGregarite((double) round(resultatRa.getGregarite()));
        resultatRa.setIndividualisme((double) round(resultatRa.getIndividualisme()));
        resultatRa.setIntroversion((double) round(resultatRa.getIntroversion()));
        resultatRa.setIntuition((double) round(resultatRa.getIntuition()));
        resultatRa.setMethode((double) round(resultatRa.getMethode()));
        resultatRa.setNonConformisme((double) round(resultatRa.getNonConformisme()));
        resultatRa.setPersonnelle((double) round(resultatRa.getPersonnelle()));
        resultatRa.setPrudence((double) round(resultatRa.getPrudence()));
        resultatRa.setReactivite((double) round(resultatRa.getReactivite()));
        resultatRa.setReflexion((double) round(resultatRa.getReflexion()));
        resultatRa.setTenacite((double) round(resultatRa.getTenacite()));
        resultatRa.setTraditionnel((double) round(resultatRa.getTraditionnel()));
        return resultatRaRepository.save(resultatRa);
    }

    @PostMapping(value = "saveRestitution")
    public RestitutionProfilU saveRestitution(@RequestBody RestitutionProfilU restitution) {
        return restititutionRepository.save(restitution);
    }
    @GetMapping(value = "restitusionByDimAndPos/{dimension}/{position}")
    public Optional<RestitutionProfilU>restitusionByDimAndPos(@PathVariable("dimension") String dimention,@PathVariable("position") Integer position){
        return restititutionRepository.findByDimensionAndPosition(dimention,position);
    }

    @GetMapping(value = "restitusionAll")
    public List<RestitutionProfilU>findByAll(){
        return restititutionRepository.findAll();
    }

}
