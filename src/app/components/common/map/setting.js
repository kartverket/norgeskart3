var settings = {
  "system/site/name": "My GeoNetwork catalogue",
  "system/site/organization": "My organization",
  "system/platform/version": "3.4.0",
  "system/platform/subVersion": "SNAPSHOT",
  "system/server/host": "localhost",
  "system/server/protocol": "http",
  "system/server/port": 8080,
  "system/userSelfRegistration/enable": false,
  "system/userFeedback/enable": false,
  "system/xlinkResolver/enable": false,
  "system/xlinkResolver/localXlinkEnable": true,
  "system/xlinkResolver/ignore": "operatesOn,featureCatalogueCitation,Anchor,source",
  "system/searchStats/enable": true,
  "system/inspire/enableSearchPanel": false,
  "system/harvester/enableEditing": false,
  "system/metadata/allThesaurus": false,
  "system/metadatacreate/generateUuid": true,
  "system/metadataprivs/usergrouponly": false,
  "region/getmap/background": "osm",
  "region/getmap/width": "500",
  "region/getmap/summaryWidth": "500",
  "region/getmap/mapproj": "EPSG:3857",
  "ui/config": {
    langDetector: {
      fromHtmlTag: false,
      regexp: "^/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+/([a-z]{3})/",
      default: "eng"
    },
    nodeDetector: {
      regexp: "^/[a-zA-Z0-9_-]+/([a-zA-Z0-9_-]+)/[a-z]{3}/",
      default: "srv"
    },
    mods: {
      header: {
        enabled: true,
        languages: {
          eng: "en",
          dut: "du",
          fre: "fr",
          ger: "ge",
          kor: "ko",
          spa: "es",
          cze: "cz",
          cat: "ca",
          fin: "fi",
          ice: "is"
        }
      },
      home: {
        enabled: true,
        appUrl: "../../srv/{{lang}}/catalog.search#/home"
      },
      search: {
        enabled: true,
        appUrl: "../../srv/{{lang}}/catalog.search#/search",
        hitsperpageValues: [10, 50, 100],
        paginationInfo: {
          hitsPerPage: 20
        },
        facetsSummaryType: "details",
        facetConfig: [],
        facetTabField: "",
        filters: {},
        sortbyValues: [{
          sortBy: "relevance",
          sortOrder: ""
        }, {
          sortBy: "changeDate",
          sortOrder: ""
        }, {
          sortBy: "title",
          sortOrder: "reverse"
        }, {
          sortBy: "rating",
          sortOrder: ""
        }, {
          sortBy: "popularity",
          sortOrder: ""
        }, {
          sortBy: "denominatorDesc",
          sortOrder: ""
        }, {
          sortBy: "denominatorAsc",
          sortOrder: "reverse"
        }],
        sortBy: "relevance",
        resultViewTpls: [{
          tplUrl: "../../catalog/components/search/resultsview/partials/viewtemplates/grid.html",
          tooltip: "Grid",
          icon: "fa-th"
        }],
        resultTemplate: "../../catalog/components/search/resultsview/partials/viewtemplates/grid.html",
        formatter: {
          list: [{
            label: "full",
            url: "../api/records/{{uuid}}/formatters/xsl-view?root=div&view=advanced"
          }]
        },
        linkTypes: {
          links: ["LINK", "kml"],
          downloads: ["DOWNLOAD"],
          layers: ["OGC"],
          maps: ["ows"]
        }
      },
      map: {
        enabled: true,
        appUrl: "../../srv/{{lang}}/catalog.search#/map",
        is3DModeAllowed: true,
        isSaveMapInCatalogAllowed: true,
        bingKey: "AnElW2Zqi4fI-9cYx1LHiQfokQ9GrNzcjOh_p_0hkO1yo78ba8zTLARcLBIf8H6D",
        storage: "sessionStorage",
        map: "../../map/config-viewer.xml",
        listOfServices: {
          wms: [],
          wmts: []
        },
        useOSM: true,
        context: "",
        layer: {
          url: "http://www2.demis.nl/mapserver/wms.asp?",
          layers: "Countries",
          version: "1.1.1"
        },
        projection: "EPSG:3857",
        projectionList: [{
          code: "EPSG:4326",
          label: "WGS84(EPSG:4326)"
        }, {
          code: "EPSG:3857",
          label: "Googlemercator(EPSG:3857)"
        }]
      },
      editor: {
        enabled: true,
        appUrl: "../../srv/{{lang}}/catalog.edit"
      },
      admin: {
        enabled: true,
        appUrl: "../../srv/{{lang}}/admin.console"
      },
      signin: {
        enabled: true,
        appUrl: "../../srv/{{lang}}/catalog.signin"
      },
      signout: {
        appUrl: "../../signout"
      }
    }
  },
  "metadata/editor/schemaConfig": {
    "iso19110": {
      defaultTab: "default",
      displayToolTip: false,
      related: {
        display: true,
        readonly: true,
        categories: ["dataset"]
      },
      validation: {
        display: true
      }
    },
    "iso19139": {
      defaultTab: "default",
      displayToolTip: false,
      related: {
        display: true,
        categories: []
      },
      suggestion: {
        display: true
      },
      validation: {
        display: true
      }
    },
    "dublin-core": {
      defaultTab: "default",
      related: {
        display: true,
        readonly: false,
        categories: ["parent", "onlinesrc"]
      }
    }
  },
  "metadata/resourceIdentifierPrefix": "http://localhost:8080/geonetwork/srv/resources",
  "metadata/workflow/draftWhenInGroup": null,
  "metadata/workflow/allowPublishInvalidMd": true,
  "metadata/workflow/automaticUnpublishInvalidMd": false,
  "metadata/workflow/forceValidationOnMdSave": false,
  "system/ui/defaultView": "default",
  "system/site/siteId": "3b700fff-c712-4a4b-ac3a-0cd9c44b7ee6",
  "system/feedback/mailServer/hostIsDefined": false
};
