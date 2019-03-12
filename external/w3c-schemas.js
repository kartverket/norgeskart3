(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.w3cSchemas = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Atom_1_0_Module_Factory = function () {
  var Atom_1_0 = {
    n: 'Atom_1_0',
    dens: 'http:\/\/www.w3.org\/2005\/Atom',
    tis: [{
        ln: 'Link',
        tn: null,
        ps: [{
            n: 'href',
            rq: true,
            ti: 'AnySimpleType',
            an: {
              lp: 'href'
            },
            t: 'a'
          }, {
            n: 'rel',
            ti: 'AnySimpleType',
            an: {
              lp: 'rel'
            },
            t: 'a'
          }, {
            n: 'type',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'hreflang',
            an: {
              lp: 'hreflang'
            },
            t: 'a'
          }, {
            n: 'title',
            ti: 'AnySimpleType',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'length',
            ti: 'AnySimpleType',
            an: {
              lp: 'length'
            },
            t: 'a'
          }]
      }, {
        ln: 'AtomPersonConstruct',
        tn: 'atomPersonConstruct',
        ps: [{
            n: 'nameOrUriOrEmail',
            mno: 0,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'email'
              }, {
                en: 'uri'
              }, {
                en: 'name'
              }],
            t: 'ers'
          }]
      }],
    eis: [{
        en: 'email'
      }, {
        en: 'name'
      }, {
        en: 'uri'
      }, {
        en: 'link',
        ti: '.Link'
      }, {
        en: 'author',
        ti: '.AtomPersonConstruct'
      }]
  };
  return {
    Atom_1_0: Atom_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], Atom_1_0_Module_Factory);
}
else {
  var Atom_1_0_Module = Atom_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.Atom_1_0 = Atom_1_0_Module.Atom_1_0;
  }
  else {
    var Atom_1_0 = Atom_1_0_Module.Atom_1_0;
  }
}
},{}],2:[function(require,module,exports){
var WS_Addr_1_0_Core_Module_Factory = function () {
  var WS_Addr_1_0_Core = {
    n: 'WS_Addr_1_0_Core',
    dens: 'http:\/\/www.w3.org\/2005\/08\/addressing',
    tis: [{
        ln: 'AttributedUnsignedLongType',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'value',
            ti: 'UnsignedLong',
            t: 'v'
          }]
      }, {
        ln: 'EndpointReferenceType',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'address',
            rq: true,
            en: 'Address',
            ti: '.AttributedURIType'
          }, {
            n: 'referenceParameters',
            en: 'ReferenceParameters',
            ti: '.ReferenceParametersType'
          }, {
            n: 'metadata',
            en: 'Metadata',
            ti: '.MetadataType'
          }, {
            n: 'any',
            mno: 0,
            col: true,
            mx: false,
            t: 'ae'
          }]
      }, {
        ln: 'AttributedAnyType',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'any',
            rq: true,
            mx: false,
            t: 'ae'
          }]
      }, {
        ln: 'AttributedQNameType',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'value',
            ti: 'QName',
            t: 'v'
          }]
      }, {
        ln: 'ProblemActionType',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'action',
            en: 'Action',
            ti: '.AttributedURIType'
          }, {
            n: 'soapAction',
            en: 'SoapAction'
          }]
      }, {
        ln: 'RelatesToType',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'value',
            t: 'v'
          }, {
            n: 'relationshipType',
            an: {
              lp: 'RelationshipType'
            },
            t: 'a'
          }]
      }, {
        ln: 'MetadataType',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'any',
            mno: 0,
            col: true,
            mx: false,
            t: 'ae'
          }]
      }, {
        ln: 'AttributedURIType',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'value',
            t: 'v'
          }]
      }, {
        ln: 'ReferenceParametersType',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'any',
            mno: 0,
            col: true,
            mx: false,
            t: 'ae'
          }]
      }],
    eis: [{
        en: 'RetryAfter',
        ti: '.AttributedUnsignedLongType'
      }, {
        en: 'Action',
        ti: '.AttributedURIType'
      }, {
        en: 'ReplyTo',
        ti: '.EndpointReferenceType'
      }, {
        en: 'Metadata',
        ti: '.MetadataType'
      }, {
        en: 'ProblemAction',
        ti: '.ProblemActionType'
      }, {
        en: 'MessageID',
        ti: '.AttributedURIType'
      }, {
        en: 'FaultTo',
        ti: '.EndpointReferenceType'
      }, {
        en: 'ProblemHeader',
        ti: '.AttributedAnyType'
      }, {
        en: 'RelatesTo',
        ti: '.RelatesToType'
      }, {
        en: 'EndpointReference',
        ti: '.EndpointReferenceType'
      }, {
        en: 'ProblemIRI',
        ti: '.AttributedURIType'
      }, {
        en: 'ProblemHeaderQName',
        ti: '.AttributedQNameType'
      }, {
        en: 'From',
        ti: '.EndpointReferenceType'
      }, {
        en: 'To',
        ti: '.AttributedURIType'
      }]
  };
  return {
    WS_Addr_1_0_Core: WS_Addr_1_0_Core
  };
};
if (typeof define === 'function' && define.amd) {
  define([], WS_Addr_1_0_Core_Module_Factory);
}
else {
  var WS_Addr_1_0_Core_Module = WS_Addr_1_0_Core_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.WS_Addr_1_0_Core = WS_Addr_1_0_Core_Module.WS_Addr_1_0_Core;
  }
  else {
    var WS_Addr_1_0_Core = WS_Addr_1_0_Core_Module.WS_Addr_1_0_Core;
  }
}
},{}],3:[function(require,module,exports){
var XHTML_1_0_Strict_Module_Factory = function () {
  var XHTML_1_0_Strict = {
    n: 'XHTML_1_0_Strict',
    dens: 'http:\/\/www.w3.org\/1999\/xhtml',
    tis: [{
        ln: 'Pre',
        tn: null,
        bti: '.PreContent',
        ps: [{
            n: 'space',
            an: {
              lp: 'space',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Optgroup',
        tn: null,
        ps: [{
            n: 'option',
            rq: true,
            col: true,
            ti: '.Option'
          }, {
            n: 'disabled',
            an: {
              lp: 'disabled'
            },
            t: 'a'
          }, {
            n: 'label',
            rq: true,
            an: {
              lp: 'label'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'H5',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Textarea',
        tn: null,
        ps: [{
            n: 'content',
            t: 'v'
          }, {
            n: 'name',
            ti: 'AnySimpleType',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'rows',
            rq: true,
            ti: 'NonNegativeInteger',
            an: {
              lp: 'rows'
            },
            t: 'a'
          }, {
            n: 'cols',
            rq: true,
            ti: 'NonNegativeInteger',
            an: {
              lp: 'cols'
            },
            t: 'a'
          }, {
            n: 'disabled',
            an: {
              lp: 'disabled'
            },
            t: 'a'
          }, {
            n: 'readonly',
            an: {
              lp: 'readonly'
            },
            t: 'a'
          }, {
            n: 'onselect',
            an: {
              lp: 'onselect'
            },
            t: 'a'
          }, {
            n: 'onchange',
            an: {
              lp: 'onchange'
            },
            t: 'a'
          }, {
            n: 'accesskey',
            an: {
              lp: 'accesskey'
            },
            t: 'a'
          }, {
            n: 'tabindex',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'tabindex'
            },
            t: 'a'
          }, {
            n: 'onfocus',
            an: {
              lp: 'onfocus'
            },
            t: 'a'
          }, {
            n: 'onblur',
            an: {
              lp: 'onblur'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Ins',
        tn: null,
        bti: '.Flow',
        ps: [{
            n: 'cite',
            an: {
              lp: 'cite'
            },
            t: 'a'
          }, {
            n: 'datetime',
            ti: 'DateTime',
            an: {
              lp: 'datetime'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Tfoot',
        tn: null,
        ps: [{
            n: 'tr',
            rq: true,
            col: true,
            ti: '.Tr'
          }, {
            n: 'align',
            an: {
              lp: 'align'
            },
            t: 'a'
          }, {
            n: '_char',
            an: {
              lp: 'char'
            },
            t: 'a'
          }, {
            n: 'charoff',
            an: {
              lp: 'charoff'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }, {
            n: 'valign',
            an: {
              lp: 'valign'
            },
            t: 'a'
          }]
      }, {
        ln: 'Dd',
        tn: null,
        bti: '.Flow',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Th',
        tn: null,
        bti: '.Flow',
        ps: [{
            n: 'abbr',
            an: {
              lp: 'abbr'
            },
            t: 'a'
          }, {
            n: 'axis',
            ti: 'AnySimpleType',
            an: {
              lp: 'axis'
            },
            t: 'a'
          }, {
            n: 'headers',
            ti: 'IDREFS',
            an: {
              lp: 'headers'
            },
            t: 'a'
          }, {
            n: 'scope',
            ti: 'Token',
            an: {
              lp: 'scope'
            },
            t: 'a'
          }, {
            n: 'rowspan',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'rowspan'
            },
            t: 'a'
          }, {
            n: 'colspan',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'colspan'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }, {
            n: 'align',
            an: {
              lp: 'align'
            },
            t: 'a'
          }, {
            n: '_char',
            an: {
              lp: 'char'
            },
            t: 'a'
          }, {
            n: 'charoff',
            an: {
              lp: 'charoff'
            },
            t: 'a'
          }, {
            n: 'valign',
            an: {
              lp: 'valign'
            },
            t: 'a'
          }]
      }, {
        ln: 'I',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Title',
        tn: null,
        ps: [{
            n: 'content',
            t: 'v'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }]
      }, {
        ln: 'FormContent',
        tn: 'form.content',
        ps: [{
            n: 'pOrH1OrH2',
            mno: 0,
            col: true,
            etis: [{
                en: 'p',
                ti: '.P'
              }, {
                en: 'h1',
                ti: '.H1'
              }, {
                en: 'h2',
                ti: '.H2'
              }, {
                en: 'h3',
                ti: '.H3'
              }, {
                en: 'h4',
                ti: '.H4'
              }, {
                en: 'h5',
                ti: '.H5'
              }, {
                en: 'h6',
                ti: '.H6'
              }, {
                en: 'div',
                ti: '.Div'
              }, {
                en: 'ul',
                ti: '.Ul'
              }, {
                en: 'ol',
                ti: '.Ol'
              }, {
                en: 'dl',
                ti: '.Dl'
              }, {
                en: 'pre',
                ti: '.Pre'
              }, {
                en: 'hr',
                ti: '.Hr'
              }, {
                en: 'blockquote',
                ti: '.Blockquote'
              }, {
                en: 'address',
                ti: '.Address'
              }, {
                en: 'fieldset',
                ti: '.Fieldset'
              }, {
                en: 'table',
                ti: '.Table'
              }, {
                en: 'noscript',
                ti: '.Noscript'
              }, {
                en: 'ins',
                ti: '.Ins'
              }, {
                en: 'del',
                ti: '.Del'
              }, {
                en: 'script',
                ti: '.Script'
              }],
            t: 'es'
          }]
      }, {
        ln: 'Sub',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Span',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Html',
        tn: null,
        ps: [{
            n: 'head',
            rq: true,
            ti: '.Head'
          }, {
            n: 'body',
            rq: true,
            ti: '.Body'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }]
      }, {
        ln: 'Tr',
        tn: null,
        ps: [{
            n: 'thOrTd',
            rq: true,
            col: true,
            etis: [{
                en: 'th',
                ti: '.Th'
              }, {
                en: 'td',
                ti: '.Td'
              }],
            t: 'es'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }, {
            n: 'align',
            an: {
              lp: 'align'
            },
            t: 'a'
          }, {
            n: '_char',
            an: {
              lp: 'char'
            },
            t: 'a'
          }, {
            n: 'charoff',
            an: {
              lp: 'charoff'
            },
            t: 'a'
          }, {
            n: 'valign',
            an: {
              lp: 'valign'
            },
            t: 'a'
          }]
      }, {
        ln: 'H6',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Em',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Input',
        tn: null,
        ps: [{
            n: 'type',
            ti: 'Token',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'AnySimpleType',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'value',
            ti: 'AnySimpleType',
            an: {
              lp: 'value'
            },
            t: 'a'
          }, {
            n: 'checked',
            an: {
              lp: 'checked'
            },
            t: 'a'
          }, {
            n: 'disabled',
            an: {
              lp: 'disabled'
            },
            t: 'a'
          }, {
            n: 'readonly',
            an: {
              lp: 'readonly'
            },
            t: 'a'
          }, {
            n: 'size',
            ti: 'AnySimpleType',
            an: {
              lp: 'size'
            },
            t: 'a'
          }, {
            n: 'maxlength',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'maxlength'
            },
            t: 'a'
          }, {
            n: 'src',
            an: {
              lp: 'src'
            },
            t: 'a'
          }, {
            n: 'alt',
            ti: 'AnySimpleType',
            an: {
              lp: 'alt'
            },
            t: 'a'
          }, {
            n: 'usemap',
            an: {
              lp: 'usemap'
            },
            t: 'a'
          }, {
            n: 'onselect',
            an: {
              lp: 'onselect'
            },
            t: 'a'
          }, {
            n: 'onchange',
            an: {
              lp: 'onchange'
            },
            t: 'a'
          }, {
            n: 'accept',
            an: {
              lp: 'accept'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }, {
            n: 'accesskey',
            an: {
              lp: 'accesskey'
            },
            t: 'a'
          }, {
            n: 'tabindex',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'tabindex'
            },
            t: 'a'
          }, {
            n: 'onfocus',
            an: {
              lp: 'onfocus'
            },
            t: 'a'
          }, {
            n: 'onblur',
            an: {
              lp: 'onblur'
            },
            t: 'a'
          }]
      }, {
        ln: 'Hr',
        tn: null,
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Img',
        tn: null,
        ps: [{
            n: 'src',
            rq: true,
            an: {
              lp: 'src'
            },
            t: 'a'
          }, {
            n: 'alt',
            rq: true,
            an: {
              lp: 'alt'
            },
            t: 'a'
          }, {
            n: 'longdesc',
            an: {
              lp: 'longdesc'
            },
            t: 'a'
          }, {
            n: 'height',
            an: {
              lp: 'height'
            },
            t: 'a'
          }, {
            n: 'width',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'usemap',
            an: {
              lp: 'usemap'
            },
            t: 'a'
          }, {
            n: 'ismap',
            an: {
              lp: 'ismap'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Dl',
        tn: null,
        ps: [{
            n: 'dtOrDd',
            rq: true,
            col: true,
            etis: [{
                en: 'dt',
                ti: '.Dt'
              }, {
                en: 'dd',
                ti: '.Dd'
              }],
            t: 'es'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Sup',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Label',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: '_for',
            ti: 'IDREF',
            an: {
              lp: 'for'
            },
            t: 'a'
          }, {
            n: 'accesskey',
            an: {
              lp: 'accesskey'
            },
            t: 'a'
          }, {
            n: 'onfocus',
            an: {
              lp: 'onfocus'
            },
            t: 'a'
          }, {
            n: 'onblur',
            an: {
              lp: 'onblur'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Ol',
        tn: null,
        ps: [{
            n: 'li',
            rq: true,
            col: true,
            ti: '.Li'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Noscript',
        tn: null,
        bti: '.Block',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'H2',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Var',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Body',
        tn: null,
        bti: '.Block',
        ps: [{
            n: 'onload',
            an: {
              lp: 'onload'
            },
            t: 'a'
          }, {
            n: 'onunload',
            an: {
              lp: 'onunload'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'AContent',
        tn: 'a.content',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            etis: [{
                en: 'cite',
                ti: '.Cite'
              }, {
                en: 'sup',
                ti: '.Sup'
              }, {
                en: 'label',
                ti: '.Label'
              }, {
                en: 'object',
                ti: '.Object'
              }, {
                en: 'var',
                ti: '.Var'
              }, {
                en: 'textarea',
                ti: '.Textarea'
              }, {
                en: 'select',
                ti: '.Select'
              }, {
                en: 'samp',
                ti: '.Samp'
              }, {
                en: 'q',
                ti: '.Q'
              }, {
                en: 'br',
                ti: '.Br'
              }, {
                en: 'abbr',
                ti: '.Abbr'
              }, {
                en: 'bdo',
                ti: '.Bdo'
              }, {
                en: 'map',
                ti: '.Map'
              }, {
                en: 'dfn',
                ti: '.Dfn'
              }, {
                en: 'tt',
                ti: '.Tt'
              }, {
                en: 'code',
                ti: '.Code'
              }, {
                en: 'big',
                ti: '.Big'
              }, {
                en: 'kbd',
                ti: '.Kbd'
              }, {
                en: 'em',
                ti: '.Em'
              }, {
                en: 'script',
                ti: '.Script'
              }, {
                en: 'input',
                ti: '.Input'
              }, {
                en: 'del',
                ti: '.Del'
              }, {
                en: 'acronym',
                ti: '.Acronym'
              }, {
                en: 'span',
                ti: '.Span'
              }, {
                en: 'i',
                ti: '.I'
              }, {
                en: 'ins',
                ti: '.Ins'
              }, {
                en: 'sub',
                ti: '.Sub'
              }, {
                en: 'small',
                ti: '.Small'
              }, {
                en: 'img',
                ti: '.Img'
              }, {
                en: 'strong',
                ti: '.Strong'
              }, {
                en: 'b',
                ti: '.B'
              }, {
                en: 'button',
                ti: '.Button'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'Blockquote',
        tn: null,
        bti: '.Block',
        ps: [{
            n: 'cite',
            an: {
              lp: 'cite'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Thead',
        tn: null,
        ps: [{
            n: 'tr',
            rq: true,
            col: true,
            ti: '.Tr'
          }, {
            n: 'align',
            an: {
              lp: 'align'
            },
            t: 'a'
          }, {
            n: '_char',
            an: {
              lp: 'char'
            },
            t: 'a'
          }, {
            n: 'charoff',
            an: {
              lp: 'charoff'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }, {
            n: 'valign',
            an: {
              lp: 'valign'
            },
            t: 'a'
          }]
      }, {
        ln: 'Colgroup',
        tn: null,
        ps: [{
            n: 'col',
            mno: 0,
            col: true,
            ti: '.Col'
          }, {
            n: 'span',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'span'
            },
            t: 'a'
          }, {
            n: 'width',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'align',
            an: {
              lp: 'align'
            },
            t: 'a'
          }, {
            n: '_char',
            an: {
              lp: 'char'
            },
            t: 'a'
          }, {
            n: 'charoff',
            an: {
              lp: 'charoff'
            },
            t: 'a'
          }, {
            n: 'valign',
            an: {
              lp: 'valign'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'H4',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Meta',
        tn: null,
        ps: [{
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'httpEquiv',
            ti: 'AnySimpleType',
            an: {
              lp: 'http-equiv'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'AnySimpleType',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'content',
            rq: true,
            ti: 'AnySimpleType',
            an: {
              lp: 'content'
            },
            t: 'a'
          }, {
            n: 'scheme',
            ti: 'AnySimpleType',
            an: {
              lp: 'scheme'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }]
      }, {
        ln: 'Bdo',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            rq: true,
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'PreContent',
        tn: 'pre.content',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            etis: [{
                en: 'cite',
                ti: '.Cite'
              }, {
                en: 'sup',
                ti: '.Sup'
              }, {
                en: 'label',
                ti: '.Label'
              }, {
                en: 'var',
                ti: '.Var'
              }, {
                en: 'textarea',
                ti: '.Textarea'
              }, {
                en: 'select',
                ti: '.Select'
              }, {
                en: 'samp',
                ti: '.Samp'
              }, {
                en: 'q',
                ti: '.Q'
              }, {
                en: 'abbr',
                ti: '.Abbr'
              }, {
                en: 'br',
                ti: '.Br'
              }, {
                en: 'bdo',
                ti: '.Bdo'
              }, {
                en: 'dfn',
                ti: '.Dfn'
              }, {
                en: 'map',
                ti: '.Map'
              }, {
                en: 'tt',
                ti: '.Tt'
              }, {
                en: 'code',
                ti: '.Code'
              }, {
                en: 'kbd',
                ti: '.Kbd'
              }, {
                en: 'big',
                ti: '.Big'
              }, {
                en: 'em',
                ti: '.Em'
              }, {
                en: 'input',
                ti: '.Input'
              }, {
                en: 'script',
                ti: '.Script'
              }, {
                en: 'acronym',
                ti: '.Acronym'
              }, {
                en: 'del',
                ti: '.Del'
              }, {
                en: 'span',
                ti: '.Span'
              }, {
                en: 'i',
                ti: '.I'
              }, {
                en: 'ins',
                ti: '.Ins'
              }, {
                en: 'a',
                ti: '.A'
              }, {
                en: 'sub',
                ti: '.Sub'
              }, {
                en: 'small',
                ti: '.Small'
              }, {
                en: 'strong',
                ti: '.Strong'
              }, {
                en: 'b',
                ti: '.B'
              }, {
                en: 'button',
                ti: '.Button'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'Big',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Option',
        tn: null,
        ps: [{
            n: 'content',
            t: 'v'
          }, {
            n: 'selected',
            an: {
              lp: 'selected'
            },
            t: 'a'
          }, {
            n: 'disabled',
            an: {
              lp: 'disabled'
            },
            t: 'a'
          }, {
            n: 'label',
            an: {
              lp: 'label'
            },
            t: 'a'
          }, {
            n: 'value',
            ti: 'AnySimpleType',
            an: {
              lp: 'value'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'P',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Cite',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Area',
        tn: null,
        ps: [{
            n: 'shape',
            ti: 'Token',
            an: {
              lp: 'shape'
            },
            t: 'a'
          }, {
            n: 'coords',
            an: {
              lp: 'coords'
            },
            t: 'a'
          }, {
            n: 'href',
            an: {
              lp: 'href'
            },
            t: 'a'
          }, {
            n: 'nohref',
            an: {
              lp: 'nohref'
            },
            t: 'a'
          }, {
            n: 'alt',
            rq: true,
            an: {
              lp: 'alt'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }, {
            n: 'accesskey',
            an: {
              lp: 'accesskey'
            },
            t: 'a'
          }, {
            n: 'tabindex',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'tabindex'
            },
            t: 'a'
          }, {
            n: 'onfocus',
            an: {
              lp: 'onfocus'
            },
            t: 'a'
          }, {
            n: 'onblur',
            an: {
              lp: 'onblur'
            },
            t: 'a'
          }]
      }, {
        ln: 'Td',
        tn: null,
        bti: '.Flow',
        ps: [{
            n: 'abbr',
            an: {
              lp: 'abbr'
            },
            t: 'a'
          }, {
            n: 'axis',
            ti: 'AnySimpleType',
            an: {
              lp: 'axis'
            },
            t: 'a'
          }, {
            n: 'headers',
            ti: 'IDREFS',
            an: {
              lp: 'headers'
            },
            t: 'a'
          }, {
            n: 'scope',
            ti: 'Token',
            an: {
              lp: 'scope'
            },
            t: 'a'
          }, {
            n: 'rowspan',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'rowspan'
            },
            t: 'a'
          }, {
            n: 'colspan',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'colspan'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }, {
            n: 'valign',
            an: {
              lp: 'valign'
            },
            t: 'a'
          }, {
            n: 'align',
            an: {
              lp: 'align'
            },
            t: 'a'
          }, {
            n: '_char',
            an: {
              lp: 'char'
            },
            t: 'a'
          }, {
            n: 'charoff',
            an: {
              lp: 'charoff'
            },
            t: 'a'
          }]
      }, {
        ln: 'Br',
        tn: null,
        ps: [{
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }]
      }, {
        ln: 'Tbody',
        tn: null,
        ps: [{
            n: 'tr',
            rq: true,
            col: true,
            ti: '.Tr'
          }, {
            n: 'valign',
            an: {
              lp: 'valign'
            },
            t: 'a'
          }, {
            n: 'align',
            an: {
              lp: 'align'
            },
            t: 'a'
          }, {
            n: '_char',
            an: {
              lp: 'char'
            },
            t: 'a'
          }, {
            n: 'charoff',
            an: {
              lp: 'charoff'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Map',
        tn: null,
        ps: [{
            n: 'pOrH1OrH2',
            rq: true,
            col: true,
            etis: [{
                en: 'p',
                ti: '.P'
              }, {
                en: 'h1',
                ti: '.H1'
              }, {
                en: 'h2',
                ti: '.H2'
              }, {
                en: 'h3',
                ti: '.H3'
              }, {
                en: 'h4',
                ti: '.H4'
              }, {
                en: 'h5',
                ti: '.H5'
              }, {
                en: 'h6',
                ti: '.H6'
              }, {
                en: 'div',
                ti: '.Div'
              }, {
                en: 'ul',
                ti: '.Ul'
              }, {
                en: 'ol',
                ti: '.Ol'
              }, {
                en: 'dl',
                ti: '.Dl'
              }, {
                en: 'pre',
                ti: '.Pre'
              }, {
                en: 'hr',
                ti: '.Hr'
              }, {
                en: 'blockquote',
                ti: '.Blockquote'
              }, {
                en: 'address',
                ti: '.Address'
              }, {
                en: 'fieldset',
                ti: '.Fieldset'
              }, {
                en: 'table',
                ti: '.Table'
              }, {
                en: 'form',
                ti: '.Form'
              }, {
                en: 'noscript',
                ti: '.Noscript'
              }, {
                en: 'ins',
                ti: '.Ins'
              }, {
                en: 'del',
                ti: '.Del'
              }, {
                en: 'script',
                ti: '.Script'
              }],
            t: 'es'
          }, {
            n: 'area',
            rq: true,
            col: true,
            ti: '.Area'
          }, {
            n: 'id',
            rq: true,
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: 'AnySimpleType',
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'NMToken',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Script',
        tn: null,
        ps: [{
            n: 'content',
            t: 'v'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'charset',
            an: {
              lp: 'charset'
            },
            t: 'a'
          }, {
            n: 'type',
            rq: true,
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'src',
            an: {
              lp: 'src'
            },
            t: 'a'
          }, {
            n: 'defer',
            an: {
              lp: 'defer'
            },
            t: 'a'
          }, {
            n: 'space',
            an: {
              lp: 'space',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'Flow',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            etis: [{
                en: 'cite',
                ti: '.Cite'
              }, {
                en: 'sup',
                ti: '.Sup'
              }, {
                en: 'object',
                ti: '.Object'
              }, {
                en: 'textarea',
                ti: '.Textarea'
              }, {
                en: 'ul',
                ti: '.Ul'
              }, {
                en: 'br',
                ti: '.Br'
              }, {
                en: 'abbr',
                ti: '.Abbr'
              }, {
                en: 'map',
                ti: '.Map'
              }, {
                en: 'dfn',
                ti: '.Dfn'
              }, {
                en: 'h2',
                ti: '.H2'
              }, {
                en: 'p',
                ti: '.P'
              }, {
                en: 'h5',
                ti: '.H5'
              }, {
                en: 'big',
                ti: '.Big'
              }, {
                en: 'kbd',
                ti: '.Kbd'
              }, {
                en: 'em',
                ti: '.Em'
              }, {
                en: 'h6',
                ti: '.H6'
              }, {
                en: 'h3',
                ti: '.H3'
              }, {
                en: 'address',
                ti: '.Address'
              }, {
                en: 'script',
                ti: '.Script'
              }, {
                en: 'input',
                ti: '.Input'
              }, {
                en: 'del',
                ti: '.Del'
              }, {
                en: 'fieldset',
                ti: '.Fieldset'
              }, {
                en: 'blockquote',
                ti: '.Blockquote'
              }, {
                en: 'acronym',
                ti: '.Acronym'
              }, {
                en: 'span',
                ti: '.Span'
              }, {
                en: 'i',
                ti: '.I'
              }, {
                en: 'sub',
                ti: '.Sub'
              }, {
                en: 'strong',
                ti: '.Strong'
              }, {
                en: 'h4',
                ti: '.H4'
              }, {
                en: 'pre',
                ti: '.Pre'
              }, {
                en: 'hr',
                ti: '.Hr'
              }, {
                en: 'label',
                ti: '.Label'
              }, {
                en: 'table',
                ti: '.Table'
              }, {
                en: 'var',
                ti: '.Var'
              }, {
                en: 'select',
                ti: '.Select'
              }, {
                en: 'samp',
                ti: '.Samp'
              }, {
                en: 'dl',
                ti: '.Dl'
              }, {
                en: 'div',
                ti: '.Div'
              }, {
                en: 'q',
                ti: '.Q'
              }, {
                en: 'bdo',
                ti: '.Bdo'
              }, {
                en: 'tt',
                ti: '.Tt'
              }, {
                en: 'ol',
                ti: '.Ol'
              }, {
                en: 'code',
                ti: '.Code'
              }, {
                en: 'noscript',
                ti: '.Noscript'
              }, {
                en: 'ins',
                ti: '.Ins'
              }, {
                en: 'a',
                ti: '.A'
              }, {
                en: 'img',
                ti: '.Img'
              }, {
                en: 'small',
                ti: '.Small'
              }, {
                en: 'b',
                ti: '.B'
              }, {
                en: 'form',
                ti: '.Form'
              }, {
                en: 'button',
                ti: '.Button'
              }, {
                en: 'h1',
                ti: '.H1'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'Kbd',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Abbr',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Dt',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Base',
        tn: null,
        ps: [{
            n: 'href',
            rq: true,
            an: {
              lp: 'href'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'H3',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Block',
        ps: [{
            n: 'pOrH1OrH2',
            mno: 0,
            col: true,
            etis: [{
                en: 'p',
                ti: '.P'
              }, {
                en: 'h1',
                ti: '.H1'
              }, {
                en: 'h2',
                ti: '.H2'
              }, {
                en: 'h3',
                ti: '.H3'
              }, {
                en: 'h4',
                ti: '.H4'
              }, {
                en: 'h5',
                ti: '.H5'
              }, {
                en: 'h6',
                ti: '.H6'
              }, {
                en: 'div',
                ti: '.Div'
              }, {
                en: 'ul',
                ti: '.Ul'
              }, {
                en: 'ol',
                ti: '.Ol'
              }, {
                en: 'dl',
                ti: '.Dl'
              }, {
                en: 'pre',
                ti: '.Pre'
              }, {
                en: 'hr',
                ti: '.Hr'
              }, {
                en: 'blockquote',
                ti: '.Blockquote'
              }, {
                en: 'address',
                ti: '.Address'
              }, {
                en: 'fieldset',
                ti: '.Fieldset'
              }, {
                en: 'table',
                ti: '.Table'
              }, {
                en: 'form',
                ti: '.Form'
              }, {
                en: 'noscript',
                ti: '.Noscript'
              }, {
                en: 'ins',
                ti: '.Ins'
              }, {
                en: 'del',
                ti: '.Del'
              }, {
                en: 'script',
                ti: '.Script'
              }],
            t: 'es'
          }]
      }, {
        ln: 'Legend',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'accesskey',
            an: {
              lp: 'accesskey'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Small',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Table',
        tn: null,
        ps: [{
            n: 'caption',
            ti: '.Caption'
          }, {
            n: 'col',
            mno: 0,
            col: true,
            ti: '.Col'
          }, {
            n: 'colgroup',
            mno: 0,
            col: true,
            ti: '.Colgroup'
          }, {
            n: 'thead',
            ti: '.Thead'
          }, {
            n: 'tfoot',
            ti: '.Tfoot'
          }, {
            n: 'tbody',
            rq: true,
            col: true,
            ti: '.Tbody'
          }, {
            n: 'tr',
            rq: true,
            col: true,
            ti: '.Tr'
          }, {
            n: 'summary',
            an: {
              lp: 'summary'
            },
            t: 'a'
          }, {
            n: 'width',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'border',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'border'
            },
            t: 'a'
          }, {
            n: 'frame',
            ti: 'Token',
            an: {
              lp: 'frame'
            },
            t: 'a'
          }, {
            n: 'rules',
            ti: 'Token',
            an: {
              lp: 'rules'
            },
            t: 'a'
          }, {
            n: 'cellspacing',
            an: {
              lp: 'cellspacing'
            },
            t: 'a'
          }, {
            n: 'cellpadding',
            an: {
              lp: 'cellpadding'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Fieldset',
        tn: null,
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            etis: [{
                en: 'cite',
                ti: '.Cite'
              }, {
                en: 'sup',
                ti: '.Sup'
              }, {
                en: 'object',
                ti: '.Object'
              }, {
                en: 'textarea',
                ti: '.Textarea'
              }, {
                en: 'ul',
                ti: '.Ul'
              }, {
                en: 'br',
                ti: '.Br'
              }, {
                en: 'abbr',
                ti: '.Abbr'
              }, {
                en: 'map',
                ti: '.Map'
              }, {
                en: 'dfn',
                ti: '.Dfn'
              }, {
                en: 'legend',
                ti: '.Legend'
              }, {
                en: 'h2',
                ti: '.H2'
              }, {
                en: 'p',
                ti: '.P'
              }, {
                en: 'h5',
                ti: '.H5'
              }, {
                en: 'big',
                ti: '.Big'
              }, {
                en: 'kbd',
                ti: '.Kbd'
              }, {
                en: 'em',
                ti: '.Em'
              }, {
                en: 'h6',
                ti: '.H6'
              }, {
                en: 'h3',
                ti: '.H3'
              }, {
                en: 'address',
                ti: '.Address'
              }, {
                en: 'script',
                ti: '.Script'
              }, {
                en: 'input',
                ti: '.Input'
              }, {
                en: 'del',
                ti: '.Del'
              }, {
                en: 'fieldset',
                ti: '.Fieldset'
              }, {
                en: 'blockquote',
                ti: '.Blockquote'
              }, {
                en: 'acronym',
                ti: '.Acronym'
              }, {
                en: 'span',
                ti: '.Span'
              }, {
                en: 'i',
                ti: '.I'
              }, {
                en: 'sub',
                ti: '.Sub'
              }, {
                en: 'strong',
                ti: '.Strong'
              }, {
                en: 'h4',
                ti: '.H4'
              }, {
                en: 'pre',
                ti: '.Pre'
              }, {
                en: 'hr',
                ti: '.Hr'
              }, {
                en: 'label',
                ti: '.Label'
              }, {
                en: 'table',
                ti: '.Table'
              }, {
                en: 'var',
                ti: '.Var'
              }, {
                en: 'select',
                ti: '.Select'
              }, {
                en: 'samp',
                ti: '.Samp'
              }, {
                en: 'dl',
                ti: '.Dl'
              }, {
                en: 'div',
                ti: '.Div'
              }, {
                en: 'q',
                ti: '.Q'
              }, {
                en: 'bdo',
                ti: '.Bdo'
              }, {
                en: 'tt',
                ti: '.Tt'
              }, {
                en: 'ol',
                ti: '.Ol'
              }, {
                en: 'code',
                ti: '.Code'
              }, {
                en: 'noscript',
                ti: '.Noscript'
              }, {
                en: 'ins',
                ti: '.Ins'
              }, {
                en: 'a',
                ti: '.A'
              }, {
                en: 'img',
                ti: '.Img'
              }, {
                en: 'small',
                ti: '.Small'
              }, {
                en: 'b',
                ti: '.B'
              }, {
                en: 'form',
                ti: '.Form'
              }, {
                en: 'button',
                ti: '.Button'
              }, {
                en: 'h1',
                ti: '.H1'
              }],
            t: 'ers'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Caption',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'H1',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Style',
        tn: null,
        ps: [{
            n: 'content',
            t: 'v'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'type',
            rq: true,
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'media',
            an: {
              lp: 'media'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'space',
            an: {
              lp: 'space',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }]
      }, {
        ln: 'Dfn',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Strong',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Q',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'cite',
            an: {
              lp: 'cite'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Div',
        tn: null,
        bti: '.Flow',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Del',
        tn: null,
        bti: '.Flow',
        ps: [{
            n: 'cite',
            an: {
              lp: 'cite'
            },
            t: 'a'
          }, {
            n: 'datetime',
            ti: 'DateTime',
            an: {
              lp: 'datetime'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Tt',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'ButtonContent',
        tn: 'button.content',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            etis: [{
                en: 'sup',
                ti: '.Sup'
              }, {
                en: 'cite',
                ti: '.Cite'
              }, {
                en: 'object',
                ti: '.Object'
              }, {
                en: 'var',
                ti: '.Var'
              }, {
                en: 'table',
                ti: '.Table'
              }, {
                en: 'ul',
                ti: '.Ul'
              }, {
                en: 'samp',
                ti: '.Samp'
              }, {
                en: 'dl',
                ti: '.Dl'
              }, {
                en: 'div',
                ti: '.Div'
              }, {
                en: 'q',
                ti: '.Q'
              }, {
                en: 'abbr',
                ti: '.Abbr'
              }, {
                en: 'br',
                ti: '.Br'
              }, {
                en: 'bdo',
                ti: '.Bdo'
              }, {
                en: 'dfn',
                ti: '.Dfn'
              }, {
                en: 'map',
                ti: '.Map'
              }, {
                en: 'h2',
                ti: '.H2'
              }, {
                en: 'h5',
                ti: '.H5'
              }, {
                en: 'p',
                ti: '.P'
              }, {
                en: 'tt',
                ti: '.Tt'
              }, {
                en: 'ol',
                ti: '.Ol'
              }, {
                en: 'code',
                ti: '.Code'
              }, {
                en: 'kbd',
                ti: '.Kbd'
              }, {
                en: 'big',
                ti: '.Big'
              }, {
                en: 'em',
                ti: '.Em'
              }, {
                en: 'h6',
                ti: '.H6'
              }, {
                en: 'h3',
                ti: '.H3'
              }, {
                en: 'noscript',
                ti: '.Noscript'
              }, {
                en: 'address',
                ti: '.Address'
              }, {
                en: 'script',
                ti: '.Script'
              }, {
                en: 'del',
                ti: '.Del'
              }, {
                en: 'acronym',
                ti: '.Acronym'
              }, {
                en: 'blockquote',
                ti: '.Blockquote'
              }, {
                en: 'span',
                ti: '.Span'
              }, {
                en: 'i',
                ti: '.I'
              }, {
                en: 'ins',
                ti: '.Ins'
              }, {
                en: 'sub',
                ti: '.Sub'
              }, {
                en: 'small',
                ti: '.Small'
              }, {
                en: 'img',
                ti: '.Img'
              }, {
                en: 'strong',
                ti: '.Strong'
              }, {
                en: 'b',
                ti: '.B'
              }, {
                en: 'h4',
                ti: '.H4'
              }, {
                en: 'pre',
                ti: '.Pre'
              }, {
                en: 'hr',
                ti: '.Hr'
              }, {
                en: 'h1',
                ti: '.H1'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'Form',
        tn: null,
        bti: '.FormContent',
        ps: [{
            n: 'action',
            rq: true,
            an: {
              lp: 'action'
            },
            t: 'a'
          }, {
            n: 'method',
            an: {
              lp: 'method'
            },
            t: 'a'
          }, {
            n: 'enctype',
            an: {
              lp: 'enctype'
            },
            t: 'a'
          }, {
            n: 'onsubmit',
            an: {
              lp: 'onsubmit'
            },
            t: 'a'
          }, {
            n: 'onreset',
            an: {
              lp: 'onreset'
            },
            t: 'a'
          }, {
            n: 'accept',
            an: {
              lp: 'accept'
            },
            t: 'a'
          }, {
            n: 'acceptCharset',
            an: {
              lp: 'accept-charset'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Acronym',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Head',
        tn: null,
        ps: [{
            n: 'content',
            rq: true,
            col: true,
            mx: false,
            dom: false,
            etis: [{
                en: 'object',
                ti: '.Object'
              }, {
                en: 'base',
                ti: '.Base'
              }, {
                en: 'link',
                ti: '.Link'
              }, {
                en: 'script',
                ti: '.Script'
              }, {
                en: 'meta',
                ti: '.Meta'
              }, {
                en: 'title',
                ti: '.Title'
              }, {
                en: 'style',
                ti: '.Style'
              }],
            t: 'ers'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'profile',
            an: {
              lp: 'profile'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }]
      }, {
        ln: 'Link',
        tn: null,
        ps: [{
            n: 'charset',
            an: {
              lp: 'charset'
            },
            t: 'a'
          }, {
            n: 'href',
            an: {
              lp: 'href'
            },
            t: 'a'
          }, {
            n: 'hreflang',
            ti: 'Language',
            an: {
              lp: 'hreflang'
            },
            t: 'a'
          }, {
            n: 'type',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'rel',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'rel'
            },
            t: 'a'
          }, {
            n: 'rev',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'rev'
            },
            t: 'a'
          }, {
            n: 'media',
            an: {
              lp: 'media'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Inline',
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            etis: [{
                en: 'cite',
                ti: '.Cite'
              }, {
                en: 'sup',
                ti: '.Sup'
              }, {
                en: 'label',
                ti: '.Label'
              }, {
                en: 'object',
                ti: '.Object'
              }, {
                en: 'var',
                ti: '.Var'
              }, {
                en: 'textarea',
                ti: '.Textarea'
              }, {
                en: 'select',
                ti: '.Select'
              }, {
                en: 'samp',
                ti: '.Samp'
              }, {
                en: 'q',
                ti: '.Q'
              }, {
                en: 'br',
                ti: '.Br'
              }, {
                en: 'abbr',
                ti: '.Abbr'
              }, {
                en: 'bdo',
                ti: '.Bdo'
              }, {
                en: 'map',
                ti: '.Map'
              }, {
                en: 'dfn',
                ti: '.Dfn'
              }, {
                en: 'tt',
                ti: '.Tt'
              }, {
                en: 'code',
                ti: '.Code'
              }, {
                en: 'big',
                ti: '.Big'
              }, {
                en: 'kbd',
                ti: '.Kbd'
              }, {
                en: 'em',
                ti: '.Em'
              }, {
                en: 'script',
                ti: '.Script'
              }, {
                en: 'input',
                ti: '.Input'
              }, {
                en: 'del',
                ti: '.Del'
              }, {
                en: 'acronym',
                ti: '.Acronym'
              }, {
                en: 'span',
                ti: '.Span'
              }, {
                en: 'i',
                ti: '.I'
              }, {
                en: 'ins',
                ti: '.Ins'
              }, {
                en: 'a',
                ti: '.A'
              }, {
                en: 'sub',
                ti: '.Sub'
              }, {
                en: 'small',
                ti: '.Small'
              }, {
                en: 'img',
                ti: '.Img'
              }, {
                en: 'b',
                ti: '.B'
              }, {
                en: 'strong',
                ti: '.Strong'
              }, {
                en: 'button',
                ti: '.Button'
              }],
            t: 'ers'
          }]
      }, {
        ln: 'Param',
        tn: null,
        ps: [{
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'AnySimpleType',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'value',
            ti: 'AnySimpleType',
            an: {
              lp: 'value'
            },
            t: 'a'
          }, {
            n: 'valuetype',
            an: {
              lp: 'valuetype'
            },
            t: 'a'
          }, {
            n: 'type',
            an: {
              lp: 'type'
            },
            t: 'a'
          }]
      }, {
        ln: 'Address',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Li',
        tn: null,
        bti: '.Flow',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Select',
        tn: null,
        ps: [{
            n: 'optgroupOrOption',
            rq: true,
            col: true,
            etis: [{
                en: 'optgroup',
                ti: '.Optgroup'
              }, {
                en: 'option',
                ti: '.Option'
              }],
            t: 'es'
          }, {
            n: 'name',
            ti: 'AnySimpleType',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'size',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'size'
            },
            t: 'a'
          }, {
            n: 'multiple',
            an: {
              lp: 'multiple'
            },
            t: 'a'
          }, {
            n: 'disabled',
            an: {
              lp: 'disabled'
            },
            t: 'a'
          }, {
            n: 'tabindex',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'tabindex'
            },
            t: 'a'
          }, {
            n: 'onfocus',
            an: {
              lp: 'onfocus'
            },
            t: 'a'
          }, {
            n: 'onblur',
            an: {
              lp: 'onblur'
            },
            t: 'a'
          }, {
            n: 'onchange',
            an: {
              lp: 'onchange'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Ul',
        tn: null,
        ps: [{
            n: 'li',
            rq: true,
            col: true,
            ti: '.Li'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Code',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Col',
        tn: null,
        ps: [{
            n: 'span',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'span'
            },
            t: 'a'
          }, {
            n: 'width',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'align',
            an: {
              lp: 'align'
            },
            t: 'a'
          }, {
            n: '_char',
            an: {
              lp: 'char'
            },
            t: 'a'
          }, {
            n: 'charoff',
            an: {
              lp: 'charoff'
            },
            t: 'a'
          }, {
            n: 'valign',
            an: {
              lp: 'valign'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Button',
        tn: null,
        bti: '.ButtonContent',
        ps: [{
            n: 'name',
            ti: 'AnySimpleType',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'value',
            ti: 'AnySimpleType',
            an: {
              lp: 'value'
            },
            t: 'a'
          }, {
            n: 'type',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'disabled',
            an: {
              lp: 'disabled'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }, {
            n: 'accesskey',
            an: {
              lp: 'accesskey'
            },
            t: 'a'
          }, {
            n: 'tabindex',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'tabindex'
            },
            t: 'a'
          }, {
            n: 'onfocus',
            an: {
              lp: 'onfocus'
            },
            t: 'a'
          }, {
            n: 'onblur',
            an: {
              lp: 'onblur'
            },
            t: 'a'
          }]
      }, {
        ln: 'A',
        tn: null,
        bti: '.AContent',
        ps: [{
            n: 'charset',
            an: {
              lp: 'charset'
            },
            t: 'a'
          }, {
            n: 'type',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'NMToken',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'href',
            an: {
              lp: 'href'
            },
            t: 'a'
          }, {
            n: 'hreflang',
            ti: 'Language',
            an: {
              lp: 'hreflang'
            },
            t: 'a'
          }, {
            n: 'rel',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'rel'
            },
            t: 'a'
          }, {
            n: 'rev',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'rev'
            },
            t: 'a'
          }, {
            n: 'shape',
            ti: 'Token',
            an: {
              lp: 'shape'
            },
            t: 'a'
          }, {
            n: 'coords',
            an: {
              lp: 'coords'
            },
            t: 'a'
          }, {
            n: 'accesskey',
            an: {
              lp: 'accesskey'
            },
            t: 'a'
          }, {
            n: 'tabindex',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'tabindex'
            },
            t: 'a'
          }, {
            n: 'onfocus',
            an: {
              lp: 'onfocus'
            },
            t: 'a'
          }, {
            n: 'onblur',
            an: {
              lp: 'onblur'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'B',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Object',
        tn: null,
        ps: [{
            n: 'content',
            col: true,
            dom: false,
            etis: [{
                en: 'cite',
                ti: '.Cite'
              }, {
                en: 'sup',
                ti: '.Sup'
              }, {
                en: 'object',
                ti: '.Object'
              }, {
                en: 'textarea',
                ti: '.Textarea'
              }, {
                en: 'ul',
                ti: '.Ul'
              }, {
                en: 'br',
                ti: '.Br'
              }, {
                en: 'abbr',
                ti: '.Abbr'
              }, {
                en: 'map',
                ti: '.Map'
              }, {
                en: 'dfn',
                ti: '.Dfn'
              }, {
                en: 'h2',
                ti: '.H2'
              }, {
                en: 'p',
                ti: '.P'
              }, {
                en: 'h5',
                ti: '.H5'
              }, {
                en: 'big',
                ti: '.Big'
              }, {
                en: 'kbd',
                ti: '.Kbd'
              }, {
                en: 'em',
                ti: '.Em'
              }, {
                en: 'h6',
                ti: '.H6'
              }, {
                en: 'h3',
                ti: '.H3'
              }, {
                en: 'address',
                ti: '.Address'
              }, {
                en: 'script',
                ti: '.Script'
              }, {
                en: 'input',
                ti: '.Input'
              }, {
                en: 'del',
                ti: '.Del'
              }, {
                en: 'fieldset',
                ti: '.Fieldset'
              }, {
                en: 'blockquote',
                ti: '.Blockquote'
              }, {
                en: 'acronym',
                ti: '.Acronym'
              }, {
                en: 'span',
                ti: '.Span'
              }, {
                en: 'i',
                ti: '.I'
              }, {
                en: 'sub',
                ti: '.Sub'
              }, {
                en: 'strong',
                ti: '.Strong'
              }, {
                en: 'h4',
                ti: '.H4'
              }, {
                en: 'pre',
                ti: '.Pre'
              }, {
                en: 'hr',
                ti: '.Hr'
              }, {
                en: 'label',
                ti: '.Label'
              }, {
                en: 'table',
                ti: '.Table'
              }, {
                en: 'var',
                ti: '.Var'
              }, {
                en: 'select',
                ti: '.Select'
              }, {
                en: 'param',
                ti: '.Param'
              }, {
                en: 'samp',
                ti: '.Samp'
              }, {
                en: 'dl',
                ti: '.Dl'
              }, {
                en: 'div',
                ti: '.Div'
              }, {
                en: 'q',
                ti: '.Q'
              }, {
                en: 'bdo',
                ti: '.Bdo'
              }, {
                en: 'tt',
                ti: '.Tt'
              }, {
                en: 'ol',
                ti: '.Ol'
              }, {
                en: 'code',
                ti: '.Code'
              }, {
                en: 'noscript',
                ti: '.Noscript'
              }, {
                en: 'ins',
                ti: '.Ins'
              }, {
                en: 'a',
                ti: '.A'
              }, {
                en: 'img',
                ti: '.Img'
              }, {
                en: 'small',
                ti: '.Small'
              }, {
                en: 'b',
                ti: '.B'
              }, {
                en: 'form',
                ti: '.Form'
              }, {
                en: 'button',
                ti: '.Button'
              }, {
                en: 'h1',
                ti: '.H1'
              }],
            t: 'ers'
          }, {
            n: 'declare',
            an: {
              lp: 'declare'
            },
            t: 'a'
          }, {
            n: 'classid',
            an: {
              lp: 'classid'
            },
            t: 'a'
          }, {
            n: 'codebase',
            an: {
              lp: 'codebase'
            },
            t: 'a'
          }, {
            n: 'data',
            an: {
              lp: 'data'
            },
            t: 'a'
          }, {
            n: 'type',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'codetype',
            an: {
              lp: 'codetype'
            },
            t: 'a'
          }, {
            n: 'archive',
            an: {
              lp: 'archive'
            },
            t: 'a'
          }, {
            n: 'standby',
            an: {
              lp: 'standby'
            },
            t: 'a'
          }, {
            n: 'height',
            an: {
              lp: 'height'
            },
            t: 'a'
          }, {
            n: 'width',
            an: {
              lp: 'width'
            },
            t: 'a'
          }, {
            n: 'usemap',
            an: {
              lp: 'usemap'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'NMToken',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'tabindex',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'tabindex'
            },
            t: 'a'
          }, {
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        ln: 'Samp',
        tn: null,
        bti: '.Inline',
        ps: [{
            n: 'lang',
            ti: 'Language',
            an: {
              lp: 'lang'
            },
            t: 'a'
          }, {
            n: 'xmlLang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }, {
            n: 'dir',
            an: {
              lp: 'dir'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'clazz',
            ti: {
              t: 'l',
              bti: 'NMTokens'
            },
            an: {
              lp: 'class'
            },
            t: 'a'
          }, {
            n: 'style',
            an: {
              lp: 'style'
            },
            t: 'a'
          }, {
            n: 'title',
            an: {
              lp: 'title'
            },
            t: 'a'
          }, {
            n: 'onclick',
            an: {
              lp: 'onclick'
            },
            t: 'a'
          }, {
            n: 'ondblclick',
            an: {
              lp: 'ondblclick'
            },
            t: 'a'
          }, {
            n: 'onmousedown',
            an: {
              lp: 'onmousedown'
            },
            t: 'a'
          }, {
            n: 'onmouseup',
            an: {
              lp: 'onmouseup'
            },
            t: 'a'
          }, {
            n: 'onmouseover',
            an: {
              lp: 'onmouseover'
            },
            t: 'a'
          }, {
            n: 'onmousemove',
            an: {
              lp: 'onmousemove'
            },
            t: 'a'
          }, {
            n: 'onmouseout',
            an: {
              lp: 'onmouseout'
            },
            t: 'a'
          }, {
            n: 'onkeypress',
            an: {
              lp: 'onkeypress'
            },
            t: 'a'
          }, {
            n: 'onkeydown',
            an: {
              lp: 'onkeydown'
            },
            t: 'a'
          }, {
            n: 'onkeyup',
            an: {
              lp: 'onkeyup'
            },
            t: 'a'
          }]
      }, {
        t: 'enum',
        ln: 'TRules',
        bti: 'Token',
        vs: ['none', 'groups', 'rows', 'cols', 'all']
      }, {
        t: 'enum',
        ln: 'TFrame',
        bti: 'Token',
        vs: ['void', 'above', 'below', 'hsides', 'lhs', 'rhs', 'vsides', 'box', 'border']
      }, {
        t: 'enum',
        ln: 'InputType',
        bti: 'Token',
        vs: ['text', 'password', 'checkbox', 'radio', 'submit', 'reset', 'file', 'hidden', 'image', 'button']
      }, {
        t: 'enum',
        ln: 'Shape',
        bti: 'Token',
        vs: ['rect', 'circle', 'poly', 'default']
      }, {
        t: 'enum',
        ln: 'Scope',
        bti: 'Token',
        vs: ['row', 'col', 'rowgroup', 'colgroup']
      }],
    eis: [{
        en: 'tr',
        ti: '.Tr'
      }, {
        en: 'address',
        ti: '.Address'
      }, {
        en: 'i',
        ti: '.I'
      }, {
        en: 'h3',
        ti: '.H3'
      }, {
        en: 'area',
        ti: '.Area'
      }, {
        en: 'hr',
        ti: '.Hr'
      }, {
        en: 'h2',
        ti: '.H2'
      }, {
        en: 'em',
        ti: '.Em'
      }, {
        en: 'dfn',
        ti: '.Dfn'
      }, {
        en: 'kbd',
        ti: '.Kbd'
      }, {
        en: 'label',
        ti: '.Label'
      }, {
        en: 'strong',
        ti: '.Strong'
      }, {
        en: 'td',
        ti: '.Td'
      }, {
        en: 'link',
        ti: '.Link'
      }, {
        en: 'var',
        ti: '.Var'
      }, {
        en: 'cite',
        ti: '.Cite'
      }, {
        en: 'q',
        ti: '.Q'
      }, {
        en: 'object',
        ti: '.Object'
      }, {
        en: 'code',
        ti: '.Code'
      }, {
        en: 'thead',
        ti: '.Thead'
      }, {
        en: 'colgroup',
        ti: '.Colgroup'
      }, {
        en: 'span',
        ti: '.Span'
      }, {
        en: 'blockquote',
        ti: '.Blockquote'
      }, {
        en: 'title',
        ti: '.Title'
      }, {
        en: 'col',
        ti: '.Col'
      }, {
        en: 'head',
        ti: '.Head'
      }, {
        en: 'a',
        ti: '.A'
      }, {
        en: 'b',
        ti: '.B'
      }, {
        en: 'samp',
        ti: '.Samp'
      }, {
        en: 'select',
        ti: '.Select'
      }, {
        en: 'li',
        ti: '.Li'
      }, {
        en: 'h6',
        ti: '.H6'
      }, {
        en: 'map',
        ti: '.Map'
      }, {
        en: 'img',
        ti: '.Img'
      }, {
        en: 'dl',
        ti: '.Dl'
      }, {
        en: 'button',
        ti: '.Button'
      }, {
        en: 'optgroup',
        ti: '.Optgroup'
      }, {
        en: 'meta',
        ti: '.Meta'
      }, {
        en: 'ol',
        ti: '.Ol'
      }, {
        en: 'caption',
        ti: '.Caption'
      }, {
        en: 'tfoot',
        ti: '.Tfoot'
      }, {
        en: 'h1',
        ti: '.H1'
      }, {
        en: 'dt',
        ti: '.Dt'
      }, {
        en: 'base',
        ti: '.Base'
      }, {
        en: 'tbody',
        ti: '.Tbody'
      }, {
        en: 'form',
        ti: '.Form'
      }, {
        en: 'html',
        ti: '.Html'
      }, {
        en: 'bdo',
        ti: '.Bdo'
      }, {
        en: 'pre',
        ti: '.Pre'
      }, {
        en: 'big',
        ti: '.Big'
      }, {
        en: 'small',
        ti: '.Small'
      }, {
        en: 'sub',
        ti: '.Sub'
      }, {
        en: 'br',
        ti: '.Br'
      }, {
        en: 'sup',
        ti: '.Sup'
      }, {
        en: 'input',
        ti: '.Input'
      }, {
        en: 'script',
        ti: '.Script'
      }, {
        en: 'h4',
        ti: '.H4'
      }, {
        en: 'h5',
        ti: '.H5'
      }, {
        en: 'del',
        ti: '.Del'
      }, {
        en: 'option',
        ti: '.Option'
      }, {
        en: 'ul',
        ti: '.Ul'
      }, {
        en: 'noscript',
        ti: '.Noscript'
      }, {
        en: 'style',
        ti: '.Style'
      }, {
        en: 'dd',
        ti: '.Dd'
      }, {
        en: 'table',
        ti: '.Table'
      }, {
        en: 'textarea',
        ti: '.Textarea'
      }, {
        en: 'p',
        ti: '.P'
      }, {
        en: 'div',
        ti: '.Div'
      }, {
        en: 'acronym',
        ti: '.Acronym'
      }, {
        en: 'tt',
        ti: '.Tt'
      }, {
        en: 'body',
        ti: '.Body'
      }, {
        en: 'legend',
        ti: '.Legend'
      }, {
        en: 'abbr',
        ti: '.Abbr'
      }, {
        en: 'ins',
        ti: '.Ins'
      }, {
        en: 'param',
        ti: '.Param'
      }, {
        en: 'th',
        ti: '.Th'
      }, {
        en: 'fieldset',
        ti: '.Fieldset'
      }]
  };
  return {
    XHTML_1_0_Strict: XHTML_1_0_Strict
  };
};
if (typeof define === 'function' && define.amd) {
  define([], XHTML_1_0_Strict_Module_Factory);
}
else {
  var XHTML_1_0_Strict_Module = XHTML_1_0_Strict_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.XHTML_1_0_Strict = XHTML_1_0_Strict_Module.XHTML_1_0_Strict;
  }
  else {
    var XHTML_1_0_Strict = XHTML_1_0_Strict_Module.XHTML_1_0_Strict;
  }
}
},{}],4:[function(require,module,exports){
var XLink_1_0_Module_Factory = function () {
  var XLink_1_0 = {
    n: 'XLink_1_0',
    dens: 'http:\/\/www.w3.org\/1999\/xlink',
    dans: 'http:\/\/www.w3.org\/1999\/xlink',
    tis: [{
        ln: 'ResourceType',
        tn: 'resourceType',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'label',
            ti: 'NCName',
            t: 'a'
          }]
      }, {
        ln: 'LocatorType',
        tn: 'locatorType',
        ps: [{
            n: 'locatorTitle',
            mno: 0,
            col: true,
            en: 'title',
            ti: '.TitleEltType'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'href',
            rq: true,
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'label',
            ti: 'NCName',
            t: 'a'
          }]
      }, {
        ln: 'Extended',
        tn: 'extended',
        ps: [{
            n: 'extendedModel',
            mno: 0,
            col: true,
            etis: [{
                en: 'title',
                ti: '.TitleEltType'
              }, {
                en: 'resource',
                ti: '.ResourceType'
              }, {
                en: 'locator',
                ti: '.LocatorType'
              }, {
                en: 'arc',
                ti: '.ArcType'
              }],
            t: 'es'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }]
      }, {
        ln: 'Simple',
        tn: 'simple',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'type',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'href',
            t: 'a'
          }, {
            n: 'role',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'Token',
            t: 'a'
          }]
      }, {
        ln: 'TitleEltType',
        tn: 'titleEltType',
        ps: [{
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'ArcType',
        tn: 'arcType',
        ps: [{
            n: 'locatorTitle',
            mno: 0,
            col: true,
            en: 'title',
            ti: '.TitleEltType'
          }, {
            n: 'type',
            rq: true,
            ti: 'Token',
            t: 'a'
          }, {
            n: 'arcrole',
            t: 'a'
          }, {
            n: 'title',
            t: 'a'
          }, {
            n: 'show',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'actuate',
            ti: 'Token',
            t: 'a'
          }, {
            n: 'from',
            ti: 'NCName',
            t: 'a'
          }, {
            n: 'to',
            ti: 'NCName',
            t: 'a'
          }]
      }, {
        t: 'enum',
        ln: 'TypeType',
        bti: 'Token',
        vs: ['simple', 'extended', 'title', 'resource', 'locator', 'arc']
      }, {
        t: 'enum',
        ln: 'ShowType',
        bti: 'Token',
        vs: ['new', 'replace', 'embed', 'other', 'none']
      }, {
        t: 'enum',
        ln: 'ActuateType',
        bti: 'Token',
        vs: ['onLoad', 'onRequest', 'other', 'none']
      }],
    eis: [{
        en: 'arc',
        ti: '.ArcType'
      }, {
        en: 'resource',
        ti: '.ResourceType'
      }, {
        en: 'locator',
        ti: '.LocatorType'
      }, {
        en: 'title',
        ti: '.TitleEltType'
      }]
  };
  return {
    XLink_1_0: XLink_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], XLink_1_0_Module_Factory);
}
else {
  var XLink_1_0_Module = XLink_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.XLink_1_0 = XLink_1_0_Module.XLink_1_0;
  }
  else {
    var XLink_1_0 = XLink_1_0_Module.XLink_1_0;
  }
}
},{}],5:[function(require,module,exports){
var XSD_1_0_Module_Factory = function () {
  var XSD_1_0 = {
    n: 'XSD_1_0',
    dens: 'http:\/\/www.w3.org\/2001\/XMLSchema',
    tis: [{
        ln: 'Element',
        tn: 'element',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleType',
            rq: true,
            ti: '.LocalSimpleType'
          }, {
            n: 'complexType',
            rq: true,
            ti: '.LocalComplexType'
          }, {
            n: 'unique',
            col: true,
            ti: '.Keybase'
          }, {
            n: 'keyref',
            col: true,
            ti: '.Keyref'
          }, {
            n: 'key',
            col: true,
            ti: '.Keybase'
          }, {
            n: 'type',
            ti: 'QName',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'substitutionGroup',
            ti: 'QName',
            an: {
              lp: 'substitutionGroup'
            },
            t: 'a'
          }, {
            n: '_default',
            an: {
              lp: 'default'
            },
            t: 'a'
          }, {
            n: 'fixed',
            an: {
              lp: 'fixed'
            },
            t: 'a'
          }, {
            n: 'nillable',
            ti: 'Boolean',
            an: {
              lp: 'nillable'
            },
            t: 'a'
          }, {
            n: '_abstract',
            ti: 'Boolean',
            an: {
              lp: 'abstract'
            },
            t: 'a'
          }, {
            n: '_final',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'final'
            },
            t: 'a'
          }, {
            n: 'block',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'block'
            },
            t: 'a'
          }, {
            n: 'form',
            ti: 'NMToken',
            an: {
              lp: 'form'
            },
            t: 'a'
          }, {
            n: 'minOccurs',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'minOccurs'
            },
            t: 'a'
          }, {
            n: 'maxOccurs',
            an: {
              lp: 'maxOccurs'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'ref',
            ti: 'QName',
            an: {
              lp: 'ref'
            },
            t: 'a'
          }]
      }, {
        ln: 'NumFacet',
        tn: 'numFacet',
        bti: '.Facet'
      }, {
        ln: 'NoFixedFacet',
        tn: 'noFixedFacet',
        bti: '.Facet'
      }, {
        ln: 'Facet',
        tn: 'facet',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'value',
            rq: true,
            ti: 'AnySimpleType',
            an: {
              lp: 'value'
            },
            t: 'a'
          }, {
            n: 'fixed',
            ti: 'Boolean',
            an: {
              lp: 'fixed'
            },
            t: 'a'
          }]
      }, {
        ln: 'Wildcard',
        tn: 'wildcard',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'namespace',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'namespace'
            },
            t: 'a'
          }, {
            n: 'processContents',
            an: {
              lp: 'processContents'
            },
            t: 'a'
          }]
      }, {
        ln: 'Attribute',
        tn: 'attribute',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleType',
            ti: '.LocalSimpleType'
          }, {
            n: 'type',
            ti: 'QName',
            an: {
              lp: 'type'
            },
            t: 'a'
          }, {
            n: 'use',
            an: {
              lp: 'use'
            },
            t: 'a'
          }, {
            n: '_default',
            an: {
              lp: 'default'
            },
            t: 'a'
          }, {
            n: 'fixed',
            an: {
              lp: 'fixed'
            },
            t: 'a'
          }, {
            n: 'form',
            ti: 'NMToken',
            an: {
              lp: 'form'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'ref',
            ti: 'QName',
            an: {
              lp: 'ref'
            },
            t: 'a'
          }]
      }, {
        ln: 'NarrowMaxMin',
        tn: 'narrowMaxMin',
        bti: '.LocalElement'
      }, {
        ln: 'Pattern',
        tn: null,
        bti: '.NoFixedFacet'
      }, {
        ln: 'LocalComplexType',
        tn: 'localComplexType',
        bti: '.ComplexType'
      }, {
        ln: 'Schema',
        tn: null,
        bti: '.OpenAttrs',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'include',
            mno: 0,
            col: true,
            ti: '.Include'
          }, {
            n: '_import',
            mno: 0,
            col: true,
            en: 'import',
            ti: '.Import'
          }, {
            n: 'redefine',
            mno: 0,
            col: true,
            ti: '.Redefine'
          }, {
            n: 'simpleType',
            mno: 0,
            col: true,
            ti: '.TopLevelSimpleType'
          }, {
            n: 'complexType',
            mno: 0,
            col: true,
            ti: '.TopLevelComplexType'
          }, {
            n: 'group',
            mno: 0,
            col: true,
            ti: '.NamedGroup'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.NamedAttributeGroup'
          }, {
            n: 'element',
            mno: 0,
            col: true,
            ti: '.TopLevelElement'
          }, {
            n: 'attribute',
            mno: 0,
            col: true,
            ti: '.TopLevelAttribute'
          }, {
            n: 'notation',
            mno: 0,
            col: true,
            ti: '.Notation'
          }, {
            n: 'annotation',
            mno: 0,
            col: true,
            ti: '.Annotation'
          }, {
            n: 'targetNamespace',
            an: {
              lp: 'targetNamespace'
            },
            t: 'a'
          }, {
            n: 'version',
            ti: 'Token',
            an: {
              lp: 'version'
            },
            t: 'a'
          }, {
            n: 'finalDefault',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'finalDefault'
            },
            t: 'a'
          }, {
            n: 'blockDefault',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'blockDefault'
            },
            t: 'a'
          }, {
            n: 'attributeFormDefault',
            ti: 'NMToken',
            an: {
              lp: 'attributeFormDefault'
            },
            t: 'a'
          }, {
            n: 'elementFormDefault',
            ti: 'NMToken',
            an: {
              lp: 'elementFormDefault'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'Selector',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'xpath',
            rq: true,
            an: {
              lp: 'xpath'
            },
            t: 'a'
          }]
      }, {
        ln: 'LocalSimpleType',
        tn: 'localSimpleType',
        bti: '.SimpleType'
      }, {
        ln: 'TotalDigits',
        tn: null,
        bti: '.NumFacet'
      }, {
        ln: 'ExtensionType',
        tn: 'extensionType',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'group',
            rq: true,
            ti: '.GroupRef'
          }, {
            n: 'all',
            rq: true,
            ti: '.All'
          }, {
            n: 'choice',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'sequence',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'attribute',
            mno: 0,
            col: true,
            ti: '.Attribute'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.AttributeGroupRef'
          }, {
            n: 'anyAttribute',
            ti: '.Wildcard'
          }, {
            n: 'base',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'base'
            },
            t: 'a'
          }]
      }, {
        ln: 'Documentation',
        tn: null,
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'source',
            an: {
              lp: 'source'
            },
            t: 'a'
          }, {
            n: 'lang',
            an: {
              lp: 'lang',
              ns: 'http:\/\/www.w3.org\/XML\/1998\/namespace'
            },
            t: 'a'
          }]
      }, {
        ln: 'Appinfo',
        tn: null,
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'content',
            col: true,
            t: 'ae'
          }, {
            n: 'source',
            an: {
              lp: 'source'
            },
            t: 'a'
          }]
      }, {
        ln: 'Annotation',
        tn: null,
        bti: '.OpenAttrs',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'appinfo',
            mno: 0,
            col: true,
            ti: '.Appinfo'
          }, {
            n: 'documentation',
            mno: 0,
            col: true,
            ti: '.Documentation'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'GroupRef',
        tn: 'groupRef',
        bti: '.RealGroup'
      }, {
        ln: 'Union',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleType',
            mno: 0,
            col: true,
            ti: '.LocalSimpleType'
          }, {
            n: 'memberTypes',
            ti: {
              t: 'l',
              bti: 'QName'
            },
            an: {
              lp: 'memberTypes'
            },
            t: 'a'
          }]
      }, {
        ln: 'OpenAttrs',
        tn: 'openAttrs',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }]
      }, {
        ln: 'RestrictionType',
        tn: 'restrictionType',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'group',
            rq: true,
            ti: '.GroupRef'
          }, {
            n: 'all',
            rq: true,
            ti: '.All'
          }, {
            n: 'choice',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'sequence',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'simpleType',
            ti: '.LocalSimpleType'
          }, {
            n: 'minInclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'totalDigits',
            col: true,
            ti: '.TotalDigits'
          }, {
            n: 'minLength',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'maxLength',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'maxInclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'pattern',
            col: true,
            ti: '.Pattern'
          }, {
            n: 'enumeration',
            col: true,
            ti: '.NoFixedFacet'
          }, {
            n: 'minExclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'fractionDigits',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'length',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'maxExclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'whiteSpace',
            col: true,
            ti: '.WhiteSpace'
          }, {
            n: 'attribute',
            mno: 0,
            col: true,
            ti: '.Attribute'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.AttributeGroupRef'
          }, {
            n: 'anyAttribute',
            ti: '.Wildcard'
          }, {
            n: 'base',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'base'
            },
            t: 'a'
          }]
      }, {
        ln: 'SimpleExtensionType',
        tn: 'simpleExtensionType',
        bti: '.ExtensionType'
      }, {
        ln: 'Keyref',
        tn: null,
        bti: '.Keybase',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'refer',
            rq: true,
            ti: 'QName',
            an: {
              lp: 'refer'
            },
            t: 'a'
          }]
      }, {
        ln: 'ComplexRestrictionType',
        tn: 'complexRestrictionType',
        bti: '.RestrictionType'
      }, {
        ln: 'All',
        tn: 'all',
        bti: '.ExplicitGroup'
      }, {
        ln: 'Group',
        tn: 'group',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'sequence',
            col: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'all',
            col: true,
            ti: '.All'
          }, {
            n: 'choice',
            col: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'any',
            col: true,
            ti: '.Any'
          }, {
            n: 'element',
            col: true,
            ti: '.LocalElement'
          }, {
            n: 'group',
            col: true,
            ti: '.GroupRef'
          }, {
            n: 'minOccurs',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'minOccurs'
            },
            t: 'a'
          }, {
            n: 'maxOccurs',
            an: {
              lp: 'maxOccurs'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'ref',
            ti: 'QName',
            an: {
              lp: 'ref'
            },
            t: 'a'
          }]
      }, {
        ln: 'List',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleType',
            ti: '.LocalSimpleType'
          }, {
            n: 'itemType',
            ti: 'QName',
            an: {
              lp: 'itemType'
            },
            t: 'a'
          }]
      }, {
        ln: 'Any',
        tn: null,
        bti: '.Wildcard',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'minOccurs',
            ti: 'NonNegativeInteger',
            an: {
              lp: 'minOccurs'
            },
            t: 'a'
          }, {
            n: 'maxOccurs',
            an: {
              lp: 'maxOccurs'
            },
            t: 'a'
          }]
      }, {
        ln: 'TopLevelSimpleType',
        tn: 'topLevelSimpleType',
        bti: '.SimpleType'
      }, {
        ln: 'Include',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'schemaLocation',
            rq: true,
            an: {
              lp: 'schemaLocation'
            },
            t: 'a'
          }]
      }, {
        ln: 'TopLevelComplexType',
        tn: 'topLevelComplexType',
        bti: '.ComplexType'
      }, {
        ln: 'SimpleExplicitGroup',
        tn: 'simpleExplicitGroup',
        bti: '.ExplicitGroup'
      }, {
        ln: 'ComplexType',
        tn: 'complexType',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleContent',
            rq: true,
            ti: '.SimpleContent'
          }, {
            n: 'complexContent',
            rq: true,
            ti: '.ComplexContent'
          }, {
            n: 'group',
            rq: true,
            ti: '.GroupRef'
          }, {
            n: 'all',
            rq: true,
            ti: '.All'
          }, {
            n: 'choice',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'sequence',
            rq: true,
            ti: '.ExplicitGroup'
          }, {
            n: 'attribute',
            mno: 0,
            col: true,
            ti: '.Attribute'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.AttributeGroupRef'
          }, {
            n: 'anyAttribute',
            ti: '.Wildcard'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'mixed',
            ti: 'Boolean',
            an: {
              lp: 'mixed'
            },
            t: 'a'
          }, {
            n: '_abstract',
            ti: 'Boolean',
            an: {
              lp: 'abstract'
            },
            t: 'a'
          }, {
            n: '_final',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'final'
            },
            t: 'a'
          }, {
            n: 'block',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'block'
            },
            t: 'a'
          }]
      }, {
        ln: 'NamedGroup',
        tn: 'namedGroup',
        bti: '.RealGroup'
      }, {
        ln: 'NamedAttributeGroup',
        tn: 'namedAttributeGroup',
        bti: '.AttributeGroup'
      }, {
        ln: 'TopLevelAttribute',
        tn: 'topLevelAttribute',
        bti: '.Attribute'
      }, {
        ln: 'SimpleContent',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'restriction',
            rq: true,
            ti: '.SimpleRestrictionType'
          }, {
            n: 'extension',
            rq: true,
            ti: '.SimpleExtensionType'
          }]
      }, {
        ln: 'Import',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'namespace',
            an: {
              lp: 'namespace'
            },
            t: 'a'
          }, {
            n: 'schemaLocation',
            an: {
              lp: 'schemaLocation'
            },
            t: 'a'
          }]
      }, {
        ln: 'Keybase',
        tn: 'keybase',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'selector',
            rq: true,
            ti: '.Selector'
          }, {
            n: 'field',
            rq: true,
            col: true,
            ti: '.Field'
          }, {
            n: 'name',
            rq: true,
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'Redefine',
        tn: null,
        bti: '.OpenAttrs',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'annotation',
            mno: 0,
            col: true,
            ti: '.Annotation'
          }, {
            n: 'simpleType',
            mno: 0,
            col: true,
            ti: '.TopLevelSimpleType'
          }, {
            n: 'complexType',
            mno: 0,
            col: true,
            ti: '.TopLevelComplexType'
          }, {
            n: 'group',
            mno: 0,
            col: true,
            ti: '.NamedGroup'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.NamedAttributeGroup'
          }, {
            n: 'schemaLocation',
            rq: true,
            an: {
              lp: 'schemaLocation'
            },
            t: 'a'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'ExplicitGroup',
        tn: 'explicitGroup',
        bti: '.Group'
      }, {
        ln: 'SimpleType',
        tn: 'simpleType',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'restriction',
            rq: true,
            ti: '.Restriction'
          }, {
            n: 'list',
            rq: true,
            ti: '.List'
          }, {
            n: 'union',
            rq: true,
            ti: '.Union'
          }, {
            n: '_final',
            ti: {
              t: 'l'
            },
            an: {
              lp: 'final'
            },
            t: 'a'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }]
      }, {
        ln: 'RealGroup',
        tn: 'realGroup',
        bti: '.Group'
      }, {
        ln: 'WhiteSpace',
        tn: null,
        bti: '.Facet'
      }, {
        ln: 'Field',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'xpath',
            rq: true,
            an: {
              lp: 'xpath'
            },
            t: 'a'
          }]
      }, {
        ln: 'AttributeGroupRef',
        tn: 'attributeGroupRef',
        bti: '.AttributeGroup'
      }, {
        ln: 'AttributeGroup',
        tn: 'attributeGroup',
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'attribute',
            mno: 0,
            col: true,
            ti: '.Attribute'
          }, {
            n: 'attributeGroup',
            mno: 0,
            col: true,
            ti: '.AttributeGroupRef'
          }, {
            n: 'anyAttribute',
            ti: '.Wildcard'
          }, {
            n: 'name',
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: 'ref',
            ti: 'QName',
            an: {
              lp: 'ref'
            },
            t: 'a'
          }]
      }, {
        ln: 'Annotated',
        tn: 'annotated',
        bti: '.OpenAttrs',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'annotation',
            ti: '.Annotation'
          }, {
            n: 'id',
            ti: 'ID',
            an: {
              lp: 'id'
            },
            t: 'a'
          }]
      }, {
        ln: 'Notation',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'name',
            rq: true,
            ti: 'NCName',
            an: {
              lp: 'name'
            },
            t: 'a'
          }, {
            n: '_public',
            ti: 'Token',
            an: {
              lp: 'public'
            },
            t: 'a'
          }, {
            n: 'system',
            an: {
              lp: 'system'
            },
            t: 'a'
          }]
      }, {
        ln: 'TopLevelElement',
        tn: 'topLevelElement',
        bti: '.Element'
      }, {
        ln: 'Restriction',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'simpleType',
            ti: '.LocalSimpleType'
          }, {
            n: 'minInclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'totalDigits',
            col: true,
            ti: '.TotalDigits'
          }, {
            n: 'minLength',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'maxLength',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'maxInclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'pattern',
            col: true,
            ti: '.Pattern'
          }, {
            n: 'enumeration',
            col: true,
            ti: '.NoFixedFacet'
          }, {
            n: 'minExclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'fractionDigits',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'length',
            col: true,
            ti: '.NumFacet'
          }, {
            n: 'maxExclusive',
            col: true,
            ti: '.Facet'
          }, {
            n: 'whiteSpace',
            col: true,
            ti: '.WhiteSpace'
          }, {
            n: 'base',
            ti: 'QName',
            an: {
              lp: 'base'
            },
            t: 'a'
          }]
      }, {
        ln: 'SimpleRestrictionType',
        tn: 'simpleRestrictionType',
        bti: '.RestrictionType'
      }, {
        ln: 'ComplexContent',
        tn: null,
        bti: '.Annotated',
        ps: [{
            n: 'otherAttributes',
            t: 'aa'
          }, {
            n: 'restriction',
            rq: true,
            ti: '.ComplexRestrictionType'
          }, {
            n: 'extension',
            rq: true,
            ti: '.ExtensionType'
          }, {
            n: 'mixed',
            ti: 'Boolean',
            an: {
              lp: 'mixed'
            },
            t: 'a'
          }]
      }, {
        ln: 'LocalElement',
        tn: 'localElement',
        bti: '.Element'
      }, {
        t: 'enum',
        ln: 'ReducedDerivationControl',
        bti: 'NMToken',
        vs: ['extension', 'restriction']
      }, {
        t: 'enum',
        ln: 'DerivationControl',
        bti: 'NMToken',
        vs: ['substitution', 'extension', 'restriction', 'list', 'union']
      }, {
        t: 'enum',
        ln: 'TypeDerivationControl',
        bti: 'NMToken',
        vs: ['extension', 'restriction', 'list', 'union']
      }, {
        t: 'enum',
        ln: 'FormChoice',
        bti: 'NMToken',
        vs: ['qualified', 'unqualified']
      }],
    eis: [{
        en: 'unique',
        ti: '.Keybase'
      }, {
        en: 'attributeGroup',
        ti: '.NamedAttributeGroup'
      }, {
        en: 'annotation',
        ti: '.Annotation'
      }, {
        en: 'all',
        ti: '.All'
      }, {
        en: 'complexContent',
        ti: '.ComplexContent'
      }, {
        en: 'list',
        ti: '.List'
      }, {
        en: 'maxExclusive',
        ti: '.Facet'
      }, {
        en: 'anyAttribute',
        ti: '.Wildcard'
      }, {
        en: 'notation',
        ti: '.Notation'
      }, {
        en: 'simpleType',
        ti: '.TopLevelSimpleType'
      }, {
        en: 'include',
        ti: '.Include'
      }, {
        en: 'restriction',
        ti: '.Restriction'
      }, {
        en: 'redefine',
        ti: '.Redefine'
      }, {
        en: 'maxInclusive',
        ti: '.Facet'
      }, {
        en: 'minExclusive',
        ti: '.Facet'
      }, {
        en: 'schema',
        ti: '.Schema'
      }, {
        en: 'complexType',
        ti: '.TopLevelComplexType'
      }, {
        en: 'element',
        ti: '.LocalElement',
        sc: '.Group'
      }, {
        en: 'appinfo',
        ti: '.Appinfo'
      }, {
        en: 'totalDigits',
        ti: '.TotalDigits'
      }, {
        en: 'choice',
        ti: '.ExplicitGroup'
      }, {
        en: 'selector',
        ti: '.Selector'
      }, {
        en: 'import',
        ti: '.Import'
      }, {
        en: 'minLength',
        ti: '.NumFacet'
      }, {
        en: 'simpleContent',
        ti: '.SimpleContent'
      }, {
        en: 'keyref',
        ti: '.Keyref'
      }, {
        en: 'element',
        ti: '.TopLevelElement'
      }, {
        en: 'length',
        ti: '.NumFacet'
      }, {
        en: 'group',
        ti: '.NamedGroup'
      }, {
        en: 'maxLength',
        ti: '.NumFacet'
      }, {
        en: 'fractionDigits',
        ti: '.NumFacet'
      }, {
        en: 'enumeration',
        ti: '.NoFixedFacet'
      }, {
        en: 'group',
        ti: '.GroupRef',
        sc: '.Group'
      }, {
        en: 'key',
        ti: '.Keybase'
      }, {
        en: 'whiteSpace',
        ti: '.WhiteSpace'
      }, {
        en: 'union',
        ti: '.Union'
      }, {
        en: 'documentation',
        ti: '.Documentation'
      }, {
        en: 'field',
        ti: '.Field'
      }, {
        en: 'minInclusive',
        ti: '.Facet'
      }, {
        en: 'sequence',
        ti: '.ExplicitGroup'
      }, {
        en: 'attribute',
        ti: '.TopLevelAttribute'
      }, {
        en: 'pattern',
        ti: '.Pattern'
      }, {
        en: 'any',
        ti: '.Any'
      }]
  };
  return {
    XSD_1_0: XSD_1_0
  };
};
if (typeof define === 'function' && define.amd) {
  define([], XSD_1_0_Module_Factory);
}
else {
  var XSD_1_0_Module = XSD_1_0_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.XSD_1_0 = XSD_1_0_Module.XSD_1_0;
  }
  else {
    var XSD_1_0 = XSD_1_0_Module.XSD_1_0;
  }
}
},{}],6:[function(require,module,exports){
module.exports.Atom_1_0         = require('./lib/Atom_1_0'        ).Atom_1_0        ;
module.exports.WS_Addr_1_0_Core = require('./lib/WS_Addr_1_0_Core').WS_Addr_1_0_Core;
module.exports.XHTML_1_0_Strict = require('./lib/XHTML_1_0_Strict').XHTML_1_0_Strict;
module.exports.XLink_1_0        = require('./lib/XLink_1_0'       ).XLink_1_0       ;
module.exports.XSD_1_0          = require('./lib/XSD_1_0'         ).XSD_1_0         ;
},{"./lib/Atom_1_0":1,"./lib/WS_Addr_1_0_Core":2,"./lib/XHTML_1_0_Strict":3,"./lib/XLink_1_0":4,"./lib/XSD_1_0":5}]},{},[6])(6)
});
