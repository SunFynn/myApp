(function(e, t) {
  function a(e) {
      var a;
      for (a in e) {
          if (d[e[a]] !== t) {
              return true
          }
      }
      return false
  }
  function s() {
      var e = ["Webkit", "Moz", "O", "ms"], t;
      for (t in e) {
          if (a([e[t] + "Transform"])) {
              return "-" + e[t].toLowerCase() + "-"
          }
      }
      return ""
  }
  function i(a, s, i) {
      var l = a;
      if (typeof s === "object") {
          return a.each(function() {
              if (!this.id) {
                  this.id = "mobiscroll" + ++n
              }
              if (r[this.id]) {
                  r[this.id].destroy()
              }
              new e.mobiscroll.classes[s.component || "Scroller"](this,s)
          })
      }
      if (typeof s === "string") {
          a.each(function() {
              var e, a = r[this.id];
              if (a && a[s]) {
                  e = a[s].apply(this, Array.prototype.slice.call(i, 1));
                  if (e !== t) {
                      l = e;
                      return false
                  }
              }
          })
      }
      return l
  }
  var n = +new Date
    , l = {}
    , r = {}
    , o = e.extend
    , d = document.createElement("modernizr").style
    , u = a(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"])
    , c = a(["flex", "msFlex", "WebkitBoxDirection"])
    , f = s()
    , h = f.replace(/^\-/, "").replace(/\-$/, "").replace("moz", "Moz");
  e.fn.mobiscroll = function(t) {
      o(this, e.mobiscroll.components);
      return i(this, t, arguments)
  }
  ;
  e.mobiscroll = e.mobiscroll || {
      version: "2.13.2",
      util: {
          prefix: f,
          jsPrefix: h,
          has3d: u,
          hasFlex: c,
          testTouch: function(e) {
              if (e.type == "touchstart") {
                  l[e.target] = true
              } else if (l[e.target]) {
                  delete l[e.target];
                  return false
              }
              return true
          },
          isNumeric: function(e) {
              return e - parseFloat(e) >= 0
          },
          getCoord: function(e, t) {
              var a = e.originalEvent || e;
              return a.changedTouches ? a.changedTouches[0]["page" + t] : e["page" + t]
          },
          constrain: function(e, t, a) {
              return Math.max(t, Math.min(e, a))
          }
      },
      tapped: false,
      presets: {
          scroller: {},
          numpad: {}
      },
      themes: {
          listview: {}
      },
      i18n: {},
      instances: r,
      classes: {},
      components: {},
      defaults: {
          theme: "mobiscroll",
          context: "body"
      },
      userdef: {},
      setDefaults: function(e) {
          o(this.userdef, e)
      },
      presetShort: function(e, a, s) {
          this.components[e] = function(n) {
              return i(this, o(n, {
                  component: a,
                  preset: s === false ? t : e
              }), arguments)
          }
      }
  };
  e.scroller = e.scroller || e.mobiscroll;
  e.fn.scroller = e.fn.scroller || e.fn.mobiscroll
}
)(jQuery);
(function(e) {
  e.mobiscroll.i18n.zh = e.extend(e.mobiscroll.i18n.zh, {
      setText: "确定",
      cancelText: "取消",
      clearText: "明确",
      selectedText: "选",
      dateFormat: "yy/mm/dd",
      dateOrder: "yymmdd",
      dayNames: ["星期日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dayNamesShort: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      dayText: "日",
      hourText: "时",
      minuteText: "分",
      monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
      monthText: "月",
      secText: "秒",
      timeFormat: "HH:ii",
      timeWheels: "HHii",
      yearText: "年",
      nowText: "当前",
      pmText: "下午",
      amText: "上午",
      dateText: "日",
      timeText: "时间",
      calendarText: "日历",
      closeText: "关闭",
      fromText: "开始时间",
      toText: "结束时间",
      wholeText: "合计",
      fractionText: "分数",
      unitText: "单位",
      labels: ["年", "月", "日", "小时", "分钟", "秒", ""],
      labelsShort: ["年", "月", "日", "点", "分", "秒", ""],
      startText: "开始",
      stopText: "停止",
      resetText: "重置",
      lapText: "圈",
      hideText: "隐藏"
  })
}
)(jQuery);
(function(e) {
  e.mobiscroll.themes.android = {
      dateOrder: "Mddyy",
      mode: "clickpick",
      height: 50,
      showLabel: false,
      btnStartClass: "mbsc-ic mbsc-ic-play3",
      btnStopClass: "mbsc-ic mbsc-ic-pause2",
      btnResetClass: "mbsc-ic mbsc-ic-stop2",
      btnLapClass: "mbsc-ic mbsc-ic-loop2"
  }
}
)(jQuery);
(function(e) {
  var t = e.mobiscroll.themes
    , a = {
      dateOrder: "Mddyy",
      rows: 5,
      minWidth: 76,
      height: 36,
      showLabel: false,
      selectedLineHeight: true,
      selectedLineBorder: 2,
      useShortLabels: true,
      icon: {
          filled: "star3",
          empty: "star"
      },
      btnPlusClass: "mbsc-ic mbsc-ic-arrow-down6",
      btnMinusClass: "mbsc-ic mbsc-ic-arrow-up6",
      onThemeLoad: function(e, t) {
          if (t.theme) {
              t.theme = t.theme.replace("android-ics", "android-holo").replace(" light", "-light")
          }
      },
      onMarkupReady: function(e) {
          e.addClass("mbsc-android-holo")
      }
  };
  t["android-holo"] = a;
  t["android-holo-light"] = a;
  t["android-ics"] = a;
  t["android-ics light"] = a;
  t["android-holo light"] = a
}
)(jQuery);
(function(e) {
  e.mobiscroll.themes.ios = {
      display: "bottom",
      dateOrder: "MMdyy",
      rows: 5,
      height: 30,
      minWidth: 60,
      headerText: false,
      showLabel: false,
      btnWidth: false,
      selectedLineHeight: true,
      selectedLineBorder: 2,
      useShortLabels: true
  }
}
)(jQuery);
(function(e) {
  e.mobiscroll.themes.ios7 = {
      display: "bottom",
      dateOrder: "MMdyy",
      rows: 5,
      height: 34,
      minWidth: 55,
      headerText: false,
      showLabel: false,
      btnWidth: false,
      selectedLineHeight: true,
      selectedLineBorder: 1,
      useShortLabels: true,
      deleteIcon: "backspace3",
      checkIcon: "ion-ios7-checkmark-empty",
      btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
      btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
      btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
      btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5"
  }
}
)(jQuery);
(function(e) {
  var t = e.mobile && e.mobile.version.match(/1\.4/);
  e.mobiscroll.themes.jqm = {
      jqmBorder: "a",
      jqmBody: t ? "a" : "c",
      jqmHeader: "b",
      jqmWheel: "d",
      jqmLine: "b",
      jqmClickPick: "c",
      jqmSet: "b",
      jqmCancel: "c",
      disabledClass: "ui-disabled",
      activeClass: "ui-btn-active",
      activeTabInnerClass: "ui-btn-active",
      btnCalPrevClass: "",
      btnCalNextClass: "",
      selectedLineHeight: true,
      selectedLineBorder: 1,
      onThemeLoad: function(e, t) {
          var a = t.jqmBody || "c"
            , s = t.jqmEventText || "b"
            , i = t.jqmEventBubble || "a";
          t.dayClass = "ui-body-a ui-body-" + a;
          t.innerDayClass = "ui-state-default ui-btn ui-btn-up-" + a;
          t.calendarClass = "ui-body-a ui-body-" + a;
          t.weekNrClass = "ui-body-a ui-body-" + a;
          t.eventTextClass = "ui-btn-up-" + s;
          t.eventBubbleClass = "ui-body-" + i
      },
      onEventBubbleShow: function(t, a) {
          e(".dw-cal-event-list", a).attr("data-role", "listview");
          a.page().trigger("create")
      },
      onMarkupInserted: function(a, s) {
          var i = s.settings;
          if (t) {
              a.addClass("mbsc-jqm14");
              e(".mbsc-np-btn, .dwwb, .dw-cal-sc-m-cell .dw-i", a).addClass("ui-btn");
              e(".dwbc div.dwb, .dw-dr", a).addClass("ui-btn ui-mini ui-corner-all");
              e(".dw-cal-prev .dw-cal-btn-txt", a).addClass("ui-btn ui-icon-arrow-l ui-btn-icon-notext ui-shadow ui-corner-all");
              e(".dw-cal-next .dw-cal-btn-txt", a).addClass("ui-btn ui-icon-arrow-r ui-btn-icon-notext ui-shadow ui-corner-all")
          }
          e(".dw", a).removeClass("dwbg").addClass("ui-selectmenu ui-overlay-shadow ui-corner-all ui-body-" + i.jqmBorder);
          e(".dwbc .dwb", a).attr("data-role", "button").attr("data-mini", "true").attr("data-theme", i.jqmCancel);
          e(".dwb-s .dwb", a).addClass("ui-btn-" + i.jqmSet).attr("data-theme", i.jqmSet);
          e(".dwwb", a).attr("data-role", "button").attr("data-theme", i.jqmClickPick);
          e(".dwv", a).addClass("ui-header ui-bar-" + i.jqmHeader);
          e(".dwwr", a).addClass("ui-corner-all ui-body-" + i.jqmBody);
          e(".dwwl", a).addClass("ui-body-" + i.jqmWheel);
          e(".dwwol", a).addClass("ui-body-" + i.jqmLine);
          e(".dwl", a).addClass("ui-body-" + i.jqmBody);
          e(".dw-cal-tabs", a).attr("data-role", "navbar");
          e(".dw-cal-prev .dw-cal-btn-txt", a).attr("data-role", "button").attr("data-icon", "arrow-l").attr("data-iconpos", "notext");
          e(".dw-cal-next .dw-cal-btn-txt", a).attr("data-role", "button").attr("data-icon", "arrow-r").attr("data-iconpos", "notext");
          e(".dw-cal-events", a).attr("data-role", "page");
          e(".dw-dr", a).attr("data-role", "button").attr("data-mini", "true");
          e(".mbsc-np-btn", a).attr("data-role", "button").attr("data-corners", "false");
          a.trigger("create")
      }
  }
}
)(jQuery);
(function(e) {
  e.mobiscroll.themes["sense-ui"] = {
      btnStartClass: "mbsc-ic mbsc-ic-play3",
      btnStopClass: "mbsc-ic mbsc-ic-pause2",
      btnResetClass: "mbsc-ic mbsc-ic-stop2",
      btnLapClass: "mbsc-ic mbsc-ic-loop2"
  }
}
)(jQuery);
(function(e) {
  var t = e.mobiscroll.themes
    , a = {
      minWidth: 76,
      height: 76,
      accent: "none",
      dateOrder: "mmMMddDDyy",
      headerText: false,
      showLabel: false,
      deleteIcon: "backspace4",
      icon: {
          filled: "star3",
          empty: "star"
      },
      btnWidth: false,
      btnStartClass: "mbsc-ic mbsc-ic-play3",
      btnStopClass: "mbsc-ic mbsc-ic-pause2",
      btnResetClass: "mbsc-ic mbsc-ic-stop2",
      btnLapClass: "mbsc-ic mbsc-ic-loop2",
      btnHideClass: "mbsc-ic mbsc-ic-close",
      btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left2",
      btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right2",
      btnPlusClass: "mbsc-ic mbsc-ic-plus",
      btnMinusClass: "mbsc-ic mbsc-ic-minus",
      onMarkupInserted: function(t, a) {
          var s, i, n;
          t.addClass("mbsc-wp");
          e(".dw", t).addClass("mbsc-wp-" + a.settings.accent);
          e(".dwb-s .dwb", t).addClass("mbsc-ic mbsc-ic-checkmark");
          e(".dwb-c .dwb", t).addClass("mbsc-ic mbsc-ic-close");
          e(".dwb-cl .dwb", t).addClass("mbsc-ic mbsc-ic-close");
          e(".dwb-n .dwb", t).addClass("mbsc-ic mbsc-ic-loop2");
          e(".dwwl", t).on("touchstart mousedown DOMMouseScroll mousewheel", function(a) {
              if (a.type === "mousedown" && i) {
                  return
              }
              i = a.type === "touchstart";
              s = true;
              n = e(this).hasClass("wpa");
              e(".dwwl", t).removeClass("wpa");
              e(this).addClass("wpa")
          }).on("touchmove mousemove", function() {
              s = false
          }).on("touchend mouseup", function(t) {
              if (s && n && e(t.target).closest(".dw-li").hasClass("dw-sel")) {
                  e(this).removeClass("wpa")
              }
              if (t.type === "mouseup") {
                  i = false
              }
              s = false
          })
      },
      onThemeLoad: function(e, t) {
          if (e && e.dateOrder && !t.dateOrder) {
              var a = e.dateOrder;
              a = a.match(/mm/i) ? a.replace(/mmMM|mm|MM/, "mmMM") : a.replace(/mM|m|M/, "mM");
              a = a.match(/dd/i) ? a.replace(/ddDD|dd|DD/, "ddDD") : a.replace(/dD|d|D/, "dD");
              t.dateOrder = a
          }
          if (t.theme) {
              t.theme = t.theme.replace(" light", "-light")
          }
      }
  };
  t.wp = a;
  t["wp-light"] = a;
  t["wp light"] = a
}
)(jQuery);
(function(e, t) {
  var a = e.mobiscroll;
  a.datetime = {
      defaults: {
          shortYearCutoff: "+10",
          monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
          monthText: "Month",
          amText: "am",
          pmText: "pm",
          getYear: function(e) {
              return e.getFullYear()
          },
          getMonth: function(e) {
              return e.getMonth()
          },
          getDay: function(e) {
              return e.getDate()
          },
          getDate: function(e, t, a, s, i, n) {
              return new Date(e,t,a,s || 0,i || 0,n || 0)
          },
          getMaxDayOfMonth: function(e, t) {
              return 32 - new Date(e,t,32).getDate()
          },
          getWeekNumber: function(e) {
              e = new Date(e);
              e.setHours(0, 0, 0);
              e.setDate(e.getDate() + 4 - (e.getDay() || 7));
              var t = new Date(e.getFullYear(),0,1);
              return Math.ceil(((e - t) / 864e5 + 1) / 7)
          }
      },
      formatDate: function(t, s, i) {
          if (!s) {
              return null
          }
          var n = e.extend({}, a.datetime.defaults, i), l = function(e) {
              var a = 0;
              while (d + 1 < t.length && t.charAt(d + 1) == e) {
                  a++;
                  d++
              }
              return a
          }, r = function(e, t, a) {
              var s = "" + t;
              if (l(e)) {
                  while (s.length < a) {
                      s = "0" + s
                  }
              }
              return s
          }, o = function(e, t, a, s) {
              return l(e) ? s[t] : a[t]
          }, d, u, c = "", f = false;
          for (d = 0; d < t.length; d++) {
              if (f) {
                  if (t.charAt(d) == "'" && !l("'")) {
                      f = false
                  } else {
                      c += t.charAt(d)
                  }
              } else {
                  switch (t.charAt(d)) {
                  case "d":
                      c += r("d", n.getDay(s), 2);
                      break;
                  case "D":
                      c += o("D", s.getDay(), n.dayNamesShort, n.dayNames);
                      break;
                  case "o":
                      c += r("o", (s.getTime() - new Date(s.getFullYear(),0,0).getTime()) / 864e5, 3);
                      break;
                  case "m":
                      c += r("m", n.getMonth(s) + 1, 2);
                      break;
                  case "M":
                      c += o("M", n.getMonth(s), n.monthNamesShort, n.monthNames);
                      break;
                  case "y":
                      u = n.getYear(s);
                      c += l("y") ? u : (u % 100 < 10 ? "0" : "") + u % 100;
                      break;
                  case "h":
                      var h = s.getHours();
                      c += r("h", h > 12 ? h - 12 : h === 0 ? 12 : h, 2);
                      break;
                  case "H":
                      c += r("H", s.getHours(), 2);
                      break;
                  case "i":
                      c += r("i", s.getMinutes(), 2);
                      break;
                  case "s":
                      c += r("s", s.getSeconds(), 2);
                      break;
                  case "a":
                      c += s.getHours() > 11 ? n.pmText : n.amText;
                      break;
                  case "A":
                      c += s.getHours() > 11 ? n.pmText.toUpperCase() : n.amText.toUpperCase();
                      break;
                  case "'":
                      if (l("'")) {
                          c += "'"
                      } else {
                          f = true
                      }
                      break;
                  default:
                      c += t.charAt(d)
                  }
              }
          }
          return c
      },
      parseDate: function(t, s, i) {
          var n = e.extend({}, a.datetime.defaults, i)
            , l = n.defaultValue || new Date;
          if (!t || !s) {
              return l
          }
          if (s.getTime) {
              return s
          }
          s = typeof s == "object" ? s.toString() : s + "";
          var r = n.shortYearCutoff, o = n.getYear(l), d = n.getMonth(l) + 1, u = n.getDay(l), c = -1, f = l.getHours(), h = l.getMinutes(), m = 0, p = -1, w = false, b = function(e) {
              var a = C + 1 < t.length && t.charAt(C + 1) == e;
              if (a) {
                  C++
              }
              return a
          }, v = function(e) {
              b(e);
              var t = e == "@" ? 14 : e == "!" ? 20 : e == "y" ? 4 : e == "o" ? 3 : 2
                , a = new RegExp("^\\d{1," + t + "}")
                , i = s.substr(x).match(a);
              if (!i) {
                  return 0
              }
              x += i[0].length;
              return parseInt(i[0], 10)
          }, g = function(e, t, a) {
              var i = b(e) ? a : t, n;
              for (n = 0; n < i.length; n++) {
                  if (s.substr(x, i[n].length).toLowerCase() == i[n].toLowerCase()) {
                      x += i[n].length;
                      return n + 1
                  }
              }
              return 0
          }, y = function() {
              x++
          }, x = 0, C;
          for (C = 0; C < t.length; C++) {
              if (w) {
                  if (t.charAt(C) == "'" && !b("'")) {
                      w = false
                  } else {
                      y()
                  }
              } else {
                  switch (t.charAt(C)) {
                  case "d":
                      u = v("d");
                      break;
                  case "D":
                      g("D", n.dayNamesShort, n.dayNames);
                      break;
                  case "o":
                      c = v("o");
                      break;
                  case "m":
                      d = v("m");
                      break;
                  case "M":
                      d = g("M", n.monthNamesShort, n.monthNames);
                      break;
                  case "y":
                      o = v("y");
                      break;
                  case "H":
                      f = v("H");
                      break;
                  case "h":
                      f = v("h");
                      break;
                  case "i":
                      h = v("i");
                      break;
                  case "s":
                      m = v("s");
                      break;
                  case "a":
                      p = g("a", [n.amText, n.pmText], [n.amText, n.pmText]) - 1;
                      break;
                  case "A":
                      p = g("A", [n.amText, n.pmText], [n.amText, n.pmText]) - 1;
                      break;
                  case "'":
                      if (b("'")) {
                          y()
                      } else {
                          w = true
                      }
                      break;
                  default:
                      y()
                  }
              }
          }
          if (o < 100) {
              o += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (o <= (typeof r != "string" ? r : (new Date).getFullYear() % 100 + parseInt(r, 10)) ? 0 : -100)
          }
          if (c > -1) {
              d = 1;
              u = c;
              do {
                  var T = 32 - new Date(o,d - 1,32).getDate();
                  if (u <= T) {
                      break
                  }
                  d++;
                  u -= T
              } while (true)
          }
          f = p == -1 ? f : p && f < 12 ? f + 12 : !p && f == 12 ? 0 : f;
          var D = n.getDate(o, d - 1, u, f, h, m);
          if (n.getYear(D) != o || n.getMonth(D) + 1 != d || n.getDay(D) != u) {
              return l
          }
          return D
      }
  };
  a.formatDate = a.datetime.formatDate;
  a.parseDate = a.datetime.parseDate
}
)(jQuery);
(function(e, t, a, s) {
  var i, n, l = e.extend, r = e.mobiscroll, o = r.instances, d = r.userdef, u = r.util, c = u.jsPrefix, f = u.has3d, h = u.getCoord, m = u.constrain, p = /android [1-3]/i.test(navigator.userAgent), w = "webkitAnimationEnd animationend", b = function() {}, v = function(e) {
      e.preventDefault()
  };
  r.classes.Widget = function(u, g, y) {
      var x, C, T, D, M, k, _, V, S, q, L, j, W, H, O, A, F, N, Y, I, P, B, R, E, z, Q, U, J = this, X = e(u), G = [], Z = {};
      function $(t) {
          if (L) {
              L.removeClass("dwb-a")
          }
          L = e(this);
          if (!L.hasClass("dwb-d") && !L.hasClass("dwb-nhl")) {
              L.addClass("dwb-a")
          }
          if (t.type === "mousedown") {
              e(a).on("mouseup", K)
          }
      }
      function K(t) {
          if (L) {
              L.removeClass("dwb-a");
              L = null
          }
          if (t.type === "mouseup") {
              e(a).off("mouseup", K)
          }
      }
      function ee(e) {
          if (!e) {
              _.focus()
          }
          J.ariaMessage(P.ariaMessage)
      }
      function te(t) {
          var a, l, d, u = P.focusOnClose;
          D.remove();
          if (i && !t) {
              setTimeout(function() {
                  if (u === s) {
                      n = true;
                      a = i[0];
                      d = a.type;
                      l = a.value;
                      try {
                          a.type = "button"
                      } catch (t) {}
                      i.focus();
                      a.type = d;
                      a.value = l
                  } else if (u) {
                      if (o[e(u).attr("id")]) {
                          r.tapped = false
                      }
                      e(u).focus()
                  }
              }, 200)
          }
          J._isVisible = false;
          se("onHide", [])
      }
      function ae(e) {
          clearTimeout(Z[e.type]);
          Z[e.type] = setTimeout(function() {
              var t = e.type == "scroll";
              if (t && !B) {
                  return
              }
              J.position(!t)
          }, 200)
      }
      function se(t, a) {
          var s;
          a.push(J);
          e.each([d, E, Y, g], function(e, i) {
              if (i && i[t]) {
                  s = i[t].apply(u, a)
              }
          });
          return s
      }
      J.position = function(t) {
          var i, n, l, r, o, d, u, c, f, h, p, w, b, v, g, y, x = 0, T = 0, M = {}, q = Math.min(V[0].innerWidth || V.innerWidth(), k.width()), L = V[0].innerHeight || V.innerHeight();
          if (Q === q && U === L && t || I) {
              return
          }
          if (H && J._isLiquid && P.display !== "bubble") {
              _.width(q)
          }
          if (se("onPosition", [D, q, L]) === false || !H) {
              return
          }
          g = V.scrollLeft();
          y = V.scrollTop();
          r = P.anchor === s ? X : e(P.anchor);
          if (J._isLiquid && P.layout !== "liquid") {
              if (q < 400) {
                  D.addClass("dw-liq")
              } else {
                  D.removeClass("dw-liq")
              }
          }
          if (/modal|bubble/.test(P.display)) {
              S.width("");
              e(".mbsc-w-p", D).each(function() {
                  i = e(this).outerWidth(true);
                  x += i;
                  T = i > T ? i : T
              });
              i = x > q ? T : x;
              S.width(i).css("white-space", x > q ? "" : "nowrap")
          }
          A = _.outerWidth();
          F = _.outerHeight(true);
          B = F <= L && A <= q;
          J.scrollLock = B;
          if (P.display == "modal") {
              n = Math.max(0, g + (q - A) / 2);
              l = y + (L - F) / 2
          } else if (P.display == "bubble") {
              v = true;
              h = e(".dw-arrw-i", D);
              u = r.offset();
              c = Math.abs(C.offset().top - u.top);
              f = Math.abs(C.offset().left - u.left);
              o = r.outerWidth();
              d = r.outerHeight();
              n = m(f - (_.outerWidth(true) - o) / 2, g + 3, g + q - A - 3);
              l = c - F;
              if (l < y || c > y + L) {
                  _.removeClass("dw-bubble-top").addClass("dw-bubble-bottom");
                  l = c + d
              } else {
                  _.removeClass("dw-bubble-bottom").addClass("dw-bubble-top")
              }
              p = h.outerWidth();
              w = m(f + o / 2 - (n + (A - p) / 2), 0, p);
              e(".dw-arr", D).css({
                  left: w
              })
          } else {
              n = g;
              if (P.display == "top") {
                  l = y
              } else if (P.display == "bottom") {
                  l = y + L - F
              }
          }
          l = l < 0 ? 0 : l;
          M.top = l;
          M.left = n;
          _.css(M);
          k.height(0);
          b = Math.max(l + F, P.context == "body" ? e(a).height() : C[0].scrollHeight);
          k.css({
              height: b
          });
          if (v && (l + F > y + L || c > y + L)) {
              I = true;
              setTimeout(function() {
                  I = false
              }, 300);
              V.scrollTop(Math.min(l + F - L, b - L))
          }
          Q = q;
          U = L
      }
      ;
      J.attachShow = function(t, s) {
          G.push(t);
          if (P.display !== "inline") {
              t.on("mousedown.dw", function(e) {
                  if (R) {
                      e.preventDefault()
                  }
              }).on((P.showOnFocus ? "focus.dw" : "") + (P.showOnTap ? " click.dw" : ""), function(l) {
                  if ((l.type !== "focus" || l.type === "focus" && !n) && !r.tapped) {
                      if (s) {
                          s()
                      }
                      if (e(a.activeElement).is("input,textarea")) {
                          e(a.activeElement).blur()
                      }
                      i = t;
                      J.show()
                  }
                  setTimeout(function() {
                      n = false
                  }, 300)
              })
          }
      }
      ;
      J.select = function() {
          if (!H || J.hide(false, "set") !== false) {
              J._fillValue();
              se("onSelect", [J.val])
          }
      }
      ;
      J.cancel = function() {
          if (!H || J.hide(false, "cancel") !== false) {
              se("onCancel", [J.val])
          }
      }
      ;
      J.clear = function() {
          se("onClear", [D]);
          if (H && !J.live) {
              J.hide(false, "clear")
          }
          J.setValue(null, true)
      }
      ;
      J.enable = function() {
          P.disabled = false;
          if (J._isInput) {
              X.prop("disabled", false)
          }
      }
      ;
      J.disable = function() {
          P.disabled = true;
          if (J._isInput) {
              X.prop("disabled", true)
          }
      }
      ;
      J.show = function(a, s) {
          var i;
          if (P.disabled || J._isVisible) {
              return
          }
          if (j !== false) {
              if (P.display == "top") {
                  j = "slidedown"
              }
              if (P.display == "bottom") {
                  j = "slideup"
              }
          }
          J._readValue();
          se("onBeforeShow", []);
          i = '<div lang="' + P.lang + '" class="mbsc-' + P.theme + " dw-" + P.display + " " + (P.cssClass || "") + (J._isLiquid ? " dw-liq" : "") + (p ? " mbsc-old" : "") + (W ? "" : " dw-nobtn") + '">' + '<div class="dw-persp">' + (H ? '<div class="dwo"></div>' : "") + "<div" + (H ? ' role="dialog" tabindex="-1"' : "") + ' class="dw' + (P.rtl ? " dw-rtl" : " dw-ltr") + '">' + (P.display === "bubble" ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : "") + '<div class="dwwr">' + '<div aria-live="assertive" class="dw-aria dw-hidden"></div>' + (P.headerText ? '<div class="dwv">' + P.headerText + "</div>" : "") + '<div class="dwcc">';
          i += J._generateContent();
          i += "</div>";
          if (W) {
              i += '<div class="dwbc">';
              e.each(q, function(e, t) {
                  t = typeof t === "string" ? J.buttons[t] : t;
                  console.log(t);
                  if (t.css == "dwb-n") {
                      i += "<div" + ' style="width:' + 50 + ' class="dwbw ' + t.css + '"><div tabindex="0" role="button" style="height:40px; font-size: 14px; color:#666; line-height:40px; border:none;" class="dwb dwb' + e + ' dwb-e">' + t.text + "</div></div>"
                  } else if (t.css == "dwb-c") {
                      i += "<div" + ' style="width:50px; height:30px; border-radius: 5px; position:absolute; top:9px; right:5px;"' + ' class="dwbw ' + t.css + '"><div tabindex="0" role="button" style="color:#3591f4;border:none;height: 30px;line-height: 30px;border-radius: 3px;"  class="dwb dwb' + e + ' dwb-e">' + t.text + "</div></div>"
                  } else {
                      i += "<div" + ' style="width:50px; height:30px; border-radius: 5px; position:absolute; top:9px; left:5px;"' + +' class="dwbw ' + t.css + '"><div tabindex="0" role="button" style="color:#3591f4;height: 30px;line-height: 30px;border-radius: 3px;" class="dwb dwb' + e + ' dwb-e">' + t.text + "</div></div>"
                  }
              });
              i += "</div>"
          }
          i += "</div></div></div></div>";
          D = e(i);
          k = e(".dw-persp", D);
          M = e(".dwo", D);
          S = e(".dwwr", D);
          T = e(".dwv", D);
          _ = e(".dw", D);
          x = e(".dw-aria", D);
          J._markup = D;
          J._header = T;
          J._isVisible = true;
          N = "orientationchange resize";
          J._markupReady();
          se("onMarkupReady", [D]);
          if (H) {
              e(t).on("keydown.dw", function(e) {
                  if (e.keyCode == 13) {
                      J.select()
                  } else if (e.keyCode == 27) {
                      J.cancel()
                  }
              });
              if (P.scrollLock) {
                  D.on("touchstart touchmove", function(e) {
                      if (B) {
                          e.preventDefault()
                      }
                  })
              }
              if (c !== "Moz") {
                  e("input,select,button", C).each(function() {
                      if (!this.disabled) {
                          e(this).addClass("dwtd").prop("disabled", true)
                      }
                  })
              }
              N += " scroll";
              r.activeInstance = J;
              D.appendTo(C);
              if (f && j && !a) {
                  D.addClass("dw-in dw-trans").on(w, function() {
                      D.removeClass("dw-in dw-trans").find(".dw").removeClass("dw-" + j);
                      ee(s)
                  }).find(".dw").addClass("dw-" + j)
              }
          } else if (X.is("div")) {
              X.html(D)
          } else {
              D.insertAfter(X)
          }
          se("onMarkupInserted", [D]);
          J.position();
          V.on(N, ae);
          D.on("selectstart mousedown", v).on("click", ".dwb-e", v).on("keydown", ".dwb-e", function(t) {
              if (t.keyCode == 32) {
                  t.preventDefault();
                  t.stopPropagation();
                  e(this).click()
              }
          });
          setTimeout(function() {
              e.each(q, function(t, a) {
                  J.tap(e(".dwb" + t, D), function(e) {
                      a = typeof a === "string" ? J.buttons[a] : a;
                      a.handler.call(this, e, J)
                  }, true)
              });
              if (P.closeOnOverlay) {
                  J.tap(M, function() {
                      J.cancel()
                  })
              }
              if (H && !j) {
                  ee(s)
              }
              D.on("touchstart mousedown", ".dwb-e", $).on("touchend", ".dwb-e", K);
              J._attachEvents(D)
          }, 300);
          se("onShow", [D, J._valueText]);
          if (e(".dwc").length == 1) {
              e(".dwc").css("width", "100%")
          }
      }
      ;
      J.hide = function(t, a, s) {
          if (!J._isVisible || !s && !J._isValid && a == "set" || !s && se("onClose", [J._valueText, a]) === false) {
              return false
          }
          if (D) {
              if (c !== "Moz") {
                  e(".dwtd", C).each(function() {
                      e(this).prop("disabled", false).removeClass("dwtd")
                  })
              }
              if (f && H && j && !t && !D.hasClass("dw-trans")) {
                  D.addClass("dw-out dw-trans").find(".dw").addClass("dw-" + j).on(w, function() {
                      te(t)
                  })
              } else {
                  te(t)
              }
              V.off(N, ae)
          }
          delete r.activeInstance
      }
      ;
      J.ariaMessage = function(e) {
          x.html("");
          setTimeout(function() {
              x.html(e)
          }, 100)
      }
      ;
      J.isVisible = function() {
          return J._isVisible
      }
      ;
      J.setValue = b;
      J._generateContent = b;
      J._attachEvents = b;
      J._readValue = b;
      J._fillValue = b;
      J._markupReady = b;
      J._processSettings = b;
      J.tap = function(e, t, a) {
          var s, i, n;
          if (P.tap) {
              e.on("touchstart.dw", function(e) {
                  if (a) {
                      e.preventDefault()
                  }
                  s = h(e, "X");
                  i = h(e, "Y");
                  n = false
              }).on("touchmove.dw", function(e) {
                  if (Math.abs(h(e, "X") - s) > 20 || Math.abs(h(e, "Y") - i) > 20) {
                      n = true
                  }
              }).on("touchend.dw", function(e) {
                  var a = this;
                  if (!n) {
                      e.preventDefault();
                      setTimeout(function() {
                          t.call(a, e)
                      }, p ? 400 : 10)
                  }
                  r.tapped = true;
                  setTimeout(function() {
                      r.tapped = false
                  }, 500)
              })
          }
          e.on("click.dw", function(e) {
              if (!r.tapped) {
                  t.call(this, e)
              }
              e.preventDefault()
          })
      }
      ;
      J.option = function(e, t) {
          var a = {};
          if (typeof e === "object") {
              a = e
          } else {
              a[e] = t
          }
          J.init(a)
      }
      ;
      J.destroy = function() {
          J.hide(true, false, true);
          e.each(G, function(e, t) {
              t.off(".dw")
          });
          if (J._isInput && R) {
              u.readOnly = z
          }
          se("onDestroy", []);
          delete o[u.id]
      }
      ;
      J.getInst = function() {
          return J
      }
      ;
      J.trigger = se;
      J.init = function(a) {
          J.settings = P = {};
          l(g, a);
          l(P, r.defaults, J._defaults, d, g);
          E = r.themes[P.theme] || r.themes.mobiscroll;
          O = r.i18n[P.lang];
          se("onThemeLoad", [O, g]);
          l(P, E, O, d, g);
          Y = r.presets[J._class][P.preset];
          P.buttons = P.buttons || (P.display !== "inline" ? ["set", "cancel"] : []);
          P.headerText = P.headerText === s ? P.display !== "inline" ? "{value}" : false : P.headerText;
          if (Y) {
              Y = Y.call(u, J);
              l(P, Y, g)
          }
          if (!r.themes[P.theme]) {
              P.theme = "mobiscroll"
          }
          J._isLiquid = (P.layout || (/top|bottom/.test(P.display) ? "liquid" : "")) === "liquid";
          J._processSettings();
          X.off(".dw");
          j = p ? false : P.animate;
          q = P.buttons;
          H = P.display !== "inline";
          R = P.showOnFocus || P.showOnTap;
          V = e(P.context == "body" ? t : P.context);
          C = e(P.context);
          if (!P.setText) {
              q.splice(e.inArray("set", q), 1)
          }
          if (!P.cancelText) {
              q.splice(e.inArray("cancel", q), 1)
          }
          if (P.button3) {
              q.splice(e.inArray("set", q) + 1, 0, {
                  text: P.button3Text,
                  handler: P.button3
              })
          }
          J.context = V;
          J.live = e.inArray("set", q) == -1;
          J.buttons.set = {
              text: P.setText,
              css: "dwb-s",
              handler: J.cancel
          };
          J.buttons.cancel = {
              text: J.live ? P.closeText : P.cancelText,
              css: "dwb-c",
              handler: J.select
          };
          J.buttons.clear = {
              text: P.clearText,
              css: "dwb-cl",
              handler: J.clear
          };
          J._isInput = X.is("input");
          W = q.length > 0;
          if (J._isVisible) {
              J.hide(true, false, true)
          }
          if (H) {
              J._readValue();
              if (J._isInput && R) {
                  if (z === s) {
                      z = u.readOnly
                  }
                  u.readOnly = true
              }
              J.attachShow(X)
          } else {
              J.show()
          }
          if (J._isInput) {
              X.on("change.dw", function() {
                  if (!J._preventChange) {
                      J.setValue(X.val(), false)
                  }
                  J._preventChange = false
              })
          }
      }
      ;
      J.val = null;
      J.buttons = {};
      J._isValid = true;
      if (!y) {
          o[u.id] = J;
          J.init(g)
      }
  }
  ;
  r.classes.Widget.prototype._defaults = {
      lang: "zh",
      setText: "Set",
      selectedText: "Selected",
      closeText: "Close",
      cancelText: "Cancel",
      clearText: "Clear",
      disabled: false,
      closeOnOverlay: true,
      showOnFocus: true,
      showOnTap: true,
      display: "modal",
      scrollLock: true,
      tap: true,
      btnWidth: true,
      focusOnClose: false
  };
  r.themes.mobiscroll = {
      rows: 5,
      showLabel: false,
      headerText: false,
      btnWidth: false,
      selectedLineHeight: true,
      selectedLineBorder: 1,
      dateOrder: "MMddyy",
      weekDays: "min",
      checkIcon: "ion-ios7-checkmark-empty",
      btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
      btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
      btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
      btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
  };
  e(t).on("focus", function() {
      if (i) {
          n = true
      }
  });
  e(a).on("mouseover mouseup mousedown click", function(e) {
      if (r.tapped) {
          e.stopPropagation();
          e.preventDefault();
          return false
      }
  })
}
)(jQuery, window, document);
(function(e, t, a, s) {
  var i, n = e.mobiscroll, l = n.classes, r = n.instances, o = n.util, d = o.jsPrefix, u = o.has3d, c = o.hasFlex, f = o.getCoord, h = o.constrain, m = o.testTouch;
  function p(t) {
      var a = {
          values: [],
          keys: []
      };
      e.each(t, function(e, t) {
          a.keys.push(e);
          a.values.push(t)
      });
      return a
  }
  l.Scroller = function(n, o, w) {
      var b, v, g, y, x, C, T, D, M, k, _, V, S, q, L, j, W, H, O, A = this, F = e(n), N = {}, Y = {}, I = {}, P = [];
      function B(t) {
          if (m(t) && !i && !D && !v && !Z(this)) {
              t.preventDefault();
              t.stopPropagation();
              i = true;
              g = x.mode != "clickpick";
              j = e(".dw-ul", this);
              K(j);
              M = N[W] !== s;
              S = M ? te(j) : Y[W];
              k = f(t, "Y");
              _ = new Date;
              V = k;
              se(j, W, S, .001);
              if (g) {
                  j.closest(".dwwl").addClass("dwa")
              }
              if (t.type === "mousedown") {
                  e(a).on("mousemove", R).on("mouseup", E)
              }
          }
      }
      function R(e) {
          if (i) {
              if (g) {
                  e.preventDefault();
                  e.stopPropagation();
                  V = f(e, "Y");
                  if (Math.abs(V - k) > 3 || M) {
                      se(j, W, h(S + (k - V) / y, q - 1, L + 1));
                      M = true
                  }
              }
          }
      }
      function E(t) {
          if (i) {
              var s = new Date - _, n = h(S + (k - V) / y, q - 1, L + 1), l, r, o, d = j.offset().top;
              t.stopPropagation();
              if (u && s < 300) {
                  l = (V - k) / s;
                  r = l * l / x.speedUnit;
                  if (V - k < 0) {
                      r = -r
                  }
              } else {
                  r = V - k
              }
              o = Math.round(S - r / y);
              if (!M) {
                  var c = Math.floor((V - d) / y)
                    , f = e(e(".dw-li", j)[c])
                    , m = f.hasClass("dw-v")
                    , p = g;
                  if (C("onValueTap", [f]) !== false && m) {
                      o = c
                  } else {
                      p = true
                  }
                  if (p && m) {
                      f.addClass("dw-hl");
                      setTimeout(function() {
                          f.removeClass("dw-hl")
                      }, 100)
                  }
              }
              if (g) {
                  le(j, o, 0, true, Math.round(n))
              }
              if (t.type === "mouseup") {
                  e(a).off("mousemove", R).off("mouseup", E)
              }
              i = false
          }
      }
      function z(t) {
          v = e(this);
          if (v.hasClass("dwwb")) {
              if (m(t)) {
                  G(t, v.closest(".dwwl"), v.hasClass("dwwbp") ? re : oe)
              }
          }
          if (t.type === "mousedown") {
              e(a).on("mouseup", Q)
          }
      }
      function Q(t) {
          v = null;
          if (D) {
              clearInterval(O);
              D = false
          }
          if (t.type === "mouseup") {
              e(a).off("mouseup", Q)
          }
      }
      function U(t) {
          if (t.keyCode == 38) {
              G(t, e(this), oe)
          } else if (t.keyCode == 40) {
              G(t, e(this), re)
          }
      }
      function J() {
          if (D) {
              clearInterval(O);
              D = false
          }
      }
      function X(t) {
          if (!Z(this)) {
              t.preventDefault();
              t = t.originalEvent || t;
              var a = t.wheelDelta ? t.wheelDelta / 120 : t.detail ? -t.detail / 3 : 0
                , s = e(".dw-ul", this);
              K(s);
              le(s, Math.round(Y[W] - a), a < 0 ? 1 : 2)
          }
      }
      function G(e, t, a) {
          e.stopPropagation();
          e.preventDefault();
          if (!D && !Z(t) && !t.hasClass("dwa")) {
              D = true;
              var s = t.find(".dw-ul");
              K(s);
              clearInterval(O);
              O = setInterval(function() {
                  a(s)
              }, x.delay);
              a(s)
          }
      }
      function Z(t) {
          if (e.isArray(x.readonly)) {
              var a = e(".dwwl", b).index(t);
              return x.readonly[a]
          }
          return x.readonly
      }
      function $(t) {
          var a = '<div class="dw-bf">'
            , s = P[t]
            , i = s.values ? s : p(s)
            , n = 1
            , l = i.labels || []
            , r = i.values
            , o = i.keys || r;
          e.each(r, function(e, t) {
              if (n % 20 === 0) {
                  a += '</div><div class="dw-bf">'
              }
              a += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' + o[e] + '"' + (l[e] ? ' aria-label="' + l[e] + '"' : "") + ' style="height:' + y + "px;line-height:" + y + 'px;">' + '<div class="dw-i"' + (H > 1 ? ' style="line-height:' + Math.round(y / H) + "px;font-size:" + Math.round(y / H * .8) + 'px;"' : "") + ">" + t + "</div></div>";
              n++
          });
          a += "</div>";
          return a
      }
      function K(t) {
          var a = t.closest(".dwwl").hasClass("dwwms");
          q = e(".dw-li", t).index(e(a ? ".dw-li" : ".dw-v", t).eq(0));
          L = Math.max(q, e(".dw-li", t).index(e(a ? ".dw-li" : ".dw-v", t).eq(-1)) - (a ? x.rows - 1 : 0));
          W = e(".dw-ul", b).index(t)
      }
      function ee(e) {
          var t = x.headerText;
          return t ? typeof t === "function" ? t.call(n, e) : t.replace(/\{value\}/i, e) : ""
      }
      function te(a) {
          var i = t.getComputedStyle ? getComputedStyle(a[0]) : a[0].style, n, l;
          if (u) {
              e.each(["t", "webkitT", "MozT", "OT", "msT"], function(e, t) {
                  if (i[t + "ransform"] !== s) {
                      n = i[t + "ransform"];
                      return false
                  }
              });
              n = n.split(")")[0].split(", ");
              l = n[13] || n[5]
          } else {
              l = i.top.replace("px", "")
          }
          return Math.round(-l / y)
      }
      function ae(e, t) {
          clearTimeout(N[t]);
          delete N[t];
          e.closest(".dwwl").removeClass("dwa")
      }
      function se(e, t, a, s, i) {
          var n = -a * y
            , l = e[0].style;
          if (n == I[t] && N[t]) {
              return
          }
          I[t] = n;
          l[d + "Transition"] = "all " + (s ? s.toFixed(3) : 0) + "s ease-out";
          if (u) {
              l[d + "Transform"] = "translate3d(0," + n + "px,0)"
          } else {
              l.top = n + "px"
          }
          if (N[t]) {
              ae(e, t)
          }
          if (s && i) {
              e.closest(".dwwl").addClass("dwa");
              N[t] = setTimeout(function() {
                  ae(e, t)
              }, s * 1e3)
          }
          Y[t] = a
      }
      function ie(t, a, s, i) {
          var n = e('.dw-li[data-val="' + t + '"]', a)
            , l = e(".dw-li", a)
            , r = l.index(n)
            , o = l.length;
          if (i) {
              K(a)
          } else if (!n.hasClass("dw-v")) {
              var d = n
                , u = n
                , c = 0
                , f = 0;
              while (r - c >= 0 && !d.hasClass("dw-v")) {
                  c++;
                  d = l.eq(r - c)
              }
              while (r + f < o && !u.hasClass("dw-v")) {
                  f++;
                  u = l.eq(r + f)
              }
              if ((f < c && f && s !== 2 || !c || r - c < 0 || s == 1) && u.hasClass("dw-v")) {
                  n = u;
                  r = r + f
              } else {
                  n = d;
                  r = r - c
              }
          }
          return {
              cell: n,
              v: i ? h(r, q, L) : r,
              val: n.hasClass("dw-v") ? n.attr("data-val") : null
          }
      }
      function ne(t, a, i, n, l) {
          if (C("validate", [b, a, t, n]) !== false) {
              e(".dw-ul", b).each(function(i) {
                  var r = e(this)
                    , o = r.closest(".dwwl").hasClass("dwwms")
                    , d = i == a || a === s
                    , u = ie(A.temp[i], r, n, o)
                    , c = u.cell;
                  if (!c.hasClass("dw-sel") || d) {
                      A.temp[i] = u.val;
                      if (!o) {
                          e(".dw-sel", r).removeAttr("aria-selected");
                          c.attr("aria-selected", "true")
                      }
                      e(".dw-sel", r).removeClass("dw-sel");
                      c.addClass("dw-sel");
                      se(r, i, u.v, d ? t : .1, d ? l : false)
                  }
              });
              A._valueText = T = x.formatResult(A.temp);
              if (A.live) {
                  A._hasValue = i || A._hasValue;
                  de(i, i, 0, true)
              }
              A._header.html(ee(T));
              if (i) {
                  C("onChange", [T])
              }
              C("onValidated", [])
          }
      }
      function le(t, a, i, n, l) {
          a = h(a, q, L);
          var r = e(".dw-li", t).eq(a)
            , o = l === s ? a : l
            , d = l !== s
            , u = W
            , c = Math.abs(a - o)
            , f = n ? a == o ? .1 : c * x.timeUnit * Math.max(.5, (100 - c) / 100) : 0;
          A.temp[u] = r.attr("data-val");
          se(t, u, a, f, d);
          setTimeout(function() {
              ne(f, u, true, i, d)
          }, 10)
      }
      function re(e) {
          var t = Y[W] + 1;
          le(e, t > L ? q : t, 1, true)
      }
      function oe(e) {
          var t = Y[W] - 1;
          le(e, t < q ? L : t, 2, true)
      }
      function de(e, t, a, s, i) {
          if (A._isVisible && !s) {
              ne(a)
          }
          A._valueText = T = x.formatResult(A.temp);
          if (!i) {
              A.values = A.temp.slice(0);
              A.val = A._hasValue ? T : null
          }
          if (e) {
              C("onValueFill", [A._hasValue ? T : "", t]);
              if (A._isInput) {
                  F.val(A._hasValue ? T : "");
                  if (t) {
                      A._preventChange = true;
                      F.change()
                  }
              }
          }
      }
      l.Widget.call(this, n, o, true);
      A.setValue = function(t, a, i, l, r) {
          A._hasValue = t !== null && t !== s;
          A.temp = e.isArray(t) ? t.slice(0) : x.parseValue.call(n, t, A);
          de(a, r === s ? a : r, i, false, l)
      }
      ;
      A.getValue = function() {
          return A._hasValue ? A.values : null
      }
      ;
      A.getValues = function() {
          var e = [], t;
          for (t in A._selectedValues) {
              e.push(A._selectedValues[t])
          }
          return e
      }
      ;
      A.changeWheel = function(t, a, i) {
          if (b) {
              var n = 0
                , l = t.length;
              e.each(x.wheels, function(r, o) {
                  e.each(o, function(r, o) {
                      if (e.inArray(n, t) > -1) {
                          P[n] = o;
                          e(".dw-ul", b).eq(n).html($(n));
                          l--;
                          if (!l) {
                              A.position();
                              ne(a, s, i);
                              return false
                          }
                      }
                      n++
                  });
                  if (!l) {
                      return false
                  }
              })
          }
      }
      ;
      A.getValidCell = ie;
      A._generateContent = function() {
          var t, a = "", i = 0;
          e.each(x.wheels, function(n, l) {
              a += '<div class="mbsc-w-p dwc' + (x.mode != "scroller" ? " dwpm" : " dwsc") + (x.showLabel ? "" : " dwhl") + '">' + '<div class="dwwc"' + (x.maxWidth ? "" : ' style="max-width:600px;"') + ">" + (c ? "" : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>');
              e.each(l, function(e, n) {
                  P[i] = n;
                  t = n.label !== s ? n.label : e;
                  a += "<" + (c ? "div" : "td") + ' class="dwfl"' + ' style="' + (x.fixedWidth ? "width:" + (x.fixedWidth[i] || x.fixedWidth) + "px;" : "" + (x.maxWidth ? "max-width:" + (x.maxWidth[i] || x.maxWidth) + "px;" : "")) + '">' + '<div class="dwwl dwwl' + i + (n.multiple ? " dwwms" : "") + '">' + (x.mode != "scroller" ? '<div class="dwb-e dwwb dwwbp ' + (x.btnPlusClass || "") + '" style="height:' + y + "px;line-height:" + y + 'px;"><span>+</span></div>' + '<div class="dwb-e dwwb dwwbm ' + (x.btnMinusClass || "") + '" style="height:' + y + "px;line-height:" + y + 'px;"><span>&ndash;</span></div>' : "") + '<div class="dwl">' + t + "</div>" + '<div tabindex="0" aria-live="off" aria-label="' + t + '" role="listbox" class="dwww">' + '<div class="dww" style="height:' + x.rows * y + 'px;">' + '<div class="dw-ul" style="margin-top:' + (n.multiple ? 0 : x.rows / 2 * y - y / 2) + 'px;">';
                  a += $(i) + '</div></div><div class="dwwo"></div></div><div class="dwwol"' + (x.selectedLineHeight ? ' style="height:' + y + "px;margin-top:-" + (y / 2 + (x.selectedLineBorder || 0)) + 'px;"' : "") + "></div></div>" + (c ? "</div>" : "</td>");
                  i++
              });
              a += (c ? "" : "</tr></table>") + "</div></div>"
          });
          return a
      }
      ;
      A._attachEvents = function(e) {
          e.on("DOMMouseScroll mousewheel", ".dwwl", X).on("keydown", ".dwwl", U).on("keyup", ".dwwl", J).on("touchstart mousedown", ".dwwl", B).on("touchmove", ".dwwl", R).on("touchend", ".dwwl", E).on("touchstart mousedown", ".dwb-e", z).on("touchend", ".dwb-e", Q)
      }
      ;
      A._markupReady = function() {
          b = A._markup;
          ne()
      }
      ;
      A._fillValue = function() {
          A._hasValue = true;
          de(true, true, 0, true)
      }
      ;
      A._readValue = function() {
          var e = F.val() || "";
          A._hasValue = e !== "";
          A.temp = A.values ? A.values.slice(0) : x.parseValue(e, A);
          de()
      }
      ;
      A._processSettings = function() {
          x = A.settings;
          C = A.trigger;
          y = x.height;
          H = x.multiline;
          A._isLiquid = (x.layout || (/top|bottom/.test(x.display) && x.wheels.length == 1 ? "liquid" : "")) === "liquid";
          A.values = null;
          A.temp = null;
          if (H > 1) {
              x.cssClass = (x.cssClass || "") + " dw-ml"
          }
      }
      ;
      A._selectedValues = {};
      if (!w) {
          r[n.id] = A;
          A.init(o)
      }
  }
  ;
  l.Scroller.prototype._class = "scroller";
  l.Scroller.prototype._defaults = e.extend({}, l.Widget.prototype._defaults, {
      minWidth: 80,
      height: 40,
      rows: 3,
      multiline: 1,
      delay: 300,
      readonly: false,
      showLabel: true,
      wheels: [],
      mode: "scroller",
      preset: "",
      speedUnit: .0012,
      timeUnit: .08,
      formatResult: function(e) {
          return e.join(" ")
      },
      parseValue: function(t, a) {
          var s = t.split(" "), i = [], n = 0, l;
          e.each(a.settings.wheels, function(t, a) {
              e.each(a, function(t, a) {
                  a = a.values ? a : p(a);
                  l = a.keys || a.values;
                  if (e.inArray(s[n], l) !== -1) {
                      i.push(s[n])
                  } else {
                      i.push(l[0])
                  }
                  n++
              })
          });
          return i
      }
  })
}
)(jQuery, window, document);
(function(e, t) {
  var a = e.mobiscroll
    , s = a.datetime
    , i = new Date
    , n = {
      startYear: i.getFullYear() - 100,
      endYear: i.getFullYear() + 1,
      showNow: false,
      stepHour: 1,
      stepMinute: 1,
      stepSecond: 1,
      separator: " ",
      dateFormat: "mm/dd/yy",
      dateOrder: "mmddy",
      timeWheels: "hhiiA",
      timeFormat: "hh:ii A",
      dayText: "Day",
      yearText: "Year",
      hourText: "Hours",
      minuteText: "Minutes",
      ampmText: "&nbsp;",
      secText: "Seconds",
      nowText: "Now"
  }
    , l = function(i) {
      var l = e(this), r = {}, o;
      if (l.is("input")) {
          switch (l.attr("type")) {
          case "date":
              o = "yy-mm-dd";
              break;
          case "datetime":
              o = "yy-mm-ddTHH:ii:ssZ";
              break;
          case "datetime-local":
              o = "yy-mm-ddTHH:ii:ss";
              break;
          case "month":
              o = "yy-mm";
              r.dateOrder = "mmyy";
              break;
          case "time":
              o = "HH:ii:ss";
              break
          }
          var d = l.attr("min")
            , u = l.attr("max");
          if (d) {
              r.minDate = s.parseDate(o, d)
          }
          if (u) {
              r.maxDate = s.parseDate(o, u)
          }
      }
      var c, f, h, m, p, w, b, v, g, y, x = e.extend({}, i.settings), C = e.extend(i.settings, a.datetime.defaults, n, r, x), T = 0, D = [], M = [], k = [], _ = {}, V = {
          y: te,
          m: ae,
          d: se,
          h: ie,
          i: ne,
          s: le,
          a: re
      }, S = C.invalid, q = C.valid, L = C.preset, j = C.dateOrder, W = C.timeWheels, H = j.match(/D/), O = W.match(/a/i), A = W.match(/h/), F = L == "datetime" ? C.dateFormat + C.separator + C.timeFormat : L == "time" ? C.timeFormat : C.dateFormat, N = new Date, Y = C.stepHour, I = C.stepMinute, P = C.stepSecond, B = C.minDate || new Date(C.startYear,0,1), R = C.maxDate || new Date(C.endYear,11,31,23,59,59), E = B.getHours() % Y, z = B.getMinutes() % I, Q = B.getSeconds() % P, U = de(Y, E, A ? 11 : 23), J = de(I, z, 59), X = de(I, z, 59);
      o = o || F;
      if (L.match(/date/i)) {
          e.each(["y", "m", "d"], function(e, t) {
              c = j.search(new RegExp(t,"i"));
              if (c > -1) {
                  k.push({
                      o: c,
                      v: t
                  })
              }
          });
          k.sort(function(e, t) {
              return e.o > t.o ? 1 : -1
          });
          e.each(k, function(e, t) {
              _[t.v] = e
          });
          p = [];
          for (f = 0; f < 3; f++) {
              if (f == _.y) {
                  T++;
                  m = [];
                  h = [];
                  w = C.getYear(B);
                  b = C.getYear(R);
                  for (c = w; c <= b; c++) {
                      h.push(c);
                      m.push((j.match(/yy/i) ? c : (c + "").substr(2, 2)) + (C.yearSuffix || ""))
                  }
                  K(p, h, m, C.yearText)
              } else if (f == _.m) {
                  T++;
                  m = [];
                  h = [];
                  for (c = 0; c < 12; c++) {
                      var G = j.replace(/[dy]/gi, "").replace(/mm/, (c < 9 ? "0" + (c + 1) : c + 1) + (C.monthSuffix || "")).replace(/m/, c + 1 + (C.monthSuffix || ""));
                      h.push(c);
                      m.push(G.match(/MM/) ? G.replace(/MM/, '<span class="dw-mon">' + C.monthNames[c] + "</span>") : G.replace(/M/, '<span class="dw-mon">' + C.monthNamesShort[c] + "</span>"))
                  }
                  K(p, h, m, C.monthText)
              } else if (f == _.d) {
                  T++;
                  m = [];
                  h = [];
                  for (c = 1; c < 32; c++) {
                      h.push(c);
                      m.push((j.match(/dd/i) && c < 10 ? "0" + c : c) + (C.daySuffix || ""))
                  }
                  K(p, h, m, C.dayText)
              }
          }
          M.push(p)
      }
      if (L.match(/time/i)) {
          v = true;
          k = [];
          e.each(["h", "i", "s", "a"], function(e, t) {
              e = W.search(new RegExp(t,"i"));
              if (e > -1) {
                  k.push({
                      o: e,
                      v: t
                  })
              }
          });
          k.sort(function(e, t) {
              return e.o > t.o ? 1 : -1
          });
          e.each(k, function(e, t) {
              _[t.v] = T + e
          });
          p = [];
          for (f = T; f < T + 4; f++) {
              if (f == _.h) {
                  T++;
                  m = [];
                  h = [];
                  for (c = E; c < (A ? 12 : 24); c += Y) {
                      h.push(c);
                      m.push(A && c === 0 ? 12 : W.match(/hh/i) && c < 10 ? "0" + c : c)
                  }
                  K(p, h, m, C.hourText)
              } else if (f == _.i) {
                  T++;
                  m = [];
                  h = [];
                  for (c = z; c < 60; c += I) {
                      h.push(c);
                      m.push(W.match(/ii/) && c < 10 ? "0" + c : c)
                  }
                  K(p, h, m, C.minuteText)
              } else if (f == _.s) {
                  T++;
                  m = [];
                  h = [];
                  for (c = Q; c < 60; c += P) {
                      h.push(c);
                      m.push(W.match(/ss/) && c < 10 ? "0" + c : c)
                  }
                  K(p, h, m, C.secText)
              } else if (f == _.a) {
                  T++;
                  var Z = W.match(/A/);
                  K(p, [0, 1], Z ? [C.amText.toUpperCase(), C.pmText.toUpperCase()] : [C.amText, C.pmText], C.ampmText)
              }
          }
          M.push(p)
      }
      function $(e, a, s) {
          if (_[a] !== t) {
              return +e[_[a]]
          }
          if (s !== t) {
              return s
          }
          return V[a](N)
      }
      function K(e, t, a, s) {
          e.push({
              values: a,
              keys: t,
              label: s
          })
      }
      function ee(e, t, a, s) {
          return Math.min(s, Math.floor(e / t) * t + a)
      }
      function te(e) {
          return C.getYear(e)
      }
      function ae(e) {
          return C.getMonth(e)
      }
      function se(e) {
          return C.getDay(e)
      }
      function ie(e) {
          var t = e.getHours();
          t = A && t >= 12 ? t - 12 : t;
          return ee(t, Y, E, U)
      }
      function ne(e) {
          return ee(e.getMinutes(), I, z, J)
      }
      function le(e) {
          return ee(e.getSeconds(), P, Q, X)
      }
      function re(e) {
          return O && e.getHours() > 11 ? 1 : 0
      }
      function oe(e) {
          if (e === null) {
              return e
          }
          var t = $(e, "h", 0);
          return C.getDate($(e, "y"), $(e, "m"), $(e, "d"), $(e, "a", 0) ? t + 12 : t, $(e, "i", 0), $(e, "s", 0))
      }
      function de(e, t, a) {
          return Math.floor((a - t) / e) * e + t
      }
      function ue(e, t) {
          var a, s, i = false, n = false, l = 0, r = 0;
          if (ce(e)) {
              return e
          }
          if (e < B) {
              e = B
          }
          if (e > R) {
              e = R
          }
          a = e;
          s = e;
          if (t !== 2) {
              i = ce(a);
              while (!i && a < R) {
                  a = new Date(a.getTime() + 1e3 * 60 * 60 * 24);
                  i = ce(a);
                  l++
              }
          }
          if (t !== 1) {
              n = ce(s);
              while (!n && s > B) {
                  s = new Date(s.getTime() - 1e3 * 60 * 60 * 24);
                  n = ce(s);
                  r++
              }
          }
          if (t === 1 && i) {
              return a
          }
          if (t === 2 && n) {
              return s
          }
          return r < l && n ? s : a
      }
      function ce(e) {
          if (e < B) {
              return false
          }
          if (e > R) {
              return false
          }
          if (fe(e, q)) {
              return true
          }
          if (fe(e, S)) {
              return false
          }
          return true
      }
      function fe(e, t) {
          var a, s, i;
          if (t) {
              for (s = 0; s < t.length; s++) {
                  a = t[s];
                  i = a + "";
                  if (!a.start) {
                      if (a.getTime) {
                          if (e.getFullYear() == a.getFullYear() && e.getMonth() == a.getMonth() && e.getDate() == a.getDate()) {
                              return true
                          }
                      } else if (!i.match(/w/i)) {
                          i = i.split("/");
                          if (i[1]) {
                              if (i[0] - 1 == e.getMonth() && i[1] == e.getDate()) {
                                  return true
                              }
                          } else if (i[0] == e.getDate()) {
                              return true
                          }
                      } else {
                          i = +i.replace("w", "");
                          if (i == e.getDay()) {
                              return true
                          }
                      }
                  }
              }
          }
          return false
      }
      function he(e, t, a, s, i, n, l) {
          var r, o, d;
          if (e) {
              for (r = 0; r < e.length; r++) {
                  o = e[r];
                  d = o + "";
                  if (!o.start) {
                      if (o.getTime) {
                          if (C.getYear(o) == t && C.getMonth(o) == a) {
                              n[C.getDay(o) - 1] = l
                          }
                      } else if (!d.match(/w/i)) {
                          d = d.split("/");
                          if (d[1]) {
                              if (d[0] - 1 == a) {
                                  n[d[1] - 1] = l
                              }
                          } else {
                              n[d[0] - 1] = l
                          }
                      } else {
                          d = +d.replace("w", "");
                          for (f = d - s; f < i; f += 7) {
                              if (f >= 0) {
                                  n[f] = l
                              }
                          }
                      }
                  }
              }
          }
      }
      function me(a, s, i, n, l, r, o, d, u) {
          var c, f, h, m, p, w, b, v, x, T, M, k, _, V, S, q, L, j, W = {}, H = {
              h: Y,
              i: I,
              s: P,
              a: 1
          }, O = C.getDate(l, r, o), F = ["a", "h", "i", "s"];
          if (a) {
              e.each(a, function(e, t) {
                  if (t.start) {
                      t.apply = false;
                      c = t.d;
                      f = c + "";
                      h = f.split("/");
                      if (c && (c.getTime && l == C.getYear(c) && r == C.getMonth(c) && o == C.getDay(c) || !f.match(/w/i) && (h[1] && o == h[1] && r == h[0] - 1 || !h[1] && o == h[0]) || f.match(/w/i) && O.getDay() == +f.replace("w", ""))) {
                          t.apply = true;
                          W[O] = true
                      }
                  }
              });
              e.each(a, function(a, n) {
                  _ = 0;
                  V = 0;
                  M = 0;
                  k = t;
                  w = true;
                  b = true;
                  S = false;
                  if (n.start && (n.apply || !n.d && !W[O])) {
                      m = n.start.split(":");
                      p = n.end.split(":");
                      for (T = 0; T < 3; T++) {
                          if (m[T] === t) {
                              m[T] = 0
                          }
                          if (p[T] === t) {
                              p[T] = 59
                          }
                          m[T] = +m[T];
                          p[T] = +p[T]
                      }
                      m.unshift(m[0] > 11 ? 1 : 0);
                      p.unshift(p[0] > 11 ? 1 : 0);
                      if (A) {
                          if (m[1] >= 12) {
                              m[1] = m[1] - 12
                          }
                          if (p[1] >= 12) {
                              p[1] = p[1] - 12
                          }
                      }
                      for (T = 0; T < s; T++) {
                          if (D[T] !== t) {
                              v = ee(m[T], H[F[T]], g[F[T]], y[F[T]]);
                              x = ee(p[T], H[F[T]], g[F[T]], y[F[T]]);
                              q = 0;
                              L = 0;
                              j = 0;
                              if (A && T == 1) {
                                  q = m[0] ? 12 : 0;
                                  L = p[0] ? 12 : 0;
                                  j = D[0] ? 12 : 0
                              }
                              if (!w) {
                                  v = 0
                              }
                              if (!b) {
                                  x = y[F[T]]
                              }
                              if ((w || b) && (v + q < D[T] + j && D[T] + j < x + L)) {
                                  S = true
                              }
                              if (D[T] != v) {
                                  w = false
                              }
                              if (D[T] != x) {
                                  b = false
                              }
                          }
                      }
                      if (!u) {
                          for (T = s + 1; T < 4; T++) {
                              if (m[T] > 0) {
                                  _ = H[i]
                              }
                              if (p[T] < y[F[T]]) {
                                  V = H[i]
                              }
                          }
                      }
                      if (!S) {
                          v = ee(m[s], H[i], g[i], y[i]) + _;
                          x = ee(p[s], H[i], g[i], y[i]) - V;
                          if (w) {
                              M = we(d, v, y[i], 0)
                          }
                          if (b) {
                              k = we(d, x, y[i], 1)
                          }
                      }
                      if (w || b || S) {
                          if (u) {
                              e(".dw-li", d).slice(M, k).addClass("dw-v")
                          } else {
                              e(".dw-li", d).slice(M, k).removeClass("dw-v")
                          }
                      }
                  }
              })
          }
      }
      function pe(t, a) {
          return e(".dw-li", t).index(e('.dw-li[data-val="' + a + '"]', t))
      }
      function we(t, a, s, i) {
          if (a < 0) {
              return 0
          }
          if (a > s) {
              return e(".dw-li", t).length
          }
          return pe(t, a) + i
      }
      function be(e) {
          var a, s = [];
          if (e === null || e === t) {
              return e
          }
          for (a in _) {
              s[_[a]] = V[a](e)
          }
          return s
      }
      function ve(e) {
          var t, a, s, i = [];
          if (e) {
              for (t = 0; t < e.length; t++) {
                  a = e[t];
                  if (a.start && a.start.getTime) {
                      s = new Date(a.start);
                      while (s <= a.end) {
                          i.push(new Date(s.getFullYear(),s.getMonth(),s.getDate()));
                          s.setDate(s.getDate() + 1)
                      }
                  } else {
                      i.push(a)
                  }
              }
              return i
          }
          return e
      }
      i.setDate = function(e, t, a, s, n) {
          i.temp = be(e);
          i.setValue(i.temp, t, a, s, n)
      }
      ;
      i.getDate = function(e) {
          return oe(e ? i.temp : i.values)
      }
      ;
      i.convert = function(t) {
          var a = t;
          if (!e.isArray(t)) {
              a = [];
              e.each(t, function(t, s) {
                  e.each(s, function(e, s) {
                      if (t === "daysOfWeek") {
                          if (s.d) {
                              s.d = "w" + s.d
                          } else {
                              s = "w" + s
                          }
                      }
                      a.push(s)
                  })
              })
          }
          return a
      }
      ;
      i.format = F;
      i.order = _;
      i.buttons.now = {
          text: C.nowText,
          css: "dwb-n",
          handler: function() {
              i.setDate(new Date, false, .3, true, true)
          }
      };
      if (C.showNow) {
          C.buttons.splice(e.inArray("set", C.buttons) + 1, 0, "now")
      }
      S = S ? i.convert(S) : false;
      S = ve(S);
      q = ve(q);
      B = oe(be(B));
      R = oe(be(R));
      g = {
          y: B.getFullYear(),
          m: 0,
          d: 1,
          h: E,
          i: z,
          s: Q,
          a: 0
      };
      y = {
          y: R.getFullYear(),
          m: 11,
          d: 31,
          h: U,
          i: J,
          s: X,
          a: 1
      };
      return {
          wheels: M,
          headerText: C.headerText ? function() {
              return s.formatDate(F, oe(i.temp), C)
          }
          : false,
          formatResult: function(e) {
              return s.formatDate(o, oe(e), C)
          },
          parseValue: function(e) {
              return be(e ? s.parseDate(o, e, C) : C.defaultValue || new Date)
          },
          validate: function(a, s, n, l) {
              var r = ue(oe(i.temp), l)
                , o = be(r)
                , d = $(o, "y")
                , u = $(o, "m")
                , c = true
                , f = true;
              e.each(["y", "m", "d", "a", "h", "i", "s"], function(s, i) {
                  if (_[i] !== t) {
                      var n = g[i]
                        , l = y[i]
                        , r = 31
                        , h = $(o, i)
                        , m = e(".dw-ul", a).eq(_[i]);
                      if (i == "d") {
                          r = C.getMaxDayOfMonth(d, u);
                          l = r;
                          if (H) {
                              e(".dw-li", m).each(function() {
                                  var t = e(this)
                                    , a = t.data("val")
                                    , s = C.getDate(d, u, a).getDay()
                                    , i = j.replace(/[my]/gi, "").replace(/dd/, (a < 10 ? "0" + a : a) + (C.daySuffix || "")).replace(/d/, a + (C.daySuffix || ""));
                                  e(".dw-i", t).html(i.match(/DD/) ? i.replace(/DD/, '<span class="dw-day">' + C.dayNames[s] + "</span>") : i.replace(/D/, '<span class="dw-day">' + C.dayNamesShort[s] + "</span>"))
                              })
                          }
                      }
                      if (c && B) {
                          n = V[i](B)
                      }
                      if (f && R) {
                          l = V[i](R)
                      }
                      if (i != "y") {
                          var p = pe(m, n)
                            , w = pe(m, l);
                          e(".dw-li", m).removeClass("dw-v").slice(p, w + 1).addClass("dw-v");
                          if (i == "d") {
                              e(".dw-li", m).removeClass("dw-h").slice(r).addClass("dw-h")
                          }
                      }
                      if (h < n) {
                          h = n
                      }
                      if (h > l) {
                          h = l
                      }
                      if (c) {
                          c = h == n
                      }
                      if (f) {
                          f = h == l
                      }
                      if (i == "d") {
                          var b = C.getDate(d, u, 1).getDay()
                            , v = {};
                          he(S, d, u, b, r, v, 1);
                          he(q, d, u, b, r, v, 0);
                          e.each(v, function(t, a) {
                              if (a) {
                                  e(".dw-li", m).eq(t).removeClass("dw-v")
                              }
                          })
                      }
                  }
              });
              if (v) {
                  e.each(["a", "h", "i", "s"], function(s, n) {
                      var r = $(o, n)
                        , c = $(o, "d")
                        , f = e(".dw-ul", a).eq(_[n]);
                      if (_[n] !== t) {
                          me(S, s, n, o, d, u, c, f, 0);
                          me(q, s, n, o, d, u, c, f, 1);
                          D[s] = +i.getValidCell(r, f, l).val
                      }
                  })
              }
              i.temp = o
          }
      }
  };
  e.each(["date", "time", "datetime"], function(e, t) {
      a.presets.scroller[t] = l;
      a.presetShort(t)
  })
}
)(jQuery);
(function(e, t) {
  var a = {
      inputClass: "",
      invalid: [],
      rtl: false,
      showInput: true,
      group: false,
      groupLabel: "Groups",
      checkIcon: "checkmark"
  };
  e.mobiscroll.presetShort("select");
  e.mobiscroll.presets.scroller.select = function(s) {
      var i, n, l, r, o, d, u, c, f, h, m, p = e.extend({}, s.settings), w = e.extend(s.settings, a, p), b = w.layout || (/top|bottom/.test(w.display) ? "liquid" : ""), v = b == "liquid", g = e(this), y = g.prop("multiple"), x = this.id + "_dummy", C = e('label[for="' + this.id + '"]').attr("for", x), T = w.label !== t ? w.label : C.length ? C.text() : g.attr("name"), D = "dw-msel mbsc-ic mbsc-ic-" + w.checkIcon, M = e("optgroup", g).length && !w.group, k = [], _ = [], V = {}, S = w.readonly;
      function q(t, a, s) {
          e("option", t).each(function() {
              s.push(this.text);
              a.push(this.value);
              if (this.disabled) {
                  k.push(this.value)
              }
          })
      }
      function L() {
          var t, a, s = 0, i = [], n = [], l = [[]];
          if (w.group) {
              e("optgroup", g).each(function(e) {
                  i.push(this.label);
                  n.push(e)
              });
              a = {
                  values: i,
                  keys: n,
                  label: w.groupLabel
              };
              if (v) {
                  l[0][s] = a
              } else {
                  l[s] = [a]
              }
              t = r;
              s++
          } else {
              t = g
          }
          i = [];
          n = [];
          if (M) {
              e("optgroup", g).each(function(e) {
                  i.push(this.label);
                  n.push("__group" + e);
                  k.push("__group" + e);
                  q(this, n, i)
              })
          } else {
              q(t, n, i)
          }
          a = {
              multiple: y,
              values: i,
              keys: n,
              label: T
          };
          if (v) {
              l[0][s] = a
          } else {
              l[s] = [a]
          }
          return l
      }
      function j(a) {
          var s = e("option", g).attr("value");
          u = y ? a ? a[0] : s : a === t || a === null ? s : a;
          if (w.group) {
              r = g.find('option[value="' + u + '"]').parent();
              l = r.index()
          }
      }
      function W(e, t, a) {
          var i = [];
          if (y) {
              var n = []
                , l = 0;
              for (l in s._selectedValues) {
                  n.push(V[l]);
                  i.push(l)
              }
              o.val(n.join(", "))
          } else {
              o.val(e);
              i = t ? s.temp[d] : null
          }
          if (t) {
              g.val(i);
              if (a) {
                  f = true;
                  g.change()
              }
          }
      }
      function H(e) {
          var t = e.attr("data-val")
            , a = e.hasClass("dw-msel");
          if (y && e.closest(".dwwl").hasClass("dwwms")) {
              if (e.hasClass("dw-v")) {
                  if (a) {
                      e.removeClass(D).removeAttr("aria-selected");
                      delete s._selectedValues[t]
                  } else {
                      e.addClass(D).attr("aria-selected", "true");
                      s._selectedValues[t] = t
                  }
                  if (s.live) {
                      W(t, true, true)
                  }
              }
              return false
          }
      }
      if (w.group && !e("optgroup", g).length) {
          w.group = false
      }
      if (!w.invalid.length) {
          w.invalid = k
      }
      if (w.group) {
          n = 0;
          d = 1
      } else {
          n = -1;
          d = 0
      }
      e("option", g).each(function() {
          V[this.value] = this.text
      });
      j(g.val());
      e("#" + x).remove();
      o = e('<input type="text" id="' + x + '" class="' + w.inputClass + '" placeholder="' + (w.placeholder || "") + '" readonly />');
      if (w.showInput) {
          o.insertBefore(g)
      }
      s.attachShow(o);
      var O = g.val() || []
        , A = 0;
      for (A; A < O.length; A++) {
          s._selectedValues[O[A]] = O[A]
      }
      W(V[u]);
      g.off(".dwsel").on("change.dwsel", function() {
          if (!f) {
              s.setValue(y ? g.val() || [] : [g.val()], true)
          }
          f = false
      }).addClass("dw-hsel").attr("tabindex", -1).closest(".ui-field-contain").trigger("create");
      if (!s._setValue) {
          s._setValue = s.setValue
      }
      s.setValue = function(a, i, n, o, d) {
          var c, f, h = e.isArray(a) ? a[0] : a;
          u = h !== t && h !== null ? h : e("option", g).attr("value");
          if (y) {
              s._selectedValues = {};
              if (a) {
                  for (c = 0; c < a.length; c++) {
                      s._selectedValues[a[c]] = a[c]
                  }
              }
          }
          if (h === null) {
              f = null
          } else if (w.group) {
              r = g.find('option[value="' + u + '"]').parent();
              l = r.index();
              f = [l, u]
          } else {
              f = [u]
          }
          s._setValue(f, i, n, o, d);
          if (i) {
              var m = y ? true : u !== g.val();
              W(V[u], m, d === t ? i : d)
          }
      }
      ;
      s.getValue = function(e, t) {
          var a = e ? s.temp : s._hasValue ? s.values : null;
          return a ? w.group && t ? a : a[d] : null
      }
      ;
      return {
          width: 50,
          wheels: m,
          layout: b,
          headerText: false,
          anchor: o,
          formatResult: function(e) {
              return V[e[d]]
          },
          parseValue: function(e) {
              var a = g.val() || []
                , i = 0;
              if (y) {
                  s._selectedValues = {};
                  for (i; i < a.length; i++) {
                      s._selectedValues[a[i]] = a[i]
                  }
              }
              j(e === t ? g.val() : e);
              return w.group ? [l, u] : [u]
          },
          onBeforeShow: function() {
              if (y && w.counter) {
                  w.headerText = function() {
                      var t = 0;
                      e.each(s._selectedValues, function() {
                          t++
                      });
                      return t + " " + w.selectedText
                  }
              }
              j(g.val());
              if (w.group) {
                  c = l;
                  s.temp = [l, u]
              }
              w.wheels = L()
          },
          onMarkupReady: function(t) {
              t.addClass("dw-select");
              e(".dwwl" + n, t).on("mousedown touchstart", function() {
                  clearTimeout(h)
              });
              if (M) {
                  e(".dw", t).addClass("dw-select-gr");
                  e('.dw-li[data-val^="__group"]', t).addClass("dw-w-gr")
              }
              if (y) {
                  t.addClass("dwms");
                  e(".dwwl", t).on("keydown", function(t) {
                      if (t.keyCode == 32) {
                          t.preventDefault();
                          t.stopPropagation();
                          H(e(".dw-sel", this))
                      }
                  }).eq(d).addClass("dwwms").attr("aria-multiselectable", "true");
                  _ = e.extend({}, s._selectedValues)
              }
          },
          validate: function(a, o, f) {
              var m, p, b = e(".dw-ul", a).eq(d);
              if (o === t && y) {
                  p = s._selectedValues;
                  m = 0;
                  e(".dwwl" + d + " .dw-li", a).removeClass(D).removeAttr("aria-selected");
                  for (m in p) {
                      e(".dwwl" + d + ' .dw-li[data-val="' + p[m] + '"]', a).addClass(D).attr("aria-selected", "true")
                  }
              }
              if (w.group && (o === t || o === n)) {
                  l = +s.temp[n];
                  if (l !== c) {
                      r = g.find("optgroup").eq(l);
                      u = r.find("option").not("[disabled]").eq(0).val();
                      u = u || g.val();
                      w.wheels = L();
                      if (!i) {
                          s.temp = [l, u];
                          w.readonly = [false, true];
                          clearTimeout(h);
                          h = setTimeout(function() {
                              i = true;
                              c = l;
                              s.changeWheel([d], t, true);
                              w.readonly = S
                          }, f * 1e3);
                          return false
                      }
                  } else {
                      w.readonly = S
                  }
              } else {
                  u = s.temp[d]
              }
              e.each(w.invalid, function(t, a) {
                  e('.dw-li[data-val="' + a + '"]', b).removeClass("dw-v")
              });
              i = false
          },
          onClear: function(t) {
              s._selectedValues = {};
              o.val("");
              e(".dwwl" + d + " .dw-li", t).removeClass(D).removeAttr("aria-selected")
          },
          onValueTap: H,
          onSelect: function(e) {
              W(e, true, true)
          },
          onCancel: function() {
              if (!s.live && y) {
                  s._selectedValues = e.extend({}, _)
              }
          },
          onChange: function(e) {
              if (s.live && !y) {
                  o.val(e);
                  f = true;
                  g.val(s.temp[d]).change()
              }
          },
          onDestroy: function() {
              o.remove();
              g.removeClass("dw-hsel").removeAttr("tabindex")
          }
      }
  }
}
)(jQuery);

