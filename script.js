// =========================
// PROJECT SYNAPSE
// =========================

// PASTE YOUR VALUES HERE
const SUPABASE_URL = "https://viitvlzhdzyypyeexynf.supabase.co";
const SUPABASE_KEY = "sb_publishable_rlVHBRgHGYwBmwN586klXw_atX8rrrV";

// Create client
const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// Elements
const displayNameInput = document.getElementById("displayName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

const statusText = document.getElementById("status");

console.log("PROJECT SYNAPSE ONLINE");

// =========================
// REGISTER
// =========================

registerBtn.addEventListener("click", async () => {

    const displayName = displayNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!displayName || !email || !password) {
        statusText.textContent =
            "Fill all fields.";
        return;
    }

    statusText.textContent =
        "Creating Agent...";

    const { data, error } =
        await client.auth.signUp({
            email,
            password
        });

    if (error) {
        statusText.textContent =
            error.message;
        return;
    }

    statusText.textContent =
        "Agent Created.";
});

// =========================
// LOGIN
// =========================

loginBtn.addEventListener("click", async () => {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    statusText.textContent =
        "Authenticating...";

    const { data, error } =
        await client.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        statusText.textContent =
            error.message;
        return;
    }

    const user = data.user;

const { data: agent, error: agentError } =
console.log(agent);
console.log(agentError);
console.log(user.id);
    await client
        .from("agents")
        .select("*")
        .eq("id", user.id)
        .single();

statusText.innerHTML = `
    CONNECTED TO FOUND://
    <br><br>

    AGENT: ${agent.display_name}
    <br>

    ROLE: ${agent.role}
    <br>

    LEVEL: ${agent.level}
    <br>

    XP: ${agent.xp}
`;
});