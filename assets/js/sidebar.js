(function ($) {
    "use strict";
    var bdAdmin = {
      initialize: function () {
        this.navbarClock();
        this.inputSearch();
        this.scrollBar();
        this.dropdownScrollBar();
        this.navbarToggler();
        this.sideBar();
        this.sidebarCompact();
        this.materialRipple();
        this.toTop();
        this.fullScreen();
        this.pageloader();
      },
      navbarClock: function () {
        //nav clock
        if ($(".nav-clock")[0]) {
          var a = new Date();
          a.setDate(a.getDate()),
            setInterval(function () {
              var a = new Date().getSeconds();
              $(".time-sec").html((a < 10 ? "0" : "") + a);
            }, 1e3),
            setInterval(function () {
              var a = new Date().getMinutes();
              $(".time-min").html((a < 10 ? "0" : "") + a);
            }, 1e3),
            setInterval(function () {
              var a = new Date().getHours();
              $(".time-hours").html((a < 10 ? "0" : "") + a);
            }, 1e3);
        }
      },
      inputSearch: function () {
        //input search focus action
        $("body").on("focus", ".search__text", function () {
          $(this).closest(".search").addClass("search--focus");
        }),
          $("body").on("blur", ".search__text", function () {
            $(this).val(""), $(this).closest(".search").removeClass("search--focus");
          });
      },
      scrollBar: function () {
        $(".sidebar-body").each(function () {
          const ps = new PerfectScrollbar($(this)[0]);
        });
      },
      dropdownScrollBar: function () {
        $(".dropdown-menu-scroll").each(function () {
          const ps = new PerfectScrollbar($(this)[0]);
        });
      },
      navbarToggler: function () {
        //Navbar collapse hide
        $(".navbar-collapse .navbar-toggler").on("click", function () {
          $(".navbar-collapse").collapse("hide");
        });
      },
      sideBar: function () {
        $("#sidebarCollapse").on("click", function () {
          $(".sidebar, .navbar").toggleClass("active");
        });
        $(".overlay").on("click", function () {
          $(".sidebar").removeClass("active");
          $(".overlay").removeClass("active");
          $(".sidebar-icon-aside").removeClass("show");
          $(".sidebar-icon .nav-link").removeClass("active");
        });
        $("#sidebarCollapse").on("click", function (e) {
          e.preventDefault();
          if (window.matchMedia("(max-width: 767px)").matches) {
            $(".overlay").addClass("active");
          } else {
            $(".overlay").removeClass("active");
          }
        });
        $(".sidebar .with-sub").on("click", function (e) {
          e.preventDefault();
          $(this).parent().toggleClass("show");
          $(this).parent().siblings().removeClass("show");
        });
  
        var minimizeSidebar = false,
          miniSidebar = 0;
  
        function checkPosition(x) {
          if (x.matches) {
            // If media query matches
  
            if (!minimizeSidebar) {
              var minibutton = $(".sidebar-toggle-icon");
              if ($(".sidebar-mini").hasClass("sidebar-collapse")) {
                miniSidebar = 1;
                minibutton.addClass("toggled");
              }
              minibutton.on("click", function () {
                if (miniSidebar === 1) {
                  $(".sidebar-mini").removeClass("sidebar-collapse");
                  minibutton.removeClass("toggled");
                  miniSidebar = 0;
                } else {
                  $(".sidebar-mini").addClass("sidebar-collapse");
                  minibutton.addClass("toggled");
                  miniSidebar = 1;
                }
                $(window).resize();
              });
              minimizeSidebar = true;
            }
            $(".sidebar").hover(
              function () {
                if ($(".sidebar-mini").hasClass("sidebar-collapse")) {
                  $(".sidebar-mini").addClass("sidebar-collapse_hover");
                }
              },
              function () {
                if ($(".sidebar-mini").hasClass("sidebar-collapse")) {
                  $(".sidebar-mini").removeClass("sidebar-collapse_hover");
                }
              }
            );
          }
        }
  
        var x = window.matchMedia("(min-width: 768px)");
        checkPosition(x); // Call listener function at run time
        x.addListener(checkPosition); // Attach listener function on state changes
      },
      sidebarCompact: function () {
        if ($(".sidebar-icon .nav-link.active").length) {
          var targ = $(".sidebar-icon .nav-link.active").attr("href");
          $(targ).addClass("show");
          $(".sidebar-icon-aside").addClass("show");
  
          if (window.matchMedia("(min-width: 992px)").matches && window.matchMedia("(max-width: 1199px)").matches) {
            $(".sidebar-icon .nav-link.active").removeClass("active");
          }
        }
        $(".sidebar-icon .nav-link").on("click", function (e) {
          e.preventDefault();
  
          $(this).addClass("active");
          $(this).siblings().removeClass("active");
  
          $(".sidebar-icon-aside").addClass("show");
  
          var targ = $(this).attr("href");
          $(targ).addClass("show");
          $(targ).siblings().removeClass("show");
        });
        $(".sidebar-icon-toggle-menu").on("click", function (e) {
          e.preventDefault();
  
          $(".sidebar-icon .nav-link.active").removeClass("active");
          $(".sidebar-icon-aside").removeClass("show");
        });
  
        $(".compact .sidebar-toggle-icon").on("click", function () {
          $(".content-wrapper").toggleClass("active");
        });
  
        $(".sidebar-icon").each(function () {
          const ps = new PerfectScrollbar($(this)[0]);
        });
  
        $(".sidebar-icon-body").each(function () {
          const ps = new PerfectScrollbar($(this)[0]);
        });
      },
      materialRipple: function () {
        // Material Ripple effect
        $(".material-ripple").on("click", function (event) {
          var surface = $(this);
  
          // create .material-ink element if doesn't exist
          if (surface.find(".material-ink").length === 0) {
            surface.prepend("<div class='material-ink'></div>");
          }
  
          var ink = surface.find(".material-ink");
  
          // in case of quick double clicks stop the previous animation
          ink.removeClass("animate");
  
          // set size of .ink
          if (!ink.height() && !ink.width()) {
            // use surface's width or height whichever is larger for
            // the diameter to make a circle which can cover the entire element
            var diameter = Math.max(surface.outerWidth(), surface.outerHeight());
            ink.css({ height: diameter, width: diameter });
          }
  
          // get click coordinates
          // Logic:
          // click coordinates relative to page minus
          // surface's position relative to page minus
          // half of self height/width to make it controllable from the center
          var xPos = event.pageX - surface.offset().left - ink.width() / 2;
          var yPos = event.pageY - surface.offset().top - ink.height() / 2;
  
          var rippleColor = surface.data("ripple-color");
  
          //set the position and add class .animate
          ink
            .css({
              top: yPos + "px",
              left: xPos + "px",
              background: rippleColor,
            })
            .addClass("animate");
        });
      },
      toTop: function () {
        $("body").append('<div id="toTop" class="btn-top"><i class="typcn typcn-arrow-up fs-21"></i></div>');
        $(window).scroll(function () {
          if ($(this).scrollTop() !== 0) {
            $("#toTop").fadeIn();
          } else {
            $("#toTop").fadeOut();
          }
        });
        $("#toTop").on("click", function () {
          $("html, body").animate({ scrollTop: 0 }, 600);
          return false;
        });
      },
      fullScreen: function () {
        function toggleFullscreen(elem) {
          elem = elem || document.documentElement;
          if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
              elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
              elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
              elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
          }
        }
  
        var el = document.getElementById("btnFullscreen");
        if (el) {
          el.addEventListener("click", function () {
            toggleFullscreen();
          });
        }
        $(".full-screen_icon").click(function () {
          $(this).toggleClass("typcn-arrow-move-outline");
          $(this).toggleClass("typcn-arrow-minimise-outline");
        });
      },
      pageloader: function () {
        setTimeout(function () {
          $(".page-loader-wrapper").fadeOut();
        }, 50);
      },
    };
    // Initialize
    $(document).ready(function () {
      "use strict";
      bdAdmin.initialize();
      $(".metismenu").metisMenu(); //Metismenu
    });
    $(window).on("load", function () {
      bdAdmin.pageloader();
    });
  })(jQuery);

  
