async function getUser() {

    const username = document.getElementById("username").value.trim();
    const loading = document.getElementById("loading");
    const result = document.getElementById("result");
    const button = document.getElementById("searchBtn");

    if (username === "") {

        result.innerHTML = `
            <div class="error">
                <h3>Please enter a GitHub username.</h3>
            </div>
        `;

        return;
    }

    loading.innerHTML = "⏳ Loading...";
    result.innerHTML = "";

    button.disabled = true;

    try {

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        loading.innerHTML = "";

        result.innerHTML = `
            <div class="profile-card">

                <img
                    src="${data.avatar_url}"
                    alt="${data.login}"
                >

                <h2>${data.name || data.login}</h2>

                <p>${data.bio || "No bio available"}</p>

                <p><strong>Followers:</strong> ${data.followers}</p>

                <p><strong>Following:</strong> ${data.following}</p>

                <p><strong>Repositories:</strong> ${data.public_repos}</p>

                <p><strong>Location:</strong>
                ${data.location || "Not Available"}</p>

                <p><strong>Company:</strong>
                ${data.company || "Not Available"}</p>

                <p><strong>Account Created:</strong>
                ${new Date(data.created_at).toLocaleDateString()}</p>

                <a
                    href="${data.html_url}"
                    target="_blank"
                >
                    Visit GitHub Profile
                </a>

            </div>
        `;

    } catch (error) {

        loading.innerHTML = "";

        result.innerHTML = `
            <div class="error">
                <h3>❌ User Not Found</h3>
                <p>Please enter a valid GitHub username.</p>
            </div>
        `;

    } finally {

        button.disabled = false;

    }
}

document.getElementById("username")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        getUser();
    }

});