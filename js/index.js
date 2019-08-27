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
    // debugger
    const repoList = 
    '<ul>' + repos
      .map(
        // repos.map do |repo|
        // line 26 and 27
        repo => {
          
            return `
            <li>
              <h2>${repo.name}</h2>
              <a href="${repo.html_url}">${repo.html_url}</a><br>
              <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getCommits(this)">Get Commits</a><br>
              <a href="#" data-repository="${repo.name}" data-username="${repo.owner.login}" onclick="getBranches(this)">Get Branches</a></li>
            </li>`
        }
      )
      .join('') + 
      '</ul>';
      // debugger
    document.getElementById('repositories').innerHTML = repoList;
  }
   
// getCommits isnt correct
  function getCommits(el) {
    const thisRepo = el.dataset.repository;
    const name = el.dataset.username;
    const req = new XMLHttpRequest();
    // debugger
    req.addEventListener('load', displayCommits)
    req.open('GET', `https://api.github.com/repos/${name}/${thisRepo}/commits`);
    req.send();
  }

  function displayCommits() {
    // const name = document.getElementById('username').value
    const response = this.responseText
    debugger
    const commits = JSON.parse(response);
    const commitsList = 
    '<ul>' + commits
      .map(
        object => 
          '<li><h3>' +
          object.commit.author.name +
          ' (' +
          object.author.login +
          ')</h3>' +
          object.commit.message +
          '</li>'
      )
      .join('') + 
      '</ul>';
      // debugger
    document.getElementById('details').innerHTML = commitsList;
  }

  function getBranches(el) {
    const name = document.getElementById('username').value
    const thisRepo = el.dataset.repository;
    const pathURL = `https://api.github.com/repos/${name}/${thisRepo}/branches`
    const req = new XMLHttpRequest(); 
    req.addEventListener('load', displayBranches);
  // when request is completed, it will showRepositories
    req.open('GET', pathURL);
  // open stages the request
    req.send();
  // send does the request
  }

  function displayBranches() {
    const branch = JSON.parse(this.responseText);
    const repoList = 
    '<ul>' + branch
      .map(
        // repos.map do |repo|
        // line 26 and 27
        repo => {
          return `
          <li>
            <h2>${repo.name}</h2>
          </li>`
      }
      )
      .join('') + 
      '</ul>';
      // debugger
      document.getElementById('details').innerHTML = repoList;
  }