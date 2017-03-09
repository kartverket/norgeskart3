angular.module('mainApp')
  .service('mainAppService', ['$http',
    function () {
      var url = 'http://www.norgeskart.no/';
      var urlOpenWps = 'http://openwps.statkart.no/skwms1/';
      var urlOpenWms = 'http://openwms.statkart.no/skwms1/';
      var urlGeonorge = 'https://ws.geonorge.no/';
      var urlSeEiendom = 'http://www.seeiendom.no/';
      var urlFaktaark = 'https://stadnamn.kartverket.no/fakta/';
      var urlHavnivaa = "http://api.sehavniva.no/";

      this.generateWhat3WordsServiceUrl = function () {
        return url + 'ws/w3w.py';
      };

      this.uploadGpxFileService = function () {
        return url + 'ws/upload-gpx.py';
      };

      this.generateElevationChartServiceUrl = function (gpxFile) {
        var serviceUrl = urlOpenWps + "wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevationChart&dataInputs=";
        return serviceUrl + "[gpx=" + gpxFile + "] ";
      };

      this.generateMapLinkServiceUrl = function (config) {
        var service = encodeURIComponent(config.service);
        var request = encodeURIComponent(config.request);
        var crs = encodeURIComponent(config.CRS);
        var format = encodeURIComponent(config.FORMAT);
        var bgcolor = encodeURIComponent(config.BGCOLOR);
        var transparent = encodeURIComponent(config.TRANSPARENT);
        var layers = encodeURIComponent(config.LAYERS);
        var version = encodeURIComponent(config.VERSION);
        var width = encodeURIComponent(config.WIDTH);
        var height = encodeURIComponent(config.HEIGHT);
        var bbox = encodeURIComponent(config.BBOX);

        return urlOpenWms + "wms.topo2?service=" + service + "&request=" + request + "&CRS=" + crs + "&FORMAT=" + format + "&BGCOLOR=" + bgcolor + "&TRANSPARENT=" + transparent +
          "&LAYERS=" + layers + "&VERSION=" + version + "&WIDTH=" + width + "&HEIGHT=" + height + "&BBOX=" + bbox;
      };

      this.generateEmergencyPosterServiceUrl = function (config) {

        var locationName = encodeURIComponent(config.locationName);
        var position1 = encodeURIComponent(config.position1);
        var position2 = encodeURIComponent(config.position2);
        var street = encodeURIComponent(config.street);
        var place = encodeURIComponent(config.place);
        var matrikkel = encodeURIComponent(config.matrikkel);
        var utm = encodeURIComponent(config.utm);
        var posDez = encodeURIComponent(config.posDez);
        var map = encodeURIComponent(config.map);

        return urlGeonorge + "/fop/fop?locationName=" + locationName + "&position1=" + position1 + "&position2=" + position2 +
          "&street=" + street + "&place=" + place + "&matrikkel=" + matrikkel + "&utm=" + utm + "&posDez=" + posDez + "&map=" + map;

      };

      this.generateSearchMatrikkelVegUrl = function (query) {
        return url + "ws/veg.py?" + encodeURIComponent(query);
      };

      this.generateSearchMatrikkelAdresseUrl = function (query) {
        return url + "ws/adr.py?" + encodeURIComponent(query);
      };

      this.generateSearchStedsnavnUrl = function (query, side, antall) {
        return urlGeonorge + "SKWS3Index/v2/ssr/sok?navn=" + encodeURIComponent(query) + "*&eksakteForst=true&antPerSide=" + antall + "&epsgKode=32633&side=" + side;
      };

      this.generateSearchAdresseUrl = function (query) {
        return urlGeonorge + "AdresseWS/adresse/sok?sokestreng=" + encodeURIComponent(query) + "&antPerSide=100&side=1";
      };

      this.generateElevationPointUrl = function (lat, lon, epsgNumber) {
        return urlOpenWps + "wps.elevation2?request=Execute&service=WPS&version=1.0.0&identifier=elevation&datainputs=lat=" + lat + ";lon=" + lon + ";epsg=" + epsgNumber + "";
      };

      this.generateMatrikkelInfoUrl = function (minx, miny, maxx, maxy) {
        return url + "ws/wfs.teig.py?bbox=" + minx + "," + miny + "," + maxx + "," + maxy;
      };

      this.generateSeEiendomUrl = function (knr, gnr, bnr, fnr, snr) {
        return urlSeEiendom + "services/Matrikkel.svc/GetDetailPage?type=property&knr=" + knr + "&gnr=" + gnr + "&bnr=" + bnr + "&fnr=" + fnr + "&snr=" + snr + "&customer=kartverket";
      };

      this.generateFaktaarkUrl = function (stedsnummer) {
        return urlFaktaark + stedsnummer;
      };

      this.generateKoordTransUrl = function (ost, nord, resSosiKoordSys) {
        return url + "/ws/trans.py?ost=" + ost + "&nord=" + nord + " &sosiKoordSys=84&resSosiKoordSys=" + resSosiKoordSys;
      };

      this.generateSeHavnivaaUrl = function (lat, lon) {
        return urlHavnivaa + "tideapi.php?lat=" + lat + "&lon=" + lon + "&lang=nb&year=" + new Date().getFullYear() + "&place=&tide_request=tidetable";
      };

      this.generateLagTurkartUrl = function () {
        return urlGeonorge + "freeprint/getprint2.py";
      };

      this.generateLagFargeleggingskartUrl = function () {
        return urlGeonorge + "freeprint/getprint_f.py";
      };

      this.generateEmergencyPosterPointUrl = function (lat, lon) {
        return url + 'ws/emergencyPoster.py?&lon=' + lon + ',lat=' + lat;
      };

      this.generateSearchStedsnavnBboxUrl = function (minx, miny, maxx, maxy) {
        return urlGeonorge + 'SKWS3Index/ssr/sok?&nordLL=' + miny + '&ostLL=' + minx + '&nordUR=' + maxy + '&ostUR=' + maxx + '&epsgKode=32633';
      };

      this.generateEmergencyPosterPreviewImageUrl = function (minx, miny, maxx, maxy) {
        return urlOpenWms + 'wms.topo2?service=WMS&request=GetMap&CRS=EPSG:32633&FORMAT=image%2Fjpeg&BGCOLOR=0xFFFFFF&TRANSPARENT=false&LAYERS=topo2_WMS&VERSION=1.3.0&WIDTH=' + $(window).width() + '&HEIGHT=' + $(window).height() + '&BBOX=' + minx + ',' + miny + ',' + maxx + ',' + maxy;
      };

      this.generateGeoJSONUrl = function (hash) {
        return url + 'user/json-test/' + hash + '.json';
      };

      this.generateGeoJSONSaveUrl = function () {
        return url + 'ws/upload-json-test.py';
      };

      this.generateSearchMatrikkelNummerUrl = function (query) {
        return url + 'ws/eie.py?' + encodeURIComponent(query);
      };

      this.generateMatrikkelWfsFilterUrl = function (property) {
        _constructMarkingFilter = function () {
          return 'FILTER=' + encodeURIComponent('<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">' +
            '<And>' +
            '<ogc:PropertyIsEqualTo>' +
            '<ogc:PropertyName>KOMMUNENR</ogc:PropertyName>' +
            '<ogc:Literal>' + property.kommunenr + '</ogc:Literal>' +
            '</ogc:PropertyIsEqualTo>' +
            '<ogc:PropertyIsEqualTo>' +
            '<ogc:PropertyName>GARDSNR</ogc:PropertyName>' +
            '<ogc:Literal>' + property.gardsnr + '</ogc:Literal>' +
            '</ogc:PropertyIsEqualTo>' +
            '<ogc:PropertyIsEqualTo>' +
            '<ogc:PropertyName>BRUKSNR</ogc:PropertyName>' +
            '<ogc:Literal>' + property.bruksnr + '</ogc:Literal>' +
            '</ogc:PropertyIsEqualTo>' +
            '<ogc:PropertyIsEqualTo>' +
            '<ogc:PropertyName>FESTENR</ogc:PropertyName>' +
            '<ogc:Literal>' + property.festenr + '</ogc:Literal>' +
            '</ogc:PropertyIsEqualTo>' +
            '<ogc:PropertyIsEqualTo>' +
            '<ogc:PropertyName>SEKSJONSNR</ogc:PropertyName>' +
            '<ogc:Literal>' + property.seksjonsnr + '</ogc:Literal>' +
            '</ogc:PropertyIsEqualTo>' +
            '</And>' +
            '</ogc:Filter>');
        };

        return url + 'ws/wfs.teig.py?' + _constructMarkingFilter();
      };

      this.generateEiendomAddress = function (kommunenr, gardsnr, bruksnr, festnr, sectionsnr) {
        var baseUrl = url + 'ws/eiendom.py?';
        if (festnr !== "0") {
          if (sectionsnr === "0") {
            baseUrl += kommunenr + "-" + gardsnr + "/" + bruksnr + "/" + festnr;
          } else {
            baseUrl += kommunenr + "-" + gardsnr + "/" + bruksnr + "/" + festnr + "/" + sectionsnr;
          }
        } else {
          baseUrl += kommunenr + "-" + gardsnr + "/" + bruksnr;
        }
        return baseUrl + '&KILDE:Eiendom KOMMUNENR:' + kommunenr + ' GARDSNR:' + gardsnr + ' BRUKSNR:' + bruksnr + ' SEKSJONSNR:' + sectionsnr + ' FESTENR:' + festnr;

      };

      this.generateFaqUrl = function (code) {
        return url + 'ws/faq.py?code=' + code;
      };

      /*
       // No CORS
       this.generateSeHavnivaaUrl = function (lat, lon) {
       return urlHavnivaa + "tideapi.php?lat=" + lat + "&lon=" + lon + "&refcode=cd&place=&lang=nb&file=&tide_request=locationlevels";

       };                this.generateSearchEiendomUrl = function (query) {
       return "http://eiendom.statkart.no/Search.ashx?filter=KILDE:sted,matreiendom,SITEURLKEY:httpwwwseeiendomno,LESEGRUPPER:guests&term=" + query;
       };
       */
    }
  ]);
