// Spotify API Credentials
const client_id = '4aa6d082fb7241f9b82ccd502372fa58';
const client_secret = '55b67b5daff94a678075eecbc1fa1ba7';
let token = '';

let currentAudio = null; 

async function fetchToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await response.json();
        token = data.access_token;
    } catch (error) {
        console.error('Error fetching the token:', error);
    }
}

async function searchTracks(query) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        displayTracks(data.tracks.items);
    } catch (error) {
        console.error('Error searching for tracks:', error);
    }
}

function displayTracks(tracks) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (tracks.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('col-md-4', 'mb-4');

        trackElement.innerHTML = `
            <div class="card h-100">
                <img src="${track.album.images[0].url}" class="card-img-top" alt="${track.name}">
                <div class="card-body">
                    <h5 class="card-title">${track.name}</h5>
                    <p class="card-text">${track.artists[0].name}</p>
                    ${track.preview_url ? 
                        `<audio controls class="audio-player">
                            <source src="${track.preview_url}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>` : 
                        '<p>Preview not available</p>'
                    }
                </div>
            </div>
        `;

        const audioPlayer = trackElement.querySelector('audio');
        if (audioPlayer) {
            audioPlayer.addEventListener('play', () => {

                if (currentAudio && currentAudio !== audioPlayer) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0; 
                }
                
                currentAudio = audioPlayer;
            });
        }

        resultsContainer.appendChild(trackElement);
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchSong').value.trim();
    if (query) {
        searchTracks(query);
    }
});

fetchToken();
