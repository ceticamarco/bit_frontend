const submitUser = (event) => {
    // Prevent form submission
    event.preventDefault();

    // Get form data
    const username_field = document.querySelector('[name="username"]').value;
    const email_field = document.querySelector('[name="email"]').value;
    const password_field = document.querySelector('[name="password"]').value;

    // Build form object
    const form_data = {
        username: username_field,
        email: email_field,
        password: password_field
    };

    // Make the POST request
    fetch("https://bit.marcocetica.com/api/users/new", {
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
        const success_panel = document.querySelector(".success-panel");
        success_panel.style.display = "block";
        success_panel.innerHTML = "<b>OK</b>: user added successfully";
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