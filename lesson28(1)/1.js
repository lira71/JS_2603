! function (e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var r = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = e, n.c = t, n.d = function (e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) n.d(o, r, function (t) {
                return e[t]
            }.bind(null, r));
        return o
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function (e, t, n) {
    "use strict";
    n.r(t);
    var o = function (e) {
        let t = document.querySelector("#timer-hours"),
            n = document.querySelector("#timer-minutes"),
            o = document.querySelector("#timer-seconds");

        function r(e) {
            return e > 0 && e < 10 || 0 === e ? "0" + e : e
        }
        let c = setInterval(() => {
            let l = function () {
                let t = (new Date(e).getTime() - (new Date).getTime()) / 1e3,
                    n = Math.floor(t % 60),
                    o = Math.floor(t / 60 % 60);
                return {
                    timeRemaining: t,
                    hours: Math.floor(t / 60 / 60),
                    minutes: o,
                    seconds: n
                }
            }();
            t.textContent = r(l.hours), n.textContent = r(l.minutes), o.textContent = r(l.seconds), l.timeRemaining < 0 && (clearInterval(c), t.textContent = "00", n.textContent = "00", o.textContent = "00")
        }, 1e3)
    };
    var r = () => {
        const e = document.querySelector("menu");
        document.body.addEventListener("click", t => {
            let n = t.target;
            n && n.closest(".menu") ? e.classList.add("active-menu") : !n || "A" !== n.tagName && n.classList.contains("active-menu") || e.classList.remove("active-menu")
        })
    };
    var c = function () {
        let e = document.querySelector(".popup"),
            t = document.querySelectorAll(".popup-btn"),
            n = document.querySelector(".popup-close");
        t.forEach((function (t) {
            t.addEventListener("click", (function () {
                let t, n = 0;
                popupOpacity = requestAnimationFrame((function o() {
                    t = requestAnimationFrame(o), n++, screen.width < 768 ? (cancelAnimationFrame(popupOpacity), e.style.display = "block") : n < 11 && (e.style.display = "block", e.style.opacity = 10 * n + "%")
                }))
            }))
        })), e.addEventListener("click", (function (t) {
            let n = t.target;
            n = n.closest(".popup-content"), e.style.display = n ? "block" : "none"
        })), n.addEventListener("click", (function () {
            let t, n = 10;
            t = requestAnimationFrame((function o() {
                t = requestAnimationFrame(o), n--, screen.width < 768 ? (cancelAnimationFrame(t), e.style.display = "none") : n > 0 && (e.style.opacity = 10 * n + "%", 1 === n && (e.style.display = "none"))
            }))
        }))
    };
    var l = () => {
        const e = document.querySelector(".service-header"),
            t = e.querySelectorAll(".service-header-tab"),
            n = document.querySelectorAll(".service-tab");
        e.addEventListener("click", e => {
            let o = e.target;
            o = o.closest(".service-header-tab"), o && t.forEach((e, r) => {
                e === o && (e => {
                    for (let o = 0; o < n.length; o++) e === o ? (t[o].classList.add("active"), n[o].classList.remove("d-none")) : (t[o].classList.remove("active"), n[o].classList.add("d-none"))
                })(r)
            })
        })
    };
    var a = () => {
        const e = document.querySelectorAll(".portfolio-item"),
            t = (document.querySelectorAll(".portfolio-btn"), document.querySelector(".portfolio-dots")),
            n = document.querySelector(".portfolio-content");
        for (let n = 0; n < e.length; n++) t.insertAdjacentHTML("beforeend", `<li class="dot ${0===n?"dot-active":""}"></li>`);
        const o = document.querySelectorAll(".dot");
        let r, c = 0;
        const l = (e, t, n) => {
                e[t].classList.remove(n)
            },
            a = (e, t, n) => {
                e[t].classList.add(n)
            },
            s = () => {
                l(e, c, "portfolio-item-active"), l(o, c, "dot-active"), c++, c >= e.length && (c = 0), a(e, c, "portfolio-item-active"), a(o, c, "dot-active")
            },
            i = (e = 3e3) => {
                r = setInterval(s, e)
            };
        n.addEventListener("click", t => {
            t.preventDefault();
            let n = t.target;
            n.matches(".portfolio-btn, .dot") && (l(e, c, "portfolio-item-active"), l(o, c, "dot-active"), n.matches("#arrow-right") ? c++ : n.matches("#arrow-left") ? c-- : n.matches(".dot") && o.forEach((e, t) => {
                e === n && (c = t)
            }), c >= e.length && (c = 0), c < 0 && (c = e.length - 1), a(e, c, "portfolio-item-active"), a(o, c, "dot-active"))
        }), n.addEventListener("mouseover", e => {
            (e.target.matches(".portfolio-btn") || e.target.matches(".dot")) && clearInterval(r)
        }), n.addEventListener("mouseout", e => {
            (e.target.matches(".portfolio-btn") || e.target.matches(".dot")) && i()
        }), i(4e3)
    };
    var s = () => {
        let e;
        document.querySelectorAll("#command .row img").forEach(t => {
            t.addEventListener("mouseenter", t => {
                e = t.target.src;
                let n = t.target;
                n.src = n.getAttribute("data-img")
            }), t.addEventListener("mouseout", t => {
                t.target.src = e
            })
        })
    };
    var i = () => {
        document.querySelectorAll('[type="number"]').forEach(e => {
            e.addEventListener("input", (function () {
                e.value = e.value.replace(/\D/, "")
            }))
        })
    };
    var u = (e = 100) => {
        const t = document.querySelector(".calc-block"),
            n = document.querySelector(".calc-type"),
            o = document.querySelector(".calc-square"),
            r = document.querySelector(".calc-count"),
            c = document.querySelector(".calc-day"),
            l = document.querySelector("#total");
        let a;
        const s = () => {
            let t = 0,
                s = 1,
                i = 1;
            const u = n.options[n.selectedIndex].value,
                d = +o.value;
            r.value > 1 && (s += (r.value - 1) / 10), c.value && c.value < 5 ? i *= 2 : c.value && c.value < 10 && (i *= 1.5), u && d && (t = e * u * d * s * i), (e => {
                let t = 0;
                clearInterval(a), 0 === n.options[n.selectedIndex] && (clearInterval(a), t = 0), a = setInterval(() => {
                    t += 100 + e.toString().length, l.textContent = t, t >= e && (l.textContent = e, clearInterval(a))
                }, 5)
            })(t), l.textContent = t
        };
        t.addEventListener("change", e => {
            const t = e.target;
            (t.matches("select") || t.matches("input")) && s()
        })
    };
    var d = () => {
        document.querySelectorAll("input");
        const e = document.querySelectorAll("form"),
            t = document.createElement("div");
        t.classList.add("status-message"), t.style.cssText = "font: normal 2rem Roboto; color: white;", e.forEach(e => {
            e.addEventListener("submit", o => {
                o.preventDefault(), e.appendChild(t);
                t.innerHTML = '\n            <div class="preloader">\n              <img src="images/745 (1).svg"></img>\n            </div>\n          ';
                const r = new FormData(e),
                    c = {};
                r.forEach((e, t) => c[t] = e);
                n(c).then(e => {
                    if (200 !== e.status) throw new Error("status newtwork not 200");
                    console.log(e), t.textContent = "Message successfully sent!"
                }).catch(e => {
                    t.textContent = "Something went wrong...", console.error(e)
                })
            }), e.addEventListener("input", n => {
                const o = n.target,
                    r = document.querySelector(".btn"),
                    c = () => {
                        t.remove(), r.disabled = !1, o.style.cssText = "border: auto;", t.style.cssText = "color: #FFFFFF;"
                    };
                "user_name" === o.name && (o.value = o.value.replace(/[^A-z-]/gi, "")), "user_email" === o.name && (o.value = o.value.replace(/^\w+@\w+\.\w{4,}$/gi, "")), "user_phone" === o.name && (o.value.length <= 8 && (r.disabled = !0, o.style.cssText = "border: 1px solid red", e.appendChild(t), t.textContent = "You have entered an insufficient number of digits, must be from 8 up to 12 numbers", t.style.cssText = "color: #E25741;"), o.value.length > 8 && c(), /^\+?(\d){0,18}$/g.test(o.value) || (o.value = o.value.substring(0, o.value.length - 1)), "" === o.value && c()), "user_message" === o.name && (o.value = o.value.replace(/[^A-z-!?\s]/gi, ""))
            })
        });
        const n = e => fetch("./server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(e)
        })
    };
    (() => {
        const e = document.querySelectorAll('a[href*="#"]');
        for (let t of e) t.addEventListener("click", (function (e) {
            e.preventDefault();
            const n = t.getAttribute("href").substr(1);
            document.getElementById(n).scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }))
    })(), o("19 may 2020"), r(), c(), l(), a(), s(), i(), u(100), d()
}]);