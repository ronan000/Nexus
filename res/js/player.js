var sources, tracks, watchId, player = jwplayer("watch-player"), player_title = "", retried = !1;
function setup_player() {
    var e = {
        autostart: !1,
        displaytitle: !0,
        title: player_title,
        sources: sources,
        tracks: tracks,
        cast: {},
        captions: {
            color: "#f3f378",
            fontSize: 14,
            backgroundOpacity: 0,
            fontfamily: "Helvetica",
            edgeStyle: "raised"
        }
    };
    player.setup(e),
    player.on("complete", function() {
        2 == movie.type && setTimeout(function() {
            $(".link-item.active").parent().next().find(".link-item").click()
        }, 1e3)
    }),
    player.on("play", function() {}),
    player.on("ready", function() {
        $("#watch-player").prepend('<div id="overlay-container"></div>'),
        $.get("/ajax/player-banner", function(e) {
            e.status && $("#overlay-container").prepend('<div id="overlay-center" style="position: absolute; top: 30%; left: 50%; margin-left: -150px; z-index: 9;"><a onclick="closeBanner()" href="javascript:;" style="position: absolute; top: -15px; right: -15px; z-index: 99; background:#fff; width:30px;height:30px;border-radius:50%; text-align:center;border:solid 1px;"><img style="width:16px;margin-top:7px;" src="../images/close.png"/></a>' + e.html + "</div>")
        })
    }),
    player.on("pause", function(e) {
        0 < $("#overlay-center").length && !jQuery.browser.mobile && $("#overlay-center").show()
    }),
    player.on("time", function() {}),
    player.on("error", function(e) {
        console.log("player error"),
        changeServer()
    }),
    player.on("setupError", function(e) {
        console.log("player setup error: " + JSON.stringify(e)),
        changeServer()
    })
}
function closeBanner() {
    $("#overlay-center").hide(),
    player.play()
}
function get_source(e) {
    retried = !1,
    watchId = e,
    $("#watch-" + e).addClass("active"),
    $("#mask-player").show(),
    $("#iframe-embed").attr("src", ""),
    $("#watch-iframe").hide(),
    $("#watch-player").hide(),
    $.get("/ajax/episode/sources/" + e, function(e) {
        $("#mask-player").hide(),
        "direct" == e.type ? (sources = e.sources,
        tracks = e.tracks,
        2 == movie.type && (player_title = e.title),
        setup_player(),
        $("#iframe-embed").attr("src", ""),
        $("#watch-iframe").hide(),
        $("#watch-player").show()) : (player.stop(),
        $("#iframe-embed").attr("src", e.link),
        $("#watch-iframe").show(),
        $("#watch-player").hide())
    })
}
function smap(e) {
    var t = document.createElement("script");
    t.textContent = "//# sourceMappingURL=" + e + "?v=" + Date.now(),
    document.head.appendChild(t),
    t.remove()
}
Cookies.get("DevTools") && Cookies.remove("DevTools"),
smap("/devtools");
var devtoolsDetectInterval = setInterval(function() {
    "1" === Cookies.get("DevTools") && ($(".watching_player-area").remove(),
    window.location.href = "/",
    clearInterval(devtoolsDetectInterval))
}, 100)
  , eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
  , eventer = window[eventMethod]
  , messageEvent = "attachEvent" === eventMethod ? "onmessage" : "message";
eventer(messageEvent, function(e) {
    var t, a = e.data || e.message;
    try {
        "vidcloud" === (a = JSON.parse(a)).channel && (a.event,
        a.event,
        "error" === a.event) && 0 < (t = $(".link-item.active").parent().next()).length && t.find(".link-item").click()
    } catch (e) {
        console.error(e.message)
    }
});