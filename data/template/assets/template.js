"use strict";

/**
 * Tabslet | tabs jQuery plugin
 *
 * @copyright Copyright 2015, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v1.7.3
 */

/* Sample html structure
 <div class='tabs'>
  <ul class='horizontal'>
    <li><a href="#tab-1">Tab 1</a></li>
    <li><a href="#tab-2">Tab 2</a></li>
    <li><a href="#tab-3">Tab 3</a></li>
  </ul>
  <div id='tab-1'></div>
  <div id='tab-2'></div>
  <div id='tab-3'></div>
</div>
 OR
 <div class='tabs'>
  <ul class='horizontal'>
    <li><a href="#tab-1">Tab 1</a></li>
    <li><a href="#tab-2">Tab 2</a></li>
    <li><a href="#tab-3">Tab 3</a></li>
  </ul>
</div>
<div id='tabs_container'>
  <div id='tab-1'></div>
  <div id='tab-2'></div>
  <div id='tab-3'></div>
</div>
 */

!function ($, window, undefined) {
  "use strict";
  $.fn.tabslet = function (options) {
    var defaults = { mouseevent: "click", activeclass: "active", attribute: "href", animation: !1, autorotate: !1, deeplinking: !1, pauseonhover: !0, delay: 2e3, active: 1, container: !1, controls: { prev: ".prev", next: ".next" } },
        options = $.extend(defaults, options);return this.each(function () {
      function deep_link() {
        var t = [];elements.find("a").each(function () {
          t.push($(this).attr($this.opts.attribute));
        });var e = $.inArray(location.hash, t);return e > -1 ? e + 1 : $this.data("active") || options.active;
      }var $this = $(this),
          _cache_li = [],
          _cache_div = [],
          _container = options.container ? $(options.container) : $this,
          _tabs = _container.find("> div");_tabs.each(function () {
        _cache_div.push($(this).css("display"));
      });var elements = $this.find("> ul > li"),
          i = options.active - 1;if (!$this.data("tabslet-init")) {
        $this.data("tabslet-init", !0), $this.opts = [], $.map(["mouseevent", "activeclass", "attribute", "animation", "autorotate", "deeplinking", "pauseonhover", "delay", "container"], function (t) {
          $this.opts[t] = $this.data(t) || options[t];
        }), $this.opts.active = $this.opts.deeplinking ? deep_link() : $this.data("active") || options.active, _tabs.hide(), $this.opts.active && (_tabs.eq($this.opts.active - 1).show(), elements.eq($this.opts.active - 1).addClass(options.activeclass));var fn = eval(function (t, e) {
          var s = e ? elements.find("a[" + $this.opts.attribute + '="' + e + '"]').parent() : $(this);s.trigger("_before"), elements.removeClass(options.activeclass), s.addClass(options.activeclass), _tabs.hide(), i = elements.index(s);var o = e || s.find("a").attr($this.opts.attribute);return $this.opts.deeplinking && (location.hash = o), $this.opts.animation ? _container.find(o).animate({ opacity: "show" }, "slow", function () {
            s.trigger("_after");
          }) : (_container.find(o).show(), s.trigger("_after")), !1;
        }),
            init = eval("elements." + $this.opts.mouseevent + "(fn)"),
            t,
            forward = function forward() {
          i = ++i % elements.length, "hover" == $this.opts.mouseevent ? elements.eq(i).trigger("mouseover") : elements.eq(i).click(), $this.opts.autorotate && (clearTimeout(t), t = setTimeout(forward, $this.opts.delay), $this.mouseover(function () {
            $this.opts.pauseonhover && clearTimeout(t);
          }));
        };$this.opts.autorotate && (t = setTimeout(forward, $this.opts.delay), $this.hover(function () {
          $this.opts.pauseonhover && clearTimeout(t);
        }, function () {
          t = setTimeout(forward, $this.opts.delay);
        }), $this.opts.pauseonhover && $this.on("mouseleave", function () {
          clearTimeout(t), t = setTimeout(forward, $this.opts.delay);
        }));var move = function move(t) {
          "forward" == t && (i = ++i % elements.length), "backward" == t && (i = --i % elements.length), elements.eq(i).click();
        };$this.find(options.controls.next).click(function () {
          move("forward");
        }), $this.find(options.controls.prev).click(function () {
          move("backward");
        }), $this.on("show", function (t, e) {
          fn(t, e);
        }), $this.on("next", function () {
          move("forward");
        }), $this.on("prev", function () {
          move("backward");
        }), $this.on("destroy", function () {
          $(this).removeData().find("> ul li").each(function () {
            $(this).removeClass(options.activeclass);
          }), _tabs.each(function (t) {
            $(this).removeAttr("style").css("display", _cache_div[t]);
          });
        });
      }
    });
  }, $(document).ready(function () {
    $('[data-toggle="tabslet"]').tabslet();
  });
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * YoutubeBackground - A wrapper for the Youtube API - Great for fullscreen background videos or just regular videos.
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 *
 * Version:  1.0.5
 *
 */

// Chain of Responsibility pattern. Creates base class that can be overridden.
if (typeof Object.create !== "function") {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}

(function ($, window, document) {
  var loadAPI = function loadAPI(callback) {

    // Load Youtube API
    var tag = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];

    if (window.location.origin == 'file://') {
      tag.src = 'http://www.youtube.com/iframe_api';
    } else {
      tag.src = '//www.youtube.com/iframe_api';
    }

    head.appendChild(tag);

    // Clean up Tags.
    head = null;
    tag = null;

    iframeIsReady(callback);
  },
      iframeIsReady = function iframeIsReady(callback) {
    // Listen for Gobal YT player callback
    if (typeof YT === 'undefined' && typeof window.loadingPlayer === 'undefined') {
      // Prevents Ready Event from being called twice
      window.loadingPlayer = true;

      // Creates deferred so, other players know when to wait.
      window.dfd = $.Deferred();
      window.onYouTubeIframeAPIReady = function () {
        window.onYouTubeIframeAPIReady = null;
        window.dfd.resolve("done");
        callback();
      };
    } else if ((typeof YT === 'undefined' ? 'undefined' : _typeof(YT)) === 'object') {
      callback();
    } else {
      window.dfd.done(function (name) {
        callback();
      });
    }
  };

  // YTPlayer Object
  var YTPlayer = {
    player: null,

    // Defaults
    defaults: {
      ratio: 16 / 9,
      videoId: 'LSmgKRx5pBo',
      mute: true,
      repeat: true,
      width: $(window).width(),
      playButtonClass: 'YTPlayer-play',
      pauseButtonClass: 'YTPlayer-pause',
      muteButtonClass: 'YTPlayer-mute',
      volumeUpClass: 'YTPlayer-volume-up',
      volumeDownClass: 'YTPlayer-volume-down',
      start: 0,
      pauseOnScroll: false,
      fitToBackground: true,
      playerVars: {
        iv_load_policy: 3,
        modestbranding: 1,
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        wmode: 'opaque',
        branding: 0,
        autohide: 0
      },
      events: null
    },

    /**
     * @function init
     * Intializes YTPlayer object
     */
    init: function init(node, userOptions) {
      var self = this;

      self.userOptions = userOptions;

      self.$body = $('body'), self.$node = $(node), self.$window = $(window);

      // Setup event defaults with the reference to this
      self.defaults.events = {
        'onReady': function onReady(e) {
          self.onPlayerReady(e);

          // setup up pause on scroll
          if (self.options.pauseOnScroll) {
            self.pauseOnScroll();
          }

          // Callback for when finished
          if (typeof self.options.callback == 'function') {
            self.options.callback.call(this);
          }
        },
        'onStateChange': function onStateChange(e) {
          if (e.data === 1) {

            self.$node.find('img').fadeOut(400);
            self.$node.addClass('loaded');
          } else if (e.data === 0 && self.options.repeat) {
            // video ended and repeat option is set true
            self.player.seekTo(self.options.start);
          }
        }
      };

      self.options = $.extend(true, {}, self.defaults, self.userOptions);
      self.options.height = Math.ceil(self.options.width / self.options.ratio);
      self.ID = new Date().getTime();
      self.holderID = 'YTPlayer-ID-' + self.ID;

      if (self.options.fitToBackground) {
        self.createBackgroundVideo();
      } else {
        self.createContainerVideo();
      }
      // Listen for Resize Event
      self.$window.on('resize.YTplayer' + self.ID, function () {
        self.resize(self);
      });

      loadAPI(self.onYouTubeIframeAPIReady.bind(self));

      self.resize(self);

      return self;
    },

    /**
     * @function pauseOnScroll
     * Adds window events to pause video on scroll.
     */
    pauseOnScroll: function pauseOnScroll() {
      var self = this;
      self.$window.on('scroll.YTplayer' + self.ID, function () {
        var state = self.player.getPlayerState();
        if (state === 1) {
          self.player.pauseVideo();
        }
      });
      self.$window.scrollStopped(function () {
        var state = self.player.getPlayerState();
        if (state === 2) {
          self.player.playVideo();
        }
      });
    },
    /**
     * @function createContainerVideo
     * Adds HTML for video in a container
     */
    createContainerVideo: function createContainerVideo() {
      var self = this;

      /*jshint multistr: true */
      var $YTPlayerString = $('<div id="ytplayer-container' + self.ID + '" >\
                                    <div id="' + self.holderID + '" class="ytplayer-player-inline"></div> \
                                    </div> \
                                    <div id="ytplayer-shield" class="ytplayer-shield"></div>');

      self.$node.append($YTPlayerString);
      self.$YTPlayerString = $YTPlayerString;
      $YTPlayerString = null;
    },

    /**
     * @function createBackgroundVideo
     * Adds HTML for video background
     */
    createBackgroundVideo: function createBackgroundVideo() {
      /*jshint multistr: true */
      var self = this,
          $YTPlayerString = $('<div id="ytplayer-container' + self.ID + '" class="ytplayer-container background">\
                                    <div id="' + self.holderID + '" class="ytplayer-player"></div>\
                                    </div>\
                                    <div id="ytplayer-shield" class="ytplayer-shield"></div>');

      self.$node.append($YTPlayerString);
      self.$YTPlayerString = $YTPlayerString;
      $YTPlayerString = null;
    },

    /**
     * @function resize
     * Resize event to change video size
     */
    resize: function resize(self) {
      //var self = this;
      var container = $(window);

      if (!self.options.fitToBackground) {
        container = self.$node;
      }

      var width = container.width(),
          pWidth,
          // player width, to be defined
      height = container.height(),
          pHeight,
          // player height, tbd
      $YTPlayerPlayer = $('#' + self.holderID);

      // when screen aspect ratio differs from video, video must center and underlay one dimension
      if (width / self.options.ratio < height) {
        pWidth = Math.ceil(height * self.options.ratio); // get new player width
        $YTPlayerPlayer.width(pWidth).height(height).css({
          left: (width - pWidth) / 2,
          top: 0
        }); // player width is greater, offset left; reset top
      } else {
        // new video width < window width (gap to right)
        pHeight = Math.ceil(width / self.options.ratio); // get new player height
        $YTPlayerPlayer.width(width).height(pHeight).css({
          left: 0,
          top: (height - pHeight) / 2
        }); // player height is greater, offset top; reset left
      }

      $YTPlayerPlayer = null;
      container = null;
    },

    /**
     * @function onYouTubeIframeAPIReady
     * @ params {object} YTPlayer object for access to options
     * Youtube API calls this function when the player is ready.
     */
    onYouTubeIframeAPIReady: function onYouTubeIframeAPIReady() {
      var self = this;
      self.player = new window.YT.Player(self.holderID, self.options);
    },

    /**
     * @function onPlayerReady
     * @ params {event} window event from youtube player
     */
    onPlayerReady: function onPlayerReady(e) {
      if (this.options.mute) {
        e.target.mute();
      }
      e.target.playVideo();
    },

    /**
     * @function getPlayer
     * returns youtube player
     */
    getPlayer: function getPlayer() {
      return this.player;
    },

    /**
     * @function destroy
     * destroys all!
     */
    destroy: function destroy() {
      var self = this;

      self.$node.removeData('yt-init').removeData('ytPlayer').removeClass('loaded');

      self.$YTPlayerString.remove();

      $(window).off('resize.YTplayer' + self.ID);
      $(window).off('scroll.YTplayer' + self.ID);
      self.$body = null;
      self.$node = null;
      self.$YTPlayerString = null;
      self.player.destroy();
      self.player = null;
    }
  };

  // Scroll Stopped event.
  $.fn.scrollStopped = function (callback) {
    var $this = $(this),
        self = this;
    $this.scroll(function () {
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback, 250, self));
    });
  };

  // Create plugin
  $.fn.YTPlayer = function (options) {

    return this.each(function () {
      var el = this;

      $(el).data("yt-init", true);
      var player = Object.create(YTPlayer);
      player.init(el, options);
      $.data(el, "ytPlayer", player);
    });
  };
})(jQuery, window, document);
'use strict';

