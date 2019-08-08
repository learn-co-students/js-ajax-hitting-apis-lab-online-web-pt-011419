


function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  let github = document.querySelector('input').value
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        '- <a href="https://github.com/'+r.full_name+'"> '+r.full_name+' </a> ' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getBranches(this)">Get Branches</a> '+
        '</li>'

    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  let github = document.querySelector('input').value
  req.addEventListener('load', displayRepositories);
  req.open('GET', "https://api.github.com/users/"+github+"/repos");
  req.send();
}

// function getCommits(el) {
//   const name = el.dataset.repo;
//   let github = document.querySelector('input').value;
//   const req = new XMLHttpRequest();
//   req.addEventListener('load', displayCommits);
//   req.open('GET', 'https://api.github.com/repos/'+github+'/' + name + '/commits');
//   req.send();
// }


function getCommits(anchor) {
  let dataset = anchor.dataset;
  let repository = dataset.repository;
  let username = dataset.username;

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
  req.send()
}


function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(anchor) {
  let dataset = anchor.dataset;
  let repository = dataset.repository;
  let username = dataset.username;

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`)
  req.send()

}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
