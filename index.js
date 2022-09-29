window.onload = ()=>{
    window.dom = {
        body: document.body,
        boot: document.getElementById("boot")
    };

    var domains = window.location.host.split('.');
    window.global = {
        domains: {
            domain: domains.length > 1 ? domains[domains.length - 2] : null,
            subdomain: domains.length > 2 ? domains[domains.length - 3] : null,
            tld: domains[domains.length - 1]
        }
    }

    dom.body.dataset.load = "ing";

    init();
}

window.onpopstate = (event)=>{
    if (event.state) {
        var state = event.state;
        console.log('onpopstate', {
            event,
            state
        });
        state.router({
            pop: true
        });
    } else {
        if (document.location) {//console.log({place});
        }
    }
    console.log(event, "location: " + document.location + ", state: " + JSON.stringify(state));
}

function init() {
    //eruda.init();
    controller.splash.time(true);

    console.log("Initializing...");

    dom.body.dataset.load = "ed";
    dom.body.onclick = (event)=>on.touch.tap(event);

    var url = window.location.pathname;

    var uri = ((dom.boot.dataset.path ? dom.boot.dataset.path : url) + (window.location.search + window.location.hash));

    const authChange = function(e) {
        dom.body.dataset.load = "ed";
    };
    if (window.firebase) {
        firebase.initializeApp(auth.config);
        const load = function(e) {
            const onAuthStateChanged = function(user) {
                auth.account.change(user).then(authChange);
            }
            firebase.auth().onAuthStateChanged(onAuthStateChanged);
        };
        uri.router().then(load);
    } else {
        uri.router().then(authChange);
    }
    console.log("Initialized");
}

/*ROUTER*/
String.prototype.router = async function(params) {
    var uri = this.toString();

    var url = new URL(uri,location.origin);
    var route = window.route = rout.e(url.hash ? url.hash.split('#')[1] : url.pathname + url.search + url.hash);

    var go = async function(resolve, reject) {
        //console.log('String.prototype.router', route);
        if (route) {
            var pop = params ? params.pop : null;
            var path = route.path;
            window.GET = rout.ed.dir(path);

            route = window.view ? await view(route).then(rout.ed.bang(route)) : await rout.ed.bang(route);

            if (!pop && !["blob:"].includes(window.location.protocol)) {
                const hash = global.domains.domain === "github" ? "/#" : "";
                var goto = window.global.domains.subdomain === "uios" ? '' : '';
                const link = hash.length > 0 ? goto + hash + (route.hash && route.hash.length > 0 ? route.hash.split('#')[1] : route.path) + route.search : goto + route.path + route.search + route.hash;
                history.pushState(link, '', link);
            }

            resolve(route);
        } else {
            const e = {
                code: 400
            };
            reject(e);
        }
    };
    return new Promise(async(resolve,reject)=>go(resolve, reject));
}

window.rout = {};

window.rout.e = state=>{
    var arr1 = [];
    var arr2 = rout.ed.dir(state.split('#')[0].split('?')[0]);
    var page = '/';
    var path = rout.ed.url(arr2);
    const GOT = rout.ed.dir(path);
    const root = GOT[0];
    const hash = state.split('#').length > 1 ? "#" + state.split('#')[1] : "";
    const search = state.split('?').length > 1 ? "?" + state.split('?')[1].split('#')[0] : "";

    if (GOT.length > 0) {
        var n = 0;
        do {
            var m = GOT[n];
            var bool = window.rout.ing(state, GOT, n);
            arr1[n] = bool ? "*" : m;
            n++;
        } while (n < GOT.length);
        page = rout.ed.url(arr1);
    }

    const data = {
        GOT,
        hash,
        page,
        path,
        root,
        search
    };
    return data;
}

