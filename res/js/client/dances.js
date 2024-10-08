$(document).ready(function() {
    function p(p) {
        $(p.target).prev(".toggle-submenu").find(".more-less").toggleClass("fa-plus-square fa-minus-square")
    }
    $("#mobile_menu").click(function(p) {
            $("#sidebar_menu, #mobile_menu").toggleClass("active"),
                $("#sidebar_menu_bg").addClass("active"),
                $("#search-toggle, #search, #header").removeClass("active"),
                $("body").toggleClass("body-hidden")
        }),
        $(".toggle-sidebar, #sidebar_menu_bg").click(function(p) {
            $("#sidebar_menu, #mobile_menu, #sidebar_menu_bg, #search-toggle, #search, #header").removeClass("active"),
                $("body").removeClass("body-hidden")
        }),
        $("#search-toggle").click(function(p) {
            $("#search, #search-toggle, #sidebar_menu_bg, #header").toggleClass("active"),
                $("body").toggleClass("body-hidden")
        }),
        $("#sidebar_subs_genre, #sidebar_subs_country").on("hidden.bs.collapse", p),
        $("#sidebar_subs_genre, #sidebar_subs_country").on("shown.bs.collapse", p)
});


function redirect(p) {
    p.redirect && (location.href = p.redirect)
}

function watch(p, s) {
    $(".detail_page").hasClass("watch_page") && (s.preventDefault(),
        s = $(p).attr("href"),
        p = $(p).attr("data-linkid"),
        $(".link-item").removeClass("active"),
        history.pushState({}, "", s),
        get_source(p))
}

function watch2(p) {
    var s;
    if ($(".detail_page").hasClass("watch_page"))
        return s = $(p).attr("href"),
            p = $(p).attr("data-linkid"),
            $(".link-item").removeClass("active"),
            history.pushState({}, "", s),
            get_source(p),
            !1
}


$(document).ready(function() {
    $("#text-home-expand").click(function(p) {
            $(".text-home").toggleClass("thm-expand")
        }),
        $(".detail-extend-toggle").click(function(p) {
            $(".detail-extend").toggleClass("active")
        }),
        $(".header_menu-list> .nav-item").bind("mouseover", function() {
            $(this).find(".header_menu-sub").css("display", "block")
        }),
        $(".header_menu-list> .nav-item").bind("mouseout", function() {
            $(this).find(".header_menu-sub").css("display", "none")
        }),
        $("#turn-off-light").click(function(p) {
            $("#mask-overlay, #turn-off-light, .watching_player-area").toggleClass("active")
        }),
        $("#mask-overlay").click(function(p) {
            $("#mask-overlay, #turn-off-light, .watching_player-area").removeClass("active")
        });
    var p = !0,
        s = ($(".search-suggest").mouseover(function() {
                p = !1
            }),
            $(".search-suggest").mouseout(function() {
                p = !0
            }),
            null);
    $("input[name=keyword]").keyup(function() {
            null != s && clearTimeout(s),
                s = setTimeout(function() {
                    s = null;
                    var p = $("input[name=keyword]").val().trim();
                    1 < p.length ? $.post("/ajax/search", {
                        keyword: p
                    }, function(p) {
                        $(".search-suggest").html(p),
                            $(".search-suggest").css({
                                display: "flex"
                            })
                    }) : $(".search-suggest").hide()
                }, 600)
        }),
        $("input[name=keyword]").blur(function() {
            p && $(".search-suggest").hide()
        }),
        $("input[name=keyword]").focus(function() {
            "" !== $(".search-suggest").html() && $(".search-suggest").css({
                display: "flex"
            })
        }),
        $(".goto-seasons").click(function() {
            $("html, body").animate({
                scrollTop: $("#content-episodes").offset().top - 30
            }, 1e3)
        }),
        $(".goto-comments").click(function() {
            $("html, body").animate({
                scrollTop: $("#film_comments").offset().top - 30
            }, 1e3)
        }),
        $(".btn-filter").click(function() {
            var p = [],
                s = [],
                e = ($(".genre-ids:checked").each(function() {
                        p.push($(this).val())
                    }),
                    $(".country-ids:checked").each(function() {
                        s.push($(this).val())
                    }),
                    p = 0 < p.length ? p.join("-") : "all",
                    s = 0 < s.length ? s.join("-") : "all",
                    $("input[name=release_year]:checked").val() || $("select[name=release_year]").val()),
                x = $("input[name=quality]:checked").val() || $("select[name=quality]").val(),
                l = $("input[name=type]:checked").val() || $("select[name=type]").val();
            window.location.href = "/filter?type=" + l + "&quality=" + x + "&release_year=" + e + "&genre=" + p + "&country=" + s
        }),
        0 < $("#site-notice").length && void 0 === Cookies.get("_s_notice") && $.get("/ajax/notice", function(p) {
            p.status && ($("#site-notice").html(p.html),
                "every_12h" === p.frequency && Cookies.set("_s_notice", 1, {
                    expires: new Date((new Date).getTime() + 432e5)
                }),
                "every_24h" === p.frequency) && Cookies.set("_s_notice", 1, {
                expires: new Date((new Date).getTime() + 864e5)
            })
        }),
        $.get("/ajax/banners?page=" + currPage, function(p) {
            p.status && Object.entries(p.banners).forEach(function(p) {
                0 < $("#hgiks-" + p[0]).length && "" !== p[1] && "null" !== p[1] && null !== p[1] && (postscribe("#hgiks-" + p[0], p[1]),
                    $("#hgiks-" + p[0]).show())
            })
        }),
        $.get("/ajax/banner/vpn", function(p) {
            p.status && ($("#vpn-top").html(p.html),
                $("#vpn-top").show())
        }),
        $("#modaltrailer").on("shown.bs.modal", function() {
            $("#iframe-trailer").attr("src", $("#iframe-trailer").attr("data-src"))
        }),
        $("#modaltrailer").on("hide.bs.modal", function() {
            $("#iframe-trailer").attr("src", "")
        })
});