//   js for metismenu 

// mest menu js start
!(function (e, n) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = n(require("jquery"))) : "function" == typeof define && define.amd ? define(["jquery"], n) : ((e = e || self).metisMenu = n(e.jQuery));
  })(this, function (o) {
    "use strict";
    function a() {
      return (a =
        Object.assign ||
        function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          }
          return e;
        }).apply(this, arguments);
    }
    o = o && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
    var i,
      n,
      r,
      s =
        ((n = "transitionend"),
        (r = {
          TRANSITION_END: "mmTransitionEnd",
          triggerTransitionEnd: function (e) {
            i(e).trigger(n);
          },
          supportsTransitionEnd: function () {
            return Boolean(n);
          },
        }),
        ((i = o).fn.mmEmulateTransitionEnd = e),
        (i.event.special[r.TRANSITION_END] = {
          bindType: n,
          delegateType: n,
          handle: function (e) {
            if (i(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
          },
        }),
        r);
    function e(e) {
      var n = this,
        t = !1;
      return (
        i(this).one(r.TRANSITION_END, function () {
          t = !0;
        }),
        setTimeout(function () {
          t || r.triggerTransitionEnd(n);
        }, e),
        this
      );
    }
    var t = "metisMenu",
      g = "metisMenu",
      l = "." + g,
      h = o.fn[t],
      f = { toggle: !0, preventDefault: !0, triggerElement: "a", parentTrigger: "li", subMenu: "ul" },
      d = { SHOW: "show" + l, SHOWN: "shown" + l, HIDE: "hide" + l, HIDDEN: "hidden" + l, CLICK_DATA_API: "click" + l + ".data-api" },
      u = "metismenu",
      c = "mm-active",
      p = "mm-show",
      m = "mm-collapse",
      T = "mm-collapsing",
      v = (function () {
        function r(e, n) {
          (this.element = e), (this.config = a({}, f, {}, n)), (this.transitioning = null), this.init();
        }
        var e = r.prototype;
        return (
          (e.init = function () {
            var a = this,
              s = this.config,
              e = o(this.element);
            e.addClass(u),
              e
                .find(s.parentTrigger + "." + c)
                .children(s.triggerElement)
                .attr("aria-expanded", "true"),
              e
                .find(s.parentTrigger + "." + c)
                .parents(s.parentTrigger)
                .addClass(c),
              e
                .find(s.parentTrigger + "." + c)
                .parents(s.parentTrigger)
                .children(s.triggerElement)
                .attr("aria-expanded", "true"),
              e
                .find(s.parentTrigger + "." + c)
                .has(s.subMenu)
                .children(s.subMenu)
                .addClass(m + " " + p),
              e
                .find(s.parentTrigger)
                .not("." + c)
                .has(s.subMenu)
                .children(s.subMenu)
                .addClass(m),
              e
                .find(s.parentTrigger)
                .children(s.triggerElement)
                .on(d.CLICK_DATA_API, function (e) {
                  var n = o(this);
                  if ("true" !== n.attr("aria-disabled")) {
                    s.preventDefault && "#" === n.attr("href") && e.preventDefault();
                    var t = n.parent(s.parentTrigger),
                      i = t.siblings(s.parentTrigger),
                      r = i.children(s.triggerElement);
                    t.hasClass(c) ? (n.attr("aria-expanded", "false"), a.removeActive(t)) : (n.attr("aria-expanded", "true"), a.setActive(t), s.toggle && (a.removeActive(i), r.attr("aria-expanded", "false"))), s.onTransitionStart && s.onTransitionStart(e);
                  }
                });
          }),
          (e.setActive = function (e) {
            o(e).addClass(c);
            var n = o(e).children(this.config.subMenu);
            0 < n.length && !n.hasClass(p) && this.show(n);
          }),
          (e.removeActive = function (e) {
            o(e).removeClass(c);
            var n = o(e).children(this.config.subMenu + "." + p);
            0 < n.length && this.hide(n);
          }),
          (e.show = function (e) {
            var n = this;
            if (!this.transitioning && !o(e).hasClass(T)) {
              var t = o(e),
                i = o.Event(d.SHOW);
              if ((t.trigger(i), !i.isDefaultPrevented())) {
                if ((t.parent(this.config.parentTrigger).addClass(c), this.config.toggle)) {
                  var r = t
                    .parent(this.config.parentTrigger)
                    .siblings()
                    .children(this.config.subMenu + "." + p);
                  this.hide(r);
                }
                t.removeClass(m).addClass(T).height(0), this.setTransitioning(!0);
                t.height(e[0].scrollHeight)
                  .one(s.TRANSITION_END, function () {
                    n.config &&
                      n.element &&
                      (t
                        .removeClass(T)
                        .addClass(m + " " + p)
                        .height(""),
                      n.setTransitioning(!1),
                      t.trigger(d.SHOWN));
                  })
                  .mmEmulateTransitionEnd(350);
              }
            }
          }),
          (e.hide = function (e) {
            var n = this;
            if (!this.transitioning && o(e).hasClass(p)) {
              var t = o(e),
                i = o.Event(d.HIDE);
              if ((t.trigger(i), !i.isDefaultPrevented())) {
                t.parent(this.config.parentTrigger).removeClass(c), t.height(t.height())[0].offsetHeight, t.addClass(T).removeClass(m).removeClass(p), this.setTransitioning(!0);
                var r = function () {
                  n.config && n.element && (n.transitioning && n.config.onTransitionEnd && n.config.onTransitionEnd(), n.setTransitioning(!1), t.trigger(d.HIDDEN), t.removeClass(T).addClass(m));
                };
                0 === t.height() || "none" === t.css("display") ? r() : t.height(0).one(s.TRANSITION_END, r).mmEmulateTransitionEnd(350);
              }
            }
          }),
          (e.setTransitioning = function (e) {
            this.transitioning = e;
          }),
          (e.dispose = function () {
            o.removeData(this.element, g), o(this.element).find(this.config.parentTrigger).children(this.config.triggerElement).off(d.CLICK_DATA_API), (this.transitioning = null), (this.config = null), (this.element = null);
          }),
          (r.jQueryInterface = function (i) {
            return this.each(function () {
              var e = o(this),
                n = e.data(g),
                t = a({}, f, {}, e.data(), {}, "object" == typeof i && i ? i : {});
              if ((n || ((n = new r(this, t)), e.data(g, n)), "string" == typeof i)) {
                if (void 0 === n[i]) throw new Error('No method named "' + i + '"');
                n[i]();
              }
            });
          }),
          r
        );
      })();
    return (
      (o.fn[t] = v.jQueryInterface),
      (o.fn[t].Constructor = v),
      (o.fn[t].noConflict = function () {
        return (o.fn[t] = h), v.jQueryInterface;
      }),
      v
    );
  });

  