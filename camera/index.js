window.onload = ()=>{

    window.dom = {
        body: document.body,
        boot: byId('boot'),
    };

    dom.body.dataset.load = "ing";

    window.webcam.constraints.horizontal.video['facingMode'] = "self";

    console.log('window.onload', {
        dom
    });

    init();

}

function init() {

    console.log("Initializing...");

    window.rout.ing = function(href, GOT, n, m=GOT[n], root=GOT[0]) {
        return m.includes("#")
    }

    dom.body.dataset.theme = "meridiem";
    
    dom.body.onclick = (event)=>on.touch.tap(event);

    (dom.boot.dataset.href ? dom.boot.dataset.href : window.location.pathname).router().then(e=>dom.body.dataset.load = "ed");

    console.log("Initialized");
}

window.mvc ? null : (window.mvc = {});

window.mvc.m ? null : (window.mvc.m = model = {});

window.mvc.v ? null : (window.mvc.v = view = function(route) {
    return new Promise(async function(resolve, reject) {
        var path = route.path;
        var get = route ? route.GOT : rout.ed.dir(dom.body.dataset.path);
        var root = get[0];
        GET = window.GET ? GET : rout.ed.dir(dom.body.dataset.path);

        if (root) {
            resolve(route);
        } else {
            webcam.stream ? null : webcam.control.play();
            resolve(route);
        }
    }
    );
}
);

window.mvc.c ? null : (window.mvc.c = controller = {
    shell: {
        snap: e=>{
            if (dom.body.dataset.page === "/") {
                webcam.snap('photo');
            } else {
                '/'.router();
            }
        }
    }
});

/*VANILLA*/
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

