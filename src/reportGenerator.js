'use strict';
/**
 * @ngdoc function
 * @name cadsBreezeWebApp.menu:directive:report-generator
 * @description
 * # report view with custom page format
 * Directive responsible for report page generation
 */

angular
    .module('angular.JsPdf')
    .directive('reportGenerator', function ($q, $compile, $timeout) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, ele, attrs) {
                var page = 0;
                var columnizeData = scope.$eval(attrs.columnizeData);
                var updateReportLayout = function () {
                    if (angular.element('#' + columnizeData.reportContentId).contents().length > 0) {
                        // when we need to add a new page, use a jq object for a template
                        // or use a long HTML string, whatever your preference
                        var pageTemplate = getPageTemplate();

                        // append the page number to the footer
                        var pageNumber = scope.getPageNumber(page);
                        pageTemplate.find('.page-number')[0].innerText = pageNumber;
                        var report = angular.element('#' + columnizeData.reportId);
                        report.append(pageTemplate);
                        page++;

                        // here is the columnizer magic
                        angular.element('#' + columnizeData.reportContentId).columnize({
                            columns: 1,
                            target: '.page:last .content',
                            overflow: {
                                height: columnizeData.contentHeight,
                                id: '#' + columnizeData.reportContentId,
                                doneFunc: function () {
                                    pageTemplate.css('marginBottom', '40px');
                                    updateReportLayout();
                                }
                            }
                        });
                    }
                    else {
                        scope.columnize = 'done';
                        $timeout(function () {
                            compile();
                        }, 0);
                    }
                };

                var getPageTemplate = function () {
                    return angular.element('#' + columnizeData.pageTemplateId)
                        .clone()
                        .addClass('page')
                        .css('display', 'block')
                        .css('height', parseInt(columnizeData.pageHeight) + 'px');
                };

                var compile = function () {
                  if(columnizeData.compileElements) {
                    for (var i = 0; i < columnizeData.compileElements.length; i++) {
                      $compile(angular.element('#' + columnizeData.compileElements[i])
                        .contents())(scope);
                    }
                  }
                };

                var callColumnize = function () {
                    $timeout(function () {
                        page = 0;
                        scope.columnize = 'initiated';
                        angular.element('#' + columnizeData.reportId).empty();
                        var reportHtml = angular.element('#' + columnizeData.reportHtml)
                            .contents().clone();
                        angular.element('#' + columnizeData.reportContentId)
                            .append(reportHtml);

                        updateReportLayout();
                    }, 0);
                };

                attrs.$observe('reportGenerator', function () {
                    if (angular.isDefined(scope.isDataLoaded) && scope.isDataLoaded !== true && !scope.$parent) {
                        return;
                    }

                    scope.$parent.isReportLoading = true;
                    $timeout(function () {
                        callColumnize();
                    }, 10);
                    $timeout(function () {
                        scope.$parent.isReportLoading = false;
                    }, 5000);
                });

                attrs.$observe('reportType', function () {
                    $timeout(function () {
                        callColumnize();
                    }, 10);
                });

                attrs.$observe('reportOption', function () {
                    $timeout(function () {
                        callColumnize();
                    }, 10);
                });

                if (angular.isDefined(columnizeData)) {
                    $('#' + columnizeData.pageTemplateId)
                        .css('display', 'none');
                }

            }
        };
    });
