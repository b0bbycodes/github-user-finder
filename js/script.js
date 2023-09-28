const form = document.querySelector("form");
const search = document.querySelector("#search");
const main = document.querySelector("#main");
const label = document.querySelector("label");


async function getUser(username) {
  const api_url = `https://api.github.com/users/${username}`;
  fetch(api_url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);

      } else {
        return res.json();

      }
    })
    .then((data) => {
      console.log(data);
      const display = `
      <div class = "card">
      <img class = "avatar" src="${data.avatar_url}" alt="avatar">
      <div class="user-info">
      <h2> ${data.login} </h2>
  
      <ul>
          <li>${data.followers} followers</li>
          <li>${data.following} following</li>
      </ul>        
     ${data.bio !== null ? `<p>Bio: ${data.bio} </p>` : ""}
      ${data.location !== null ? `<p>Location: ${data.location} </p>` : ""}

      <div class="repo">
      <p>repository: ${data.public_repos}</p>
      <a href="${data.html_url}" target="_blank">view Profile on Github</a>
     </div>

      </div>
      </div>
      `;

      main.innerHTML = display;
    })

    .catch((error) => {
      console.log("error:", error);
 

            const errorDisplay = `
            <div class="error-card">
          <p>User does not exist</p>
      </div>
            `
            main.innerHTML = errorDisplay;
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let user = search.value;

  if (user != null) {
    getUser(user);
    search.value = "";
  }
});