(function (window, undefined) {
  var Arkio = {
    initializeMenu: function initializeMenu() {
      var bodyElement = $('body');
      var menuOpenButton = $('.js-open-menu');
      var menuCloseButton = $('.js-menu-close');
      var morphEl = document.getElementById('morph-shape');

      if (!morphEl) {
        return;
      }

      var s = Snap(morphEl.querySelector('svg'));
      var path = s.select('path');
      var initialPath = path.attr('d');
      var pathOpen = morphEl.getAttribute('data-morph-open');
      var isAnimating = false;
      var isMenuOpen = false;
      var closeMenuFunc = function closeMenuFunc() {
        bodyElement.removeClass('show-menu');

        window.setTimeout(function () {
          path.attr('d', initialPath);
          isAnimating = false;
          isMenuOpen = false;
        }, 300);
      };

      if (menuOpenButton) {
        menuOpenButton.on('click', function (e) {
          e.preventDefault();

          if (isMenuOpen) {
            closeMenuFunc();
          } else {
            bodyElement.addClass('show-menu');
            path.animate({ 'path': pathOpen }, 400, mina.easeinout, function () {
              isAnimating = false;
            });

            isMenuOpen = true;
          }
        });
      }

      if (menuCloseButton) {
        menuCloseButton.on('click', function (e) {
          e.preventDefault();
          closeMenuFunc();
        });
      }
    },

    initializeVideo: function initializeVideo() {
      var videoHolders = $('.background-video-holder');

      if (!videoHolders) {
        return;
      }

      var videoOptions = {
        fitToBackground: true,
        mute: true,
        videoId: 'fwkJtgVswgM' // Default
      };

      videoHolders.each(function () {
        var element = $(this);
        var videoId = element.attr('data-videoid');

        if (videoId) {
          videoOptions.videoId = videoId;
        }

        console.log(element);

        element.YTPlayer(videoOptions);
      });
    }
  };

  $(document).ready(function () {
    Arkio.initializeMenu();
    Arkio.initializeVideo();
  });
})(window);