// Toggle sidebar with burger button
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");

  if (burger) {
    burger.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  // Fun facts toggle
  const toggleFacts = document.getElementById("toggle-facts");
  const factsList = document.getElementById("facts-list");

  if (toggleFacts && factsList) {
    toggleFacts.addEventListener("click", () => {
      factsList.style.display = factsList.style.display === "none" ? "block" : "none";
    });
  }

  // Contact form validation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const success = document.getElementById("success-message");

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email.");
        return;
      }

      success.style.display = "block";
      contactForm.reset();
      setTimeout(() => (success.style.display = "none"), 3000);
    });

    // jQuery UI Datepicker
    $(function () {
      $("#datepicker").datepicker();
    });
  }

  // Accordion (if exists)
  if ($("#accordion").length) {
    $("#accordion").accordion();
  }

  // GitHub API fetch
  const fetchUserBtn = document.getElementById("fetch-user");
  if (fetchUserBtn) {
    fetchUserBtn.addEventListener("click", () => {
      const username = document.getElementById("github-username").value.trim();
      const display = document.getElementById("github-data");

      if (!username) {
        alert("Please enter a GitHub username.");
        return;
      }

      fetch(`https://api.github.com/users/${username}`)
        .then((res) => {
          if (!res.ok) throw new Error("User not found");
          return res.json();
        })
        .then((data) => {
          display.innerHTML = `
            <div class="card">
              <img src="${data.avatar_url}" alt="Avatar" width="100"/>
              <h3>${data.name || data.login}</h3>
              <p><strong>Followers:</strong> ${data.followers}</p>
              <p><strong>Public Repos:</strong> ${data.public_repos}</p>
              <a href="${data.html_url}" target="_blank">View Profile</a>
            </div>
          `;
        })
        .catch((error) => {
          display.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
    });
  }
});
