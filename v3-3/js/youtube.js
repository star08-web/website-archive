let videocontainer = document.getElementById('videocontainer');

async function getVideosFromChannel(maxResults = 10) {
    try {
        apiUrl = `https://fetchyt.star08-web.workers.dev/?maxResults=${maxResults}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            console.error('Errore richiesta API:', response.status, response.statusText);
            throw new spawnnotify(`Errore richiesta API ${response.status}`, 'error');
        }
        
        const data = await response.json();
        
        const videos = data.items.map(item => {
            return {
                title: item.snippet.title,
                videoId: item.id.videoId,
                thumbnail: item.snippet.thumbnails.high.url
            };
        });
        
        return videos;
    } catch (error) {
        spawnnotify(`Si è verificato un errore: ${error}`, 'error');
        console.error('Si è verificato un errore:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const videos = await getVideosFromChannel(30);
    videos.forEach(element => {
        const video = document.createElement('article');
        video.innerHTML = `
        <header>
            <img src="${element.thumbnail}" alt="${element.title}">
        </header>
        <h2>${element.title}</h2>
        <button onclick="replaceURL('https://www.youtube.com/watch?v=${element.videoId}')"><i class="fa-regular fa-circle-play"></i> Guarda su YouTube</button>
        <button onclick="copyToClipboard('https://www.youtube.com/watch?v=${element.videoId}')"><i class="fa-solid fa-link"></i> Copia link</button>
        `;
        videocontainer.appendChild(video);
        for (let i = 0; i < 8; i++) {videocontainer.appendChild(document.createElement('br'));}
    });
});
