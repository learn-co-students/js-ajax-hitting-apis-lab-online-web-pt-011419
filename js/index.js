function getRepositories() {
    const name = document.getElementById('username').value
    const pathURL = `https://api.github.com/users/${name}/repos`

    const req = new XMLHttpRequest(); 
  //HMLHttpRequest is init an object - makes web requests
  req.addEventListener('load', displayRepositories);
  // when request is completed, it will showRepositories
  req.open('GET', pathURL);
  // open stages the request
  req.send();
  // send does the request
}

function displayRepositories() {
    const repos = JSON.parse(this.responseText);
    // parses string and makes it a js object. 
    // this.responseText is the body of the text
    
    const repoList = 
    '<ul>' + repos
      .map(
        repo =>
            const dataUsername = "data-username='" + repo.owner.login + '"'
            const dataRepoName = 'data-repository'="'' + repo.name + '' "
          '<li>' +
          `${repo.name}` +
          ' - <a href="#" data-repo="' +
          `${repo.name}` +
          '" onclick="getCommits(this)">Get Commits</a></li>'
      )
      .join('')</ul>;
    document.getElementById('repositories').innerHTML = repoList;
  }
   

  function getCommits(el) {
    const user = document.getElementById('username').value
    const name = el.dataset.repo;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', `https://api.github.com/users/${user}/${name}/commits`);
    req.send();
  }

  function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
          '<li><strong>' +
          commit.author.fullName +
          '</strong> - ' +
          commit.commit.message +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }
