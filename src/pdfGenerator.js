'use strict';

/**
 * @ngdoc function
 * @name cadsBreezeWebApp.menu:directive:pdfGenerator
 * @description
 * # pdf report generator
 * Directive responsible for pdf report generation
 */
angular
    .module('angular.JsPdf')
    .directive('pdfGenerator', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    element.css('pointerEvents', 'none');
                    /*globals jsPDF*/
                    /*var pdf = new jsPDF('p', 'pt', 'a4');
                    pdf.addHTML($('#' + attrs.content), function () {
                        pdf.save('new.pdf');
                    });*/
                    var pdf = new jsPDF('p', 'pt', [1440, 890]);
                    var canvas = pdf.canvas;
                    canvas.height = 1440;//1100 + 191;//72 * 20;
                    canvas.width = 890;//50 * 12;
                    pdf.setFont('helvetica');
                    /*globals html2pdf*/
                    html2pdf($('#' + attrs.content)[0], pdf, function (pdf) {
                        // Referred and fixed: https://github.com/MrRio/jsPDF/issues/481#issue-69152925
                        var bloburi = pdf.output('bloburi');

                        //Seting base64 string to cefFileData, to handlde pdf save
                        var data = pdf.output('dataurlstring');
                        var encodedString = data.replace('data:application/pdf;base64,', '');

                        window.open(bloburi);
                        element.css('pointerEvents', 'auto');
                    });

                });
            }
        };
    });
