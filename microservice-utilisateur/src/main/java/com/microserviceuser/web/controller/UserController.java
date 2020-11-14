package com.microserviceuser.web.controller;

import com.microserviceuser.dao.ConfirmationEmailRepository;
import com.microserviceuser.dao.QuestionnairesRepository;
import com.microserviceuser.dao.UserRepository;
import com.microserviceuser.entities.ConfirmationEmailToken;
import com.microserviceuser.entities.Questionnaires;
import com.microserviceuser.entities.User;
import com.microserviceuser.web.exeception.QuestionNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {


    @Autowired
    private UserRepository appUserRepository;
    @Autowired
    private QuestionnairesRepository questionRepository;
    @Autowired
    private ConfirmationEmailRepository confirmationEmailRepository;


    /**
     * Rechercher un utilisateur par son id.
     * @param id utilisateur
     * @return
     */
    @GetMapping(value = "/user/{id}")
    public Optional<User> findById(@PathVariable("id") Long id) {
        Optional<User> appUsers = appUserRepository.findById(id);
        return appUsers;
    }

    @GetMapping(value = "/usersAll")
    public Page<User> findByAll(@RequestParam(name="page",defaultValue = "0")int page,
                                   @RequestParam(name="size",defaultValue = "3")int size,
                                   @RequestParam(name = "prenom",defaultValue ="") String prenom) {
        Page<User> appUsers = appUserRepository.findByPrenomContains(prenom,PageRequest.of(page,size));
        return appUsers;
    }

    /**
     * Enregistrer un utilisateur
     * @param username
     * @return
     */

    @PostMapping(value = "/username")
    public Optional<User> findUserByUsername(@RequestParam(name = "username", defaultValue = "") String username) {
        return appUserRepository.findByUsername(username);
    }

    @GetMapping(value = "questionnairesUser/{id}")
    public Optional<Questionnaires>questionnairesUser(@PathVariable("id") long id){
        Optional<Questionnaires>question=questionRepository.findByUser_Id(id);
        if (!question.isPresent())throw new QuestionNotFoundException("Vous n'avez pas de quetionnaires");
        return question;
    }

    @GetMapping(value = "questionnairesUserAll")
    public  List<Questionnaires> questionnairesUserAll(){
        return questionRepository.findAll();
    }

    @PostMapping(value = "saveQuestionnaires/{id}")
    public ResponseEntity<Questionnaires>saveQuestionnaires(@PathVariable("id") Long id,@RequestBody Questionnaires questionnaires
            , BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return null;
        }
       List<Questionnaires> listQuestionnaire=questionRepository.findAll();
        for (Questionnaires questionnaire:listQuestionnaire){
            if (questionnaire.getUser().equals(findById(id).get())){
                return null;
            }
        }
        questionnaires.setUser(findById(id).get());
        questionnaires.setProfilU(false);
        questionnaires.setHero(false);
        questionnaires.setQcm3(false);
        questionnaires.setQcm4(false);
        questionnaires.setQcm2(false);
        questionnaires.setQcm1(false);
        questionnaires.setEmoU(false);
        questionnaires.setComU(false);
        questionnaires.setEntrepreneur(false);
        questionnaires.setCommercial(false);
        questionnaires.setMotivU(false);
        questionnaires.setCompVerbale(false);
        questionnaires.setPerso(false);
        questionnaires.setOrtho(false);
        questionnaires.setGrammaire(false);
        questionnaires.setAutoPortrait(false);
        questionnaires.setRoueVie(false);
        questionnaires.setPhotoLangage(false);
        questionnaires.setProfilU(false);
        questionnaires.setPorteFolio(false);
        questionnaires.setProjetPro(false);
        questionnaires.setDicoMetiers(false);
        questionnaires.setHandiWatt(false);


        Questionnaires saveQusetionnaires=questionRepository.save(questionnaires);
        return new ResponseEntity<Questionnaires>(saveQusetionnaires, HttpStatus.CREATED);
    }

    @PutMapping(value = "modifQuestionnaire/{id}")
    public void updateQuestionnaire(@PathVariable("id") long id,@RequestBody String questionnaireType){
        Optional<Questionnaires> questionClient=questionnairesUser(id);
        switch (questionnaireType){
            case "photolangage":
                questionClient.get().setPhotoLangage(true);
                break;
            case "roueDeLaVie":
                questionClient.get().setRoueVie(true);
                break;
            case "autoPortrait":
                questionClient.get().setAutoPortrait(true);
                break;
            case "qcm1":
                questionClient.get().setQcm1(true);
                break;
            case "qcm2":
                questionClient.get().setQcm2(true);
                break;
            case "qcm3":
                questionClient.get().setQcm3(true);
                break;
            case "qcm4":
                questionClient.get().setQcm4(true);
                break;
            case "hero":
                questionClient.get().setHero(true);
                break;
            case "dicoMetier":
                questionClient.get().setDicoMetiers(true);
                break;
            case "profilU":
                questionClient.get().setProfilU(true);
                break;
            case "porteFolio":
                questionClient.get().setPorteFolio(true);
                break;
            case "projetPro":
                questionClient.get().setProjetPro(true);
                break;
            case "handiWatt":
                questionClient.get().setHandiWatt(true);
                break;
            default:
                break;
        }
        questionRepository.save(questionClient.get());
    }


    @PutMapping(value = "modifUser/")
    public User modifUser(@RequestBody User appUser
            , BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return null;
        }
        Optional<User> user=appUserRepository.findById(appUser.getId());
        user.get().setPhone(appUser.getPhone());
        user.get().setEmail(appUser.getEmail());
        user.get().setPrenom(appUser.getPrenom());
        user.get().setActive(appUser.getActive());
        user.get().setNom(appUser.getNom());
        return appUserRepository.save(user.get());
    }

    @DeleteMapping(value = "deleteUser/{id}")
    public  void delete(@PathVariable("id") Long id){

        Optional<Questionnaires> qcmClient=questionRepository.findByUser_Id(id);
        qcmClient.ifPresent(questionnaires -> questionRepository.delete(questionnaires));

        Optional<ConfirmationEmailToken> confirmationEmailToken=confirmationEmailRepository.findByUser_Id(id);
        confirmationEmailToken.ifPresent(emailToken -> confirmationEmailRepository.delete(emailToken));

       appUserRepository.deleteById(id);
    }



}


