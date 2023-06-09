var Vips = (() => {
  var _scriptDir = import.meta.url;

  return function (Vips) {
    Vips = Vips || {};

    var c;
    c || (c = typeof Vips !== "undefined" ? Vips : {});
    var aa, ba;
    c.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    c.dynamicLibraries =
      c.dynamicLibraries ||
      ["vips-jxl.wasm"].map((a) => {
        var b = new URL(".", _scriptDir).pathname;
        return c.locateFile ? c.locateFile(a, b) : b + a;
      });
    var ca = Object.assign({}, c),
      da = [],
      ea = "./this.program",
      fa = (a, b) => {
        throw b;
      },
      ha = "object" == typeof window,
      ia = "function" == typeof importScripts,
      ja =
        "object" == typeof process &&
        "object" == typeof process.pd &&
        "string" == typeof process.pd.node,
      u = c.ENVIRONMENT_IS_PTHREAD || !1,
      ka = "";
    function la(a) {
      return c.locateFile ? c.locateFile(a, ka) : ka + a;
    }
    var ma, na, oa;
    if (ha || ia)
      ia
        ? (ka = self.location.href)
        : "undefined" != typeof document &&
          document.currentScript &&
          (ka = document.currentScript.src),
        _scriptDir && (ka = _scriptDir),
        0 !== ka.indexOf("blob:")
          ? (ka = ka.substr(0, ka.replace(/[?#].*/, "").lastIndexOf("/") + 1))
          : (ka = ""),
        (ma = (a) => {
          var b = new XMLHttpRequest();
          b.open("GET", a, !1);
          b.send(null);
          return b.responseText;
        }),
        ia &&
          (oa = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, !1);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          }),
        (na = (a, b, d) => {
          var e = new XMLHttpRequest();
          e.open("GET", a, !0);
          e.responseType = "arraybuffer";
          e.onload = () => {
            200 == e.status || (0 == e.status && e.response)
              ? b(e.response)
              : d();
          };
          e.onerror = d;
          e.send(null);
        });
    var pa = c.print || console.log.bind(console),
      v = c.printErr || console.warn.bind(console);
    Object.assign(c, ca);
    ca = null;
    c.arguments && (da = c.arguments);
    c.thisProgram && (ea = c.thisProgram);
    c.quit && (fa = c.quit);
    var qa = c.dynamicLibraries || [],
      ra;
    c.wasmBinary && (ra = c.wasmBinary);
    var noExitRuntime = c.noExitRuntime || !1;
    "object" != typeof WebAssembly && x("no native wasm support detected");
    var sa,
      ta,
      ua = !1,
      wa,
      xa = new TextDecoder("utf8");
    function ya(a, b, d) {
      d = b + d;
      for (var e = b; a[e] && !(e >= d); ) ++e;
      return xa.decode(
        a.buffer
          ? a.buffer instanceof SharedArrayBuffer
            ? a.slice(b, e)
            : a.subarray(b, e)
          : new Uint8Array(a.slice(b, e))
      );
    }
    function y(a, b) {
      if (!a) return "";
      b = a + b;
      for (var d = a; !(d >= b) && z[d]; ) ++d;
      return xa.decode(z.slice(a, d));
    }
    function za(a, b, d, e) {
      if (!(0 < e)) return 0;
      var f = d;
      e = d + e - 1;
      for (var g = 0; g < a.length; ++g) {
        var h = a.charCodeAt(g);
        if (55296 <= h && 57343 >= h) {
          var k = a.charCodeAt(++g);
          h = (65536 + ((h & 1023) << 10)) | (k & 1023);
        }
        if (127 >= h) {
          if (d >= e) break;
          b[d++] = h;
        } else {
          if (2047 >= h) {
            if (d + 1 >= e) break;
            b[d++] = 192 | (h >> 6);
          } else {
            if (65535 >= h) {
              if (d + 2 >= e) break;
              b[d++] = 224 | (h >> 12);
            } else {
              if (d + 3 >= e) break;
              b[d++] = 240 | (h >> 18);
              b[d++] = 128 | ((h >> 12) & 63);
            }
            b[d++] = 128 | ((h >> 6) & 63);
          }
          b[d++] = 128 | (h & 63);
        }
      }
      b[d] = 0;
      return d - f;
    }
    function Aa(a) {
      for (var b = 0, d = 0; d < a.length; ++d) {
        var e = a.charCodeAt(d);
        127 >= e
          ? b++
          : 2047 >= e
          ? (b += 2)
          : 55296 <= e && 57343 >= e
          ? ((b += 4), ++d)
          : (b += 3);
      }
      return b;
    }
    var Ba, A, z, Ca, Da, B, D, Ea, Fa, Ga, Ha;
    u && (Ba = c.buffer);
    var Ia = c.INITIAL_MEMORY || 1073741824;
    if (u) (sa = c.wasmMemory), (Ba = c.buffer);
    else if (c.wasmMemory) sa = c.wasmMemory;
    else if (
      ((sa = new WebAssembly.Memory({
        initial: Ia / 65536,
        maximum: Ia / 65536,
        shared: !0,
      })),
      !(sa.buffer instanceof SharedArrayBuffer))
    )
      throw (
        (v(
          "requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"
        ),
        ja &&
          v(
            "(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)"
          ),
        Error("bad memory"))
      );
    sa && (Ba = sa.buffer);
    Ia = Ba.byteLength;
    var Ja = Ba;
    Ba = Ja;
    c.HEAP8 = A = new Int8Array(Ja);
    c.HEAP16 = Ca = new Int16Array(Ja);
    c.HEAP32 = B = new Int32Array(Ja);
    c.HEAPU8 = z = new Uint8Array(Ja);
    c.HEAPU16 = Da = new Uint16Array(Ja);
    c.HEAPU32 = D = new Uint32Array(Ja);
    c.HEAPF32 = Ea = new Float32Array(Ja);
    c.HEAPF64 = Ha = new Float64Array(Ja);
    c.HEAP64 = Fa = new BigInt64Array(Ja);
    c.HEAPU64 = Ga = new BigUint64Array(Ja);
    var E = new WebAssembly.Table({ initial: 4925, element: "anyfunc" }),
      Ka = [],
      La = [],
      Ma = [],
      Na = [],
      Oa = [],
      Pa = [],
      Qa = !1,
      Ra = !1,
      Sa = 0;
    function Ta() {
      return noExitRuntime || 0 < Sa;
    }
    function Ua() {
      Qa = !0;
      u ||
        (Va(Pa), c.noFSInit || FS.init.Za || FS.init(), (FS.Jb = !1), Va(La));
    }
    function Wa() {
      u || (Xa(), Va(Na), FS.Xc(), F.Tb(), (Ra = !0));
    }
    function Ya() {
      var a = c.preRun.shift();
      Ka.unshift(a);
    }
    var Za = 0,
      $a = null,
      ab = null;
    function bb() {
      Za++;
      c.monitorRunDependencies && c.monitorRunDependencies(Za);
    }
    function cb() {
      Za--;
      c.monitorRunDependencies && c.monitorRunDependencies(Za);
      if (0 == Za && (null !== $a && (clearInterval($a), ($a = null)), ab)) {
        var a = ab;
        ab = null;
        a();
      }
    }
    function x(a) {
      if (u) postMessage({ cmd: "onAbort", arg: a });
      else if (c.onAbort) c.onAbort(a);
      a = "Aborted(" + a + ")";
      v(a);
      ua = !0;
      wa = 1;
      a = new WebAssembly.RuntimeError(
        a + ". Build with -sASSERTIONS for more info."
      );
      ba(a);
      throw a;
    }
    function db() {
      return G.startsWith("data:application/octet-stream;base64,");
    }
    var G;
    c.locateFile
      ? ((G = "vips.wasm"), db() || (G = la(G)))
      : ((G = new URL("vips.wasm", import.meta.url)), (G = G.href));
    function eb() {
      var a = G;
      try {
        if (a == G && ra) return new Uint8Array(ra);
        if (oa) return oa(a);
        throw "both async and sync fetching of the wasm failed";
      } catch (b) {
        x(b);
      }
    }
    function fb() {
      return ra || (!ha && !ia) || "function" != typeof fetch
        ? Promise.resolve().then(function () {
            return eb();
          })
        : fetch(G, { credentials: "same-origin" })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + G + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return eb();
            });
    }
    var H,
      I,
      gb = {};
    function hb(a) {
      for (var b = Da[(a + 6) >> 1]; 13 === b; ) {
        var d = D[(a + 8) >> 2],
          e = D[d >> 2];
        if (0 === e) {
          b = 0;
          break;
        } else if (0 === D[(d >> 2) + 1]) (a = e), (b = Da[(e + 6) >> 1]);
        else break;
      }
      return [a, b];
    }
    function ib(a, b) {
      jb = a;
      kb = b;
      if (lb)
        if ((mb || ((Sa += 1), (mb = !0)), 0 == a))
          nb = function () {
            var e = Math.max(0, ob + b - pb()) | 0;
            setTimeout(qb, e);
          };
        else if (1 == a)
          nb = function () {
            rb(qb);
          };
        else if (2 == a) {
          if ("undefined" == typeof setImmediate) {
            var d = [];
            addEventListener(
              "message",
              (e) => {
                if (
                  "setimmediate" === e.data ||
                  "setimmediate" === e.data.target
                )
                  e.stopPropagation(), d.shift()();
              },
              !0
            );
            setImmediate = function (e) {
              d.push(e);
              ia
                ? (void 0 === c.setImmediates && (c.setImmediates = []),
                  c.setImmediates.push(e),
                  postMessage({ target: "setimmediate" }))
                : postMessage("setimmediate", "*");
            };
          }
          nb = function () {
            setImmediate(qb);
          };
        }
    }
    var pb;
    pb = u
      ? () => performance.now() - c.__performance_now_clock_drift
      : () => performance.now();
    pb.h = "d";
    function sb(a) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + a + ")";
      this.status = a;
    }
    var tb = (a, b) => {
        for (var d = 0, e = a.length - 1; 0 <= e; e--) {
          var f = a[e];
          "." === f
            ? a.splice(e, 1)
            : ".." === f
            ? (a.splice(e, 1), d++)
            : d && (a.splice(e, 1), d--);
        }
        if (b) for (; d; d--) a.unshift("..");
        return a;
      },
      J = (a) => {
        var b = "/" === a.charAt(0),
          d = "/" === a.substr(-1);
        (a = tb(
          a.split("/").filter((e) => !!e),
          !b
        ).join("/")) ||
          b ||
          (a = ".");
        a && d && (a += "/");
        return (b ? "/" : "") + a;
      },
      ub = (a) => {
        var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
          .exec(a)
          .slice(1);
        a = b[0];
        b = b[1];
        if (!a && !b) return ".";
        b && (b = b.substr(0, b.length - 1));
        return a + b;
      },
      vb = (a) => {
        if ("/" === a) return "/";
        a = J(a);
        a = a.replace(/\/$/, "");
        var b = a.lastIndexOf("/");
        return -1 === b ? a : a.substr(b + 1);
      },
      wb = (a, b) => J(a + "/" + b);
    function xb() {
      if (
        "object" == typeof crypto &&
        "function" == typeof crypto.getRandomValues
      ) {
        var a = new Uint8Array(1);
        return () => {
          crypto.getRandomValues(a);
          return a[0];
        };
      }
      return () => x("randomDevice");
    }
    function yb() {
      for (var a = "", b = !1, d = arguments.length - 1; -1 <= d && !b; d--) {
        b = 0 <= d ? arguments[d] : FS.cwd();
        if ("string" != typeof b)
          throw new TypeError("Arguments to path.resolve must be strings");
        if (!b) return "";
        a = b + "/" + a;
        b = "/" === b.charAt(0);
      }
      a = tb(
        a.split("/").filter((e) => !!e),
        !b
      ).join("/");
      return (b ? "/" : "") + a || ".";
    }
    var zb = (a, b) => {
      function d(h) {
        for (var k = 0; k < h.length && "" === h[k]; k++);
        for (var l = h.length - 1; 0 <= l && "" === h[l]; l--);
        return k > l ? [] : h.slice(k, l - k + 1);
      }
      a = yb(a).substr(1);
      b = yb(b).substr(1);
      a = d(a.split("/"));
      b = d(b.split("/"));
      for (var e = Math.min(a.length, b.length), f = e, g = 0; g < e; g++)
        if (a[g] !== b[g]) {
          f = g;
          break;
        }
      e = [];
      for (g = f; g < a.length; g++) e.push("..");
      e = e.concat(b.slice(f));
      return e.join("/");
    };
    function Ab(a, b) {
      var d = Array(Aa(a) + 1);
      a = za(a, d, 0, d.length);
      b && (d.length = a);
      return d;
    }
    var Bb = [];
    function Cb(a, b) {
      Bb[a] = { input: [], H: [], oa: b };
      FS.registerDevice(a, Db);
    }
    var Db = {
        open: function (a) {
          var b = Bb[a.node.wa];
          if (!b) throw new FS.g(43);
          a.D = b;
          a.seekable = !1;
        },
        close: function (a) {
          a.D.oa.Ea(a.D);
        },
        Ea: function (a) {
          a.D.oa.Ea(a.D);
        },
        read: function (a, b, d, e) {
          if (!a.D || !a.D.oa.Gb) throw new FS.g(60);
          for (var f = 0, g = 0; g < e; g++) {
            try {
              var h = a.D.oa.Gb(a.D);
            } catch (k) {
              throw new FS.g(29);
            }
            if (void 0 === h && 0 === f) throw new FS.g(6);
            if (null === h || void 0 === h) break;
            f++;
            b[d + g] = h;
          }
          f && (a.node.timestamp = Date.now());
          return f;
        },
        write: function (a, b, d, e) {
          if (!a.D || !a.D.oa.gb) throw new FS.g(60);
          try {
            for (var f = 0; f < e; f++) a.D.oa.gb(a.D, b[d + f]);
          } catch (g) {
            throw new FS.g(29);
          }
          e && (a.node.timestamp = Date.now());
          return f;
        },
      },
      Eb = {
        Gb: function (a) {
          if (!a.input.length) {
            var b = null;
            "undefined" != typeof window && "function" == typeof window.prompt
              ? ((b = window.prompt("Input: ")), null !== b && (b += "\n"))
              : "function" == typeof readline &&
                ((b = readline()), null !== b && (b += "\n"));
            if (!b) return null;
            a.input = Ab(b, !0);
          }
          return a.input.shift();
        },
        gb: function (a, b) {
          null === b || 10 === b
            ? (pa(ya(a.H, 0)), (a.H = []))
            : 0 != b && a.H.push(b);
        },
        Ea: function (a) {
          a.H && 0 < a.H.length && (pa(ya(a.H, 0)), (a.H = []));
        },
      },
      Fb = {
        gb: function (a, b) {
          null === b || 10 === b
            ? (v(ya(a.H, 0)), (a.H = []))
            : 0 != b && a.H.push(b);
        },
        Ea: function (a) {
          a.H && 0 < a.H.length && (v(ya(a.H, 0)), (a.H = []));
        },
      };
    function Gb(a, b) {
      z.fill(0, a, a + b);
      return a;
    }
    function Hb(a, b) {
      return Math.ceil(a / b) * b;
    }
    function Ib(a) {
      a = Hb(a, 65536);
      var b = Jb(65536, a);
      return b ? Gb(b, a) : 0;
    }
    var M = {
      R: null,
      mount: function () {
        return M.createNode(null, "/", 16895, 0);
      },
      createNode: function (a, b, d, e) {
        if (FS.isBlkdev(d) || FS.Ic(d)) throw new FS.g(63);
        M.R ||
          (M.R = {
            dir: {
              node: {
                N: M.m.N,
                G: M.m.G,
                ea: M.m.ea,
                W: M.m.W,
                rename: M.m.rename,
                unlink: M.m.unlink,
                rmdir: M.m.rmdir,
                xa: M.m.xa,
                symlink: M.m.symlink,
              },
              stream: { llseek: M.s.llseek },
            },
            file: {
              node: { N: M.m.N, G: M.m.G },
              stream: {
                llseek: M.s.llseek,
                read: M.s.read,
                write: M.s.write,
                qa: M.s.qa,
                fa: M.s.fa,
                na: M.s.na,
              },
            },
            link: {
              node: { N: M.m.N, G: M.m.G, readlink: M.m.readlink },
              stream: {},
            },
            sb: { node: { N: M.m.N, G: M.m.G }, stream: FS.hc },
          });
        d = FS.createNode(a, b, d, e);
        FS.isDir(d.mode)
          ? ((d.m = M.R.dir.node), (d.s = M.R.dir.stream), (d.o = {}))
          : FS.isFile(d.mode)
          ? ((d.m = M.R.file.node),
            (d.s = M.R.file.stream),
            (d.B = 0),
            (d.o = null))
          : FS.isLink(d.mode)
          ? ((d.m = M.R.link.node), (d.s = M.R.link.stream))
          : FS.isChrdev(d.mode) && ((d.m = M.R.sb.node), (d.s = M.R.sb.stream));
        d.timestamp = Date.now();
        a && ((a.o[b] = d), (a.timestamp = d.timestamp));
        return d;
      },
      xd: function (a) {
        return a.o
          ? a.o.subarray
            ? a.o.subarray(0, a.B)
            : new Uint8Array(a.o)
          : new Uint8Array(0);
      },
      Bb: function (a, b) {
        var d = a.o ? a.o.length : 0;
        d >= b ||
          ((b = Math.max(b, (d * (1048576 > d ? 2 : 1.125)) >>> 0)),
          0 != d && (b = Math.max(b, 256)),
          (d = a.o),
          (a.o = new Uint8Array(b)),
          0 < a.B && a.o.set(d.subarray(0, a.B), 0));
      },
      $c: function (a, b) {
        if (a.B != b)
          if (0 == b) (a.o = null), (a.B = 0);
          else {
            var d = a.o;
            a.o = new Uint8Array(b);
            d && a.o.set(d.subarray(0, Math.min(b, a.B)));
            a.B = b;
          }
      },
      m: {
        N: function (a) {
          var b = {};
          b.qc = FS.isChrdev(a.mode) ? a.id : 1;
          b.$a = a.id;
          b.mode = a.mode;
          b.Pc = 1;
          b.uid = 0;
          b.Cc = 0;
          b.wa = a.wa;
          FS.isDir(a.mode)
            ? (b.size = 4096)
            : FS.isFile(a.mode)
            ? (b.size = a.B)
            : FS.isLink(a.mode)
            ? (b.size = a.link.length)
            : (b.size = 0);
          b.qb = new Date(a.timestamp);
          b.Ob = new Date(a.timestamp);
          b.vb = new Date(a.timestamp);
          b.cc = 4096;
          b.dc = Math.ceil(b.size / b.cc);
          return b;
        },
        G: function (a, b) {
          void 0 !== b.mode && (a.mode = b.mode);
          void 0 !== b.timestamp && (a.timestamp = b.timestamp);
          void 0 !== b.size && M.$c(a, b.size);
        },
        ea: function () {
          throw FS.Va[44];
        },
        W: function (a, b, d, e) {
          return M.createNode(a, b, d, e);
        },
        rename: function (a, b, d) {
          if (FS.isDir(a.mode)) {
            try {
              var e = FS.V(b, d);
            } catch (g) {}
            if (e) for (var f in e.o) throw new FS.g(55);
          }
          delete a.parent.o[a.name];
          a.parent.timestamp = Date.now();
          a.name = d;
          b.o[d] = a;
          b.timestamp = a.parent.timestamp;
          a.parent = b;
        },
        unlink: function (a, b) {
          delete a.o[b];
          a.timestamp = Date.now();
        },
        rmdir: function (a, b) {
          var d = FS.V(a, b),
            e;
          for (e in d.o) throw new FS.g(55);
          delete a.o[b];
          a.timestamp = Date.now();
        },
        xa: function (a) {
          var b = [".", ".."],
            d;
          for (d in a.o) a.o.hasOwnProperty(d) && b.push(d);
          return b;
        },
        symlink: function (a, b, d) {
          a = M.createNode(a, b, 41471, 0);
          a.link = d;
          return a;
        },
        readlink: function (a) {
          if (!FS.isLink(a.mode)) throw new FS.g(28);
          return a.link;
        },
      },
      s: {
        read: function (a, b, d, e, f) {
          var g = a.node.o;
          if (f >= a.node.B) return 0;
          a = Math.min(a.node.B - f, e);
          if (8 < a && g.subarray) b.set(g.subarray(f, f + a), d);
          else for (e = 0; e < a; e++) b[d + e] = g[f + e];
          return a;
        },
        write: function (a, b, d, e, f, g) {
          if (!e) return 0;
          a = a.node;
          a.timestamp = Date.now();
          if (b.subarray && (!a.o || a.o.subarray)) {
            if (g) return (a.o = b.subarray(d, d + e)), (a.B = e);
            if (0 === a.B && 0 === f)
              return (a.o = b.slice(d, d + e)), (a.B = e);
            if (f + e <= a.B) return a.o.set(b.subarray(d, d + e), f), e;
          }
          M.Bb(a, f + e);
          if (a.o.subarray && b.subarray) a.o.set(b.subarray(d, d + e), f);
          else for (g = 0; g < e; g++) a.o[f + g] = b[d + g];
          a.B = Math.max(a.B, f + e);
          return e;
        },
        llseek: function (a, b, d) {
          1 === d
            ? (b += a.position)
            : 2 === d && FS.isFile(a.node.mode) && (b += a.node.B);
          if (0 > b) throw new FS.g(28);
          return b;
        },
        qa: function (a, b, d) {
          M.Bb(a.node, b + d);
          a.node.B = Math.max(a.node.B, b + d);
        },
        fa: function (a, b, d, e, f) {
          if (!FS.isFile(a.node.mode)) throw new FS.g(43);
          a = a.node.o;
          if (f & 2 || a.buffer !== Ba) {
            if (0 < d || d + b < a.length)
              a.subarray
                ? (a = a.subarray(d, d + b))
                : (a = Array.prototype.slice.call(a, d, d + b));
            d = !0;
            b = Ib(b);
            if (!b) throw new FS.g(48);
            A.set(a, b);
          } else (d = !1), (b = a.byteOffset);
          return { v: b, ob: d };
        },
        na: function (a, b, d, e) {
          M.s.write(a, b, 0, e, d, !1);
          return 0;
        },
      },
    };
    function Kb(a, b, d) {
      var e = "al " + a;
      na(
        a,
        (f) => {
          f || x('Loading data file "' + a + '" failed (no arrayBuffer).');
          b(new Uint8Array(f));
          e && cb(e);
        },
        () => {
          if (d) d();
          else throw 'Loading data file "' + a + '" failed.';
        }
      );
      e && bb(e);
    }
    var FS = {
      root: null,
      ta: [],
      zb: {},
      streams: [],
      Nc: 1,
      P: null,
      xb: "/",
      Za: !1,
      Jb: !0,
      g: null,
      Va: {},
      uc: null,
      Na: 0,
      lookupPath: (a, b = {}) => {
        a = yb(a);
        if (!a) return { path: "", node: null };
        b = Object.assign({ Ta: !0, jb: 0 }, b);
        if (8 < b.jb) throw new FS.g(32);
        a = a.split("/").filter((h) => !!h);
        for (var d = FS.root, e = "/", f = 0; f < a.length; f++) {
          var g = f === a.length - 1;
          if (g && b.parent) break;
          d = FS.V(d, a[f]);
          e = J(e + "/" + a[f]);
          FS.da(d) && (!g || (g && b.Ta)) && (d = d.sa.root);
          if (!g || b.follow)
            for (g = 0; FS.isLink(d.mode); )
              if (
                ((d = FS.readlink(e)),
                (e = yb(ub(e), d)),
                (d = FS.lookupPath(e, { jb: b.jb + 1 }).node),
                40 < g++)
              )
                throw new FS.g(32);
        }
        return { path: e, node: d };
      },
      getPath: (a) => {
        for (var b; ; ) {
          if (FS.Ia(a))
            return (
              (a = a.mount.Nb),
              b ? ("/" !== a[a.length - 1] ? a + "/" + b : a + b) : a
            );
          b = b ? a.name + "/" + b : a.name;
          a = a.parent;
        }
      },
      Ya: (a, b) => {
        for (var d = 0, e = 0; e < b.length; e++)
          d = ((d << 5) - d + b.charCodeAt(e)) | 0;
        return ((a + d) >>> 0) % FS.P.length;
      },
      Hb: (a) => {
        var b = FS.Ya(a.parent.id, a.name);
        a.ga = FS.P[b];
        FS.P[b] = a;
      },
      Ib: (a) => {
        var b = FS.Ya(a.parent.id, a.name);
        if (FS.P[b] === a) FS.P[b] = a.ga;
        else
          for (b = FS.P[b]; b; ) {
            if (b.ga === a) {
              b.ga = a.ga;
              break;
            }
            b = b.ga;
          }
      },
      V: (a, b) => {
        var d = FS.Kc(a);
        if (d) throw new FS.g(d, a);
        for (d = FS.P[FS.Ya(a.id, b)]; d; d = d.ga) {
          var e = d.name;
          if (d.parent.id === a.id && e === b) return d;
        }
        return FS.ea(a, b);
      },
      createNode: (a, b, d, e) => {
        a = new FS.Yb(a, b, d, e);
        FS.Hb(a);
        return a;
      },
      Ra: (a) => {
        FS.Ib(a);
      },
      Ia: (a) => a === a.parent,
      da: (a) => !!a.sa,
      isFile: (a) => 32768 === (a & 61440),
      isDir: (a) => 16384 === (a & 61440),
      isLink: (a) => 40960 === (a & 61440),
      isChrdev: (a) => 8192 === (a & 61440),
      isBlkdev: (a) => 24576 === (a & 61440),
      Ic: (a) => 4096 === (a & 61440),
      isSocket: (a) => 49152 === (a & 49152),
      vc: { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 },
      Mc: (a) => {
        var b = FS.vc[a];
        if ("undefined" == typeof b)
          throw Error("Unknown file open mode: " + a);
        return b;
      },
      Eb: (a) => {
        var b = ["r", "w", "rw"][a & 3];
        a & 512 && (b += "w");
        return b;
      },
      aa: (a, b) => {
        if (FS.Jb) return 0;
        if (!b.includes("r") || a.mode & 292) {
          if (
            (b.includes("w") && !(a.mode & 146)) ||
            (b.includes("x") && !(a.mode & 73))
          )
            return 2;
        } else return 2;
        return 0;
      },
      Kc: (a) => {
        var b = FS.aa(a, "x");
        return b ? b : a.m.ea ? 0 : 2;
      },
      fb: (a, b) => {
        try {
          return FS.V(a, b), 20;
        } catch (d) {}
        return FS.aa(a, "wx");
      },
      Ka: (a, b, d) => {
        try {
          var e = FS.V(a, b);
        } catch (f) {
          return f.A;
        }
        if ((a = FS.aa(a, "wx"))) return a;
        if (d) {
          if (!FS.isDir(e.mode)) return 54;
          if (FS.Ia(e) || FS.getPath(e) === FS.cwd()) return 10;
        } else if (FS.isDir(e.mode)) return 31;
        return 0;
      },
      Lc: (a, b) =>
        a
          ? FS.isLink(a.mode)
            ? 32
            : FS.isDir(a.mode) && ("r" !== FS.Eb(b) || b & 512)
            ? 31
            : FS.aa(a, FS.Eb(b))
          : 44,
      Zb: 4096,
      Oc: (a = 0, b = FS.Zb) => {
        for (; a <= b; a++) if (!FS.streams[a]) return a;
        throw new FS.g(33);
      },
      ma: (a) => FS.streams[a],
      Qa: (a, b, d) => {
        FS.Ca ||
          ((FS.Ca = function () {
            this.U = {};
          }),
          (FS.Ca.prototype = {}),
          Object.defineProperties(FS.Ca.prototype, {
            object: {
              get: function () {
                return this.node;
              },
              set: function (e) {
                this.node = e;
              },
            },
            flags: {
              get: function () {
                return this.U.flags;
              },
              set: function (e) {
                this.U.flags = e;
              },
            },
            position: {
              get: function () {
                return this.U.position;
              },
              set: function (e) {
                this.U.position = e;
              },
            },
          }));
        a = Object.assign(new FS.Ca(), a);
        b = FS.Oc(b, d);
        a.la = b;
        return (FS.streams[b] = a);
      },
      ic: (a) => {
        FS.streams[a] = null;
      },
      hc: {
        open: (a) => {
          a.s = FS.xc(a.node.wa).s;
          a.s.open && a.s.open(a);
        },
        llseek: () => {
          throw new FS.g(70);
        },
      },
      eb: (a) => a >> 8,
      Bd: (a) => a & 255,
      makedev: (a, b) => (a << 8) | b,
      registerDevice: (a, b) => {
        FS.zb[a] = { s: b };
      },
      xc: (a) => FS.zb[a],
      Fb: (a) => {
        var b = [];
        for (a = [a]; a.length; ) {
          var d = a.pop();
          b.push(d);
          a.push.apply(a, d.ta);
        }
        return b;
      },
      syncfs: (a, b) => {
        function d(h) {
          FS.Na--;
          return b(h);
        }
        function e(h) {
          if (h) {
            if (!e.sc) return (e.sc = !0), d(h);
          } else ++g >= f.length && d(null);
        }
        "function" == typeof a && ((b = a), (a = !1));
        FS.Na++;
        1 < FS.Na &&
          v(
            "warning: " +
              FS.Na +
              " FS.syncfs operations in flight at once, probably just doing extra work"
          );
        var f = FS.Fb(FS.root.mount),
          g = 0;
        f.forEach((h) => {
          if (!h.type.syncfs) return e(null);
          h.type.syncfs(h, a, e);
        });
      },
      mount: (a, b, d) => {
        var e = "/" === d,
          f = !d;
        if (e && FS.root) throw new FS.g(10);
        if (!e && !f) {
          var g = FS.lookupPath(d, { Ta: !1 });
          d = g.path;
          g = g.node;
          if (FS.da(g)) throw new FS.g(10);
          if (!FS.isDir(g.mode)) throw new FS.g(54);
        }
        b = { type: a, Hd: b, Nb: d, ta: [] };
        a = a.mount(b);
        a.mount = b;
        b.root = a;
        e ? (FS.root = a) : g && ((g.sa = b), g.mount && g.mount.ta.push(b));
        return a;
      },
      unmount: (a) => {
        a = FS.lookupPath(a, { Ta: !1 });
        if (!FS.da(a.node)) throw new FS.g(28);
        a = a.node;
        var b = a.sa,
          d = FS.Fb(b);
        Object.keys(FS.P).forEach((e) => {
          for (e = FS.P[e]; e; ) {
            var f = e.ga;
            d.includes(e.mount) && FS.Ra(e);
            e = f;
          }
        });
        a.sa = null;
        a.mount.ta.splice(a.mount.ta.indexOf(b), 1);
      },
      ea: (a, b) => a.m.ea(a, b),
      W: (a, b, d) => {
        var e = FS.lookupPath(a, { parent: !0 }).node;
        a = vb(a);
        if (!a || "." === a || ".." === a) throw new FS.g(28);
        var f = FS.fb(e, a);
        if (f) throw new FS.g(f);
        if (!e.m.W) throw new FS.g(63);
        return e.m.W(e, a, b, d);
      },
      create: (a, b) => FS.W(a, ((void 0 !== b ? b : 438) & 4095) | 32768, 0),
      mkdir: (a, b) => FS.W(a, ((void 0 !== b ? b : 511) & 1023) | 16384, 0),
      Cd: (a, b) => {
        a = a.split("/");
        for (var d = "", e = 0; e < a.length; ++e)
          if (a[e]) {
            d += "/" + a[e];
            try {
              FS.mkdir(d, b);
            } catch (f) {
              if (20 != f.A) throw f;
            }
          }
      },
      mkdev: (a, b, d) => {
        "undefined" == typeof d && ((d = b), (b = 438));
        return FS.W(a, b | 8192, d);
      },
      symlink: (a, b) => {
        if (!yb(a)) throw new FS.g(44);
        var d = FS.lookupPath(b, { parent: !0 }).node;
        if (!d) throw new FS.g(44);
        b = vb(b);
        var e = FS.fb(d, b);
        if (e) throw new FS.g(e);
        if (!d.m.symlink) throw new FS.g(63);
        return d.m.symlink(d, b, a);
      },
      rename: (a, b) => {
        var d = ub(a),
          e = ub(b),
          f = vb(a),
          g = vb(b);
        var h = FS.lookupPath(a, { parent: !0 });
        var k = h.node;
        h = FS.lookupPath(b, { parent: !0 });
        h = h.node;
        if (!k || !h) throw new FS.g(44);
        if (k.mount !== h.mount) throw new FS.g(75);
        var l = FS.V(k, f);
        a = zb(a, e);
        if ("." !== a.charAt(0)) throw new FS.g(28);
        a = zb(b, d);
        if ("." !== a.charAt(0)) throw new FS.g(55);
        try {
          var p = FS.V(h, g);
        } catch (n) {}
        if (l !== p) {
          b = FS.isDir(l.mode);
          if ((f = FS.Ka(k, f, b))) throw new FS.g(f);
          if ((f = p ? FS.Ka(h, g, b) : FS.fb(h, g))) throw new FS.g(f);
          if (!k.m.rename) throw new FS.g(63);
          if (FS.da(l) || (p && FS.da(p))) throw new FS.g(10);
          if (h !== k && (f = FS.aa(k, "w"))) throw new FS.g(f);
          FS.Ib(l);
          try {
            k.m.rename(l, h, g);
          } catch (n) {
            throw n;
          } finally {
            FS.Hb(l);
          }
        }
      },
      rmdir: (a) => {
        var b = FS.lookupPath(a, { parent: !0 }).node;
        a = vb(a);
        var d = FS.V(b, a),
          e = FS.Ka(b, a, !0);
        if (e) throw new FS.g(e);
        if (!b.m.rmdir) throw new FS.g(63);
        if (FS.da(d)) throw new FS.g(10);
        b.m.rmdir(b, a);
        FS.Ra(d);
      },
      xa: (a) => {
        a = FS.lookupPath(a, { follow: !0 }).node;
        if (!a.m.xa) throw new FS.g(54);
        return a.m.xa(a);
      },
      unlink: (a) => {
        var b = FS.lookupPath(a, { parent: !0 }).node;
        if (!b) throw new FS.g(44);
        a = vb(a);
        var d = FS.V(b, a),
          e = FS.Ka(b, a, !1);
        if (e) throw new FS.g(e);
        if (!b.m.unlink) throw new FS.g(63);
        if (FS.da(d)) throw new FS.g(10);
        b.m.unlink(b, a);
        FS.Ra(d);
      },
      readlink: (a) => {
        a = FS.lookupPath(a).node;
        if (!a) throw new FS.g(44);
        if (!a.m.readlink) throw new FS.g(28);
        return yb(FS.getPath(a.parent), a.m.readlink(a));
      },
      stat: (a, b) => {
        a = FS.lookupPath(a, { follow: !b }).node;
        if (!a) throw new FS.g(44);
        if (!a.m.N) throw new FS.g(63);
        return a.m.N(a);
      },
      lstat: (a) => FS.stat(a, !0),
      chmod: (a, b, d) => {
        a = "string" == typeof a ? FS.lookupPath(a, { follow: !d }).node : a;
        if (!a.m.G) throw new FS.g(63);
        a.m.G(a, {
          mode: (b & 4095) | (a.mode & -4096),
          timestamp: Date.now(),
        });
      },
      lchmod: (a, b) => {
        FS.chmod(a, b, !0);
      },
      fchmod: (a, b) => {
        a = FS.ma(a);
        if (!a) throw new FS.g(8);
        FS.chmod(a.node, b);
      },
      chown: (a, b, d, e) => {
        a = "string" == typeof a ? FS.lookupPath(a, { follow: !e }).node : a;
        if (!a.m.G) throw new FS.g(63);
        a.m.G(a, { timestamp: Date.now() });
      },
      lchown: (a, b, d) => {
        FS.chown(a, b, d, !0);
      },
      fchown: (a, b, d) => {
        a = FS.ma(a);
        if (!a) throw new FS.g(8);
        FS.chown(a.node, b, d);
      },
      truncate: (a, b) => {
        if (0 > b) throw new FS.g(28);
        a = "string" == typeof a ? FS.lookupPath(a, { follow: !0 }).node : a;
        if (!a.m.G) throw new FS.g(63);
        if (FS.isDir(a.mode)) throw new FS.g(31);
        if (!FS.isFile(a.mode)) throw new FS.g(28);
        var d = FS.aa(a, "w");
        if (d) throw new FS.g(d);
        a.m.G(a, { size: b, timestamp: Date.now() });
      },
      ftruncate: (a, b) => {
        a = FS.ma(a);
        if (!a) throw new FS.g(8);
        if (0 === (a.flags & 2097155)) throw new FS.g(28);
        FS.truncate(a.node, b);
      },
      utime: (a, b, d) => {
        a = FS.lookupPath(a, { follow: !0 }).node;
        a.m.G(a, { timestamp: Math.max(b, d) });
      },
      open: (a, b, d) => {
        if ("" === a) throw new FS.g(44);
        b = "string" == typeof b ? FS.Mc(b) : b;
        d = b & 64 ? (("undefined" == typeof d ? 438 : d) & 4095) | 32768 : 0;
        if ("object" == typeof a) var e = a;
        else {
          a = J(a);
          try {
            e = FS.lookupPath(a, { follow: !(b & 131072) }).node;
          } catch (g) {}
        }
        var f = !1;
        if (b & 64)
          if (e) {
            if (b & 128) throw new FS.g(20);
          } else (e = FS.W(a, d, 0)), (f = !0);
        if (!e) throw new FS.g(44);
        FS.isChrdev(e.mode) && (b &= -513);
        if (b & 65536 && !FS.isDir(e.mode)) throw new FS.g(54);
        if (!f && (d = FS.Lc(e, b))) throw new FS.g(d);
        b & 512 && !f && FS.truncate(e, 0);
        b &= -131713;
        e = FS.Qa({
          node: e,
          path: FS.getPath(e),
          flags: b,
          seekable: !0,
          position: 0,
          s: e.s,
          od: [],
          error: !1,
        });
        e.s.open && e.s.open(e);
        !c.logReadFiles ||
          b & 1 ||
          (FS.ib || (FS.ib = {}), a in FS.ib || (FS.ib[a] = 1));
        return e;
      },
      close: (a) => {
        if (FS.ra(a)) throw new FS.g(8);
        a.Xa && (a.Xa = null);
        try {
          a.s.close && a.s.close(a);
        } catch (b) {
          throw b;
        } finally {
          FS.ic(a.la);
        }
        a.la = null;
      },
      ra: (a) => null === a.la,
      llseek: (a, b, d) => {
        if (FS.ra(a)) throw new FS.g(8);
        if (!a.seekable || !a.s.llseek) throw new FS.g(70);
        if (0 != d && 1 != d && 2 != d) throw new FS.g(28);
        a.position = a.s.llseek(a, b, d);
        a.od = [];
        return a.position;
      },
      read: (a, b, d, e, f) => {
        if (0 > e || 0 > f) throw new FS.g(28);
        if (FS.ra(a)) throw new FS.g(8);
        if (1 === (a.flags & 2097155)) throw new FS.g(8);
        if (FS.isDir(a.node.mode)) throw new FS.g(31);
        if (!a.s.read) throw new FS.g(28);
        var g = "undefined" != typeof f;
        if (!g) f = a.position;
        else if (!a.seekable) throw new FS.g(70);
        b = a.s.read(a, b, d, e, f);
        g || (a.position += b);
        return b;
      },
      write: (a, b, d, e, f, g) => {
        if (0 > e || 0 > f) throw new FS.g(28);
        if (FS.ra(a)) throw new FS.g(8);
        if (0 === (a.flags & 2097155)) throw new FS.g(8);
        if (FS.isDir(a.node.mode)) throw new FS.g(31);
        if (!a.s.write) throw new FS.g(28);
        a.seekable && a.flags & 1024 && FS.llseek(a, 0, 2);
        var h = "undefined" != typeof f;
        if (!h) f = a.position;
        else if (!a.seekable) throw new FS.g(70);
        b = a.s.write(a, b, d, e, f, g);
        h || (a.position += b);
        return b;
      },
      qa: (a, b, d) => {
        if (FS.ra(a)) throw new FS.g(8);
        if (0 > b || 0 >= d) throw new FS.g(28);
        if (0 === (a.flags & 2097155)) throw new FS.g(8);
        if (!FS.isFile(a.node.mode) && !FS.isDir(a.node.mode))
          throw new FS.g(43);
        if (!a.s.qa) throw new FS.g(138);
        a.s.qa(a, b, d);
      },
      fa: (a, b, d, e, f) => {
        if (0 !== (e & 2) && 0 === (f & 2) && 2 !== (a.flags & 2097155))
          throw new FS.g(2);
        if (1 === (a.flags & 2097155)) throw new FS.g(2);
        if (!a.s.fa) throw new FS.g(43);
        return a.s.fa(a, b, d, e, f);
      },
      na: (a, b, d, e, f) => (a.s.na ? a.s.na(a, b, d, e, f) : 0),
      Dd: () => 0,
      ab: (a, b, d) => {
        if (!a.s.ab) throw new FS.g(59);
        return a.s.ab(a, b, d);
      },
      readFile: (a, b = {}) => {
        b.flags = b.flags || 0;
        b.encoding = b.encoding || "binary";
        if ("utf8" !== b.encoding && "binary" !== b.encoding)
          throw Error('Invalid encoding type "' + b.encoding + '"');
        var d,
          e = FS.open(a, b.flags);
        a = FS.stat(a).size;
        var f = new Uint8Array(a);
        FS.read(e, f, 0, a, 0);
        "utf8" === b.encoding
          ? (d = ya(f, 0))
          : "binary" === b.encoding && (d = f);
        FS.close(e);
        return d;
      },
      writeFile: (a, b, d = {}) => {
        d.flags = d.flags || 577;
        a = FS.open(a, d.flags, d.mode);
        if ("string" == typeof b) {
          var e = new Uint8Array(Aa(b) + 1);
          b = za(b, e, 0, e.length);
          FS.write(a, e, 0, b, void 0, d.fc);
        } else if (ArrayBuffer.isView(b))
          FS.write(a, b, 0, b.byteLength, void 0, d.fc);
        else throw Error("Unsupported data type");
        FS.close(a);
      },
      cwd: () => FS.xb,
      chdir: (a) => {
        a = FS.lookupPath(a, { follow: !0 });
        if (null === a.node) throw new FS.g(44);
        if (!FS.isDir(a.node.mode)) throw new FS.g(54);
        var b = FS.aa(a.node, "x");
        if (b) throw new FS.g(b);
        FS.xb = a.path;
      },
      lc: () => {
        FS.mkdir("/tmp");
        FS.mkdir("/home");
        FS.mkdir("/home/web_user");
      },
      kc: () => {
        FS.mkdir("/dev");
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (b, d, e, f) => f,
        });
        FS.mkdev("/dev/null", FS.makedev(1, 3));
        Cb(FS.makedev(5, 0), Eb);
        Cb(FS.makedev(6, 0), Fb);
        FS.mkdev("/dev/tty", FS.makedev(5, 0));
        FS.mkdev("/dev/tty1", FS.makedev(6, 0));
        var a = xb();
        FS.M("/dev", "random", a);
        FS.M("/dev", "urandom", a);
        FS.mkdir("/dev/shm");
        FS.mkdir("/dev/shm/tmp");
      },
      nc: () => {
        FS.mkdir("/proc");
        var a = FS.mkdir("/proc/self");
        FS.mkdir("/proc/self/fd");
        FS.mount(
          {
            mount: () => {
              var b = FS.createNode(a, "fd", 16895, 73);
              b.m = {
                ea: (d, e) => {
                  var f = FS.ma(+e);
                  if (!f) throw new FS.g(8);
                  d = {
                    parent: null,
                    mount: { Nb: "fake" },
                    m: { readlink: () => f.path },
                  };
                  return (d.parent = d);
                },
              };
              return b;
            },
          },
          {},
          "/proc/self/fd"
        );
      },
      oc: () => {
        c.stdin
          ? FS.M("/dev", "stdin", c.stdin)
          : FS.symlink("/dev/tty", "/dev/stdin");
        c.stdout
          ? FS.M("/dev", "stdout", null, c.stdout)
          : FS.symlink("/dev/tty", "/dev/stdout");
        c.stderr
          ? FS.M("/dev", "stderr", null, c.stderr)
          : FS.symlink("/dev/tty1", "/dev/stderr");
        FS.open("/dev/stdin", 0);
        FS.open("/dev/stdout", 1);
        FS.open("/dev/stderr", 1);
      },
      Ab: () => {
        FS.g ||
          ((FS.g = function (a, b) {
            this.node = b;
            this.ad = function (d) {
              this.A = d;
            };
            this.ad(a);
            this.message = "FS error";
          }),
          (FS.g.prototype = Error()),
          (FS.g.prototype.constructor = FS.g),
          [44].forEach((a) => {
            FS.Va[a] = new FS.g(a);
            FS.Va[a].stack = "<generic error, no stack>";
          }));
      },
      gd: () => {
        FS.Ab();
        FS.P = Array(4096);
        FS.mount(M, {}, "/");
        FS.lc();
        FS.kc();
        FS.nc();
        FS.uc = { MEMFS: M };
      },
      init: (a, b, d) => {
        FS.init.Za = !0;
        FS.Ab();
        c.stdin = a || c.stdin;
        c.stdout = b || c.stdout;
        c.stderr = d || c.stderr;
        FS.oc();
      },
      Xc: () => {
        FS.init.Za = !1;
        Lb(0);
        for (var a = 0; a < FS.streams.length; a++) {
          var b = FS.streams[a];
          b && FS.close(b);
        }
      },
      Wa: (a, b) => {
        var d = 0;
        a && (d |= 365);
        b && (d |= 146);
        return d;
      },
      Db: (a, b) => {
        a = FS.analyzePath(a, b);
        return a.Sa ? a.object : null;
      },
      analyzePath: (a, b) => {
        try {
          var d = FS.lookupPath(a, { follow: !b });
          a = d.path;
        } catch (f) {}
        var e = {
          Ia: !1,
          Sa: !1,
          error: 0,
          name: null,
          path: null,
          object: null,
          Qc: !1,
          Sc: null,
          Rc: null,
        };
        try {
          (d = FS.lookupPath(a, { parent: !0 })),
            (e.Qc = !0),
            (e.Sc = d.path),
            (e.Rc = d.node),
            (e.name = vb(a)),
            (d = FS.lookupPath(a, { follow: !b })),
            (e.Sa = !0),
            (e.path = d.path),
            (e.object = d.node),
            (e.name = d.node.name),
            (e.Ia = "/" === d.path);
        } catch (f) {
          e.error = f.A;
        }
        return e;
      },
      ub: (a, b) => {
        a = "string" == typeof a ? a : FS.getPath(a);
        for (b = b.split("/").reverse(); b.length; ) {
          var d = b.pop();
          if (d) {
            var e = J(a + "/" + d);
            try {
              FS.mkdir(e);
            } catch (f) {}
            a = e;
          }
        }
        return e;
      },
      mc: (a, b, d, e, f) => {
        a = "string" == typeof a ? a : FS.getPath(a);
        b = J(a + "/" + b);
        return FS.create(b, FS.Wa(e, f));
      },
      Da: (a, b, d, e, f, g) => {
        var h = b;
        a &&
          ((a = "string" == typeof a ? a : FS.getPath(a)),
          (h = b ? J(a + "/" + b) : a));
        a = FS.Wa(e, f);
        h = FS.create(h, a);
        if (d) {
          if ("string" == typeof d) {
            b = Array(d.length);
            e = 0;
            for (f = d.length; e < f; ++e) b[e] = d.charCodeAt(e);
            d = b;
          }
          FS.chmod(h, a | 146);
          b = FS.open(h, 577);
          FS.write(b, d, 0, d.length, 0, g);
          FS.close(b);
          FS.chmod(h, a);
        }
        return h;
      },
      M: (a, b, d, e) => {
        a = wb("string" == typeof a ? a : FS.getPath(a), b);
        b = FS.Wa(!!d, !!e);
        FS.M.eb || (FS.M.eb = 64);
        var f = FS.makedev(FS.M.eb++, 0);
        FS.registerDevice(f, {
          open: (g) => {
            g.seekable = !1;
          },
          close: () => {
            e && e.buffer && e.buffer.length && e(10);
          },
          read: (g, h, k, l) => {
            for (var p = 0, n = 0; n < l; n++) {
              try {
                var q = d();
              } catch (r) {
                throw new FS.g(29);
              }
              if (void 0 === q && 0 === p) throw new FS.g(6);
              if (null === q || void 0 === q) break;
              p++;
              h[k + n] = q;
            }
            p && (g.node.timestamp = Date.now());
            return p;
          },
          write: (g, h, k, l) => {
            for (var p = 0; p < l; p++)
              try {
                e(h[k + p]);
              } catch (n) {
                throw new FS.g(29);
              }
            l && (g.node.timestamp = Date.now());
            return p;
          },
        });
        return FS.mkdev(a, b, f);
      },
      Ua: (a) => {
        if (a.Ha || a.Kb || a.link || a.o) return !0;
        if ("undefined" != typeof XMLHttpRequest)
          throw Error(
            "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
          );
        if (ma)
          try {
            (a.o = Ab(ma(a.url), !0)), (a.B = a.o.length);
          } catch (b) {
            throw new FS.g(29);
          }
        else throw Error("Cannot load without read() or XMLHttpRequest.");
      },
      createLazyFile: (a, b, d, e, f) => {
        function g() {
          this.cb = !1;
          this.U = [];
        }
        function h(n, q, r, m, t) {
          n = n.node.o;
          if (t >= n.length) return 0;
          m = Math.min(n.length - t, m);
          if (n.slice) for (var w = 0; w < m; w++) q[r + w] = n[t + w];
          else for (w = 0; w < m; w++) q[r + w] = n.get(t + w);
          return m;
        }
        g.prototype.get = function (n) {
          if (!(n > this.length - 1 || 0 > n)) {
            var q = n % this.tb;
            return this.Fa((n / this.tb) | 0)[q];
          }
        };
        g.prototype.Dc = function (n) {
          this.Fa = n;
        };
        g.prototype.rb = function () {
          var n = new XMLHttpRequest();
          n.open("HEAD", d, !1);
          n.send(null);
          if (!((200 <= n.status && 300 > n.status) || 304 === n.status))
            throw Error("Couldn't load " + d + ". Status: " + n.status);
          var q = Number(n.getResponseHeader("Content-length")),
            r,
            m = (r = n.getResponseHeader("Accept-Ranges")) && "bytes" === r;
          n = (r = n.getResponseHeader("Content-Encoding")) && "gzip" === r;
          var t = 1048576;
          m || (t = q);
          var w = this;
          w.Dc((C) => {
            var K = C * t,
              L = (C + 1) * t - 1;
            L = Math.min(L, q - 1);
            if ("undefined" == typeof w.U[C]) {
              var va = w.U;
              if (K > L)
                throw Error(
                  "invalid range (" + K + ", " + L + ") or no bytes requested!"
                );
              if (L > q - 1)
                throw Error(
                  "only " + q + " bytes available! programmer error!"
                );
              var P = new XMLHttpRequest();
              P.open("GET", d, !1);
              q !== t && P.setRequestHeader("Range", "bytes=" + K + "-" + L);
              P.responseType = "arraybuffer";
              P.overrideMimeType &&
                P.overrideMimeType("text/plain; charset=x-user-defined");
              P.send(null);
              if (!((200 <= P.status && 300 > P.status) || 304 === P.status))
                throw Error("Couldn't load " + d + ". Status: " + P.status);
              K =
                void 0 !== P.response
                  ? new Uint8Array(P.response || [])
                  : Ab(P.responseText || "", !0);
              va[C] = K;
            }
            if ("undefined" == typeof w.U[C]) throw Error("doXHR failed!");
            return w.U[C];
          });
          if (n || !q)
            (t = q = 1),
              (t = q = this.Fa(0).length),
              pa(
                "LazyFiles on gzip forces download of the whole file when length is accessed"
              );
          this.ac = q;
          this.$b = t;
          this.cb = !0;
        };
        if ("undefined" != typeof XMLHttpRequest) {
          if (!ia)
            throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
          var k = new g();
          Object.defineProperties(k, {
            length: {
              get: function () {
                this.cb || this.rb();
                return this.ac;
              },
            },
            tb: {
              get: function () {
                this.cb || this.rb();
                return this.$b;
              },
            },
          });
          k = { Ha: !1, o: k };
        } else k = { Ha: !1, url: d };
        var l = FS.mc(a, b, k, e, f);
        k.o ? (l.o = k.o) : k.url && ((l.o = null), (l.url = k.url));
        Object.defineProperties(l, {
          B: {
            get: function () {
              return this.o.length;
            },
          },
        });
        var p = {};
        Object.keys(l.s).forEach((n) => {
          var q = l.s[n];
          p[n] = function () {
            FS.Ua(l);
            return q.apply(null, arguments);
          };
        });
        p.read = (n, q, r, m, t) => {
          FS.Ua(l);
          return h(n, q, r, m, t);
        };
        p.fa = (n, q, r) => {
          FS.Ua(l);
          var m = Ib(q);
          if (!m) throw new FS.g(48);
          h(n, A, m, q, r);
          return { v: m, ob: !0 };
        };
        l.s = p;
        return l;
      },
      createPreloadedFile: (a, b, d, e, f, g, h, k, l, p) => {
        function n(m) {
          function t(w) {
            p && p();
            k || FS.Da(a, b, w, e, f, l);
            g && g();
            cb(r);
          }
          Mb(m, q, t, () => {
            h && h();
            cb(r);
          }) || t(m);
        }
        var q = b ? yb(J(a + "/" + b)) : a,
          r = "cp " + q;
        bb(r);
        "string" == typeof d ? Kb(d, (m) => n(m), h) : n(d);
      },
      indexedDB: () =>
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB,
      lb: () => "EM_FS_" + window.location.pathname,
      mb: 20,
      pa: "FILE_DATA",
      Id: (a, b, d) => {
        b = b || (() => {});
        d = d || (() => {});
        var e = FS.indexedDB();
        try {
          var f = e.open(FS.lb(), FS.mb);
        } catch (g) {
          return d(g);
        }
        f.onupgradeneeded = () => {
          pa("creating db");
          f.result.createObjectStore(FS.pa);
        };
        f.onsuccess = () => {
          var g = f.result.transaction([FS.pa], "readwrite"),
            h = g.objectStore(FS.pa),
            k = 0,
            l = 0,
            p = a.length;
          a.forEach((n) => {
            n = h.put(FS.analyzePath(n).object.o, n);
            n.onsuccess = () => {
              k++;
              k + l == p && (0 == l ? b() : d());
            };
            n.onerror = () => {
              l++;
              k + l == p && (0 == l ? b() : d());
            };
          });
          g.onerror = d;
        };
        f.onerror = d;
      },
      yd: (a, b, d) => {
        b = b || (() => {});
        d = d || (() => {});
        var e = FS.indexedDB();
        try {
          var f = e.open(FS.lb(), FS.mb);
        } catch (g) {
          return d(g);
        }
        f.onupgradeneeded = d;
        f.onsuccess = () => {
          var g = f.result;
          try {
            var h = g.transaction([FS.pa], "readonly");
          } catch (q) {
            d(q);
            return;
          }
          var k = h.objectStore(FS.pa),
            l = 0,
            p = 0,
            n = a.length;
          a.forEach((q) => {
            var r = k.get(q);
            r.onsuccess = () => {
              FS.analyzePath(q).Sa && FS.unlink(q);
              FS.Da(ub(q), vb(q), r.result, !0, !0, !0);
              l++;
              l + p == n && (0 == p ? b() : d());
            };
            r.onerror = () => {
              p++;
              l + p == n && (0 == p ? b() : d());
            };
          });
          h.onerror = d;
        };
        f.onerror = d;
      },
    };
    function Nb(a, b, d) {
      if ("/" === b.charAt(0)) return b;
      a = -100 === a ? FS.cwd() : N(a).path;
      if (0 == b.length) {
        if (!d) throw new FS.g(44);
        return a;
      }
      return J(a + "/" + b);
    }
    function Ob(a, b, d) {
      try {
        var e = a(b);
      } catch (f) {
        if (f && f.node && J(b) !== J(FS.getPath(f.node))) return -54;
        throw f;
      }
      B[d >> 2] = e.qc;
      B[(d + 8) >> 2] = e.$a;
      B[(d + 12) >> 2] = e.mode;
      D[(d + 16) >> 2] = e.Pc;
      B[(d + 20) >> 2] = e.uid;
      B[(d + 24) >> 2] = e.Cc;
      B[(d + 28) >> 2] = e.wa;
      I = [
        e.size >>> 0,
        ((H = e.size),
        1 <= +Math.abs(H)
          ? 0 < H
            ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0
            : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      B[(d + 40) >> 2] = I[0];
      B[(d + 44) >> 2] = I[1];
      B[(d + 48) >> 2] = 4096;
      B[(d + 52) >> 2] = e.dc;
      I = [
        Math.floor(e.qb.getTime() / 1e3) >>> 0,
        ((H = Math.floor(e.qb.getTime() / 1e3)),
        1 <= +Math.abs(H)
          ? 0 < H
            ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0
            : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      B[(d + 56) >> 2] = I[0];
      B[(d + 60) >> 2] = I[1];
      D[(d + 64) >> 2] = 0;
      I = [
        Math.floor(e.Ob.getTime() / 1e3) >>> 0,
        ((H = Math.floor(e.Ob.getTime() / 1e3)),
        1 <= +Math.abs(H)
          ? 0 < H
            ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0
            : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      B[(d + 72) >> 2] = I[0];
      B[(d + 76) >> 2] = I[1];
      D[(d + 80) >> 2] = 0;
      I = [
        Math.floor(e.vb.getTime() / 1e3) >>> 0,
        ((H = Math.floor(e.vb.getTime() / 1e3)),
        1 <= +Math.abs(H)
          ? 0 < H
            ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0
            : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      B[(d + 88) >> 2] = I[0];
      B[(d + 92) >> 2] = I[1];
      D[(d + 96) >> 2] = 0;
      I = [
        e.$a >>> 0,
        ((H = e.$a),
        1 <= +Math.abs(H)
          ? 0 < H
            ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0
            : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
          : 0),
      ];
      B[(d + 104) >> 2] = I[0];
      B[(d + 108) >> 2] = I[1];
      return 0;
    }
    var Pb = void 0;
    function Qb() {
      Pb += 4;
      return B[(Pb - 4) >> 2];
    }
    function N(a) {
      a = FS.ma(a);
      if (!a) throw new FS.g(8);
      return a;
    }
    function Rb(a) {
      if (u) return O(1, 1, a);
      wa = a;
      if (!Ta()) {
        F.Tb();
        if (c.onExit) c.onExit(a);
        ua = !0;
      }
      fa(a, new sb(a));
    }
    Rb.h = "vi";
    function Sb(a, b) {
      wa = a;
      if (!b && u) throw (Tb(a), "unwind");
      Ta() || Wa();
      Rb(a);
    }
    c._exit = Sb;
    Sb.h = "vi";
    function Ub(a) {
      a instanceof sb || "unwind" == a || fa(1, a);
    }
    function Vb() {
      if (!Ta())
        try {
          u ? Wb(wa) : Sb(wa);
        } catch (a) {
          Ub(a);
        }
    }
    function Xb(a) {
      function b() {
        return d < Yb ? (--Sa, Vb(), !1) : !0;
      }
      !lb ||
        x(
          "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."
        );
      lb = a;
      var d = Yb;
      mb = !1;
      qb = function () {
        if (!ua)
          if (0 < Zb.length) {
            var e = Date.now(),
              f = Zb.shift();
            f.wd(f.pb);
            if ($b) {
              var g = $b,
                h = 0 == g % 1 ? g - 1 : Math.floor(g);
              $b = f.td ? h : (8 * g + (h + 0.5)) / 9;
            }
            pa(
              'main loop blocker "' +
                f.name +
                '" took ' +
                (Date.now() - e) +
                " ms"
            );
            c.setStatus &&
              ((e = c.statusMessage || "Please wait..."),
              (f = $b),
              (g = ac.vd),
              f
                ? f < g
                  ? c.setStatus(e + " (" + (g - f) + "/" + g + ")")
                  : c.setStatus(e)
                : c.setStatus(""));
            b() && setTimeout(qb, 0);
          } else
            b() &&
              ((bc = (bc + 1) | 0),
              1 == jb && 1 < kb && 0 != bc % kb
                ? nb()
                : (0 == jb && (ob = pb()),
                  ua ||
                    (c.preMainLoop && !1 === c.preMainLoop()) ||
                    (cc(a), c.postMainLoop && c.postMainLoop()),
                  b() &&
                    ("object" == typeof SDL &&
                      SDL.audio &&
                      SDL.audio.Wc &&
                      SDL.audio.Wc(),
                    nb())));
      };
    }
    function cc(a) {
      if (!Ra && !ua)
        try {
          a(), Vb();
        } catch (b) {
          Ub(b);
        }
    }
    function dc(a) {
      Sa += 1;
      setTimeout(function () {
        --Sa;
        cc(a);
      }, 1e4);
    }
    function ec(a) {
      fc || (fc = {});
      fc[a] || ((fc[a] = 1), v(a));
    }
    var fc,
      mb = !1,
      nb = null,
      Yb = 0,
      lb = null,
      jb = 0,
      kb = 0,
      bc = 0,
      Zb = [],
      ac = {},
      ob,
      qb,
      $b,
      gc = !1,
      hc = !1,
      ic = [];
    function jc() {
      function a() {
        hc =
          document.pointerLockElement === c.canvas ||
          document.mozPointerLockElement === c.canvas ||
          document.webkitPointerLockElement === c.canvas ||
          document.msPointerLockElement === c.canvas;
      }
      c.preloadPlugins || (c.preloadPlugins = []);
      if (!kc) {
        kc = !0;
        try {
          lc = !0;
        } catch (e) {
          (lc = !1),
            v(
              "warning: no blob constructor, cannot create blobs with mimetypes"
            );
        }
        mc =
          "undefined" != typeof MozBlobBuilder
            ? MozBlobBuilder
            : "undefined" != typeof WebKitBlobBuilder
            ? WebKitBlobBuilder
            : lc
            ? null
            : v("warning: no BlobBuilder");
        nc =
          "undefined" != typeof window
            ? window.URL
              ? window.URL
              : window.webkitURL
            : void 0;
        c.Pb ||
          "undefined" != typeof nc ||
          (v(
            "warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."
          ),
          (c.Pb = !0));
        c.preloadPlugins.push({
          canHandle: function (e) {
            return !c.Pb && /\.(jpg|jpeg|png|bmp)$/i.test(e);
          },
          handle: function (e, f, g, h) {
            var k = null;
            if (lc)
              try {
                (k = new Blob([e], { type: oc(f) })),
                  k.size !== e.length &&
                    (k = new Blob([new Uint8Array(e).buffer], { type: oc(f) }));
              } catch (n) {
                ec(
                  "Blob constructor present but fails: " +
                    n +
                    "; falling back to blob builder"
                );
              }
            k ||
              ((k = new mc()),
              k.append(new Uint8Array(e).buffer),
              (k = k.getBlob()));
            var l = nc.createObjectURL(k),
              p = new Image();
            p.onload = () => {
              p.complete || x("Image " + f + " could not be decoded");
              var n = document.createElement("canvas");
              n.width = p.width;
              n.height = p.height;
              n.getContext("2d").drawImage(p, 0, 0);
              nc.revokeObjectURL(l);
              g && g(e);
            };
            p.onerror = () => {
              pa("Image " + l + " could not be decoded");
              h && h();
            };
            p.src = l;
          },
        });
        c.preloadPlugins.push({
          canHandle: function (e) {
            return !c.Ed && e.substr(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 };
          },
          handle: function (e, f, g, h) {
            function k() {
              p || ((p = !0), g && g(e));
            }
            function l() {
              p || ((p = !0), new Audio(), h && h());
            }
            var p = !1;
            if (lc) {
              try {
                var n = new Blob([e], { type: oc(f) });
              } catch (r) {
                return l();
              }
              n = nc.createObjectURL(n);
              var q = new Audio();
              q.addEventListener("canplaythrough", () => k(q), !1);
              q.onerror = function () {
                if (!p) {
                  v(
                    "warning: browser could not fully decode audio " +
                      f +
                      ", trying slower base64 approach"
                  );
                  for (var r = "", m = 0, t = 0, w = 0; w < e.length; w++)
                    for (m = (m << 8) | e[w], t += 8; 6 <= t; ) {
                      var C = (m >> (t - 6)) & 63;
                      t -= 6;
                      r +=
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                          C
                        ];
                    }
                  2 == t
                    ? ((r +=
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                          (m & 3) << 4
                        ]),
                      (r += "=="))
                    : 4 == t &&
                      ((r +=
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                          (m & 15) << 2
                        ]),
                      (r += "="));
                  q.src = "data:audio/x-" + f.substr(-3) + ";base64," + r;
                  k(q);
                }
              };
              q.src = n;
              dc(function () {
                k(q);
              });
            } else return l();
          },
        });
        var b = {
          asyncWasmLoadPromise: new Promise(function (e) {
            return e();
          }),
          canHandle: function (e) {
            return !c.Fd && e.endsWith(".so");
          },
          handle: function (e, f, g, h) {
            b.asyncWasmLoadPromise = b.asyncWasmLoadPromise
              .then(() => pc(e, { O: !0, ua: !0 }))
              .then(
                (k) => {
                  qc[f] = k;
                  g();
                },
                (k) => {
                  console.warn(
                    "Couldn't instantiate wasm: " + f + " '" + k + "'"
                  );
                  h();
                }
              );
          },
        };
        c.preloadPlugins.push(b);
        var d = c.canvas;
        d &&
          ((d.requestPointerLock =
            d.requestPointerLock ||
            d.mozRequestPointerLock ||
            d.webkitRequestPointerLock ||
            d.msRequestPointerLock ||
            (() => {})),
          (d.exitPointerLock =
            document.exitPointerLock ||
            document.mozExitPointerLock ||
            document.webkitExitPointerLock ||
            document.msExitPointerLock ||
            (() => {})),
          (d.exitPointerLock = d.exitPointerLock.bind(document)),
          document.addEventListener("pointerlockchange", a, !1),
          document.addEventListener("mozpointerlockchange", a, !1),
          document.addEventListener("webkitpointerlockchange", a, !1),
          document.addEventListener("mspointerlockchange", a, !1),
          c.elementPointerLock &&
            d.addEventListener(
              "click",
              (e) => {
                !hc &&
                  c.canvas.requestPointerLock &&
                  (c.canvas.requestPointerLock(), e.preventDefault());
              },
              !1
            ));
      }
    }
    function Mb(a, b, d, e) {
      jc();
      var f = !1;
      c.preloadPlugins.forEach(function (g) {
        !f && g.canHandle(b) && (g.handle(a, b, d, e), (f = !0));
      });
      return f;
    }
    function rc(a, b, d, e) {
      if (b && c.wb && a == c.canvas) return c.wb;
      var f;
      if (b) {
        var g = { antialias: !1, alpha: !1, zd: 1 };
        if (e) for (var h in e) g[h] = e[h];
        if ("undefined" != typeof GL && (f = GL.ud(a, g)))
          var k = GL.getContext(f).rd;
      } else k = a.getContext("2d");
      if (!k) return null;
      d &&
        (b ||
          "undefined" == typeof GLctx ||
          x(
            "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"
          ),
        (c.wb = k),
        b && GL.Ad(f),
        (c.Md = b),
        ic.forEach(function (l) {
          l();
        }),
        jc());
      return k;
    }
    var sc = !1,
      tc = void 0,
      uc = void 0;
    function vc(a, b) {
      function d() {
        gc = !1;
        var g = e.parentNode;
        (document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement ||
          document.webkitFullscreenElement ||
          document.webkitCurrentFullScreenElement) === g
          ? ((e.exitFullscreen = wc),
            tc && e.requestPointerLock(),
            (gc = !0),
            uc
              ? ("undefined" != typeof SDL &&
                  (B[SDL.screen >> 2] = D[SDL.screen >> 2] | 8388608),
                xc(c.canvas),
                yc())
              : xc(e))
          : (g.parentNode.insertBefore(e, g),
            g.parentNode.removeChild(g),
            uc
              ? ("undefined" != typeof SDL &&
                  (B[SDL.screen >> 2] = D[SDL.screen >> 2] & -8388609),
                xc(c.canvas),
                yc())
              : xc(e));
        if (c.onFullScreen) c.onFullScreen(gc);
        if (c.onFullscreen) c.onFullscreen(gc);
      }
      tc = a;
      uc = b;
      "undefined" == typeof tc && (tc = !0);
      "undefined" == typeof uc && (uc = !1);
      var e = c.canvas;
      sc ||
        ((sc = !0),
        document.addEventListener("fullscreenchange", d, !1),
        document.addEventListener("mozfullscreenchange", d, !1),
        document.addEventListener("webkitfullscreenchange", d, !1),
        document.addEventListener("MSFullscreenChange", d, !1));
      var f = document.createElement("div");
      e.parentNode.insertBefore(f, e);
      f.appendChild(e);
      f.requestFullscreen =
        f.requestFullscreen ||
        f.mozRequestFullScreen ||
        f.msRequestFullscreen ||
        (f.webkitRequestFullscreen
          ? () => f.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          : null) ||
        (f.webkitRequestFullScreen
          ? () => f.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
          : null);
      f.requestFullscreen();
    }
    function wc() {
      if (!gc) return !1;
      (
        document.exitFullscreen ||
        document.cancelFullScreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen ||
        document.webkitCancelFullScreen ||
        function () {}
      ).apply(document, []);
      return !0;
    }
    var zc = 0;
    function rb(a) {
      if ("function" == typeof requestAnimationFrame) requestAnimationFrame(a);
      else {
        var b = Date.now();
        if (0 === zc) zc = b + 1e3 / 60;
        else for (; b + 2 >= zc; ) zc += 1e3 / 60;
        setTimeout(a, Math.max(zc - b, 0));
      }
    }
    function oc(a) {
      return {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        bmp: "image/bmp",
        ogg: "audio/ogg",
        wav: "audio/wav",
        mp3: "audio/mpeg",
      }[a.substr(a.lastIndexOf(".") + 1)];
    }
    var Ac = [];
    function yc() {
      var a = c.canvas;
      Ac.forEach(function (b) {
        b(a.width, a.height);
      });
    }
    function xc(a, b, d) {
      b && d ? ((a.qd = b), (a.Ec = d)) : ((b = a.qd), (d = a.Ec));
      var e = b,
        f = d;
      c.forcedAspectRatio &&
        0 < c.forcedAspectRatio &&
        (e / f < c.forcedAspectRatio
          ? (e = Math.round(f * c.forcedAspectRatio))
          : (f = Math.round(e / c.forcedAspectRatio)));
      if (
        (document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement ||
          document.webkitFullscreenElement ||
          document.webkitCurrentFullScreenElement) === a.parentNode &&
        "undefined" != typeof screen
      ) {
        var g = Math.min(screen.width / e, screen.height / f);
        e = Math.round(e * g);
        f = Math.round(f * g);
      }
      uc
        ? (a.width != e && (a.width = e),
          a.height != f && (a.height = f),
          "undefined" != typeof a.style &&
            (a.style.removeProperty("width"), a.style.removeProperty("height")))
        : (a.width != b && (a.width = b),
          a.height != d && (a.height = d),
          "undefined" != typeof a.style &&
            (e != b || f != d
              ? (a.style.setProperty("width", e + "px", "important"),
                a.style.setProperty("height", f + "px", "important"))
              : (a.style.removeProperty("width"),
                a.style.removeProperty("height"))));
    }
    var kc,
      lc,
      mc,
      nc,
      Q = {},
      Bc = new Set([]),
      Cc = {
        get: function (a, b) {
          (a = Q[b]) ||
            (a = Q[b] = new WebAssembly.Global({ value: "i32", mutable: !0 }));
          Bc.has(b) || (a.required = !0);
          return a;
        },
      };
    function Dc(a) {
      (a = F.Y[a]) || x();
      F.Rb(a);
    }
    function Ec(a) {
      var b = F.yc();
      if (!b) return 6;
      F.za.push(b);
      F.Y[a.X] = b;
      b.X = a.X;
      var d = { cmd: "run", start_routine: a.fd, arg: a.pb, pthread_ptr: a.X };
      b.ya = () => {
        d.time = performance.now();
        b.postMessage(d, a.nd);
      };
      b.loaded && (b.ya(), delete b.ya);
      return 0;
    }
    var F = {
      T: [],
      za: [],
      Wb: [],
      Y: {},
      init: function () {
        u ? F.Hc() : F.Gc();
      },
      Gc: function () {
        for (var a = Fc() + 3; a--; ) F.nb();
      },
      Hc: function () {
        F.receiveObjectTransfer = F.Zc;
        F.threadInitTLS = F.Ub;
        F.setExitStatus = F.Sb;
        noExitRuntime = !1;
      },
      Sb: function (a) {
        wa = a;
      },
      Tb: function () {
        for (var a of Object.values(F.Y)) F.Rb(a);
        for (a of F.T) a.terminate();
        F.T = [];
      },
      Rb: function (a) {
        var b = a.X;
        delete F.Y[b];
        F.T.push(a);
        F.za.splice(F.za.indexOf(a), 1);
        a.X = 0;
        Gc(b);
      },
      Zc: function () {},
      Ub: function () {
        F.Wb.forEach((a) => a());
      },
      Lb: function (a, b) {
        a.onmessage = (d) => {
          d = d.data;
          var e = d.cmd;
          a.X && (F.pc = a.X);
          if (d.targetThread && d.targetThread != Hc()) {
            var f = F.Y[d.Kd];
            f
              ? f.postMessage(d, d.transferList)
              : v(
                  'Internal error! Worker sent a message "' +
                    e +
                    '" to target pthread ' +
                    d.targetThread +
                    ", but that thread no longer exists!"
                );
          } else if ("processProxyingQueue" === e) Ic(d.queue);
          else if ("spawnThread" === e) Ec(d);
          else if ("cleanupThread" === e) Dc(d.thread);
          else if ("killThread" === e)
            (d = d.thread),
              (e = F.Y[d]),
              delete F.Y[d],
              e.terminate(),
              Gc(d),
              F.za.splice(F.za.indexOf(e), 1),
              (e.X = 0);
          else if ("cancelThread" === e)
            F.Y[d.thread].postMessage({ cmd: "cancel" });
          else if ("loaded" === e)
            (a.loaded = !0), b && b(a), a.ya && (a.ya(), delete a.ya);
          else if ("print" === e) pa("Thread " + d.threadId + ": " + d.text);
          else if ("printErr" === e) v("Thread " + d.threadId + ": " + d.text);
          else if ("alert" === e) alert("Thread " + d.threadId + ": " + d.text);
          else if ("setimmediate" === d.target) a.postMessage(d);
          else if ("onAbort" === e) {
            if (c.onAbort) c.onAbort(d.arg);
          } else e && v("worker sent an unknown command " + e);
          F.pc = void 0;
        };
        a.onerror = (d) => {
          v(
            "worker sent an error! " +
              d.filename +
              ":" +
              d.lineno +
              ": " +
              d.message
          );
          throw d;
        };
        a.postMessage({
          cmd: "load",
          urlOrBlob: c.mainScriptUrlOrBlob,
          wasmMemory: sa,
          wasmModule: ta,
          dynamicLibraries: c.dynamicLibraries,
        });
      },
      nb: function () {
        if (c.locateFile) {
          var a = la("vips-es6.worker.js");
          F.T.push(new Worker(a, { type: "module" }));
        } else
          F.T.push(
            new Worker(new URL("vips-es6.worker.js", import.meta.url), {
              type: "module",
            })
          );
      },
      yc: function () {
        0 == F.T.length && (F.nb(), F.Lb(F.T[0]));
        return F.T.pop();
      },
    };
    c.PThread = F;
    function Va(a) {
      for (; 0 < a.length; ) a.shift()(c);
    }
    c.establishStackSpace = function () {
      var a = Hc(),
        b = B[(a + 44) >> 2];
      Jc(b, b - B[(a + 48) >> 2]);
      R(b);
    };
    function Tb(a) {
      if (u) return O(2, 0, a);
      try {
        Sb(a);
      } catch (b) {
        Ub(b);
      }
    }
    function Kc(a) {
      function b() {
        for (var n = 0, q = 1; ; ) {
          var r = a[f++];
          n += (r & 127) * q;
          q *= 128;
          if (!(r & 128)) break;
        }
        return n;
      }
      function d() {
        var n = b();
        f += n;
        return ya(a, f - n, n);
      }
      function e(n, q) {
        if (n) throw Error(q);
      }
      var f = 0,
        g = 0,
        h = "dylink.0";
      a instanceof WebAssembly.Module
        ? ((g = WebAssembly.Module.customSections(a, h)),
          0 === g.length &&
            ((h = "dylink"), (g = WebAssembly.Module.customSections(a, h))),
          e(0 === g.length, "need dylink section"),
          (a = new Uint8Array(g[0])),
          (g = a.length))
        : ((g =
            1836278016 ==
            new Uint32Array(new Uint8Array(a.subarray(0, 24)).buffer)[0]),
          e(!g, "need to see wasm magic number"),
          e(0 !== a[8], "need the dylink section to be first"),
          (f = 9),
          (g = b()),
          (g = f + g),
          (h = d()));
      var k = { Ma: [], Vb: new Set(), Xb: new Set() };
      if ("dylink" == h) {
        k.La = b();
        k.Mb = b();
        k.Aa = b();
        k.hd = b();
        h = b();
        for (var l = 0; l < h; ++l) {
          var p = d();
          k.Ma.push(p);
        }
      } else
        for (e("dylink.0" !== h); f < g; )
          if (((h = a[f++]), (l = b()), 1 === h))
            (k.La = b()), (k.Mb = b()), (k.Aa = b()), (k.hd = b());
          else if (2 === h)
            for (h = b(), l = 0; l < h; ++l) (p = d()), k.Ma.push(p);
          else if (3 === h)
            for (h = b(); h--; ) (l = d()), (p = b()), p & 256 && k.Vb.add(l);
          else if (4 === h)
            for (h = b(); h--; )
              d(), (l = d()), (p = b()), 1 == (p & 3) && k.Xb.add(l);
          else f += l;
      return k;
    }
    var Lc = [];
    function S(a) {
      var b = Lc[a];
      b || (a >= Lc.length && (Lc.length = a + 1), (Lc[a] = b = E.get(a)));
      return b;
    }
    c.invokeEntryPoint = function (a, b) {
      Mc();
      a = S(a)(b);
      Ta() ? F.Sb(a) : Wb(a);
    };
    function Nc(a) {
      var b = [
        "stackAlloc",
        "stackSave",
        "stackRestore",
        "getTempRet0",
        "setTempRet0",
      ];
      return 0 == a.indexOf("dynCall_") || b.includes(a) ? a : "_" + a;
    }
    function Oc(a) {
      for (var b in a)
        if (a.hasOwnProperty(b)) {
          Pc.hasOwnProperty(b) || (Pc[b] = a[b]);
          var d = Nc(b);
          c.hasOwnProperty(d) || (c[d] = a[b]);
        }
    }
    var Qc = {},
      Rc = {};
    function Sc() {
      return function () {
        var a = T();
        try {
          var b = Array.prototype.slice.call(arguments, 1);
          return S(arguments[0]).apply(null, b);
        } catch (d) {
          R(a);
          if (d !== d + 0) throw d;
          U(1, 0);
        }
      };
    }
    var Tc = 8577184;
    function Uc(a) {
      if (Qa) return Gb(Vc(a), a);
      var b = Tc;
      Tc = a = (b + a + 15) & -16;
      Q.__heap_base.value = a;
      return b;
    }
    function Wc(a, b) {
      if (Xc)
        for (var d = a; d < a + b; d++) {
          var e = S(d);
          e && Xc.set(e, d);
        }
    }
    var Xc = void 0,
      Yc = [];
    function Zc(a, b) {
      Xc || ((Xc = new WeakMap()), Wc(0, E.length));
      if (Xc.has(a)) return Xc.get(a);
      if (Yc.length) var d = Yc.pop();
      else {
        try {
          E.grow(1);
        } catch (k) {
          if (!(k instanceof RangeError)) throw k;
          throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
        }
        d = E.length - 1;
      }
      try {
        var e = d;
        E.set(e, a);
        Lc[e] = E.get(e);
      } catch (k) {
        if (!(k instanceof TypeError)) throw k;
        if ("function" == typeof WebAssembly.Function) {
          e = WebAssembly.Function;
          for (
            var f = { i: "i32", j: "i32", f: "f32", d: "f64", p: "i32" },
              g = { parameters: [], results: "v" == b[0] ? [] : [f[b[0]]] },
              h = 1;
            h < b.length;
            ++h
          )
            g.parameters.push(f[b[h]]),
              "j" === b[h] && g.parameters.push("i32");
          e = new e(g, a);
        } else {
          e = [1];
          f = b.slice(0, 1);
          b = b.slice(1);
          g = { i: 127, p: 127, j: 126, f: 125, d: 124 };
          e.push(96);
          h = b.length;
          128 > h ? e.push(h) : e.push(h % 128 | 128, h >> 7);
          for (h = 0; h < b.length; ++h) e.push(g[b[h]]);
          "v" == f ? e.push(0) : e.push(1, g[f]);
          b = [0, 97, 115, 109, 1, 0, 0, 0, 1];
          f = e.length;
          128 > f ? b.push(f) : b.push(f % 128 | 128, f >> 7);
          b.push.apply(b, e);
          b.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
          e = new WebAssembly.Module(new Uint8Array(b));
          e = new WebAssembly.Instance(e, { e: { f: a } }).exports.f;
        }
        b = d;
        E.set(b, e);
        Lc[b] = E.get(b);
      }
      Xc.set(a, d);
      return d;
    }
    function $c(a, b, d) {
      var e = {},
        f;
      for (f in a) {
        var g = a[f];
        "object" == typeof g && (g = g.value);
        "number" == typeof g && (g += b);
        e[f] = g;
      }
      for (var h in e)
        !"__cpp_exception __c_longjmp __wasm_apply_data_relocs __dso_handle __tls_size __tls_align __set_stack_limits _emscripten_tls_init __wasm_init_tls __wasm_call_ctors"
          .split(" ")
          .includes(h) &&
          ((a = e[h]),
          Q[h] ||
            (Q[h] = new WebAssembly.Global({ value: "i32", mutable: !0 })),
          d || 0 == Q[h].value) &&
          ("function" == typeof a
            ? (Q[h].value = Zc(a))
            : "number" == typeof a
            ? (Q[h].value = a)
            : v("unhandled export type for `" + h + "`: " + typeof a));
      return e;
    }
    function ad(a) {
      var b;
      b || ((b = Pc[a]) && b.Jd && (b = void 0));
      b || (b = c[Nc(a)]);
      !b && a.startsWith("invoke_") && (b = Sc());
      return b;
    }
    function pc(a, b, d) {
      function e() {
        function g(q) {
          Wc(l, f.Aa);
          p = $c(q.exports, k);
          b.bc || bd();
          cd(p._emscripten_tls_init, q.exports, f);
          u ||
            ((q = p.__wasm_apply_data_relocs) && (Qa ? q() : Pa.push(q)),
            (q = p.__wasm_call_ctors) && (Qa ? q() : La.push(q)));
          return p;
        }
        if (d && A[(d + 24) >> 0])
          (k = D[(d + 28) >> 2]), (l = D[(d + 36) >> 2]);
        else {
          var h = Math.pow(2, f.Mb);
          h = Math.max(h, 16);
          var k = f.La ? Hb(Uc(f.La + h), h) : 0,
            l = f.Aa ? E.length : 0;
          d &&
            ((A[(d + 24) >> 0] = 1),
            (D[(d + 28) >> 2] = k),
            (B[(d + 32) >> 2] = f.La),
            (D[(d + 36) >> 2] = l),
            (B[(d + 40) >> 2] = f.Aa));
        }
        h = l + f.Aa - E.length;
        0 < h && E.grow(h);
        var p;
        h = new Proxy(
          {},
          {
            get: function (q, r) {
              switch (r) {
                case "__memory_base":
                  return k;
                case "__table_base":
                  return l;
              }
              if (r in Pc) return Pc[r];
              if (!(r in q)) {
                var m;
                q[r] = function () {
                  if (!m) {
                    var t = ad(r);
                    t || (t = p[r]);
                    m = t;
                  }
                  return m.apply(null, arguments);
                };
              }
              return q[r];
            },
          }
        );
        h = {
          "GOT.mem": new Proxy({}, Cc),
          "GOT.func": new Proxy({}, Cc),
          env: h,
          Nd: h,
        };
        if (b.O)
          return a instanceof WebAssembly.Module
            ? ((h = new WebAssembly.Instance(a, h)), Promise.resolve(g(h)))
            : WebAssembly.instantiate(a, h).then(function (q) {
                return g(q.instance);
              });
        var n = a instanceof WebAssembly.Module ? a : new WebAssembly.Module(a);
        h = new WebAssembly.Instance(n, h);
        return g(h);
      }
      var f = Kc(a);
      Bc = f.Xb;
      if (b.O)
        return f.Ma.reduce(function (g, h) {
          return g.then(function () {
            return dd(h, b);
          });
        }, Promise.resolve()).then(function () {
          return e();
        });
      f.Ma.forEach(function (g) {
        dd(g, b);
      });
      return e();
    }
    function dd(a, b, d) {
      function e(k) {
        if (b.fs && b.fs.Db(k)) {
          var l = b.fs.readFile(k, { encoding: "binary" });
          l instanceof Uint8Array || (l = new Uint8Array(l));
          return b.O ? Promise.resolve(l) : l;
        }
        if (b.O)
          return new Promise(function (p, n) {
            na(k, (q) => p(new Uint8Array(q)), n);
          });
        if (!oa)
          throw Error(
            k +
              ": file not found, and synchronous loading of external files is not available"
          );
        return oa(k);
      }
      function f() {
        if ("undefined" != typeof qc && qc[a]) {
          var k = qc[a];
          return b.O ? Promise.resolve(k) : k;
        }
        return b.O
          ? e(a).then(function (l) {
              return pc(l, b, d);
            })
          : pc(e(a), b, d);
      }
      function g(k) {
        h.global && Oc(k);
        h.module = k;
      }
      b = b || { global: !0, ua: !0 };
      var h = Qc[a];
      if (h)
        return (
          b.global &&
            !h.global &&
            ((h.global = !0), "loading" !== h.module && Oc(h.module)),
          b.ua && Infinity !== h.ba && (h.ba = Infinity),
          h.ba++,
          d && (Rc[d] = h),
          b.O ? Promise.resolve(!0) : !0
        );
      h = {
        ba: b.ua ? Infinity : 1,
        name: a,
        module: "loading",
        global: b.global,
      };
      Qc[a] = h;
      d && (Rc[d] = h);
      if (b.O)
        return f().then(function (k) {
          g(k);
          return !0;
        });
      g(f());
      return !0;
    }
    function bd() {
      for (var a in Q)
        if (0 == Q[a].value) {
          var b = ad(a);
          if (b || Q[a].required)
            if ("function" == typeof b) Q[a].value = Zc(b, b.h);
            else if ("number" == typeof b) Q[a].value = b;
            else throw Error("bad export type for `" + a + "`: " + typeof b);
        }
    }
    function ed() {
      qa.length
        ? (bb("preloadDylibs"),
          qa
            .reduce(function (a, b) {
              return a.then(function () {
                return dd(b, { O: !0, global: !0, ua: !0, bc: !0 });
              });
            }, Promise.resolve())
            .then(function () {
              bd();
              cb("preloadDylibs");
            }))
        : bd();
    }
    function cd(a, b, d) {
      function e() {
        var f = a();
        if (f) {
          var g = {};
          d.Vb.forEach((h) => (g[h] = b[h]));
          $c(g, f, !0);
        }
      }
      F.Wb.push(e);
      Qa && e();
    }
    function fd(a, b, d, e) {
      x(
        "Assertion failed: " +
          y(a) +
          ", at: " +
          [b ? y(b) : "unknown filename", d, e ? y(e) : "unknown function"]
      );
    }
    fd.h = "vppip";
    function gd(a, b) {
      S(a)(b);
    }
    gd.h = "vpi";
    var hd = new WebAssembly.Global({ value: "i32", mutable: !1 }, 1024);
    c.___memory_base = hd;
    function jd(a, b, d, e) {
      return u ? O(3, 1, a, b, d, e) : kd(a, b, d, e);
    }
    function kd(a, b, d, e) {
      if ("undefined" == typeof SharedArrayBuffer)
        return (
          v(
            "Current environment does not support SharedArrayBuffer, pthreads are not available!"
          ),
          6
        );
      var f = [];
      if (u && 0 === f.length) return jd(a, b, d, e);
      a = { fd: d, X: a, pb: e, nd: f };
      return u ? ((a.sd = "spawnThread"), postMessage(a, f), 0) : Ec(a);
    }
    kd.h = "iiiii";
    var ld = new WebAssembly.Global({ value: "i32", mutable: !0 }, 8577184);
    c.___stack_pointer = ld;
    function md(a) {
      if (u) return O(4, 1, a);
      try {
        var b = N(a);
        return FS.Qa(b, 0).la;
      } catch (d) {
        if ("undefined" == typeof FS || !(d instanceof FS.g)) throw d;
        return -d.A;
      }
    }
    md.h = "ii";
    function nd(a, b, d, e) {
      if (u) return O(5, 1, a, b, d, e);
      try {
        b = y(b);
        b = Nb(a, b);
        if (d & -8) return -28;
        var f = FS.lookupPath(b, { follow: !0 }).node;
        if (!f) return -44;
        a = "";
        d & 4 && (a += "r");
        d & 2 && (a += "w");
        d & 1 && (a += "x");
        return a && FS.aa(f, a) ? -2 : 0;
      } catch (g) {
        if ("undefined" == typeof FS || !(g instanceof FS.g)) throw g;
        return -g.A;
      }
    }
    nd.h = "iipii";
    function od(a, b, d) {
      if (u) return O(6, 1, a, b, d);
      Pb = d;
      try {
        var e = N(a);
        switch (b) {
          case 0:
            var f = Qb();
            return 0 > f ? -28 : FS.Qa(e, f).la;
          case 1:
          case 2:
            return 0;
          case 3:
            return e.flags;
          case 4:
            return (f = Qb()), (e.flags |= f), 0;
          case 5:
            return (f = Qb()), (Ca[(f + 0) >> 1] = 2), 0;
          case 6:
          case 7:
            return 0;
          case 16:
          case 8:
            return -28;
          case 9:
            return (B[pd() >> 2] = 28), -1;
          default:
            return -28;
        }
      } catch (g) {
        if ("undefined" == typeof FS || !(g instanceof FS.g)) throw g;
        return -g.A;
      }
    }
    od.h = "iiip";
    function qd(a, b) {
      if (u) return O(7, 1, a, b);
      try {
        var d = N(a);
        return Ob(FS.stat, d.path, b);
      } catch (e) {
        if ("undefined" == typeof FS || !(e instanceof FS.g)) throw e;
        return -e.A;
      }
    }
    qd.h = "iip";
    function rd(a) {
      return -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
    }
    function sd(a, b) {
      if (u) return O(8, 1, a, b);
      try {
        b = rd(b);
        if (isNaN(b)) return -61;
        FS.ftruncate(a, b);
        return 0;
      } catch (d) {
        if ("undefined" == typeof FS || !(d instanceof FS.g)) throw d;
        return -d.A;
      }
    }
    sd.h = "iij";
    function td(a, b) {
      if (u) return O(9, 1, a, b);
      try {
        if (0 === b) return -28;
        var d = FS.cwd(),
          e = Aa(d) + 1;
        if (b < e) return -68;
        za(d, z, a, b);
        return e;
      } catch (f) {
        if ("undefined" == typeof FS || !(f instanceof FS.g)) throw f;
        return -f.A;
      }
    }
    td.h = "ipp";
    function ud(a, b, d) {
      if (u) return O(10, 1, a, b, d);
      Pb = d;
      try {
        var e = N(a);
        switch (b) {
          case 21509:
          case 21505:
            return e.D ? 0 : -59;
          case 21510:
          case 21511:
          case 21512:
          case 21506:
          case 21507:
          case 21508:
            return e.D ? 0 : -59;
          case 21519:
            if (!e.D) return -59;
            var f = Qb();
            return (B[f >> 2] = 0);
          case 21520:
            return e.D ? -28 : -59;
          case 21531:
            return (f = Qb()), FS.ab(e, b, f);
          case 21523:
            return e.D ? 0 : -59;
          case 21524:
            return e.D ? 0 : -59;
          default:
            return -28;
        }
      } catch (g) {
        if ("undefined" == typeof FS || !(g instanceof FS.g)) throw g;
        return -g.A;
      }
    }
    ud.h = "iiip";
    function vd(a, b) {
      if (u) return O(11, 1, a, b);
      try {
        return (a = y(a)), Ob(FS.lstat, a, b);
      } catch (d) {
        if ("undefined" == typeof FS || !(d instanceof FS.g)) throw d;
        return -d.A;
      }
    }
    vd.h = "ipp";
    function wd(a, b, d, e) {
      if (u) return O(12, 1, a, b, d, e);
      try {
        b = y(b);
        var f = e & 256;
        b = Nb(a, b, e & 4096);
        return Ob(f ? FS.lstat : FS.stat, b, d);
      } catch (g) {
        if ("undefined" == typeof FS || !(g instanceof FS.g)) throw g;
        return -g.A;
      }
    }
    wd.h = "iippi";
    function xd(a, b, d, e) {
      if (u) return O(13, 1, a, b, d, e);
      Pb = e;
      try {
        b = y(b);
        b = Nb(a, b);
        var f = e ? Qb() : 0;
        return FS.open(b, d, f).la;
      } catch (g) {
        if ("undefined" == typeof FS || !(g instanceof FS.g)) throw g;
        return -g.A;
      }
    }
    xd.h = "iipip";
    function yd(a, b, d) {
      if (u) return O(14, 1, a, b, d);
      try {
        for (var e = (d = 0); e < b; e++) {
          var f = a + 8 * e,
            g = Ca[(f + 4) >> 1],
            h = 32,
            k = FS.ma(B[f >> 2]);
          k && ((h = 5), k.s.Uc && (h = k.s.Uc(k)));
          (h &= g | 24) && d++;
          Ca[(f + 6) >> 1] = h;
        }
        return d;
      } catch (l) {
        if ("undefined" == typeof FS || !(l instanceof FS.g)) throw l;
        return -l.A;
      }
    }
    yd.h = "ipii";
    function zd(a) {
      if (u) return O(15, 1, a);
      try {
        return (a = y(a)), FS.rmdir(a), 0;
      } catch (b) {
        if ("undefined" == typeof FS || !(b instanceof FS.g)) throw b;
        return -b.A;
      }
    }
    zd.h = "ip";
    function Ad(a, b) {
      if (u) return O(16, 1, a, b);
      try {
        return (a = y(a)), Ob(FS.stat, a, b);
      } catch (d) {
        if ("undefined" == typeof FS || !(d instanceof FS.g)) throw d;
        return -d.A;
      }
    }
    Ad.h = "ipp";
    function Bd(a, b, d) {
      if (u) return O(17, 1, a, b, d);
      try {
        return (
          (b = y(b)),
          (b = Nb(a, b)),
          0 === d
            ? FS.unlink(b)
            : 512 === d
            ? FS.rmdir(b)
            : x("Invalid flags passed to unlinkat"),
          0
        );
      } catch (e) {
        if ("undefined" == typeof FS || !(e instanceof FS.g)) throw e;
        return -e.A;
      }
    }
    Bd.h = "iipi";
    var Cd = new WebAssembly.Global({ value: "i32", mutable: !1 }, 1);
    c.___table_base = Cd;
    var Dd = {};
    function Ed(a) {
      var b = Aa(a) + 1,
        d = Fd(b);
      za(a, A, d, b);
      return d;
    }
    function Gd(a) {
      Hd(function () {
        var b = Ed(a);
        Id(b, 0);
      });
    }
    function Jd(a) {
      var b = FS,
        d = y(a + 44),
        e = B[(a + 20) >> 2];
      d = J(d);
      var f = [],
        g = (l) => (l = FS.Db(l)) && !l.Kb && !l.Ha;
      if (!g(d)) {
        Dd.LD_LIBRARY_PATH && (f = Dd.LD_LIBRARY_PATH.split(":"));
        for (var h in f) {
          var k = J(f[h] + "/" + d);
          if (g(k)) {
            d = k;
            break;
          }
        }
      }
      b = { global: !!(e & 256), ua: !!(e & 4096), O: !1, fs: b };
      try {
        return dd(d, b, a);
      } catch (l) {
        return Gd("Could not load dynamic lib: " + d + "\n" + l), 0;
      }
    }
    function Kd(a) {
      return Jd(a);
    }
    Kd.h = "pp";
    function Ld(a, b) {
      b = y(b);
      if (0 == a) {
        if (((a = ad(b)), !a))
          return (
            Gd(
              'Tried to lookup unknown symbol "' +
                b +
                '" in dynamic lib: RTLD_DEFAULT'
            ),
            0
          );
      } else {
        a = Rc[a];
        if (!a.module.hasOwnProperty(b))
          return (
            Gd(
              'Tried to lookup unknown symbol "' +
                b +
                '" in dynamic lib: ' +
                a.name
            ),
            0
          );
        a = a.module[b];
      }
      "function" == typeof a && (a = Zc(a, a.h));
      return a;
    }
    Ld.h = "ppp";
    var Md = {};
    function Nd(a) {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function Od(a) {
      return this.fromWireType(B[a >> 2]);
    }
    var Pd = {},
      Qd = {},
      Rd = {};
    function Sd(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }
    function Td(a, b) {
      a = Sd(a);
      return new Function(
        "body",
        "return function " +
          a +
          '() {\n    "use strict";    return body.apply(this, arguments);\n};\n'
      )(b);
    }
    function Ud(a) {
      var b = Error,
        d = Td(a, function (e) {
          this.name = a;
          this.message = e;
          e = Error(e).stack;
          void 0 !== e &&
            (this.stack =
              this.toString() + "\n" + e.replace(/^Error(:[^\n]*)?\n/, ""));
        });
      d.prototype = Object.create(b.prototype);
      d.prototype.constructor = d;
      d.prototype.toString = function () {
        return void 0 === this.message
          ? this.name
          : this.name + ": " + this.message;
      };
      return d;
    }
    var Vd = void 0;
    function Wd(a) {
      throw new Vd(a);
    }
    function Xd(a, b, d) {
      function e(k) {
        k = d(k);
        k.length !== a.length && Wd("Mismatched type converter count");
        for (var l = 0; l < a.length; ++l) Yd(a[l], k[l]);
      }
      a.forEach(function (k) {
        Rd[k] = b;
      });
      var f = Array(b.length),
        g = [],
        h = 0;
      b.forEach((k, l) => {
        Qd.hasOwnProperty(k)
          ? (f[l] = Qd[k])
          : (g.push(k),
            Pd.hasOwnProperty(k) || (Pd[k] = []),
            Pd[k].push(() => {
              f[l] = Qd[k];
              ++h;
              h === g.length && e(f);
            }));
      });
      0 === g.length && e(f);
    }
    function Zd(a) {
      var b = Md[a];
      delete Md[a];
      var d = b.hb,
        e = b.Z,
        f = b.Cb,
        g = f.map((h) => h.Bc).concat(f.map((h) => h.cd));
      Xd([a], g, (h) => {
        var k = {};
        f.forEach((l, p) => {
          var n = h[p],
            q = l.Fa,
            r = l.Ac,
            m = h[p + f.length],
            t = l.bd,
            w = l.dd;
          k[l.tc] = {
            read: (C) => n.fromWireType(q(r, C)),
            write: (C, K) => {
              var L = [];
              t(w, C, m.toWireType(L, K));
              Nd(L);
            },
          };
        });
        return [
          {
            name: b.name,
            fromWireType: function (l) {
              var p = {},
                n;
              for (n in k) p[n] = k[n].read(l);
              e(l);
              return p;
            },
            toWireType: function (l, p) {
              for (var n in k)
                if (!(n in p))
                  throw new TypeError('Missing field:  "' + n + '"');
              var q = d();
              for (n in k) k[n].write(q, p[n]);
              null !== l && l.push(e, q);
              return q;
            },
            argPackAdvance: 8,
            readValueFromPointer: Od,
            I: e,
          },
        ];
      });
    }
    Zd.h = "ii";
    var $d = void 0;
    function V(a) {
      for (var b = ""; z[a]; ) b += $d[z[a++]];
      return b;
    }
    var ae = void 0;
    function W(a) {
      throw new ae(a);
    }
    function Yd(a, b, d = {}) {
      if (!("argPackAdvance" in b))
        throw new TypeError(
          "registerType registeredInstance requires argPackAdvance"
        );
      var e = b.name;
      a || W('type "' + e + '" must have a positive integer typeid pointer');
      if (Qd.hasOwnProperty(a)) {
        if (d.Fc) return;
        W("Cannot register type '" + e + "' twice");
      }
      Qd[a] = b;
      delete Rd[a];
      Pd.hasOwnProperty(a) &&
        ((b = Pd[a]), delete Pd[a], b.forEach((f) => f()));
    }
    function be(a) {
      switch (a) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError("Unknown type size: " + a);
      }
    }
    function ce(a, b) {
      switch (b) {
        case 2:
          return Ea;
        case 3:
          return Ha;
        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }
    function de(a, b, d) {
      switch (b) {
        case 0:
          return d ? A : z;
        case 1:
          return d ? Ca : Da;
        case 2:
          return d ? B : D;
        case 3:
          return d ? Fa : Ga;
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    function ee(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b
        ? a.toString()
        : "" + a;
    }
    function fe(a, b, d) {
      var e = de(a, b, d);
      switch (b) {
        case 0:
          return function (f) {
            return e[f];
          };
        case 1:
          return function (f) {
            return e[f >> 1];
          };
        case 2:
          return function (f) {
            return e[f >> 2];
          };
        case 3:
          return function (f) {
            return e[f >> 3];
          };
      }
    }
    function ge(a, b, d, e, f) {
      b = V(b);
      d = be(d);
      var g = b.includes("u");
      g && (f = (1n << 64n) - 1n);
      Yd(a, {
        name: b,
        fromWireType: function (h) {
          return h;
        },
        toWireType: function (h, k) {
          if ("bigint" != typeof k && "number" != typeof k)
            throw new TypeError(
              'Cannot convert "' + ee(k) + '" to ' + this.name
            );
          if (k < e || k > f)
            throw new TypeError(
              'Passing a number "' +
                ee(k) +
                '" from JS side to C/C++ side to an argument of type "' +
                b +
                '", which is outside the valid range [' +
                e +
                ", " +
                f +
                "]!"
            );
          return k;
        },
        argPackAdvance: 8,
        readValueFromPointer: fe(b, d, !g),
        I: null,
      });
    }
    ge.h = "vpppjj";
    function he(a, b, d, e, f) {
      var g = be(d);
      b = V(b);
      Yd(a, {
        name: b,
        fromWireType: function (h) {
          return !!h;
        },
        toWireType: function (h, k) {
          return k ? e : f;
        },
        argPackAdvance: 8,
        readValueFromPointer: function (h) {
          var k = de(b, g, !0);
          return this.fromWireType(k[h >> g]);
        },
        I: null,
      });
    }
    he.h = "vpppii";
    function ie(a) {
      W(a.l.C.u.name + " instance already deleted");
    }
    var je = !1,
      ke = !1;
    function le() {}
    function me(a) {
      --a.count.value;
      0 === a.count.value && (a.J ? a.K.Z(a.J) : a.C.u.Z(a.v));
    }
    function ne(a, b, d) {
      if (b === d) return a;
      if (void 0 === d.L) return null;
      a = ne(a, b, d.L);
      return null === a ? null : d.rc(a);
    }
    var oe = {},
      pe = [];
    function qe() {
      for (; pe.length; ) {
        var a = pe.pop();
        a.l.ka = !1;
        a["delete"]();
      }
    }
    var re = void 0,
      se = {};
    function te(a, b) {
      for (void 0 === b && W("ptr should not be undefined"); a.L; )
        (b = a.Ba(b)), (a = a.L);
      return se[b];
    }
    function ue(a, b) {
      (b.C && b.v) || Wd("makeClassHandle requires ptr and ptrType");
      !!b.K !== !!b.J && Wd("Both smartPtrType and smartPtr must be specified");
      b.count = { value: 1 };
      return ve(Object.create(a, { l: { value: b } }));
    }
    function ve(a) {
      if (je) return (ve = (b) => b.deleteLater()), ve(a);
      if ("undefined" === typeof FinalizationRegistry)
        return (ve = (b) => b), a;
      ke = new FinalizationRegistry((b) => {
        me(b.l);
      });
      ve = (b) => {
        var d = b.l;
        d.J && ke.register(b, { l: d }, b);
        return b;
      };
      le = (b) => {
        ke.unregister(b);
      };
      return ve(a);
    }
    function we() {}
    function xe(a, b, d) {
      if (void 0 === a[b].F) {
        var e = a[b];
        a[b] = function () {
          a[b].F.hasOwnProperty(arguments.length) ||
            W(
              "Function '" +
                d +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ") - expects one of (" +
                a[b].F +
                ")!"
            );
          return a[b].F[arguments.length].apply(this, arguments);
        };
        a[b].F = [];
        a[b].F[e.ja] = e;
      }
    }
    function ye(a, b, d) {
      c.hasOwnProperty(a)
        ? ((void 0 === d || (void 0 !== c[a].F && void 0 !== c[a].F[d])) &&
            W("Cannot register public name '" + a + "' twice"),
          xe(c, a, a),
          c.hasOwnProperty(d) &&
            W(
              "Cannot register multiple overloads of a function with the same number of arguments (" +
                d +
                ")!"
            ),
          (c[a].F[d] = b))
        : ((c[a] = b), void 0 !== d && (c[a].Gd = d));
    }
    function ze(a, b, d, e, f, g, h, k) {
      this.name = a;
      this.constructor = b;
      this.$ = d;
      this.Z = e;
      this.L = f;
      this.wc = g;
      this.Ba = h;
      this.rc = k;
      this.Vc = [];
    }
    function Ae(a, b, d) {
      for (; b !== d; )
        b.Ba ||
          W(
            "Expected null or instance of " +
              d.name +
              ", got an instance of " +
              b.name
          ),
          (a = b.Ba(a)),
          (b = b.L);
      return a;
    }
    function Be(a, b) {
      if (null === b)
        return this.bb && W("null is not a valid " + this.name), 0;
      b.l || W('Cannot pass "' + ee(b) + '" as a ' + this.name);
      b.l.v ||
        W("Cannot pass deleted object as a pointer of type " + this.name);
      return Ae(b.l.v, b.l.C.u, this.u);
    }
    function Ce(a, b) {
      if (null === b) {
        this.bb && W("null is not a valid " + this.name);
        if (this.Ja) {
          var d = this.hb();
          null !== a && a.push(this.Z, d);
          return d;
        }
        return 0;
      }
      b.l || W('Cannot pass "' + ee(b) + '" as a ' + this.name);
      b.l.v ||
        W("Cannot pass deleted object as a pointer of type " + this.name);
      !this.Ga &&
        b.l.C.Ga &&
        W(
          "Cannot convert argument of type " +
            (b.l.K ? b.l.K.name : b.l.C.name) +
            " to parameter type " +
            this.name
        );
      d = Ae(b.l.v, b.l.C.u, this.u);
      if (this.Ja)
        switch (
          (void 0 === b.l.J &&
            W("Passing raw pointer to smart pointer is illegal"),
          this.ed)
        ) {
          case 0:
            b.l.K === this
              ? (d = b.l.J)
              : W(
                  "Cannot convert argument of type " +
                    (b.l.K ? b.l.K.name : b.l.C.name) +
                    " to parameter type " +
                    this.name
                );
            break;
          case 1:
            d = b.l.J;
            break;
          case 2:
            if (b.l.K === this) d = b.l.J;
            else {
              var e = b.clone();
              d = this.Yc(
                d,
                X(function () {
                  e["delete"]();
                })
              );
              null !== a && a.push(this.Z, d);
            }
            break;
          default:
            W("Unsupporting sharing policy");
        }
      return d;
    }
    function De(a, b) {
      if (null === b)
        return this.bb && W("null is not a valid " + this.name), 0;
      b.l || W('Cannot pass "' + ee(b) + '" as a ' + this.name);
      b.l.v ||
        W("Cannot pass deleted object as a pointer of type " + this.name);
      b.l.C.Ga &&
        W(
          "Cannot convert argument of type " +
            b.l.C.name +
            " to parameter type " +
            this.name
        );
      return Ae(b.l.v, b.l.C.u, this.u);
    }
    function Ee(a, b, d, e) {
      this.name = a;
      this.u = b;
      this.bb = d;
      this.Ga = e;
      this.Ja = !1;
      this.Z = this.Yc = this.hb = this.Qb = this.ed = this.Tc = void 0;
      void 0 !== b.L
        ? (this.toWireType = Ce)
        : ((this.toWireType = e ? Be : De), (this.I = null));
    }
    function Fe(a, b, d) {
      c.hasOwnProperty(a) || Wd("Replacing nonexistant public symbol");
      void 0 !== c[a].F && void 0 !== d
        ? (c[a].F[d] = b)
        : ((c[a] = b), (c[a].ja = d));
    }
    function Y(a, b) {
      a = V(a);
      var d = S(b);
      "function" != typeof d &&
        W("unknown function pointer with signature " + a + ": " + b);
      return d;
    }
    var Ge = void 0;
    function He(a) {
      a = Ie(a);
      var b = V(a);
      Je(a);
      return b;
    }
    function Ke(a, b) {
      function d(g) {
        f[g] || Qd[g] || (Rd[g] ? Rd[g].forEach(d) : (e.push(g), (f[g] = !0)));
      }
      var e = [],
        f = {};
      b.forEach(d);
      throw new Ge(a + ": " + e.map(He).join([", "]));
    }
    function Le(a, b, d, e, f, g, h, k, l, p, n, q, r) {
      n = V(n);
      g = Y(f, g);
      k && (k = Y(h, k));
      p && (p = Y(l, p));
      r = Y(q, r);
      var m = Sd(n);
      ye(m, function () {
        Ke("Cannot construct " + n + " due to unbound types", [e]);
      });
      Xd([a, b, d], e ? [e] : [], function (t) {
        t = t[0];
        if (e) {
          var w = t.u;
          var C = w.$;
        } else C = we.prototype;
        t = Td(m, function () {
          if (Object.getPrototypeOf(this) !== K)
            throw new ae("Use 'new' to construct " + n);
          if (void 0 === L.ca)
            throw new ae(n + " has no accessible constructor");
          var P = L.ca[arguments.length];
          if (void 0 === P)
            throw new ae(
              "Tried to invoke ctor of " +
                n +
                " with invalid number of parameters (" +
                arguments.length +
                ") - expected (" +
                Object.keys(L.ca).toString() +
                ") parameters instead!"
            );
          return P.apply(this, arguments);
        });
        var K = Object.create(C, { constructor: { value: t } });
        t.prototype = K;
        var L = new ze(n, t, K, r, w, g, k, p);
        w = new Ee(n, L, !0, !1);
        C = new Ee(n + "*", L, !1, !1);
        var va = new Ee(n + " const*", L, !1, !0);
        oe[a] = { pointerType: C, jc: va };
        Fe(m, t);
        return [w, C, va];
      });
    }
    Le.h = "vppppppppppppp";
    function Me(a) {
      var b = Function;
      if (!(b instanceof Function))
        throw new TypeError(
          "new_ called with constructor type " +
            typeof b +
            " which is not a function"
        );
      var d = Td(b.name || "unknownFunctionName", function () {});
      d.prototype = b.prototype;
      d = new d();
      a = b.apply(d, a);
      return a instanceof Object ? a : d;
    }
    function Ne(a, b, d, e, f) {
      var g = b.length;
      2 > g &&
        W(
          "argTypes array size mismatch! Must at least get return value and 'this' types!"
        );
      var h = null !== b[1] && null !== d,
        k = !1;
      for (d = 1; d < b.length; ++d)
        if (null !== b[d] && void 0 === b[d].I) {
          k = !0;
          break;
        }
      var l = "void" !== b[0].name,
        p = "",
        n = "";
      for (d = 0; d < g - 2; ++d)
        (p += (0 !== d ? ", " : "") + "arg" + d),
          (n += (0 !== d ? ", " : "") + "arg" + d + "Wired");
      a =
        "return function " +
        Sd(a) +
        "(" +
        p +
        ") {\nif (arguments.length !== " +
        (g - 2) +
        ") {\nthrowBindingError('function " +
        a +
        " called with ' + arguments.length + ' arguments, expected " +
        (g - 2) +
        " args!');\n}\n";
      k && (a += "var destructors = [];\n");
      var q = k ? "destructors" : "null";
      p =
        "throwBindingError invoker fn runDestructors retType classParam".split(
          " "
        );
      e = [W, e, f, Nd, b[0], b[1]];
      h && (a += "var thisWired = classParam.toWireType(" + q + ", this);\n");
      for (d = 0; d < g - 2; ++d)
        (a +=
          "var arg" +
          d +
          "Wired = argType" +
          d +
          ".toWireType(" +
          q +
          ", arg" +
          d +
          "); // " +
          b[d + 2].name +
          "\n"),
          p.push("argType" + d),
          e.push(b[d + 2]);
      h && (n = "thisWired" + (0 < n.length ? ", " : "") + n);
      a +=
        (l ? "var rv = " : "") +
        "invoker(fn" +
        (0 < n.length ? ", " : "") +
        n +
        ");\n";
      if (k) a += "runDestructors(destructors);\n";
      else
        for (d = h ? 1 : 2; d < b.length; ++d)
          (g = 1 === d ? "thisWired" : "arg" + (d - 2) + "Wired"),
            null !== b[d].I &&
              ((a += g + "_dtor(" + g + "); // " + b[d].name + "\n"),
              p.push(g + "_dtor"),
              e.push(b[d].I));
      l && (a += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
      p.push(a + "}\n");
      return Me(p).apply(null, e);
    }
    function Oe(a, b) {
      for (var d = [], e = 0; e < a; e++) d.push(D[(b + 4 * e) >> 2]);
      return d;
    }
    function Pe(a, b, d, e, f, g, h) {
      var k = Oe(d, e);
      b = V(b);
      g = Y(f, g);
      Xd([], [a], function (l) {
        function p() {
          Ke("Cannot call " + n + " due to unbound types", k);
        }
        l = l[0];
        var n = l.name + "." + b;
        b.startsWith("@@") && (b = Symbol[b.substring(2)]);
        var q = l.u.constructor;
        void 0 === q[b]
          ? ((p.ja = d - 1), (q[b] = p))
          : (xe(q, b, n), (q[b].F[d - 1] = p));
        Xd([], k, function (r) {
          r = Ne(n, [r[0], null].concat(r.slice(1)), null, g, h);
          void 0 === q[b].F
            ? ((r.ja = d - 1), (q[b] = r))
            : (q[b].F[d - 1] = r);
          return [];
        });
        return [];
      });
    }
    Pe.h = "vppipppp";
    function Qe(a, b, d, e, f, g) {
      0 < b || x();
      var h = Oe(b, d);
      f = Y(e, f);
      Xd([], [a], function (k) {
        k = k[0];
        var l = "constructor " + k.name;
        void 0 === k.u.ca && (k.u.ca = []);
        if (void 0 !== k.u.ca[b - 1])
          throw new ae(
            "Cannot register multiple constructors with identical number of parameters (" +
              (b - 1) +
              ") for class '" +
              k.name +
              "'! Overload resolution is currently only performed using the parameter count, not actual type info!"
          );
        k.u.ca[b - 1] = () => {
          Ke("Cannot construct " + k.name + " due to unbound types", h);
        };
        Xd([], h, function (p) {
          p.splice(1, 0, null);
          k.u.ca[b - 1] = Ne(l, p, null, f, g);
          return [];
        });
        return [];
      });
    }
    Qe.h = "vpipppp";
    function Re(a, b, d, e, f, g, h, k) {
      var l = Oe(d, e);
      b = V(b);
      g = Y(f, g);
      Xd([], [a], function (p) {
        function n() {
          Ke("Cannot call " + q + " due to unbound types", l);
        }
        p = p[0];
        var q = p.name + "." + b;
        b.startsWith("@@") && (b = Symbol[b.substring(2)]);
        k && p.u.Vc.push(b);
        var r = p.u.$,
          m = r[b];
        void 0 === m ||
        (void 0 === m.F && m.className !== p.name && m.ja === d - 2)
          ? ((n.ja = d - 2), (n.className = p.name), (r[b] = n))
          : (xe(r, b, q), (r[b].F[d - 2] = n));
        Xd([], l, function (t) {
          t = Ne(q, t, p, g, h);
          void 0 === r[b].F
            ? ((t.ja = d - 2), (r[b] = t))
            : (r[b].F[d - 2] = t);
          return [];
        });
        return [];
      });
    }
    Re.h = "vppippppi";
    function Se(a, b, d) {
      a instanceof Object || W(d + ' with invalid "this": ' + a);
      a instanceof b.u.constructor ||
        W(d + ' incompatible with "this" of type ' + a.constructor.name);
      a.l.v ||
        W("cannot call emscripten binding method " + d + " on deleted object");
      return Ae(a.l.v, a.l.C.u, b.u);
    }
    function Te(a, b, d, e, f, g, h, k, l, p) {
      b = V(b);
      f = Y(e, f);
      Xd([], [a], function (n) {
        n = n[0];
        var q = n.name + "." + b,
          r = {
            get: function () {
              Ke("Cannot access " + q + " due to unbound types", [d, h]);
            },
            enumerable: !0,
            configurable: !0,
          };
        r.set = l
          ? () => {
              Ke("Cannot access " + q + " due to unbound types", [d, h]);
            }
          : () => {
              W(q + " is a read-only property");
            };
        Object.defineProperty(n.u.$, b, r);
        Xd([], l ? [d, h] : [d], function (m) {
          var t = m[0],
            w = {
              get: function () {
                var K = Se(this, n, q + " getter");
                return t.fromWireType(f(g, K));
              },
              enumerable: !0,
            };
          if (l) {
            l = Y(k, l);
            var C = m[1];
            w.set = function (K) {
              var L = Se(this, n, q + " setter"),
                va = [];
              l(p, L, C.toWireType(va, K));
              Nd(va);
            };
          }
          Object.defineProperty(n.u.$, b, w);
          return [];
        });
        return [];
      });
    }
    Te.h = "vpppppppppp";
    var Ue = [],
      Ve = [
        {},
        { value: void 0 },
        { value: null },
        { value: !0 },
        { value: !1 },
      ];
    function We(a) {
      4 < a && 0 === --Ve[a].ba && ((Ve[a] = void 0), Ue.push(a));
    }
    We.h = "vp";
    var Z = (a) => {
        a || W("Cannot use deleted val. handle = " + a);
        return Ve[a].value;
      },
      X = (a) => {
        switch (a) {
          case void 0:
            return 1;
          case null:
            return 2;
          case !0:
            return 3;
          case !1:
            return 4;
          default:
            var b = Ue.length ? Ue.pop() : Ve.length;
            Ve[b] = { ba: 1, value: a };
            return b;
        }
      };
    function Xe(a, b) {
      b = V(b);
      Yd(a, {
        name: b,
        fromWireType: function (d) {
          var e = Z(d);
          We(d);
          return e;
        },
        toWireType: function (d, e) {
          return X(e);
        },
        argPackAdvance: 8,
        readValueFromPointer: Od,
        I: null,
      });
    }
    Xe.h = "vpp";
    function Ye(a, b, d) {
      var e = de(a, b, d);
      switch (b) {
        case 0:
          return function (f) {
            return this.fromWireType(e[f]);
          };
        case 1:
          return function (f) {
            return this.fromWireType(e[f >> 1]);
          };
        case 2:
          return function (f) {
            return this.fromWireType(e[f >> 2]);
          };
      }
    }
    function Ze(a, b, d, e) {
      function f() {}
      d = be(d);
      b = V(b);
      f.values = {};
      Yd(a, {
        name: b,
        constructor: f,
        fromWireType: function (g) {
          return this.constructor.values[g];
        },
        toWireType: function (g, h) {
          return h.value;
        },
        argPackAdvance: 8,
        readValueFromPointer: Ye(b, d, e),
        I: null,
      });
      ye(b, f);
    }
    Ze.h = "vpppi";
    function $e(a, b) {
      var d = Qd[a];
      void 0 === d && W(b + " has unknown type " + He(a));
      return d;
    }
    function af(a, b, d) {
      var e = $e(a, "enum");
      b = V(b);
      a = e.constructor;
      e = Object.create(e.constructor.prototype, {
        value: { value: d },
        constructor: { value: Td(e.name + "_" + b, function () {}) },
      });
      a.values[d] = e;
      a[b] = e;
    }
    af.h = "vppi";
    function bf(a, b) {
      var d = ce(a, b);
      switch (b) {
        case 2:
          return function (e) {
            return this.fromWireType(d[e >> 2]);
          };
        case 3:
          return function (e) {
            return this.fromWireType(d[e >> 3]);
          };
      }
    }
    function cf(a, b, d) {
      d = be(d);
      b = V(b);
      Yd(a, {
        name: b,
        fromWireType: function (e) {
          return e;
        },
        toWireType: function (e, f) {
          return f;
        },
        argPackAdvance: 8,
        readValueFromPointer: bf(b, d),
        I: null,
      });
    }
    cf.h = "vppp";
    function df(a, b, d, e, f, g) {
      var h = Oe(b, d);
      a = V(a);
      f = Y(e, f);
      ye(
        a,
        function () {
          Ke("Cannot call " + a + " due to unbound types", h);
        },
        b - 1
      );
      Xd([], h, function (k) {
        Fe(a, Ne(a, [k[0], null].concat(k.slice(1)), null, f, g), b - 1);
        return [];
      });
    }
    df.h = "vpipppp";
    function ef(a, b, d, e, f) {
      b = V(b);
      -1 === f && (f = 4294967295);
      f = be(d);
      var g = (k) => k;
      if (0 === e) {
        var h = 32 - 8 * d;
        g = (k) => (k << h) >>> h;
      }
      d = b.includes("unsigned")
        ? function (k, l) {
            return l >>> 0;
          }
        : function (k, l) {
            return l;
          };
      Yd(a, {
        name: b,
        fromWireType: g,
        toWireType: d,
        argPackAdvance: 8,
        readValueFromPointer: fe(b, f, 0 !== e),
        I: null,
      });
    }
    ef.h = "vpppii";
    function ff(a, b, d) {
      function e(g) {
        g >>= 2;
        return new f(Ba, D[g + 1], D[g]);
      }
      var f = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
        BigInt64Array,
        BigUint64Array,
      ][b];
      d = V(d);
      Yd(
        a,
        {
          name: d,
          fromWireType: e,
          argPackAdvance: 8,
          readValueFromPointer: e,
        },
        { Fc: !0 }
      );
    }
    ff.h = "vpip";
    function gf(a, b) {
      b = V(b);
      var d = "std::string" === b;
      Yd(a, {
        name: b,
        fromWireType: function (e) {
          var f = D[e >> 2],
            g = e + 4;
          if (d)
            for (var h = g, k = 0; k <= f; ++k) {
              var l = g + k;
              if (k == f || 0 == z[l]) {
                h = y(h, l - h);
                if (void 0 === p) var p = h;
                else (p += String.fromCharCode(0)), (p += h);
                h = l + 1;
              }
            }
          else {
            p = Array(f);
            for (k = 0; k < f; ++k) p[k] = String.fromCharCode(z[g + k]);
            p = p.join("");
          }
          Je(e);
          return p;
        },
        toWireType: function (e, f) {
          f instanceof ArrayBuffer && (f = new Uint8Array(f));
          var g = "string" == typeof f;
          g ||
            f instanceof Uint8Array ||
            f instanceof Uint8ClampedArray ||
            f instanceof Int8Array ||
            W("Cannot pass non-string to std::string");
          var h = d && g ? Aa(f) : f.length;
          var k = Vc(4 + h + 1),
            l = k + 4;
          D[k >> 2] = h;
          if (d && g) za(f, z, l, h + 1);
          else if (g)
            for (g = 0; g < h; ++g) {
              var p = f.charCodeAt(g);
              255 < p &&
                (Je(l),
                W("String has UTF-16 code units that do not fit in 8 bits"));
              z[l + g] = p;
            }
          else for (g = 0; g < h; ++g) z[l + g] = f[g];
          null !== e && e.push(Je, k);
          return k;
        },
        argPackAdvance: 8,
        readValueFromPointer: Od,
        I: function (e) {
          Je(e);
        },
      });
    }
    gf.h = "vpp";
    var hf = new TextDecoder("utf-16le");
    function jf(a, b) {
      var d = a >> 1;
      for (b = d + b / 2; !(d >= b) && Da[d]; ) ++d;
      return hf.decode(z.slice(a, d << 1));
    }
    function kf(a, b, d) {
      void 0 === d && (d = 2147483647);
      if (2 > d) return 0;
      d -= 2;
      var e = b;
      d = d < 2 * a.length ? d / 2 : a.length;
      for (var f = 0; f < d; ++f) (Ca[b >> 1] = a.charCodeAt(f)), (b += 2);
      Ca[b >> 1] = 0;
      return b - e;
    }
    function lf(a) {
      return 2 * a.length;
    }
    function mf(a, b) {
      for (var d = 0, e = ""; !(d >= b / 4); ) {
        var f = B[(a + 4 * d) >> 2];
        if (0 == f) break;
        ++d;
        65536 <= f
          ? ((f -= 65536),
            (e += String.fromCharCode(55296 | (f >> 10), 56320 | (f & 1023))))
          : (e += String.fromCharCode(f));
      }
      return e;
    }
    function nf(a, b, d) {
      void 0 === d && (d = 2147483647);
      if (4 > d) return 0;
      var e = b;
      d = e + d - 4;
      for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);
        if (55296 <= g && 57343 >= g) {
          var h = a.charCodeAt(++f);
          g = (65536 + ((g & 1023) << 10)) | (h & 1023);
        }
        B[b >> 2] = g;
        b += 4;
        if (b + 4 > d) break;
      }
      B[b >> 2] = 0;
      return b - e;
    }
    function of(a) {
      for (var b = 0, d = 0; d < a.length; ++d) {
        var e = a.charCodeAt(d);
        55296 <= e && 57343 >= e && ++d;
        b += 4;
      }
      return b;
    }
    function pf(a, b, d) {
      d = V(d);
      if (2 === b) {
        var e = jf;
        var f = kf;
        var g = lf;
        var h = 1;
      } else 4 === b && ((e = mf), (f = nf), (g = of), (h = 2));
      Yd(a, {
        name: d,
        fromWireType: function (k) {
          for (
            var l = D[k >> 2], p = de(d, h, !1), n, q = k + 4, r = 0;
            r <= l;
            ++r
          ) {
            var m = k + 4 + r * b;
            if (r == l || 0 == p[m >> h])
              (q = e(q, m - q)),
                void 0 === n
                  ? (n = q)
                  : ((n += String.fromCharCode(0)), (n += q)),
                (q = m + b);
          }
          Je(k);
          return n;
        },
        toWireType: function (k, l) {
          "string" != typeof l &&
            W("Cannot pass non-string to C++ string type " + d);
          var p = g(l),
            n = Vc(4 + p + b);
          D[n >> 2] = p >> h;
          f(l, n + 4, p + b);
          null !== k && k.push(Je, n);
          return n;
        },
        argPackAdvance: 8,
        readValueFromPointer: Od,
        I: function (k) {
          Je(k);
        },
      });
    }
    pf.h = "vppp";
    function qf(a, b, d, e, f, g) {
      Md[a] = { name: V(b), hb: Y(d, e), Z: Y(f, g), Cb: [] };
    }
    qf.h = "viiiiii";
    function rf(a, b, d, e, f, g, h, k, l, p) {
      Md[a].Cb.push({
        tc: V(b),
        Bc: d,
        Fa: Y(e, f),
        Ac: g,
        cd: h,
        bd: Y(k, l),
        dd: p,
      });
    }
    rf.h = "viiiiiiiiii";
    function sf(a, b) {
      b = V(b);
      Yd(a, {
        Jc: !0,
        name: b,
        argPackAdvance: 0,
        fromWireType: function () {},
        toWireType: function () {},
      });
    }
    sf.h = "vpp";
    function tf(a) {
      var b = Aa(a) + 1,
        d = Vc(b);
      d && za(a, A, d, b);
      return d;
    }
    function uf() {
      var a = Vc(4 * (qa.length + 1)),
        b = a >> 2;
      qa.forEach((d) => {
        B[b++] = tf(d);
      });
      B[b] = 0;
      return a;
    }
    uf.h = "i";
    function Ic(a) {
      Atomics.store(B, a >> 2, 1);
      Hc() && vf(a);
      Atomics.compareExchange(B, a >> 2, 1, 0);
    }
    c.executeNotifiedProxyingQueue = Ic;
    function wf() {
      return -1;
    }
    wf.h = "iiii";
    function xf() {
      throw Infinity;
    }
    xf.h = "v";
    function yf(a, b, d) {
      a = Z(a);
      b = $e(b, "emval::as");
      var e = [],
        f = X(e);
      D[d >> 2] = f;
      return b.toWireType(e, a);
    }
    yf.h = "dppp";
    function zf(a, b) {
      for (var d = Array(a), e = 0; e < a; ++e)
        d[e] = $e(D[(b + 4 * e) >> 2], "parameter " + e);
      return d;
    }
    function Af(a, b, d, e) {
      a = Z(a);
      d = zf(b, d);
      for (var f = Array(b), g = 0; g < b; ++g) {
        var h = d[g];
        f[g] = h.readValueFromPointer(e);
        e += h.argPackAdvance;
      }
      a = a.apply(void 0, f);
      return X(a);
    }
    Af.h = "ppppp";
    var Bf = {};
    function Cf(a) {
      var b = Bf[a];
      return void 0 === b ? V(a) : b;
    }
    var Df = [];
    function Ef(a, b, d, e, f) {
      a = Df[a];
      b = Z(b);
      d = Cf(d);
      var g = [];
      D[e >> 2] = X(g);
      return a(b, d, g, f);
    }
    Ef.h = "dppppp";
    function Ff() {
      return "object" == typeof globalThis
        ? globalThis
        : Function("return this")();
    }
    function Gf(a) {
      if (0 === a) return X(Ff());
      a = Cf(a);
      return X(Ff()[a]);
    }
    Gf.h = "pp";
    function Hf(a) {
      var b = Df.length;
      Df.push(a);
      return b;
    }
    var If = [];
    function Jf(a, b) {
      var d = zf(a, b),
        e = d[0];
      b =
        e.name +
        "_$" +
        d
          .slice(1)
          .map(function (n) {
            return n.name;
          })
          .join("_") +
        "$";
      var f = If[b];
      if (void 0 !== f) return f;
      f = ["retType"];
      for (var g = [e], h = "", k = 0; k < a - 1; ++k)
        (h += (0 !== k ? ", " : "") + "arg" + k),
          f.push("argType" + k),
          g.push(d[1 + k]);
      var l =
          "return function " +
          Sd("methodCaller_" + b) +
          "(handle, name, destructors, args) {\n",
        p = 0;
      for (k = 0; k < a - 1; ++k)
        (l +=
          "    var arg" +
          k +
          " = argType" +
          k +
          ".readValueFromPointer(args" +
          (p ? "+" + p : "") +
          ");\n"),
          (p += d[k + 1].argPackAdvance);
      l += "    var rv = handle[name](" + h + ");\n";
      for (k = 0; k < a - 1; ++k)
        d[k + 1].deleteObject &&
          (l += "    argType" + k + ".deleteObject(arg" + k + ");\n");
      e.Jc || (l += "    return retType.toWireType(destructors, rv);\n");
      f.push(l + "};\n");
      a = Me(f).apply(null, g);
      f = Hf(a);
      return (If[b] = f);
    }
    Jf.h = "ppp";
    function Kf(a) {
      a = Cf(a);
      return X(c[a]);
    }
    Kf.h = "pp";
    function Lf(a, b) {
      a = Z(a);
      b = Z(b);
      return X(a[b]);
    }
    Lf.h = "ppp";
    function Mf(a) {
      4 < a && (Ve[a].ba += 1);
    }
    Mf.h = "vp";
    function Nf(a, b) {
      a = Z(a);
      b = Z(b);
      return a instanceof b;
    }
    Nf.h = "ipp";
    function Of(a) {
      a = Z(a);
      return "number" == typeof a;
    }
    Of.h = "ip";
    function Pf(a) {
      a = Z(a);
      return "string" == typeof a;
    }
    Pf.h = "ip";
    function Qf(a) {
      for (var b = "", d = 0; d < a; ++d)
        b += (0 !== d ? ", " : "") + "arg" + d;
      var e =
        "return function emval_allocator_" +
        a +
        "(constructor, argTypes, args) {\n  var HEAPU32 = getMemory();\n";
      for (d = 0; d < a; ++d)
        e +=
          "var argType" +
          d +
          " = requireRegisteredType(HEAPU32[((argTypes)>>2)], 'parameter " +
          d +
          "');\nvar arg" +
          d +
          " = argType" +
          d +
          ".readValueFromPointer(args);\nargs += argType" +
          d +
          "['argPackAdvance'];\nargTypes += 4;\n";
      return new Function(
        "requireRegisteredType",
        "Module",
        "valueToHandle",
        "getMemory",
        e +
          ("var obj = new constructor(" +
            b +
            ");\nreturn valueToHandle(obj);\n}\n")
      )($e, c, X, () => D);
    }
    var Rf = {};
    function Sf(a, b, d, e) {
      a = Z(a);
      var f = Rf[b];
      f || ((f = Qf(b)), (Rf[b] = f));
      return f(a, d, e);
    }
    Sf.h = "ppipp";
    function Tf(a) {
      return X(Cf(a));
    }
    Tf.h = "pp";
    function Uf(a) {
      var b = Z(a);
      Nd(b);
      We(a);
    }
    Uf.h = "vp";
    function Vf(a, b, d) {
      a = Z(a);
      b = Z(b);
      d = Z(d);
      a[b] = d;
    }
    Vf.h = "vppp";
    function Wf(a, b) {
      a = $e(a, "_emval_take_value");
      a = a.readValueFromPointer(b);
      return X(a);
    }
    Wf.h = "ppp";
    function Xf(a) {
      a = Z(a);
      return X(typeof a);
    }
    Xf.h = "pp";
    function Yf(a, b) {
      a = new Date(1e3 * (D[a >> 2] + 4294967296 * B[(a + 4) >> 2]));
      B[b >> 2] = a.getUTCSeconds();
      B[(b + 4) >> 2] = a.getUTCMinutes();
      B[(b + 8) >> 2] = a.getUTCHours();
      B[(b + 12) >> 2] = a.getUTCDate();
      B[(b + 16) >> 2] = a.getUTCMonth();
      B[(b + 20) >> 2] = a.getUTCFullYear() - 1900;
      B[(b + 24) >> 2] = a.getUTCDay();
      B[(b + 28) >> 2] =
        ((a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) /
          864e5) |
        0;
    }
    Yf.h = "ipp";
    function Zf(a, b) {
      a = new Date(1e3 * (D[a >> 2] + 4294967296 * B[(a + 4) >> 2]));
      B[b >> 2] = a.getSeconds();
      B[(b + 4) >> 2] = a.getMinutes();
      B[(b + 8) >> 2] = a.getHours();
      B[(b + 12) >> 2] = a.getDate();
      B[(b + 16) >> 2] = a.getMonth();
      B[(b + 20) >> 2] = a.getFullYear() - 1900;
      B[(b + 24) >> 2] = a.getDay();
      var d = new Date(a.getFullYear(), 0, 1);
      B[(b + 28) >> 2] = ((a.getTime() - d.getTime()) / 864e5) | 0;
      B[(b + 36) >> 2] = -(60 * a.getTimezoneOffset());
      var e = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
      d = d.getTimezoneOffset();
      B[(b + 32) >> 2] =
        (e != d && a.getTimezoneOffset() == Math.min(d, e)) | 0;
    }
    Zf.h = "ipp";
    function $f(a, b, d, e, f, g, h) {
      if (u) return O(18, 1, a, b, d, e, f, g, h);
      try {
        var k = N(e),
          l = FS.fa(k, a, f, b, d),
          p = l.v;
        B[g >> 2] = l.ob;
        D[h >> 2] = p;
        return 0;
      } catch (n) {
        if ("undefined" == typeof FS || !(n instanceof FS.g)) throw n;
        return -n.A;
      }
    }
    $f.h = "ipiiippp";
    function ag(a, b, d, e, f, g) {
      if (u) return O(19, 1, a, b, d, e, f, g);
      try {
        var h = N(f);
        if (d & 2) {
          if (!FS.isFile(h.node.mode)) throw new FS.g(43);
          e & 2 || FS.na(h, z.slice(a, a + b), g, b, e);
        }
      } catch (k) {
        if ("undefined" == typeof FS || !(k instanceof FS.g)) throw k;
        return -k.A;
      }
    }
    ag.h = "ippiiip";
    function bg(a, b, d) {
      function e(l) {
        return (l = l.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? l[1] : "GMT";
      }
      if (u) return O(20, 1, a, b, d);
      var f = new Date().getFullYear(),
        g = new Date(f, 0, 1),
        h = new Date(f, 6, 1);
      f = g.getTimezoneOffset();
      var k = h.getTimezoneOffset();
      B[a >> 2] = 60 * Math.max(f, k);
      B[b >> 2] = Number(f != k);
      a = e(g);
      b = e(h);
      a = tf(a);
      b = tf(b);
      k < f
        ? ((D[d >> 2] = a), (D[(d + 4) >> 2] = b))
        : ((D[d >> 2] = b), (D[(d + 4) >> 2] = a));
    }
    bg.h = "viii";
    function cg(a, b, d) {
      cg.ec || ((cg.ec = !0), bg(a, b, d));
    }
    cg.h = "vppp";
    function dg() {
      x("");
    }
    c._abort = dg;
    dg.h = "v";
    function eg() {
      return Date.now();
    }
    eg.h = "d";
    function fg() {
      Sa += 1;
      throw "unwind";
    }
    fg.h = "v";
    function gg() {
      return z.length;
    }
    gg.h = "p";
    function hg(a, b, d) {
      z.copyWithin(a, b, b + d);
    }
    hg.h = "vppp";
    function Fc() {
      return navigator.hardwareConcurrency;
    }
    function Hd(a) {
      var b = T();
      a = a();
      R(b);
      return a;
    }
    function O(a, b) {
      var d = arguments.length - 2,
        e = arguments;
      return Hd(() => {
        for (var f = 2 * d, g = Fd(8 * f), h = g >> 3, k = 0; k < d; k++) {
          var l = e[2 + k];
          "bigint" == typeof l
            ? ((Fa[h + 2 * k] = 1n), (Fa[h + 2 * k + 1] = l))
            : ((Fa[h + 2 * k] = 0n), (Ha[h + 2 * k + 1] = l));
        }
        return ig(a, f, g, b);
      });
    }
    var jg = [];
    function kg() {
      x("OOM");
    }
    kg.h = "ip";
    function lg() {
      if (!mg) {
        var a = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG:
              (
                ("object" == typeof navigator &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                "C"
              ).replace("-", "_") + ".UTF-8",
            _: ea || "./this.program",
          },
          b;
        for (b in Dd) void 0 === Dd[b] ? delete a[b] : (a[b] = Dd[b]);
        var d = [];
        for (b in a) d.push(b + "=" + a[b]);
        mg = d;
      }
      return mg;
    }
    var mg;
    function ng(a, b) {
      if (u) return O(21, 1, a, b);
      var d = 0;
      lg().forEach(function (e, f) {
        var g = b + d;
        f = D[(a + 4 * f) >> 2] = g;
        for (g = 0; g < e.length; ++g) A[f++ >> 0] = e.charCodeAt(g);
        A[f >> 0] = 0;
        d += e.length + 1;
      });
      return 0;
    }
    ng.h = "ipp";
    function og(a, b) {
      if (u) return O(22, 1, a, b);
      var d = lg();
      D[a >> 2] = d.length;
      var e = 0;
      d.forEach(function (f) {
        e += f.length + 1;
      });
      D[b >> 2] = e;
      return 0;
    }
    og.h = "ipp";
    function pg(a) {
      if (u) return O(23, 1, a);
      try {
        var b = N(a);
        FS.close(b);
        return 0;
      } catch (d) {
        if ("undefined" == typeof FS || !(d instanceof FS.g)) throw d;
        return d.A;
      }
    }
    pg.h = "ii";
    function qg(a, b) {
      if (u) return O(24, 1, a, b);
      try {
        var d = N(a),
          e = d.D ? 2 : FS.isDir(d.mode) ? 3 : FS.isLink(d.mode) ? 7 : 4;
        A[b >> 0] = e;
        return 0;
      } catch (f) {
        if ("undefined" == typeof FS || !(f instanceof FS.g)) throw f;
        return f.A;
      }
    }
    qg.h = "iip";
    function rg(a, b, d, e) {
      if (u) return O(25, 1, a, b, d, e);
      try {
        a: {
          var f = N(a);
          a = b;
          for (var g = (b = 0); g < d; g++) {
            var h = D[a >> 2],
              k = D[(a + 4) >> 2];
            a += 8;
            var l = FS.read(f, A, h, k, void 0);
            if (0 > l) {
              var p = -1;
              break a;
            }
            b += l;
            if (l < k) break;
          }
          p = b;
        }
        D[e >> 2] = p;
        return 0;
      } catch (n) {
        if ("undefined" == typeof FS || !(n instanceof FS.g)) throw n;
        return n.A;
      }
    }
    rg.h = "iippp";
    function sg(a, b, d, e) {
      if (u) return O(26, 1, a, b, d, e);
      try {
        b = rd(b);
        if (isNaN(b)) return 61;
        var f = N(a);
        FS.llseek(f, b, d);
        I = [
          f.position >>> 0,
          ((H = f.position),
          1 <= +Math.abs(H)
            ? 0 < H
              ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0
              : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0
            : 0),
        ];
        B[e >> 2] = I[0];
        B[(e + 4) >> 2] = I[1];
        f.Xa && 0 === b && 0 === d && (f.Xa = null);
        return 0;
      } catch (g) {
        if ("undefined" == typeof FS || !(g instanceof FS.g)) throw g;
        return g.A;
      }
    }
    sg.h = "iijip";
    function tg(a, b, d, e) {
      if (u) return O(27, 1, a, b, d, e);
      try {
        a: {
          var f = N(a);
          a = b;
          for (var g = (b = 0); g < d; g++) {
            var h = D[a >> 2],
              k = D[(a + 4) >> 2];
            a += 8;
            var l = FS.write(f, A, h, k, void 0);
            if (0 > l) {
              var p = -1;
              break a;
            }
            b += l;
          }
          p = b;
        }
        D[e >> 2] = p;
        return 0;
      } catch (n) {
        if ("undefined" == typeof FS || !(n instanceof FS.g)) throw n;
        return n.A;
      }
    }
    tg.h = "iippp";
    function ug(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }
    var vg = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      wg = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function xg(a, b, d, e) {
      function f(m, t, w) {
        for (m = "number" == typeof m ? m.toString() : m || ""; m.length < t; )
          m = w[0] + m;
        return m;
      }
      function g(m, t) {
        return f(m, t, "0");
      }
      function h(m, t) {
        function w(K) {
          return 0 > K ? -1 : 0 < K ? 1 : 0;
        }
        var C;
        0 === (C = w(m.getFullYear() - t.getFullYear())) &&
          0 === (C = w(m.getMonth() - t.getMonth())) &&
          (C = w(m.getDate() - t.getDate()));
        return C;
      }
      function k(m) {
        switch (m.getDay()) {
          case 0:
            return new Date(m.getFullYear() - 1, 11, 29);
          case 1:
            return m;
          case 2:
            return new Date(m.getFullYear(), 0, 3);
          case 3:
            return new Date(m.getFullYear(), 0, 2);
          case 4:
            return new Date(m.getFullYear(), 0, 1);
          case 5:
            return new Date(m.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(m.getFullYear() - 1, 11, 30);
        }
      }
      function l(m) {
        var t = m.ha;
        for (m = new Date(new Date(m.ia + 1900, 0, 1).getTime()); 0 < t; ) {
          var w = m.getMonth(),
            C = (ug(m.getFullYear()) ? vg : wg)[w];
          if (t > C - m.getDate())
            (t -= C - m.getDate() + 1),
              m.setDate(1),
              11 > w
                ? m.setMonth(w + 1)
                : (m.setMonth(0), m.setFullYear(m.getFullYear() + 1));
          else {
            m.setDate(m.getDate() + t);
            break;
          }
        }
        w = new Date(m.getFullYear() + 1, 0, 4);
        t = k(new Date(m.getFullYear(), 0, 4));
        w = k(w);
        return 0 >= h(t, m)
          ? 0 >= h(w, m)
            ? m.getFullYear() + 1
            : m.getFullYear()
          : m.getFullYear() - 1;
      }
      var p = B[(e + 40) >> 2];
      e = {
        ld: B[e >> 2],
        kd: B[(e + 4) >> 2],
        Oa: B[(e + 8) >> 2],
        kb: B[(e + 12) >> 2],
        Pa: B[(e + 16) >> 2],
        ia: B[(e + 20) >> 2],
        S: B[(e + 24) >> 2],
        ha: B[(e + 28) >> 2],
        Ld: B[(e + 32) >> 2],
        jd: B[(e + 36) >> 2],
        md: p ? y(p) : "",
      };
      d = y(d);
      p = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y",
      };
      for (var n in p) d = d.replace(new RegExp(n, "g"), p[n]);
      var q = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
          " "
        ),
        r =
          "January February March April May June July August September October November December".split(
            " "
          );
      p = {
        "%a": function (m) {
          return q[m.S].substring(0, 3);
        },
        "%A": function (m) {
          return q[m.S];
        },
        "%b": function (m) {
          return r[m.Pa].substring(0, 3);
        },
        "%B": function (m) {
          return r[m.Pa];
        },
        "%C": function (m) {
          return g(((m.ia + 1900) / 100) | 0, 2);
        },
        "%d": function (m) {
          return g(m.kb, 2);
        },
        "%e": function (m) {
          return f(m.kb, 2, " ");
        },
        "%g": function (m) {
          return l(m).toString().substring(2);
        },
        "%G": function (m) {
          return l(m);
        },
        "%H": function (m) {
          return g(m.Oa, 2);
        },
        "%I": function (m) {
          m = m.Oa;
          0 == m ? (m = 12) : 12 < m && (m -= 12);
          return g(m, 2);
        },
        "%j": function (m) {
          for (
            var t = 0, w = 0;
            w <= m.Pa - 1;
            t += (ug(m.ia + 1900) ? vg : wg)[w++]
          );
          return g(m.kb + t, 3);
        },
        "%m": function (m) {
          return g(m.Pa + 1, 2);
        },
        "%M": function (m) {
          return g(m.kd, 2);
        },
        "%n": function () {
          return "\n";
        },
        "%p": function (m) {
          return 0 <= m.Oa && 12 > m.Oa ? "AM" : "PM";
        },
        "%S": function (m) {
          return g(m.ld, 2);
        },
        "%t": function () {
          return "\t";
        },
        "%u": function (m) {
          return m.S || 7;
        },
        "%U": function (m) {
          return g(Math.floor((m.ha + 7 - m.S) / 7), 2);
        },
        "%V": function (m) {
          var t = Math.floor((m.ha + 7 - ((m.S + 6) % 7)) / 7);
          2 >= (m.S + 371 - m.ha - 2) % 7 && t++;
          if (t)
            53 == t &&
              ((w = (m.S + 371 - m.ha) % 7),
              4 == w || (3 == w && ug(m.ia)) || (t = 1));
          else {
            t = 52;
            var w = (m.S + 7 - m.ha - 1) % 7;
            (4 == w || (5 == w && ug((m.ia % 400) - 1))) && t++;
          }
          return g(t, 2);
        },
        "%w": function (m) {
          return m.S;
        },
        "%W": function (m) {
          return g(Math.floor((m.ha + 7 - ((m.S + 6) % 7)) / 7), 2);
        },
        "%y": function (m) {
          return (m.ia + 1900).toString().substring(2);
        },
        "%Y": function (m) {
          return m.ia + 1900;
        },
        "%z": function (m) {
          m = m.jd;
          var t = 0 <= m;
          m = Math.abs(m) / 60;
          return (
            (t ? "+" : "-") +
            String("0000" + ((m / 60) * 100 + (m % 60))).slice(-4)
          );
        },
        "%Z": function (m) {
          return m.md;
        },
        "%%": function () {
          return "%";
        },
      };
      d = d.replace(/%%/g, "\x00\x00");
      for (n in p)
        d.includes(n) && (d = d.replace(new RegExp(n, "g"), p[n](e)));
      d = d.replace(/\0\0/g, "%");
      n = Ab(d, !1);
      if (n.length > b) return 0;
      A.set(n, a);
      return n.length - 1;
    }
    c._strftime = xg;
    xg.h = "ppppp";
    function yg(a, b, d, e) {
      return xg(a, b, d, e);
    }
    yg.h = "pppppp";
    function zg(a) {
      if (!a) return 0;
      B[pd() >> 2] = 52;
      return -1;
    }
    c._system = zg;
    zg.h = "ip";
    c.requestFullscreen = function (a, b) {
      vc(a, b);
    };
    c.requestAnimationFrame = function (a) {
      rb(a);
    };
    c.setCanvasSize = function (a, b, d) {
      xc(c.canvas, a, b);
      d || yc();
    };
    c.pauseMainLoop = function () {
      nb = null;
      Yb++;
    };
    c.resumeMainLoop = function () {
      Yb++;
      var a = jb,
        b = kb,
        d = lb;
      lb = null;
      Xb(d);
      ib(a, b);
      nb();
    };
    c.getUserMedia = function () {
      window.getUserMedia ||
        (window.getUserMedia =
          navigator.getUserMedia || navigator.mozGetUserMedia);
      window.getUserMedia(void 0);
    };
    c.createContext = function (a, b, d, e) {
      return rc(a, b, d, e);
    };
    var qc = {};
    function Ag(a, b, d, e) {
      a || (a = this);
      this.parent = a;
      this.mount = a.mount;
      this.sa = null;
      this.id = FS.Nc++;
      this.name = b;
      this.mode = d;
      this.m = {};
      this.s = {};
      this.wa = e;
    }
    Object.defineProperties(Ag.prototype, {
      read: {
        get: function () {
          return 365 === (this.mode & 365);
        },
        set: function (a) {
          a ? (this.mode |= 365) : (this.mode &= -366);
        },
      },
      write: {
        get: function () {
          return 146 === (this.mode & 146);
        },
        set: function (a) {
          a ? (this.mode |= 146) : (this.mode &= -147);
        },
      },
      Kb: {
        get: function () {
          return FS.isDir(this.mode);
        },
      },
      Ha: {
        get: function () {
          return FS.isChrdev(this.mode);
        },
      },
    });
    FS.Yb = Ag;
    FS.gd();
    c.FS_createPath = FS.ub;
    c.FS_createDataFile = FS.Da;
    c.FS_createPreloadedFile = FS.createPreloadedFile;
    c.FS_unlink = FS.unlink;
    c.FS_createLazyFile = FS.createLazyFile;
    c.FS_createDevice = FS.M;
    F.init();
    Vd = c.InternalError = Ud("InternalError");
    for (var Bg = Array(256), Cg = 0; 256 > Cg; ++Cg)
      Bg[Cg] = String.fromCharCode(Cg);
    $d = Bg;
    ae = c.BindingError = Ud("BindingError");
    we.prototype.isAliasOf = function (a) {
      if (!(this instanceof we && a instanceof we)) return !1;
      var b = this.l.C.u,
        d = this.l.v,
        e = a.l.C.u;
      for (a = a.l.v; b.L; ) (d = b.Ba(d)), (b = b.L);
      for (; e.L; ) (a = e.Ba(a)), (e = e.L);
      return b === e && d === a;
    };
    we.prototype.clone = function () {
      this.l.v || ie(this);
      if (this.l.va) return (this.l.count.value += 1), this;
      var a = ve,
        b = Object,
        d = b.create,
        e = Object.getPrototypeOf(this),
        f = this.l;
      a = a(
        d.call(b, e, {
          l: {
            value: {
              count: f.count,
              ka: f.ka,
              va: f.va,
              v: f.v,
              C: f.C,
              J: f.J,
              K: f.K,
            },
          },
        })
      );
      a.l.count.value += 1;
      a.l.ka = !1;
      return a;
    };
    we.prototype["delete"] = function () {
      this.l.v || ie(this);
      this.l.ka && !this.l.va && W("Object already scheduled for deletion");
      le(this);
      me(this.l);
      this.l.va || ((this.l.J = void 0), (this.l.v = void 0));
    };
    we.prototype.isDeleted = function () {
      return !this.l.v;
    };
    we.prototype.deleteLater = function () {
      this.l.v || ie(this);
      this.l.ka && !this.l.va && W("Object already scheduled for deletion");
      pe.push(this);
      1 === pe.length && re && re(qe);
      this.l.ka = !0;
      return this;
    };
    c.getInheritedInstanceCount = function () {
      return Object.keys(se).length;
    };
    c.getLiveInheritedInstances = function () {
      var a = [],
        b;
      for (b in se) se.hasOwnProperty(b) && a.push(se[b]);
      return a;
    };
    c.setAutoDeleteLater = function (a) {
      je = a;
    };
    c.flushPendingDeletes = qe;
    c.setDelayFunction = function (a) {
      re = a;
      pe.length && re && re(qe);
    };
    Ee.prototype.zc = function (a) {
      this.Qb && (a = this.Qb(a));
      return a;
    };
    Ee.prototype.yb = function (a) {
      this.Z && this.Z(a);
    };
    Ee.prototype.argPackAdvance = 8;
    Ee.prototype.readValueFromPointer = Od;
    Ee.prototype.deleteObject = function (a) {
      if (null !== a) a["delete"]();
    };
    Ee.prototype.fromWireType = function (a) {
      function b() {
        return this.Ja
          ? ue(this.u.$, { C: this.Tc, v: d, K: this, J: a })
          : ue(this.u.$, { C: this, v: a });
      }
      var d = this.zc(a);
      if (!d) return this.yb(a), null;
      var e = te(this.u, d);
      if (void 0 !== e) {
        if (0 === e.l.count.value) return (e.l.v = d), (e.l.J = a), e.clone();
        e = e.clone();
        this.yb(a);
        return e;
      }
      e = this.u.wc(d);
      e = oe[e];
      if (!e) return b.call(this);
      e = this.Ga ? e.jc : e.pointerType;
      var f = ne(d, this.u, e.u);
      return null === f
        ? b.call(this)
        : this.Ja
        ? ue(e.u.$, { C: e, v: f, K: this, J: a })
        : ue(e.u.$, { C: e, v: f });
    };
    Ge = c.UnboundTypeError = Ud("UnboundTypeError");
    c.count_emval_handles = function () {
      for (var a = 0, b = 5; b < Ve.length; ++b) void 0 !== Ve[b] && ++a;
      return a;
    };
    c.get_first_emval = function () {
      for (var a = 5; a < Ve.length; ++a) if (void 0 !== Ve[a]) return Ve[a];
      return null;
    };
    var Dg = [
        null,
        Rb,
        Tb,
        jd,
        md,
        nd,
        od,
        qd,
        sd,
        td,
        ud,
        vd,
        wd,
        xd,
        yd,
        zd,
        Ad,
        Bd,
        $f,
        ag,
        bg,
        ng,
        og,
        pg,
        qg,
        rg,
        sg,
        tg,
      ],
      Pc = {
        __assert_fail: fd,
        __call_sighandler: gd,
        __emscripten_init_main_thread_js: function (a) {
          Eg(a, !ia, 1, !ha);
          F.Ub();
        },
        __emscripten_thread_cleanup: function (a) {
          u ? postMessage({ cmd: "cleanupThread", thread: a }) : Dc(a);
        },
        __heap_base: Tc,
        __indirect_function_table: E,
        __memory_base: hd,
        __pthread_create_js: kd,
        __stack_pointer: ld,
        __syscall_dup: md,
        __syscall_faccessat: nd,
        __syscall_fcntl64: od,
        __syscall_fstat64: qd,
        __syscall_ftruncate64: sd,
        __syscall_getcwd: td,
        __syscall_ioctl: ud,
        __syscall_lstat64: vd,
        __syscall_newfstatat: wd,
        __syscall_openat: xd,
        __syscall_poll: yd,
        __syscall_rmdir: zd,
        __syscall_stat64: Ad,
        __syscall_unlinkat: Bd,
        __table_base: Cd,
        _dlinit: function (a) {
          var b = { ba: Infinity, name: "__main__", module: c.asm, global: !0 };
          Qc[b.name] = b;
          Rc[a] = b;
        },
        _dlopen_js: Kd,
        _dlsym_js: Ld,
        _embind_finalize_value_object: Zd,
        _embind_register_arithmetic_vector: function (a, b, d, e, f) {
          b = V(b);
          var g = be(d);
          Yd(a, {
            name: b,
            fromWireType: function (h) {
              for (
                var k = D[h >> 2],
                  l = e ? ce(b, g) : de(b, g, f),
                  p = Array(k),
                  n = h + d,
                  q = 0;
                q < k;
                ++q
              )
                p[q] = l[(n >> g) + q];
              Je(h);
              return p;
            },
            toWireType: function (h, k) {
              "number" == typeof k && (k = [k]);
              Array.isArray(k) ||
                W("Cannot pass non-array to C++ vector type " + b);
              k = Array.prototype.concat.apply([], k);
              var l = k.length,
                p = e ? ce(b, g) : de(b, g, f),
                n = Vc(d + l * d);
              D[n >> 2] = l;
              for (var q = n + d, r = 0; r < l; ++r) p[(q >> g) + r] = k[r];
              null !== h && h.push(Je, n);
              return n;
            },
            argPackAdvance: 8,
            readValueFromPointer: Od,
            I: function (h) {
              Je(h);
            },
          });
        },
        _embind_register_bigint: ge,
        _embind_register_bool: he,
        _embind_register_class: Le,
        _embind_register_class_class_function: Pe,
        _embind_register_class_constructor: Qe,
        _embind_register_class_function: Re,
        _embind_register_class_property: Te,
        _embind_register_emval: Xe,
        _embind_register_enum: Ze,
        _embind_register_enum_value: af,
        _embind_register_float: cf,
        _embind_register_function: df,
        _embind_register_integer: ef,
        _embind_register_memory_view: ff,
        _embind_register_std_string: gf,
        _embind_register_std_wstring: pf,
        _embind_register_value_object: qf,
        _embind_register_value_object_field: rf,
        _embind_register_void: sf,
        _emscripten_default_pthread_stack_size: function () {
          return 2097152;
        },
        _emscripten_get_dynamic_libraries_js: uf,
        _emscripten_get_now_is_monotonic: function () {
          return !0;
        },
        _emscripten_notify_task_queue: function (a, b, d, e) {
          if (a == b) setTimeout(() => Ic(e));
          else if (u)
            postMessage({
              targetThread: a,
              cmd: "processProxyingQueue",
              queue: e,
            });
          else {
            a = F.Y[a];
            if (!a) return;
            a.postMessage({ cmd: "processProxyingQueue", queue: e });
          }
          return 1;
        },
        _emscripten_set_offscreencanvas_size: wf,
        _emscripten_throw_longjmp: xf,
        _emval_as: yf,
        _emval_call: Af,
        _emval_call_method: Ef,
        _emval_decref: We,
        _emval_get_global: Gf,
        _emval_get_method_caller: Jf,
        _emval_get_module_property: Kf,
        _emval_get_property: Lf,
        _emval_incref: Mf,
        _emval_instanceof: Nf,
        _emval_is_number: Of,
        _emval_is_string: Pf,
        _emval_new: Sf,
        _emval_new_cstring: Tf,
        _emval_run_destructors: Uf,
        _emval_set_property: Vf,
        _emval_take_value: Wf,
        _emval_typeof: Xf,
        _gmtime_js: Yf,
        _localtime_js: Zf,
        _mmap_js: $f,
        _munmap_js: ag,
        _tzset_js: cg,
        abort: dg,
        emscripten_check_blocking_allowed: function () {
          ia ||
            ec(
              "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"
            );
        },
        emscripten_date_now: eg,
        emscripten_exit_with_live_runtime: fg,
        emscripten_get_heap_max: gg,
        emscripten_get_now: pb,
        emscripten_memcpy_big: hg,
        emscripten_num_logical_cores: Fc,
        emscripten_receive_on_main_thread_js: function (a, b, d) {
          b /= 2;
          jg.length = b;
          d >>= 3;
          for (var e = 0; e < b; e++)
            jg[e] = Fa[d + 2 * e] ? Fa[d + 2 * e + 1] : Ha[d + 2 * e + 1];
          return (0 > a ? gb[-a - 1] : Dg[a]).apply(null, jg);
        },
        emscripten_resize_heap: kg,
        emscripten_unwind_to_js_event_loop: function () {
          throw "unwind";
        },
        environ_get: ng,
        environ_sizes_get: og,
        exit: Sb,
        fd_close: pg,
        fd_fdstat_get: qg,
        fd_read: rg,
        fd_seek: sg,
        fd_write: tg,
        ffi_call: function (a, b, d, e) {
          var f = D[(a >> 2) + 1],
            g = D[(a >> 2) + 6],
            h = D[(a >> 2) + 2];
          a = hb(D[(a >> 2) + 3])[1];
          var k = T(),
            l = k,
            p = [],
            n = !1;
          if (15 === a) throw Error("complex ret marshalling nyi");
          if (0 > a || 15 < a) throw Error("Unexpected rtype " + a);
          if (4 === a || 13 === a) p.push(d), (n = !0);
          for (var q = 0; q < g; q++) {
            var r = D[(e >> 2) + q],
              m = hb(D[(h >> 2) + q]),
              t = m[0];
            m = m[1];
            switch (m) {
              case 1:
              case 10:
              case 9:
              case 14:
                p.push(D[r >> 2]);
                break;
              case 2:
                p.push(Ea[r >> 2]);
                break;
              case 3:
                p.push(Ha[r >> 3]);
                break;
              case 5:
                p.push(z[r]);
                break;
              case 6:
                p.push(A[r]);
                break;
              case 7:
                p.push(Da[r >> 1]);
                break;
              case 8:
                p.push(Ca[r >> 1]);
                break;
              case 11:
              case 12:
                p.push(Ga[r >> 3]);
                break;
              case 4:
                p.push(Ga[r >> 3]);
                p.push(Ga[(r >> 3) + 1]);
                break;
              case 13:
                m = D[t >> 2];
                t = Da[(t + 4) >> 1];
                l -= m;
                l &= ~(t - 1);
                A.subarray(l, l + m).set(A.subarray(r, r + m));
                p.push(l);
                break;
              case 15:
                throw Error("complex marshalling nyi");
              default:
                throw Error("Unexpected type " + m);
            }
          }
          if (g != f) {
            var w = [];
            for (q = f - 1; q >= g; q--)
              switch (
                ((r = D[(e >> 2) + q]),
                (m = hb(D[(h >> 2) + q])),
                (t = m[0]),
                (m = m[1]),
                m)
              ) {
                case 5:
                case 6:
                  --l;
                  l &= -1;
                  z[l] = z[r];
                  break;
                case 7:
                case 8:
                  l -= 2;
                  l &= -2;
                  Da[l >> 1] = Da[r >> 1];
                  break;
                case 1:
                case 9:
                case 10:
                case 14:
                case 2:
                  l -= 4;
                  l &= -4;
                  D[l >> 2] = D[r >> 2];
                  break;
                case 3:
                case 11:
                case 12:
                  l -= 8;
                  l &= -8;
                  D[l >> 2] = D[r >> 2];
                  D[(l >> 2) + 1] = D[(r >> 2) + 1];
                  break;
                case 4:
                  l -= 16;
                  l &= -8;
                  D[l >> 2] = D[r >> 2];
                  D[(l >> 2) + 1] = D[(r >> 2) + 1];
                  D[(l >> 2) + 2] = D[(r >> 2) + 1];
                  D[(l >> 2) + 3] = D[(r >> 2) + 1];
                  break;
                case 13:
                  l -= 4;
                  l &= -4;
                  w.push([l, r, D[t >> 2], Da[(t + 4) >> 1]]);
                  break;
                case 15:
                  throw Error("complex arg marshalling nyi");
                default:
                  throw Error("Unexpected argtype " + m);
              }
            p.push(l);
            for (q = 0; q < w.length; q++)
              (f = w[q]),
                (e = f[0]),
                (r = f[1]),
                (m = f[2]),
                (t = f[3]),
                (l -= m),
                (l &= ~(t - 1)),
                A.subarray(l, l + m).set(A.subarray(r, r + m)),
                (D[e >> 2] = l);
          }
          R((l - 0) & -8);
          b = E.get(b).apply(null, p);
          R(k);
          if (!n)
            switch (a) {
              case 0:
                break;
              case 1:
              case 9:
              case 10:
              case 14:
                D[d >> 2] = b;
                break;
              case 2:
                Ea[d >> 2] = b;
                break;
              case 3:
                Ha[d >> 3] = b;
                break;
              case 5:
              case 6:
                z[d + 0] = b;
                break;
              case 7:
              case 8:
                Da[d >> 1] = b;
                break;
              case 11:
              case 12:
                Ga[d >> 3] = b;
                break;
              case 15:
                throw Error("complex ret marshalling nyi");
              default:
                throw Error("Unexpected rtype " + a);
            }
        },
        invoke_i: Fg,
        invoke_ii: Gg,
        invoke_iii: Hg,
        invoke_iiii: Ig,
        invoke_iiiii: Jg,
        invoke_iiiiiii: Kg,
        invoke_iiiiiiii: Lg,
        invoke_iiiiiiiiiiiii: Mg,
        invoke_ji: Ng,
        invoke_vi: Og,
        invoke_vii: Pg,
        invoke_viii: Qg,
        invoke_viiii: Rg,
        memory: sa || c.wasmMemory,
        proc_exit: Rb,
        shutdown_js: function () {
          Wa();
        },
        strftime: xg,
        strftime_l: yg,
        throw_type_error_js: function (a) {
          throw new TypeError(y(a));
        },
        throw_vips_error_js: function (a) {
          var b = c.Error.buffer();
          c.Error.clear();
          throw Error(y(a) + "\n" + b);
        },
      };
    (function () {
      function a(f, g) {
        var h = f.exports;
        h = $c(h, 1024);
        var k = Kc(g);
        Oc(h);
        c.asm = h;
        cd(c.asm._emscripten_tls_init, f.exports, k);
        La.unshift(c.asm.__wasm_call_ctors);
        Pa.push(c.asm.__wasm_apply_data_relocs);
        ta = g;
        if (!u) {
          var l = F.T.length;
          F.T.forEach(function (p) {
            F.Lb(p, function () {
              --l || cb("wasm-instantiate");
            });
          });
        }
      }
      function b(f) {
        a(f.instance, f.module);
      }
      function d(f) {
        return fb()
          .then(function (g) {
            return WebAssembly.instantiate(g, e);
          })
          .then(function (g) {
            return g;
          })
          .then(f, function (g) {
            v("failed to asynchronously prepare wasm: " + g);
            x(g);
          });
      }
      var e = {
        env: Pc,
        wasi_snapshot_preview1: Pc,
        "GOT.mem": new Proxy(Pc, Cc),
        "GOT.func": new Proxy(Pc, Cc),
      };
      u || bb("wasm-instantiate");
      if (c.instantiateWasm)
        try {
          return c.instantiateWasm(e, a);
        } catch (f) {
          v("Module.instantiateWasm callback failed with error: " + f), ba(f);
        }
      (function () {
        return ra ||
          "function" != typeof WebAssembly.instantiateStreaming ||
          db() ||
          "function" != typeof fetch
          ? d(b)
          : fetch(G, { credentials: "same-origin" }).then(function (f) {
              return WebAssembly.instantiateStreaming(f, e).then(
                b,
                function (g) {
                  v("wasm streaming compile failed: " + g);
                  v("falling back to ArrayBuffer instantiation");
                  return d(b);
                }
              );
            });
      })().catch(ba);
      return {};
    })();
    c.___wasm_call_ctors = function () {
      return (c.___wasm_call_ctors = c.asm.__wasm_call_ctors).apply(
        null,
        arguments
      );
    };
    c.___wasm_apply_data_relocs = function () {
      return (c.___wasm_apply_data_relocs =
        c.asm.__wasm_apply_data_relocs).apply(null, arguments);
    };
    c._vips_source_new_from_file = function () {
      return (c._vips_source_new_from_file =
        c.asm.vips_source_new_from_file).apply(null, arguments);
    };
    c.__ZNSt3__2plIcNS_11char_traitsIcEENS_9allocatorIcEEEENS_12basic_stringIT_T0_T1_EEPKS6_RKS9_ =
      function () {
        return (c.__ZNSt3__2plIcNS_11char_traitsIcEENS_9allocatorIcEEEENS_12basic_stringIT_T0_T1_EEPKS6_RKS9_ =
          c.asm._ZNSt3__2plIcNS_11char_traitsIcEENS_9allocatorIcEEEENS_12basic_stringIT_T0_T1_EEPKS6_RKS9_).apply(
          null,
          arguments
        );
      };
    c.__ZdlPv = function () {
      return (c.__ZdlPv = c.asm._ZdlPv).apply(null, arguments);
    };
    c._vips_area_unref = function () {
      return (c._vips_area_unref = c.asm.vips_area_unref).apply(
        null,
        arguments
      );
    };
    c.__Znwm = function () {
      return (c.__Znwm = c.asm._Znwm).apply(null, arguments);
    };
    c._vips_target_new_to_file = function () {
      return (c._vips_target_new_to_file = c.asm.vips_target_new_to_file).apply(
        null,
        arguments
      );
    };
    c._vips_target_new_to_memory = function () {
      return (c._vips_target_new_to_memory =
        c.asm.vips_target_new_to_memory).apply(null, arguments);
    };
    c._strlen = function () {
      return (c._strlen = c.asm.strlen).apply(null, arguments);
    };
    c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKc =
      function () {
        return (c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKc =
          c.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6insertEmPKc).apply(
          null,
          arguments
        );
      };
    var Vc = (c._malloc = function () {
      return (Vc = c._malloc = c.asm.malloc).apply(null, arguments);
    });
    c._g_object_unref = function () {
      return (c._g_object_unref = c.asm.g_object_unref).apply(null, arguments);
    };
    c._g_object_ref = function () {
      return (c._g_object_ref = c.asm.g_object_ref).apply(null, arguments);
    };
    c._vips_image_write = function () {
      return (c._vips_image_write = c.asm.vips_image_write).apply(
        null,
        arguments
      );
    };
    c._g_object_get = function () {
      return (c._g_object_get = c.asm.g_object_get).apply(null, arguments);
    };
    c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE25__init_copy_ctor_externalEPKcm =
      function () {
        return (c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE25__init_copy_ctor_externalEPKcm =
          c.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE25__init_copy_ctor_externalEPKcm).apply(
          null,
          arguments
        );
      };
    c._memcmp = function () {
      return (c._memcmp = c.asm.memcmp).apply(null, arguments);
    };
    c._vips_blob_get_type = function () {
      return (c._vips_blob_get_type = c.asm.vips_blob_get_type).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKc =
      function () {
        return (c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKc =
          c.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKc).apply(
          null,
          arguments
        );
      };
    c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKcm =
      function () {
        return (c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKcm =
          c.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6appendEPKcm).apply(
          null,
          arguments
        );
      };
    c._memchr = function () {
      return (c._memchr = c.asm.memchr).apply(null, arguments);
    };
    c._vips_connection_filename = function () {
      return (c._vips_connection_filename =
        c.asm.vips_connection_filename).apply(null, arguments);
    };
    c._vips_image_set_int = function () {
      return (c._vips_image_set_int = c.asm.vips_image_set_int).apply(
        null,
        arguments
      );
    };
    c._vips_image_set_blob = function () {
      return (c._vips_image_set_blob = c.asm.vips_image_set_blob).apply(
        null,
        arguments
      );
    };
    c._vips_image_get_typeof = function () {
      return (c._vips_image_get_typeof = c.asm.vips_image_get_typeof).apply(
        null,
        arguments
      );
    };
    c._vips_image_get_double = function () {
      return (c._vips_image_get_double = c.asm.vips_image_get_double).apply(
        null,
        arguments
      );
    };
    c._vips_image_get_blob = function () {
      return (c._vips_image_get_blob = c.asm.vips_image_get_blob).apply(
        null,
        arguments
      );
    };
    c._vips_image_hasalpha = function () {
      return (c._vips_image_hasalpha = c.asm.vips_image_hasalpha).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb1EEERS5_PKcm =
      function () {
        return (c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb1EEERS5_PKcm =
          c.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb1EEERS5_PKcm).apply(
          null,
          arguments
        );
      };
    c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb0EEERS5_PKcm =
      function () {
        return (c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb0EEERS5_PKcm =
          c.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_no_aliasILb0EEERS5_PKcm).apply(
          null,
          arguments
        );
      };
    c._vips_source_get_type = function () {
      return (c._vips_source_get_type = c.asm.vips_source_get_type).apply(
        null,
        arguments
      );
    };
    c._vips_target_get_type = function () {
      return (c._vips_target_get_type = c.asm.vips_target_get_type).apply(
        null,
        arguments
      );
    };
    c._main = function () {
      return (c._main = c.asm.main).apply(null, arguments);
    };
    c._vips_foreign_load_get_type = function () {
      return (c._vips_foreign_load_get_type =
        c.asm.vips_foreign_load_get_type).apply(null, arguments);
    };
    c._g_type_register_static_simple = function () {
      return (c._g_type_register_static_simple =
        c.asm.g_type_register_static_simple).apply(null, arguments);
    };
    c._vips_error = function () {
      return (c._vips_error = c.asm.vips_error).apply(null, arguments);
    };
    c._vips_source_rewind = function () {
      return (c._vips_source_rewind = c.asm.vips_source_rewind).apply(
        null,
        arguments
      );
    };
    c._vips_foreign_save_get_type = function () {
      return (c._vips_foreign_save_get_type =
        c.asm.vips_foreign_save_get_type).apply(null, arguments);
    };
    c._vips_cast = function () {
      return (c._vips_cast = c.asm.vips_cast).apply(null, arguments);
    };
    c._g_type_class_peek_parent = function () {
      return (c._g_type_class_peek_parent =
        c.asm.g_type_class_peek_parent).apply(null, arguments);
    };
    c._g_type_class_adjust_private_offset = function () {
      return (c._g_type_class_adjust_private_offset =
        c.asm.g_type_class_adjust_private_offset).apply(null, arguments);
    };
    c._vips_object_get_property = function () {
      return (c._vips_object_get_property =
        c.asm.vips_object_get_property).apply(null, arguments);
    };
    c._vips_object_set_property = function () {
      return (c._vips_object_set_property =
        c.asm.vips_object_set_property).apply(null, arguments);
    };
    c._g_param_spec_int = function () {
      return (c._g_param_spec_int = c.asm.g_param_spec_int).apply(
        null,
        arguments
      );
    };
    c._vips_argument_get_id = function () {
      return (c._vips_argument_get_id = c.asm.vips_argument_get_id).apply(
        null,
        arguments
      );
    };
    c._g_object_class_install_property = function () {
      return (c._g_object_class_install_property =
        c.asm.g_object_class_install_property).apply(null, arguments);
    };
    c._vips_object_class_install_argument = function () {
      return (c._vips_object_class_install_argument =
        c.asm.vips_object_class_install_argument).apply(null, arguments);
    };
    c._g_param_spec_string = function () {
      return (c._g_param_spec_string = c.asm.g_param_spec_string).apply(
        null,
        arguments
      );
    };
    c._vips_malloc = function () {
      return (c._vips_malloc = c.asm.vips_malloc).apply(null, arguments);
    };
    c._vips_image_init_fields = function () {
      return (c._vips_image_init_fields = c.asm.vips_image_init_fields).apply(
        null,
        arguments
      );
    };
    c._vips_image_pipelinev = function () {
      return (c._vips_image_pipelinev = c.asm.vips_image_pipelinev).apply(
        null,
        arguments
      );
    };
    c._strcmp = function () {
      return (c._strcmp = c.asm.strcmp).apply(null, arguments);
    };
    c._g_param_spec_object = function () {
      return (c._g_param_spec_object = c.asm.g_param_spec_object).apply(
        null,
        arguments
      );
    };
    c._vips_target_end = function () {
      return (c._vips_target_end = c.asm.vips_target_end).apply(
        null,
        arguments
      );
    };
    c._vips_format_sizeof_unsafe = function () {
      return (c._vips_format_sizeof_unsafe =
        c.asm.vips_format_sizeof_unsafe).apply(null, arguments);
    };
    c._vips_area_free_cb = function () {
      return (c._vips_area_free_cb = c.asm.vips_area_free_cb).apply(
        null,
        arguments
      );
    };
    c._vips_image_new = function () {
      return (c._vips_image_new = c.asm.vips_image_new).apply(null, arguments);
    };
    c._vips_object_local_array = function () {
      return (c._vips_object_local_array = c.asm.vips_object_local_array).apply(
        null,
        arguments
      );
    };
    c._g_param_spec_double = function () {
      return (c._g_param_spec_double = c.asm.g_param_spec_double).apply(
        null,
        arguments
      );
    };
    c._g_param_spec_boolean = function () {
      return (c._g_param_spec_boolean = c.asm.g_param_spec_boolean).apply(
        null,
        arguments
      );
    };
    c._vips_target_write = function () {
      return (c._vips_target_write = c.asm.vips_target_write).apply(
        null,
        arguments
      );
    };
    c._g_param_spec_boxed = function () {
      return (c._g_param_spec_boxed = c.asm.g_param_spec_boxed).apply(
        null,
        arguments
      );
    };
    c._g_object_set = function () {
      return (c._g_object_set = c.asm.g_object_set).apply(null, arguments);
    };
    c._vips_object_argument_isset = function () {
      return (c._vips_object_argument_isset =
        c.asm.vips_object_argument_isset).apply(null, arguments);
    };
    var Je = (c._free = function () {
      return (Je = c._free = c.asm.free).apply(null, arguments);
    });
    c._vips_source_sniff = function () {
      return (c._vips_source_sniff = c.asm.vips_source_sniff).apply(
        null,
        arguments
      );
    };
    c._vips_source_read = function () {
      return (c._vips_source_read = c.asm.vips_source_read).apply(
        null,
        arguments
      );
    };
    c._vips_source_new_from_memory = function () {
      return (c._vips_source_new_from_memory =
        c.asm.vips_source_new_from_memory).apply(null, arguments);
    };
    c._iprintf = function () {
      return (c._iprintf = c.asm.iprintf).apply(null, arguments);
    };
    c._fwrite = function () {
      return (c._fwrite = c.asm.fwrite).apply(null, arguments);
    };
    var Lb = (c._fflush = function () {
      return (Lb = c._fflush = c.asm.fflush).apply(null, arguments);
    });
    c._calloc = function () {
      return (c._calloc = c.asm.calloc).apply(null, arguments);
    };
    c._strncmp = function () {
      return (c._strncmp = c.asm.strncmp).apply(null, arguments);
    };
    c._realloc = function () {
      return (c._realloc = c.asm.realloc).apply(null, arguments);
    };
    c._log2 = function () {
      return (c._log2 = c.asm.log2).apply(null, arguments);
    };
    c._vips_image_write_prepare = function () {
      return (c._vips_image_write_prepare =
        c.asm.vips_image_write_prepare).apply(null, arguments);
    };
    c._fclose = function () {
      return (c._fclose = c.asm.fclose).apply(null, arguments);
    };
    c._sin = function () {
      return (c._sin = c.asm.sin).apply(null, arguments);
    };
    c._cos = function () {
      return (c._cos = c.asm.cos).apply(null, arguments);
    };
    c._log = function () {
      return (c._log = c.asm.log).apply(null, arguments);
    };
    c._exp = function () {
      return (c._exp = c.asm.exp).apply(null, arguments);
    };
    c._pow = function () {
      return (c._pow = c.asm.pow).apply(null, arguments);
    };
    c._hypot = function () {
      return (c._hypot = c.asm.hypot).apply(null, arguments);
    };
    c._atan2 = function () {
      return (c._atan2 = c.asm.atan2).apply(null, arguments);
    };
    c._fiprintf = function () {
      return (c._fiprintf = c.asm.fiprintf).apply(null, arguments);
    };
    c._cmsReadTag = function () {
      return (c._cmsReadTag = c.asm.cmsReadTag).apply(null, arguments);
    };
    c._cmsCloseProfile = function () {
      return (c._cmsCloseProfile = c.asm.cmsCloseProfile).apply(
        null,
        arguments
      );
    };
    c._cmsGetColorSpace = function () {
      return (c._cmsGetColorSpace = c.asm.cmsGetColorSpace).apply(
        null,
        arguments
      );
    };
    c._cmsDeleteTransform = function () {
      return (c._cmsDeleteTransform = c.asm.cmsDeleteTransform).apply(
        null,
        arguments
      );
    };
    c._cmsDoTransform = function () {
      return (c._cmsDoTransform = c.asm.cmsDoTransform).apply(null, arguments);
    };
    c._fmod = function () {
      return (c._fmod = c.asm.fmod).apply(null, arguments);
    };
    c.___small_printf = function () {
      return (c.___small_printf = c.asm.__small_printf).apply(null, arguments);
    };
    c._posix_memalign = function () {
      return (c._posix_memalign = c.asm.posix_memalign).apply(null, arguments);
    };
    c._vips_image_wio_input = function () {
      return (c._vips_image_wio_input = c.asm.vips_image_wio_input).apply(
        null,
        arguments
      );
    };
    var pd = (c.___errno_location = function () {
      return (pd = c.___errno_location = c.asm.__errno_location).apply(
        null,
        arguments
      );
    });
    c._g_str_equal = function () {
      return (c._g_str_equal = c.asm.g_str_equal).apply(null, arguments);
    };
    c._g_direct_hash = function () {
      return (c._g_direct_hash = c.asm.g_direct_hash).apply(null, arguments);
    };
    c._fputc = function () {
      return (c._fputc = c.asm.fputc).apply(null, arguments);
    };
    c._g_str_hash = function () {
      return (c._g_str_hash = c.asm.g_str_hash).apply(null, arguments);
    };
    c._vfprintf = function () {
      return (c._vfprintf = c.asm.vfprintf).apply(null, arguments);
    };
    c._fputs = function () {
      return (c._fputs = c.asm.fputs).apply(null, arguments);
    };
    c._strerror = function () {
      return (c._strerror = c.asm.strerror).apply(null, arguments);
    };
    c._vsnprintf = function () {
      return (c._vsnprintf = c.asm.vsnprintf).apply(null, arguments);
    };
    c._fopen = function () {
      return (c._fopen = c.asm.fopen).apply(null, arguments);
    };
    c._fileno = function () {
      return (c._fileno = c.asm.fileno).apply(null, arguments);
    };
    c._ungetc = function () {
      return (c._ungetc = c.asm.ungetc).apply(null, arguments);
    };
    c._strcpy = function () {
      return (c._strcpy = c.asm.strcpy).apply(null, arguments);
    };
    c._tolower = function () {
      return (c._tolower = c.asm.tolower).apply(null, arguments);
    };
    c._strncpy = function () {
      return (c._strncpy = c.asm.strncpy).apply(null, arguments);
    };
    c._sysconf = function () {
      return (c._sysconf = c.asm.sysconf).apply(null, arguments);
    };
    c._iconv_open = function () {
      return (c._iconv_open = c.asm.iconv_open).apply(null, arguments);
    };
    c._strstr = function () {
      return (c._strstr = c.asm.strstr).apply(null, arguments);
    };
    c._nl_langinfo = function () {
      return (c._nl_langinfo = c.asm.nl_langinfo).apply(null, arguments);
    };
    c._iconv = function () {
      return (c._iconv = c.asm.iconv).apply(null, arguments);
    };
    c._iconv_close = function () {
      return (c._iconv_close = c.asm.iconv_close).apply(null, arguments);
    };
    c._getenv = function () {
      return (c._getenv = c.asm.getenv).apply(null, arguments);
    };
    c._bindtextdomain = function () {
      return (c._bindtextdomain = c.asm.bindtextdomain).apply(null, arguments);
    };
    c._bind_textdomain_codeset = function () {
      return (c._bind_textdomain_codeset = c.asm.bind_textdomain_codeset).apply(
        null,
        arguments
      );
    };
    c._dgettext = function () {
      return (c._dgettext = c.asm.dgettext).apply(null, arguments);
    };
    c._textdomain = function () {
      return (c._textdomain = c.asm.textdomain).apply(null, arguments);
    };
    c._gettext = function () {
      return (c._gettext = c.asm.gettext).apply(null, arguments);
    };
    c._setlocale = function () {
      return (c._setlocale = c.asm.setlocale).apply(null, arguments);
    };
    c._strcasecmp = function () {
      return (c._strcasecmp = c.asm.strcasecmp).apply(null, arguments);
    };
    c._strpbrk = function () {
      return (c._strpbrk = c.asm.strpbrk).apply(null, arguments);
    };
    c._gettimeofday = function () {
      return (c._gettimeofday = c.asm.gettimeofday).apply(null, arguments);
    };
    c.__g_log_fallback_handler = function () {
      return (c.__g_log_fallback_handler = c.asm._g_log_fallback_handler).apply(
        null,
        arguments
      );
    };
    c._raise = function () {
      return (c._raise = c.asm.raise).apply(null, arguments);
    };
    c.__exit = function () {
      return (c.__exit = c.asm._exit).apply(null, arguments);
    };
    c._strcat = function () {
      return (c._strcat = c.asm.strcat).apply(null, arguments);
    };
    c._g_log_default_handler = function () {
      return (c._g_log_default_handler = c.asm.g_log_default_handler).apply(
        null,
        arguments
      );
    };
    c._getpid = function () {
      return (c._getpid = c.asm.getpid).apply(null, arguments);
    };
    c._g_log_writer_default = function () {
      return (c._g_log_writer_default = c.asm.g_log_writer_default).apply(
        null,
        arguments
      );
    };
    c._isatty = function () {
      return (c._isatty = c.asm.isatty).apply(null, arguments);
    };
    c._localtime = function () {
      return (c._localtime = c.asm.localtime).apply(null, arguments);
    };
    c._stpcpy = function () {
      return (c._stpcpy = c.asm.stpcpy).apply(null, arguments);
    };
    c._snprintf = function () {
      return (c._snprintf = c.asm.snprintf).apply(null, arguments);
    };
    c._strerror_r = function () {
      return (c._strerror_r = c.asm.strerror_r).apply(null, arguments);
    };
    c._vasprintf = function () {
      return (c._vasprintf = c.asm.vasprintf).apply(null, arguments);
    };
    c._pthread_mutex_init = function () {
      return (c._pthread_mutex_init = c.asm.pthread_mutex_init).apply(
        null,
        arguments
      );
    };
    c._pthread_mutex_destroy = function () {
      return (c._pthread_mutex_destroy = c.asm.pthread_mutex_destroy).apply(
        null,
        arguments
      );
    };
    c._pthread_mutex_lock = function () {
      return (c._pthread_mutex_lock = c.asm.pthread_mutex_lock).apply(
        null,
        arguments
      );
    };
    c._pthread_mutex_unlock = function () {
      return (c._pthread_mutex_unlock = c.asm.pthread_mutex_unlock).apply(
        null,
        arguments
      );
    };
    c._pthread_mutex_trylock = function () {
      return (c._pthread_mutex_trylock = c.asm.pthread_mutex_trylock).apply(
        null,
        arguments
      );
    };
    c._pthread_rwlock_init = function () {
      return (c._pthread_rwlock_init = c.asm.pthread_rwlock_init).apply(
        null,
        arguments
      );
    };
    c._pthread_rwlock_destroy = function () {
      return (c._pthread_rwlock_destroy = c.asm.pthread_rwlock_destroy).apply(
        null,
        arguments
      );
    };
    c._pthread_rwlock_unlock = function () {
      return (c._pthread_rwlock_unlock = c.asm.pthread_rwlock_unlock).apply(
        null,
        arguments
      );
    };
    c._pthread_rwlock_rdlock = function () {
      return (c._pthread_rwlock_rdlock = c.asm.pthread_rwlock_rdlock).apply(
        null,
        arguments
      );
    };
    c._pthread_condattr_init = function () {
      return (c._pthread_condattr_init = c.asm.pthread_condattr_init).apply(
        null,
        arguments
      );
    };
    c._pthread_condattr_setclock = function () {
      return (c._pthread_condattr_setclock =
        c.asm.pthread_condattr_setclock).apply(null, arguments);
    };
    c._pthread_cond_init = function () {
      return (c._pthread_cond_init = c.asm.pthread_cond_init).apply(
        null,
        arguments
      );
    };
    c._pthread_condattr_destroy = function () {
      return (c._pthread_condattr_destroy =
        c.asm.pthread_condattr_destroy).apply(null, arguments);
    };
    c._pthread_cond_destroy = function () {
      return (c._pthread_cond_destroy = c.asm.pthread_cond_destroy).apply(
        null,
        arguments
      );
    };
    c._pthread_cond_wait = function () {
      return (c._pthread_cond_wait = c.asm.pthread_cond_wait).apply(
        null,
        arguments
      );
    };
    c._pthread_cond_broadcast = function () {
      return (c._pthread_cond_broadcast = c.asm.pthread_cond_broadcast).apply(
        null,
        arguments
      );
    };
    c._pthread_key_create = function () {
      return (c._pthread_key_create = c.asm.pthread_key_create).apply(
        null,
        arguments
      );
    };
    c._pthread_key_delete = function () {
      return (c._pthread_key_delete = c.asm.pthread_key_delete).apply(
        null,
        arguments
      );
    };
    c._pthread_getspecific = function () {
      return (c._pthread_getspecific = c.asm.pthread_getspecific).apply(
        null,
        arguments
      );
    };
    c._pthread_setspecific = function () {
      return (c._pthread_setspecific = c.asm.pthread_setspecific).apply(
        null,
        arguments
      );
    };
    c._pthread_create = function () {
      return (c._pthread_create = c.asm.pthread_create).apply(null, arguments);
    };
    c._getc = function () {
      return (c._getc = c.asm.getc).apply(null, arguments);
    };
    c._fscanf = function () {
      return (c._fscanf = c.asm.fscanf).apply(null, arguments);
    };
    c._powf = function () {
      return (c._powf = c.asm.powf).apply(null, arguments);
    };
    c._cmsSetLogErrorHandlerTHR = function () {
      return (c._cmsSetLogErrorHandlerTHR =
        c.asm.cmsSetLogErrorHandlerTHR).apply(null, arguments);
    };
    c._cmsGetHeaderRenderingIntent = function () {
      return (c._cmsGetHeaderRenderingIntent =
        c.asm.cmsGetHeaderRenderingIntent).apply(null, arguments);
    };
    c._cmsOpenProfileFromMemTHR = function () {
      return (c._cmsOpenProfileFromMemTHR =
        c.asm.cmsOpenProfileFromMemTHR).apply(null, arguments);
    };
    c._cmsXYZ2xyY = function () {
      return (c._cmsXYZ2xyY = c.asm.cmsXYZ2xyY).apply(null, arguments);
    };
    c._cmsCreateExtendedTransform = function () {
      return (c._cmsCreateExtendedTransform =
        c.asm.cmsCreateExtendedTransform).apply(null, arguments);
    };
    c._cmsCreateTransformTHR = function () {
      return (c._cmsCreateTransformTHR = c.asm.cmsCreateTransformTHR).apply(
        null,
        arguments
      );
    };
    c._cmsCreateXYZProfileTHR = function () {
      return (c._cmsCreateXYZProfileTHR = c.asm.cmsCreateXYZProfileTHR).apply(
        null,
        arguments
      );
    };
    c._cmsCreateContext = function () {
      return (c._cmsCreateContext = c.asm.cmsCreateContext).apply(
        null,
        arguments
      );
    };
    c._cmsAdaptToIlluminant = function () {
      return (c._cmsAdaptToIlluminant = c.asm.cmsAdaptToIlluminant).apply(
        null,
        arguments
      );
    };
    c.__emscripten_tls_init = function () {
      return (c.__emscripten_tls_init = c.asm._emscripten_tls_init).apply(
        null,
        arguments
      );
    };
    var Hc = (c._pthread_self = function () {
        return (Hc = c._pthread_self = c.asm.pthread_self).apply(
          null,
          arguments
        );
      }),
      Jb = (c._emscripten_builtin_memalign = function () {
        return (Jb = c._emscripten_builtin_memalign =
          c.asm.emscripten_builtin_memalign).apply(null, arguments);
      }),
      Ie = (c.___getTypeName = function () {
        return (Ie = c.___getTypeName = c.asm.__getTypeName).apply(
          null,
          arguments
        );
      });
    c.__embind_initialize_bindings = function () {
      return (c.__embind_initialize_bindings =
        c.asm._embind_initialize_bindings).apply(null, arguments);
    };
    c._sqrt = function () {
      return (c._sqrt = c.asm.sqrt).apply(null, arguments);
    };
    var Xa = (c.___funcs_on_exit = function () {
      return (Xa = c.___funcs_on_exit = c.asm.__funcs_on_exit).apply(
        null,
        arguments
      );
    });
    c.___cxa_atexit = function () {
      return (c.___cxa_atexit = c.asm.__cxa_atexit).apply(null, arguments);
    };
    c._cbrtf = function () {
      return (c._cbrtf = c.asm.cbrtf).apply(null, arguments);
    };
    var Id = (c.___dl_seterr = function () {
        return (Id = c.___dl_seterr = c.asm.__dl_seterr).apply(null, arguments);
      }),
      Mc = (c.__emscripten_thread_sync_code = function () {
        return (Mc = c.__emscripten_thread_sync_code =
          c.asm._emscripten_thread_sync_code).apply(null, arguments);
      }),
      Eg = (c.__emscripten_thread_init = function () {
        return (Eg = c.__emscripten_thread_init =
          c.asm._emscripten_thread_init).apply(null, arguments);
      });
    c.__emscripten_thread_crashed = function () {
      return (c.__emscripten_thread_crashed =
        c.asm._emscripten_thread_crashed).apply(null, arguments);
    };
    c._hypotf = function () {
      return (c._hypotf = c.asm.hypotf).apply(null, arguments);
    };
    var ig = (c._emscripten_run_in_main_runtime_thread_js = function () {
      return (ig = c._emscripten_run_in_main_runtime_thread_js =
        c.asm.emscripten_run_in_main_runtime_thread_js).apply(null, arguments);
    });
    c._log2f = function () {
      return (c._log2f = c.asm.log2f).apply(null, arguments);
    };
    c._logf = function () {
      return (c._logf = c.asm.logf).apply(null, arguments);
    };
    c._lroundf = function () {
      return (c._lroundf = c.asm.lroundf).apply(null, arguments);
    };
    c._modff = function () {
      return (c._modff = c.asm.modff).apply(null, arguments);
    };
    var vf = (c.__emscripten_proxy_execute_task_queue = function () {
        return (vf = c.__emscripten_proxy_execute_task_queue =
          c.asm._emscripten_proxy_execute_task_queue).apply(null, arguments);
      }),
      Gc = (c.__emscripten_thread_free_data = function () {
        return (Gc = c.__emscripten_thread_free_data =
          c.asm._emscripten_thread_free_data).apply(null, arguments);
      }),
      Wb = (c.__emscripten_thread_exit = function () {
        return (Wb = c.__emscripten_thread_exit =
          c.asm._emscripten_thread_exit).apply(null, arguments);
      });
    c._remainder = function () {
      return (c._remainder = c.asm.remainder).apply(null, arguments);
    };
    c._roundf = function () {
      return (c._roundf = c.asm.roundf).apply(null, arguments);
    };
    c._sqrtf = function () {
      return (c._sqrtf = c.asm.sqrtf).apply(null, arguments);
    };
    var U = (c._setThrew = function () {
        return (U = c._setThrew = c.asm.setThrew).apply(null, arguments);
      }),
      Jc = (c._emscripten_stack_set_limits = function () {
        return (Jc = c._emscripten_stack_set_limits =
          c.asm.emscripten_stack_set_limits).apply(null, arguments);
      }),
      T = (c.stackSave = function () {
        return (T = c.stackSave = c.asm.stackSave).apply(null, arguments);
      }),
      R = (c.stackRestore = function () {
        return (R = c.stackRestore = c.asm.stackRestore).apply(null, arguments);
      }),
      Fd = (c.stackAlloc = function () {
        return (Fd = c.stackAlloc = c.asm.stackAlloc).apply(null, arguments);
      });
    c.__ZNSt3__26__sortIRNS_6__lessIiiEEPiEEvT0_S5_T_ = function () {
      return (c.__ZNSt3__26__sortIRNS_6__lessIiiEEPiEEvT0_S5_T_ =
        c.asm._ZNSt3__26__sortIRNS_6__lessIiiEEPiEEvT0_S5_T_).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__26__sortIRNS_6__lessImmEEPmEEvT0_S5_T_ = function () {
      return (c.__ZNSt3__26__sortIRNS_6__lessImmEEPmEEvT0_S5_T_ =
        c.asm._ZNSt3__26__sortIRNS_6__lessImmEEPmEEvT0_S5_T_).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__26__sortIRNS_6__lessIffEEPfEEvT0_S5_T_ = function () {
      return (c.__ZNSt3__26__sortIRNS_6__lessIffEEPfEEvT0_S5_T_ =
        c.asm._ZNSt3__26__sortIRNS_6__lessIffEEPfEEvT0_S5_T_).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__218condition_variable10notify_oneEv = function () {
      return (c.__ZNSt3__218condition_variable10notify_oneEv =
        c.asm._ZNSt3__218condition_variable10notify_oneEv).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__218condition_variable10notify_allEv = function () {
      return (c.__ZNSt3__218condition_variable10notify_allEv =
        c.asm._ZNSt3__218condition_variable10notify_allEv).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__218condition_variable4waitERNS_11unique_lockINS_5mutexEEE =
      function () {
        return (c.__ZNSt3__218condition_variable4waitERNS_11unique_lockINS_5mutexEEE =
          c.asm._ZNSt3__218condition_variable4waitERNS_11unique_lockINS_5mutexEEE).apply(
          null,
          arguments
        );
      };
    c.__ZNSt3__218condition_variableD1Ev = function () {
      return (c.__ZNSt3__218condition_variableD1Ev =
        c.asm._ZNSt3__218condition_variableD1Ev).apply(null, arguments);
    };
    c.__ZNSt3__212__next_primeEm = function () {
      return (c.__ZNSt3__212__next_primeEm =
        c.asm._ZNSt3__212__next_primeEm).apply(null, arguments);
    };
    c.__ZNSt3__29basic_iosIcNS_11char_traitsIcEEED2Ev = function () {
      return (c.__ZNSt3__29basic_iosIcNS_11char_traitsIcEEED2Ev =
        c.asm._ZNSt3__29basic_iosIcNS_11char_traitsIcEEED2Ev).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED2Ev = function () {
      return (c.__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED2Ev =
        c.asm._ZNSt3__215basic_streambufIcNS_11char_traitsIcEEED2Ev).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEEC2Ev = function () {
      return (c.__ZNSt3__215basic_streambufIcNS_11char_traitsIcEEEC2Ev =
        c.asm._ZNSt3__215basic_streambufIcNS_11char_traitsIcEEEC2Ev).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryC1ERS3_ =
      function () {
        return (c.__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryC1ERS3_ =
          c.asm._ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryC1ERS3_).apply(
          null,
          arguments
        );
      };
    c.__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryD1Ev =
      function () {
        return (c.__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryD1Ev =
          c.asm._ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEE6sentryD1Ev).apply(
          null,
          arguments
        );
      };
    c.__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED2Ev = function () {
      return (c.__ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED2Ev =
        c.asm._ZNSt3__213basic_ostreamIcNS_11char_traitsIcEEED2Ev).apply(
        null,
        arguments
      );
    };
    c.__ZNKSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strEv =
      function () {
        return (c.__ZNKSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strEv =
          c.asm._ZNKSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEE3strEv).apply(
          null,
          arguments
        );
      };
    c.__ZNKSt3__28ios_base6getlocEv = function () {
      return (c.__ZNKSt3__28ios_base6getlocEv =
        c.asm._ZNKSt3__28ios_base6getlocEv).apply(null, arguments);
    };
    c.__ZNSt3__28ios_base5clearEj = function () {
      return (c.__ZNSt3__28ios_base5clearEj =
        c.asm._ZNSt3__28ios_base5clearEj).apply(null, arguments);
    };
    c.__ZNSt3__28ios_base4initEPv = function () {
      return (c.__ZNSt3__28ios_base4initEPv =
        c.asm._ZNSt3__28ios_base4initEPv).apply(null, arguments);
    };
    c.__ZNSt3__26localeD1Ev = function () {
      return (c.__ZNSt3__26localeD1Ev = c.asm._ZNSt3__26localeD1Ev).apply(
        null,
        arguments
      );
    };
    c.__ZNKSt3__26locale9use_facetERNS0_2idE = function () {
      return (c.__ZNKSt3__26locale9use_facetERNS0_2idE =
        c.asm._ZNKSt3__26locale9use_facetERNS0_2idE).apply(null, arguments);
    };
    c.__ZNSt3__25mutex4lockEv = function () {
      return (c.__ZNSt3__25mutex4lockEv = c.asm._ZNSt3__25mutex4lockEv).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__25mutex6unlockEv = function () {
      return (c.__ZNSt3__25mutex6unlockEv =
        c.asm._ZNSt3__25mutex6unlockEv).apply(null, arguments);
    };
    c.__ZNSt3__25mutexD1Ev = function () {
      return (c.__ZNSt3__25mutexD1Ev = c.asm._ZNSt3__25mutexD1Ev).apply(
        null,
        arguments
      );
    };
    c.__ZnwmRKSt9nothrow_t = function () {
      return (c.__ZnwmRKSt9nothrow_t = c.asm._ZnwmRKSt9nothrow_t).apply(
        null,
        arguments
      );
    };
    c.__Znam = function () {
      return (c.__Znam = c.asm._Znam).apply(null, arguments);
    };
    c.__ZdlPvm = function () {
      return (c.__ZdlPvm = c.asm._ZdlPvm).apply(null, arguments);
    };
    c.__ZdaPv = function () {
      return (c.__ZdaPv = c.asm._ZdaPv).apply(null, arguments);
    };
    c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKcm =
      function () {
        return (c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKcm =
          c.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE17__assign_externalEPKcm).apply(
          null,
          arguments
        );
      };
    c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc =
      function () {
        return (c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc =
          c.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc).apply(
          null,
          arguments
        );
      };
    c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6resizeEmc =
      function () {
        return (c.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6resizeEmc =
          c.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6resizeEmc).apply(
          null,
          arguments
        );
      };
    c.__ZNSt3__29to_stringEj = function () {
      return (c.__ZNSt3__29to_stringEj = c.asm._ZNSt3__29to_stringEj).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__220__throw_system_errorEiPKc = function () {
      return (c.__ZNSt3__220__throw_system_errorEiPKc =
        c.asm._ZNSt3__220__throw_system_errorEiPKc).apply(null, arguments);
    };
    c.__ZNSt3__26thread4joinEv = function () {
      return (c.__ZNSt3__26thread4joinEv = c.asm._ZNSt3__26thread4joinEv).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__219__thread_local_dataEv = function () {
      return (c.__ZNSt3__219__thread_local_dataEv =
        c.asm._ZNSt3__219__thread_local_dataEv).apply(null, arguments);
    };
    c.__ZNSt3__215__thread_structD1Ev = function () {
      return (c.__ZNSt3__215__thread_structD1Ev =
        c.asm._ZNSt3__215__thread_structD1Ev).apply(null, arguments);
    };
    c.__ZNSt3__26threadD1Ev = function () {
      return (c.__ZNSt3__26threadD1Ev = c.asm._ZNSt3__26threadD1Ev).apply(
        null,
        arguments
      );
    };
    c.__ZNSt3__215__thread_structC1Ev = function () {
      return (c.__ZNSt3__215__thread_structC1Ev =
        c.asm._ZNSt3__215__thread_structC1Ev).apply(null, arguments);
    };
    c.___cxa_guard_acquire = function () {
      return (c.___cxa_guard_acquire = c.asm.__cxa_guard_acquire).apply(
        null,
        arguments
      );
    };
    c.___cxa_guard_release = function () {
      return (c.___cxa_guard_release = c.asm.__cxa_guard_release).apply(
        null,
        arguments
      );
    };
    c.___cxa_pure_virtual = function () {
      return (c.___cxa_pure_virtual = c.asm.__cxa_pure_virtual).apply(
        null,
        arguments
      );
    };
    c._stdout = 1393984;
    c._stderr = 1393832;
    c._g_mem_gc_friendly = 3307984;
    c._g_utf8_skip = 1337448;
    c._g_log_msg_prefix = 1337096;
    c._g_log_always_fatal = 1337100;
    c.__ZTVNSt3__215basic_stringbufIcNS_11char_traitsIcEENS_9allocatorIcEEEE = 1397132;
    c.__ZTTNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = 1397292;
    c.__ZTVNSt3__219basic_ostringstreamIcNS_11char_traitsIcEENS_9allocatorIcEEEE = 1397252;
    c.__ZNSt3__25ctypeIcE2idE = 3332508;
    c.__ZSt7nothrow = 919530;
    function Kg(a, b, d, e, f, g, h) {
      var k = T();
      try {
        return S(a)(b, d, e, f, g, h);
      } catch (l) {
        R(k);
        if (l !== l + 0) throw l;
        U(1, 0);
      }
    }
    function Gg(a, b) {
      var d = T();
      try {
        return S(a)(b);
      } catch (e) {
        R(d);
        if (e !== e + 0) throw e;
        U(1, 0);
      }
    }
    function Ig(a, b, d, e) {
      var f = T();
      try {
        return S(a)(b, d, e);
      } catch (g) {
        R(f);
        if (g !== g + 0) throw g;
        U(1, 0);
      }
    }
    function Qg(a, b, d, e) {
      var f = T();
      try {
        S(a)(b, d, e);
      } catch (g) {
        R(f);
        if (g !== g + 0) throw g;
        U(1, 0);
      }
    }
    function Hg(a, b, d) {
      var e = T();
      try {
        return S(a)(b, d);
      } catch (f) {
        R(e);
        if (f !== f + 0) throw f;
        U(1, 0);
      }
    }
    function Og(a, b) {
      var d = T();
      try {
        S(a)(b);
      } catch (e) {
        R(d);
        if (e !== e + 0) throw e;
        U(1, 0);
      }
    }
    function Fg(a) {
      var b = T();
      try {
        return S(a)();
      } catch (d) {
        R(b);
        if (d !== d + 0) throw d;
        U(1, 0);
      }
    }
    function Lg(a, b, d, e, f, g, h, k) {
      var l = T();
      try {
        return S(a)(b, d, e, f, g, h, k);
      } catch (p) {
        R(l);
        if (p !== p + 0) throw p;
        U(1, 0);
      }
    }
    function Ng(a, b) {
      var d = T();
      try {
        return S(a)(b);
      } catch (e) {
        R(d);
        if (e !== e + 0) throw e;
        U(1, 0);
        return 0n;
      }
    }
    function Mg(a, b, d, e, f, g, h, k, l, p, n, q, r) {
      var m = T();
      try {
        return S(a)(b, d, e, f, g, h, k, l, p, n, q, r);
      } catch (t) {
        R(m);
        if (t !== t + 0) throw t;
        U(1, 0);
      }
    }
    function Rg(a, b, d, e, f) {
      var g = T();
      try {
        S(a)(b, d, e, f);
      } catch (h) {
        R(g);
        if (h !== h + 0) throw h;
        U(1, 0);
      }
    }
    function Pg(a, b, d) {
      var e = T();
      try {
        S(a)(b, d);
      } catch (f) {
        R(e);
        if (f !== f + 0) throw f;
        U(1, 0);
      }
    }
    function Jg(a, b, d, e, f) {
      var g = T();
      try {
        return S(a)(b, d, e, f);
      } catch (h) {
        R(g);
        if (h !== h + 0) throw h;
        U(1, 0);
      }
    }
    c.addRunDependency = bb;
    c.removeRunDependency = cb;
    c.FS_createPath = FS.ub;
    c.FS_createDataFile = FS.Da;
    c.FS_createPreloadedFile = FS.createPreloadedFile;
    c.FS_createLazyFile = FS.createLazyFile;
    c.FS_createDevice = FS.M;
    c.FS_unlink = FS.unlink;
    c.keepRuntimeAlive = Ta;
    c.wasmMemory = sa;
    c.ENV = Dd;
    c.bigintToI53Checked = rd;
    c.addFunction = Zc;
    c.ExitStatus = sb;
    c.FS = FS;
    c.PThread = F;
    c.deletionQueue = pe;
    var Sg;
    ab = function Tg() {
      Sg || Ug();
      Sg || (ab = Tg);
    };
    function Vg(a) {
      var b = c._main;
      if (b) {
        a = a || [];
        a.unshift(ea);
        var d = a.length,
          e = Fd(4 * (d + 1)),
          f = e >> 2;
        a.forEach((h) => {
          B[f++] = Ed(h);
        });
        B[f] = 0;
        try {
          var g = b(d, e);
          Sb(g, !0);
        } catch (h) {
          Ub(h);
        }
      }
    }
    var Wg = !1;
    function Ug() {
      function a() {
        if (!Sg && ((Sg = !0), (c.calledRun = !0), !ua)) {
          Ua();
          u || Va(Ma);
          aa(c);
          if (c.onRuntimeInitialized) c.onRuntimeInitialized();
          Xg && Vg(b);
          if (!u) {
            if (c.postRun)
              for (
                "function" == typeof c.postRun && (c.postRun = [c.postRun]);
                c.postRun.length;

              ) {
                var d = c.postRun.shift();
                Oa.unshift(d);
              }
            Va(Oa);
          }
        }
      }
      var b = b || da;
      if (!(0 < Za)) {
        if (!Wg && (ed(), (Wg = !0), 0 < Za)) return;
        if (u) aa(c), Ua(), postMessage({ cmd: "loaded" });
        else {
          if (c.preRun)
            for (
              "function" == typeof c.preRun && (c.preRun = [c.preRun]);
              c.preRun.length;

            )
              Ya();
          Va(Ka);
          0 < Za ||
            (c.setStatus
              ? (c.setStatus("Running..."),
                setTimeout(function () {
                  setTimeout(function () {
                    c.setStatus("");
                  }, 1);
                  a();
                }, 1))
              : a());
        }
      }
    }
    if (c.preInit)
      for (
        "function" == typeof c.preInit && (c.preInit = [c.preInit]);
        0 < c.preInit.length;

      )
        c.preInit.pop()();
    var Xg = !0;
    c.noInitialRun && (Xg = !1);
    Ug();

    return Vips.ready;
  };
})();
export default Vips;
