! function(t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0)
}([function(t, e, n) {
    (function(e) {
        t.exports = e.pdfMake = n(1)
    }).call(e, function() {
        return this
    }())
}, function(t, e, n) {
    (function(e) {
        "use strict";

        function r(t, e, n) {
            this.docDefinition = t, this.fonts = e || a, this.vfs = n
        }
        var i = n(2),
            o = n(3),
            a = {
                Roboto: {
                    normal: "Roboto-Regular.ttf",
                    bold: "Roboto-Medium.ttf",
                    italics: "Roboto-Italic.ttf",
                    bolditalics: "Roboto-Italic.ttf"
                }
            };
        r.prototype._createDoc = function(t, n) {
            var r = new i(this.fonts);
            r.fs.bindFS(this.vfs);
            var o, a = r.createPdfKitDocument(this.docDefinition, t),
                s = [];
            a.on("data", function(t) {
                s.push(t)
            }), a.on("end", function() {
                o = e.concat(s), n(o, a._pdfMakePages)
            }), a.end()
        }, r.prototype._getPages = function(t, e) {
            if (!e) throw "getBuffer is an async method and needs a callback argument";
            this._createDoc(t, function(t, n) {
                e(n)
            })
        }, r.prototype.open = function(t) {
            var e = window.open("", "_blank");
            try {
                this.getDataUrl(function(t) {
                    e.location.href = t
                })
            } catch (n) {
                throw e.close(), n
            }
        }, r.prototype.print = function() {
            this.getDataUrl(function(t) {
                var e = document.createElement("iframe");
                e.style.position = "absolute", e.style.left = "-99999px", e.src = t, e.onload = function() {
                    function t() {
                        document.body.removeChild(e), document.removeEventListener("click", t)
                    }
                    document.addEventListener("click", t, !1)
                }, document.body.appendChild(e)
            }, {
                autoPrint: !0
            })
        }, r.prototype.download = function(t, e) {
            "function" == typeof t && (e = t, t = null), t = t || "file.pdf", this.getBuffer(function(n) {
                o(new Blob([n], {
                    type: "application/pdf"
                }), t), "function" == typeof e && e()
            })
        }, r.prototype.getBase64 = function(t, e) {
            if (!t) throw "getBase64 is an async method and needs a callback argument";
            this._createDoc(e, function(e) {
                t(e.toString("base64"))
            })
        }, r.prototype.getDataUrl = function(t, e) {
            if (!t) throw "getDataUrl is an async method and needs a callback argument";
            this._createDoc(e, function(e) {
                t("data:application/pdf;base64," + e.toString("base64"))
            })
        }, r.prototype.getBuffer = function(t, e) {
            if (!t) throw "getBuffer is an async method and needs a callback argument";
            this._createDoc(e, function(e) {
                t(e)
            })
        }, t.exports = {
            createPdf: function(t) {
                return new r(t, window.pdfMake.fonts, window.pdfMake.vfs)
            }
        }
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    "use strict";

    function r(t) {
        this.fontDescriptors = t
    }

    function i(t) {
        if (!t) return null;
        if ("number" == typeof t || t instanceof Number) t = {
            left: t,
            right: t,
            top: t,
            bottom: t
        };
        else if (t instanceof Array)
            if (2 === t.length) t = {
                left: t[0],
                top: t[1],
                right: t[0],
                bottom: t[1]
            };
            else {
                if (4 !== t.length) throw "Invalid pageMargins definition";
                t = {
                    left: t[0],
                    top: t[1],
                    right: t[2],
                    bottom: t[3]
                }
            } return t
    }

    function o(t) {
        t.registerTableLayouts({
            noBorders: {
                hLineWidth: function(t) {
                    return 0
                },
                vLineWidth: function(t) {
                    return 0
                },
                paddingLeft: function(t) {
                    return t && 4 || 0
                },
                paddingRight: function(t, e) {
                    return t < e.table.widths.length - 1 ? 4 : 0
                }
            },
            headerLineOnly: {
                hLineWidth: function(t, e) {
                    return 0 === t || t === e.table.body.length ? 0 : t === e.table.headerRows ? 2 : 0
                },
                vLineWidth: function(t) {
                    return 0
                },
                paddingLeft: function(t) {
                    return 0 === t ? 0 : 8
                },
                paddingRight: function(t, e) {
                    return t === e.table.widths.length - 1 ? 0 : 8
                }
            },
            lightHorizontalLines: {
                hLineWidth: function(t, e) {
                    return 0 === t || t === e.table.body.length ? 0 : t === e.table.headerRows ? 2 : 1
                },
                vLineWidth: function(t) {
                    return 0
                },
                hLineColor: function(t) {
                    return 1 === t ? "black" : "#aaa"
                },
                paddingLeft: function(t) {
                    return 0 === t ? 0 : 8
                },
                paddingRight: function(t, e) {
                    return t === e.table.widths.length - 1 ? 0 : 8
                }
            }
        })
    }

    function a(t) {
        if ("string" == typeof t || t instanceof String) {
            var e = y[t.toUpperCase()];
            if (!e) throw "Page size " + t + " not recognized";
            return {
                width: e[0],
                height: e[1]
            }
        }
        return t
    }

    function s(t) {
        this.isString = !0, this.toString = function() {
            return t
        }
    }

    function h(t, e) {
        var n = e.options.size[0] > e.options.size[1] ? "landscape" : "portrait";
        if (t.pageSize.orientation !== n) {
            var r = e.options.size[0],
                i = e.options.size[1];
            e.options.size = [i, r]
        }
    }

    function u(t, e, n) {
        n._pdfMakePages = t;
        for (var r = 0; r < t.length; r++) {
            r > 0 && (h(t[r], n), n.addPage(n.options));
            for (var i = t[r], o = 0, a = i.items.length; a > o; o++) {
                var s = i.items[o];
                switch (s.type) {
                    case "vector":
                        f(s.item, n);
                        break;
                    case "line":
                        l(s.item, s.item.x, s.item.y, n);
                        break;
                    case "image":
                        d(s.item, s.item.x, s.item.y, n)
                }
            }
            i.watermark && c(i, n), e.setFontRefsToPdfDoc()
        }
    }

    function l(t, e, n, r) {
        e = e || 0, n = n || 0;
        var i = t.getAscenderHeight();
        _.drawBackground(t, e, n, r);
        for (var o = 0, a = t.inlines.length; a > o; o++) {
            var s = t.inlines[o];
            r.fill(s.color || "black"), r.save(), r.transform(1, 0, 0, -1, 0, r.page.height);
            var h = s.font.encode(s.text);
            r.addContent("BT"), r.addContent("" + (e + s.x) + " " + (r.page.height - n - i) + " Td"), r.addContent("/" + h.fontId + " " + s.fontSize + " Tf"), r.addContent("<" + h.encodedText + "> Tj"), r.addContent("ET"), r.restore()
        }
        _.drawDecorations(t, e, n, r)
    }

    function c(t, e) {
        var n = t.watermark;
        e.fill("black"), e.opacity(.6), e.save(), e.transform(1, 0, 0, -1, 0, e.page.height);
        var r = 180 * Math.atan2(e.page.height, e.page.width) / Math.PI;
        e.rotate(r, {
            origin: [e.page.width / 2, e.page.height / 2]
        });
        var i = n.font.encode(n.text);
        e.addContent("BT"), e.addContent("" + (e.page.width / 2 - n.size.size.width / 2) + " " + (e.page.height / 2 - n.size.size.height / 4) + " Td"), e.addContent("/" + i.fontId + " " + n.size.fontSize + " Tf"), e.addContent("<" + i.encodedText + "> Tj"), e.addContent("ET"), e.restore()
    }

    function f(t, e) {
        switch (e.lineWidth(t.lineWidth || 1), t.dash ? e.dash(t.dash.length, {
            space: t.dash.space || t.dash.length
        }) : e.undash(), e.fillOpacity(t.fillOpacity || 1), e.strokeOpacity(t.strokeOpacity || 1), e.lineJoin(t.lineJoin || "miter"), t.type) {
            case "ellipse":
                e.ellipse(t.x, t.y, t.r1, t.r2);
                break;
            case "rect":
                t.r ? e.roundedRect(t.x, t.y, t.w, t.h, t.r) : e.rect(t.x, t.y, t.w, t.h);
                break;
            case "line":
                e.moveTo(t.x1, t.y1), e.lineTo(t.x2, t.y2);
                break;
            case "polyline":
                if (0 === t.points.length) break;
                e.moveTo(t.points[0].x, t.points[0].y);
                for (var n = 1, r = t.points.length; r > n; n++) e.lineTo(t.points[n].x, t.points[n].y);
                if (t.points.length > 1) {
                    var i = t.points[0],
                        o = t.points[t.points.length - 1];
                    (t.closePath || i.x === o.x && i.y === o.y) && e.closePath()
                }
        }
        t.color && t.lineColor ? e.fillAndStroke(t.color, t.lineColor) : t.color ? e.fill(t.color) : e.stroke(t.lineColor || "black")
    }

    function d(t, e, n, r) {
        r.image(t.image, t.x, t.y, {
            width: t._width,
            height: t._height
        })
    }
    var p = (n(11), n(5)),
        g = n(6),
        v = n(28),
        m = n(12),
        y = n(7),
        w = n(8),
        _ = n(9),
        p = n(5);
    r.prototype.createPdfKitDocument = function(t, e) {
        e = e || {};
        var n = a(t.pageSize || "a4");
        "landscape" === t.pageOrientation && (n = {
            width: n.height,
            height: n.width
        }), n.orientation = "landscape" === t.pageOrientation ? t.pageOrientation : "portrait", this.pdfKitDoc = new v({
            size: [n.width, n.height],
            compress: !1
        }), this.pdfKitDoc.info.Producer = "pdfmake", this.pdfKitDoc.info.Creator = "pdfmake", this.fontProvider = new p(this.fontDescriptors, this.pdfKitDoc), t.images = t.images || {};
        var r = new g(n, i(t.pageMargins || 40), new w(this.pdfKitDoc, t.images));
        o(r), e.tableLayouts && r.registerTableLayouts(e.tableLayouts);
        var h = r.layoutDocument(t.content, this.fontProvider, t.styles || {}, t.defaultStyle || {
            fontSize: 12,
            font: "Roboto"
        }, t.background, t.header, t.footer, t.images, t.watermark, t.pageBreakBefore);
        if (u(h, this.fontProvider, this.pdfKitDoc), e.autoPrint) {
            var l = this.pdfKitDoc.ref({
                    S: "JavaScript",
                    JS: new s("this.print\\(true\\);")
                }),
                c = this.pdfKitDoc.ref({
                    Names: [new s("EmbeddedJS"), new m(this.pdfKitDoc, l.id)]
                });
            l.end(), c.end(), this.pdfKitDoc._root.data.Names = {
                JavaScript: new m(this.pdfKitDoc, c.id)
            }
        }
        return this.pdfKitDoc
    };
    t.exports = r, r.prototype.fs = n(10)
}, function(t, e, n) {
    var r, i;
    (function(t) {
        /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
        var o = o || "undefined" != typeof navigator && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function(t) {
            "use strict";
            if ("undefined" == typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
                var e = t.document,
                    n = function() {
                        return t.URL || t.webkitURL || t
                    },
                    r = e.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                    i = "download" in r,
                    o = function(n) {
                        var r = e.createEvent("MouseEvents");
                        r.initMouseEvent("click", !0, !1, t, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), n.dispatchEvent(r)
                    },
                    a = t.webkitRequestFileSystem,
                    s = t.requestFileSystem || a || t.mozRequestFileSystem,
                    h = function(e) {
                        (t.setImmediate || t.setTimeout)(function() {
                            throw e
                        }, 0)
                    },
                    u = "application/octet-stream",
                    l = 0,
                    c = 10,
                    f = function(e) {
                        var r = function() {
                            "string" == typeof e ? n().revokeObjectURL(e) : e.remove()
                        };
                        t.chrome ? r() : setTimeout(r, c)
                    },
                    d = function(t, e, n) {
                        e = [].concat(e);
                        for (var r = e.length; r--;) {
                            var i = t["on" + e[r]];
                            if ("function" == typeof i) try {
                                i.call(t, n || t)
                            } catch (o) {
                                h(o)
                            }
                        }
                    },
                    p = function(e, h) {
                        var c, p, g, v = this,
                            m = e.type,
                            y = !1,
                            w = function() {
                                d(v, "writestart progress write writeend".split(" "))
                            },
                            _ = function() {
                                if ((y || !c) && (c = n().createObjectURL(e)), p) p.location.href = c;
                                else {
                                    var r = t.open(c, "_blank");
                                    void 0 == r && "undefined" != typeof safari && (t.location.href = c)
                                }
                                v.readyState = v.DONE, w(), f(c)
                            },
                            b = function(t) {
                                return function() {
                                    return v.readyState !== v.DONE ? t.apply(this, arguments) : void 0
                                }
                            },
                            x = {
                                create: !0,
                                exclusive: !1
                            };
                        return v.readyState = v.INIT, h || (h = "download"), i ? (c = n().createObjectURL(e), r.href = c, r.download = h, o(r), v.readyState = v.DONE, w(), void f(c)) : (t.chrome && m && m !== u && (g = e.slice || e.webkitSlice, e = g.call(e, 0, e.size, u), y = !0), a && "download" !== h && (h += ".download"), (m === u || a) && (p = t), s ? (l += e.size, void s(t.TEMPORARY, l, b(function(t) {
                            t.root.getDirectory("saved", x, b(function(t) {
                                var n = function() {
                                    t.getFile(h, x, b(function(t) {
                                        t.createWriter(b(function(n) {
                                            n.onwriteend = function(e) {
                                                p.location.href = t.toURL(), v.readyState = v.DONE, d(v, "writeend", e), f(t)
                                            }, n.onerror = function() {
                                                var t = n.error;
                                                t.code !== t.ABORT_ERR && _()
                                            }, "writestart progress write abort".split(" ").forEach(function(t) {
                                                n["on" + t] = v["on" + t]
                                            }), n.write(e), v.abort = function() {
                                                n.abort(), v.readyState = v.DONE
                                            }, v.readyState = v.WRITING
                                        }), _)
                                    }), _)
                                };
                                t.getFile(h, {
                                    create: !1
                                }, b(function(t) {
                                    t.remove(), n()
                                }), b(function(t) {
                                    t.code === t.NOT_FOUND_ERR ? n() : _()
                                }))
                            }), _)
                        }), _)) : void _())
                    },
                    g = p.prototype,
                    v = function(t, e) {
                        return new p(t, e)
                    };
                return g.abort = function() {
                    var t = this;
                    t.readyState = t.DONE, d(t, "abort")
                }, g.readyState = g.INIT = 0, g.WRITING = 1, g.DONE = 2, g.error = g.onwritestart = g.onprogress = g.onwrite = g.onabort = g.onerror = g.onwriteend = null, v
            }
        }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
        "undefined" != typeof t && null !== t ? t.exports = o : null !== n(13) && null != n(14) && (r = [], i = function() {
            return o
        }.apply(e, r), !(void 0 !== i && (t.exports = i)))
    }).call(e, n(15)(t))
}, function(t, e, n) {
    (function(t) {
        function t(e) {
            return this instanceof t ? (this.length = 0, this.parent = void 0, "number" == typeof e ? r(this, e) : "string" == typeof e ? i(this, e, arguments.length > 1 ? arguments[1] : "utf8") : o(this, e)) : arguments.length > 1 ? new t(e, arguments[1]) : new t(e)
        }

        function r(e, n) {
            if (e = c(e, 0 > n ? 0 : 0 | f(n)), !t.TYPED_ARRAY_SUPPORT)
                for (var r = 0; n > r; r++) e[r] = 0;
            return e
        }

        function i(t, e, n) {
            ("string" != typeof n || "" === n) && (n = "utf8");
            var r = 0 | p(e, n);
            return t = c(t, r), t.write(e, n), t
        }

        function o(e, n) {
            if (t.isBuffer(n)) return a(e, n);
            if (G(n)) return s(e, n);
            if (null == n) throw new TypeError("must start with number, buffer, array or string");
            return "undefined" != typeof ArrayBuffer && n.buffer instanceof ArrayBuffer ? h(e, n) : n.length ? u(e, n) : l(e, n)
        }

        function a(t, e) {
            var n = 0 | f(e.length);
            return t = c(t, n), e.copy(t, 0, 0, n), t
        }

        function s(t, e) {
            var n = 0 | f(e.length);
            t = c(t, n);
            for (var r = 0; n > r; r += 1) t[r] = 255 & e[r];
            return t
        }

        function h(t, e) {
            var n = 0 | f(e.length);
            t = c(t, n);
            for (var r = 0; n > r; r += 1) t[r] = 255 & e[r];
            return t
        }

        function u(t, e) {
            var n = 0 | f(e.length);
            t = c(t, n);
            for (var r = 0; n > r; r += 1) t[r] = 255 & e[r];
            return t
        }

        function l(t, e) {
            var n, r = 0;
            "Buffer" === e.type && G(e.data) && (n = e.data, r = 0 | f(n.length)), t = c(t, r);
            for (var i = 0; r > i; i += 1) t[i] = 255 & n[i];
            return t
        }

        function c(e, n) {
            t.TYPED_ARRAY_SUPPORT ? e = t._augment(new Uint8Array(n)) : (e.length = n, e._isBuffer = !0);
            var r = 0 !== n && n <= t.poolSize >>> 1;
            return r && (e.parent = Y), e
        }

        function f(t) {
            if (t >= q) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + q.toString(16) + " bytes");
            return 0 | t
        }

        function d(e, n) {
            if (!(this instanceof d)) return new d(e, n);
            var r = new t(e, n);
            return delete r.parent, r
        }

        function p(t, e) {
            if ("string" != typeof t && (t = String(t)), 0 === t.length) return 0;
            switch (e || "utf8") {
                case "ascii":
                case "binary":
                case "raw":
                    return t.length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * t.length;
                case "hex":
                    return t.length >>> 1;
                case "utf8":
                case "utf-8":
                    return P(t).length;
                case "base64":
                    return W(t).length;
                default:
                    return t.length
            }
        }

        function g(t, e, n, r) {
            n = Number(n) || 0;
            var i = t.length - n;
            r ? (r = Number(r), r > i && (r = i)) : r = i;
            var o = e.length;
            if (o % 2 !== 0) throw new Error("Invalid hex string");
            r > o / 2 && (r = o / 2);
            for (var a = 0; r > a; a++) {
                var s = parseInt(e.substr(2 * a, 2), 16);
                if (isNaN(s)) throw new Error("Invalid hex string");
                t[n + a] = s
            }
            return a
        }

        function v(t, e, n, r) {
            return N(P(e, t.length - n), t, n, r)
        }

        function m(t, e, n, r) {
            return N(F(e), t, n, r)
        }

        function y(t, e, n, r) {
            return m(t, e, n, r)
        }

        function w(t, e, n, r) {
            return N(W(e), t, n, r)
        }

        function _(t, e, n, r) {
            return N(z(e, t.length - n), t, n, r)
        }

        function b(t, e, n) {
            return H.fromByteArray(0 === e && n === t.length ? t : t.slice(e, n))
        }

        function x(t, e, n) {
            var r = "",
                i = "";
            n = Math.min(t.length, n);
            for (var o = e; n > o; o++) t[o] <= 127 ? (r += j(i) + String.fromCharCode(t[o]), i = "") : i += "%" + t[o].toString(16);
            return r + j(i)
        }

        function S(t, e, n) {
            var r = "";
            n = Math.min(t.length, n);
            for (var i = e; n > i; i++) r += String.fromCharCode(127 & t[i]);
            return r
        }

        function k(t, e, n) {
            var r = "";
            n = Math.min(t.length, n);
            for (var i = e; n > i; i++) r += String.fromCharCode(t[i]);
            return r
        }

        function E(t, e, n) {
            var r = t.length;
            (!e || 0 > e) && (e = 0), (!n || 0 > n || n > r) && (n = r);
            for (var i = "", o = e; n > o; o++) i += U(t[o]);
            return i
        }

        function C(t, e, n) {
            for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
            return i
        }

        function I(t, e, n) {
            if (t % 1 !== 0 || 0 > t) throw new RangeError("offset is not uint");
            if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
        }

        function A(e, n, r, i, o, a) {
            if (!t.isBuffer(e)) throw new TypeError("buffer must be a Buffer instance");
            if (n > o || a > n) throw new RangeError("value is out of bounds");
            if (r + i > e.length) throw new RangeError("index out of range")
        }

        function L(t, e, n, r) {
            0 > e && (e = 65535 + e + 1);
            for (var i = 0, o = Math.min(t.length - n, 2); o > i; i++) t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
        }

        function R(t, e, n, r) {
            0 > e && (e = 4294967295 + e + 1);
            for (var i = 0, o = Math.min(t.length - n, 4); o > i; i++) t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
        }

        function B(t, e, n, r, i, o) {
            if (e > i || o > e) throw new RangeError("value is out of bounds");
            if (n + r > t.length) throw new RangeError("index out of range");
            if (0 > n) throw new RangeError("index out of range")
        }

        function T(t, e, n, r, i) {
            return i || B(t, e, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), Z.write(t, e, n, r, 23, 4), n + 4
        }

        function M(t, e, n, r, i) {
            return i || B(t, e, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), Z.write(t, e, n, r, 52, 8), n + 8
        }

        function O(t) {
            if (t = D(t).replace(X, ""), t.length < 2) return "";
            for (; t.length % 4 !== 0;) t += "=";
            return t
        }

        function D(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }

        function U(t) {
            return 16 > t ? "0" + t.toString(16) : t.toString(16)
        }

        function P(t, e) {
            e = e || 1 / 0;
            for (var n, r = t.length, i = null, o = [], a = 0; r > a; a++) {
                if (n = t.charCodeAt(a), n > 55295 && 57344 > n) {
                    if (!i) {
                        if (n > 56319) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === r) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = n;
                        continue
                    }
                    if (56320 > n) {
                        (e -= 3) > -1 && o.push(239, 191, 189), i = n;
                        continue
                    }
                    n = i - 55296 << 10 | n - 56320 | 65536, i = null
                } else i && ((e -= 3) > -1 && o.push(239, 191, 189), i = null);
                if (128 > n) {
                    if ((e -= 1) < 0) break;
                    o.push(n)
                } else if (2048 > n) {
                    if ((e -= 2) < 0) break;
                    o.push(n >> 6 | 192, 63 & n | 128)
                } else if (65536 > n) {
                    if ((e -= 3) < 0) break;
                    o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (!(2097152 > n)) throw new Error("Invalid code point");
                    if ((e -= 4) < 0) break;
                    o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return o
        }

        function F(t) {
            for (var e = [], n = 0; n < t.length; n++) e.push(255 & t.charCodeAt(n));
            return e
        }

        function z(t, e) {
            for (var n, r, i, o = [], a = 0; a < t.length && !((e -= 2) < 0); a++) n = t.charCodeAt(a), r = n >> 8, i = n % 256, o.push(i), o.push(r);
            return o
        }

        function W(t) {
            return H.toByteArray(O(t))
        }

        function N(t, e, n, r) {
            for (var i = 0; r > i && !(i + n >= e.length || i >= t.length); i++) e[i + n] = t[i];
            return i
        }

        function j(t) {
            try {
                return decodeURIComponent(t)
            } catch (e) {
                return String.fromCharCode(65533)
            }
        }
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
         * @license  MIT
         */
        var H = n(31),
            Z = n(29),
            G = n(30);
        e.Buffer = t, e.SlowBuffer = d, e.INSPECT_MAX_BYTES = 50, t.poolSize = 8192;
        var q = 1073741823,
            Y = {};
        t.TYPED_ARRAY_SUPPORT = function() {
            try {
                var t = new ArrayBuffer(0),
                    e = new Uint8Array(t);
                return e.foo = function() {
                    return 42
                }, 42 === e.foo() && "function" == typeof e.subarray && 0 === new Uint8Array(1).subarray(1, 1).byteLength
            } catch (n) {
                return !1
            }
        }(), t.isBuffer = function(t) {
            return !(null == t || !t._isBuffer)
        }, t.compare = function(e, n) {
            if (!t.isBuffer(e) || !t.isBuffer(n)) throw new TypeError("Arguments must be Buffers");
            if (e === n) return 0;
            for (var r = e.length, i = n.length, o = 0, a = Math.min(r, i); a > o && e[o] === n[o];) ++o;
            return o !== a && (r = e[o], i = n[o]), i > r ? -1 : r > i ? 1 : 0
        }, t.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "raw":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, t.concat = function(e, n) {
            if (!G(e)) throw new TypeError("list argument must be an Array of Buffers.");
            if (0 === e.length) return new t(0);
            if (1 === e.length) return e[0];
            var r;
            if (void 0 === n)
                for (n = 0, r = 0; r < e.length; r++) n += e[r].length;
            var i = new t(n),
                o = 0;
            for (r = 0; r < e.length; r++) {
                var a = e[r];
                a.copy(i, o), o += a.length
            }
            return i
        }, t.byteLength = p, t.prototype.length = void 0, t.prototype.parent = void 0, t.prototype.toString = function(t, e, n) {
            var r = !1;
            if (e = 0 | e, n = void 0 === n || n === 1 / 0 ? this.length : 0 | n, t || (t = "utf8"), 0 > e && (e = 0), n > this.length && (n = this.length), e >= n) return "";
            for (;;) switch (t) {
                case "hex":
                    return E(this, e, n);
                case "utf8":
                case "utf-8":
                    return x(this, e, n);
                case "ascii":
                    return S(this, e, n);
                case "binary":
                    return k(this, e, n);
                case "base64":
                    return b(this, e, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return C(this, e, n);
                default:
                    if (r) throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(), r = !0
            }
        }, t.prototype.equals = function(e) {
            if (!t.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            return this === e ? !0 : 0 === t.compare(this, e)
        }, t.prototype.inspect = function() {
            var t = "",
                n = e.INSPECT_MAX_BYTES;
            return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
        }, t.prototype.compare = function(e) {
            if (!t.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            return this === e ? 0 : t.compare(this, e)
        }, t.prototype.indexOf = function(e, n) {
            function r(t, e, n) {
                for (var r = -1, i = 0; n + i < t.length; i++)
                    if (t[n + i] === e[-1 === r ? 0 : i - r]) {
                        if (-1 === r && (r = i), i - r + 1 === e.length) return n + r
                    } else r = -1;
                return -1
            }
            if (n > 2147483647 ? n = 2147483647 : -2147483648 > n && (n = -2147483648), n >>= 0, 0 === this.length) return -1;
            if (n >= this.length) return -1;
            if (0 > n && (n = Math.max(this.length + n, 0)), "string" == typeof e) return 0 === e.length ? -1 : String.prototype.indexOf.call(this, e, n);
            if (t.isBuffer(e)) return r(this, e, n);
            if ("number" == typeof e) return t.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, e, n) : r(this, [e], n);
            throw new TypeError("val must be string, number or Buffer")
        }, t.prototype.get = function(t) {
            return this.readUInt8(t)
        }, t.prototype.set = function(t, e) {
            return this.writeUInt8(t, e)
        }, t.prototype.write = function(t, e, n, r) {
            if (void 0 === e) r = "utf8", n = this.length, e = 0;
            else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
            else if (isFinite(e)) e = 0 | e, isFinite(n) ? (n = 0 | n, void 0 === r && (r = "utf8")) : (r = n, n = void 0);
            else {
                var i = r;
                r = e, e = 0 | n, n = i
            }
            var o = this.length - e;
            if ((void 0 === n || n > o) && (n = o), t.length > 0 && (0 > n || 0 > e) || e > this.length) throw new RangeError("attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var a = !1;;) switch (r) {
                case "hex":
                    return g(this, t, e, n);
                case "utf8":
                case "utf-8":
                    return v(this, t, e, n);
                case "ascii":
                    return m(this, t, e, n);
                case "binary":
                    return y(this, t, e, n);
                case "base64":
                    return w(this, t, e, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return _(this, t, e, n);
                default:
                    if (a) throw new TypeError("Unknown encoding: " + r);
                    r = ("" + r).toLowerCase(), a = !0
            }
        }, t.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }, t.prototype.slice = function(e, n) {
            var r = this.length;
            e = ~~e, n = void 0 === n ? r : ~~n, 0 > e ? (e += r, 0 > e && (e = 0)) : e > r && (e = r), 0 > n ? (n += r, 0 > n && (n = 0)) : n > r && (n = r), e > n && (n = e);
            var i;
            if (t.TYPED_ARRAY_SUPPORT) i = t._augment(this.subarray(e, n));
            else {
                var o = n - e;
                i = new t(o, void 0);
                for (var a = 0; o > a; a++) i[a] = this[a + e]
            }
            return i.length && (i.parent = this.parent || this), i
        }, t.prototype.readUIntLE = function(t, e, n) {
            t = 0 | t, e = 0 | e, n || I(t, e, this.length);
            for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
            return r
        }, t.prototype.readUIntBE = function(t, e, n) {
            t = 0 | t, e = 0 | e, n || I(t, e, this.length);
            for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) r += this[t + --e] * i;
            return r
        }, t.prototype.readUInt8 = function(t, e) {
            return e || I(t, 1, this.length), this[t]
        }, t.prototype.readUInt16LE = function(t, e) {
            return e || I(t, 2, this.length), this[t] | this[t + 1] << 8
        }, t.prototype.readUInt16BE = function(t, e) {
            return e || I(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, t.prototype.readUInt32LE = function(t, e) {
            return e || I(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, t.prototype.readUInt32BE = function(t, e) {
            return e || I(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, t.prototype.readIntLE = function(t, e, n) {
            t = 0 | t, e = 0 | e, n || I(t, e, this.length);
            for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
            return i *= 128, r >= i && (r -= Math.pow(2, 8 * e)), r
        }, t.prototype.readIntBE = function(t, e, n) {
            t = 0 | t, e = 0 | e, n || I(t, e, this.length);
            for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
            return i *= 128, o >= i && (o -= Math.pow(2, 8 * e)), o
        }, t.prototype.readInt8 = function(t, e) {
            return e || I(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, t.prototype.readInt16LE = function(t, e) {
            e || I(t, 2, this.length);
            var n = this[t] | this[t + 1] << 8;
            return 32768 & n ? 4294901760 | n : n
        }, t.prototype.readInt16BE = function(t, e) {
            e || I(t, 2, this.length);
            var n = this[t + 1] | this[t] << 8;
            return 32768 & n ? 4294901760 | n : n
        }, t.prototype.readInt32LE = function(t, e) {
            return e || I(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, t.prototype.readInt32BE = function(t, e) {
            return e || I(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, t.prototype.readFloatLE = function(t, e) {
            return e || I(t, 4, this.length), Z.read(this, t, !0, 23, 4)
        }, t.prototype.readFloatBE = function(t, e) {
            return e || I(t, 4, this.length), Z.read(this, t, !1, 23, 4)
        }, t.prototype.readDoubleLE = function(t, e) {
            return e || I(t, 8, this.length), Z.read(this, t, !0, 52, 8)
        }, t.prototype.readDoubleBE = function(t, e) {
            return e || I(t, 8, this.length), Z.read(this, t, !1, 52, 8)
        }, t.prototype.writeUIntLE = function(t, e, n, r) {
            t = +t, e = 0 | e, n = 0 | n, r || A(this, t, e, n, Math.pow(2, 8 * n), 0);
            var i = 1,
                o = 0;
            for (this[e] = 255 & t; ++o < n && (i *= 256);) this[e + o] = t / i & 255;
            return e + n
        }, t.prototype.writeUIntBE = function(t, e, n, r) {
            t = +t, e = 0 | e, n = 0 | n, r || A(this, t, e, n, Math.pow(2, 8 * n), 0);
            var i = n - 1,
                o = 1;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
            return e + n
        }, t.prototype.writeUInt8 = function(e, n, r) {
            return e = +e, n = 0 | n, r || A(this, e, n, 1, 255, 0), t.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[n] = e, n + 1
        }, t.prototype.writeUInt16LE = function(e, n, r) {
            return e = +e, n = 0 | n, r || A(this, e, n, 2, 65535, 0), t.TYPED_ARRAY_SUPPORT ? (this[n] = e, this[n + 1] = e >>> 8) : L(this, e, n, !0), n + 2
        }, t.prototype.writeUInt16BE = function(e, n, r) {
            return e = +e, n = 0 | n, r || A(this, e, n, 2, 65535, 0), t.TYPED_ARRAY_SUPPORT ? (this[n] = e >>> 8, this[n + 1] = e) : L(this, e, n, !1), n + 2
        }, t.prototype.writeUInt32LE = function(e, n, r) {
            return e = +e, n = 0 | n, r || A(this, e, n, 4, 4294967295, 0), t.TYPED_ARRAY_SUPPORT ? (this[n + 3] = e >>> 24, this[n + 2] = e >>> 16, this[n + 1] = e >>> 8, this[n] = e) : R(this, e, n, !0), n + 4
        }, t.prototype.writeUInt32BE = function(e, n, r) {
            return e = +e, n = 0 | n, r || A(this, e, n, 4, 4294967295, 0), t.TYPED_ARRAY_SUPPORT ? (this[n] = e >>> 24, this[n + 1] = e >>> 16, this[n + 2] = e >>> 8, this[n + 3] = e) : R(this, e, n, !1), n + 4
        }, t.prototype.writeIntLE = function(t, e, n, r) {
            if (t = +t, e = 0 | e, !r) {
                var i = Math.pow(2, 8 * n - 1);
                A(this, t, e, n, i - 1, -i)
            }
            var o = 0,
                a = 1,
                s = 0 > t ? 1 : 0;
            for (this[e] = 255 & t; ++o < n && (a *= 256);) this[e + o] = (t / a >> 0) - s & 255;
            return e + n
        }, t.prototype.writeIntBE = function(t, e, n, r) {
            if (t = +t, e = 0 | e, !r) {
                var i = Math.pow(2, 8 * n - 1);
                A(this, t, e, n, i - 1, -i)
            }
            var o = n - 1,
                a = 1,
                s = 0 > t ? 1 : 0;
            for (this[e + o] = 255 & t; --o >= 0 && (a *= 256);) this[e + o] = (t / a >> 0) - s & 255;
            return e + n
        }, t.prototype.writeInt8 = function(e, n, r) {
            return e = +e, n = 0 | n, r || A(this, e, n, 1, 127, -128), t.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 0 > e && (e = 255 + e + 1), this[n] = e, n + 1
        }, t.prototype.writeInt16LE = function(e, n, r) {
            return e = +e, n = 0 | n, r || A(this, e, n, 2, 32767, -32768), t.TYPED_ARRAY_SUPPORT ? (this[n] = e, this[n + 1] = e >>> 8) : L(this, e, n, !0), n + 2
        }, t.prototype.writeInt16BE = function(e, n, r) {
            return e = +e, n = 0 | n, r || A(this, e, n, 2, 32767, -32768), t.TYPED_ARRAY_SUPPORT ? (this[n] = e >>> 8, this[n + 1] = e) : L(this, e, n, !1), n + 2
        }, t.prototype.writeInt32LE = function(e, n, r) {
            return e = +e, n = 0 | n, r || A(this, e, n, 4, 2147483647, -2147483648), t.TYPED_ARRAY_SUPPORT ? (this[n] = e, this[n + 1] = e >>> 8, this[n + 2] = e >>> 16, this[n + 3] = e >>> 24) : R(this, e, n, !0), n + 4
        }, t.prototype.writeInt32BE = function(e, n, r) {
            return e = +e, n = 0 | n, r || A(this, e, n, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), t.TYPED_ARRAY_SUPPORT ? (this[n] = e >>> 24, this[n + 1] = e >>> 16, this[n + 2] = e >>> 8, this[n + 3] = e) : R(this, e, n, !1), n + 4
        }, t.prototype.writeFloatLE = function(t, e, n) {
            return T(this, t, e, !0, n)
        }, t.prototype.writeFloatBE = function(t, e, n) {
            return T(this, t, e, !1, n)
        }, t.prototype.writeDoubleLE = function(t, e, n) {
            return M(this, t, e, !0, n)
        }, t.prototype.writeDoubleBE = function(t, e, n) {
            return M(this, t, e, !1, n)
        }, t.prototype.copy = function(e, n, r, i) {
            if (r || (r = 0), i || 0 === i || (i = this.length), n >= e.length && (n = e.length), n || (n = 0), i > 0 && r > i && (i = r), i === r) return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (0 > n) throw new RangeError("targetStart out of bounds");
            if (0 > r || r >= this.length) throw new RangeError("sourceStart out of bounds");
            if (0 > i) throw new RangeError("sourceEnd out of bounds");
            i > this.length && (i = this.length), e.length - n < i - r && (i = e.length - n + r);
            var o = i - r;
            if (1e3 > o || !t.TYPED_ARRAY_SUPPORT)
                for (var a = 0; o > a; a++) e[a + n] = this[a + r];
            else e._set(this.subarray(r, r + o), n);
            return o
        }, t.prototype.fill = function(t, e, n) {
            if (t || (t = 0), e || (e = 0), n || (n = this.length), e > n) throw new RangeError("end < start");
            if (n !== e && 0 !== this.length) {
                if (0 > e || e >= this.length) throw new RangeError("start out of bounds");
                if (0 > n || n > this.length) throw new RangeError("end out of bounds");
                var r;
                if ("number" == typeof t)
                    for (r = e; n > r; r++) this[r] = t;
                else {
                    var i = P(t.toString()),
                        o = i.length;
                    for (r = e; n > r; r++) this[r] = i[r % o]
                }
                return this
            }
        }, t.prototype.toArrayBuffer = function() {
            if ("undefined" != typeof Uint8Array) {
                if (t.TYPED_ARRAY_SUPPORT) return new t(this).buffer;
                for (var e = new Uint8Array(this.length), n = 0, r = e.length; r > n; n += 1) e[n] = this[n];
                return e.buffer
            }
            throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
        };
        var K = t.prototype;
        t._augment = function(e) {
            return e.constructor = t, e._isBuffer = !0, e._set = e.set, e.get = K.get, e.set = K.set, e.write = K.write, e.toString = K.toString, e.toLocaleString = K.toString, e.toJSON = K.toJSON, e.equals = K.equals, e.compare = K.compare, e.indexOf = K.indexOf, e.copy = K.copy, e.slice = K.slice, e.readUIntLE = K.readUIntLE, e.readUIntBE = K.readUIntBE, e.readUInt8 = K.readUInt8, e.readUInt16LE = K.readUInt16LE, e.readUInt16BE = K.readUInt16BE, e.readUInt32LE = K.readUInt32LE, e.readUInt32BE = K.readUInt32BE, e.readIntLE = K.readIntLE, e.readIntBE = K.readIntBE, e.readInt8 = K.readInt8, e.readInt16LE = K.readInt16LE, e.readInt16BE = K.readInt16BE, e.readInt32LE = K.readInt32LE, e.readInt32BE = K.readInt32BE, e.readFloatLE = K.readFloatLE, e.readFloatBE = K.readFloatBE, e.readDoubleLE = K.readDoubleLE, e.readDoubleBE = K.readDoubleBE, e.writeUInt8 = K.writeUInt8, e.writeUIntLE = K.writeUIntLE, e.writeUIntBE = K.writeUIntBE, e.writeUInt16LE = K.writeUInt16LE, e.writeUInt16BE = K.writeUInt16BE, e.writeUInt32LE = K.writeUInt32LE, e.writeUInt32BE = K.writeUInt32BE, e.writeIntLE = K.writeIntLE, e.writeIntBE = K.writeIntBE, e.writeInt8 = K.writeInt8, e.writeInt16LE = K.writeInt16LE, e.writeInt16BE = K.writeInt16BE, e.writeInt32LE = K.writeInt32LE, e.writeInt32BE = K.writeInt32BE, e.writeFloatLE = K.writeFloatLE, e.writeFloatBE = K.writeFloatBE, e.writeDoubleLE = K.writeDoubleLE, e.writeDoubleBE = K.writeDoubleBE, e.fill = K.fill, e.inspect = K.inspect, e.toArrayBuffer = K.toArrayBuffer, e
        };
        var X = /[^+\/0-9A-z\-]/g
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        var n = "normal";
        return t && e ? n = "bolditalics" : t ? n = "bold" : e && (n = "italics"), n
    }

    function i(t, e) {
        this.fonts = {}, this.pdfDoc = e, this.fontWrappers = {};
        for (var n in t)
            if (t.hasOwnProperty(n)) {
                var r = t[n];
                this.fonts[n] = {
                    normal: r.normal,
                    bold: r.bold,
                    italics: r.italics,
                    bolditalics: r.bolditalics
                }
            }
    }
    var o = n(11),
        a = n(16);
    i.prototype.provideFont = function(t, e, n) {
        if (!this.fonts[t]) return this.pdfDoc._font;
        var i = r(e, n);
        return this.fontWrappers[t] = this.fontWrappers[t] || {}, this.fontWrappers[t][i] || (this.fontWrappers[t][i] = new a(this.pdfDoc, this.fonts[t][i], t + "(" + i + ")")), this.fontWrappers[t][i]
    }, i.prototype.setFontRefsToPdfDoc = function() {
        var t = this;
        o.each(t.fontWrappers, function(e) {
            o.each(e, function(e) {
                o.each(e.pdfFonts, function(e) {
                    t.pdfDoc.page.fonts[e.id] || (t.pdfDoc.page.fonts[e.id] = e.ref())
                })
            })
        })
    }, t.exports = i
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        a.each(e, function(e) {
            t.push(e)
        })
    }

    function i(t, e, n) {
        this.pageSize = t, this.pageMargins = e, this.tracker = new s, this.imageMeasure = n, this.tableLayouts = {}
    }

    function o(t) {
        var e = t.x,
            n = t.y;
        t.positions = [], a.each(t.canvas, function(t) {
            var e = t.x,
                n = t.y;
            t.resetXY = function() {
                t.x = e, t.y = n
            }
        }), t.resetXY = function() {
            t.x = e, t.y = n, a.each(t.canvas, function(t) {
                t.resetXY()
            })
        }
    }
    var a = n(11),
        s = n(18),
        h = n(19),
        u = n(20),
        l = n(21),
        c = n(22),
        f = n(23),
        d = n(24),
        p = n(25).pack,
        g = n(25).offsetVector,
        v = n(25).fontStringify,
        m = n(25).isFunction,
        y = n(26),
        w = n(27);
    i.prototype.registerTableLayouts = function(t) {
        this.tableLayouts = p(this.tableLayouts, t)
    }, i.prototype.layoutDocument = function(t, e, n, r, i, o, s, u, l, c) {
        function f(t, e) {
            return t = a.reject(t, function(t) {
                return a.isEmpty(t.positions)
            }), a.each(t, function(t) {
                var n = a.pick(t, ["id", "text", "ul", "ol", "table", "image", "qr", "canvas", "columns", "headlineLevel", "style", "pageBreak", "pageOrientation", "width", "height"]);
                n.startPosition = a.first(t.positions), n.pageNumbers = a.chain(t.positions).map("pageNumber").uniq().value(), n.pages = e.length, n.stack = a.isArray(t.stack), t.nodeInfo = n
            }), a.any(t, function(t, e, n) {
                if ("before" !== t.pageBreak && !t.pageBreakCalculated) {
                    t.pageBreakCalculated = !0;
                    var r = a.first(t.nodeInfo.pageNumbers),
                        i = a.chain(n).drop(e + 1).filter(function(t) {
                            return a.contains(t.nodeInfo.pageNumbers, r)
                        }).value(),
                        o = a.chain(n).drop(e + 1).filter(function(t) {
                            return a.contains(t.nodeInfo.pageNumbers, r + 1)
                        }).value(),
                        s = a.chain(n).take(e).filter(function(t) {
                            return a.contains(t.nodeInfo.pageNumbers, r)
                        }).value();
                    if (c(t.nodeInfo, a.map(i, "nodeInfo"), a.map(o, "nodeInfo"), a.map(s, "nodeInfo"))) return t.pageBreak = "before", !0
                }
            })
        }

        function d(t) {
            a.each(t.linearNodeList, function(t) {
                t.resetXY()
            })
        }
        m(c) || (c = function() {
            return !1
        }), this.docMeasure = new h(e, n, r, this.imageMeasure, this.tableLayouts, u);
        for (var p = this.tryLayoutDocument(t, e, n, r, i, o, s, u, l); f(p.linearNodeList, p.pages);) d(p), p = this.tryLayoutDocument(t, e, n, r, i, o, s, u, l);
        return p.pages
    }, i.prototype.tryLayoutDocument = function(t, e, n, r, i, o, a, s, h, c) {
        this.linearNodeList = [], t = this.docMeasure.measureDocument(t), this.writer = new l(new u(this.pageSize, this.pageMargins), this.tracker);
        var f = this;
        return this.writer.context().tracker.startTracking("pageAdded", function() {
            f.addBackground(i)
        }), this.addBackground(i), this.processNode(t), this.addHeadersAndFooters(o, a), null != h && this.addWatermark(h, e), {
            pages: this.writer.context().pages,
            linearNodeList: this.linearNodeList
        }
    }, i.prototype.addBackground = function(t) {
        var e = m(t) ? t : function() {
                return t
            },
            n = e(this.writer.context().page + 1);
        if (n) {
            var r = this.writer.context().getCurrentPage().pageSize;
            this.writer.beginUnbreakableBlock(r.width, r.height), this.processNode(this.docMeasure.measureDocument(n)), this.writer.commitUnbreakableBlock(0, 0)
        }
    }, i.prototype.addStaticRepeatable = function(t, e) {
        this.addDynamicRepeatable(function() {
            return t
        }, e)
    }, i.prototype.addDynamicRepeatable = function(t, e) {
        for (var n = this.writer.context().pages, r = 0, i = n.length; i > r; r++) {
            this.writer.context().page = r;
            var o = t(r + 1, i);
            if (o) {
                var a = e(this.writer.context().getCurrentPage().pageSize, this.pageMargins);
                this.writer.beginUnbreakableBlock(a.width, a.height), this.processNode(this.docMeasure.measureDocument(o)), this.writer.commitUnbreakableBlock(a.x, a.y)
            }
        }
    }, i.prototype.addHeadersAndFooters = function(t, e) {
        var n = function(t, e) {
                return {
                    x: 0,
                    y: 0,
                    width: t.width,
                    height: e.top
                }
            },
            r = function(t, e) {
                return {
                    x: 0,
                    y: t.height - e.bottom,
                    width: t.width,
                    height: e.bottom
                }
            };
        m(t) ? this.addDynamicRepeatable(t, n) : t && this.addStaticRepeatable(t, n), m(e) ? this.addDynamicRepeatable(e, r) : e && this.addStaticRepeatable(e, r)
    }, i.prototype.addWatermark = function(t, e) {
        function n(t, e, n) {
            for (var r, i = t.width, o = t.height, a = .8 * Math.sqrt(i * i + o * o), s = new y(n), h = new w, u = 0, l = 1e3, c = (u + l) / 2; Math.abs(u - l) > 1;) h.push({
                fontSize: c
            }), r = s.sizeOfString(e, h), r.width > a ? (l = c, c = (u + l) / 2) : r.width < a && (u = c, c = (u + l) / 2), h.pop();
            return {
                size: r,
                fontSize: c
            }
        }
        for (var r = Object.getOwnPropertyNames(e.fonts)[0], i = {
                text: t,
                font: e.provideFont(e[r], !1, !1),
                size: n(this.pageSize, t, e)
            }, o = this.writer.context().pages, a = 0, s = o.length; s > a; a++) o[a].watermark = i
    }, i.prototype.processNode = function(t) {
        function e(e) {
            var r = t._margin;
            "before" === t.pageBreak && n.writer.moveToNextPage(t.pageOrientation), r && (n.writer.context().moveDown(r[1]), n.writer.context().addMargin(r[0], r[2])), e(), r && (n.writer.context().addMargin(-r[0], -r[2]), n.writer.context().moveDown(r[3])), "after" === t.pageBreak && n.writer.moveToNextPage(t.pageOrientation)
        }
        var n = this;
        this.linearNodeList.push(t), o(t), e(function() {
            var e = t.absolutePosition;
            if (e && (n.writer.context().beginDetachedBlock(), n.writer.context().moveTo(e.x || 0, e.y || 0)), t.stack) n.processVerticalContainer(t);
            else if (t.columns) n.processColumns(t);
            else if (t.ul) n.processList(!1, t);
            else if (t.ol) n.processList(!0, t);
            else if (t.table) n.processTable(t);
            else if (void 0 !== t.text) n.processLeaf(t);
            else if (t.image) n.processImage(t);
            else if (t.canvas) n.processCanvas(t);
            else if (t.qr) n.processQr(t);
            else if (!t._span) throw "Unrecognized document structure: " + JSON.stringify(t, v);
            e && n.writer.context().endDetachedBlock()
        })
    }, i.prototype.processVerticalContainer = function(t) {
        var e = this;
        t.stack.forEach(function(n) {
            e.processNode(n), r(t.positions, n.positions)
        })
    }, i.prototype.processColumns = function(t) {
        function e(t) {
            if (!t) return null;
            var e = [];
            e.push(0);
            for (var r = n.length - 1; r > 0; r--) e.push(t);
            return e
        }
        var n = t.columns,
            i = this.writer.context().availableWidth,
            o = e(t._gap);
        o && (i -= (o.length - 1) * t._gap), c.buildColumnWidths(n, i);
        var a = this.processRow(n, n, o);
        r(t.positions, a.positions)
    }, i.prototype.processRow = function(t, e, n, i, o) {
        function a(t) {
            for (var e, n = 0, r = l.length; r > n; n++) {
                var i = l[n];
                if (i.prevPage === t.prevPage) {
                    e = i;
                    break
                }
            }
            e || (e = t, l.push(e)), e.prevY = Math.max(e.prevY, t.prevY), e.y = Math.min(e.y, t.y)
        }

        function s(t) {
            return n && n.length > t ? n[t] : 0
        }

        function h(t, e) {
            if (t.rowSpan && t.rowSpan > 1) {
                var n = o + t.rowSpan - 1;
                if (n >= i.length) throw "Row span for column " + e + " (with indexes starting from 0) exceeded row count";
                return i[n][e]
            }
            return null
        }
        var u = this,
            l = [],
            c = [];
        return this.tracker.auto("pageChanged", a, function() {
            e = e || t, u.writer.context().beginColumnGroup();
            for (var i = 0, o = t.length; o > i; i++) {
                var a = t[i],
                    l = e[i]._calcWidth,
                    f = s(i);
                if (a.colSpan && a.colSpan > 1)
                    for (var d = 1; d < a.colSpan; d++) l += e[++i]._calcWidth + n[i];
                u.writer.context().beginColumn(l, f, h(a, i)), a._span ? a._columnEndingContext && u.writer.context().markEnding(a) : (u.processNode(a), r(c, a.positions))
            }
            u.writer.context().completeColumnGroup()
        }), {
            pageBreaks: l,
            positions: c
        }
    }, i.prototype.processList = function(t, e) {
        function n(t) {
            if (s) {
                var e = s;
                if (s = null, e.canvas) {
                    var n = e.canvas[0];
                    g(n, -e._minWidth, 0), i.writer.addVector(n)
                } else {
                    var r = new d(i.pageSize.width);
                    r.addInline(e._inlines[0]), r.x = -e._minWidth, r.y = t.getAscenderHeight() - r.getAscenderHeight(), i.writer.addLine(r, !0)
                }
            }
        }
        var i = this,
            o = t ? e.ol : e.ul,
            a = e._gapSize;
        this.writer.context().addMargin(a.width);
        var s;
        this.tracker.auto("lineAdded", n, function() {
            o.forEach(function(t) {
                s = t.listMarker, i.processNode(t), r(e.positions, t.positions)
            })
        }), this.writer.context().addMargin(-a.width)
    }, i.prototype.processTable = function(t) {
        var e = new f(t);
        e.beginTable(this.writer);
        for (var n = 0, i = t.table.body.length; i > n; n++) {
            e.beginRow(n, this.writer);
            var o = this.processRow(t.table.body[n], t.table.widths, t._offsets.offsets, t.table.body, n);
            r(t.positions, o.positions), e.endRow(n, this.writer, o.pageBreaks)
        }
        e.endTable(this.writer)
    }, i.prototype.processLeaf = function(t) {
        for (var e = this.buildNextLine(t); e;) {
            var n = this.writer.addLine(e);
            t.positions.push(n), e = this.buildNextLine(t)
        }
    }, i.prototype.buildNextLine = function(t) {
        if (!t._inlines || 0 === t._inlines.length) return null;
        for (var e = new d(this.writer.context().availableWidth); t._inlines && t._inlines.length > 0 && e.hasEnoughSpaceForInline(t._inlines[0]);) e.addInline(t._inlines.shift());
        return e.lastLineInParagraph = 0 === t._inlines.length, e
    }, i.prototype.processImage = function(t) {
        var e = this.writer.addImage(t);
        t.positions.push(e)
    }, i.prototype.processCanvas = function(t) {
        var e = t._minHeight;
        this.writer.context().availableHeight < e && this.writer.moveToNextPage(), t.canvas.forEach(function(e) {
            var n = this.writer.addVector(e);
            t.positions.push(n)
        }, this), this.writer.context().moveDown(e)
    }, i.prototype.processQr = function(t) {
        var e = this.writer.addQr(t);
        t.positions.push(e)
    }, t.exports = i
}, function(t, e, n) {
    t.exports = {
        "4A0": [4767.87, 6740.79],
        "2A0": [3370.39, 4767.87],
        A0: [2383.94, 3370.39],
        A1: [1683.78, 2383.94],
        A2: [1190.55, 1683.78],
        A3: [841.89, 1190.55],
        A4: [595.28, 841.89],
        A5: [419.53, 595.28],
        A6: [297.64, 419.53],
        A7: [209.76, 297.64],
        A8: [147.4, 209.76],
        A9: [104.88, 147.4],
        A10: [73.7, 104.88],
        B0: [2834.65, 4008.19],
        B1: [2004.09, 2834.65],
        B2: [1417.32, 2004.09],
        B3: [1000.63, 1417.32],
        B4: [708.66, 1000.63],
        B5: [498.9, 708.66],
        B6: [354.33, 498.9],
        B7: [249.45, 354.33],
        B8: [175.75, 249.45],
        B9: [124.72, 175.75],
        B10: [87.87, 124.72],
        C0: [2599.37, 3676.54],
        C1: [1836.85, 2599.37],
        C2: [1298.27, 1836.85],
        C3: [918.43, 1298.27],
        C4: [649.13, 918.43],
        C5: [459.21, 649.13],
        C6: [323.15, 459.21],
        C7: [229.61, 323.15],
        C8: [161.57, 229.61],
        C9: [113.39, 161.57],
        C10: [79.37, 113.39],
        RA0: [2437.8, 3458.27],
        RA1: [1729.13, 2437.8],
        RA2: [1218.9, 1729.13],
        RA3: [864.57, 1218.9],
        RA4: [609.45, 864.57],
        SRA0: [2551.18, 3628.35],
        SRA1: [1814.17, 2551.18],
        SRA2: [1275.59, 1814.17],
        SRA3: [907.09, 1275.59],
        SRA4: [637.8, 907.09],
        EXECUTIVE: [521.86, 756],
        FOLIO: [612, 936],
        LEGAL: [612, 1008],
        LETTER: [612, 792],
        TABLOID: [792, 1224]
    }
}, function(t, e, n) {
    (function(e) {
        "use strict";

        function r(t, e) {
            this.pdfDoc = t, this.imageDictionary = e || {}
        }
        var i = (n(28), n(17));
        r.prototype.measureImage = function(t) {
            function n(t) {
                var n = a.imageDictionary[t];
                if (!n) return t;
                var r = n.indexOf("base64,");
                if (0 > r) throw "invalid image format, images dictionary should contain dataURL entries";
                return new e(n.substring(r + 7), "base64")
            }
            var r, o, a = this;
            return this.pdfDoc._imageRegistry[t] ? r = this.pdfDoc._imageRegistry[t] : (o = "I" + ++this.pdfDoc._imageCount, r = i.open(n(t), o), r.embed(this.pdfDoc), this.pdfDoc._imageRegistry[t] = r), {
                width: r.width,
                height: r.height
            }
        }, t.exports = r
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    "use strict";

    function r(t) {
        for (var e = [], n = null, r = 0, i = t.inlines.length; i > r; r++) {
            var o = t.inlines[r],
                a = o.decoration;
            if (a) {
                var s = o.decorationColor || o.color || "black",
                    h = o.decorationStyle || "solid";
                a = Array.isArray(a) ? a : [a];
                for (var u = 0, l = a.length; l > u; u++) {
                    var c = a[u];
                    n && c === n.decoration && h === n.decorationStyle && s === n.decorationColor && "lineThrough" !== c ? n.inlines.push(o) : (n = {
                        line: t,
                        decoration: c,
                        decorationColor: s,
                        decorationStyle: h,
                        inlines: [o]
                    }, e.push(n))
                }
            } else n = null
        }
        return e
    }

    function i(t, e, n, r) {
        function i() {
            for (var e = 0, n = 0, r = t.inlines.length; r > n; n++) {
                var i = t.inlines[n];
                e = i.fontSize > e ? n : e
            }
            return t.inlines[e]
        }

        function o() {
            for (var e = 0, n = 0, r = t.inlines.length; r > n; n++) e += t.inlines[n].width;
            return e
        }
        var a = t.inlines[0],
            s = i(),
            h = o(),
            u = t.line.getAscenderHeight(),
            l = s.font.ascender / 1e3 * s.fontSize,
            c = s.height,
            f = c - l,
            d = .5 + .12 * Math.floor(Math.max(s.fontSize - 8, 0) / 2);
        switch (t.decoration) {
            case "underline":
                n += u + .45 * f;
                break;
            case "overline":
                n += u - .85 * l;
                break;
            case "lineThrough":
                n += u - .25 * l;
                break;
            default:
                throw "Unkown decoration : " + t.decoration
        }
        if (r.save(), "double" === t.decorationStyle) {
            var p = Math.max(.5, 2 * d);
            r.fillColor(t.decorationColor).rect(e + a.x, n - d / 2, h, d / 2).fill().rect(e + a.x, n + p - d / 2, h, d / 2).fill()
        } else if ("dashed" === t.decorationStyle) {
            var g = Math.ceil(h / 6.8),
                v = e + a.x;
            r.rect(v, n, h, d).clip(), r.fillColor(t.decorationColor);
            for (var m = 0; g > m; m++) r.rect(v, n - d / 2, 3.96, d).fill(), v += 6.8
        } else if ("dotted" === t.decorationStyle) {
            var y = Math.ceil(h / (3 * d)),
                w = e + a.x;
            r.rect(w, n, h, d).clip(), r.fillColor(t.decorationColor);
            for (var _ = 0; y > _; _++) r.rect(w, n - d / 2, d, d).fill(), w += 3 * d
        } else if ("wavy" === t.decorationStyle) {
            var b = .7,
                x = 1,
                S = Math.ceil(h / (2 * b)) + 1,
                k = e + a.x - 1;
            r.rect(e + a.x, n - x, h, n + x).clip(), r.lineWidth(.24), r.moveTo(k, n);
            for (var E = 0; S > E; E++) r.bezierCurveTo(k + b, n - x, k + 2 * b, n - x, k + 3 * b, n).bezierCurveTo(k + 4 * b, n + x, k + 5 * b, n + x, k + 6 * b, n), k += 6 * b;
            r.stroke(t.decorationColor)
        } else r.fillColor(t.decorationColor).rect(e + a.x, n - d / 2, h, d).fill();
        r.restore()
    }

    function o(t, e, n, o) {
        for (var a = r(t), s = 0, h = a.length; h > s; s++) i(a[s], e, n, o)
    }

    function a(t, e, n, r) {
        for (var i = t.getHeight(), o = 0, a = t.inlines.length; a > o; o++) {
            var s = t.inlines[o];
            s.background && r.fillColor(s.background).rect(e + s.x, n, s.width, i).fill()
        }
    }
    t.exports = {
        drawBackground: a,
        drawDecorations: o
    }
}, function(t, e, n) {
    (function(e, n) {
        "use strict";

        function r() {
            this.fileSystem = {}, this.baseSystem = {}
        }

        function i(t) {
            return 0 === t.indexOf(n) && (t = t.substring(n.length)), 0 === t.indexOf("/") && (t = t.substring(1)), t
        }
        r.prototype.readFileSync = function(t) {
            t = i(t);
            var n = this.baseSystem[t];
            return n ? new e(n, "base64") : this.fileSystem[t]
        }, r.prototype.writeFileSync = function(t, e) {
            this.fileSystem[i(t)] = e
        }, r.prototype.bindFS = function(t) {
            this.baseSystem = t
        }, t.exports = new r
    }).call(e, n(4).Buffer, "/")
}, function(t, e, n) {
    var r;
    (function(t, i) {
        (function() {
            function o(t, e) {
                if (t !== e) {
                    var n = t === t,
                        r = e === e;
                    if (t > e || !n || "undefined" == typeof t && r) return 1;
                    if (e > t || !r || "undefined" == typeof e && n) return -1
                }
                return 0
            }

            function a(t, e, n) {
                if (e !== e) return m(t, n);
                for (var r = (n || 0) - 1, i = t.length; ++r < i;)
                    if (t[r] === e) return r;
                return -1
            }

            function s(t, e) {
                var n = t.length;
                for (t.sort(e); n--;) t[n] = t[n].value;
                return t
            }

            function h(t) {
                return "string" == typeof t ? t : null == t ? "" : t + ""
            }

            function u(t) {
                return t.charCodeAt(0)
            }

            function l(t, e) {
                for (var n = -1, r = t.length; ++n < r && e.indexOf(t.charAt(n)) > -1;);
                return n
            }

            function c(t, e) {
                for (var n = t.length; n-- && e.indexOf(t.charAt(n)) > -1;);
                return n
            }

            function f(t, e) {
                return o(t.criteria, e.criteria) || t.index - e.index
            }

            function d(t, e) {
                for (var n = -1, r = t.criteria, i = e.criteria, a = r.length; ++n < a;) {
                    var s = o(r[n], i[n]);
                    if (s) return s
                }
                return t.index - e.index
            }

            function p(t) {
                return Ht[t]
            }

            function g(t) {
                return Zt[t]
            }

            function v(t) {
                return "\\" + Yt[t]
            }

            function m(t, e, n) {
                for (var r = t.length, i = n ? e || r : (e || 0) - 1; n ? i-- : ++i < r;) {
                    var o = t[i];
                    if (o !== o) return i
                }
                return -1
            }

            function y(t) {
                return t && "object" == typeof t || !1
            }

            function w(t) {
                return 160 >= t && t >= 9 && 13 >= t || 32 == t || 160 == t || 5760 == t || 6158 == t || t >= 8192 && (8202 >= t || 8232 == t || 8233 == t || 8239 == t || 8287 == t || 12288 == t || 65279 == t)
            }

            function _(t, e) {
                for (var n = -1, r = t.length, i = -1, o = []; ++n < r;) t[n] === e && (t[n] = G, o[++i] = n);
                return o
            }

            function b(t, e) {
                for (var n, r = -1, i = t.length, o = -1, a = []; ++r < i;) {
                    var s = t[r],
                        h = e ? e(s, r, t) : s;
                    r && n === h || (n = h, a[++o] = s)
                }
                return a
            }

            function x(t) {
                for (var e = -1, n = t.length; ++e < n && w(t.charCodeAt(e)););
                return e
            }

            function S(t) {
                for (var e = t.length; e-- && w(t.charCodeAt(e)););
                return e
            }

            function k(t) {
                return Gt[t]
            }

            function E(t) {
                function e(t) {
                    if (y(t) && !ja(t)) {
                        if (t instanceof n) return t;
                        if (qo.call(t, "__wrapped__")) return new n(t.__wrapped__, t.__chain__, Vt(t.__actions__))
                    }
                    return new n(t)
                }

                function n(t, e, n) {
                    this.__actions__ = n || [], this.__chain__ = !!e, this.__wrapped__ = t
                }

                function r(t) {
                    this.actions = null, this.dir = 1, this.dropCount = 0, this.filtered = !1, this.iteratees = null, this.takeCount = xa, this.views = null, this.wrapped = t
                }

                function i() {
                    var t = this.actions,
                        e = this.iteratees,
                        n = this.views,
                        i = new r(this.wrapped);
                    return i.actions = t ? Vt(t) : null, i.dir = this.dir, i.dropCount = this.dropCount, i.filtered = this.filtered, i.iteratees = e ? Vt(e) : null, i.takeCount = this.takeCount, i.views = n ? Vt(n) : null, i
                }

                function w() {
                    if (this.filtered) {
                        var t = new r(this);
                        t.dir = -1, t.filtered = !0
                    } else t = this.clone(), t.dir *= -1;
                    return t
                }

                function J() {
                    var t = this.wrapped.value();
                    if (!ja(t)) return qe(t, this.actions);
                    var e = this.dir,
                        n = 0 > e,
                        r = vn(0, t.length, this.views),
                        i = r.start,
                        o = r.end,
                        a = o - i,
                        s = this.dropCount,
                        h = va(a, this.takeCount - s),
                        u = n ? o : i - 1,
                        l = this.iteratees,
                        c = l ? l.length : 0,
                        f = 0,
                        d = [];
                    t: for (; a-- && h > f;) {
                        u += e;
                        for (var p = -1, g = t[u]; ++p < c;) {
                            var v = l[p],
                                m = v.iteratee,
                                y = m(g, u, t),
                                w = v.type;
                            if (w == j) g = y;
                            else if (!y) {
                                if (w == N) continue t;
                                break t
                            }
                        }
                        s ? s-- : d[f++] = g
                    }
                    return d
                }

                function nt() {
                    this.__data__ = {}
                }

                function it(t) {
                    return this.has(t) && delete this.__data__[t]
                }

                function Ht(t) {
                    return "__proto__" == t ? C : this.__data__[t]
                }

                function Zt(t) {
                    return "__proto__" != t && qo.call(this.__data__, t)
                }

                function Gt(t, e) {
                    return "__proto__" != t && (this.__data__[t] = e), this
                }

                function qt(t) {
                    var e = t ? t.length : 0;
                    for (this.data = {
                            hash: fa(null),
                            set: new oa
                        }; e--;) this.push(t[e])
                }

                function Yt(t, e) {
                    var n = t.data,
                        r = "string" == typeof e || _i(e) ? n.set.has(e) : n.hash[e];
                    return r ? 0 : -1
                }

                function Xt(t) {
                    var e = this.data;
                    "string" == typeof t || _i(t) ? e.set.add(t) : e.hash[t] = !0
                }

                function Vt(t, e) {
                    var n = -1,
                        r = t.length;
                    for (e || (e = Bo(r)); ++n < r;) e[n] = t[n];
                    return e
                }

                function $t(t, e) {
                    for (var n = -1, r = t.length; ++n < r && e(t[n], n, t) !== !1;);
                    return t
                }

                function Qt(t, e) {
                    for (var n = t.length; n-- && e(t[n], n, t) !== !1;);
                    return t
                }

                function te(t, e) {
                    for (var n = -1, r = t.length; ++n < r;)
                        if (!e(t[n], n, t)) return !1;
                    return !0
                }

                function ee(t, e) {
                    for (var n = -1, r = t.length, i = -1, o = []; ++n < r;) {
                        var a = t[n];
                        e(a, n, t) && (o[++i] = a)
                    }
                    return o
                }

                function ne(t, e) {
                    for (var n = -1, r = t.length, i = Bo(r); ++n < r;) i[n] = e(t[n], n, t);
                    return i
                }

                function re(t) {
                    for (var e = -1, n = t.length, r = ba; ++e < n;) {
                        var i = t[e];
                        i > r && (r = i)
                    }
                    return r
                }

                function ie(t) {
                    for (var e = -1, n = t.length, r = xa; ++e < n;) {
                        var i = t[e];
                        r > i && (r = i)
                    }
                    return r
                }

                function oe(t, e, n, r) {
                    var i = -1,
                        o = t.length;
                    for (r && o && (n = t[++i]); ++i < o;) n = e(n, t[i], i, t);
                    return n
                }

                function ae(t, e, n, r) {
                    var i = t.length;
                    for (r && i && (n = t[--i]); i--;) n = e(n, t[i], i, t);
                    return n
                }

                function se(t, e) {
                    for (var n = -1, r = t.length; ++n < r;)
                        if (e(t[n], n, t)) return !0;
                    return !1
                }

                function he(t, e) {
                    return "undefined" == typeof t ? e : t
                }

                function ue(t, e, n, r) {
                    return "undefined" != typeof t && qo.call(r, n) ? t : e
                }

                function le(t, e, n) {
                    var r = qa(e);
                    if (!n) return fe(e, t, r);
                    for (var i = -1, o = r.length; ++i < o;) {
                        var a = r[i],
                            s = t[a],
                            h = n(s, e[a], a, t, e);
                        (h === h ? h === s : s !== s) && ("undefined" != typeof s || a in t) || (t[a] = h)
                    }
                    return t
                }

                function ce(t, e) {
                    for (var n = -1, r = t.length, i = Sn(r), o = e.length, a = Bo(o); ++n < o;) {
                        var s = e[n];
                        i ? (s = parseFloat(s), a[n] = bn(s, r) ? t[s] : C) : a[n] = t[s]
                    }
                    return a
                }

                function fe(t, e, n) {
                    n || (n = e, e = {});
                    for (var r = -1, i = n.length; ++r < i;) {
                        var o = n[r];
                        e[o] = t[o]
                    }
                    return e
                }

                function de(t, e) {
                    for (var n = -1, r = e.length; ++n < r;) {
                        var i = e[n];
                        t[i] = un(t[i], A, t)
                    }
                    return t
                }

                function pe(t, e, n) {
                    var r = typeof t;
                    return "function" == r ? "undefined" != typeof e && _n(t) ? Xe(t, e, n) : t : null == t ? bo : "object" == r ? De(t) : Fe(t + "")
                }

                function ge(t, e, n, r, i, o, a) {
                    var s;
                    if (n && (s = i ? n(t, r, i) : n(t)), "undefined" != typeof s) return s;
                    if (!_i(t)) return t;
                    var h = ja(t);
                    if (h) {
                        if (s = mn(t), !e) return Vt(t, s)
                    } else {
                        var u = Ko.call(t),
                            l = u == $;
                        if (u != tt && u != q && (!l || i)) return Nt[u] ? wn(t, u, e) : i ? t : {};
                        if (s = yn(l ? {} : t), !e) return fe(t, s, qa(t))
                    }
                    o || (o = []), a || (a = []);
                    for (var c = o.length; c--;)
                        if (o[c] == t) return a[c];
                    return o.push(t), a.push(s), (h ? $t : Ie)(t, function(r, i) {
                        s[i] = ge(r, e, n, i, t, o, a)
                    }), s
                }

                function ve(t, e, n, r) {
                    if (!wi(t)) throw new Wo(Z);
                    return aa(function() {
                        t.apply(C, je(n, r))
                    }, e)
                }

                function me(t, e) {
                    var n = t ? t.length : 0,
                        r = [];
                    if (!n) return r;
                    var i = -1,
                        o = gn(),
                        s = o == a,
                        h = s && e.length >= 200 && Ta(e),
                        u = e.length;
                    h && (o = Yt, s = !1, e = h);
                    t: for (; ++i < n;) {
                        var l = t[i];
                        if (s && l === l) {
                            for (var c = u; c--;)
                                if (e[c] === l) continue t;
                            r.push(l)
                        } else o(e, l) < 0 && r.push(l)
                    }
                    return r
                }

                function ye(t, e) {
                    var n = t ? t.length : 0;
                    if (!Sn(n)) return Ie(t, e);
                    for (var r = -1, i = Tn(t); ++r < n && e(i[r], r, i) !== !1;);
                    return t
                }

                function we(t, e) {
                    var n = t ? t.length : 0;
                    if (!Sn(n)) return Ae(t, e);
                    for (var r = Tn(t); n-- && e(r[n], n, r) !== !1;);
                    return t
                }

                function _e(t, e) {
                    var n = !0;
                    return ye(t, function(t, r, i) {
                        return n = !!e(t, r, i)
                    }), n
                }

                function be(t, e) {
                    var n = [];
                    return ye(t, function(t, r, i) {
                        e(t, r, i) && n.push(t)
                    }), n
                }

                function xe(t, e, n, r) {
                    var i;
                    return n(t, function(t, n, o) {
                        return e(t, n, o) ? (i = r ? n : t, !1) : void 0
                    }), i
                }

                function Se(t, e, n, r) {
                    for (var i = (r || 0) - 1, o = t.length, a = -1, s = []; ++i < o;) {
                        var h = t[i];
                        if (y(h) && Sn(h.length) && (ja(h) || fi(h))) {
                            e && (h = Se(h, e, n));
                            var u = -1,
                                l = h.length;
                            for (s.length += l; ++u < l;) s[++a] = h[u]
                        } else n || (s[++a] = h)
                    }
                    return s
                }

                function ke(t, e, n) {
                    for (var r = -1, i = Tn(t), o = n(t), a = o.length; ++r < a;) {
                        var s = o[r];
                        if (e(i[s], s, i) === !1) break
                    }
                    return t
                }

                function Ee(t, e, n) {
                    for (var r = Tn(t), i = n(t), o = i.length; o--;) {
                        var a = i[o];
                        if (e(r[a], a, r) === !1) break
                    }
                    return t
                }

                function Ce(t, e) {
                    return ke(t, e, Hi)
                }

                function Ie(t, e) {
                    return ke(t, e, qa)
                }

                function Ae(t, e) {
                    return Ee(t, e, qa)
                }

                function Le(t, e) {
                    for (var n = -1, r = e.length, i = -1, o = []; ++n < r;) {
                        var a = e[n];
                        wi(t[a]) && (o[++i] = a)
                    }
                    return o
                }

                function Re(t, e, n) {
                    var r = -1,
                        i = "function" == typeof e,
                        o = t ? t.length : 0,
                        a = Sn(o) ? Bo(o) : [];
                    return ye(t, function(t) {
                        var o = i ? e : null != t && t[e];
                        a[++r] = o ? o.apply(t, n) : C
                    }), a
                }

                function Be(t, e, n, r, i, o) {
                    if (t === e) return 0 !== t || 1 / t == 1 / e;
                    var a = typeof t,
                        s = typeof e;
                    return "function" != a && "object" != a && "function" != s && "object" != s || null == t || null == e ? t !== t && e !== e : Te(t, e, Be, n, r, i, o)
                }

                function Te(t, e, n, r, i, o, a) {
                    var s = ja(t),
                        h = ja(e),
                        u = Y,
                        l = Y;
                    s || (u = Ko.call(t), u == q ? u = tt : u != tt && (s = Ai(t))), h || (l = Ko.call(e), l == q ? l = tt : l != tt && (h = Ai(e)));
                    var c = u == tt,
                        f = l == tt,
                        d = u == l;
                    if (d && !s && !c) return cn(t, e, u);
                    var p = c && qo.call(t, "__wrapped__"),
                        g = f && qo.call(e, "__wrapped__");
                    if (p || g) return n(p ? t.value() : t, g ? e.value() : e, r, i, o, a);
                    if (!d) return !1;
                    o || (o = []), a || (a = []);
                    for (var v = o.length; v--;)
                        if (o[v] == t) return a[v] == e;
                    o.push(t), a.push(e);
                    var m = (s ? ln : fn)(t, e, n, r, i, o, a);
                    return o.pop(), a.pop(), m
                }

                function Me(t, e, n, r, i) {
                    var o = e.length;
                    if (null == t) return !o;
                    for (var a = -1, s = !i; ++a < o;)
                        if (s && r[a] ? n[a] !== t[e[a]] : !qo.call(t, e[a])) return !1;
                    for (a = -1; ++a < o;) {
                        var h = e[a];
                        if (s && r[a]) var u = qo.call(t, h);
                        else {
                            var l = t[h],
                                c = n[a];
                            u = i ? i(l, c, h) : C, "undefined" == typeof u && (u = Be(c, l, i, !0))
                        }
                        if (!u) return !1
                    }
                    return !0
                }

                function Oe(t, e) {
                    var n = [];
                    return ye(t, function(t, r, i) {
                        n.push(e(t, r, i))
                    }), n
                }

                function De(t) {
                    var e = qa(t),
                        n = e.length;
                    if (1 == n) {
                        var r = e[0],
                            i = t[r];
                        if (kn(i)) return function(t) {
                            return null != t && i === t[r] && qo.call(t, r)
                        }
                    }
                    for (var o = Bo(n), a = Bo(n); n--;) i = t[e[n]], o[n] = i, a[n] = kn(i);
                    return function(t) {
                        return Me(t, e, o, a)
                    }
                }

                function Ue(t, e, n, r, i) {
                    var o = Sn(e.length) && (ja(e) || Ai(e));
                    return (o ? $t : Ie)(e, function(e, a, s) {
                        if (y(e)) return r || (r = []), i || (i = []), Pe(t, s, a, Ue, n, r, i);
                        var h = t[a],
                            u = n ? n(h, e, a, t, s) : C,
                            l = "undefined" == typeof u;
                        l && (u = e), !o && "undefined" == typeof u || !l && (u === u ? u === h : h !== h) || (t[a] = u)
                    }), t
                }

                function Pe(t, e, n, r, i, o, a) {
                    for (var s = o.length, h = e[n]; s--;)
                        if (o[s] == h) return void(t[n] = a[s]);
                    var u = t[n],
                        l = i ? i(u, h, n, t, e) : C,
                        c = "undefined" == typeof l;
                    c && (l = h, Sn(h.length) && (ja(h) || Ai(h)) ? l = ja(u) ? u : u ? Vt(u) : [] : Za(h) || fi(h) ? l = fi(u) ? Bi(u) : Za(u) ? u : {} : c = !1), o.push(h), a.push(l), c ? t[n] = r(l, h, i, o, a) : (l === l ? l !== u : u === u) && (t[n] = l)
                }

                function Fe(t) {
                    return function(e) {
                        return null == e ? C : e[t]
                    }
                }

                function ze(t, e) {
                    var n = e.length,
                        r = ce(t, e);
                    for (e.sort(o); n--;) {
                        var i = parseFloat(e[n]);
                        if (i != a && bn(i)) {
                            var a = i;
                            sa.call(t, i, 1)
                        }
                    }
                    return r
                }

                function We(t, e) {
                    return t + ea(_a() * (e - t + 1))
                }

                function Ne(t, e, n, r, i) {
                    return i(t, function(t, i, o) {
                        n = r ? (r = !1, t) : e(n, t, i, o)
                    }), n
                }

                function je(t, e, n) {
                    var r = -1,
                        i = t.length;
                    e = null == e ? 0 : +e || 0, 0 > e && (e = -e > i ? 0 : i + e), n = "undefined" == typeof n || n > i ? i : +n || 0, 0 > n && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
                    for (var o = Bo(i); ++r < i;) o[r] = t[r + e];
                    return o
                }

                function He(t, e) {
                    var n;
                    return ye(t, function(t, r, i) {
                        return n = e(t, r, i), !n
                    }), !!n
                }

                function Ze(t, e) {
                    var n = -1,
                        r = gn(),
                        i = t.length,
                        o = r == a,
                        s = o && i >= 200,
                        h = s && Ta(),
                        u = [];
                    h ? (r = Yt, o = !1) : (s = !1, h = e ? [] : u);
                    t: for (; ++n < i;) {
                        var l = t[n],
                            c = e ? e(l, n, t) : l;
                        if (o && l === l) {
                            for (var f = h.length; f--;)
                                if (h[f] === c) continue t;
                            e && h.push(c), u.push(l)
                        } else r(h, c) < 0 && ((e || s) && h.push(c), u.push(l))
                    }
                    return u
                }

                function Ge(t, e) {
                    for (var n = -1, r = e.length, i = Bo(r); ++n < r;) i[n] = t[e[n]];
                    return i
                }

                function qe(t, e) {
                    var n = t;
                    n instanceof r && (n = n.value());
                    for (var i = -1, o = e.length; ++i < o;) {
                        var a = [n],
                            s = e[i];
                        ra.apply(a, s.args), n = s.func.apply(s.thisArg, a)
                    }
                    return n
                }

                function Ye(t, e, n) {
                    var r = 0,
                        i = t ? t.length : r;
                    if ("number" == typeof e && e === e && Ea >= i) {
                        for (; i > r;) {
                            var o = r + i >>> 1,
                                a = t[o];
                            (n ? e >= a : e > a) ? r = o + 1: i = o
                        }
                        return i
                    }
                    return Ke(t, e, bo, n)
                }

                function Ke(t, e, n, r) {
                    e = n(e);
                    for (var i = 0, o = t ? t.length : 0, a = e !== e, s = "undefined" == typeof e; o > i;) {
                        var h = ea((i + o) / 2),
                            u = n(t[h]),
                            l = u === u;
                        if (a) var c = l || r;
                        else c = s ? l && (r || "undefined" != typeof u) : r ? e >= u : e > u;
                        c ? i = h + 1 : o = h
                    }
                    return va(o, ka)
                }

                function Xe(t, e, n) {
                    if ("function" != typeof t) return bo;
                    if ("undefined" == typeof e) return t;
                    switch (n) {
                        case 1:
                            return function(n) {
                                return t.call(e, n)
                            };
                        case 3:
                            return function(n, r, i) {
                                return t.call(e, n, r, i)
                            };
                        case 4:
                            return function(n, r, i, o) {
                                return t.call(e, n, r, i, o)
                            };
                        case 5:
                            return function(n, r, i, o, a) {
                                return t.call(e, n, r, i, o, a)
                            }
                    }
                    return function() {
                        return t.apply(e, arguments)
                    }
                }

                function Ve(t) {
                    return Jo.call(t, 0)
                }

                function $e(t, e, n) {
                    for (var r = n.length, i = -1, o = ga(t.length - r, 0), a = -1, s = e.length, h = Bo(o + s); ++a < s;) h[a] = e[a];
                    for (; ++i < r;) h[n[i]] = t[i];
                    for (; o--;) h[a++] = t[i++];
                    return h
                }

                function Je(t, e, n) {
                    for (var r = -1, i = n.length, o = -1, a = ga(t.length - i, 0), s = -1, h = e.length, u = Bo(a + h); ++o < a;) u[o] = t[o];
                    for (var l = o; ++s < h;) u[l + s] = e[s];
                    for (; ++r < i;) u[l + n[r]] = t[o++];
                    return u
                }

                function Qe(t, e) {
                    return function(n, r, i) {
                        var o = e ? e() : {};
                        if (r = pn(r, i, 3), ja(n))
                            for (var a = -1, s = n.length; ++a < s;) {
                                var h = n[a];
                                t(o, h, r(h, a, n), n)
                            } else ye(n, function(e, n, i) {
                                t(o, e, r(e, n, i), i)
                            });
                        return o
                    }
                }

                function tn(t) {
                    return function() {
                        var e = arguments.length,
                            n = arguments[0];
                        if (2 > e || null == n) return n;
                        if (e > 3 && xn(arguments[1], arguments[2], arguments[3]) && (e = 2), e > 3 && "function" == typeof arguments[e - 2]) var r = Xe(arguments[--e - 1], arguments[e--], 5);
                        else e > 2 && "function" == typeof arguments[e - 1] && (r = arguments[--e]);
                        for (var i = 0; ++i < e;) {
                            var o = arguments[i];
                            o && t(n, o, r)
                        }
                        return n
                    }
                }

                function en(t, e) {
                    function n() {
                        return (this instanceof n ? r : t).apply(e, arguments)
                    }
                    var r = rn(t);
                    return n
                }

                function nn(t) {
                    return function(e) {
                        for (var n = -1, r = mo(to(e)), i = r.length, o = ""; ++n < i;) o = t(o, r[n], n);
                        return o
                    }
                }

                function rn(t) {
                    return function() {
                        var e = Ra(t.prototype),
                            n = t.apply(e, arguments);
                        return _i(n) ? n : e
                    }
                }

                function on(t, e) {
                    return function(n, r, i) {
                        i && xn(n, r, i) && (r = null);
                        var o = pn(),
                            a = null == r;
                        if (o === pe && a || (a = !1, r = o(r, i, 3)), a) {
                            var s = ja(n);
                            if (s || !Ii(n)) return t(s ? n : Bn(n));
                            r = u
                        }
                        return dn(n, r, e)
                    }
                }

                function an(t, e, n, r, i, o, a, s, h, u) {
                    function l() {
                        for (var w = arguments.length, b = w, x = Bo(w); b--;) x[b] = arguments[b];
                        if (r && (x = $e(x, r, i)), o && (x = Je(x, o, a)), p || v) {
                            var S = l.placeholder,
                                k = _(x, S);
                            if (w -= k.length, u > w) {
                                var E = s ? Vt(s) : null,
                                    C = ga(u - w, 0),
                                    I = p ? k : null,
                                    R = p ? null : k,
                                    B = p ? x : null,
                                    T = p ? null : x;
                                e |= p ? M : O, e &= ~(p ? O : M), g || (e &= ~(A | L));
                                var D = an(t, e, n, B, I, T, R, E, h, C);
                                return D.placeholder = S, D
                            }
                        }
                        var U = f ? n : this;
                        return d && (t = U[y]), s && (x = An(x, s)), c && h < x.length && (x.length = h), (this instanceof l ? m || rn(t) : t).apply(U, x)
                    }
                    var c = e & U,
                        f = e & A,
                        d = e & L,
                        p = e & B,
                        g = e & R,
                        v = e & T,
                        m = !d && rn(t),
                        y = t;
                    return l
                }

                function sn(t, e, n) {
                    var r = t.length;
                    if (e = +e, r >= e || !da(e)) return "";
                    var i = e - r;
                    return n = null == n ? " " : n + "", ho(n, Qo(i / n.length)).slice(0, i)
                }

                function hn(t, e, n, r) {
                    function i() {
                        for (var e = -1, s = arguments.length, h = -1, u = r.length, l = Bo(s + u); ++h < u;) l[h] = r[h];
                        for (; s--;) l[h++] = arguments[++e];
                        return (this instanceof i ? a : t).apply(o ? n : this, l)
                    }
                    var o = e & A,
                        a = rn(t);
                    return i
                }

                function un(t, e, n, r, i, o, a, s) {
                    var h = e & L;
                    if (!h && !wi(t)) throw new Wo(Z);
                    var u = r ? r.length : 0;
                    if (u || (e &= ~(M | O), r = i = null), u -= i ? i.length : 0, e & O) {
                        var l = r,
                            c = i;
                        r = i = null
                    }
                    var f = !h && Ma(t),
                        d = [t, e, n, r, i, l, c, o, a, s];
                    if (f && f !== !0 && (En(d, f), e = d[1], s = d[9]), d[9] = null == s ? h ? 0 : t.length : ga(s - u, 0) || 0, e == A) var p = en(d[0], d[2]);
                    else p = e != M && e != (A | M) || d[4].length ? an.apply(null, d) : hn.apply(null, d);
                    var g = f ? Ba : Oa;
                    return g(p, d)
                }

                function ln(t, e, n, r, i, o, a) {
                    var s = -1,
                        h = t.length,
                        u = e.length,
                        l = !0;
                    if (h != u && !(i && u > h)) return !1;
                    for (; l && ++s < h;) {
                        var c = t[s],
                            f = e[s];
                        if (l = C, r && (l = i ? r(f, c, s) : r(c, f, s)), "undefined" == typeof l)
                            if (i)
                                for (var d = u; d-- && (f = e[d], !(l = c && c === f || n(c, f, r, i, o, a))););
                            else l = c && c === f || n(c, f, r, i, o, a)
                    }
                    return !!l
                }

                function cn(t, e, n) {
                    switch (n) {
                        case K:
                        case X:
                            return +t == +e;
                        case V:
                            return t.name == e.name && t.message == e.message;
                        case Q:
                            return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
                        case et:
                        case rt:
                            return t == e + ""
                    }
                    return !1
                }

                function fn(t, e, n, r, i, o, a) {
                    var s = qa(t),
                        h = s.length,
                        u = qa(e),
                        l = u.length;
                    if (h != l && !i) return !1;
                    for (var c, f = -1; ++f < h;) {
                        var d = s[f],
                            p = qo.call(e, d);
                        if (p) {
                            var g = t[d],
                                v = e[d];
                            p = C, r && (p = i ? r(v, g, d) : r(g, v, d)), "undefined" == typeof p && (p = g && g === v || n(g, v, r, i, o, a))
                        }
                        if (!p) return !1;
                        c || (c = "constructor" == d)
                    }
                    if (!c) {
                        var m = t.constructor,
                            y = e.constructor;
                        if (m != y && "constructor" in t && "constructor" in e && !("function" == typeof m && m instanceof m && "function" == typeof y && y instanceof y)) return !1
                    }
                    return !0
                }

                function dn(t, e, n) {
                    var r = n ? xa : ba,
                        i = r,
                        o = i;
                    return ye(t, function(t, a, s) {
                        var h = e(t, a, s);
                        ((n ? i > h : h > i) || h === r && h === o) && (i = h, o = t)
                    }), o
                }

                function pn(t, n, r) {
                    var i = e.callback || wo;
                    return i = i === wo ? pe : i, r ? i(t, n, r) : i
                }

                function gn(t, n, r) {
                    var i = e.indexOf || Gn;
                    return i = i === Gn ? a : i, t ? i(t, n, r) : i
                }

                function vn(t, e, n) {
                    for (var r = -1, i = n ? n.length : 0; ++r < i;) {
                        var o = n[r],
                            a = o.size;
                        switch (o.type) {
                            case "drop":
                                t += a;
                                break;
                            case "dropRight":
                                e -= a;
                                break;
                            case "take":
                                e = va(e, t + a);
                                break;
                            case "takeRight":
                                t = ga(t, e - a)
                        }
                    }
                    return {
                        start: t,
                        end: e
                    }
                }

                function mn(t) {
                    var e = t.length,
                        n = new t.constructor(e);
                    return e && "string" == typeof t[0] && qo.call(t, "index") && (n.index = t.index, n.input = t.input), n
                }

                function yn(t) {
                    var e = t.constructor;
                    return "function" == typeof e && e instanceof e || (e = Po), new e
                }

                function wn(t, e, n) {
                    var r = t.constructor;
                    switch (e) {
                        case ot:
                            return Ve(t);
                        case K:
                        case X:
                            return new r(+t);
                        case at:
                        case st:
                        case ht:
                        case ut:
                        case lt:
                        case ct:
                        case ft:
                        case dt:
                        case pt:
                            var i = t.buffer;
                            return new r(n ? Ve(i) : i, t.byteOffset, t.length);
                        case Q:
                        case rt:
                            return new r(t);
                        case et:
                            var o = new r(t.source, Ct.exec(t));
                            o.lastIndex = t.lastIndex
                    }
                    return o
                }

                function _n(t) {
                    var n = e.support,
                        r = !(n.funcNames ? t.name : n.funcDecomp);
                    if (!r) {
                        var i = Zo.call(t);
                        n.funcNames || (r = !It.test(i)), r || (r = Ot.test(i) || Si(t), Ba(t, r))
                    }
                    return r
                }

                function bn(t, e) {
                    return t = +t, e = null == e ? Ia : e, t > -1 && t % 1 == 0 && e > t
                }

                function xn(t, e, n) {
                    if (!_i(n)) return !1;
                    var r = typeof e;
                    if ("number" == r) var i = n.length,
                        o = Sn(i) && bn(e, i);
                    else o = "string" == r && e in n;
                    return o && n[e] === t
                }

                function Sn(t) {
                    return "number" == typeof t && t > -1 && t % 1 == 0 && Ia >= t
                }

                function kn(t) {
                    return t === t && (0 === t ? 1 / t > 0 : !_i(t))
                }

                function En(t, e) {
                    var n = t[1],
                        r = e[1],
                        i = n | r,
                        o = U | D,
                        a = A | L,
                        s = o | a | R | T,
                        h = n & U && !(r & U),
                        u = n & D && !(r & D),
                        l = (u ? t : e)[7],
                        c = (h ? t : e)[8],
                        f = !(n >= D && r > a || n > a && r >= D),
                        d = i >= o && s >= i && (D > n || (u || h) && l.length <= c);
                    if (!f && !d) return t;
                    r & A && (t[2] = e[2], i |= n & A ? 0 : R);
                    var p = e[3];
                    if (p) {
                        var g = t[3];
                        t[3] = g ? $e(g, p, e[4]) : Vt(p), t[4] = g ? _(t[3], G) : Vt(e[4])
                    }
                    return p = e[5], p && (g = t[5], t[5] = g ? Je(g, p, e[6]) : Vt(p), t[6] = g ? _(t[5], G) : Vt(e[6])), p = e[7], p && (t[7] = Vt(p)), r & U && (t[8] = null == t[8] ? e[8] : va(t[8], e[8])), null == t[9] && (t[9] = e[9]), t[0] = e[0], t[1] = i, t
                }

                function Cn(t, e) {
                    t = Tn(t);
                    for (var n = -1, r = e.length, i = {}; ++n < r;) {
                        var o = e[n];
                        o in t && (i[o] = t[o])
                    }
                    return i
                }

                function In(t, e) {
                    var n = {};
                    return Ce(t, function(t, r, i) {
                        e(t, r, i) && (n[r] = t)
                    }), n
                }

                function An(t, e) {
                    for (var n = t.length, r = va(e.length, n), i = Vt(t); r--;) {
                        var o = e[r];
                        t[r] = bn(o, n) ? i[o] : C
                    }
                    return t
                }

                function Ln(t) {
                    {
                        var n;
                        e.support
                    }
                    if (!y(t) || Ko.call(t) != tt || !qo.call(t, "constructor") && (n = t.constructor, "function" == typeof n && !(n instanceof n))) return !1;
                    var r;
                    return Ce(t, function(t, e) {
                        r = e
                    }), "undefined" == typeof r || qo.call(t, r)
                }

                function Rn(t) {
                    for (var n = Hi(t), r = n.length, i = r && t.length, o = e.support, a = i && Sn(i) && (ja(t) || o.nonEnumArgs && fi(t)), s = -1, h = []; ++s < r;) {
                        var u = n[s];
                        (a && bn(u, i) || qo.call(t, u)) && h.push(u)
                    }
                    return h
                }

                function Bn(t) {
                    return null == t ? [] : Sn(t.length) ? _i(t) ? t : Po(t) : Vi(t)
                }

                function Tn(t) {
                    return _i(t) ? t : Po(t)
                }

                function Mn(t, e, n) {
                    e = (n ? xn(t, e, n) : null == e) ? 1 : ga(+e || 1, 1);
                    for (var r = 0, i = t ? t.length : 0, o = -1, a = Bo(Qo(i / e)); i > r;) a[++o] = je(t, r, r += e);
                    return a
                }

                function On(t) {
                    for (var e = -1, n = t ? t.length : 0, r = -1, i = []; ++e < n;) {
                        var o = t[e];
                        o && (i[++r] = o)
                    }
                    return i
                }

                function Dn() {
                    for (var t = -1, e = arguments.length; ++t < e;) {
                        var n = arguments[t];
                        if (ja(n) || fi(n)) break
                    }
                    return me(n, Se(arguments, !1, !0, ++t))
                }

                function Un(t, e, n) {
                    var r = t ? t.length : 0;
                    return r ? ((n ? xn(t, e, n) : null == e) && (e = 1), je(t, 0 > e ? 0 : e)) : []
                }

                function Pn(t, e, n) {
                    var r = t ? t.length : 0;
                    return r ? ((n ? xn(t, e, n) : null == e) && (e = 1), e = r - (+e || 0), je(t, 0, 0 > e ? 0 : e)) : []
                }

                function Fn(t, e, n) {
                    var r = t ? t.length : 0;
                    if (!r) return [];
                    for (e = pn(e, n, 3); r-- && e(t[r], r, t););
                    return je(t, 0, r + 1)
                }

                function zn(t, e, n) {
                    var r = t ? t.length : 0;
                    if (!r) return [];
                    var i = -1;
                    for (e = pn(e, n, 3); ++i < r && e(t[i], i, t););
                    return je(t, i)
                }

                function Wn(t, e, n) {
                    var r = -1,
                        i = t ? t.length : 0;
                    for (e = pn(e, n, 3); ++r < i;)
                        if (e(t[r], r, t)) return r;
                    return -1
                }

                function Nn(t, e, n) {
                    var r = t ? t.length : 0;
                    for (e = pn(e, n, 3); r--;)
                        if (e(t[r], r, t)) return r;
                    return -1
                }

                function jn(t) {
                    return t ? t[0] : C
                }

                function Hn(t, e, n) {
                    var r = t ? t.length : 0;
                    return n && xn(t, e, n) && (e = !1), r ? Se(t, e) : []
                }

                function Zn(t) {
                    var e = t ? t.length : 0;
                    return e ? Se(t, !0) : []
                }

                function Gn(t, e, n) {
                    var r = t ? t.length : 0;
                    if (!r) return -1;
                    if ("number" == typeof n) n = 0 > n ? ga(r + n, 0) : n || 0;
                    else if (n) {
                        var i = Ye(t, e),
                            o = t[i];
                        return (e === e ? e === o : o !== o) ? i : -1
                    }
                    return a(t, e, n)
                }

                function qn(t) {
                    return Pn(t, 1)
                }

                function Yn() {
                    for (var t = [], e = -1, n = arguments.length, r = [], i = gn(), o = i == a; ++e < n;) {
                        var s = arguments[e];
                        (ja(s) || fi(s)) && (t.push(s), r.push(o && s.length >= 120 && Ta(e && s)))
                    }
                    n = t.length;
                    var h = t[0],
                        u = -1,
                        l = h ? h.length : 0,
                        c = [],
                        f = r[0];
                    t: for (; ++u < l;)
                        if (s = h[u], (f ? Yt(f, s) : i(c, s)) < 0) {
                            for (e = n; --e;) {
                                var d = r[e];
                                if ((d ? Yt(d, s) : i(t[e], s)) < 0) continue t
                            }
                            f && f.push(s), c.push(s)
                        }
                    return c
                }

                function Kn(t) {
                    var e = t ? t.length : 0;
                    return e ? t[e - 1] : C
                }

                function Xn(t, e, n) {
                    var r = t ? t.length : 0;
                    if (!r) return -1;
                    var i = r;
                    if ("number" == typeof n) i = (0 > n ? ga(r + n, 0) : va(n || 0, r - 1)) + 1;
                    else if (n) {
                        i = Ye(t, e, !0) - 1;
                        var o = t[i];
                        return (e === e ? e === o : o !== o) ? i : -1
                    }
                    if (e !== e) return m(t, i, !0);
                    for (; i--;)
                        if (t[i] === e) return i;
                    return -1
                }

                function Vn() {
                    var t = arguments[0];
                    if (!t || !t.length) return t;
                    for (var e = 0, n = gn(), r = arguments.length; ++e < r;)
                        for (var i = 0, o = arguments[e];
                            (i = n(t, o, i)) > -1;) sa.call(t, i, 1);
                    return t
                }

                function $n(t) {
                    return ze(t || [], Se(arguments, !1, !1, 1))
                }

                function Jn(t, e, n) {
                    var r = -1,
                        i = t ? t.length : 0,
                        o = [];
                    for (e = pn(e, n, 3); ++r < i;) {
                        var a = t[r];
                        e(a, r, t) && (o.push(a), sa.call(t, r--, 1), i--)
                    }
                    return o
                }

                function Qn(t) {
                    return Un(t, 1)
                }

                function tr(t, e, n) {
                    var r = t ? t.length : 0;
                    return r ? (n && "number" != typeof n && xn(t, e, n) && (e = 0, n = r), je(t, e, n)) : []
                }

                function er(t, e, n, r) {
                    var i = pn(n);
                    return i === pe && null == n ? Ye(t, e) : Ke(t, e, i(n, r, 1))
                }

                function nr(t, e, n, r) {
                    var i = pn(n);
                    return i === pe && null == n ? Ye(t, e, !0) : Ke(t, e, i(n, r, 1), !0)
                }

                function rr(t, e, n) {
                    var r = t ? t.length : 0;
                    return r ? ((n ? xn(t, e, n) : null == e) && (e = 1), je(t, 0, 0 > e ? 0 : e)) : []
                }

                function ir(t, e, n) {
                    var r = t ? t.length : 0;
                    return r ? ((n ? xn(t, e, n) : null == e) && (e = 1), e = r - (+e || 0), je(t, 0 > e ? 0 : e)) : []
                }

                function or(t, e, n) {
                    var r = t ? t.length : 0;
                    if (!r) return [];
                    for (e = pn(e, n, 3); r-- && e(t[r], r, t););
                    return je(t, r + 1)
                }

                function ar(t, e, n) {
                    var r = t ? t.length : 0;
                    if (!r) return [];
                    var i = -1;
                    for (e = pn(e, n, 3); ++i < r && e(t[i], i, t););
                    return je(t, 0, i)
                }

                function sr() {
                    return Ze(Se(arguments, !1, !0))
                }

                function hr(t, e, n, r) {
                    var i = t ? t.length : 0;
                    if (!i) return [];
                    "boolean" != typeof e && null != e && (r = n, n = xn(t, e, r) ? null : e, e = !1);
                    var o = pn();
                    return (o !== pe || null != n) && (n = o(n, r, 3)), e && gn() == a ? b(t, n) : Ze(t, n)
                }

                function ur(t) {
                    for (var e = -1, n = (t && t.length && re(ne(t, Go))) >>> 0, r = Bo(n); ++e < n;) r[e] = ne(t, Fe(e));
                    return r
                }

                function lr(t) {
                    return me(t, je(arguments, 1))
                }

                function cr() {
                    for (var t = -1, e = arguments.length; ++t < e;) {
                        var n = arguments[t];
                        if (ja(n) || fi(n)) var r = r ? me(r, n).concat(me(n, r)) : n
                    }
                    return r ? Ze(r) : []
                }

                function fr() {
                    for (var t = arguments.length, e = Bo(t); t--;) e[t] = arguments[t];
                    return ur(e)
                }

                function dr(t, e) {
                    var n = -1,
                        r = t ? t.length : 0,
                        i = {};
                    for (!r || e || ja(t[0]) || (e = []); ++n < r;) {
                        var o = t[n];
                        e ? i[o] = e[n] : o && (i[o[0]] = o[1])
                    }
                    return i
                }

                function pr(t) {
                    var n = e(t);
                    return n.__chain__ = !0, n
                }

                function gr(t, e, n) {
                    return e.call(n, t), t
                }

                function vr(t, e, n) {
                    return e.call(n, t)
                }

                function mr() {
                    return pr(this)
                }

                function yr() {
                    var t = this.__wrapped__;
                    return t instanceof r ? (this.__actions__.length && (t = new r(this)), new n(t.reverse())) : this.thru(function(t) {
                        return t.reverse()
                    })
                }

                function wr() {
                    return this.value() + ""
                }

                function _r() {
                    return qe(this.__wrapped__, this.__actions__)
                }

                function br(t) {
                    var e = t ? t.length : 0;
                    return Sn(e) && (t = Bn(t)), ce(t, Se(arguments, !1, !1, 1))
                }

                function xr(t, e, n) {
                    var r = t ? t.length : 0;
                    return Sn(r) || (t = Vi(t), r = t.length), r ? (n = "number" == typeof n ? 0 > n ? ga(r + n, 0) : n || 0 : 0, "string" == typeof t || !ja(t) && Ii(t) ? r > n && t.indexOf(e, n) > -1 : gn(t, e, n) > -1) : !1
                }

                function Sr(t, e, n) {
                    var r = ja(t) ? te : _e;
                    return ("function" != typeof e || "undefined" != typeof n) && (e = pn(e, n, 3)), r(t, e)
                }

                function kr(t, e, n) {
                    var r = ja(t) ? ee : be;
                    return e = pn(e, n, 3), r(t, e)
                }

                function Er(t, e, n) {
                    if (ja(t)) {
                        var r = Wn(t, e, n);
                        return r > -1 ? t[r] : C
                    }
                    return e = pn(e, n, 3), xe(t, e, ye)
                }

                function Cr(t, e, n) {
                    return e = pn(e, n, 3), xe(t, e, we)
                }

                function Ir(t, e) {
                    return Er(t, De(e))
                }

                function Ar(t, e, n) {
                    return "function" == typeof e && "undefined" == typeof n && ja(t) ? $t(t, e) : ye(t, Xe(e, n, 3))
                }

                function Lr(t, e, n) {
                    return "function" == typeof e && "undefined" == typeof n && ja(t) ? Qt(t, e) : we(t, Xe(e, n, 3))
                }

                function Rr(t, e) {
                    return Re(t, e, je(arguments, 2))
                }

                function Br(t, e, n) {
                    var r = ja(t) ? ne : Oe;
                    return e = pn(e, n, 3), r(t, e)
                }

                function Tr(t, e) {
                    return Br(t, Fe(e + ""))
                }

                function Mr(t, e, n, r) {
                    var i = ja(t) ? oe : Ne;
                    return i(t, pn(e, r, 4), n, arguments.length < 3, ye)
                }

                function Or(t, e, n, r) {
                    var i = ja(t) ? ae : Ne;
                    return i(t, pn(e, r, 4), n, arguments.length < 3, we)
                }

                function Dr(t, e, n) {
                    var r = ja(t) ? ee : be;
                    return e = pn(e, n, 3), r(t, function(t, n, r) {
                        return !e(t, n, r)
                    })
                }

                function Ur(t, e, n) {
                    if (n ? xn(t, e, n) : null == e) {
                        t = Bn(t);
                        var r = t.length;
                        return r > 0 ? t[We(0, r - 1)] : C
                    }
                    var i = Pr(t);
                    return i.length = va(0 > e ? 0 : +e || 0, i.length), i
                }

                function Pr(t) {
                    t = Bn(t);
                    for (var e = -1, n = t.length, r = Bo(n); ++e < n;) {
                        var i = We(0, e);
                        e != i && (r[e] = r[i]), r[i] = t[e]
                    }
                    return r
                }

                function Fr(t) {
                    var e = t ? t.length : 0;
                    return Sn(e) ? e : qa(t).length
                }

                function zr(t, e, n) {
                    var r = ja(t) ? se : He;
                    return ("function" != typeof e || "undefined" != typeof n) && (e = pn(e, n, 3)), r(t, e)
                }

                function Wr(t, e, n) {
                    var r = -1,
                        i = t ? t.length : 0,
                        o = Sn(i) ? Bo(i) : [];
                    return n && xn(t, e, n) && (e = null), e = pn(e, n, 3), ye(t, function(t, n, i) {
                        o[++r] = {
                            criteria: e(t, n, i),
                            index: r,
                            value: t
                        }
                    }), s(o, f)
                }

                function Nr(t) {
                    var e = arguments;
                    e.length > 3 && xn(e[1], e[2], e[3]) && (e = [t, e[1]]);
                    var n = -1,
                        r = t ? t.length : 0,
                        i = Se(e, !1, !1, 1),
                        o = Sn(r) ? Bo(r) : [];
                    return ye(t, function(t, e, r) {
                        for (var a = i.length, s = Bo(a); a--;) s[a] = null == t ? C : t[i[a]];
                        o[++n] = {
                            criteria: s,
                            index: n,
                            value: t
                        }
                    }), s(o, d)
                }

                function jr(t, e) {
                    return kr(t, De(e))
                }

                function Hr(t, e) {
                    if (!wi(e)) {
                        if (!wi(t)) throw new Wo(Z);
                        var n = t;
                        t = e, e = n
                    }
                    return t = da(t = +t) ? t : 0,
                        function() {
                            return --t < 1 ? e.apply(this, arguments) : void 0
                        }
                }

                function Zr(t, e, n) {
                    return n && xn(t, e, n) && (e = null), e = t && null == e ? t.length : ga(+e || 0, 0), un(t, U, null, null, null, null, e)
                }

                function Gr(t, e) {
                    var n;
                    if (!wi(e)) {
                        if (!wi(t)) throw new Wo(Z);
                        var r = t;
                        t = e, e = r
                    }
                    return function() {
                        return --t > 0 ? n = e.apply(this, arguments) : e = null, n
                    }
                }

                function qr(t, e) {
                    var n = A;
                    if (arguments.length > 2) {
                        var r = je(arguments, 2),
                            i = _(r, qr.placeholder);
                        n |= M
                    }
                    return un(t, n, e, r, i)
                }

                function Yr(t) {
                    return de(t, arguments.length > 1 ? Se(arguments, !1, !1, 1) : Wi(t))
                }

                function Kr(t, e) {
                    var n = A | L;
                    if (arguments.length > 2) {
                        var r = je(arguments, 2),
                            i = _(r, Kr.placeholder);
                        n |= M
                    }
                    return un(e, n, t, r, i)
                }

                function Xr(t, e, n) {
                    n && xn(t, e, n) && (e = null);
                    var r = un(t, B, null, null, null, null, null, e);
                    return r.placeholder = Xr.placeholder, r
                }

                function Vr(t, e, n) {
                    n && xn(t, e, n) && (e = null);
                    var r = un(t, T, null, null, null, null, null, e);
                    return r.placeholder = Vr.placeholder, r
                }

                function $r(t, e, n) {
                    function r() {
                        f && ta(f), h && ta(h), h = f = d = C
                    }

                    function i() {
                        var n = e - (Na() - l);
                        if (0 >= n || n > e) {
                            h && ta(h);
                            var r = d;
                            h = f = d = C, r && (p = Na(), u = t.apply(c, s), f || h || (s = c = null))
                        } else f = aa(i, n)
                    }

                    function o() {
                        f && ta(f), h = f = d = C, (v || g !== e) && (p = Na(), u = t.apply(c, s), f || h || (s = c = null))
                    }

                    function a() {
                        if (s = arguments, l = Na(), c = this, d = v && (f || !m), g === !1) var n = m && !f;
                        else {
                            h || m || (p = l);
                            var r = g - (l - p),
                                a = 0 >= r || r > g;
                            a ? (h && (h = ta(h)), p = l, u = t.apply(c, s)) : h || (h = aa(o, r))
                        }
                        return a && f ? f = ta(f) : f || e === g || (f = aa(i, e)), n && (a = !0, u = t.apply(c, s)), !a || f || h || (s = c = null), u
                    }
                    var s, h, u, l, c, f, d, p = 0,
                        g = !1,
                        v = !0;
                    if (!wi(t)) throw new Wo(Z);
                    if (e = 0 > e ? 0 : e, n === !0) {
                        var m = !0;
                        v = !1
                    } else _i(n) && (m = n.leading, g = "maxWait" in n && ga(+n.maxWait || 0, e), v = "trailing" in n ? n.trailing : v);
                    return a.cancel = r, a
                }

                function Jr(t) {
                    return ve(t, 1, arguments, 1)
                }

                function Qr(t, e) {
                    return ve(t, e, arguments, 2)
                }

                function ti() {
                    var t = arguments,
                        e = t.length;
                    if (!e) return function() {};
                    if (!te(t, wi)) throw new Wo(Z);
                    return function() {
                        for (var n = 0, r = t[n].apply(this, arguments); ++n < e;) r = t[n].call(this, r);
                        return r
                    }
                }

                function ei() {
                    var t = arguments,
                        e = t.length - 1;
                    if (0 > e) return function() {};
                    if (!te(t, wi)) throw new Wo(Z);
                    return function() {
                        for (var n = e, r = t[n].apply(this, arguments); n--;) r = t[n].call(this, r);
                        return r
                    }
                }

                function ni(t, e) {
                    if (!wi(t) || e && !wi(e)) throw new Wo(Z);
                    var n = function() {
                        var r = n.cache,
                            i = e ? e.apply(this, arguments) : arguments[0];
                        if (r.has(i)) return r.get(i);
                        var o = t.apply(this, arguments);
                        return r.set(i, o), o
                    };
                    return n.cache = new ni.Cache, n
                }

                function ri(t) {
                    if (!wi(t)) throw new Wo(Z);
                    return function() {
                        return !t.apply(this, arguments)
                    }
                }

                function ii(t) {
                    return Gr(t, 2)
                }

                function oi(t) {
                    var e = je(arguments, 1),
                        n = _(e, oi.placeholder);
                    return un(t, M, null, e, n)
                }

                function ai(t) {
                    var e = je(arguments, 1),
                        n = _(e, ai.placeholder);
                    return un(t, O, null, e, n)
                }

                function si(t) {
                    var e = Se(arguments, !1, !1, 1);
                    return un(t, D, null, null, null, e)
                }

                function hi(t, e, n) {
                    var r = !0,
                        i = !0;
                    if (!wi(t)) throw new Wo(Z);
                    return n === !1 ? r = !1 : _i(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), jt.leading = r, jt.maxWait = +e, jt.trailing = i, $r(t, e, jt)
                }

                function ui(t, e) {
                    return e = null == e ? bo : e, un(e, M, null, [t], [])
                }

                function li(t, e, n, r) {
                    return "boolean" != typeof e && null != e && (r = n, n = xn(t, e, r) ? null : e, e = !1), n = "function" == typeof n && Xe(n, r, 1), ge(t, e, n)
                }

                function ci(t, e, n) {
                    return e = "function" == typeof e && Xe(e, n, 1), ge(t, !0, e)
                }

                function fi(t) {
                    var e = y(t) ? t.length : C;
                    return Sn(e) && Ko.call(t) == q || !1
                }

                function di(t) {
                    return t === !0 || t === !1 || y(t) && Ko.call(t) == K || !1
                }

                function pi(t) {
                    return y(t) && Ko.call(t) == X || !1
                }

                function gi(t) {
                    return t && 1 === t.nodeType && y(t) && Ko.call(t).indexOf("Element") > -1 || !1
                }

                function vi(t) {
                    if (null == t) return !0;
                    var e = t.length;
                    return Sn(e) && (ja(t) || Ii(t) || fi(t) || y(t) && wi(t.splice)) ? !e : !qa(t).length
                }

                function mi(t, e, n, r) {
                    if (n = "function" == typeof n && Xe(n, r, 3), !n && kn(t) && kn(e)) return t === e;
                    var i = n ? n(t, e) : C;
                    return "undefined" == typeof i ? Be(t, e, n) : !!i
                }

                function yi(t) {
                    return y(t) && "string" == typeof t.message && Ko.call(t) == V || !1
                }

                function wi(t) {
                    return "function" == typeof t || !1
                }

                function _i(t) {
                    var e = typeof t;
                    return "function" == e || t && "object" == e || !1
                }

                function bi(t, e, n, r) {
                    var i = qa(e),
                        o = i.length;
                    if (n = "function" == typeof n && Xe(n, r, 3), !n && 1 == o) {
                        var a = i[0],
                            s = e[a];
                        if (kn(s)) return null != t && s === t[a] && qo.call(t, a)
                    }
                    for (var h = Bo(o), u = Bo(o); o--;) s = h[o] = e[i[o]], u[o] = kn(s);
                    return Me(t, i, h, u, n)
                }

                function xi(t) {
                    return Ei(t) && t != +t
                }

                function Si(t) {
                    return null == t ? !1 : Ko.call(t) == $ ? Vo.test(Zo.call(t)) : y(t) && Lt.test(t) || !1
                }

                function ki(t) {
                    return null === t
                }

                function Ei(t) {
                    return "number" == typeof t || y(t) && Ko.call(t) == Q || !1
                }

                function Ci(t) {
                    return y(t) && Ko.call(t) == et || !1
                }

                function Ii(t) {
                    return "string" == typeof t || y(t) && Ko.call(t) == rt || !1
                }

                function Ai(t) {
                    return y(t) && Sn(t.length) && Wt[Ko.call(t)] || !1
                }

                function Li(t) {
                    return "undefined" == typeof t
                }

                function Ri(t) {
                    var e = t ? t.length : 0;
                    return Sn(e) ? e ? Vt(t) : [] : Vi(t)
                }

                function Bi(t) {
                    return fe(t, Hi(t))
                }

                function Ti(t, e, n) {
                    var r = Ra(t);
                    return n && xn(t, e, n) && (e = null), e ? fe(e, r, qa(e)) : r
                }

                function Mi(t) {
                    if (null == t) return t;
                    var e = Vt(arguments);
                    return e.push(he), Ga.apply(C, e)
                }

                function Oi(t, e, n) {
                    return e = pn(e, n, 3), xe(t, e, Ie, !0)
                }

                function Di(t, e, n) {
                    return e = pn(e, n, 3), xe(t, e, Ae, !0)
                }

                function Ui(t, e, n) {
                    return ("function" != typeof e || "undefined" != typeof n) && (e = Xe(e, n, 3)), ke(t, e, Hi)
                }

                function Pi(t, e, n) {
                    return e = Xe(e, n, 3), Ee(t, e, Hi)
                }

                function Fi(t, e, n) {
                    return ("function" != typeof e || "undefined" != typeof n) && (e = Xe(e, n, 3)), Ie(t, e)
                }

                function zi(t, e, n) {
                    return e = Xe(e, n, 3), Ee(t, e, qa)
                }

                function Wi(t) {
                    return Le(t, Hi(t))
                }

                function Ni(t, e) {
                    return t ? qo.call(t, e) : !1
                }

                function ji(t, e, n) {
                    n && xn(t, e, n) && (e = null);
                    for (var r = -1, i = qa(t), o = i.length, a = {}; ++r < o;) {
                        var s = i[r],
                            h = t[s];
                        e ? qo.call(a, h) ? a[h].push(s) : a[h] = [s] : a[h] = s
                    }
                    return a
                }

                function Hi(t) {
                    if (null == t) return [];
                    _i(t) || (t = Po(t));
                    var e = t.length;
                    e = e && Sn(e) && (ja(t) || La.nonEnumArgs && fi(t)) && e || 0;
                    for (var n = t.constructor, r = -1, i = "function" == typeof n && n.prototype == t, o = Bo(e), a = e > 0; ++r < e;) o[r] = r + "";
                    for (var s in t) a && bn(s, e) || "constructor" == s && (i || !qo.call(t, s)) || o.push(s);
                    return o
                }

                function Zi(t, e, n) {
                    var r = {};
                    return e = pn(e, n, 3), Ie(t, function(t, n, i) {
                        r[n] = e(t, n, i)
                    }), r
                }

                function Gi(t, e, n) {
                    if (null == t) return {};
                    if ("function" != typeof e) {
                        var r = ne(Se(arguments, !1, !1, 1), zo);
                        return Cn(t, me(Hi(t), r))
                    }
                    return e = Xe(e, n, 3), In(t, function(t, n, r) {
                        return !e(t, n, r)
                    })
                }

                function qi(t) {
                    for (var e = -1, n = qa(t), r = n.length, i = Bo(r); ++e < r;) {
                        var o = n[e];
                        i[e] = [o, t[o]]
                    }
                    return i
                }

                function Yi(t, e, n) {
                    return null == t ? {} : "function" == typeof e ? In(t, Xe(e, n, 3)) : Cn(t, Se(arguments, !1, !1, 1))
                }

                function Ki(t, e, n) {
                    var r = null == t ? C : t[e];
                    return "undefined" == typeof r && (r = n), wi(r) ? r.call(t) : r
                }

                function Xi(t, e, n, r) {
                    var i = ja(t) || Ai(t);
                    if (e = pn(e, r, 4), null == n)
                        if (i || _i(t)) {
                            var o = t.constructor;
                            n = i ? ja(t) ? new o : [] : Ra("function" == typeof o && o.prototype)
                        } else n = {};
                    return (i ? $t : Ie)(t, function(t, r, i) {
                        return e(n, t, r, i)
                    }), n
                }

                function Vi(t) {
                    return Ge(t, qa(t))
                }

                function $i(t) {
                    return Ge(t, Hi(t))
                }

                function Ji(t, e, n) {
                    n && xn(t, e, n) && (e = n = null);
                    var r = null == t,
                        i = null == e;
                    if (null == n && (i && "boolean" == typeof t ? (n = t, t = 1) : "boolean" == typeof e && (n = e, i = !0)), r && i && (e = 1, i = !1), t = +t || 0, i ? (e = t, t = 0) : e = +e || 0, n || t % 1 || e % 1) {
                        var o = _a();
                        return va(t + o * (e - t + parseFloat("1e-" + ((o + "").length - 1))), e)
                    }
                    return We(t, e)
                }

                function Qi(t) {
                    return t = h(t), t && t.charAt(0).toUpperCase() + t.slice(1)
                }

                function to(t) {
                    return t = h(t), t && t.replace(Rt, p)
                }

                function eo(t, e, n) {
                    t = h(t), e += "";
                    var r = t.length;
                    return n = ("undefined" == typeof n ? r : va(0 > n ? 0 : +n || 0, r)) - e.length, n >= 0 && t.indexOf(e, n) == n
                }

                function no(t) {
                    return t = h(t), t && bt.test(t) ? t.replace(wt, g) : t
                }

                function ro(t) {
                    return t = h(t), t && Mt.test(t) ? t.replace(Tt, "\\$&") : t
                }

                function io(t, e, n) {
                    t = h(t), e = +e;
                    var r = t.length;
                    if (r >= e || !da(e)) return t;
                    var i = (e - r) / 2,
                        o = ea(i),
                        a = Qo(i);
                    return n = sn("", a, n), n.slice(0, o) + t + n
                }

                function oo(t, e, n) {
                    return t = h(t), t && sn(t, e, n) + t
                }

                function ao(t, e, n) {
                    return t = h(t), t && t + sn(t, e, n)
                }

                function so(t, e, n) {
                    return n && xn(t, e, n) && (e = 0), wa(t, e)
                }

                function ho(t, e) {
                    var n = "";
                    if (t = h(t), e = +e, 1 > e || !t || !da(e)) return n;
                    do e % 2 && (n += t), e = ea(e / 2), t += t; while (e);
                    return n
                }

                function uo(t, e, n) {
                    return t = h(t), n = null == n ? 0 : va(0 > n ? 0 : +n || 0, t.length), t.lastIndexOf(e, n) == n
                }

                function lo(t, n, r) {
                    var i = e.templateSettings;
                    r && xn(t, n, r) && (n = r = null), t = h(t), n = le(le({}, r || n), i, ue);
                    var o, a, s = le(le({}, n.imports), i.imports, ue),
                        u = qa(s),
                        l = Ge(s, u),
                        c = 0,
                        f = n.interpolate || Bt,
                        d = "__p += '",
                        p = Fo((n.escape || Bt).source + "|" + f.source + "|" + (f === kt ? Et : Bt).source + "|" + (n.evaluate || Bt).source + "|$", "g"),
                        g = "//# sourceURL=" + ("sourceURL" in n ? n.sourceURL : "lodash.templateSources[" + ++zt + "]") + "\n";
                    t.replace(p, function(e, n, r, i, s, h) {
                        return r || (r = i), d += t.slice(c, h).replace(Dt, v), n && (o = !0, d += "' +\n__e(" + n + ") +\n'"), s && (a = !0, d += "';\n" + s + ";\n__p += '"), r && (d += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), c = h + e.length, e
                    }), d += "';\n";
                    var m = n.variable;
                    m || (d = "with (obj) {\n" + d + "\n}\n"), d = (a ? d.replace(gt, "") : d).replace(vt, "$1").replace(mt, "$1;"), d = "function(" + (m || "obj") + ") {\n" + (m ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (o ? ", __e = _.escape" : "") + (a ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + d + "return __p\n}";
                    var y = yo(function() {
                        return Oo(u, g + "return " + d).apply(C, l)
                    });
                    if (y.source = d, yi(y)) throw y;
                    return y
                }

                function co(t, e, n) {
                    var r = t;
                    return (t = h(t)) ? (n ? xn(r, e, n) : null == e) ? t.slice(x(t), S(t) + 1) : (e += "", t.slice(l(t, e), c(t, e) + 1)) : t
                }

                function fo(t, e, n) {
                    var r = t;
                    return t = h(t), t ? t.slice((n ? xn(r, e, n) : null == e) ? x(t) : l(t, e + "")) : t
                }

                function po(t, e, n) {
                    var r = t;
                    return t = h(t), t ? (n ? xn(r, e, n) : null == e) ? t.slice(0, S(t) + 1) : t.slice(0, c(t, e + "") + 1) : t
                }

                function go(t, e, n) {
                    n && xn(t, e, n) && (e = null);
                    var r = P,
                        i = F;
                    if (null != e)
                        if (_i(e)) {
                            var o = "separator" in e ? e.separator : o;
                            r = "length" in e ? +e.length || 0 : r, i = "omission" in e ? h(e.omission) : i
                        } else r = +e || 0;
                    if (t = h(t), r >= t.length) return t;
                    var a = r - i.length;
                    if (1 > a) return i;
                    var s = t.slice(0, a);
                    if (null == o) return s + i;
                    if (Ci(o)) {
                        if (t.slice(a).search(o)) {
                            var u, l, c = t.slice(0, a);
                            for (o.global || (o = Fo(o.source, (Ct.exec(o) || "") + "g")), o.lastIndex = 0; u = o.exec(c);) l = u.index;
                            s = s.slice(0, null == l ? a : l)
                        }
                    } else if (t.indexOf(o, a) != a) {
                        var f = s.lastIndexOf(o);
                        f > -1 && (s = s.slice(0, f))
                    }
                    return s + i
                }

                function vo(t) {
                    return t = h(t), t && _t.test(t) ? t.replace(yt, k) : t
                }

                function mo(t, e, n) {
                    return n && xn(t, e, n) && (e = null), t = h(t), t.match(e || Ut) || []
                }

                function yo(t) {
                    try {
                        return t()
                    } catch (e) {
                        return yi(e) ? e : Mo(e)
                    }
                }

                function wo(t, e, n) {
                    return n && xn(t, e, n) && (e = null), y(t) ? xo(t) : pe(t, e)
                }

                function _o(t) {
                    return function() {
                        return t
                    }
                }

                function bo(t) {
                    return t
                }

                function xo(t) {
                    return De(ge(t, !0))
                }

                function So(t, e, n) {
                    if (null == n) {
                        var r = _i(e),
                            i = r && qa(e),
                            o = i && i.length && Le(e, i);
                        (o ? o.length : r) || (o = !1, n = e, e = t, t = this)
                    }
                    o || (o = Le(e, qa(e)));
                    var a = !0,
                        s = -1,
                        h = wi(t),
                        u = o.length;
                    n === !1 ? a = !1 : _i(n) && "chain" in n && (a = n.chain);
                    for (; ++s < u;) {
                        var l = o[s],
                            c = e[l];
                        t[l] = c, h && (t.prototype[l] = function(e) {
                            return function() {
                                var n = this.__chain__;
                                if (a || n) {
                                    var r = t(this.__wrapped__);
                                    return (r.__actions__ = Vt(this.__actions__)).push({
                                        func: e,
                                        args: arguments,
                                        thisArg: t
                                    }), r.__chain__ = n, r
                                }
                                var i = [this.value()];
                                return ra.apply(i, arguments), e.apply(t, i)
                            }
                        }(c))
                    }
                    return t
                }

                function ko() {
                    return t._ = Xo, this
                }

                function Eo() {}

                function Co(t) {
                    return Fe(t + "")
                }

                function Io(t) {
                    return function(e) {
                        return null == t ? C : t[e]
                    }
                }

                function Ao(t, e, n) {
                    n && xn(t, e, n) && (e = n = null), t = +t || 0, n = null == n ? 1 : +n || 0, null == e ? (e = t, t = 0) : e = +e || 0;
                    for (var r = -1, i = ga(Qo((e - t) / (n || 1)), 0), o = Bo(i); ++r < i;) o[r] = t, t += n;
                    return o
                }

                function Lo(t, e, n) {
                    if (t = +t, 1 > t || !da(t)) return [];
                    var r = -1,
                        i = Bo(va(t, Sa));
                    for (e = Xe(e, n, 1); ++r < t;) Sa > r ? i[r] = e(r) : e(r);
                    return i
                }

                function Ro(t) {
                    var e = ++Yo;
                    return h(t) + e
                }
                t = t ? Jt.defaults(Kt.Object(), t, Jt.pick(Kt, Ft)) : Kt;
                var Bo = t.Array,
                    To = t.Date,
                    Mo = t.Error,
                    Oo = t.Function,
                    Do = t.Math,
                    Uo = t.Number,
                    Po = t.Object,
                    Fo = t.RegExp,
                    zo = t.String,
                    Wo = t.TypeError,
                    No = Bo.prototype,
                    jo = Po.prototype,
                    Ho = (Ho = t.window) && Ho.document,
                    Zo = Oo.prototype.toString,
                    Go = Fe("length"),
                    qo = jo.hasOwnProperty,
                    Yo = 0,
                    Ko = jo.toString,
                    Xo = t._,
                    Vo = Fo("^" + ro(Ko).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                    $o = Si($o = t.ArrayBuffer) && $o,
                    Jo = Si(Jo = $o && new $o(0).slice) && Jo,
                    Qo = Do.ceil,
                    ta = t.clearTimeout,
                    ea = Do.floor,
                    na = Si(na = Po.getPrototypeOf) && na,
                    ra = No.push,
                    ia = jo.propertyIsEnumerable,
                    oa = Si(oa = t.Set) && oa,
                    aa = t.setTimeout,
                    sa = No.splice,
                    ha = Si(ha = t.Uint8Array) && ha,
                    ua = (No.unshift, Si(ua = t.WeakMap) && ua),
                    la = function() {
                        try {
                            var e = Si(e = t.Float64Array) && e,
                                n = new e(new $o(10), 0, 1) && e
                        } catch (r) {}
                        return n
                    }(),
                    ca = Si(ca = Bo.isArray) && ca,
                    fa = Si(fa = Po.create) && fa,
                    da = t.isFinite,
                    pa = Si(pa = Po.keys) && pa,
                    ga = Do.max,
                    va = Do.min,
                    ma = Si(ma = To.now) && ma,
                    ya = Si(ya = Uo.isFinite) && ya,
                    wa = t.parseInt,
                    _a = Do.random,
                    ba = Uo.NEGATIVE_INFINITY,
                    xa = Uo.POSITIVE_INFINITY,
                    Sa = Do.pow(2, 32) - 1,
                    ka = Sa - 1,
                    Ea = Sa >>> 1,
                    Ca = la ? la.BYTES_PER_ELEMENT : 0,
                    Ia = Do.pow(2, 53) - 1,
                    Aa = ua && new ua,
                    La = e.support = {};
                ! function(e) {
                    La.funcDecomp = !Si(t.WinRTError) && Ot.test(E), La.funcNames = "string" == typeof Oo.name;
                    try {
                        La.dom = 11 === Ho.createDocumentFragment().nodeType
                    } catch (n) {
                        La.dom = !1
                    }
                    try {
                        La.nonEnumArgs = !ia.call(arguments, 1)
                    } catch (n) {
                        La.nonEnumArgs = !0
                    }
                }(0, 0), e.templateSettings = {
                    escape: xt,
                    evaluate: St,
                    interpolate: kt,
                    variable: "",
                    imports: {
                        _: e
                    }
                };
                var Ra = function() {
                        function e() {}
                        return function(n) {
                            if (_i(n)) {
                                e.prototype = n;
                                var r = new e;
                                e.prototype = null
                            }
                            return r || t.Object()
                        }
                    }(),
                    Ba = Aa ? function(t, e) {
                        return Aa.set(t, e), t
                    } : bo;
                Jo || (Ve = $o && ha ? function(t) {
                    var e = t.byteLength,
                        n = la ? ea(e / Ca) : 0,
                        r = n * Ca,
                        i = new $o(e);
                    if (n) {
                        var o = new la(i, 0, n);
                        o.set(new la(t, 0, n))
                    }
                    return e != r && (o = new ha(i, r), o.set(new ha(t, r))), i
                } : _o(null));
                var Ta = fa && oa ? function(t) {
                        return new qt(t)
                    } : _o(null),
                    Ma = Aa ? function(t) {
                        return Aa.get(t)
                    } : Eo,
                    Oa = function() {
                        var t = 0,
                            e = 0;
                        return function(n, r) {
                            var i = Na(),
                                o = W - (i - e);
                            if (e = i, o > 0) {
                                if (++t >= z) return n
                            } else t = 0;
                            return Ba(n, r)
                        }
                    }(),
                    Da = Qe(function(t, e, n) {
                        qo.call(t, n) ? ++t[n] : t[n] = 1
                    }),
                    Ua = Qe(function(t, e, n) {
                        qo.call(t, n) ? t[n].push(e) : t[n] = [e]
                    }),
                    Pa = Qe(function(t, e, n) {
                        t[n] = e
                    }),
                    Fa = on(re),
                    za = on(ie, !0),
                    Wa = Qe(function(t, e, n) {
                        t[n ? 0 : 1].push(e)
                    }, function() {
                        return [
                            [],
                            []
                        ]
                    }),
                    Na = ma || function() {
                        return (new To).getTime()
                    },
                    ja = ca || function(t) {
                        return y(t) && Sn(t.length) && Ko.call(t) == Y || !1
                    };
                La.dom || (gi = function(t) {
                    return t && 1 === t.nodeType && y(t) && !Za(t) || !1
                });
                var Ha = ya || function(t) {
                    return "number" == typeof t && da(t)
                };
                (wi(/x/) || ha && !wi(ha)) && (wi = function(t) {
                    return Ko.call(t) == $
                });
                var Za = na ? function(t) {
                        if (!t || Ko.call(t) != tt) return !1;
                        var e = t.valueOf,
                            n = Si(e) && (n = na(e)) && na(n);
                        return n ? t == n || na(t) == n : Ln(t)
                    } : Ln,
                    Ga = tn(le),
                    qa = pa ? function(t) {
                        if (t) var e = t.constructor,
                            n = t.length;
                        return "function" == typeof e && e.prototype === t || "function" != typeof t && n && Sn(n) ? Rn(t) : _i(t) ? pa(t) : []
                    } : Rn,
                    Ya = tn(Ue),
                    Ka = nn(function(t, e, n) {
                        return e = e.toLowerCase(), t + (n ? e.charAt(0).toUpperCase() + e.slice(1) : e)
                    }),
                    Xa = nn(function(t, e, n) {
                        return t + (n ? "-" : "") + e.toLowerCase()
                    });
                8 != wa(Pt + "08") && (so = function(t, e, n) {
                    return (n ? xn(t, e, n) : null == e) ? e = 0 : e && (e = +e), t = co(t), wa(t, e || (At.test(t) ? 16 : 10))
                });
                var Va = nn(function(t, e, n) {
                        return t + (n ? "_" : "") + e.toLowerCase()
                    }),
                    $a = nn(function(t, e, n) {
                        return t + (n ? " " : "") + (e.charAt(0).toUpperCase() + e.slice(1))
                    });
                return n.prototype = e.prototype, nt.prototype["delete"] = it, nt.prototype.get = Ht, nt.prototype.has = Zt, nt.prototype.set = Gt, qt.prototype.push = Xt, ni.Cache = nt, e.after = Hr, e.ary = Zr, e.assign = Ga, e.at = br, e.before = Gr, e.bind = qr, e.bindAll = Yr, e.bindKey = Kr, e.callback = wo, e.chain = pr, e.chunk = Mn, e.compact = On, e.constant = _o, e.countBy = Da, e.create = Ti, e.curry = Xr, e.curryRight = Vr, e.debounce = $r, e.defaults = Mi, e.defer = Jr, e.delay = Qr, e.difference = Dn, e.drop = Un, e.dropRight = Pn, e.dropRightWhile = Fn, e.dropWhile = zn, e.filter = kr, e.flatten = Hn, e.flattenDeep = Zn, e.flow = ti, e.flowRight = ei, e.forEach = Ar, e.forEachRight = Lr, e.forIn = Ui, e.forInRight = Pi, e.forOwn = Fi, e.forOwnRight = zi, e.functions = Wi, e.groupBy = Ua, e.indexBy = Pa, e.initial = qn, e.intersection = Yn, e.invert = ji, e.invoke = Rr, e.keys = qa, e.keysIn = Hi, e.map = Br, e.mapValues = Zi, e.matches = xo, e.memoize = ni, e.merge = Ya, e.mixin = So, e.negate = ri, e.omit = Gi, e.once = ii, e.pairs = qi, e.partial = oi, e.partialRight = ai, e.partition = Wa, e.pick = Yi,
                    e.pluck = Tr, e.property = Co, e.propertyOf = Io, e.pull = Vn, e.pullAt = $n, e.range = Ao, e.rearg = si, e.reject = Dr, e.remove = Jn, e.rest = Qn, e.shuffle = Pr, e.slice = tr, e.sortBy = Wr, e.sortByAll = Nr, e.take = rr, e.takeRight = ir, e.takeRightWhile = or, e.takeWhile = ar, e.tap = gr, e.throttle = hi, e.thru = vr, e.times = Lo, e.toArray = Ri, e.toPlainObject = Bi, e.transform = Xi, e.union = sr, e.uniq = hr, e.unzip = ur, e.values = Vi, e.valuesIn = $i, e.where = jr, e.without = lr, e.wrap = ui, e.xor = cr, e.zip = fr, e.zipObject = dr, e.backflow = ei, e.collect = Br, e.compose = ei, e.each = Ar, e.eachRight = Lr, e.extend = Ga, e.iteratee = wo, e.methods = Wi, e.object = dr, e.select = kr, e.tail = Qn, e.unique = hr, So(e, e), e.attempt = yo, e.camelCase = Ka, e.capitalize = Qi, e.clone = li, e.cloneDeep = ci, e.deburr = to, e.endsWith = eo, e.escape = no, e.escapeRegExp = ro, e.every = Sr, e.find = Er, e.findIndex = Wn, e.findKey = Oi, e.findLast = Cr, e.findLastIndex = Nn, e.findLastKey = Di, e.findWhere = Ir, e.first = jn, e.has = Ni, e.identity = bo, e.includes = xr, e.indexOf = Gn, e.isArguments = fi, e.isArray = ja, e.isBoolean = di, e.isDate = pi, e.isElement = gi, e.isEmpty = vi, e.isEqual = mi, e.isError = yi, e.isFinite = Ha, e.isFunction = wi, e.isMatch = bi, e.isNaN = xi, e.isNative = Si, e.isNull = ki, e.isNumber = Ei, e.isObject = _i, e.isPlainObject = Za, e.isRegExp = Ci, e.isString = Ii, e.isTypedArray = Ai, e.isUndefined = Li, e.kebabCase = Xa, e.last = Kn, e.lastIndexOf = Xn, e.max = Fa, e.min = za, e.noConflict = ko, e.noop = Eo, e.now = Na, e.pad = io, e.padLeft = oo, e.padRight = ao, e.parseInt = so, e.random = Ji, e.reduce = Mr, e.reduceRight = Or, e.repeat = ho, e.result = Ki, e.runInContext = E, e.size = Fr, e.snakeCase = Va, e.some = zr, e.sortedIndex = er, e.sortedLastIndex = nr, e.startCase = $a, e.startsWith = uo, e.template = lo, e.trim = co, e.trimLeft = fo, e.trimRight = po, e.trunc = go, e.unescape = vo, e.uniqueId = Ro, e.words = mo, e.all = Sr, e.any = zr, e.contains = xr, e.detect = Er, e.foldl = Mr, e.foldr = Or, e.head = jn, e.include = xr, e.inject = Mr, So(e, function() {
                        var t = {};
                        return Ie(e, function(n, r) {
                            e.prototype[r] || (t[r] = n)
                        }), t
                    }(), !1), e.sample = Ur, e.prototype.sample = function(t) {
                        return this.__chain__ || null != t ? this.thru(function(e) {
                            return Ur(e, t)
                        }) : Ur(this.value())
                    }, e.VERSION = I, $t(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
                        e[t].placeholder = e
                    }), $t(["filter", "map", "takeWhile"], function(t, e) {
                        var n = e == N;
                        r.prototype[t] = function(t, r) {
                            var i = this.clone(),
                                o = i.filtered,
                                a = i.iteratees || (i.iteratees = []);
                            return i.filtered = o || n || e == H && i.dir < 0, a.push({
                                iteratee: pn(t, r, 3),
                                type: e
                            }), i
                        }
                    }), $t(["drop", "take"], function(t, e) {
                        var n = t + "Count",
                            i = t + "While";
                        r.prototype[t] = function(r) {
                            r = null == r ? 1 : ga(+r || 0, 0);
                            var i = this.clone();
                            if (i.filtered) {
                                var o = i[n];
                                i[n] = e ? va(o, r) : o + r
                            } else {
                                var a = i.views || (i.views = []);
                                a.push({
                                    size: r,
                                    type: t + (i.dir < 0 ? "Right" : "")
                                })
                            }
                            return i
                        }, r.prototype[t + "Right"] = function(e) {
                            return this.reverse()[t](e).reverse()
                        }, r.prototype[t + "RightWhile"] = function(t, e) {
                            return this.reverse()[i](t, e).reverse()
                        }
                    }), $t(["first", "last"], function(t, e) {
                        var n = "take" + (e ? "Right" : "");
                        r.prototype[t] = function() {
                            return this[n](1).value()[0]
                        }
                    }), $t(["initial", "rest"], function(t, e) {
                        var n = "drop" + (e ? "" : "Right");
                        r.prototype[t] = function() {
                            return this[n](1)
                        }
                    }), $t(["pluck", "where"], function(t, e) {
                        var n = e ? "filter" : "map",
                            i = e ? De : Fe;
                        r.prototype[t] = function(t) {
                            return this[n](i(e ? t : t + ""))
                        }
                    }), r.prototype.dropWhile = function(t, e) {
                        var n, r, i = this.dir < 0;
                        return t = pn(t, e, 3), this.filter(function(e, o, a) {
                            return n = n && (i ? r > o : o > r), r = o, n || (n = !t(e, o, a))
                        })
                    }, r.prototype.reject = function(t, e) {
                        return t = pn(t, e, 3), this.filter(function(e, n, r) {
                            return !t(e, n, r)
                        })
                    }, r.prototype.slice = function(t, e) {
                        t = null == t ? 0 : +t || 0;
                        var n = 0 > t ? this.takeRight(-t) : this.drop(t);
                        return "undefined" != typeof e && (e = +e || 0, n = 0 > e ? n.dropRight(-e) : n.take(e - t)), n
                    }, Ie(r.prototype, function(t, i) {
                        var o = e[i],
                            a = /^(?:first|last)$/.test(i);
                        e.prototype[i] = function() {
                            var i = this.__wrapped__,
                                s = arguments,
                                h = this.__chain__,
                                u = !!this.__actions__.length,
                                l = i instanceof r,
                                c = l && !u;
                            if (a && !h) return c ? t.call(i) : o.call(e, this.value());
                            var f = function(t) {
                                var n = [t];
                                return ra.apply(n, s), o.apply(e, n)
                            };
                            if (l || ja(i)) {
                                var d = c ? i : new r(this),
                                    p = t.apply(d, s);
                                if (!a && (u || p.actions)) {
                                    var g = p.actions || (p.actions = []);
                                    g.push({
                                        func: vr,
                                        args: [f],
                                        thisArg: e
                                    })
                                }
                                return new n(p, h)
                            }
                            return this.thru(f)
                        }
                    }), $t(["concat", "join", "pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
                        var n = No[t],
                            r = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                            i = /^(?:join|pop|shift)$/.test(t);
                        e.prototype[t] = function() {
                            var t = arguments;
                            return i && !this.__chain__ ? n.apply(this.value(), t) : this[r](function(e) {
                                return n.apply(e, t)
                            })
                        }
                    }), r.prototype.clone = i, r.prototype.reverse = w, r.prototype.value = J, e.prototype.chain = mr, e.prototype.reverse = yr, e.prototype.toString = wr, e.prototype.toJSON = e.prototype.valueOf = e.prototype.value = _r, e.prototype.collect = e.prototype.map, e.prototype.head = e.prototype.first, e.prototype.select = e.prototype.filter, e.prototype.tail = e.prototype.rest, e
            }
            var C, I = "3.1.0",
                A = 1,
                L = 2,
                R = 4,
                B = 8,
                T = 16,
                M = 32,
                O = 64,
                D = 128,
                U = 256,
                P = 30,
                F = "...",
                z = 150,
                W = 16,
                N = 0,
                j = 1,
                H = 2,
                Z = "Expected a function",
                G = "__lodash_placeholder__",
                q = "[object Arguments]",
                Y = "[object Array]",
                K = "[object Boolean]",
                X = "[object Date]",
                V = "[object Error]",
                $ = "[object Function]",
                J = "[object Map]",
                Q = "[object Number]",
                tt = "[object Object]",
                et = "[object RegExp]",
                nt = "[object Set]",
                rt = "[object String]",
                it = "[object WeakMap]",
                ot = "[object ArrayBuffer]",
                at = "[object Float32Array]",
                st = "[object Float64Array]",
                ht = "[object Int8Array]",
                ut = "[object Int16Array]",
                lt = "[object Int32Array]",
                ct = "[object Uint8Array]",
                ft = "[object Uint8ClampedArray]",
                dt = "[object Uint16Array]",
                pt = "[object Uint32Array]",
                gt = /\b__p \+= '';/g,
                vt = /\b(__p \+=) '' \+/g,
                mt = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                yt = /&(?:amp|lt|gt|quot|#39|#96);/g,
                wt = /[&<>"'`]/g,
                _t = RegExp(yt.source),
                bt = RegExp(wt.source),
                xt = /<%-([\s\S]+?)%>/g,
                St = /<%([\s\S]+?)%>/g,
                kt = /<%=([\s\S]+?)%>/g,
                Et = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                Ct = /\w*$/,
                It = /^\s*function[ \n\r\t]+\w/,
                At = /^0[xX]/,
                Lt = /^\[object .+?Constructor\]$/,
                Rt = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
                Bt = /($^)/,
                Tt = /[.*+?^${}()|[\]\/\\]/g,
                Mt = RegExp(Tt.source),
                Ot = /\bthis\b/,
                Dt = /['\n\r\u2028\u2029\\]/g,
                Ut = function() {
                    var t = "[A-Z\\xc0-\\xd6\\xd8-\\xde]",
                        e = "[a-z\\xdf-\\xf6\\xf8-\\xff]+";
                    return RegExp(t + "{2,}(?=" + t + e + ")|" + t + "?" + e + "|" + t + "+|[0-9]+", "g")
                }(),
                Pt = "\f \ufeff\n\r\u2028\u2029 ᠎             　",
                Ft = ["Array", "ArrayBuffer", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Math", "Number", "Object", "RegExp", "Set", "String", "_", "clearTimeout", "document", "isFinite", "parseInt", "setTimeout", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "window", "WinRTError"],
                zt = -1,
                Wt = {};
            Wt[at] = Wt[st] = Wt[ht] = Wt[ut] = Wt[lt] = Wt[ct] = Wt[ft] = Wt[dt] = Wt[pt] = !0, Wt[q] = Wt[Y] = Wt[ot] = Wt[K] = Wt[X] = Wt[V] = Wt[$] = Wt[J] = Wt[Q] = Wt[tt] = Wt[et] = Wt[nt] = Wt[rt] = Wt[it] = !1;
            var Nt = {};
            Nt[q] = Nt[Y] = Nt[ot] = Nt[K] = Nt[X] = Nt[at] = Nt[st] = Nt[ht] = Nt[ut] = Nt[lt] = Nt[Q] = Nt[tt] = Nt[et] = Nt[rt] = Nt[ct] = Nt[ft] = Nt[dt] = Nt[pt] = !0, Nt[V] = Nt[$] = Nt[J] = Nt[nt] = Nt[it] = !1;
            var jt = {
                    leading: !1,
                    maxWait: 0,
                    trailing: !1
                },
                Ht = {
                    "À": "A",
                    "Á": "A",
                    "Â": "A",
                    "Ã": "A",
                    "Ä": "A",
                    "Å": "A",
                    "à": "a",
                    "á": "a",
                    "â": "a",
                    "ã": "a",
                    "ä": "a",
                    "å": "a",
                    "Ç": "C",
                    "ç": "c",
                    "Ð": "D",
                    "ð": "d",
                    "È": "E",
                    "É": "E",
                    "Ê": "E",
                    "Ë": "E",
                    "è": "e",
                    "é": "e",
                    "ê": "e",
                    "ë": "e",
                    "Ì": "I",
                    "Í": "I",
                    "Î": "I",
                    "Ï": "I",
                    "ì": "i",
                    "í": "i",
                    "î": "i",
                    "ï": "i",
                    "Ñ": "N",
                    "ñ": "n",
                    "Ò": "O",
                    "Ó": "O",
                    "Ô": "O",
                    "Õ": "O",
                    "Ö": "O",
                    "Ø": "O",
                    "ò": "o",
                    "ó": "o",
                    "ô": "o",
                    "õ": "o",
                    "ö": "o",
                    "ø": "o",
                    "Ù": "U",
                    "Ú": "U",
                    "Û": "U",
                    "Ü": "U",
                    "ù": "u",
                    "ú": "u",
                    "û": "u",
                    "ü": "u",
                    "Ý": "Y",
                    "ý": "y",
                    "ÿ": "y",
                    "Æ": "Ae",
                    "æ": "ae",
                    "Þ": "Th",
                    "þ": "th",
                    "ß": "ss"
                },
                Zt = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "`": "&#96;"
                },
                Gt = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'",
                    "&#96;": "`"
                },
                qt = {
                    "function": !0,
                    object: !0
                },
                Yt = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                },
                Kt = qt[typeof window] && window !== (this && this.window) ? window : this,
                Xt = qt[typeof e] && e && !e.nodeType && e,
                Vt = qt[typeof t] && t && !t.nodeType && t,
                $t = Xt && Vt && "object" == typeof i && i;
            !$t || $t.global !== $t && $t.window !== $t && $t.self !== $t || (Kt = $t);
            var Jt = (Vt && Vt.exports === Xt && Xt, E());
            Kt._ = Jt, r = function() {
                return Jt
            }.call(e, n, e, t), !(r !== C && (t.exports = r))
        }).call(this)
    }).call(e, n(15)(t), function() {
        return this
    }())
}, function(t, e, n) {
    (function(e) {
        (function() {
            var r, i, o, a = function(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            };
            o = n(45), i = function() {
                function t(t, e, n) {
                    this.document = t, this.id = e, this.data = null != n ? n : {}, this.finalize = a(this.finalize, this), this.gen = 0, this.deflate = null, this.compress = this.document.compress && !this.data.Filter, this.uncompressedLength = 0, this.chunks = []
                }
                return t.prototype.initDeflate = function() {
                    return this.data.Filter = "FlateDecode", this.deflate = o.createDeflate(), this.deflate.on("data", function(t) {
                        return function(e) {
                            return t.chunks.push(e), t.data.Length += e.length
                        }
                    }(this)), this.deflate.on("end", this.finalize)
                }, t.prototype.write = function(t) {
                    var n;
                    return e.isBuffer(t) || (t = new e(t + "\n", "binary")), this.uncompressedLength += t.length, null == (n = this.data).Length && (n.Length = 0), this.compress ? (this.deflate || this.initDeflate(), this.deflate.write(t)) : (this.chunks.push(t), this.data.Length += t.length)
                }, t.prototype.end = function(t) {
                    return ("string" == typeof t || e.isBuffer(t)) && this.write(t), this.deflate ? this.deflate.end() : this.finalize()
                }, t.prototype.finalize = function() {
                    var t, e, n, i;
                    if (this.offset = this.document._offset, this.document._write("" + this.id + " " + this.gen + " obj"), this.document._write(r.convert(this.data)), this.chunks.length) {
                        for (this.document._write("stream"), i = this.chunks, e = 0, n = i.length; n > e; e++) t = i[e], this.document._write(t);
                        this.chunks.length = 0, this.document._write("\nendstream")
                    }
                    return this.document._write("endobj"), this.document._refEnd(this)
                }, t.prototype.toString = function() {
                    return "" + this.id + " " + this.gen + " R"
                }, t
            }(), t.exports = i, r = n(32)
        }).call(this)
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    t.exports = function() {
        throw new Error("define cannot be used indirect")
    }
}, function(t, e, n) {
    (function(e) {
        t.exports = e
    }).call(e, {})
}, function(t, e, n) {
    t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children = [], t.webpackPolyfill = 1), t
    }
}, function(t, e, n) {
    "use strict";

    function r(t, e, n) {
        this.MAX_CHAR_TYPES = 92, this.pdfkitDoc = t, this.path = e, this.pdfFonts = [], this.charCatalogue = [], this.name = n, this.__defineGetter__("ascender", function() {
            var t = this.getFont(0);
            return t.ascender
        }), this.__defineGetter__("decender", function() {
            var t = this.getFont(0);
            return t.decender
        })
    }
    var i = n(11);
    r.prototype.getFont = function(t) {
        if (!this.pdfFonts[t]) {
            var e = this.name + t;
            this.postscriptName && delete this.pdfkitDoc._fontFamilies[this.postscriptName], this.pdfFonts[t] = this.pdfkitDoc.font(this.path, e)._font, this.postscriptName || (this.postscriptName = this.pdfFonts[t].name)
        }
        return this.pdfFonts[t]
    }, r.prototype.widthOfString = function() {
        var t = this.getFont(0);
        return t.widthOfString.apply(t, arguments)
    }, r.prototype.lineHeight = function() {
        var t = this.getFont(0);
        return t.lineHeight.apply(t, arguments)
    }, r.prototype.ref = function() {
        var t = this.getFont(0);
        return t.ref.apply(t, arguments)
    };
    var o = function(t) {
        return t.charCodeAt(0)
    };
    r.prototype.encode = function(t) {
        var e = this,
            n = i.chain(t.split("")).map(o).uniq().value();
        if (n.length > e.MAX_CHAR_TYPES) throw new Error("Inline has more than " + e.MAX_CHAR_TYPES + ": " + t + " different character types and therefore cannot be properly embedded into pdf.");
        var r = function(t) {
                return i.uniq(t.concat(n)).length <= e.MAX_CHAR_TYPES
            },
            a = i.findIndex(e.charCatalogue, r);
        0 > a && (a = e.charCatalogue.length, e.charCatalogue[a] = []);
        var s = this.getFont(a);
        s.use(t), i.each(n, function(t) {
            i.includes(e.charCatalogue[a], t) || e.charCatalogue[a].push(t)
        });
        var h = i.map(s.encode(t), function(t) {
            return t.charCodeAt(0).toString(16)
        }).join("");
        return {
            encodedText: h,
            fontId: s.id
        }
    }, t.exports = r
}, function(t, e, n) {
    (function(e) {
        (function() {
            var r, i, o, a, s;
            s = n(10), r = n(34), i = n(35), a = n(36), o = function() {
                function t() {}
                return t.open = function(t, n) {
                    var r, o;
                    if (e.isBuffer(t)) r = t;
                    else if (o = /^data:.+;base64,(.*)$/.exec(t)) r = new e(o[1], "base64");
                    else if (r = s.readFileSync(t), !r) return;
                    if (255 === r[0] && 216 === r[1]) return new i(r, n);
                    if (137 === r[0] && "PNG" === r.toString("ascii", 1, 4)) return new a(r, n);
                    throw new Error("Unknown image format.")
                }, t
            }(), t.exports = o
        }).call(this)
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    "use strict";

    function r() {
        this.events = {}
    }
    r.prototype.startTracking = function(t, e) {
        var n = this.events[t] || (this.events[t] = []);
        n.indexOf(e) < 0 && n.push(e)
    }, r.prototype.stopTracking = function(t, e) {
        var n = this.events[t];
        if (n) {
            var r = n.indexOf(e);
            r >= 0 && n.splice(r, 1)
        }
    }, r.prototype.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1),
            n = this.events[t];
        n && n.forEach(function(t) {
            t.apply(this, e)
        })
    }, r.prototype.auto = function(t, e, n) {
        this.startTracking(t, e), n(), this.stopTracking(t, e)
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e, n, r, a, s) {
        this.textTools = new i(t), this.styleStack = new o(e, n), this.imageMeasure = r, this.tableLayouts = a, this.images = s, this.autoImageIndex = 1
    }
    var i = n(26),
        o = n(27),
        a = n(22),
        s = n(25).fontStringify,
        h = n(25).pack,
        u = n(33);
    r.prototype.measureDocument = function(t) {
        return this.measureNode(t)
    }, r.prototype.measureNode = function(t) {
        function e(t) {
            var e = t._margin;
            return e && (t._minWidth += e[0] + e[2], t._maxWidth += e[0] + e[2]), t
        }

        function n() {
            function e(t, e) {
                return t.marginLeft || t.marginTop || t.marginRight || t.marginBottom ? [t.marginLeft || e[0] || 0, t.marginTop || e[1] || 0, t.marginRight || e[2] || 0, t.marginBottom || e[3] || 0] : e
            }

            function n(t) {
                for (var e = {}, n = t.length - 1; n >= 0; n--) {
                    var i = t[n],
                        o = r.styleStack.styleDictionary[i];
                    for (var a in o) o.hasOwnProperty(a) && (e[a] = o[a])
                }
                return e
            }

            function i(t) {
                return "number" == typeof t || t instanceof Number ? t = [t, t, t, t] : t instanceof Array && 2 === t.length && (t = [t[0], t[1], t[0], t[1]]), t
            }
            var o = [void 0, void 0, void 0, void 0];
            if (t.style) {
                var a = t.style instanceof Array ? t.style : [t.style],
                    s = n(a);
                s && (o = e(s, o)), s.margin && (o = i(s.margin))
            }
            return o = e(t, o), t.margin && (o = i(t.margin)), void 0 === o[0] && void 0 === o[1] && void 0 === o[2] && void 0 === o[3] ? null : o
        }
        t instanceof Array ? t = {
            stack: t
        } : ("string" == typeof t || t instanceof String) && (t = {
            text: t
        });
        var r = this;
        return this.styleStack.auto(t, function() {
            if (t._margin = n(t), t.columns) return e(r.measureColumns(t));
            if (t.stack) return e(r.measureVerticalContainer(t));
            if (t.ul) return e(r.measureList(!1, t));
            if (t.ol) return e(r.measureList(!0, t));
            if (t.table) return e(r.measureTable(t));
            if (void 0 !== t.text) return e(r.measureLeaf(t));
            if (t.image) return e(r.measureImage(t));
            if (t.canvas) return e(r.measureCanvas(t));
            if (t.qr) return e(r.measureQr(t));
            throw "Unrecognized document structure: " + JSON.stringify(t, s)
        })
    }, r.prototype.convertIfBase64Image = function(t) {
        if (/^data:image\/(jpeg|jpg|png);base64,/.test(t.image)) {
            var e = "$$pdfmake$$" + this.autoImageIndex++;
            this.images[e] = t.image, t.image = e
        }
    }, r.prototype.measureImage = function(t) {
        this.images && this.convertIfBase64Image(t);
        var e = this.imageMeasure.measureImage(t.image);
        if (t.fit) {
            var n = e.width / e.height > t.fit[0] / t.fit[1] ? t.fit[0] / e.width : t.fit[1] / e.height;
            t._width = t._minWidth = t._maxWidth = e.width * n, t._height = e.height * n
        } else t._width = t._minWidth = t._maxWidth = t.width || e.width, t._height = t.height || e.height * t._width / e.width;
        return t._alignment = this.styleStack.getProperty("alignment"), t
    }, r.prototype.measureLeaf = function(t) {
        var e = this.textTools.buildInlines(t.text, this.styleStack);
        return t._inlines = e.items, t._minWidth = e.minWidth, t._maxWidth = e.maxWidth, t
    }, r.prototype.measureVerticalContainer = function(t) {
        var e = t.stack;
        t._minWidth = 0, t._maxWidth = 0;
        for (var n = 0, r = e.length; r > n; n++) e[n] = this.measureNode(e[n]), t._minWidth = Math.max(t._minWidth, e[n]._minWidth), t._maxWidth = Math.max(t._maxWidth, e[n]._maxWidth);
        return t
    }, r.prototype.gapSizeForList = function(t, e) {
        if (t) {
            var n = e.length.toString().replace(/./g, "9");
            return this.textTools.sizeOfString(n + ". ", this.styleStack)
        }
        return this.textTools.sizeOfString("9. ", this.styleStack)
    }, r.prototype.buildMarker = function(t, e, n, r) {
        var i;
        if (t) i = {
            _inlines: this.textTools.buildInlines(e, n).items
        };
        else {
            var o = r.fontSize / 6;
            i = {
                canvas: [{
                    x: o,
                    y: r.height / r.lineHeight + r.decender - r.fontSize / 3,
                    r1: o,
                    r2: o,
                    type: "ellipse",
                    color: "black"
                }]
            }
        }
        return i._minWidth = i._maxWidth = r.width, i._minHeight = i._maxHeight = r.height, i
    }, r.prototype.measureList = function(t, e) {
        var n = this.styleStack.clone(),
            r = t ? e.ol : e.ul;
        e._gapSize = this.gapSizeForList(t, r), e._minWidth = 0, e._maxWidth = 0;
        for (var i = 1, o = 0, a = r.length; a > o; o++) {
            var s = r[o] = this.measureNode(r[o]),
                h = i++ + ". ";
            s.ol || s.ul || (s.listMarker = this.buildMarker(t, s.counter || h, n, e._gapSize)), e._minWidth = Math.max(e._minWidth, r[o]._minWidth + e._gapSize.width), e._maxWidth = Math.max(e._maxWidth, r[o]._maxWidth + e._gapSize.width)
        }
        return e
    }, r.prototype.measureColumns = function(t) {
        var e = t.columns;
        t._gap = this.styleStack.getProperty("columnGap") || 0;
        for (var n = 0, r = e.length; r > n; n++) e[n] = this.measureNode(e[n]);
        var i = a.measureMinMax(e);
        return t._minWidth = i.min + t._gap * (e.length - 1), t._maxWidth = i.max + t._gap * (e.length - 1), t
    }, r.prototype.measureTable = function(t) {
        function e(t, e) {
            return function() {
                return null !== e && "object" == typeof e && (e.fillColor = t.styleStack.getProperty("fillColor")), t.measureNode(e)
            }
        }

        function n(e) {
            var n = t.layout;
            ("string" == typeof t.layout || t instanceof String) && (n = e[n]);
            var r = {
                hLineWidth: function(t, e) {
                    return 1
                },
                vLineWidth: function(t, e) {
                    return 1
                },
                hLineColor: function(t, e) {
                    return "black"
                },
                vLineColor: function(t, e) {
                    return "black"
                },
                paddingLeft: function(t, e) {
                    return 4
                },
                paddingRight: function(t, e) {
                    return 4
                },
                paddingTop: function(t, e) {
                    return 2
                },
                paddingBottom: function(t, e) {
                    return 2
                }
            };
            return h(r, n)
        }

        function r(e) {
            for (var n = [], r = 0, i = 0, o = 0, a = t.table.widths.length; a > o; o++) {
                var s = i + e.vLineWidth(o, t) + e.paddingLeft(o, t);
                n.push(s), r += s, i = e.paddingRight(o, t)
            }
            return r += i + e.vLineWidth(t.table.widths.length, t), {
                total: r,
                offsets: n
            }
        }

        function i() {
            for (var e, n, r = 0, i = g.length; i > r; r++) {
                var a = g[r],
                    s = o(a.col, a.span, t._offsets),
                    h = a.minWidth - s.minWidth,
                    u = a.maxWidth - s.maxWidth;
                if (h > 0)
                    for (e = h / a.span, n = 0; n < a.span; n++) t.table.widths[a.col + n]._minWidth += e;
                if (u > 0)
                    for (e = u / a.span, n = 0; n < a.span; n++) t.table.widths[a.col + n]._maxWidth += e
            }
        }

        function o(e, n, r) {
            for (var i = {
                    minWidth: 0,
                    maxWidth: 0
                }, o = 0; n > o; o++) i.minWidth += t.table.widths[e + o]._minWidth + (o ? r.offsets[e + o] : 0), i.maxWidth += t.table.widths[e + o]._maxWidth + (o ? r.offsets[e + o] : 0);
            return i
        }

        function s(t, e, n) {
            for (var r = 1; n > r; r++) t[e + r] = {
                _span: !0,
                _minWidth: 0,
                _maxWidth: 0,
                rowSpan: t[e].rowSpan
            }
        }

        function u(t, e, n, r) {
            for (var i = 1; r > i; i++) t.body[e + i][n] = {
                _span: !0,
                _minWidth: 0,
                _maxWidth: 0,
                fillColor: t.body[e][n].fillColor
            }
        }

        function l(t) {
            if (t.table.widths || (t.table.widths = "auto"), "string" == typeof t.table.widths || t.table.widths instanceof String)
                for (t.table.widths = [t.table.widths]; t.table.widths.length < t.table.body[0].length;) t.table.widths.push(t.table.widths[t.table.widths.length - 1]);
            for (var e = 0, n = t.table.widths.length; n > e; e++) {
                var r = t.table.widths[e];
                ("number" == typeof r || r instanceof Number || "string" == typeof r || r instanceof String) && (t.table.widths[e] = {
                    width: r
                })
            }
        }
        l(t), t._layout = n(this.tableLayouts), t._offsets = r(t._layout);
        var c, f, d, p, g = [];
        for (c = 0, d = t.table.body[0].length; d > c; c++) {
            var v = t.table.widths[c];
            for (v._minWidth = 0, v._maxWidth = 0, f = 0, p = t.table.body.length; p > f; f++) {
                var m = t.table.body[f],
                    y = m[c];
                if (!y._span) {
                    y = m[c] = this.styleStack.auto(y, e(this, y)), y.colSpan && y.colSpan > 1 ? (s(m, c, y.colSpan), g.push({
                        col: c,
                        span: y.colSpan,
                        minWidth: y._minWidth,
                        maxWidth: y._maxWidth
                    })) : (v._minWidth = Math.max(v._minWidth, y._minWidth), v._maxWidth = Math.max(v._maxWidth, y._maxWidth))
                }
                y.rowSpan && y.rowSpan > 1 && u(t.table, f, c, y.rowSpan)
            }
        }
        i();
        var w = a.measureMinMax(t.table.widths);
        return t._minWidth = w.min + t._offsets.total, t._maxWidth = w.max + t._offsets.total, t
    }, r.prototype.measureCanvas = function(t) {
        for (var e = 0, n = 0, r = 0, i = t.canvas.length; i > r; r++) {
            var o = t.canvas[r];
            switch (o.type) {
                case "ellipse":
                    e = Math.max(e, o.x + o.r1), n = Math.max(n, o.y + o.r2);
                    break;
                case "rect":
                    e = Math.max(e, o.x + o.w), n = Math.max(n, o.y + o.h);
                    break;
                case "line":
                    e = Math.max(e, o.x1, o.x2), n = Math.max(n, o.y1, o.y2);
                    break;
                case "polyline":
                    for (var a = 0, s = o.points.length; s > a; a++) e = Math.max(e, o.points[a].x), n = Math.max(n, o.points[a].y)
            }
        }
        return t._minWidth = t._maxWidth = e, t._minHeight = t._maxHeight = n, t
    }, r.prototype.measureQr = function(t) {
        return t = u.measure(t), t._alignment = this.styleStack.getProperty("alignment"), t
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        this.pages = [], this.pageMargins = e, this.x = e.left, this.availableWidth = t.width - e.left - e.right, this.availableHeight = 0, this.page = -1, this.snapshots = [], this.endingCell = null, this.tracker = new a, this.addPage(t)
    }

    function i(t, e) {
        return void 0 === t ? e : "landscape" === t ? "landscape" : "portrait"
    }

    function o(t, e) {
        var n;
        return n = t.page > e.page ? t : e.page > t.page ? e : t.y > e.y ? t : e, {
            page: n.page,
            x: n.x,
            y: n.y,
            availableHeight: n.availableHeight,
            availableWidth: n.availableWidth
        }
    }
    var a = n(18);
    r.prototype.beginColumnGroup = function() {
        this.snapshots.push({
            x: this.x,
            y: this.y,
            availableHeight: this.availableHeight,
            availableWidth: this.availableWidth,
            page: this.page,
            bottomMost: {
                y: this.y,
                page: this.page
            },
            endingCell: this.endingCell,
            lastColumnWidth: this.lastColumnWidth
        }), this.lastColumnWidth = 0
    }, r.prototype.beginColumn = function(t, e, n) {
        var r = this.snapshots[this.snapshots.length - 1];
        this.calculateBottomMost(r), this.endingCell = n, this.page = r.page, this.x = this.x + this.lastColumnWidth + (e || 0), this.y = r.y, this.availableWidth = t, this.availableHeight = r.availableHeight, this.lastColumnWidth = t
    }, r.prototype.calculateBottomMost = function(t) {
        this.endingCell ? (this.saveContextInEndingCell(this.endingCell), this.endingCell = null) : t.bottomMost = o(this, t.bottomMost)
    }, r.prototype.markEnding = function(t) {
        this.page = t._columnEndingContext.page, this.x = t._columnEndingContext.x, this.y = t._columnEndingContext.y, this.availableWidth = t._columnEndingContext.availableWidth, this.availableHeight = t._columnEndingContext.availableHeight, this.lastColumnWidth = t._columnEndingContext.lastColumnWidth
    }, r.prototype.saveContextInEndingCell = function(t) {
        t._columnEndingContext = {
            page: this.page,
            x: this.x,
            y: this.y,
            availableHeight: this.availableHeight,
            availableWidth: this.availableWidth,
            lastColumnWidth: this.lastColumnWidth
        }
    }, r.prototype.completeColumnGroup = function() {
        var t = this.snapshots.pop();
        this.calculateBottomMost(t), this.endingCell = null, this.x = t.x, this.y = t.bottomMost.y, this.page = t.bottomMost.page, this.availableWidth = t.availableWidth, this.availableHeight = t.bottomMost.availableHeight, this.lastColumnWidth = t.lastColumnWidth
    }, r.prototype.addMargin = function(t, e) {
        this.x += t, this.availableWidth -= t + (e || 0)
    }, r.prototype.moveDown = function(t) {
        return this.y += t, this.availableHeight -= t, this.availableHeight > 0
    }, r.prototype.initializePage = function() {
        this.y = this.pageMargins.top, this.availableHeight = this.getCurrentPage().pageSize.height - this.pageMargins.top - this.pageMargins.bottom, this.pageSnapshot().availableWidth = this.getCurrentPage().pageSize.width - this.pageMargins.left - this.pageMargins.right
    }, r.prototype.pageSnapshot = function() {
        return this.snapshots[0] ? this.snapshots[0] : this
    }, r.prototype.moveTo = function(t, e) {
        void 0 !== t && null !== t && (this.x = t, this.availableWidth = this.getCurrentPage().pageSize.width - this.x - this.pageMargins.right), void 0 !== e && null !== e && (this.y = e, this.availableHeight = this.getCurrentPage().pageSize.height - this.y - this.pageMargins.bottom)
    }, r.prototype.beginDetachedBlock = function() {
        this.snapshots.push({
            x: this.x,
            y: this.y,
            availableHeight: this.availableHeight,
            availableWidth: this.availableWidth,
            page: this.page,
            endingCell: this.endingCell,
            lastColumnWidth: this.lastColumnWidth
        })
    }, r.prototype.endDetachedBlock = function() {
        var t = this.snapshots.pop();
        this.x = t.x, this.y = t.y, this.availableWidth = t.availableWidth, this.availableHeight = t.availableHeight, this.page = t.page, this.endingCell = t.endingCell, this.lastColumnWidth = t.lastColumnWidth
    };
    var s = function(t, e) {
        return e = i(e, t.pageSize.orientation), e !== t.pageSize.orientation ? {
            orientation: e,
            width: t.pageSize.height,
            height: t.pageSize.width
        } : {
            orientation: t.pageSize.orientation,
            width: t.pageSize.width,
            height: t.pageSize.height
        }
    };
    r.prototype.moveToNextPage = function(t) {
        var e = this.page + 1,
            n = this.page,
            r = this.y,
            i = e >= this.pages.length;
        return i ? this.addPage(s(this.getCurrentPage(), t)) : (this.page = e, this.initializePage()), {
            newPageCreated: i,
            prevPage: n,
            prevY: r,
            y: this.y
        }
    }, r.prototype.addPage = function(t) {
        var e = {
            items: [],
            pageSize: t
        };
        return this.pages.push(e), this.page = this.pages.length - 1, this.initializePage(), this.tracker.emit("pageAdded"), e
    }, r.prototype.getCurrentPage = function() {
        return this.page < 0 || this.page >= this.pages.length ? null : this.pages[this.page]
    }, r.prototype.getCurrentPosition = function() {
        var t = this.getCurrentPage().pageSize,
            e = t.height - this.pageMargins.top - this.pageMargins.bottom,
            n = t.width - this.pageMargins.left - this.pageMargins.right;
        return {
            pageNumber: this.page + 1,
            pageOrientation: t.orientation,
            pageInnerHeight: e,
            pageInnerWidth: n,
            left: this.x,
            top: this.y,
            verticalRatio: (this.y - this.pageMargins.top) / e,
            horizontalRatio: (this.x - this.pageMargins.left) / n
        }
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        this.transactionLevel = 0, this.repeatables = [], this.tracker = e, this.writer = new o(t, e)
    }

    function i(t, e) {
        var n = e(t);
        return n || (t.moveToNextPage(), n = e(t)), n
    }
    var o = n(37);
    r.prototype.addLine = function(t, e, n) {
        return i(this, function(r) {
            return r.writer.addLine(t, e, n)
        })
    }, r.prototype.addImage = function(t, e) {
        return i(this, function(n) {
            return n.writer.addImage(t, e)
        })
    }, r.prototype.addQr = function(t, e) {
        return i(this, function(n) {
            return n.writer.addQr(t, e)
        })
    }, r.prototype.addVector = function(t, e, n, r) {
        return this.writer.addVector(t, e, n, r)
    }, r.prototype.addFragment = function(t, e, n, r) {
        this.writer.addFragment(t, e, n, r) || (this.moveToNextPage(), this.writer.addFragment(t, e, n, r))
    }, r.prototype.moveToNextPage = function(t) {
        var e = this.writer.context.moveToNextPage(t);
        e.newPageCreated ? this.repeatables.forEach(function(t) {
            this.writer.addFragment(t, !0)
        }, this) : this.repeatables.forEach(function(t) {
            this.writer.context.moveDown(t.height)
        }, this), this.writer.tracker.emit("pageChanged", {
            prevPage: e.prevPage,
            prevY: e.prevY,
            y: e.y
        })
    }, r.prototype.beginUnbreakableBlock = function(t, e) {
        0 === this.transactionLevel++ && (this.originalX = this.writer.context.x, this.writer.pushContext(t, e))
    }, r.prototype.commitUnbreakableBlock = function(t, e) {
        if (0 === --this.transactionLevel) {
            var n = this.writer.context;
            this.writer.popContext();
            var r = n.pages.length;
            if (r > 0) {
                var i = n.pages[0];
                if (i.xOffset = t, i.yOffset = e, r > 1)
                    if (void 0 !== t || void 0 !== e) i.height = n.getCurrentPage().pageSize.height - n.pageMargins.top - n.pageMargins.bottom;
                    else {
                        i.height = this.writer.context.getCurrentPage().pageSize.height - this.writer.context.pageMargins.top - this.writer.context.pageMargins.bottom;
                        for (var o = 0, a = this.repeatables.length; a > o; o++) i.height -= this.repeatables[o].height
                    }
                else i.height = n.y;
                void 0 !== t || void 0 !== e ? this.writer.addFragment(i, !0, !0, !0) : this.addFragment(i)
            }
        }
    }, r.prototype.currentBlockToRepeatable = function() {
        var t = this.writer.context,
            e = {
                items: []
            };
        return t.pages[0].items.forEach(function(t) {
            e.items.push(t)
        }), e.xOffset = this.originalX, e.height = t.y, e
    }, r.prototype.pushToRepeatables = function(t) {
        this.repeatables.push(t)
    }, r.prototype.popFromRepeatables = function() {
        this.repeatables.pop()
    }, r.prototype.context = function() {
        return this.writer.context
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        var n = [],
            r = 0,
            a = 0,
            s = [],
            h = 0,
            u = 0,
            l = [],
            c = e;
        t.forEach(function(t) {
            i(t) ? (n.push(t), r += t._minWidth, a += t._maxWidth) : o(t) ? (s.push(t), h = Math.max(h, t._minWidth), u = Math.max(u, t._maxWidth)) : l.push(t)
        }), l.forEach(function(t) {
            "string" == typeof t.width && /\d+%/.test(t.width) && (t.width = parseFloat(t.width) * c / 100), t._calcWidth = t.width < t._minWidth && t.elasticWidth ? t._minWidth : t.width, e -= t._calcWidth
        });
        var f = r + h * s.length,
            d = a + u * s.length;
        if (f >= e) n.forEach(function(t) {
            t._calcWidth = t._minWidth
        }), s.forEach(function(t) {
            t._calcWidth = h
        });
        else {
            if (e > d) n.forEach(function(t) {
                t._calcWidth = t._maxWidth, e -= t._calcWidth
            });
            else {
                var p = e - f,
                    g = d - f;
                n.forEach(function(t) {
                    var n = t._maxWidth - t._minWidth;
                    t._calcWidth = t._minWidth + n * p / g, e -= t._calcWidth
                })
            }
            if (s.length > 0) {
                var v = e / s.length;
                s.forEach(function(t) {
                    t._calcWidth = v
                })
            }
        }
    }

    function i(t) {
        return "auto" === t.width
    }

    function o(t) {
        return null === t.width || void 0 === t.width || "*" === t.width || "star" === t.width
    }

    function a(t) {
        for (var e = {
                min: 0,
                max: 0
            }, n = {
                min: 0,
                max: 0
            }, r = 0, a = 0, s = t.length; s > a; a++) {
            var h = t[a];
            o(h) ? (n.min = Math.max(n.min, h._minWidth), n.max = Math.max(n.max, h._maxWidth), r++) : i(h) ? (e.min += h._minWidth, e.max += h._maxWidth) : (e.min += void 0 !== h.width && h.width || h._minWidth, e.max += void 0 !== h.width && h.width || h._maxWidth)
        }
        return r && (e.min += r * n.min, e.max += r * n.max), e
    }
    t.exports = {
        buildColumnWidths: r,
        measureMinMax: a,
        isAutoColumn: i,
        isStarColumn: o
    }
}, function(t, e, n) {
    "use strict";

    function r(t) {
        this.tableNode = t
    }
    var i = n(22);
    r.prototype.beginTable = function(t) {
        function e() {
            var t = 0;
            return r.table.widths.forEach(function(e) {
                t += e._calcWidth
            }), t
        }

        function n() {
            var t = [],
                e = 0,
                n = 0;
            t.push({
                left: 0,
                rowSpan: 0
            });
            for (var r = 0, i = a.tableNode.table.body[0].length; i > r; r++) {
                var o = a.layout.paddingLeft(r, a.tableNode) + a.layout.paddingRight(r, a.tableNode),
                    s = a.layout.vLineWidth(r, a.tableNode);
                n = o + s + a.tableNode.table.widths[r]._calcWidth, t[t.length - 1].width = n, e += n, t.push({
                    left: e,
                    rowSpan: 0,
                    width: 0
                })
            }
            return t
        }
        var r, o, a = this;
        r = this.tableNode, this.offsets = r._offsets, this.layout = r._layout, o = t.context().availableWidth - this.offsets.total, i.buildColumnWidths(r.table.widths, o), this.tableWidth = r._offsets.total + e(), this.rowSpanData = n(), this.cleanUpRepeatables = !1, this.headerRows = r.table.headerRows || 0, this.rowsWithoutPageBreak = this.headerRows + (r.table.keepWithHeaderRows || 0), this.dontBreakRows = r.table.dontBreakRows || !1, this.rowsWithoutPageBreak && t.beginUnbreakableBlock(), this.drawHorizontalLine(0, t)
    }, r.prototype.onRowBreak = function(t, e) {
        var n = this;
        return function() {
            var t = n.rowPaddingTop + (n.headerRows ? 0 : n.topLineWidth);
            e.context().moveDown(t)
        }
    }, r.prototype.beginRow = function(t, e) {
        this.topLineWidth = this.layout.hLineWidth(t, this.tableNode), this.rowPaddingTop = this.layout.paddingTop(t, this.tableNode), this.bottomLineWidth = this.layout.hLineWidth(t + 1, this.tableNode), this.rowPaddingBottom = this.layout.paddingBottom(t, this.tableNode), this.rowCallback = this.onRowBreak(t, e), e.tracker.startTracking("pageChanged", this.rowCallback), this.dontBreakRows && e.beginUnbreakableBlock(), this.rowTopY = e.context().y, this.reservedAtBottom = this.bottomLineWidth + this.rowPaddingBottom, e.context().availableHeight -= this.reservedAtBottom, e.context().moveDown(this.rowPaddingTop)
    }, r.prototype.drawHorizontalLine = function(t, e, n) {
        var r = this.layout.hLineWidth(t, this.tableNode);
        if (r) {
            for (var i = r / 2, o = null, a = 0, s = this.rowSpanData.length; s > a; a++) {
                var h = this.rowSpanData[a],
                    u = !h.rowSpan;
                !o && u && (o = {
                    left: h.left,
                    width: 0
                }), u && (o.width += h.width || 0);
                var l = (n || 0) + i;
                u && a !== s - 1 || o && (e.addVector({
                    type: "line",
                    x1: o.left,
                    x2: o.left + o.width,
                    y1: l,
                    y2: l,
                    lineWidth: r,
                    lineColor: "function" == typeof this.layout.hLineColor ? this.layout.hLineColor(t, this.tableNode) : this.layout.hLineColor
                }, !1, n), o = null)
            }
            e.context().moveDown(r)
        }
    }, r.prototype.drawVerticalLine = function(t, e, n, r, i) {
        var o = this.layout.vLineWidth(r, this.tableNode);
        0 !== o && i.addVector({
            type: "line",
            x1: t + o / 2,
            x2: t + o / 2,
            y1: e,
            y2: n,
            lineWidth: o,
            lineColor: "function" == typeof this.layout.vLineColor ? this.layout.vLineColor(r, this.tableNode) : this.layout.vLineColor
        }, !1, !0)
    }, r.prototype.endTable = function(t) {
        this.cleanUpRepeatables && t.popFromRepeatables()
    }, r.prototype.endRow = function(t, e, n) {
        function r() {
            for (var e = [], n = 0, r = 0, i = a.tableNode.table.body[t].length; i > r; r++) {
                if (!n) {
                    e.push({
                        x: a.rowSpanData[r].left,
                        index: r
                    });
                    var o = a.tableNode.table.body[t][r];
                    n = o._colSpan || o.colSpan || 0
                }
                n > 0 && n--
            }
            return e.push({
                x: a.rowSpanData[a.rowSpanData.length - 1].left,
                index: a.rowSpanData.length - 1
            }), e
        }
        var i, o, a = this;
        e.tracker.stopTracking("pageChanged", this.rowCallback), e.context().moveDown(this.layout.paddingBottom(t, this.tableNode)), e.context().availableHeight += this.reservedAtBottom;
        var s = e.context().page,
            h = e.context().y,
            u = r(),
            l = [],
            c = n && n.length > 0;
        if (l.push({
                y0: this.rowTopY,
                page: c ? n[0].prevPage : s
            }), c)
            for (o = 0, i = n.length; i > o; o++) {
                var f = n[o];
                l[l.length - 1].y1 = f.prevY, l.push({
                    y0: f.y,
                    page: f.prevPage + 1
                })
            }
        l[l.length - 1].y1 = h;
        for (var d = l[0].y1 - l[0].y0 === this.rowPaddingTop, p = d ? 1 : 0, g = l.length; g > p; p++) {
            var v = p < l.length - 1,
                m = p > 0 && !this.headerRows,
                y = m ? 0 : this.topLineWidth,
                w = l[p].y0,
                _ = l[p].y1;
            for (v && (_ += this.rowPaddingBottom), e.context().page != l[p].page && (e.context().page = l[p].page, this.reservedAtBottom = 0), o = 0, i = u.length; i > o; o++)
                if (this.drawVerticalLine(u[o].x, w - y, _ + this.bottomLineWidth, u[o].index, e), i - 1 > o) {
                    var b = u[o].index,
                        x = this.tableNode.table.body[t][b].fillColor;
                    if (x) {
                        var S = this.layout.vLineWidth(b, this.tableNode),
                            k = u[o].x + S,
                            E = w - y;
                        e.addVector({
                            type: "rect",
                            x: k,
                            y: E,
                            w: u[o + 1].x - k,
                            h: _ + this.bottomLineWidth - E,
                            lineWidth: 0,
                            color: x
                        }, !1, !0, 0)
                    }
                } v && this.layout.hLineWhenBroken !== !1 && this.drawHorizontalLine(t + 1, e, _), m && this.layout.hLineWhenBroken !== !1 && this.drawHorizontalLine(t, e, w);

        }
        e.context().page = s, e.context().y = h;
        var C = this.tableNode.table.body[t];
        for (o = 0, i = C.length; i > o; o++) {
            if (C[o].rowSpan && (this.rowSpanData[o].rowSpan = C[o].rowSpan, C[o].colSpan && C[o].colSpan > 1))
                for (var I = 1; I < C[o].rowSpan; I++) this.tableNode.table.body[t + I][o]._colSpan = C[o].colSpan;
            this.rowSpanData[o].rowSpan > 0 && this.rowSpanData[o].rowSpan--
        }
        this.drawHorizontalLine(t + 1, e), this.headerRows && t === this.headerRows - 1 && (this.headerRepeatable = e.currentBlockToRepeatable()), this.dontBreakRows && e.tracker.auto("pageChanged", function() {
            a.drawHorizontalLine(t, e)
        }, function() {
            e.commitUnbreakableBlock(), a.drawHorizontalLine(t, e)
        }), !this.headerRepeatable || t !== this.rowsWithoutPageBreak - 1 && t !== this.tableNode.table.body.length - 1 || (e.commitUnbreakableBlock(), e.pushToRepeatables(this.headerRepeatable), this.cleanUpRepeatables = !0, this.headerRepeatable = null)
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t) {
        this.maxWidth = t, this.leadingCut = 0, this.trailingCut = 0, this.inlineWidths = 0, this.inlines = []
    }
    r.prototype.getAscenderHeight = function() {
        var t = 0;
        return this.inlines.forEach(function(e) {
            t = Math.max(t, e.font.ascender / 1e3 * e.fontSize)
        }), t
    }, r.prototype.hasEnoughSpaceForInline = function(t) {
        return 0 === this.inlines.length ? !0 : this.newLineForced ? !1 : this.inlineWidths + t.width - this.leadingCut - (t.trailingCut || 0) <= this.maxWidth
    }, r.prototype.addInline = function(t) {
        0 === this.inlines.length && (this.leadingCut = t.leadingCut || 0), this.trailingCut = t.trailingCut || 0, t.x = this.inlineWidths - this.leadingCut, this.inlines.push(t), this.inlineWidths += t.width, t.lineEnd && (this.newLineForced = !0)
    }, r.prototype.getWidth = function() {
        return this.inlineWidths - this.leadingCut - this.trailingCut
    }, r.prototype.getHeight = function() {
        var t = 0;
        return this.inlines.forEach(function(e) {
            t = Math.max(t, e.height || 0)
        }), t
    }, t.exports = r
}, function(t, e, n) {
    "use strict";

    function r() {
        for (var t = {}, e = 0, n = arguments.length; n > e; e++) {
            var r = arguments[e];
            if (r)
                for (var i in r) r.hasOwnProperty(i) && (t[i] = r[i])
        }
        return t
    }

    function i(t, e, n) {
        switch (t.type) {
            case "ellipse":
            case "rect":
                t.x += e, t.y += n;
                break;
            case "line":
                t.x1 += e, t.x2 += e, t.y1 += n, t.y2 += n;
                break;
            case "polyline":
                for (var r = 0, i = t.points.length; i > r; r++) t.points[r].x += e, t.points[r].y += n
        }
    }

    function o(t, e) {
        return "font" === t ? "font" : e
    }

    function a(t) {
        var e = {};
        return t && "[object Function]" === e.toString.call(t)
    }
    t.exports = {
        pack: r,
        fontStringify: o,
        offsetVector: i,
        isFunction: a
    }
}, function(t, e, n) {
    "use strict";

    function r(t) {
        this.fontProvider = t
    }

    function i(t) {
        var e = [];
        t = t.replace("	", "    ");
        for (var n = t.match(l), r = 0, i = n.length; i - 1 > r; r++) {
            var o = n[r],
                a = 0 === o.length;
            if (a) {
                var s = 0 === e.length || e[e.length - 1].lineEnd;
                s ? e.push({
                    text: "",
                    lineEnd: !0
                }) : e[e.length - 1].lineEnd = !0
            } else e.push({
                text: o
            })
        }
        return e
    }

    function o(t, e) {
        e = e || {}, t = t || {};
        for (var n in t) "text" != n && t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }

    function a(t) {
        var e = [];
        ("string" == typeof t || t instanceof String) && (t = [t]);
        for (var n = 0, r = t.length; r > n; n++) {
            var a, s = t[n],
                h = null;
            "string" == typeof s || s instanceof String ? a = i(s) : (a = i(s.text), h = o(s));
            for (var u = 0, l = a.length; l > u; u++) {
                var c = {
                    text: a[u].text
                };
                a[u].lineEnd && (c.lineEnd = !0), o(h, c), e.push(c)
            }
        }
        return e
    }

    function s(t) {
        return t.replace(/[^A-Za-z0-9\[\] ]/g, function(t) {
            return d[t] || t
        })
    }

    function h(t, e, n, r) {
        var i;
        return void 0 !== t[n] && null !== t[n] ? t[n] : e ? (e.auto(t, function() {
            i = e.getProperty(n)
        }), null !== i && void 0 !== i ? i : r) : r
    }

    function u(t, e, n) {
        var r = a(e);
        return r.forEach(function(e) {
            var r = h(e, n, "font", "Roboto"),
                i = h(e, n, "fontSize", 12),
                o = h(e, n, "bold", !1),
                a = h(e, n, "italics", !1),
                u = h(e, n, "color", "black"),
                l = h(e, n, "decoration", null),
                d = h(e, n, "decorationColor", null),
                p = h(e, n, "decorationStyle", null),
                g = h(e, n, "background", null),
                v = h(e, n, "lineHeight", 1),
                m = t.provideFont(r, o, a);
            e.width = m.widthOfString(s(e.text), i), e.height = m.lineHeight(i) * v;
            var y = e.text.match(c),
                w = e.text.match(f);
            e.leadingCut = y ? m.widthOfString(y[0], i) : 0, e.trailingCut = w ? m.widthOfString(w[0], i) : 0, e.alignment = h(e, n, "alignment", "left"), e.font = m, e.fontSize = i, e.color = u, e.decoration = l, e.decorationColor = d, e.decorationStyle = p, e.background = g
        }), r
    }
    var l = /([^ ,\/!.?:;\-\n]*[ ,\/!.?:;\-]*)|\n/g,
        c = /^(\s)+/g,
        f = /(\s)+$/g;
    r.prototype.buildInlines = function(t, e) {
        function n(t) {
            return Math.max(0, t.width - t.leadingCut - t.trailingCut)
        }
        var r, i = u(this.fontProvider, t, e),
            o = 0,
            a = 0;
        return i.forEach(function(t) {
            o = Math.max(o, t.width - t.leadingCut - t.trailingCut), r || (r = {
                width: 0,
                leadingCut: t.leadingCut,
                trailingCut: 0
            }), r.width += t.width, r.trailingCut = t.trailingCut, a = Math.max(a, n(r)), t.lineEnd && (r = null)
        }), {
            items: i,
            minWidth: o,
            maxWidth: a
        }
    }, r.prototype.sizeOfString = function(t, e) {
        t = t.replace("	", "    ");
        var n = h({}, e, "font", "Roboto"),
            r = h({}, e, "fontSize", 12),
            i = h({}, e, "bold", !1),
            o = h({}, e, "italics", !1),
            a = h({}, e, "lineHeight", 1),
            u = this.fontProvider.provideFont(n, i, o);
        return {
            width: u.widthOfString(s(t), r),
            height: u.lineHeight(r) * a,
            fontSize: r,
            lineHeight: a,
            ascender: u.ascender / 1e3 * r,
            decender: u.decender / 1e3 * r
        }
    };
    var d = {
        "Ą": "A",
        "Ć": "C",
        "Ę": "E",
        "Ł": "L",
        "Ń": "N",
        "Ó": "O",
        "Ś": "S",
        "Ź": "Z",
        "Ż": "Z",
        "ą": "a",
        "ć": "c",
        "ę": "e",
        "ł": "l",
        "ń": "n",
        "ó": "o",
        "ś": "s",
        "ź": "z",
        "ż": "z"
    };
    t.exports = r
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        this.defaultStyle = e || {}, this.styleDictionary = t, this.styleOverrides = []
    }
    r.prototype.clone = function() {
        var t = new r(this.styleDictionary, this.defaultStyle);
        return this.styleOverrides.forEach(function(e) {
            t.styleOverrides.push(e)
        }), t
    }, r.prototype.push = function(t) {
        this.styleOverrides.push(t)
    }, r.prototype.pop = function(t) {
        for (t = t || 1; t-- > 0;) this.styleOverrides.pop()
    }, r.prototype.autopush = function(t) {
        if ("string" == typeof t || t instanceof String) return 0;
        var e = [];
        t.style && (e = t.style instanceof Array ? t.style : [t.style]);
        for (var n = 0, r = e.length; r > n; n++) this.push(e[n]);
        var i = {},
            o = !1;
        return ["font", "fontSize", "bold", "italics", "alignment", "color", "columnGap", "fillColor", "decoration", "decorationStyle", "decorationColor", "background", "lineHeight"].forEach(function(e) {
            void 0 !== t[e] && null !== t[e] && (i[e] = t[e], o = !0)
        }), o && this.push(i), e.length + (o ? 1 : 0)
    }, r.prototype.auto = function(t, e) {
        var n = this.autopush(t),
            r = e();
        return n > 0 && this.pop(n), r
    }, r.prototype.getProperty = function(t) {
        if (this.styleOverrides)
            for (var e = this.styleOverrides.length - 1; e >= 0; e--) {
                var n = this.styleOverrides[e];
                if ("string" == typeof n || n instanceof String) {
                    var r = this.styleDictionary[n];
                    if (r && null !== r[t] && void 0 !== r[t]) return r[t]
                } else if (void 0 !== n[t] && null !== n[t]) return n[t]
            }
        return this.defaultStyle && this.defaultStyle[t]
    }, t.exports = r
}, function(t, e, n) {
    (function(e) {
        (function() {
            var r, i, o, a, s, h, u = {}.hasOwnProperty,
                l = function(t, e) {
                    function n() {
                        this.constructor = t
                    }
                    for (var r in e) u.call(e, r) && (t[r] = e[r]);
                    return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
                };
            h = n(46), s = n(10), i = n(32), a = n(12), o = n(38), r = function(t) {
                function r(t) {
                    var e, n, i, o;
                    if (this.options = null != t ? t : {}, r.__super__.constructor.apply(this, arguments), this.version = 1.3, this.compress = null != (i = this.options.compress) ? i : !0, this._pageBuffer = [], this._pageBufferStart = 0, this._offsets = [], this._waiting = 0, this._ended = !1, this._offset = 0, this._root = this.ref({
                            Type: "Catalog",
                            Pages: this.ref({
                                Type: "Pages",
                                Count: 0,
                                Kids: []
                            })
                        }), this.page = null, this.initColor(), this.initVector(), this.initFonts(), this.initText(), this.initImages(), this.info = {
                            Producer: "PDFKit",
                            Creator: "PDFKit",
                            CreationDate: new Date
                        }, this.options.info) {
                        o = this.options.info;
                        for (e in o) n = o[e], this.info[e] = n
                    }
                    this._write("%PDF-" + this.version), this._write("%ÿÿÿÿ"), this.addPage()
                }
                var h;
                return l(r, t), h = function(t) {
                    var e, n, i;
                    i = [];
                    for (n in t) e = t[n], i.push(r.prototype[n] = e);
                    return i
                }, h(n(41)), h(n(39)), h(n(44)), h(n(40)), h(n(42)), h(n(43)), r.prototype.addPage = function(t) {
                    var e;
                    return null == t && (t = this.options), this.options.bufferPages || this.flushPages(), this.page = new o(this, t), this._pageBuffer.push(this.page), e = this._root.data.Pages.data, e.Kids.push(this.page.dictionary), e.Count++, this.x = this.page.margins.left, this.y = this.page.margins.top, this._ctm = [1, 0, 0, 1, 0, 0], this.transform(1, 0, 0, -1, 0, this.page.height), this
                }, r.prototype.bufferedPageRange = function() {
                    return {
                        start: this._pageBufferStart,
                        count: this._pageBuffer.length
                    }
                }, r.prototype.switchToPage = function(t) {
                    var e;
                    if (!(e = this._pageBuffer[t - this._pageBufferStart])) throw new Error("switchToPage(" + t + ") out of bounds, current buffer covers pages " + this._pageBufferStart + " to " + (this._pageBufferStart + this._pageBuffer.length - 1));
                    return this.page = e
                }, r.prototype.flushPages = function() {
                    var t, e, n, r;
                    for (e = this._pageBuffer, this._pageBuffer = [], this._pageBufferStart += e.length, n = 0, r = e.length; r > n; n++) t = e[n], t.end()
                }, r.prototype.ref = function(t) {
                    var e;
                    return e = new a(this, this._offsets.length + 1, t), this._offsets.push(null), this._waiting++, e
                }, r.prototype._read = function() {}, r.prototype._write = function(t) {
                    return e.isBuffer(t) || (t = new e(t + "\n", "binary")), this.push(t), this._offset += t.length
                }, r.prototype.addContent = function(t) {
                    return this.page.write(t), this
                }, r.prototype._refEnd = function(t) {
                    return this._offsets[t.id - 1] = t.offset, 0 === --this._waiting && this._ended ? (this._finalize(), this._ended = !1) : void 0
                }, r.prototype.write = function(t, e) {
                    var n;
                    return n = new Error("PDFDocument#write is deprecated, and will be removed in a future version of PDFKit. Please pipe the document into a Node stream."), this.pipe(s.createWriteStream(t)), this.end(), this.once("end", e)
                }, r.prototype.output = function(t) {
                    throw new Error("PDFDocument#output is deprecated, and has been removed from PDFKit. Please pipe the document into a Node stream.")
                }, r.prototype.end = function() {
                    var t, e, n, r, i, o;
                    this.flushPages(), this._info = this.ref(), i = this.info;
                    for (e in i) r = i[e], "string" == typeof r && (r = new String(r)), this._info.data[e] = r;
                    this._info.end(), o = this._fontFamilies;
                    for (n in o) t = o[n], t.embed();
                    return this._root.end(), this._root.data.Pages.end(), 0 === this._waiting ? this._finalize() : this._ended = !0
                }, r.prototype._finalize = function(t) {
                    var e, n, r, o, a;
                    for (n = this._offset, this._write("xref"), this._write("0 " + (this._offsets.length + 1)), this._write("0000000000 65535 f "), a = this._offsets, r = 0, o = a.length; o > r; r++) e = a[r], e = ("0000000000" + e).slice(-10), this._write(e + " 00000 n ");
                    return this._write("trailer"), this._write(i.convert({
                        Size: this._offsets.length + 1,
                        Root: this._root,
                        Info: this._info
                    })), this._write("startxref"), this._write("" + n), this._write("%%EOF"), this.push(null)
                }, r.prototype.toString = function() {
                    return "[object PDFDocument]"
                }, r
            }(h.Readable), t.exports = r
        }).call(this)
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    e.read = function(t, e, n, r, i) {
        var o, a, s = 8 * i - r - 1,
            h = (1 << s) - 1,
            u = h >> 1,
            l = -7,
            c = n ? i - 1 : 0,
            f = n ? -1 : 1,
            d = t[e + c];
        for (c += f, o = d & (1 << -l) - 1, d >>= -l, l += s; l > 0; o = 256 * o + t[e + c], c += f, l -= 8);
        for (a = o & (1 << -l) - 1, o >>= -l, l += r; l > 0; a = 256 * a + t[e + c], c += f, l -= 8);
        if (0 === o) o = 1 - u;
        else {
            if (o === h) return a ? 0 / 0 : (d ? -1 : 1) * (1 / 0);
            a += Math.pow(2, r), o -= u
        }
        return (d ? -1 : 1) * a * Math.pow(2, o - r)
    }, e.write = function(t, e, n, r, i, o) {
        var a, s, h, u = 8 * o - i - 1,
            l = (1 << u) - 1,
            c = l >> 1,
            f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            d = r ? 0 : o - 1,
            p = r ? 1 : -1,
            g = 0 > e || 0 === e && 0 > 1 / e ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = l) : (a = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -a)) < 1 && (a--, h *= 2), e += a + c >= 1 ? f / h : f * Math.pow(2, 1 - c), e * h >= 2 && (a++, h /= 2), a + c >= l ? (s = 0, a = l) : a + c >= 1 ? (s = (e * h - 1) * Math.pow(2, i), a += c) : (s = e * Math.pow(2, c - 1) * Math.pow(2, i), a = 0)); i >= 8; t[n + d] = 255 & s, d += p, s /= 256, i -= 8);
        for (a = a << i | s, u += i; u > 0; t[n + d] = 255 & a, d += p, a /= 256, u -= 8);
        t[n + d - p] |= 128 * g
    }
}, function(t, e, n) {
    var r = Array.isArray,
        i = Object.prototype.toString;
    t.exports = r || function(t) {
        return !!t && "[object Array]" == i.call(t)
    }
}, function(t, e, n) {
    var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    ! function(t) {
        "use strict";

        function e(t) {
            var e = t.charCodeAt(0);
            return e === a || e === c ? 62 : e === s || e === f ? 63 : h > e ? -1 : h + 10 > e ? e - h + 26 + 26 : l + 26 > e ? e - l : u + 26 > e ? e - u + 26 : void 0
        }

        function n(t) {
            function n(t) {
                u[c++] = t
            }
            var r, i, a, s, h, u;
            if (t.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var l = t.length;
            h = "=" === t.charAt(l - 2) ? 2 : "=" === t.charAt(l - 1) ? 1 : 0, u = new o(3 * t.length / 4 - h), a = h > 0 ? t.length - 4 : t.length;
            var c = 0;
            for (r = 0, i = 0; a > r; r += 4, i += 3) s = e(t.charAt(r)) << 18 | e(t.charAt(r + 1)) << 12 | e(t.charAt(r + 2)) << 6 | e(t.charAt(r + 3)), n((16711680 & s) >> 16), n((65280 & s) >> 8), n(255 & s);
            return 2 === h ? (s = e(t.charAt(r)) << 2 | e(t.charAt(r + 1)) >> 4, n(255 & s)) : 1 === h && (s = e(t.charAt(r)) << 10 | e(t.charAt(r + 1)) << 4 | e(t.charAt(r + 2)) >> 2, n(s >> 8 & 255), n(255 & s)), u
        }

        function i(t) {
            function e(t) {
                return r.charAt(t)
            }

            function n(t) {
                return e(t >> 18 & 63) + e(t >> 12 & 63) + e(t >> 6 & 63) + e(63 & t)
            }
            var i, o, a, s = t.length % 3,
                h = "";
            for (i = 0, a = t.length - s; a > i; i += 3) o = (t[i] << 16) + (t[i + 1] << 8) + t[i + 2], h += n(o);
            switch (s) {
                case 1:
                    o = t[t.length - 1], h += e(o >> 2), h += e(o << 4 & 63), h += "==";
                    break;
                case 2:
                    o = (t[t.length - 2] << 8) + t[t.length - 1], h += e(o >> 10), h += e(o >> 4 & 63), h += e(o << 2 & 63), h += "="
            }
            return h
        }
        var o = "undefined" != typeof Uint8Array ? Uint8Array : Array,
            a = "+".charCodeAt(0),
            s = "/".charCodeAt(0),
            h = "0".charCodeAt(0),
            u = "a".charCodeAt(0),
            l = "A".charCodeAt(0),
            c = "-".charCodeAt(0),
            f = "_".charCodeAt(0);
        t.toByteArray = n, t.fromByteArray = i
    }(e)
}, function(t, e, n) {
    (function(e) {
        (function() {
            var r, i;
            r = function() {
                function t() {}
                var n, r, o, a;
                return o = function(t, e) {
                    return (Array(e + 1).join("0") + t).slice(-e)
                }, r = /[\n\r\t\b\f\(\)\\]/g, n = {
                    "\n": "\\n",
                    "\r": "\\r",
                    "	": "\\t",
                    "\b": "\\b",
                    "\f": "\\f",
                    "\\": "\\\\",
                    "(": "\\(",
                    ")": "\\)"
                }, a = function(t) {
                    var e, n, r, i, o;
                    if (r = t.length, 1 & r) throw new Error("Buffer length must be even");
                    for (n = i = 0, o = r - 1; o > i; n = i += 2) e = t[n], t[n] = t[n + 1], t[n + 1] = e;
                    return t
                }, t.convert = function(s) {
                    var h, u, l, c, f, d, p, g, v, m;
                    if ("string" == typeof s) return "/" + s;
                    if (s instanceof String) {
                        for (p = s.replace(r, function(t) {
                                return n[t]
                            }), l = !1, u = v = 0, m = p.length; m > v; u = v += 1)
                            if (p.charCodeAt(u) > 127) {
                                l = !0;
                                break
                            } return l && (p = a(new e("\ufeff" + p, "utf16le")).toString("binary")), "(" + p + ")"
                    }
                    if (e.isBuffer(s)) return "<" + s.toString("hex") + ">";
                    if (s instanceof i) return s.toString();
                    if (s instanceof Date) return "(D:" + o(s.getUTCFullYear(), 4) + o(s.getUTCMonth(), 2) + o(s.getUTCDate(), 2) + o(s.getUTCHours(), 2) + o(s.getUTCMinutes(), 2) + o(s.getUTCSeconds(), 2) + "Z)";
                    if (Array.isArray(s)) return c = function() {
                        var e, n, r;
                        for (r = [], e = 0, n = s.length; n > e; e++) h = s[e], r.push(t.convert(h));
                        return r
                    }().join(" "), "[" + c + "]";
                    if ("[object Object]" === {}.toString.call(s)) {
                        d = ["<<"];
                        for (f in s) g = s[f], d.push("/" + f + " " + t.convert(g));
                        return d.push(">>"), d.join("\n")
                    }
                    return "" + s
                }, t
            }(), t.exports = r, i = n(12)
        }).call(this)
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        var n = {
                numeric: h,
                alphanumeric: u,
                octet: l
            },
            r = {
                L: g,
                M: v,
                Q: m,
                H: y
            };
        e = e || {};
        var i = e.version || -1,
            o = r[(e.eccLevel || "L").toUpperCase()],
            a = e.mode ? n[e.mode.toLowerCase()] : -1,
            s = "mask" in e ? e.mask : -1;
        if (0 > a) a = "string" == typeof t ? t.match(f) ? h : t.match(p) ? u : l : l;
        else if (a != h && a != u && a != l) throw "invalid or unsupported mode";
        if (t = P(a, t), null === t) throw "invalid data format";
        if (0 > o || o > 3) throw "invalid ECC level";
        if (0 > i) {
            for (i = 1; 40 >= i && !(t.length <= U(i, a, o)); ++i);
            if (i > 40) throw "too large data for the Qr format"
        } else if (1 > i || i > 40) throw "invalid Qr version! should be between 1 and 40";
        if (-1 != s && (0 > s || s > 8)) throw "invalid mask";
        return Y(t, i, a, o, s)
    }

    function i(t, e) {
        var n = [],
            i = t.background || "#fff",
            o = t.foreground || "#000",
            a = r(t, e),
            s = a.length,
            h = Math.floor(e.fit ? e.fit / s : 5),
            u = s * h;
        n.push({
            type: "rect",
            x: 0,
            y: 0,
            w: u,
            h: u,
            lineWidth: 0,
            color: i
        });
        for (var l = 0; s > l; ++l)
            for (var c = 0; s > c; ++c) a[l][c] && n.push({
                type: "rect",
                x: h * l,
                y: h * c,
                w: h,
                h: h,
                lineWidth: 0,
                color: o
            });
        return {
            canvas: n,
            size: u
        }
    }

    function o(t) {
        var e = i(t.qr, t);
        return t._canvas = e.canvas, t._width = t._height = t._minWidth = t._maxWidth = t._minHeight = t._maxHeight = e.size, t
    }
    for (var a = [null, [
                [10, 7, 17, 13],
                [1, 1, 1, 1],
                []
            ],
            [
                [16, 10, 28, 22],
                [1, 1, 1, 1],
                [4, 16]
            ],
            [
                [26, 15, 22, 18],
                [1, 1, 2, 2],
                [4, 20]
            ],
            [
                [18, 20, 16, 26],
                [2, 1, 4, 2],
                [4, 24]
            ],
            [
                [24, 26, 22, 18],
                [2, 1, 4, 4],
                [4, 28]
            ],
            [
                [16, 18, 28, 24],
                [4, 2, 4, 4],
                [4, 32]
            ],
            [
                [18, 20, 26, 18],
                [4, 2, 5, 6],
                [4, 20, 36]
            ],
            [
                [22, 24, 26, 22],
                [4, 2, 6, 6],
                [4, 22, 40]
            ],
            [
                [22, 30, 24, 20],
                [5, 2, 8, 8],
                [4, 24, 44]
            ],
            [
                [26, 18, 28, 24],
                [5, 4, 8, 8],
                [4, 26, 48]
            ],
            [
                [30, 20, 24, 28],
                [5, 4, 11, 8],
                [4, 28, 52]
            ],
            [
                [22, 24, 28, 26],
                [8, 4, 11, 10],
                [4, 30, 56]
            ],
            [
                [22, 26, 22, 24],
                [9, 4, 16, 12],
                [4, 32, 60]
            ],
            [
                [24, 30, 24, 20],
                [9, 4, 16, 16],
                [4, 24, 44, 64]
            ],
            [
                [24, 22, 24, 30],
                [10, 6, 18, 12],
                [4, 24, 46, 68]
            ],
            [
                [28, 24, 30, 24],
                [10, 6, 16, 17],
                [4, 24, 48, 72]
            ],
            [
                [28, 28, 28, 28],
                [11, 6, 19, 16],
                [4, 28, 52, 76]
            ],
            [
                [26, 30, 28, 28],
                [13, 6, 21, 18],
                [4, 28, 54, 80]
            ],
            [
                [26, 28, 26, 26],
                [14, 7, 25, 21],
                [4, 28, 56, 84]
            ],
            [
                [26, 28, 28, 30],
                [16, 8, 25, 20],
                [4, 32, 60, 88]
            ],
            [
                [26, 28, 30, 28],
                [17, 8, 25, 23],
                [4, 26, 48, 70, 92]
            ],
            [
                [28, 28, 24, 30],
                [17, 9, 34, 23],
                [4, 24, 48, 72, 96]
            ],
            [
                [28, 30, 30, 30],
                [18, 9, 30, 25],
                [4, 28, 52, 76, 100]
            ],
            [
                [28, 30, 30, 30],
                [20, 10, 32, 27],
                [4, 26, 52, 78, 104]
            ],
            [
                [28, 26, 30, 30],
                [21, 12, 35, 29],
                [4, 30, 56, 82, 108]
            ],
            [
                [28, 28, 30, 28],
                [23, 12, 37, 34],
                [4, 28, 56, 84, 112]
            ],
            [
                [28, 30, 30, 30],
                [25, 12, 40, 34],
                [4, 32, 60, 88, 116]
            ],
            [
                [28, 30, 30, 30],
                [26, 13, 42, 35],
                [4, 24, 48, 72, 96, 120]
            ],
            [
                [28, 30, 30, 30],
                [28, 14, 45, 38],
                [4, 28, 52, 76, 100, 124]
            ],
            [
                [28, 30, 30, 30],
                [29, 15, 48, 40],
                [4, 24, 50, 76, 102, 128]
            ],
            [
                [28, 30, 30, 30],
                [31, 16, 51, 43],
                [4, 28, 54, 80, 106, 132]
            ],
            [
                [28, 30, 30, 30],
                [33, 17, 54, 45],
                [4, 32, 58, 84, 110, 136]
            ],
            [
                [28, 30, 30, 30],
                [35, 18, 57, 48],
                [4, 28, 56, 84, 112, 140]
            ],
            [
                [28, 30, 30, 30],
                [37, 19, 60, 51],
                [4, 32, 60, 88, 116, 144]
            ],
            [
                [28, 30, 30, 30],
                [38, 19, 63, 53],
                [4, 28, 52, 76, 100, 124, 148]
            ],
            [
                [28, 30, 30, 30],
                [40, 20, 66, 56],
                [4, 22, 48, 74, 100, 126, 152]
            ],
            [
                [28, 30, 30, 30],
                [43, 21, 70, 59],
                [4, 26, 52, 78, 104, 130, 156]
            ],
            [
                [28, 30, 30, 30],
                [45, 22, 74, 62],
                [4, 30, 56, 82, 108, 134, 160]
            ],
            [
                [28, 30, 30, 30],
                [47, 24, 77, 65],
                [4, 24, 52, 80, 108, 136, 164]
            ],
            [
                [28, 30, 30, 30],
                [49, 25, 81, 68],
                [4, 28, 56, 84, 112, 140, 168]
            ]
        ], s = 0, h = 1, u = 2, l = 4, c = 8, f = /^\d*$/, d = /^[A-Za-z0-9 $%*+\-./:]*$/, p = /^[A-Z0-9 $%*+\-./:]*$/, g = 1, v = 0, m = 3, y = 2, w = [], _ = [-1], b = 0, x = 1; 255 > b; ++b) w.push(x), _[x] = b, x = 2 * x ^ (x >= 128 ? 285 : 0);
    for (var S = [
            []
        ], b = 0; 30 > b; ++b) {
        for (var k = S[b], E = [], C = 0; b >= C; ++C) {
            var I = b > C ? w[k[C]] : 0,
                A = w[(b + (k[C - 1] || 0)) % 255];
            E.push(_[I ^ A])
        }
        S.push(E)
    }
    for (var L = {}, b = 0; 45 > b; ++b) L["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".charAt(b)] = b;
    var R = [function(t, e) {
            return (t + e) % 2 === 0
        }, function(t, e) {
            return t % 2 === 0
        }, function(t, e) {
            return e % 3 === 0
        }, function(t, e) {
            return (t + e) % 3 === 0
        }, function(t, e) {
            return ((t / 2 | 0) + (e / 3 | 0)) % 2 === 0
        }, function(t, e) {
            return t * e % 2 + t * e % 3 === 0
        }, function(t, e) {
            return (t * e % 2 + t * e % 3) % 2 === 0
        }, function(t, e) {
            return ((t + e) % 2 + t * e % 3) % 2 === 0
        }],
        B = function(t) {
            return t > 6
        },
        T = function(t) {
            return 4 * t + 17
        },
        M = function(t) {
            var e = a[t],
                n = 16 * t * t + 128 * t + 64;
            return B(t) && (n -= 36), e[2].length && (n -= 25 * e[2].length * e[2].length - 10 * e[2].length - 55), n
        },
        O = function(t, e) {
            var n = -8 & M(t),
                r = a[t];
            return n -= 8 * r[0][e] * r[1][e]
        },
        D = function(t, e) {
            switch (e) {
                case h:
                    return 10 > t ? 10 : 27 > t ? 12 : 14;
                case u:
                    return 10 > t ? 9 : 27 > t ? 11 : 13;
                case l:
                    return 10 > t ? 8 : 16;
                case c:
                    return 10 > t ? 8 : 27 > t ? 10 : 12
            }
        },
        U = function(t, e, n) {
            var r = O(t, n) - 4 - D(t, e);
            switch (e) {
                case h:
                    return 3 * (r / 10 | 0) + (4 > r % 10 ? 0 : 7 > r % 10 ? 1 : 2);
                case u:
                    return 2 * (r / 11 | 0) + (6 > r % 11 ? 0 : 1);
                case l:
                    return r / 8 | 0;
                case c:
                    return r / 13 | 0
            }
        },
        P = function(t, e) {
            switch (t) {
                case h:
                    return e.match(f) ? e : null;
                case u:
                    return e.match(d) ? e.toUpperCase() : null;
                case l:
                    if ("string" == typeof e) {
                        for (var n = [], r = 0; r < e.length; ++r) {
                            var i = e.charCodeAt(r);
                            128 > i ? n.push(i) : 2048 > i ? n.push(192 | i >> 6, 128 | 63 & i) : 65536 > i ? n.push(224 | i >> 12, 128 | i >> 6 & 63, 128 | 63 & i) : n.push(240 | i >> 18, 128 | i >> 12 & 63, 128 | i >> 6 & 63, 128 | 63 & i)
                        }
                        return n
                    }
                    return e
            }
        },
        F = function(t, e, n, r) {
            var i = [],
                o = 0,
                a = 8,
                c = n.length,
                f = function(t, e) {
                    if (e >= a) {
                        for (i.push(o | t >> (e -= a)); e >= 8;) i.push(t >> (e -= 8) & 255);
                        o = 0, a = 8
                    }
                    e > 0 && (o |= (t & (1 << e) - 1) << (a -= e))
                },
                d = D(t, e);
            switch (f(e, 4), f(c, d), e) {
                case h:
                    for (var p = 2; c > p; p += 3) f(parseInt(n.substring(p - 2, p + 1), 10), 10);
                    f(parseInt(n.substring(p - 2), 10), [0, 4, 7][c % 3]);
                    break;
                case u:
                    for (var p = 1; c > p; p += 2) f(45 * L[n.charAt(p - 1)] + L[n.charAt(p)], 11);
                    c % 2 == 1 && f(L[n.charAt(p - 1)], 6);
                    break;
                case l:
                    for (var p = 0; c > p; ++p) f(n[p], 8)
            }
            for (f(s, 4), 8 > a && i.push(o); i.length + 1 < r;) i.push(236, 17);
            return i.length < r && i.push(236), i
        },
        z = function(t, e) {
            for (var n = t.slice(0), r = t.length, i = e.length, o = 0; i > o; ++o) n.push(0);
            for (var o = 0; r > o;) {
                var a = _[n[o++]];
                if (a >= 0)
                    for (var s = 0; i > s; ++s) n[o + s] ^= w[(a + e[s]) % 255]
            }
            return n.slice(r)
        },
        W = function(t, e, n) {
            for (var r = [], i = t.length / e | 0, o = 0, a = e - t.length % e, s = 0; a > s; ++s) r.push(o), o += i;
            for (var s = a; e > s; ++s) r.push(o), o += i + 1;
            r.push(o);
            for (var h = [], s = 0; e > s; ++s) h.push(z(t.slice(r[s], r[s + 1]), n));
            for (var u = [], l = t.length / e | 0, s = 0; l > s; ++s)
                for (var c = 0; e > c; ++c) u.push(t[r[c] + s]);
            for (var c = a; e > c; ++c) u.push(t[r[c + 1] - 1]);
            for (var s = 0; s < n.length; ++s)
                for (var c = 0; e > c; ++c) u.push(h[c][s]);
            return u
        },
        N = function(t, e, n, r) {
            for (var i = t << r, o = e - 1; o >= 0; --o) i >> r + o & 1 && (i ^= n << o);
            return t << r | i
        },
        j = function(t) {
            for (var e = a[t], n = T(t), r = [], i = [], o = 0; n > o; ++o) r.push([]), i.push([]);
            var s = function(t, e, n, o, a) {
                for (var s = 0; n > s; ++s)
                    for (var h = 0; o > h; ++h) r[t + s][e + h] = a[s] >> h & 1, i[t + s][e + h] = 1
            };
            s(0, 0, 9, 9, [127, 65, 93, 93, 93, 65, 383, 0, 64]), s(n - 8, 0, 8, 9, [256, 127, 65, 93, 93, 93, 65, 127]), s(0, n - 8, 9, 8, [254, 130, 186, 186, 186, 130, 254, 0, 0]);
            for (var o = 9; n - 8 > o; ++o) r[6][o] = r[o][6] = 1 & ~o, i[6][o] = i[o][6] = 1;
            for (var h = e[2], u = h.length, o = 0; u > o; ++o)
                for (var l = 0 === o || o === u - 1 ? 1 : 0, c = 0 === o ? u - 1 : u, f = l; c > f; ++f) s(h[o], h[f], 5, 5, [31, 17, 21, 17, 31]);
            if (B(t))
                for (var d = N(t, 6, 7973, 12), p = 0, o = 0; 6 > o; ++o)
                    for (var f = 0; 3 > f; ++f) r[o][n - 11 + f] = r[n - 11 + f][o] = d >> p++ & 1, i[o][n - 11 + f] = i[n - 11 + f][o] = 1;
            return {
                matrix: r,
                reserved: i
            }
        },
        H = function(t, e, n) {
            for (var r = t.length, i = 0, o = -1, a = r - 1; a >= 0; a -= 2) {
                6 == a && --a;
                for (var s = 0 > o ? r - 1 : 0, h = 0; r > h; ++h) {
                    for (var u = a; u > a - 2; --u) e[s][u] || (t[s][u] = n[i >> 3] >> (7 & ~i) & 1, ++i);
                    s += o
                }
                o = -o
            }
            return t
        },
        Z = function(t, e, n) {
            for (var r = R[n], i = t.length, o = 0; i > o; ++o)
                for (var a = 0; i > a; ++a) e[o][a] || (t[o][a] ^= r(o, a));
            return t
        },
        G = function(t, e, n, r) {
            for (var i = t.length, o = 21522 ^ N(n << 3 | r, 5, 1335, 10), a = 0; 15 > a; ++a) {
                var s = [0, 1, 2, 3, 4, 5, 7, 8, i - 7, i - 6, i - 5, i - 4, i - 3, i - 2, i - 1][a],
                    h = [i - 1, i - 2, i - 3, i - 4, i - 5, i - 6, i - 7, i - 8, 7, 5, 4, 3, 2, 1, 0][a];
                t[s][8] = t[8][h] = o >> a & 1
            }
            return t
        },
        q = function(t) {
            for (var e = 3, n = 3, r = 40, i = 10, o = function(t) {
                    for (var n = 0, i = 0; i < t.length; ++i) t[i] >= 5 && (n += e + (t[i] - 5));
                    for (var i = 5; i < t.length; i += 2) {
                        var o = t[i];
                        t[i - 1] == o && t[i - 2] == 3 * o && t[i - 3] == o && t[i - 4] == o && (t[i - 5] >= 4 * o || t[i + 1] >= 4 * o) && (n += r)
                    }
                    return n
                }, a = t.length, s = 0, h = 0, u = 0; a > u; ++u) {
                var l, c = t[u];
                l = [0];
                for (var f = 0; a > f;) {
                    var d;
                    for (d = 0; a > f && c[f]; ++d) ++f;
                    for (l.push(d), d = 0; a > f && !c[f]; ++d) ++f;
                    l.push(d)
                }
                s += o(l), l = [0];
                for (var f = 0; a > f;) {
                    var d;
                    for (d = 0; a > f && t[f][u]; ++d) ++f;
                    for (l.push(d), d = 0; a > f && !t[f][u]; ++d) ++f;
                    l.push(d)
                }
                s += o(l);
                var p = t[u + 1] || [];
                h += c[0];
                for (var f = 1; a > f; ++f) {
                    var g = c[f];
                    h += g, c[f - 1] == g && p[f] === g && p[f - 1] === g && (s += n)
                }
            }
            return s += i * (Math.abs(h / a / a - .5) / .05 | 0)
        },
        Y = function(t, e, n, r, i) {
            var o = a[e],
                s = F(e, n, t, O(e, r) >> 3);
            s = W(s, o[1][r], S[o[0][r]]);
            var h = j(e),
                u = h.matrix,
                l = h.reserved;
            if (H(u, l, s), 0 > i) {
                Z(u, l, 0), G(u, l, r, 0);
                var c = 0,
                    f = q(u);
                for (Z(u, l, 0), i = 1; 8 > i; ++i) {
                    Z(u, l, i), G(u, l, r, i);
                    var d = q(u);
                    f > d && (f = d, c = i), Z(u, l, i)
                }
                i = c
            }
            return Z(u, l, i), G(u, l, r, i), u
        };
    t.exports = {
        measure: o
    }
}, function(t, e, n) {
    (function() {
        var e;
        e = function() {
            function t(t) {
                this.data = null != t ? t : [], this.pos = 0, this.length = this.data.length
            }
            return t.prototype.readByte = function() {
                return this.data[this.pos++]
            }, t.prototype.writeByte = function(t) {
                return this.data[this.pos++] = t
            }, t.prototype.byteAt = function(t) {
                return this.data[t]
            }, t.prototype.readBool = function() {
                return !!this.readByte()
            }, t.prototype.writeBool = function(t) {
                return this.writeByte(t ? 1 : 0)
            }, t.prototype.readUInt32 = function() {
                var t, e, n, r;
                return t = 16777216 * this.readByte(), e = this.readByte() << 16, n = this.readByte() << 8, r = this.readByte(), t + e + n + r
            }, t.prototype.writeUInt32 = function(t) {
                return this.writeByte(t >>> 24 & 255), this.writeByte(t >> 16 & 255), this.writeByte(t >> 8 & 255), this.writeByte(255 & t)
            }, t.prototype.readInt32 = function() {
                var t;
                return t = this.readUInt32(), t >= 2147483648 ? t - 4294967296 : t
            }, t.prototype.writeInt32 = function(t) {
                return 0 > t && (t += 4294967296), this.writeUInt32(t)
            }, t.prototype.readUInt16 = function() {
                var t, e;
                return t = this.readByte() << 8, e = this.readByte(), t | e
            }, t.prototype.writeUInt16 = function(t) {
                return this.writeByte(t >> 8 & 255), this.writeByte(255 & t)
            }, t.prototype.readInt16 = function() {
                var t;
                return t = this.readUInt16(), t >= 32768 ? t - 65536 : t
            }, t.prototype.writeInt16 = function(t) {
                return 0 > t && (t += 65536), this.writeUInt16(t)
            }, t.prototype.readString = function(t) {
                var e, n, r;
                for (n = [], e = r = 0; t >= 0 ? t > r : r > t; e = t >= 0 ? ++r : --r) n[e] = String.fromCharCode(this.readByte());
                return n.join("")
            }, t.prototype.writeString = function(t) {
                var e, n, r, i;
                for (i = [], e = n = 0, r = t.length; r >= 0 ? r > n : n > r; e = r >= 0 ? ++n : --n) i.push(this.writeByte(t.charCodeAt(e)));
                return i
            }, t.prototype.stringAt = function(t, e) {
                return this.pos = t, this.readString(e)
            }, t.prototype.readShort = function() {
                return this.readInt16()
            }, t.prototype.writeShort = function(t) {
                return this.writeInt16(t)
            }, t.prototype.readLongLong = function() {
                var t, e, n, r, i, o, a, s;
                return t = this.readByte(), e = this.readByte(), n = this.readByte(), r = this.readByte(), i = this.readByte(), o = this.readByte(), a = this.readByte(), s = this.readByte(), 128 & t ? -1 * (72057594037927940 * (255 ^ t) + 281474976710656 * (255 ^ e) + 1099511627776 * (255 ^ n) + 4294967296 * (255 ^ r) + 16777216 * (255 ^ i) + 65536 * (255 ^ o) + 256 * (255 ^ a) + (255 ^ s) + 1) : 72057594037927940 * t + 281474976710656 * e + 1099511627776 * n + 4294967296 * r + 16777216 * i + 65536 * o + 256 * a + s
            }, t.prototype.writeLongLong = function(t) {
                var e, n;
                return e = Math.floor(t / 4294967296), n = 4294967295 & t, this.writeByte(e >> 24 & 255), this.writeByte(e >> 16 & 255), this.writeByte(e >> 8 & 255), this.writeByte(255 & e), this.writeByte(n >> 24 & 255), this.writeByte(n >> 16 & 255), this.writeByte(n >> 8 & 255), this.writeByte(255 & n)
            }, t.prototype.readInt = function() {
                return this.readInt32()
            }, t.prototype.writeInt = function(t) {
                return this.writeInt32(t)
            }, t.prototype.slice = function(t, e) {
                return this.data.slice(t, e)
            }, t.prototype.read = function(t) {
                var e, n, r;
                for (e = [], n = r = 0; t >= 0 ? t > r : r > t; n = t >= 0 ? ++r : --r) e.push(this.readByte());
                return e
            }, t.prototype.write = function(t) {
                var e, n, r, i;
                for (i = [], n = 0, r = t.length; r > n; n++) e = t[n], i.push(this.writeByte(e));
                return i
            }, t
        }(), t.exports = e
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, r, i = [].indexOf || function(t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
        r = n(10), e = function() {
            function t(t, n) {
                var r, o, a;
                if (this.data = t, this.label = n, 65496 !== this.data.readUInt16BE(0)) throw "SOI not found in JPEG";
                for (a = 2; a < this.data.length && (o = this.data.readUInt16BE(a), a += 2, !(i.call(e, o) >= 0));) a += this.data.readUInt16BE(a);
                if (i.call(e, o) < 0) throw "Invalid JPEG.";
                a += 2, this.bits = this.data[a++], this.height = this.data.readUInt16BE(a), a += 2, this.width = this.data.readUInt16BE(a), a += 2, r = this.data[a++], this.colorSpace = function() {
                    switch (r) {
                        case 1:
                            return "DeviceGray";
                        case 3:
                            return "DeviceRGB";
                        case 4:
                            return "DeviceCMYK"
                    }
                }(), this.obj = null
            }
            var e;
            return e = [65472, 65473, 65474, 65475, 65477, 65478, 65479, 65480, 65481, 65482, 65483, 65484, 65485, 65486, 65487], t.prototype.embed = function(t) {
                return this.obj ? void 0 : (this.obj = t.ref({
                    Type: "XObject",
                    Subtype: "Image",
                    BitsPerComponent: this.bits,
                    Width: this.width,
                    Height: this.height,
                    ColorSpace: this.colorSpace,
                    Filter: "DCTDecode"
                }), "DeviceCMYK" === this.colorSpace && (this.obj.data.Decode = [1, 0, 1, 0, 1, 0, 1, 0]), this.obj.end(this.data), this.data = null)
            }, t
        }(), t.exports = e
    }).call(this)
}, function(t, e, n) {
    (function(e) {
        (function() {
            var r, i, o;
            o = n(45), r = n(51), i = function() {
                function t(t, e) {
                    this.label = e, this.image = new r(t), this.width = this.image.width, this.height = this.image.height, this.imgData = this.image.imgData, this.obj = null
                }
                return t.prototype.embed = function(t) {
                    var n, r, i, o, a, s, h, u;
                    if (this.document = t, !this.obj) {
                        if (this.obj = t.ref({
                                Type: "XObject",
                                Subtype: "Image",
                                BitsPerComponent: this.image.bits,
                                Width: this.width,
                                Height: this.height,
                                Filter: "FlateDecode"
                            }), this.image.hasAlphaChannel || (i = t.ref({
                                Predictor: 15,
                                Colors: this.image.colors,
                                BitsPerComponent: this.image.bits,
                                Columns: this.width
                            }), this.obj.data.DecodeParms = i, i.end()), 0 === this.image.palette.length ? this.obj.data.ColorSpace = this.image.colorSpace : (r = t.ref(), r.end(new e(this.image.palette)), this.obj.data.ColorSpace = ["Indexed", "DeviceRGB", this.image.palette.length / 3 - 1, r]), this.image.transparency.grayscale) return a = this.image.transparency.greyscale, this.obj.data.Mask = [a, a];
                        if (this.image.transparency.rgb) {
                            for (o = this.image.transparency.rgb, n = [], h = 0, u = o.length; u > h; h++) s = o[h], n.push(s, s);
                            return this.obj.data.Mask = n
                        }
                        return this.image.transparency.indexed ? this.loadIndexedAlphaChannel() : this.image.hasAlphaChannel ? this.splitAlphaChannel() : this.finalize()
                    }
                }, t.prototype.finalize = function() {
                    var t;
                    return this.alphaChannel && (t = this.document.ref({
                        Type: "XObject",
                        Subtype: "Image",
                        Height: this.height,
                        Width: this.width,
                        BitsPerComponent: 8,
                        Filter: "FlateDecode",
                        ColorSpace: "DeviceGray",
                        Decode: [0, 1]
                    }), t.end(this.alphaChannel), this.obj.data.SMask = t), this.obj.end(this.imgData), this.image = null, this.imgData = null
                }, t.prototype.splitAlphaChannel = function() {
                    return this.image.decodePixels(function(t) {
                        return function(n) {
                            var r, i, a, s, h, u, l, c, f;
                            for (a = t.image.colors * t.image.bits / 8, f = t.width * t.height, u = new e(f * a), i = new e(f), h = c = r = 0, l = n.length; l > h;) u[c++] = n[h++], u[c++] = n[h++], u[c++] = n[h++], i[r++] = n[h++];
                            return s = 0, o.deflate(u, function(e, n) {
                                if (t.imgData = n, e) throw e;
                                return 2 === ++s ? t.finalize() : void 0
                            }), o.deflate(i, function(e, n) {
                                if (t.alphaChannel = n, e) throw e;
                                return 2 === ++s ? t.finalize() : void 0
                            })
                        }
                    }(this))
                }, t.prototype.loadIndexedAlphaChannel = function(t) {
                    var n;
                    return n = this.image.transparency.indexed, this.image.decodePixels(function(t) {
                        return function(r) {
                            var i, a, s, h, u;
                            for (i = new e(t.width * t.height), a = 0, s = h = 0, u = r.length; u > h; s = h += 1) i[a++] = n[r[s]];
                            return o.deflate(i, function(e, n) {
                                if (t.alphaChannel = n, e) throw e;
                                return t.finalize()
                            })
                        }
                    }(this))
                }, t
            }(), t.exports = i
        }).call(this)
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        this.context = t, this.contextStack = [], this.tracker = e
    }

    function i(t, e, n) {
        null === n || void 0 === n || 0 > n || n > t.items.length ? t.items.push(e) : t.items.splice(n, 0, e)
    }

    function o(t) {
        var e = new a(t.maxWidth);
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }
    var a = n(24),
        s = n(25).pack,
        h = n(25).offsetVector,
        u = n(20);
    r.prototype.addLine = function(t, e, n) {
        var r = t.getHeight(),
            o = this.context,
            a = o.getCurrentPage(),
            s = this.getCurrentPositionOnPage();
        return o.availableHeight < r || !a ? !1 : (t.x = o.x + (t.x || 0), t.y = o.y + (t.y || 0), this.alignLine(t), i(a, {
            type: "line",
            item: t
        }, n), this.tracker.emit("lineAdded", t), e || o.moveDown(r), s)
    }, r.prototype.alignLine = function(t) {
        var e = this.context.availableWidth,
            n = t.getWidth(),
            r = t.inlines && t.inlines.length > 0 && t.inlines[0].alignment,
            i = 0;
        switch (r) {
            case "right":
                i = e - n;
                break;
            case "center":
                i = (e - n) / 2
        }
        if (i && (t.x = (t.x || 0) + i), "justify" === r && !t.newLineForced && !t.lastLineInParagraph && t.inlines.length > 1)
            for (var o = (e - n) / (t.inlines.length - 1), a = 1, s = t.inlines.length; s > a; a++) i = a * o, t.inlines[a].x += i
    }, r.prototype.addImage = function(t, e) {
        var n = this.context,
            r = n.getCurrentPage(),
            o = this.getCurrentPositionOnPage();
        return n.availableHeight < t._height || !r ? !1 : (t.x = n.x + (t.x || 0), t.y = n.y, this.alignImage(t), i(r, {
            type: "image",
            item: t
        }, e), n.moveDown(t._height), o)
    }, r.prototype.addQr = function(t, e) {
        var n = this.context,
            r = n.getCurrentPage(),
            i = this.getCurrentPositionOnPage();
        if (n.availableHeight < t._height || !r) return !1;
        t.x = n.x + (t.x || 0), t.y = n.y, this.alignImage(t);
        for (var o = 0, a = t._canvas.length; a > o; o++) {
            var s = t._canvas[o];
            s.x += t.x, s.y += t.y, this.addVector(s, !0, !0, e)
        }
        return n.moveDown(t._height), i
    }, r.prototype.alignImage = function(t) {
        var e = this.context.availableWidth,
            n = t._minWidth,
            r = 0;
        switch (t._alignment) {
            case "right":
                r = e - n;
                break;
            case "center":
                r = (e - n) / 2
        }
        r && (t.x = (t.x || 0) + r)
    }, r.prototype.addVector = function(t, e, n, r) {
        var o = this.context,
            a = o.getCurrentPage(),
            s = this.getCurrentPositionOnPage();
        return a ? (h(t, e ? 0 : o.x, n ? 0 : o.y), i(a, {
            type: "vector",
            item: t
        }, r), s) : void 0
    }, r.prototype.addFragment = function(t, e, n, r) {
        var i = this.context,
            a = i.getCurrentPage();
        return !e && t.height > i.availableHeight ? !1 : (t.items.forEach(function(r) {
            switch (r.type) {
                case "line":
                    var u = o(r.item);
                    u.x = (u.x || 0) + (e ? t.xOffset || 0 : i.x), u.y = (u.y || 0) + (n ? t.yOffset || 0 : i.y), a.items.push({
                        type: "line",
                        item: u
                    });
                    break;
                case "vector":
                    var l = s(r.item);
                    h(l, e ? t.xOffset || 0 : i.x, n ? t.yOffset || 0 : i.y), a.items.push({
                        type: "vector",
                        item: l
                    });
                    break;
                case "image":
                    var c = s(r.item);
                    c.x = (c.x || 0) + (e ? t.xOffset || 0 : i.x), c.y = (c.y || 0) + (n ? t.yOffset || 0 : i.y), a.items.push({
                        type: "image",
                        item: c
                    })
            }
        }), r || i.moveDown(t.height), !0)
    }, r.prototype.pushContext = function(t, e) {
        void 0 === t && (e = this.context.getCurrentPage().height - this.context.pageMargins.top - this.context.pageMargins.bottom, t = this.context.availableWidth), ("number" == typeof t || t instanceof Number) && (t = new u({
            width: t,
            height: e
        }, {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        })), this.contextStack.push(this.context), this.context = t
    }, r.prototype.popContext = function() {
        this.context = this.contextStack.pop()
    }, r.prototype.getCurrentPositionOnPage = function() {
        return (this.contextStack[0] || this.context).getCurrentPosition()
    }, t.exports = r
}, function(t, e, n) {
    (function() {
        var e;
        e = function() {
            function t(t, r) {
                var i;
                this.document = t, null == r && (r = {}), this.size = r.size || "letter", this.layout = r.layout || "portrait", this.margins = "number" == typeof r.margin ? {
                    top: r.margin,
                    left: r.margin,
                    bottom: r.margin,
                    right: r.margin
                } : r.margins || e, i = Array.isArray(this.size) ? this.size : n[this.size.toUpperCase()], this.width = i["portrait" === this.layout ? 0 : 1], this.height = i["portrait" === this.layout ? 1 : 0], this.content = this.document.ref(), this.resources = this.document.ref({
                    ProcSet: ["PDF", "Text", "ImageB", "ImageC", "ImageI"]
                }), Object.defineProperties(this, {
                    fonts: {
                        get: function(t) {
                            return function() {
                                var e;
                                return null != (e = t.resources.data).Font ? e.Font : e.Font = {}
                            }
                        }(this)
                    },
                    xobjects: {
                        get: function(t) {
                            return function() {
                                var e;
                                return null != (e = t.resources.data).XObject ? e.XObject : e.XObject = {}
                            }
                        }(this)
                    },
                    ext_gstates: {
                        get: function(t) {
                            return function() {
                                var e;
                                return null != (e = t.resources.data).ExtGState ? e.ExtGState : e.ExtGState = {}
                            }
                        }(this)
                    },
                    patterns: {
                        get: function(t) {
                            return function() {
                                var e;
                                return null != (e = t.resources.data).Pattern ? e.Pattern : e.Pattern = {}
                            }
                        }(this)
                    },
                    annotations: {
                        get: function(t) {
                            return function() {
                                var e;
                                return null != (e = t.dictionary.data).Annots ? e.Annots : e.Annots = []
                            }
                        }(this)
                    }
                }), this.dictionary = this.document.ref({
                    Type: "Page",
                    Parent: this.document._root.data.Pages,
                    MediaBox: [0, 0, this.width, this.height],
                    Contents: this.content,
                    Resources: this.resources
                })
            }
            var e, n;
            return t.prototype.maxY = function() {
                return this.height - this.margins.bottom
            }, t.prototype.write = function(t) {
                return this.content.write(t)
            }, t.prototype.end = function() {
                return this.dictionary.end(), this.resources.end(), this.content.end()
            }, e = {
                top: 72,
                left: 72,
                bottom: 72,
                right: 72
            }, n = {
                "4A0": [4767.87, 6740.79],
                "2A0": [3370.39, 4767.87],
                A0: [2383.94, 3370.39],
                A1: [1683.78, 2383.94],
                A2: [1190.55, 1683.78],
                A3: [841.89, 1190.55],
                A4: [595.28, 841.89],
                A5: [419.53, 595.28],
                A6: [297.64, 419.53],
                A7: [209.76, 297.64],
                A8: [147.4, 209.76],
                A9: [104.88, 147.4],
                A10: [73.7, 104.88],
                B0: [2834.65, 4008.19],
                B1: [2004.09, 2834.65],
                B2: [1417.32, 2004.09],
                B3: [1000.63, 1417.32],
                B4: [708.66, 1000.63],
                B5: [498.9, 708.66],
                B6: [354.33, 498.9],
                B7: [249.45, 354.33],
                B8: [175.75, 249.45],
                B9: [124.72, 175.75],
                B10: [87.87, 124.72],
                C0: [2599.37, 3676.54],
                C1: [1836.85, 2599.37],
                C2: [1298.27, 1836.85],
                C3: [918.43, 1298.27],
                C4: [649.13, 918.43],
                C5: [459.21, 649.13],
                C6: [323.15, 459.21],
                C7: [229.61, 323.15],
                C8: [161.57, 229.61],
                C9: [113.39, 161.57],
                C10: [79.37, 113.39],
                RA0: [2437.8, 3458.27],
                RA1: [1729.13, 2437.8],
                RA2: [1218.9, 1729.13],
                RA3: [864.57, 1218.9],
                RA4: [609.45, 864.57],
                SRA0: [2551.18, 3628.35],
                SRA1: [1814.17, 2551.18],
                SRA2: [1275.59, 1814.17],
                SRA3: [907.09, 1275.59],
                SRA4: [637.8, 907.09],
                EXECUTIVE: [521.86, 756],
                FOLIO: [612, 936],
                LEGAL: [612, 1008],
                LETTER: [612, 792],
                TABLOID: [792, 1224]
            }, t
        }(), t.exports = e
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, r, i = [].slice;
        r = n(47), e = 4 * ((Math.sqrt(2) - 1) / 3), t.exports = {
            initVector: function() {
                return this._ctm = [1, 0, 0, 1, 0, 0], this._ctmStack = []
            },
            save: function() {
                return this._ctmStack.push(this._ctm.slice()), this.addContent("q")
            },
            restore: function() {
                return this._ctm = this._ctmStack.pop() || [1, 0, 0, 1, 0, 0], this.addContent("Q")
            },
            closePath: function() {
                return this.addContent("h")
            },
            lineWidth: function(t) {
                return this.addContent("" + t + " w")
            },
            _CAP_STYLES: {
                BUTT: 0,
                ROUND: 1,
                SQUARE: 2
            },
            lineCap: function(t) {
                return "string" == typeof t && (t = this._CAP_STYLES[t.toUpperCase()]), this.addContent("" + t + " J")
            },
            _JOIN_STYLES: {
                MITER: 0,
                ROUND: 1,
                BEVEL: 2
            },
            lineJoin: function(t) {
                return "string" == typeof t && (t = this._JOIN_STYLES[t.toUpperCase()]), this.addContent("" + t + " j")
            },
            miterLimit: function(t) {
                return this.addContent("" + t + " M")
            },
            dash: function(t, e) {
                var n, r, i;
                return null == e && (e = {}), null == t ? this : (r = null != (i = e.space) ? i : t, n = e.phase || 0, this.addContent("[" + t + " " + r + "] " + n + " d"))
            },
            undash: function() {
                return this.addContent("[] 0 d")
            },
            moveTo: function(t, e) {
                return this.addContent("" + t + " " + e + " m")
            },
            lineTo: function(t, e) {
                return this.addContent("" + t + " " + e + " l")
            },
            bezierCurveTo: function(t, e, n, r, i, o) {
                return this.addContent("" + t + " " + e + " " + n + " " + r + " " + i + " " + o + " c")
            },
            quadraticCurveTo: function(t, e, n, r) {
                return this.addContent("" + t + " " + e + " " + n + " " + r + " v")
            },
            rect: function(t, e, n, r) {
                return this.addContent("" + t + " " + e + " " + n + " " + r + " re")
            },
            roundedRect: function(t, e, n, r, i) {
                return null == i && (i = 0), this.moveTo(t + i, e), this.lineTo(t + n - i, e), this.quadraticCurveTo(t + n, e, t + n, e + i), this.lineTo(t + n, e + r - i), this.quadraticCurveTo(t + n, e + r, t + n - i, e + r), this.lineTo(t + i, e + r), this.quadraticCurveTo(t, e + r, t, e + r - i), this.lineTo(t, e + i), this.quadraticCurveTo(t, e, t + i, e)
            },
            ellipse: function(t, n, r, i) {
                var o, a, s, h, u, l;
                return null == i && (i = r), t -= r, n -= i, o = r * e, a = i * e, s = t + 2 * r, u = n + 2 * i, h = t + r, l = n + i, this.moveTo(t, l), this.bezierCurveTo(t, l - a, h - o, n, h, n), this.bezierCurveTo(h + o, n, s, l - a, s, l), this.bezierCurveTo(s, l + a, h + o, u, h, u), this.bezierCurveTo(h - o, u, t, l + a, t, l), this.closePath()
            },
            circle: function(t, e, n) {
                return this.ellipse(t, e, n)
            },
            polygon: function() {
                var t, e, n, r;
                for (e = 1 <= arguments.length ? i.call(arguments, 0) : [], this.moveTo.apply(this, e.shift()), n = 0, r = e.length; r > n; n++) t = e[n], this.lineTo.apply(this, t);
                return this.closePath()
            },
            path: function(t) {
                return r.apply(this, t), this
            },
            _windingRule: function(t) {
                return /even-?odd/.test(t) ? "*" : ""
            },
            fill: function(t, e) {
                return /(even-?odd)|(non-?zero)/.test(t) && (e = t, t = null), t && this.fillColor(t), this.addContent("f" + this._windingRule(e))
            },
            stroke: function(t) {
                return t && this.strokeColor(t), this.addContent("S")
            },
            fillAndStroke: function(t, e, n) {
                var r;
                return null == e && (e = t), r = /(even-?odd)|(non-?zero)/, r.test(t) && (n = t, t = null), r.test(e) && (n = e, e = t), t && (this.fillColor(t), this.strokeColor(e)), this.addContent("B" + this._windingRule(n))
            },
            clip: function(t) {
                return this.addContent("W" + this._windingRule(t) + " n")
            },
            transform: function(t, e, n, r, i, o) {
                var a, s, h, u, l, c, f, d, p;
                return a = this._ctm, s = a[0], h = a[1], u = a[2], l = a[3], c = a[4], f = a[5], a[0] = s * t + u * e, a[1] = h * t + l * e, a[2] = s * n + u * r, a[3] = h * n + l * r, a[4] = s * i + u * o + c, a[5] = h * i + l * o + f, p = function() {
                    var a, s, h, u;
                    for (h = [t, e, n, r, i, o], u = [], a = 0, s = h.length; s > a; a++) d = h[a], u.push(+d.toFixed(5));
                    return u
                }().join(" "), this.addContent("" + p + " cm")
            },
            translate: function(t, e) {
                return this.transform(1, 0, 0, 1, t, e)
            },
            rotate: function(t, e) {
                var n, r, i, o, a, s, h, u;
                return null == e && (e = {}), r = t * Math.PI / 180, n = Math.cos(r), i = Math.sin(r), o = s = 0, null != e.origin && (u = e.origin, o = u[0], s = u[1], a = o * n - s * i, h = o * i + s * n, o -= a, s -= h), this.transform(n, i, -i, n, o, s)
            },
            scale: function(t, e, n) {
                var r, i, o;
                return null == e && (e = t), null == n && (n = {}), 2 === arguments.length && (e = t, n = e), r = i = 0, null != n.origin && (o = n.origin, r = o[0], i = o[1], r -= t * r, i -= e * i), this.transform(t, 0, 0, e, r, i)
            }
        }
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e;
        e = n(48), t.exports = {
            initText: function() {
                return this.x = 0, this.y = 0, this._lineGap = 0
            },
            lineGap: function(t) {
                return this._lineGap = t, this
            },
            moveDown: function(t) {
                return null == t && (t = 1), this.y += this.currentLineHeight(!0) * t + this._lineGap, this
            },
            moveUp: function(t) {
                return null == t && (t = 1), this.y -= this.currentLineHeight(!0) * t + this._lineGap, this
            },
            _text: function(t, n, r, i, o) {
                var a, s, h, u, l;
                if (i = this._initOptions(n, r, i), t = "" + t, i.wordSpacing && (t = t.replace(/\s{2,}/g, " ")), i.width) s = this._wrapper, s || (s = new e(this, i), s.on("line", o)), this._wrapper = i.continued ? s : null, this._textOptions = i.continued ? i : null, s.wrap(t, i);
                else
                    for (l = t.split("\n"), h = 0, u = l.length; u > h; h++) a = l[h], o(a, i);
                return this
            },
            text: function(t, e, n, r) {
                return this._text(t, e, n, r, this._line.bind(this))
            },
            widthOfString: function(t, e) {
                return null == e && (e = {}), this._font.widthOfString(t, this._fontSize) + (e.characterSpacing || 0) * (t.length - 1)
            },
            heightOfString: function(t, e) {
                var n, r, i, o;
                return null == e && (e = {}), i = this.x, o = this.y, e = this._initOptions(e), e.height = 1 / 0, r = e.lineGap || this._lineGap || 0, this._text(t, this.x, this.y, e, function(t) {
                    return function(e, n) {
                        return t.y += t.currentLineHeight(!0) + r
                    }
                }(this)), n = this.y - o, this.x = i, this.y = o, n
            },
            list: function(t, n, r, i, o) {
                var a, s, h, u, l, c, f, d;
                return i = this._initOptions(n, r, i), d = Math.round(this._font.ascender / 1e3 * this._fontSize / 3), h = i.textIndent || 5 * d, u = i.bulletIndent || 8 * d, c = 1, l = [], f = [], a = function(t) {
                    var e, n, r, i, o;
                    for (o = [], e = r = 0, i = t.length; i > r; e = ++r) n = t[e], Array.isArray(n) ? (c++, a(n), o.push(c--)) : (l.push(n), o.push(f.push(c)));
                    return o
                }, a(t), o = new e(this, i), o.on("line", this._line.bind(this)), c = 1, s = 0, o.on("firstLine", function(t) {
                    return function() {
                        var e, n;
                        return (n = f[s++]) !== c && (e = u * (n - c), t.x += e, o.lineWidth -= e, c = n), t.circle(t.x - h + d, t.y + d + d / 2, d), t.fill()
                    }
                }(this)), o.on("sectionStart", function(t) {
                    return function() {
                        var e;
                        return e = h + u * (c - 1), t.x += e, o.lineWidth -= e
                    }
                }(this)), o.on("sectionEnd", function(t) {
                    return function() {
                        var e;
                        return e = h + u * (c - 1), t.x -= e, o.lineWidth += e
                    }
                }(this)), o.wrap(l.join("\n"), i), this
            },
            _initOptions: function(t, e, n) {
                var r, i, o, a;
                if (null == t && (t = {}), null == n && (n = {}), "object" == typeof t && (n = t, t = null), n = function() {
                        var t, e, r;
                        e = {};
                        for (t in n) r = n[t], e[t] = r;
                        return e
                    }(), this._textOptions) {
                    a = this._textOptions;
                    for (r in a) o = a[r], "continued" !== r && null == n[r] && (n[r] = o)
                }
                return null != t && (this.x = t), null != e && (this.y = e), n.lineBreak !== !1 && (i = this.page.margins, null == n.width && (n.width = this.page.width - this.x - i.right)), n.columns || (n.columns = 0), null == n.columnGap && (n.columnGap = 18), n
            },
            _line: function(t, e, n) {
                var r;
                return null == e && (e = {}), this._fragment(t, this.x, this.y, e), r = e.lineGap || this._lineGap || 0, n ? this.y += this.currentLineHeight(!0) + r : this.x += this.widthOfString(t)
            },
            _fragment: function(t, e, n, r) {
                var i, o, a, s, h, u, l, c, f, d, p, g, v, m, y, w, _, b, x;
                if (t = "" + t, 0 !== t.length) {
                    if (i = r.align || "left", m = r.wordSpacing || 0, o = r.characterSpacing || 0, r.width) switch (i) {
                        case "right":
                            g = this.widthOfString(t.replace(/\s+$/, ""), r), e += r.lineWidth - g;
                            break;
                        case "center":
                            e += r.lineWidth / 2 - r.textWidth / 2;
                            break;
                        case "justify":
                            y = t.trim().split(/\s+/), g = this.widthOfString(t.replace(/\s+/g, ""), r), p = this.widthOfString(" ") + o, m = Math.max(0, (r.lineWidth - g) / Math.max(1, y.length - 1) - p)
                    }
                    if (d = r.textWidth + m * (r.wordCount - 1) + o * (t.length - 1), r.link && this.link(e, n, d, this.currentLineHeight(), r.link), (r.underline || r.strike) && (this.save(), r.stroke || this.strokeColor.apply(this, this._fillColor), l = this._fontSize < 10 ? .5 : Math.floor(this._fontSize / 10), this.lineWidth(l), s = r.underline ? 1 : 2, c = n + this.currentLineHeight() / s, r.underline && (c -= l), this.moveTo(e, c), this.lineTo(e + d, c), this.stroke(), this.restore()), this.save(), this.transform(1, 0, 0, -1, 0, this.page.height), n = this.page.height - n - this._font.ascender / 1e3 * this._fontSize, null == (w = this.page.fonts)[x = this._font.id] && (w[x] = this._font.ref()), this._font.use(t), this.addContent("BT"), this.addContent("" + e + " " + n + " Td"), this.addContent("/" + this._font.id + " " + this._fontSize + " Tf"), f = r.fill && r.stroke ? 2 : r.stroke ? 1 : 0, f && this.addContent("" + f + " Tr"), o && this.addContent("" + o + " Tc"), m) {
                        for (y = t.trim().split(/\s+/), m += this.widthOfString(" ") + o, m *= 1e3 / this._fontSize, a = [], _ = 0, b = y.length; b > _; _++) v = y[_], h = this._font.encode(v), h = function() {
                            var t, e, n;
                            for (n = [], u = t = 0, e = h.length; e > t; u = t += 1) n.push(h.charCodeAt(u).toString(16));
                            return n
                        }().join(""), a.push("<" + h + "> " + -m);
                        this.addContent("[" + a.join(" ") + "] TJ")
                    } else h = this._font.encode(t), h = function() {
                        var t, e, n;
                        for (n = [], u = t = 0, e = h.length; e > t; u = t += 1) n.push(h.charCodeAt(u).toString(16));
                        return n
                    }().join(""), this.addContent("<" + h + "> Tj");
                    return this.addContent("ET"), this.restore()
                }
            }
        }
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, r, i, o, a;
        a = n(49), e = a.PDFGradient, r = a.PDFLinearGradient, i = a.PDFRadialGradient, t.exports = {
            initColor: function() {
                return this._opacityRegistry = {}, this._opacityCount = 0, this._gradCount = 0
            },
            _normalizeColor: function(t) {
                var n, r;
                return t instanceof e ? t : ("string" == typeof t && ("#" === t.charAt(0) ? (4 === t.length && (t = t.replace(/#([0-9A-F])([0-9A-F])([0-9A-F])/i, "#$1$1$2$2$3$3")), n = parseInt(t.slice(1), 16), t = [n >> 16, n >> 8 & 255, 255 & n]) : o[t] && (t = o[t])), Array.isArray(t) ? (3 === t.length ? t = function() {
                    var e, n, i;
                    for (i = [], e = 0, n = t.length; n > e; e++) r = t[e], i.push(r / 255);
                    return i
                }() : 4 === t.length && (t = function() {
                    var e, n, i;
                    for (i = [], e = 0, n = t.length; n > e; e++) r = t[e], i.push(r / 100);
                    return i
                }()), t) : null)
            },
            _setColor: function(t, n) {
                var r, i, o, a;
                return (t = this._normalizeColor(t)) ? (this._sMasked && (r = this.ref({
                    Type: "ExtGState",
                    SMask: "None"
                }), r.end(), i = "Gs" + ++this._opacityCount, this.page.ext_gstates[i] = r, this.addContent("/" + i + " gs"), this._sMasked = !1), o = n ? "SCN" : "scn", t instanceof e ? (this._setColorSpace("Pattern", n), t.apply(o)) : (a = 4 === t.length ? "DeviceCMYK" : "DeviceRGB", this._setColorSpace(a, n), t = t.join(" "), this.addContent("" + t + " " + o)), !0) : !1
            },
            _setColorSpace: function(t, e) {
                var n;
                return n = e ? "CS" : "cs", this.addContent("/" + t + " " + n)
            },
            fillColor: function(t, e) {
                var n;
                return null == e && (e = 1), n = this._setColor(t, !1), n && this.fillOpacity(e), this._fillColor = [t, e], this
            },
            strokeColor: function(t, e) {
                var n;
                return null == e && (e = 1), n = this._setColor(t, !0), n && this.strokeOpacity(e), this
            },
            opacity: function(t) {
                return this._doOpacity(t, t), this
            },
            fillOpacity: function(t) {
                return this._doOpacity(t, null), this
            },
            strokeOpacity: function(t) {
                return this._doOpacity(null, t), this
            },
            _doOpacity: function(t, e) {
                var n, r, i, o, a;
                if (null != t || null != e) return null != t && (t = Math.max(0, Math.min(1, t))), null != e && (e = Math.max(0, Math.min(1, e))), i = "" + t + "_" + e, this._opacityRegistry[i] ? (a = this._opacityRegistry[i], n = a[0], o = a[1]) : (n = {
                    Type: "ExtGState"
                }, null != t && (n.ca = t), null != e && (n.CA = e), n = this.ref(n), n.end(), r = ++this._opacityCount, o = "Gs" + r, this._opacityRegistry[i] = [n, o]), this.page.ext_gstates[o] = n, this.addContent("/" + o + " gs")
            },
            linearGradient: function(t, e, n, i) {
                return new r(this, t, e, n, i)
            },
            radialGradient: function(t, e, n, r, o, a) {
                return new i(this, t, e, n, r, o, a)
            }
        }, o = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            grey: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50]
        }
    }).call(this)
}, function(t, e, n) {
    (function(e) {
        (function() {
            var r;
            r = n(17), t.exports = {
                initImages: function() {
                    return this._imageRegistry = {}, this._imageCount = 0
                },
                image: function(t, n, i, o) {
                    var a, s, h, u, l, c, f, d, p, g, v, m, y, w;
                    return null == o && (o = {}), "object" == typeof n && (o = n, n = null), n = null != (m = null != n ? n : o.x) ? m : this.x, i = null != (y = null != i ? i : o.y) ? y : this.y, e.isBuffer(t) || (c = this._imageRegistry[t]), c || (c = r.open(t, "I" + ++this._imageCount), c.embed(this), e.isBuffer(t) || (this._imageRegistry[t] = c)), null == (g = this.page.xobjects)[v = c.label] && (g[v] = c.obj), d = o.width || c.width, u = o.height || c.height, o.width && !o.height ? (p = d / c.width, d = c.width * p, u = c.height * p) : o.height && !o.width ? (l = u / c.height, d = c.width * l, u = c.height * l) : o.scale ? (d = c.width * o.scale, u = c.height * o.scale) : o.fit && (w = o.fit, h = w[0], a = w[1], s = h / a, f = c.width / c.height, f > s ? (d = h, u = h / f) : (u = a, d = a * f), "center" === o.align ? n = n + h / 2 - d / 2 : "right" === o.align && (n = n + h - d), "center" === o.valign ? i = i + a / 2 - u / 2 : "bottom" === o.valign && (i = i + a - u)), this.y === i && (this.y += u), this.save(), this.transform(d, 0, 0, -u, n, i + u), this.addContent("/" + c.label + " Do"), this.restore(), this
                }
            }
        }).call(this)
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    (function() {
        t.exports = {
            annotate: function(t, e, n, r, i) {
                var o, a, s;
                i.Type = "Annot", i.Rect = this._convertRect(t, e, n, r), i.Border = [0, 0, 0], "Link" !== i.Subtype && null == i.C && (i.C = this._normalizeColor(i.color || [0, 0, 0])), delete i.color, "string" == typeof i.Dest && (i.Dest = new String(i.Dest));
                for (o in i) s = i[o], i[o[0].toUpperCase() + o.slice(1)] = s;
                return a = this.ref(i), this.page.annotations.push(a), a.end(), this
            },
            note: function(t, e, n, r, i, o) {
                return null == o && (o = {}), o.Subtype = "Text", o.Contents = new String(i), o.Name = "Comment", null == o.color && (o.color = [243, 223, 92]), this.annotate(t, e, n, r, o)
            },
            link: function(t, e, n, r, i, o) {
                return null == o && (o = {}), o.Subtype = "Link", o.A = this.ref({
                    S: "URI",
                    URI: new String(i)
                }), o.A.end(), this.annotate(t, e, n, r, o)
            },
            _markup: function(t, e, n, r, i) {
                var o, a, s, h, u;
                return null == i && (i = {}), u = this._convertRect(t, e, n, r), o = u[0], s = u[1], a = u[2], h = u[3], i.QuadPoints = [o, h, a, h, o, s, a, s], i.Contents = new String, this.annotate(t, e, n, r, i)
            },
            highlight: function(t, e, n, r, i) {
                return null == i && (i = {}), i.Subtype = "Highlight", null == i.color && (i.color = [241, 238, 148]), this._markup(t, e, n, r, i)
            },
            underline: function(t, e, n, r, i) {
                return null == i && (i = {}), i.Subtype = "Underline", this._markup(t, e, n, r, i)
            },
            strike: function(t, e, n, r, i) {
                return null == i && (i = {}), i.Subtype = "StrikeOut", this._markup(t, e, n, r, i)
            },
            lineAnnotation: function(t, e, n, r, i) {
                return null == i && (i = {}), i.Subtype = "Line", i.Contents = new String, i.L = [t, this.page.height - e, n, this.page.height - r], this.annotate(t, e, n, r, i)
            },
            rectAnnotation: function(t, e, n, r, i) {
                return null == i && (i = {}), i.Subtype = "Square", i.Contents = new String, this.annotate(t, e, n, r, i)
            },
            ellipseAnnotation: function(t, e, n, r, i) {
                return null == i && (i = {}), i.Subtype = "Circle", i.Contents = new String, this.annotate(t, e, n, r, i)
            },
            textAnnotation: function(t, e, n, r, i, o) {
                return null == o && (o = {}), o.Subtype = "FreeText", o.Contents = new String(i), o.DA = new String, this.annotate(t, e, n, r, o)
            },
            _convertRect: function(t, e, n, r) {
                var i, o, a, s, h, u, l, c, f;
                return c = e, e += r, l = t + n, f = this._ctm, i = f[0], o = f[1], a = f[2], s = f[3], h = f[4], u = f[5], t = i * t + a * e + h, e = o * t + s * e + u, l = i * l + a * c + h, c = o * l + s * c + u, [t, e, l, c]
            }
        }
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e;
        e = n(52), t.exports = {
            initFonts: function() {
                this._fontFamilies = {}, this._fontCount = 0, this._fontSize = 12, this._font = null, this._registeredFonts = {}
            },
            font: function(t, n, r) {
                var i, o, a, s;
                return "number" == typeof n && (r = n, n = null), "string" == typeof t && this._registeredFonts[t] ? (i = t, s = this._registeredFonts[t], t = s.src, n = s.family) : (i = n || t, "string" != typeof i && (i = null)), null != r && this.fontSize(r), (o = this._fontFamilies[i]) ? (this._font = o, this) : (a = "F" + ++this._fontCount, this._font = new e(this, t, n, a), (o = this._fontFamilies[this._font.name]) ? (this._font = o, this) : (i && (this._fontFamilies[i] = this._font), this._fontFamilies[this._font.name] = this._font, this))
            },
            fontSize: function(t) {
                return this._fontSize = t, this
            },
            currentLineHeight: function(t) {
                return null == t && (t = !1), this._font.lineHeight(this._fontSize, t)
            },
            registerFont: function(t, e, n) {
                return this._registeredFonts[t] = {
                    src: e,
                    family: n
                }, this
            }
        }
    }).call(this)
}, function(t, e, n) {
    (function(t, r) {
        function i(e, n, r) {
            function i() {
                for (var t; null !== (t = e.read());) s.push(t), h += t.length;
                e.once("readable", i)
            }

            function o(t) {
                e.removeListener("end", a), e.removeListener("readable", i), r(t)
            }

            function a() {
                var n = t.concat(s, h);
                s = [], r(null, n), e.close()
            }
            var s = [],
                h = 0;
            e.on("error", o), e.on("end", a), e.end(n), i()
        }

        function o(e, n) {
            if ("string" == typeof n && (n = new t(n)), !t.isBuffer(n)) throw new TypeError("Not a string or buffer");
            var r = g.Z_FINISH;
            return e._processChunk(n, r)
        }

        function a(t) {
            return this instanceof a ? void d.call(this, t, g.DEFLATE) : new a(t)
        }

        function s(t) {
            return this instanceof s ? void d.call(this, t, g.INFLATE) : new s(t)
        }

        function h(t) {
            return this instanceof h ? void d.call(this, t, g.GZIP) : new h(t)
        }

        function u(t) {
            return this instanceof u ? void d.call(this, t, g.GUNZIP) : new u(t)
        }

        function l(t) {
            return this instanceof l ? void d.call(this, t, g.DEFLATERAW) : new l(t)
        }

        function c(t) {
            return this instanceof c ? void d.call(this, t, g.INFLATERAW) : new c(t)
        }

        function f(t) {
            return this instanceof f ? void d.call(this, t, g.UNZIP) : new f(t)
        }

        function d(n, r) {
            if (this._opts = n = n || {}, this._chunkSize = n.chunkSize || e.Z_DEFAULT_CHUNK, p.call(this, n), n.flush && n.flush !== g.Z_NO_FLUSH && n.flush !== g.Z_PARTIAL_FLUSH && n.flush !== g.Z_SYNC_FLUSH && n.flush !== g.Z_FULL_FLUSH && n.flush !== g.Z_FINISH && n.flush !== g.Z_BLOCK) throw new Error("Invalid flush flag: " + n.flush);
            if (this._flushFlag = n.flush || g.Z_NO_FLUSH, n.chunkSize && (n.chunkSize < e.Z_MIN_CHUNK || n.chunkSize > e.Z_MAX_CHUNK)) throw new Error("Invalid chunk size: " + n.chunkSize);
            if (n.windowBits && (n.windowBits < e.Z_MIN_WINDOWBITS || n.windowBits > e.Z_MAX_WINDOWBITS)) throw new Error("Invalid windowBits: " + n.windowBits);
            if (n.level && (n.level < e.Z_MIN_LEVEL || n.level > e.Z_MAX_LEVEL)) throw new Error("Invalid compression level: " + n.level);
            if (n.memLevel && (n.memLevel < e.Z_MIN_MEMLEVEL || n.memLevel > e.Z_MAX_MEMLEVEL)) throw new Error("Invalid memLevel: " + n.memLevel);
            if (n.strategy && n.strategy != e.Z_FILTERED && n.strategy != e.Z_HUFFMAN_ONLY && n.strategy != e.Z_RLE && n.strategy != e.Z_FIXED && n.strategy != e.Z_DEFAULT_STRATEGY) throw new Error("Invalid strategy: " + n.strategy);
            if (n.dictionary && !t.isBuffer(n.dictionary)) throw new Error("Invalid dictionary: it should be a Buffer instance");
            this._binding = new g.Zlib(r);
            var i = this;
            this._hadError = !1, this._binding.onerror = function(t, n) {
                i._binding = null, i._hadError = !0;
                var r = new Error(t);
                r.errno = n, r.code = e.codes[n], i.emit("error", r)
            };
            var o = e.Z_DEFAULT_COMPRESSION;
            "number" == typeof n.level && (o = n.level);
            var a = e.Z_DEFAULT_STRATEGY;
            "number" == typeof n.strategy && (a = n.strategy), this._binding.init(n.windowBits || e.Z_DEFAULT_WINDOWBITS, o, n.memLevel || e.Z_DEFAULT_MEMLEVEL, a, n.dictionary), this._buffer = new t(this._chunkSize), this._offset = 0, this._closed = !1, this._level = o, this._strategy = a, this.once("end", this.close)
        }
        var p = n(55),
            g = n(50),
            v = n(60),
            m = n(53).ok;
        g.Z_MIN_WINDOWBITS = 8, g.Z_MAX_WINDOWBITS = 15, g.Z_DEFAULT_WINDOWBITS = 15, g.Z_MIN_CHUNK = 64, g.Z_MAX_CHUNK = 1 / 0, g.Z_DEFAULT_CHUNK = 16384, g.Z_MIN_MEMLEVEL = 1, g.Z_MAX_MEMLEVEL = 9, g.Z_DEFAULT_MEMLEVEL = 8, g.Z_MIN_LEVEL = -1, g.Z_MAX_LEVEL = 9, g.Z_DEFAULT_LEVEL = g.Z_DEFAULT_COMPRESSION, Object.keys(g).forEach(function(t) {
            t.match(/^Z/) && (e[t] = g[t])
        }), e.codes = {
            Z_OK: g.Z_OK,
            Z_STREAM_END: g.Z_STREAM_END,
            Z_NEED_DICT: g.Z_NEED_DICT,
            Z_ERRNO: g.Z_ERRNO,
            Z_STREAM_ERROR: g.Z_STREAM_ERROR,
            Z_DATA_ERROR: g.Z_DATA_ERROR,
            Z_MEM_ERROR: g.Z_MEM_ERROR,
            Z_BUF_ERROR: g.Z_BUF_ERROR,
            Z_VERSION_ERROR: g.Z_VERSION_ERROR
        }, Object.keys(e.codes).forEach(function(t) {
            e.codes[e.codes[t]] = t
        }), e.Deflate = a, e.Inflate = s, e.Gzip = h, e.Gunzip = u, e.DeflateRaw = l, e.InflateRaw = c, e.Unzip = f, e.createDeflate = function(t) {
            return new a(t)
        }, e.createInflate = function(t) {
            return new s(t)
        }, e.createDeflateRaw = function(t) {
            return new l(t)
        }, e.createInflateRaw = function(t) {
            return new c(t)
        }, e.createGzip = function(t) {
            return new h(t)
        }, e.createGunzip = function(t) {
            return new u(t)
        }, e.createUnzip = function(t) {
            return new f(t)
        }, e.deflate = function(t, e, n) {
            return "function" == typeof e && (n = e, e = {}), i(new a(e), t, n)
        }, e.deflateSync = function(t, e) {
            return o(new a(e), t)
        }, e.gzip = function(t, e, n) {
            return "function" == typeof e && (n = e, e = {}), i(new h(e), t, n)
        }, e.gzipSync = function(t, e) {
            return o(new h(e), t)
        }, e.deflateRaw = function(t, e, n) {
            return "function" == typeof e && (n = e, e = {}), i(new l(e), t, n)
        }, e.deflateRawSync = function(t, e) {
            return o(new l(e), t)
        }, e.unzip = function(t, e, n) {
            return "function" == typeof e && (n = e, e = {}), i(new f(e), t, n)
        }, e.unzipSync = function(t, e) {
            return o(new f(e), t)
        }, e.inflate = function(t, e, n) {
            return "function" == typeof e && (n = e, e = {}), i(new s(e), t, n)
        }, e.inflateSync = function(t, e) {
            return o(new s(e), t)
        }, e.gunzip = function(t, e, n) {
            return "function" == typeof e && (n = e, e = {}), i(new u(e), t, n)
        }, e.gunzipSync = function(t, e) {
            return o(new u(e), t)
        }, e.inflateRaw = function(t, e, n) {
            return "function" == typeof e && (n = e, e = {}), i(new c(e), t, n)
        }, e.inflateRawSync = function(t, e) {
            return o(new c(e), t)
        }, v.inherits(d, p), d.prototype.params = function(t, n, i) {
            if (t < e.Z_MIN_LEVEL || t > e.Z_MAX_LEVEL) throw new RangeError("Invalid compression level: " + t);
            if (n != e.Z_FILTERED && n != e.Z_HUFFMAN_ONLY && n != e.Z_RLE && n != e.Z_FIXED && n != e.Z_DEFAULT_STRATEGY) throw new TypeError("Invalid strategy: " + n);
            if (this._level !== t || this._strategy !== n) {
                var o = this;
                this.flush(g.Z_SYNC_FLUSH, function() {
                    o._binding.params(t, n), o._hadError || (o._level = t, o._strategy = n, i && i())
                })
            } else r.nextTick(i)
        }, d.prototype.reset = function() {
            return this._binding.reset()
        }, d.prototype._flush = function(e) {
            this._transform(new t(0), "", e)
        }, d.prototype.flush = function(e, n) {
            var i = this._writableState;
            if (("function" == typeof e || void 0 === e && !n) && (n = e, e = g.Z_FULL_FLUSH), i.ended) n && r.nextTick(n);
            else if (i.ending) n && this.once("end", n);
            else if (i.needDrain) {
                var o = this;
                this.once("drain", function() {
                    o.flush(n)
                })
            } else this._flushFlag = e, this.write(new t(0), "", n)
        }, d.prototype.close = function(t) {
            if (t && r.nextTick(t), !this._closed) {
                this._closed = !0, this._binding.close();
                var e = this;
                r.nextTick(function() {
                    e.emit("close")
                })
            }
        }, d.prototype._transform = function(e, n, r) {
            var i, o = this._writableState,
                a = o.ending || o.ended,
                s = a && (!e || o.length === e.length);
            if (null === !e && !t.isBuffer(e)) return r(new Error("invalid input"));
            s ? i = g.Z_FINISH : (i = this._flushFlag, e.length >= o.length && (this._flushFlag = this._opts.flush || g.Z_NO_FLUSH));
            this._processChunk(e, i, r)
        }, d.prototype._processChunk = function(e, n, r) {
            function i(l, d) {
                if (!h._hadError) {
                    var p = a - d;
                    if (m(p >= 0, "have should not go down"), p > 0) {
                        var g = h._buffer.slice(h._offset, h._offset + p);
                        h._offset += p, u ? h.push(g) : (c.push(g), f += g.length)
                    }
                    if ((0 === d || h._offset >= h._chunkSize) && (a = h._chunkSize, h._offset = 0, h._buffer = new t(h._chunkSize)), 0 === d) {
                        if (s += o - l, o = l, !u) return !0;
                        var v = h._binding.write(n, e, s, o, h._buffer, h._offset, h._chunkSize);
                        return v.callback = i, void(v.buffer = e)
                    }
                    return u ? void r() : !1
                }
            }
            var o = e && e.length,
                a = this._chunkSize - this._offset,
                s = 0,
                h = this,
                u = "function" == typeof r;
            if (!u) {
                var l, c = [],
                    f = 0;
                this.on("error", function(t) {
                    l = t
                });
                do var d = this._binding.writeSync(n, e, s, o, this._buffer, this._offset, a); while (!this._hadError && i(d[0], d[1]));
                if (this._hadError) throw l;
                var p = t.concat(c, f);
                return this.close(), p
            }
            var g = this._binding.write(n, e, s, o, this._buffer, this._offset, a);
            g.buffer = e, g.callback = i
        }, v.inherits(a, d), v.inherits(s, d), v.inherits(h, d), v.inherits(u, d), v.inherits(l, d), v.inherits(c, d), v.inherits(f, d)
    }).call(e, n(4).Buffer, n(61))
}, function(t, e, n) {
    function r() {
        i.call(this)
    }
    t.exports = r;
    var i = n(54).EventEmitter,
        o = n(62);
    o(r, i), r.Readable = n(56), r.Writable = n(57), r.Duplex = n(58), r.Transform = n(55), r.PassThrough = n(59), r.Stream = r, r.prototype.pipe = function(t, e) {
        function n(e) {
            t.writable && !1 === t.write(e) && u.pause && u.pause()
        }

        function r() {
            u.readable && u.resume && u.resume()
        }

        function o() {
            l || (l = !0, t.end())
        }

        function a() {
            l || (l = !0, "function" == typeof t.destroy && t.destroy())
        }

        function s(t) {
            if (h(), 0 === i.listenerCount(this, "error")) throw t
        }

        function h() {
            u.removeListener("data", n), t.removeListener("drain", r), u.removeListener("end", o), u.removeListener("close", a), u.removeListener("error", s), t.removeListener("error", s), u.removeListener("end", h), u.removeListener("close", h), t.removeListener("close", h)
        }
        var u = this;
        u.on("data", n), t.on("drain", r), t._isStdio || e && e.end === !1 || (u.on("end", o), u.on("close", a));
        var l = !1;
        return u.on("error", s), t.on("error", s), u.on("end", h), u.on("close", h), t.on("close", h), t.emit("pipe", u), t
    }
}, function(t, e, n) {
    (function() {
        var e;
        e = function() {
            function t() {}
            var e, n, r, i, o, a, s, h, u, l, c, f, d;
            return t.apply = function(t, n) {
                var r;
                return r = a(n), e(r, t)
            }, o = {
                A: 7,
                a: 7,
                C: 6,
                c: 6,
                H: 1,
                h: 1,
                L: 2,
                l: 2,
                M: 2,
                m: 2,
                Q: 4,
                q: 4,
                S: 4,
                s: 4,
                T: 2,
                t: 2,
                V: 1,
                v: 1,
                Z: 0,
                z: 0
            }, a = function(t) {
                var e, n, r, i, a, s, h, u, l;
                for (h = [], e = [], i = "", a = !1, s = 0, u = 0, l = t.length; l > u; u++)
                    if (n = t[u], null != o[n]) s = o[n], r && (i.length > 0 && (e[e.length] = +i), h[h.length] = {
                        cmd: r,
                        args: e
                    }, e = [], i = "", a = !1), r = n;
                    else if (" " === n || "," === n || "-" === n && i.length > 0 && "e" !== i[i.length - 1] || "." === n && a) {
                    if (0 === i.length) continue;
                    e.length === s ? (h[h.length] = {
                        cmd: r,
                        args: e
                    }, e = [+i], "M" === r && (r = "L"), "m" === r && (r = "l")) : e[e.length] = +i, a = "." === n, i = "-" === n || "." === n ? n : ""
                } else i += n, "." === n && (a = !0);
                return i.length > 0 && (e.length === s ? (h[h.length] = {
                    cmd: r,
                    args: e
                }, e = [+i], "M" === r && (r = "L"), "m" === r && (r = "l")) : e[e.length] = +i), h[h.length] = {
                    cmd: r,
                    args: e
                }, h
            }, r = i = s = h = f = d = 0, e = function(t, e) {
                var n, o, a, l, c;
                for (r = i = s = h = f = d = 0, o = a = 0, l = t.length; l > a; o = ++a) n = t[o], "function" == typeof u[c = n.cmd] && u[c](e, n.args);
                return r = i = s = h = 0
            }, u = {
                M: function(t, e) {
                    return r = e[0], i = e[1], s = h = null, f = r, d = i, t.moveTo(r, i)
                },
                m: function(t, e) {
                    return r += e[0], i += e[1], s = h = null, f = r, d = i, t.moveTo(r, i)
                },
                C: function(t, e) {
                    return r = e[4], i = e[5], s = e[2], h = e[3], t.bezierCurveTo.apply(t, e)
                },
                c: function(t, e) {
                    return t.bezierCurveTo(e[0] + r, e[1] + i, e[2] + r, e[3] + i, e[4] + r, e[5] + i), s = r + e[2], h = i + e[3], r += e[4], i += e[5]
                },
                S: function(t, e) {
                    return null === s && (s = r, h = i), t.bezierCurveTo(r - (s - r), i - (h - i), e[0], e[1], e[2], e[3]), s = e[0], h = e[1], r = e[2], i = e[3]
                },
                s: function(t, e) {
                    return null === s && (s = r, h = i), t.bezierCurveTo(r - (s - r), i - (h - i), r + e[0], i + e[1], r + e[2], i + e[3]), s = r + e[0], h = i + e[1], r += e[2], i += e[3]
                },
                Q: function(t, e) {
                    return s = e[0], h = e[1], r = e[2], i = e[3], t.quadraticCurveTo(e[0], e[1], r, i)
                },
                q: function(t, e) {
                    return t.quadraticCurveTo(e[0] + r, e[1] + i, e[2] + r, e[3] + i), s = r + e[0], h = i + e[1], r += e[2], i += e[3]
                },
                T: function(t, e) {
                    return null === s ? (s = r, h = i) : (s = r - (s - r), h = i - (h - i)), t.quadraticCurveTo(s, h, e[0], e[1]), s = r - (s - r), h = i - (h - i), r = e[0], i = e[1]
                },
                t: function(t, e) {
                    return null === s ? (s = r, h = i) : (s = r - (s - r), h = i - (h - i)), t.quadraticCurveTo(s, h, r + e[0], i + e[1]), r += e[0], i += e[1]
                },
                A: function(t, e) {
                    return c(t, r, i, e), r = e[5], i = e[6]
                },
                a: function(t, e) {
                    return e[5] += r, e[6] += i, c(t, r, i, e), r = e[5], i = e[6]
                },
                L: function(t, e) {
                    return r = e[0], i = e[1], s = h = null, t.lineTo(r, i)
                },
                l: function(t, e) {
                    return r += e[0], i += e[1], s = h = null, t.lineTo(r, i)
                },
                H: function(t, e) {
                    return r = e[0], s = h = null, t.lineTo(r, i)
                },
                h: function(t, e) {
                    return r += e[0], s = h = null, t.lineTo(r, i)
                },
                V: function(t, e) {
                    return i = e[0], s = h = null, t.lineTo(r, i)
                },
                v: function(t, e) {
                    return i += e[0], s = h = null, t.lineTo(r, i)
                },
                Z: function(t) {
                    return t.closePath(), r = f, i = d
                },
                z: function(t) {
                    return t.closePath(), r = f, i = d
                }
            }, c = function(t, e, r, i) {
                var o, a, s, h, u, c, f, d, p, g, v, m, y;
                for (c = i[0], f = i[1], u = i[2], h = i[3], g = i[4], a = i[5], s = i[6], p = n(a, s, c, f, h, g, u, e, r), y = [], v = 0, m = p.length; m > v; v++) d = p[v], o = l.apply(null, d), y.push(t.bezierCurveTo.apply(t, o));
                return y
            }, n = function(t, e, n, r, i, o, a, u, l) {
                var c, f, d, p, g, v, m, y, w, _, b, x, S, k, E, C, I, A, L, R, B, T, M, O, D, U;
                for (k = a * (Math.PI / 180), S = Math.sin(k), g = Math.cos(k), n = Math.abs(n), r = Math.abs(r), s = g * (u - t) * .5 + S * (l - e) * .5, h = g * (l - e) * .5 - S * (u - t) * .5, y = s * s / (n * n) + h * h / (r * r), y > 1 && (y = Math.sqrt(y), n *= y, r *= y), c = g / n, f = S / n, d = -S / r, p = g / r, R = c * u + f * l, M = d * u + p * l, B = c * t + f * e, O = d * t + p * e, v = (B - R) * (B - R) + (O - M) * (O - M), x = 1 / v - .25, 0 > x && (x = 0), b = Math.sqrt(x), o === i && (b = -b), T = .5 * (R + B) - b * (O - M), D = .5 * (M + O) + b * (B - R), E = Math.atan2(M - D, R - T), C = Math.atan2(O - D, B - T), L = C - E, 0 > L && 1 === o ? L += 2 * Math.PI : L > 0 && 0 === o && (L -= 2 * Math.PI), _ = Math.ceil(Math.abs(L / (.5 * Math.PI + .001))), w = [], m = U = 0; _ >= 0 ? _ > U : U > _; m = _ >= 0 ? ++U : --U) I = E + m * L / _, A = E + (m + 1) * L / _, w[m] = [T, D, I, A, n, r, S, g];
                return w
            }, l = function(t, e, n, r, i, o, a, s) {
                var h, u, l, c, f, d, p, g, v, m, y, w;
                return h = s * i, u = -a * o, l = a * i, c = s * o, d = .5 * (r - n), f = 8 / 3 * Math.sin(.5 * d) * Math.sin(.5 * d) / Math.sin(d), p = t + Math.cos(n) - f * Math.sin(n), m = e + Math.sin(n) + f * Math.cos(n), v = t + Math.cos(r), w = e + Math.sin(r), g = v + f * Math.sin(r), y = w - f * Math.cos(r), [h * p + u * m, l * p + c * m, h * g + u * y, l * g + c * y, h * v + u * w, l * v + c * w]
            }, t
        }(), t.exports = e
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, r, i, o = {}.hasOwnProperty,
            a = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) o.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype,
                    t
            };
        e = n(54).EventEmitter, r = n(66), i = function(t) {
            function e(t, e) {
                var n;
                this.document = t, this.indent = e.indent || 0, this.characterSpacing = e.characterSpacing || 0, this.wordSpacing = 0 === e.wordSpacing, this.columns = e.columns || 1, this.columnGap = null != (n = e.columnGap) ? n : 18, this.lineWidth = (e.width - this.columnGap * (this.columns - 1)) / this.columns, this.spaceLeft = this.lineWidth, this.startX = this.document.x, this.startY = this.document.y, this.column = 1, this.ellipsis = e.ellipsis, this.continuedX = 0, null != e.height ? (this.height = e.height, this.maxY = this.startY + e.height) : this.maxY = this.document.page.maxY(), this.on("firstLine", function(t) {
                    return function(e) {
                        var n;
                        return n = t.continuedX || t.indent, t.document.x += n, t.lineWidth -= n, t.once("line", function() {
                            return t.document.x -= n, t.lineWidth += n, e.continued && !t.continuedX && (t.continuedX = t.indent), e.continued ? void 0 : t.continuedX = 0
                        })
                    }
                }(this)), this.on("lastLine", function(t) {
                    return function(e) {
                        var n;
                        return n = e.align, "justify" === n && (e.align = "left"), t.lastLine = !0, t.once("line", function() {
                            return t.document.y += e.paragraphGap || 0, e.align = n, t.lastLine = !1
                        })
                    }
                }(this))
            }
            return a(e, t), e.prototype.wordWidth = function(t) {
                return this.document.widthOfString(t, this) + this.characterSpacing + this.wordSpacing
            }, e.prototype.eachWord = function(t, e) {
                var n, i, o, a, s, h, u, l, c, f;
                for (i = new r(t), s = null, f = {}; n = i.nextBreak();) {
                    if (c = t.slice((null != s ? s.position : void 0) || 0, n.position), l = null != f[c] ? f[c] : f[c] = this.wordWidth(c), l > this.lineWidth + this.continuedX)
                        for (h = s, o = {}; c.length;) {
                            for (a = c.length; l > this.spaceLeft;) l = this.wordWidth(c.slice(0, --a));
                            if (o.required = a < c.length, u = e(c.slice(0, a), l, o, h), h = {
                                    required: !1
                                }, c = c.slice(a), l = this.wordWidth(c), u === !1) break
                        } else u = e(c, l, n, s);
                    if (u === !1) break;
                    s = n
                }
            }, e.prototype.wrap = function(t, e) {
                var n, r, i, o, a, s, h;
                return null != e.indent && (this.indent = e.indent), null != e.characterSpacing && (this.characterSpacing = e.characterSpacing), null != e.wordSpacing && (this.wordSpacing = e.wordSpacing), null != e.ellipsis && (this.ellipsis = e.ellipsis), o = this.document.y + this.document.currentLineHeight(!0), (this.document.y > this.maxY || o > this.maxY) && this.nextSection(), n = "", a = 0, s = 0, i = 0, h = this.document.y, r = function(t) {
                    return function() {
                        return e.textWidth = a + t.wordSpacing * (s - 1), e.wordCount = s, e.lineWidth = t.lineWidth, h = t.document.y, t.emit("line", n, e, t), i++
                    }
                }(this), this.emit("sectionStart", e, this), this.eachWord(t, function(t) {
                    return function(i, o, h, u) {
                        var l, c;
                        if ((null == u || u.required) && (t.emit("firstLine", e, t), t.spaceLeft = t.lineWidth), o <= t.spaceLeft && (n += i, a += o, s++), h.required || o > t.spaceLeft) {
                            if (h.required && t.emit("lastLine", e, t), l = t.document.currentLineHeight(!0), null != t.height && t.ellipsis && t.document.y + 2 * l > t.maxY && t.column >= t.columns) {
                                for (t.ellipsis === !0 && (t.ellipsis = "…"), n = n.replace(/\s+$/, ""), a = t.wordWidth(n + t.ellipsis); a > t.lineWidth;) n = n.slice(0, -1).replace(/\s+$/, ""), a = t.wordWidth(n + t.ellipsis);
                                n += t.ellipsis
                            }
                            return r(), t.document.y + l > t.maxY && (c = t.nextSection(), !c) ? (s = 0, n = "", !1) : h.required ? (o > t.spaceLeft && (n = i, a = o, s = 1, r()), t.spaceLeft = t.lineWidth, n = "", a = 0, s = 0) : (t.spaceLeft = t.lineWidth - o, n = i, a = o, s = 1)
                        }
                        return t.spaceLeft -= o
                    }
                }(this)), s > 0 && (this.emit("lastLine", e, this), r()), this.emit("sectionEnd", e, this), e.continued === !0 ? (i > 1 && (this.continuedX = 0), this.continuedX += e.textWidth, this.document.y = h) : this.document.x = this.startX
            }, e.prototype.nextSection = function(t) {
                var e;
                if (this.emit("sectionEnd", t, this), ++this.column > this.columns) {
                    if (null != this.height) return !1;
                    this.document.addPage(), this.column = 1, this.startY = this.document.page.margins.top, this.maxY = this.document.page.maxY(), this.document.x = this.startX, this.document._fillColor && (e = this.document).fillColor.apply(e, this.document._fillColor), this.emit("pageBreak", t, this)
                } else this.document.x += this.lineWidth + this.columnGap, this.document.y = this.startY, this.emit("columnBreak", t, this);
                return this.emit("sectionStart", t, this), !0
            }, e
        }(e), t.exports = i
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, n, r, i = {}.hasOwnProperty,
            o = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) i.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            };
        e = function() {
            function t(t) {
                this.doc = t, this.stops = [], this.embedded = !1, this.transform = [1, 0, 0, 1, 0, 0], this._colorSpace = "DeviceRGB"
            }
            return t.prototype.stop = function(t, e, n) {
                return null == n && (n = 1), n = Math.max(0, Math.min(1, n)), this.stops.push([t, this.doc._normalizeColor(e), n]), this
            }, t.prototype.embed = function() {
                var t, e, n, r, i, o, a, s, h, u, l, c, f, d, p, g, v, m, y, w, _, b, x, S, k, E, C, I, A, L, R, B, T, M, O, D;
                if (!this.embedded && 0 !== this.stops.length) {
                    for (this.embedded = !0, l = this.stops[this.stops.length - 1], l[0] < 1 && this.stops.push([1, l[1], l[2]]), t = [], r = [], A = [], u = R = 0, M = this.stops.length - 1; M >= 0 ? M > R : R > M; u = M >= 0 ? ++R : --R) r.push(0, 1), u + 2 !== this.stops.length && t.push(this.stops[u + 1][0]), i = this.doc.ref({
                        FunctionType: 2,
                        Domain: [0, 1],
                        C0: this.stops[u + 0][1],
                        C1: this.stops[u + 1][1],
                        N: 1
                    }), A.push(i), i.end();
                    if (1 === A.length ? i = A[0] : (i = this.doc.ref({
                            FunctionType: 3,
                            Domain: [0, 1],
                            Functions: A,
                            Bounds: t,
                            Encode: r
                        }), i.end()), this.id = "Sh" + ++this.doc._gradCount, c = this.doc._ctm.slice(), f = c[0], d = c[1], v = c[2], w = c[3], _ = c[4], b = c[5], O = this.transform, p = O[0], g = O[1], m = O[2], y = O[3], e = O[4], n = O[5], c[0] = f * p + v * g, c[1] = d * p + w * g, c[2] = f * m + v * y, c[3] = d * m + w * y, c[4] = f * e + v * n + _, c[5] = d * e + w * n + b, C = this.shader(i), C.end(), S = this.doc.ref({
                            Type: "Pattern",
                            PatternType: 2,
                            Shading: C,
                            Matrix: function() {
                                var t, e, n;
                                for (n = [], t = 0, e = c.length; e > t; t++) L = c[t], n.push(+L.toFixed(5));
                                return n
                            }()
                        }), this.doc.page.patterns[this.id] = S, S.end(), this.stops.some(function(t) {
                            return t[2] < 1
                        })) {
                        for (a = this.opacityGradient(), a._colorSpace = "DeviceGray", D = this.stops, B = 0, T = D.length; T > B; B++) I = D[B], a.stop(I[0], [I[2]]);
                        a = a.embed(), s = this.doc.ref({
                            Type: "Group",
                            S: "Transparency",
                            CS: "DeviceGray"
                        }), s.end(), k = this.doc.ref({
                            ProcSet: ["PDF", "Text", "ImageB", "ImageC", "ImageI"],
                            Shading: {
                                Sh1: a.data.Shading
                            }
                        }), k.end(), o = this.doc.ref({
                            Type: "XObject",
                            Subtype: "Form",
                            FormType: 1,
                            BBox: [0, 0, this.doc.page.width, this.doc.page.height],
                            Group: s,
                            Resources: k
                        }), o.end("/Sh1 sh"), E = this.doc.ref({
                            Type: "Mask",
                            S: "Luminosity",
                            G: o
                        }), E.end(), h = this.doc.ref({
                            Type: "ExtGState",
                            SMask: E
                        }), this.opacity_id = ++this.doc._opacityCount, x = "Gs" + this.opacity_id, this.doc.page.ext_gstates[x] = h, h.end()
                    }
                    return S
                }
            }, t.prototype.apply = function(t) {
                return this.embedded || this.embed(), this.doc.addContent("/" + this.id + " " + t), this.opacity_id ? (this.doc.addContent("/Gs" + this.opacity_id + " gs"), this.doc._sMasked = !0) : void 0
            }, t
        }(), n = function(t) {
            function e(t, n, r, i, o) {
                this.doc = t, this.x1 = n, this.y1 = r, this.x2 = i, this.y2 = o, e.__super__.constructor.apply(this, arguments)
            }
            return o(e, t), e.prototype.shader = function(t) {
                return this.doc.ref({
                    ShadingType: 2,
                    ColorSpace: this._colorSpace,
                    Coords: [this.x1, this.y1, this.x2, this.y2],
                    Function: t,
                    Extend: [!0, !0]
                })
            }, e.prototype.opacityGradient = function() {
                return new e(this.doc, this.x1, this.y1, this.x2, this.y2)
            }, e
        }(e), r = function(t) {
            function e(t, n, r, i, o, a, s) {
                this.doc = t, this.x1 = n, this.y1 = r, this.r1 = i, this.x2 = o, this.y2 = a, this.r2 = s, e.__super__.constructor.apply(this, arguments)
            }
            return o(e, t), e.prototype.shader = function(t) {
                return this.doc.ref({
                    ShadingType: 3,
                    ColorSpace: this._colorSpace,
                    Coords: [this.x1, this.y1, this.r1, this.x2, this.y2, this.r2],
                    Function: t,
                    Extend: [!0, !0]
                })
            }, e.prototype.opacityGradient = function() {
                return new e(this.doc, this.x1, this.y1, this.r1, this.x2, this.y2, this.r2)
            }, e
        }(e), t.exports = {
            PDFGradient: e,
            PDFLinearGradient: n,
            PDFRadialGradient: r
        }
    }).call(this)
}, function(t, e, n) {
    (function(t, r) {
        function i(t) {
            if (t < e.DEFLATE || t > e.UNZIP) throw new TypeError("Bad argument");
            this.mode = t, this.init_done = !1, this.write_in_progress = !1, this.pending_close = !1, this.windowBits = 0, this.level = 0, this.memLevel = 0, this.strategy = 0, this.dictionary = null
        }

        function o(t, e) {
            for (var n = 0; n < t.length; n++) this[e + n] = t[n]
        }
        var a = n(73),
            s = n(77),
            h = n(74),
            u = n(75),
            l = n(76);
        for (var c in l) e[c] = l[c];
        e.NONE = 0, e.DEFLATE = 1, e.INFLATE = 2, e.GZIP = 3, e.GUNZIP = 4, e.DEFLATERAW = 5, e.INFLATERAW = 6, e.UNZIP = 7, i.prototype.init = function(t, n, r, i, o) {
            switch (this.windowBits = t, this.level = n, this.memLevel = r, this.strategy = i, (this.mode === e.GZIP || this.mode === e.GUNZIP) && (this.windowBits += 16), this.mode === e.UNZIP && (this.windowBits += 32), (this.mode === e.DEFLATERAW || this.mode === e.INFLATERAW) && (this.windowBits = -this.windowBits), this.strm = new s, this.mode) {
                case e.DEFLATE:
                case e.GZIP:
                case e.DEFLATERAW:
                    var a = h.deflateInit2(this.strm, this.level, e.Z_DEFLATED, this.windowBits, this.memLevel, this.strategy);
                    break;
                case e.INFLATE:
                case e.GUNZIP:
                case e.INFLATERAW:
                case e.UNZIP:
                    var a = u.inflateInit2(this.strm, this.windowBits);
                    break;
                default:
                    throw new Error("Unknown mode " + this.mode)
            }
            return a !== e.Z_OK ? void this._error(a) : (this.write_in_progress = !1, void(this.init_done = !0))
        }, i.prototype.params = function() {
            throw new Error("deflateParams Not supported")
        }, i.prototype._writeCheck = function() {
            if (!this.init_done) throw new Error("write before init");
            if (this.mode === e.NONE) throw new Error("already finalized");
            if (this.write_in_progress) throw new Error("write already in progress");
            if (this.pending_close) throw new Error("close is pending")
        }, i.prototype.write = function(e, n, r, i, o, a, s) {
            this._writeCheck(), this.write_in_progress = !0;
            var h = this;
            return t.nextTick(function() {
                h.write_in_progress = !1;
                var t = h._write(e, n, r, i, o, a, s);
                h.callback(t[0], t[1]), h.pending_close && h.close()
            }), this
        }, i.prototype.writeSync = function(t, e, n, r, i, o, a) {
            return this._writeCheck(), this._write(t, e, n, r, i, o, a)
        }, i.prototype._write = function(t, n, i, a, s, l, c) {
            if (this.write_in_progress = !0, t !== e.Z_NO_FLUSH && t !== e.Z_PARTIAL_FLUSH && t !== e.Z_SYNC_FLUSH && t !== e.Z_FULL_FLUSH && t !== e.Z_FINISH && t !== e.Z_BLOCK) throw new Error("Invalid flush value");
            null == n && (n = new r(0), a = 0, i = 0), s.set = s._set ? s._set : o;
            var f = this.strm;
            switch (f.avail_in = a, f.input = n, f.next_in = i, f.avail_out = c, f.output = s, f.next_out = l, this.mode) {
                case e.DEFLATE:
                case e.GZIP:
                case e.DEFLATERAW:
                    var d = h.deflate(f, t);
                    break;
                case e.UNZIP:
                case e.INFLATE:
                case e.GUNZIP:
                case e.INFLATERAW:
                    var d = u.inflate(f, t);
                    break;
                default:
                    throw new Error("Unknown mode " + this.mode)
            }
            return d !== e.Z_STREAM_END && d !== e.Z_OK && this._error(d), this.write_in_progress = !1, [f.avail_in, f.avail_out]
        }, i.prototype.close = function() {
            return this.write_in_progress ? void(this.pending_close = !0) : (this.pending_close = !1, this.mode === e.DEFLATE || this.mode === e.GZIP || this.mode === e.DEFLATERAW ? h.deflateEnd(this.strm) : u.inflateEnd(this.strm), void(this.mode = e.NONE))
        }, i.prototype.reset = function() {
            switch (this.mode) {
                case e.DEFLATE:
                case e.DEFLATERAW:
                    var t = h.deflateReset(this.strm);
                    break;
                case e.INFLATE:
                case e.INFLATERAW:
                    var t = u.inflateReset(this.strm)
            }
            t !== e.Z_OK && this._error(t)
        }, i.prototype._error = function(t) {
            this.onerror(a[t] + ": " + this.strm.msg, t), this.write_in_progress = !1, this.pending_close && this.close()
        }, e.Zlib = i
    }).call(e, n(61), n(4).Buffer)
}, function(t, e, n) {
    (function(e) {
        (function() {
            var r, i, o;
            i = n(10), o = n(45), t.exports = r = function() {
                function t(t) {
                    var n, r, i, o, a, s, h, u, l, c, f;
                    for (this.data = t, this.pos = 8, this.palette = [], this.imgData = [], this.transparency = {}, this.text = {};;) {
                        switch (n = this.readUInt32(), s = function() {
                            var t, e;
                            for (e = [], i = t = 0; 4 > t; i = ++t) e.push(String.fromCharCode(this.data[this.pos++]));
                            return e
                        }.call(this).join("")) {
                            case "IHDR":
                                this.width = this.readUInt32(), this.height = this.readUInt32(), this.bits = this.data[this.pos++], this.colorType = this.data[this.pos++], this.compressionMethod = this.data[this.pos++], this.filterMethod = this.data[this.pos++], this.interlaceMethod = this.data[this.pos++];
                                break;
                            case "PLTE":
                                this.palette = this.read(n);
                                break;
                            case "IDAT":
                                for (i = l = 0; n > l; i = l += 1) this.imgData.push(this.data[this.pos++]);
                                break;
                            case "tRNS":
                                switch (this.transparency = {}, this.colorType) {
                                    case 3:
                                        if (this.transparency.indexed = this.read(n), h = 255 - this.transparency.indexed.length, h > 0)
                                            for (i = c = 0; h >= 0 ? h > c : c > h; i = h >= 0 ? ++c : --c) this.transparency.indexed.push(255);
                                        break;
                                    case 0:
                                        this.transparency.grayscale = this.read(n)[0];
                                        break;
                                    case 2:
                                        this.transparency.rgb = this.read(n)
                                }
                                break;
                            case "tEXt":
                                u = this.read(n), o = u.indexOf(0), a = String.fromCharCode.apply(String, u.slice(0, o)), this.text[a] = String.fromCharCode.apply(String, u.slice(o + 1));
                                break;
                            case "IEND":
                                return this.colors = function() {
                                    switch (this.colorType) {
                                        case 0:
                                        case 3:
                                        case 4:
                                            return 1;
                                        case 2:
                                        case 6:
                                            return 3
                                    }
                                }.call(this), this.hasAlphaChannel = 4 === (f = this.colorType) || 6 === f, r = this.colors + (this.hasAlphaChannel ? 1 : 0), this.pixelBitlength = this.bits * r, this.colorSpace = function() {
                                    switch (this.colors) {
                                        case 1:
                                            return "DeviceGray";
                                        case 3:
                                            return "DeviceRGB"
                                    }
                                }.call(this), void(this.imgData = new e(this.imgData));
                            default:
                                this.pos += n
                        }
                        if (this.pos += 4, this.pos > this.data.length) throw new Error("Incomplete or corrupt PNG file")
                    }
                }
                return t.decode = function(e, n) {
                    return i.readFile(e, function(e, r) {
                        var i;
                        return i = new t(r), i.decode(function(t) {
                            return n(t)
                        })
                    })
                }, t.load = function(e) {
                    var n;
                    return n = i.readFileSync(e), new t(n)
                }, t.prototype.read = function(t) {
                    var e, n, r;
                    for (r = [], e = n = 0; t >= 0 ? t > n : n > t; e = t >= 0 ? ++n : --n) r.push(this.data[this.pos++]);
                    return r
                }, t.prototype.readUInt32 = function() {
                    var t, e, n, r;
                    return t = this.data[this.pos++] << 24, e = this.data[this.pos++] << 16, n = this.data[this.pos++] << 8, r = this.data[this.pos++], t | e | n | r
                }, t.prototype.readUInt16 = function() {
                    var t, e;
                    return t = this.data[this.pos++] << 8, e = this.data[this.pos++], t | e
                }, t.prototype.decodePixels = function(t) {
                    var n = this;
                    return o.inflate(this.imgData, function(r, i) {
                        var o, a, s, h, u, l, c, f, d, p, g, v, m, y, w, _, b, x, S, k, E, C, I;
                        if (r) throw r;
                        for (v = n.pixelBitlength / 8, _ = v * n.width, m = new e(_ * n.height), l = i.length, w = 0, y = 0, a = 0; l > y;) {
                            switch (i[y++]) {
                                case 0:
                                    for (h = S = 0; _ > S; h = S += 1) m[a++] = i[y++];
                                    break;
                                case 1:
                                    for (h = k = 0; _ > k; h = k += 1) o = i[y++], u = v > h ? 0 : m[a - v], m[a++] = (o + u) % 256;
                                    break;
                                case 2:
                                    for (h = E = 0; _ > E; h = E += 1) o = i[y++], s = (h - h % v) / v, b = w && m[(w - 1) * _ + s * v + h % v], m[a++] = (b + o) % 256;
                                    break;
                                case 3:
                                    for (h = C = 0; _ > C; h = C += 1) o = i[y++], s = (h - h % v) / v, u = v > h ? 0 : m[a - v], b = w && m[(w - 1) * _ + s * v + h % v], m[a++] = (o + Math.floor((u + b) / 2)) % 256;
                                    break;
                                case 4:
                                    for (h = I = 0; _ > I; h = I += 1) o = i[y++], s = (h - h % v) / v, u = v > h ? 0 : m[a - v], 0 === w ? b = x = 0 : (b = m[(w - 1) * _ + s * v + h % v], x = s && m[(w - 1) * _ + (s - 1) * v + h % v]), c = u + b - x, f = Math.abs(c - u), p = Math.abs(c - b), g = Math.abs(c - x), d = p >= f && g >= f ? u : g >= p ? b : x, m[a++] = (o + d) % 256;
                                    break;
                                default:
                                    throw new Error("Invalid filter algorithm: " + i[y - 1])
                            }
                            w++
                        }
                        return t(m)
                    })
                }, t.prototype.decodePalette = function() {
                    var t, n, r, i, o, a, s, h, u, l;
                    for (i = this.palette, s = this.transparency.indexed || [], a = new e(s.length + i.length), o = 0, r = i.length, t = 0, n = h = 0, u = i.length; u > h; n = h += 3) a[o++] = i[n], a[o++] = i[n + 1], a[o++] = i[n + 2], a[o++] = null != (l = s[t++]) ? l : 255;
                    return a
                }, t.prototype.copyToImageData = function(t, e) {
                    var n, r, i, o, a, s, h, u, l, c, f;
                    if (r = this.colors, l = null, n = this.hasAlphaChannel, this.palette.length && (l = null != (f = this._decodedPalette) ? f : this._decodedPalette = this.decodePalette(), r = 4, n = !0), i = (null != t ? t.data : void 0) || t, u = i.length, a = l || e, o = s = 0, 1 === r)
                        for (; u > o;) h = l ? 4 * e[o / 4] : s, c = a[h++], i[o++] = c, i[o++] = c, i[o++] = c, i[o++] = n ? a[h++] : 255, s = h;
                    else
                        for (; u > o;) h = l ? 4 * e[o / 4] : s, i[o++] = a[h++], i[o++] = a[h++], i[o++] = a[h++], i[o++] = n ? a[h++] : 255, s = h
                }, t.prototype.decode = function(t) {
                    var n, r = this;
                    return n = new e(this.width * this.height * 4), this.decodePixels(function(e) {
                        return r.copyToImageData(n, e), t(n)
                    })
                }, t
            }()
        }).call(this)
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    (function(e, r) {
        (function() {
            var i, o, a, s, h;
            s = n(64), i = n(63), a = n(65), h = n(10), o = function() {
                function t(t, r, o, h) {
                    if (this.document = t, this.id = h, "string" == typeof r) {
                        if (r in n) return this.isAFM = !0, this.font = new i(n[r]()), void this.registerAFM(r);
                        if (/\.(ttf|ttc)$/i.test(r)) this.font = s.open(r, o);
                        else {
                            if (!/\.dfont$/i.test(r)) throw new Error("Not a supported font format or standard PDF font.");
                            this.font = s.fromDFont(r, o)
                        }
                    } else if (e.isBuffer(r)) this.font = s.fromBuffer(r, o);
                    else if (r instanceof Uint8Array) this.font = s.fromBuffer(new e(r), o);
                    else {
                        if (!(r instanceof ArrayBuffer)) throw new Error("Not a supported font format or standard PDF font.");
                        this.font = s.fromBuffer(new e(new Uint8Array(r)), o)
                    }
                    this.subset = new a(this.font), this.registerTTF()
                }
                var n, o;
                return n = {
                    Courier: function() {
                        return h.readFileSync(r + "/font/data/Courier.afm", "utf8")
                    },
                    "Courier-Bold": function() {
                        return h.readFileSync(r + "/font/data/Courier-Bold.afm", "utf8")
                    },
                    "Courier-Oblique": function() {
                        return h.readFileSync(r + "/font/data/Courier-Oblique.afm", "utf8")
                    },
                    "Courier-BoldOblique": function() {
                        return h.readFileSync(r + "/font/data/Courier-BoldOblique.afm", "utf8")
                    },
                    Helvetica: function() {
                        return h.readFileSync(r + "/font/data/Helvetica.afm", "utf8")
                    },
                    "Helvetica-Bold": function() {
                        return h.readFileSync(r + "/font/data/Helvetica-Bold.afm", "utf8")
                    },
                    "Helvetica-Oblique": function() {
                        return h.readFileSync(r + "/font/data/Helvetica-Oblique.afm", "utf8")
                    },
                    "Helvetica-BoldOblique": function() {
                        return h.readFileSync(r + "/font/data/Helvetica-BoldOblique.afm", "utf8")
                    },
                    "Times-Roman": function() {
                        return h.readFileSync(r + "/font/data/Times-Roman.afm", "utf8")
                    },
                    "Times-Bold": function() {
                        return h.readFileSync(r + "/font/data/Times-Bold.afm", "utf8")
                    },
                    "Times-Italic": function() {
                        return h.readFileSync(r + "/font/data/Times-Italic.afm", "utf8")
                    },
                    "Times-BoldItalic": function() {
                        return h.readFileSync(r + "/font/data/Times-BoldItalic.afm", "utf8")
                    },
                    Symbol: function() {
                        return h.readFileSync(r + "/font/data/Symbol.afm", "utf8")
                    },
                    ZapfDingbats: function() {
                        return h.readFileSync(r + "/font/data/ZapfDingbats.afm", "utf8")
                    }
                }, t.prototype.use = function(t) {
                    var e;
                    return null != (e = this.subset) ? e.use(t) : void 0
                }, t.prototype.embed = function() {
                    return this.embedded || null == this.dictionary ? void 0 : (this.isAFM ? this.embedAFM() : this.embedTTF(), this.embedded = !0)
                }, t.prototype.encode = function(t) {
                    var e;
                    return this.isAFM ? this.font.encodeText(t) : (null != (e = this.subset) ? e.encodeText(t) : void 0) || t
                }, t.prototype.ref = function() {
                    return null != this.dictionary ? this.dictionary : this.dictionary = this.document.ref()
                }, t.prototype.registerTTF = function() {
                    var t, e, n, r, i;
                    if (this.name = this.font.name.postscriptName, this.scaleFactor = 1e3 / this.font.head.unitsPerEm, this.bbox = function() {
                            var e, n, r, i;
                            for (r = this.font.bbox, i = [], e = 0, n = r.length; n > e; e++) t = r[e], i.push(Math.round(t * this.scaleFactor));
                            return i
                        }.call(this), this.stemV = 0, this.font.post.exists ? (r = this.font.post.italic_angle, e = r >> 16, n = 255 & r, e & !0 && (e = -((65535 ^ e) + 1)), this.italicAngle = +("" + e + "." + n)) : this.italicAngle = 0, this.ascender = Math.round(this.font.ascender * this.scaleFactor), this.decender = Math.round(this.font.decender * this.scaleFactor), this.lineGap = Math.round(this.font.lineGap * this.scaleFactor), this.capHeight = this.font.os2.exists && this.font.os2.capHeight || this.ascender, this.xHeight = this.font.os2.exists && this.font.os2.xHeight || 0, this.familyClass = (this.font.os2.exists && this.font.os2.familyClass || 0) >> 8, this.isSerif = 1 === (i = this.familyClass) || 2 === i || 3 === i || 4 === i || 5 === i || 7 === i, this.isScript = 10 === this.familyClass, this.flags = 0, this.font.post.isFixedPitch && (this.flags |= 1), this.isSerif && (this.flags |= 2), this.isScript && (this.flags |= 8), 0 !== this.italicAngle && (this.flags |= 64), this.flags |= 32, !this.font.cmap.unicode) throw new Error("No unicode cmap for font")
                }, t.prototype.embedTTF = function() {
                    var t, e, n, r, i, a, s, h;
                    return r = this.subset.encode(), s = this.document.ref(), s.write(r), s.data.Length1 = s.uncompressedLength, s.end(), i = this.document.ref({
                        Type: "FontDescriptor",
                        FontName: this.subset.postscriptName,
                        FontFile2: s,
                        FontBBox: this.bbox,
                        Flags: this.flags,
                        StemV: this.stemV,
                        ItalicAngle: this.italicAngle,
                        Ascent: this.ascender,
                        Descent: this.decender,
                        CapHeight: this.capHeight,
                        XHeight: this.xHeight
                    }), i.end(), a = +Object.keys(this.subset.cmap)[0], t = function() {
                        var t, e;
                        t = this.subset.cmap, e = [];
                        for (n in t) h = t[n], e.push(Math.round(this.font.widthOfGlyph(h)));
                        return e
                    }.call(this), e = this.document.ref(), e.end(o(this.subset.subset)), this.dictionary.data = {
                        Type: "Font",
                        BaseFont: this.subset.postscriptName,
                        Subtype: "TrueType",
                        FontDescriptor: i,
                        FirstChar: a,
                        LastChar: a + t.length - 1,
                        Widths: t,
                        Encoding: "MacRomanEncoding",
                        ToUnicode: e
                    }, this.dictionary.end()
                }, o = function(t) {
                    var e, n, r, i, o, a, s;
                    for (o = "/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<00><ff>\nendcodespacerange", n = Object.keys(t).sort(function(t, e) {
                            return t - e
                        }), r = [], a = 0, s = n.length; s > a; a++) e = n[a], r.length >= 100 && (o += "\n" + r.length + " beginbfchar\n" + r.join("\n") + "\nendbfchar", r = []), i = ("0000" + t[e].toString(16)).slice(-4), e = (+e).toString(16), r.push("<" + e + "><" + i + ">");
                    return r.length && (o += "\n" + r.length + " beginbfchar\n" + r.join("\n") + "\nendbfchar\n"), o += "endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend"
                }, t.prototype.registerAFM = function(t) {
                    var e;
                    return this.name = t, e = this.font, this.ascender = e.ascender, this.decender = e.decender, this.bbox = e.bbox, this.lineGap = e.lineGap, e
                }, t.prototype.embedAFM = function() {
                    return this.dictionary.data = {
                        Type: "Font",
                        BaseFont: this.name,
                        Subtype: "Type1",
                        Encoding: "WinAnsiEncoding"
                    }, this.dictionary.end()
                }, t.prototype.widthOfString = function(t, e) {
                    var n, r, i, o, a, s;
                    for (t = "" + t, o = 0, r = a = 0, s = t.length; s >= 0 ? s > a : a > s; r = s >= 0 ? ++a : --a) n = t.charCodeAt(r), o += this.font.widthOfGlyph(this.font.characterToGlyph(n)) || 0;
                    return i = e / 1e3, o * i
                }, t.prototype.lineHeight = function(t, e) {
                    var n;
                    return null == e && (e = !1), n = e ? this.lineGap : 0, (this.ascender + n - this.decender) / 1e3 * t
                }, t
            }(), t.exports = o
        }).call(this)
    }).call(e, n(4).Buffer, "/")
}, function(t, e, n) {
    function r(t, e) {
        return d.isUndefined(e) ? "" + e : d.isNumber(e) && !isFinite(e) ? e.toString() : d.isFunction(e) || d.isRegExp(e) ? e.toString() : e
    }

    function i(t, e) {
        return d.isString(t) ? t.length < e ? t : t.slice(0, e) : t
    }

    function o(t) {
        return i(JSON.stringify(t.actual, r), 128) + " " + t.operator + " " + i(JSON.stringify(t.expected, r), 128)
    }

    function a(t, e, n, r, i) {
        throw new v.AssertionError({
            message: n,
            actual: t,
            expected: e,
            operator: r,
            stackStartFunction: i
        })
    }

    function s(t, e) {
        t || a(t, !0, e, "==", v.ok)
    }

    function h(t, e) {
        if (t === e) return !0;
        if (d.isBuffer(t) && d.isBuffer(e)) {
            if (t.length != e.length) return !1;
            for (var n = 0; n < t.length; n++)
                if (t[n] !== e[n]) return !1;
            return !0
        }
        return d.isDate(t) && d.isDate(e) ? t.getTime() === e.getTime() : d.isRegExp(t) && d.isRegExp(e) ? t.source === e.source && t.global === e.global && t.multiline === e.multiline && t.lastIndex === e.lastIndex && t.ignoreCase === e.ignoreCase : d.isObject(t) || d.isObject(e) ? l(t, e) : t == e
    }

    function u(t) {
        return "[object Arguments]" == Object.prototype.toString.call(t)
    }

    function l(t, e) {
        if (d.isNullOrUndefined(t) || d.isNullOrUndefined(e)) return !1;
        if (t.prototype !== e.prototype) return !1;
        if (d.isPrimitive(t) || d.isPrimitive(e)) return t === e;
        var n = u(t),
            r = u(e);
        if (n && !r || !n && r) return !1;
        if (n) return t = p.call(t), e = p.call(e), h(t, e);
        var i, o, a = m(t),
            s = m(e);
        if (a.length != s.length) return !1;
        for (a.sort(), s.sort(), o = a.length - 1; o >= 0; o--)
            if (a[o] != s[o]) return !1;
        for (o = a.length - 1; o >= 0; o--)
            if (i = a[o], !h(t[i], e[i])) return !1;
        return !0
    }

    function c(t, e) {
        return t && e ? "[object RegExp]" == Object.prototype.toString.call(e) ? e.test(t) : t instanceof e ? !0 : e.call({}, t) === !0 ? !0 : !1 : !1
    }

    function f(t, e, n, r) {
        var i;
        d.isString(n) && (r = n, n = null);
        try {
            e()
        } catch (o) {
            i = o
        }
        if (r = (n && n.name ? " (" + n.name + ")." : ".") + (r ? " " + r : "."), t && !i && a(i, n, "Missing expected exception" + r), !t && c(i, n) && a(i, n, "Got unwanted exception" + r), t && i && n && !c(i, n) || !t && i) throw i
    }
    var d = n(60),
        p = Array.prototype.slice,
        g = Object.prototype.hasOwnProperty,
        v = t.exports = s;
    v.AssertionError = function(t) {
        this.name = "AssertionError", this.actual = t.actual, this.expected = t.expected, this.operator = t.operator, t.message ? (this.message = t.message, this.generatedMessage = !1) : (this.message = o(this), this.generatedMessage = !0);
        var e = t.stackStartFunction || a;
        if (Error.captureStackTrace) Error.captureStackTrace(this, e);
        else {
            var n = new Error;
            if (n.stack) {
                var r = n.stack,
                    i = e.name,
                    s = r.indexOf("\n" + i);
                if (s >= 0) {
                    var h = r.indexOf("\n", s + 1);
                    r = r.substring(h + 1)
                }
                this.stack = r
            }
        }
    }, d.inherits(v.AssertionError, Error), v.fail = a, v.ok = s, v.equal = function(t, e, n) {
        t != e && a(t, e, n, "==", v.equal)
    }, v.notEqual = function(t, e, n) {
        t == e && a(t, e, n, "!=", v.notEqual)
    }, v.deepEqual = function(t, e, n) {
        h(t, e) || a(t, e, n, "deepEqual", v.deepEqual)
    }, v.notDeepEqual = function(t, e, n) {
        h(t, e) && a(t, e, n, "notDeepEqual", v.notDeepEqual)
    }, v.strictEqual = function(t, e, n) {
        t !== e && a(t, e, n, "===", v.strictEqual)
    }, v.notStrictEqual = function(t, e, n) {
        t === e && a(t, e, n, "!==", v.notStrictEqual)
    }, v["throws"] = function(t, e, n) {
        f.apply(this, [!0].concat(p.call(arguments)))
    }, v.doesNotThrow = function(t, e) {
        f.apply(this, [!1].concat(p.call(arguments)))
    }, v.ifError = function(t) {
        if (t) throw t
    };
    var m = Object.keys || function(t) {
        var e = [];
        for (var n in t) g.call(t, n) && e.push(n);
        return e
    }
}, function(t, e, n) {
    function r() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
    }

    function i(t) {
        return "function" == typeof t
    }

    function o(t) {
        return "number" == typeof t
    }

    function a(t) {
        return "object" == typeof t && null !== t
    }

    function s(t) {
        return void 0 === t
    }
    t.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(t) {
        if (!o(t) || 0 > t || isNaN(t)) throw TypeError("n must be a positive number");
        return this._maxListeners = t, this
    }, r.prototype.emit = function(t) {
        var e, n, r, o, h, u;
        if (this._events || (this._events = {}), "error" === t && (!this._events.error || a(this._events.error) && !this._events.error.length)) {
            if (e = arguments[1], e instanceof Error) throw e;
            throw TypeError('Uncaught, unspecified "error" event.')
        }
        if (n = this._events[t], s(n)) return !1;
        if (i(n)) switch (arguments.length) {
            case 1:
                n.call(this);
                break;
            case 2:
                n.call(this, arguments[1]);
                break;
            case 3:
                n.call(this, arguments[1], arguments[2]);
                break;
            default:
                for (r = arguments.length, o = new Array(r - 1), h = 1; r > h; h++) o[h - 1] = arguments[h];
                n.apply(this, o)
        } else if (a(n)) {
            for (r = arguments.length, o = new Array(r - 1), h = 1; r > h; h++) o[h - 1] = arguments[h];
            for (u = n.slice(), r = u.length, h = 0; r > h; h++) u[h].apply(this, o)
        } return !0
    }, r.prototype.addListener = function(t, e) {
        var n;
        if (!i(e)) throw TypeError("listener must be a function");
        if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, i(e.listener) ? e.listener : e), this._events[t] ? a(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, a(this._events[t]) && !this._events[t].warned) {
            var n;
            n = s(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners, n && n > 0 && this._events[t].length > n && (this._events[t].warned = !0, "function" == typeof console.trace)
        }
        return this
    }, r.prototype.on = r.prototype.addListener, r.prototype.once = function(t, e) {
        function n() {
            this.removeListener(t, n), r || (r = !0, e.apply(this, arguments))
        }
        if (!i(e)) throw TypeError("listener must be a function");
        var r = !1;
        return n.listener = e, this.on(t, n), this
    }, r.prototype.removeListener = function(t, e) {
        var n, r, o, s;
        if (!i(e)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[t]) return this;
        if (n = this._events[t], o = n.length, r = -1, n === e || i(n.listener) && n.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
        else if (a(n)) {
            for (s = o; s-- > 0;)
                if (n[s] === e || n[s].listener && n[s].listener === e) {
                    r = s;
                    break
                } if (0 > r) return this;
            1 === n.length ? (n.length = 0, delete this._events[t]) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", t, e)
        }
        return this
    }, r.prototype.removeAllListeners = function(t) {
        var e, n;
        if (!this._events) return this;
        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
        if (0 === arguments.length) {
            for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
            return this.removeAllListeners("removeListener"), this._events = {}, this
        }
        if (n = this._events[t], i(n)) this.removeListener(t, n);
        else
            for (; n.length;) this.removeListener(t, n[n.length - 1]);
        return delete this._events[t], this
    }, r.prototype.listeners = function(t) {
        var e;
        return e = this._events && this._events[t] ? i(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
    }, r.listenerCount = function(t, e) {
        var n;
        return n = t._events && t._events[e] ? i(t._events[e]) ? 1 : t._events[e].length : 0
    }
}, function(t, e, n) {
    t.exports = n(70)
}, function(t, e, n) {
    e = t.exports = n(71), e.Stream = n(46), e.Readable = e, e.Writable = n(67), e.Duplex = n(69), e.Transform = n(70), e.PassThrough = n(68)
}, function(t, e, n) {
    t.exports = n(67)
}, function(t, e, n) {
    t.exports = n(69)
}, function(t, e, n) {
    t.exports = n(68)
}, function(t, e, n) {
    (function(t, r) {
        function i(t, n) {
            var r = {
                seen: [],
                stylize: a
            };
            return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), g(n) ? r.showHidden = n : n && e._extend(r, n), b(r.showHidden) && (r.showHidden = !1), b(r.depth) && (r.depth = 2), b(r.colors) && (r.colors = !1), b(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = o), h(r, t, r.depth)
        }

        function o(t, e) {
            var n = i.styles[e];
            return n ? "[" + i.colors[n][0] + "m" + t + "[" + i.colors[n][1] + "m" : t
        }

        function a(t, e) {
            return t
        }

        function s(t) {
            var e = {};
            return t.forEach(function(t, n) {
                e[t] = !0
            }), e
        }

        function h(t, n, r) {
            if (t.customInspect && n && C(n.inspect) && n.inspect !== e.inspect && (!n.constructor || n.constructor.prototype !== n)) {
                var i = n.inspect(r, t);
                return w(i) || (i = h(t, i, r)), i
            }
            var o = u(t, n);
            if (o) return o;
            var a = Object.keys(n),
                g = s(a);
            if (t.showHidden && (a = Object.getOwnPropertyNames(n)), E(n) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return l(n);
            if (0 === a.length) {
                if (C(n)) {
                    var v = n.name ? ": " + n.name : "";
                    return t.stylize("[Function" + v + "]", "special")
                }
                if (x(n)) return t.stylize(RegExp.prototype.toString.call(n), "regexp");
                if (k(n)) return t.stylize(Date.prototype.toString.call(n), "date");
                if (E(n)) return l(n)
            }
            var m = "",
                y = !1,
                _ = ["{", "}"];
            if (p(n) && (y = !0, _ = ["[", "]"]), C(n)) {
                var b = n.name ? ": " + n.name : "";
                m = " [Function" + b + "]"
            }
            if (x(n) && (m = " " + RegExp.prototype.toString.call(n)), k(n) && (m = " " + Date.prototype.toUTCString.call(n)), E(n) && (m = " " + l(n)), 0 === a.length && (!y || 0 == n.length)) return _[0] + m + _[1];
            if (0 > r) return x(n) ? t.stylize(RegExp.prototype.toString.call(n), "regexp") : t.stylize("[Object]", "special");
            t.seen.push(n);
            var S;
            return S = y ? c(t, n, r, g, a) : a.map(function(e) {
                return f(t, n, r, g, e, y)
            }), t.seen.pop(), d(S, m, _)
        }

        function u(t, e) {
            if (b(e)) return t.stylize("undefined", "undefined");
            if (w(e)) {
                var n = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                return t.stylize(n, "string")
            }
            return y(e) ? t.stylize("" + e, "number") : g(e) ? t.stylize("" + e, "boolean") : v(e) ? t.stylize("null", "null") : void 0
        }

        function l(t) {
            return "[" + Error.prototype.toString.call(t) + "]"
        }

        function c(t, e, n, r, i) {
            for (var o = [], a = 0, s = e.length; s > a; ++a) o.push(L(e, String(a)) ? f(t, e, n, r, String(a), !0) : "");
            return i.forEach(function(i) {
                i.match(/^\d+$/) || o.push(f(t, e, n, r, i, !0))
            }), o
        }

        function f(t, e, n, r, i, o) {
            var a, s, u;
            if (u = Object.getOwnPropertyDescriptor(e, i) || {
                    value: e[i]
                }, u.get ? s = u.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : u.set && (s = t.stylize("[Setter]", "special")), L(r, i) || (a = "[" + i + "]"), s || (t.seen.indexOf(u.value) < 0 ? (s = v(n) ? h(t, u.value, null) : h(t, u.value, n - 1), s.indexOf("\n") > -1 && (s = o ? s.split("\n").map(function(t) {
                    return "  " + t
                }).join("\n").substr(2) : "\n" + s.split("\n").map(function(t) {
                    return "   " + t
                }).join("\n"))) : s = t.stylize("[Circular]", "special")), b(a)) {
                if (o && i.match(/^\d+$/)) return s;
                a = JSON.stringify("" + i), a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = t.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = t.stylize(a, "string"))
            }
            return a + ": " + s
        }

        function d(t, e, n) {
            var r = 0,
                i = t.reduce(function(t, e) {
                    return r++, e.indexOf("\n") >= 0 && r++, t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
                }, 0);
            return i > 60 ? n[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + n[1] : n[0] + e + " " + t.join(", ") + " " + n[1]
        }

        function p(t) {
            return Array.isArray(t)
        }

        function g(t) {
            return "boolean" == typeof t
        }

        function v(t) {
            return null === t
        }

        function m(t) {
            return null == t
        }

        function y(t) {
            return "number" == typeof t
        }

        function w(t) {
            return "string" == typeof t
        }

        function _(t) {
            return "symbol" == typeof t
        }

        function b(t) {
            return void 0 === t
        }

        function x(t) {
            return S(t) && "[object RegExp]" === A(t)
        }

        function S(t) {
            return "object" == typeof t && null !== t
        }

        function k(t) {
            return S(t) && "[object Date]" === A(t)
        }

        function E(t) {
            return S(t) && ("[object Error]" === A(t) || t instanceof Error)
        }

        function C(t) {
            return "function" == typeof t
        }

        function I(t) {
            return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || "undefined" == typeof t
        }

        function A(t) {
            return Object.prototype.toString.call(t)
        }

        function L(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        var R = /%[sdj%]/g;
        e.format = function(t) {
            if (!w(t)) {
                for (var e = [], n = 0; n < arguments.length; n++) e.push(i(arguments[n]));
                return e.join(" ")
            }
            for (var n = 1, r = arguments, o = r.length, a = String(t).replace(R, function(t) {
                    if ("%%" === t) return "%";
                    if (n >= o) return t;
                    switch (t) {
                        case "%s":
                            return String(r[n++]);
                        case "%d":
                            return Number(r[n++]);
                        case "%j":
                            try {
                                return JSON.stringify(r[n++])
                            } catch (e) {
                                return "[Circular]"
                            }
                            default:
                                return t
                    }
                }), s = r[n]; o > n; s = r[++n]) a += v(s) || !S(s) ? " " + s : " " + i(s);
            return a
        }, e.deprecate = function(n, i) {
            function o() {
                if (!a) {
                    if (r.throwDeprecation) throw new Error(i);
                    r.traceDeprecation, a = !0
                }
                return n.apply(this, arguments)
            }
            if (b(t.process)) return function() {
                return e.deprecate(n, i).apply(this, arguments);

            };
            if (r.noDeprecation === !0) return n;
            var a = !1;
            return o
        };
        var B, T = {};
        e.debuglog = function(t) {
            if (b(B) && (B = r.env.NODE_DEBUG || ""), t = t.toUpperCase(), !T[t])
                if (new RegExp("\\b" + t + "\\b", "i").test(B)) {
                    {
                        r.pid
                    }
                    T[t] = function() {
                        e.format.apply(e, arguments)
                    }
                } else T[t] = function() {};
            return T[t]
        }, e.inspect = i, i.colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39]
        }, i.styles = {
            special: "cyan",
            number: "yellow",
            "boolean": "yellow",
            undefined: "grey",
            "null": "bold",
            string: "green",
            date: "magenta",
            regexp: "red"
        }, e.isArray = p, e.isBoolean = g, e.isNull = v, e.isNullOrUndefined = m, e.isNumber = y, e.isString = w, e.isSymbol = _, e.isUndefined = b, e.isRegExp = x, e.isObject = S, e.isDate = k, e.isError = E, e.isFunction = C, e.isPrimitive = I, e.isBuffer = n(72);
        e.log = function() {}, e.inherits = n(94), e._extend = function(t, e) {
            if (!e || !S(e)) return t;
            for (var n = Object.keys(e), r = n.length; r--;) t[n[r]] = e[n[r]];
            return t
        }
    }).call(e, function() {
        return this
    }(), n(61))
}, function(t, e, n) {
    function r() {
        if (!s) {
            s = !0;
            for (var t, e = a.length; e;) {
                t = a, a = [];
                for (var n = -1; ++n < e;) t[n]();
                e = a.length
            }
            s = !1
        }
    }

    function i() {}
    var o = t.exports = {},
        a = [],
        s = !1;
    o.nextTick = function(t) {
        a.push(t), s || setTimeout(r, 0)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = i, o.addListener = i, o.once = i, o.off = i, o.removeListener = i, o.removeAllListeners = i, o.emit = i, o.binding = function(t) {
        throw new Error("process.binding is not supported")
    }, o.cwd = function() {
        return "/"
    }, o.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    }, o.umask = function() {
        return 0
    }
}, function(t, e, n) {
    t.exports = "function" == typeof Object.create ? function(t, e) {
        t.super_ = e, t.prototype = Object.create(e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    } : function(t, e) {
        t.super_ = e;
        var n = function() {};
        n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
    }
}, function(t, e, n) {
    (function() {
        var e, r;
        r = n(10), e = function() {
            function t(t) {
                var e, r;
                this.contents = t, this.attributes = {}, this.glyphWidths = {}, this.boundingBoxes = {}, this.parse(), this.charWidths = function() {
                    var t, e;
                    for (e = [], r = t = 0; 255 >= t; r = ++t) e.push(this.glyphWidths[n[r]]);
                    return e
                }.call(this), this.bbox = function() {
                    var t, n, r, i;
                    for (r = this.attributes.FontBBox.split(/\s+/), i = [], t = 0, n = r.length; n > t; t++) e = r[t], i.push(+e);
                    return i
                }.call(this), this.ascender = +(this.attributes.Ascender || 0), this.decender = +(this.attributes.Descender || 0), this.lineGap = this.bbox[3] - this.bbox[1] - (this.ascender - this.decender)
            }
            var e, n;
            return t.open = function(e) {
                return new t(r.readFileSync(e, "utf8"))
            }, t.prototype.parse = function() {
                var t, e, n, r, i, o, a, s, h, u;
                for (o = "", u = this.contents.split("\n"), s = 0, h = u.length; h > s; s++)
                    if (n = u[s], r = n.match(/^Start(\w+)/)) o = r[1];
                    else if (r = n.match(/^End(\w+)/)) o = "";
                else switch (o) {
                    case "FontMetrics":
                        r = n.match(/(^\w+)\s+(.*)/), e = r[1], a = r[2], (t = this.attributes[e]) ? (Array.isArray(t) || (t = this.attributes[e] = [t]), t.push(a)) : this.attributes[e] = a;
                        break;
                    case "CharMetrics":
                        if (!/^CH?\s/.test(n)) continue;
                        i = n.match(/\bN\s+(\.?\w+)\s*;/)[1], this.glyphWidths[i] = +n.match(/\bWX\s+(\d+)\s*;/)[1]
                }
            }, e = {
                402: 131,
                8211: 150,
                8212: 151,
                8216: 145,
                8217: 146,
                8218: 130,
                8220: 147,
                8221: 148,
                8222: 132,
                8224: 134,
                8225: 135,
                8226: 149,
                8230: 133,
                8364: 128,
                8240: 137,
                8249: 139,
                8250: 155,
                710: 136,
                8482: 153,
                338: 140,
                339: 156,
                732: 152,
                352: 138,
                353: 154,
                376: 159,
                381: 142,
                382: 158
            }, t.prototype.encodeText = function(t) {
                var n, r, i, o, a;
                for (i = "", r = o = 0, a = t.length; a >= 0 ? a > o : o > a; r = a >= 0 ? ++o : --o) n = t.charCodeAt(r), n = e[n] || n, i += String.fromCharCode(n);
                return i
            }, t.prototype.characterToGlyph = function(t) {
                return n[e[t] || t]
            }, t.prototype.widthOfGlyph = function(t) {
                return this.glyphWidths[t]
            }, n = ".notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n\nspace         exclam         quotedbl       numbersign\ndollar        percent        ampersand      quotesingle\nparenleft     parenright     asterisk       plus\ncomma         hyphen         period         slash\nzero          one            two            three\nfour          five           six            seven\neight         nine           colon          semicolon\nless          equal          greater        question\n\nat            A              B              C\nD             E              F              G\nH             I              J              K\nL             M              N              O\nP             Q              R              S\nT             U              V              W\nX             Y              Z              bracketleft\nbackslash     bracketright   asciicircum    underscore\n\ngrave         a              b              c\nd             e              f              g\nh             i              j              k\nl             m              n              o\np             q              r              s\nt             u              v              w\nx             y              z              braceleft\nbar           braceright     asciitilde     .notdef\n\nEuro          .notdef        quotesinglbase florin\nquotedblbase  ellipsis       dagger         daggerdbl\ncircumflex    perthousand    Scaron         guilsinglleft\nOE            .notdef        Zcaron         .notdef\n.notdef       quoteleft      quoteright     quotedblleft\nquotedblright bullet         endash         emdash\ntilde         trademark      scaron         guilsinglright\noe            .notdef        zcaron         ydieresis\n\nspace         exclamdown     cent           sterling\ncurrency      yen            brokenbar      section\ndieresis      copyright      ordfeminine    guillemotleft\nlogicalnot    hyphen         registered     macron\ndegree        plusminus      twosuperior    threesuperior\nacute         mu             paragraph      periodcentered\ncedilla       onesuperior    ordmasculine   guillemotright\nonequarter    onehalf        threequarters  questiondown\n\nAgrave        Aacute         Acircumflex    Atilde\nAdieresis     Aring          AE             Ccedilla\nEgrave        Eacute         Ecircumflex    Edieresis\nIgrave        Iacute         Icircumflex    Idieresis\nEth           Ntilde         Ograve         Oacute\nOcircumflex   Otilde         Odieresis      multiply\nOslash        Ugrave         Uacute         Ucircumflex\nUdieresis     Yacute         Thorn          germandbls\n\nagrave        aacute         acircumflex    atilde\nadieresis     aring          ae             ccedilla\negrave        eacute         ecircumflex    edieresis\nigrave        iacute         icircumflex    idieresis\neth           ntilde         ograve         oacute\nocircumflex   otilde         odieresis      divide\noslash        ugrave         uacute         ucircumflex\nudieresis     yacute         thorn          ydieresis".split(/\s+/), t
        }(), t.exports = e
    }).call(this)
}, function(t, e, n) {
    (function() {
        var CmapTable, e, r, i, GlyfTable, HeadTable, HheaTable, HmtxTable, LocaTable, MaxpTable, NameTable, OS2Table, PostTable, o, a;
        a = n(10), r = n(34), e = n(78), i = n(79), NameTable = n(80), HeadTable = n(81), CmapTable = n(82), HmtxTable = n(83), HheaTable = n(84), MaxpTable = n(85), PostTable = n(86), OS2Table = n(87), LocaTable = n(88), GlyfTable = n(90), o = function() {
            function t(t, e) {
                var n, i, o, a, s, h, u, l, c;
                if (this.rawData = t, n = this.contents = new r(this.rawData), "ttcf" === n.readString(4)) {
                    if (!e) throw new Error("Must specify a font name for TTC files.");
                    for (h = n.readInt(), o = n.readInt(), s = [], i = u = 0; o >= 0 ? o > u : u > o; i = o >= 0 ? ++u : --u) s[i] = n.readInt();
                    for (i = l = 0, c = s.length; c > l; i = ++l)
                        if (a = s[i], n.pos = a, this.parse(), this.name.postscriptName === e) return;
                    throw new Error("Font " + e + " not found in TTC file.")
                }
                n.pos = 0, this.parse()
            }
            return t.open = function(e, n) {
                var r;
                return r = a.readFileSync(e), new t(r, n)
            }, t.fromDFont = function(n, r) {
                var i;
                return i = e.open(n), new t(i.getNamedFont(r))
            }, t.fromBuffer = function(n, r) {
                var i, o, a;
                try {
                    if (a = new t(n, r), !(a.head.exists && a.name.exists && a.cmap.exists || (i = new e(n), a = new t(i.getNamedFont(r)), a.head.exists && a.name.exists && a.cmap.exists))) throw new Error("Invalid TTF file in DFont");
                    return a
                } catch (s) {
                    throw o = s, new Error("Unknown font format in buffer: " + o.message)
                }
            }, t.prototype.parse = function() {
                return this.directory = new i(this.contents), this.head = new HeadTable(this), this.name = new NameTable(this), this.cmap = new CmapTable(this), this.hhea = new HheaTable(this), this.maxp = new MaxpTable(this), this.hmtx = new HmtxTable(this), this.post = new PostTable(this), this.os2 = new OS2Table(this), this.loca = new LocaTable(this), this.glyf = new GlyfTable(this), this.ascender = this.os2.exists && this.os2.ascender || this.hhea.ascender, this.decender = this.os2.exists && this.os2.decender || this.hhea.decender, this.lineGap = this.os2.exists && this.os2.lineGap || this.hhea.lineGap, this.bbox = [this.head.xMin, this.head.yMin, this.head.xMax, this.head.yMax]
            }, t.prototype.characterToGlyph = function(t) {
                var e;
                return (null != (e = this.cmap.unicode) ? e.codeMap[t] : void 0) || 0
            }, t.prototype.widthOfGlyph = function(t) {
                var e;
                return e = 1e3 / this.head.unitsPerEm, this.hmtx.forGlyph(t).advance * e
            }, t
        }(), t.exports = o
    }).call(this)
}, function(t, e, n) {
    (function() {
        var CmapTable, e, r, i = [].indexOf || function(t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
        CmapTable = n(82), r = n(89), e = function() {
            function t(t) {
                this.font = t, this.subset = {}, this.unicodes = {}, this.next = 33
            }
            return t.prototype.use = function(t) {
                var e, n, r; {
                    if ("string" != typeof t) return this.unicodes[t] ? void 0 : (this.subset[this.next] = t, this.unicodes[t] = this.next++);
                    for (e = n = 0, r = t.length; r >= 0 ? r > n : n > r; e = r >= 0 ? ++n : --n) this.use(t.charCodeAt(e))
                }
            }, t.prototype.encodeText = function(t) {
                var e, n, r, i, o;
                for (r = "", n = i = 0, o = t.length; o >= 0 ? o > i : i > o; n = o >= 0 ? ++i : --i) e = this.unicodes[t.charCodeAt(n)], r += String.fromCharCode(e);
                return r
            }, t.prototype.generateCmap = function() {
                var t, e, n, r, i;
                r = this.font.cmap.tables[0].codeMap, t = {}, i = this.subset;
                for (e in i) n = i[e], t[e] = r[n];
                return t
            }, t.prototype.glyphIDs = function() {
                var t, e, n, r, o, a;
                r = this.font.cmap.tables[0].codeMap, t = [0], a = this.subset;
                for (e in a) n = a[e], o = r[n], null != o && i.call(t, o) < 0 && t.push(o);
                return t.sort()
            }, t.prototype.glyphsFor = function(t) {
                var e, n, r, i, o, a, s;
                for (r = {}, o = 0, a = t.length; a > o; o++) i = t[o], r[i] = this.font.glyf.glyphFor(i);
                e = [];
                for (i in r) n = r[i], (null != n ? n.compound : void 0) && e.push.apply(e, n.glyphIDs);
                if (e.length > 0) {
                    s = this.glyphsFor(e);
                    for (i in s) n = s[i], r[i] = n
                }
                return r
            }, t.prototype.encode = function() {
                var t, e, n, i, o, a, s, h, u, l, c, f, d, p, g, v, m;
                t = CmapTable.encode(this.generateCmap(), "unicode"), i = this.glyphsFor(this.glyphIDs()), f = {
                    0: 0
                }, v = t.charMap;
                for (e in v) a = v[e], f[a.old] = a["new"];
                c = t.maxGlyphID;
                for (d in i) d in f || (f[d] = c++);
                u = r.invert(f), l = Object.keys(u).sort(function(t, e) {
                    return t - e
                }), p = function() {
                    var t, e, n;
                    for (n = [], t = 0, e = l.length; e > t; t++) o = l[t], n.push(u[o]);
                    return n
                }(), n = this.font.glyf.encode(i, p, f), s = this.font.loca.encode(n.offsets), h = this.font.name.encode(), this.postscriptName = h.postscriptName, this.cmap = {}, m = t.charMap;
                for (e in m) a = m[e], this.cmap[e] = a.old;
                return g = {
                    cmap: t.table,
                    glyf: n.table,
                    loca: s.table,
                    hmtx: this.font.hmtx.encode(p),
                    hhea: this.font.hhea.encode(p),
                    maxp: this.font.maxp.encode(p),
                    post: this.font.post.encode(p),
                    name: h.table,
                    head: this.font.head.encode(s)
                }, this.font.os2.exists && (g["OS/2"] = this.font.os2.raw()), this.font.directory.encode(g)
            }, t
        }(), t.exports = e
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, r, i, o, a, s, h, u, l, c, f, d, p, g, v, m, y, w, _, b, x, S, k, E, C, I, A, L;
        x = n(100), C = new x(n(106)), A = n(92), o = A.BK, l = A.CR, p = A.LF, v = A.NL, a = A.CB, i = A.BA, b = A.SP, S = A.WJ, b = A.SP, o = A.BK, p = A.LF, v = A.NL, e = A.AI, r = A.AL, w = A.SA, _ = A.SG, k = A.XX, h = A.CJ, f = A.ID, m = A.NS, E = A.characterClasses, L = n(91), c = L.DI_BRK, d = L.IN_BRK, s = L.CI_BRK, u = L.CP_BRK, y = L.PR_BRK, I = L.pairTable, g = function() {
            function t(t) {
                this.string = t, this.pos = 0, this.lastPos = 0, this.curClass = null, this.nextClass = null
            }
            var n, f, g;
            return t.prototype.nextCodePoint = function() {
                var t, e;
                return t = this.string.charCodeAt(this.pos++), e = this.string.charCodeAt(this.pos), t >= 55296 && 56319 >= t && e >= 56320 && 57343 >= e ? (this.pos++, 1024 * (t - 55296) + (e - 56320) + 65536) : t
            }, f = function(t) {
                switch (t) {
                    case e:
                        return r;
                    case w:
                    case _:
                    case k:
                        return r;
                    case h:
                        return m;
                    default:
                        return t
                }
            }, g = function(t) {
                switch (t) {
                    case p:
                    case v:
                        return o;
                    case a:
                        return i;
                    case b:
                        return S;
                    default:
                        return t
                }
            }, t.prototype.nextCharClass = function(t) {
                return null == t && (t = !1), f(C.get(this.nextCodePoint()))
            }, n = function() {
                function t(t, e) {
                    this.position = t, this.required = null != e ? e : !1
                }
                return t
            }(), t.prototype.nextBreak = function() {
                var t, e, r;
                for (null == this.curClass && (this.curClass = g(this.nextCharClass())); this.pos < this.string.length;) {
                    if (this.lastPos = this.pos, e = this.nextClass, this.nextClass = this.nextCharClass(), this.curClass === o || this.curClass === l && this.nextClass !== p) return this.curClass = g(f(this.nextClass)), new n(this.lastPos, !0);
                    if (t = function() {
                            switch (this.nextClass) {
                                case b:
                                    return this.curClass;
                                case o:
                                case p:
                                case v:
                                    return o;
                                case l:
                                    return l;
                                case a:
                                    return i
                            }
                        }.call(this), null == t) {
                        switch (r = !1, I[this.curClass][this.nextClass]) {
                            case c:
                                r = !0;
                                break;
                            case d:
                                r = e === b;
                                break;
                            case s:
                                if (r = e === b, !r) continue;
                                break;
                            case u:
                                if (e !== b) continue
                        }
                        if (this.curClass = this.nextClass, r) return new n(this.lastPos)
                    } else if (this.curClass = t, this.nextClass === a) return new n(this.lastPos)
                }
                return this.pos >= this.string.length ? this.lastPos < this.string.length ? (this.lastPos = this.string.length, new n(this.string.length)) : null : void 0
            }, t
        }(), t.exports = g
    }).call(this)
}, function(t, e, n) {
    (function(e) {
        function r(t, e, n) {
            this.chunk = t, this.encoding = e, this.callback = n
        }

        function i(t, e) {
            var r = n(69);
            t = t || {};
            var i = t.highWaterMark,
                o = t.objectMode ? 16 : 16384;
            this.highWaterMark = i || 0 === i ? i : o, this.objectMode = !!t.objectMode, e instanceof r && (this.objectMode = this.objectMode || !!t.writableObjectMode), this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
            var a = t.decodeStrings === !1;
            this.decodeStrings = !a, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(t) {
                d(e, t)
            }, this.writecb = null, this.writelen = 0, this.buffer = [], this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1
        }

        function o(t) {
            var e = n(69);
            return this instanceof o || this instanceof e ? (this._writableState = new i(t, this), this.writable = !0, void S.call(this)) : new o(t)
        }

        function a(t, n, r) {
            var i = new Error("write after end");
            t.emit("error", i), e.nextTick(function() {
                r(i)
            })
        }

        function s(t, n, r, i) {
            var o = !0;
            if (!(x.isBuffer(r) || x.isString(r) || x.isNullOrUndefined(r) || n.objectMode)) {
                var a = new TypeError("Invalid non-string/buffer chunk");
                t.emit("error", a), e.nextTick(function() {
                    i(a)
                }), o = !1
            }
            return o
        }

        function h(t, e, n) {
            return !t.objectMode && t.decodeStrings !== !1 && x.isString(e) && (e = new b(e, n)), e
        }

        function u(t, e, n, i, o) {
            n = h(e, n, i), x.isBuffer(n) && (i = "buffer");
            var a = e.objectMode ? 1 : n.length;
            e.length += a;
            var s = e.length < e.highWaterMark;
            return s || (e.needDrain = !0), e.writing || e.corked ? e.buffer.push(new r(n, i, o)) : l(t, e, !1, a, n, i, o), s
        }

        function l(t, e, n, r, i, o, a) {
            e.writelen = r, e.writecb = a, e.writing = !0, e.sync = !0, n ? t._writev(i, e.onwrite) : t._write(i, o, e.onwrite), e.sync = !1
        }

        function c(t, n, r, i, o) {
            r ? e.nextTick(function() {
                n.pendingcb--, o(i)
            }) : (n.pendingcb--, o(i)), t._writableState.errorEmitted = !0, t.emit("error", i)
        }

        function f(t) {
            t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0
        }

        function d(t, n) {
            var r = t._writableState,
                i = r.sync,
                o = r.writecb;
            if (f(r), n) c(t, r, i, n, o);
            else {
                var a = m(t, r);
                a || r.corked || r.bufferProcessing || !r.buffer.length || v(t, r), i ? e.nextTick(function() {
                    p(t, r, a, o)
                }) : p(t, r, a, o)
            }
        }

        function p(t, e, n, r) {
            n || g(t, e), e.pendingcb--, r(), w(t, e)
        }

        function g(t, e) {
            0 === e.length && e.needDrain && (e.needDrain = !1, t.emit("drain"))
        }

        function v(t, e) {
            if (e.bufferProcessing = !0, t._writev && e.buffer.length > 1) {
                for (var n = [], r = 0; r < e.buffer.length; r++) n.push(e.buffer[r].callback);
                e.pendingcb++, l(t, e, !0, e.length, e.buffer, "", function(t) {
                    for (var r = 0; r < n.length; r++) e.pendingcb--, n[r](t)
                }), e.buffer = []
            } else {
                for (var r = 0; r < e.buffer.length; r++) {
                    var i = e.buffer[r],
                        o = i.chunk,
                        a = i.encoding,
                        s = i.callback,
                        h = e.objectMode ? 1 : o.length;
                    if (l(t, e, !1, h, o, a, s), e.writing) {
                        r++;
                        break
                    }
                }
                r < e.buffer.length ? e.buffer = e.buffer.slice(r) : e.buffer.length = 0
            }
            e.bufferProcessing = !1
        }

        function m(t, e) {
            return e.ending && 0 === e.length && !e.finished && !e.writing
        }

        function y(t, e) {
            e.prefinished || (e.prefinished = !0, t.emit("prefinish"))
        }

        function w(t, e) {
            var n = m(t, e);
            return n && (0 === e.pendingcb ? (y(t, e), e.finished = !0, t.emit("finish")) : y(t, e)), n
        }

        function _(t, n, r) {
            n.ending = !0, w(t, n), r && (n.finished ? e.nextTick(r) : t.once("finish", r)), n.ended = !0
        }
        t.exports = o;
        var b = n(4).Buffer;
        o.WritableState = i;
        var x = n(105);
        x.inherits = n(104);
        var S = n(46);
        x.inherits(o, S), o.prototype.pipe = function() {
            this.emit("error", new Error("Cannot pipe. Not readable."))
        }, o.prototype.write = function(t, e, n) {
            var r = this._writableState,
                i = !1;
            return x.isFunction(e) && (n = e, e = null), x.isBuffer(t) ? e = "buffer" : e || (e = r.defaultEncoding), x.isFunction(n) || (n = function() {}), r.ended ? a(this, r, n) : s(this, r, t, n) && (r.pendingcb++, i = u(this, r, t, e, n)), i
        }, o.prototype.cork = function() {
            var t = this._writableState;
            t.corked++
        }, o.prototype.uncork = function() {
            var t = this._writableState;
            t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.buffer.length || v(this, t))
        }, o.prototype._write = function(t, e, n) {
            n(new Error("not implemented"))
        }, o.prototype._writev = null, o.prototype.end = function(t, e, n) {
            var r = this._writableState;
            x.isFunction(t) ? (n = t, t = null, e = null) : x.isFunction(e) && (n = e, e = null), x.isNullOrUndefined(t) || this.write(t, e), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || _(this, r, n)
        }
    }).call(e, n(61))
}, function(t, e, n) {
    function r(t) {
        return this instanceof r ? void i.call(this, t) : new r(t)
    }
    t.exports = r;
    var i = n(70),
        o = n(105);
    o.inherits = n(104), o.inherits(r, i), r.prototype._transform = function(t, e, n) {
        n(null, t)
    }
}, function(t, e, n) {
    (function(e) {
        function r(t) {
            return this instanceof r ? (h.call(this, t), u.call(this, t), t && t.readable === !1 && (this.readable = !1), t && t.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, t && t.allowHalfOpen === !1 && (this.allowHalfOpen = !1), void this.once("end", i)) : new r(t)
        }

        function i() {
            this.allowHalfOpen || this._writableState.ended || e.nextTick(this.end.bind(this))
        }

        function o(t, e) {
            for (var n = 0, r = t.length; r > n; n++) e(t[n], n)
        }
        t.exports = r;
        var a = Object.keys || function(t) {
                var e = [];
                for (var n in t) e.push(n);
                return e
            },
            s = n(105);
        s.inherits = n(104);
        var h = n(71),
            u = n(67);
        s.inherits(r, h), o(a(u.prototype), function(t) {
            r.prototype[t] || (r.prototype[t] = u.prototype[t])
        })
    }).call(e, n(61))
}, function(t, e, n) {
    function r(t, e) {
        this.afterTransform = function(t, n) {
            return i(e, t, n)
        }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null
    }

    function i(t, e, n) {
        var r = t._transformState;
        r.transforming = !1;
        var i = r.writecb;
        if (!i) return t.emit("error", new Error("no writecb in Transform class"));
        r.writechunk = null, r.writecb = null, h.isNullOrUndefined(n) || t.push(n), i && i(e);
        var o = t._readableState;
        o.reading = !1, (o.needReadable || o.length < o.highWaterMark) && t._read(o.highWaterMark)
    }

    function o(t) {
        if (!(this instanceof o)) return new o(t);
        s.call(this, t), this._transformState = new r(t, this);
        var e = this;
        this._readableState.needReadable = !0, this._readableState.sync = !1, this.once("prefinish", function() {
            h.isFunction(this._flush) ? this._flush(function(t) {
                a(e, t)
            }) : a(e)
        })
    }

    function a(t, e) {
        if (e) return t.emit("error", e);
        var n = t._writableState,
            r = t._transformState;
        if (n.length) throw new Error("calling transform done when ws.length != 0");
        if (r.transforming) throw new Error("calling transform done when still transforming");
        return t.push(null)
    }
    t.exports = o;
    var s = n(69),
        h = n(105);
    h.inherits = n(104), h.inherits(o, s), o.prototype.push = function(t, e) {
        return this._transformState.needTransform = !1, s.prototype.push.call(this, t, e)
    }, o.prototype._transform = function(t, e, n) {
        throw new Error("not implemented")
    }, o.prototype._write = function(t, e, n) {
        var r = this._transformState;
        if (r.writecb = n, r.writechunk = t, r.writeencoding = e, !r.transforming) {
            var i = this._readableState;
            (r.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
        }
    }, o.prototype._read = function(t) {
        var e = this._transformState;
        h.isNull(e.writechunk) || !e.writecb || e.transforming ? e.needTransform = !0 : (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform))
    }
}, function(t, e, n) {
    (function(e) {
        function r(t, e) {
            var r = n(69);
            t = t || {};
            var i = t.highWaterMark,
                o = t.objectMode ? 16 : 16384;
            this.highWaterMark = i || 0 === i ? i : o, this.highWaterMark = ~~this.highWaterMark, this.buffer = [], this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.objectMode = !!t.objectMode, e instanceof r && (this.objectMode = this.objectMode || !!t.readableObjectMode), this.defaultEncoding = t.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (A || (A = n(101).StringDecoder), this.decoder = new A(t.encoding), this.encoding = t.encoding)
        }

        function i(t) {
            n(69);
            return this instanceof i ? (this._readableState = new r(t, this), this.readable = !0, void C.call(this)) : new i(t)
        }

        function o(t, e, n, r, i) {
            var o = u(e, n);
            if (o) t.emit("error", o);
            else if (I.isNullOrUndefined(n)) e.reading = !1, e.ended || l(t, e);
            else if (e.objectMode || n && n.length > 0)
                if (e.ended && !i) {
                    var s = new Error("stream.push() after EOF");
                    t.emit("error", s)
                } else if (e.endEmitted && i) {
                var s = new Error("stream.unshift() after end event");
                t.emit("error", s)
            } else !e.decoder || i || r || (n = e.decoder.write(n)), i || (e.reading = !1), e.flowing && 0 === e.length && !e.sync ? (t.emit("data", n), t.read(0)) : (e.length += e.objectMode ? 1 : n.length, i ? e.buffer.unshift(n) : e.buffer.push(n), e.needReadable && c(t)), d(t, e);
            else i || (e.reading = !1);
            return a(e)
        }

        function a(t) {
            return !t.ended && (t.needReadable || t.length < t.highWaterMark || 0 === t.length)
        }

        function s(t) {
            if (t >= R) t = R;
            else {
                t--;
                for (var e = 1; 32 > e; e <<= 1) t |= t >> e;
                t++
            }
            return t
        }

        function h(t, e) {
            return 0 === e.length && e.ended ? 0 : e.objectMode ? 0 === t ? 0 : 1 : isNaN(t) || I.isNull(t) ? e.flowing && e.buffer.length ? e.buffer[0].length : e.length : 0 >= t ? 0 : (t > e.highWaterMark && (e.highWaterMark = s(t)), t > e.length ? e.ended ? e.length : (e.needReadable = !0, 0) : t)
        }

        function u(t, e) {
            var n = null;
            return I.isBuffer(e) || I.isString(e) || I.isNullOrUndefined(e) || t.objectMode || (n = new TypeError("Invalid non-string/buffer chunk")), n
        }

        function l(t, e) {
            if (e.decoder && !e.ended) {
                var n = e.decoder.end();
                n && n.length && (e.buffer.push(n), e.length += e.objectMode ? 1 : n.length)
            }
            e.ended = !0, c(t)
        }

        function c(t) {
            var n = t._readableState;
            n.needReadable = !1, n.emittedReadable || (L("emitReadable", n.flowing), n.emittedReadable = !0, n.sync ? e.nextTick(function() {
                f(t)
            }) : f(t))
        }

        function f(t) {
            L("emit readable"), t.emit("readable"), y(t)
        }

        function d(t, n) {
            n.readingMore || (n.readingMore = !0, e.nextTick(function() {
                p(t, n)
            }))
        }

        function p(t, e) {
            for (var n = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (L("maybeReadMore read 0"), t.read(0), n !== e.length);) n = e.length;
            e.readingMore = !1
        }

        function g(t) {
            return function() {
                var e = t._readableState;
                L("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && E.listenerCount(t, "data") && (e.flowing = !0, y(t))
            }
        }

        function v(t, n) {
            n.resumeScheduled || (n.resumeScheduled = !0, e.nextTick(function() {
                m(t, n)
            }))
        }

        function m(t, e) {
            e.resumeScheduled = !1, t.emit("resume"), y(t), e.flowing && !e.reading && t.read(0)
        }

        function y(t) {
            var e = t._readableState;
            if (L("flow", e.flowing), e.flowing)
                do var n = t.read(); while (null !== n && e.flowing)
        }

        function w(t, e) {
            var n, r = e.buffer,
                i = e.length,
                o = !!e.decoder,
                a = !!e.objectMode;
            if (0 === r.length) return null;
            if (0 === i) n = null;
            else if (a) n = r.shift();
            else if (!t || t >= i) n = o ? r.join("") : k.concat(r, i), r.length = 0;
            else if (t < r[0].length) {
                var s = r[0];
                n = s.slice(0, t), r[0] = s.slice(t)
            } else if (t === r[0].length) n = r.shift();
            else {
                n = o ? "" : new k(t);
                for (var h = 0, u = 0, l = r.length; l > u && t > h; u++) {
                    var s = r[0],
                        c = Math.min(t - h, s.length);
                    o ? n += s.slice(0, c) : s.copy(n, h, 0, c), c < s.length ? r[0] = s.slice(c) : r.shift(), h += c
                }
            }
            return n
        }

        function _(t) {
            var n = t._readableState;
            if (n.length > 0) throw new Error("endReadable called on non-empty stream");
            n.endEmitted || (n.ended = !0, e.nextTick(function() {
                n.endEmitted || 0 !== n.length || (n.endEmitted = !0, t.readable = !1, t.emit("end"))
            }))
        }

        function b(t, e) {
            for (var n = 0, r = t.length; r > n; n++) e(t[n], n)
        }

        function x(t, e) {
            for (var n = 0, r = t.length; r > n; n++)
                if (t[n] === e) return n;
            return -1
        }
        t.exports = i;
        var S = n(107),
            k = n(4).Buffer;
        i.ReadableState = r;
        var E = n(54).EventEmitter;
        E.listenerCount || (E.listenerCount = function(t, e) {
            return t.listeners(e).length
        });
        var C = n(46),
            I = n(105);
        I.inherits = n(104);
        var A, L = n(93);
        L = L && L.debuglog ? L.debuglog("stream") : function() {}, I.inherits(i, C), i.prototype.push = function(t, e) {
            var n = this._readableState;
            return I.isString(t) && !n.objectMode && (e = e || n.defaultEncoding, e !== n.encoding && (t = new k(t, e), e = "")), o(this, n, t, e, !1)
        }, i.prototype.unshift = function(t) {
            var e = this._readableState;
            return o(this, e, t, "", !0)
        }, i.prototype.setEncoding = function(t) {
            return A || (A = n(101).StringDecoder), this._readableState.decoder = new A(t), this._readableState.encoding = t, this
        };
        var R = 8388608;
        i.prototype.read = function(t) {
            L("read", t);
            var e = this._readableState,
                n = t;
            if ((!I.isNumber(t) || t > 0) && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended)) return L("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? _(this) : c(this), null;
            if (t = h(t, e), 0 === t && e.ended) return 0 === e.length && _(this), null;
            var r = e.needReadable;
            L("need readable", r), (0 === e.length || e.length - t < e.highWaterMark) && (r = !0, L("length less than watermark", r)), (e.ended || e.reading) && (r = !1, L("reading or ended", r)), r && (L("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1), r && !e.reading && (t = h(n, e));
            var i;
            return i = t > 0 ? w(t, e) : null, I.isNull(i) && (e.needReadable = !0, t = 0), e.length -= t, 0 !== e.length || e.ended || (e.needReadable = !0), n !== t && e.ended && 0 === e.length && _(this), I.isNull(i) || this.emit("data", i), i
        }, i.prototype._read = function(t) {
            this.emit("error", new Error("not implemented"))
        }, i.prototype.pipe = function(t, n) {
            function r(t) {
                L("onunpipe"), t === c && o()
            }

            function i() {
                L("onend"), t.end()
            }

            function o() {
                L("cleanup"), t.removeListener("close", h), t.removeListener("finish", u), t.removeListener("drain", v), t.removeListener("error", s), t.removeListener("unpipe", r), c.removeListener("end", i), c.removeListener("end", o), c.removeListener("data", a), !f.awaitDrain || t._writableState && !t._writableState.needDrain || v()
            }

            function a(e) {
                L("ondata");
                var n = t.write(e);
                !1 === n && (L("false write response, pause", c._readableState.awaitDrain), c._readableState.awaitDrain++, c.pause())
            }

            function s(e) {
                L("onerror", e), l(), t.removeListener("error", s), 0 === E.listenerCount(t, "error") && t.emit("error", e)
            }

            function h() {
                t.removeListener("finish", u), l()
            }

            function u() {
                L("onfinish"), t.removeListener("close", h), l()
            }

            function l() {
                L("unpipe"), c.unpipe(t)
            }
            var c = this,
                f = this._readableState;
            switch (f.pipesCount) {
                case 0:
                    f.pipes = t;
                    break;
                case 1:
                    f.pipes = [f.pipes, t];
                    break;
                default:
                    f.pipes.push(t)
            }
            f.pipesCount += 1, L("pipe count=%d opts=%j", f.pipesCount, n);
            var d = (!n || n.end !== !1) && t !== e.stdout && t !== e.stderr,
                p = d ? i : o;
            f.endEmitted ? e.nextTick(p) : c.once("end", p), t.on("unpipe", r);
            var v = g(c);
            return t.on("drain", v), c.on("data", a), t._events && t._events.error ? S(t._events.error) ? t._events.error.unshift(s) : t._events.error = [s, t._events.error] : t.on("error", s), t.once("close", h), t.once("finish", u), t.emit("pipe", c), f.flowing || (L("pipe resume"), c.resume()), t
        }, i.prototype.unpipe = function(t) {
            var e = this._readableState;
            if (0 === e.pipesCount) return this;
            if (1 === e.pipesCount) return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this), this);
            if (!t) {
                var n = e.pipes,
                    r = e.pipesCount;
                e.pipes = null, e.pipesCount = 0, e.flowing = !1;
                for (var i = 0; r > i; i++) n[i].emit("unpipe", this);
                return this
            }
            var i = x(e.pipes, t);
            return -1 === i ? this : (e.pipes.splice(i, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[0]), t.emit("unpipe", this), this)
        }, i.prototype.on = function(t, n) {
            var r = C.prototype.on.call(this, t, n);
            if ("data" === t && !1 !== this._readableState.flowing && this.resume(), "readable" === t && this.readable) {
                var i = this._readableState;
                if (!i.readableListening)
                    if (i.readableListening = !0, i.emittedReadable = !1, i.needReadable = !0, i.reading) i.length && c(this, i);
                    else {
                        var o = this;
                        e.nextTick(function() {
                            L("readable nexttick read 0"), o.read(0)
                        })
                    }
            }
            return r
        }, i.prototype.addListener = i.prototype.on, i.prototype.resume = function() {
            var t = this._readableState;
            return t.flowing || (L("resume"), t.flowing = !0, t.reading || (L("resume read 0"), this.read(0)), v(this, t)), this
        }, i.prototype.pause = function() {
            return L("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (L("pause"), this._readableState.flowing = !1, this.emit("pause")), this
        }, i.prototype.wrap = function(t) {
            var e = this._readableState,
                n = !1,
                r = this;
            t.on("end", function() {
                if (L("wrapped end"), e.decoder && !e.ended) {
                    var t = e.decoder.end();
                    t && t.length && r.push(t)
                }
                r.push(null)
            }), t.on("data", function(i) {
                if (L("wrapped data"), e.decoder && (i = e.decoder.write(i)), i && (e.objectMode || i.length)) {
                    var o = r.push(i);
                    o || (n = !0, t.pause())
                }
            });
            for (var i in t) I.isFunction(t[i]) && I.isUndefined(this[i]) && (this[i] = function(e) {
                return function() {
                    return t[e].apply(t, arguments)
                }
            }(i));
            var o = ["error", "close", "destroy", "pause", "resume"];
            return b(o, function(e) {
                t.on(e, r.emit.bind(r, e))
            }), r._read = function(e) {
                L("wrapped _read", e), n && (n = !1, t.resume())
            }, r
        }, i._fromList = w
    }).call(e, n(61))
}, function(t, e, n) {
    t.exports = function(t) {
        return t && "object" == typeof t && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8
    }
}, function(t, e, n) {
    "use strict";
    t.exports = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }
}, function(t, e, n) {
    "use strict";

    function r(t, e) {
        return t.msg = T[e], e
    }

    function i(t) {
        return (t << 1) - (t > 4 ? 9 : 0)
    }

    function o(t) {
        for (var e = t.length; --e >= 0;) t[e] = 0
    }

    function a(t) {
        var e = t.state,
            n = e.pending;
        n > t.avail_out && (n = t.avail_out), 0 !== n && (A.arraySet(t.output, e.pending_buf, e.pending_out, n, t.next_out), t.next_out += n, e.pending_out += n, t.total_out += n, t.avail_out -= n, e.pending -= n, 0 === e.pending && (e.pending_out = 0))
    }

    function s(t, e) {
        L._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, a(t.strm)
    }

    function h(t, e) {
        t.pending_buf[t.pending++] = e
    }

    function u(t, e) {
        t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e
    }

    function l(t, e, n, r) {
        var i = t.avail_in;
        return i > r && (i = r), 0 === i ? 0 : (t.avail_in -= i, A.arraySet(e, t.input, t.next_in, i, n), 1 === t.state.wrap ? t.adler = R(t.adler, e, i, n) : 2 === t.state.wrap && (t.adler = B(t.adler, e, i, n)), t.next_in += i, t.total_in += i, i)
    }

    function c(t, e) {
        var n, r, i = t.max_chain_length,
            o = t.strstart,
            a = t.prev_length,
            s = t.nice_match,
            h = t.strstart > t.w_size - ut ? t.strstart - (t.w_size - ut) : 0,
            u = t.window,
            l = t.w_mask,
            c = t.prev,
            f = t.strstart + ht,
            d = u[o + a - 1],
            p = u[o + a];
        t.prev_length >= t.good_match && (i >>= 2), s > t.lookahead && (s = t.lookahead);
        do
            if (n = e, u[n + a] === p && u[n + a - 1] === d && u[n] === u[o] && u[++n] === u[o + 1]) {
                o += 2, n++;
                do; while (u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && u[++o] === u[++n] && f > o);
                if (r = ht - (f - o), o = f - ht, r > a) {
                    if (t.match_start = e, a = r, r >= s) break;
                    d = u[o + a - 1], p = u[o + a]
                }
            } while ((e = c[e & l]) > h && 0 !== --i);
        return a <= t.lookahead ? a : t.lookahead
    }

    function f(t) {
        var e, n, r, i, o, a = t.w_size;
        do {
            if (i = t.window_size - t.lookahead - t.strstart, t.strstart >= a + (a - ut)) {
                A.arraySet(t.window, t.window, a, a, 0), t.match_start -= a, t.strstart -= a, t.block_start -= a, n = t.hash_size, e = n;
                do r = t.head[--e], t.head[e] = r >= a ? r - a : 0; while (--n);
                n = a, e = n;
                do r = t.prev[--e], t.prev[e] = r >= a ? r - a : 0; while (--n);
                i += a
            }
            if (0 === t.strm.avail_in) break;
            if (n = l(t.strm, t.window, t.strstart + t.lookahead, i), t.lookahead += n, t.lookahead + t.insert >= st)
                for (o = t.strstart - t.insert, t.ins_h = t.window[o], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[o + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[o + st - 1]) & t.hash_mask, t.prev[o & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = o, o++, t.insert--, !(t.lookahead + t.insert < st)););
        } while (t.lookahead < ut && 0 !== t.strm.avail_in)
    }

    function d(t, e) {
        var n = 65535;
        for (n > t.pending_buf_size - 5 && (n = t.pending_buf_size - 5);;) {
            if (t.lookahead <= 1) {
                if (f(t), 0 === t.lookahead && e === M) return yt;
                if (0 === t.lookahead) break
            }
            t.strstart += t.lookahead, t.lookahead = 0;
            var r = t.block_start + n;
            if ((0 === t.strstart || t.strstart >= r) && (t.lookahead = t.strstart - r,
                    t.strstart = r, s(t, !1), 0 === t.strm.avail_out)) return yt;
            if (t.strstart - t.block_start >= t.w_size - ut && (s(t, !1), 0 === t.strm.avail_out)) return yt
        }
        return t.insert = 0, e === U ? (s(t, !0), 0 === t.strm.avail_out ? _t : bt) : t.strstart > t.block_start && (s(t, !1), 0 === t.strm.avail_out) ? yt : yt
    }

    function p(t, e) {
        for (var n, r;;) {
            if (t.lookahead < ut) {
                if (f(t), t.lookahead < ut && e === M) return yt;
                if (0 === t.lookahead) break
            }
            if (n = 0, t.lookahead >= st && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + st - 1]) & t.hash_mask, n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== n && t.strstart - n <= t.w_size - ut && (t.match_length = c(t, n)), t.match_length >= st)
                if (r = L._tr_tally(t, t.strstart - t.match_start, t.match_length - st), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= st) {
                    t.match_length--;
                    do t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + st - 1]) & t.hash_mask, n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart; while (0 !== --t.match_length);
                    t.strstart++
                } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
            else r = L._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
            if (r && (s(t, !1), 0 === t.strm.avail_out)) return yt
        }
        return t.insert = t.strstart < st - 1 ? t.strstart : st - 1, e === U ? (s(t, !0), 0 === t.strm.avail_out ? _t : bt) : t.last_lit && (s(t, !1), 0 === t.strm.avail_out) ? yt : wt
    }

    function g(t, e) {
        for (var n, r, i;;) {
            if (t.lookahead < ut) {
                if (f(t), t.lookahead < ut && e === M) return yt;
                if (0 === t.lookahead) break
            }
            if (n = 0, t.lookahead >= st && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + st - 1]) & t.hash_mask, n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = st - 1, 0 !== n && t.prev_length < t.max_lazy_match && t.strstart - n <= t.w_size - ut && (t.match_length = c(t, n), t.match_length <= 5 && (t.strategy === Z || t.match_length === st && t.strstart - t.match_start > 4096) && (t.match_length = st - 1)), t.prev_length >= st && t.match_length <= t.prev_length) {
                i = t.strstart + t.lookahead - st, r = L._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - st), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                do ++t.strstart <= i && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + st - 1]) & t.hash_mask, n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart); while (0 !== --t.prev_length);
                if (t.match_available = 0, t.match_length = st - 1, t.strstart++, r && (s(t, !1), 0 === t.strm.avail_out)) return yt
            } else if (t.match_available) {
                if (r = L._tr_tally(t, 0, t.window[t.strstart - 1]), r && s(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return yt
            } else t.match_available = 1, t.strstart++, t.lookahead--
        }
        return t.match_available && (r = L._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < st - 1 ? t.strstart : st - 1, e === U ? (s(t, !0), 0 === t.strm.avail_out ? _t : bt) : t.last_lit && (s(t, !1), 0 === t.strm.avail_out) ? yt : wt
    }

    function v(t, e) {
        for (var n, r, i, o, a = t.window;;) {
            if (t.lookahead <= ht) {
                if (f(t), t.lookahead <= ht && e === M) return yt;
                if (0 === t.lookahead) break
            }
            if (t.match_length = 0, t.lookahead >= st && t.strstart > 0 && (i = t.strstart - 1, r = a[i], r === a[++i] && r === a[++i] && r === a[++i])) {
                o = t.strstart + ht;
                do; while (r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && r === a[++i] && o > i);
                t.match_length = ht - (o - i), t.match_length > t.lookahead && (t.match_length = t.lookahead)
            }
            if (t.match_length >= st ? (n = L._tr_tally(t, 1, t.match_length - st), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (n = L._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), n && (s(t, !1), 0 === t.strm.avail_out)) return yt
        }
        return t.insert = 0, e === U ? (s(t, !0), 0 === t.strm.avail_out ? _t : bt) : t.last_lit && (s(t, !1), 0 === t.strm.avail_out) ? yt : wt
    }

    function m(t, e) {
        for (var n;;) {
            if (0 === t.lookahead && (f(t), 0 === t.lookahead)) {
                if (e === M) return yt;
                break
            }
            if (t.match_length = 0, n = L._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, n && (s(t, !1), 0 === t.strm.avail_out)) return yt
        }
        return t.insert = 0, e === U ? (s(t, !0), 0 === t.strm.avail_out ? _t : bt) : t.last_lit && (s(t, !1), 0 === t.strm.avail_out) ? yt : wt
    }

    function y(t) {
        t.window_size = 2 * t.w_size, o(t.head), t.max_lazy_match = I[t.level].max_lazy, t.good_match = I[t.level].good_length, t.nice_match = I[t.level].nice_length, t.max_chain_length = I[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = st - 1, t.match_available = 0, t.ins_h = 0
    }

    function w() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = V, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new A.Buf16(2 * ot), this.dyn_dtree = new A.Buf16(2 * (2 * rt + 1)), this.bl_tree = new A.Buf16(2 * (2 * it + 1)), o(this.dyn_ltree), o(this.dyn_dtree), o(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new A.Buf16(at + 1), this.heap = new A.Buf16(2 * nt + 1), o(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new A.Buf16(2 * nt + 1), o(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
    }

    function _(t) {
        var e;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = X, e = t.state, e.pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? ct : vt, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = M, L._tr_init(e), F) : r(t, W)
    }

    function b(t) {
        var e = _(t);
        return e === F && y(t.state), e
    }

    function x(t, e) {
        return t && t.state ? 2 !== t.state.wrap ? W : (t.state.gzhead = e, F) : W
    }

    function S(t, e, n, i, o, a) {
        if (!t) return W;
        var s = 1;
        if (e === H && (e = 6), 0 > i ? (s = 0, i = -i) : i > 15 && (s = 2, i -= 16), 1 > o || o > $ || n !== V || 8 > i || i > 15 || 0 > e || e > 9 || 0 > a || a > Y) return r(t, W);
        8 === i && (i = 9);
        var h = new w;
        return t.state = h, h.strm = t, h.wrap = s, h.gzhead = null, h.w_bits = i, h.w_size = 1 << h.w_bits, h.w_mask = h.w_size - 1, h.hash_bits = o + 7, h.hash_size = 1 << h.hash_bits, h.hash_mask = h.hash_size - 1, h.hash_shift = ~~((h.hash_bits + st - 1) / st), h.window = new A.Buf8(2 * h.w_size), h.head = new A.Buf16(h.hash_size), h.prev = new A.Buf16(h.w_size), h.lit_bufsize = 1 << o + 6, h.pending_buf_size = 4 * h.lit_bufsize, h.pending_buf = new A.Buf8(h.pending_buf_size), h.d_buf = h.lit_bufsize >> 1, h.l_buf = 3 * h.lit_bufsize, h.level = e, h.strategy = a, h.method = n, b(t)
    }

    function k(t, e) {
        return S(t, e, V, J, Q, K)
    }

    function E(t, e) {
        var n, s, l, c;
        if (!t || !t.state || e > P || 0 > e) return t ? r(t, W) : W;
        if (s = t.state, !t.output || !t.input && 0 !== t.avail_in || s.status === mt && e !== U) return r(t, 0 === t.avail_out ? j : W);
        if (s.strm = t, n = s.last_flush, s.last_flush = e, s.status === ct)
            if (2 === s.wrap) t.adler = 0, h(s, 31), h(s, 139), h(s, 8), s.gzhead ? (h(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (s.gzhead.extra ? 4 : 0) + (s.gzhead.name ? 8 : 0) + (s.gzhead.comment ? 16 : 0)), h(s, 255 & s.gzhead.time), h(s, s.gzhead.time >> 8 & 255), h(s, s.gzhead.time >> 16 & 255), h(s, s.gzhead.time >> 24 & 255), h(s, 9 === s.level ? 2 : s.strategy >= G || s.level < 2 ? 4 : 0), h(s, 255 & s.gzhead.os), s.gzhead.extra && s.gzhead.extra.length && (h(s, 255 & s.gzhead.extra.length), h(s, s.gzhead.extra.length >> 8 & 255)), s.gzhead.hcrc && (t.adler = B(t.adler, s.pending_buf, s.pending, 0)), s.gzindex = 0, s.status = ft) : (h(s, 0), h(s, 0), h(s, 0), h(s, 0), h(s, 0), h(s, 9 === s.level ? 2 : s.strategy >= G || s.level < 2 ? 4 : 0), h(s, xt), s.status = vt);
            else {
                var f = V + (s.w_bits - 8 << 4) << 8,
                    d = -1;
                d = s.strategy >= G || s.level < 2 ? 0 : s.level < 6 ? 1 : 6 === s.level ? 2 : 3, f |= d << 6, 0 !== s.strstart && (f |= lt), f += 31 - f % 31, s.status = vt, u(s, f), 0 !== s.strstart && (u(s, t.adler >>> 16), u(s, 65535 & t.adler)), t.adler = 1
            } if (s.status === ft)
            if (s.gzhead.extra) {
                for (l = s.pending; s.gzindex < (65535 & s.gzhead.extra.length) && (s.pending !== s.pending_buf_size || (s.gzhead.hcrc && s.pending > l && (t.adler = B(t.adler, s.pending_buf, s.pending - l, l)), a(t), l = s.pending, s.pending !== s.pending_buf_size));) h(s, 255 & s.gzhead.extra[s.gzindex]), s.gzindex++;
                s.gzhead.hcrc && s.pending > l && (t.adler = B(t.adler, s.pending_buf, s.pending - l, l)), s.gzindex === s.gzhead.extra.length && (s.gzindex = 0, s.status = dt)
            } else s.status = dt;
        if (s.status === dt)
            if (s.gzhead.name) {
                l = s.pending;
                do {
                    if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > l && (t.adler = B(t.adler, s.pending_buf, s.pending - l, l)), a(t), l = s.pending, s.pending === s.pending_buf_size)) {
                        c = 1;
                        break
                    }
                    c = s.gzindex < s.gzhead.name.length ? 255 & s.gzhead.name.charCodeAt(s.gzindex++) : 0, h(s, c)
                } while (0 !== c);
                s.gzhead.hcrc && s.pending > l && (t.adler = B(t.adler, s.pending_buf, s.pending - l, l)), 0 === c && (s.gzindex = 0, s.status = pt)
            } else s.status = pt;
        if (s.status === pt)
            if (s.gzhead.comment) {
                l = s.pending;
                do {
                    if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > l && (t.adler = B(t.adler, s.pending_buf, s.pending - l, l)), a(t), l = s.pending, s.pending === s.pending_buf_size)) {
                        c = 1;
                        break
                    }
                    c = s.gzindex < s.gzhead.comment.length ? 255 & s.gzhead.comment.charCodeAt(s.gzindex++) : 0, h(s, c)
                } while (0 !== c);
                s.gzhead.hcrc && s.pending > l && (t.adler = B(t.adler, s.pending_buf, s.pending - l, l)), 0 === c && (s.status = gt)
            } else s.status = gt;
        if (s.status === gt && (s.gzhead.hcrc ? (s.pending + 2 > s.pending_buf_size && a(t), s.pending + 2 <= s.pending_buf_size && (h(s, 255 & t.adler), h(s, t.adler >> 8 & 255), t.adler = 0, s.status = vt)) : s.status = vt), 0 !== s.pending) {
            if (a(t), 0 === t.avail_out) return s.last_flush = -1, F
        } else if (0 === t.avail_in && i(e) <= i(n) && e !== U) return r(t, j);
        if (s.status === mt && 0 !== t.avail_in) return r(t, j);
        if (0 !== t.avail_in || 0 !== s.lookahead || e !== M && s.status !== mt) {
            var p = s.strategy === G ? m(s, e) : s.strategy === q ? v(s, e) : I[s.level].func(s, e);
            if ((p === _t || p === bt) && (s.status = mt), p === yt || p === _t) return 0 === t.avail_out && (s.last_flush = -1), F;
            if (p === wt && (e === O ? L._tr_align(s) : e !== P && (L._tr_stored_block(s, 0, 0, !1), e === D && (o(s.head), 0 === s.lookahead && (s.strstart = 0, s.block_start = 0, s.insert = 0))), a(t), 0 === t.avail_out)) return s.last_flush = -1, F
        }
        return e !== U ? F : s.wrap <= 0 ? z : (2 === s.wrap ? (h(s, 255 & t.adler), h(s, t.adler >> 8 & 255), h(s, t.adler >> 16 & 255), h(s, t.adler >> 24 & 255), h(s, 255 & t.total_in), h(s, t.total_in >> 8 & 255), h(s, t.total_in >> 16 & 255), h(s, t.total_in >> 24 & 255)) : (u(s, t.adler >>> 16), u(s, 65535 & t.adler)), a(t), s.wrap > 0 && (s.wrap = -s.wrap), 0 !== s.pending ? F : z)
    }

    function C(t) {
        var e;
        return t && t.state ? (e = t.state.status, e !== ct && e !== ft && e !== dt && e !== pt && e !== gt && e !== vt && e !== mt ? r(t, W) : (t.state = null, e === vt ? r(t, N) : F)) : W
    }
    var I, A = n(98),
        L = n(95),
        R = n(96),
        B = n(97),
        T = n(73),
        M = 0,
        O = 1,
        D = 3,
        U = 4,
        P = 5,
        F = 0,
        z = 1,
        W = -2,
        N = -3,
        j = -5,
        H = -1,
        Z = 1,
        G = 2,
        q = 3,
        Y = 4,
        K = 0,
        X = 2,
        V = 8,
        $ = 9,
        J = 15,
        Q = 8,
        tt = 29,
        et = 256,
        nt = et + 1 + tt,
        rt = 30,
        it = 19,
        ot = 2 * nt + 1,
        at = 15,
        st = 3,
        ht = 258,
        ut = ht + st + 1,
        lt = 32,
        ct = 42,
        ft = 69,
        dt = 73,
        pt = 91,
        gt = 103,
        vt = 113,
        mt = 666,
        yt = 1,
        wt = 2,
        _t = 3,
        bt = 4,
        xt = 3,
        St = function(t, e, n, r, i) {
            this.good_length = t, this.max_lazy = e, this.nice_length = n, this.max_chain = r, this.func = i
        };
    I = [new St(0, 0, 0, 0, d), new St(4, 4, 8, 4, p), new St(4, 5, 16, 8, p), new St(4, 6, 32, 32, p), new St(4, 4, 16, 16, g), new St(8, 16, 32, 32, g), new St(8, 16, 128, 128, g), new St(8, 32, 128, 256, g), new St(32, 128, 258, 1024, g), new St(32, 258, 258, 4096, g)], e.deflateInit = k, e.deflateInit2 = S, e.deflateReset = b, e.deflateResetKeep = _, e.deflateSetHeader = x, e.deflate = E, e.deflateEnd = C, e.deflateInfo = "pako deflate (from Nodeca project)"
}, function(t, e, n) {
    "use strict";

    function r(t) {
        return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24)
    }

    function i() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new m.Buf16(320), this.work = new m.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
    }

    function o(t) {
        var e;
        return t && t.state ? (e = t.state, t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = U, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new m.Buf32(pt), e.distcode = e.distdyn = new m.Buf32(gt), e.sane = 1, e.back = -1, A) : B
    }

    function a(t) {
        var e;
        return t && t.state ? (e = t.state, e.wsize = 0, e.whave = 0, e.wnext = 0, o(t)) : B
    }

    function s(t, e) {
        var n, r;
        return t && t.state ? (r = t.state, 0 > e ? (n = 0, e = -e) : (n = (e >> 4) + 1, 48 > e && (e &= 15)), e && (8 > e || e > 15) ? B : (null !== r.window && r.wbits !== e && (r.window = null), r.wrap = n, r.wbits = e, a(t))) : B
    }

    function h(t, e) {
        var n, r;
        return t ? (r = new i, t.state = r, r.window = null, n = s(t, e), n !== A && (t.state = null), n) : B
    }

    function u(t) {
        return h(t, mt)
    }

    function l(t) {
        if (yt) {
            var e;
            for (g = new m.Buf32(512), v = new m.Buf32(32), e = 0; 144 > e;) t.lens[e++] = 8;
            for (; 256 > e;) t.lens[e++] = 9;
            for (; 280 > e;) t.lens[e++] = 7;
            for (; 288 > e;) t.lens[e++] = 8;
            for (b(S, t.lens, 0, 288, g, 0, t.work, {
                    bits: 9
                }), e = 0; 32 > e;) t.lens[e++] = 5;
            b(k, t.lens, 0, 32, v, 0, t.work, {
                bits: 5
            }), yt = !1
        }
        t.lencode = g, t.lenbits = 9, t.distcode = v, t.distbits = 5
    }

    function c(t, e, n, r) {
        var i, o = t.state;
        return null === o.window && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new m.Buf8(o.wsize)), r >= o.wsize ? (m.arraySet(o.window, e, n - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : (i = o.wsize - o.wnext, i > r && (i = r), m.arraySet(o.window, e, n - r, i, o.wnext), r -= i, r ? (m.arraySet(o.window, e, n - r, r, 0), o.wnext = r, o.whave = o.wsize) : (o.wnext += i, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += i))), 0
    }

    function f(t, e) {
        var n, i, o, a, s, h, u, f, d, p, g, v, pt, gt, vt, mt, yt, wt, _t, bt, xt, St, kt, Et, Ct = 0,
            It = new m.Buf8(4),
            At = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return B;
        n = t.state, n.mode === Y && (n.mode = K), s = t.next_out, o = t.output, u = t.avail_out, a = t.next_in, i = t.input, h = t.avail_in, f = n.hold, d = n.bits, p = h, g = u, St = A;
        t: for (;;) switch (n.mode) {
            case U:
                if (0 === n.wrap) {
                    n.mode = K;
                    break
                }
                for (; 16 > d;) {
                    if (0 === h) break t;
                    h--, f += i[a++] << d, d += 8
                }
                if (2 & n.wrap && 35615 === f) {
                    n.check = 0, It[0] = 255 & f, It[1] = f >>> 8 & 255, n.check = w(n.check, It, 2, 0), f = 0, d = 0, n.mode = P;
                    break
                }
                if (n.flags = 0, n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & f) << 8) + (f >> 8)) % 31) {
                    t.msg = "incorrect header check", n.mode = ct;
                    break
                }
                if ((15 & f) !== D) {
                    t.msg = "unknown compression method", n.mode = ct;
                    break
                }
                if (f >>>= 4, d -= 4, xt = (15 & f) + 8, 0 === n.wbits) n.wbits = xt;
                else if (xt > n.wbits) {
                    t.msg = "invalid window size", n.mode = ct;
                    break
                }
                n.dmax = 1 << xt, t.adler = n.check = 1, n.mode = 512 & f ? G : Y, f = 0, d = 0;
                break;
            case P:
                for (; 16 > d;) {
                    if (0 === h) break t;
                    h--, f += i[a++] << d, d += 8
                }
                if (n.flags = f, (255 & n.flags) !== D) {
                    t.msg = "unknown compression method", n.mode = ct;
                    break
                }
                if (57344 & n.flags) {
                    t.msg = "unknown header flags set", n.mode = ct;
                    break
                }
                n.head && (n.head.text = f >> 8 & 1), 512 & n.flags && (It[0] = 255 & f, It[1] = f >>> 8 & 255, n.check = w(n.check, It, 2, 0)), f = 0, d = 0, n.mode = F;
            case F:
                for (; 32 > d;) {
                    if (0 === h) break t;
                    h--, f += i[a++] << d, d += 8
                }
                n.head && (n.head.time = f), 512 & n.flags && (It[0] = 255 & f, It[1] = f >>> 8 & 255, It[2] = f >>> 16 & 255, It[3] = f >>> 24 & 255, n.check = w(n.check, It, 4, 0)), f = 0, d = 0, n.mode = z;
            case z:
                for (; 16 > d;) {
                    if (0 === h) break t;
                    h--, f += i[a++] << d, d += 8
                }
                n.head && (n.head.xflags = 255 & f, n.head.os = f >> 8), 512 & n.flags && (It[0] = 255 & f, It[1] = f >>> 8 & 255, n.check = w(n.check, It, 2, 0)), f = 0, d = 0, n.mode = W;
            case W:
                if (1024 & n.flags) {
                    for (; 16 > d;) {
                        if (0 === h) break t;
                        h--, f += i[a++] << d, d += 8
                    }
                    n.length = f, n.head && (n.head.extra_len = f), 512 & n.flags && (It[0] = 255 & f, It[1] = f >>> 8 & 255, n.check = w(n.check, It, 2, 0)), f = 0, d = 0
                } else n.head && (n.head.extra = null);
                n.mode = N;
            case N:
                if (1024 & n.flags && (v = n.length, v > h && (v = h), v && (n.head && (xt = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), m.arraySet(n.head.extra, i, a, v, xt)), 512 & n.flags && (n.check = w(n.check, i, v, a)), h -= v, a += v, n.length -= v), n.length)) break t;
                n.length = 0, n.mode = j;
            case j:
                if (2048 & n.flags) {
                    if (0 === h) break t;
                    v = 0;
                    do xt = i[a + v++], n.head && xt && n.length < 65536 && (n.head.name += String.fromCharCode(xt)); while (xt && h > v);
                    if (512 & n.flags && (n.check = w(n.check, i, v, a)), h -= v, a += v, xt) break t
                } else n.head && (n.head.name = null);
                n.length = 0, n.mode = H;
            case H:
                if (4096 & n.flags) {
                    if (0 === h) break t;
                    v = 0;
                    do xt = i[a + v++], n.head && xt && n.length < 65536 && (n.head.comment += String.fromCharCode(xt)); while (xt && h > v);
                    if (512 & n.flags && (n.check = w(n.check, i, v, a)), h -= v, a += v, xt) break t
                } else n.head && (n.head.comment = null);
                n.mode = Z;
            case Z:
                if (512 & n.flags) {
                    for (; 16 > d;) {
                        if (0 === h) break t;
                        h--, f += i[a++] << d, d += 8
                    }
                    if (f !== (65535 & n.check)) {
                        t.msg = "header crc mismatch", n.mode = ct;
                        break
                    }
                    f = 0, d = 0
                }
                n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = Y;
                break;
            case G:
                for (; 32 > d;) {
                    if (0 === h) break t;
                    h--, f += i[a++] << d, d += 8
                }
                t.adler = n.check = r(f), f = 0, d = 0, n.mode = q;
            case q:
                if (0 === n.havedict) return t.next_out = s, t.avail_out = u, t.next_in = a, t.avail_in = h, n.hold = f, n.bits = d, R;
                t.adler = n.check = 1, n.mode = Y;
            case Y:
                if (e === C || e === I) break t;
            case K:
                if (n.last) {
                    f >>>= 7 & d, d -= 7 & d, n.mode = ht;
                    break
                }
                for (; 3 > d;) {
                    if (0 === h) break t;
                    h--, f += i[a++] << d, d += 8
                }
                switch (n.last = 1 & f, f >>>= 1, d -= 1, 3 & f) {
                    case 0:
                        n.mode = X;
                        break;
                    case 1:
                        if (l(n), n.mode = et, e === I) {
                            f >>>= 2, d -= 2;
                            break t
                        }
                        break;
                    case 2:
                        n.mode = J;
                        break;
                    case 3:
                        t.msg = "invalid block type", n.mode = ct
                }
                f >>>= 2, d -= 2;
                break;
            case X:
                for (f >>>= 7 & d, d -= 7 & d; 32 > d;) {
                    if (0 === h) break t;
                    h--, f += i[a++] << d, d += 8
                }
                if ((65535 & f) !== (f >>> 16 ^ 65535)) {
                    t.msg = "invalid stored block lengths", n.mode = ct;
                    break
                }
                if (n.length = 65535 & f, f = 0, d = 0, n.mode = V, e === I) break t;
            case V:
                n.mode = $;
            case $:
                if (v = n.length) {
                    if (v > h && (v = h), v > u && (v = u), 0 === v) break t;
                    m.arraySet(o, i, a, v, s), h -= v, a += v, u -= v, s += v, n.length -= v;
                    break
                }
                n.mode = Y;
                break;
            case J:
                for (; 14 > d;) {
                    if (0 === h) break t;
                    h--, f += i[a++] << d, d += 8
                }
                if (n.nlen = (31 & f) + 257, f >>>= 5, d -= 5, n.ndist = (31 & f) + 1, f >>>= 5, d -= 5, n.ncode = (15 & f) + 4, f >>>= 4, d -= 4, n.nlen > 286 || n.ndist > 30) {
                    t.msg = "too many length or distance symbols", n.mode = ct;
                    break
                }
                n.have = 0, n.mode = Q;
            case Q:
                for (; n.have < n.ncode;) {
                    for (; 3 > d;) {
                        if (0 === h) break t;
                        h--, f += i[a++] << d, d += 8
                    }
                    n.lens[At[n.have++]] = 7 & f, f >>>= 3, d -= 3
                }
                for (; n.have < 19;) n.lens[At[n.have++]] = 0;
                if (n.lencode = n.lendyn, n.lenbits = 7, kt = {
                        bits: n.lenbits
                    }, St = b(x, n.lens, 0, 19, n.lencode, 0, n.work, kt), n.lenbits = kt.bits, St) {
                    t.msg = "invalid code lengths set", n.mode = ct;
                    break
                }
                n.have = 0, n.mode = tt;
            case tt:
                for (; n.have < n.nlen + n.ndist;) {
                    for (; Ct = n.lencode[f & (1 << n.lenbits) - 1], vt = Ct >>> 24, mt = Ct >>> 16 & 255, yt = 65535 & Ct, !(d >= vt);) {
                        if (0 === h) break t;
                        h--, f += i[a++] << d, d += 8
                    }
                    if (16 > yt) f >>>= vt, d -= vt, n.lens[n.have++] = yt;
                    else {
                        if (16 === yt) {
                            for (Et = vt + 2; Et > d;) {
                                if (0 === h) break t;
                                h--, f += i[a++] << d, d += 8
                            }
                            if (f >>>= vt, d -= vt, 0 === n.have) {
                                t.msg = "invalid bit length repeat", n.mode = ct;
                                break
                            }
                            xt = n.lens[n.have - 1], v = 3 + (3 & f), f >>>= 2, d -= 2
                        } else if (17 === yt) {
                            for (Et = vt + 3; Et > d;) {
                                if (0 === h) break t;
                                h--, f += i[a++] << d, d += 8
                            }
                            f >>>= vt, d -= vt, xt = 0, v = 3 + (7 & f), f >>>= 3, d -= 3
                        } else {
                            for (Et = vt + 7; Et > d;) {
                                if (0 === h) break t;
                                h--, f += i[a++] << d, d += 8
                            }
                            f >>>= vt, d -= vt, xt = 0, v = 11 + (127 & f), f >>>= 7, d -= 7
                        }
                        if (n.have + v > n.nlen + n.ndist) {
                            t.msg = "invalid bit length repeat", n.mode = ct;
                            break
                        }
                        for (; v--;) n.lens[n.have++] = xt
                    }
                }
                if (n.mode === ct) break;
                if (0 === n.lens[256]) {
                    t.msg = "invalid code -- missing end-of-block", n.mode = ct;
                    break
                }
                if (n.lenbits = 9, kt = {
                        bits: n.lenbits
                    }, St = b(S, n.lens, 0, n.nlen, n.lencode, 0, n.work, kt), n.lenbits = kt.bits, St) {
                    t.msg = "invalid literal/lengths set", n.mode = ct;
                    break
                }
                if (n.distbits = 6, n.distcode = n.distdyn, kt = {
                        bits: n.distbits
                    }, St = b(k, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, kt), n.distbits = kt.bits, St) {
                    t.msg = "invalid distances set", n.mode = ct;
                    break
                }
                if (n.mode = et, e === I) break t;
            case et:
                n.mode = nt;
            case nt:
                if (h >= 6 && u >= 258) {
                    t.next_out = s, t.avail_out = u, t.next_in = a, t.avail_in = h, n.hold = f, n.bits = d, _(t, g), s = t.next_out, o = t.output, u = t.avail_out, a = t.next_in, i = t.input, h = t.avail_in, f = n.hold, d = n.bits, n.mode === Y && (n.back = -1);
                    break
                }
                for (n.back = 0; Ct = n.lencode[f & (1 << n.lenbits) - 1], vt = Ct >>> 24, mt = Ct >>> 16 & 255, yt = 65535 & Ct, !(d >= vt);) {
                    if (0 === h) break t;
                    h--, f += i[a++] << d, d += 8
                }
                if (mt && 0 === (240 & mt)) {
                    for (wt = vt, _t = mt, bt = yt; Ct = n.lencode[bt + ((f & (1 << wt + _t) - 1) >> wt)], vt = Ct >>> 24, mt = Ct >>> 16 & 255, yt = 65535 & Ct, !(d >= wt + vt);) {
                        if (0 === h) break t;
                        h--, f += i[a++] << d, d += 8
                    }
                    f >>>= wt, d -= wt, n.back += wt
                }
                if (f >>>= vt, d -= vt, n.back += vt, n.length = yt, 0 === mt) {
                    n.mode = st;
                    break
                }
                if (32 & mt) {
                    n.back = -1, n.mode = Y;
                    break
                }
                if (64 & mt) {
                    t.msg = "invalid literal/length code", n.mode = ct;
                    break
                }
                n.extra = 15 & mt, n.mode = rt;
            case rt:
                if (n.extra) {
                    for (Et = n.extra; Et > d;) {
                        if (0 === h) break t;
                        h--, f += i[a++] << d, d += 8
                    }
                    n.length += f & (1 << n.extra) - 1, f >>>= n.extra, d -= n.extra, n.back += n.extra
                }
                n.was = n.length, n.mode = it;
            case it:
                for (; Ct = n.distcode[f & (1 << n.distbits) - 1], vt = Ct >>> 24, mt = Ct >>> 16 & 255, yt = 65535 & Ct, !(d >= vt);) {
                    if (0 === h) break t;
                    h--, f += i[a++] << d, d += 8
                }
                if (0 === (240 & mt)) {
                    for (wt = vt, _t = mt, bt = yt; Ct = n.distcode[bt + ((f & (1 << wt + _t) - 1) >> wt)], vt = Ct >>> 24, mt = Ct >>> 16 & 255, yt = 65535 & Ct, !(d >= wt + vt);) {
                        if (0 === h) break t;
                        h--, f += i[a++] << d, d += 8
                    }
                    f >>>= wt, d -= wt, n.back += wt
                }
                if (f >>>= vt, d -= vt, n.back += vt, 64 & mt) {
                    t.msg = "invalid distance code", n.mode = ct;
                    break
                }
                n.offset = yt, n.extra = 15 & mt, n.mode = ot;
            case ot:
                if (n.extra) {
                    for (Et = n.extra; Et > d;) {
                        if (0 === h) break t;
                        h--, f += i[a++] << d, d += 8
                    }
                    n.offset += f & (1 << n.extra) - 1, f >>>= n.extra, d -= n.extra, n.back += n.extra
                }
                if (n.offset > n.dmax) {
                    t.msg = "invalid distance too far back", n.mode = ct;
                    break
                }
                n.mode = at;
            case at:
                if (0 === u) break t;
                if (v = g - u, n.offset > v) {
                    if (v = n.offset - v, v > n.whave && n.sane) {
                        t.msg = "invalid distance too far back", n.mode = ct;
                        break
                    }
                    v > n.wnext ? (v -= n.wnext, pt = n.wsize - v) : pt = n.wnext - v, v > n.length && (v = n.length), gt = n.window
                } else gt = o, pt = s - n.offset, v = n.length;
                v > u && (v = u), u -= v, n.length -= v;
                do o[s++] = gt[pt++]; while (--v);
                0 === n.length && (n.mode = nt);
                break;
            case st:
                if (0 === u) break t;
                o[s++] = n.length, u--, n.mode = nt;
                break;
            case ht:
                if (n.wrap) {
                    for (; 32 > d;) {
                        if (0 === h) break t;
                        h--, f |= i[a++] << d, d += 8
                    }
                    if (g -= u, t.total_out += g, n.total += g, g && (t.adler = n.check = n.flags ? w(n.check, o, g, s - g) : y(n.check, o, g, s - g)), g = u, (n.flags ? f : r(f)) !== n.check) {
                        t.msg = "incorrect data check", n.mode = ct;
                        break
                    }
                    f = 0, d = 0
                }
                n.mode = ut;
            case ut:
                if (n.wrap && n.flags) {
                    for (; 32 > d;) {
                        if (0 === h) break t;
                        h--, f += i[a++] << d, d += 8
                    }
                    if (f !== (4294967295 & n.total)) {
                        t.msg = "incorrect length check", n.mode = ct;
                        break
                    }
                    f = 0, d = 0
                }
                n.mode = lt;
            case lt:
                St = L;
                break t;
            case ct:
                St = T;
                break t;
            case ft:
                return M;
            case dt:
            default:
                return B
        }
        return t.next_out = s, t.avail_out = u, t.next_in = a, t.avail_in = h, n.hold = f, n.bits = d, (n.wsize || g !== t.avail_out && n.mode < ct && (n.mode < ht || e !== E)) && c(t, t.output, t.next_out, g - t.avail_out) ? (n.mode = ft, M) : (p -= t.avail_in, g -= t.avail_out, t.total_in += p, t.total_out += g, n.total += g, n.wrap && g && (t.adler = n.check = n.flags ? w(n.check, o, g, t.next_out - g) : y(n.check, o, g, t.next_out - g)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === Y ? 128 : 0) + (n.mode === et || n.mode === V ? 256 : 0), (0 === p && 0 === g || e === E) && St === A && (St = O), St)
    }

    function d(t) {
        if (!t || !t.state) return B;
        var e = t.state;
        return e.window && (e.window = null), t.state = null, A
    }

    function p(t, e) {
        var n;
        return t && t.state ? (n = t.state, 0 === (2 & n.wrap) ? B : (n.head = e, e.done = !1, A)) : B
    }
    var g, v, m = n(98),
        y = n(96),
        w = n(97),
        _ = n(102),
        b = n(103),
        x = 0,
        S = 1,
        k = 2,
        E = 4,
        C = 5,
        I = 6,
        A = 0,
        L = 1,
        R = 2,
        B = -2,
        T = -3,
        M = -4,
        O = -5,
        D = 8,
        U = 1,
        P = 2,
        F = 3,
        z = 4,
        W = 5,
        N = 6,
        j = 7,
        H = 8,
        Z = 9,
        G = 10,
        q = 11,
        Y = 12,
        K = 13,
        X = 14,
        V = 15,
        $ = 16,
        J = 17,
        Q = 18,
        tt = 19,
        et = 20,
        nt = 21,
        rt = 22,
        it = 23,
        ot = 24,
        at = 25,
        st = 26,
        ht = 27,
        ut = 28,
        lt = 29,
        ct = 30,
        ft = 31,
        dt = 32,
        pt = 852,
        gt = 592,
        vt = 15,
        mt = vt,
        yt = !0;
    e.inflateReset = a, e.inflateReset2 = s, e.inflateResetKeep = o, e.inflateInit = u, e.inflateInit2 = h, e.inflate = f, e.inflateEnd = d, e.inflateGetHeader = p, e.inflateInfo = "pako inflate (from Nodeca project)"
}, function(t, e, n) {
    t.exports = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8
    }
}, function(t, e, n) {
    "use strict";

    function r() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
    }
    t.exports = r
}, function(t, e, n) {
    (function() {
        var e, r, i, NameTable, o;
        o = n(10), r = n(34), i = n(79), NameTable = n(80), e = function() {
            function t(t) {
                this.contents = new r(t), this.parse(this.contents)
            }
            return t.open = function(e) {
                var n;
                return n = o.readFileSync(e), new t(n)
            }, t.prototype.parse = function(t) {
                var e, n, o, a, s, h, u, l, c, f, d, p, g, v, m, y, w, _, b, x, S, k, E, C, I, A, L, R, B;
                for (h = t.readInt(), w = t.readInt(), s = t.readInt(), y = t.readInt(), this.map = {}, t.pos = w + 24, L = t.readShort() + w, S = t.readShort() + w, t.pos = L, _ = t.readShort(), d = R = 0; _ >= R; d = R += 1) {
                    for (A = t.readString(4), b = t.readShort(), I = t.readShort(), this.map[A] = {
                            list: [],
                            named: {}
                        }, C = t.pos, t.pos = L + I, g = B = 0; b >= B; g = B += 1) p = t.readShort(), k = t.readShort(), e = t.readByte(), n = t.readByte() << 16, o = t.readByte() << 8, a = t.readByte(), u = h + (0 | n | o | a), f = t.readUInt32(), l = {
                        id: p,
                        attributes: e,
                        offset: u,
                        handle: f
                    }, E = t.pos, -1 !== k && w + y > S + k ? (t.pos = S + k, v = t.readByte(), l.name = t.readString(v)) : "sfnt" === A && (t.pos = l.offset, m = t.readUInt32(), c = {}, c.contents = new r(t.slice(t.pos, t.pos + m)), c.directory = new i(c.contents), x = new NameTable(c), l.name = x.fontName[0].raw), t.pos = E, this.map[A].list.push(l), l.name && (this.map[A].named[l.name] = l);
                    t.pos = C
                }
            }, t.prototype.getNamedFont = function(t) {
                var e, n, r, i, o, a;
                if (e = this.contents, i = e.pos, n = null != (a = this.map.sfnt) ? a.named[t] : void 0, !n) throw new Error("Font " + t + " not found in DFont file.");
                return e.pos = n.offset, r = e.readUInt32(), o = e.slice(e.pos, e.pos + r), e.pos = i, o
            }, t
        }(), t.exports = e
    }).call(this)
}, function(t, e, n) {
    (function(e) {
        (function() {
            var r, i, o = [].slice;
            r = n(34), i = function() {
                function t(t) {
                    var e, n, r, i;
                    for (this.scalarType = t.readInt(), this.tableCount = t.readShort(), this.searchRange = t.readShort(), this.entrySelector = t.readShort(), this.rangeShift = t.readShort(), this.tables = {}, n = r = 0, i = this.tableCount; i >= 0 ? i > r : r > i; n = i >= 0 ? ++r : --r) e = {
                        tag: t.readString(4),
                        checksum: t.readInt(),
                        offset: t.readInt(),
                        length: t.readInt()
                    }, this.tables[e.tag] = e
                }
                var n;
                return t.prototype.encode = function(t) {
                    var i, o, a, s, h, u, l, c, f, d, p, g, v, m;
                    g = Object.keys(t).length, u = Math.log(2), f = 16 * Math.floor(Math.log(g) / u), s = Math.floor(f / u), c = 16 * g - f, o = new r, o.writeInt(this.scalarType), o.writeShort(g), o.writeShort(f), o.writeShort(s), o.writeShort(c), a = 16 * g, l = o.pos + a, h = null, v = [];
                    for (m in t)
                        for (p = t[m], o.writeString(m), o.writeInt(n(p)), o.writeInt(l), o.writeInt(p.length), v = v.concat(p), "head" === m && (h = l), l += p.length; l % 4;) v.push(0), l++;
                    return o.write(v), d = n(o.data), i = 2981146554 - d, o.pos = h + 8, o.writeUInt32(i), new e(o.data)
                }, n = function(t) {
                    var e, n, i, a, s;
                    for (t = o.call(t); t.length % 4;) t.push(0);
                    for (i = new r(t), n = 0, e = a = 0, s = t.length; s > a; e = a += 4) n += i.readUInt32();
                    return 4294967295 & n
                }, t
            }(), t.exports = i
        }).call(this)
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    (function() {
        var e, r, NameTable, i, o, a = {}.hasOwnProperty,
            s = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) a.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            };
        i = n(99), e = n(34), o = n(89), NameTable = function(t) {
            function NameTable() {
                return NameTable.__super__.constructor.apply(this, arguments)
            }
            var n;
            return s(NameTable, t), NameTable.prototype.tag = "name", NameTable.prototype.parse = function(t) {
                var e, n, i, o, a, s, h, u, l, c, f, d, p;
                for (t.pos = this.offset, o = t.readShort(), e = t.readShort(), h = t.readShort(), n = [], a = c = 0; e >= 0 ? e > c : c > e; a = e >= 0 ? ++c : --c) n.push({
                    platformID: t.readShort(),
                    encodingID: t.readShort(),
                    languageID: t.readShort(),
                    nameID: t.readShort(),
                    length: t.readShort(),
                    offset: this.offset + h + t.readShort()
                });
                for (u = {}, a = f = 0, d = n.length; d > f; a = ++f) i = n[a], t.pos = i.offset, l = t.readString(i.length), s = new r(l, i), null == u[p = i.nameID] && (u[p] = []), u[i.nameID].push(s);
                return this.strings = u, this.copyright = u[0], this.fontFamily = u[1], this.fontSubfamily = u[2], this.uniqueSubfamily = u[3], this.fontName = u[4], this.version = u[5], this.postscriptName = u[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g, ""), this.trademark = u[7], this.manufacturer = u[8], this.designer = u[9], this.description = u[10], this.vendorUrl = u[11], this.designerUrl = u[12], this.license = u[13], this.licenseUrl = u[14], this.preferredFamily = u[15], this.preferredSubfamily = u[17], this.compatibleFull = u[18], this.sampleText = u[19]
            }, n = "AAAAAA", NameTable.prototype.encode = function() {
                var t, i, a, s, h, u, l, c, f, d, p, g, v, m;
                f = {}, m = this.strings;
                for (t in m) p = m[t], f[t] = p;
                h = new r("" + n + "+" + this.postscriptName, {
                    platformID: 1,
                    encodingID: 0,
                    languageID: 0
                }), f[6] = [h], n = o.successorOf(n), u = 0;
                for (t in f) i = f[t], null != i && (u += i.length);
                d = new e, l = new e, d.writeShort(0), d.writeShort(u), d.writeShort(6 + 12 * u);
                for (a in f)
                    if (i = f[a], null != i)
                        for (g = 0, v = i.length; v > g; g++) c = i[g], d.writeShort(c.platformID), d.writeShort(c.encodingID), d.writeShort(c.languageID), d.writeShort(a), d.writeShort(c.length), d.writeShort(l.pos), l.writeString(c.raw);
                return s = {
                    postscriptName: h.raw,
                    table: d.data.concat(l.data)
                }
            }, NameTable
        }(i), t.exports = NameTable, r = function() {
            function t(t, e) {
                this.raw = t, this.length = this.raw.length, this.platformID = e.platformID, this.encodingID = e.encodingID, this.languageID = e.languageID
            }
            return t
        }()
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, HeadTable, r, i = {}.hasOwnProperty,
            o = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) i.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            };
        r = n(99), e = n(34), HeadTable = function(t) {
            function HeadTable() {
                return HeadTable.__super__.constructor.apply(this, arguments)
            }
            return o(HeadTable, t), HeadTable.prototype.tag = "head", HeadTable.prototype.parse = function(t) {
                return t.pos = this.offset, this.version = t.readInt(), this.revision = t.readInt(), this.checkSumAdjustment = t.readInt(), this.magicNumber = t.readInt(), this.flags = t.readShort(), this.unitsPerEm = t.readShort(), this.created = t.readLongLong(), this.modified = t.readLongLong(), this.xMin = t.readShort(), this.yMin = t.readShort(), this.xMax = t.readShort(), this.yMax = t.readShort(), this.macStyle = t.readShort(), this.lowestRecPPEM = t.readShort(), this.fontDirectionHint = t.readShort(), this.indexToLocFormat = t.readShort(), this.glyphDataFormat = t.readShort()
            }, HeadTable.prototype.encode = function(t) {
                var n;
                return n = new e, n.writeInt(this.version), n.writeInt(this.revision), n.writeInt(this.checkSumAdjustment), n.writeInt(this.magicNumber), n.writeShort(this.flags), n.writeShort(this.unitsPerEm), n.writeLongLong(this.created), n.writeLongLong(this.modified), n.writeShort(this.xMin), n.writeShort(this.yMin), n.writeShort(this.xMax), n.writeShort(this.yMax), n.writeShort(this.macStyle), n.writeShort(this.lowestRecPPEM), n.writeShort(this.fontDirectionHint), n.writeShort(t.type), n.writeShort(this.glyphDataFormat), n.data
            }, HeadTable
        }(r), t.exports = HeadTable
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, CmapTable, r, i, o = {}.hasOwnProperty,
            a = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) o.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            };
        i = n(99), r = n(34), CmapTable = function(t) {
            function CmapTable() {
                return CmapTable.__super__.constructor.apply(this, arguments)
            }
            return a(CmapTable, t), CmapTable.prototype.tag = "cmap", CmapTable.prototype.parse = function(t) {
                var n, r, i, o;
                for (t.pos = this.offset, this.version = t.readUInt16(), i = t.readUInt16(), this.tables = [], this.unicode = null, r = o = 0; i >= 0 ? i > o : o > i; r = i >= 0 ? ++o : --o) n = new e(t, this.offset), this.tables.push(n), n.isUnicode && null == this.unicode && (this.unicode = n);
                return !0
            }, CmapTable.encode = function(t, n) {
                var i, o;
                return null == n && (n = "macroman"), i = e.encode(t, n), o = new r, o.writeUInt16(0), o.writeUInt16(1), i.table = o.data.concat(i.subtable), i
            }, CmapTable
        }(i), e = function() {
            function t(t, e) {
                var n, r, i, o, a, s, h, u, l, c, f, d, p, g, v, m, y, w, _;
                switch (this.platformID = t.readUInt16(), this.encodingID = t.readShort(), this.offset = e + t.readInt(), c = t.pos, t.pos = this.offset, this.format = t.readUInt16(), this.length = t.readUInt16(), this.language = t.readUInt16(), this.isUnicode = 3 === this.platformID && 1 === this.encodingID && 4 === this.format || 0 === this.platformID && 4 === this.format, this.codeMap = {}, this.format) {
                    case 0:
                        for (s = m = 0; 256 > m; s = ++m) this.codeMap[s] = t.readByte();
                        break;
                    case 4:
                        for (d = t.readUInt16(), f = d / 2, t.pos += 6, i = function() {
                                var e, n;
                                for (n = [], s = e = 0; f >= 0 ? f > e : e > f; s = f >= 0 ? ++e : --e) n.push(t.readUInt16());
                                return n
                            }(), t.pos += 2, g = function() {
                                var e, n;
                                for (n = [], s = e = 0; f >= 0 ? f > e : e > f; s = f >= 0 ? ++e : --e) n.push(t.readUInt16());
                                return n
                            }(), h = function() {
                                var e, n;
                                for (n = [], s = e = 0; f >= 0 ? f > e : e > f; s = f >= 0 ? ++e : --e) n.push(t.readUInt16());
                                return n
                            }(), u = function() {
                                var e, n;
                                for (n = [], s = e = 0; f >= 0 ? f > e : e > f; s = f >= 0 ? ++e : --e) n.push(t.readUInt16());
                                return n
                            }(), r = (this.length - t.pos + this.offset) / 2, a = function() {
                                var e, n;
                                for (n = [], s = e = 0; r >= 0 ? r > e : e > r; s = r >= 0 ? ++e : --e) n.push(t.readUInt16());
                                return n
                            }(), s = y = 0, _ = i.length; _ > y; s = ++y)
                            for (v = i[s], p = g[s], n = w = p; v >= p ? v >= w : w >= v; n = v >= p ? ++w : --w) 0 === u[s] ? o = n + h[s] : (l = u[s] / 2 + (n - p) - (f - s), o = a[l] || 0, 0 !== o && (o += h[s])), this.codeMap[n] = 65535 & o
                }
                t.pos = c
            }
            return t.encode = function(t, e) {
                var n, i, o, a, s, h, u, l, c, f, d, p, g, v, m, y, w, _, b, x, S, k, E, C, I, A, L, R, B, T, M, O, D, U, P, F, z, W, N, j, H, Z, G, q, Y, K, X;
                switch (B = new r, a = Object.keys(t).sort(function(t, e) {
                    return t - e
                }), e) {
                    case "macroman":
                        for (g = 0, v = function() {
                                var t, e;
                                for (e = [], p = t = 0; 256 > t; p = ++t) e.push(0);
                                return e
                            }(), y = {
                                0: 0
                            }, o = {}, T = 0, U = a.length; U > T; T++) i = a[T], null == y[q = t[i]] && (y[q] = ++g), o[i] = {
                            old: t[i],
                            "new": y[t[i]]
                        }, v[i] = y[t[i]];
                        return B.writeUInt16(1), B.writeUInt16(0), B.writeUInt32(12), B.writeUInt16(0),
                            B.writeUInt16(262), B.writeUInt16(0), B.write(v), k = {
                                charMap: o,
                                subtable: B.data,
                                maxGlyphID: g + 1
                            };
                    case "unicode":
                        for (L = [], c = [], w = 0, y = {}, n = {}, m = u = null, M = 0, P = a.length; P > M; M++) i = a[M], b = t[i], null == y[b] && (y[b] = ++w), n[i] = {
                            old: b,
                            "new": y[b]
                        }, s = y[b] - i, (null == m || s !== u) && (m && c.push(m), L.push(i), u = s), m = i;
                        for (m && c.push(m), c.push(65535), L.push(65535), C = L.length, I = 2 * C, E = 2 * Math.pow(Math.log(C) / Math.LN2, 2), f = Math.log(E / 2) / Math.LN2, S = 2 * C - E, h = [], x = [], d = [], p = O = 0, F = L.length; F > O; p = ++O) {
                            if (A = L[p], l = c[p], 65535 === A) {
                                h.push(0), x.push(0);
                                break
                            }
                            if (R = n[A]["new"], A - R >= 32768)
                                for (h.push(0), x.push(2 * (d.length + C - p)), i = D = A; l >= A ? l >= D : D >= l; i = l >= A ? ++D : --D) d.push(n[i]["new"]);
                            else h.push(R - A), x.push(0)
                        }
                        for (B.writeUInt16(3), B.writeUInt16(1), B.writeUInt32(12), B.writeUInt16(4), B.writeUInt16(16 + 8 * C + 2 * d.length), B.writeUInt16(0), B.writeUInt16(I), B.writeUInt16(E), B.writeUInt16(f), B.writeUInt16(S), Z = 0, z = c.length; z > Z; Z++) i = c[Z], B.writeUInt16(i);
                        for (B.writeUInt16(0), G = 0, W = L.length; W > G; G++) i = L[G], B.writeUInt16(i);
                        for (Y = 0, N = h.length; N > Y; Y++) s = h[Y], B.writeUInt16(s);
                        for (K = 0, j = x.length; j > K; K++) _ = x[K], B.writeUInt16(_);
                        for (X = 0, H = d.length; H > X; X++) g = d[X], B.writeUInt16(g);
                        return k = {
                            charMap: n,
                            subtable: B.data,
                            maxGlyphID: w + 1
                        }
                }
            }, t
        }(), t.exports = CmapTable
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, HmtxTable, r, i = {}.hasOwnProperty,
            o = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) i.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            };
        r = n(99), e = n(34), HmtxTable = function(t) {
            function HmtxTable() {
                return HmtxTable.__super__.constructor.apply(this, arguments)
            }
            return o(HmtxTable, t), HmtxTable.prototype.tag = "hmtx", HmtxTable.prototype.parse = function(t) {
                var e, n, r, i, o, a, s, h;
                for (t.pos = this.offset, this.metrics = [], e = o = 0, s = this.file.hhea.numberOfMetrics; s >= 0 ? s > o : o > s; e = s >= 0 ? ++o : --o) this.metrics.push({
                    advance: t.readUInt16(),
                    lsb: t.readInt16()
                });
                for (r = this.file.maxp.numGlyphs - this.file.hhea.numberOfMetrics, this.leftSideBearings = function() {
                        var n, i;
                        for (i = [], e = n = 0; r >= 0 ? r > n : n > r; e = r >= 0 ? ++n : --n) i.push(t.readInt16());
                        return i
                    }(), this.widths = function() {
                        var t, e, n, r;
                        for (n = this.metrics, r = [], t = 0, e = n.length; e > t; t++) i = n[t], r.push(i.advance);
                        return r
                    }.call(this), n = this.widths[this.widths.length - 1], h = [], e = a = 0; r >= 0 ? r > a : a > r; e = r >= 0 ? ++a : --a) h.push(this.widths.push(n));
                return h
            }, HmtxTable.prototype.forGlyph = function(t) {
                var e;
                return t in this.metrics ? this.metrics[t] : e = {
                    advance: this.metrics[this.metrics.length - 1].advance,
                    lsb: this.leftSideBearings[t - this.metrics.length]
                }
            }, HmtxTable.prototype.encode = function(t) {
                var n, r, i, o, a;
                for (i = new e, o = 0, a = t.length; a > o; o++) n = t[o], r = this.forGlyph(n), i.writeUInt16(r.advance), i.writeUInt16(r.lsb);
                return i.data
            }, HmtxTable
        }(r), t.exports = HmtxTable
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, HheaTable, r, i = {}.hasOwnProperty,
            o = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) i.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            };
        r = n(99), e = n(34), HheaTable = function(t) {
            function HheaTable() {
                return HheaTable.__super__.constructor.apply(this, arguments)
            }
            return o(HheaTable, t), HheaTable.prototype.tag = "hhea", HheaTable.prototype.parse = function(t) {
                return t.pos = this.offset, this.version = t.readInt(), this.ascender = t.readShort(), this.decender = t.readShort(), this.lineGap = t.readShort(), this.advanceWidthMax = t.readShort(), this.minLeftSideBearing = t.readShort(), this.minRightSideBearing = t.readShort(), this.xMaxExtent = t.readShort(), this.caretSlopeRise = t.readShort(), this.caretSlopeRun = t.readShort(), this.caretOffset = t.readShort(), t.pos += 8, this.metricDataFormat = t.readShort(), this.numberOfMetrics = t.readUInt16()
            }, HheaTable.prototype.encode = function(t) {
                var n, r, i, o;
                for (r = new e, r.writeInt(this.version), r.writeShort(this.ascender), r.writeShort(this.decender), r.writeShort(this.lineGap), r.writeShort(this.advanceWidthMax), r.writeShort(this.minLeftSideBearing), r.writeShort(this.minRightSideBearing), r.writeShort(this.xMaxExtent), r.writeShort(this.caretSlopeRise), r.writeShort(this.caretSlopeRun), r.writeShort(this.caretOffset), n = i = 0, o = 8; o >= 0 ? o > i : i > o; n = o >= 0 ? ++i : --i) r.writeByte(0);
                return r.writeShort(this.metricDataFormat), r.writeUInt16(t.length), r.data
            }, HheaTable
        }(r), t.exports = HheaTable
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, MaxpTable, r, i = {}.hasOwnProperty,
            o = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) i.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            };
        r = n(99), e = n(34), MaxpTable = function(t) {
            function MaxpTable() {
                return MaxpTable.__super__.constructor.apply(this, arguments)
            }
            return o(MaxpTable, t), MaxpTable.prototype.tag = "maxp", MaxpTable.prototype.parse = function(t) {
                return t.pos = this.offset, this.version = t.readInt(), this.numGlyphs = t.readUInt16(), this.maxPoints = t.readUInt16(), this.maxContours = t.readUInt16(), this.maxCompositePoints = t.readUInt16(), this.maxComponentContours = t.readUInt16(), this.maxZones = t.readUInt16(), this.maxTwilightPoints = t.readUInt16(), this.maxStorage = t.readUInt16(), this.maxFunctionDefs = t.readUInt16(), this.maxInstructionDefs = t.readUInt16(), this.maxStackElements = t.readUInt16(), this.maxSizeOfInstructions = t.readUInt16(), this.maxComponentElements = t.readUInt16(), this.maxComponentDepth = t.readUInt16()
            }, MaxpTable.prototype.encode = function(t) {
                var n;
                return n = new e, n.writeInt(this.version), n.writeUInt16(t.length), n.writeUInt16(this.maxPoints), n.writeUInt16(this.maxContours), n.writeUInt16(this.maxCompositePoints), n.writeUInt16(this.maxComponentContours), n.writeUInt16(this.maxZones), n.writeUInt16(this.maxTwilightPoints), n.writeUInt16(this.maxStorage), n.writeUInt16(this.maxFunctionDefs), n.writeUInt16(this.maxInstructionDefs), n.writeUInt16(this.maxStackElements), n.writeUInt16(this.maxSizeOfInstructions), n.writeUInt16(this.maxComponentElements), n.writeUInt16(this.maxComponentDepth), n.data
            }, MaxpTable
        }(r), t.exports = MaxpTable
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, PostTable, r, i = {}.hasOwnProperty,
            o = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) i.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            };
        r = n(99), e = n(34), PostTable = function(t) {
            function PostTable() {
                return PostTable.__super__.constructor.apply(this, arguments)
            }
            var n;
            return o(PostTable, t), PostTable.prototype.tag = "post", PostTable.prototype.parse = function(t) {
                var e, n, r, i, o;
                switch (t.pos = this.offset, this.format = t.readInt(), this.italicAngle = t.readInt(), this.underlinePosition = t.readShort(), this.underlineThickness = t.readShort(), this.isFixedPitch = t.readInt(), this.minMemType42 = t.readInt(), this.maxMemType42 = t.readInt(), this.minMemType1 = t.readInt(), this.maxMemType1 = t.readInt(), this.format) {
                    case 65536:
                        break;
                    case 131072:
                        for (r = t.readUInt16(), this.glyphNameIndex = [], e = i = 0; r >= 0 ? r > i : i > r; e = r >= 0 ? ++i : --i) this.glyphNameIndex.push(t.readUInt16());
                        for (this.names = [], o = []; t.pos < this.offset + this.length;) n = t.readByte(), o.push(this.names.push(t.readString(n)));
                        return o;
                    case 151552:
                        return r = t.readUInt16(), this.offsets = t.read(r);
                    case 196608:
                        break;
                    case 262144:
                        return this.map = function() {
                            var n, r, i;
                            for (i = [], e = n = 0, r = this.file.maxp.numGlyphs; r >= 0 ? r > n : n > r; e = r >= 0 ? ++n : --n) i.push(t.readUInt32());
                            return i
                        }.call(this)
                }
            }, PostTable.prototype.glyphFor = function(t) {
                var e;
                switch (this.format) {
                    case 65536:
                        return n[t] || ".notdef";
                    case 131072:
                        return e = this.glyphNameIndex[t], 257 >= e ? n[e] : this.names[e - 258] || ".notdef";
                    case 151552:
                        return n[t + this.offsets[t]] || ".notdef";
                    case 196608:
                        return ".notdef";
                    case 262144:
                        return this.map[t] || 65535
                }
            }, PostTable.prototype.encode = function(t) {
                var r, i, o, a, s, h, u, l, c, f, d, p, g, v, m;
                if (!this.exists) return null;
                if (h = this.raw(), 196608 === this.format) return h;
                for (c = new e(h.slice(0, 32)), c.writeUInt32(131072), c.pos = 32, o = [], l = [], f = 0, g = t.length; g > f; f++) r = t[f], s = this.glyphFor(r), a = n.indexOf(s), -1 !== a ? o.push(a) : (o.push(257 + l.length), l.push(s));
                for (c.writeUInt16(Object.keys(t).length), d = 0, v = o.length; v > d; d++) i = o[d], c.writeUInt16(i);
                for (p = 0, m = l.length; m > p; p++) u = l[p], c.writeByte(u.length), c.writeString(u);
                return c.data
            }, n = ".notdef .null nonmarkingreturn space exclam quotedbl numbersign dollar percent\nampersand quotesingle parenleft parenright asterisk plus comma hyphen period slash\nzero one two three four five six seven eight nine colon semicolon less equal greater\nquestion at A B C D E F G H I J K L M N O P Q R S T U V W X Y Z\nbracketleft backslash bracketright asciicircum underscore grave\na b c d e f g h i j k l m n o p q r s t u v w x y z\nbraceleft bar braceright asciitilde Adieresis Aring Ccedilla Eacute Ntilde Odieresis\nUdieresis aacute agrave acircumflex adieresis atilde aring ccedilla eacute egrave\necircumflex edieresis iacute igrave icircumflex idieresis ntilde oacute ograve\nocircumflex odieresis otilde uacute ugrave ucircumflex udieresis dagger degree cent\nsterling section bullet paragraph germandbls registered copyright trademark acute\ndieresis notequal AE Oslash infinity plusminus lessequal greaterequal yen mu\npartialdiff summation product pi integral ordfeminine ordmasculine Omega ae oslash\nquestiondown exclamdown logicalnot radical florin approxequal Delta guillemotleft\nguillemotright ellipsis nonbreakingspace Agrave Atilde Otilde OE oe endash emdash\nquotedblleft quotedblright quoteleft quoteright divide lozenge ydieresis Ydieresis\nfraction currency guilsinglleft guilsinglright fi fl daggerdbl periodcentered\nquotesinglbase quotedblbase perthousand Acircumflex Ecircumflex Aacute Edieresis\nEgrave Iacute Icircumflex Idieresis Igrave Oacute Ocircumflex apple Ograve Uacute\nUcircumflex Ugrave dotlessi circumflex tilde macron breve dotaccent ring cedilla\nhungarumlaut ogonek caron Lslash lslash Scaron scaron Zcaron zcaron brokenbar Eth\neth Yacute yacute Thorn thorn minus multiply onesuperior twosuperior threesuperior\nonehalf onequarter threequarters franc Gbreve gbreve Idotaccent Scedilla scedilla\nCacute cacute Ccaron ccaron dcroat".split(/\s+/g), PostTable
        }(r), t.exports = PostTable
    }).call(this)
}, function(t, e, n) {
    (function() {
        var OS2Table, e, r = {}.hasOwnProperty,
            i = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var i in e) r.call(e, i) && (t[i] = e[i]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            };
        e = n(99), OS2Table = function(t) {
            function OS2Table() {
                return OS2Table.__super__.constructor.apply(this, arguments)
            }
            return i(OS2Table, t), OS2Table.prototype.tag = "OS/2", OS2Table.prototype.parse = function(t) {
                var e;
                return t.pos = this.offset, this.version = t.readUInt16(), this.averageCharWidth = t.readShort(), this.weightClass = t.readUInt16(), this.widthClass = t.readUInt16(), this.type = t.readShort(), this.ySubscriptXSize = t.readShort(), this.ySubscriptYSize = t.readShort(), this.ySubscriptXOffset = t.readShort(), this.ySubscriptYOffset = t.readShort(), this.ySuperscriptXSize = t.readShort(), this.ySuperscriptYSize = t.readShort(), this.ySuperscriptXOffset = t.readShort(), this.ySuperscriptYOffset = t.readShort(), this.yStrikeoutSize = t.readShort(), this.yStrikeoutPosition = t.readShort(), this.familyClass = t.readShort(), this.panose = function() {
                    var n, r;
                    for (r = [], e = n = 0; 10 > n; e = ++n) r.push(t.readByte());
                    return r
                }(), this.charRange = function() {
                    var n, r;
                    for (r = [], e = n = 0; 4 > n; e = ++n) r.push(t.readInt());
                    return r
                }(), this.vendorID = t.readString(4), this.selection = t.readShort(), this.firstCharIndex = t.readShort(), this.lastCharIndex = t.readShort(), this.version > 0 && (this.ascent = t.readShort(), this.descent = t.readShort(), this.lineGap = t.readShort(), this.winAscent = t.readShort(), this.winDescent = t.readShort(), this.codePageRange = function() {
                    var n, r;
                    for (r = [], e = n = 0; 2 > n; e = ++n) r.push(t.readInt());
                    return r
                }(), this.version > 1) ? (this.xHeight = t.readShort(), this.capHeight = t.readShort(), this.defaultChar = t.readShort(), this.breakChar = t.readShort(), this.maxContext = t.readShort()) : void 0
            }, OS2Table.prototype.encode = function() {
                return this.raw()
            }, OS2Table
        }(e), t.exports = OS2Table
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, LocaTable, r, i = {}.hasOwnProperty,
            o = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) i.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            };
        r = n(99), e = n(34), LocaTable = function(t) {
            function LocaTable() {
                return LocaTable.__super__.constructor.apply(this, arguments)
            }
            return o(LocaTable, t), LocaTable.prototype.tag = "loca", LocaTable.prototype.parse = function(t) {
                var e, n;
                return t.pos = this.offset, e = this.file.head.indexToLocFormat, this.offsets = 0 === e ? function() {
                    var e, r, i;
                    for (i = [], n = e = 0, r = this.length; r > e; n = e += 2) i.push(2 * t.readUInt16());
                    return i
                }.call(this) : function() {
                    var e, r, i;
                    for (i = [], n = e = 0, r = this.length; r > e; n = e += 4) i.push(t.readUInt32());
                    return i
                }.call(this)
            }, LocaTable.prototype.indexOf = function(t) {
                return this.offsets[t]
            }, LocaTable.prototype.lengthOf = function(t) {
                return this.offsets[t + 1] - this.offsets[t]
            }, LocaTable.prototype.encode = function(t) {
                var n, r, i, o, a, s, h, u, l, c, f;
                for (o = new e, a = 0, u = t.length; u > a; a++)
                    if (r = t[a], r > 65535) {
                        for (f = this.offsets, s = 0, l = f.length; l > s; s++) n = f[s], o.writeUInt32(n);
                        return i = {
                            format: 1,
                            table: o.data
                        }
                    } for (h = 0, c = t.length; c > h; h++) n = t[h], o.writeUInt16(n / 2);
                return i = {
                    format: 0,
                    table: o.data
                }
            }, LocaTable
        }(r), t.exports = LocaTable
    }).call(this)
}, function(t, e, n) {
    (function() {
        e.successorOf = function(t) {
            var e, n, r, i, o, a, s, h, u, l;
            for (n = "abcdefghijklmnopqrstuvwxyz", h = n.length, l = t, i = t.length; i >= 0;) {
                if (s = t.charAt(--i), isNaN(s)) {
                    if (o = n.indexOf(s.toLowerCase()), -1 === o) u = s, r = !0;
                    else if (u = n.charAt((o + 1) % h), a = s === s.toUpperCase(), a && (u = u.toUpperCase()), r = o + 1 >= h, r && 0 === i) {
                        e = a ? "A" : "a", l = e + u + l.slice(1);
                        break
                    }
                } else if (u = +s + 1, r = u > 9, r && (u = 0), r && 0 === i) {
                    l = "1" + u + l.slice(1);
                    break
                }
                if (l = l.slice(0, i) + u + l.slice(i + 1), !r) break
            }
            return l
        }, e.invert = function(t) {
            var e, n, r;
            n = {};
            for (e in t) r = t[e], n[r] = e;
            return n
        }
    }).call(this)
}, function(t, e, n) {
    (function() {
        var e, r, GlyfTable, i, o, a = {}.hasOwnProperty,
            s = function(t, e) {
                function n() {
                    this.constructor = t
                }
                for (var r in e) a.call(e, r) && (t[r] = e[r]);
                return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
            },
            h = [].slice;
        o = n(99), r = n(34), GlyfTable = function(t) {
            function GlyfTable() {
                return GlyfTable.__super__.constructor.apply(this, arguments)
            }
            return s(GlyfTable, t), GlyfTable.prototype.tag = "glyf", GlyfTable.prototype.parse = function(t) {
                return this.cache = {}
            }, GlyfTable.prototype.glyphFor = function(t) {
                var n, o, a, s, h, u, l, c, f, d;
                return t in this.cache ? this.cache[t] : (s = this.file.loca, n = this.file.contents, o = s.indexOf(t), a = s.lengthOf(t), 0 === a ? this.cache[t] = null : (n.pos = this.offset + o, u = new r(n.read(a)), h = u.readShort(), c = u.readShort(), d = u.readShort(), l = u.readShort(), f = u.readShort(), this.cache[t] = -1 === h ? new e(u, c, d, l, f) : new i(u, h, c, d, l, f), this.cache[t]))
            }, GlyfTable.prototype.encode = function(t, e, n) {
                var r, i, o, a, s, h;
                for (a = [], o = [], s = 0, h = e.length; h > s; s++) i = e[s], r = t[i], o.push(a.length), r && (a = a.concat(r.encode(n)));
                return o.push(a.length), {
                    table: a,
                    offsets: o
                }
            }, GlyfTable
        }(o), i = function() {
            function t(t, e, n, r, i, o) {
                this.raw = t, this.numberOfContours = e, this.xMin = n, this.yMin = r, this.xMax = i, this.yMax = o, this.compound = !1
            }
            return t.prototype.encode = function() {
                return this.raw.data
            }, t
        }(), e = function() {
            function t(t, r, s, h, u) {
                var l, c;
                for (this.raw = t, this.xMin = r, this.yMin = s, this.xMax = h, this.yMax = u, this.compound = !0, this.glyphIDs = [], this.glyphOffsets = [], l = this.raw;;) {
                    if (c = l.readShort(), this.glyphOffsets.push(l.pos), this.glyphIDs.push(l.readShort()), !(c & n)) break;
                    l.pos += c & e ? 4 : 2, c & a ? l.pos += 8 : c & i ? l.pos += 4 : c & o && (l.pos += 2)
                }
            }
            var e, n, i, o, a, s;
            return e = 1, o = 8, n = 32, i = 64, a = 128, s = 256, t.prototype.encode = function(t) {
                var e, n, i, o, a, s;
                for (i = new r(h.call(this.raw.data)), s = this.glyphIDs, e = o = 0, a = s.length; a > o; e = ++o) n = s[e], i.pos = this.glyphOffsets[e], i.writeShort(t[n]);
                return i.data
            }, t
        }(), t.exports = GlyfTable
    }).call(this)
}, function(t, e, n) {
    (function() {
        var t, n, r, i, o;
        e.DI_BRK = r = 0, e.IN_BRK = i = 1, e.CI_BRK = t = 2, e.CP_BRK = n = 3, e.PR_BRK = o = 4, e.pairTable = [
            [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, n, o, o, o, o, o, o, o],
            [r, o, o, i, i, o, o, o, o, i, i, r, r, r, r, r, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [r, o, o, i, i, o, o, o, o, i, i, i, i, i, r, r, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [o, o, o, i, i, i, o, o, o, i, i, i, i, i, i, i, i, i, i, i, o, t, o, i, i, i, i, i, i],
            [i, o, o, i, i, i, o, o, o, i, i, i, i, i, i, i, i, i, i, i, o, t, o, i, i, i, i, i, i],
            [r, o, o, i, i, i, o, o, o, r, r, r, r, r, r, r, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [r, o, o, i, i, i, o, o, o, r, r, r, r, r, r, r, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [r, o, o, i, i, i, o, o, o, r, r, i, r, r, r, r, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [r, o, o, i, i, i, o, o, o, r, r, i, i, i, r, r, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [i, o, o, i, i, i, o, o, o, r, r, i, i, i, i, r, i, i, r, r, o, t, o, i, i, i, i, i, r],
            [i, o, o, i, i, i, o, o, o, r, r, i, i, i, r, r, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [i, o, o, i, i, i, o, o, o, i, i, i, i, i, r, i, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [i, o, o, i, i, i, o, o, o, r, r, i, i, i, r, i, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [i, o, o, i, i, i, o, o, o, r, r, i, i, i, r, i, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [r, o, o, i, i, i, o, o, o, r, i, r, r, r, r, i, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [r, o, o, i, i, i, o, o, o, r, r, r, r, r, r, i, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [r, o, o, i, r, i, o, o, o, r, r, i, r, r, r, r, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [r, o, o, i, r, i, o, o, o, r, r, r, r, r, r, r, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [i, o, o, i, i, i, o, o, o, i, i, i, i, i, i, i, i, i, i, i, o, t, o, i, i, i, i, i, i],
            [r, o, o, i, i, i, o, o, o, r, r, r, r, r, r, r, i, i, r, o, o, t, o, r, r, r, r, r, r],
            [r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, o, r, r, r, r, r, r, r, r],
            [i, o, o, i, i, i, o, o, o, r, r, i, i, i, r, i, i, i, r, r, o, t, o, r, r, r, r, r, r],
            [i, o, o, i, i, i, o, o, o, i, i, i, i, i, i, i, i, i, i, i, o, t, o, i, i, i, i, i, i],
            [r, o, o, i, i, i, o, o, o, r, i, r, r, r, r, i, i, i, r, r, o, t, o, r, r, r, i, i, r],
            [r, o, o, i, i, i, o, o, o, r, i, r, r, r, r, i, i, i, r, r, o, t, o, r, r, r, r, i, r],
            [r, o, o, i, i, i, o, o, o, r, i, r, r, r, r, i, i, i, r, r, o, t, o, i, i, i, i, r, r],
            [r, o, o, i, i, i, o, o, o, r, i, r, r, r, r, i, i, i, r, r, o, t, o, r, r, r, i, i, r],
            [r, o, o, i, i, i, o, o, o, r, i, r, r, r, r, i, i, i, r, r, o, t, o, r, r, r, r, i, r],
            [r, o, o, i, i, i, o, o, o, r, r, r, r, r, r, r, i, i, r, r, o, t, o, r, r, r, r, r, i]
        ]
    }).call(this)
}, function(t, e, n) {
    (function() {
        var t, n, r, i, o, a, s, h, u, l, c, f, d, p, g, v, m, y, w, _, b, x, S, k, E, C, I, A, L, R, B, T, M, O, D, U, P, F, z, W;
        e.OP = L = 0, e.CL = u = 1, e.CP = c = 2, e.QU = T = 3, e.GL = p = 4, e.NS = I = 5, e.EX = d = 6, e.SY = P = 7, e.IS = b = 8, e.PR = B = 9, e.PO = R = 10, e.NU = A = 11, e.AL = n = 12, e.HL = m = 13, e.ID = w = 14, e.IN = _ = 15, e.HY = y = 16, e.BA = i = 17, e.BB = o = 18, e.B2 = r = 19, e.ZW = W = 20, e.CM = l = 21, e.WJ = F = 22, e.H2 = g = 23, e.H3 = v = 24, e.JL = x = 25, e.JV = k = 26, e.JT = S = 27, e.RI = M = 28, e.AI = t = 29, e.BK = a = 30, e.CB = s = 31, e.CJ = h = 32, e.CR = f = 33, e.LF = E = 34, e.NL = C = 35, e.SA = O = 36, e.SG = D = 37, e.SP = U = 38, e.XX = z = 39
    }).call(this)
}, function(t, e, n) {}, function(t, e, n) {
    t.exports = "function" == typeof Object.create ? function(t, e) {
        t.super_ = e, t.prototype = Object.create(e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    } : function(t, e) {
        t.super_ = e;
        var n = function() {};
        n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
    }
}, function(t, e, n) {
    "use strict";

    function r(t) {
        for (var e = t.length; --e >= 0;) t[e] = 0
    }

    function i(t) {
        return 256 > t ? at[t] : at[256 + (t >>> 7)]
    }

    function o(t, e) {
        t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255
    }

    function a(t, e, n) {
        t.bi_valid > Y - n ? (t.bi_buf |= e << t.bi_valid & 65535, o(t, t.bi_buf), t.bi_buf = e >> Y - t.bi_valid, t.bi_valid += n - Y) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += n)
    }

    function s(t, e, n) {
        a(t, n[2 * e], n[2 * e + 1])
    }

    function h(t, e) {
        var n = 0;
        do n |= 1 & t, t >>>= 1, n <<= 1; while (--e > 0);
        return n >>> 1
    }

    function u(t) {
        16 === t.bi_valid ? (o(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8)
    }

    function l(t, e) {
        var n, r, i, o, a, s, h = e.dyn_tree,
            u = e.max_code,
            l = e.stat_desc.static_tree,
            c = e.stat_desc.has_stree,
            f = e.stat_desc.extra_bits,
            d = e.stat_desc.extra_base,
            p = e.stat_desc.max_length,
            g = 0;
        for (o = 0; q >= o; o++) t.bl_count[o] = 0;
        for (h[2 * t.heap[t.heap_max] + 1] = 0, n = t.heap_max + 1; G > n; n++) r = t.heap[n], o = h[2 * h[2 * r + 1] + 1] + 1, o > p && (o = p, g++), h[2 * r + 1] = o, r > u || (t.bl_count[o]++, a = 0, r >= d && (a = f[r - d]), s = h[2 * r], t.opt_len += s * (o + a), c && (t.static_len += s * (l[2 * r + 1] + a)));
        if (0 !== g) {
            do {
                for (o = p - 1; 0 === t.bl_count[o];) o--;
                t.bl_count[o]--, t.bl_count[o + 1] += 2, t.bl_count[p]--, g -= 2
            } while (g > 0);
            for (o = p; 0 !== o; o--)
                for (r = t.bl_count[o]; 0 !== r;) i = t.heap[--n], i > u || (h[2 * i + 1] !== o && (t.opt_len += (o - h[2 * i + 1]) * h[2 * i], h[2 * i + 1] = o), r--)
        }
    }

    function c(t, e, n) {
        var r, i, o = new Array(q + 1),
            a = 0;
        for (r = 1; q >= r; r++) o[r] = a = a + n[r - 1] << 1;
        for (i = 0; e >= i; i++) {
            var s = t[2 * i + 1];
            0 !== s && (t[2 * i] = h(o[s]++, s))
        }
    }

    function f() {
        var t, e, n, r, i, o = new Array(q + 1);
        for (n = 0, r = 0; W - 1 > r; r++)
            for (ht[r] = n, t = 0; t < 1 << Q[r]; t++) st[n++] = r;
        for (st[n - 1] = r, i = 0, r = 0; 16 > r; r++)
            for (ut[r] = i, t = 0; t < 1 << tt[r]; t++) at[i++] = r;
        for (i >>= 7; H > r; r++)
            for (ut[r] = i << 7, t = 0; t < 1 << tt[r] - 7; t++) at[256 + i++] = r;
        for (e = 0; q >= e; e++) o[e] = 0;
        for (t = 0; 143 >= t;) it[2 * t + 1] = 8, t++, o[8]++;
        for (; 255 >= t;) it[2 * t + 1] = 9, t++, o[9]++;
        for (; 279 >= t;) it[2 * t + 1] = 7, t++, o[7]++;
        for (; 287 >= t;) it[2 * t + 1] = 8, t++, o[8]++;
        for (c(it, j + 1, o), t = 0; H > t; t++) ot[2 * t + 1] = 5, ot[2 * t] = h(t, 5);
        lt = new dt(it, Q, N + 1, j, q), ct = new dt(ot, tt, 0, H, q), ft = new dt(new Array(0), et, 0, Z, K)
    }

    function d(t) {
        var e;
        for (e = 0; j > e; e++) t.dyn_ltree[2 * e] = 0;
        for (e = 0; H > e; e++) t.dyn_dtree[2 * e] = 0;
        for (e = 0; Z > e; e++) t.bl_tree[2 * e] = 0;
        t.dyn_ltree[2 * X] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0
    }

    function p(t) {
        t.bi_valid > 8 ? o(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0
    }

    function g(t, e, n, r) {
        p(t), r && (o(t, n), o(t, ~n)), R.arraySet(t.pending_buf, t.window, e, n, t.pending), t.pending += n
    }

    function v(t, e, n, r) {
        var i = 2 * e,
            o = 2 * n;
        return t[i] < t[o] || t[i] === t[o] && r[e] <= r[n]
    }

    function m(t, e, n) {
        for (var r = t.heap[n], i = n << 1; i <= t.heap_len && (i < t.heap_len && v(e, t.heap[i + 1], t.heap[i], t.depth) && i++, !v(e, r, t.heap[i], t.depth));) t.heap[n] = t.heap[i], n = i, i <<= 1;
        t.heap[n] = r
    }

    function y(t, e, n) {
        var r, o, h, u, l = 0;
        if (0 !== t.last_lit)
            do r = t.pending_buf[t.d_buf + 2 * l] << 8 | t.pending_buf[t.d_buf + 2 * l + 1], o = t.pending_buf[t.l_buf + l], l++, 0 === r ? s(t, o, e) : (h = st[o], s(t, h + N + 1, e), u = Q[h], 0 !== u && (o -= ht[h], a(t, o, u)), r--, h = i(r), s(t, h, n), u = tt[h], 0 !== u && (r -= ut[h], a(t, r, u))); while (l < t.last_lit);
        s(t, X, e)
    }

    function w(t, e) {
        var n, r, i, o = e.dyn_tree,
            a = e.stat_desc.static_tree,
            s = e.stat_desc.has_stree,
            h = e.stat_desc.elems,
            u = -1;
        for (t.heap_len = 0, t.heap_max = G, n = 0; h > n; n++) 0 !== o[2 * n] ? (t.heap[++t.heap_len] = u = n, t.depth[n] = 0) : o[2 * n + 1] = 0;
        for (; t.heap_len < 2;) i = t.heap[++t.heap_len] = 2 > u ? ++u : 0, o[2 * i] = 1, t.depth[i] = 0, t.opt_len--, s && (t.static_len -= a[2 * i + 1]);
        for (e.max_code = u, n = t.heap_len >> 1; n >= 1; n--) m(t, o, n);
        i = h;
        do n = t.heap[1], t.heap[1] = t.heap[t.heap_len--], m(t, o, 1), r = t.heap[1], t.heap[--t.heap_max] = n, t.heap[--t.heap_max] = r, o[2 * i] = o[2 * n] + o[2 * r], t.depth[i] = (t.depth[n] >= t.depth[r] ? t.depth[n] : t.depth[r]) + 1, o[2 * n + 1] = o[2 * r + 1] = i, t.heap[1] = i++, m(t, o, 1); while (t.heap_len >= 2);
        t.heap[--t.heap_max] = t.heap[1], l(t, e), c(o, u, t.bl_count)
    }

    function _(t, e, n) {
        var r, i, o = -1,
            a = e[1],
            s = 0,
            h = 7,
            u = 4;
        for (0 === a && (h = 138, u = 3), e[2 * (n + 1) + 1] = 65535, r = 0; n >= r; r++) i = a, a = e[2 * (r + 1) + 1], ++s < h && i === a || (u > s ? t.bl_tree[2 * i] += s : 0 !== i ? (i !== o && t.bl_tree[2 * i]++, t.bl_tree[2 * V]++) : 10 >= s ? t.bl_tree[2 * $]++ : t.bl_tree[2 * J]++, s = 0, o = i, 0 === a ? (h = 138, u = 3) : i === a ? (h = 6, u = 3) : (h = 7, u = 4))
    }

    function b(t, e, n) {
        var r, i, o = -1,
            h = e[1],
            u = 0,
            l = 7,
            c = 4;
        for (0 === h && (l = 138, c = 3), r = 0; n >= r; r++)
            if (i = h, h = e[2 * (r + 1) + 1], !(++u < l && i === h)) {
                if (c > u) {
                    do s(t, i, t.bl_tree); while (0 !== --u)
                } else 0 !== i ? (i !== o && (s(t, i, t.bl_tree), u--), s(t, V, t.bl_tree), a(t, u - 3, 2)) : 10 >= u ? (s(t, $, t.bl_tree), a(t, u - 3, 3)) : (s(t, J, t.bl_tree), a(t, u - 11, 7));
                u = 0, o = i, 0 === h ? (l = 138, c = 3) : i === h ? (l = 6, c = 3) : (l = 7, c = 4)
            }
    }

    function x(t) {
        var e;
        for (_(t, t.dyn_ltree, t.l_desc.max_code), _(t, t.dyn_dtree, t.d_desc.max_code), w(t, t.bl_desc), e = Z - 1; e >= 3 && 0 === t.bl_tree[2 * nt[e] + 1]; e--);
        return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e
    }

    function S(t, e, n, r) {
        var i;
        for (a(t, e - 257, 5), a(t, n - 1, 5), a(t, r - 4, 4), i = 0; r > i; i++) a(t, t.bl_tree[2 * nt[i] + 1], 3);
        b(t, t.dyn_ltree, e - 1), b(t, t.dyn_dtree, n - 1)
    }

    function k(t) {
        var e, n = 4093624447;
        for (e = 0; 31 >= e; e++, n >>>= 1)
            if (1 & n && 0 !== t.dyn_ltree[2 * e]) return T;
        if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return M;
        for (e = 32; N > e; e++)
            if (0 !== t.dyn_ltree[2 * e]) return M;
        return T
    }

    function E(t) {
        gt || (f(), gt = !0), t.l_desc = new pt(t.dyn_ltree, lt), t.d_desc = new pt(t.dyn_dtree, ct), t.bl_desc = new pt(t.bl_tree, ft), t.bi_buf = 0, t.bi_valid = 0, d(t)
    }

    function C(t, e, n, r) {
        a(t, (D << 1) + (r ? 1 : 0), 3), g(t, e, n, !0)
    }

    function I(t) {
        a(t, U << 1, 3), s(t, X, it), u(t)
    }

    function A(t, e, n, r) {
        var i, o, s = 0;
        t.level > 0 ? (t.strm.data_type === O && (t.strm.data_type = k(t)), w(t, t.l_desc), w(t, t.d_desc), s = x(t), i = t.opt_len + 3 + 7 >>> 3, o = t.static_len + 3 + 7 >>> 3, i >= o && (i = o)) : i = o = n + 5, i >= n + 4 && -1 !== e ? C(t, e, n, r) : t.strategy === B || o === i ? (a(t, (U << 1) + (r ? 1 : 0), 3), y(t, it, ot)) : (a(t, (P << 1) + (r ? 1 : 0), 3), S(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, s + 1), y(t, t.dyn_ltree, t.dyn_dtree)), d(t), r && p(t)
    }

    function L(t, e, n) {
        return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & n, t.last_lit++, 0 === e ? t.dyn_ltree[2 * n]++ : (t.matches++, e--, t.dyn_ltree[2 * (st[n] + N + 1)]++, t.dyn_dtree[2 * i(e)]++), t.last_lit === t.lit_bufsize - 1
    }
    var R = n(98),
        B = 4,
        T = 0,
        M = 1,
        O = 2,
        D = 0,
        U = 1,
        P = 2,
        F = 3,
        z = 258,
        W = 29,
        N = 256,
        j = N + 1 + W,
        H = 30,
        Z = 19,
        G = 2 * j + 1,
        q = 15,
        Y = 16,
        K = 7,
        X = 256,
        V = 16,
        $ = 17,
        J = 18,
        Q = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
        tt = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
        et = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
        nt = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
        rt = 512,
        it = new Array(2 * (j + 2));
    r(it);
    var ot = new Array(2 * H);
    r(ot);
    var at = new Array(rt);
    r(at);
    var st = new Array(z - F + 1);
    r(st);
    var ht = new Array(W);
    r(ht);
    var ut = new Array(H);
    r(ut);
    var lt, ct, ft, dt = function(t, e, n, r, i) {
            this.static_tree = t, this.extra_bits = e, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = t && t.length
        },
        pt = function(t, e) {
            this.dyn_tree = t, this.max_code = 0, this.stat_desc = e
        },
        gt = !1;
    e._tr_init = E, e._tr_stored_block = C, e._tr_flush_block = A, e._tr_tally = L, e._tr_align = I
}, function(t, e, n) {
    "use strict";

    function r(t, e, n, r) {
        for (var i = 65535 & t | 0, o = t >>> 16 & 65535 | 0, a = 0; 0 !== n;) {
            a = n > 2e3 ? 2e3 : n, n -= a;
            do i = i + e[r++] | 0, o = o + i | 0; while (--a);
            i %= 65521, o %= 65521
        }
        return i | o << 16 | 0
    }
    t.exports = r
}, function(t, e, n) {
    "use strict";

    function r() {
        for (var t, e = [], n = 0; 256 > n; n++) {
            t = n;
            for (var r = 0; 8 > r; r++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
            e[n] = t
        }
        return e
    }

    function i(t, e, n, r) {
        var i = o,
            a = r + n;
        t = -1 ^ t;
        for (var s = r; a > s; s++) t = t >>> 8 ^ i[255 & (t ^ e[s])];
        return -1 ^ t
    }
    var o = r();
    t.exports = i
}, function(t, e, n) {
    "use strict";
    var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
    e.assign = function(t) {
        for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
            var n = e.shift();
            if (n) {
                if ("object" != typeof n) throw new TypeError(n + "must be non-object");
                for (var r in n) n.hasOwnProperty(r) && (t[r] = n[r])
            }
        }
        return t
    }, e.shrinkBuf = function(t, e) {
        return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t)
    };
    var i = {
            arraySet: function(t, e, n, r, i) {
                if (e.subarray && t.subarray) return void t.set(e.subarray(n, n + r), i);
                for (var o = 0; r > o; o++) t[i + o] = e[n + o]
            },
            flattenChunks: function(t) {
                var e, n, r, i, o, a;
                for (r = 0, e = 0, n = t.length; n > e; e++) r += t[e].length;
                for (a = new Uint8Array(r), i = 0, e = 0, n = t.length; n > e; e++) o = t[e], a.set(o, i), i += o.length;
                return a
            }
        },
        o = {
            arraySet: function(t, e, n, r, i) {
                for (var o = 0; r > o; o++) t[i + o] = e[n + o]
            },
            flattenChunks: function(t) {
                return [].concat.apply([], t)
            }
        };
    e.setTyped = function(t) {
        t ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, i)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, o))
    }, e.setTyped(r)
}, function(t, e, n) {
    (function() {
        var e;
        e = function() {
            function t(t) {
                var e;
                this.file = t, e = this.file.directory.tables[this.tag], this.exists = !!e, e && (this.offset = e.offset, this.length = e.length, this.parse(this.file.contents))
            }
            return t.prototype.parse = function() {}, t.prototype.encode = function() {}, t.prototype.raw = function() {
                return this.exists ? (this.file.contents.pos = this.offset, this.file.contents.read(this.length)) : null
            }, t
        }(), t.exports = e
    }).call(this)
}, function(t, e, n) {
    var r, i = [].slice;
    r = function() {
        function t(t) {
            var e, n;
            null == t && (t = {}), this.data = t.data || [], this.highStart = null != (e = t.highStart) ? e : 0, this.errorValue = null != (n = t.errorValue) ? n : -1
        }
        var e, n, r, o, a, s, h, u, l, c, f, d, p, g, v, m;
        return d = 11, g = 5, p = d - g, f = 65536 >> d, a = 1 << p, h = a - 1, u = 2, e = 1 << g, r = e - 1, c = 65536 >> g, l = 1024 >> g, s = c + l, m = s, v = 32, o = m + v, n = 1 << u, t.prototype.get = function(t) {
            var e;
            return 0 > t || t > 1114111 ? this.errorValue : 55296 > t || t > 56319 && 65535 >= t ? (e = (this.data[t >> g] << u) + (t & r), this.data[e]) : 65535 >= t ? (e = (this.data[c + (t - 55296 >> g)] << u) + (t & r), this.data[e]) : t < this.highStart ? (e = this.data[o - f + (t >> d)], e = this.data[e + (t >> g & h)], e = (e << u) + (t & r), this.data[e]) : this.data[this.data.length - n]
        }, t.prototype.toJSON = function() {
            var t;
            return t = {
                data: i.call(this.data),
                highStart: this.highStart,
                errorValue: this.errorValue
            }
        }, t
    }(), t.exports = r
}, function(t, e, n) {
    function r(t) {
        if (t && !h(t)) throw new Error("Unknown encoding: " + t)
    }

    function i(t) {
        return t.toString(this.encoding)
    }

    function o(t) {
        this.charReceived = t.length % 2, this.charLength = this.charReceived ? 2 : 0
    }

    function a(t) {
        this.charReceived = t.length % 3, this.charLength = this.charReceived ? 3 : 0
    }
    var s = n(4).Buffer,
        h = s.isEncoding || function(t) {
            switch (t && t.toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                case "raw":
                    return !0;
                default:
                    return !1
            }
        },
        u = e.StringDecoder = function(t) {
            switch (this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, ""), r(t), this.encoding) {
                case "utf8":
                    this.surrogateSize = 3;
                    break;
                case "ucs2":
                case "utf16le":
                    this.surrogateSize = 2, this.detectIncompleteChar = o;
                    break;
                case "base64":
                    this.surrogateSize = 3, this.detectIncompleteChar = a;
                    break;
                default:
                    return void(this.write = i)
            }
            this.charBuffer = new s(6), this.charReceived = 0, this.charLength = 0
        };
    u.prototype.write = function(t) {
        for (var e = ""; this.charLength;) {
            var n = t.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : t.length;
            if (t.copy(this.charBuffer, this.charReceived, 0, n), this.charReceived += n, this.charReceived < this.charLength) return "";
            t = t.slice(n, t.length), e = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
            var r = e.charCodeAt(e.length - 1);
            if (!(r >= 55296 && 56319 >= r)) {
                if (this.charReceived = this.charLength = 0, 0 === t.length) return e;
                break
            }
            this.charLength += this.surrogateSize, e = ""
        }
        this.detectIncompleteChar(t);
        var i = t.length;
        this.charLength && (t.copy(this.charBuffer, 0, t.length - this.charReceived, i), i -= this.charReceived), e += t.toString(this.encoding, 0, i);
        var i = e.length - 1,
            r = e.charCodeAt(i);
        if (r >= 55296 && 56319 >= r) {
            var o = this.surrogateSize;
            return this.charLength += o, this.charReceived += o, this.charBuffer.copy(this.charBuffer, o, 0, o), t.copy(this.charBuffer, 0, 0, o), e.substring(0, i)
        }
        return e
    }, u.prototype.detectIncompleteChar = function(t) {
        for (var e = t.length >= 3 ? 3 : t.length; e > 0; e--) {
            var n = t[t.length - e];
            if (1 == e && n >> 5 == 6) {
                this.charLength = 2;
                break
            }
            if (2 >= e && n >> 4 == 14) {
                this.charLength = 3;
                break
            }
            if (3 >= e && n >> 3 == 30) {
                this.charLength = 4;
                break
            }
        }
        this.charReceived = e
    }, u.prototype.end = function(t) {
        var e = "";
        if (t && t.length && (e = this.write(t)), this.charReceived) {
            var n = this.charReceived,
                r = this.charBuffer,
                i = this.encoding;
            e += r.slice(0, n).toString(i)
        }
        return e
    }
}, function(t, e, n) {
    "use strict";
    var r = 30,
        i = 12;
    t.exports = function(t, e) {
        var n, o, a, s, h, u, l, c, f, d, p, g, v, m, y, w, _, b, x, S, k, E, C, I, A;
        n = t.state, o = t.next_in, I = t.input, a = o + (t.avail_in - 5), s = t.next_out, A = t.output, h = s - (e - t.avail_out), u = s + (t.avail_out - 257), l = n.dmax, c = n.wsize, f = n.whave, d = n.wnext, p = n.window, g = n.hold, v = n.bits, m = n.lencode, y = n.distcode, w = (1 << n.lenbits) - 1, _ = (1 << n.distbits) - 1;
        t: do {
            15 > v && (g += I[o++] << v, v += 8, g += I[o++] << v, v += 8), b = m[g & w];
            e: for (;;) {
                if (x = b >>> 24, g >>>= x, v -= x, x = b >>> 16 & 255, 0 === x) A[s++] = 65535 & b;
                else {
                    if (!(16 & x)) {
                        if (0 === (64 & x)) {
                            b = m[(65535 & b) + (g & (1 << x) - 1)];
                            continue e
                        }
                        if (32 & x) {
                            n.mode = i;
                            break t
                        }
                        t.msg = "invalid literal/length code", n.mode = r;
                        break t
                    }
                    S = 65535 & b, x &= 15, x && (x > v && (g += I[o++] << v, v += 8), S += g & (1 << x) - 1, g >>>= x, v -= x), 15 > v && (g += I[o++] << v, v += 8, g += I[o++] << v, v += 8), b = y[g & _];
                    n: for (;;) {
                        if (x = b >>> 24, g >>>= x, v -= x, x = b >>> 16 & 255, !(16 & x)) {
                            if (0 === (64 & x)) {
                                b = y[(65535 & b) + (g & (1 << x) - 1)];
                                continue n
                            }
                            t.msg = "invalid distance code", n.mode = r;
                            break t
                        }
                        if (k = 65535 & b, x &= 15, x > v && (g += I[o++] << v, v += 8, x > v && (g += I[o++] << v, v += 8)), k += g & (1 << x) - 1, k > l) {
                            t.msg = "invalid distance too far back", n.mode = r;
                            break t
                        }
                        if (g >>>= x, v -= x, x = s - h, k > x) {
                            if (x = k - x, x > f && n.sane) {
                                t.msg = "invalid distance too far back", n.mode = r;
                                break t
                            }
                            if (E = 0, C = p, 0 === d) {
                                if (E += c - x, S > x) {
                                    S -= x;
                                    do A[s++] = p[E++]; while (--x);
                                    E = s - k, C = A
                                }
                            } else if (x > d) {
                                if (E += c + d - x, x -= d, S > x) {
                                    S -= x;
                                    do A[s++] = p[E++]; while (--x);
                                    if (E = 0, S > d) {
                                        x = d, S -= x;
                                        do A[s++] = p[E++]; while (--x);
                                        E = s - k, C = A
                                    }
                                }
                            } else if (E += d - x, S > x) {
                                S -= x;
                                do A[s++] = p[E++]; while (--x);
                                E = s - k, C = A
                            }
                            for (; S > 2;) A[s++] = C[E++], A[s++] = C[E++], A[s++] = C[E++], S -= 3;
                            S && (A[s++] = C[E++], S > 1 && (A[s++] = C[E++]))
                        } else {
                            E = s - k;
                            do A[s++] = A[E++], A[s++] = A[E++], A[s++] = A[E++], S -= 3; while (S > 2);
                            S && (A[s++] = A[E++], S > 1 && (A[s++] = A[E++]))
                        }
                        break
                    }
                }
                break
            }
        } while (a > o && u > s);
        S = v >> 3, o -= S, v -= S << 3, g &= (1 << v) - 1, t.next_in = o, t.next_out = s, t.avail_in = a > o ? 5 + (a - o) : 5 - (o - a), t.avail_out = u > s ? 257 + (u - s) : 257 - (s - u), n.hold = g, n.bits = v
    }
}, function(t, e, n) {
    "use strict";
    var r = n(98),
        i = 15,
        o = 852,
        a = 592,
        s = 0,
        h = 1,
        u = 2,
        l = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
        c = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
        f = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
        d = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];

    t.exports = function(t, e, n, p, g, v, m, y) {
        var w, _, b, x, S, k, E, C, I, A = y.bits,
            L = 0,
            R = 0,
            B = 0,
            T = 0,
            M = 0,
            O = 0,
            D = 0,
            U = 0,
            P = 0,
            F = 0,
            z = null,
            W = 0,
            N = new r.Buf16(i + 1),
            j = new r.Buf16(i + 1),
            H = null,
            Z = 0;
        for (L = 0; i >= L; L++) N[L] = 0;
        for (R = 0; p > R; R++) N[e[n + R]]++;
        for (M = A, T = i; T >= 1 && 0 === N[T]; T--);
        if (M > T && (M = T), 0 === T) return g[v++] = 20971520, g[v++] = 20971520, y.bits = 1, 0;
        for (B = 1; T > B && 0 === N[B]; B++);
        for (B > M && (M = B), U = 1, L = 1; i >= L; L++)
            if (U <<= 1, U -= N[L], 0 > U) return -1;
        if (U > 0 && (t === s || 1 !== T)) return -1;
        for (j[1] = 0, L = 1; i > L; L++) j[L + 1] = j[L] + N[L];
        for (R = 0; p > R; R++) 0 !== e[n + R] && (m[j[e[n + R]]++] = R);
        if (t === s ? (z = H = m, k = 19) : t === h ? (z = l, W -= 257, H = c, Z -= 257, k = 256) : (z = f, H = d, k = -1), F = 0, R = 0, L = B, S = v, O = M, D = 0, b = -1, P = 1 << M, x = P - 1, t === h && P > o || t === u && P > a) return 1;
        for (var G = 0;;) {
            G++, E = L - D, m[R] < k ? (C = 0, I = m[R]) : m[R] > k ? (C = H[Z + m[R]], I = z[W + m[R]]) : (C = 96, I = 0), w = 1 << L - D, _ = 1 << O, B = _;
            do _ -= w, g[S + (F >> D) + _] = E << 24 | C << 16 | I | 0; while (0 !== _);
            for (w = 1 << L - 1; F & w;) w >>= 1;
            if (0 !== w ? (F &= w - 1, F += w) : F = 0, R++, 0 === --N[L]) {
                if (L === T) break;
                L = e[n + m[R]]
            }
            if (L > M && (F & x) !== b) {
                for (0 === D && (D = M), S += B, O = L - D, U = 1 << O; T > O + D && (U -= N[O + D], !(0 >= U));) O++, U <<= 1;
                if (P += 1 << O, t === h && P > o || t === u && P > a) return 1;
                b = F & x, g[b] = M << 24 | O << 16 | S - v | 0
            }
        }
        return 0 !== F && (g[S + F] = L - D << 24 | 64 << 16 | 0), y.bits = M, 0
    }
}, function(t, e, n) {
    t.exports = "function" == typeof Object.create ? function(t, e) {
        t.super_ = e, t.prototype = Object.create(e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    } : function(t, e) {
        t.super_ = e;
        var n = function() {};
        n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
    }
}, function(t, e, n) {
    (function(t) {
        function n(t) {
            return Array.isArray(t)
        }

        function r(t) {
            return "boolean" == typeof t
        }

        function i(t) {
            return null === t
        }

        function o(t) {
            return null == t
        }

        function a(t) {
            return "number" == typeof t
        }

        function s(t) {
            return "string" == typeof t
        }

        function h(t) {
            return "symbol" == typeof t
        }

        function u(t) {
            return void 0 === t
        }

        function l(t) {
            return c(t) && "[object RegExp]" === m(t)
        }

        function c(t) {
            return "object" == typeof t && null !== t
        }

        function f(t) {
            return c(t) && "[object Date]" === m(t)
        }

        function d(t) {
            return c(t) && ("[object Error]" === m(t) || t instanceof Error)
        }

        function p(t) {
            return "function" == typeof t
        }

        function g(t) {
            return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || "undefined" == typeof t
        }

        function v(e) {
            return t.isBuffer(e)
        }

        function m(t) {
            return Object.prototype.toString.call(t)
        }
        e.isArray = n, e.isBoolean = r, e.isNull = i, e.isNullOrUndefined = o, e.isNumber = a, e.isString = s, e.isSymbol = h, e.isUndefined = u, e.isRegExp = l, e.isObject = c, e.isDate = f, e.isError = d, e.isFunction = p, e.isPrimitive = g, e.isBuffer = v
    }).call(e, n(4).Buffer)
}, function(t, e, n) {
    t.exports = {
        data: [1961, 1969, 1977, 1985, 2025, 2033, 2041, 2049, 2057, 2065, 2073, 2081, 2089, 2097, 2105, 2113, 2121, 2129, 2137, 2145, 2153, 2161, 2169, 2177, 2185, 2193, 2201, 2209, 2217, 2225, 2233, 2241, 2249, 2257, 2265, 2273, 2281, 2289, 2297, 2305, 2313, 2321, 2329, 2337, 2345, 2353, 2361, 2369, 2377, 2385, 2393, 2401, 2409, 2417, 2425, 2433, 2441, 2449, 2457, 2465, 2473, 2481, 2489, 2497, 2505, 2513, 2521, 2529, 2529, 2537, 2009, 2545, 2553, 2561, 2569, 2577, 2585, 2593, 2601, 2609, 2617, 2625, 2633, 2641, 2649, 2657, 2665, 2673, 2681, 2689, 2697, 2705, 2713, 2721, 2729, 2737, 2745, 2753, 2761, 2769, 2777, 2785, 2793, 2801, 2809, 2817, 2825, 2833, 2841, 2849, 2857, 2865, 2873, 2881, 2889, 2009, 2897, 2905, 2913, 2009, 2921, 2929, 2937, 2945, 2953, 2961, 2969, 2009, 2977, 2977, 2985, 2993, 3001, 3009, 3009, 3009, 3017, 3017, 3017, 3025, 3025, 3033, 3041, 3041, 3049, 3049, 3049, 3049, 3049, 3049, 3049, 3049, 3049, 3049, 3057, 3065, 3073, 3073, 3073, 3081, 3089, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3097, 3105, 3113, 3113, 3121, 3129, 3137, 3145, 3153, 3161, 3161, 3169, 3177, 3185, 3193, 3193, 3193, 3193, 3201, 3209, 3209, 3217, 3225, 3233, 3241, 3241, 3241, 3249, 3257, 3265, 3273, 3273, 3281, 3289, 3297, 2009, 2009, 3305, 3313, 3321, 3329, 3337, 3345, 3353, 3361, 3369, 3377, 3385, 3393, 2009, 2009, 3401, 3409, 3417, 3417, 3417, 3417, 3417, 3417, 3425, 3425, 3433, 3433, 3433, 3433, 3433, 3433, 3433, 3433, 3433, 3433, 3433, 3433, 3433, 3433, 3433, 3441, 3449, 3457, 3465, 3473, 3481, 3489, 3497, 3505, 3513, 3521, 3529, 3537, 3545, 3553, 3561, 3569, 3577, 3585, 3593, 3601, 3609, 3617, 3625, 3625, 3633, 3641, 3649, 3649, 3649, 3649, 3649, 3657, 3665, 3665, 3673, 3681, 3681, 3681, 3681, 3689, 3697, 3697, 3705, 3713, 3721, 3729, 3737, 3745, 3753, 3761, 3769, 3777, 3785, 3793, 3801, 3809, 3817, 3825, 3833, 3841, 3849, 3857, 3865, 3873, 3881, 3881, 3881, 3881, 3881, 3881, 3881, 3881, 3881, 3881, 3881, 3881, 3889, 3897, 3905, 3913, 3921, 3921, 3921, 3921, 3921, 3921, 3921, 3921, 3921, 3921, 3929, 2009, 2009, 2009, 2009, 2009, 3937, 3937, 3937, 3937, 3937, 3937, 3937, 3945, 3953, 3953, 3953, 3961, 3969, 3969, 3977, 3985, 3993, 4001, 2009, 2009, 4009, 4009, 4009, 4009, 4009, 4009, 4009, 4009, 4009, 4009, 4009, 4009, 4017, 4025, 4033, 4041, 4049, 4057, 4065, 4073, 4081, 4081, 4081, 4081, 4081, 4081, 4081, 4089, 4097, 4097, 4105, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4113, 4121, 4121, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4129, 4137, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4145, 4153, 4161, 4169, 4169, 4169, 4169, 4169, 4169, 4169, 4169, 4177, 4185, 4193, 4201, 4209, 4217, 4217, 4225, 4233, 4233, 4233, 4233, 4233, 4233, 4233, 4233, 4241, 4249, 4257, 4265, 4273, 4281, 4289, 4297, 4305, 4313, 4321, 4329, 4337, 4345, 4353, 4361, 4361, 4369, 4377, 4385, 4385, 4385, 4385, 4393, 4401, 4409, 4409, 4409, 4409, 4409, 4409, 4417, 4425, 4433, 4441, 4449, 4457, 4465, 4473, 4481, 4489, 4497, 4505, 4513, 4521, 4529, 4537, 4545, 4553, 4561, 4569, 4577, 4585, 4593, 4601, 4609, 4617, 4625, 4633, 4641, 4649, 4657, 4665, 4673, 4681, 4689, 4697, 4705, 4713, 4721, 4729, 4737, 4745, 4753, 4761, 4769, 4777, 4785, 4793, 4801, 4809, 4817, 4825, 4833, 4841, 4849, 4857, 4865, 4873, 4881, 4889, 4897, 4905, 4913, 4921, 4929, 4937, 4945, 4953, 4961, 4969, 4977, 4985, 4993, 5001, 5009, 5017, 5025, 5033, 5041, 5049, 5057, 5065, 5073, 5081, 5089, 5097, 5105, 5113, 5121, 5129, 5137, 5145, 5153, 5161, 5169, 5177, 5185, 5193, 5201, 5209, 5217, 5225, 5233, 5241, 5249, 5257, 5265, 5273, 5281, 5289, 5297, 5305, 5313, 5321, 5329, 5337, 5345, 5353, 5361, 5369, 5377, 5385, 5393, 5401, 5409, 5417, 5425, 5433, 5441, 5449, 5457, 5465, 5473, 5481, 5489, 5497, 5505, 5513, 5521, 5529, 5537, 5545, 5553, 5561, 5569, 5577, 5585, 5593, 5601, 5609, 5617, 5625, 5633, 5641, 5649, 5657, 5665, 5673, 5681, 5689, 5697, 5705, 5713, 5721, 5729, 5737, 5745, 5753, 5761, 5769, 5777, 5785, 5793, 5801, 5809, 5817, 5825, 5833, 5841, 5849, 5857, 5865, 5873, 5881, 5889, 5897, 5905, 5913, 5921, 5929, 5937, 5945, 5953, 5961, 5969, 5977, 5985, 5993, 6001, 6009, 6017, 6025, 6033, 6041, 6049, 6057, 6065, 6073, 6081, 6089, 6097, 6105, 6113, 6121, 6129, 6137, 6145, 6153, 6161, 6169, 6177, 6185, 6193, 6201, 6209, 6217, 6225, 6233, 6241, 6249, 6257, 6265, 6273, 6281, 6289, 6297, 6305, 6313, 6321, 6329, 6337, 6345, 6353, 6361, 6369, 6377, 6385, 6393, 6401, 6409, 6417, 6425, 6433, 6441, 6449, 6457, 6465, 6473, 6481, 6489, 6497, 6505, 6513, 6521, 6529, 6537, 6545, 6553, 6561, 6569, 6577, 6585, 6593, 6601, 6609, 6617, 6625, 6633, 6641, 6649, 6657, 6665, 6673, 6681, 6689, 6697, 6705, 6713, 6721, 6729, 6737, 6745, 6753, 6761, 6769, 6777, 6785, 6793, 6801, 6809, 6817, 6825, 6833, 6841, 6849, 6857, 6865, 6873, 6881, 6889, 6897, 6905, 6913, 6921, 6929, 6937, 6945, 6953, 6961, 6969, 6977, 6985, 6993, 7001, 7009, 7017, 7025, 7033, 7041, 7049, 7057, 7065, 7073, 7081, 7089, 7097, 7105, 7113, 7121, 7129, 7137, 7145, 7153, 7161, 7169, 7177, 7185, 7193, 7201, 7209, 7217, 7225, 7233, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7249, 7249, 7249, 7249, 7249, 7249, 7249, 7249, 7249, 7249, 7249, 7249, 7249, 7249, 7249, 7249, 7257, 7265, 7273, 7281, 7281, 7281, 7281, 7281, 7281, 7281, 7281, 7281, 7281, 7281, 7281, 7281, 7281, 7289, 7297, 7305, 7305, 7305, 7305, 7313, 7321, 7329, 7337, 7345, 7353, 7353, 7353, 7361, 7369, 7377, 7385, 7393, 7401, 7409, 7417, 7425, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7241, 7972, 7972, 8100, 8164, 8228, 8292, 8356, 8420, 8484, 8548, 8612, 8676, 8740, 8804, 8868, 8932, 8996, 9060, 9124, 9188, 9252, 9316, 9380, 9444, 9508, 9572, 9636, 9700, 9764, 9828, 9892, 9956, 2593, 2657, 2721, 2529, 2785, 2529, 2849, 2913, 2977, 3041, 3105, 3169, 3233, 3297, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 3361, 2529, 2529, 2529, 3425, 2529, 2529, 3489, 3553, 2529, 3617, 3681, 3745, 3809, 3873, 3937, 4001, 4065, 4129, 4193, 4257, 4321, 4385, 4449, 4513, 4577, 4641, 4705, 4769, 4833, 4897, 4961, 5025, 5089, 5153, 5217, 5281, 5345, 5409, 5473, 5537, 5601, 5665, 5729, 5793, 5857, 5921, 5985, 6049, 6113, 6177, 6241, 6305, 6369, 6433, 6497, 6561, 6625, 6689, 6753, 6817, 6881, 6945, 7009, 7073, 7137, 7201, 7265, 7329, 7393, 7457, 7521, 7585, 7649, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 2529, 7713, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7433, 7433, 7433, 7433, 7433, 7433, 7433, 7441, 7449, 7457, 7457, 7457, 7457, 7457, 7457, 7465, 2009, 2009, 2009, 2009, 7473, 7473, 7473, 7473, 7473, 7473, 7473, 7473, 7481, 7489, 7497, 7505, 7505, 7505, 7505, 7505, 7513, 7521, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7529, 7529, 7537, 7545, 7545, 7545, 7545, 7545, 7553, 7561, 7561, 7561, 7561, 7561, 7561, 7561, 7569, 7577, 7585, 7593, 7593, 7593, 7593, 7593, 7593, 7601, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7609, 7617, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7625, 7633, 7641, 7649, 7657, 7665, 7673, 7681, 7689, 7697, 7705, 2009, 7713, 7721, 7729, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7737, 7745, 7753, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7761, 7769, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7777, 7785, 7793, 7801, 7809, 7809, 7809, 7809, 7809, 7809, 7817, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7825, 7833, 7841, 7849, 2009, 2009, 2009, 7857, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7865, 7865, 7865, 7865, 7865, 7865, 7865, 7865, 7865, 7865, 7865, 7873, 7881, 7889, 7897, 7897, 7897, 7897, 7905, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7913, 7921, 7929, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7937, 7937, 7937, 7937, 7937, 7937, 7937, 7945, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 7953, 7953, 7953, 7953, 7953, 7953, 7953, 2009, 7961, 7969, 7977, 7985, 7993, 2009, 2009, 8001, 8009, 8009, 8009, 8009, 8009, 8009, 8009, 8009, 8009, 8009, 8009, 8009, 8009, 8017, 8025, 8025, 8025, 8025, 8025, 8025, 8025, 8033, 8041, 8049, 8057, 8065, 8073, 8081, 8081, 8081, 8081, 8081, 8081, 8081, 8081, 8081, 8081, 8081, 8089, 2009, 8097, 8097, 8097, 8105, 2009, 2009, 2009, 2009, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8113, 8121, 8129, 8137, 8137, 8137, 8137, 8137, 8137, 8137, 8137, 8137, 8137, 8137, 8137, 8137, 8137, 8145, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 2009, 67496, 67496, 67496, 21, 21, 21, 21, 21, 21, 21, 21, 21, 17, 34, 30, 30, 33, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 38, 6, 3, 12, 9, 10, 12, 3, 0, 2, 12, 9, 8, 16, 8, 7, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 8, 8, 12, 12, 12, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 9, 2, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 17, 1, 12, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 21, 21, 21, 35, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 4, 0, 10, 9, 9, 9, 12, 29, 29, 12, 29, 3, 12, 17, 12, 12, 10, 9, 29, 29, 18, 12, 29, 29, 29, 29, 29, 3, 29, 29, 29, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 18, 29, 29, 29, 18, 29, 12, 12, 29, 12, 12, 12, 12, 12, 12, 12, 29, 29, 29, 29, 12, 29, 12, 18, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 4, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 4, 4, 4, 4, 4, 4, 4, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 8, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 8, 17, 39, 39, 39, 39, 9, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 17, 21, 12, 21, 21, 12, 21, 21, 6, 21, 39, 39, 39, 39, 39, 39, 39, 39, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 10, 10, 10, 8, 8, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 6, 6, 6, 6, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 11, 11, 12, 12, 12, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 6, 12, 21, 21, 21, 21, 21, 21, 21, 12, 12, 21, 21, 21, 21, 21, 21, 12, 12, 21, 21, 12, 21, 21, 21, 21, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 8, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 21, 21, 21, 12, 21, 21, 21, 21, 21, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 17, 17, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 21, 21, 21, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 21, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 39, 39, 39, 39, 39, 39, 39, 39, 21, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 21, 21, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 10, 10, 12, 12, 12, 12, 12, 10, 12, 9, 39, 39, 39, 39, 39, 21, 21, 21, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 21, 21, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 21, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 9, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 21, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 21, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 21, 21, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 12, 39, 39, 39, 39, 39, 39, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 9, 12, 39, 39, 39, 39, 39, 39, 21, 21, 21, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 21, 21, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 21, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 21, 21, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 39, 39, 39, 39, 39, 39, 39, 39, 21, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 21, 21, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 39, 39, 39, 10, 12, 12, 12, 12, 12, 12, 39, 39, 21, 21, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 39, 39, 39, 39, 9, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 17, 17, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 36, 36, 36, 36, 12, 18, 18, 18, 18, 12, 18, 18, 4, 18, 18, 17, 4, 6, 6, 6, 6, 6, 4, 12, 6, 12, 12, 12, 21, 21, 12, 12, 12, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 21, 12, 21, 12, 21, 0, 1, 0, 1, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 17, 21, 21, 21, 21, 21, 17, 21, 21, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 17, 17, 12, 12, 12, 12, 12, 12, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 18, 18, 17, 18, 12, 12, 12, 12, 12, 4, 4, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 17, 17, 12, 12, 12, 12, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 36, 36, 36, 36, 36, 36, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 21, 21, 21, 12, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 17, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 17, 17, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 17, 17, 5, 36, 17, 12, 17, 9, 36, 36, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 6, 6, 17, 17, 18, 12, 6, 6, 12, 21, 21, 21, 4, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 12, 39, 39, 39, 6, 6, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 39, 39, 39, 39, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 36, 36, 36, 36, 36, 36, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 39, 39, 12, 12, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 39, 39, 21, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 17, 17, 12, 17, 17, 17, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 17, 17, 17, 17, 17, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 17, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 21, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 21, 12, 12, 12, 12, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 18, 12, 39, 17, 17, 17, 17, 17, 17, 17, 4, 17, 17, 17, 20, 21, 21, 21, 21, 17, 4, 17, 17, 19, 29, 29, 12, 3, 3, 0, 3, 3, 3, 0, 3, 29, 29, 12, 12, 15, 15, 15, 17, 30, 30, 21, 21, 21, 21, 21, 4, 10, 10, 10, 10, 10, 10, 10, 10, 12, 3, 3, 29, 5, 5, 12, 12, 12, 12, 12, 12, 8, 0, 1, 5, 5, 5, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 12, 17, 17, 17, 17, 12, 17, 17, 17, 22, 12, 12, 12, 12, 39, 39, 39, 39, 39, 21, 21, 21, 21, 21, 21, 12, 12, 39, 39, 29, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 29, 12, 29, 29, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 9, 9, 9, 9, 9, 9, 9, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 9, 9, 9, 9, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 10, 12, 29, 12, 12, 12, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 9, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 12, 12, 12, 12, 12, 29, 12, 12, 29, 12, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 12, 12, 12, 12, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 29, 29, 12, 12, 12, 29, 29, 12, 12, 29, 12, 12, 12, 29, 12, 29, 9, 9, 12, 29, 12, 12, 12, 12, 29, 12, 12, 29, 29, 29, 29, 12, 12, 29, 12, 29, 12, 29, 29, 29, 29, 29, 29, 12, 29, 12, 12, 12, 12, 12, 29, 29, 29, 29, 12, 12, 12, 12, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 12, 29, 12, 12, 12, 12, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 12, 12, 29, 29, 29, 29, 12, 12, 29, 29, 12, 12, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 12, 12, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 12, 12, 12, 12, 12, 14, 14, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14, 14, 14, 14, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 12, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 12, 12, 12, 12, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 12, 12, 29, 29, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 12, 29, 29, 29, 29, 29, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 12, 12, 29, 29, 12, 12, 12, 12, 29, 29, 12, 12, 29, 29, 12, 12, 12, 12, 29, 29, 29, 12, 12, 29, 12, 12, 29, 29, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14, 14, 14, 14, 12, 29, 29, 12, 12, 29, 12, 12, 12, 12, 29, 29, 12, 12, 12, 12, 14, 14, 29, 29, 14, 12, 14, 14, 14, 14, 14, 14, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14, 14, 14, 12, 12, 12, 12, 29, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 12, 29, 29, 29, 12, 29, 14, 29, 29, 12, 29, 29, 12, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 29, 29, 29, 29, 14, 12, 14, 14, 14, 29, 14, 14, 29, 29, 29, 14, 14, 29, 29, 14, 29, 29, 14, 14, 14, 12, 29, 12, 12, 12, 12, 29, 29, 14, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 29, 14, 14, 14, 14, 29, 29, 14, 14, 14, 14, 14, 14, 14, 14, 12, 12, 12, 14, 14, 14, 14, 14, 14, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 12, 12, 12, 3, 3, 3, 3, 12, 12, 12, 6, 6, 12, 12, 12, 12, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 0, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 29, 29, 29, 29, 29, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 12, 12, 39, 39, 39, 39, 39, 6, 17, 17, 17, 12, 6, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 17, 17, 17, 17, 17, 17, 17, 17, 12, 17, 0, 17, 12, 12, 3, 3, 12, 12, 3, 3, 0, 1, 0, 1, 0, 1, 0, 1, 17, 17, 17, 17, 6, 12, 17, 17, 12, 17, 17, 12, 12, 12, 12, 12, 19, 19, 39, 39, 39, 39, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 1, 1, 14, 14, 5, 14, 14, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 14, 14, 0, 1, 0, 1, 0, 1, 0, 1, 5, 0, 1, 1, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 21, 21, 21, 21, 21, 21, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 5, 5, 14, 14, 14, 39, 32, 14, 32, 14, 32, 14, 32, 14, 32, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 32, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 32, 14, 32, 14, 32, 14, 14, 14, 14, 14, 14, 32, 14, 14, 14, 14, 14, 14, 32, 32, 39, 39, 21, 21, 5, 5, 5, 5, 14, 5, 32, 14, 32, 14, 32, 14, 32, 14, 32, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 32, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 32, 14, 32, 14, 32, 14, 14, 14, 14, 14, 14, 32, 14, 14, 14, 14, 14, 14, 32, 32, 14, 14, 14, 14, 5, 32, 5, 5, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 29, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 5, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 6, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 12, 17, 17, 17, 17, 17, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 12, 12, 12, 21, 12, 12, 12, 12, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 18, 18, 6, 6, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 17, 17, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 17, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 39, 39, 39, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 17, 17, 17, 12, 12, 12, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 21, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 12, 17, 17, 17, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 17, 17, 12, 12, 12, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 17, 21, 21, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 39, 39, 39, 39, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 39, 39, 39, 39, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 37, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 13, 21, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 10, 12, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 8, 1, 1, 8, 8, 6, 6, 0, 1, 15, 39, 39, 39, 39, 39, 39, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 14, 14, 14, 14, 14, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 14, 14, 0, 1, 14, 14, 14, 14, 14, 14, 14, 1, 14, 1, 39, 5, 5, 6, 6, 14, 0, 1, 0, 1, 0, 1, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 9, 10, 14, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 22, 39, 6, 14, 14, 9, 10, 14, 14, 0, 1, 14, 14, 1, 14, 1, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 5, 5, 14, 14, 14, 6, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 0, 14, 1, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 0, 14, 1, 14, 0, 1, 1, 0, 1, 1, 5, 12, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 5, 5, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 10, 9, 14, 14, 14, 9, 9, 39, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 21, 31, 29, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 17, 17, 17, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 17, 17, 17, 17, 17, 17, 17, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 17, 17, 17, 17, 17, 17, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 17, 17, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 17, 17, 17, 17, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 17, 17, 17, 17, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 17, 17, 12, 17, 39, 39, 39, 39, 39, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 17, 17, 17, 17, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 0, 0, 1, 1, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 1, 12, 12, 12, 0, 1, 0, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 1, 1, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14, 14, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 21, 12, 12, 12, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 12, 12, 21, 21, 21, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 21, 21, 21, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 12, 39, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 12, 12, 39, 39, 39, 39, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 12, 14, 14, 14, 14, 14, 12, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 14, 12, 14, 12, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 14, 12, 12, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 39, 39, 39, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39],
        highStart: 919552,
        errorValue: 0
    }
}, function(t, e, n) {
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == Object.prototype.toString.call(t)
    }
}]);
//# sourceMappingURL=pdfmake.min.js.map
