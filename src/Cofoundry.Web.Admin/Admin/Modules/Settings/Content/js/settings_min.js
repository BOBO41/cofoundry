/*! UberCMS 2017-07-12 */
angular.module("cms.settings",["ngRoute","cms.shared"]).constant("_",window._).constant("settings.modulePath","/Admin/Modules/Settings/Js/"),angular.module("cms.settings").config(["$routeProvider","shared.routingUtilities","settings.modulePath",function(a,b,c){a.otherwise(b.mapOptions(c,"SettingsDetails"))}]),angular.module("cms.settings").factory("settings.settingsService",["$http","shared.serviceBase",function(a,b){var c={},d=b+"settings",e=d+"/generalsite",f=d+"/seo";return c.getGeneralSiteSettings=function(){return a.get(e)},c.getSeoSettings=function(){return a.get(f)},c.updateGeneralSiteSettings=function(b){return a.patch(e,b)},c.updateSeoSettings=function(b){return a.patch(f,b)},c.clearCache=function(c){return a["delete"](b+"cache")},c}]),angular.module("cms.settings").controller("SettingsDetailsController",["_","$q","shared.LoadState","settings.settingsService","settings.modulePath",function(a,b,c,d,e){function f(){p.edit=g,p.save=h,p.cancel=i,p.clearCache=j,p.editMode=!1,p.globalLoadState=new c,p.saveLoadState=new c,p.formLoadState=new c(!0),l().then(o.bind(null,p.formLoadState))}function g(){p.editMode=!0,p.mainForm.formStatus.clear()}function h(){n(p.saveLoadState),d.updateGeneralSiteSettings(p.generalSettingsCommand).then(d.updateSeoSettings.bind(null,p.seoSettingsCommand)).then(k.bind(null,"Changes were saved successfully"))["finally"](o.bind(null,p.saveLoadState))}function i(){p.editMode=!1,m(),p.mainForm.formStatus.clear()}function j(){p.globalLoadState.on(),d.clearCache().then(k.bind(null,"Cache cleared"))["finally"](p.globalLoadState.off)}function k(a){return l().then(p.mainForm.formStatus.success.bind(null,a))}function l(){function a(a,b){p[a]=b}var c=d.getGeneralSiteSettings().then(a.bind(null,"generalSettings")),e=d.getSeoSettings().then(a.bind(null,"seoSettings"));return b.all([c,e]).then(function(){m(),p.editMode=!1})}function m(){p.seoSettingsCommand=a.clone(p.seoSettings),p.generalSettingsCommand=a.clone(p.generalSettings)}function n(b){p.globalLoadState.on(),b&&a.isFunction(b.on)&&b.on()}function o(b){p.globalLoadState.off(),b&&a.isFunction(b.off)&&b.off()}var p=this;f()}]);