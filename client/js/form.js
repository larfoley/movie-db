var formState = JSON.parse(sessionStorage.getItem("form-state"));
var registerForm = document.querySelector(".form.register");
var loginForm = document.querySelector(".form.login");
var usernameInput;
var emailInput;
var passwordInput;
var confirmPasswordInput;

var onFormSubmit = function(formState) {
  sessionStorage.setItem("form-state", JSON.stringify(formState));
}

if (loginForm) {
  usernameInput = loginForm.querySelector(".form-input.username");
  passwordInput = loginForm.querySelector(".form-input.password");

  if (formState) {
    usernameInput.value = formState.username;
    passwordInput.value = formState.password;
  }

  loginForm.onsubmit = function() {
    onFormSubmit({
      username: usernameInput.value,
      password: passwordInput,
    })
  }

} else if(registerForm) {

  usernameInput = registerForm.querySelector(".form-input.username");
  emailInput = registerForm.querySelector(".form-input.email");
  passwordInput = registerForm.querySelector(".form-input.password");
  confirmPasswordInput = registerForm.querySelector(".form-input.confirm-password");

  if (formState) {
    usernameInput.value = formState.username;
    emailInput.value = formState.email;
    passwordInput.value = formState.password;
    confirmPasswordInput.value = formState.confirm_password;
  }

  registerForm.onsubmit = function() {
    onFormSubmit({
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput,
      confirm_password: confirmPasswordInput.value,
    })
  }
}
