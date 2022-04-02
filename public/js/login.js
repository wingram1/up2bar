async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (!username) {
      alert('Please enter a username');
      return;
    } 
    if (password.length < 8 ) {
      alert('Please enter a password at least 8 characters long');
      return;
    }

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post', 
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            console.log('success')
            document.location.replace('/dashboard/')
        } else {
            alert('Error connecting to server');
        }
    }
}

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setTimeout(() => {
        document.location.replace("/dashboard");
        console.log("you are now logged in");
      }, 100);
    }
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);