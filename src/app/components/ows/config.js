angular.module('gnConfig', [])
  .value('gnConfig', {
    key: {
      isXLinkEnabled: 'system.xlinkResolver.enable',
      isXLinkLocal: 'system.xlinkResolver.localXlinkEnable',
      isSelfRegisterEnabled: 'system.userSelfRegistration.enable',
      isFeedbackEnabled: 'system.userFeedback.enable',
      isSearchStatEnabled: 'system.searchStats.enable',
      isHideWithHelEnabled: 'system.hidewithheldelements.enable'
    },
    'map.is3DModeAllowed': window.location.search.indexOf('with3d') !== -1
  })
  .constant('gnViewerSettings', {})
  .constant('gnSearchSettings', {})
  .constant('gnGlobalSettings', function () {})
  /**
   * @ngdoc service
   * @kind function
   * @name Metadata
   *
   * @description
   * The `Metadata` service is a metadata wrapper from the jeeves
   * json output of the search service. It also provides some functions
   * on the metadata.
   */
  .factory('Metadata', function () {
    function Metadata(k) {
      $.extend(true, this, k);
      var listOfArrayFields = ['topicCat', 'category', 'keyword',
        'securityConstraints', 'resourceConstraints', 'legalConstraints',
        'denominator', 'resolution', 'geoDesc', 'geoBox', 'inspirethemewithac',
        'status', 'status_text', 'crs', 'identifier', 'responsibleParty',
        'mdLanguage', 'datasetLang', 'type', 'link', 'crsDetails'
      ];
      // See below; probably not necessary
      var listOfJsonFields = ['keywordGroup', 'crsDetails'];
      var record = this;
      this.linksCache = [];
      $.each(listOfArrayFields, function (idx) {
        var field = listOfArrayFields[idx];
        if (angular.isDefined(record[field]) &&
          !angular.isArray(record[field])) {
          record[field] = [record[field]];
        }
      });
      // Note: this step does not seem to be necessary; TODO: remove or refactor
      $.each(listOfJsonFields, function (idx) {
        var field = listOfJsonFields[idx];
        if (angular.isDefined(record[field])) {
          try {
            record[field] = angular.fromJson(record[field]);
          } catch (e) {}
        }
      });

      // Create a structure that reflects the transferOption/onlinesrc tree
      var links = [];
      angular.forEach(this.link, function (link) {
        var linkInfo = formatLink(link);
        var idx = linkInfo.group - 1;
        if (!links[idx]) {
          links[idx] = [linkInfo];
        } else if (angular.isArray(links[idx])) {
          links[idx].push(linkInfo);
        }
      });
      this.linksTree = links;
    };

    function formatLink(sLink) {
      var linkInfos = sLink.split('|');
      return {
        name: linkInfos[0],
        title: linkInfos[0],
        url: linkInfos[2],
        desc: linkInfos[1],
        protocol: linkInfos[3],
        contentType: linkInfos[4],
        group: linkInfos[5] ? parseInt(linkInfos[5]) : undefined,
        applicationProfile: linkInfos[6]
      };
    }

    function parseLink(sLink) {

    };

    Metadata.prototype = {
      getUuid: function () {
        return this['geonet:info'].uuid;
      },
      getId: function () {
        return this['geonet:info'].id;
      },
      isPublished: function () {
        return this['geonet:info'].isPublishedToAll === 'true';
      },
      isValid: function () {
        return this.valid === '1';
      },
      hasValidation: function () {
        return (this.valid > -1);
      },
      isOwned: function () {
        return this['geonet:info'].owner === 'true';
      },
      getOwnerId: function () {
        return this['geonet:info'].ownerId;
      },
      getGroupOwner: function () {
        return this['geonet:info'].owner;
      },
      getSchema: function () {
        return this['geonet:info'].schema;
      },
      publish: function () {
        this['geonet:info'].isPublishedToAll = this.isPublished() ?
          'false' : 'true';
      },

      getLinks: function () {
        return this.link;
      },
      getLinkGroup: function (layer) {
        var links = this.getLinksByType('OGC');
        for (var i = 0; i < links.length; ++i) {
          var link = links[i];
          if (link.name == layer.getSource().getParams().LAYERS) {
            return link.group;
          }
        }
      },
      /**
       * Get all links of the metadata of the given types.
       * The types are strings in arguments.
       * You can give the exact matching with # ('#OG:WMS') or just find an
       * occurence for the match ('OGC').
       * You can passe several types to find ('OGC','WFS', '#getCapabilities')
       *
       * If the first argument is a number, you do the search within the link
       * group (search only onlinesrc in the given transferOptions).
       *
       * @return {*} an Array of links
       */
      getLinksByType: function () {
        var ret = [];

        var types = Array.prototype.splice.call(arguments, 0);
        var groupId;

        var key = types.join('|');
        if (angular.isNumber(types[0])) {
          groupId = types[0];
          types.splice(0, 1);
        }
        if (this.linksCache[key] && !groupId) {
          return this.linksCache[key];
        }
        angular.forEach(this.link, function (link) {
          var linkInfo = formatLink(link);
          if (types.length > 0) {
            types.forEach(function (type) {
              if (type.substr(0, 1) == '#') {
                if (linkInfo.protocol == type.substr(1, type.length - 1) &&
                  (!groupId || groupId == linkInfo.group)) {
                  ret.push(linkInfo);
                }
              } else {
                if (linkInfo.protocol.indexOf(type) >= 0 &&
                  (!groupId || groupId == linkInfo.group)) {
                  ret.push(linkInfo);
                }
              }
            });
          } else {
            ret.push(linkInfo);
          }
        });
        this.linksCache[key] = ret;
        return ret;
      },
      getThumbnails: function () {
        if (angular.isArray(this.image)) {
          var images = {
            list: []
          };
          for (var i = 0; i < this.image.length; i++) {
            var s = this.image[i].split('|');
            var insertFn = 'push';
            if (s[0] === 'thumbnail') {
              images.small = s[1];
              var insertFn = 'unshift';
            } else if (s[0] === 'overview') {
              images.big = s[1];
            }
            images.list[insertFn]({
              url: s[1],
              label: s[2]
            });
          }
        }
        return images;
      },
      /**
       * Return an object containing metadata contacts
       * as an array and resource contacts as array
       *
       * @return {{metadata: Array, resource: Array}}
       */
      getAllContacts: function () {
        if (angular.isUndefined(this.allContacts) &&
          angular.isDefined(this.responsibleParty)) {
          this.allContacts = {
            metadata: [],
            resource: []
          };
          for (var i = 0; i < this.responsibleParty.length; i++) {
            var s = this.responsibleParty[i].split('|');
            var contact = {
              role: s[0] || '',
              org: s[2] || '',
              logo: s[3] || '',
              email: s[4] || '',
              name: s[5] || '',
              position: s[6] || '',
              address: s[7] || '',
              phone: s[8] || ''
            };
            if (s[1] === 'resource') {
              this.allContacts.resource.push(contact);
            } else if (s[1] === 'metadata') {
              this.allContacts.metadata.push(contact);
            }
          }
        }
        return this.allContacts;
      },
      /**
       * Deprecated. Use getAllContacts instead
       */
      getContacts: function () {
        var ret = {};
        if (angular.isArray(this.responsibleParty)) {
          for (var i = 0; i < this.responsibleParty.length; i++) {
            var s = this.responsibleParty[i].split('|');
            if (s[1] === 'resource') {
              ret.resource = s[2];
            } else if (s[1] === 'metadata') {
              ret.metadata = s[2];
            }
          }
        }
        return ret;
      },
      getBoxAsPolygon: function (i) {
        // Polygon((4.6810%2045.9170,5.0670%2045.9170,5.0670%2045.5500,4.6810%2045.5500,4.6810%2045.9170))
        var bboxes = [];
        if (this.geoBox[i]) {
          var coords = this.geoBox[i].split('|');
          return 'Polygon((' +
            coords[0] + ' ' +
            coords[1] + ',' +
            coords[2] + ' ' +
            coords[1] + ',' +
            coords[2] + ' ' +
            coords[3] + ',' +
            coords[0] + ' ' +
            coords[3] + ',' +
            coords[0] + ' ' +
            coords[1] + '))';
        } else {
          return null;
        }
      },
      getOwnername: function () {
        if (this.userinfo) {
          var userinfo = this.userinfo.split('|');
          try {
            if (userinfo[2] !== userinfo[1]) {
              return userinfo[2] + ' ' + userinfo[1];
            } else {
              return userinfo[1];
            }
          } catch (e) {
            return '';
          }
        } else {
          return '';
        }
      },
      isWorkflowEnabled: function () {
        var st = this.mdStatus;
        var res = st &&
          //Status is unknown
          (!isNaN(st) && st != '0');

        //What if it is an array: gmd:MD_ProgressCode
        if (!res && Array.isArray(st)) {
          angular.forEach(st, function (s) {
            if (!isNaN(s) && s != '0') {
              res = true;
            }
          });
        }
        return res;
      }
    };
    return Metadata;
  });
