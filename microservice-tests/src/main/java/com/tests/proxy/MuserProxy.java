package com.tests.proxy;





import com.tests.bean.QuestionnairesBean;
import com.tests.bean.UserBean;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(name="zuul-server")
@RibbonClient(name = "microservice-utilisateur")
public interface MuserProxy {

    @GetMapping(value = "/microservice-utilisateur/user/{id}")
    Optional<UserBean> findById(@PathVariable("id") int id);

    @GetMapping(value ="/microservice-utilisateur/api/auth/userName/{username}")
    UserBean findUserByUsername(@PathVariable("username") String username);

    @GetMapping(value = "/microservice-utilisateur/questionnairesUser")
    Optional<QuestionnairesBean>questionnairesUser(@RequestParam(name = "id", defaultValue = " ") int id);

    @PostMapping(value = "/microservice-utilisateur/saveQuestionnaires")
    ResponseEntity<QuestionnairesBean> saveQuestionnaires(@RequestBody QuestionnairesBean questionnaires);

    @PutMapping(value = "/microservice-utilisateur/modifQuestionnaire")
    void updateQuestionnaire(@RequestBody QuestionnairesBean questionnaires);
}
