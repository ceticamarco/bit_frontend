const loadPostId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get("id");
    const delete_form = document.getElementById("delete_form");

    // If post ID is specified, set input box, otherwise show an error
    if(post_id) {
        delete_form.querySelector('input[name="id"]').value = post_id;
    } else {
        const error_panel = delete_form.querySelector(".error-panel");
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

    // Get form
    const delete_form = document.getElementById("delete_form");

    // Get form data
    const id_field = delete_form.querySelector('[name="id"]').value;
    const email_field = delete_form.querySelector('[name="email"]').value;
    const password_field = delete_form.querySelector('[name="password"]').value;

    // Build form object
    const form_data = {
        email: email_field,
        password: password_field
    };

    // Check whether post ID is defined
    if(!id_field) {
        const error_panel = delete_form.querySelector(".error-panel");
        error_panel.style.display = "block";
        error_panel.innerHTML = "<b>ERROR:</b> post ID not defined";

        setTimeout(() => {
            error_panel.style.display = "none";
            error_panel.innerHTML = "";
        }, 5000);
        
        return;
    }

    // Make the DELETE request
    fetch(`/api/posts/${id_field}`, {
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
        const success_panel = delete_form.querySelector(".success-panel");
        success_panel.style.display = "block";
        success_panel.innerHTML = "<b>OK</b>: post deleted successfully";

        setTimeout(() => {
            success_panel.style.display = "none";
            success_panel.innerHTML = "";
        }, 5000);
    })
    .catch(error => {
        const error_panel = delete_form.querySelector(".error-panel");
        error_panel.style.display = "block";
        error_panel.innerHTML = `<b>ERROR:</b> ${Object.values(error)[0]}`;

        setTimeout(() => {
            error_panel.style.display = "none";
            error_panel.innerHTML = "";
        }, 5000);
    });
}