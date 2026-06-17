const supabaseUrl = "https://viitvlzhdzyypyeexynf.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_rlVHBRgHGYwBmwN586klXw_atX8rrrV";

const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const displayNameInput = document.getElementById("displayName");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

const statusText = document.getElementById("status");

registerBtn.addEventListener("click", register);
loginBtn.addEventListener("click", login);

async function register() {

    const email = emailInput.value;
    const password = passwordInput.value;
    const displayName = displayNameInput.value;

    statusText.textContent = "Creating Agent...";

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        statusText.textContent = error.message;
        return;
    }

    statusText.textContent = "Agent Created.";
}

async function login() {

    const email = emailInput.value;
    const password = passwordInput.value;

    statusText.textContent = "Authenticating...";

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        statusText.textContent = error.message;
        return;
    }

    statusText.textContent =
        "CONNECTED TO FOUND://";
}