/*ROUTER*/
String.prototype.router = async function(params) {
    var uri = this.toString();
    var url = new URL(uri,location.origin);
    var route = window.route = rout.e(url.pathname + url.search + url.hash);
    var go = async function(resolve, reject) {
        //console.log('String.prototype.router', route);
        if (route) {
            var pop = params ? params.pop : null;
            var path = route.path;
            window.GET = rout.ed.dir(path);

            route = window.view ? await view(route).then(rout.ed.bang(route)) : await rout.ed.bang(route);

            if (!pop && location.origin !== "file://" && !["blob:"].includes(window.location.protocol)) {
                history.pushState(route.path, '', route.path);
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
    const hash = state.split('#').length > 1 ? state.split('#')[1] : null;
    const search = state.split('?').length > 1 ? state.split('?')[1].split('#')[0] : null;

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

/*WEBCAM*/
window.webcam = {
    media: null,

    global: {
        width: 1920,
        height: 0
    },

    constraints: {
        vertical: {
            video: {
                width: {
                    exact: 1080
                },
                height: {
                    exact: 1920
                }
            }
        },
        horizontal: {
            video: {
                width: {
                    min: 640,
                    ideal: 1920,
                    max: 4096
                },
                height: {
                    min: 400,
                    ideal: 1080,
                    max: 2160
                },
                aspectRatio: {
                    ideal: 1.7777777778
                },
                facingMode: 'environment'
            }
        }
    },

    control: {
        play: (paths)=>{
            return new Promise((resolve,reject)=>{
                //console.log(link,arrayRemove(link,""));
                var camera = byId('camera');
                if (camera) {
                    var video = camera.find("video");

                    if (window.width < window.height) {
                        constraints = webcam.constraints.horizontal;
                    } else {
                        constraints = webcam.constraints.horizontal;
                    }

                    navigator.mediaDevices.getUserMedia(constraints).then(async stream=>{
                        var track = stream.getVideoTracks()[0];
                        video.srcObject = webcam.stream = stream;
                        video.onloadedmetadata = data=>{
                            console.log({
                                video,
                                track
                            });
                            //alert('play');
                            //var capabilities = track.getCapabilities(); console.log({capabilities});
                            //if(capabilities.zoom) { }
                            //if(capabilities.torch) { }

                            //webcam.enumerate();
                            //alert('play');

                            //$(all('.io')).addClass('i').removeClass('o');
                            dom.body.dataset.webcam = true;
                            $(camera).addClass('playing')[0].find('video').play();
                            camera.dataset.mode = 'camera';
                            resolve({
                                paths
                            });
                        }
                    }
                    ).catch(err=>{
                        $(camera).removeClass('playing');
                        dom.body.dataset.cam = false;
                        resolve({
                            paths,
                            err
                        });
                    }
                    );
                }
            }
            );
        }
        ,
        stop: (paths)=>{
            return new Promise((resolve,reject)=>{
                if (webcam.stream) {
                    var camera = byId('camera');
                    var video = byId('webcam');
                    var cam = byId('video');
                    webcam.stream.getTracks().forEach(track=>track.stop());
                    $(camera).removeClass('playing');
                    //$(all('.io')).removeClass('i').addClass('o');
                    dom.body.dataset.webcam = false;
                }
            }
            );
        }
        ,
        switch: ()=>{
            navigator.mediaDevices.enumerateDevices().then(devices=>{
                //console.log({devices});
                var videos = [];
                if (devices.length > 0) {
                    var i = 0
                      , ii = 0;
                    while (i < devices.length) {
                        var track = devices[i];
                        var kind = track.kind;
                        if (kind === 'videoinput') {
                            var tracks = webcam.stream.getTracks();
                            for (var iii = 0; iii < tracks.length; iii++) {
                                if (track.deviceId === tracks[iii].getSettings().deviceId) {
                                    var id = track.deviceId;
                                }
                            }
                            videos[ii] = track;
                            ii++;
                        }
                        i++;
                    }
                    var next = objByKeyVal(videos, 'deviceId', id);
                    var v = parseInt(keyByVal(videos, next)) + 1; console.log(devices, videos, next, v, videos[v === videos.length ? 0 : v]);
                    var w = videos[v === videos.length ? 0 : v].deviceId; 
                    const videoConstraints = {};
                    videoConstraints.deviceId = {
                        exact: w
                    };
                    const constraints = {
                        video: videoConstraints,
                        audio: false
                    };
                    navigator.mediaDevices.getUserMedia(constraints).then(stream=>{
                        var camera = byId('camera');
                        var video = camera.find('video');
                        webcam.stream = stream;
                        video.srcObject = stream;
                        return navigator.mediaDevices.enumerateDevices();
                    }
                    );
                }
            }
            );
        }
        ,
    },

    load: {
        file: input=>{
            return new Promise((resolve,reject)=>{
                var files = input.files;
                //webcam.media = files[0];
                if (files.length > 0) {
                    if (files.length === 1) {
                        var reader = new FileReader();
                        var file = files[0];
                        console.log({
                            file
                        });
                        reader.readAsDataURL(file);
                        reader.onload = ()=>onLoad(reader.result, file.type);
                        reader.onloadstart = ()=>{
                            console.log();
                        }
                        ;
                        reader.onprogress = evt=>onProgress(evt);
                        reader.onabort = ()=>{}
                        ;
                        reader.onerror = ()=>console.log(reader.error);
                    }
                }
                function onLoad(file, type) {
                    var camera = byId('camera');
                    var format = type;
                    if (format.includes('image')) {
                        var canvas = camera.find('canvas');
                        var video = camera.find('video');
                        var photo = camera.find('#camera-photo');
                        var width = webcam.global.width;
                        var context = canvas.getContext('2d');
                        var img = new Image();
                        img.src = file;
                        img.addEventListener("load", ()=>{
                            webcam.global.width = photo.width = canvas.width = width;
                            var height = webcam.global.height = photo.height = canvas.height = img.height / (img.width / width);
                            context.drawImage(img, 0, 0, width, height);
                            //console.log({width,height});
                            if (width && height) {
                                canvas.width = width;
                                canvas.height = height;
                                //var png = canvas.toDataURL(type);
                                context.drawImage(img, 0, 0, width, height);
                                webcam.media = file;
                                resolve({
                                    file,
                                    type
                                });
                                //console.log(131,{file,type,elem});
                            }
                        }
                        );
                    }
                    if (format.includes('video')) {
                        var cam = byId('video');
                        dom.camera.find('#camera-video').src = file
                        //byId('camera-download').href = file;
                        cam.closest('.camera').classList.add('snap');
                        cam.closest('.create-form').classList.add('snap');
                        resolve({
                            file,
                            type
                        });
                    }
                    if (format.includes('audio')) {
                        webcam.media = file;
                        webcam.audio ? webcam.audio.destroy() : null;
                        webcam.audio = WaveSurfer.create({
                            container: '#camera-photo .waveform',
                            cursorColor: '#777',
                            progressColor: '#0096c7',
                            responsive: true,
                            waveColor: '#fff'
                        });
                        webcam.audio.loadBlob(files[0]);
                        webcam.audio.on('ready', ()=>{
                            webcam.audio.play();
                            byId('create-audio-play').classList.add('ing');
                        }
                        );
                        webcam.audio.on('play', ()=>{
                            byId('create-audio-play').classList.add('ing');
                        }
                        );
                        webcam.audio.on('pause', ()=>{
                            byId('create-audio-play').classList.remove('ing');
                        }
                        );
                        //dom.camera.classList.add('snap');
                        resolve({
                            file,
                            type
                        });
                    }
                }
                function onProgress(evt) {
                    console.log({
                        evt
                    });
                    if (evt.lengthComputable) {
                        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                        if (percentLoaded < 100) {
                            console.log(percentLoaded);
                        }
                    }
                }
            }
            );
        }
        ,
        down: target=>{
            target.href = canvas.toDataURL('image/png');
        }
    },

    record: {
        blob: event=>{
            const recordingBlob = new Blob(webcam.record.chunks,{
                type: 'video/mp4',
            });
            const recordingUrl = URL.createObjectURL(recordingBlob);
            var preview = byId('camera-video');
            preview.srcObject = undefined;
            preview.src = recordingUrl;
            var cam = dom.camera;
            cam.classList.add('snap');
            cam.closest('.create-form').classList.add('snap');
        }
        ,
        chunks: [],
        chunk: event=>{
            webcam.record.chunks.push(event.data);
        }
        ,
        er: null,
        ed: ()=>{
            webcam.record.er.stop();
            dom.camera.dataset.record = "ed";
        }
        ,
        ing: event=>{
            if (webcam.playing() && webcam.stream && ('MediaRecorder'in window)) {
                webcam.record.er = new MediaRecorder(webcam.stream);
                webcam.record.er.start();
                webcam.record.er.ondataavailable = webcam.record.chunk;
                webcam.record.er.onstop = webcam.record.blob;
                dom.camera.dataset.record = "ing";
            } else {
                alert('Device not supported. Check the CanIUse MediaRecorder API browser compatibility chart.');
            }
        }
    },
    
    clear: target=>{

        var cam = dom.camera;

        //CAMERA
        cam.classList.remove('snap');
        cam.closest('.camera').classList.remove('snap');
        cam.closest('.create-form').classList.remove('snap');

        //PHOTO
        dom.camera.find('#camera-photo img').removeAttribute('src');

        //VIDEO
        webcam.record.chunks = [];
        dom.camera.find('#camera-video').srcObject = undefined;
        dom.camera.find('#camera-video').removeAttribute('src');

        //AUDIO
        //webcam.audio ? webcam.audio.destroy() : null;

        //FILE
        var html = dom.file.outerHTML;
        console.log({
            file
        }, file.parentNode);

    }
    ,
    canplay: event=>{
        console.log('canplay');
        var video = event.target;
        if (!video.classList.contains('canplay')) {
            var width = webcam.global.width;
            var height = video.videoHeight / (video.videoWidth / width);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            video.classList.add('canplay');
        }
    }
    ,
    enumerate: ()=>{

        navigator.mediaDevices.enumerateDevices().then(devices=>{
            console.log({
                devices
            });
            var videos = [];
            if (devices.length > 0) {
                var i = 0
                  , ii = 0;
                var html = ``;
                while (i < devices.length) {
                    var track = devices[i];
                    var kind = track.kind;
                    if (kind === 'videoinput') {
                        var tracks = webcam.stream.getTracks();
                        for (var iii = 0; iii < tracks.length; iii++) {
                            if (track.deviceId === tracks[iii].getSettings().deviceId) {
                                var j = iii;
                                //alert(j);
                                var id = track.deviceId;
                                console.log(tracks, {
                                    iii,
                                    j
                                });
                            }
                            //console.log(track.deviceId, tracks[iii].getSettings().deviceId)
                        }
                        html += `<div>` + track.deviceId + `</div>`;
                        videos[ii] = track;
                        ii++;
                    }

                    i++;
                }
                byId('flip-cam').innerHTML = html;
            }
        }
        );
    }
    ,
    save: format=>{
        var image = byId('camera-photo').innerHTML;
        if (["audio"].includes(format)) {
            webcam.audio ? webcam.audio.destroy() : null
            webcam.audio = WaveSurfer.create({
                container: '#create-image-waveform',
                cursorColor: '#777',
                progressColor: '#0096c7',
                responsive: true,
                waveColor: '#fff'
            });
            webcam.audio.load(webcam.media);
            ('/create/audio/').router().then(()=>{
                ;webcam.audio.on('ready', ()=>{
                    //webcam.media = dom.file.files[0];
                    webcam.audio.pause();
                    byId('create-image').innerHTML = byId('camera-photo').find('img').outerHTML + byId('camera-photo').find('.controls').outerHTML;
                    byId('create-audio-play').classList.add('ing');

                }
                );
                dom.camera.classList.remove('snap');
                dom.camera.closest('.create-form').classList.remove('snap');

                //byId('file').remove();
                //byId('webcam').insertAdjacentHTML('afterbegin','<input id="file" style="display:none;" type="file" onchange="webcam.file(this);">');
            }
            );
            webcam.audio.on('play', ()=>{
                byId('create-audio-play').classList.add('ing');
            }
            );
            webcam.audio.on('pause', ()=>{
                byId('create-audio-play').classList.remove('ing');
            }
            );
        }
        if (["merch", "pages", "photo"].includes(format)) {
            byId('create-image').innerHTML = image;
            dom.camera.classList.remove('snap');
            dom.camera.closest('.create-form').classList.remove('snap');
            webcam.clear();
        }
        if (format === 'video') {
            byId('create-image').insertAdjacentHTML('beforeend', byId('camera-video').outerHTML);
            dom.camera.classList.remove('snap');
            dom.camera.closest('.create-form').classList.remove('snap');
            webcam.clear();
            dom.camera.classList.remove('snap');
            dom.camera.closest('.create-form').classList.remove('snap');
            webcam.clear();
        }
        if (format === 'merch') {
            byId('camera').insertAdjacentHTML('beforebegin', '<picture class="thumbnail">' + image + '</picture>');
            dom.camera.classList.remove('snap');
            dom.camera.closest('.create-form').classList.remove('snap');
            webcam.clear();
            dom.camera.classList.remove('snap');
            dom.camera.closest('.create-form').classList.remove('snap');
            webcam.clear();
            dom.camera.classList.remove('snap');
            dom.camera.closest('.create-form').classList.remove('snap');
            webcam.clear();
        }
        ('/create/' + format + '/').router().then(()=>{//byId('webcam').insertAdjacentHTML('afterbegin','<input class="file input" id="file" style="display:none" type="file" onchange="webcam.file(this);" accept="image/*">');
        //byId('webcam').children[1].remove();
        }
        );
    }
    ,
    snap: format=>{
        if (webcam.stream) {
            var cam = byId('camera');
            if (['photo'].includes(format)) {
                var vid = cam.find('video');
                var canvas = cam.find('canvas');
                var photo = cam.find('picture');
                var width = webcam.global.width;
                var context = canvas.getContext('2d');
                photo.width = canvas.width = width;
                //alert("width:" + width);
                webcam.global.height = photo.height = canvas.height = height = vid.videoHeight / (vid.videoWidth / width);
                //alert("height: " + height);
                //if(cam.clientHeight < cam.clientWidth) { }
                context.drawImage(vid, 0, 0, width, height);
                if (width && height) {
                    //alert(width + ":" + height);
                    //var data = canvas.toDataURL('image/png');
                    //canvas.width = width;
                    //canvas.height = height;
                    var image = canvas.toDataURL('image/png');
                    //context.drawImage(video, 0, 0, width, height);

                    //cam.closest('.camera').classList.add('snap');
                    //cam.closest('.create-form').classList.add('snap');

                    photo.find('img').src = image;
                    console.log('width:' + width + ", height:" + height);
                }
            }
            if (format === 'video') {
                cam.closest('.camera').classList.add('snap');
                cam.closest('.create-form').classList.add('snap');
            }
        }
    }
    ,
    stream: null,
    upload: (format)=>{
        console.log(webcam);
        var file = dom.file;
        webcam.media = file.input;
        if (format === 'merch') {
            file.accept = 'image/*';
            file.removeAttribute('capture');
        }
        if (format === 'photo') {
            file.accept = 'image/*';
            file.removeAttribute('capture');
        }
        if (format === 'video') {
            file.accept = 'video/*';
            file.removeAttribute('capture');
        }
        if (format === 'audio') {
            file.accept = 'image/*';
            file.removeAttribute('capture');
        }
        if (format === 'pages') {
            file.accept = 'image/*';
            file.removeAttribute('capture');
        }
        file.click();
    }
}
function keyByVal(object, value) {
    return Object.keys(object).find(key=>object[key] === value);
}
function objByKeyVal(object, key, value) {
    return Object.values(object).find(val=>val[key] === value);
}
