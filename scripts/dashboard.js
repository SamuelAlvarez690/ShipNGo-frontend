document.addEventListener("DOMContentLoaded", async () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || !role) {
        window.location.href = "../login.html"; // Redirect to login if not authenticated
        return;
    }

    // Set welcome message based on user role
    const welcomeDiv = document.getElementById("welcome-message");
    if (welcomeDiv) {
        const name = sessionStorage.getItem("name") || "User";
        welcomeDiv.innerText = `Welcome, ${name} (${role === "customer" ? "Customer" : "Employee"})!`;
    }

    // Only load packages for employees
    if (role === "employee") {
        try {
            await loadPackages();
        } catch (error) {
            console.error("Error loading packages on page load:", error);
        }
    }
});

function logout() {
    sessionStorage.clear();
    window.location.href = "../login.html";
}