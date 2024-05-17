// ==UserScript==
// @name         embyLaunchPotplayer
// @name:en      embyLaunchPotplayer
// @name:zh      embyLaunchPotplayer
// @name:zh-CN   embyLaunchPotplayer
// @namespace    http://tampermonkey.net/
// @version      1.1.3
// @description  emby/jellfin launch extetnal player
// @description:zh-cn emby/jellfin 调用外部播放器
// @description:en  emby/jellfin to external player
// @license      MIT
// @author       @bpking
// @github       https://github.com/bpking1/embyExternalUrl
// @include      */web/index.html
// ==/UserScript==

(function () {
    'use strict';
    // 以下为内部使用变量,请勿更改
    let isEmby = "";
    function init() {
        let playBtns = document.getElementById("ExternalPlayersBtns");
        if (playBtns) {
            playBtns.remove();
        }
        let mainDetailButtons = document.querySelector("div[is='emby-scroller']:not(.hide) .mainDetailButtons");
        let buttonhtml = `<div id="ExternalPlayersBtns" class ="detailButtons flex align-items-flex-start flex-wrap-wrap">
            <button id="embyPot" type="button" class="detailButton  emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary" title="Potplayer"> <div class="detailButton-content"> <i class="md-icon detailButton-icon button-icon button-icon-left" id="icon-PotPlayer">　</i>  <span class="button-text">Pot</span> </div> </button>
            <button id="embyVlc" type="button" class="detailButton  emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary" title="VLC"> <div class="detailButton-content"> <i class="md-icon detailButton-icon button-icon button-icon-left" id="icon-VLC">　</i>  <span class="button-text">VLC</span>  </div> </button>
            <button id="embyIINA" type="button" class="detailButton  emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary" title="IINA"> <div class="detailButton-content"> <i class="md-icon detailButton-icon button-icon button-icon-left" id="icon-IINA">　</i>  <span class="button-text">IINA</span> </div> </button>
            <button id="embyNPlayer" type="button" class="detailButton  emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary" title="NPlayer"> <div class="detailButton-content"> <i class="md-icon detailButton-icon button-icon button-icon-left" id="icon-NPlayer">　</i>  <span class="button-text">NPlayer</span> </div> </button>
            <button id="embyMX" type="button" class="detailButton  emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary" title="MXPlayer"> <div class="detailButton-content"> <i class="md-icon detailButton-icon button-icon button-icon-left" id="icon-MXPlayer">　</i>  <span class="button-text">MX</span> </div> </button>
            <button id="embyInfuse" type="button" class="detailButton  emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary" title="InfusePlayer"> <div class="detailButton-content"> <i class="md-icon detailButton-icon button-icon button-icon-left" id="icon-infuse">　</i>  <span class="button-text">Infuse</span> </div> </button>
            <button id="embyStellarPlayer" type="button" class="detailButton  emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary" title="恒星播放器"> <div class="detailButton-content"> <i class="md-icon detailButton-icon button-icon button-icon-left" id="icon-StellarPlayer">　</i>  <span class="button-text">恒星</span> </div> </button>
            <button id="embyMPV" type="button" class="detailButton  emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary" title="MPV"> <div class="detailButton-content"> <i class="md-icon detailButton-icon button-icon button-icon-left" id="icon-MPV">　</i>  <span class="button-text">MPV</span> </div> </button>
            <button id="embyDDPlay" type="button" class="detailButton  emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary" title="MPV"> <div class="detailButton-content"> <i class="md-icon detailButton-icon button-icon button-icon-left" id="icon-DDPlay">　</i>  <span class="button-text">DDPlay</span> </div> </button>
            <button id="embyCopyUrl" type="button" class="detailButton  emby-button emby-button-backdropfilter raised-backdropfilter detailButton-primary" title="复制串流地址"> <div class="detailButton-content"> <i class="md-icon detailButton-icon button-icon button-icon-left" id="icon-Copy">　</i>  <span class="button-text">复制链接</span> </div> </button>
            </div>`;
        if (!isEmby) {
            // jellfin
            mainDetailButtons = document.querySelector("div.detailPagePrimaryContainer");
        }

        mainDetailButtons.insertAdjacentHTML('afterend', buttonhtml);

        if (!isEmby) {
            // jellfin add class, detailPagePrimaryContainer、button-flat
            let playBtnsWrapper = document.getElementById("ExternalPlayersBtns");
            playBtnsWrapper.classList.add("detailPagePrimaryContainer");
            let btns = playBtnsWrapper.getElementsByTagName("button");
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.add("button-flat");
            }
        }

        // add event
        document.querySelector("#embyPot").onclick = embyPot;
        document.querySelector("#embyVlc").onclick = embyVlc;
        document.querySelector("#embyIINA").onclick = embyIINA;
        document.querySelector("#embyNPlayer").onclick = embyNPlayer;
        document.querySelector("#embyMX").onclick = embyMX;
        document.querySelector("#embyInfuse").onclick = embyInfuse;
        document.querySelector("#embyStellarPlayer").onclick = embyStellarPlayer;
        document.querySelector("#embyMPV").onclick = embyMPV;
        document.querySelector("#embyDDPlay").onclick = embyDDPlay;
        document.querySelector("#embyCopyUrl").onclick = embyCopyUrl;

        // add icons from jsdelivr, network
        document.querySelector("#icon-PotPlayer").style.cssText += 'background: url(https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-PotPlayer.webp)no-repeat;background-size: 100% 100%;font-size: 1.4em';
        document.querySelector("#icon-VLC").style.cssText += 'background: url(https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-VLC.webp)no-repeat;background-size: 100% 100%;font-size: 1.3em';
        document.querySelector("#icon-IINA").style.cssText += 'background: url(https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-IINA.webp)no-repeat;background-size: 100% 100%;font-size: 1.4em';
        document.querySelector("#icon-NPlayer").style.cssText += 'background: url(https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-NPlayer.webp)no-repeat;background-size: 100% 100%;font-size: 1.3em';
        document.querySelector("#icon-MXPlayer").style.cssText += 'background: url(https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-MXPlayer.webp)no-repeat;background-size: 100% 100%;font-size: 1.4em';
        document.querySelector("#icon-infuse").style.cssText += 'background: url(https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-infuse.webp)no-repeat;background-size: 100% 100%;font-size: 1.4em';
        document.querySelector("#icon-StellarPlayer").style.cssText += 'background: url(https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-StellarPlayer.webp)no-repeat;background-size: 100% 100%;font-size: 1.4em';
        document.querySelector("#icon-MPV").style.cssText += 'background: url(https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-MPV.webp)no-repeat;background-size: 100% 100%;font-size: 1.4em';
        document.querySelector("#icon-DDPlay").style.cssText += 'background: url(https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@main/embyWebAddExternalUrl/icons/icon-DDPlay.webp)no-repeat;background-size: 100% 100%;font-size: 1.4em';
        document.querySelector("#icon-Copy").style.cssText += 'background: url(https://fastly.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.5/embyWebAddExternalUrl/icons/icon-Copy.webp)no-repeat;background-size: 100% 100%;font-size: 1.4em';
    
        // add icons from Base64, local, this script size 22.5KB to 74KB, if use, self copy from ext.js

    }

    function showFlag() {
        // itemMiscInfo-primary
        // 评分,上映日期信息栏
        let mediaInfoPrimary = document.querySelector("div[is='emby-scroller']:not(.hide) .mediaInfoPrimary:not(.hide)");
        // 创建录制按钮
        let btnManualRecording = document.querySelector("div[is='emby-scroller']:not(.hide) .btnManualRecording:not(.hide)");
        if (!isEmby) {
            mediaInfoPrimary = document.querySelector(".itemMiscInfo-primary:not(.hide)");
            // 停止录制按钮
            btnManualRecording = document.querySelector(".btnCancelTimer:not(.hide)");
        }
        return !!mediaInfoPrimary || !!btnManualRecording;

        // let mainDetailButtons = document.querySelector("div[is='emby-scroller']:not(.hide) .mainDetailButtons");
        // if (!mainDetailButtons) {
        //     return false;
        // }
        // let videoElement = document.querySelector("div[is='emby-scroller']:not(.hide) .selectVideoContainer");
        // if (videoElement && videoElement.classList.contains("hide")) {
        //     return false;
        // }
        // let audioElement = document.querySelector("div[is='emby-scroller']:not(.hide) .selectAudioContainer");
        // return !(audioElement && audioElement.classList.contains("hide"));
    }

    async function getItemInfo() {
        let userId = ApiClient._serverInfo.UserId;
        let itemId = /\?id=([A-Za-z0-9]+)/.exec(window.location.hash)[1];
        let response = await ApiClient.getItem(userId, itemId);
        // 继续播放当前剧集的下一集
        if (response.Type == "Series") {
            let seriesNextUpItems = await ApiClient.getNextUpEpisodes({ SeriesId: itemId, UserId: userId });
            if (seriesNextUpItems.Items.length > 0) {
                console.log("nextUpItemId: " + seriesNextUpItems.Items[0].Id);
                return await ApiClient.getItem(userId, seriesNextUpItems.Items[0].Id);
            }
        }
        // 播放当前季season的第一集
        if (response.Type == "Season") {
            let seasonItems = await ApiClient.getItems(userId, { parentId: itemId });
            console.log("seasonItemId: " + seasonItems.Items[0].Id);
            return await ApiClient.getItem(userId, seasonItems.Items[0].Id);
        }
        // 播放当前集或电影
        if (response.MediaSources.length > 0) {
            console.log("itemId:  " + itemId);
            return response;
        }
        // 默认播放第一个,集/播放列表第一个媒体
        let firstItems = await ApiClient.getItems(userId, { parentId: itemId, Recursive: true, IsFolder: false, Limit: 1 });
        console.log("firstItemId: " + firstItems.Items[0].Id);
        return await ApiClient.getItem(userId, firstItems.Items[0].Id);
    }

    function getSeek(position) {
        let ticks = position * 10000;
        let parts = []
            , hours = ticks / 36e9;
        (hours = Math.floor(hours)) && parts.push(hours);
        let minutes = (ticks -= 36e9 * hours) / 6e8;
        ticks -= 6e8 * (minutes = Math.floor(minutes)),
            minutes < 10 && hours && (minutes = "0" + minutes),
            parts.push(minutes);
        let seconds = ticks / 1e7;
        return (seconds = Math.floor(seconds)) < 10 && (seconds = "0" + seconds),
            parts.push(seconds),
            parts.join(":")
    }

    function getSubPath(mediaSource) {
        let selectSubtitles = document.querySelector("div[is='emby-scroller']:not(.hide) select.selectSubtitles");
        let subTitlePath = '';
        //返回选中的外挂字幕
        if (selectSubtitles && selectSubtitles.value > 0) {
            let SubIndex = mediaSource.MediaStreams.findIndex(m => m.Index == selectSubtitles.value && m.IsExternal);
            if (SubIndex > -1) {
                let subtitleCodec = mediaSource.MediaStreams[SubIndex].Codec;
                subTitlePath = `/${mediaSource.Id}/Subtitles/${selectSubtitles.value}/Stream.${subtitleCodec}`;
            }
        }
        else {
            //默认尝试返回第一个外挂中文字幕
            let chiSubIndex = mediaSource.MediaStreams.findIndex(m => m.Language == "chi" && m.IsExternal);
            if (chiSubIndex > -1) {
                let subtitleCodec = mediaSource.MediaStreams[chiSubIndex].Codec;
                subTitlePath = `/${mediaSource.Id}/Subtitles/${chiSubIndex}/Stream.${subtitleCodec}`;
            } else {
                //尝试返回第一个外挂字幕
                let externalSubIndex = mediaSource.MediaStreams.findIndex(m => m.IsExternal);
                if (externalSubIndex > -1) {
                    let subtitleCodec = mediaSource.MediaStreams[externalSubIndex].Codec;
                    subTitlePath = `/${mediaSource.Id}/Subtitles/${externalSubIndex}/Stream.${subtitleCodec}`;
                }
            }

        }
        return subTitlePath;
    }


    async function getEmbyMediaInfo() {
        let itemInfo = await getItemInfo();
        let mediaSourceId = itemInfo.MediaSources[0].Id;
        let selectSource = document.querySelector("div[is='emby-scroller']:not(.hide) select.selectSource:not([disabled])");
        if (selectSource && selectSource.value.length > 0) {
            mediaSourceId = selectSource.value;
        }
        // let selectAudio = document.querySelector("div[is='emby-scroller']:not(.hide) select.selectAudio:not([disabled])");
        let mediaSource = itemInfo.MediaSources.find(m => m.Id == mediaSourceId);
        let uri = isEmby ? "/emby/videos" : "/Items";
        let domain = `${ApiClient._serverAddress}${uri}/${itemInfo.Id}`;
        let subPath = getSubPath(mediaSource);
        let subUrl = subPath.length > 0 ? `${domain}${subPath}?api_key=${ApiClient.accessToken()}` : '';
        let streamUrl;
        // origin link: /emby/videos/401929/stream.xxx?xxx
        // modify link: /emby/videos/401929/stream/xxx.xxx?xxx
        // this is not important, hit "/emby/videos/401929/" path level still worked
        let fileName = mediaSource.Path.replace(/.*[\\/]/, "");
        if (isEmby) {
            fileName = mediaSource.IsInfiniteStream ? "master.m3u8" : fileName;
            streamUrl = `${domain}/stream/${fileName}?api_key=${ApiClient.accessToken()}&Static=true&MediaSourceId=${mediaSourceId}`;
        } else {
            streamUrl = `${domain}/Download/${fileName}?api_key=${ApiClient.accessToken()}&Static=true&MediaSourceId=${mediaSourceId}`;
        }
        let position = parseInt(itemInfo.UserData.PlaybackPositionTicks / 10000);
        let intent = await getIntent(mediaSource, position);
        console.log(streamUrl, subUrl, intent);
        return {
            streamUrl: streamUrl,
            subUrl: subUrl,
            intent: intent,
        }
    }

    async function getIntent(mediaSource, position) {
        // 直播节目查询items接口没有path
        let title = mediaSource.IsInfiniteStream 
            ? mediaSource.Name 
            : mediaSource.Path.split('/').pop();
        let externalSubs = mediaSource.MediaStreams.filter(m => m.IsExternal == true);
        let subs = ''; //要求是android.net.uri[] ?
        let subs_name = '';
        let subs_filename = '';
        let subs_enable = '';
        if (externalSubs) {
            subs_name = externalSubs.map(s => s.DisplayTitle);
            subs_filename = externalSubs.map(s => s.Path.split('/').pop());
        }
        return {
            title: title,
            position: position,
            subs: subs,
            subs_name: subs_name,
            subs_filename: subs_filename,
            subs_enable: subs_enable
        };
    }

    // URL with "intent" scheme 只支持
    // String => 'S'
    // Boolean =>'B'
    // Byte => 'b'
    // Character => 'c'
    // Double => 'd'
    // Float => 'f'
    // Integer => 'i'
    // Long => 'l'
    // Short => 's'

    async function embyPot() {
        let mediaInfo = await getEmbyMediaInfo();
        let intent = mediaInfo.intent;
        let poturl = `potplayer://${encodeURI(mediaInfo.streamUrl)} /sub=${encodeURI(mediaInfo.subUrl)} /current /title="${intent.title}" /seek=${getSeek(intent.position)}`;
        console.log(poturl);
        window.open(poturl, "_self");
    }

    // https://wiki.videolan.org/Android_Player_Intents/
    async function embyVlc() {
        let mediaInfo = await getEmbyMediaInfo();
        let intent = mediaInfo.intent;
        // android subtitles:  https://code.videolan.org/videolan/vlc-android/-/issues/1903
        let vlcUrl = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=org.videolan.vlc;type=video/*;S.subtitles_location=${encodeURI(mediaInfo.subUrl)};S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        if (getOS() == 'windows') {
            // 桌面端需要额外设置,参考这个项目: https://github.com/stefansundin/vlc-protocol 
            vlcUrl = `vlc://${encodeURI(mediaInfo.streamUrl)}`;
        }
        if (getOS() == 'ios') {
            // https://wiki.videolan.org/Documentation:IOS/#x-callback-url
            // https://code.videolan.org/videolan/vlc-ios/-/commit/55e27ed69e2fce7d87c47c9342f8889fda356aa9
            vlcUrl = `vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(mediaInfo.streamUrl)}&sub=${encodeURIComponent(mediaInfo.subUrl)}`;
        }
        console.log(vlcUrl);
        window.open(vlcUrl, "_self");
    }

    // https://github.com/iina/iina/issues/1991
    async function embyIINA() {
        let mediaInfo = await getEmbyMediaInfo();
        let iinaUrl = `iina://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}&new_window=1`;
        console.log(`iinaUrl= ${iinaUrl}`);
        window.open(iinaUrl, "_self");
    }

    // https://sites.google.com/site/mxvpen/api
    // https://mx.j2inter.com/api
    // https://support.mxplayer.in/support/solutions/folders/43000574903
    async function embyMX() {
        let mediaInfo = await getEmbyMediaInfo();
        let intent = mediaInfo.intent;
        // mxPlayer free
        let mxUrl = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=com.mxtech.videoplayer.ad;S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        // mxPlayer Pro
        // let mxUrl = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=com.mxtech.videoplayer.pro;S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        console.log(mxUrl);
        window.open(mxUrl, "_self");
    }

    async function embyNPlayer() {
        let mediaInfo = await getEmbyMediaInfo();
        let nUrl = getOS() == 'macOS' 
            ? `nplayer-mac://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}&new_window=1` 
            : `nplayer-${encodeURI(mediaInfo.streamUrl)}`;
        console.log(nUrl);
        window.open(nUrl, "_self");
    }

    async function embyInfuse() {
        let mediaInfo = await getEmbyMediaInfo();
        // sub 参数限制: 播放带有外挂字幕的单个视频文件（Infuse 7.6.2 及以上版本）
        // see: https://support.firecore.com/hc/zh-cn/articles/215090997
        let infuseUrl = `infuse://x-callback-url/play?url=${encodeURIComponent(mediaInfo.streamUrl)}&sub=${encodeURIComponent(mediaInfo.subUrl)}`;
        console.log(`infuseUrl= ${infuseUrl}`);
        window.open(infuseUrl, "_self");
    }

    // StellarPlayer
    async function embyStellarPlayer() {
        let mediaInfo = await getEmbyMediaInfo();
        let stellarPlayerUrl = `stellar://play/${encodeURI(mediaInfo.streamUrl)}`;
        console.log(`stellarPlayerUrl= ${stellarPlayerUrl}`);
        window.open(stellarPlayerUrl, "_self");
    }

    // MPV
    async function embyMPV() {
        let mediaInfo = await getEmbyMediaInfo();
        //桌面端需要额外设置,使用这个项目: https://github.com/akiirui/mpv-handler
        let streamUrl64 = btoa(encodeURIComponent(mediaInfo.streamUrl))
            .replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "");
        let MPVUrl = `mpv://play/${streamUrl64}`;
        if (mediaInfo.subUrl.length > 0) {
            let subUrl64 = btoa(mediaInfo.subUrl).replace(/\//g, "_").replace(/\+/g, "-").replace(/\=/g, "");
            MPVUrl = `mpv://play/${streamUrl64}/?subfile=${subUrl64}`;
        }

        if (getOS() == "ios" || getOS() == "android") {
            MPVUrl = `mpv://${encodeURI(mediaInfo.streamUrl)}`;
        }

        console.log(MPVUrl);
        window.open(MPVUrl, "_self");
    }

    // see https://greasyfork.org/zh-CN/scripts/443916
    async function embyDDPlay() {
        // 检查是否windows本地路径
        const fullPathEle = document.querySelector(".mediaSources .mediaSource .sectionTitle");
        let fullPath = fullPathEle ? fullPathEle.firstChild.innerText : "";
        let ddplayUrl;
        if (new RegExp('^[a-zA-Z]:').test(fullPath)) {
            ddplayUrl = `ddplay:${encodeURIComponent(fullPath)}`;
        } else {
            console.log("文件路径不是本地路径,将使用串流播放");
            const mediaInfo = await getEmbyMediaInfo();
            const intent = mediaInfo.intent;
            if (!fullPath) {
                fullPath = intent.title;
            }
            const urlPart = mediaInfo.streamUrl + `|filePath=${fullPath}`;
            ddplayUrl = `ddplay:${encodeURIComponent(urlPart)}`;
            if (getOS() == "android") {
                // Subtitles Not Supported: https://github.com/kaedei/dandanplay-libraryindex/blob/master/api/ClientProtocol.md
                ddplayUrl = `intent:${encodeURI(urlPart)}#Intent;package=com.xyoye.dandanplay;type=video/*;end`;
            }
        }
        console.log(`ddplayUrl= ${ddplayUrl}`);
        window.open(ddplayUrl, "_self");
    }

    async function embyCopyUrl() {
        let mediaInfo = await getEmbyMediaInfo();
        let textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.style.position = 'absolute';
        textarea.style.clip = 'rect(0 0 0 0)';
        textarea.value = mediaInfo.streamUrl;
        textarea.select();
        if (document.execCommand('copy', true)) {
            console.log(`copyUrl = ${mediaInfo.streamUrl}`);
            this.innerText = '复制成功';
        }
        //need https
        // if (navigator.clipboard) {
        //     navigator.clipboard.writeText(mediaInfo.streamUrl).then(() => {
        //          console.log(`copyUrl = ${mediaInfo.streamUrl}`);
        //          this.innerText = '复制成功';
        //     })
        // }
    }

    function getOS() {
        let ua = navigator.userAgent
        if (!!ua.match(/compatible/i) || ua.match(/Windows/i)) {
            return 'windows'
        } else if (!!ua.match(/Macintosh/i) || ua.match(/MacIntel/i)) {
            return 'macOS'
        } else if (!!ua.match(/iphone/i) || ua.match(/Ipad/i)) {
            return 'ios'
        } else if (ua.match(/android/i)) {
            return 'android'
        } else if (ua.match(/Ubuntu/i)) {
            return 'ubuntu'
        } else {
            return 'other'
        }
    }

    // monitor dom changements
    document.addEventListener("viewbeforeshow", function (e) {
        console.log("viewbeforeshow", e);
        if (isEmby === "") {
            isEmby = !!e.detail.contextPath;
        }
        let isItemDetailPage;
        if (isEmby) {
            isItemDetailPage = e.detail.contextPath.startsWith("/item?id=");
        } else {
            isItemDetailPage = !!e.detail.state && !!e.detail.state.item.Id;
        }
        if (isItemDetailPage) {
            const mutation = new MutationObserver(function() {
                if (showFlag()) {
                    init();
                    mutation.disconnect();
                }
            })
            mutation.observe(document.body, {
                childList: true,
                characterData: true,
                subtree: true,
            })
        }
    });

})();
