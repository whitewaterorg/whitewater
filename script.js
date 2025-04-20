async function searchUser() {
  const username = document.getElementById('usernameInput').value.trim();
  const results = document.getElementById('results');
  results.innerHTML = 'Loading...';

  if (!username) {
    results.innerHTML = 'Please enter a username.';
    return;
  }

  try {
    // Use old API that still supports GET requests
    const res1 = await fetch(`https://api.roblox.com/users/get-by-username?username=${encodeURIComponent(username)}`);
    const data1 = await res1.json();

    if (!data1.Id) {
      results.innerHTML = 'User not found!';
      return;
    }

    const userId = data1.Id;

    // Now use this ID to get extra user info (this endpoint works with GET and supports CORS)
    const res2 = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    const userInfo = await res2.json();

    const avatarUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=150&height=150&format=png`;

    results.innerHTML = `
      <img src="${avatarUrl}" alt="Avatar" />
      <p><strong>Display Name:</strong> ${userInfo.displayName}</p>
      <p><strong>User ID:</strong> ${userId}</p>
      <p><strong>Username:</strong> ${userInfo.name}</p>
      <p><strong>Created:</strong> ${new Date(userInfo.created).toLocaleString()}</p>
    `;
  } catch (error) {
    console.error(error);
    results.innerHTML = 'Error fetching user data. Try again later.';
  }
}
