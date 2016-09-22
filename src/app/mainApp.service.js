angular.module('mainApp')
    .service('mainAppService', ['$http',
            function(){
                var url = 'http://www.norgeskart.no/';
                var urlOpenWps = 'http://openwps.statkart.no/skwms1/';
                var urlOpenWms = 'http://openwms.statkart.no/skwms1/';
                var urlGeonorge = 'https://ws.geonorge.no/';
                var urlSeEiendom = 'http://www.seeiendom.no/';
                var urlFaktaark = 'http://faktaark.statkart.no/';
                var urlHavnivaa = "http://api.sehavniva.no/";

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

                    var position1 = encodeURIComponent(config.position1);
                    var position2 = encodeURIComponent(config.position2);
                    var street = encodeURIComponent(config.street);
                    var place = encodeURIComponent(config.place);
                    var matrikkel = encodeURIComponent(config.matrikkel);
                    var utm = encodeURIComponent(config.utm);
                    var posDez = encodeURIComponent(config.posDez);
                    var map = encodeURIComponent(config.map);

                    return urlGeonorge + "/fop/fop?locationName=" + config.locationName + "&position1=" + position1 + "&position2=" + position2 +
                        "&street=" + street + "&place=" + place + "&matrikkel=" + matrikkel + "&utm=" + utm + "&posDez=" + posDez + "&map=" + map;

                };

                this.generateSearchMatrikkelVegUrl = function (query) {
                    return url + "ws/veg.py?" + encodeURIComponent(query);
                };

                this.generateSearchMatrikkelAdresseUrl = function (query) {
                    return url + "ws/adr.py?" + encodeURIComponent(query);
                };

                this.generateSearchStedsnavnUrl = function (query) {
                    return urlGeonorge + "SKWS3Index/ssr/sok?navn=" + encodeURIComponent(query) + "*&eksakteForst=true&antPerSide=15&epsgKode=32633&side=0";
                };

                this.generateSearchAdresseUrl = function (query) {
                    return urlGeonorge + "AdresseWS/adresse/sok?sokestreng=" + encodeURIComponent(query) + "&antPerSide=100&side=1";
                };

                this.generateElevationPointUrl = function (lat, lon, epsgNumber){
                    return urlOpenWps + "wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevation&datainputs=[lat=" + lat +";lon=" + lon + ";epsg=" + epsgNumber + "]";
                };

                this.generateMatrikkelInfoUrl = function (minx, miny, maxx, maxy){
                    return url + "ws/wfs.teig.py?bbox=" + minx + "," + miny + "," + maxx + "," + maxy;
                };

                this.generateSeEiendomUrl= function (knr, gnr, bnr, fnr, snr){
                    return urlSeEiendom + "services/Matrikkel.svc/GetDetailPage?type=property&knr=" + knr + "&gnr= " + gnr + "&bnr=" + bnr + "&fnr=" + fnr + "&snr=" + snr + "&customer=kartverket";
                };

                this.generateFaktaarkUrl = function (ssrid){
                    return urlFaktaark + "SSRFakta/faktaarkfraobjektid?enhet=" + ssrid;
                };

                this.generateKoordTransUrl = function (ost, nord, resSosiKoordSys) {
                    return url + "/ws/trans.py?ost=" + ost + "&nord=" + nord + " &sosiKoordSys=23&resSosiKoordSys=" + resSosiKoordSys;
                };

                this.generateSeHavnivaaUrl = function (lat, lon) {
                    return urlHavnivaa + "tideapi.php?lat=" + lat + "&lon=" + lon + "&lang=nb&year=" + new Date().getFullYear() + "&place=&tide_request=tidetable";
                };

                this.generateLagTurkartUrl = function () {
                    return urlGeonorge + "freeprint/getprint2.py";
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
        ]
    );

