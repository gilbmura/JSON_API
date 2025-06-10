// const URL = "https://api.tvmaze.com/search/shows?q=breaking"
// let promised_response = fetch(URL).then(function(resolved_response){
//     return resolved_response.json()
// }).then(function(resolved_data){
//     let json_dicitionary = resolved_data

//     console.log(json_dicitionary[0]['show']['name'])
//     console.log(json_dicitionary[0]['show']['summary'])
//     let genre = json_dicitionary[0]['show']['genres']
//     for(let count of genre){
//         console.log(count)
//     }
// })

document.getElementById('searchBtn').addEventListener('click', function() {
    const query = document.getElementById('searchBox').value.trim();
    if (!query) return;

    const URL = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results

            const shows = data.slice(0, 10); // Limit to 10 results
            if (shows.length === 0) {
                resultsDiv.innerHTML = '<p>No results found.</p>';
                return;
            }

            shows.forEach(item => {
                const show = item.show;
                const name = show.name || 'No name available';
                const summary = show.summary || 'No summary available';
                const genres = show.genres.length ? show.genres.join(', ') : 'No genres available';

                const showDiv = document.createElement('div');
                showDiv.className = 'show';
                showDiv.innerHTML = `
                    <h2>${name}</h2>
                    <div class="genres"><strong>Genres:</strong> ${genres}</div>
                    <div class="summary">${summary}</div>
                `;
                resultsDiv.appendChild(showDiv);
            });
        });
});