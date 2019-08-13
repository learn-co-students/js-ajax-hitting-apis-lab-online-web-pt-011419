// your code here
function getRepositories() {
    const req = new XMLHttpRequest()
    req.addEventListener('load', displayRepositories)
    req.open('GET', 'https://api.github.com/users/octocat/repos')
    req.send();
  }
  
function displayRepositories() {
    const repos = JSON.parse(this.responseText);
    const repoList =
      '<ul>' + repos.map(r => {
          const dataUsername = 'data-username="' + r.owner.login + '"'
          const dataRepoName = 'data-repository="' + r.name + '"'
          return `
            <li>
            ${r.name}
            <a href="${r.html_url}">${r.html_url}</a><br>

            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>

            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a><br></li>`
        }).join('') +'</ul>'
    document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(element) {
    const name = element.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
    req.send();
  }
  
function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>'<li><h3>' + commit.commit.author.name + ' (' +commit.author.login + ')</h3>' +commit.commit.message +'</li>')
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches
      .map(
        branch =>
          '<li>' +
          branch.name +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;
}


function getBranches(element) {
    const name = element.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/branches');
    req.send();
}