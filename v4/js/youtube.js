const videocontainer = document.getElementById('videocontainer');
let miniplayerBtns = document.querySelectorAll('#mp-btn');
let blockstatus = NaN;
const miniplayerStatus = {};

function getVideosFromChannel(maxResults = 10) {
    return new Promise((resolve, reject) => {
        const apiUrl = `https://fetchyt.star08-web.workers.dev/?maxResults=${maxResults}`;
        const request = new XMLHttpRequest();
        request.open('GET', apiUrl, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                const data = JSON.parse(request.responseText);
                const videos = data.items.map(item => {
                    return {
                        title: item.snippet.title,
                        videoId: item.id.videoId,
                        thumbnail: item.snippet.thumbnails.high.url
                    };
                });
                resolve(videos);
            } else {
                const errString = "Si è verificato il seguent errore:" + request.status;
                spawnnotify(errString, "error");
                console.error(errString);
                reject(new Error(errString));
            }
        };

        request.onerror = function () {
            const errString = "Si è verificato il seguent errore:" + request.status;
            spawnnotify(errString, "error");
            console.error(errString);
            reject(new Error(errString));
        };

        request.send();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    getVideosFromChannel(30)
        .then(videos => {
            let grid = undefined;
            videos.forEach(element => {
                if (blockstatus === 2 || isNaN(blockstatus)) {
                    if (!isNaN(blockstatus)) {
                        videocontainer.appendChild(document.createElement('br'));
                    }
                    grid = document.createElement('div');
                    grid.classList.add('grid');
                    videocontainer.appendChild(grid);
                    blockstatus = 0;
                }
                const video = document.createElement('div');
                const box = document.createElement('article');
                box.dataset.videoId = element.videoId;
                box.id = `video-${element.videoId}`;
                box.innerHTML = `
                <header>
                    <img id="thumbnail" src="${element.thumbnail}" alt="${element.title}" style="border-radius: 7px;">
                    <iframe id="miniplayer" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="display: none; border-radius: 7px;"></iframe>
                </header>
                <h2>${element.title}</h2>
                <button onclick="replaceURL('https://www.youtube.com/watch?v=${element.videoId}')"><i class="fa-regular fa-circle-play"></i> Guarda su YouTube</button>
                <button id="mp-btn"><i class="fa-solid fa-tv"></i> Guarda nel miniplayer</button>
                <button onclick="copyToClipboard('https://www.youtube.com/watch?v=${element.videoId}')"><i class="fa-solid fa-link"></i> Copia link</button>
                `;
                video.appendChild(box);
                grid.appendChild(video);
                MPS(element.videoId, 'set', 'paused');
                blockstatus = blockstatus + 1;
            });
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
        });
});

function handleMiniplayer(elem){
    const videoId = elem.parentElement.dataset.videoId;
    const header = elem.parentElement.querySelector('header');
    const thumbnail = header.querySelector('#thumbnail');
    const miniplayer = header.querySelector('#miniplayer');
    if (MPS(videoId, 'get') !== 'paused') {
        miniplayer.src = '';
        miniplayer.style.display = 'none';
        thumbnail.style.display = 'block';
        MPS(videoId, 'set', 'paused');
        return;
    }
    miniplayer.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    miniplayer.style.display = 'block';
    thumbnail.style.display = 'none';
    MPS(videoId, 'set', 'playing');
}

setInterval(() => {
    if (miniplayerBtns.length === 0) {
        miniplayerBtns = document.querySelectorAll('#mp-btn');
    }
    miniplayerBtns.forEach(miniplayerBtn => {
        miniplayerBtn.addEventListener('click', function () {
            handleMiniplayer(this); 
        });
    });
}, 1000);


function MPS(vID, what, status = NaN){
    switch (what) {
        case 'get':
            return miniplayerStatus[vID];
        case 'set':
            if (!isNaN(status)) {
                spawnnotify("miniplayerStatus: param(status) isn't valid", "error");
                break;
            }
            miniplayerStatus[vID] = status;
            break;
    }
}