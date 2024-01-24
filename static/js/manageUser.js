const submitUser = (event) => {
    // Prevent form submission
    event.preventDefault();

    // Get form
    const submit_form = document.getElementById("submit_user_form");

    // Get form data
    const username_field = submit_form.querySelector('[name="username"]').value;
    const email_field = submit_form.querySelector('[name="email"]').value;
    const password_field = submit_form.querySelector('[name="password"]').value;

    // Build form object
    const form_data = {
        username: username_field,
        email: email_field,
        password: password_field
    };

    // Make the POST request
    fetch("/api/users/new", {
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
    .then(_ => {
        const success_panel = document.querySelector("#create-success-panel");
        success_panel.style.display = "block";
        success_panel.innerHTML = "<b>OK</b>: user added successfully";

        setTimeout(() => {
            success_panel.style.display = "none";
            success_panel.innerHTML = "";
        }, 5000);
    })
    .catch(error => {
        const error_panel = document.querySelector("#create-error-panel");
        error_panel.style.display = "block";
        error_panel.innerHTML = `<b>ERROR:</b> ${Object.values(error)[0]}`;

        setTimeout(() => {
            error_panel.style.display = "none";
            error_panel.innerHTML = "";
        }, 5000);
    });
}

const deleteUser = (event) => {
     // Prevent form submission
     event.preventDefault();

     // Get form
     const delete_form = document.getElementById("delete_user_form");

     // Get form data
     const email_field = delete_form.querySelector('[name="email"]').value;
     const password_field = delete_form.querySelector('[name="password"]').value;

     // Build form object
    const form_data = {
        email: email_field,
        password: password_field
    };

    // Make the DELETE request
    fetch("/api/users/delete", {
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
        const success_panel = document.querySelector("#delete-success-panel");
        success_panel.style.display = "block";
        success_panel.innerHTML = "<b>OK</b>: user deleted successfully";

        setTimeout(() => {
            success_panel.style.display = "none";
            success_panel.innerHTML = "";
        }, 5000);
    })
    .catch(error => {
        const error_panel = document.querySelector("#delete-error-panel");
        error_panel.style.display = "block";
        error_panel.innerHTML = `<b>ERROR:</b> ${Object.values(error)[0]}`;

        setTimeout(() => {
            error_panel.style.display = "none";
            error_panel.innerHTML = "";
        }, 5000);
    });
}