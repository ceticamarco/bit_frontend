const loadPostId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("id");

    // If post ID is specified, set input box, otherwise show an error
    if(post_id) {
        document.querySelector('input[name="id"]').value = post_id;
    } else {
        const error_panel = document.querySelector(".error-panel");
        error_panel.style.display = "block";
        error_panel.innerHTML = "<b>ERROR:</b> specify an ID in the URL";

        setTimeout(() => {
            error_panel.style.display = "none";
            error_panel.innerHTML = "";
        }, 5000);
    }
}

const updatePost = (event) => {
    // Prevent form submission
    event.preventDefault();

    // Get form data
    const id_field = document.querySelector('[name="id"]').value;
    const title_field = document.querySelector('[name="title"]').value;
    const content_field = document.querySelector('[name="content"]').value;
    const email_field = document.querySelector('[name="email"]').value;
    const password_field = document.querySelector('[name="password"]').value;

    // Build form object
    const form_data = {
        title: title_field,
        content: content_field,
        user: {
            email: email_field,
            password: password_field
        }
    };

    // Check whether post ID is defined
    if(!id_field) {
        const error_panel = document.querySelector(".error-panel");
        error_panel.style.display = "block";
        error_panel.innerHTML = "<b>ERROR:</b> post ID not defined";

        setTimeout(() => {
            error_panel.style.display = "none";
            error_panel.innerHTML = "";
        }, 5000);
        
        return;
    }

    // Make the PUT request
    fetch(`https://bit.marcocetica.com/api/posts/${id_field}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form_data),
    })
    .then(response => {
        if(!response.ok) {
            return response.json().then(error => {
                throw error;
            });
        }

        return response.json();
    })
    .then(_ => {
        // Redirect user to updated post
        window.location.href = `/search?id=${id_field}`;
    })
    .catch(error => {
        const error_panel = document.querySelector(".error-panel");
        error_panel.style.display = "block";
        error_panel.innerHTML = `<b>ERROR:</b> ${Object.values(error)[0]}`;

        setTimeout(() => {
            error_panel.style.display = "none";
            error_panel.innerHTML = "";
        }, 5000);
    });
}