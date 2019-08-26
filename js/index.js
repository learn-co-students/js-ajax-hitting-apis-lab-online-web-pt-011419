const name = document.getElementById('username').value

function getRepositories() {
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
    // debugger
    const repoList = 
    '<ul>' + repos
      .map(
        // repos.map do |repo|
        // line 26 and 27
        repo => {
            const dataUsername = "data-username='" + repo.owner.login + '"'
            const dataRepoName = 'data-repository="' + repo.name + '"' 
            return `
            <li>
              <h2>${repo.name}</h2>
              <a href="${repo.html_url}">${repo.html_url}</a><br>
              <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
              <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
            </li>`
        }
      )
      .join('') + 
      '</ul>';
      // debugger
    document.getElementById('repositories').innerHTML = repoList;
  }
   

  function getCommits(el) {
    const thisRepo = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits());
    req.open('GET', `https://api.github.com/repos/${name}/${thisRepo}/commits`);
    req.send();
  }

  function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = 
    '<ul>' + commits
      .map(
        commit => 
          '<li><h3>' +
          commit.commit.author.name +
          ' (' +
          commit.author.login +
          ')</h3>' +
          commit.commit.message +
          '</li>'
      )
      .join('') + 
      '</ul>';
      // debugger
    document.getElementById('details').innerHTML = commitsList;
  }

  function getBranches(el) {
    
  }