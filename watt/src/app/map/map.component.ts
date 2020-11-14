import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements  AfterViewInit{
  map;
  public logo: string="assets/img/ofeli.png";
  public list:any[] =[
    {
      lat: 45.760547,
      lng: 4.861118,
      region:"auvergneRhoneAlpes",
      open: true,
      text:'<b style="color:#b65010">Auvergne Rhone Alpes</b><br><a href="http://www.orientation.auvergnerhonealpes.fr/se-former/recherche/formations"  target="blank">' +
        'http://www.orientation.auvergnerhonealpes.fr/se-former/recherche/formations</a>'
    },
    {
      lat: 47.237829,
      lng: 6.0240539,
      region:"bourgogneFrancheComté",
      open: true,
        text:'<b style=\"color:#b65010\">Bourgogne Franche Comté</b><br><a href="http://www.emfor-bfc.org/formations/"  target="blank">href="http://www.emfor-bfc.org/formations/"</a><br>' +
        '<a href="https://bourgogne-franche-comte.cleor.org/"  target="blank">https://bourgogne-franche-comte.cleor.org/</a><br>' +
        '<a href="http://www.orientation-formation-emploi.org/rubrique-se-former,2.html"  target="blank">http://www.orientation-formation-emploi.org/rubrique-se-former,2.html</a>'
  },{
    lat: 48.117266,
    lng: -1.6777926,
    region:"bretagne",
    open: true,
    text:'<b style="color:#b65010">Bretagne</b><br><a href="https://www.formation.gref-bretagne.com/liste-des-offres" target="blank">https://www.formation.gref-bretagne.com/liste-des-offres</a>'
  },{
      lat: 47.902964,
      lng: 1.909251,
      region:"centreValdeLoire",
      open: true,
      text:'<b style="color:#b65010">Centre Val de Loire</b><br><a href="http://www.etoile.regioncentre.fr/GIP/accueiletoile/seformer/formation/offre-formation-region" target="blank">http://www.etoile.regioncentre.fr/GIP/accueiletoile/seformer/formation/offre-formation-region</a>' +
        '<br><a href="https://www.cleor-centrevaldeloire.fr" target="blank">https://www.cleor-centrevaldeloire.fr</a>'
    },{
      lat: 42.039604,
      lng: 9.012893,
      region:"corse",
      open: true,
      text:'<b style="color:#b65010">Corse</b><br><a href="http://www.fiore-corse.fr/formations/recherche-formations.html" target="blank">http://www.fiore-corse.fr/formations/recherche-formations.html</a>'
    },{
      lat: 48.692054,
      lng: 6.184417,
      region:"grandEst",
      open: true,
      text:'<b style="color:#b65010">Grand Est</b><br><a href="https://formation.grandest.fr/" target="blank">https://formation.grandest.fr/</a>'
    },{
      lat: 50.633333,
      lng: 3.066667,
      region:"hautsDeFrance",
      open: true,
      text:'<b style="color:#b65010">Hauts De France</b><br><a href="https://cleor.c2rp.fr/recherche/formations/etape/1"' +
        ' target="blank">https://cleor.c2rp.fr/recherche/formations/etape/1</a>' +
        '<br><a href="https://www.c2rp.fr/formations" target="blank">https://www.c2rp.fr/formations</a>'
    },{
      lat: 48.866667,
      lng: 2.333333,
      region:"iledeFrance",
      open: true,
      text:'<b style="color:#b65010">Ile de France</b><br><a href="https://www.defi-metiers.fr/oaio/formation" target="blank">https://www.defi-metiers.fr/oaio/formation</a>' +
        '<br><a href="https://www.oriane.info/recherche?type_recherche=formation&ss_type_formation=initiale" target="blank">https://www.oriane.info/recherche?type_recherche=formation&ss_type_formation=initiale</a>'
    },{
      lat: 49.443232,
      lng: 1.099971,
      region:"normandie",
      open: true,
      text:'<b style="color:#b65010">Normandie</b><br><a href="https://www.trouvermaformation.fr/" target="blank">https://www.trouvermaformation.fr/</a>' +
        '<br><a href="https://normandie.cleor.org/" target="blank">https://normandie.cleor.org/</a><br>' +
        '<a href="https://parcours-metier.normandie.fr/recherche-formation" target="blank">https://parcours-metier.normandie.fr/recherche-formation</a>'
    },
    {
      lat: 44.837789,
      lng: -0.57918,
      region:"nouvelleAquitaine",
      open: true,
      text:'<b style="color:#b65010">Nouvelle Aquitaine</b><br><a href="https://entrepot.aquitaine-cap-metiers.fr/recherche/accueil/" target="blank">https://entrepot.aquitaine-cap-metiers.fr/recherche/accueil/</a>'
    },{
      lat: 43.600000,
      lng: 1.433333,
      region:"occitanie",
      open: true,
      text:'<b style="color:#b65010">Occitanie</b><br><a href="https://www.meformerenregion.fr/recherche?k=formations&f%5B0%5D=" target="blank">https://www.meformerenregion.fr/recherche?k=formations&f%5B0%5D=</a>'
    },{
      lat: 47.218371,
      lng: -1.553621,
      region:"paysdelaLoire",
      open: true,
      text:'<b style="color:#b65010">Pays de la Loire</b><br><a href="https://pro.choisirmonmetier-paysdelaloire.fr/donnees/recherche-formation/" target="blank">https://pro.choisirmonmetier-paysdelaloire.fr/donnees/recherche-formation/</a>'
    },{
      lat: 43.300000,
      lng: 5.400000,
      region:"provenceAlpesCôtedAzur",
      open: true,
      text:'<b style="color:#b65010">Provence Alpes Côte d Azur</b><br><a href="https://www.orientation-regionsud.fr/Formation/" target="blank">https://www.orientation-regionsud.fr/Formation/</a>'
    },
  ];

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {

//FRANCE
    let myfrugalmap = L.map('map').setView([46.227638, 2.213749], 6);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'France Map'
    }).addTo(myfrugalmap);
    let myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    this.list.forEach(podotactile => {
      L.marker([podotactile.lat, podotactile.lng], {icon: myIcon}).addTo(myfrugalmap).bindPopup(podotactile.text);
    });

 //GUADELOUPE

    let mapGuadeloupe=L.map('mapGuadeloupe').setView([16.241100 ,-61.533100], 10);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Guadeloupe Map'
    }).addTo(mapGuadeloupe);
    let myIconG = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });

    let lien:any='<b style="color:#b65010">Guadeloupe</b><br><a href="https://www.guadeloupeformation.com/" target="blank">https://www.guadeloupeformation.com/</a>';
    L.marker([16.241100 ,-61.533100], {icon: myIconG}).addTo(mapGuadeloupe).bindPopup(lien);

 //Guyane

    let mapGuyane=L.map('mapGuyane').setView([3.9517949999999997 ,-53.07822999999999], 7);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Guyane Map'
    }).addTo(mapGuyane);
    let myIconGuy = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    let lienGuy:any='<b style="color:#b65010">Guyane</b><br><a href="http://www.portail-takari.org/" target="blank">http://www.portail-takari.org/</a>';
    L.marker([3.9517949999999997 ,-53.07822999999999], {icon: myIconGuy}).addTo(mapGuyane).bindPopup(lienGuy);

    //Martinique
    let mapMartinique=L.map('mapMartinique').setView([14.635540500000001 ,-61.02281400000001], 10);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Martinique Map'
    }).addTo(mapMartinique);
    let myIconMart = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    let lienMart:any='<b style="color:#b65010">Martinique</b><br><a href="http://www.seformerenmartinique.mq/formations/" target="blank">http://www.seformerenmartinique.mq/formations/</a>';

    L.marker([14.635540500000001 ,-61.02281400000001], {icon: myIconMart}).addTo(mapMartinique).bindPopup(lienMart);

    //Mayotte
    let mapMayotte=L.map('mapMayotte').setView([-12.8245115 ,45.16545500000001], 10);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Mayotte Map'
    }).addTo(mapMayotte);
    let myIconMayo = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    let lienMayo:any='<b style="color:#b65010">Mayotte</b><br><a href="http://www.mayotte-emploi-formation.info/formations/index.php#" target="blank">http://www.mayotte-emploi-formation.info/formations/index.php#</a>';

    L.marker([-12.8245115 ,45.16545500000001], {icon: myIconMayo}).addTo(mapMayotte).bindPopup(lienMayo);

    //La Réunion
    let mapReunion=L.map('mapReunion').setView([-21.115141,55.536384], 10);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'La Réunion Map'
    }).addTo(mapReunion);
    let myIconReun = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    let lienReun:any='<b style="color:#b65010">Réunion</b><br><a href="https://www.formanoo.org/#/" target="blank">https://www.formanoo.org/#/</a>';
    L.marker([-21.115141,55.536384], {icon: myIconReun}).addTo(mapReunion).bindPopup(lienReun);
  }
}