window.rout.ed = {};
window.rout.ed.bang = async(route)=>{
    var pages = dom.body.find('pages[data-pages="' + route.root + '"]');
    var page = dom.body.find('page[data-page="' + route.page + '"]');
    var vp = page ? page : pages;

    $('[data-hide]').attr("data-active", true);
    $(':not(page)[data-pages]').removeAttr("data-active");
    $(':not(page)[data-page]').removeAttr("data-active");

    if (vp && vp.closest('main')) {
        $('pages[data-pages]').removeAttr("data-active");
        $('page[data-page]').removeAttr("data-active");
    } else {
        $('body > page[data-page]').removeAttr("data-active");
        $('body > pages[data-pages]').removeAttr("data-active");
        $('body > :not(main) page[data-page]').removeAttr("data-active");
        $('body > :not(main) pages[data-pages]').removeAttr("data-active");
    }

    $('[data-hide="' + route.page + '"]').attr("data-active", false);
    $('[data-page="' + route.page + '"]').attr("data-active", true);

    var rs = $('[data-pages]');
    if (rs.length > 0) {
        var i = 0;
        do {
            route.page.includes(rs[i].dataset.pages) ? rs[i].dataset.active = true : null;
            i++;
        } while (i < rs.length)
    }
    return route;
}
window.rout.ed.dir = function(url, num, g=[]) {
    if (url) {
        var split = url.split("/");
        var it = (a,i)=>{
            i < split.length - 0 ? g[i] = a : null;
        }
        ;
        split.forEach(it);
        g[0] === "" ? g.shift() : null;
        g[g.length - 1] === "" ? g.pop() : null;
    }
    return g;
}
window.rout.ed.url = function(dir) {
    if (dir.length > 0) {
        var end = dir[dir.length - 1];
        href = dir.length === 0 ? "/" : "/" + dir.join("/") + (end.includes("?") ? "" : "/");
    } else {
        href = "/";
    }
    return href;
}

window.rout.ing = (href,GOT,n)=>{
    return false;
}

/*ON*/
window.on = {};
window.on.touch = {};
window.on["touch"]["tap"] = async(event)=>{
    var elem = target = event.target;

    elem = target.closest("[data-href]");
    if (elem) {
        var href = elem.dataset.href;
        var params = elem.dataset.params ? JSON.parse(elem.dataset.params) : null;
        href.router(params);
    }

    elem = target.closest("[data-tap]");
    if (elem) {
        var x = eval(elem.dataset.tap);
        typeof x === "function" ? x() : null;
    }
}

/*MVC*/
window.mvc = {};

window.mvc.m = model = {};

window.mvc.v = view = function(route) {
    const a = async function(resolve, reject) {
        var path = route.path;
        var get = route ? route.GOT : rout.ed.dir(dom.body.dataset.path);
        var root = get[0];

        if (root) {
            if (root === "desktop") {
                if (get[1]) {
                    if (get[1] === "apps") {
                        var app = get[2];
                        if (app) {
                            var desktop = byId('desktop');
                            var page = desktop.find('page[data-app="' + app + '"]');
                            if (page) {
                                page.dataset.mize === "mini" ? page.removeAttribute('data-mize') : null;
                            } else {
                                var template = byId('template-desktop-apps-app');
                                var html = template.content.firstElementChild;

                                var got = get;
                                got.splice(0, 3);
                                var pathname = rout.ed.url(got);

                                html.dataset.app = app;
                                html.find('text').textContent = app;
                                html.find('n').className = 'icon-' + app;

                                if (global.domains.domain === "github") {
                                    html.find('iframe').src = window.location.protocol + '//' + global.domains.subdomain + '.' + global.domains.domain + '.' + global.domains.tld + '/' + app + '/#' + pathname;
                                } else {
                                    html.find('iframe').src = window.location.protocol + '//' + app + "." + global.domains.domain + "." + global.domains.tld + pathname;
                                }

                                desktop.insertAdjacentHTML('beforeend', html.outerHTML)
                            }
                        }

                        log(route);
                        resolve(route);
                    }

                    if (get[1] === "notifications") {
                        byId('desktop-notifications').classList.remove('transform-translateX-100pct');

                        log(route);
                        resolve(route);
                    } else {
                        byId('desktop-notifications').classList.add('transform-translateX-100pct');
                    }
                } else {
                    byId('desktop-notifications').classList.add('transform-translateX-100pct');
                    log(route);
                    resolve(route);
                }
            } else if (root === "my") {
                log(route);
                resolve(route);
            } else {
                const e = {
                    code: 404
                }
                reject(e);
            }
        } else {
            log(route);
            resolve(route);
        }

        function log(route) {
            console.log('mvc.v log', route);
        }
    }
    return new Promise(a);
}

window.mvc.c = controller = {};

window.mvc.c.app = {};
window.mvc.c.app.maximize = function(app) {
    target.closest('page[data-app="' + app + '"]').dataset.mize = "maxi";
}

window.mvc.c.app.minimize = function(target) {
    target.closest('page').dataset.mize = "mini";
}

window.mvc.c.app.close = function(target) {
    target.closest('page').remove();
    '/desktop/'.router();
}

window.mvc.c.desktop = {};
window.mvc.c.desktop.tap = (target)=>{
    console.log(target);
    const page = target.closest('page');
    const card = target.closest('card');
    const start = target.closest('start');
    if (page) {
        console.log({
            page
        });
    } else if (card) {
        console.log({
            card
        });
    } else if (start) {
        console.log({
            start
        });
    } else {
        '/desktop/'.router();
    }
}

