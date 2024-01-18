const submitForm = (event) => {
    // Prevent form submission
    event.preventDefault();

    // Form
    let form_data = {};

    // Get form data
    const title_field = document.querySelector('[name="title"]').value;
    const content_field = document.querySelector('[name="content"]').value;
    const exp_field = document.querySelector('[name="expirationDate"]').value;
    const email_field = document.querySelector('[name="email"]').value;
    const password_field = document.querySelector('[name="password"]').value;

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
    fetch("https://bit.marcocetica.com/api/posts/new", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form_data),
    })
    .then(response => {
        if(!response.ok) {
            return response.json().then(error => {
                throw error;
            })
        }

        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(data => {
        const error_panel = document.getElementById("error-panel");
        error_panel.style.display = "block";
        error_panel.innerHTML = `<b>ERROR:</b> ${Object.values(data)[0]}`;

        setTimeout(() => {
            error_panel.style.display = "none";
            error_panel.innerHTML = "";
        }, 5000);
    });
}