/**
 * If postID is specified on the URL
 * (e.g., http://bit.marcocetica.com/search/?id=foo),
 * then parse the URL parameter and trigger the search.
 */
const searchFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("id");

    if(post_id) searchPost(post_id, null);
}

const searchPost = (post_id, event) => {
    // Prevent form submission
    if(event) event.preventDefault();

    // Make the GET request
    fetch(`https://bit.marcocetica.com/api/posts/${post_id}`, {
        method: "GET"
    })
    .then(response => {
        if(!response.ok) {
            return response.json().then(error => {
                throw error;
            });
        }

        return response.json();
    })
    .then(data => {
        // Show output panel and hide search form
        const result_panel = document.querySelector(".result-panel");
        const search_form = document.querySelector(".bit-form");
        result_panel.style.display = "block";
        search_form.style.display = "none";

        // Set post title
        document.querySelector(".title").textContent = data.title;
        // Set post author
        const author = data.user ? data.user.username : "anonymous";
        document.querySelector(".metadata").innerHTML = 
            `<span class="metadata-el">user</span>: <code>${author}</code>&nbsp;/&nbsp;`;
        // Set post expiration date
        const exp = data.expirationDate ? data.expirationDate : "never";
        document.querySelector(".metadata").innerHTML += 
            `<span class="metadata-el">expiration</span>: <code>${exp}</code>&nbsp;/&nbsp;`;
        // Set post ID
        const id = data.id;
        document.querySelector(".metadata").innerHTML += 
            `<span class="metadata-el">ID</span>: <code><a href="/search?id=${id}">${id}</a></code>`;
        // Set post content
        document.querySelector(".content").textContent = data.content;
    })
    .catch(data => {
        // Show error panel
        const error_panel = document.querySelector(".error-panel");
        error_panel.style.display = "block";
        error_panel.innerHTML = `<b>ERROR:</b> ${Object.values(data)[0]}`;

        setTimeout(() => {
            error_panel.style.display = "none";
            error_panel.innerHTML = "";
        }, 5000);
    })
}