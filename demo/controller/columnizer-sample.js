'use strict'

/**
 * @ngdoc overview
 * @name sampleLibConsumerApp
 * @description
 * # sampleLibConsumerApp
 *
 * Main module of the application.
 */
angular
  .module('demo', [
    'angular.JsPdf'
  ])
  .controller('columnizerSample', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.columnizeData = {
      pageTemplateId: 'pageTemplate',
      reportContentId: 'reportContent',
      reportHtml: 'reportHtml',
      //contentHeight: getContentHeight(),
      pageHeight: '1400',
      reportId: 'report'
    }
  });
