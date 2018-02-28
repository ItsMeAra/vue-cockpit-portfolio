(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict

var init = function () {
  var data = {
    apiUrl: location.hostname == 'localhost' ? 'http://localhost:8000' : location.protocol + '//' + location.hostname,
    apiKey: 'fcfaf298e1e7ba680da3ca07af3dda',
    firstName: 'Dirk',
    lastName: 'Diggler',
    street: 'Sternstraße 5d',
    zipCode: '20357',
    city: 'Hamburg',
    phone: '(040) 555 123 456',
    email: 'name@example.com'
  }

  fetch(data.apiUrl + '/admin/api/collections/listCollections?token=' + data.apiKey)
    .then(function (response) {
      return response.json()
    }).then(function (collectionNames) {
      data.collectionNames = collectionNames
      collectionNames.forEach(function (collectionName) {
        data[collectionName] = [];
      });
      new Vue({
        el: '#content',
        data: data,
        created: function () {
          this.fetchAllCollectionEntries();
        },
        methods: {
          fetchAllCollectionEntries: function () {
            var self = this;
            this.collectionNames.forEach(function (collectionName) {
              self.fetchCollectionEntries(collectionName);
            });
          },
          fetchCollectionEntries: function (collectionName) {
            var self = this;
            fetch(data.apiUrl + '/admin/api/collections/get/' + collectionName + '?token=' + this.apiKey)
              .then(function (response) {
                return response.json()
              }).then(function (json) {
                self[collectionName] = json.entries;
              }).catch(function (ex) {
                console.log('parsing failed', ex)
              })
          }
        }
      })
    }).catch(function (ex) {
      console.log('parsing failed', ex)
    })
}

init();



