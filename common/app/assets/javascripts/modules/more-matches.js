define(['common', 'reqwest', 'bonzo', 'qwery'], function (common, reqwest, bonzo, qwery) {

    return {

        nav: null,

        init: function (nav) {

            this.nav = nav;

            bonzo(nav).removeClass('js-not-ajax'); // removes the default left/right float style

            // update nav
            bonzo(qwery('a', nav))
                .addClass('cta')
                .each(function(element, index) {
                    // update text in cta
                    var buttonText = element.getAttribute('data-js-title');
                    buttonText = (buttonText) ? buttonText : 'Show more matches';
                    bonzo(element).text(buttonText);
                });

            common.mediator.on('ui:more-matches:clicked', function (_link) {
                var link = bonzo(_link);
                reqwest({
                    url: link.attr('href') + '?callback=?',
                    type: 'jsonp',
                    success: function (response) {
                        // place html before nav
                        bonzo(nav).before(response.html);
                        // update more link (if there is more)
                        if (response.more) {
                            link.attr('href', response.more);
                        } else {
                            link.remove();
                        }
                    }
                });
            });

        }
    };

});