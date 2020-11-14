package com.tests.web.controler;

import com.tests.dao.ndream.*;
import com.tests.entity.ndream.*;
import com.tests.web.exceptions.QuestioneNotFoundException;
import lombok.var;
import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import java.io.ByteArrayOutputStream;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/watt")
public class TestNbreamControler {

    @Autowired
    PhotoRepositories photoRepositories;
    @Autowired
    PhotoLangageRepositories langageRepositories;
    @Autowired
    RoueVieRepositories roueVieRepositories;
    @Autowired
    AutoportraitRepositories autoportraitRepositories;
    @Autowired
    AutoportraitResultRepositories autoportraitResultRepositories;
    @Autowired
    HeroResultRepositories heroResultRepositories;
    @Autowired
    heroRepositories heroRepositories;
    @Autowired
    FicheMetierRepositories ficheMetierRepositories;
    @Autowired
    PhotoFMRepositories photoFMRepositories;


    @PostMapping("/upload")
    public ResponseEntity<Object> uplaodImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        Photo img = new Photo(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
        photoRepositories.save(img);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping(path = {"/get/{imageName}"})
    public Photo getImage(@PathVariable("imageName") String imageName) throws IOException {
        final Optional<Photo> retrievedImage = photoRepositories.findByName(imageName);
        Photo img = new Photo(retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getPicByte()));
        return img;
    }

