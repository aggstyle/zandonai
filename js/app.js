var app = angular.module('portifolio', ['ng', 'ngCookies', 'pascalprecht.translate']);

app.config([
  '$translateProvider',
  function translationConfigFn($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/',
      suffix: '.json'
    });
    $translateProvider.useLocalStorage();
    $translateProvider.preferredLanguage('en');
  }
]);

app.controller('appCtrl', [
  '$scope', '$translate',
  function($scope, $translate) {
    $scope.changeLang = function changeLangFn(langKey) {
      $translate.use(langKey);
    };
  }
]);