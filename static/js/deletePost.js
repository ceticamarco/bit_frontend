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

const deletePost = (event) => {
    // Prevent form submission
    event.preventDefault();

    // Get form data
    const id_field = document.querySelector('[name="id"]').value;
    const email_field = document.querySelector('[name="email"]').value;
    const password_field = document.querySelector('[name="password"]').value;

    // Build form object
    const form_data = {
        email: email_field,
        password: password_field
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

    // Make the DELETE request
    fetch(`https://bit.marcocetica.com/api/posts/${id_field}`, {
        method: "DELETE",
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
        const success_panel = document.querySelector(".success-panel");
        success_panel.style.display = "block";
        success_panel.innerHTML = "<b>OK</b>: post deleted successfully";

        setTimeout(() => {
            success_panel.style.display = "none";
            success_panel.innerHTML = "";
        }, 5000);
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