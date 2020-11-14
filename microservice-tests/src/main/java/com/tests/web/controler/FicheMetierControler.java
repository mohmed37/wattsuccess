package com.tests.web.controler;

import com.tests.dao.bnbecome.ListMetierClientReposirories;
import com.tests.dao.ndream.FicheMetierRepositories;
import com.tests.dao.ndream.PhotoFMRepositories;
import com.tests.dao.praicoU.ResultRepository;
import com.tests.entity.bnbecome.ListMetierClient;
import com.tests.entity.ndream.FicheMetier;
import com.tests.entity.ndream.PhotoFicheMetier;
import com.tests.entity.praicoU.ResultPraicoU;
import com.tests.web.exceptions.QuestioneNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static com.tests.web.controler.TestNbreamControler.compressBytes;
import static com.tests.web.controler.TestNbreamControler.decompressBytes;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class FicheMetierControler {
    @Autowired
    FicheMetierRepositories ficheMetierRepositories;
    @Autowired
    PhotoFMRepositories photoFMRepositories;
    @Autowired
    ResultRepository resultRepository;
    @Autowired
    TestPraicoUControler testPraicoUControler;
    @Autowired
    ListMetierClientReposirories metierClientReposirories;



    @PostMapping(value = "/saveFicheMetier")
    public ResponseEntity<FicheMetier> saveFicheMetier(@RequestBody FicheMetier ficheMetier, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return null;
        }

        FicheMetier saveFicheMetier = ficheMetierRepositories.save(ficheMetier);

        return new ResponseEntity<FicheMetier>(saveFicheMetier, HttpStatus.CREATED);
    }

    @GetMapping(value = "getFicheMetier/{id}")
    public Optional<FicheMetier> getFicheMetier(@PathVariable("id") int id) {
        Optional<FicheMetier> ficheMetier = ficheMetierRepositories.findById(id);
        if (!ficheMetier.isPresent()) throw new QuestioneNotFoundException("Cette fiche n'existe pas");
        return ficheMetier;
    }

    @GetMapping(value = "getFicheMetierCode/{code}")
    public List<FicheMetier> getFicheMetierCode(@PathVariable("code") String code) {
        return ficheMetierRepositories.findByCode(code);
    }

    @PostMapping("/photoFicheMetier")
    public ResponseEntity<Object> photoFicheMetier(@RequestParam("imageFile") MultipartFile file) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        PhotoFicheMetier img = new PhotoFicheMetier(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
        photoFMRepositories.save(img);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @GetMapping(path = { "/getPhotoFicheMetier/{id}" })
    public PhotoFicheMetier getPhotoFicheMetier(@PathVariable("id") int id) throws IOException {
        final Optional<PhotoFicheMetier> retrievedImage = photoFMRepositories.findById(id);
        PhotoFicheMetier img = new PhotoFicheMetier(retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getPicByte()));
        return img;
    }

    @GetMapping(path = { "/getFicheMetierClient/{idClient}" })
    public List<FicheMetier> getFicheMetierClient(@PathVariable("idClient") int id) {
        Optional<ResultPraicoU> resultatClient = testPraicoUControler.praicoIdClient(id);
        String[] code = {resultatClient.get().getNombreA() + "," + "A", resultatClient.get().getNombreC() + "," + "C",
                resultatClient.get().getNombreI() + "," + "I", resultatClient.get().getNombreO() + "," + "O"
                , resultatClient.get().getNombreP() + "," + "P", resultatClient.get().getNombreR() + "," + "R"};
        Arrays.sort(code);
        String lettre1[] = code[5].split(",");
        String lettre2[] = code[4].split(",");
        String lettre3[] = code[3].split(",");

        List<FicheMetier> listFicheClient = new ArrayList<FicheMetier>();

        List<FicheMetier> ficheMetiersClient = ficheMetierRepositories.findAll();
        for (FicheMetier ficheClient : ficheMetiersClient) {
            if (ficheClient.getCode().contains(lettre1[1]) && ficheClient.getCode().contains(lettre2[1]) && ficheClient.getCode().contains(lettre3[1])) {
                listFicheClient.add(ficheClient);
            }

        }
        return listFicheClient;
    }



    @GetMapping(value = "getPhotoFicheMetierAll")
    public List<PhotoFicheMetier>getPhotoFicheMetierAll() {

        return photoFMRepositories.findAll();
    }

    @GetMapping(value = "getFicheMetierByPhotoId/{id}")
    public List<FicheMetier> getFicheMetierByPhotoId(@PathVariable("id") int id) {
        List<FicheMetier> ficheMetier = ficheMetierRepositories.findByPhotoId(id);

        return ficheMetier;
    }

    @GetMapping(value = "getFicheMetierByMetier/{metier}")
    public Optional<FicheMetier> getFicheMetierByMetier(@PathVariable("metier") String metier) {
        Optional<FicheMetier> ficheMetier = ficheMetierRepositories.findByMetier(metier);
        if (!ficheMetier.isPresent()) throw new QuestioneNotFoundException("Cette fiche n'existe pas");
        return ficheMetier;
    }

    @GetMapping(value = "getMetierByClient/{id}")
    public Optional<ListMetierClient> getMetierByClient(@PathVariable("id") Integer id) {
        Optional<ListMetierClient> ficheMetier = metierClientReposirories.findByClient(id);
        if (!ficheMetier.isPresent()) throw new QuestioneNotFoundException("Cette fiche n'existe pas");
        return ficheMetier;
    }

    @PostMapping(value = "/saveMetierByClient")
    public ListMetierClient saveMetierByClient(@RequestBody ListMetierClient ficheMetier, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return null;        }
        List<ListMetierClient>list=metierClientReposirories.findAll();
        for(ListMetierClient listMetier:list){
            if (ficheMetier.getClient()==listMetier.getClient()){
                return null;
            }
        }
        return  metierClientReposirories.save(ficheMetier);
    }

    @PutMapping(value = "/modifMetierByClient")
    public ListMetierClient modifMetierByClient(@RequestBody ListMetierClient ficheMetier, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return null;
        }
        return metierClientReposirories.save(ficheMetier);
    }


}