window.mvc.c.log = {};
window.mvc.c.log.on = function(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.find('[type="text"]').value;
    const password = form.find('[type="password"]').value;
    auth.log.on(email, password).then(function() {
        '/desktop/'.router();
    }).catch(function(error) {
        alert(error.message);
    });
}
window.mvc.c.log.off = function() {
    window.firebase && window.auth && auth.account.user() ? auth.log.off().then('/'.router()) : '/'.router();
}

window.mvc.c.sign = {};
window.mvc.c.sign.up = event=>{
    event.preventDefault();
    auth.account.setup(event).then(d=>{
        console.log('my.setup then', {
            d
        });
        var email = d.email;
        var password = d.password;
        auth.account.signin(email, password).then(e=>{
            '/desktop/'.router();
        }
        ).catch(e=>{
            console.log('my.setup signin catch', {
                e
            })
        }
        );
        console.log('setup.then', d);
    }
    ).catch(e=>{
        //var message = e.message;
        //var error = message.error;
        console.log('setup.catch', e);
        //alert(error);
    }
    );
}

window.mvc.c.splash = {};
window.mvc.c.splash.screen = function() {
    window.firebase && window.auth && auth.account.user() ? '/desktop/'.router() : '/my/'.router();
}
window.mvc.c.splash.time = function(io) {
    const today = new Date();
    let h = today.getHours();
    let hr = h > 12 ? h - 12 : (h ? h : 12);
    let m = checkTime(today.getMinutes());
    //t s = checkTime(today.getSeconds());
    let ap = h < 12 ? "a" : "p";
    let t = hr + ":" + m;

    byId("hour").innerHTML = hr;
    byId("minute").innerHTML = m;
    //byId('second').innerHTML =  s;
    byId("a-p").innerHTML = ap;

    document.body.dataset.theme = h > 6 && h < 18 ? "lite" : "dark";

    setTimeout(controller.splash.time, 1000);

    function checkTime(i) {
        return (i = i < 10 ? "0" + i : i);
    }
}

