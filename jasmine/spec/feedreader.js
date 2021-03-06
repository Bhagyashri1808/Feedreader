/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    for (var i = 0; i < allFeeds.length; i++) {

      (function(testSpec) {
        it('has a URL defined and it is not empty', function() {
          expect(testSpec.url).toBeDefined();
          expect(testSpec.url).not.toBe('');
        });
      })(allFeeds[i]);

    };


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    for (var i = 0; i < allFeeds.length; i++) {

      (function(testSpec) {
        it('has a name defined and it is not empty', function() {
          expect(testSpec.name).toBeDefined();
          expect(testSpec.name).not.toBe('');
        });
      })(allFeeds[i]);

    };
  });


  describe('The menu', function() {
    /* Test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* Test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * has two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('menu display when clicked', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
    });
    it('menu hides when clicked again', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

  });


  describe('Initial Entries', function() {
    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      loadFeed(0);
      setTimeout(function() {
        done();
      }, 2000);
    });

    it('loaded and has entry', function(done) {
      expect(loadComplete).toBe(true);
      expect($('.feed .entry').length).toBeGreaterThan(0);
      done();
    });
  });

  describe('New Feed Selection', function() {
    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    var feedresult = [];
    beforeEach(function(done) {
      loadFeed(0, function() {
        feedresult[0] = document.querySelector('.feed').innerHTML;
        loadFeed(1, function() {
          feedresult[1] = document.querySelector('.feed').innerHTML;
          done();
        });
      });
    });
    it('content changes', function(done) {
      expect(feedresult[1] !== feedresult[0]).toBe(true);
      done();
    });

  });

}());
