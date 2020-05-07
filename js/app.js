var customSearch;
!(function (e) {
  "use strict";
  var t = 80;
  const a = e(".l_header", ".cover-wrapper");
  function o(a, o = t) {
    const n = a.href ? e(a.getAttribute("href")) : e(a);
    e("html, body").animate({ scrollTop: n.offset().top - o }, 500);
  }
  a[0] && (t = a[0].clientHeight + 16),
    e(function () {
      var n, r, c;
      !(function () {
        if (!window.subData) return;
        const t = e("header .wrapper"),
          a = e(".s-comment", t),
          n = e(".s-toc", t);
        t.find(".nav-sub .title").text(window.subData.title);
        let r = document.body.scrollTop;
        e(document, window).scroll(() => {
          const a = e(window).scrollTop(),
            o = a - r;
          o >= 50 && a > 100
            ? ((r = a), t.addClass("sub"))
            : o <= -50 && ((r = a), t.removeClass("sub"));
        });
        const c = e(".l_body .comments");
        c.length
          ? a.click((e) => {
              e.preventDefault(), e.stopPropagation(), o(c);
            })
          : a.remove();
        const l = e(".l_body .toc-wrapper");
        l.length && l.children().length
          ? (n.click((e) => {
              e.stopPropagation(),
                l.toggleClass("active"),
                n.toggleClass("active");
            }),
            e(document).click(function (e) {
              l.removeClass("active"), n.removeClass("active");
            }),
            e(document, window).scroll(() => {
              l.removeClass("active"), n.removeClass("active");
            }))
          : n.remove();
      })(),
        (function () {
          var t = e("body .navigation");
          t.find("li a.active").removeClass("active");
          var a = null,
            o = location.pathname.replace(/\/|%|\./g, "");
          0 == o.length && (o = "home");
          var n = o.match(/page\d{0,}$/g);
          n && ((n = n[0]), (o = o.split(n)[0]));
          var r,
            c = o.match(/index.html/);
          c && ((c = c[0]), (o = o.split(c)[0])),
            o &&
              t &&
              ((a = e("#" + o, t)),
              (r = a) &&
                r.length &&
                r.addClass("active").siblings().removeClass("active"));
        })(),
        (n = e(".l_header .switcher .s-search")),
        (r = e(".l_header")),
        (c = e(".l_header .m_search")),
        0 !== n.length &&
          (n.click(function (e) {
            e.stopPropagation(),
              r.toggleClass("z_search-open"),
              c.find("input").focus(),
              n.toggleClass("active");
          }),
          e(document).click(function (e) {
            r.removeClass("z_search-open"), n.removeClass("active");
          }),
          c.click(function (e) {
            e.stopPropagation();
          }),
          r.ready(function () {
            r.bind("keydown", function (e) {
              if (9 == e.keyCode) return !1;
              var t,
                a,
                o = !!document.all;
              o
                ? ((t = window.event.keyCode), (a = window.event))
                : ((t = e.which), (a = e)),
                9 == t &&
                  (o
                    ? ((a.keyCode = 0), (a.returnValue = !1))
                    : ((a.which = 0), a.preventDefault()));
            });
          })),
        (function () {
          const a = e(".toc-wrapper");
          if (0 === a.length) return;
          a.click((e) => {
            e.stopPropagation(), a.addClass("active");
          }),
            e(document).click(() => a.removeClass("active")),
            a.on("click", "a", (t) => {
              t.preventDefault(),
                t.stopPropagation(),
                "A" === t.target.tagName
                  ? o(t.target, 0)
                  : "SPAN" === t.target.tagName && o(t.target.parentElement, 0),
                a.removeClass("active");
              const n = e(".s-toc");
              n.length > 0 && n.removeClass("active");
            });
          const n = Array.from(a.find("li a")),
            r = () =>
              n.map((a) =>
                Math.floor(e(a.getAttribute("href")).offset().top - t)
              );
          let c = r();
          const l = () => {
            const t = e("html").scrollTop() || e("body").scrollTop();
            if (!c) return;
            let a,
              o = 0,
              r = c.length - 1;
            for (; o < r; )
              c[(a = (o + r + 1) >> 1)] === t
                ? (o = r = a)
                : c[a] < t
                ? (o = a)
                : (r = a - 1);
            e(n).removeClass("active").eq(o).addClass("active");
          };
          e(window)
            .resize(() => {
              (c = r()), l();
            })
            .scroll(() => {
              l();
            }),
            l();
        })(),
        (function () {
          const t = e(".menu .active"),
            n = e(".s-top"),
            r = e("h1.title", "#header-meta"),
            c = e(".l_body");
          t.length &&
            c &&
            t.click((e) => {
              e.preventDefault(), e.stopPropagation(), o(c);
            }),
            r.length &&
              c &&
              r.click((e) => {
                e.preventDefault(), e.stopPropagation(), o(c);
              }),
            n.length &&
              c &&
              n.click((e) => {
                e.preventDefault(), e.stopPropagation(), o(c);
              });
          const l = e(".cover-wrapper");
          var s = 0;
          l[0] && (s = l[0].clientHeight - 180);
          var i = document.body.scrollTop;
          e(document, window).scroll(() => {
            const t = e(window).scrollTop(),
              o = t - i;
            (i = t),
              t > 180
                ? (n.addClass("show"),
                  o > 0 ? n.removeClass("hl") : n.addClass("hl"))
                : n.removeClass("show").removeClass("hl"),
              t > s ? a.addClass("show") : a.removeClass("show");
          });
        })(),
        "google" === SEARCH_SERVICE
          ? (customSearch = new GoogleCustomSearch({
              apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
              engineId: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
              imagePath: "/img/",
            }))
          : "algolia" === SEARCH_SERVICE
          ? (customSearch = new AlgoliaSearch({
              apiKey: ALGOLIA_API_KEY,
              appId: ALGOLIA_APP_ID,
              indexName: ALGOLIA_INDEX_NAME,
              imagePath: "/img/",
            }))
          : "hexo" === SEARCH_SERVICE
          ? (customSearch = new HexoSearch({ imagePath: "/img/" }))
          : "azure" === SEARCH_SERVICE
          ? (customSearch = new AzureSearch({
              serviceName: AZURE_SERVICE_NAME,
              indexName: AZURE_INDEX_NAME,
              queryKey: AZURE_QUERY_KEY,
              imagePath: "/img/",
            }))
          : "baidu" === SEARCH_SERVICE &&
            (customSearch = new BaiduSearch({
              apiId: 0,
              imagePath: null,
            })),
        (function () {
          const t = e(".tabs");
          if (0 === t.length) return;
          let a = t.find(".nav-tabs .tab");
          for (var o = 0; o < a.length; o++) {
            let e = t.find(a[o].children[0]);
            e.addClass(e.attr("href")), e.removeAttr("href");
          }
          e(".tabs .nav-tabs").on("click", "a", (t) => {
            t.preventDefault(), t.stopPropagation();
            let a = e(t.target.parentElement.parentElement.parentElement);
            return (
              a.find(".nav-tabs .active").removeClass("active"),
              a.find(t.target.parentElement).addClass("active"),
              a.find(".tab-content .active").removeClass("active"),
              a.find(e(t.target).attr("class")).addClass("active"),
              !1
            );
          });
        })(),
        e(".scroll-down").on("click", function () {
          o(".l_body");
        }),
        setTimeout(function () {
          e("#loading-bar-wrapper").fadeOut(500);
        }, 300);
    });
})(jQuery);
