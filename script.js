async function searchUser() {
  const username = document.getElementById('usernameInput').value;
  const results = document.getElementById('results');
  results.innerHTML = 'Loading...';

  try {
    // Get userId from username
    const res1 = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username] })
    });

    const data1 = await res1.json();
    if (!data1.data.length) {
      results.innerHTML = 'User not found!';
      return;
    }

    const userId = data1.data[0].id;

    // Get user info
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
  } catch (err) {
    results.innerHTML = 'An error occurred while fetching data.';
  }
}
