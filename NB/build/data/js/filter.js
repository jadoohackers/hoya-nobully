(function(z) {
  function u(b) {
    if (p[b]) {
      return p[b].exports;
    }
    var f = p[b] = {exports:{}, id:b, loaded:!1};
    z[b].call(f.exports, f, f.exports, u);
    f.loaded = !0;
    return f.exports;
  }
  var p = {};
  u.m = z;
  u.c = p;
  u.p = "";
  return u(0);
})([function(z, u, p) {
  var b, f, k, c, l, d, G, q;
  b = p(67);
  l = p(1).Provider;
  c = p(3).PhoenixT1Provider;
  k = p(2).HighlineProvider;
  f = p(4).DialogViewModel;
  d = p(5).ReportViewModel;
  G = p(39).TermCriterion;
  q = p(40).UserCriterion;
  new (function() {
    function K() {
      this.dialogViewModel = new f;
      this.reportViewModel = new d(this.dialogViewModel);
      this.provider.dialogView.render(this.dialogViewModel);
      b(window).on("hashchange", function(d) {
        return function() {
          return setTimeout(function() {
            return d.applyFilter();
          }, 500);
        };
      }(this));
      this.provider.onNewTweets(function(d) {
        return function() {
          return d.applyFilter();
        };
      }(this));
      this.dialogViewModel.onSettingsChange(function(d) {
        return function() {
          return d.applyFilter();
        };
      }(this));
      this.applyFilter();
    }
    K.prototype.provider = l.getActive(c, k);
    K.prototype.applyFilter = function() {
      return this.throttle(16, function(d) {
        return function() {
          var c, b, l;
          d.dialogViewModel.reload();
          c = d.dialogViewModel.enabled() && d.provider.filterCurrentPage() ? [new G(d.provider, d.dialogViewModel, d.dialogViewModel.termsList()), new q(d.provider, d.dialogViewModel, d.dialogViewModel.usersList())] : [];
          b = 0;
          l = {};
          d.provider.tweets().each(function(k, f) {
            var a, q, G, K;
            G = 0;
            for (K = c.length;G < K;G++) {
              a = c[G], a.match(f) && (q = !0);
            }
            f.style.display = q ? "none" : "block";
            if (q) {
              return b++, a = d.provider.tweetAuthor(f), null != l[a] ? l[a] : l[a] = d.provider.tweetAuthorPhoto(f);
            }
          });
          d.reportViewModel.applied(0 < c.length).hiddenCount(b).hiddenUsers(l);
          return d.throttle(1E3, function() {
            return d.provider.reportView.render(d.reportViewModel);
          });
        };
      }(this));
    };
    K.prototype.throttle = function() {
      var d;
      d = {};
      return function(c, b) {
        var l;
        l = b.toString();
        clearTimeout(d[l]);
        return d[l] = setTimeout(b, c);
      };
    }();
    return K;
  }());
}, function(z, u, p) {
  var b = [].slice;
  this.Provider = function() {
    function f() {
    }
    f.prototype.inMyProfilePage = function() {
      return this.screenUser() === this.sessionUser();
    };
    f.prototype.normalizeUser = function(b) {
      return null != b ? b.replace("@", "").trim() : "";
    };
    f.getActive = function() {
      var f, c, l, d;
      d = 1 <= arguments.length ? b.call(arguments, 0) : [];
      d = d.map(function(d) {
        return new d;
      });
      f = 0;
      for (c = d.length;f < c;f++) {
        if (l = d[f], l.isActive()) {
          return l;
        }
      }
      return d[d.length - 1];
    };
    return f;
  }();
}, function(z, u, p) {
  var b, f, k, c = function(d, c) {
    function b() {
      this.constructor = d;
    }
    for (var f in c) {
      l.call(c, f) && (d[f] = c[f]);
    }
    b.prototype = c.prototype;
    d.prototype = new b;
    d.__super__ = c.prototype;
    return d;
  }, l = {}.hasOwnProperty, d = [].indexOf || function(d) {
    for (var c = 0, b = this.length;c < b;c++) {
      if (c in this && this[c] === d) {
        return c;
      }
    }
    return -1;
  };
  b = p(67);
  z = p(1).Provider;
  f = p(6).PhoenixT1DialogView;
  k = p(7).PhoenixT1ReportView;
  this.HighlineProvider = function(l) {
    function q() {
      return q.__super__.constructor.apply(this, arguments);
    }
    c(q, l);
    q.prototype.dialogView = new f;
    q.prototype.reportView = new k;
    q.prototype.isActive = function() {
      return b("body").hasClass("highline");
    };
    q.prototype.filterCurrentPage = function() {
      var c, b;
      c = (b = location.pathname + location.hash, 0 <= d.call(this.ignorablePages(), b));
      return !(this.inMyProfilePage() || c);
    };
    q.prototype.ignorablePages = function() {
      return ["/" + this.sessionUser() + "/lists", "/i/#!/who_to_follow/suggestions", "/i/#!/who_to_follow/import", "/i/#!/who_to_follow/interests"];
    };
    q.prototype.sessionUser = function() {
      return this.normalizeUser(b(".account-group.js-mini-current-user").data("screen-name"));
    };
    q.prototype.screenUser = function() {
      return this.normalizeUser(b(".ProfileHeaderCard-screenname").text());
    };
    q.prototype.tweets = function() {
      return b('div.tweet.js-stream-tweet, .Grid[data-component-term="tweet"]');
    };
    q.prototype.tweetText = function(d) {
      return b(d).find(".js-tweet-text, .entry-content, .ProfileTweet-text").text();
    };
    q.prototype.tweetAuthor = function(d) {
      return this.normalizeUser(b(d).find(".username").text());
    };
    q.prototype.tweetAuthorPhoto = function(d) {
      return b(d).find("img.js-action-profile-avatar").attr("src");
    };
    q.prototype.tweetRetweeter = function(d) {
      return (d = b(d).find(".pretty-link.js-user-profile-link").attr("href")) ? d.replace(/^\//, "") : "";
    };
    q.prototype.onNewTweets = function(d) {
      return b(document).on("DOMNodeInserted", ".stream .stream-items", function(c) {
        return function() {
          var b;
          b = c.tweets().size();
          if (c.tweetsCount !== b) {
            return c.tweetsCount = b, d();
          }
        };
      }(this));
    };
    return q;
  }(z);
}, function(z, u, p) {
  var b, f, k, c = function(d, c) {
    function b() {
      this.constructor = d;
    }
    for (var f in c) {
      l.call(c, f) && (d[f] = c[f]);
    }
    b.prototype = c.prototype;
    d.prototype = new b;
    d.__super__ = c.prototype;
    return d;
  }, l = {}.hasOwnProperty, d = [].indexOf || function(d) {
    for (var c = 0, b = this.length;c < b;c++) {
      if (c in this && this[c] === d) {
        return c;
      }
    }
    return -1;
  };
  b = p(67);
  z = p(1).Provider;
  f = p(6).PhoenixT1DialogView;
  k = p(7).PhoenixT1ReportView;
  this.PhoenixT1Provider = function(l) {
    function q() {
      return q.__super__.constructor.apply(this, arguments);
    }
    c(q, l);
    q.prototype.dialogView = new f;
    q.prototype.reportView = new k;
    q.prototype.isActive = function() {
      return b("body").hasClass("t1");
    };
    q.prototype.filterCurrentPage = function() {
      var c, b;
      c = (b = location.pathname + location.hash, 0 <= d.call(this.ignorablePages(), b));
      return !(this.inMyProfilePage() || c);
    };
    q.prototype.ignorablePages = function() {
      return ["/" + this.sessionUser() + "/lists", "/i/#!/who_to_follow/suggestions", "/i/#!/who_to_follow/import", "/i/#!/who_to_follow/interests"];
    };
    q.prototype.sessionUser = function() {
      return this.normalizeUser(b(".account-group.js-mini-current-user").data("screen-name"));
    };
    q.prototype.screenUser = function() {
      return this.normalizeUser(b(".screen-name:not(.hidden)").text());
    };
    q.prototype.tweets = function() {
      return b("div.tweet.js-stream-tweet");
    };
    q.prototype.tweetText = function(d) {
      return b(d).find(".js-tweet-text, .tweet-text, .entry-content, .twtr-tweet-text").text();
    };
    q.prototype.tweetAuthor = function(d) {
      return this.normalizeUser(b(d).find(".username").text());
    };
    q.prototype.tweetAuthorPhoto = function(d) {
      return b(d).find("img.avatar").attr("src");
    };
    q.prototype.tweetRetweeter = function(d) {
      return (d = b(d).find(".pretty-link.js-user-profile-link").attr("href")) ? d.replace("/#!/", "") : "";
    };
    q.prototype.onNewTweets = function(d) {
      return b(document).on("DOMNodeInserted", ".stream .stream-items", function(c) {
        return function() {
          var b;
          b = c.tweets().size();
          if (c.tweetsCount !== b) {
            return c.tweetsCount = b, d();
          }
        };
      }(this));
    };
    return q;
  }(z);
}, function(z, u, p) {
  var b, f;
  b = p(72);
  p(69)(b);
  f = p(8);
  this.DialogViewModel = function() {
    function k() {
      var c, l, d;
      this.showWelcomeTip = b.observable(!0).extend({persist:"TwitterFilter.showWelcomeTip_004"});
      l = this.settings;
      for (d in l) {
        c = l[d], this[d] = b.observable(c).extend({persist:"TwitterFilter." + d});
      }
      this.migrateSince(1);
      this.visible = b.observable(!1);
      this.toggleText = b.computed(function(d) {
        return function() {
          return d.enabled() ? f.get("disable") : f.get("enable");
        };
      }(this));
      this.termsExcludeText = b.computed(function(d) {
        return function() {
          return d.termsExclude() ? f.get("excluding") : f.get("including");
        };
      }(this));
      this.usersExcludeText = b.computed(function(d) {
        return function() {
          return d.usersExclude() ? f.get("excluding") : f.get("including");
        };
      }(this));
      this.bookmarklet = b.computed(function(c) {
        return function() {
          var b;
          b = function(d) {
            var b;
            d = c[d];
            b = JSON.stringify(d()).replace(/\\/g, "\\\\").replace(/\'/g, "\\'");
            return "s('" + d.persistKey + "','" + b + "');";
          };
          return ("javascript:(function(){\nfunction s(k,v){window.localStorage.setItem(k,v);}\n" + function() {
            var c;
            c = [];
            for (d in this.settings) {
              c.push(b(d));
            }
            return c;
          }.call(c).join("") + '\n$(\'<div id="filter-reload" data-version="' + c.version + "\"></div>').appendTo($('#filter-button'));\n})();").replace(/\n/g, "");
        };
      }(this));
    }
    k.prototype.version = 2;
    k.prototype.settings = {termsList:"", termsExclude:!0, usersList:"", usersExclude:!0, enabled:!0, showReportView:!0};
    k.prototype.clear = function() {
      var c, b, d, f;
      b = this.settings;
      d = [];
      for (f in b) {
        c = b[f], d.push(this[f](c));
      }
      return d;
    };
    k.prototype.reload = function() {
      var c, b;
      for (b in this.settings) {
        "function" === typeof(c = this[b]).reload && c.reload();
      }
    };
    k.prototype.onSettingsChange = function(c) {
      var b, d;
      b = [];
      for (d in this.settings) {
        b.push(this[d].subscribe(c));
      }
      return b;
    };
    k.prototype.bookmarkletLoaded = function(c) {
      this.migrateSince(c);
      return this.reload();
    };
    k.prototype.toggle = function(c) {
      return this[c](!this[c]());
    };
    k.prototype.toggleEnabled = function() {
      return this.toggle("enabled");
    };
    k.prototype.toggleVisible = function() {
      return this.toggle("visible");
    };
    k.prototype.toggleTermsExclude = function() {
      return this.toggle("termsExclude");
    };
    k.prototype.toggleUsersExclude = function() {
      return this.toggle("usersExclude");
    };
    k.prototype.toggleShowReportView = function() {
      return this.toggle("showReportView");
    };
    k.prototype.migrateSince = function(c) {
      var b;
      b = c + 1;
      for (c = [];b <= this.version;) {
        c.push(this.migrations[b++]());
      }
      return c;
    };
    k.prototype.migrations = {2:function() {
      var c, b;
      b = function(d, c, b) {
        var l;
        l = localStorage.getItem(d);
        if (null != l) {
          return null != b && (l = b(l)), localStorage.setItem("TwitterFilter." + c, JSON.stringify(l)), localStorage.removeItem(d);
        }
      };
      c = function(d) {
        return "1" === d;
      };
      b("filter_terms_list", "termsList");
      b("filter_terms_exclude", "termsExclude", c);
      b("filter_from_list", "usersList");
      b("filter_from_exclude", "usersExclude", c);
      return b("filter_enabled", "enabled", c);
    }, 3:function() {
    }};
    return k;
  }();
}, function(z, u, p) {
  var b, f;
  b = p(72);
  f = p(8);
  this.ReportViewModel = function() {
    return function(k) {
      this.applied = b.observable(!1);
      this.hiddenCount = b.observable(!1);
      this.hiddenUsers = b.observable(!1);
      this.visible = b.computed(function(c) {
        return function() {
          return k.showReportView() && c.applied() && 0 < c.hiddenCount();
        };
      }(this));
      this.hasHiddenTweets = b.computed(function(c) {
        return function() {
          return 0 !== c.hiddenCount();
        };
      }(this));
      this.filteringByEndMessage = b.computed(function(c) {
        return function() {
          return 1 === c.hiddenCount() ? f.get("filtering_by_end_singular") : f.get("filtering_by_end");
        };
      }(this));
      this.usersPhotos = b.computed(function(c) {
        return function() {
          var b, d, f, k;
          b = c.hiddenUsers();
          d = [];
          for (k in b) {
            (f = b[k]) && d.push({title:k, src:f});
          }
          return d;
        };
      }(this));
      this.usersNames = b.computed(function(c) {
        return function() {
          var b, d, f, k;
          b = c.hiddenUsers();
          d = [];
          for (k in b) {
            (f = b[k]) || d.push(k);
          }
          return d;
        };
      }(this));
    };
  }();
}, function(z, u, p) {
  var b, f, k, c = function(d, b) {
    function c() {
      this.constructor = d;
    }
    for (var f in b) {
      l.call(b, f) && (d[f] = b[f]);
    }
    c.prototype = b.prototype;
    d.prototype = new c;
    d.__super__ = b.prototype;
    return d;
  }, l = {}.hasOwnProperty;
  b = p(67);
  p(70);
  p(71);
  f = p(72);
  p(55);
  k = p(8);
  this.PhoenixT1DialogView = function(d) {
    function l() {
      return l.__super__.constructor.apply(this, arguments);
    }
    c(l, d);
    l.prototype.render = function(d) {
      this.renderButton(d);
      this.renderDialog(d);
      this.monitorBookmarklet(d);
      return this.showWelcomeTip(d);
    };
    l.prototype.renderButton = function(d) {
      var c;
      c = b(p(20)({messages:k}));
      b("#user-dropdown ul li:nth-child(5)").after(c);
      return f.applyBindings(d, c[0]);
    };
    l.prototype.renderDialog = function(d) {
      var c;
      c = p(21)({messages:k});
      return d.visible.subscribe(function(b) {
        return function(l) {
          return b.visibleToggled(l, c, d, {appendTo:"body", center:!0});
        };
      }(this));
    };
    l.prototype.dialogHeaderSelector = ".modal-header";
    l.prototype.visibleToggled = function() {
      var d, c;
      d = null;
      c = b('<div class="twttr-dialog-overlay"></div>').appendTo(b("body"));
      return function(l, G, p, u) {
        if (l) {
          return c.show(), d = b(G), d.appendTo(b(u.appendTo)), d.show(), u.center && (l = b("#filter-dialog"), l.css("position", "absolute").css("top", (b(window).height() - l.outerHeight()) / 2 + "px").css("left", (b(window).width() - l.outerWidth()) / 2 + "px")), d.draggable({handle:this.dialogHeaderSelector}), d.on("keydown keypress", function(d) {
            return d.stopPropagation();
          }), d.find(".filter-terms-list").tipsy({gravity:"w", trigger:"focus", html:!0, fallback:k.get("filter_terms_list_title")}), d.find(".filter-users-list").tipsy({gravity:"w", trigger:"focus", html:!0, fallback:k.get("filter_users_list_title")}), d.find(".filter-bookmarklet").tipsy({gravity:"n", trigger:"hover", html:!0, fallback:k.get("bookmarklet_title")}), p.reload(), f.applyBindings(p, d[0]);
        }
        d.find(".filter-terms-list").tipsy("hide");
        d.find(".filter-users-list").tipsy("hide");
        d.find(".filter-bookmarklet").tipsy("hide");
        f.cleanNode(d[0]);
        d.remove();
        return c.hide();
      };
    }();
    l.prototype.monitorBookmarklet = function(d) {
      return b("#filter-button").on("DOMNodeInserted", function(c) {
        c = b(c.target);
        d.bookmarkletLoaded(c.data("version"));
        return c.remove();
      });
    };
    l.prototype.welcomeTip = function() {
      return b("#user-dropdown");
    };
    l.prototype.showWelcomeTip = function(d) {
      if (d.showWelcomeTip()) {
        return setTimeout(function(c) {
          return function() {
            c.welcomeTip().tipsy({gravity:"e", trigger:"manual", html:!0, fallback:k.get("welcome_tip")}).tipsy("show").click(function() {
              return b(this).tipsy("hide");
            });
            setTimeout(function() {
              return c.welcomeTip().tipsy("hide");
            }, 3E4);
            return d.showWelcomeTip(!1);
          };
        }(this), 3E3);
      }
    };
    return l;
  }(p(12).View);
}, function(z, u, p) {
  var b, f, k, c = function(d, c) {
    function b() {
      this.constructor = d;
    }
    for (var f in c) {
      l.call(c, f) && (d[f] = c[f]);
    }
    b.prototype = c.prototype;
    d.prototype = new b;
    d.__super__ = c.prototype;
    return d;
  }, l = {}.hasOwnProperty;
  b = p(67);
  f = p(72);
  k = p(8);
  this.PhoenixT1ReportView = function(d) {
    function l() {
      return l.__super__.constructor.apply(this, arguments);
    }
    c(l, d);
    l.prototype.render = function(d) {
      var c, l;
      b(".filter-report-component").each(function() {
        return f.cleanNode(this);
      }).remove();
      l = b(p(19)({messages:k}));
      c = b(".dashboard").find(".component:not(:empty):eq(0),.module:not(:empty):eq(0)").first();
      null != c[0] && c.after(l);
      return f.applyBindings(d, l[0]);
    };
    return l;
  }(p(12).View);
}, function(z, u, p) {
  var b, f;
  b = p(67);
  f = {en:p(14), es:p(15), pt:p(16)};
  z.exports = {lang:function() {
    var k;
    k = b("html").attr("lang");
    return k in f ? k : "en";
  }, get:function(b) {
    var c;
    return null != (c = f[this.lang()][b]) ? c : "#" + b + "#";
  }};
}, , , , function(z, u, p) {
  this.View = function() {
    function b() {
    }
    b.prototype.render = function(b) {
      throw Error("Not implemented");
    };
    return b;
  }();
}, , function(z, u, p) {
  z.exports = {filter_dialog_title:"Filters", enable:"Enable", disable:"Disable", excluding:"Currently protecting you from", including:"Including", tweets_terms:"", tweets_users:"", filter_terms_list_title:"Currently blocking the default dictionary.", filter_users_list_title:"Block Specific Usernames", show_report_view:" .", bookmarklet_text:" ", bookmarklet_title:" .", filtering_by_start:"Saving you from ", filtering_by_end:"malicious tweets.", filtering_by_end_singular:"malicious tweet.", users_with_hidden_tweets:" ", 
  terms:"terms", people:"people", and:"and", clear:"Clear", filter:"Filters", welcome_tip:" ."};
}, function(z, u, p) {
  z.exports = {filter_dialog_title:"Filtros", enable:"Activar", disable:"Desactivar", excluding:"Excluyendo", including:"Incluyendo", tweets_terms:"tweets con t\u00e9rminos", tweets_users:"tweets de usuarios", filter_terms_list_title:"T\u00e9rminos separados por comas.<br/>Por ej.: twitcam, jijiji", filter_users_list_title:"Usuarios separados por comas.<br/>Por ej.: tuiterowsky, robocopano", show_report_view:"Mostrar resumen de tweets filtrados.", bookmarklet_text:"Configuraci\u00f3n de OpenTweetFilter", 
  bookmarklet_title:"Arrastra este elemento a la barra de marcadores para respaldar tus filtros", filtering_by_start:"Ocultando", filtering_by_end:"tweets por filtro", filtering_by_end_singular:"tweet por filtro", users_with_hidden_tweets:"Usuarios con tweets ocultos", terms:"t\u00e9rminos", people:"usuarios", and:"y", clear:"Limpiar", filter:"Filtros", welcome_tip:"Pssst... Aqu\u00ed puedes configurar<br/>la extensi\u00f3n Open Tweet Filter. \u2192"};
}, function(z, u, p) {
  z.exports = {filter_dialog_title:"Filtros", enable:"Ativar", disable:"Desativar", excluding:"Excluindo", including:"Incluindo", tweets_terms:"tweets com termos", tweets_users:"tweets de usuarios", filter_terms_list_title:"Termos separados por v\u00edrgulas.<br/>Por ex.: twitcam, #BBB", filter_users_list_title:"Usuarios separados por v\u00edrgulas.<br/>Por ej.: tuiterowsky, robocopano", show_report_view:"Mostrar resumo de tweets filtrados.", bookmarklet_text:"Configura\u00e7\u00e3o do OpenTweetFilter", 
  bookmarklet_title:"Arraste esse bookmarklet para a barra de bookmarks para que voc\u00ea possa fazer um backup de seus filtros", filtering_by_start:"Ocultando", filtering_by_end:"tweets por filtro", filtering_by_end_singular:"tweet por filtro", users_with_hidden_tweets:"Usuarios com tweets ocultos", terms:"termos", people:"usuarios", and:"e", clear:"Limpar", filter:"Filtros", welcome_tip:"Pssst... Aqu\u00ed voc\u00ea pode configurar<br/>a extens\u00e3o Open Tweet Filter. \u2192"};
}, , , function(z, u, p) {
  var b = p(35);
  z.exports = function(f) {
    var k = [], c = {}, l;
    f = f || {};
    (function(d) {
      c.headerTemplate = function() {
        k.push("<h3>" + b.escape(null == (l = d.get("filtering_by_start")) ? "" : l) + '\n&nbsp;<span data-bind="text: hiddenCount" class="user-stat-link"></span>&nbsp;<span data-bind="text: filteringByEndMessage"></span>.</h3>');
      };
      c.bodyTemplate = function() {
        k.push('<div><span data-bind="if: hasHiddenTweets"><span>' + b.escape(null == (l = d.get("users_with_hidden_tweets")) ? "" : l) + ':</span><br/></span><span data-bind="foreach: usersPhotos"><img data-bind="attr: {src: $data.src, title: $data.title}" style="margin-right:5px;" width="24" height="24"/></span><span data-bind="foreach: usersNames"><div data-bind="text: $data + &quot;&amp;nbsp;&amp;nbsp&quot;"></div></span></div>');
      };
      k.push('<div data-bind="visible: visible" class="filter-report-component component"><div class="module"><div class="flex-module"><div class="flex-module-header">');
      c.headerTemplate();
      k.push('</div><div class="flex-module-inner">');
      c.bodyTemplate();
      k.push("</div></div></div></div>");
    }).call(this, "messages" in f ? f.messages : "undefined" !== typeof messages ? messages : void 0);
    return k.join("");
  };
}, function(z, u, p) {
  var b = p(35);
  z.exports = function(f) {
    var k = [], c;
    f = f || {};
    k.push('<li id="filter-button" data-name="filter"><a href="#" data-bind="click: toggleVisible" class="js-filter-dialog">' + b.escape(null == (c = ("messages" in f ? f.messages : "undefined" !== typeof messages ? messages : void 0).get("filter")) ? "" : c) + "</a></li>");
    return k.join("");
  };
}, function(z, u, p) {
  var b = p(35);
  z.exports = function(f) {
    var k = [], c;
    f = f || {};
    f = "messages" in f ? f.messages : "undefined" !== typeof messages ? messages : void 0;
    k.push('<div id="filter-dialog-container" class="modal-container draggable"><div class="close-modal-background-target"></div><div id="filter-dialog" class="modal"><div class="modal-content"><button data-bind="click: toggleVisible" class="modal-btn modal-close"><span class="Icon Icon--close Icon--medium"></span></button><div class="twttr-dialog-header modal-header"><h3>' + b.escape(null == (c = f.get("filter_dialog_title")) ? "" : c) + '</h3></div><div class="modal-body"><fieldset><a data-bind="text: termsExcludeText, click: toggleTermsExclude" class="btn filter-list-label"></a><div class="filter-list-label">&nbsp; ' + 
    b.escape(null == (c = f.get("tweets_terms")) ? "" : c) + ':</div><input type="text" data-bind="value: termsList, valueUpdate: [\'change\', \'afterkeydown\']" class="filter-terms-list"/><div>&nbsp;</div><a data-bind="text: usersExcludeText, click: toggleUsersExclude" class="btn filter-list-label"></a><div class="filter-list-label">&nbsp; ' + b.escape(null == (c = f.get("tweets_users")) ? "" : c) + ':</div><input type="text" data-bind="value: usersList, valueUpdate: [\'change\', \'afterkeydown\']" class="filter-users-list"/><label class="checkbox"><input type="checkbox" data-bind="checked: showReportView"/><span data-bind="click: toggleShowReportView">' + 
    b.escape(null == (c = f.get("show_report_view")) ? "" : c) + '</span></label></fieldset></div><div class="twttr-dialog-footer modal-footer"><div class="filter-dialog-footer-left"><a data-bind="click: clear" class="btn"> ' + b.escape(null == (c = f.get("clear")) ? "" : c) + '</a></div><div class="filter-dialog-footer-right"><a data-bind="attr: {href: bookmarklet}" class="filter-bookmarklet">' + b.escape(null == (c = f.get("bookmarklet_text")) ? "" : c) + '</a><a data-bind="text: toggleText, click: toggleEnabled" class="btn"></a></div></div></div></div></div>');
    return k.join("");
  };
}, , function(z, u, p) {
}, , , , , , , , , , , , function(z, u, p) {
  function b(b) {
    return null != b && "" !== b;
  }
  function f(k) {
    return (Array.isArray(k) ? k.map(f) : k && "object" === typeof k ? Object.keys(k).filter(function(c) {
      return k[c];
    }) : [k]).filter(b).join(" ");
  }
  u.merge = function c(l, d) {
    if (1 === arguments.length) {
      for (var f = l[0], q = 1;q < l.length;q++) {
        f = c(f, l[q]);
      }
      return f;
    }
    f = l["class"];
    q = d["class"];
    if (f || q) {
      f = f || [], q = q || [], Array.isArray(f) || (f = [f]), Array.isArray(q) || (q = [q]), l["class"] = f.concat(q).filter(b);
    }
    for (var p in d) {
      "class" != p && (l[p] = d[p]);
    }
    return l;
  };
  u.joinClasses = f;
  u.cls = function(c, b) {
    for (var d = [], G = 0;G < c.length;G++) {
      b && b[G] ? d.push(u.escape(f([c[G]]))) : d.push(f(c[G]));
    }
    d = f(d);
    return d.length ? ' class="' + d + '"' : "";
  };
  u.style = function(c) {
    return c && "object" === typeof c ? Object.keys(c).map(function(b) {
      return b + ":" + c[b];
    }).join(";") : c;
  };
  u.attr = function(c, b, d, f) {
    "style" === c && (b = u.style(b));
    if ("boolean" == typeof b || null == b) {
      return b ? " " + (f ? c : c + '="' + c + '"') : "";
    }
    if (0 == c.indexOf("data") && "string" != typeof b) {
      return -1 !== JSON.stringify(b).indexOf("&") && console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"), b && "function" === typeof b.toISOString && console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0"), " " + c + "='" + JSON.stringify(b).replace(/'/g, "&apos;") + "'";
    }
    if (d) {
      return b && "function" === typeof b.toISOString && console.warn("Jade will stringify dates in ISO form after 2.0.0"), " " + c + '="' + u.escape(b) + '"';
    }
    b && "function" === typeof b.toISOString && console.warn("Jade will stringify dates in ISO form after 2.0.0");
    return " " + c + '="' + b + '"';
  };
  u.attrs = function(b, l) {
    var d = [], G = Object.keys(b);
    if (G.length) {
      for (var q = 0;q < G.length;++q) {
        var p = G[q], z = b[p];
        "class" == p ? (z = f(z)) && d.push(" " + p + '="' + z + '"') : d.push(u.attr(p, z, !1, l));
      }
    }
    return d.join("");
  };
  u.escape = function(b) {
    var l = String(b).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    return l === "" + b ? b : l;
  };
  u.rethrow = function l(d, b, f, u) {
    if (!(d instanceof Error)) {
      throw d;
    }
    if (!("undefined" == typeof window && b || u)) {
      throw d.message += " on line " + f, d;
    }
    try {
      u = u || p(23).readFileSync(b, "utf8");
    } catch (z) {
      l(d, null, f);
    }
    var U = 3;
    u = u.split("\n");
    var E = Math.max(f - U, 0), U = u.slice(E, Math.min(u.length, f + U)).map(function(d, b) {
      var l = b + E + 1;
      return (l == f ? "  > " : "    ") + l + "| " + d;
    }).join("\n");
    d.path = b;
    d.message = (b || "Jade") + ":" + f + "\n" + U + "\n\n" + d.message;
    throw d;
  };
}, , , , function(z, u, p) {
  var b = function(b, c) {
    function l() {
      this.constructor = b;
    }
    for (var d in c) {
      f.call(c, d) && (b[d] = c[d]);
    }
    l.prototype = c.prototype;
    b.prototype = new l;
    b.__super__ = c.prototype;
    return b;
  }, f = {}.hasOwnProperty;
  this.TermCriterion = function(f) {
    function c(b, d, f) {
      this.provider = b;
      this.dialogViewModel = d;
      c.__super__.constructor.call(this, f, !1);
    }
    b(c, f);
    c.prototype.match = function(b) {
      return null == this.rx ? !1 : c.__super__.match.call(this, this.provider.tweetText(b)) === this.dialogViewModel.termsExclude();
    };
    return c;
  }(p(41).Criterion);
}, function(z, u, p) {
  var b = function(b, c) {
    function l() {
      this.constructor = b;
    }
    for (var d in c) {
      f.call(c, d) && (b[d] = c[d]);
    }
    l.prototype = c.prototype;
    b.prototype = new l;
    b.__super__ = c.prototype;
    return b;
  }, f = {}.hasOwnProperty;
  this.UserCriterion = function(f) {
    function c(b, d, f) {
      this.provider = b;
      this.dialogViewModel = d;
      c.__super__.constructor.call(this, f, !0);
    }
    b(c, f);
    c.prototype.match = function(b) {
      var d;
      if (null == this.rx) {
        return !1;
      }
      d = this.dialogViewModel.usersExclude();
      return c.__super__.match.call(this, this.provider.tweetAuthor(b)) || c.__super__.match.call(this, this.provider.tweetRetweeter(b)) ? d : !d;
    };
    return c;
  }(p(41).Criterion);
}, function(z, u, p) {
  var b;
  b = p(67);
  this.Criterion = function() {
    function f(b, c) {
      this.rx = this.buildRegExp(this.buildPattern(b, c));
    }
    f.prototype.match = function(b) {
      if (null == this.rx) {
        return !1;
      }
      this.rx.lastIndex = 0;
      return this.rx.test(b);
    };
    f.prototype.buildPattern = function(f, c) {
      var l;
      l = f.split(",");
      l = b.map(l, function(d) {
        d = b.trim(d);
        return 2 < d.length && "/" === d[0] && "/" === d[d.length - 1] ? d.substr(1, d.length - 2) : d.replace(/([\.\(\)\[\]\{\}\+\*\?\\])/g, "\\$1");
      });
      l = b.grep(l, function(b, c) {
        return "" !== b;
      });
      if (0 === l.length) {
        return null;
      }
      l = "(" + l.join("|") + ")";
      return c ? "^" + l + "$" : l;
    };
    f.prototype.buildRegExp = function(b) {
      if (null == b) {
        return null;
      }
      try {
        return new RegExp(b, "gi");
      } catch (c) {
        return null;
      }
    };
    return f;
  }();
}, , , function(z, u, p) {
  u = p(45);
  "string" === typeof u && (u = [[z.id, u, ""]]);
  p(46)(u, {});
  u.locals && (z.exports = u.locals);
}, function(z, u, p) {
  u = z.exports = p(47)();
  u.push([z.id, ".tipsy { padding: 5px; font-size: 12px; position: absolute; z-index: 100000; }\n  .tipsy-inner { padding: 5px 8px 4px 8px; background-color: black; color: white; max-width: 200px; text-align: center; }\n  .tipsy-inner { border-radius: 3px; -moz-border-radius:3px; -webkit-border-radius:3px; }\n  .tipsy-arrow { position: absolute; background: url(" + p(50) + ") no-repeat top left; width: 9px; height: 5px; }\n  .tipsy-n .tipsy-arrow { top: 0; left: 50%; margin-left: -4px; }\n    .tipsy-nw .tipsy-arrow { top: 0; left: 10px; }\n    .tipsy-ne .tipsy-arrow { top: 0; right: 10px; }\n  .tipsy-s .tipsy-arrow { bottom: 0; left: 50%; margin-left: -4px; background-position: bottom left; }\n    .tipsy-sw .tipsy-arrow { bottom: 0; left: 10px; background-position: bottom left; }\n    .tipsy-se .tipsy-arrow { bottom: 0; right: 10px; background-position: bottom left; }\n  .tipsy-e .tipsy-arrow { top: 50%; margin-top: -4px; right: 0; width: 5px; height: 9px; background-position: top right; }\n  .tipsy-w .tipsy-arrow { top: 50%; margin-top: -4px; left: 0; width: 5px; height: 9px; }\n", 
  ""]);
}, function(z, u, p) {
  function b(b, a) {
    for (var d = 0;d < b.length;d++) {
      var c = b[d], f = K[c.id];
      if (f) {
        f.refs++;
        for (var k = 0;k < f.parts.length;k++) {
          f.parts[k](c.parts[k]);
        }
        for (;k < c.parts.length;k++) {
          f.parts.push(l(c.parts[k], a));
        }
      } else {
        f = [];
        for (k = 0;k < c.parts.length;k++) {
          f.push(l(c.parts[k], a));
        }
        K[c.id] = {id:c.id, refs:1, parts:f};
      }
    }
  }
  function f(b) {
    for (var a = [], d = {}, c = 0;c < b.length;c++) {
      var f = b[c], l = f[0], f = {css:f[1], media:f[2], sourceMap:f[3]};
      d[l] ? d[l].parts.push(f) : a.push(d[l] = {id:l, parts:[f]});
    }
    return a;
  }
  function k() {
    var b = document.createElement("style"), a = E();
    b.type = "text/css";
    a.appendChild(b);
    return b;
  }
  function c() {
    var b = document.createElement("link"), a = E();
    b.rel = "stylesheet";
    a.appendChild(b);
    return b;
  }
  function l(b, a) {
    var f, l, p;
    if (a.singleton) {
      var u = W++;
      f = M || (M = k());
      l = d.bind(null, f, u, !1);
      p = d.bind(null, f, u, !0);
    } else {
      b.sourceMap && "function" === typeof URL && "function" === typeof URL.createObjectURL && "function" === typeof URL.revokeObjectURL && "function" === typeof Blob && "function" === typeof btoa ? (f = c(), l = q.bind(null, f), p = function() {
        f.parentNode.removeChild(f);
        f.href && URL.revokeObjectURL(f.href);
      }) : (f = k(), l = G.bind(null, f), p = function() {
        f.parentNode.removeChild(f);
      });
    }
    l(b);
    return function(a) {
      a ? a.css === b.css && a.media === b.media && a.sourceMap === b.sourceMap || l(b = a) : p();
    };
  }
  function d(b, a, d, c) {
    d = d ? "" : c.css;
    b.styleSheet ? b.styleSheet.cssText = V(a, d) : (d = document.createTextNode(d), c = b.childNodes, c[a] && b.removeChild(c[a]), c.length ? b.insertBefore(d, c[a]) : b.appendChild(d));
  }
  function G(b, a) {
    var d = a.css, c = a.media;
    c && b.setAttribute("media", c);
    if (b.styleSheet) {
      b.styleSheet.cssText = d;
    } else {
      for (;b.firstChild;) {
        b.removeChild(b.firstChild);
      }
      b.appendChild(document.createTextNode(d));
    }
  }
  function q(b, a) {
    var d = a.css, c = a.sourceMap;
    c && (d += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(c)) + " */");
    d = new Blob([d], {type:"text/css"});
    c = b.href;
    b.href = URL.createObjectURL(d);
    c && URL.revokeObjectURL(c);
  }
  var K = {};
  u = function(b) {
    var a;
    return function() {
      "undefined" === typeof a && (a = b.apply(this, arguments));
      return a;
    };
  };
  var U = u(function() {
    return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
  }), E = u(function() {
    return document.head || document.getElementsByTagName("head")[0];
  }), M = null, W = 0;
  z.exports = function(d, a) {
    a = a || {};
    "undefined" === typeof a.singleton && (a.singleton = U());
    var c = f(d);
    b(c, a);
    return function(d) {
      for (var l = [], k = 0;k < c.length;k++) {
        var q = K[c[k].id];
        q.refs--;
        l.push(q);
      }
      d && (k = f(d), b(k, a));
      for (k = 0;k < l.length;k++) {
        if (q = l[k], 0 === q.refs) {
          for (d = 0;d < q.parts.length;d++) {
            q.parts[d]();
          }
          delete K[q.id];
        }
      }
    };
  };
  var V = function() {
    var b = [];
    return function(a, d) {
      b[a] = d;
      return b.filter(Boolean).join("\n");
    };
  }();
}, function(z, u, p) {
  z.exports = function() {
    var b = [];
    b.toString = function() {
      for (var b = [], k = 0;k < this.length;k++) {
        var c = this[k];
        c[2] ? b.push("@media " + c[2] + "{" + c[1] + "}") : b.push(c[1]);
      }
      return b.join("");
    };
    b.i = function(f, k) {
      "string" === typeof f && (f = [[null, f, ""]]);
      for (var c = {}, l = 0;l < this.length;l++) {
        var d = this[l][0];
        "number" === typeof d && (c[d] = !0);
      }
      for (l = 0;l < f.length;l++) {
        d = f[l], "number" === typeof d[0] && c[d[0]] || (k && !d[2] ? d[2] = k : k && (d[2] = "(" + d[2] + ") and (" + k + ")"), b.push(d));
      }
    };
    return b;
  };
}, , , function(z, u, p) {
  z.exports = "data:image/gif;base64,R0lGODlhCQAJAIABAAAAAAAAACH5BAEAAAEALAAAAAAJAAkAAAIRjAOnwIrcDJxvwkplPtchVQAAOw==";
}, , function(z, u, p) {
  (function(b) {
    z.exports = b;
  }).call(u, {});
}, , , function(z, u, p) {
  u = p(56);
  "string" === typeof u && (u = [[z.id, u, ""]]);
  p(46)(u, {});
  u.locals && (z.exports = u.locals);
}, function(z, u, p) {
  u = z.exports = p(47)();
  u.push([z.id, '/**\n * Dialog\n */\n\n.close-modal-background-target {\n    width: 100%;\n}\n\n#filter-dialog-container.modal-container {\n    overflow-x: visible !important;\n    overflow-y: visible !important;\n}\n\n#filter-dialog .modal-header {\n  padding: 15px 15px 14px;\n  border-bottom: 1px solid #e8e8e8;\n  height: 18px;\n  background-color: #eee;\n}\n\n#filter-dialog .modal-close {\n  right: 10px;\n  top: 13px;\n}\n\n#filter-dialog .modal-footer {\n  background-color: #eee;\n}\n\n#filter-dialog fieldset {\n    margin: 10px 0px;\n    width: 490px !important;\n}\n\n#filter-dialog fieldset .btn {\n  font-weight: normal;\n}\n\n#filter-dialog fieldset input[type="text"] {\n    width: 12em;\n}\n\n#filter-dialog fieldset input[type="text"] {\n    border-bottom-left-radius: 3px 3px;\n    border-bottom-right-radius: 3px 3px;\n    border-top-left-radius: 3px 3px;\n    border-top-right-radius: 3px 3px;\n}\n\n#filter-dialog fieldset input[type="text"] {\n    border: 1px solid #AAA;\n    padding: 4px 2px;\n}\n\n#filter-dialog .checkbox {\n  display: block;\n  margin-top: 15px;\n  margin-left: 3px;\n}\n\n#filter-dialog .checkbox input {\n  margin-right: 5px;\n}\n\n.btn.filter-list-label {\n  float:left;\n  margin-bottom: 2px;\n}\n\ndiv.filter-list-label {\n  padding-top: 7px;\n}\n\n.filter-terms-list, .filter-users-list {\n  width: 455px !important;\n}\n\n#filter-dialog .modal-footer {\n  padding-top: 10px;\n  height: 25px;\n}\n\n.modal-footer .filter-dialog-footer-left {\n  left: 10px;\n  float: left;\n}\n\n.modal-footer .filter-dialog-footer-right {\n  right: 10px;\n  float: right;\n}\n\na.filter-bookmarklet {\n  cursor: move;\n  border: 1px outset #ddd;\n  padding: 2px;\n  background: #ddd;\n  font-size: 11px;\n  color: #000 !important;\n  margin-right: 110px;\n}\n\n.es a.filter-bookmarklet {\n  margin-right: 80px;\n}\n\na.filter-bookmarklet {\n  margin-right: 90px;\n}\n\n.es a.filter-bookmarklet {\n  margin-right: 55px;\n}\n', 
  ""]);
}, , , , , , , , , , , function(z, u, p) {
  var b, f;
  "use strict";
  (function() {
    function k(c) {
      (function(c, d) {
        function k(g) {
          var a = B[g] = {}, e, C;
          g = g.split(/\s+/);
          e = 0;
          for (C = g.length;e < C;e++) {
            a[g[e]] = !0;
          }
          return a;
        }
        function q(g, a, r) {
          if (r === d && 1 === g.nodeType) {
            if (r = "data-" + a.replace(N, "-$1").toLowerCase(), r = g.getAttribute(r), "string" === typeof r) {
              try {
                r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : e.isNumeric(r) ? +r : X.test(r) ? e.parseJSON(r) : r;
              } catch (C) {
              }
              e.data(g, a, r);
            } else {
              r = d;
            }
          }
          return r;
        }
        function K(g) {
          for (var a in g) {
            if (("data" !== a || !e.isEmptyObject(g[a])) && "toJSON" !== a) {
              return !1;
            }
          }
          return !0;
        }
        function U(g, a, r) {
          var C = a + "defer", b = a + "queue", d = a + "mark", c = e._data(g, C);
          !c || "queue" !== r && e._data(g, b) || "mark" !== r && e._data(g, d) || setTimeout(function() {
            e._data(g, b) || e._data(g, d) || (e.removeData(g, C, !0), c.fire());
          }, 0);
        }
        function E() {
          return !1;
        }
        function M() {
          return !0;
        }
        function W(g) {
          return !g || !g.parentNode || 11 === g.parentNode.nodeType;
        }
        function V(g, a, r) {
          a = a || 0;
          if (e.isFunction(a)) {
            return e.grep(g, function(g, e) {
              return !!a.call(g, e, g) === r;
            });
          }
          if (a.nodeType) {
            return e.grep(g, function(g, e) {
              return g === a === r;
            });
          }
          if ("string" === typeof a) {
            var b = e.grep(g, function(g) {
              return 1 === g.nodeType;
            });
            if (cb.test(a)) {
              return e.filter(a, b, !r);
            }
            a = e.filter(a, b);
          }
          return e.grep(g, function(g, b) {
            return 0 <= e.inArray(g, a) === r;
          });
        }
        function ba(g) {
          var a = Ha.split("|");
          g = g.createDocumentFragment();
          if (g.createElement) {
            for (;a.length;) {
              g.createElement(a.pop());
            }
          }
          return g;
        }
        function a(g, a) {
          return e.nodeName(g, "table") ? g.getElementsByTagName("tbody")[0] || g.appendChild(g.ownerDocument.createElement("tbody")) : g;
        }
        function ca(g, a) {
          if (1 === a.nodeType && e.hasData(g)) {
            var r, b, d;
            b = e._data(g);
            var c = e._data(a, b), h = b.events;
            if (h) {
              for (r in delete c.handle, c.events = {}, h) {
                for (b = 0, d = h[r].length;b < d;b++) {
                  e.event.add(a, r, h[r][b]);
                }
              }
            }
            c.data && (c.data = e.extend({}, c.data));
          }
        }
        function Q(g, a) {
          var r;
          1 === a.nodeType && (a.clearAttributes && a.clearAttributes(), a.mergeAttributes && a.mergeAttributes(g), r = a.nodeName.toLowerCase(), "object" === r ? a.outerHTML = g.outerHTML : "input" !== r || "checkbox" !== g.type && "radio" !== g.type ? "option" === r ? a.selected = g.defaultSelected : "input" === r || "textarea" === r ? a.defaultValue = g.defaultValue : "script" === r && a.text !== g.text && (a.text = g.text) : (g.checked && (a.defaultChecked = a.checked = g.checked), a.value !== 
          g.value && (a.value = g.value)), a.removeAttribute(e.expando), a.removeAttribute("_submit_attached"), a.removeAttribute("_change_attached"));
        }
        function T(g) {
          return "undefined" !== typeof g.getElementsByTagName ? g.getElementsByTagName("*") : "undefined" !== typeof g.querySelectorAll ? g.querySelectorAll("*") : [];
        }
        function ia(g) {
          if ("checkbox" === g.type || "radio" === g.type) {
            g.defaultChecked = g.checked;
          }
        }
        function ma(g) {
          var a = (g.nodeName || "").toLowerCase();
          "input" === a ? ia(g) : "script" !== a && "undefined" !== typeof g.getElementsByTagName && e.grep(g.getElementsByTagName("input"), ia);
        }
        function m(g, a, r) {
          var b = "width" === a ? g.offsetWidth : g.offsetHeight, c = "width" === a ? 1 : 0;
          if (0 < b) {
            if ("border" !== r) {
              for (;4 > c;c += 2) {
                r || (b -= parseFloat(e.css(g, "padding" + ja[c])) || 0), b = "margin" === r ? b + (parseFloat(e.css(g, r + ja[c])) || 0) : b - (parseFloat(e.css(g, "border" + ja[c] + "Width")) || 0);
              }
            }
            return b + "px";
          }
          b = na(g, a);
          if (0 > b || null == b) {
            b = g.style[a];
          }
          if (xa.test(b)) {
            return b;
          }
          b = parseFloat(b) || 0;
          if (r) {
            for (;4 > c;c += 2) {
              b += parseFloat(e.css(g, "padding" + ja[c])) || 0, "padding" !== r && (b += parseFloat(e.css(g, "border" + ja[c] + "Width")) || 0), "margin" === r && (b += parseFloat(e.css(g, r + ja[c])) || 0);
            }
          }
          return b + "px";
        }
        function t(g) {
          return function(a, r) {
            "string" !== typeof a && (r = a, a = "*");
            if (e.isFunction(r)) {
              for (var b = a.toLowerCase().split(Ia), c = 0, d = b.length, h, m;c < d;c++) {
                h = b[c], (m = /^\+/.test(h)) && (h = h.substr(1) || "*"), h = g[h] = g[h] || [], h[m ? "unshift" : "push"](r);
              }
            }
          };
        }
        function x(g, a, e, b, c, h) {
          c = c || a.dataTypes[0];
          h = h || {};
          h[c] = !0;
          c = g[c];
          for (var m = 0, f = c ? c.length : 0, l = g === ya, t;m < f && (l || !t);m++) {
            t = c[m](a, e, b), "string" === typeof t && (!l || h[t] ? t = d : (a.dataTypes.unshift(t), t = x(g, a, e, b, t, h)));
          }
          !l && t || h["*"] || (t = x(g, a, e, b, "*", h));
          return t;
        }
        function A(g, a) {
          var r, b, c = e.ajaxSettings.flatOptions || {};
          for (r in a) {
            a[r] !== d && ((c[r] ? g : b || (b = {}))[r] = a[r]);
          }
          b && e.extend(!0, g, b);
        }
        function I(g, a, r, b) {
          if (e.isArray(a)) {
            e.each(a, function(a, e) {
              r || db.test(g) ? b(g, e) : I(g + "[" + ("object" === typeof e ? a : "") + "]", e, r, b);
            });
          } else {
            if (r || "object" !== e.type(a)) {
              b(g, a);
            } else {
              for (var c in a) {
                I(g + "[" + c + "]", a[c], r, b);
              }
            }
          }
        }
        function J() {
          try {
            return new c.XMLHttpRequest;
          } catch (g) {
          }
        }
        function S() {
          setTimeout(w, 0);
          return ra = e.now();
        }
        function w() {
          ra = d;
        }
        function y(g, a) {
          var r = {};
          e.each(sa.concat.apply([], sa.slice(0, a)), function() {
            r[this] = g;
          });
          return r;
        }
        function n(g) {
          if (!za[g]) {
            var a = h.body, r = e("<" + g + ">").appendTo(a), b = r.css("display");
            r.remove();
            if ("none" === b || "" === b) {
              da || (da = h.createElement("iframe"), da.frameBorder = da.width = da.height = 0), a.appendChild(da), oa && da.createElement || (oa = (da.contentWindow || da.contentDocument).document, oa.write((e.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), oa.close()), r = oa.createElement(g), oa.body.appendChild(r), b = e.css(r, "display"), a.removeChild(da);
            }
            za[g] = b;
          }
          return za[g];
        }
        function D(g) {
          return e.isWindow(g) ? g : 9 === g.nodeType ? g.defaultView || g.parentWindow : !1;
        }
        var h = c.document, R = c.navigator, v = c.location, e = function() {
          function g() {
            if (!a.isReady) {
              try {
                h.documentElement.doScroll("left");
              } catch (e) {
                setTimeout(g, 1);
                return;
              }
              a.ready();
            }
          }
          var a = function(g) {
            function a(e, F) {
              return g.apply(this, arguments);
            }
            a.toString = function() {
              return g.toString();
            };
            return a;
          }(function(g, e) {
            return new a.fn.init(g, e, m);
          }), e = c.jQuery, b = c.$, m, f = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, t = /\S/, x = /^\s+/, n = /\s+$/, A = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, k = /^[\],:{}\s]*$/, v = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, y = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, w = /(?:^|:|,)(?:\s*\[)+/g, I = /(webkit)[ \/]([\w.]+)/, J = /(opera)(?:.*version)?[ \/]([\w.]+)/, D = /(msie) ([\w.]+)/, S = /(mozilla)(?:.*? rv:([\w.]+))?/, q = /-([a-z]|[0-9])/ig, B = /^-ms-/, G = function(g, 
          a) {
            return (a + "").toUpperCase();
          }, fa = R.userAgent, ta, pa, eb = Object.prototype.toString, Aa = Object.prototype.hasOwnProperty, Ba = Array.prototype.push, O = Array.prototype.slice, p = String.prototype.trim, X = Array.prototype.indexOf, u = {};
          a.fn = a.prototype = {constructor:a, init:function(g, e, b) {
            var r;
            if (!g) {
              return this;
            }
            if (g.nodeType) {
              return this.context = this[0] = g, this.length = 1, this;
            }
            if ("body" === g && !e && h.body) {
              return this.context = h, this[0] = h.body, this.selector = g, this.length = 1, this;
            }
            if ("string" === typeof g) {
              r = "<" === g.charAt(0) && ">" === g.charAt(g.length - 1) && 3 <= g.length ? [null, g, null] : f.exec(g);
              if (!r || !r[1] && e) {
                return !e || e.jquery ? (e || b).find(g) : this.constructor(e).find(g);
              }
              if (r[1]) {
                return b = (e = e instanceof a ? e[0] : e) ? e.ownerDocument || e : h, (g = A.exec(g)) ? a.isPlainObject(e) ? (g = [h.createElement(g[1])], a.fn.attr.call(g, e, !0)) : g = [b.createElement(g[1])] : (g = a.buildFragment([r[1]], [b]), g = (g.cacheable ? a.clone(g.fragment) : g.fragment).childNodes), a.merge(this, g);
              }
              if ((e = h.getElementById(r[2])) && e.parentNode) {
                if (e.id !== r[2]) {
                  return b.find(g);
                }
                this.length = 1;
                this[0] = e;
              }
              this.context = h;
              this.selector = g;
              return this;
            }
            if (a.isFunction(g)) {
              return b.ready(g);
            }
            g.selector !== d && (this.selector = g.selector, this.context = g.context);
            return a.makeArray(g, this);
          }, selector:"", jquery:"1.7.2", length:0, size:function() {
            return this.length;
          }, toArray:function() {
            return O.call(this, 0);
          }, get:function(g) {
            return null == g ? this.toArray() : 0 > g ? this[this.length + g] : this[g];
          }, pushStack:function(g, e, b) {
            var r = this.constructor();
            a.isArray(g) ? Ba.apply(r, g) : a.merge(r, g);
            r.prevObject = this;
            r.context = this.context;
            "find" === e ? r.selector = this.selector + (this.selector ? " " : "") + b : e && (r.selector = this.selector + "." + e + "(" + b + ")");
            return r;
          }, each:function(g, e) {
            return a.each(this, g, e);
          }, ready:function(g) {
            a.bindReady();
            ta.add(g);
            return this;
          }, eq:function(g) {
            g = +g;
            return -1 === g ? this.slice(g) : this.slice(g, g + 1);
          }, first:function() {
            return this.eq(0);
          }, last:function() {
            return this.eq(-1);
          }, slice:function(g) {
            function a() {
              return g.apply(this, arguments);
            }
            a.toString = function() {
              return g.toString();
            };
            return a;
          }(function() {
            return this.pushStack(O.apply(this, arguments), "slice", O.call(arguments).join(","));
          }), map:function(g) {
            return this.pushStack(a.map(this, function(a, e) {
              return g.call(a, e, a);
            }));
          }, end:function() {
            return this.prevObject || this.constructor(null);
          }, push:Ba, sort:[].sort, splice:[].splice};
          a.fn.init.prototype = a.fn;
          a.extend = a.fn.extend = function() {
            var g, e, r, b, c, C = arguments[0] || {}, h = 1, m = arguments.length, f = !1;
            "boolean" === typeof C && (f = C, C = arguments[1] || {}, h = 2);
            "object" === typeof C || a.isFunction(C) || (C = {});
            m === h && (C = this, --h);
            for (;h < m;h++) {
              if (null != (g = arguments[h])) {
                for (e in g) {
                  r = C[e], b = g[e], C !== b && (f && b && (a.isPlainObject(b) || (c = a.isArray(b))) ? (c ? (c = !1, r = r && a.isArray(r) ? r : []) : r = r && a.isPlainObject(r) ? r : {}, C[e] = a.extend(f, r, b)) : b !== d && (C[e] = b));
                }
              }
            }
            return C;
          };
          a.extend({noConflict:function(g) {
            c.$ === a && (c.$ = b);
            g && c.jQuery === a && (c.jQuery = e);
            return a;
          }, isReady:!1, readyWait:1, holdReady:function(g) {
            g ? a.readyWait++ : a.ready(!0);
          }, ready:function(g) {
            if (!0 === g && !--a.readyWait || !0 !== g && !a.isReady) {
              if (!h.body) {
                return setTimeout(a.ready, 1);
              }
              a.isReady = !0;
              !0 !== g && 0 < --a.readyWait || (ta.fireWith(h, [a]), a.fn.trigger && a(h).trigger("ready").off("ready"));
            }
          }, bindReady:function() {
            if (!ta) {
              ta = a.Callbacks("once memory");
              if ("complete" === h.readyState) {
                return setTimeout(a.ready, 1);
              }
              if (h.addEventListener) {
                h.addEventListener("DOMContentLoaded", pa, !1), c.addEventListener("load", a.ready, !1);
              } else {
                if (h.attachEvent) {
                  h.attachEvent("onreadystatechange", pa);
                  c.attachEvent("onload", a.ready);
                  var e = !1;
                  try {
                    e = null == c.frameElement;
                  } catch (r) {
                  }
                  h.documentElement.doScroll && e && g();
                }
              }
            }
          }, isFunction:function(g) {
            return "function" === a.type(g);
          }, isArray:Array.isArray || function(g) {
            return "array" === a.type(g);
          }, isWindow:function(g) {
            return null != g && g == g.window;
          }, isNumeric:function(g) {
            return !isNaN(parseFloat(g)) && isFinite(g);
          }, type:function(g) {
            return null == g ? String(g) : u[eb.call(g)] || "object";
          }, isPlainObject:function(g) {
            if (!g || "object" !== a.type(g) || g.nodeType || a.isWindow(g)) {
              return !1;
            }
            try {
              if (g.constructor && !Aa.call(g, "constructor") && !Aa.call(g.constructor.prototype, "isPrototypeOf")) {
                return !1;
              }
            } catch (e) {
              return !1;
            }
            for (var r in g) {
            }
            return r === d || Aa.call(g, r);
          }, isEmptyObject:function(g) {
            for (var a in g) {
              return !1;
            }
            return !0;
          }, error:function(g) {
            throw Error(g);
          }, parseJSON:function(g) {
            if ("string" !== typeof g || !g) {
              return null;
            }
            g = a.trim(g);
            if (c.JSON && c.JSON.parse) {
              return c.JSON.parse(g);
            }
            if (k.test(g.replace(v, "@").replace(y, "]").replace(w, ""))) {
              return (new Function("return " + g))();
            }
            a.error("Invalid JSON: " + g);
          }, parseXML:function(g) {
            if ("string" !== typeof g || !g) {
              return null;
            }
            var e, r;
            try {
              c.DOMParser ? (r = new DOMParser, e = r.parseFromString(g, "text/xml")) : (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(g));
            } catch (b) {
              e = d;
            }
            e && e.documentElement && !e.getElementsByTagName("parsererror").length || a.error("Invalid XML: " + g);
            return e;
          }, noop:function() {
          }, globalEval:function(g) {
            g && t.test(g) && (c.execScript || function(g) {
              c.eval.call(c, g);
            })(g);
          }, camelCase:function(g) {
            return g.replace(B, "ms-").replace(q, G);
          }, nodeName:function(g, a) {
            return g.nodeName && g.nodeName.toUpperCase() === a.toUpperCase();
          }, each:function(g, e, r) {
            var b, c = 0, C = g.length, h = C === d || a.isFunction(g);
            if (r) {
              if (h) {
                for (b in g) {
                  if (!1 === e.apply(g[b], r)) {
                    break;
                  }
                }
              } else {
                for (;c < C && !1 !== e.apply(g[c++], r);) {
                }
              }
            } else {
              if (h) {
                for (b in g) {
                  if (!1 === e.call(g[b], b, g[b])) {
                    break;
                  }
                }
              } else {
                for (;c < C && !1 !== e.call(g[c], c, g[c++]);) {
                }
              }
            }
            return g;
          }, trim:p ? function(g) {
            return null == g ? "" : p.call(g);
          } : function(g) {
            return null == g ? "" : g.toString().replace(x, "").replace(n, "");
          }, makeArray:function(g, e) {
            var r = e || [];
            if (null != g) {
              var b = a.type(g);
              null == g.length || "string" === b || "function" === b || "regexp" === b || a.isWindow(g) ? Ba.call(r, g) : a.merge(r, g);
            }
            return r;
          }, inArray:function(g, a, e) {
            var F;
            if (a) {
              if (X) {
                return X.call(a, g, e);
              }
              F = a.length;
              for (e = e ? 0 > e ? Math.max(0, F + e) : e : 0;e < F;e++) {
                if (e in a && a[e] === g) {
                  return e;
                }
              }
            }
            return -1;
          }, merge:function(g, a) {
            var e = g.length, F = 0;
            if ("number" === typeof a.length) {
              for (var r = a.length;F < r;F++) {
                g[e++] = a[F];
              }
            } else {
              for (;a[F] !== d;) {
                g[e++] = a[F++];
              }
            }
            g.length = e;
            return g;
          }, grep:function(g, a, e) {
            var F = [], r;
            e = !!e;
            for (var b = 0, c = g.length;b < c;b++) {
              r = !!a(g[b], b), e !== r && F.push(g[b]);
            }
            return F;
          }, map:function(g, e, r) {
            var b, c, C = [], h = 0, m = g.length;
            if (g instanceof a || m !== d && "number" === typeof m && (0 < m && g[0] && g[m - 1] || 0 === m || a.isArray(g))) {
              for (;h < m;h++) {
                b = e(g[h], h, r), null != b && (C[C.length] = b);
              }
            } else {
              for (c in g) {
                b = e(g[c], c, r), null != b && (C[C.length] = b);
              }
            }
            return C.concat.apply([], C);
          }, guid:1, proxy:function(g, e) {
            if ("string" === typeof e) {
              var r = g[e];
              e = g;
              g = r;
            }
            if (!a.isFunction(g)) {
              return d;
            }
            var b = O.call(arguments, 2), r = function() {
              return g.apply(e, b.concat(O.call(arguments)));
            };
            r.guid = g.guid = g.guid || r.guid || a.guid++;
            return r;
          }, access:function(g, e, r, b, c, C, h) {
            var m, f = null == r, ea = 0, fa = g.length;
            if (r && "object" === typeof r) {
              for (ea in r) {
                a.access(g, e, ea, r[ea], 1, C, b);
              }
              c = 1;
            } else {
              if (b !== d) {
                m = h === d && a.isFunction(b);
                f && (m ? (m = e, e = function(g, e, r) {
                  return m.call(a(g), r);
                }) : (e.call(g, b), e = null));
                if (e) {
                  for (;ea < fa;ea++) {
                    e(g[ea], r, m ? b.call(g[ea], ea, e(g[ea], r)) : b, h);
                  }
                }
                c = 1;
              }
            }
            return c ? g : f ? e.call(g) : fa ? e(g[0], r) : C;
          }, now:function() {
            return (new Date).getTime();
          }, uaMatch:function(g) {
            g = g.toLowerCase();
            g = I.exec(g) || J.exec(g) || D.exec(g) || 0 > g.indexOf("compatible") && S.exec(g) || [];
            return {browser:g[1] || "", version:g[2] || "0"};
          }, sub:function() {
            function g(a, e) {
              return new g.fn.init(a, e);
            }
            a.extend(!0, g, this);
            g.superclass = this;
            g.fn = g.prototype = this();
            g.fn.constructor = g;
            g.sub = this.sub;
            g.fn.init = function(r, b) {
              b && b instanceof a && !(b instanceof g) && (b = g(b));
              return a.fn.init.call(this, r, b, e);
            };
            g.fn.init.prototype = g.fn;
            var e = g(h);
            return g;
          }, browser:{}});
          a.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(g, a) {
            u["[object " + a + "]"] = a.toLowerCase();
          });
          fa = a.uaMatch(fa);
          fa.browser && (a.browser[fa.browser] = !0, a.browser.version = fa.version);
          a.browser.webkit && (a.browser.safari = !0);
          t.test("\u00a0") && (x = /^[\s\xA0]+/, n = /[\s\xA0]+$/);
          m = a(h);
          h.addEventListener ? pa = function() {
            h.removeEventListener("DOMContentLoaded", pa, !1);
            a.ready();
          } : h.attachEvent && (pa = function() {
            "complete" === h.readyState && (h.detachEvent("onreadystatechange", pa), a.ready());
          });
          return a;
        }(), B = {};
        e.Callbacks = function(g) {
          g = g ? B[g] || k(g) : {};
          var a = [], r = [], b, c, h, m, f, l, t = function(g) {
            function a(e) {
              return g.apply(this, arguments);
            }
            a.toString = function() {
              return g.toString();
            };
            return a;
          }(function(b) {
            var r, c, d, C;
            r = 0;
            for (c = b.length;r < c;r++) {
              d = b[r], C = e.type(d), "array" === C ? t(d) : "function" === C && (g.unique && n.has(d) || a.push(d));
            }
          }), x = function(e, d) {
            d = d || [];
            b = !g.memory || [e, d];
            h = c = !0;
            l = m || 0;
            m = 0;
            for (f = a.length;a && l < f;l++) {
              if (!1 === a[l].apply(e, d) && g.stopOnFalse) {
                b = !0;
                break;
              }
            }
            h = !1;
            a && (g.once ? !0 === b ? n.disable() : a = [] : r && r.length && (b = r.shift(), n.fireWith(b[0], b[1])));
          }, n = {add:function(g) {
            function a() {
              return g.apply(this, arguments);
            }
            a.toString = function() {
              return g.toString();
            };
            return a;
          }(function() {
            if (a) {
              var g = a.length;
              t(arguments);
              h ? f = a.length : b && !0 !== b && (m = g, x(b[0], b[1]));
            }
            return this;
          }), remove:function() {
            if (a) {
              for (var e = arguments, b = 0, r = e.length;b < r;b++) {
                for (var c = 0;c < a.length && (e[b] !== a[c] || (h && c <= f && (f--, c <= l && l--), a.splice(c--, 1), !g.unique));c++) {
                }
              }
            }
            return this;
          }, has:function(g) {
            if (a) {
              for (var e = 0, b = a.length;e < b;e++) {
                if (g === a[e]) {
                  return !0;
                }
              }
            }
            return !1;
          }, empty:function() {
            a = [];
            return this;
          }, disable:function() {
            a = r = b = d;
            return this;
          }, disabled:function() {
            return !a;
          }, lock:function() {
            r = d;
            b && !0 !== b || n.disable();
            return this;
          }, locked:function() {
            return !r;
          }, fireWith:function(a, e) {
            r && (h ? g.once || r.push([a, e]) : g.once && b || x(a, e));
            return this;
          }, fire:function() {
            n.fireWith(this, arguments);
            return this;
          }, fired:function(g) {
            function a() {
              return g.apply(this, arguments);
            }
            a.toString = function() {
              return g.toString();
            };
            return a;
          }(function() {
            return !!c;
          })};
          return n;
        };
        var O = [].slice;
        e.extend({Deferred:function(g) {
          var a = e.Callbacks("once memory"), b = e.Callbacks("once memory"), c = e.Callbacks("memory"), d = "pending", h = {resolve:a, reject:b, notify:c}, m = {done:a.add, fail:b.add, progress:c.add, state:function(g) {
            function a() {
              return g.apply(this, arguments);
            }
            a.toString = function() {
              return g.toString();
            };
            return a;
          }(function() {
            return d;
          }), isResolved:a.fired, isRejected:b.fired, then:function(g, a, e) {
            f.done(g).fail(a).progress(e);
            return this;
          }, always:function() {
            f.done.apply(f, arguments).fail.apply(f, arguments);
            return this;
          }, pipe:function(g, a, b) {
            return e.Deferred(function(F) {
              e.each({done:[g, "resolve"], fail:[a, "reject"], progress:[b, "notify"]}, function(g, a) {
                var b = a[0], r = a[1], c;
                if (e.isFunction(b)) {
                  f[g](function() {
                    if ((c = b.apply(this, arguments)) && e.isFunction(c.promise)) {
                      c.promise().then(F.resolve, F.reject, F.notify);
                    } else {
                      F[r + "With"](this === f ? F : this, [c]);
                    }
                  });
                } else {
                  f[g](F[r]);
                }
              });
            }).promise();
          }, promise:function(g) {
            function a(e) {
              return g.apply(this, arguments);
            }
            a.toString = function() {
              return g.toString();
            };
            return a;
          }(function(g) {
            if (null == g) {
              g = m;
            } else {
              for (var a in m) {
                g[a] = m[a];
              }
            }
            return g;
          })}, f = m.promise({}), l;
          for (l in h) {
            f[l] = h[l].fire, f[l + "With"] = h[l].fireWith;
          }
          f.done(function() {
            d = "resolved";
          }, b.disable, c.lock).fail(function() {
            d = "rejected";
          }, a.disable, c.lock);
          g && g.call(f, f);
          return f;
        }, when:function(g) {
          function a(g) {
            return function(a) {
              c[g] = 1 < arguments.length ? O.call(arguments, 0) : a;
              --f || l.resolveWith(l, c);
            };
          }
          function b(g) {
            return function(a) {
              m[g] = 1 < arguments.length ? O.call(arguments, 0) : a;
              l.notifyWith(t, m);
            };
          }
          var c = O.call(arguments, 0), d = 0, h = c.length, m = Array(h), f = h, l = 1 >= h && g && e.isFunction(g.promise) ? g : e.Deferred(), t = l.promise();
          if (1 < h) {
            for (;d < h;d++) {
              c[d] && c[d].promise && e.isFunction(c[d].promise) ? c[d].promise().then(a(d), l.reject, b(d)) : --f;
            }
            f || l.resolveWith(l, c);
          } else {
            l !== g && l.resolveWith(l, h ? [g] : []);
          }
          return t;
        }});
        e.support = function() {
          var g, a, b, d, m, f, t, x, n = h.createElement("div");
          n.setAttribute("className", "t");
          n.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
          a = n.getElementsByTagName("*");
          b = n.getElementsByTagName("a")[0];
          if (!a || !a.length || !b) {
            return {};
          }
          d = h.createElement("select");
          m = d.appendChild(h.createElement("option"));
          a = n.getElementsByTagName("input")[0];
          g = {leadingWhitespace:3 === n.firstChild.nodeType, tbody:!n.getElementsByTagName("tbody").length, htmlSerialize:!!n.getElementsByTagName("link").length, style:/top/.test(b.getAttribute("style")), hrefNormalized:"/a" === b.getAttribute("href"), opacity:/^0.55/.test(b.style.opacity), cssFloat:!!b.style.cssFloat, checkOn:"on" === a.value, optSelected:m.selected, getSetAttribute:"t" !== n.className, enctype:!!h.createElement("form").enctype, html5Clone:"<:nav></:nav>" !== h.createElement("nav").cloneNode(!0).outerHTML, 
          submitBubbles:!0, changeBubbles:!0, focusinBubbles:!1, deleteExpando:!0, noCloneEvent:!0, inlineBlockNeedsLayout:!1, shrinkWrapBlocks:!1, reliableMarginRight:!0, pixelMargin:!0};
          e.boxModel = g.boxModel = "CSS1Compat" === h.compatMode;
          a.checked = !0;
          g.noCloneChecked = a.cloneNode(!0).checked;
          d.disabled = !0;
          g.optDisabled = !m.disabled;
          try {
            delete n.test;
          } catch (A) {
            g.deleteExpando = !1;
          }
          !n.addEventListener && n.attachEvent && n.fireEvent && (n.attachEvent("onclick", function() {
            g.noCloneEvent = !1;
          }), n.cloneNode(!0).fireEvent("onclick"));
          a = h.createElement("input");
          a.value = "t";
          a.setAttribute("type", "radio");
          g.radioValue = "t" === a.value;
          a.setAttribute("checked", "checked");
          a.setAttribute("name", "t");
          n.appendChild(a);
          b = h.createDocumentFragment();
          b.appendChild(n.lastChild);
          g.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked;
          g.appendChecked = a.checked;
          b.removeChild(a);
          b.appendChild(n);
          if (n.attachEvent) {
            for (t in{submit:1, change:1, focusin:1}) {
              a = "on" + t, x = a in n, x || (n.setAttribute(a, "return;"), x = "function" === typeof n[a]), g[t + "Bubbles"] = x;
            }
          }
          b.removeChild(n);
          b = d = m = n = a = null;
          e(function() {
            var a, b, F, r, d = h.getElementsByTagName("body")[0];
            d && (a = h.createElement("div"), a.style.cssText = "padding:0;margin:0;border:0;visibility:hidden;width:0;height:0;position:static;top:0;margin-top:1px", d.insertBefore(a, d.firstChild), n = h.createElement("div"), a.appendChild(n), n.innerHTML = "<table><tr><td style='padding:0;margin:0;border:0;display:none'></td><td>t</td></tr></table>", f = n.getElementsByTagName("td"), x = 0 === f[0].offsetHeight, f[0].style.display = "", f[1].style.display = "none", g.reliableHiddenOffsets = x && 
            0 === f[0].offsetHeight, c.getComputedStyle && (n.innerHTML = "", b = h.createElement("div"), b.style.width = "0", b.style.marginRight = "0", n.style.width = "2px", n.appendChild(b), g.reliableMarginRight = 0 === (parseInt((c.getComputedStyle(b, null) || {marginRight:0}).marginRight, 10) || 0)), "undefined" !== typeof n.style.zoom && (n.innerHTML = "", n.style.width = n.style.padding = "1px", n.style.border = 0, n.style.overflow = "hidden", n.style.display = "inline", n.style.zoom = 1, 
            g.inlineBlockNeedsLayout = 3 === n.offsetWidth, n.style.display = "block", n.style.overflow = "visible", n.innerHTML = "<div style='width:5px;'></div>", g.shrinkWrapBlocks = 3 !== n.offsetWidth), n.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;padding:0;margin:0;border:0;visibility:hidden;", n.innerHTML = "<div style='position:absolute;top:0;left:0;width:1px;height:1px;padding:0;margin:0;border:5px solid #000;display:block;'><div style='padding:0;margin:0;border:0;display:block;overflow:hidden;'></div></div><table style='position:absolute;top:0;left:0;width:1px;height:1px;padding:0;margin:0;border:5px solid #000;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>", 
            b = n.firstChild, F = b.firstChild, r = b.nextSibling.firstChild.firstChild, r = {doesNotAddBorder:5 !== F.offsetTop, doesAddBorderForTableAndCells:5 === r.offsetTop}, F.style.position = "fixed", F.style.top = "20px", r.fixedPosition = 20 === F.offsetTop || 15 === F.offsetTop, F.style.position = F.style.top = "", b.style.overflow = "hidden", b.style.position = "relative", r.subtractsBorderForOverflowNotVisible = -5 === F.offsetTop, r.doesNotIncludeMarginInBodyOffset = 1 !== d.offsetTop, 
            c.getComputedStyle && (n.style.marginTop = "1%", g.pixelMargin = "1%" !== (c.getComputedStyle(n, null) || {marginTop:0}).marginTop), "undefined" !== typeof a.style.zoom && (a.style.zoom = 1), d.removeChild(a), n = null, e.extend(g, r));
          });
          return g;
        }();
        var X = /^(?:\{.*\}|\[.*\])$/, N = /([A-Z])/g;
        e.extend({cache:{}, uuid:0, expando:"jQuery" + (e.fn.jquery + Math.random()).replace(/\D/g, ""), noData:{embed:!0, object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet:!0}, hasData:function(g) {
          g = g.nodeType ? e.cache[g[e.expando]] : g[e.expando];
          return !!g && !K(g);
        }, data:function(g) {
          function a(e, b, F, c) {
            return g.apply(this, arguments);
          }
          a.toString = function() {
            return g.toString();
          };
          return a;
        }(function(g, a, b, c) {
          if (e.acceptData(g)) {
            var h;
            h = e.expando;
            var m = "string" === typeof a, f = g.nodeType, n = f ? e.cache : g, l = f ? g[h] : g[h] && h, t = "events" === a;
            if (l && n[l] && (t || c || n[l].data) || !m || b !== d) {
              l || (f ? g[h] = l = ++e.uuid : l = h);
              n[l] || (n[l] = {}, f || (n[l].toJSON = e.noop));
              if ("object" === typeof a || "function" === typeof a) {
                c ? n[l] = e.extend(n[l], a) : n[l].data = e.extend(n[l].data, a);
              }
              h = g = n[l];
              c || (g.data || (g.data = {}), g = g.data);
              b !== d && (g[e.camelCase(a)] = b);
              if (t && !g[a]) {
                return h.events;
              }
              m ? (b = g[a], null == b && (b = g[e.camelCase(a)])) : b = g;
              return b;
            }
          }
        }), removeData:function(g, a, b) {
          if (e.acceptData(g)) {
            var c, d, h, m = e.expando, f = g.nodeType, n = f ? e.cache : g, l = f ? g[m] : m;
            if (n[l]) {
              if (a && (c = b ? n[l] : n[l].data)) {
                e.isArray(a) || (a in c ? a = [a] : (a = e.camelCase(a), a = a in c ? [a] : a.split(" ")));
                d = 0;
                for (h = a.length;d < h;d++) {
                  delete c[a[d]];
                }
                if (!(b ? K : e.isEmptyObject)(c)) {
                  return;
                }
              }
              if (!b && (delete n[l].data, !K(n[l]))) {
                return;
              }
              e.support.deleteExpando || !n.setInterval ? delete n[l] : n[l] = null;
              f && (e.support.deleteExpando ? delete g[m] : g.removeAttribute ? g.removeAttribute(m) : g[m] = null);
            }
          }
        }, _data:function(g, a, b) {
          return e.data(g, a, b, !0);
        }, acceptData:function(g) {
          if (g.nodeName) {
            var a = e.noData[g.nodeName.toLowerCase()];
            if (a) {
              return !(!0 === a || g.getAttribute("classid") !== a);
            }
          }
          return !0;
        }});
        e.fn.extend({data:function(g, a) {
          var b, c, h, m, f, n = this[0], l = 0, t = null;
          if (g === d) {
            if (this.length && (t = e.data(n), 1 === n.nodeType && !e._data(n, "parsedAttrs"))) {
              h = n.attributes;
              for (f = h.length;l < f;l++) {
                m = h[l].name, 0 === m.indexOf("data-") && (m = e.camelCase(m.substring(5)), q(n, m, t[m]));
              }
              e._data(n, "parsedAttrs", !0);
            }
            return t;
          }
          if ("object" === typeof g) {
            return this.each(function() {
              e.data(this, g);
            });
          }
          b = g.split(".", 2);
          b[1] = b[1] ? "." + b[1] : "";
          c = b[1] + "!";
          return e.access(this, function(a) {
            if (a === d) {
              return t = this.triggerHandler("getData" + c, [b[0]]), t === d && n && (t = e.data(n, g), t = q(n, g, t)), t === d && b[1] ? this.data(b[0]) : t;
            }
            b[1] = a;
            this.each(function() {
              var F = e(this);
              F.triggerHandler("setData" + c, b);
              e.data(this, g, a);
              F.triggerHandler("changeData" + c, b);
            });
          }, null, a, 1 < arguments.length, null, !1);
        }, removeData:function(g) {
          return this.each(function() {
            e.removeData(this, g);
          });
        }});
        e.extend({_mark:function(g, a) {
          g && (a = (a || "fx") + "mark", e._data(g, a, (e._data(g, a) || 0) + 1));
        }, _unmark:function(g, a, b) {
          !0 !== g && (b = a, a = g, g = !1);
          if (a) {
            b = b || "fx";
            var c = b + "mark";
            (g = g ? 0 : (e._data(a, c) || 1) - 1) ? e._data(a, c, g) : (e.removeData(a, c, !0), U(a, b, "mark"));
          }
        }, queue:function(g, a, b) {
          var c;
          if (g) {
            return a = (a || "fx") + "queue", c = e._data(g, a), b && (!c || e.isArray(b) ? c = e._data(g, a, e.makeArray(b)) : c.push(b)), c || [];
          }
        }, dequeue:function(g, a) {
          a = a || "fx";
          var b = e.queue(g, a), c = b.shift(), d = {};
          "inprogress" === c && (c = b.shift());
          c && ("fx" === a && b.unshift("inprogress"), e._data(g, a + ".run", d), c.call(g, function() {
            e.dequeue(g, a);
          }, d));
          b.length || (e.removeData(g, a + "queue " + a + ".run", !0), U(g, a, "queue"));
        }});
        e.fn.extend({queue:function(g, a) {
          var b = 2;
          "string" !== typeof g && (a = g, g = "fx", b--);
          return arguments.length < b ? e.queue(this[0], g) : a === d ? this : this.each(function() {
            var b = e.queue(this, g, a);
            "fx" === g && "inprogress" !== b[0] && e.dequeue(this, g);
          });
        }, dequeue:function(g) {
          return this.each(function() {
            e.dequeue(this, g);
          });
        }, delay:function(g, a) {
          g = e.fx ? e.fx.speeds[g] || g : g;
          return this.queue(a || "fx", function(a, e) {
            var b = setTimeout(a, g);
            e.stop = function() {
              clearTimeout(b);
            };
          });
        }, clearQueue:function(g) {
          return this.queue(g || "fx", []);
        }, promise:function(g, a) {
          function b() {
            --f || c.resolveWith(h, [h]);
          }
          "string" !== typeof g && (a = g, g = d);
          g = g || "fx";
          for (var c = e.Deferred(), h = this, m = h.length, f = 1, n = g + "defer", l = g + "queue", t = g + "mark", x;m--;) {
            if (x = e.data(h[m], n, d, !0) || (e.data(h[m], l, d, !0) || e.data(h[m], t, d, !0)) && e.data(h[m], n, e.Callbacks("once memory"), !0)) {
              f++, x.add(b);
            }
          }
          b();
          return c.promise(a);
        }});
        var H = /[\n\t\r]/g, L = /\s+/, Y = /\r/g, fb = /^(?:button|input)$/i, gb = /^(?:button|input|object|select|textarea)$/i, P = /^a(?:rea)?$/i, Z = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Ja = e.support.getSetAttribute, ga, ua, ha;
        e.fn.extend({attr:function(g, a) {
          return e.access(this, e.attr, g, a, 1 < arguments.length);
        }, removeAttr:function(g) {
          return this.each(function() {
            e.removeAttr(this, g);
          });
        }, prop:function(g, a) {
          return e.access(this, e.prop, g, a, 1 < arguments.length);
        }, removeProp:function(g) {
          g = e.propFix[g] || g;
          return this.each(function() {
            try {
              this[g] = d, delete this[g];
            } catch (a) {
            }
          });
        }, addClass:function(g) {
          var a, b, c, d, h, m, f;
          if (e.isFunction(g)) {
            return this.each(function(a) {
              e(this).addClass(g.call(this, a, this.className));
            });
          }
          if (g && "string" === typeof g) {
            for (a = g.split(L), b = 0, c = this.length;b < c;b++) {
              if (d = this[b], 1 === d.nodeType) {
                if (d.className || 1 !== a.length) {
                  h = " " + d.className + " ";
                  m = 0;
                  for (f = a.length;m < f;m++) {
                    ~h.indexOf(" " + a[m] + " ") || (h += a[m] + " ");
                  }
                  d.className = e.trim(h);
                } else {
                  d.className = g;
                }
              }
            }
          }
          return this;
        }, removeClass:function(g) {
          var a, b, c, h, m, f, n;
          if (e.isFunction(g)) {
            return this.each(function(a) {
              e(this).removeClass(g.call(this, a, this.className));
            });
          }
          if (g && "string" === typeof g || g === d) {
            for (a = (g || "").split(L), b = 0, c = this.length;b < c;b++) {
              if (h = this[b], 1 === h.nodeType && h.className) {
                if (g) {
                  m = (" " + h.className + " ").replace(H, " ");
                  f = 0;
                  for (n = a.length;f < n;f++) {
                    m = m.replace(" " + a[f] + " ", " ");
                  }
                  h.className = e.trim(m);
                } else {
                  h.className = "";
                }
              }
            }
          }
          return this;
        }, toggleClass:function(g, a) {
          var b = typeof g, c = "boolean" === typeof a;
          return e.isFunction(g) ? this.each(function(b) {
            e(this).toggleClass(g.call(this, b, this.className, a), a);
          }) : this.each(function() {
            if ("string" === b) {
              for (var d, h = 0, m = e(this), f = a, n = g.split(L);d = n[h++];) {
                f = c ? f : !m.hasClass(d), m[f ? "addClass" : "removeClass"](d);
              }
            } else {
              if ("undefined" === b || "boolean" === b) {
                this.className && e._data(this, "__className__", this.className), this.className = this.className || !1 === g ? "" : e._data(this, "__className__") || "";
              }
            }
          });
        }, hasClass:function(g) {
          g = " " + g + " ";
          for (var a = 0, e = this.length;a < e;a++) {
            if (1 === this[a].nodeType && -1 < (" " + this[a].className + " ").replace(H, " ").indexOf(g)) {
              return !0;
            }
          }
          return !1;
        }, val:function(g) {
          var a, b, c, h = this[0];
          if (arguments.length) {
            return c = e.isFunction(g), this.each(function(b) {
              var r = e(this);
              1 === this.nodeType && (b = c ? g.call(this, b, r.val()) : g, null == b ? b = "" : "number" === typeof b ? b += "" : e.isArray(b) && (b = e.map(b, function(g) {
                return null == g ? "" : g + "";
              })), a = e.valHooks[this.type] || e.valHooks[this.nodeName.toLowerCase()], a && "set" in a && a.set(this, b, "value") !== d || (this.value = b));
            });
          }
          if (h) {
            if ((a = e.valHooks[h.type] || e.valHooks[h.nodeName.toLowerCase()]) && "get" in a && (b = a.get(h, "value")) !== d) {
              return b;
            }
            b = h.value;
            return "string" === typeof b ? b.replace(Y, "") : null == b ? "" : b;
          }
        }});
        e.extend({valHooks:{option:{get:function(g) {
          var a = g.attributes.value;
          return !a || a.specified ? g.value : g.text;
        }}, select:{get:function(g) {
          var a, b, c = g.selectedIndex, d = [], h = g.options, m = "select-one" === g.type;
          if (0 > c) {
            return null;
          }
          g = m ? c : 0;
          for (b = m ? c + 1 : h.length;g < b;g++) {
            if (a = h[g], !(!a.selected || (e.support.optDisabled ? a.disabled : null !== a.getAttribute("disabled")) || a.parentNode.disabled && e.nodeName(a.parentNode, "optgroup"))) {
              a = e(a).val();
              if (m) {
                return a;
              }
              d.push(a);
            }
          }
          return m && !d.length && h.length ? e(h[c]).val() : d;
        }, set:function(g, a) {
          var b = e.makeArray(a);
          e(g).find("option").each(function() {
            this.selected = 0 <= e.inArray(e(this).val(), b);
          });
          b.length || (g.selectedIndex = -1);
          return b;
        }}}, attrFn:{val:!0, css:!0, html:!0, text:!0, data:!0, width:!0, height:!0, offset:!0}, attr:function(g, a, b, c) {
          var h, m, f = g.nodeType;
          if (g && 3 !== f && 8 !== f && 2 !== f) {
            if (c && a in e.attrFn) {
              return e(g)[a](b);
            }
            if ("undefined" === typeof g.getAttribute) {
              return e.prop(g, a, b);
            }
            if (c = 1 !== f || !e.isXMLDoc(g)) {
              a = a.toLowerCase(), m = e.attrHooks[a] || (Z.test(a) ? ua : ga);
            }
            if (b !== d) {
              if (null === b) {
                e.removeAttr(g, a);
              } else {
                if (m && "set" in m && c && (h = m.set(g, b, a)) !== d) {
                  return h;
                }
                g.setAttribute(a, "" + b);
                return b;
              }
            } else {
              if (m && "get" in m && c && null !== (h = m.get(g, a))) {
                return h;
              }
              h = g.getAttribute(a);
              return null === h ? d : h;
            }
          }
        }, removeAttr:function(g, a) {
          var b, c, d, h, m, f = 0;
          if (a && 1 === g.nodeType) {
            for (c = a.toLowerCase().split(L), h = c.length;f < h;f++) {
              if (d = c[f]) {
                b = e.propFix[d] || d, (m = Z.test(d)) || e.attr(g, d, ""), g.removeAttribute(Ja ? d : b), m && b in g && (g[b] = !1);
              }
            }
          }
        }, attrHooks:{type:{set:function(g, a) {
          if (fb.test(g.nodeName) && g.parentNode) {
            e.error("type property can't be changed");
          } else {
            if (!e.support.radioValue && "radio" === a && e.nodeName(g, "input")) {
              var b = g.value;
              g.setAttribute("type", a);
              b && (g.value = b);
              return a;
            }
          }
        }}, value:{get:function(g, a) {
          return ga && e.nodeName(g, "button") ? ga.get(g, a) : a in g ? g.value : null;
        }, set:function(g, a, b) {
          if (ga && e.nodeName(g, "button")) {
            return ga.set(g, a, b);
          }
          g.value = a;
        }}}, propFix:{tabindex:"tabIndex", readonly:"readOnly", "for":"htmlFor", "class":"className", maxlength:"maxLength", cellspacing:"cellSpacing", cellpadding:"cellPadding", rowspan:"rowSpan", colspan:"colSpan", usemap:"useMap", frameborder:"frameBorder", contenteditable:"contentEditable"}, prop:function(g, a, b) {
          var c, h, m;
          m = g.nodeType;
          if (g && 3 !== m && 8 !== m && 2 !== m) {
            if (m = 1 !== m || !e.isXMLDoc(g)) {
              a = e.propFix[a] || a, h = e.propHooks[a];
            }
            return b !== d ? h && "set" in h && (c = h.set(g, b, a)) !== d ? c : g[a] = b : h && "get" in h && null !== (c = h.get(g, a)) ? c : g[a];
          }
        }, propHooks:{tabIndex:{get:function(g) {
          var a = g.getAttributeNode("tabindex");
          return a && a.specified ? parseInt(a.value, 10) : gb.test(g.nodeName) || P.test(g.nodeName) && g.href ? 0 : d;
        }}}});
        e.attrHooks.tabindex = e.propHooks.tabIndex;
        ua = {get:function(g, a) {
          var b, c = e.prop(g, a);
          return !0 === c || "boolean" !== typeof c && (b = g.getAttributeNode(a)) && !1 !== b.nodeValue ? a.toLowerCase() : d;
        }, set:function(g, a, b) {
          !1 === a ? e.removeAttr(g, b) : (a = e.propFix[b] || b, a in g && (g[a] = !0), g.setAttribute(b, b.toLowerCase()));
          return b;
        }};
        Ja || (ha = {name:!0, id:!0, coords:!0}, ga = e.valHooks.button = {get:function(g, a) {
          var e;
          return (e = g.getAttributeNode(a)) && (ha[a] ? "" !== e.nodeValue : e.specified) ? e.nodeValue : d;
        }, set:function(g, a, e) {
          var b = g.getAttributeNode(e);
          b || (b = h.createAttribute(e), g.setAttributeNode(b));
          return b.nodeValue = a + "";
        }}, e.attrHooks.tabindex.set = ga.set, e.each(["width", "height"], function(g, a) {
          e.attrHooks[a] = e.extend(e.attrHooks[a], {set:function(g, e) {
            if ("" === e) {
              return g.setAttribute(a, "auto"), e;
            }
          }});
        }), e.attrHooks.contenteditable = {get:ga.get, set:function(g, a, e) {
          "" === a && (a = "false");
          ga.set(g, a, e);
        }});
        e.support.hrefNormalized || e.each(["href", "src", "width", "height"], function(g, a) {
          e.attrHooks[a] = e.extend(e.attrHooks[a], {get:function(g) {
            g = g.getAttribute(a, 2);
            return null === g ? d : g;
          }});
        });
        e.support.style || (e.attrHooks.style = {get:function(g) {
          return g.style.cssText.toLowerCase() || d;
        }, set:function(g, a) {
          return g.style.cssText = "" + a;
        }});
        e.support.optSelected || (e.propHooks.selected = e.extend(e.propHooks.selected, {get:function(g) {
          if (g = g.parentNode) {
            g.selectedIndex, g.parentNode && g.parentNode.selectedIndex;
          }
          return null;
        }}));
        e.support.enctype || (e.propFix.enctype = "encoding");
        e.support.checkOn || e.each(["radio", "checkbox"], function() {
          e.valHooks[this] = {get:function(g) {
            return null === g.getAttribute("value") ? "on" : g.value;
          }};
        });
        e.each(["radio", "checkbox"], function() {
          e.valHooks[this] = e.extend(e.valHooks[this], {set:function(g, a) {
            if (e.isArray(a)) {
              return g.checked = 0 <= e.inArray(e(g).val(), a);
            }
          }});
        });
        var Ca = /^(?:textarea|input|select)$/i, Ka = /^([^\.]*)?(?:\.(.+))?$/, hb = /(?:^|\s)hover(\.\S+)?\b/, ib = /^key/, jb = /^(?:mouse|contextmenu)|click/, La = /^(?:focusinfocus|focusoutblur)$/, kb = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, lb = function(g) {
          if (g = kb.exec(g)) {
            g[1] = (g[1] || "").toLowerCase(), g[3] = g[3] && new RegExp("(?:^|\\s)" + g[3] + "(?:\\s|$)");
          }
          return g;
        }, Ma = function(g) {
          return e.event.special.hover ? g : g.replace(hb, "mouseenter$1 mouseleave$1");
        };
        e.event = {add:function(g, a, b, c, h) {
          var m, f, n, l, t, x, A, k, v;
          if (3 !== g.nodeType && 8 !== g.nodeType && a && b && (m = e._data(g))) {
            b.handler && (A = b, b = A.handler, h = A.selector);
            b.guid || (b.guid = e.guid++);
            n = m.events;
            n || (m.events = n = {});
            f = m.handle;
            f || (m.handle = f = function(g) {
              return "undefined" === typeof e || g && e.event.triggered === g.type ? d : e.event.dispatch.apply(f.elem, arguments);
            }, f.elem = g);
            a = e.trim(Ma(a)).split(" ");
            for (m = 0;m < a.length;m++) {
              l = Ka.exec(a[m]) || [], t = l[1], x = (l[2] || "").split(".").sort(), v = e.event.special[t] || {}, t = (h ? v.delegateType : v.bindType) || t, v = e.event.special[t] || {}, l = e.extend({type:t, origType:l[1], data:c, handler:b, guid:b.guid, selector:h, quick:h && lb(h), namespace:x.join(".")}, A), k = n[t], k || (k = n[t] = [], k.delegateCount = 0, v.setup && !1 !== v.setup.call(g, c, x, f) || (g.addEventListener ? g.addEventListener(t, f, !1) : g.attachEvent && g.attachEvent("on" + 
              t, f))), v.add && (v.add.call(g, l), l.handler.guid || (l.handler.guid = b.guid)), h ? k.splice(k.delegateCount++, 0, l) : k.push(l), e.event.global[t] = !0;
            }
            g = null;
          }
        }, global:{}, remove:function(g, a, b, c, d) {
          var h = e.hasData(g) && e._data(g), m, f, n, l, t, x, A, v, k, y;
          if (h && (A = h.events)) {
            a = e.trim(Ma(a || "")).split(" ");
            for (m = 0;m < a.length;m++) {
              if (f = Ka.exec(a[m]) || [], n = l = f[1], f = f[2], n) {
                v = e.event.special[n] || {};
                n = (c ? v.delegateType : v.bindType) || n;
                k = A[n] || [];
                t = k.length;
                f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (x = 0;x < k.length;x++) {
                  y = k[x], !d && l !== y.origType || b && b.guid !== y.guid || f && !f.test(y.namespace) || c && c !== y.selector && ("**" !== c || !y.selector) || (k.splice(x--, 1), y.selector && k.delegateCount--, v.remove && v.remove.call(g, y));
                }
                0 === k.length && t !== k.length && (v.teardown && !1 !== v.teardown.call(g, f) || e.removeEvent(g, n, h.handle), delete A[n]);
              } else {
                for (n in A) {
                  e.event.remove(g, n + a[m], b, c, !0);
                }
              }
            }
            if (e.isEmptyObject(A)) {
              if (a = h.handle) {
                a.elem = null;
              }
              e.removeData(g, ["events", "handle"], !0);
            }
          }
        }, customEvent:{getData:!0, setData:!0, changeData:!0}, trigger:function(g, a, b, h) {
          if (!b || 3 !== b.nodeType && 8 !== b.nodeType) {
            var m = g.type || g, f = [], n, t, x, A, k;
            if (!La.test(m + e.event.triggered) && (0 <= m.indexOf("!") && (m = m.slice(0, -1), n = !0), 0 <= m.indexOf(".") && (f = m.split("."), m = f.shift(), f.sort()), b && !e.event.customEvent[m] || e.event.global[m])) {
              if (g = "object" === typeof g ? g[e.expando] ? g : new e.Event(m, g) : new e.Event(m), g.type = m, g.isTrigger = !0, g.exclusive = n, g.namespace = f.join("."), g.namespace_re = g.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, n = 0 > m.indexOf(":") ? "on" + m : "", b) {
                if (g.result = d, g.target || (g.target = b), a = null != a ? e.makeArray(a) : [], a.unshift(g), x = e.event.special[m] || {}, !x.trigger || !1 !== x.trigger.apply(b, a)) {
                  k = [[b, x.bindType || m]];
                  if (!h && !x.noBubble && !e.isWindow(b)) {
                    A = x.delegateType || m;
                    f = La.test(A + m) ? b : b.parentNode;
                    for (t = null;f;f = f.parentNode) {
                      k.push([f, A]), t = f;
                    }
                    t && t === b.ownerDocument && k.push([t.defaultView || t.parentWindow || c, A]);
                  }
                  for (t = 0;t < k.length && !g.isPropagationStopped();t++) {
                    f = k[t][0], g.type = k[t][1], (A = (e._data(f, "events") || {})[g.type] && e._data(f, "handle")) && A.apply(f, a), (A = n && f[n]) && e.acceptData(f) && !1 === A.apply(f, a) && g.preventDefault();
                  }
                  g.type = m;
                  h || g.isDefaultPrevented() || x._default && !1 !== x._default.apply(b.ownerDocument, a) || "click" === m && e.nodeName(b, "a") || !e.acceptData(b) || !n || !b[m] || ("focus" === m || "blur" === m) && 0 === g.target.offsetWidth || e.isWindow(b) || ((t = b[n]) && (b[n] = null), e.event.triggered = m, b[m](), e.event.triggered = d, t && (b[n] = t));
                  return g.result;
                }
              } else {
                for (t in b = e.cache, b) {
                  b[t].events && b[t].events[m] && e.event.trigger(g, a, b[t].handle.elem, !0);
                }
              }
            }
          }
        }, dispatch:function(g) {
          g = e.event.fix(g || c.event);
          var a = (e._data(this, "events") || {})[g.type] || [], b = a.delegateCount, h = [].slice.call(arguments, 0), m = !g.exclusive && !g.namespace, f = e.event.special[g.type] || {}, n = [], t, x, A, k, v, y, w;
          h[0] = g;
          g.delegateTarget = this;
          if (!f.preDispatch || !1 !== f.preDispatch.call(this, g)) {
            if (b && (!g.button || "click" !== g.type)) {
              for (A = e(this), A.context = this.ownerDocument || this, x = g.target;x != this;x = x.parentNode || this) {
                if (!0 !== x.disabled) {
                  v = {};
                  y = [];
                  A[0] = x;
                  for (t = 0;t < b;t++) {
                    k = a[t];
                    w = k.selector;
                    if (v[w] === d) {
                      var R = v, I = w, J;
                      if (k.quick) {
                        J = k.quick;
                        var D = x.attributes || {};
                        J = (!J[1] || x.nodeName.toLowerCase() === J[1]) && (!J[2] || (D.id || {}).value === J[2]) && (!J[3] || J[3].test((D["class"] || {}).value));
                      } else {
                        J = A.is(w);
                      }
                      R[I] = J;
                    }
                    v[w] && y.push(k);
                  }
                  y.length && n.push({elem:x, matches:y});
                }
              }
            }
            a.length > b && n.push({elem:this, matches:a.slice(b)});
            for (t = 0;t < n.length && !g.isPropagationStopped();t++) {
              for (b = n[t], g.currentTarget = b.elem, a = 0;a < b.matches.length && !g.isImmediatePropagationStopped();a++) {
                if (k = b.matches[a], m || !g.namespace && !k.namespace || g.namespace_re && g.namespace_re.test(k.namespace)) {
                  g.data = k.data, g.handleObj = k, k = ((e.event.special[k.origType] || {}).handle || k.handler).apply(b.elem, h), k !== d && (g.result = k, !1 === k && (g.preventDefault(), g.stopPropagation()));
                }
              }
            }
            f.postDispatch && f.postDispatch.call(this, g);
            return g.result;
          }
        }, props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks:{}, keyHooks:{props:["char", "charCode", "key", "keyCode"], filter:function(g, a) {
          null == g.which && (g.which = null != a.charCode ? a.charCode : a.keyCode);
          return g;
        }}, mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter:function(g, a) {
          var e, b, c = a.button, m = a.fromElement;
          null == g.pageX && null != a.clientX && (e = g.target.ownerDocument || h, b = e.documentElement, e = e.body, g.pageX = a.clientX + (b && b.scrollLeft || e && e.scrollLeft || 0) - (b && b.clientLeft || e && e.clientLeft || 0), g.pageY = a.clientY + (b && b.scrollTop || e && e.scrollTop || 0) - (b && b.clientTop || e && e.clientTop || 0));
          !g.relatedTarget && m && (g.relatedTarget = m === g.target ? a.toElement : m);
          g.which || c === d || (g.which = c & 1 ? 1 : c & 2 ? 3 : c & 4 ? 2 : 0);
          return g;
        }}, fix:function(g) {
          if (g[e.expando]) {
            return g;
          }
          var a, b, c = g, m = e.event.fixHooks[g.type] || {}, f = m.props ? this.props.concat(m.props) : this.props;
          g = e.Event(c);
          for (a = f.length;a;) {
            b = f[--a], g[b] = c[b];
          }
          g.target || (g.target = c.srcElement || h);
          3 === g.target.nodeType && (g.target = g.target.parentNode);
          g.metaKey === d && (g.metaKey = g.ctrlKey);
          return m.filter ? m.filter(g, c) : g;
        }, special:{ready:{setup:e.bindReady}, load:{noBubble:!0}, focus:{delegateType:"focusin"}, blur:{delegateType:"focusout"}, beforeunload:{setup:function(g, a, b) {
          e.isWindow(this) && (this.onbeforeunload = b);
        }, teardown:function(g, a) {
          this.onbeforeunload === a && (this.onbeforeunload = null);
        }}}, simulate:function(g, a, b, c) {
          g = e.extend(new e.Event, b, {type:g, isSimulated:!0, originalEvent:{}});
          c ? e.event.trigger(g, null, a) : e.event.dispatch.call(a, g);
          g.isDefaultPrevented() && b.preventDefault();
        }};
        e.event.handle = e.event.dispatch;
        e.removeEvent = h.removeEventListener ? function(a, e, b) {
          a.removeEventListener && a.removeEventListener(e, b, !1);
        } : function(a, e, b) {
          a.detachEvent && a.detachEvent("on" + e, b);
        };
        e.Event = function(a, b) {
          if (!(this instanceof e.Event)) {
            return new e.Event(a, b);
          }
          a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? M : E) : this.type = a;
          b && e.extend(this, b);
          this.timeStamp = a && a.timeStamp || e.now();
          this[e.expando] = !0;
        };
        e.Event.prototype = {preventDefault:function() {
          this.isDefaultPrevented = M;
          var a = this.originalEvent;
          a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
        }, stopPropagation:function() {
          this.isPropagationStopped = M;
          var a = this.originalEvent;
          a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
        }, stopImmediatePropagation:function() {
          this.isImmediatePropagationStopped = M;
          this.stopPropagation();
        }, isDefaultPrevented:E, isPropagationStopped:E, isImmediatePropagationStopped:E};
        e.each({mouseenter:"mouseover", mouseleave:"mouseout"}, function(a, b) {
          e.event.special[a] = {delegateType:b, bindType:b, handle:function(a) {
            var g = a.relatedTarget, c = a.handleObj, d;
            if (!g || g !== this && !e.contains(this, g)) {
              a.type = c.origType, d = c.handler.apply(this, arguments), a.type = b;
            }
            return d;
          }};
        });
        e.support.submitBubbles || (e.event.special.submit = {setup:function() {
          if (e.nodeName(this, "form")) {
            return !1;
          }
          e.event.add(this, "click._submit keypress._submit", function(a) {
            a = a.target;
            (a = e.nodeName(a, "input") || e.nodeName(a, "button") ? a.form : d) && !a._submit_attached && (e.event.add(a, "submit._submit", function(a) {
              a._submit_bubble = !0;
            }), a._submit_attached = !0);
          });
        }, postDispatch:function(a) {
          a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && e.event.simulate("submit", this.parentNode, a, !0));
        }, teardown:function() {
          if (e.nodeName(this, "form")) {
            return !1;
          }
          e.event.remove(this, "._submit");
        }});
        e.support.changeBubbles || (e.event.special.change = {setup:function() {
          if (Ca.test(this.nodeName)) {
            if ("checkbox" === this.type || "radio" === this.type) {
              e.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0);
              }), e.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1, e.event.simulate("change", this, a, !0));
              });
            }
            return !1;
          }
          e.event.add(this, "beforeactivate._change", function(a) {
            a = a.target;
            Ca.test(a.nodeName) && !a._change_attached && (e.event.add(a, "change._change", function(a) {
              !this.parentNode || a.isSimulated || a.isTrigger || e.event.simulate("change", this.parentNode, a, !0);
            }), a._change_attached = !0);
          });
        }, handle:function(a) {
          var e = a.target;
          if (this !== e || a.isSimulated || a.isTrigger || "radio" !== e.type && "checkbox" !== e.type) {
            return a.handleObj.handler.apply(this, arguments);
          }
        }, teardown:function() {
          e.event.remove(this, "._change");
          return Ca.test(this.nodeName);
        }});
        e.support.focusinBubbles || e.each({focus:"focusin", blur:"focusout"}, function(a, b) {
          var c = 0, d = function(a) {
            e.event.simulate(b, a.target, e.event.fix(a), !0);
          };
          e.event.special[b] = {setup:function() {
            0 === c++ && h.addEventListener(a, d, !0);
          }, teardown:function() {
            0 === --c && h.removeEventListener(a, d, !0);
          }};
        });
        e.fn.extend({on:function(a, b, c, h, m) {
          var f, n;
          if ("object" === typeof a) {
            "string" !== typeof b && (c = c || b, b = d);
            for (n in a) {
              this.on(n, b, c, a[n], m);
            }
            return this;
          }
          null == c && null == h ? (h = b, c = b = d) : null == h && ("string" === typeof b ? (h = c, c = d) : (h = c, c = b, b = d));
          if (!1 === h) {
            h = E;
          } else {
            if (!h) {
              return this;
            }
          }
          1 === m && (f = h, h = function(a) {
            e().off(a);
            return f.apply(this, arguments);
          }, h.guid = f.guid || (f.guid = e.guid++));
          return this.each(function() {
            e.event.add(this, a, h, c, b);
          });
        }, one:function(a, e, b, c) {
          return this.on(a, e, b, c, 1);
        }, off:function(a, b, c) {
          if (a && a.preventDefault && a.handleObj) {
            var h = a.handleObj;
            e(a.delegateTarget).off(h.namespace ? h.origType + "." + h.namespace : h.origType, h.selector, h.handler);
            return this;
          }
          if ("object" === typeof a) {
            for (h in a) {
              this.off(h, b, a[h]);
            }
            return this;
          }
          if (!1 === b || "function" === typeof b) {
            c = b, b = d;
          }
          !1 === c && (c = E);
          return this.each(function() {
            e.event.remove(this, a, c, b);
          });
        }, bind:function(a, e, b) {
          return this.on(a, null, e, b);
        }, unbind:function(a, e) {
          return this.off(a, null, e);
        }, live:function(a, b, c) {
          e(this.context).on(a, this.selector, b, c);
          return this;
        }, die:function(a, b) {
          e(this.context).off(a, this.selector || "**", b);
          return this;
        }, delegate:function(a, e, b, c) {
          return this.on(e, a, b, c);
        }, undelegate:function(a, e, b) {
          return 1 == arguments.length ? this.off(a, "**") : this.off(e, a, b);
        }, trigger:function(a, b) {
          return this.each(function() {
            e.event.trigger(a, b, this);
          });
        }, triggerHandler:function(a, b) {
          if (this[0]) {
            return e.event.trigger(a, b, this[0], !0);
          }
        }, toggle:function(a) {
          var b = arguments, c = a.guid || e.guid++, h = 0, d = function(c) {
            var d = (e._data(this, "lastToggle" + a.guid) || 0) % h;
            e._data(this, "lastToggle" + a.guid, d + 1);
            c.preventDefault();
            return b[d].apply(this, arguments) || !1;
          };
          for (d.guid = c;h < b.length;) {
            b[h++].guid = c;
          }
          return this.click(d);
        }, hover:function(a, e) {
          return this.mouseenter(a).mouseleave(e || a);
        }});
        e.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
          e.fn[b] = function(a, g) {
            null == g && (g = a, a = null);
            return 0 < arguments.length ? this.on(b, null, a, g) : this.trigger(b);
          };
          e.attrFn && (e.attrFn[b] = !0);
          ib.test(b) && (e.event.fixHooks[b] = e.event.keyHooks);
          jb.test(b) && (e.event.fixHooks[b] = e.event.mouseHooks);
        });
        (function() {
          function a(g, e, b, c, h, d) {
            h = 0;
            for (var f = c.length;h < f;h++) {
              var r = c[h];
              if (r) {
                for (var n = !1, r = r[g];r;) {
                  if (r[m] === b) {
                    n = c[r.sizset];
                    break;
                  }
                  1 !== r.nodeType || d || (r[m] = b, r.sizset = h);
                  if (r.nodeName.toLowerCase() === e) {
                    n = r;
                    break;
                  }
                  r = r[g];
                }
                c[h] = n;
              }
            }
          }
          function b(a, g, e, c, h, d) {
            h = 0;
            for (var f = c.length;h < f;h++) {
              var r = c[h];
              if (r) {
                for (var n = !1, r = r[a];r;) {
                  if (r[m] === e) {
                    n = c[r.sizset];
                    break;
                  }
                  if (1 === r.nodeType) {
                    if (d || (r[m] = e, r.sizset = h), "string" !== typeof g) {
                      if (r === g) {
                        n = !0;
                        break;
                      }
                    } else {
                      if (0 < v.filter(g, [r]).length) {
                        n = r;
                        break;
                      }
                    }
                  }
                  r = r[a];
                }
                c[h] = n;
              }
            }
          }
          var c = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, m = "sizcache" + (Math.random() + "").replace(".", ""), f = 0, n = Object.prototype.toString, l = !1, t = !0, x = /\\/g, k = /\r\n/g, A = /\W/;
          [0, 0].sort(function() {
            t = !1;
            return 0;
          });
          var v = function(a) {
            function g(e, b, c, h) {
              return a.apply(this, arguments);
            }
            g.toString = function() {
              return a.toString();
            };
            return g;
          }(function(a, g, e, b) {
            e = e || [];
            var d = g = g || h;
            if (1 !== g.nodeType && 9 !== g.nodeType) {
              return [];
            }
            if (!a || "string" !== typeof a) {
              return e;
            }
            var m, f, l, t, F, x = !0, C = v.isXML(g), k = [], A = a;
            do {
              if (c.exec(""), m = c.exec(A)) {
                if (A = m[3], k.push(m[1]), m[2]) {
                  t = m[3];
                  break;
                }
              }
            } while (m);
            if (1 < k.length && R.exec(a)) {
              if (2 === k.length && w.relative[k[0]]) {
                f = B(k[0] + k[1], g, b);
              } else {
                for (f = w.relative[k[0]] ? [g] : v(k.shift(), g);k.length;) {
                  a = k.shift(), w.relative[a] && (a += k.shift()), f = B(a, f, b);
                }
              }
            } else {
              if (!b && 1 < k.length && 9 === g.nodeType && !C && w.match.ID.test(k[0]) && !w.match.ID.test(k[k.length - 1]) && (m = v.find(k.shift(), g, C), g = m.expr ? v.filter(m.expr, m.set)[0] : m.set[0]), g) {
                for (m = b ? {expr:k.pop(), set:D(b)} : v.find(k.pop(), 1 !== k.length || "~" !== k[0] && "+" !== k[0] || !g.parentNode ? g : g.parentNode, C), f = m.expr ? v.filter(m.expr, m.set) : m.set, 0 < k.length ? l = D(f) : x = !1;k.length;) {
                  m = F = k.pop(), w.relative[F] ? m = k.pop() : F = "", null == m && (m = g), w.relative[F](l, m, C);
                }
              } else {
                l = [];
              }
            }
            l || (l = f);
            l || v.error(F || a);
            if ("[object Array]" === n.call(l)) {
              if (x) {
                if (g && 1 === g.nodeType) {
                  for (a = 0;null != l[a];a++) {
                    l[a] && (!0 === l[a] || 1 === l[a].nodeType && v.contains(g, l[a])) && e.push(f[a]);
                  }
                } else {
                  for (a = 0;null != l[a];a++) {
                    l[a] && 1 === l[a].nodeType && e.push(f[a]);
                  }
                }
              } else {
                e.push.apply(e, l);
              }
            } else {
              D(l, e);
            }
            t && (v(t, d, e, b), v.uniqueSort(e));
            return e;
          });
          v.uniqueSort = function(a) {
            if (S && (l = t, a.sort(S), l)) {
              for (var g = 1;g < a.length;g++) {
                a[g] === a[g - 1] && a.splice(g--, 1);
              }
            }
            return a;
          };
          v.matches = function(a, g) {
            return v(a, null, null, g);
          };
          v.matchesSelector = function(a, g) {
            return 0 < v(g, null, null, [a]).length;
          };
          v.find = function(a, g, e) {
            var b, c, h, d, m, f;
            if (!a) {
              return [];
            }
            c = 0;
            for (h = w.order.length;c < h;c++) {
              if (m = w.order[c], d = w.leftMatch[m].exec(a)) {
                if (f = d[1], d.splice(1, 1), "\\" !== f.substr(f.length - 1) && (d[1] = (d[1] || "").replace(x, ""), b = w.find[m](d, g, e), null != b)) {
                  a = a.replace(w.match[m], "");
                  break;
                }
              }
            }
            b || (b = "undefined" !== typeof g.getElementsByTagName ? g.getElementsByTagName("*") : []);
            return {set:b, expr:a};
          };
          v.filter = function(a, g, e, b) {
            for (var c, h, m, f, r, n, l, t, F = a, x = [], C = g, k = g && g[0] && v.isXML(g[0]);a && g.length;) {
              for (m in w.filter) {
                if (null != (c = w.leftMatch[m].exec(a)) && c[2] && (n = w.filter[m], r = c[1], h = !1, c.splice(1, 1), "\\" !== r.substr(r.length - 1))) {
                  C === x && (x = []);
                  if (w.preFilter[m]) {
                    if (c = w.preFilter[m](c, C, e, x, b, k), !c) {
                      h = f = !0;
                    } else {
                      if (!0 === c) {
                        continue;
                      }
                    }
                  }
                  if (c) {
                    for (l = 0;null != (r = C[l]);l++) {
                      r && (f = n(r, c, l, C), t = b ^ f, e && null != f ? t ? h = !0 : C[l] = !1 : t && (x.push(r), h = !0));
                    }
                  }
                  if (f !== d) {
                    e || (C = x);
                    a = a.replace(w.match[m], "");
                    if (!h) {
                      return [];
                    }
                    break;
                  }
                }
              }
              if (a === F) {
                if (null == h) {
                  v.error(a);
                } else {
                  break;
                }
              }
              F = a;
            }
            return C;
          };
          v.error = function(a) {
            throw Error("Syntax error, unrecognized expression: " + a);
          };
          var y = v.getText = function(a) {
            var g, e;
            g = a.nodeType;
            var b = "";
            if (g) {
              if (1 === g || 9 === g || 11 === g) {
                if ("string" === typeof a.textContent) {
                  return a.textContent;
                }
                if ("string" === typeof a.innerText) {
                  return a.innerText.replace(k, "");
                }
                for (a = a.firstChild;a;a = a.nextSibling) {
                  b += y(a);
                }
              } else {
                if (3 === g || 4 === g) {
                  return a.nodeValue;
                }
              }
            } else {
              for (g = 0;e = a[g];g++) {
                8 !== e.nodeType && (b += y(e));
              }
            }
            return b;
          }, w = v.selectors = {order:["ID", "NAME", "TAG"], match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/, TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, 
          PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, leftMatch:{}, attrMap:{"class":"className", "for":"htmlFor"}, attrHandle:{href:function(a) {
            return a.getAttribute("href");
          }, type:function(a) {
            return a.getAttribute("type");
          }}, relative:{"+":function(a, g) {
            var e = "string" === typeof g, b = e && !A.test(g), e = e && !b;
            b && (g = g.toLowerCase());
            for (var b = 0, c = a.length, h;b < c;b++) {
              if (h = a[b]) {
                for (;(h = h.previousSibling) && 1 !== h.nodeType;) {
                }
                a[b] = e || h && h.nodeName.toLowerCase() === g ? h || !1 : h === g;
              }
            }
            e && v.filter(g, a, !0);
          }, ">":function(a, g) {
            var e, b = "string" === typeof g, c = 0, h = a.length;
            if (b && !A.test(g)) {
              for (g = g.toLowerCase();c < h;c++) {
                if (e = a[c]) {
                  e = e.parentNode, a[c] = e.nodeName.toLowerCase() === g ? e : !1;
                }
              }
            } else {
              for (;c < h;c++) {
                (e = a[c]) && (a[c] = b ? e.parentNode : e.parentNode === g);
              }
              b && v.filter(g, a, !0);
            }
          }, "":function(e, c, h) {
            var d, m = f++, r = b;
            "string" !== typeof c || A.test(c) || (d = c = c.toLowerCase(), r = a);
            r("parentNode", c, m, e, d, h);
          }, "~":function(e, c, h) {
            var d, m = f++, r = b;
            "string" !== typeof c || A.test(c) || (d = c = c.toLowerCase(), r = a);
            r("previousSibling", c, m, e, d, h);
          }}, find:{ID:function(a, g, e) {
            if ("undefined" !== typeof g.getElementById && !e) {
              return (a = g.getElementById(a[1])) && a.parentNode ? [a] : [];
            }
          }, NAME:function(a, g) {
            if ("undefined" !== typeof g.getElementsByName) {
              for (var e = [], b = g.getElementsByName(a[1]), c = 0, h = b.length;c < h;c++) {
                b[c].getAttribute("name") === a[1] && e.push(b[c]);
              }
              return 0 === e.length ? null : e;
            }
          }, TAG:function(a, g) {
            if ("undefined" !== typeof g.getElementsByTagName) {
              return g.getElementsByTagName(a[1]);
            }
          }}, preFilter:{CLASS:function(a, g, e, b, c, h) {
            a = " " + a[1].replace(x, "") + " ";
            if (h) {
              return a;
            }
            h = 0;
            for (var d;null != (d = g[h]);h++) {
              d && (c ^ (d.className && 0 <= (" " + d.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a)) ? e || b.push(d) : e && (g[h] = !1));
            }
            return !1;
          }, ID:function(a) {
            return a[1].replace(x, "");
          }, TAG:function(a, g) {
            return a[1].replace(x, "").toLowerCase();
          }, CHILD:function(a) {
            if ("nth" === a[1]) {
              a[2] || v.error(a[0]);
              a[2] = a[2].replace(/^\+|\s*/g, "");
              var g = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even" === a[2] && "2n" || "odd" === a[2] && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
              a[2] = g[1] + (g[2] || 1) - 0;
              a[3] = g[3] - 0;
            } else {
              a[2] && v.error(a[0]);
            }
            a[0] = f++;
            return a;
          }, ATTR:function(a, g, e, b, c, h) {
            g = a[1] = a[1].replace(x, "");
            !h && w.attrMap[g] && (a[1] = w.attrMap[g]);
            a[4] = (a[4] || a[5] || "").replace(x, "");
            "~=" === a[2] && (a[4] = " " + a[4] + " ");
            return a;
          }, PSEUDO:function(a, g, e, b, h) {
            if ("not" === a[1]) {
              if (1 < (c.exec(a[3]) || "").length || /^\w/.test(a[3])) {
                a[3] = v(a[3], null, null, g);
              } else {
                return a = v.filter(a[3], g, e, 1 ^ h), e || b.push.apply(b, a), !1;
              }
            } else {
              if (w.match.POS.test(a[0]) || w.match.CHILD.test(a[0])) {
                return !0;
              }
            }
            return a;
          }, POS:function(a) {
            a.unshift(!0);
            return a;
          }}, filters:{enabled:function(a) {
            return !1 === a.disabled && "hidden" !== a.type;
          }, disabled:function(a) {
            return !0 === a.disabled;
          }, checked:function(a) {
            return !0 === a.checked;
          }, selected:function(a) {
            a.parentNode && a.parentNode.selectedIndex;
            return !0 === a.selected;
          }, parent:function(a) {
            return !!a.firstChild;
          }, empty:function(a) {
            return !a.firstChild;
          }, has:function(a, g, e) {
            return !!v(e[3], a).length;
          }, header:function(a) {
            return /h\d/i.test(a.nodeName);
          }, text:function(a) {
            var g = a.getAttribute("type"), e = a.type;
            return "input" === a.nodeName.toLowerCase() && "text" === e && (g === e || null === g);
          }, radio:function(a) {
            return "input" === a.nodeName.toLowerCase() && "radio" === a.type;
          }, checkbox:function(a) {
            return "input" === a.nodeName.toLowerCase() && "checkbox" === a.type;
          }, file:function(a) {
            return "input" === a.nodeName.toLowerCase() && "file" === a.type;
          }, password:function(a) {
            return "input" === a.nodeName.toLowerCase() && "password" === a.type;
          }, submit:function(a) {
            var g = a.nodeName.toLowerCase();
            return ("input" === g || "button" === g) && "submit" === a.type;
          }, image:function(a) {
            return "input" === a.nodeName.toLowerCase() && "image" === a.type;
          }, reset:function(a) {
            var g = a.nodeName.toLowerCase();
            return ("input" === g || "button" === g) && "reset" === a.type;
          }, button:function(a) {
            var g = a.nodeName.toLowerCase();
            return "input" === g && "button" === a.type || "button" === g;
          }, input:function(a) {
            return /input|select|textarea|button/i.test(a.nodeName);
          }, focus:function(a) {
            return a === a.ownerDocument.activeElement;
          }}, setFilters:{first:function(a, g) {
            return 0 === g;
          }, last:function(a, g, e, b) {
            return g === b.length - 1;
          }, even:function(a, g) {
            return 0 === g % 2;
          }, odd:function(a, g) {
            return 1 === g % 2;
          }, lt:function(a, g, e) {
            return g < e[3] - 0;
          }, gt:function(a, g, e) {
            return g > e[3] - 0;
          }, nth:function(a, g, e) {
            return e[3] - 0 === g;
          }, eq:function(a, g, e) {
            return e[3] - 0 === g;
          }}, filter:{PSEUDO:function(a, g, e, b) {
            var c = g[1], h = w.filters[c];
            if (h) {
              return h(a, e, g, b);
            }
            if ("contains" === c) {
              return 0 <= (a.textContent || a.innerText || y([a]) || "").indexOf(g[3]);
            }
            if ("not" === c) {
              g = g[3];
              e = 0;
              for (b = g.length;e < b;e++) {
                if (g[e] === a) {
                  return !1;
                }
              }
              return !0;
            }
            v.error(c);
          }, CHILD:function(a, g) {
            var e, b, c, h, d, f;
            e = g[1];
            f = a;
            switch(e) {
              case "only":
              ;
              case "first":
                for (;f = f.previousSibling;) {
                  if (1 === f.nodeType) {
                    return !1;
                  }
                }
                if ("first" === e) {
                  return !0;
                }
                f = a;
              case "last":
                for (;f = f.nextSibling;) {
                  if (1 === f.nodeType) {
                    return !1;
                  }
                }
                return !0;
              case "nth":
                e = g[2];
                b = g[3];
                if (1 === e && 0 === b) {
                  return !0;
                }
                c = g[0];
                if ((h = a.parentNode) && (h[m] !== c || !a.nodeIndex)) {
                  d = 0;
                  for (f = h.firstChild;f;f = f.nextSibling) {
                    1 === f.nodeType && (f.nodeIndex = ++d);
                  }
                  h[m] = c;
                }
                f = a.nodeIndex - b;
                return 0 === e ? 0 === f : 0 === f % e && 0 <= f / e;
            }
          }, ID:function(a, g) {
            return 1 === a.nodeType && a.getAttribute("id") === g;
          }, TAG:function(a, g) {
            return "*" === g && 1 === a.nodeType || !!a.nodeName && a.nodeName.toLowerCase() === g;
          }, CLASS:function(a, g) {
            return -1 < (" " + (a.className || a.getAttribute("class")) + " ").indexOf(g);
          }, ATTR:function(a, g) {
            var e = g[1], e = v.attr ? v.attr(a, e) : w.attrHandle[e] ? w.attrHandle[e](a) : null != a[e] ? a[e] : a.getAttribute(e), b = e + "", c = g[2], h = g[4];
            return null == e ? "!=" === c : !c && v.attr ? null != e : "=" === c ? b === h : "*=" === c ? 0 <= b.indexOf(h) : "~=" === c ? 0 <= (" " + b + " ").indexOf(h) : h ? "!=" === c ? b !== h : "^=" === c ? 0 === b.indexOf(h) : "$=" === c ? b.substr(b.length - h.length) === h : "|=" === c ? b === h || b.substr(0, h.length + 1) === h + "-" : !1 : b && !1 !== e;
          }, POS:function(a, g, e, b) {
            var c = w.setFilters[g[2]];
            if (c) {
              return c(a, e, g, b);
            }
          }}}, R = w.match.POS, I = function(a, g) {
            return "\\" + (g - 0 + 1);
          }, J;
          for (J in w.match) {
            w.match[J] = new RegExp(w.match[J].source + /(?![^\[]*\])(?![^\(]*\))/.source), w.leftMatch[J] = new RegExp(/(^(?:.|\r|\n)*?)/.source + w.match[J].source.replace(/\\(\d+)/g, I));
          }
          w.match.globalPOS = R;
          var D = function(a, g) {
            a = Array.prototype.slice.call(a, 0);
            return g ? (g.push.apply(g, a), g) : a;
          };
          try {
            Array.prototype.slice.call(h.documentElement.childNodes, 0)[0].nodeType;
          } catch (fa) {
            D = function(a, g) {
              var e = 0, b = g || [];
              if ("[object Array]" === n.call(a)) {
                Array.prototype.push.apply(b, a);
              } else {
                if ("number" === typeof a.length) {
                  for (var c = a.length;e < c;e++) {
                    b.push(a[e]);
                  }
                } else {
                  for (;a[e];e++) {
                    b.push(a[e]);
                  }
                }
              }
              return b;
            };
          }
          var S, q;
          h.documentElement.compareDocumentPosition ? S = function(a, g) {
            return a === g ? (l = !0, 0) : a.compareDocumentPosition && g.compareDocumentPosition ? a.compareDocumentPosition(g) & 4 ? -1 : 1 : a.compareDocumentPosition ? -1 : 1;
          } : (S = function(a, g) {
            if (a === g) {
              return l = !0, 0;
            }
            if (a.sourceIndex && g.sourceIndex) {
              return a.sourceIndex - g.sourceIndex;
            }
            var e, b, c = [], h = [];
            e = a.parentNode;
            b = g.parentNode;
            var d = e;
            if (e === b) {
              return q(a, g);
            }
            if (!e) {
              return -1;
            }
            if (!b) {
              return 1;
            }
            for (;d;) {
              c.unshift(d), d = d.parentNode;
            }
            for (d = b;d;) {
              h.unshift(d), d = d.parentNode;
            }
            e = c.length;
            b = h.length;
            for (d = 0;d < e && d < b;d++) {
              if (c[d] !== h[d]) {
                return q(c[d], h[d]);
              }
            }
            return d === e ? q(a, h[d], -1) : q(c[d], g, 1);
          }, q = function(a, g, e) {
            if (a === g) {
              return e;
            }
            for (a = a.nextSibling;a;) {
              if (a === g) {
                return -1;
              }
              a = a.nextSibling;
            }
            return 1;
          });
          (function() {
            var a = h.createElement("div"), g = "script" + (new Date).getTime(), e = h.documentElement;
            a.innerHTML = "<a name='" + g + "'/>";
            e.insertBefore(a, e.firstChild);
            h.getElementById(g) && (w.find.ID = function(a, g, e) {
              if ("undefined" !== typeof g.getElementById && !e) {
                return (g = g.getElementById(a[1])) ? g.id === a[1] || "undefined" !== typeof g.getAttributeNode && g.getAttributeNode("id").nodeValue === a[1] ? [g] : d : [];
              }
            }, w.filter.ID = function(a, g) {
              var e = "undefined" !== typeof a.getAttributeNode && a.getAttributeNode("id");
              return 1 === a.nodeType && e && e.nodeValue === g;
            });
            e.removeChild(a);
            e = a = null;
          })();
          (function() {
            var a = h.createElement("div");
            a.appendChild(h.createComment(""));
            0 < a.getElementsByTagName("*").length && (w.find.TAG = function(a, g) {
              var e = g.getElementsByTagName(a[1]);
              if ("*" === a[1]) {
                for (var b = [], c = 0;e[c];c++) {
                  1 === e[c].nodeType && b.push(e[c]);
                }
                e = b;
              }
              return e;
            });
            a.innerHTML = "<a href='#'></a>";
            a.firstChild && "undefined" !== typeof a.firstChild.getAttribute && "#" !== a.firstChild.getAttribute("href") && (w.attrHandle.href = function(a) {
              return a.getAttribute("href", 2);
            });
            a = null;
          })();
          h.querySelectorAll && function() {
            var a = v, g = h.createElement("div");
            g.innerHTML = "<p class='TEST'></p>";
            if (!g.querySelectorAll || 0 !== g.querySelectorAll(".TEST").length) {
              v = function(g, e, b, c) {
                e = e || h;
                if (!c && !v.isXML(e)) {
                  var d = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(g);
                  if (d && (1 === e.nodeType || 9 === e.nodeType)) {
                    if (d[1]) {
                      return D(e.getElementsByTagName(g), b);
                    }
                    if (d[2] && w.find.CLASS && e.getElementsByClassName) {
                      return D(e.getElementsByClassName(d[2]), b);
                    }
                  }
                  if (9 === e.nodeType) {
                    if ("body" === g && e.body) {
                      return D([e.body], b);
                    }
                    if (d && d[3]) {
                      var m = e.getElementById(d[3]);
                      if (m && m.parentNode) {
                        if (m.id === d[3]) {
                          return D([m], b);
                        }
                      } else {
                        return D([], b);
                      }
                    }
                    try {
                      return D(e.querySelectorAll(g), b);
                    } catch (f) {
                    }
                  } else {
                    if (1 === e.nodeType && "object" !== e.nodeName.toLowerCase()) {
                      var d = e, r = (m = e.getAttribute("id")) || "__sizzle__", n = e.parentNode, l = /^\s*[+~]/.test(g);
                      m ? r = r.replace(/'/g, "\\//JQUERY_SOURCE") : e.setAttribute("id", r);
                      l && n && (e = e.parentNode);
                      try {
                        if (!l || n) {
                          return D(e.querySelectorAll("[id='" + r + "'] " + g), b);
                        }
                      } catch (f) {
                      } finally {
                        m || d.removeAttribute("id");
                      }
                    }
                  }
                }
                return a(g, e, b, c);
              };
              for (var e in a) {
                v[e] = a[e];
              }
              g = null;
            }
          }();
          (function() {
            var a = h.documentElement, g = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (g) {
              var e = !g.call(h.createElement("div"), "div"), b = !1;
              try {
                g.call(h.documentElement, "[test!='']:sizzle");
              } catch (c) {
                b = !0;
              }
              v.matchesSelector = function(a, c) {
                c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                if (!v.isXML(a)) {
                  try {
                    if (b || !w.match.PSEUDO.test(c) && !/!=/.test(c)) {
                      var h = g.call(a, c);
                      if (h || !e || a.document && 11 !== a.document.nodeType) {
                        return h;
                      }
                    }
                  } catch (d) {
                  }
                }
                return 0 < v(c, null, null, [a]).length;
              };
            }
          })();
          (function() {
            var a = h.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            a.getElementsByClassName && 0 !== a.getElementsByClassName("e").length && (a.lastChild.className = "e", 1 !== a.getElementsByClassName("e").length && (w.order.splice(1, 0, "CLASS"), w.find.CLASS = function(a, g, e) {
              if ("undefined" !== typeof g.getElementsByClassName && !e) {
                return g.getElementsByClassName(a[1]);
              }
            }, a = null));
          })();
          v.contains = h.documentElement.contains ? function(a, g) {
            return a !== g && (a.contains ? a.contains(g) : !0);
          } : h.documentElement.compareDocumentPosition ? function(a, g) {
            return !!(a.compareDocumentPosition(g) & 16);
          } : function() {
            return !1;
          };
          v.isXML = function(a) {
            return (a = (a ? a.ownerDocument || a : 0).documentElement) ? "HTML" !== a.nodeName : !1;
          };
          var B = function(a, g, e) {
            var b, c = [], h = "";
            for (g = g.nodeType ? [g] : g;b = w.match.PSEUDO.exec(a);) {
              h += b[0], a = a.replace(w.match.PSEUDO, "");
            }
            a = w.relative[a] ? a + "*" : a;
            b = 0;
            for (var d = g.length;b < d;b++) {
              v(a, g[b], c, e);
            }
            return v.filter(h, c);
          };
          v.attr = e.attr;
          v.selectors.attrMap = {};
          e.find = v;
          e.expr = v.selectors;
          e.expr[":"] = e.expr.filters;
          e.unique = v.uniqueSort;
          e.text = v.getText;
          e.isXMLDoc = v.isXML;
          e.contains = v.contains;
        })();
        var mb = /Until$/, nb = /^(?:parents|prevUntil|prevAll)/, ob = /,/, cb = /^.[^:#\[\.,]*$/, pb = Array.prototype.slice, Na = e.expr.match.globalPOS, qb = {children:!0, contents:!0, next:!0, prev:!0};
        e.fn.extend({find:function(a) {
          var b = this, c, h;
          if ("string" !== typeof a) {
            return e(a).filter(function() {
              c = 0;
              for (h = b.length;c < h;c++) {
                if (e.contains(b[c], this)) {
                  return !0;
                }
              }
            });
          }
          var d = this.pushStack("", "find", a), m, f, n;
          c = 0;
          for (h = this.length;c < h;c++) {
            if (m = d.length, e.find(a, this[c], d), 0 < c) {
              for (f = m;f < d.length;f++) {
                for (n = 0;n < m;n++) {
                  if (d[n] === d[f]) {
                    d.splice(f--, 1);
                    break;
                  }
                }
              }
            }
          }
          return d;
        }, has:function(a) {
          var b = e(a);
          return this.filter(function() {
            for (var a = 0, g = b.length;a < g;a++) {
              if (e.contains(this, b[a])) {
                return !0;
              }
            }
          });
        }, not:function(a) {
          return this.pushStack(V(this, a, !1), "not", a);
        }, filter:function(a) {
          return this.pushStack(V(this, a, !0), "filter", a);
        }, is:function(a) {
          return !!a && ("string" === typeof a ? Na.test(a) ? 0 <= e(a, this.context).index(this[0]) : 0 < e.filter(a, this).length : 0 < this.filter(a).length);
        }, closest:function(a, b) {
          var c = [], h, d, m = this[0];
          if (e.isArray(a)) {
            for (d = 1;m && m.ownerDocument && m !== b;) {
              for (h = 0;h < a.length;h++) {
                e(m).is(a[h]) && c.push({selector:a[h], elem:m, level:d});
              }
              m = m.parentNode;
              d++;
            }
            return c;
          }
          var f = Na.test(a) || "string" !== typeof a ? e(a, b || this.context) : 0;
          h = 0;
          for (d = this.length;h < d;h++) {
            for (m = this[h];m;) {
              if (f ? -1 < f.index(m) : e.find.matchesSelector(m, a)) {
                c.push(m);
                break;
              } else {
                if (m = m.parentNode, !m || !m.ownerDocument || m === b || 11 === m.nodeType) {
                  break;
                }
              }
            }
          }
          c = 1 < c.length ? e.unique(c) : c;
          return this.pushStack(c, "closest", a);
        }, index:function(a) {
          return a ? "string" === typeof a ? e.inArray(this[0], e(a)) : e.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
        }, add:function(a, b) {
          var c = "string" === typeof a ? e(a, b) : e.makeArray(a && a.nodeType ? [a] : a), h = e.merge(this.get(), c);
          return this.pushStack(W(c[0]) || W(h[0]) ? h : e.unique(h));
        }, andSelf:function() {
          return this.add(this.prevObject);
        }});
        e.each({parent:function(a) {
          return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
        }, parents:function(a) {
          return e.dir(a, "parentNode");
        }, parentsUntil:function(a, b, c) {
          return e.dir(a, "parentNode", c);
        }, next:function(a) {
          return e.nth(a, 2, "nextSibling");
        }, prev:function(a) {
          return e.nth(a, 2, "previousSibling");
        }, nextAll:function(a) {
          return e.dir(a, "nextSibling");
        }, prevAll:function(a) {
          return e.dir(a, "previousSibling");
        }, nextUntil:function(a, b, c) {
          return e.dir(a, "nextSibling", c);
        }, prevUntil:function(a, b, c) {
          return e.dir(a, "previousSibling", c);
        }, siblings:function(a) {
          return e.sibling((a.parentNode || {}).firstChild, a);
        }, children:function(a) {
          return e.sibling(a.firstChild);
        }, contents:function(a) {
          return e.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : e.makeArray(a.childNodes);
        }}, function(a, b) {
          e.fn[a] = function(c, h) {
            var d = e.map(this, b, c);
            mb.test(a) || (h = c);
            h && "string" === typeof h && (d = e.filter(h, d));
            d = 1 < this.length && !qb[a] ? e.unique(d) : d;
            (1 < this.length || ob.test(h)) && nb.test(a) && (d = d.reverse());
            return this.pushStack(d, a, pb.call(arguments).join(","));
          };
        });
        e.extend({filter:function(a, b, c) {
          c && (a = ":not(" + a + ")");
          return 1 === b.length ? e.find.matchesSelector(b[0], a) ? [b[0]] : [] : e.find.matches(a, b);
        }, dir:function(a) {
          function e(b, c, h) {
            return a.apply(this, arguments);
          }
          e.toString = function() {
            return a.toString();
          };
          return e;
        }(function(a, b, c) {
          var h = [];
          for (a = a[b];a && 9 !== a.nodeType && (c === d || 1 !== a.nodeType || !e(a).is(c));) {
            1 === a.nodeType && h.push(a), a = a[b];
          }
          return h;
        }), nth:function(a, e, b, c) {
          e = e || 1;
          for (c = 0;a && (1 !== a.nodeType || ++c !== e);a = a[b]) {
          }
          return a;
        }, sibling:function(a, e) {
          for (var b = [];a;a = a.nextSibling) {
            1 === a.nodeType && a !== e && b.push(a);
          }
          return b;
        }});
        var Ha = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rb = / jQuery\d+="(?:\d+|null)"/g, Da = /^\s+/, Oa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Pa = /<([\w:]+)/, sb = /<tbody/i, tb = /<|&#?\w+;/, ub = /<(?:script|style)/i, vb = /<(?:script|object|embed|option|style)/i, Qa = new RegExp("<(?:" + Ha + ")[\\s/>]", "i"), Ra = /checked\s*(?:[^=]|=\s*.checked.)/i, 
        Sa = /\/(java|ecma)script/i, wb = /^\s*<!(?:\[CDATA\[|\-\-)/, aa = {option:[1, "<select multiple='multiple'>", "</select>"], legend:[1, "<fieldset>", "</fieldset>"], thead:[1, "<table>", "</table>"], tr:[2, "<table><tbody>", "</tbody></table>"], td:[3, "<table><tbody><tr>", "</tr></tbody></table>"], col:[2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area:[1, "<map>", "</map>"], _default:[0, "", ""]}, Ea = ba(h);
        aa.optgroup = aa.option;
        aa.tbody = aa.tfoot = aa.colgroup = aa.caption = aa.thead;
        aa.th = aa.td;
        e.support.htmlSerialize || (aa._default = [1, "div<div>", "</div>"]);
        e.fn.extend({text:function(a) {
          return e.access(this, function(a) {
            return a === d ? e.text(this) : this.empty().append((this[0] && this[0].ownerDocument || h).createTextNode(a));
          }, null, a, arguments.length);
        }, wrapAll:function(a) {
          if (e.isFunction(a)) {
            return this.each(function(b) {
              e(this).wrapAll(a.call(this, b));
            });
          }
          if (this[0]) {
            var b = e(a, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && b.insertBefore(this[0]);
            b.map(function() {
              for (var a = this;a.firstChild && 1 === a.firstChild.nodeType;) {
                a = a.firstChild;
              }
              return a;
            }).append(this);
          }
          return this;
        }, wrapInner:function(a) {
          return e.isFunction(a) ? this.each(function(b) {
            e(this).wrapInner(a.call(this, b));
          }) : this.each(function() {
            var b = e(this), c = b.contents();
            c.length ? c.wrapAll(a) : b.append(a);
          });
        }, wrap:function(a) {
          var b = e.isFunction(a);
          return this.each(function(c) {
            e(this).wrapAll(b ? a.call(this, c) : a);
          });
        }, unwrap:function() {
          return this.parent().each(function() {
            e.nodeName(this, "body") || e(this).replaceWith(this.childNodes);
          }).end();
        }, append:function() {
          return this.domManip(arguments, !0, function(a) {
            1 === this.nodeType && this.appendChild(a);
          });
        }, prepend:function() {
          return this.domManip(arguments, !0, function(a) {
            1 === this.nodeType && this.insertBefore(a, this.firstChild);
          });
        }, before:function() {
          if (this[0] && this[0].parentNode) {
            return this.domManip(arguments, !1, function(a) {
              this.parentNode.insertBefore(a, this);
            });
          }
          if (arguments.length) {
            var a = e.clean(arguments);
            a.push.apply(a, this.toArray());
            return this.pushStack(a, "before", arguments);
          }
        }, after:function() {
          if (this[0] && this[0].parentNode) {
            return this.domManip(arguments, !1, function(a) {
              this.parentNode.insertBefore(a, this.nextSibling);
            });
          }
          if (arguments.length) {
            var a = this.pushStack(this, "after", arguments);
            a.push.apply(a, e.clean(arguments));
            return a;
          }
        }, remove:function(a, b) {
          for (var c = 0, h;null != (h = this[c]);c++) {
            if (!a || e.filter(a, [h]).length) {
              b || 1 !== h.nodeType || (e.cleanData(h.getElementsByTagName("*")), e.cleanData([h])), h.parentNode && h.parentNode.removeChild(h);
            }
          }
          return this;
        }, empty:function() {
          for (var a = 0, b;null != (b = this[a]);a++) {
            for (1 === b.nodeType && e.cleanData(b.getElementsByTagName("*"));b.firstChild;) {
              b.removeChild(b.firstChild);
            }
          }
          return this;
        }, clone:function(a, b) {
          a = null == a ? !1 : a;
          b = null == b ? a : b;
          return this.map(function() {
            return e.clone(this, a, b);
          });
        }, html:function(a) {
          return e.access(this, function(a) {
            var g = this[0] || {}, b = 0, c = this.length;
            if (a === d) {
              return 1 === g.nodeType ? g.innerHTML.replace(rb, "") : null;
            }
            if (!("string" !== typeof a || ub.test(a) || !e.support.leadingWhitespace && Da.test(a) || aa[(Pa.exec(a) || ["", ""])[1].toLowerCase()])) {
              a = a.replace(Oa, "<$1></$2>");
              try {
                for (;b < c;b++) {
                  g = this[b] || {}, 1 === g.nodeType && (e.cleanData(g.getElementsByTagName("*")), g.innerHTML = a);
                }
                g = 0;
              } catch (h) {
              }
            }
            g && this.empty().append(a);
          }, null, a, arguments.length);
        }, replaceWith:function(a) {
          if (this[0] && this[0].parentNode) {
            if (e.isFunction(a)) {
              return this.each(function(b) {
                var c = e(this), h = c.html();
                c.replaceWith(a.call(this, b, h));
              });
            }
            "string" !== typeof a && (a = e(a).detach());
            return this.each(function() {
              var b = this.nextSibling, c = this.parentNode;
              e(this).remove();
              b ? e(b).before(a) : e(c).append(a);
            });
          }
          return this.length ? this.pushStack(e(e.isFunction(a) ? a() : a), "replaceWith", a) : this;
        }, detach:function(a) {
          return this.remove(a, !0);
        }, domManip:function(g, b, c) {
          var h, m, f, n = g[0], l = [];
          if (!e.support.checkClone && 3 === arguments.length && "string" === typeof n && Ra.test(n)) {
            return this.each(function() {
              e(this).domManip(g, b, c, !0);
            });
          }
          if (e.isFunction(n)) {
            return this.each(function(a) {
              var h = e(this);
              g[0] = n.call(this, a, b ? h.html() : d);
              h.domManip(g, b, c);
            });
          }
          if (this[0]) {
            h = n && n.parentNode;
            h = e.support.parentNode && h && 11 === h.nodeType && h.childNodes.length === this.length ? {fragment:h} : e.buildFragment(g, this, l);
            f = h.fragment;
            if (m = 1 === f.childNodes.length ? f = f.firstChild : f.firstChild) {
              b = b && e.nodeName(m, "tr");
              for (var t = 0, x = this.length, v = x - 1;t < x;t++) {
                c.call(b ? a(this[t], m) : this[t], h.cacheable || 1 < x && t < v ? e.clone(f, !0, !0) : f);
              }
            }
            l.length && e.each(l, function(a, g) {
              g.src ? e.ajax({type:"GET", global:!1, url:g.src, async:!1, dataType:"script"}) : e.globalEval((g.text || g.textContent || g.innerHTML || "").replace(wb, "/*$0*/"));
              g.parentNode && g.parentNode.removeChild(g);
            });
          }
          return this;
        }});
        e.buildFragment = function(a, b, c) {
          var d, m, f, n, l = a[0];
          b && b[0] && (n = b[0].ownerDocument || b[0]);
          n.createDocumentFragment || (n = h);
          !(1 === a.length && "string" === typeof l && 512 > l.length && n === h && "<" === l.charAt(0)) || vb.test(l) || !e.support.checkClone && Ra.test(l) || !e.support.html5Clone && Qa.test(l) || (m = !0, (f = e.fragments[l]) && 1 !== f && (d = f));
          d || (d = n.createDocumentFragment(), e.clean(a, n, d, c));
          m && (e.fragments[l] = f ? d : 1);
          return {fragment:d, cacheable:m};
        };
        e.fragments = {};
        e.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function(a, b) {
          e.fn[a] = function(c) {
            var h = [];
            c = e(c);
            var d = 1 === this.length && this[0].parentNode;
            if (d && 11 === d.nodeType && 1 === d.childNodes.length && 1 === c.length) {
              return c[b](this[0]), this;
            }
            for (var d = 0, m = c.length;d < m;d++) {
              var f = (0 < d ? this.clone(!0) : this).get();
              e(c[d])[b](f);
              h = h.concat(f);
            }
            return this.pushStack(h, a, c.selector);
          };
        });
        e.extend({clone:function(a, b, c) {
          var d, m, f;
          e.support.html5Clone || e.isXMLDoc(a) || !Qa.test("<" + a.nodeName + ">") ? d = a.cloneNode(!0) : (d = h.createElement("div"), Ea.appendChild(d), d.innerHTML = a.outerHTML, d = d.firstChild);
          var n = d;
          if (!(e.support.noCloneEvent && e.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || e.isXMLDoc(a))) {
            for (Q(a, n), d = T(a), m = T(n), f = 0;d[f];++f) {
              m[f] && Q(d[f], m[f]);
            }
          }
          if (b && (ca(a, n), c)) {
            for (d = T(a), m = T(n), f = 0;d[f];++f) {
              ca(d[f], m[f]);
            }
          }
          return n;
        }, clean:function(a, b, c, d) {
          var m, f = [];
          b = b || h;
          "undefined" === typeof b.createElement && (b = b.ownerDocument || b[0] && b[0].ownerDocument || h);
          for (var n = 0, l;null != (l = a[n]);n++) {
            if ("number" === typeof l && (l += ""), l) {
              if ("string" === typeof l) {
                if (tb.test(l)) {
                  l = l.replace(Oa, "<$1></$2>");
                  m = (Pa.exec(l) || ["", ""])[1].toLowerCase();
                  var t = aa[m] || aa._default, x = t[0], v = b.createElement("div"), k = Ea.childNodes;
                  b === h ? Ea.appendChild(v) : ba(b).appendChild(v);
                  for (v.innerHTML = t[1] + l + t[2];x--;) {
                    v = v.lastChild;
                  }
                  if (!e.support.tbody) {
                    for (x = sb.test(l), t = "table" !== m || x ? "<table>" !== t[1] || x ? [] : v.childNodes : v.firstChild && v.firstChild.childNodes, m = t.length - 1;0 <= m;--m) {
                      e.nodeName(t[m], "tbody") && !t[m].childNodes.length && t[m].parentNode.removeChild(t[m]);
                    }
                  }
                  !e.support.leadingWhitespace && Da.test(l) && v.insertBefore(b.createTextNode(Da.exec(l)[0]), v.firstChild);
                  l = v.childNodes;
                  v && (v.parentNode.removeChild(v), 0 < k.length && (v = k[k.length - 1]) && v.parentNode && v.parentNode.removeChild(v));
                } else {
                  l = b.createTextNode(l);
                }
              }
              var A;
              if (!e.support.appendChecked) {
                if (l[0] && "number" === typeof(A = l.length)) {
                  for (m = 0;m < A;m++) {
                    ma(l[m]);
                  }
                } else {
                  ma(l);
                }
              }
              l.nodeType ? f.push(l) : f = e.merge(f, l);
            }
          }
          if (c) {
            for (a = function(a) {
              return !a.type || Sa.test(a.type);
            }, n = 0;f[n];n++) {
              b = f[n], d && e.nodeName(b, "script") && (!b.type || Sa.test(b.type)) ? d.push(b.parentNode ? b.parentNode.removeChild(b) : b) : (1 === b.nodeType && (l = e.grep(b.getElementsByTagName("script"), a), f.splice.apply(f, [n + 1, 0].concat(l))), c.appendChild(b));
            }
          }
          return f;
        }, cleanData:function(a) {
          for (var b, c, h = e.cache, d = e.event.special, m = e.support.deleteExpando, f = 0, n;null != (n = a[f]);f++) {
            if (!n.nodeName || !e.noData[n.nodeName.toLowerCase()]) {
              if (c = n[e.expando]) {
                if ((b = h[c]) && b.events) {
                  for (var l in b.events) {
                    d[l] ? e.event.remove(n, l) : e.removeEvent(n, l, b.handle);
                  }
                  b.handle && (b.handle.elem = null);
                }
                m ? delete n[e.expando] : n.removeAttribute && n.removeAttribute(e.expando);
                delete h[c];
              }
            }
          }
        }});
        var Fa = /alpha\([^)]*\)/i, xb = /opacity=([^)]*)/, yb = /([A-Z]|^ms)/g, zb = /^[\-+]?(?:\d*\.)?\d+$/i, xa = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, Ab = /^([\-+])=([\-+.\de]+)/, Bb = /^margin/, Cb = {position:"absolute", visibility:"hidden", display:"block"}, ja = ["Top", "Right", "Bottom", "Left"], na, Ta, Ua;
        e.fn.css = function(a, b) {
          return e.access(this, function(a, g, b) {
            return b !== d ? e.style(a, g, b) : e.css(a, g);
          }, a, b, 1 < arguments.length);
        };
        e.extend({cssHooks:{opacity:{get:function(a, e) {
          if (e) {
            var b = na(a, "opacity");
            return "" === b ? "1" : b;
          }
          return a.style.opacity;
        }}}, cssNumber:{fillOpacity:!0, fontWeight:!0, lineHeight:!0, opacity:!0, orphans:!0, widows:!0, zIndex:!0, zoom:!0}, cssProps:{"float":e.support.cssFloat ? "cssFloat" : "styleFloat"}, style:function(a, b, c, h) {
          if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
            var m, f = e.camelCase(b), n = a.style, l = e.cssHooks[f];
            b = e.cssProps[f] || f;
            if (c !== d) {
              if (h = typeof c, "string" === h && (m = Ab.exec(c)) && (c = +(m[1] + 1) * +m[2] + parseFloat(e.css(a, b)), h = "number"), !(null == c || "number" === h && isNaN(c) || ("number" !== h || e.cssNumber[f] || (c += "px"), l && "set" in l && (c = l.set(a, c)) === d))) {
                try {
                  n[b] = c;
                } catch (t) {
                }
              }
            } else {
              return l && "get" in l && (m = l.get(a, !1, h)) !== d ? m : n[b];
            }
          }
        }, css:function(a, b, c) {
          var h, m;
          b = e.camelCase(b);
          m = e.cssHooks[b];
          b = e.cssProps[b] || b;
          "cssFloat" === b && (b = "float");
          if (m && "get" in m && (h = m.get(a, !0, c)) !== d) {
            return h;
          }
          if (na) {
            return na(a, b);
          }
        }, swap:function(a, e, b) {
          var c = {}, h;
          for (h in e) {
            c[h] = a.style[h], a.style[h] = e[h];
          }
          b = b.call(a);
          for (h in e) {
            a.style[h] = c[h];
          }
          return b;
        }});
        e.curCSS = e.css;
        h.defaultView && h.defaultView.getComputedStyle && (Ta = function(a, b) {
          var c, h, d, m = a.style;
          b = b.replace(yb, "-$1").toLowerCase();
          (h = a.ownerDocument.defaultView) && (d = h.getComputedStyle(a, null)) && (c = d.getPropertyValue(b), "" !== c || e.contains(a.ownerDocument.documentElement, a) || (c = e.style(a, b)));
          !e.support.pixelMargin && d && Bb.test(b) && xa.test(c) && (h = m.width, m.width = c, c = d.width, m.width = h);
          return c;
        });
        h.documentElement.currentStyle && (Ua = function(a, b) {
          var e, c, h = a.currentStyle && a.currentStyle[b], d = a.style;
          null == h && d && (e = d[b]) && (h = e);
          if (xa.test(h)) {
            e = d.left;
            if (c = a.runtimeStyle && a.runtimeStyle.left) {
              a.runtimeStyle.left = a.currentStyle.left;
            }
            d.left = "fontSize" === b ? "1em" : h;
            h = d.pixelLeft + "px";
            d.left = e;
            c && (a.runtimeStyle.left = c);
          }
          return "" === h ? "auto" : h;
        });
        na = Ta || Ua;
        e.each(["height", "width"], function(a, b) {
          e.cssHooks[b] = {get:function(a, g, c) {
            if (g) {
              return 0 !== a.offsetWidth ? m(a, b, c) : e.swap(a, Cb, function() {
                return m(a, b, c);
              });
            }
          }, set:function(a, g) {
            return zb.test(g) ? g + "px" : g;
          }};
        });
        e.support.opacity || (e.cssHooks.opacity = {get:function(a, b) {
          return xb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : "";
        }, set:function(a, b) {
          var c = a.style, h = a.currentStyle, d = e.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", m = h && h.filter || c.filter || "";
          c.zoom = 1;
          if (1 <= b && "" === e.trim(m.replace(Fa, "")) && (c.removeAttribute("filter"), h && !h.filter)) {
            return;
          }
          c.filter = Fa.test(m) ? m.replace(Fa, d) : m + " " + d;
        }});
        e(function() {
          e.support.reliableMarginRight || (e.cssHooks.marginRight = {get:function(a, b) {
            return e.swap(a, {display:"inline-block"}, function() {
              return b ? na(a, "margin-right") : a.style.marginRight;
            });
          }});
        });
        e.expr && e.expr.filters && (e.expr.filters.hidden = function(a) {
          var b = a.offsetHeight;
          return 0 === a.offsetWidth && 0 === b || !e.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || e.css(a, "display"));
        }, e.expr.filters.visible = function(a) {
          return !e.expr.filters.hidden(a);
        });
        e.each({margin:"", padding:"", border:"Width"}, function(a, b) {
          e.cssHooks[a + b] = {expand:function(e) {
            var c = "string" === typeof e ? e.split(" ") : [e], h = {};
            for (e = 0;4 > e;e++) {
              h[a + ja[e] + b] = c[e] || c[e - 2] || c[0];
            }
            return h;
          }};
        });
        var Db = /%20/g, db = /\[\]$/, Va = /\r?\n/g, Eb = /#.*$/, Fb = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, Gb = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, Hb = /^(?:GET|HEAD)$/, Ib = /^\/\//, Wa = /\?/, Jb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Kb = /^(?:select|textarea)/i, Ia = /\s+/, Lb = /([?&])_=[^&]*/, Xa = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, Ya = e.fn.load, ya = {}, Za = {}, ka, la, $a = ["*/"] + 
        ["*"];
        try {
          ka = v.href;
        } catch (g) {
          ka = h.createElement("a"), ka.href = "", ka = ka.href;
        }
        la = Xa.exec(ka.toLowerCase()) || [];
        e.fn.extend({load:function(a, b, c) {
          if ("string" !== typeof a && Ya) {
            return Ya.apply(this, arguments);
          }
          if (!this.length) {
            return this;
          }
          var h = a.indexOf(" ");
          if (0 <= h) {
            var m = a.slice(h, a.length);
            a = a.slice(0, h);
          }
          h = "GET";
          b && (e.isFunction(b) ? (c = b, b = d) : "object" === typeof b && (b = e.param(b, e.ajaxSettings.traditional), h = "POST"));
          var f = this;
          e.ajax({url:a, type:h, dataType:"html", data:b, complete:function(a, g, b) {
            b = a.responseText;
            a.isResolved() && (a.done(function(a) {
              b = a;
            }), f.html(m ? e("<div>").append(b.replace(Jb, "")).find(m) : b));
            c && f.each(c, [b, g, a]);
          }});
          return this;
        }, serialize:function() {
          return e.param(this.serializeArray());
        }, serializeArray:function() {
          return this.map(function() {
            return this.elements ? e.makeArray(this.elements) : this;
          }).filter(function() {
            return this.name && !this.disabled && (this.checked || Kb.test(this.nodeName) || Gb.test(this.type));
          }).map(function(a, b) {
            var c = e(this).val();
            return null == c ? null : e.isArray(c) ? e.map(c, function(a, g) {
              return {name:b.name, value:a.replace(Va, "\r\n")};
            }) : {name:b.name, value:c.replace(Va, "\r\n")};
          }).get();
        }});
        e.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
          e.fn[b] = function(a) {
            return this.on(b, a);
          };
        });
        e.each(["get", "post"], function(a, b) {
          e[b] = function(a, g, c, h) {
            e.isFunction(g) && (h = h || c, c = g, g = d);
            return e.ajax({type:b, url:a, data:g, success:c, dataType:h});
          };
        });
        e.extend({getScript:function(a, b) {
          return e.get(a, d, b, "script");
        }, getJSON:function(a, b, c) {
          return e.get(a, b, c, "json");
        }, ajaxSetup:function(a, b) {
          b ? A(a, e.ajaxSettings) : (b = a, a = e.ajaxSettings);
          A(a, b);
          return a;
        }, ajaxSettings:{url:ka, isLocal:/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(la[1]), global:!0, type:"GET", contentType:"application/x-www-form-urlencoded; charset=UTF-8", processData:!0, async:!0, accepts:{xml:"application/xml, text/xml", html:"text/html", text:"text/plain", json:"application/json, text/javascript", "*":$a}, contents:{xml:/xml/, html:/html/, json:/json/}, responseFields:{xml:"responseXML", text:"responseText"}, converters:{"* text":c.String, "text html":!0, 
        "text json":e.parseJSON, "text xml":e.parseXML}, flatOptions:{context:!0, url:!0}}, ajaxPrefilter:t(ya), ajaxTransport:t(Za), ajax:function(a, b) {
          function c(a, b, g, x) {
            if (2 !== D) {
              D = 2;
              J && clearTimeout(J);
              R = d;
              y = x || "";
              B.readyState = 0 < a ? 4 : 0;
              var k, A, r;
              x = b;
              if (g) {
                var w = h, I = B, F = w.contents, q = w.dataTypes, G = w.responseFields, O, p, X, u;
                for (p in G) {
                  p in g && (I[G[p]] = g[p]);
                }
                for (;"*" === q[0];) {
                  q.shift(), O === d && (O = w.mimeType || I.getResponseHeader("content-type"));
                }
                if (O) {
                  for (p in F) {
                    if (F[p] && F[p].test(O)) {
                      q.unshift(p);
                      break;
                    }
                  }
                }
                if (q[0] in g) {
                  X = q[0];
                } else {
                  for (p in g) {
                    if (!q[0] || w.converters[p + " " + q[0]]) {
                      X = p;
                      break;
                    }
                    u || (u = p);
                  }
                  X = X || u;
                }
                X ? (X !== q[0] && q.unshift(X), g = g[X]) : g = void 0;
              } else {
                g = d;
              }
              if (200 <= a && 300 > a || 304 === a) {
                if (h.ifModified) {
                  if (O = B.getResponseHeader("Last-Modified")) {
                    e.lastModified[v] = O;
                  }
                  if (O = B.getResponseHeader("Etag")) {
                    e.etag[v] = O;
                  }
                }
                if (304 === a) {
                  x = "notmodified", k = !0;
                } else {
                  try {
                    O = h;
                    O.dataFilter && (g = O.dataFilter(g, O.dataType));
                    var H = O.dataTypes;
                    p = {};
                    var N, z, K = H.length, E, L = H[0], U, M, P, Y, ha;
                    for (N = 1;N < K;N++) {
                      if (1 === N) {
                        for (z in O.converters) {
                          "string" === typeof z && (p[z.toLowerCase()] = O.converters[z]);
                        }
                      }
                      U = L;
                      L = H[N];
                      if ("*" === L) {
                        L = U;
                      } else {
                        if ("*" !== U && U !== L) {
                          M = U + " " + L;
                          P = p[M] || p["* " + L];
                          if (!P) {
                            for (Y in ha = d, p) {
                              if (E = Y.split(" "), E[0] === U || "*" === E[0]) {
                                if (ha = p[E[1] + " " + L]) {
                                  Y = p[Y];
                                  !0 === Y ? P = ha : !0 === ha && (P = Y);
                                  break;
                                }
                              }
                            }
                          }
                          P || ha || e.error("No conversion from " + M.replace(" ", " to "));
                          !0 !== P && (g = P ? P(g) : ha(Y(g)));
                        }
                      }
                    }
                    A = g;
                    x = "success";
                    k = !0;
                  } catch (ua) {
                    x = "parsererror", r = ua;
                  }
                }
              } else {
                if (r = x, !x || a) {
                  x = "error", 0 > a && (a = 0);
                }
              }
              B.status = a;
              B.statusText = "" + (b || x);
              k ? n.resolveWith(m, [A, x, B]) : n.rejectWith(m, [B, x, r]);
              B.statusCode(t);
              t = d;
              S && f.trigger("ajax" + (k ? "Success" : "Error"), [B, h, k ? A : r]);
              l.fireWith(m, [B, x]);
              S && (f.trigger("ajaxComplete", [B, h]), --e.active || e.event.trigger("ajaxStop"));
            }
          }
          "object" === typeof a && (b = a, a = d);
          b = b || {};
          var h = e.ajaxSetup({}, b), m = h.context || h, f = m !== h && (m.nodeType || m instanceof e) ? e(m) : e.event, n = e.Deferred(), l = e.Callbacks("once memory"), t = h.statusCode || {}, v, k = {}, A = {}, y, w, R, J, I, D = 0, S, q, B = {readyState:0, setRequestHeader:function(a, g) {
            if (!D) {
              var b = a.toLowerCase();
              a = A[b] = A[b] || a;
              k[a] = g;
            }
            return this;
          }, getAllResponseHeaders:function() {
            return 2 === D ? y : null;
          }, getResponseHeader:function(a) {
            var g;
            if (2 === D) {
              if (!w) {
                for (w = {};g = Fb.exec(y);) {
                  w[g[1].toLowerCase()] = g[2];
                }
              }
              g = w[a.toLowerCase()];
            }
            return g === d ? null : g;
          }, overrideMimeType:function(a) {
            D || (h.mimeType = a);
            return this;
          }, abort:function(a) {
            a = a || "abort";
            R && R.abort(a);
            c(0, a);
            return this;
          }};
          n.promise(B);
          B.success = B.done;
          B.error = B.fail;
          B.complete = l.add;
          B.statusCode = function(a) {
            if (a) {
              var g;
              if (2 > D) {
                for (g in a) {
                  t[g] = [t[g], a[g]];
                }
              } else {
                g = a[B.status], B.then(g, g);
              }
            }
            return this;
          };
          h.url = ((a || h.url) + "").replace(Eb, "").replace(Ib, la[1] + "//");
          h.dataTypes = e.trim(h.dataType || "*").toLowerCase().split(Ia);
          null == h.crossDomain && (I = Xa.exec(h.url.toLowerCase()), h.crossDomain = !(!I || I[1] == la[1] && I[2] == la[2] && (I[3] || ("http:" === I[1] ? 80 : 443)) == (la[3] || ("http:" === la[1] ? 80 : 443))));
          h.data && h.processData && "string" !== typeof h.data && (h.data = e.param(h.data, h.traditional));
          x(ya, h, b, B);
          if (2 === D) {
            return !1;
          }
          S = h.global;
          h.type = h.type.toUpperCase();
          h.hasContent = !Hb.test(h.type);
          S && 0 === e.active++ && e.event.trigger("ajaxStart");
          if (!h.hasContent && (h.data && (h.url += (Wa.test(h.url) ? "&" : "?") + h.data, delete h.data), v = h.url, !1 === h.cache)) {
            I = e.now();
            var G = h.url.replace(Lb, "$1_=" + I);
            h.url = G + (G === h.url ? (Wa.test(h.url) ? "&" : "?") + "_=" + I : "");
          }
          (h.data && h.hasContent && !1 !== h.contentType || b.contentType) && B.setRequestHeader("Content-Type", h.contentType);
          h.ifModified && (v = v || h.url, e.lastModified[v] && B.setRequestHeader("If-Modified-Since", e.lastModified[v]), e.etag[v] && B.setRequestHeader("If-None-Match", e.etag[v]));
          B.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + $a + "; q=0.01" : "") : h.accepts["*"]);
          for (q in h.headers) {
            B.setRequestHeader(q, h.headers[q]);
          }
          if (h.beforeSend && (!1 === h.beforeSend.call(m, B, h) || 2 === D)) {
            return B.abort(), !1;
          }
          for (q in{success:1, error:1, complete:1}) {
            B[q](h[q]);
          }
          if (R = x(Za, h, b, B)) {
            B.readyState = 1;
            S && f.trigger("ajaxSend", [B, h]);
            h.async && 0 < h.timeout && (J = setTimeout(function() {
              B.abort("timeout");
            }, h.timeout));
            try {
              D = 1, R.send(k, c);
            } catch (O) {
              if (2 > D) {
                c(-1, O);
              } else {
                throw O;
              }
            }
          } else {
            c(-1, "No Transport");
          }
          return B;
        }, param:function(a, b) {
          var c = [], h = function(a, g) {
            g = e.isFunction(g) ? g() : g;
            c[c.length] = encodeURIComponent(a) + "=" + encodeURIComponent(g);
          };
          b === d && (b = e.ajaxSettings.traditional);
          if (e.isArray(a) || a.jquery && !e.isPlainObject(a)) {
            e.each(a, function() {
              h(this.name, this.value);
            });
          } else {
            for (var m in a) {
              I(m, a[m], b, h);
            }
          }
          return c.join("&").replace(Db, "+");
        }});
        e.extend({active:0, lastModified:{}, etag:{}});
        var Mb = e.now(), va = /(\=)\?(&|$)|\?\?/i;
        e.ajaxSetup({jsonp:"callback", jsonpCallback:function() {
          return e.expando + "_" + Mb++;
        }});
        e.ajaxPrefilter("json jsonp", function(a, b, h) {
          b = "string" === typeof a.data && /^application\/x\-www\-form\-urlencoded/.test(a.contentType);
          if ("jsonp" === a.dataTypes[0] || !1 !== a.jsonp && (va.test(a.url) || b && va.test(a.data))) {
            var d, m = a.jsonpCallback = e.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, f = c[m], n = a.url, t = a.data, x = "$1" + m + "$2";
            !1 !== a.jsonp && (n = n.replace(va, x), a.url === n && (b && (t = t.replace(va, x)), a.data === t && (n += (/\?/.test(n) ? "&" : "?") + a.jsonp + "=" + m)));
            a.url = n;
            a.data = t;
            c[m] = function(a) {
              d = [a];
            };
            h.always(function() {
              c[m] = f;
              if (d && e.isFunction(f)) {
                c[m](d[0]);
              }
            });
            a.converters["script json"] = function() {
              d || e.error(m + " was not called");
              return d[0];
            };
            a.dataTypes[0] = "json";
            return "script";
          }
        });
        e.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents:{script:/javascript|ecmascript/}, converters:{"text script":function(a) {
          e.globalEval(a);
          return a;
        }}});
        e.ajaxPrefilter("script", function(a) {
          a.cache === d && (a.cache = !1);
          a.crossDomain && (a.type = "GET", a.global = !1);
        });
        e.ajaxTransport("script", function(a) {
          if (a.crossDomain) {
            var b, e = h.head || h.getElementsByTagName("head")[0] || h.documentElement;
            return {send:function(c, m) {
              b = h.createElement("script");
              b.async = "async";
              a.scriptCharset && (b.charset = a.scriptCharset);
              b.src = a.url;
              b.onload = b.onreadystatechange = function(a, g) {
                if (g || !b.readyState || /loaded|complete/.test(b.readyState)) {
                  b.onload = b.onreadystatechange = null, e && b.parentNode && e.removeChild(b), b = d, g || m(200, "success");
                }
              };
              e.insertBefore(b, e.firstChild);
            }, abort:function() {
              if (b) {
                b.onload(0, 1);
              }
            }};
          }
        });
        var Ga = c.ActiveXObject ? function() {
          for (var a in qa) {
            qa[a](0, 1);
          }
        } : !1, Nb = 0, qa;
        e.ajaxSettings.xhr = c.ActiveXObject ? function() {
          var a;
          if (!(a = !this.isLocal && J())) {
            a: {
              try {
                a = new c.ActiveXObject("Microsoft.XMLHTTP");
                break a;
              } catch (b) {
              }
              a = void 0;
            }
          }
          return a;
        } : J;
        (function(a) {
          e.extend(e.support, {ajax:!!a, cors:!!a && "withCredentials" in a});
        })(e.ajaxSettings.xhr());
        e.support.ajax && e.ajaxTransport(function(a) {
          if (!a.crossDomain || e.support.cors) {
            var b;
            return {send:function(h, m) {
              var f = a.xhr(), n, t;
              a.username ? f.open(a.type, a.url, a.async, a.username, a.password) : f.open(a.type, a.url, a.async);
              if (a.xhrFields) {
                for (t in a.xhrFields) {
                  f[t] = a.xhrFields[t];
                }
              }
              a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType);
              a.crossDomain || h["X-Requested-With"] || (h["X-Requested-With"] = "XMLHttpRequest");
              try {
                for (t in h) {
                  f.setRequestHeader(t, h[t]);
                }
              } catch (x) {
              }
              f.send(a.hasContent && a.data || null);
              b = function(c, h) {
                var l, t, x, v, k;
                try {
                  if (b && (h || 4 === f.readyState)) {
                    if (b = d, n && (f.onreadystatechange = e.noop, Ga && delete qa[n]), h) {
                      4 !== f.readyState && f.abort();
                    } else {
                      l = f.status;
                      x = f.getAllResponseHeaders();
                      v = {};
                      (k = f.responseXML) && k.documentElement && (v.xml = k);
                      try {
                        v.text = f.responseText;
                      } catch (A) {
                      }
                      try {
                        t = f.statusText;
                      } catch (A) {
                        t = "";
                      }
                      l || !a.isLocal || a.crossDomain ? 1223 === l && (l = 204) : l = v.text ? 200 : 404;
                    }
                  }
                } catch (A) {
                  h || m(-1, A);
                }
                v && m(l, t, v, x);
              };
              a.async && 4 !== f.readyState ? (n = ++Nb, Ga && (qa || (qa = {}, e(c).unload(Ga)), qa[n] = b), f.onreadystatechange = b) : b();
            }, abort:function() {
              b && b(0, 1);
            }};
          }
        });
        var za = {}, da, oa, Ob = /^(?:toggle|show|hide)$/, Pb = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, wa, sa = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], ra;
        e.fn.extend({show:function(a, b, c) {
          if (a || 0 === a) {
            return this.animate(y("show", 3), a, b, c);
          }
          c = 0;
          for (var h = this.length;c < h;c++) {
            a = this[c], a.style && (b = a.style.display, e._data(a, "olddisplay") || "none" !== b || (b = a.style.display = ""), ("" === b && "none" === e.css(a, "display") || !e.contains(a.ownerDocument.documentElement, a)) && e._data(a, "olddisplay", n(a.nodeName)));
          }
          for (c = 0;c < h;c++) {
            if (a = this[c], a.style && (b = a.style.display, "" === b || "none" === b)) {
              a.style.display = e._data(a, "olddisplay") || "";
            }
          }
          return this;
        }, hide:function(a, b, c) {
          if (a || 0 === a) {
            return this.animate(y("hide", 3), a, b, c);
          }
          c = 0;
          for (var h = this.length;c < h;c++) {
            a = this[c], a.style && (b = e.css(a, "display"), "none" === b || e._data(a, "olddisplay") || e._data(a, "olddisplay", b));
          }
          for (c = 0;c < h;c++) {
            this[c].style && (this[c].style.display = "none");
          }
          return this;
        }, _toggle:e.fn.toggle, toggle:function(a, b, c) {
          var h = "boolean" === typeof a;
          e.isFunction(a) && e.isFunction(b) ? this._toggle.apply(this, arguments) : null == a || h ? this.each(function() {
            var b = h ? a : e(this).is(":hidden");
            e(this)[b ? "show" : "hide"]();
          }) : this.animate(y("toggle", 3), a, b, c);
          return this;
        }, fadeTo:function(a, b, e, c) {
          return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity:b}, a, e, c);
        }, animate:function(a, b, c, h) {
          function d() {
            !1 === m.queue && e._mark(this);
            var b = e.extend({}, m), c = 1 === this.nodeType, h = c && e(this).is(":hidden"), f, l, t, x, v;
            b.animatedProperties = {};
            for (t in a) {
              if (f = e.camelCase(t), t !== f && (a[f] = a[t], delete a[t]), (l = e.cssHooks[f]) && "expand" in l) {
                for (t in x = l.expand(a[f]), delete a[f], x) {
                  t in a || (a[t] = x[t]);
                }
              }
            }
            for (f in a) {
              l = a[f];
              e.isArray(l) ? (b.animatedProperties[f] = l[1], l = a[f] = l[0]) : b.animatedProperties[f] = b.specialEasing && b.specialEasing[f] || b.easing || "swing";
              if ("hide" === l && h || "show" === l && !h) {
                return b.complete.call(this);
              }
              !c || "height" !== f && "width" !== f || (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], "inline" === e.css(this, "display") && "none" === e.css(this, "float") && (e.support.inlineBlockNeedsLayout && "inline" !== n(this.nodeName) ? this.style.zoom = 1 : this.style.display = "inline-block"));
            }
            null != b.overflow && (this.style.overflow = "hidden");
            for (t in a) {
              if (c = new e.fx(this, b, t), l = a[t], Ob.test(l)) {
                if (f = e._data(this, "toggle" + t) || ("toggle" === l ? h ? "show" : "hide" : 0)) {
                  e._data(this, "toggle" + t, "show" === f ? "hide" : "show"), c[f]();
                } else {
                  c[l]();
                }
              } else {
                f = Pb.exec(l), x = c.cur(), f ? (l = parseFloat(f[2]), v = f[3] || (e.cssNumber[t] ? "" : "px"), "px" !== v && (e.style(this, t, (l || 1) + v), x *= (l || 1) / c.cur(), e.style(this, t, x + v)), f[1] && (l = ("-=" === f[1] ? -1 : 1) * l + x), c.custom(x, l, v)) : c.custom(x, l, "");
              }
            }
            return !0;
          }
          var m = e.speed(b, c, h);
          if (e.isEmptyObject(a)) {
            return this.each(m.complete, [!1]);
          }
          a = e.extend({}, a);
          return !1 === m.queue ? this.each(d) : this.queue(m.queue, d);
        }, stop:function(a, b, c) {
          "string" !== typeof a && (c = b, b = a, a = d);
          b && !1 !== a && this.queue(a || "fx", []);
          return this.each(function() {
            var b, h = !1, d = e.timers, m = e._data(this);
            c || e._unmark(!0, this);
            if (null == a) {
              for (b in m) {
                if (m[b] && m[b].stop && b.indexOf(".run") === b.length - 4) {
                  var f = m[b];
                  e.removeData(this, b, !0);
                  f.stop(c);
                }
              }
            } else {
              m[b = a + ".run"] && m[b].stop && (m = m[b], e.removeData(this, b, !0), m.stop(c));
            }
            for (b = d.length;b--;) {
              if (d[b].elem === this && (null == a || d[b].queue === a)) {
                if (c) {
                  d[b](!0);
                } else {
                  d[b].saveState();
                }
                h = !0;
                d.splice(b, 1);
              }
            }
            c && h || e.dequeue(this, a);
          });
        }});
        e.each({slideDown:y("show", 1), slideUp:y("hide", 1), slideToggle:y("toggle", 1), fadeIn:{opacity:"show"}, fadeOut:{opacity:"hide"}, fadeToggle:{opacity:"toggle"}}, function(a, b) {
          e.fn[a] = function(a, e, g) {
            return this.animate(b, a, e, g);
          };
        });
        e.extend({speed:function(a) {
          function b(e, c, h) {
            return a.apply(this, arguments);
          }
          b.toString = function() {
            return a.toString();
          };
          return b;
        }(function(a, b, c) {
          var h = a && "object" === typeof a ? e.extend({}, a) : {complete:c || !c && b || e.isFunction(a) && a, duration:a, easing:c && b || b && !e.isFunction(b) && b};
          h.duration = e.fx.off ? 0 : "number" === typeof h.duration ? h.duration : h.duration in e.fx.speeds ? e.fx.speeds[h.duration] : e.fx.speeds._default;
          if (null == h.queue || !0 === h.queue) {
            h.queue = "fx";
          }
          h.old = h.complete;
          h.complete = function(a) {
            e.isFunction(h.old) && h.old.call(this);
            h.queue ? e.dequeue(this, h.queue) : !1 !== a && e._unmark(this);
          };
          return h;
        }), easing:{linear:function(a) {
          return a;
        }, swing:function(a) {
          return -Math.cos(a * Math.PI) / 2 + .5;
        }}, timers:[], fx:function(a, b, e) {
          this.options = b;
          this.elem = a;
          this.prop = e;
          b.orig = b.orig || {};
        }});
        e.fx.prototype = {update:function() {
          this.options.step && this.options.step.call(this.elem, this.now, this);
          (e.fx.step[this.prop] || e.fx.step._default)(this);
        }, cur:function() {
          if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop])) {
            return this.elem[this.prop];
          }
          var a, b = e.css(this.elem, this.prop);
          return isNaN(a = parseFloat(b)) ? b && "auto" !== b ? b : 0 : a;
        }, custom:function(a, b, c) {
          function h(a) {
            return m.step(a);
          }
          var m = this, f = e.fx;
          this.startTime = ra || S();
          this.end = b;
          this.now = this.start = a;
          this.pos = this.state = 0;
          this.unit = c || this.unit || (e.cssNumber[this.prop] ? "" : "px");
          h.queue = this.options.queue;
          h.elem = this.elem;
          h.saveState = function() {
            e._data(m.elem, "fxshow" + m.prop) === d && (m.options.hide ? e._data(m.elem, "fxshow" + m.prop, m.start) : m.options.show && e._data(m.elem, "fxshow" + m.prop, m.end));
          };
          h() && e.timers.push(h) && !wa && (wa = setInterval(f.tick, f.interval));
        }, show:function() {
          var a = e._data(this.elem, "fxshow" + this.prop);
          this.options.orig[this.prop] = a || e.style(this.elem, this.prop);
          this.options.show = !0;
          a !== d ? this.custom(this.cur(), a) : this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur());
          e(this.elem).show();
        }, hide:function() {
          this.options.orig[this.prop] = e._data(this.elem, "fxshow" + this.prop) || e.style(this.elem, this.prop);
          this.options.hide = !0;
          this.custom(this.cur(), 0);
        }, step:function(a) {
          var b, c = ra || S(), h = !0, d = this.elem, m = this.options;
          if (a || c >= m.duration + this.startTime) {
            this.now = this.end;
            this.pos = this.state = 1;
            this.update();
            m.animatedProperties[this.prop] = !0;
            for (b in m.animatedProperties) {
              !0 !== m.animatedProperties[b] && (h = !1);
            }
            if (h) {
              null == m.overflow || e.support.shrinkWrapBlocks || e.each(["", "X", "Y"], function(a, b) {
                d.style["overflow" + b] = m.overflow[a];
              });
              m.hide && e(d).hide();
              if (m.hide || m.show) {
                for (b in m.animatedProperties) {
                  e.style(d, b, m.orig[b]), e.removeData(d, "fxshow" + b, !0), e.removeData(d, "toggle" + b, !0);
                }
              }
              if (a = m.complete) {
                m.complete = !1, a.call(d);
              }
            }
            return !1;
          }
          Infinity == m.duration ? this.now = c : (a = c - this.startTime, this.state = a / m.duration, this.pos = e.easing[m.animatedProperties[this.prop]](this.state, a, 0, 1, m.duration), this.now = this.start + (this.end - this.start) * this.pos);
          this.update();
          return !0;
        }};
        e.extend(e.fx, {tick:function() {
          for (var a, b = e.timers, c = 0;c < b.length;c++) {
            a = b[c], a() || b[c] !== a || b.splice(c--, 1);
          }
          b.length || e.fx.stop();
        }, interval:13, stop:function() {
          clearInterval(wa);
          wa = null;
        }, speeds:{slow:600, fast:200, _default:400}, step:{opacity:function(a) {
          e.style(a.elem, "opacity", a.now);
        }, _default:function(a) {
          a.elem.style && null != a.elem.style[a.prop] ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now;
        }}});
        e.each(sa.concat.apply([], sa), function(a, b) {
          b.indexOf("margin") && (e.fx.step[b] = function(a) {
            e.style(a.elem, b, Math.max(0, a.now) + a.unit);
          });
        });
        e.expr && e.expr.filters && (e.expr.filters.animated = function(a) {
          return e.grep(e.timers, function(b) {
            return a === b.elem;
          }).length;
        });
        var ab, Qb = /^t(?:able|d|h)$/i, bb = /^(?:body|html)$/i;
        ab = "getBoundingClientRect" in h.documentElement ? function(a, b, c, h) {
          try {
            h = a.getBoundingClientRect();
          } catch (d) {
          }
          if (!h || !e.contains(c, a)) {
            return h ? {top:h.top, left:h.left} : {top:0, left:0};
          }
          a = b.body;
          b = D(b);
          return {top:h.top + (b.pageYOffset || e.support.boxModel && c.scrollTop || a.scrollTop) - (c.clientTop || a.clientTop || 0), left:h.left + (b.pageXOffset || e.support.boxModel && c.scrollLeft || a.scrollLeft) - (c.clientLeft || a.clientLeft || 0)};
        } : function(a, b, c) {
          var h, d = a.offsetParent, m = b.body;
          h = (b = b.defaultView) ? b.getComputedStyle(a, null) : a.currentStyle;
          for (var f = a.offsetTop, n = a.offsetLeft;(a = a.parentNode) && a !== m && a !== c && (!e.support.fixedPosition || "fixed" !== h.position);) {
            h = b ? b.getComputedStyle(a, null) : a.currentStyle, f -= a.scrollTop, n -= a.scrollLeft, a === d && (f += a.offsetTop, n += a.offsetLeft, !e.support.doesNotAddBorder || e.support.doesAddBorderForTableAndCells && Qb.test(a.nodeName) || (f += parseFloat(h.borderTopWidth) || 0, n += parseFloat(h.borderLeftWidth) || 0), d = a.offsetParent), e.support.subtractsBorderForOverflowNotVisible && "visible" !== h.overflow && (f += parseFloat(h.borderTopWidth) || 0, n += parseFloat(h.borderLeftWidth) || 
            0);
          }
          if ("relative" === h.position || "static" === h.position) {
            f += m.offsetTop, n += m.offsetLeft;
          }
          e.support.fixedPosition && "fixed" === h.position && (f += Math.max(c.scrollTop, m.scrollTop), n += Math.max(c.scrollLeft, m.scrollLeft));
          return {top:f, left:n};
        };
        e.fn.offset = function(a) {
          if (arguments.length) {
            return a === d ? this : this.each(function(b) {
              e.offset.setOffset(this, a, b);
            });
          }
          var b = this[0], c = b && b.ownerDocument;
          return c ? b === c.body ? e.offset.bodyOffset(b) : ab(b, c, c.documentElement) : null;
        };
        e.offset = {bodyOffset:function(a) {
          var b = a.offsetTop, c = a.offsetLeft;
          e.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(e.css(a, "marginTop")) || 0, c += parseFloat(e.css(a, "marginLeft")) || 0);
          return {top:b, left:c};
        }, setOffset:function(a, b, c) {
          var h = e.css(a, "position");
          "static" === h && (a.style.position = "relative");
          var d = e(a), m = d.offset(), f = e.css(a, "top"), n = e.css(a, "left"), l = {}, t = {};
          ("absolute" === h || "fixed" === h) && -1 < e.inArray("auto", [f, n]) ? (t = d.position(), h = t.top, n = t.left) : (h = parseFloat(f) || 0, n = parseFloat(n) || 0);
          e.isFunction(b) && (b = b.call(a, c, m));
          null != b.top && (l.top = b.top - m.top + h);
          null != b.left && (l.left = b.left - m.left + n);
          "using" in b ? b.using.call(a, l) : d.css(l);
        }};
        e.fn.extend({position:function() {
          if (!this[0]) {
            return null;
          }
          var a = this[0], b = this.offsetParent(), c = this.offset(), h = bb.test(b[0].nodeName) ? {top:0, left:0} : b.offset();
          c.top -= parseFloat(e.css(a, "marginTop")) || 0;
          c.left -= parseFloat(e.css(a, "marginLeft")) || 0;
          h.top += parseFloat(e.css(b[0], "borderTopWidth")) || 0;
          h.left += parseFloat(e.css(b[0], "borderLeftWidth")) || 0;
          return {top:c.top - h.top, left:c.left - h.left};
        }, offsetParent:function() {
          return this.map(function() {
            for (var a = this.offsetParent || h.body;a && !bb.test(a.nodeName) && "static" === e.css(a, "position");) {
              a = a.offsetParent;
            }
            return a;
          });
        }});
        e.each({scrollLeft:"pageXOffset", scrollTop:"pageYOffset"}, function(a, b) {
          var c = /Y/.test(b);
          e.fn[a] = function(h) {
            return e.access(this, function(a, g, h) {
              var m = D(a);
              if (h === d) {
                return m ? b in m ? m[b] : e.support.boxModel && m.document.documentElement[g] || m.document.body[g] : a[g];
              }
              m ? m.scrollTo(c ? e(m).scrollLeft() : h, c ? h : e(m).scrollTop()) : a[g] = h;
            }, a, h, arguments.length, null);
          };
        });
        e.each({Height:"height", Width:"width"}, function(a, b) {
          var c = "client" + a, h = "scroll" + a, m = "offset" + a;
          e.fn["inner" + a] = function() {
            var a = this[0];
            return a ? a.style ? parseFloat(e.css(a, b, "padding")) : this[b]() : null;
          };
          e.fn["outer" + a] = function(a) {
            var g = this[0];
            return g ? g.style ? parseFloat(e.css(g, b, a ? "margin" : "border")) : this[b]() : null;
          };
          e.fn[b] = function(a) {
            return e.access(this, function(a, b, g) {
              if (e.isWindow(a)) {
                return b = a.document, a = b.documentElement[c], e.support.boxModel && a || b.body && b.body[c] || a;
              }
              if (9 === a.nodeType) {
                return b = a.documentElement, b[c] >= b[h] ? b[c] : Math.max(a.body[h], b[h], a.body[m], b[m]);
              }
              if (g === d) {
                return a = e.css(a, b), b = parseFloat(a), e.isNumeric(b) ? b : a;
              }
              e(a).css(b, g);
            }, b, a, arguments.length, null);
          };
        });
        c.jQuery = c.$ = e;
        p(52) && p(52).jQuery && !(b = [], f = function() {
          return e;
        }.apply(u, b), f !== d && (z.exports = f));
      })(c);
      c.jQuery.noConflict();
      return c.jQuery;
    }
    z.exports = k("undefined" === typeof window ? void 0 : window);
    z.exports.create = k;
  })();
}, , function(z, u, p) {
  z.exports = function(b) {
    b.extenders.persist = function(b, k) {
      var c = b();
      if (k && null !== localStorage.getItem(k)) {
        try {
          c = JSON.parse(localStorage.getItem(k));
        } catch (l) {
        }
      }
      b(c);
      b.reload = function() {
        if (k && localStorage.hasOwnProperty(k)) {
          try {
            b(JSON.parse(localStorage.getItem(k)));
          } catch (c) {
          }
        }
        return b;
      };
      b.persistKey = k;
      b.subscribe(function(b) {
        localStorage.setItem(k, JSON.stringify(b));
      });
      return b;
    };
  };
}, function(z, u, p) {
  z = p(67);
  (function(b, f) {
    function k(f, d) {
      var k = f.nodeName.toLowerCase();
      if ("area" === k) {
        d = f.parentNode;
        k = d.name;
        if (!f.href || !k || "map" !== d.nodeName.toLowerCase()) {
          return !1;
        }
        f = b("img[usemap=#" + k + "]")[0];
        return !!f && c(f);
      }
      return (/input|select|textarea|button|object/.test(k) ? !f.disabled : "a" == k ? f.href || d : d) && c(f);
    }
    function c(c) {
      return !b(c).parents().andSelf().filter(function() {
        return "hidden" === b.curCSS(this, "visibility") || b.expr.filters.hidden(this);
      }).length;
    }
    b.ui = b.ui || {};
    b.ui.version || (b.extend(b.ui, {version:"1.8.16", keyCode:{ALT:18, BACKSPACE:8, CAPS_LOCK:20, COMMA:188, COMMAND:91, COMMAND_LEFT:91, COMMAND_RIGHT:93, CONTROL:17, DELETE:46, DOWN:40, END:35, ENTER:13, ESCAPE:27, HOME:36, INSERT:45, LEFT:37, MENU:93, NUMPAD_ADD:107, NUMPAD_DECIMAL:110, NUMPAD_DIVIDE:111, NUMPAD_ENTER:108, NUMPAD_MULTIPLY:106, NUMPAD_SUBTRACT:109, PAGE_DOWN:34, PAGE_UP:33, PERIOD:190, RIGHT:39, SHIFT:16, SPACE:32, TAB:9, UP:38, WINDOWS:91}}), b.fn.extend({propAttr:b.fn.prop || 
    b.fn.attr, _focus:b.fn.focus, focus:function(c, d) {
      return "number" === typeof c ? this.each(function() {
        var f = this;
        setTimeout(function() {
          b(f).focus();
          d && d.call(f);
        }, c);
      }) : this._focus.apply(this, arguments);
    }, scrollParent:function() {
      var c;
      c = b.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
        return /(relative|absolute|fixed)/.test(b.curCSS(this, "position", 1)) && /(auto|scroll)/.test(b.curCSS(this, "overflow", 1) + b.curCSS(this, "overflow-y", 1) + b.curCSS(this, "overflow-x", 1));
      }).eq(0) : this.parents().filter(function() {
        return /(auto|scroll)/.test(b.curCSS(this, "overflow", 1) + b.curCSS(this, "overflow-y", 1) + b.curCSS(this, "overflow-x", 1));
      }).eq(0);
      return /fixed/.test(this.css("position")) || !c.length ? b(document) : c;
    }, zIndex:function(c) {
      if (c !== f) {
        return this.css("zIndex", c);
      }
      if (this.length) {
        c = b(this[0]);
        for (var d;c.length && c[0] !== document;) {
          d = c.css("position");
          if ("absolute" === d || "relative" === d || "fixed" === d) {
            if (d = parseInt(c.css("zIndex"), 10), !isNaN(d) && 0 !== d) {
              return d;
            }
          }
          c = c.parent();
        }
      }
      return 0;
    }, disableSelection:function() {
      return this.bind((b.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(b) {
        b.preventDefault();
      });
    }, enableSelection:function() {
      return this.unbind(".ui-disableSelection");
    }}), b.each(["Width", "Height"], function(c, d) {
      function k(c, d, f, l) {
        b.each(q, function() {
          d -= parseFloat(b.curCSS(c, "padding" + this, !0)) || 0;
          f && (d -= parseFloat(b.curCSS(c, "border" + this + "Width", !0)) || 0);
          l && (d -= parseFloat(b.curCSS(c, "margin" + this, !0)) || 0);
        });
        return d;
      }
      var q = "Width" === d ? ["Left", "Right"] : ["Top", "Bottom"], p = d.toLowerCase(), u = {innerWidth:b.fn.innerWidth, innerHeight:b.fn.innerHeight, outerWidth:b.fn.outerWidth, outerHeight:b.fn.outerHeight};
      b.fn["inner" + d] = function(c) {
        return c === f ? u["inner" + d].call(this) : this.each(function() {
          b(this).css(p, k(this, c) + "px");
        });
      };
      b.fn["outer" + d] = function(c, f) {
        return "number" !== typeof c ? u["outer" + d].call(this, c) : this.each(function() {
          b(this).css(p, k(this, c, !0, f) + "px");
        });
      };
    }), b.extend(b.expr[":"], {data:function(c, d, f) {
      return !!b.data(c, f[3]);
    }, focusable:function(c) {
      return k(c, !isNaN(b.attr(c, "tabindex")));
    }, tabbable:function(c) {
      var d = b.attr(c, "tabindex"), f = isNaN(d);
      return (f || 0 <= d) && k(c, !f);
    }}), b(function() {
      var c = document.body, d = c.appendChild(d = document.createElement("div"));
      b.extend(d.style, {minHeight:"100px", height:"auto", padding:0, borderWidth:0});
      b.support.minHeight = 100 === d.offsetHeight;
      b.support.selectstart = "onselectstart" in d;
      c.removeChild(d).style.display = "none";
    }), b.extend(b.ui, {plugin:{add:function(c, d, f) {
      c = b.ui[c].prototype;
      for (var k in f) {
        c.plugins[k] = c.plugins[k] || [], c.plugins[k].push([d, f[k]]);
      }
    }, call:function(b, c, f) {
      if ((c = b.plugins[c]) && b.element[0].parentNode) {
        for (var k = 0;k < c.length;k++) {
          b.options[c[k][0]] && c[k][1].apply(b.element, f);
        }
      }
    }}, contains:function(b, c) {
      return document.compareDocumentPosition ? b.compareDocumentPosition(c) & 16 : b !== c && b.contains(c);
    }, hasScroll:function(c, d) {
      if ("hidden" === b(c).css("overflow")) {
        return !1;
      }
      d = d && "left" === d ? "scrollLeft" : "scrollTop";
      var f = !1;
      if (0 < c[d]) {
        return !0;
      }
      c[d] = 1;
      f = 0 < c[d];
      c[d] = 0;
      return f;
    }, isOverAxis:function(b, c, f) {
      return b > c && b < c + f;
    }, isOver:function(c, d, f, k, p, u) {
      return b.ui.isOverAxis(c, f, p) && b.ui.isOverAxis(d, k, u);
    }}));
  })(z);
  (function(b, f) {
    if (b.cleanData) {
      var k = b.cleanData;
      b.cleanData = function(c) {
        for (var d = 0, f;null != (f = c[d]);d++) {
          try {
            b(f).triggerHandler("remove");
          } catch (q) {
          }
        }
        k(c);
      };
    } else {
      var c = b.fn.remove;
      b.fn.remove = function(f, d) {
        return this.each(function() {
          d || f && !b.filter(f, [this]).length || b("*", this).add([this]).each(function() {
            try {
              b(this).triggerHandler("remove");
            } catch (c) {
            }
          });
          return c.call(b(this), f, d);
        });
      };
    }
    b.widget = function(c, d, f) {
      var k = c.split(".")[0], p;
      c = c.split(".")[1];
      p = k + "-" + c;
      f || (f = d, d = b.Widget);
      b.expr[":"][p] = function(d) {
        return !!b.data(d, c);
      };
      b[k] = b[k] || {};
      b[k][c] = function(b, c) {
        arguments.length && this._createWidget(b, c);
      };
      d = new d;
      d.options = b.extend(!0, {}, d.options);
      b[k][c].prototype = b.extend(!0, d, {namespace:k, widgetName:c, widgetEventPrefix:b[k][c].prototype.widgetEventPrefix || c, widgetBaseClass:p}, f);
      b.widget.bridge(c, b[k][c]);
    };
    b.widget.bridge = function(c, d) {
      b.fn[c] = function(k) {
        var q = "string" === typeof k, p = Array.prototype.slice.call(arguments, 1), u = this;
        k = !q && p.length ? b.extend.apply(null, [!0, k].concat(p)) : k;
        if (q && "_" === k.charAt(0)) {
          return u;
        }
        q ? this.each(function() {
          var d = b.data(this, c), q = d && b.isFunction(d[k]) ? d[k].apply(d, p) : d;
          if (q !== d && q !== f) {
            return u = q, !1;
          }
        }) : this.each(function() {
          var f = b.data(this, c);
          f ? f.option(k || {})._init() : b.data(this, c, new d(k, this));
        });
        return u;
      };
    };
    b.Widget = function(b, c) {
      arguments.length && this._createWidget(b, c);
    };
    b.Widget.prototype = {widgetName:"widget", widgetEventPrefix:"", options:{disabled:!1}, _createWidget:function(c, d) {
      b.data(d, this.widgetName, this);
      this.element = b(d);
      this.options = b.extend(!0, {}, this.options, this._getCreateOptions(), c);
      var f = this;
      this.element.bind("remove." + this.widgetName, function() {
        f.destroy();
      });
      this._create();
      this._trigger("create");
      this._init();
    }, _getCreateOptions:function() {
      return b.metadata && b.metadata.get(this.element[0])[this.widgetName];
    }, _create:function() {
    }, _init:function() {
    }, destroy:function() {
      this.element.unbind("." + this.widgetName).removeData(this.widgetName);
      this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled");
    }, widget:function() {
      return this.element;
    }, option:function(c, d) {
      var k = c;
      if (0 === arguments.length) {
        return b.extend({}, this.options);
      }
      if ("string" === typeof c) {
        if (d === f) {
          return this.options[c];
        }
        k = {};
        k[c] = d;
      }
      this._setOptions(k);
      return this;
    }, _setOptions:function(c) {
      var d = this;
      b.each(c, function(b, c) {
        d._setOption(b, c);
      });
      return this;
    }, _setOption:function(b, c) {
      this.options[b] = c;
      "disabled" === b && this.widget()[c ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", c);
      return this;
    }, enable:function() {
      return this._setOption("disabled", !1);
    }, disable:function() {
      return this._setOption("disabled", !0);
    }, _trigger:function(c, d, f) {
      var k = this.options[c];
      d = b.Event(d);
      d.type = (c === this.widgetEventPrefix ? c : this.widgetEventPrefix + c).toLowerCase();
      f = f || {};
      if (d.originalEvent) {
        c = b.event.props.length;
        for (var p;c;) {
          p = b.event.props[--c], d[p] = d.originalEvent[p];
        }
      }
      this.element.trigger(d, f);
      return !(b.isFunction(k) && !1 === k.call(this.element[0], d, f) || d.isDefaultPrevented());
    }};
  })(z);
  (function(b) {
    var f = !1;
    b(document).mouseup(function() {
      f = !1;
    });
    b.widget("ui.mouse", {options:{cancel:":input,option", distance:1, delay:0}, _mouseInit:function() {
      var f = this;
      this.element.bind("mousedown." + this.widgetName, function(b) {
        return f._mouseDown(b);
      }).bind("click." + this.widgetName, function(c) {
        if (!0 === b.data(c.target, f.widgetName + ".preventClickEvent")) {
          return b.removeData(c.target, f.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1;
        }
      });
      this.started = !1;
    }, _mouseDestroy:function() {
      this.element.unbind("." + this.widgetName);
    }, _mouseDown:function(k) {
      if (!f) {
        this._mouseStarted && this._mouseUp(k);
        this._mouseDownEvent = k;
        var c = this, l = 1 == k.which, d = "string" == typeof this.options.cancel && k.target.nodeName ? b(k.target).closest(this.options.cancel).length : !1;
        if (!l || d || !this._mouseCapture(k)) {
          return !0;
        }
        this.mouseDelayMet = !this.options.delay;
        this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
          c.mouseDelayMet = !0;
        }, this.options.delay));
        if (this._mouseDistanceMet(k) && this._mouseDelayMet(k) && (this._mouseStarted = !1 !== this._mouseStart(k), !this._mouseStarted)) {
          return k.preventDefault(), !0;
        }
        !0 === b.data(k.target, this.widgetName + ".preventClickEvent") && b.removeData(k.target, this.widgetName + ".preventClickEvent");
        this._mouseMoveDelegate = function(b) {
          return c._mouseMove(b);
        };
        this._mouseUpDelegate = function(b) {
          return c._mouseUp(b);
        };
        b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
        k.preventDefault();
        return f = !0;
      }
    }, _mouseMove:function(f) {
      if (b.browser.msie && !(9 <= document.documentMode) && !f.button) {
        return this._mouseUp(f);
      }
      if (this._mouseStarted) {
        return this._mouseDrag(f), f.preventDefault();
      }
      this._mouseDistanceMet(f) && this._mouseDelayMet(f) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, f)) ? this._mouseDrag(f) : this._mouseUp(f));
      return !this._mouseStarted;
    }, _mouseUp:function(f) {
      b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      this._mouseStarted && (this._mouseStarted = !1, f.target == this._mouseDownEvent.target && b.data(f.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(f));
      return !1;
    }, _mouseDistanceMet:function(b) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - b.pageX), Math.abs(this._mouseDownEvent.pageY - b.pageY)) >= this.options.distance;
    }, _mouseDelayMet:function() {
      return this.mouseDelayMet;
    }, _mouseStart:function() {
    }, _mouseDrag:function() {
    }, _mouseStop:function() {
    }, _mouseCapture:function() {
      return !0;
    }});
  })(z);
  (function(b) {
    b.widget("ui.draggable", b.ui.mouse, {widgetEventPrefix:"drag", options:{addClasses:!0, appendTo:"parent", axis:!1, connectToSortable:!1, containment:!1, cursor:"auto", cursorAt:!1, grid:!1, handle:!1, helper:"original", iframeFix:!1, opacity:!1, refreshPositions:!1, revert:!1, revertDuration:500, scope:"default", scroll:!0, scrollSensitivity:20, scrollSpeed:20, snap:!1, snapMode:"both", snapTolerance:20, stack:!1, zIndex:!1}, _create:function() {
      "original" != this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
      this.options.addClasses && this.element.addClass("ui-draggable");
      this.options.disabled && this.element.addClass("ui-draggable-disabled");
      this._mouseInit();
    }, destroy:function() {
      if (this.element.data("draggable")) {
        return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this;
      }
    }, _mouseCapture:function(f) {
      var k = this.options;
      if (this.helper || k.disabled || b(f.target).is(".ui-resizable-handle")) {
        return !1;
      }
      this.handle = this._getHandle(f);
      if (!this.handle) {
        return !1;
      }
      k.iframeFix && b(!0 === k.iframeFix ? "iframe" : k.iframeFix).each(function() {
        b('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth + "px", height:this.offsetHeight + "px", position:"absolute", opacity:"0.001", zIndex:1E3}).css(b(this).offset()).appendTo("body");
      });
      return !0;
    }, _mouseStart:function(f) {
      var k = this.options;
      this.helper = this._createHelper(f);
      this._cacheHelperProportions();
      b.ui.ddmanager && (b.ui.ddmanager.current = this);
      this._cacheMargins();
      this.cssPosition = this.helper.css("position");
      this.scrollParent = this.helper.scrollParent();
      this.offset = this.positionAbs = this.element.offset();
      this.offset = {top:this.offset.top - this.margins.top, left:this.offset.left - this.margins.left};
      b.extend(this.offset, {click:{left:f.pageX - this.offset.left, top:f.pageY - this.offset.top}, parent:this._getParentOffset(), relative:this._getRelativeOffset()});
      this.originalPosition = this.position = this._generatePosition(f);
      this.originalPageX = f.pageX;
      this.originalPageY = f.pageY;
      k.cursorAt && this._adjustOffsetFromHelper(k.cursorAt);
      k.containment && this._setContainment();
      if (!1 === this._trigger("start", f)) {
        return this._clear(), !1;
      }
      this._cacheHelperProportions();
      b.ui.ddmanager && !k.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, f);
      this.helper.addClass("ui-draggable-dragging");
      this._mouseDrag(f, !0);
      b.ui.ddmanager && b.ui.ddmanager.dragStart(this, f);
      return !0;
    }, _mouseDrag:function(f, k) {
      this.position = this._generatePosition(f);
      this.positionAbs = this._convertPositionTo("absolute");
      if (!k) {
        k = this._uiHash();
        if (!1 === this._trigger("drag", f, k)) {
          return this._mouseUp({}), !1;
        }
        this.position = k.position;
      }
      this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px");
      this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px");
      b.ui.ddmanager && b.ui.ddmanager.drag(this, f);
      return !1;
    }, _mouseStop:function(f) {
      var k = !1;
      b.ui.ddmanager && !this.options.dropBehaviour && (k = b.ui.ddmanager.drop(this, f));
      this.dropped && (k = this.dropped, this.dropped = !1);
      if (!(this.element[0] && this.element[0].parentNode || "original" != this.options.helper)) {
        return !1;
      }
      if ("invalid" == this.options.revert && !k || "valid" == this.options.revert && k || !0 === this.options.revert || b.isFunction(this.options.revert) && this.options.revert.call(this.element, k)) {
        var c = this;
        b(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
          !1 !== c._trigger("stop", f) && c._clear();
        });
      } else {
        !1 !== this._trigger("stop", f) && this._clear();
      }
      return !1;
    }, _mouseUp:function(f) {
      !0 === this.options.iframeFix && b("div.ui-draggable-iframeFix").each(function() {
        this.parentNode.removeChild(this);
      });
      b.ui.ddmanager && b.ui.ddmanager.dragStop(this, f);
      return b.ui.mouse.prototype._mouseUp.call(this, f);
    }, cancel:function() {
      this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
      return this;
    }, _getHandle:function(f) {
      var k = this.options.handle && b(this.options.handle, this.element).length ? !1 : !0;
      b(this.options.handle, this.element).find("*").andSelf().each(function() {
        this == f.target && (k = !0);
      });
      return k;
    }, _createHelper:function(f) {
      var k = this.options;
      f = b.isFunction(k.helper) ? b(k.helper.apply(this.element[0], [f])) : "clone" == k.helper ? this.element.clone().removeAttr("id") : this.element;
      f.parents("body").length || f.appendTo("parent" == k.appendTo ? this.element[0].parentNode : k.appendTo);
      f[0] != this.element[0] && !/(fixed|absolute)/.test(f.css("position")) && f.css("position", "absolute");
      return f;
    }, _adjustOffsetFromHelper:function(f) {
      "string" == typeof f && (f = f.split(" "));
      b.isArray(f) && (f = {left:+f[0], top:+f[1] || 0});
      "left" in f && (this.offset.click.left = f.left + this.margins.left);
      "right" in f && (this.offset.click.left = this.helperProportions.width - f.right + this.margins.left);
      "top" in f && (this.offset.click.top = f.top + this.margins.top);
      "bottom" in f && (this.offset.click.top = this.helperProportions.height - f.bottom + this.margins.top);
    }, _getParentOffset:function() {
      this.offsetParent = this.helper.offsetParent();
      var f = this.offsetParent.offset();
      "absolute" == this.cssPosition && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (f.left += this.scrollParent.scrollLeft(), f.top += this.scrollParent.scrollTop());
      if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && b.browser.msie) {
        f = {top:0, left:0};
      }
      return {top:f.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left:f.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)};
    }, _getRelativeOffset:function() {
      if ("relative" == this.cssPosition) {
        var b = this.element.position();
        return {top:b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left:b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()};
      }
      return {top:0, left:0};
    }, _cacheMargins:function() {
      this.margins = {left:parseInt(this.element.css("marginLeft"), 10) || 0, top:parseInt(this.element.css("marginTop"), 10) || 0, right:parseInt(this.element.css("marginRight"), 10) || 0, bottom:parseInt(this.element.css("marginBottom"), 10) || 0};
    }, _cacheHelperProportions:function() {
      this.helperProportions = {width:this.helper.outerWidth(), height:this.helper.outerHeight()};
    }, _setContainment:function() {
      var f = this.options;
      "parent" == f.containment && (f.containment = this.helper[0].parentNode);
      if ("document" == f.containment || "window" == f.containment) {
        this.containment = ["document" == f.containment ? 0 : b(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == f.containment ? 0 : b(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == f.containment ? 0 : b(window).scrollLeft()) + b("document" == f.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" == f.containment ? 0 : b(window).scrollTop()) + (b("document" == f.containment ? 
        document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
      }
      if (/^(document|window|parent)$/.test(f.containment) || f.containment.constructor == Array) {
        f.containment.constructor == Array && (this.containment = f.containment);
      } else {
        var f = b(f.containment), k = f[0];
        if (k) {
          f.offset();
          var c = "hidden" != b(k).css("overflow");
          this.containment = [(parseInt(b(k).css("borderLeftWidth"), 10) || 0) + (parseInt(b(k).css("paddingLeft"), 10) || 0), (parseInt(b(k).css("borderTopWidth"), 10) || 0) + (parseInt(b(k).css("paddingTop"), 10) || 0), (c ? Math.max(k.scrollWidth, k.offsetWidth) : k.offsetWidth) - (parseInt(b(k).css("borderLeftWidth"), 10) || 0) - (parseInt(b(k).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (c ? Math.max(k.scrollHeight, k.offsetHeight) : 
          k.offsetHeight) - (parseInt(b(k).css("borderTopWidth"), 10) || 0) - (parseInt(b(k).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
          this.relative_container = f;
        }
      }
    }, _convertPositionTo:function(f, k) {
      k || (k = this.position);
      f = "absolute" == f ? 1 : -1;
      var c = "absolute" != this.cssPosition || this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = /(html|body)/i.test(c[0].tagName);
      return {top:k.top + this.offset.relative.top * f + this.offset.parent.top * f - (b.browser.safari && 526 > b.browser.version && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : c.scrollTop()) * f), left:k.left + this.offset.relative.left * f + this.offset.parent.left * f - (b.browser.safari && 526 > b.browser.version && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : c.scrollLeft()) * 
      f)};
    }, _generatePosition:function(f) {
      var k = this.options, c = "absolute" != this.cssPosition || this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = /(html|body)/i.test(c[0].tagName), d = f.pageX, p = f.pageY;
      if (this.originalPosition) {
        var q;
        this.containment && (this.relative_container ? (q = this.relative_container.offset(), q = [this.containment[0] + q.left, this.containment[1] + q.top, this.containment[2] + q.left, this.containment[3] + q.top]) : q = this.containment, f.pageX - this.offset.click.left < q[0] && (d = q[0] + this.offset.click.left), f.pageY - this.offset.click.top < q[1] && (p = q[1] + this.offset.click.top), f.pageX - this.offset.click.left > q[2] && (d = q[2] + this.offset.click.left), f.pageY - this.offset.click.top > 
        q[3] && (p = q[3] + this.offset.click.top));
        k.grid && (p = k.grid[1] ? this.originalPageY + Math.round((p - this.originalPageY) / k.grid[1]) * k.grid[1] : this.originalPageY, p = q ? p - this.offset.click.top < q[1] || p - this.offset.click.top > q[3] ? p - this.offset.click.top < q[1] ? p + k.grid[1] : p - k.grid[1] : p : p, d = k.grid[0] ? this.originalPageX + Math.round((d - this.originalPageX) / k.grid[0]) * k.grid[0] : this.originalPageX, d = q ? d - this.offset.click.left < q[0] || d - this.offset.click.left > q[2] ? d - this.offset.click.left < 
        q[0] ? d + k.grid[0] : d - k.grid[0] : d : d);
      }
      return {top:p - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && 526 > b.browser.version && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : c.scrollTop()), left:d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && 526 > b.browser.version && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : 
      l ? 0 : c.scrollLeft())};
    }, _clear:function() {
      this.helper.removeClass("ui-draggable-dragging");
      this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
      this.helper = null;
      this.cancelHelperRemoval = !1;
    }, _trigger:function(f, k, c) {
      c = c || this._uiHash();
      b.ui.plugin.call(this, f, [k, c]);
      "drag" == f && (this.positionAbs = this._convertPositionTo("absolute"));
      return b.Widget.prototype._trigger.call(this, f, k, c);
    }, plugins:{}, _uiHash:function() {
      return {helper:this.helper, position:this.position, originalPosition:this.originalPosition, offset:this.positionAbs};
    }});
    b.extend(b.ui.draggable, {version:"1.8.16"});
    b.ui.plugin.add("draggable", "connectToSortable", {start:function(f, k) {
      var c = b(this).data("draggable"), l = c.options, d = b.extend({}, k, {item:c.element});
      c.sortables = [];
      b(l.connectToSortable).each(function() {
        var k = b.data(this, "sortable");
        k && !k.options.disabled && (c.sortables.push({instance:k, shouldRevert:k.options.revert}), k.refreshPositions(), k._trigger("activate", f, d));
      });
    }, stop:function(f, k) {
      var c = b(this).data("draggable"), l = b.extend({}, k, {item:c.element});
      b.each(c.sortables, function() {
        this.instance.isOver ? (this.instance.isOver = 0, c.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(f), this.instance.options.helper = this.instance.options._helper, "original" == c.options.helper && this.instance.currentItem.css({top:"auto", left:"auto"})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", f, l));
      });
    }, drag:function(f, k) {
      var c = b(this).data("draggable"), l = this;
      b.each(c.sortables, function() {
        this.instance.positionAbs = c.positionAbs;
        this.instance.helperProportions = c.helperProportions;
        this.instance.offset.click = c.offset.click;
        this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = b(l).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
          return k.helper[0];
        }, f.target = this.instance.currentItem[0], this.instance._mouseCapture(f, !0), this.instance._mouseStart(f, !0, !0), this.instance.offset.click.top = c.offset.click.top, this.instance.offset.click.left = c.offset.click.left, this.instance.offset.parent.left -= c.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= c.offset.parent.top - this.instance.offset.parent.top, c._trigger("toSortable", f), c.dropped = this.instance.element, c.currentItem = c.element, 
        this.instance.fromOutside = c), this.instance.currentItem && this.instance._mouseDrag(f)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", f, this.instance._uiHash(this.instance)), this.instance._mouseStop(f, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), c._trigger("fromSortable", 
        f), c.dropped = !1);
      });
    }});
    b.ui.plugin.add("draggable", "cursor", {start:function() {
      var f = b("body"), k = b(this).data("draggable").options;
      f.css("cursor") && (k._cursor = f.css("cursor"));
      f.css("cursor", k.cursor);
    }, stop:function() {
      var f = b(this).data("draggable").options;
      f._cursor && b("body").css("cursor", f._cursor);
    }});
    b.ui.plugin.add("draggable", "opacity", {start:function(f, k) {
      f = b(k.helper);
      k = b(this).data("draggable").options;
      f.css("opacity") && (k._opacity = f.css("opacity"));
      f.css("opacity", k.opacity);
    }, stop:function(f, k) {
      f = b(this).data("draggable").options;
      f._opacity && b(k.helper).css("opacity", f._opacity);
    }});
    b.ui.plugin.add("draggable", "scroll", {start:function() {
      var f = b(this).data("draggable");
      f.scrollParent[0] != document && "HTML" != f.scrollParent[0].tagName && (f.overflowOffset = f.scrollParent.offset());
    }, drag:function(f) {
      var k = b(this).data("draggable"), c = k.options, l = !1;
      k.scrollParent[0] != document && "HTML" != k.scrollParent[0].tagName ? (c.axis && "x" == c.axis || (k.overflowOffset.top + k.scrollParent[0].offsetHeight - f.pageY < c.scrollSensitivity ? k.scrollParent[0].scrollTop = l = k.scrollParent[0].scrollTop + c.scrollSpeed : f.pageY - k.overflowOffset.top < c.scrollSensitivity && (k.scrollParent[0].scrollTop = l = k.scrollParent[0].scrollTop - c.scrollSpeed)), c.axis && "y" == c.axis || (k.overflowOffset.left + k.scrollParent[0].offsetWidth - f.pageX < 
      c.scrollSensitivity ? k.scrollParent[0].scrollLeft = l = k.scrollParent[0].scrollLeft + c.scrollSpeed : f.pageX - k.overflowOffset.left < c.scrollSensitivity && (k.scrollParent[0].scrollLeft = l = k.scrollParent[0].scrollLeft - c.scrollSpeed))) : (c.axis && "x" == c.axis || (f.pageY - b(document).scrollTop() < c.scrollSensitivity ? l = b(document).scrollTop(b(document).scrollTop() - c.scrollSpeed) : b(window).height() - (f.pageY - b(document).scrollTop()) < c.scrollSensitivity && (l = b(document).scrollTop(b(document).scrollTop() + 
      c.scrollSpeed))), c.axis && "y" == c.axis || (f.pageX - b(document).scrollLeft() < c.scrollSensitivity ? l = b(document).scrollLeft(b(document).scrollLeft() - c.scrollSpeed) : b(window).width() - (f.pageX - b(document).scrollLeft()) < c.scrollSensitivity && (l = b(document).scrollLeft(b(document).scrollLeft() + c.scrollSpeed))));
      !1 !== l && b.ui.ddmanager && !c.dropBehaviour && b.ui.ddmanager.prepareOffsets(k, f);
    }});
    b.ui.plugin.add("draggable", "snap", {start:function() {
      var f = b(this).data("draggable"), k = f.options;
      f.snapElements = [];
      b(k.snap.constructor != String ? k.snap.items || ":data(draggable)" : k.snap).each(function() {
        var c = b(this), k = c.offset();
        this != f.element[0] && f.snapElements.push({item:this, width:c.outerWidth(), height:c.outerHeight(), top:k.top, left:k.left});
      });
    }, drag:function(f, k) {
      for (var c = b(this).data("draggable"), l = c.options, d = l.snapTolerance, p = k.offset.left, q = p + c.helperProportions.width, u = k.offset.top, z = u + c.helperProportions.height, E = c.snapElements.length - 1;0 <= E;E--) {
        var M = c.snapElements[E].left, W = M + c.snapElements[E].width, V = c.snapElements[E].top, ba = V + c.snapElements[E].height;
        if (M - d < p && p < W + d && V - d < u && u < ba + d || M - d < p && p < W + d && V - d < z && z < ba + d || M - d < q && q < W + d && V - d < u && u < ba + d || M - d < q && q < W + d && V - d < z && z < ba + d) {
          if ("inner" != l.snapMode) {
            var a = Math.abs(V - z) <= d, ca = Math.abs(ba - u) <= d, Q = Math.abs(M - q) <= d, T = Math.abs(W - p) <= d;
            a && (k.position.top = c._convertPositionTo("relative", {top:V - c.helperProportions.height, left:0}).top - c.margins.top);
            ca && (k.position.top = c._convertPositionTo("relative", {top:ba, left:0}).top - c.margins.top);
            Q && (k.position.left = c._convertPositionTo("relative", {top:0, left:M - c.helperProportions.width}).left - c.margins.left);
            T && (k.position.left = c._convertPositionTo("relative", {top:0, left:W}).left - c.margins.left);
          }
          var ia = a || ca || Q || T;
          "outer" != l.snapMode && (a = Math.abs(V - u) <= d, ca = Math.abs(ba - z) <= d, Q = Math.abs(M - p) <= d, T = Math.abs(W - q) <= d, a && (k.position.top = c._convertPositionTo("relative", {top:V, left:0}).top - c.margins.top), ca && (k.position.top = c._convertPositionTo("relative", {top:ba - c.helperProportions.height, left:0}).top - c.margins.top), Q && (k.position.left = c._convertPositionTo("relative", {top:0, left:M}).left - c.margins.left), T && (k.position.left = c._convertPositionTo("relative", 
          {top:0, left:W - c.helperProportions.width}).left - c.margins.left));
          !c.snapElements[E].snapping && (a || ca || Q || T || ia) && c.options.snap.snap && c.options.snap.snap.call(c.element, f, b.extend(c._uiHash(), {snapItem:c.snapElements[E].item}));
          c.snapElements[E].snapping = a || ca || Q || T || ia;
        } else {
          c.snapElements[E].snapping && c.options.snap.release && c.options.snap.release.call(c.element, f, b.extend(c._uiHash(), {snapItem:c.snapElements[E].item})), c.snapElements[E].snapping = !1;
        }
      }
    }});
    b.ui.plugin.add("draggable", "stack", {start:function() {
      var f = b(this).data("draggable").options, f = b.makeArray(b(f.stack)).sort(function(c, f) {
        return (parseInt(b(c).css("zIndex"), 10) || 0) - (parseInt(b(f).css("zIndex"), 10) || 0);
      });
      if (f.length) {
        var k = parseInt(f[0].style.zIndex) || 0;
        b(f).each(function(b) {
          this.style.zIndex = k + b;
        });
        this[0].style.zIndex = k + f.length;
      }
    }});
    b.ui.plugin.add("draggable", "zIndex", {start:function(f, k) {
      f = b(k.helper);
      k = b(this).data("draggable").options;
      f.css("zIndex") && (k._zIndex = f.css("zIndex"));
      f.css("zIndex", k.zIndex);
    }, stop:function(f, k) {
      f = b(this).data("draggable").options;
      f._zIndex && b(k.helper).css("zIndex", f._zIndex);
    }});
  })(z);
}, function(z, u, p) {
  p(44);
  (function(b) {
    function f(b) {
      (b.attr("title") || "string" != typeof b.attr("original-title")) && b.attr("original-title", b.attr("title") || "").removeAttr("title");
    }
    function k(c, k) {
      this.$element = b(c);
      this.options = k;
      this.enabled = !0;
      f(this.$element);
    }
    k.prototype = {show:function() {
      var c = this.getTitle();
      if (c && this.enabled) {
        var f = this.tip();
        f.find(".tipsy-inner")[this.options.html ? "html" : "text"](c);
        f[0].className = "tipsy";
        f.remove().css({top:0, left:0, visibility:"hidden", display:"block"}).appendTo(document.body);
        var c = b.extend({}, this.$element.offset(), {width:this.$element[0].offsetWidth, height:this.$element[0].offsetHeight}), d = f[0].offsetWidth, k = f[0].offsetHeight, p = "function" == typeof this.options.gravity ? this.options.gravity.call(this.$element[0]) : this.options.gravity, u;
        switch(p.charAt(0)) {
          case "n":
            u = {top:c.top + c.height + this.options.offset, left:c.left + c.width / 2 - d / 2};
            break;
          case "s":
            u = {top:c.top - k - this.options.offset, left:c.left + c.width / 2 - d / 2};
            break;
          case "e":
            u = {top:c.top + c.height / 2 - k / 2, left:c.left - d - this.options.offset};
            break;
          case "w":
            u = {top:c.top + c.height / 2 - k / 2, left:c.left + c.width + this.options.offset};
        }
        2 == p.length && ("w" == p.charAt(1) ? u.left = c.left + c.width / 2 - 15 : u.left = c.left + c.width / 2 - d + 15);
        f.css(u).addClass("tipsy-" + p);
        this.options.fade ? f.stop().css({opacity:0, display:"block", visibility:"visible"}).animate({opacity:this.options.opacity}) : f.css({visibility:"visible", opacity:this.options.opacity});
      }
    }, hide:function() {
      this.options.fade ? this.tip().stop().fadeOut(function() {
        b(this).remove();
      }) : this.tip().remove();
    }, getTitle:function() {
      var b, k = this.$element, d = this.options;
      f(k);
      d = this.options;
      "string" == typeof d.title ? b = k.attr("title" == d.title ? "original-title" : d.title) : "function" == typeof d.title && (b = d.title.call(k[0]));
      return (b = ("" + b).replace(/(^\s*|\s*$)/, "")) || d.fallback;
    }, tip:function() {
      this.$tip || (this.$tip = b('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'));
      return this.$tip;
    }, validate:function() {
      this.$element[0].parentNode || (this.hide(), this.options = this.$element = null);
    }, enable:function() {
      this.enabled = !0;
    }, disable:function() {
      this.enabled = !1;
    }, toggleEnabled:function() {
      this.enabled = !this.enabled;
    }};
    b.fn.tipsy = function(c) {
      function f(d) {
        var l = b.data(d, "tipsy");
        l || (l = new k(d, b.fn.tipsy.elementOptions(d, c)), b.data(d, "tipsy", l));
        return l;
      }
      function d() {
        var b = f(this);
        b.hoverState = "in";
        0 == c.delayIn ? b.show() : setTimeout(function() {
          "in" == b.hoverState && b.show();
        }, c.delayIn);
      }
      function p() {
        var b = f(this);
        b.hoverState = "out";
        0 == c.delayOut ? b.hide() : setTimeout(function() {
          "out" == b.hoverState && b.hide();
        }, c.delayOut);
      }
      if (!0 === c) {
        return this.data("tipsy");
      }
      if ("string" == typeof c) {
        var q = this.data("tipsy");
        if (q) {
          q[c]();
        }
        return this;
      }
      c = b.extend({}, b.fn.tipsy.defaults, c);
      c.live || this.each(function() {
        f(this);
      });
      if ("manual" != c.trigger) {
        var q = c.live ? "live" : "bind", u = "hover" == c.trigger ? "mouseleave" : "blur";
        this[q]("hover" == c.trigger ? "mouseenter" : "focus", d)[q](u, p);
      }
      return this;
    };
    b.fn.tipsy.defaults = {delayIn:0, delayOut:0, fade:!1, fallback:"", gravity:"n", html:!1, live:!1, offset:0, opacity:.8, title:"title", trigger:"hover"};
    b.fn.tipsy.elementOptions = function(c, f) {
      return b.metadata ? b.extend({}, f, b(c).metadata()) : f;
    };
    b.fn.tipsy.autoNS = function() {
      return b(this).offset().top > b(document).scrollTop() + b(window).height() / 2 ? "s" : "n";
    };
    b.fn.tipsy.autoWE = function() {
      return b(this).offset().left > b(document).scrollLeft() + b(window).width() / 2 ? "e" : "w";
    };
  })(p(67));
}, function(z, u, p) {
  var b, f, k;
  "use strict";
  (function() {
    (function(c) {
      var l = this || (0,eval)("this"), d = l.document, G = l.navigator, q = l.jQuery, K = l.JSON;
      (function(d) {
        !(f = [u, p], b = d, k = "function" === typeof b ? b.apply(u, f) : b, k !== c && (z.exports = k));
      })(function(b, f) {
        function k(a, b) {
          return null === a || typeof a in ca ? a === b : !1;
        }
        function p(a, b) {
          var d;
          return function() {
            d || (d = setTimeout(function() {
              d = c;
              a();
            }, b));
          };
        }
        function u(a, b) {
          var c;
          return function() {
            clearTimeout(c);
            c = setTimeout(a, b);
          };
        }
        function z(b, c, d, f) {
          a.bindingHandlers[b] = {init:function(b, m, k, l, y) {
            var n, D;
            a.computed(function() {
              var h = a.utils.unwrapObservable(m()), k = !d !== !h, v = !D;
              if (v || c || k !== n) {
                v && a.computedContext.getDependenciesCount() && (D = a.utils.cloneNodes(a.virtualElements.childNodes(b), !0)), k ? (v || a.virtualElements.setDomNodeChildren(b, a.utils.cloneNodes(D)), a.applyBindingsToDescendants(f ? f(y, h) : y, b)) : a.virtualElements.emptyNode(b), n = k;
              }
            }, null, {disposeWhenNodeIsRemoved:b});
            return {controlsDescendantBindings:!0};
          }};
          a.expressionRewriting.bindingRewriteValidators[b] = !1;
          a.virtualElements.allowedBindings[b] = !0;
        }
        var a = "undefined" !== typeof b ? b : {};
        a.exportSymbol = function(b, c) {
          for (var d = b.split("."), f = a, k = 0;k < d.length - 1;k++) {
            f = f[d[k]];
          }
          f[d[d.length - 1]] = c;
        };
        a.exportProperty = function(a, b, c) {
          a[b] = c;
        };
        a.version = "3.3.0";
        a.exportSymbol("version", a.version);
        a.utils = function() {
          function b(a, c) {
            for (var d in a) {
              a.hasOwnProperty(d) && c(d, a[d]);
            }
          }
          function f(a, b) {
            if (b) {
              for (var c in b) {
                b.hasOwnProperty(c) && (a[c] = b[c]);
              }
            }
            return a;
          }
          function k(a, b) {
            a.__proto__ = b;
            return a;
          }
          function A(b, c, d, e) {
            var m = b[c].match(D) || [];
            a.utils.arrayForEach(d.match(D), function(b) {
              a.utils.addOrRemoveItem(m, b, e);
            });
            b[c] = m.join(" ");
          }
          var I = {__proto__:[]} instanceof Array, J = {}, S = {}, w = G && /Firefox\/2/i.test(G.userAgent) ? "KeyboardEvent" : "UIEvents";
          J[w] = ["keyup", "keydown", "keypress"];
          J.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");
          b(J, function(a, b) {
            if (b.length) {
              for (var c = 0, e = b.length;c < e;c++) {
                S[b[c]] = a;
              }
            }
          });
          var y = {propertychange:!0}, n = d && function() {
            for (var a = 3, b = d.createElement("div"), m = b.getElementsByTagName("i");b.innerHTML = "\x3c!--[if gt IE " + ++a + "]><i></i><![endif]--\x3e", m[0];) {
            }
            return 4 < a ? a : c;
          }(), D = /\S+/g;
          return {fieldsIncludedWithJsonPost:["authenticity_token", /^__RequestVerificationToken(_.*)?$/], arrayForEach:function(a, b) {
            for (var c = 0, e = a.length;c < e;c++) {
              b(a[c], c);
            }
          }, arrayIndexOf:function(a, b) {
            if ("function" == typeof Array.prototype.indexOf) {
              return Array.prototype.indexOf.call(a, b);
            }
            for (var c = 0, e = a.length;c < e;c++) {
              if (a[c] === b) {
                return c;
              }
            }
            return -1;
          }, arrayFirst:function(a, b, c) {
            for (var e = 0, d = a.length;e < d;e++) {
              if (b.call(c, a[e], e)) {
                return a[e];
              }
            }
            return null;
          }, arrayRemoveItem:function(b, c) {
            var d = a.utils.arrayIndexOf(b, c);
            0 < d ? b.splice(d, 1) : 0 === d && b.shift();
          }, arrayGetDistinctValues:function(b) {
            b = b || [];
            for (var c = [], d = 0, e = b.length;d < e;d++) {
              0 > a.utils.arrayIndexOf(c, b[d]) && c.push(b[d]);
            }
            return c;
          }, arrayMap:function(a, b) {
            a = a || [];
            for (var c = [], e = 0, d = a.length;e < d;e++) {
              c.push(b(a[e], e));
            }
            return c;
          }, arrayFilter:function(a, b) {
            a = a || [];
            for (var c = [], e = 0, d = a.length;e < d;e++) {
              b(a[e], e) && c.push(a[e]);
            }
            return c;
          }, arrayPushAll:function(a, b) {
            if (b instanceof Array) {
              a.push.apply(a, b);
            } else {
              for (var c = 0, e = b.length;c < e;c++) {
                a.push(b[c]);
              }
            }
            return a;
          }, addOrRemoveItem:function(b, c, d) {
            var e = a.utils.arrayIndexOf(a.utils.peekObservable(b), c);
            0 > e ? d && b.push(c) : d || b.splice(e, 1);
          }, canSetPrototype:I, extend:f, setPrototypeOf:k, setPrototypeOfOrExtend:I ? k : f, objectForEach:b, objectMap:function(a, b) {
            if (!a) {
              return a;
            }
            var c = {}, e;
            for (e in a) {
              a.hasOwnProperty(e) && (c[e] = b(a[e], e, a));
            }
            return c;
          }, emptyDomNode:function(b) {
            for (;b.firstChild;) {
              a.removeNode(b.firstChild);
            }
          }, moveCleanedNodesToContainerElement:function(b) {
            b = a.utils.makeArray(b);
            for (var c = (b[0] && b[0].ownerDocument || d).createElement("div"), m = 0, e = b.length;m < e;m++) {
              c.appendChild(a.cleanNode(b[m]));
            }
            return c;
          }, cloneNodes:function(b, c) {
            for (var d = 0, e = b.length, m = [];d < e;d++) {
              var f = b[d].cloneNode(!0);
              m.push(c ? a.cleanNode(f) : f);
            }
            return m;
          }, setDomNodeChildren:function(b, c) {
            a.utils.emptyDomNode(b);
            if (c) {
              for (var d = 0, e = c.length;d < e;d++) {
                b.appendChild(c[d]);
              }
            }
          }, replaceDomNodes:function(b, c) {
            var d = b.nodeType ? [b] : b;
            if (0 < d.length) {
              for (var e = d[0], m = e.parentNode, f = 0, n = c.length;f < n;f++) {
                m.insertBefore(c[f], e);
              }
              f = 0;
              for (n = d.length;f < n;f++) {
                a.removeNode(d[f]);
              }
            }
          }, fixUpContinuousNodeArray:function(a, b) {
            if (a.length) {
              for (b = 8 === b.nodeType && b.parentNode || b;a.length && a[0].parentNode !== b;) {
                a.splice(0, 1);
              }
              if (1 < a.length) {
                var c = a[0], e = a[a.length - 1];
                for (a.length = 0;c !== e;) {
                  if (a.push(c), c = c.nextSibling, !c) {
                    return;
                  }
                }
                a.push(e);
              }
            }
            return a;
          }, setOptionNodeSelectionState:function(a, b) {
            7 > n ? a.setAttribute("selected", b) : a.selected = b;
          }, stringTrim:function(a) {
            return null === a || a === c ? "" : a.trim ? a.trim() : a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
          }, stringStartsWith:function(a, b) {
            a = a || "";
            return b.length > a.length ? !1 : a.substring(0, b.length) === b;
          }, domNodeIsContainedBy:function(a, b) {
            if (a === b) {
              return !0;
            }
            if (11 === a.nodeType) {
              return !1;
            }
            if (b.contains) {
              return b.contains(3 === a.nodeType ? a.parentNode : a);
            }
            if (b.compareDocumentPosition) {
              return 16 == (b.compareDocumentPosition(a) & 16);
            }
            for (;a && a != b;) {
              a = a.parentNode;
            }
            return !!a;
          }, domNodeIsAttachedToDocument:function(b) {
            return a.utils.domNodeIsContainedBy(b, b.ownerDocument.documentElement);
          }, anyDomNodeIsAttachedToDocument:function(b) {
            return !!a.utils.arrayFirst(b, a.utils.domNodeIsAttachedToDocument);
          }, tagNameLower:function(a) {
            return a && a.tagName && a.tagName.toLowerCase();
          }, registerEventHandler:function(b, c, d) {
            var e = n && y[c];
            if (!e && q) {
              q(b).bind(c, d);
            } else {
              if (e || "function" != typeof b.addEventListener) {
                if ("undefined" != typeof b.attachEvent) {
                  var m = function(a) {
                    d.call(b, a);
                  }, f = "on" + c;
                  b.attachEvent(f, m);
                  a.utils.domNodeDisposal.addDisposeCallback(b, function() {
                    b.detachEvent(f, m);
                  });
                } else {
                  throw Error("Browser doesn't support addEventListener or attachEvent");
                }
              } else {
                b.addEventListener(c, d, !1);
              }
            }
          }, triggerEvent:function(b, c) {
            if (!b || !b.nodeType) {
              throw Error("element must be a DOM node when calling triggerEvent");
            }
            var m;
            "input" === a.utils.tagNameLower(b) && b.type ? "click" != c.toLowerCase() ? m = !1 : (m = b.type, m = "checkbox" == m || "radio" == m) : m = !1;
            if (q && !m) {
              q(b).trigger(c);
            } else {
              if ("function" == typeof d.createEvent) {
                if ("function" == typeof b.dispatchEvent) {
                  m = d.createEvent(S[c] || "HTMLEvents"), m.initEvent(c, !0, !0, l, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, b), b.dispatchEvent(m);
                } else {
                  throw Error("The supplied element doesn't support dispatchEvent");
                }
              } else {
                if (m && b.click) {
                  b.click();
                } else {
                  if ("undefined" != typeof b.fireEvent) {
                    b.fireEvent("on" + c);
                  } else {
                    throw Error("Browser doesn't support triggering events");
                  }
                }
              }
            }
          }, unwrapObservable:function(b) {
            return a.isObservable(b) ? b() : b;
          }, peekObservable:function(b) {
            return a.isObservable(b) ? b.peek() : b;
          }, toggleDomNodeCssClass:function(b, c, d) {
            var e;
            c && ("object" === typeof b.classList ? (e = b.classList[d ? "add" : "remove"], a.utils.arrayForEach(c.match(D), function(a) {
              e.call(b.classList, a);
            })) : "string" === typeof b.className.baseVal ? A(b.className, "baseVal", c, d) : A(b, "className", c, d));
          }, setTextContent:function(b, d) {
            var m = a.utils.unwrapObservable(d);
            if (null === m || m === c) {
              m = "";
            }
            var e = a.virtualElements.firstChild(b);
            !e || 3 != e.nodeType || a.virtualElements.nextSibling(e) ? a.virtualElements.setDomNodeChildren(b, [b.ownerDocument.createTextNode(m)]) : e.data = m;
            a.utils.forceRefresh(b);
          }, setElementName:function(a, b) {
            a.name = b;
            if (7 >= n) {
              try {
                a.mergeAttributes(d.createElement("<input name='" + a.name + "'/>"), !1);
              } catch (c) {
              }
            }
          }, forceRefresh:function(a) {
            9 <= n && (a = 1 == a.nodeType ? a : a.parentNode, a.style && (a.style.zoom = a.style.zoom));
          }, ensureSelectElementIsRenderedCorrectly:function(a) {
            if (n) {
              var b = a.style.width;
              a.style.width = 0;
              a.style.width = b;
            }
          }, range:function(b, c) {
            b = a.utils.unwrapObservable(b);
            c = a.utils.unwrapObservable(c);
            for (var d = [], e = b;e <= c;e++) {
              d.push(e);
            }
            return d;
          }, makeArray:function(a) {
            for (var b = [], c = 0, e = a.length;c < e;c++) {
              b.push(a[c]);
            }
            return b;
          }, isIe6:6 === n, isIe7:7 === n, ieVersion:n, getFormFields:function(b, c) {
            for (var d = a.utils.makeArray(b.getElementsByTagName("input")).concat(a.utils.makeArray(b.getElementsByTagName("textarea"))), e = "string" == typeof c ? function(a) {
              return a.name === c;
            } : function(a) {
              return c.test(a.name);
            }, m = [], f = d.length - 1;0 <= f;f--) {
              e(d[f]) && m.push(d[f]);
            }
            return m;
          }, parseJson:function(b) {
            return "string" == typeof b && (b = a.utils.stringTrim(b)) ? K && K.parse ? K.parse(b) : (new Function("return " + b))() : null;
          }, stringifyJson:function(b, c, d) {
            if (!K || !K.stringify) {
              throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
            }
            return K.stringify(a.utils.unwrapObservable(b), c, d);
          }, postJson:function(c, f, n) {
            n = n || {};
            var e = n.params || {}, t = n.includeFields || this.fieldsIncludedWithJsonPost, k = c;
            if ("object" == typeof c && "form" === a.utils.tagNameLower(c)) {
              for (var k = c.action, x = t.length - 1;0 <= x;x--) {
                for (var l = a.utils.getFormFields(c, t[x]), A = l.length - 1;0 <= A;A--) {
                  e[l[A].name] = l[A].value;
                }
              }
            }
            f = a.utils.unwrapObservable(f);
            var w = d.createElement("form");
            w.style.display = "none";
            w.action = k;
            w.method = "post";
            for (var y in f) {
              c = d.createElement("input"), c.type = "hidden", c.name = y, c.value = a.utils.stringifyJson(a.utils.unwrapObservable(f[y])), w.appendChild(c);
            }
            b(e, function(a, b) {
              var c = d.createElement("input");
              c.type = "hidden";
              c.name = a;
              c.value = b;
              w.appendChild(c);
            });
            d.body.appendChild(w);
            n.submitter ? n.submitter(w) : w.submit();
            setTimeout(function() {
              w.parentNode.removeChild(w);
            }, 0);
          }};
        }();
        a.exportSymbol("utils", a.utils);
        a.exportSymbol("utils.arrayForEach", a.utils.arrayForEach);
        a.exportSymbol("utils.arrayFirst", a.utils.arrayFirst);
        a.exportSymbol("utils.arrayFilter", a.utils.arrayFilter);
        a.exportSymbol("utils.arrayGetDistinctValues", a.utils.arrayGetDistinctValues);
        a.exportSymbol("utils.arrayIndexOf", a.utils.arrayIndexOf);
        a.exportSymbol("utils.arrayMap", a.utils.arrayMap);
        a.exportSymbol("utils.arrayPushAll", a.utils.arrayPushAll);
        a.exportSymbol("utils.arrayRemoveItem", a.utils.arrayRemoveItem);
        a.exportSymbol("utils.extend", a.utils.extend);
        a.exportSymbol("utils.fieldsIncludedWithJsonPost", a.utils.fieldsIncludedWithJsonPost);
        a.exportSymbol("utils.getFormFields", a.utils.getFormFields);
        a.exportSymbol("utils.peekObservable", a.utils.peekObservable);
        a.exportSymbol("utils.postJson", a.utils.postJson);
        a.exportSymbol("utils.parseJson", a.utils.parseJson);
        a.exportSymbol("utils.registerEventHandler", a.utils.registerEventHandler);
        a.exportSymbol("utils.stringifyJson", a.utils.stringifyJson);
        a.exportSymbol("utils.range", a.utils.range);
        a.exportSymbol("utils.toggleDomNodeCssClass", a.utils.toggleDomNodeCssClass);
        a.exportSymbol("utils.triggerEvent", a.utils.triggerEvent);
        a.exportSymbol("utils.unwrapObservable", a.utils.unwrapObservable);
        a.exportSymbol("utils.objectForEach", a.utils.objectForEach);
        a.exportSymbol("utils.addOrRemoveItem", a.utils.addOrRemoveItem);
        a.exportSymbol("utils.setTextContent", a.utils.setTextContent);
        a.exportSymbol("unwrap", a.utils.unwrapObservable);
        Function.prototype.bind || (Function.prototype.bind = function(a) {
          var b = this;
          if (1 === arguments.length) {
            return function() {
              return b.apply(a, arguments);
            };
          }
          var c = Array.prototype.slice.call(arguments, 1);
          return function() {
            var d = c.slice(0);
            d.push.apply(d, arguments);
            return b.apply(a, d);
          };
        });
        a.utils.domData = new function() {
          function a(m, k) {
            var l = m[d];
            if (!l || "null" === l || !f[l]) {
              if (!k) {
                return c;
              }
              l = m[d] = "ko" + b++;
              f[l] = {};
            }
            return f[l];
          }
          var b = 0, d = "__ko__" + (new Date).getTime(), f = {};
          return {get:function(b, d) {
            var f = a(b, !1);
            return f === c ? c : f[d];
          }, set:function(b, d, f) {
            if (f !== c || a(b, !1) !== c) {
              a(b, !0)[d] = f;
            }
          }, clear:function(a) {
            var b = a[d];
            return b ? (delete f[b], a[d] = null, !0) : !1;
          }, nextKey:function() {
            return b++ + d;
          }};
        };
        a.exportSymbol("utils.domData", a.utils.domData);
        a.exportSymbol("utils.domData.clear", a.utils.domData.clear);
        a.utils.domNodeDisposal = new function() {
          function b(d, m) {
            var k = a.utils.domData.get(d, f);
            k === c && m && (k = [], a.utils.domData.set(d, f, k));
            return k;
          }
          function d(c) {
            var f = b(c, !1);
            if (f) {
              for (var f = f.slice(0), k = 0;k < f.length;k++) {
                f[k](c);
              }
            }
            a.utils.domData.clear(c);
            a.utils.domNodeDisposal.cleanExternalData(c);
            if (l[c.nodeType]) {
              for (f = c.firstChild;c = f;) {
                f = c.nextSibling, 8 === c.nodeType && d(c);
              }
            }
          }
          var f = a.utils.domData.nextKey(), k = {1:!0, 8:!0, 9:!0}, l = {1:!0, 9:!0};
          return {addDisposeCallback:function(a, c) {
            if ("function" != typeof c) {
              throw Error("Callback must be a function");
            }
            b(a, !0).push(c);
          }, removeDisposeCallback:function(d, k) {
            var t = b(d, !1);
            t && (a.utils.arrayRemoveItem(t, k), 0 == t.length && a.utils.domData.set(d, f, c));
          }, cleanNode:function(b) {
            if (k[b.nodeType] && (d(b), l[b.nodeType])) {
              var c = [];
              a.utils.arrayPushAll(c, b.getElementsByTagName("*"));
              for (var f = 0, m = c.length;f < m;f++) {
                d(c[f]);
              }
            }
            return b;
          }, removeNode:function(b) {
            a.cleanNode(b);
            b.parentNode && b.parentNode.removeChild(b);
          }, cleanExternalData:function(a) {
            q && "function" == typeof q.cleanData && q.cleanData([a]);
          }};
        };
        a.cleanNode = a.utils.domNodeDisposal.cleanNode;
        a.removeNode = a.utils.domNodeDisposal.removeNode;
        a.exportSymbol("cleanNode", a.cleanNode);
        a.exportSymbol("removeNode", a.removeNode);
        a.exportSymbol("utils.domNodeDisposal", a.utils.domNodeDisposal);
        a.exportSymbol("utils.domNodeDisposal.addDisposeCallback", a.utils.domNodeDisposal.addDisposeCallback);
        a.exportSymbol("utils.domNodeDisposal.removeDisposeCallback", a.utils.domNodeDisposal.removeDisposeCallback);
        (function() {
          a.utils.parseHtmlFragment = function(b, c) {
            var f;
            if (q) {
              if (q.parseHTML) {
                f = q.parseHTML(b, c) || [];
              } else {
                if ((f = q.clean([b], c)) && f[0]) {
                  for (var k = f[0];k.parentNode && 11 !== k.parentNode.nodeType;) {
                    k = k.parentNode;
                  }
                  k.parentNode && k.parentNode.removeChild(k);
                }
              }
            } else {
              (k = c) || (k = d);
              f = k.parentWindow || k.defaultView || l;
              var I = a.utils.stringTrim(b).toLowerCase(), k = k.createElement("div"), I = I.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !I.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!I.indexOf("<td") || !I.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""], J = "ignored<div>" + I[1] + b + I[2] + "</div>";
              for ("function" == typeof f.innerShiv ? k.appendChild(f.innerShiv(J)) : k.innerHTML = J;I[0]--;) {
                k = k.lastChild;
              }
              f = a.utils.makeArray(k.lastChild.childNodes);
            }
            return f;
          };
          a.utils.setHtml = function(b, d) {
            a.utils.emptyDomNode(b);
            d = a.utils.unwrapObservable(d);
            if (null !== d && d !== c) {
              if ("string" != typeof d && (d = d.toString()), q) {
                q(b).html(d);
              } else {
                for (var f = a.utils.parseHtmlFragment(d, b.ownerDocument), k = 0;k < f.length;k++) {
                  b.appendChild(f[k]);
                }
              }
            }
          };
        })();
        a.exportSymbol("utils.parseHtmlFragment", a.utils.parseHtmlFragment);
        a.exportSymbol("utils.setHtml", a.utils.setHtml);
        a.memoization = function() {
          function b(c, d) {
            if (c) {
              if (8 == c.nodeType) {
                var f = a.memoization.parseMemoText(c.nodeValue);
                null != f && d.push({domNode:c, memoId:f});
              } else {
                if (1 == c.nodeType) {
                  for (var f = 0, k = c.childNodes, t = k.length;f < t;f++) {
                    b(k[f], d);
                  }
                }
              }
            }
          }
          var d = {};
          return {memoize:function(a) {
            if ("function" != typeof a) {
              throw Error("You can only pass a function to ko.memoization.memoize()");
            }
            var b = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
            d[b] = a;
            return "\x3c!--[ko_memo:" + b + "]--\x3e";
          }, unmemoize:function(a, b) {
            var f = d[a];
            if (f === c) {
              throw Error("Couldn't find any memo with ID " + a + ". Perhaps it's already been unmemoized.");
            }
            try {
              return f.apply(null, b || []), !0;
            } finally {
              delete d[a];
            }
          }, unmemoizeDomNodeAndDescendants:function(c, d) {
            var f = [];
            b(c, f);
            for (var k = 0, t = f.length;k < t;k++) {
              var l = f[k].domNode, y = [l];
              d && a.utils.arrayPushAll(y, d);
              a.memoization.unmemoize(f[k].memoId, y);
              l.nodeValue = "";
              l.parentNode && l.parentNode.removeChild(l);
            }
          }, parseMemoText:function(a) {
            return (a = a.match(/^\[ko_memo\:(.*?)\]$/)) ? a[1] : null;
          }};
        }();
        a.exportSymbol("memoization", a.memoization);
        a.exportSymbol("memoization.memoize", a.memoization.memoize);
        a.exportSymbol("memoization.unmemoize", a.memoization.unmemoize);
        a.exportSymbol("memoization.parseMemoText", a.memoization.parseMemoText);
        a.exportSymbol("memoization.unmemoizeDomNodeAndDescendants", a.memoization.unmemoizeDomNodeAndDescendants);
        a.extenders = {throttle:function(b, c) {
          b.throttleEvaluation = c;
          var d = null;
          return a.dependentObservable({read:b, write:function(a) {
            clearTimeout(d);
            d = setTimeout(function() {
              b(a);
            }, c);
          }});
        }, rateLimit:function(a, b) {
          var c, d, f;
          "number" == typeof b ? c = b : (c = b.timeout, d = b.method);
          f = "notifyWhenChangesStop" == d ? u : p;
          a.limit(function(a) {
            return f(a, c);
          });
        }, notify:function(a, b) {
          a.equalityComparer = "always" == b ? null : k;
        }};
        var ca = {undefined:1, "boolean":1, number:1, string:1};
        a.exportSymbol("extenders", a.extenders);
        a.subscription = function(b, c, d) {
          this._target = b;
          this.callback = c;
          this.disposeCallback = d;
          this.isDisposed = !1;
          a.exportProperty(this, "dispose", this.dispose);
        };
        a.subscription.prototype.dispose = function() {
          this.isDisposed = !0;
          this.disposeCallback();
        };
        a.subscribable = function() {
          a.utils.setPrototypeOfOrExtend(this, a.subscribable.fn);
          this._subscriptions = {};
          this._versionNumber = 1;
        };
        var Q = {subscribe:function(b, c, d) {
          var f = this;
          d = d || "change";
          b = c ? b.bind(c) : b;
          var k = new a.subscription(f, b, function() {
            a.utils.arrayRemoveItem(f._subscriptions[d], k);
            f.afterSubscriptionRemove && f.afterSubscriptionRemove(d);
          });
          f.beforeSubscriptionAdd && f.beforeSubscriptionAdd(d);
          f._subscriptions[d] || (f._subscriptions[d] = []);
          f._subscriptions[d].push(k);
          return k;
        }, notifySubscribers:function(b, c) {
          c = c || "change";
          "change" === c && this.updateVersion();
          if (this.hasSubscriptionsForEvent(c)) {
            try {
              a.dependencyDetection.begin();
              for (var d = this._subscriptions[c].slice(0), f = 0, k;k = d[f];++f) {
                k.isDisposed || k.callback(b);
              }
            } finally {
              a.dependencyDetection.end();
            }
          }
        }, getVersion:function() {
          return this._versionNumber;
        }, hasChanged:function(a) {
          return this.getVersion() !== a;
        }, updateVersion:function() {
          ++this._versionNumber;
        }, limit:function(b) {
          var c = this, d = a.isObservable(c), f, k, l;
          c._origNotifySubscribers || (c._origNotifySubscribers = c.notifySubscribers, c.notifySubscribers = function(a, b) {
            b && "change" !== b ? "beforeChange" === b ? c._rateLimitedBeforeChange(a) : c._origNotifySubscribers(a, b) : c._rateLimitedChange(a);
          });
          var p = b(function() {
            d && l === c && (l = c());
            f = !1;
            c.isDifferent(k, l) && c._origNotifySubscribers(k = l);
          });
          c._rateLimitedChange = function(a) {
            f = !0;
            l = a;
            p();
          };
          c._rateLimitedBeforeChange = function(a) {
            f || (k = a, c._origNotifySubscribers(a, "beforeChange"));
          };
        }, hasSubscriptionsForEvent:function(a) {
          return this._subscriptions[a] && this._subscriptions[a].length;
        }, getSubscriptionsCount:function(b) {
          if (b) {
            return this._subscriptions[b] && this._subscriptions[b].length || 0;
          }
          var c = 0;
          a.utils.objectForEach(this._subscriptions, function(a, b) {
            c += b.length;
          });
          return c;
        }, isDifferent:function(a, b) {
          return !this.equalityComparer || !this.equalityComparer(a, b);
        }, extend:function(b) {
          var c = this;
          b && a.utils.objectForEach(b, function(b, d) {
            var f = a.extenders[b];
            "function" == typeof f && (c = f(c, d) || c);
          });
          return c;
        }};
        a.exportProperty(Q, "subscribe", Q.subscribe);
        a.exportProperty(Q, "extend", Q.extend);
        a.exportProperty(Q, "getSubscriptionsCount", Q.getSubscriptionsCount);
        a.utils.canSetPrototype && a.utils.setPrototypeOf(Q, Function.prototype);
        a.subscribable.fn = Q;
        a.isSubscribable = function(a) {
          return null != a && "function" == typeof a.subscribe && "function" == typeof a.notifySubscribers;
        };
        a.exportSymbol("subscribable", a.subscribable);
        a.exportSymbol("isSubscribable", a.isSubscribable);
        a.computedContext = a.dependencyDetection = function() {
          function b(a) {
            d.push(f);
            f = a;
          }
          function c() {
            f = d.pop();
          }
          var d = [], f, k = 0;
          return {begin:b, end:c, registerDependency:function(b) {
            if (f) {
              if (!a.isSubscribable(b)) {
                throw Error("Only subscribable things can act as dependencies");
              }
              f.callback(b, b._id || (b._id = ++k));
            }
          }, ignore:function(a, d, f) {
            try {
              return b(), a.apply(d, f || []);
            } finally {
              c();
            }
          }, getDependenciesCount:function() {
            if (f) {
              return f.computed.getDependenciesCount();
            }
          }, isInitial:function() {
            if (f) {
              return f.isInitial;
            }
          }};
        }();
        a.exportSymbol("computedContext", a.computedContext);
        a.exportSymbol("computedContext.getDependenciesCount", a.computedContext.getDependenciesCount);
        a.exportSymbol("computedContext.isInitial", a.computedContext.isInitial);
        a.exportSymbol("computedContext.isSleeping", a.computedContext.isSleeping);
        a.exportSymbol("ignoreDependencies", a.ignoreDependencies = a.dependencyDetection.ignore);
        a.observable = function(b) {
          function c() {
            if (0 < arguments.length) {
              return c.isDifferent(d, arguments[0]) && (c.valueWillMutate(), d = arguments[0], c.valueHasMutated()), this;
            }
            a.dependencyDetection.registerDependency(c);
            return d;
          }
          var d = b;
          a.subscribable.call(c);
          a.utils.setPrototypeOfOrExtend(c, a.observable.fn);
          c.peek = function() {
            return d;
          };
          c.valueHasMutated = function() {
            c.notifySubscribers(d);
          };
          c.valueWillMutate = function() {
            c.notifySubscribers(d, "beforeChange");
          };
          a.exportProperty(c, "peek", c.peek);
          a.exportProperty(c, "valueHasMutated", c.valueHasMutated);
          a.exportProperty(c, "valueWillMutate", c.valueWillMutate);
          return c;
        };
        a.observable.fn = {equalityComparer:k};
        var T = a.observable.protoProperty = "__ko_proto__";
        a.observable.fn[T] = a.observable;
        a.utils.canSetPrototype && a.utils.setPrototypeOf(a.observable.fn, a.subscribable.fn);
        a.hasPrototype = function(b, d) {
          return null === b || b === c || b[T] === c ? !1 : b[T] === d ? !0 : a.hasPrototype(b[T], d);
        };
        a.isObservable = function(b) {
          return a.hasPrototype(b, a.observable);
        };
        a.isWriteableObservable = function(b) {
          return "function" == typeof b && b[T] === a.observable || "function" == typeof b && b[T] === a.dependentObservable && b.hasWriteFunction ? !0 : !1;
        };
        a.exportSymbol("observable", a.observable);
        a.exportSymbol("isObservable", a.isObservable);
        a.exportSymbol("isWriteableObservable", a.isWriteableObservable);
        a.exportSymbol("isWritableObservable", a.isWriteableObservable);
        a.observableArray = function(b) {
          b = b || [];
          if ("object" != typeof b || !("length" in b)) {
            throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
          }
          b = a.observable(b);
          a.utils.setPrototypeOfOrExtend(b, a.observableArray.fn);
          return b.extend({trackArrayChanges:!0});
        };
        a.observableArray.fn = {remove:function(b) {
          for (var c = this.peek(), d = [], f = "function" != typeof b || a.isObservable(b) ? function(a) {
            return a === b;
          } : b, k = 0;k < c.length;k++) {
            var l = c[k];
            f(l) && (0 === d.length && this.valueWillMutate(), d.push(l), c.splice(k, 1), k--);
          }
          d.length && this.valueHasMutated();
          return d;
        }, removeAll:function(b) {
          if (b === c) {
            var d = this.peek(), f = d.slice(0);
            this.valueWillMutate();
            d.splice(0, d.length);
            this.valueHasMutated();
            return f;
          }
          return b ? this.remove(function(c) {
            return 0 <= a.utils.arrayIndexOf(b, c);
          }) : [];
        }, destroy:function(b) {
          var c = this.peek(), d = "function" != typeof b || a.isObservable(b) ? function(a) {
            return a === b;
          } : b;
          this.valueWillMutate();
          for (var f = c.length - 1;0 <= f;f--) {
            d(c[f]) && (c[f]._destroy = !0);
          }
          this.valueHasMutated();
        }, destroyAll:function(b) {
          return b === c ? this.destroy(function() {
            return !0;
          }) : b ? this.destroy(function(c) {
            return 0 <= a.utils.arrayIndexOf(b, c);
          }) : [];
        }, indexOf:function(b) {
          var c = this();
          return a.utils.arrayIndexOf(c, b);
        }, replace:function(a, b) {
          var c = this.indexOf(a);
          0 <= c && (this.valueWillMutate(), this.peek()[c] = b, this.valueHasMutated());
        }};
        a.utils.arrayForEach("pop push reverse shift sort splice unshift".split(" "), function(b) {
          a.observableArray.fn[b] = function() {
            var a = this.peek();
            this.valueWillMutate();
            this.cacheDiffForKnownOperation(a, b, arguments);
            a = a[b].apply(a, arguments);
            this.valueHasMutated();
            return a;
          };
        });
        a.utils.arrayForEach(["slice"], function(b) {
          a.observableArray.fn[b] = function() {
            var a = this();
            return a[b].apply(a, arguments);
          };
        });
        a.utils.canSetPrototype && a.utils.setPrototypeOf(a.observableArray.fn, a.observable.fn);
        a.exportSymbol("observableArray", a.observableArray);
        a.extenders.trackArrayChanges = function(b) {
          function c() {
            if (!d) {
              d = !0;
              var t = b.notifySubscribers;
              b.notifySubscribers = function(a, b) {
                b && "change" !== b || ++l;
                return t.apply(this, arguments);
              };
              var n = [].concat(b.peek() || []);
              f = null;
              k = b.subscribe(function(c) {
                c = [].concat(c || []);
                if (b.hasSubscriptionsForEvent("arrayChange")) {
                  var d;
                  if (!f || 1 < l) {
                    f = a.utils.compareArrays(n, c, {sparse:!0});
                  }
                  d = f;
                }
                n = c;
                f = null;
                l = 0;
                d && d.length && b.notifySubscribers(d, "arrayChange");
              });
            }
          }
          if (!b.cacheDiffForKnownOperation) {
            var d = !1, f = null, k, l = 0, p = b.beforeSubscriptionAdd, w = b.afterSubscriptionRemove;
            b.beforeSubscriptionAdd = function(a) {
              p && p.call(b, a);
              "arrayChange" === a && c();
            };
            b.afterSubscriptionRemove = function(a) {
              w && w.call(b, a);
              "arrayChange" !== a || b.hasSubscriptionsForEvent("arrayChange") || (k.dispose(), d = !1);
            };
            b.cacheDiffForKnownOperation = function(b, c, m) {
              function h(a, b, c) {
                return k[k.length] = {status:a, value:b, index:c};
              }
              if (d && !l) {
                var k = [], t = b.length, e = m.length, w = 0;
                switch(c) {
                  case "push":
                    w = t;
                  case "unshift":
                    for (c = 0;c < e;c++) {
                      h("added", m[c], w + c);
                    }
                    break;
                  case "pop":
                    w = t - 1;
                  case "shift":
                    t && h("deleted", b[w], w);
                    break;
                  case "splice":
                    c = Math.min(Math.max(0, 0 > m[0] ? t + m[0] : m[0]), t);
                    for (var t = 1 === e ? t : Math.min(c + (m[1] || 0), t), e = c + e - 2, w = Math.max(t, e), p = [], I = [], q = 2;c < w;++c, ++q) {
                      c < t && I.push(h("deleted", b[c], c)), c < e && p.push(h("added", m[q], c));
                    }
                    a.utils.findMovesInArrayComparison(I, p);
                    break;
                  default:
                    return;
                }
                f = k;
              }
            };
          }
        };
        a.computed = a.dependentObservable = function(b, d, f) {
          function k(a, b, c) {
            if (z && b === y) {
              throw Error("A 'pure' computed must not be called recursively");
            }
            P[a] = c;
            c._order = Z++;
            c._version = b.getVersion();
          }
          function l() {
            var a, b;
            for (a in P) {
              if (P.hasOwnProperty(a) && (b = P[a], b._target.hasChanged(b._version))) {
                return !0;
              }
            }
          }
          function p() {
            !N && P && a.utils.objectForEach(P, function(a, b) {
              b.dispose && b.dispose();
            });
            P = null;
            Z = 0;
            B = !0;
            N = R = !1;
          }
          function q() {
            var a = y.throttleEvaluation;
            a && 0 <= a ? (clearTimeout(K), K = setTimeout(function() {
              w(!0);
            }, a)) : y._evalRateLimited ? y._evalRateLimited() : w(!0);
          }
          function w(b) {
            if (!v && !B) {
              if (G && G()) {
                if (!e) {
                  E();
                  return;
                }
              } else {
                e = !1;
              }
              v = !0;
              try {
                var f = P, m = Z, n = z ? c : !Z;
                a.dependencyDetection.begin({callback:function(a, b) {
                  B || (m && f[b] ? (k(b, a, f[b]), delete f[b], --m) : P[b] || k(b, a, N ? {_target:a} : a.subscribe(q)));
                }, computed:y, isInitial:n});
                P = {};
                Z = 0;
                try {
                  var l = d ? u.call(d) : u();
                } finally {
                  a.dependencyDetection.end(), m && !N && a.utils.objectForEach(f, function(a, b) {
                    b.dispose && b.dispose();
                  }), R = !1;
                }
                y.isDifferent(h, l) && (N || y.notifySubscribers(h, "beforeChange"), h = l, N ? y.updateVersion() : b && y.notifySubscribers(h, void 0));
                n && y.notifySubscribers(h, "awake");
              } finally {
                v = !1;
              }
              Z || E();
            }
          }
          function y() {
            if (0 < arguments.length) {
              if ("function" === typeof H) {
                H.apply(d, arguments);
              } else {
                throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
              }
              return this;
            }
            a.dependencyDetection.registerDependency(y);
            (R || N && l()) && w();
            return h;
          }
          function n() {
            (R && !Z || N && l()) && w();
            return h;
          }
          function D() {
            return R || 0 < Z;
          }
          var h, R = !0, v = !1, e = !1, B = !1, u = b, z = !1, N = !1;
          u && "object" == typeof u ? (f = u, u = f.read) : (f = f || {}, u || (u = f.read));
          if ("function" != typeof u) {
            throw Error("Pass a function that returns the value of the ko.computed");
          }
          var H = f.write, L = f.disposeWhenNodeIsRemoved || f.disposeWhenNodeIsRemoved || null, Y = f.disposeWhen || f.disposeWhen, G = Y, E = p, P = {}, Z = 0, K = null;
          d || (d = f.owner);
          a.subscribable.call(y);
          a.utils.setPrototypeOfOrExtend(y, a.dependentObservable.fn);
          y.peek = n;
          y.getDependenciesCount = function() {
            return Z;
          };
          y.hasWriteFunction = "function" === typeof H;
          y.dispose = function() {
            E();
          };
          y.isActive = D;
          var M = y.limit;
          y.limit = function(a) {
            M.call(y, a);
            y._evalRateLimited = function() {
              y._rateLimitedBeforeChange(h);
              R = !0;
              y._rateLimitedChange(y);
            };
          };
          f.pure ? (N = z = !0, y.beforeSubscriptionAdd = function(b) {
            if (!B && N && "change" == b) {
              N = !1;
              if (R || l()) {
                P = null, Z = 0, R = !0, w();
              } else {
                var c = [];
                a.utils.objectForEach(P, function(a, b) {
                  c[b._order] = a;
                });
                a.utils.arrayForEach(c, function(a, b) {
                  var c = P[a], e = c._target.subscribe(q);
                  e._order = b;
                  e._version = c._version;
                  P[a] = e;
                });
              }
              B || y.notifySubscribers(h, "awake");
            }
          }, y.afterSubscriptionRemove = function(b) {
            B || "change" != b || y.hasSubscriptionsForEvent("change") || (a.utils.objectForEach(P, function(a, b) {
              b.dispose && (P[a] = {_target:b._target, _order:b._order, _version:b._version}, b.dispose());
            }), N = !0, y.notifySubscribers(c, "asleep"));
          }, y._originalGetVersion = y.getVersion, y.getVersion = function() {
            N && (R || l()) && w();
            return y._originalGetVersion();
          }) : f.deferEvaluation && (y.beforeSubscriptionAdd = function(a) {
            "change" != a && "beforeChange" != a || n();
          });
          a.exportProperty(y, "peek", y.peek);
          a.exportProperty(y, "dispose", y.dispose);
          a.exportProperty(y, "isActive", y.isActive);
          a.exportProperty(y, "getDependenciesCount", y.getDependenciesCount);
          L && (e = !0, L.nodeType && (G = function() {
            return !a.utils.domNodeIsAttachedToDocument(L) || Y && Y();
          }));
          N || f.deferEvaluation || w();
          L && D() && L.nodeType && (E = function() {
            a.utils.domNodeDisposal.removeDisposeCallback(L, E);
            p();
          }, a.utils.domNodeDisposal.addDisposeCallback(L, E));
          return y;
        };
        a.isComputed = function(b) {
          return a.hasPrototype(b, a.dependentObservable);
        };
        Q = a.observable.protoProperty;
        a.dependentObservable[Q] = a.observable;
        a.dependentObservable.fn = {equalityComparer:k};
        a.dependentObservable.fn[Q] = a.dependentObservable;
        a.utils.canSetPrototype && a.utils.setPrototypeOf(a.dependentObservable.fn, a.subscribable.fn);
        a.exportSymbol("dependentObservable", a.dependentObservable);
        a.exportSymbol("computed", a.dependentObservable);
        a.exportSymbol("isComputed", a.isComputed);
        a.pureComputed = function(b, c) {
          if ("function" === typeof b) {
            return a.computed(b, c, {pure:!0});
          }
          b = a.utils.extend({}, b);
          b.pure = !0;
          return a.computed(b, c);
        };
        a.exportSymbol("pureComputed", a.pureComputed);
        (function() {
          function b(a, k, l) {
            l = l || new f;
            a = k(a);
            if ("object" != typeof a || null === a || a === c || a instanceof Date || a instanceof String || a instanceof Number || a instanceof Boolean) {
              return a;
            }
            var p = a instanceof Array ? [] : {};
            l.save(a, p);
            d(a, function(d) {
              var f = k(a[d]);
              switch(typeof f) {
                case "boolean":
                ;
                case "number":
                ;
                case "string":
                ;
                case "function":
                  p[d] = f;
                  break;
                case "object":
                ;
                case "undefined":
                  var n = l.get(f);
                  p[d] = n !== c ? n : b(f, k, l);
              }
            });
            return p;
          }
          function d(a, b) {
            if (a instanceof Array) {
              for (var c = 0;c < a.length;c++) {
                b(c);
              }
              "function" == typeof a.toJSON && b("toJSON");
            } else {
              for (c in a) {
                b(c);
              }
            }
          }
          function f() {
            this.keys = [];
            this.values = [];
          }
          a.toJS = function(c) {
            if (0 == arguments.length) {
              throw Error("When calling ko.toJS, pass the object you want to convert.");
            }
            return b(c, function(b) {
              for (var c = 0;a.isObservable(b) && 10 > c;c++) {
                b = b();
              }
              return b;
            });
          };
          a.toJSON = function(b, c, d) {
            b = a.toJS(b);
            return a.utils.stringifyJson(b, c, d);
          };
          f.prototype = {constructor:f, save:function(b, c) {
            var d = a.utils.arrayIndexOf(this.keys, b);
            0 <= d ? this.values[d] = c : (this.keys.push(b), this.values.push(c));
          }, get:function(b) {
            b = a.utils.arrayIndexOf(this.keys, b);
            return 0 <= b ? this.values[b] : c;
          }};
        })();
        a.exportSymbol("toJS", a.toJS);
        a.exportSymbol("toJSON", a.toJSON);
        (function() {
          a.selectExtensions = {readValue:function(b) {
            switch(a.utils.tagNameLower(b)) {
              case "option":
                return !0 === b.__ko__hasDomDataOptionValue__ ? a.utils.domData.get(b, a.bindingHandlers.options.optionValueDomDataKey) : 7 >= a.utils.ieVersion ? b.getAttributeNode("value") && b.getAttributeNode("value").specified ? b.value : b.text : b.value;
              case "select":
                return 0 <= b.selectedIndex ? a.selectExtensions.readValue(b.options[b.selectedIndex]) : c;
              default:
                return b.value;
            }
          }, writeValue:function(b, d, f) {
            switch(a.utils.tagNameLower(b)) {
              case "option":
                switch(typeof d) {
                  case "string":
                    a.utils.domData.set(b, a.bindingHandlers.options.optionValueDomDataKey, c);
                    "__ko__hasDomDataOptionValue__" in b && delete b.__ko__hasDomDataOptionValue__;
                    b.value = d;
                    break;
                  default:
                    a.utils.domData.set(b, a.bindingHandlers.options.optionValueDomDataKey, d), b.__ko__hasDomDataOptionValue__ = !0, b.value = "number" === typeof d ? d : "";
                }
                break;
              case "select":
                if ("" === d || null === d) {
                  d = c;
                }
                for (var k = -1, l = 0, p = b.options.length, q;l < p;++l) {
                  if (q = a.selectExtensions.readValue(b.options[l]), q == d || "" == q && d === c) {
                    k = l;
                    break;
                  }
                }
                if (f || 0 <= k || d === c && 1 < b.size) {
                  b.selectedIndex = k;
                }
                break;
              default:
                if (null === d || d === c) {
                  d = "";
                }
                b.value = d;
            }
          }};
        })();
        a.exportSymbol("selectExtensions", a.selectExtensions);
        a.exportSymbol("selectExtensions.readValue", a.selectExtensions.readValue);
        a.exportSymbol("selectExtensions.writeValue", a.selectExtensions.writeValue);
        a.expressionRewriting = function() {
          function b(c) {
            c = a.utils.stringTrim(c);
            123 === c.charCodeAt(0) && (c = c.slice(1, -1));
            var d = [], m = c.match(f), t, h = [], x = 0;
            if (m) {
              m.push(",");
              for (var v = 0, e;e = m[v];++v) {
                var p = e.charCodeAt(0);
                if (44 === p) {
                  if (0 >= x) {
                    d.push(t && h.length ? {key:t, value:h.join("")} : {unknown:t || h.join("")});
                    t = x = 0;
                    h = [];
                    continue;
                  }
                } else {
                  if (58 === p) {
                    if (!x && !t && 1 === h.length) {
                      t = h.pop();
                      continue;
                    }
                  } else {
                    47 === p && v && 1 < e.length ? (p = m[v - 1].match(k)) && !l[p[0]] && (c = c.substr(c.indexOf(e) + 1), m = c.match(f), m.push(","), v = -1, e = "/") : 40 === p || 123 === p || 91 === p ? ++x : 41 === p || 125 === p || 93 === p ? --x : t || h.length || 34 !== p && 39 !== p || (e = e.slice(1, -1));
                  }
                }
                h.push(e);
              }
            }
            return d;
          }
          var c = ["true", "false", "null", "undefined"], d = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i, f = RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]", "g"), k = /[\])"'A-Za-z0-9_$]+$/, l = {"in":1, "return":1, "typeof":1}, p = {};
          return {bindingRewriteValidators:[], twoWayBindings:p, parseObjectLiteral:b, preProcessBindings:function(f, k) {
            function n(b, e) {
              var f;
              if (!v) {
                var m = a.getBindingHandler(b);
                if (m && m.preprocess && !(e = m.preprocess(e, b, n))) {
                  return;
                }
                if (m = p[b]) {
                  f = e, 0 <= a.utils.arrayIndexOf(c, f) ? f = !1 : (m = f.match(d), f = null === m ? !1 : m[1] ? "Object(" + m[1] + ")" + m[2] : f), m = f;
                }
                m && h.push("'" + b + "':function(_z){" + f + "=_z}");
              }
              A && (e = "function(){return " + e + " }");
              l.push("'" + b + "':" + e);
            }
            k = k || {};
            var l = [], h = [], A = k.valueAccessors, v = k.bindingParams, e = "string" === typeof f ? b(f) : f;
            a.utils.arrayForEach(e, function(a) {
              n(a.key || a.unknown, a.value);
            });
            h.length && n("_ko_property_writers", "{" + h.join(",") + " }");
            return l.join(",");
          }, keyValueArrayContainsKey:function(a, b) {
            for (var c = 0;c < a.length;c++) {
              if (a[c].key == b) {
                return !0;
              }
            }
            return !1;
          }, writeValueToProperty:function(b, c, d, f, h) {
            if (b && a.isObservable(b)) {
              !a.isWriteableObservable(b) || h && b.peek() === f || b(f);
            } else {
              if ((b = c.get("_ko_property_writers")) && b[d]) {
                b[d](f);
              }
            }
          }};
        }();
        a.exportSymbol("expressionRewriting", a.expressionRewriting);
        a.exportSymbol("expressionRewriting.bindingRewriteValidators", a.expressionRewriting.bindingRewriteValidators);
        a.exportSymbol("expressionRewriting.parseObjectLiteral", a.expressionRewriting.parseObjectLiteral);
        a.exportSymbol("expressionRewriting.preProcessBindings", a.expressionRewriting.preProcessBindings);
        a.exportSymbol("expressionRewriting._twoWayBindings", a.expressionRewriting.twoWayBindings);
        a.exportSymbol("jsonExpressionRewriting", a.expressionRewriting);
        a.exportSymbol("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", a.expressionRewriting.preProcessBindings);
        (function() {
          function b(a) {
            return 8 == a.nodeType && p.test(l ? a.text : a.nodeValue);
          }
          function c(a) {
            return 8 == a.nodeType && q.test(l ? a.text : a.nodeValue);
          }
          function f(a, d) {
            for (var k = a, h = 1, l = [];k = k.nextSibling;) {
              if (c(k) && (h--, 0 === h)) {
                return l;
              }
              l.push(k);
              b(k) && h++;
            }
            if (!d) {
              throw Error("Cannot find closing comment tag to match: " + a.nodeValue);
            }
            return null;
          }
          function k(a, b) {
            var c = f(a, b);
            return c ? 0 < c.length ? c[c.length - 1].nextSibling : a.nextSibling : null;
          }
          var l = d && "\x3c!--test--\x3e" === d.createComment("test").text, p = l ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/, q = l ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/, w = {ul:!0, ol:!0};
          a.virtualElements = {allowedBindings:{}, childNodes:function(a) {
            return b(a) ? f(a) : a.childNodes;
          }, emptyNode:function(c) {
            if (b(c)) {
              c = a.virtualElements.childNodes(c);
              for (var d = 0, f = c.length;d < f;d++) {
                a.removeNode(c[d]);
              }
            } else {
              a.utils.emptyDomNode(c);
            }
          }, setDomNodeChildren:function(c, d) {
            if (b(c)) {
              a.virtualElements.emptyNode(c);
              for (var f = c.nextSibling, h = 0, k = d.length;h < k;h++) {
                f.parentNode.insertBefore(d[h], f);
              }
            } else {
              a.utils.setDomNodeChildren(c, d);
            }
          }, prepend:function(a, c) {
            b(a) ? a.parentNode.insertBefore(c, a.nextSibling) : a.firstChild ? a.insertBefore(c, a.firstChild) : a.appendChild(c);
          }, insertAfter:function(c, d, f) {
            f ? b(c) ? c.parentNode.insertBefore(d, f.nextSibling) : f.nextSibling ? c.insertBefore(d, f.nextSibling) : c.appendChild(d) : a.virtualElements.prepend(c, d);
          }, firstChild:function(a) {
            return b(a) ? !a.nextSibling || c(a.nextSibling) ? null : a.nextSibling : a.firstChild;
          }, nextSibling:function(a) {
            b(a) && (a = k(a));
            return a.nextSibling && c(a.nextSibling) ? null : a.nextSibling;
          }, hasBindingValue:b, virtualNodeBindingValue:function(a) {
            return (a = (l ? a.text : a.nodeValue).match(p)) ? a[1] : null;
          }, normaliseVirtualElementDomStructure:function(d) {
            if (w[a.utils.tagNameLower(d)]) {
              var f = d.firstChild;
              if (f) {
                do {
                  if (1 === f.nodeType) {
                    var l;
                    l = f.firstChild;
                    var h = null;
                    if (l) {
                      do {
                        if (h) {
                          h.push(l);
                        } else {
                          if (b(l)) {
                            var x = k(l, !0);
                            x ? l = x : h = [l];
                          } else {
                            c(l) && (h = [l]);
                          }
                        }
                      } while (l = l.nextSibling);
                    }
                    if (l = h) {
                      for (h = f.nextSibling, x = 0;x < l.length;x++) {
                        h ? d.insertBefore(l[x], h) : d.appendChild(l[x]);
                      }
                    }
                  }
                } while (f = f.nextSibling);
              }
            }
          }};
        })();
        a.exportSymbol("virtualElements", a.virtualElements);
        a.exportSymbol("virtualElements.allowedBindings", a.virtualElements.allowedBindings);
        a.exportSymbol("virtualElements.emptyNode", a.virtualElements.emptyNode);
        a.exportSymbol("virtualElements.insertAfter", a.virtualElements.insertAfter);
        a.exportSymbol("virtualElements.prepend", a.virtualElements.prepend);
        a.exportSymbol("virtualElements.setDomNodeChildren", a.virtualElements.setDomNodeChildren);
        (function() {
          a.bindingProvider = function() {
            this.bindingCache = {};
          };
          a.utils.extend(a.bindingProvider.prototype, {nodeHasBindings:function(b) {
            switch(b.nodeType) {
              case 1:
                return null != b.getAttribute("data-bind") || a.components.getComponentNameForNode(b);
              case 8:
                return a.virtualElements.hasBindingValue(b);
              default:
                return !1;
            }
          }, getBindings:function(b, c) {
            var d = this.getBindingsString(b, c), d = d ? this.parseBindingsString(d, c, b) : null;
            return a.components.addBindingsForCustomElement(d, b, c, !1);
          }, getBindingAccessors:function(b, c) {
            var d = this.getBindingsString(b, c), d = d ? this.parseBindingsString(d, c, b, {valueAccessors:!0}) : null;
            return a.components.addBindingsForCustomElement(d, b, c, !0);
          }, getBindingsString:function(b, c) {
            switch(b.nodeType) {
              case 1:
                return b.getAttribute("data-bind");
              case 8:
                return a.virtualElements.virtualNodeBindingValue(b);
              default:
                return null;
            }
          }, parseBindingsString:function(b, c, d, f) {
            try {
              var k = this.bindingCache, l = b + (f && f.valueAccessors || ""), p;
              if (!(p = k[l])) {
                var w, y = "with($context){with($data||{}){return{" + a.expressionRewriting.preProcessBindings(b, f) + "}}}";
                w = new Function("$context", "$element", y);
                p = k[l] = w;
              }
              return p(c, d);
            } catch (n) {
              throw n.message = "Unable to parse bindings.\nBindings value: " + b + "\nMessage: " + n.message, n;
            }
          }});
          a.bindingProvider.instance = new a.bindingProvider;
        })();
        a.exportSymbol("bindingProvider", a.bindingProvider);
        (function() {
          function b(a) {
            return function() {
              return a;
            };
          }
          function d(a) {
            return a();
          }
          function f(b) {
            return a.utils.objectMap(a.dependencyDetection.ignore(b), function(a, c) {
              return function() {
                return b()[c];
              };
            });
          }
          function k(c, e, d) {
            return "function" === typeof c ? f(c.bind(null, e, d)) : a.utils.objectMap(c, b);
          }
          function p(a, b) {
            return f(this.getBindings.bind(this, a, b));
          }
          function J(b, c, d) {
            var f, h = a.virtualElements.firstChild(c), m = a.bindingProvider.instance, k = m.preprocessNode;
            if (k) {
              for (;f = h;) {
                h = a.virtualElements.nextSibling(f), k.call(m, f);
              }
              h = a.virtualElements.firstChild(c);
            }
            for (;f = h;) {
              h = a.virtualElements.nextSibling(f), u(b, f, d);
            }
          }
          function u(b, c, d) {
            var f = !0, h = 1 === c.nodeType;
            h && a.virtualElements.normaliseVirtualElementDomStructure(c);
            if (h && d || a.bindingProvider.instance.nodeHasBindings(c)) {
              f = y(c, null, b, d).shouldBindDescendants;
            }
            f && !D[a.utils.tagNameLower(c)] && J(b, c, !h);
          }
          function w(b) {
            var c = [], d = {}, f = [];
            a.utils.objectForEach(b, function N(h) {
              if (!d[h]) {
                var m = a.getBindingHandler(h);
                m && (m.after && (f.push(h), a.utils.arrayForEach(m.after, function(c) {
                  if (b[c]) {
                    if (-1 !== a.utils.arrayIndexOf(f, c)) {
                      throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + f.join(", "));
                    }
                    N(c);
                  }
                }), f.length--), c.push({key:h, handler:m}));
                d[h] = !0;
              }
            });
            return c;
          }
          function y(b, e, f, m) {
            var k = a.utils.domData.get(b, h);
            if (!e) {
              if (k) {
                throw Error("You cannot apply bindings multiple times to the same element.");
              }
              a.utils.domData.set(b, h, !0);
            }
            !k && m && a.storedBindingContextForNode(b, f);
            var n;
            if (e && "function" !== typeof e) {
              n = e;
            } else {
              var l = a.bindingProvider.instance, x = l.getBindingAccessors || p, y = a.dependentObservable(function() {
                (n = e ? e(f, b) : x.call(l, b, f)) && f._subscribable && f._subscribable();
                return n;
              }, null, {disposeWhenNodeIsRemoved:b});
              n && y.isActive() || (y = null);
            }
            var A;
            if (n) {
              var D, q;
              (function() {
                var e = function() {
                  return a.utils.objectMap(y ? y() : n, d);
                };
                D = y ? function(a) {
                  return function() {
                    return d(y()[a]);
                  };
                } : function(a) {
                  return n[a];
                };
                e.get = function(a) {
                  return n[a] && d(D(a));
                };
                e.has = function(a) {
                  return a in n;
                };
                q = w(n);
                a.utils.arrayForEach(q, function(d) {
                  var h = d.handler.init, m = d.handler.update, k = d.key;
                  if (8 === b.nodeType && !a.virtualElements.allowedBindings[k]) {
                    throw Error("The binding '" + k + "' cannot be used with virtual elements");
                  }
                  try {
                    "function" == typeof h && a.dependencyDetection.ignore(function() {
                      var a = h(b, D(k), e, f.$data, f);
                      if (a && a.controlsDescendantBindings) {
                        if (A !== c) {
                          throw Error("Multiple bindings (" + A + " and " + k + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                        }
                        A = k;
                      }
                    }), "function" == typeof m && a.dependentObservable(function() {
                      m(b, D(k), e, f.$data, f);
                    }, null, {disposeWhenNodeIsRemoved:b});
                  } catch (l) {
                    throw l.message = 'Unable to process binding "' + k + ": " + n[k] + '"\nMessage: ' + l.message, l;
                  }
                });
              })();
            }
            return {shouldBindDescendants:A === c};
          }
          function n(b) {
            return b && b instanceof a.bindingContext ? b : new a.bindingContext(b);
          }
          a.bindingHandlers = {};
          var D = {script:!0, textarea:!0};
          a.getBindingHandler = function(b) {
            return a.bindingHandlers[b];
          };
          a.bindingContext = function(b, e, d, f) {
            var h = this, m = "function" == typeof b && !a.isObservable(b), k, n = a.dependentObservable(function() {
              var c = m ? b() : b, k = a.utils.unwrapObservable(c);
              e ? (e._subscribable && e._subscribable(), a.utils.extend(h, e), n && (h._subscribable = n)) : (h.$parents = [], h.$root = k, h.ko = a);
              h.$rawData = c;
              h.$data = k;
              d && (h[d] = k);
              f && f(h, e, k);
              return h.$data;
            }, null, {disposeWhen:function() {
              return k && !a.utils.anyDomNodeIsAttachedToDocument(k);
            }, disposeWhenNodeIsRemoved:!0});
            n.isActive() && (h._subscribable = n, n.equalityComparer = null, k = [], n._addNode = function(b) {
              k.push(b);
              a.utils.domNodeDisposal.addDisposeCallback(b, function(b) {
                a.utils.arrayRemoveItem(k, b);
                k.length || (n.dispose(), h._subscribable = n = c);
              });
            });
          };
          a.bindingContext.prototype.createChildContext = function(b, c, d) {
            return new a.bindingContext(b, this, c, function(a, b) {
              a.$parentContext = b;
              a.$parent = b.$data;
              a.$parents = (b.$parents || []).slice(0);
              a.$parents.unshift(a.$parent);
              d && d(a);
            });
          };
          a.bindingContext.prototype.extend = function(b) {
            return new a.bindingContext(this._subscribable || this.$data, this, null, function(c, d) {
              c.$rawData = d.$rawData;
              a.utils.extend(c, "function" == typeof b ? b() : b);
            });
          };
          var h = a.utils.domData.nextKey(), R = a.utils.domData.nextKey();
          a.storedBindingContextForNode = function(b, c) {
            if (2 == arguments.length) {
              a.utils.domData.set(b, R, c), c._subscribable && c._subscribable._addNode(b);
            } else {
              return a.utils.domData.get(b, R);
            }
          };
          a.applyBindingAccessorsToNode = function(b, c, d) {
            1 === b.nodeType && a.virtualElements.normaliseVirtualElementDomStructure(b);
            return y(b, c, n(d), !0);
          };
          a.applyBindingsToNode = function(b, c, d) {
            d = n(d);
            return a.applyBindingAccessorsToNode(b, k(c, d, b), d);
          };
          a.applyBindingsToDescendants = function(a, b) {
            1 !== b.nodeType && 8 !== b.nodeType || J(n(a), b, !0);
          };
          a.applyBindings = function(a, b) {
            !q && l.jQuery && (q = l.jQuery);
            if (b && 1 !== b.nodeType && 8 !== b.nodeType) {
              throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
            }
            b = b || l.document.body;
            u(n(a), b, !0);
          };
          a.contextFor = function(b) {
            switch(b.nodeType) {
              case 1:
              ;
              case 8:
                var e = a.storedBindingContextForNode(b);
                if (e) {
                  return e;
                }
                if (b.parentNode) {
                  return a.contextFor(b.parentNode);
                }
              ;
            }
            return c;
          };
          a.dataFor = function(b) {
            return (b = a.contextFor(b)) ? b.$data : c;
          };
          a.exportSymbol("bindingHandlers", a.bindingHandlers);
          a.exportSymbol("applyBindings", a.applyBindings);
          a.exportSymbol("applyBindingsToDescendants", a.applyBindingsToDescendants);
          a.exportSymbol("applyBindingAccessorsToNode", a.applyBindingAccessorsToNode);
          a.exportSymbol("applyBindingsToNode", a.applyBindingsToNode);
          a.exportSymbol("contextFor", a.contextFor);
          a.exportSymbol("dataFor", a.dataFor);
        })();
        (function(b) {
          function c(a, d) {
            return a.hasOwnProperty(d) ? a[d] : b;
          }
          function d(b, m) {
            var k = c(l, b), x;
            k ? k.subscribe(m) : (k = l[b] = new a.subscribable, k.subscribe(m), f(b, function(a, c) {
              var d = !(!c || !c.synchronous);
              p[b] = {definition:a, isSynchronousComponent:d};
              delete l[b];
              x || d ? k.notifySubscribers(a) : setTimeout(function() {
                k.notifySubscribers(a);
              }, 0);
            }), x = !0);
          }
          function f(a, b) {
            k("getConfig", [a], function(c) {
              c ? k("loadComponent", [a, c], function(a) {
                b(a, c);
              }) : b(null, null);
            });
          }
          function k(c, d, f, l) {
            l || (l = a.components.loaders.slice(0));
            var h = l.shift();
            if (h) {
              var t = h[c];
              if (t) {
                var x = !1;
                if (t.apply(h, d.concat(function(a) {
                  x ? f(null) : null !== a ? f(a) : k(c, d, f, l);
                })) !== b && (x = !0, !h.suppressLoaderExceptions)) {
                  throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.");
                }
              } else {
                k(c, d, f, l);
              }
            } else {
              f(null);
            }
          }
          var l = {}, p = {};
          a.components = {get:function(b, f) {
            var m = c(p, b);
            m ? m.isSynchronousComponent ? a.dependencyDetection.ignore(function() {
              f(m.definition);
            }) : setTimeout(function() {
              f(m.definition);
            }, 0) : d(b, f);
          }, clearCachedDefinition:function(a) {
            delete p[a];
          }, _getFirstResultFromLoaders:k};
          a.components.loaders = [];
          a.exportSymbol("components", a.components);
          a.exportSymbol("components.get", a.components.get);
          a.exportSymbol("components.clearCachedDefinition", a.components.clearCachedDefinition);
        })();
        (function(b) {
          function c(b, d, f, m) {
            var k = {}, e = 2, l = function() {
              0 === --e && m(k);
            }, t = f.template;
            f = f.viewModel;
            t ? u(d, t, function(c) {
              a.components._getFirstResultFromLoaders("loadTemplate", [b, c], function(a) {
                k.template = a;
                l();
              });
            }) : l();
            f ? u(d, f, function(c) {
              a.components._getFirstResultFromLoaders("loadViewModel", [b, c], function(a) {
                k[y] = a;
                l();
              });
            }) : l();
          }
          function k(a, b, c) {
            if ("function" === typeof b) {
              c(function(a) {
                return new b(a);
              });
            } else {
              if ("function" === typeof b[y]) {
                c(b[y]);
              } else {
                if ("instance" in b) {
                  var d = b.instance;
                  c(function(a, b) {
                    return d;
                  });
                } else {
                  "viewModel" in b ? k(a, b.viewModel, c) : a("Unknown viewModel value: " + b);
                }
              }
            }
          }
          function p(b) {
            switch(a.utils.tagNameLower(b)) {
              case "script":
                return a.utils.parseHtmlFragment(b.text);
              case "textarea":
                return a.utils.parseHtmlFragment(b.value);
              case "template":
                if (q(b.content)) {
                  return a.utils.cloneNodes(b.content.childNodes);
                }
              ;
            }
            return a.utils.cloneNodes(b.childNodes);
          }
          function q(a) {
            return l.DocumentFragment ? a instanceof DocumentFragment : a && 11 === a.nodeType;
          }
          function u(a, b, c) {
            "string" === typeof b.require ? f || l.require ? (f || l.require)([b.require], c) : a("Uses require, but no AMD loader is present") : c(b);
          }
          function S(a) {
            return function(b) {
              throw Error("Component '" + a + "': " + b);
            };
          }
          var w = {};
          a.components.register = function(b, c) {
            if (!c) {
              throw Error("Invalid configuration for " + b);
            }
            if (a.components.isRegistered(b)) {
              throw Error("Component " + b + " is already registered");
            }
            w[b] = c;
          };
          a.components.isRegistered = function(a) {
            return a in w;
          };
          a.components.unregister = function(b) {
            delete w[b];
            a.components.clearCachedDefinition(b);
          };
          a.components.defaultLoader = {getConfig:function(a, b) {
            var c = w.hasOwnProperty(a) ? w[a] : null;
            b(c);
          }, loadComponent:function(a, b, d) {
            var f = S(a);
            u(f, b, function(b) {
              c(a, f, b, d);
            });
          }, loadTemplate:function(b, c, f) {
            b = S(b);
            if ("string" === typeof c) {
              f(a.utils.parseHtmlFragment(c));
            } else {
              if (c instanceof Array) {
                f(c);
              } else {
                if (q(c)) {
                  f(a.utils.makeArray(c.childNodes));
                } else {
                  if (c.element) {
                    if (c = c.element, l.HTMLElement ? c instanceof HTMLElement : c && c.tagName && 1 === c.nodeType) {
                      f(p(c));
                    } else {
                      if ("string" === typeof c) {
                        var m = d.getElementById(c);
                        m ? f(p(m)) : b("Cannot find element with ID " + c);
                      } else {
                        b("Unknown element type: " + c);
                      }
                    }
                  } else {
                    b("Unknown template value: " + c);
                  }
                }
              }
            }
          }, loadViewModel:function(a, b, c) {
            k(S(a), b, c);
          }};
          var y = "createViewModel";
          a.exportSymbol("components.register", a.components.register);
          a.exportSymbol("components.isRegistered", a.components.isRegistered);
          a.exportSymbol("components.unregister", a.components.unregister);
          a.exportSymbol("components.defaultLoader", a.components.defaultLoader);
          a.components.loaders.push(a.components.defaultLoader);
          a.components._allRegisteredComponents = w;
        })();
        (function(b) {
          function c(b, d) {
            var m = b.getAttribute("params");
            if (m) {
              var m = f.parseBindingsString(m, d, b, {valueAccessors:!0, bindingParams:!0}), m = a.utils.objectMap(m, function(c, d) {
                return a.computed(c, null, {disposeWhenNodeIsRemoved:b});
              }), k = a.utils.objectMap(m, function(c, d) {
                var f = c.peek();
                return c.isActive() ? a.computed({read:function() {
                  return a.utils.unwrapObservable(c());
                }, write:a.isWriteableObservable(f) && function(a) {
                  c()(a);
                }, disposeWhenNodeIsRemoved:b}) : f;
              });
              k.hasOwnProperty("$raw") || (k.$raw = m);
              return k;
            }
            return {$raw:{}};
          }
          a.components.getComponentNameForNode = function(b) {
            b = a.utils.tagNameLower(b);
            return a.components.isRegistered(b) && b;
          };
          a.components.addBindingsForCustomElement = function(b, d, f, m) {
            if (1 === d.nodeType) {
              var k = a.components.getComponentNameForNode(d);
              if (k) {
                b = b || {};
                if (b.component) {
                  throw Error('Cannot use the "component" binding on a custom element matching a component');
                }
                var l = {name:k, params:c(d, f)};
                b.component = m ? function() {
                  return l;
                } : l;
              }
            }
            return b;
          };
          var f = new a.bindingProvider;
          9 > a.utils.ieVersion && (a.components.register = function(a) {
            return function(b) {
              d.createElement(b);
              return a.apply(this, arguments);
            };
          }(a.components.register), d.createDocumentFragment = function(b) {
            return function() {
              var c = b(), d = a.components._allRegisteredComponents, f;
              for (f in d) {
                d.hasOwnProperty(f) && c.createElement(f);
              }
              return c;
            };
          }(d.createDocumentFragment));
        })();
        (function(b) {
          function c(b, d, f) {
            d = d.template;
            if (!d) {
              throw Error("Component '" + b + "' has no template");
            }
            b = a.utils.cloneNodes(d);
            a.virtualElements.setDomNodeChildren(f, b);
          }
          function d(a, b, c, f) {
            var m = a.createViewModel;
            return m ? m.call(a, f, {element:b, templateNodes:c}) : f;
          }
          var f = 0;
          a.bindingHandlers.component = {init:function(k, l, p, w, y) {
            var n, q, h = function() {
              var a = n && n.dispose;
              "function" === typeof a && a.call(n);
              q = null;
            }, u = a.utils.makeArray(a.virtualElements.childNodes(k));
            a.utils.domNodeDisposal.addDisposeCallback(k, h);
            a.computed(function() {
              var p = a.utils.unwrapObservable(l()), e, w;
              "string" === typeof p ? e = p : (e = a.utils.unwrapObservable(p.name), w = a.utils.unwrapObservable(p.params));
              if (!e) {
                throw Error("No component name specified");
              }
              var S = q = ++f;
              a.components.get(e, function(f) {
                if (q === S) {
                  h();
                  if (!f) {
                    throw Error("Unknown component '" + e + "'");
                  }
                  c(e, f, k);
                  var l = d(f, k, u, w);
                  f = y.createChildContext(l, b, function(a) {
                    a.$component = l;
                    a.$componentTemplateNodes = u;
                  });
                  n = l;
                  a.applyBindingsToDescendants(f, k);
                }
              });
            }, null, {disposeWhenNodeIsRemoved:k});
            return {controlsDescendantBindings:!0};
          }};
          a.virtualElements.allowedBindings.component = !0;
        })();
        var ia = {"class":"className", "for":"htmlFor"};
        a.bindingHandlers.attr = {update:function(b, d, f) {
          d = a.utils.unwrapObservable(d()) || {};
          a.utils.objectForEach(d, function(d, f) {
            f = a.utils.unwrapObservable(f);
            var k = !1 === f || null === f || f === c;
            k && b.removeAttribute(d);
            8 >= a.utils.ieVersion && d in ia ? (d = ia[d], k ? b.removeAttribute(d) : b[d] = f) : k || b.setAttribute(d, f.toString());
            "name" === d && a.utils.setElementName(b, k ? "" : f.toString());
          });
        }};
        (function() {
          a.bindingHandlers.checked = {after:["value", "attr"], init:function(b, d, f) {
            function k() {
              var c = b.checked, l = u ? p() : c;
              if (!a.computedContext.isInitial() && (!w || c)) {
                var q = a.dependencyDetection.ignore(d);
                y ? n !== l ? (c && (a.utils.addOrRemoveItem(q, l, !0), a.utils.addOrRemoveItem(q, n, !1)), n = l) : a.utils.addOrRemoveItem(q, l, c) : a.expressionRewriting.writeValueToProperty(q, f, "checked", l, !0);
              }
            }
            function l() {
              var c = a.utils.unwrapObservable(d());
              b.checked = y ? 0 <= a.utils.arrayIndexOf(c, p()) : q ? c : p() === c;
            }
            var p = a.pureComputed(function() {
              return f.has("checkedValue") ? a.utils.unwrapObservable(f.get("checkedValue")) : f.has("value") ? a.utils.unwrapObservable(f.get("value")) : b.value;
            }), q = "checkbox" == b.type, w = "radio" == b.type;
            if (q || w) {
              var y = q && a.utils.unwrapObservable(d()) instanceof Array, n = y ? p() : c, u = w || y;
              w && !b.name && a.bindingHandlers.uniqueName.init(b, function() {
                return !0;
              });
              a.computed(k, null, {disposeWhenNodeIsRemoved:b});
              a.utils.registerEventHandler(b, "click", k);
              a.computed(l, null, {disposeWhenNodeIsRemoved:b});
            }
          }};
          a.expressionRewriting.twoWayBindings.checked = !0;
          a.bindingHandlers.checkedValue = {update:function(b, c) {
            b.value = a.utils.unwrapObservable(c());
          }};
        })();
        a.bindingHandlers.css = {update:function(b, c) {
          var d = a.utils.unwrapObservable(c());
          null !== d && "object" == typeof d ? a.utils.objectForEach(d, function(c, d) {
            d = a.utils.unwrapObservable(d);
            a.utils.toggleDomNodeCssClass(b, c, d);
          }) : (d = String(d || ""), a.utils.toggleDomNodeCssClass(b, b.__ko__cssValue, !1), b.__ko__cssValue = d, a.utils.toggleDomNodeCssClass(b, d, !0));
        }};
        a.bindingHandlers.enable = {update:function(b, c) {
          var d = a.utils.unwrapObservable(c());
          d && b.disabled ? b.removeAttribute("disabled") : d || b.disabled || (b.disabled = !0);
        }};
        a.bindingHandlers.disable = {update:function(b, c) {
          a.bindingHandlers.enable.update(b, function() {
            return !a.utils.unwrapObservable(c());
          });
        }};
        a.bindingHandlers.event = {init:function(b, c, d, f, k) {
          var l = c() || {};
          a.utils.objectForEach(l, function(l) {
            "string" == typeof l && a.utils.registerEventHandler(b, l, function(b) {
              var m, n = c()[l];
              if (n) {
                try {
                  var p = a.utils.makeArray(arguments);
                  f = k.$data;
                  p.unshift(f);
                  m = n.apply(f, p);
                } finally {
                  !0 !== m && (b.preventDefault ? b.preventDefault() : b.returnValue = !1);
                }
                !1 === d.get(l + "Bubble") && (b.cancelBubble = !0, b.stopPropagation && b.stopPropagation());
              }
            });
          });
        }};
        a.bindingHandlers.foreach = {makeTemplateValueAccessor:function(b) {
          return function() {
            var c = b(), d = a.utils.peekObservable(c);
            if (!d || "number" == typeof d.length) {
              return {foreach:c, templateEngine:a.nativeTemplateEngine.instance};
            }
            a.utils.unwrapObservable(c);
            return {foreach:d.data, as:d.as, includeDestroyed:d.includeDestroyed, afterAdd:d.afterAdd, beforeRemove:d.beforeRemove, afterRender:d.afterRender, beforeMove:d.beforeMove, afterMove:d.afterMove, templateEngine:a.nativeTemplateEngine.instance};
          };
        }, init:function(b, c, d, f, k) {
          return a.bindingHandlers.template.init(b, a.bindingHandlers.foreach.makeTemplateValueAccessor(c));
        }, update:function(b, c, d, f, k) {
          return a.bindingHandlers.template.update(b, a.bindingHandlers.foreach.makeTemplateValueAccessor(c), d, f, k);
        }};
        a.expressionRewriting.bindingRewriteValidators.foreach = !1;
        a.virtualElements.allowedBindings.foreach = !0;
        a.bindingHandlers.hasfocus = {init:function(b, c, d) {
          var f = function(f) {
            b.__ko_hasfocusUpdating = !0;
            var k = b.ownerDocument;
            if ("activeElement" in k) {
              var l;
              try {
                l = k.activeElement;
              } catch (p) {
                l = k.body;
              }
              f = l === b;
            }
            k = c();
            a.expressionRewriting.writeValueToProperty(k, d, "hasfocus", f, !0);
            b.__ko_hasfocusLastValue = f;
            b.__ko_hasfocusUpdating = !1;
          }, k = f.bind(null, !0), f = f.bind(null, !1);
          a.utils.registerEventHandler(b, "focus", k);
          a.utils.registerEventHandler(b, "focusin", k);
          a.utils.registerEventHandler(b, "blur", f);
          a.utils.registerEventHandler(b, "focusout", f);
        }, update:function(b, c) {
          var d = !!a.utils.unwrapObservable(c());
          b.__ko_hasfocusUpdating || b.__ko_hasfocusLastValue === d || (d ? b.focus() : b.blur(), a.dependencyDetection.ignore(a.utils.triggerEvent, null, [b, d ? "focusin" : "focusout"]));
        }};
        a.expressionRewriting.twoWayBindings.hasfocus = !0;
        a.bindingHandlers.hasFocus = a.bindingHandlers.hasfocus;
        a.expressionRewriting.twoWayBindings.hasFocus = !0;
        a.bindingHandlers.html = {init:function() {
          return {controlsDescendantBindings:!0};
        }, update:function(b, c) {
          a.utils.setHtml(b, c());
        }};
        z("if");
        z("ifnot", !1, !0);
        z("with", !0, !1, function(a, b) {
          return a.createChildContext(b);
        });
        var ma = {};
        a.bindingHandlers.options = {init:function(b) {
          if ("select" !== a.utils.tagNameLower(b)) {
            throw Error("options binding applies only to SELECT elements");
          }
          for (;0 < b.length;) {
            b.remove(0);
          }
          return {controlsDescendantBindings:!0};
        }, update:function(b, d, f) {
          function k() {
            return a.utils.arrayFilter(b.options, function(a) {
              return a.selected;
            });
          }
          function l(a, b, c) {
            var d = typeof b;
            return "function" == d ? b(a) : "string" == d ? a[b] : c;
          }
          function p(c, d) {
            if (v && n) {
              a.selectExtensions.writeValue(b, a.utils.unwrapObservable(f.get("value")), !0);
            } else {
              if (z.length) {
                var h = 0 <= a.utils.arrayIndexOf(z, a.selectExtensions.readValue(d[0]));
                a.utils.setOptionNodeSelectionState(d[0], h);
                v && !h && a.dependencyDetection.ignore(a.utils.triggerEvent, null, [b, "change"]);
              }
            }
          }
          var q = b.multiple, w = 0 != b.length && q ? b.scrollTop : null, y = a.utils.unwrapObservable(d()), n = f.get("valueAllowUnset") && f.has("value"), u = f.get("optionsIncludeDestroyed");
          d = {};
          var h, z = [];
          n || (q ? z = a.utils.arrayMap(k(), a.selectExtensions.readValue) : 0 <= b.selectedIndex && z.push(a.selectExtensions.readValue(b.options[b.selectedIndex])));
          y && ("undefined" == typeof y.length && (y = [y]), h = a.utils.arrayFilter(y, function(b) {
            return u || b === c || null === b || !a.utils.unwrapObservable(b._destroy);
          }), f.has("optionsCaption") && (y = a.utils.unwrapObservable(f.get("optionsCaption")), null !== y && y !== c && h.unshift(ma)));
          var v = !1;
          d.beforeRemove = function(a) {
            b.removeChild(a);
          };
          y = p;
          f.has("optionsAfterRender") && "function" == typeof f.get("optionsAfterRender") && (y = function(b, d) {
            p(b, d);
            a.dependencyDetection.ignore(f.get("optionsAfterRender"), null, [d[0], b !== ma ? b : c]);
          });
          a.utils.setDomNodeChildrenFromArrayMapping(b, h, function(e, d, h) {
            h.length && (z = !n && h[0].selected ? [a.selectExtensions.readValue(h[0])] : [], v = !0);
            d = b.ownerDocument.createElement("option");
            e === ma ? (a.utils.setTextContent(d, f.get("optionsCaption")), a.selectExtensions.writeValue(d, c)) : (h = l(e, f.get("optionsValue"), e), a.selectExtensions.writeValue(d, a.utils.unwrapObservable(h)), e = l(e, f.get("optionsText"), h), a.utils.setTextContent(d, e));
            return [d];
          }, d, y);
          a.dependencyDetection.ignore(function() {
            n ? a.selectExtensions.writeValue(b, a.utils.unwrapObservable(f.get("value")), !0) : (q ? z.length && k().length < z.length : z.length && 0 <= b.selectedIndex ? a.selectExtensions.readValue(b.options[b.selectedIndex]) !== z[0] : z.length || 0 <= b.selectedIndex) && a.utils.triggerEvent(b, "change");
          });
          a.utils.ensureSelectElementIsRenderedCorrectly(b);
          w && 20 < Math.abs(w - b.scrollTop) && (b.scrollTop = w);
        }};
        a.bindingHandlers.options.optionValueDomDataKey = a.utils.domData.nextKey();
        a.bindingHandlers.selectedOptions = {after:["options", "foreach"], init:function(b, c, d) {
          a.utils.registerEventHandler(b, "change", function() {
            var f = c(), k = [];
            a.utils.arrayForEach(b.getElementsByTagName("option"), function(b) {
              b.selected && k.push(a.selectExtensions.readValue(b));
            });
            a.expressionRewriting.writeValueToProperty(f, d, "selectedOptions", k);
          });
        }, update:function(b, c) {
          if ("select" != a.utils.tagNameLower(b)) {
            throw Error("values binding applies only to SELECT elements");
          }
          var d = a.utils.unwrapObservable(c());
          d && "number" == typeof d.length && a.utils.arrayForEach(b.getElementsByTagName("option"), function(b) {
            var c = 0 <= a.utils.arrayIndexOf(d, a.selectExtensions.readValue(b));
            a.utils.setOptionNodeSelectionState(b, c);
          });
        }};
        a.expressionRewriting.twoWayBindings.selectedOptions = !0;
        a.bindingHandlers.style = {update:function(b, d) {
          var f = a.utils.unwrapObservable(d() || {});
          a.utils.objectForEach(f, function(d, f) {
            f = a.utils.unwrapObservable(f);
            if (null === f || f === c || !1 === f) {
              f = "";
            }
            b.style[d] = f;
          });
        }};
        a.bindingHandlers.submit = {init:function(b, c, d, f, k) {
          if ("function" != typeof c()) {
            throw Error("The value for a submit binding must be a function");
          }
          a.utils.registerEventHandler(b, "submit", function(a) {
            var d, f = c();
            try {
              d = f.call(k.$data, b);
            } finally {
              !0 !== d && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
            }
          });
        }};
        a.bindingHandlers.text = {init:function() {
          return {controlsDescendantBindings:!0};
        }, update:function(b, c) {
          a.utils.setTextContent(b, c());
        }};
        a.virtualElements.allowedBindings.text = !0;
        (function() {
          if (l && l.navigator) {
            var b = function(a) {
              if (a) {
                return parseFloat(a[1]);
              }
            }, d = l.opera && l.opera.version && parseInt(l.opera.version()), f = l.navigator.userAgent, k = b(f.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)), p = b(f.match(/Firefox\/([^ ]*)/))
          }
          if (10 > a.utils.ieVersion) {
            var q = a.utils.domData.nextKey(), u = a.utils.domData.nextKey(), w = function(b) {
              var c = this.activeElement;
              (c = c && a.utils.domData.get(c, u)) && c(b);
            }, y = function(b, c) {
              var d = b.ownerDocument;
              a.utils.domData.get(d, q) || (a.utils.domData.set(d, q, !0), a.utils.registerEventHandler(d, "selectionchange", w));
              a.utils.domData.set(b, u, c);
            }
          }
          a.bindingHandlers.textInput = {init:function(b, f, h) {
            var m = b.value, l, e, w = function(d) {
              clearTimeout(l);
              e = l = c;
              d = b.value;
              m !== d && (m = d, a.expressionRewriting.writeValueToProperty(f(), h, "textInput", d));
            }, x = function(a) {
              l || (e = b.value, l = setTimeout(w, 4));
            }, q = function(a) {
              function b() {
                return a.apply(this, arguments);
              }
              b.toString = function() {
                return a.toString();
              };
              return b;
            }(function() {
              var d = a.utils.unwrapObservable(f());
              if (null === d || d === c) {
                d = "";
              }
              e !== c && d === e ? setTimeout(q, 4) : b.value !== d && (m = d, b.value = d);
            }), u = function(c, e) {
              a.utils.registerEventHandler(b, c, e);
            };
            10 > a.utils.ieVersion ? (u("propertychange", function(a) {
              "value" === a.propertyName && w(a);
            }), 8 == a.utils.ieVersion && (u("keyup", w), u("keydown", w)), 8 <= a.utils.ieVersion && (y(b, w), u("dragend", x))) : (u("input", w), 5 > k && "textarea" === a.utils.tagNameLower(b) ? (u("keydown", x), u("paste", x), u("cut", x)) : 11 > d ? u("keydown", x) : 4 > p && (u("DOMAutoComplete", w), u("dragdrop", w), u("drop", w)));
            u("change", w);
            a.computed(q, null, {disposeWhenNodeIsRemoved:b});
          }};
          a.expressionRewriting.twoWayBindings.textInput = !0;
          a.bindingHandlers.textinput = {preprocess:function(a, b, c) {
            c("textInput", a);
          }};
        })();
        a.bindingHandlers.uniqueName = {init:function(b, c) {
          if (c()) {
            var d = "ko_unique_" + ++a.bindingHandlers.uniqueName.currentIndex;
            a.utils.setElementName(b, d);
          }
        }};
        a.bindingHandlers.uniqueName.currentIndex = 0;
        a.bindingHandlers.value = {after:["options", "foreach"], init:function(b, c, d) {
          if ("input" != b.tagName.toLowerCase() || "checkbox" != b.type && "radio" != b.type) {
            var f = ["change"], k = d.get("valueUpdate"), l = !1, p = null;
            k && ("string" == typeof k && (k = [k]), a.utils.arrayPushAll(f, k), f = a.utils.arrayGetDistinctValues(f));
            var w = function() {
              p = null;
              l = !1;
              var f = c(), k = a.selectExtensions.readValue(b);
              a.expressionRewriting.writeValueToProperty(f, d, "value", k);
            };
            !a.utils.ieVersion || "input" != b.tagName.toLowerCase() || "text" != b.type || "off" == b.autocomplete || b.form && "off" == b.form.autocomplete || -1 != a.utils.arrayIndexOf(f, "propertychange") || (a.utils.registerEventHandler(b, "propertychange", function() {
              l = !0;
            }), a.utils.registerEventHandler(b, "focus", function() {
              l = !1;
            }), a.utils.registerEventHandler(b, "blur", function() {
              l && w();
            }));
            a.utils.arrayForEach(f, function(c) {
              var d = w;
              a.utils.stringStartsWith(c, "after") && (d = function() {
                p = a.selectExtensions.readValue(b);
                setTimeout(w, 0);
              }, c = c.substring(5));
              a.utils.registerEventHandler(b, c, d);
            });
            var q = function(a) {
              function b() {
                return a.apply(this, arguments);
              }
              b.toString = function() {
                return a.toString();
              };
              return b;
            }(function() {
              var f = a.utils.unwrapObservable(c()), k = a.selectExtensions.readValue(b);
              if (null !== p && f === p) {
                setTimeout(q, 0);
              } else {
                if (f !== k) {
                  if ("select" === a.utils.tagNameLower(b)) {
                    var h = d.get("valueAllowUnset"), k = function() {
                      a.selectExtensions.writeValue(b, f, h);
                    };
                    k();
                    h || f === a.selectExtensions.readValue(b) ? setTimeout(k, 0) : a.dependencyDetection.ignore(a.utils.triggerEvent, null, [b, "change"]);
                  } else {
                    a.selectExtensions.writeValue(b, f);
                  }
                }
              }
            });
            a.computed(q, null, {disposeWhenNodeIsRemoved:b});
          } else {
            a.applyBindingAccessorsToNode(b, {checkedValue:c});
          }
        }, update:function() {
        }};
        a.expressionRewriting.twoWayBindings.value = !0;
        a.bindingHandlers.visible = {update:function(b, c) {
          var d = a.utils.unwrapObservable(c()), f = "none" != b.style.display;
          d && !f ? b.style.display = "" : !d && f && (b.style.display = "none");
        }};
        (function(b) {
          a.bindingHandlers[b] = {init:function(c, d, f, k, l) {
            return a.bindingHandlers.event.init.call(this, c, function() {
              var a = {};
              a[b] = d();
              return a;
            }, f, k, l);
          }};
        })("click");
        a.templateEngine = function() {
        };
        a.templateEngine.prototype.renderTemplateSource = function(a, b, c, d) {
          throw Error("Override renderTemplateSource");
        };
        a.templateEngine.prototype.createJavaScriptEvaluatorBlock = function(a) {
          throw Error("Override createJavaScriptEvaluatorBlock");
        };
        a.templateEngine.prototype.makeTemplateSource = function(b, c) {
          if ("string" == typeof b) {
            c = c || d;
            var f = c.getElementById(b);
            if (!f) {
              throw Error("Cannot find template with ID " + b);
            }
            return new a.templateSources.domElement(f);
          }
          if (1 == b.nodeType || 8 == b.nodeType) {
            return new a.templateSources.anonymousTemplate(b);
          }
          throw Error("Unknown template type: " + b);
        };
        a.templateEngine.prototype.renderTemplate = function(a, b, c, d) {
          a = this.makeTemplateSource(a, d);
          return this.renderTemplateSource(a, b, c, d);
        };
        a.templateEngine.prototype.isTemplateRewritten = function(a, b) {
          return !1 === this.allowTemplateRewriting ? !0 : this.makeTemplateSource(a, b).data("isRewritten");
        };
        a.templateEngine.prototype.rewriteTemplate = function(a, b, c) {
          a = this.makeTemplateSource(a, c);
          b = b(a.text());
          a.text(b);
          a.data("isRewritten", !0);
        };
        a.exportSymbol("templateEngine", a.templateEngine);
        a.templateRewriting = function() {
          function b(c, d, f, k) {
            c = a.expressionRewriting.parseObjectLiteral(c);
            for (var m = a.expressionRewriting.bindingRewriteValidators, l = 0;l < c.length;l++) {
              var n = c[l].key;
              if (m.hasOwnProperty(n)) {
                var p = m[n];
                if ("function" === typeof p) {
                  if (n = p(c[l].value)) {
                    throw Error(n);
                  }
                } else {
                  if (!p) {
                    throw Error("This template engine does not support the '" + n + "' binding within its templates");
                  }
                }
              }
            }
            f = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + a.expressionRewriting.preProcessBindings(c, {valueAccessors:!0}) + " } })()},'" + f.toLowerCase() + "')";
            return k.createJavaScriptEvaluatorBlock(f) + d;
          }
          var c = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi, d = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
          return {ensureTemplateIsRewritten:function(b, c, d) {
            c.isTemplateRewritten(b, d) || c.rewriteTemplate(b, function(b) {
              return a.templateRewriting.memoizeBindingAttributeSyntax(b, c);
            }, d);
          }, memoizeBindingAttributeSyntax:function(a, f) {
            return a.replace(c, function(a, c, d, k, l) {
              return b(l, c, d, f);
            }).replace(d, function(a, c) {
              return b(c, "\x3c!-- ko --\x3e", "#comment", f);
            });
          }, applyMemoizedBindingsToNextSibling:function(b, c) {
            return a.memoization.memoize(function(d, f) {
              var k = d.nextSibling;
              k && k.nodeName.toLowerCase() === c && a.applyBindingAccessorsToNode(k, b, f);
            });
          }};
        }();
        a.exportSymbol("__tr_ambtns", a.templateRewriting.applyMemoizedBindingsToNextSibling);
        (function() {
          a.templateSources = {};
          a.templateSources.domElement = function(a) {
            this.domElement = a;
          };
          a.templateSources.domElement.prototype.text = function() {
            var b = a.utils.tagNameLower(this.domElement), b = "script" === b ? "text" : "textarea" === b ? "value" : "innerHTML";
            if (0 == arguments.length) {
              return this.domElement[b];
            }
            var c = arguments[0];
            "innerHTML" === b ? a.utils.setHtml(this.domElement, c) : this.domElement[b] = c;
          };
          var b = a.utils.domData.nextKey() + "_";
          a.templateSources.domElement.prototype.data = function(c) {
            if (1 === arguments.length) {
              return a.utils.domData.get(this.domElement, b + c);
            }
            a.utils.domData.set(this.domElement, b + c, arguments[1]);
          };
          var d = a.utils.domData.nextKey();
          a.templateSources.anonymousTemplate = function(a) {
            this.domElement = a;
          };
          a.templateSources.anonymousTemplate.prototype = new a.templateSources.domElement;
          a.templateSources.anonymousTemplate.prototype.constructor = a.templateSources.anonymousTemplate;
          a.templateSources.anonymousTemplate.prototype.text = function() {
            if (0 == arguments.length) {
              var b = a.utils.domData.get(this.domElement, d) || {};
              b.textData === c && b.containerData && (b.textData = b.containerData.innerHTML);
              return b.textData;
            }
            a.utils.domData.set(this.domElement, d, {textData:arguments[0]});
          };
          a.templateSources.domElement.prototype.nodes = function() {
            if (0 == arguments.length) {
              return (a.utils.domData.get(this.domElement, d) || {}).containerData;
            }
            a.utils.domData.set(this.domElement, d, {containerData:arguments[0]});
          };
          a.exportSymbol("templateSources", a.templateSources);
          a.exportSymbol("templateSources.domElement", a.templateSources.domElement);
          a.exportSymbol("templateSources.anonymousTemplate", a.templateSources.anonymousTemplate);
        })();
        (function() {
          function b(c, d, f) {
            var k;
            for (d = a.virtualElements.nextSibling(d);c && (k = c) !== d;) {
              c = a.virtualElements.nextSibling(k), f(k, c);
            }
          }
          function d(c, f) {
            if (c.length) {
              var k = c[0], l = c[c.length - 1], h = k.parentNode, p = a.bindingProvider.instance, t = p.preprocessNode;
              if (t) {
                b(k, l, function(a, b) {
                  var c = a.previousSibling, d = t.call(p, a);
                  d && (a === k && (k = d[0] || b), a === l && (l = d[d.length - 1] || c));
                });
                c.length = 0;
                if (!k) {
                  return;
                }
                k === l ? c.push(k) : (c.push(k, l), a.utils.fixUpContinuousNodeArray(c, h));
              }
              b(k, l, function(b) {
                1 !== b.nodeType && 8 !== b.nodeType || a.applyBindings(f, b);
              });
              b(k, l, function(b) {
                1 !== b.nodeType && 8 !== b.nodeType || a.memoization.unmemoizeDomNodeAndDescendants(b, [f]);
              });
              a.utils.fixUpContinuousNodeArray(c, h);
            }
          }
          function f(a) {
            return a.nodeType ? a : 0 < a.length ? a[0] : null;
          }
          function k(b, c, l, m, h) {
            h = h || {};
            var q = (b && f(b) || l || {}).ownerDocument, v = h.templateEngine || p;
            a.templateRewriting.ensureTemplateIsRewritten(l, v, q);
            l = v.renderTemplate(l, m, h, q);
            if ("number" != typeof l.length || 0 < l.length && "number" != typeof l[0].nodeType) {
              throw Error("Template engine must return an array of DOM nodes");
            }
            q = !1;
            switch(c) {
              case "replaceChildren":
                a.virtualElements.setDomNodeChildren(b, l);
                q = !0;
                break;
              case "replaceNode":
                a.utils.replaceDomNodes(b, l);
                q = !0;
                break;
              case "ignoreTargetNode":
                break;
              default:
                throw Error("Unknown renderMode: " + c);;
            }
            q && (d(l, m), h.afterRender && a.dependencyDetection.ignore(h.afterRender, null, [l, m.$data]));
            return l;
          }
          function l(b, c, d) {
            return a.isObservable(b) ? b() : "function" === typeof b ? b(c, d) : b;
          }
          var p;
          a.setTemplateEngine = function(b) {
            if (b != c && !(b instanceof a.templateEngine)) {
              throw Error("templateEngine must inherit from ko.templateEngine");
            }
            p = b;
          };
          a.renderTemplate = function(b, d, m, t, h) {
            m = m || {};
            if ((m.templateEngine || p) == c) {
              throw Error("Set a template engine before calling renderTemplate");
            }
            h = h || "replaceChildren";
            if (t) {
              var q = f(t);
              return a.dependentObservable(function() {
                var c = d && d instanceof a.bindingContext ? d : new a.bindingContext(a.utils.unwrapObservable(d)), e = l(b, c.$data, c), c = k(t, h, e, c, m);
                "replaceNode" == h && (t = c, q = f(t));
              }, null, {disposeWhen:function() {
                return !q || !a.utils.domNodeIsAttachedToDocument(q);
              }, disposeWhenNodeIsRemoved:q && "replaceNode" == h ? q.parentNode : q});
            }
            return a.memoization.memoize(function(c) {
              a.renderTemplate(b, d, m, c, "replaceNode");
            });
          };
          a.renderTemplateForEach = function(b, f, m, p, h) {
            var q, x = function(a, c) {
              q = h.createChildContext(a, m.as, function(a) {
                a.$index = c;
              });
              var d = l(b, a, q);
              return k(null, "ignoreTargetNode", d, q, m);
            }, e = function(a, b, c) {
              d(b, q);
              m.afterRender && m.afterRender(b, a);
              q = null;
            };
            return a.dependentObservable(function() {
              var b = a.utils.unwrapObservable(f) || [];
              "undefined" == typeof b.length && (b = [b]);
              b = a.utils.arrayFilter(b, function(b) {
                return m.includeDestroyed || b === c || null === b || !a.utils.unwrapObservable(b._destroy);
              });
              a.dependencyDetection.ignore(a.utils.setDomNodeChildrenFromArrayMapping, null, [p, b, x, m, e]);
            }, null, {disposeWhenNodeIsRemoved:p});
          };
          var q = a.utils.domData.nextKey();
          a.bindingHandlers.template = {init:function(b, c) {
            var d = a.utils.unwrapObservable(c());
            if ("string" == typeof d || d.name) {
              a.virtualElements.emptyNode(b);
            } else {
              if ("nodes" in d) {
                if (d = d.nodes || [], a.isObservable(d)) {
                  throw Error('The "nodes" option must be a plain, non-observable array.');
                }
              } else {
                d = a.virtualElements.childNodes(b);
              }
              d = a.utils.moveCleanedNodesToContainerElement(d);
              (new a.templateSources.anonymousTemplate(b)).nodes(d);
            }
            return {controlsDescendantBindings:!0};
          }, update:function(b, d, f, k, h) {
            var l = d(), m;
            d = a.utils.unwrapObservable(l);
            f = !0;
            k = null;
            "string" == typeof d ? d = {} : (l = d.name, "if" in d && (f = a.utils.unwrapObservable(d["if"])), f && "ifnot" in d && (f = !a.utils.unwrapObservable(d.ifnot)), m = a.utils.unwrapObservable(d.data));
            "foreach" in d ? k = a.renderTemplateForEach(l || b, f && d.foreach || [], d, b, h) : f ? (h = "data" in d ? h.createChildContext(m, d.as) : h, k = a.renderTemplate(l || b, h, d, b)) : a.virtualElements.emptyNode(b);
            h = k;
            (m = a.utils.domData.get(b, q)) && "function" == typeof m.dispose && m.dispose();
            a.utils.domData.set(b, q, h && h.isActive() ? h : c);
          }};
          a.expressionRewriting.bindingRewriteValidators.template = function(b) {
            b = a.expressionRewriting.parseObjectLiteral(b);
            return 1 == b.length && b[0].unknown || a.expressionRewriting.keyValueArrayContainsKey(b, "name") ? null : "This template engine does not support anonymous templates nested within its templates";
          };
          a.virtualElements.allowedBindings.template = !0;
        })();
        a.exportSymbol("setTemplateEngine", a.setTemplateEngine);
        a.exportSymbol("renderTemplate", a.renderTemplate);
        a.utils.findMovesInArrayComparison = function(a, b, c) {
          if (a.length && b.length) {
            var d, f, k, l, p;
            for (d = f = 0;(!c || d < c) && (l = a[f]);++f) {
              for (k = 0;p = b[k];++k) {
                if (l.value === p.value) {
                  l.moved = p.index;
                  p.moved = l.index;
                  b.splice(k, 1);
                  d = k = 0;
                  break;
                }
              }
              d += k;
            }
          }
        };
        a.utils.compareArrays = function() {
          function b(c, d, f, k, l) {
            var m = Math.min, p = Math.max, q = [], n, u = c.length, h, z = d.length, v = z - u || 1, e = u + z + 1, B, E, G;
            for (n = 0;n <= u;n++) {
              for (E = B, q.push(B = []), G = m(z, n + v), h = p(0, n - 1);h <= G;h++) {
                B[h] = h ? n ? c[n - 1] === d[h - 1] ? E[h - 1] : m(E[h] || e, B[h - 1] || e) + 1 : h + 1 : n + 1;
              }
            }
            m = [];
            p = [];
            v = [];
            n = u;
            for (h = z;n || h;) {
              z = q[n][h] - 1, h && z === q[n][h - 1] ? p.push(m[m.length] = {status:f, value:d[--h], index:h}) : n && z === q[n - 1][h] ? v.push(m[m.length] = {status:k, value:c[--n], index:n}) : (--h, --n, l.sparse || m.push({status:"retained", value:d[h]}));
            }
            a.utils.findMovesInArrayComparison(p, v, 10 * u);
            return m.reverse();
          }
          return function(a, c, d) {
            d = "boolean" === typeof d ? {dontLimitMoves:d} : d || {};
            a = a || [];
            c = c || [];
            return a.length <= c.length ? b(a, c, "added", "deleted", d) : b(c, a, "deleted", "added", d);
          };
        }();
        a.exportSymbol("utils.compareArrays", a.utils.compareArrays);
        (function() {
          function b(d, f, k, l, m) {
            var p = [], q = a.dependentObservable(function() {
              var b = f(k, m, a.utils.fixUpContinuousNodeArray(p, d)) || [];
              0 < p.length && (a.utils.replaceDomNodes(p, b), l && a.dependencyDetection.ignore(l, null, [k, b, m]));
              p.length = 0;
              a.utils.arrayPushAll(p, b);
            }, null, {disposeWhenNodeIsRemoved:d, disposeWhen:function() {
              return !a.utils.anyDomNodeIsAttachedToDocument(p);
            }});
            return {mappedNodes:p, dependentObservable:q.isActive() ? q : c};
          }
          var d = a.utils.domData.nextKey();
          a.utils.setDomNodeChildrenFromArrayMapping = function(f, k, l, p, q) {
            function u(b, c) {
              H = z[c];
              B !== c && (N[b] = H);
              H.indexObservable(B++);
              a.utils.fixUpContinuousNodeArray(H.mappedNodes, f);
              v.push(H);
              K.push(H);
            }
            function y(b, c) {
              if (b) {
                for (var d = 0, e = c.length;d < e;d++) {
                  c[d] && a.utils.arrayForEach(c[d].mappedNodes, function(a) {
                    b(a, d, c[d].arrayEntry);
                  });
                }
              }
            }
            k = k || [];
            p = p || {};
            var n = a.utils.domData.get(f, d) === c, z = a.utils.domData.get(f, d) || [], h = a.utils.arrayMap(z, function(a) {
              return a.arrayEntry;
            }), E = a.utils.compareArrays(h, k, p.dontLimitMoves), v = [], e = 0, B = 0, G = [], K = [];
            k = [];
            for (var N = [], h = [], H, L = 0, M, Q;M = E[L];L++) {
              switch(Q = M.moved, M.status) {
                case "deleted":
                  Q === c && (H = z[e], H.dependentObservable && H.dependentObservable.dispose(), G.push.apply(G, a.utils.fixUpContinuousNodeArray(H.mappedNodes, f)), p.beforeRemove && (k[L] = H, K.push(H)));
                  e++;
                  break;
                case "retained":
                  u(L, e++);
                  break;
                case "added":
                  Q !== c ? u(L, Q) : (H = {arrayEntry:M.value, indexObservable:a.observable(B++)}, v.push(H), K.push(H), n || (h[L] = H));
              }
            }
            y(p.beforeMove, N);
            a.utils.arrayForEach(G, p.beforeRemove ? a.cleanNode : a.removeNode);
            for (var L = 0, n = a.virtualElements.firstChild(f), T;H = K[L];L++) {
              H.mappedNodes || a.utils.extend(H, b(f, l, H.arrayEntry, q, H.indexObservable));
              for (e = 0;E = H.mappedNodes[e];n = E.nextSibling, T = E, e++) {
                E !== n && a.virtualElements.insertAfter(f, E, T);
              }
              !H.initialized && q && (q(H.arrayEntry, H.mappedNodes, H.indexObservable), H.initialized = !0);
            }
            y(p.beforeRemove, k);
            y(p.afterMove, N);
            y(p.afterAdd, h);
            a.utils.domData.set(f, d, v);
          };
        })();
        a.exportSymbol("utils.setDomNodeChildrenFromArrayMapping", a.utils.setDomNodeChildrenFromArrayMapping);
        a.nativeTemplateEngine = function() {
          this.allowTemplateRewriting = !1;
        };
        a.nativeTemplateEngine.prototype = new a.templateEngine;
        a.nativeTemplateEngine.prototype.constructor = a.nativeTemplateEngine;
        a.nativeTemplateEngine.prototype.renderTemplateSource = function(b, c, d, f) {
          if (c = (9 > a.utils.ieVersion ? 0 : b.nodes) ? b.nodes() : null) {
            return a.utils.makeArray(c.cloneNode(!0).childNodes);
          }
          b = b.text();
          return a.utils.parseHtmlFragment(b, f);
        };
        a.nativeTemplateEngine.instance = new a.nativeTemplateEngine;
        a.setTemplateEngine(a.nativeTemplateEngine.instance);
        a.exportSymbol("nativeTemplateEngine", a.nativeTemplateEngine);
        (function() {
          a.jqueryTmplTemplateEngine = function() {
            var a = this.jQueryTmplVersion = function() {
              if (!q || !q.tmpl) {
                return 0;
              }
              try {
                if (0 <= q.tmpl.tag.tmpl.open.toString().indexOf("__")) {
                  return 2;
                }
              } catch (a) {
              }
              return 1;
            }();
            this.renderTemplateSource = function(b, c, f, k) {
              k = k || d;
              f = f || {};
              if (2 > a) {
                throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
              }
              var l = b.data("precompiled");
              l || (l = b.text() || "", l = q.template(null, "{{ko_with $item.koBindingContext}}" + l + "{{/ko_with}}"), b.data("precompiled", l));
              b = [c.$data];
              c = q.extend({koBindingContext:c}, f.templateOptions);
              c = q.tmpl(l, b, c);
              c.appendTo(k.createElement("div"));
              q.fragments = {};
              return c;
            };
            this.createJavaScriptEvaluatorBlock = function(a) {
              return "{{ko_code ((function() { return " + a + " })()) }}";
            };
            this.addTemplate = function(a, b) {
              d.write("<script type='text/html' id='" + a + "'>" + b + "\x3c/script>");
            };
            0 < a && (q.tmpl.tag.ko_code = {open:"__.push($1 || '');"}, q.tmpl.tag.ko_with = {open:"with($1) {", close:"} "});
          };
          a.jqueryTmplTemplateEngine.prototype = new a.templateEngine;
          a.jqueryTmplTemplateEngine.prototype.constructor = a.jqueryTmplTemplateEngine;
          var b = new a.jqueryTmplTemplateEngine;
          0 < b.jQueryTmplVersion && a.setTemplateEngine(b);
          a.exportSymbol("jqueryTmplTemplateEngine", a.jqueryTmplTemplateEngine);
        })();
      });
    })();
  })();
}]);