const https = require('https');

const API_KEY = '9b4151e9';

function requestOMDB(endpoint, callback) {
    const options = {
        hostname: 'www.omdbapi.com',
        path: `/?apikey=${API_KEY}&${endpoint}`,
        method: 'GET'
    };

    const req = https.request(options, res => {
        let data = '';

        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            const parsedData = JSON.parse(data);
            callback(parsedData);
        });
    });

    req.on('error', error => {
        console.error('Error making request to OMDB API:', error);
    });

    req.end();
}

function searchMovieByTitle(title, callback) {
    const endpoint = `t=${encodeURIComponent(title)}`;
    requestOMDB(endpoint, callback);
}

function getMovieDetailsById(imdbId, callback) {
    const endpoint = `i=${encodeURIComponent(imdbId)}`;
    requestOMDB(endpoint, callback);
}

function searchMoviesByTerm(term, callback) {
    const endpoint = `s=${encodeURIComponent(term)}`;
    requestOMDB(endpoint, callback);
}

module.exports = {
    searchMovieByTitle,
    getMovieDetailsById,
    searchMoviesByTerm
};
