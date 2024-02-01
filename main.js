// Wrap the entire code in an IIFE to encapsulate scope
(() => {
  const form = document.getElementById("form");
  const articleElement = document.getElementById("userData");
  
  const loadingIndicatorHTML = `<p aria-busy='true'>Loading...</p>`;

  // Show loading indicator function
  const showLoadingIndicator = () => {
    articleElement.innerHTML = loadingIndicatorHTML;
    articleElement.style.display = "block";
  };

  // Fetch user data from GitHub API
  const getUserData = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error(`User not found or API response error`);
      }

      return response.json();
    } catch (error) {
      throw new Error(`Failed to fetch user data: ${error.message}`);
    }
  };

  // Render user card function
  const renderUserCard = (userData) => {
    const {
      avatar_url,
      name,
      login,
      followers,
      following,
      location,
      bio,
      company,
      public_repos,
    } = userData;

    const userCard = `
      <img src=${avatar_url} alt="user profile photo">
      <hgroup>
        <h2>${name}</h2>
        <h5>${login}</h5>
        <p>${followers} Followers - ${following} Following</p>
        <p style="padding: 1rem 0">${name} lives in ${
      location || "Unknown"
    }, is a ${bio || "No bio available"} at ${
      company || "No company info"
    } and has ${public_repos} public repositories</p>
      </hgroup>
    `;

    // Set innerHTML and display
    articleElement.innerHTML = userCard;
    articleElement.style.display = "block";
  };

  // Handle errors function
  const handleError = (error) => {
    const errorMessage = `<h4>Error: ${error.message}</h4>`;

    // Set innerHTML and display
    articleElement.innerHTML = errorMessage;
    articleElement.style.display = "block";
  };

  // Event listener for form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Hide element and show loading indicator
    articleElement.style.display = "none";
    showLoadingIndicator();

    const username = form.username.value;

    try {
      // Fetch user data and render the user card
      const userData = await getUserData(username);
      renderUserCard(userData);
    } catch (error) {
      // Handle errors
      handleError(error);
    }
  });
})();
