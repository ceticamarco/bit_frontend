const submitForm = (event) => {
    // Prevent form submission
    event.preventDefault();

    // Form Data
    let form_data = {};

    // Get form
    const submit_form = document.getElementById("submit_post_form");

    // Get form data
    const title_field = submit_form.querySelector('[name="title"]').value;
    const content_field = submit_form.querySelector('[name="content"]').value;
    const exp_field = submit_form.querySelector('[name="expirationDate"]').value;
    const email_field = submit_form.querySelector('[name="email"]').value;
    const password_field = submit_form.querySelector('[name="password"]').value;

    // Anonymous post
    if(email_field.length === 0 || password_field.length === 0) {
        form_data = {
            title: title_field,
            content: content_field,
            expirationDate: exp_field.length !== 0 ? exp_field : null,
            user: null
        }
    } else {
        form_data = {
            title: title_field,
            content: content_field,
            expirationDate: exp_field.length !== 0 ? exp_field : null,
            user: {
                email: email_field,
                password: password_field
            }
        }
    }

    // Make the POST request
    fetch("/api/posts/new", {
        method: "POST",
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
    .then(data => {
        // Redirect user to new post
        window.location.href = `/search?id=${data.post_id}`;
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