angular
  .module('mainMenuPanel')
  .factory('mainMenuPanelFactory', [
    function () {
      var projects = [];

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