    @GetMapping(path = {"/getId/{id}"})
    public Photo getImageId(@PathVariable("id") int id) throws IOException {
        final Optional<Photo> retrievedImage = photoRepositories.findById(id);
        Photo img = new Photo(retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getPicByte()));
        return img;
    }


    @GetMapping(path = {"/getAll/{listImage}"})
    public List<Photo> getAll(@PathVariable("listImage") ArrayList<Integer> imageName) throws IOException {
        int image1 = 0;
        int image2 = 0;
        int image3 = 0;
        int image4 = 0;
        int image5 = 0;
        image1 = imageName.get(0);
        image2 = imageName.get(1);
        image3 = imageName.get(2);
        image4 = imageName.get(3);
        image5 = imageName.get(4);
        Photo photo1 = getImageId(image1);
        Photo photo2 = getImageId(image2);
        Photo photo3 = getImageId(image3);
        Photo photo4 = getImageId(image4);
        Photo photo5 = getImageId(image5);
        ArrayList<Photo> listPhoto = new ArrayList<>();
        listPhoto.add(photo1);
        listPhoto.add(photo2);
        listPhoto.add(photo3);
        listPhoto.add(photo4);
        listPhoto.add(photo5);
        return listPhoto;
    }
    // compresser les octets d'image avant de les stocker dans la base de données

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }
    // décompresse les octets de l'image avant de les renvoyer à l'application angulaire

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }


    @PostMapping(value = "/photo")
    public ResponseEntity<Photo> savePhoto(@RequestBody Photo photo, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        }

        Photo savePhoto = photoRepositories.save(photo);

        return new ResponseEntity<Photo>(savePhoto, HttpStatus.CREATED);
    }


    @GetMapping(value = "/listPhotos")
    public Page<Photo> listPhotos(@RequestParam(name = "page", defaultValue = "0") int page,
                                  @RequestParam(name = "size", defaultValue = "4") int size) {

        return photoRepositories.findAll(PageRequest.of(page, size));
    }

    @GetMapping(value = "/listPhotosAll")
    public List<Photo> listPhotosAll() {

        return photoRepositories.findAll();
    }

    @GetMapping(value = "getPhoto/{id}")
    public Optional<Photo> getPhoto(@PathVariable("id") int id) {
        Optional<Photo> photo = photoRepositories.findById(id);
        if (!photo.isPresent()) throw new QuestioneNotFoundException("Cette photo n'existe pas");
        return photo;

    }


    @PostMapping(value = "saveResultPhotoLangage")
    public PhotoLangage saveResultPhotoLangage(@RequestBody PhotoLangage resultNbdream, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        }
        List<PhotoLangage> photoLangageList = langageRepositories.findAll();
        for (PhotoLangage photoLangage : photoLangageList) {
            if (photoLangage.getClient().equals(resultNbdream.getClient())) {
                return null;
            }
        }
        return langageRepositories.save(resultNbdream);
    }

    @GetMapping(value = "getPhotoLangage/{id}")
    public Optional<PhotoLangage> getPhotoLangage(@PathVariable("id") int id) {
        Optional<PhotoLangage> resultatClient = langageRepositories.findByClient(id);
        if (!resultatClient.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de test");
        return resultatClient;
    }

    @GetMapping(value = "getPhotoLangageAll")
    public List<PhotoLangage> getNbdreamAll() {
        return langageRepositories.findAll();
    }


    @GetMapping(value = "/listRoueVie")
    public List<RoueVie> listRoueVie() {
        return roueVieRepositories.findAll();
    }

    @GetMapping(value = "getRoueVieClient/{id}")
    public Optional<RoueVie> getRoueVieClient(@PathVariable("id") int id) {
        Optional<RoueVie> roueVieClient = roueVieRepositories.findByClient(id);
        if (!roueVieClient.isPresent()) throw new QuestioneNotFoundException("Cette photo n'existe pas");
        return roueVieClient;
    }


    @PostMapping(value = "saveRoueVieClient")
    public RoueVie saveRoueVieClient(@RequestBody RoueVie roueVie, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;}

            List<RoueVie> roueVieList = roueVieRepositories.findAll();
            for (RoueVie roueVie1 : roueVieList) {
                if (roueVie1.getClient().equals(roueVie.getClient())) {
                    return null;
                }

            }
        return roueVieRepositories.save(roueVie);

        }

    @PutMapping(value = "modifRoueVieClient")
    public RoueVie modifRoueVieClient(@RequestBody RoueVie roueVie, BindingResult bindingResult ) {
        if (bindingResult.hasErrors()) {
            return null;
        }
        return roueVieRepositories.save(roueVie);

    }

    @GetMapping(value = "/listAutoportrait")
    public List<Autoportrait> listAutoportrait(){
        return autoportraitRepositories.findAll();
    }

    @GetMapping(value = "getAutoportrait/{id}")
    public Optional<Autoportrait>getAutoportrait(@PathVariable("id") int id) {
        Optional<Autoportrait> autoPortrait = autoportraitRepositories.findById(id);
        if (!autoPortrait.isPresent()) throw new QuestioneNotFoundException("Ce mot n'existe pas");
        return autoPortrait;
    }

    @GetMapping(path = { "/autoportraitAll/{listTrait}" })
    public List<Autoportrait> autoportraitAll(@PathVariable("listTrait") ArrayList<Integer> traitId ) throws IOException {
        int traitId1 = 0;
        int traitId2 = 0;
        int traitId3 = 0;
        int traitId4 = 0;
        int traitId5 = 0;
        traitId1=traitId.get(0);
        traitId2=traitId.get(1);
        traitId3=traitId.get(2);
        traitId4=traitId.get(3);
        traitId5=traitId.get(4);
        Optional<Autoportrait> autoportrait1=getAutoportrait(traitId1);
        Optional<Autoportrait> autoportrait2=getAutoportrait(traitId2);
        Optional<Autoportrait> autoportrait3=getAutoportrait(traitId3);
        Optional<Autoportrait> autoportrait4=getAutoportrait(traitId4);
        Optional<Autoportrait> autoportrait5=getAutoportrait(traitId5);
        ArrayList<Autoportrait> listTrait=new ArrayList<>();
        listTrait.add(autoportrait1.get());
        String personnalite = autoportrait1.get().getPersonnalite();
        listTrait.add(autoportrait2.get());
        listTrait.add(autoportrait3.get());
        listTrait.add(autoportrait4.get());
        listTrait.add(autoportrait5.get());
        autoportrait5.get().getPersonnalite();
        return listTrait;
    }


    @GetMapping(value = "/ResulAutoportraitAll")
    public List<AutoportraitResult> ResulAutoportraitAll(){
        return autoportraitResultRepositories.findAll();
    }

    @GetMapping(value = "getResulAutoportrait/{id}")
    public Optional<AutoportraitResult>getResulAutoportrait(@PathVariable("id") int id) {
        Optional<AutoportraitResult> autoPortrait = autoportraitResultRepositories.findByClient(id);
        if (!autoPortrait.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de test n'existe pas");
        return autoPortrait;
    }


    @PostMapping(value = "saveAutoPortraitClient")
    public AutoportraitResult saveAutoPortraitClient(@RequestBody AutoportraitResult autoportraitResult, BindingResult bindingResult ) {
        if (bindingResult.hasErrors()) {
            return null;
        }


        return autoportraitResultRepositories.save(autoportraitResult);
    }
    @PutMapping(value = "modifAutoPortraitClient")
    public AutoportraitResult modifAutoPortraitClient(@RequestBody AutoportraitResult autoportraitResult, BindingResult bindingResult ) {
        if (bindingResult.hasErrors()) {
            return null;
        }
        return autoportraitResultRepositories.save(autoportraitResult);
    }

    @GetMapping(value = "/listvaleurHero")
    public List<Hero> listvaleurHero(){
        return heroRepositories.findAll();
    }

    @GetMapping(value = "/listResultHero")
    public List<HeroResult> listResultHero(){
        return heroResultRepositories.findAll();
    }

    @GetMapping(value = "getValeurHero/{id}")
    public Optional<Hero>getValeurHero(@PathVariable("id") int id) {
        Optional<Hero> valeurHero = heroRepositories.findById(id);
        if (!valeurHero.isPresent()) throw new QuestioneNotFoundException("Cette valeur n'existe pas");
        return valeurHero;
    }

    @GetMapping(value = "getResultHeroClient/{id}")
    public Optional<HeroResult>getResultHeroClient(@PathVariable("id") int id) {
        Optional<HeroResult> heroResult = heroResultRepositories.findByClient(id);
        if (!heroResult.isPresent()) throw new QuestioneNotFoundException("Ce client n'a pas de test");
        return heroResult;
    }

    @PostMapping(value = "saveHeroClient")
    public HeroResult saveHeroClient(@RequestBody HeroResult heroResult, BindingResult bindingResult ) {
        if (bindingResult.hasErrors()) {
            return null;
        }
        return heroResultRepositories.save(heroResult);

    }

    @PutMapping(value = "modifHeroClient")
    public HeroResult mmodifHeroClient(@RequestBody HeroResult heroResult, BindingResult bindingResult ) {
        if (bindingResult.hasErrors()) {
            return null;
        }
        return heroResultRepositories.save(heroResult);

    }






    @GetMapping(value = "/name")
    public List<FicheMetier> findByCategorie(  @RequestParam(name = "name",defaultValue =" " )String name){
        return ficheMetierRepositories.findByPhoto_Name(name);
    }





}