/*VANILLA*/
window.is = {
    json: (text)=>{
        return /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))
    }
    ,
    local: href=>href.contains(['127.0.0.1', 'about:', 'blob:', 'file:', 'localhost', 'tld']),
    mobile: ()=>{
        return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend"in document)
    }
    ,
    touch: ()=>{
        return (('ontouchstart'in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }
}

Array.prototype.attr = function(attr, name) {
    var that = this;
    if (that.length > 1) {
        for (var i = that.length; i--; ) {
            var it = this[i];
            it ? it.setAttribute(attr, name) : null;
        }
    } else {
        that[0] ? that[0].setAttribute(attr, name) : null;
    }
    return that;
}
Array.prototype.removeAttr = function(name) {
    var that = this;
    if (that.length > 1) {
        for (var i = that.length; i--; ) {
            var it = this[i];
            it ? it.removeAttribute(name) : null;
        }
    } else {
        that[0] ? that[0].removeAttribute(name) : null;
    }
    return that;
}
Array.prototype.addClass = function(name) {
    var that = this;
    var vals = Object.values(that);
    if (vals.length > 0) {
        for (var i = vals.length; i--; ) {
            this[i].classList.add(name);
        }
    } else {
        that[0] ? that[0].classList.add(name) : null;
    }
    return that;
}
Array.prototype.removeClass = function(name) {
    var that = this;
    var vals = Object.values(that);
    if (vals.length > 0) {
        for (var i = vals.length; i--; ) {
            this[i].classList.remove(name);
        }
    } else {
        that[0] ? that[0].classList.add(name) : null;
    }
    return that;
}
Element.prototype.find = function(elem) {
    return this.querySelector(elem);
}
String.prototype.contains = function(pattern) {
    var value = false
      , p = 0;
    do {
        value === false ? value = this.toString().includes(pattern[p]) : null;
        p++;
    } while (p < pattern.length);
    return value;
}
window.$ = e=>{
    var obj = e;
    if (typeof obj === 'object') {
        if (NodeList.prototype.isPrototypeOf(obj)) {
            obj = Array.from(obj);
        } else {
            if (Element.prototype.isPrototypeOf(obj)) {
                obj = [obj];
            } else {
                obj = null;
            }
        }
    } else if (typeof obj === 'string') {
        var body = window.document.body;
        obj = body.querySelectorAll(obj);
        if (obj.length === 0) {
            obj = [];
        } else {
            obj = Array.from(obj);
        }
    } else {
        obj = null;
    }
    return obj;
}
window.byId = s=>{
    return document.getElementById(s);
}
function ajax(url, settings) {
    var dir = window.location.href.split(url);
    if (!RegExp('^(?:[a-z]+:)?//', 'i').test(url)) {
        if (window.global.domains.subdomain === "uios") {
            url = '/' + document.head.querySelector('[name="application-shortname"]').content + url;
        }
    }
    return new Promise((resolve,reject)=>{
        var req;
        var data = {};
        if (settings) {
            settings.headers ? data.headers = settings.headers : null;
            if (settings.dataType) {
                data = {
                    method: settings.dataType,
                    body: (settings.data ? settings.data : null)
                };
                settings.dataType === "OPTIONS" ? data.credentials = 'include' : null;
            } else {
                req = url;
            }
            settings.signal ? data.signal = signal : null;
        } else {
            req = url;
        }
        fetch(url, data).then(async(response)=>{
            if (!response.ok) {
                return response.text().then(text=>{
                    var statusText = JSON.parse(text);
                    var data = {
                        code: response.status,
                        message: statusText
                    };
                    var text = JSON.stringify(data);
                    throw new Error(text);
                }
                )
            }
            return response.text();
        }
        ).then(response=>{
            const isJSON = is.json(response);
            const data = isJSON ? JSON.parse(response) : response;
            resolve(response);
        }
        ).then(response=>resolve(response)).catch(error=>{
            console.log('vanilla.js ajax.fetch catch', error.message);
            const isJSON = is.json(error.message);
            var message = isJSON ? JSON.parse(error.message) : error.message;
            reject(message);
        }
        );
    }
    );
}

/*AUTH*/
window.auth = {};

window.auth.config = {
    apiKey: "AIzaSyBxGXe52WtXo_B5iKBo9BQZSfAwYFhLRO8",
    authDomain: "uios-83649.firebaseapp.com",
    projectId: "uios-83649",
    messagingSenderId: "47824486713",
    appId: "1:47824486713:web:51f3a124b42b1080"
}

window.auth.isEmail = (email)=>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

window.auth.log = {};
window.auth.log.off = function(network) {
    const c = function(resolve, reject) {
        const a = function(d) {
            dom.body.removeAttribute("data-uid");
            window.location.pathname.router();
            resolve(d);
        }
        const b = function(error) {
            reject(error);
        }
        firebase.auth().signOut().then(a).catch(b);
    }
    return new Promise(c);
}
window.auth.log.on = function(email, password) {
    const c = function(resolve, reject) {
        const a = function(e) {
            dom.body.dataset.uid = e.user.uid;
            resolve(e.user);
        };
        const b = function(error) {
            reject(error);
        };
        firebase.auth().signInWithEmailAndPassword(email, password).then(a).catch(b);
    }
    return new Promise(c);

}

window.auth.account = {};
window.auth.account.change = function(user) {
    const a = async(resolve,reject,url)=>{
        if (user) {
            dom.body.dataset.uid = user.uid;
        } else {
            dom.body.removeAttribute('data-uid');
        }
        resolve(user);
    }
    ;
    return new Promise(a);
}
window.auth.account.user = function() {
    return firebase.auth().currentUser;
}
window.auth.account.setup = (event)=>{
    event.preventDefault();
    var form = event.target;
    var displayName = form.find('[placeholder="First Name"]').value + ' ' + form.find('[placeholder="Last Name"]').value
      , username = form.find('[placeholder="Username"]').value;
    var email = form.find('[placeholder="Email"]').value
      , password = form.find('input[type="password"]').value;
    return new Promise((resolve,reject)=>{
        const data = new FormData();
        data.append('email', email);
        data.append('username', username);
        data.append('password', password);
        data.append('displayName', displayName);
        console.log("auth.account.setup", {
            data
        });
        if (displayName && username && email && password) {
            if (auth.isEmail(email)) {
                var endpoint = is.local(window.location.href) ? window.location.protocol + "//api.uios.tld" : api.endpoint;
                ajax(endpoint + '/photo/users', {
                    dataType: "POST",
                    data
                }).then(e=>{
                    var results = JSON.parse(e)
                      , user = auth.user();
                    console.log("auth.account.setup", {
                        results,
                        user
                    });
                    resolve({
                        email,
                        password
                    });
                }
                ).catch(function(error) {
                    console.log('auth.js auth.account.setup user.create catch', {
                        error
                    });
                    reject(error);
                });
            } else {
                alert("You must register with a valid email address.", 3);
            }
        } else {
            alert("You must supply a name, email, password and username.", 3);
        }
    }
    )
}
window.auth.account.signin = (email,password)=>{
    return new Promise((resolve,reject)=>{
        firebase.auth().signInWithEmailAndPassword(email, password).then(e=>{
            resolve(e);
        }
        ).catch(e=>{
            reject(e);
        }
        );
    }
    );
}

window.auth.user = ()=>{
    return firebase.auth().currentUser;
}
