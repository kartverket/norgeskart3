angular
  .module('mainMenuPanel')
  .factory('mainMenuPanelFactory', [
    function () {

      var projects = [{
          id: "seeiendom",
          title: "seEiendom_title",
          symbol: "fa fa-home",
          symbol_text: "",
          isSelected: false
        },
        {
          id: "norgeskart",
          title: "Friluft_title",
          symbol: "fa fa-tree",
          symbol_text: "",
          isSelected: false
        },
        {
          id: "ssr",
          title: "Stedsnavn_title",
          symbol: "fa fa-map-signs",
          symbol_text: "",
          isSelected: false
        },
        {
          id: "Tilgjengelighet",
          title: "Tilgjengelighet_title",
          symbol: "fa fa-wheelchair",
          symbol_text: "",
          isSelected: false
        },
        {
          id: "Fastmerker",
          title: "Fastmerker_title",
          symbol: "fa fa-map-pin",
          symbol_text: "",
          isSelected: false
        },
        {
          id: "nrl",
          title: "Luftfartshindre_title",
          symbol: "fa fa-plane",
          symbol_text: "",
          isSelected: false
        },
        {
          id: "dekning",
          title: "Dekning_title",
          symbol: "fa fa-map",
          symbol_text: "",
          isSelected: false
        }
      ];

      return {


        getAllProjects: function () {
          return projects;
        },

        getSelectedProject: function () {
          for (var i = 0; i < projects.length; i++) {
            if (projects[i].isSelected) {
              return projects[i];
            }
          }
        },

        setProjectById: function (id) {
          if (id !== undefined) {
            for (var i = 0; i < projects.length; i++) {
              projects[i].isSelected = projects[i].id.toLowerCase() === id.toLowerCase();
            }
          }
        }

      };


    }
  ]);
