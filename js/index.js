// your code here
function getRepositories(){
  const req = new XMLHttpRequest()
  const username = document.getElementById('username').value
  req.addEventListener('load', displayRepositories)
  req.open('GET', "https://api.github.com/users/"+username+"/repos")
  req.send()
}

function getCommits(user){
  const req = new XMLHttpRequest()
  const username = user.dataset.username
  const repo = user.dataset.repository
  req.addEventListener('load', displayCommits)
  req.open('GET', "https://api.github.com/repos/"+username+"/"+repo+"/commits")
  req.send()
}

function getBranches(user){
  const req = new XMLHttpRequest()
  const username = user.dataset.username
  const repo = user.dataset.repository
  req.addEventListener('load', displayBranches)
  req.open('GET', "https://api.github.com/repos/"+username+"/"+repo+"/branches")
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = '<ul>'+
    repos.map(repo => {
      const dataUsername = 'data-username="'+repo.owner.login+'"'
      const dataRepo = 'data-repository="'+repo.name+'"'
      return `<li><h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${dataRepo} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepo} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
      </li>`}).join('')+'</ul>'
  document.getElementById('repositories').innerHTML = repoList
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${
    commits.map(commit =>
      '<li><h3>'+commit.commit.author.name+'('+commit.author.login+')</h3>'+commit.commit.message+'</li>'
    ).join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${
    branches.map(branch =>
      '<li>'+branch.name+'</li>')
    .join('')}</ul>`
  document.getElementById('details').innerHTML = branchesList
}
