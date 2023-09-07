var option = false,optionLR = false,optionL = false,optionP = false

function semlusr() {
    if(option == false) {
    document.getElementById('u2').style.display = 'none'
    document.getElementById('e2').style.display = 'flex'
    document.getElementById('semlusr').innerHTML = 'Switch to username'
    }
    else {
        document.getElementById('u2').style.display = 'flex'
        document.getElementById('e2').style.display = 'none'
        document.getElementById('semlusr').innerHTML = 'Switch to email address'
    }
    option = !option
}
function register() {
    axios.post('https://tarmeezacademy.com/api/v1/register',{
        "username": `${document.getElementById('username2').value}`,
        "password": `${document.getElementById('inputPassword52').value}`,
        // "image": `${document.getElementById('inputGroupFile02').value}`,
        "name": `${document.getElementById('name2').value}`,
        "email": `${document.getElementById('exampleFormControlInput2').value}`
    },{
        'Accept' : 'application/json'
    }).then((response) => {
        token = response.data.token;
        localStorage.setItem('token', token);
        successMessage("New User Registered Successfully")
        profileActive()
        switchButton(false)
        document.getElementsByClassName('modal-backdrop')[0].remove
        document.getElementById('add').style.visibility = 'visible'
        optionL = true
        localStorage.setItem('optionL', optionL);
        localStorage.setItem('username', document.getElementById('username2').value)
        password = document.getElementById('inputPassword52').value
        localStorage.setItem('password', password)
        $('.modal-backdrop').hide();
    }).catch((response)=>{
        errorMessage(response)
    })
}
function login() {
    
    axios.post('https://tarmeezacademy.com/api/v1/login', {
        "username": `${document.getElementById('username').value}`,
        "password": `${document.getElementById('inputPassword5').value}`,
    },{
        headers: {
            'Accept' : 'application/json'
        }
    }).then((response)=>{
        localStorage.setItem('src' , response.data.user.profile_image);
        localStorage.setItem('name' , response.data.user.name);
        localStorage.setItem('posts_count' , response.data.user.posts_count);
        localStorage.setItem('comments_count' , response.data.user.comments_count);
        localStorage.setItem('id' , response.data.user.id);
        $('.modal-backdrop').hide();
        token = response.data.token;
        localStorage.setItem('token', token);
        successMessage("Login successful")
        optionL = true
        localStorage.setItem('optionL', optionL);
        localStorage.setItem('username', document.getElementById('username').value)
        password = document.getElementById('inputPassword5').value
        localStorage.setItem('password', password)
        $('#exampleModal').modal('hide')
        profileActive()
        switchButton(false)
        document.getElementById('add').style.visibility = 'visible'
    }).catch((response)=>{
        errorMessage(response)
    })
    
}

if(JSON.parse(localStorage.getItem('optionL'))==true) {
    profileActive()
    switchButton(false)
    document.getElementById('add').style.visibility = 'visible'
}
else {
    profileDisabled()
    switchButton(true)
    document.getElementById('add').setAttribute('style','visibility:hidden')
}

function closeNError() {
    document.getElementById('error-login').style.visibility = 'hidden';
}

function closeNSuccess() {
    document.getElementById('success-login').style.visibility = 'hidden';
}

function profileActive() {
    document.getElementById('profile').innerHTML = '<a class="nav-link active" aria-current="page"><button onclick="profile()">Profile</button></a>'
}

function profileDisabled() {
    document.getElementById('profile').innerHTML = '<a class="nav-link disabled" aria-disabled="true">Profile</a>'
}

function errorMessage(response) {
    document.getElementById('error').style.visibility = 'visible';
    document.getElementById('error-message').innerHTML = response.response.data.message
    setTimeout(function() {
        document.getElementById('error').style.visibility = 'hidden';
    },2000)
}

function successMessage(txt) {
    document.getElementById('success').style.visibility = 'visible';
    document.getElementById('success-message').innerHTML = `${txt}`;
    setTimeout(function() {
        document.getElementById('success').style.visibility = 'hidden';
    },2000)
}

function switchButton(bool) {
    if(bool == false) {
        document.getElementById('buttons').style.display = 'none';
        document.getElementById('buttons2').style.display = 'flex';
        document.getElementById('username-buttons2').innerHTML = localStorage.getItem('username')
        document.getElementById('img-buttons2').setAttribute('src',localStorage.getItem('image'))
    }
    else {
        document.getElementById('buttons').style.display = 'block';
        document.getElementById('buttons2').style.display = 'none';
    }
    optionLR=!optionLR;
}

function logout() {
    axios.post('https://tarmeezacademy.com/api/v1/logout',{
        "username": `${localStorage.getItem('username')}`,
        "password": `${localStorage.getItem('password')}`
    },{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept' : 'application/json'
        }
    }).then(() => {
        optionL=false
        localStorage.setItem('optionL',optionL)
        profileDisabled()
        switchButton(true)
        document.getElementById('add').setAttribute('style','visibility:hidden')
        localStorage.clear()
    }).catch(() => alert('error'))
}

document.getElementById('login22').addEventListener('click',function () {
    $('.modal-backdrop').show();
    $('#exampleModal').modal('show')
})
function profile() {
    optionP = true
    localStorage.setItem('optionP',true)
    document.getElementById("posts").style.display="none";
    document.getElementById("img-buttons2").setAttribute('src',localStorage.getItem('src'))
    document.getElementById("card-profile-img").setAttribute('src',localStorage.getItem('src'))
    document.getElementById("card-profile-name").innerHTML = localStorage.getItem('name')
    document.getElementById("card-profile-username").innerHTML = localStorage.getItem('username')
    document.getElementById("card-profile-posts").innerHTML = localStorage.getItem('posts_count')
    document.getElementById("card-profile-comments").innerHTML = localStorage.getItem('comments_count')
    document.getElementById("card-profile").style.display = "block"
    document.getElementById("posts-profile").style.display = "block"
    document.getElementById("title-post").innerHTML = localStorage.getItem('name')+"'s Posts"
    getPosts(`https://tarmeezacademy.com/api/v1/users/${localStorage.getItem('id')}/posts`,"post-profile2")
}
function home() {
    optionP = false
    localStorage.setItem('optionP',false)
    document.getElementById("posts").style.display="block";
    if(JSON.parse(localStorage.getItem('optionL')==true))
        profileActive()
}

if(JSON.parse(localStorage.getItem('optionP'))==true) {
    profile()
}
else {
    home()
}
function getPosts(url,data) {
    axios.get(url)
    .then((response) => { 
        for(post of response.data.data){
        document.getElementById(data).innerHTML += 
        `
        <div class="card text-bg-light mb-3 shadow">
        <div class="card-header"style="font-size: 18px;font-weight: 900;"><img src="${post.author.profile_image}" style="margin: 10px 8px 10px 0px;width: 45px;height: 45px;border-radius: 50%;">${post.author.name}<div style="float: right;position: relative;top: 15px;${post.author.id != localStorage.getItem('id') ? 'display: none':''}">

        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" id="Edit${post.id}" onclick="edit2(${post.id})">
            Edit
        </button>


        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" id="Delete${post.id}" onclick="delete2(${post.id})">Delete</button>
    </div></div>
        <div class="card-body">
            <img src="${post.image}" style="width: 938px;" alt>
            <h6 class="card-text text-body-tertiary mt-2">${post.created_at}</h6>
            <h5 class="card-text">${post.title}</h5>
            <p><small class="card-text text-body-secondary">${post.body}</small></p>
            <hr>
            <a id="a-comment${post.id}" href="#comments" style="text-decoration: none;color: black;" onclick="showComments(${post.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"></path>
                </svg>
                <p class="d-inline" style="font-size: 14px;">
                    (<span id="comment-count${post.id}">${post.comments_count}</span>) Comments
                </p>
            </a>
            
          </div>
          <div class="shadow-lg" id="comments${post.id}" style="display: none;">
            
          </div>
          <div id="tags${post.id}">
          
          </div>
        </div>
        `
        }
    })
}
var showComments2 = false
function showComments(id) {
    if(showComments2==true) {
        document.getElementById(`comments${id}`).style.display = 'none'
        document.getElementById(`comments${id}`).innerHTML = ''
        showComments2 = false
        return
    }
    document.getElementById(`comments${id}`).setAttribute('style', 'display: block;');
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
    .then((response) => {
        for(comment of response.data.data.comments){
            document.getElementById(`comments${id}`).innerHTML += 
            `
            <div style="display: block;background: white;border-radius: 5px;padding: 15px;margin-bottom: 15px;">
                <div>
                <img src="${comment.author.profile_image}" style="width: 30px;height: 30px;border-radius: 50%;">
                <h6 style="font-weight:900;display:inline;">${comment.author.name}</h6>
                </div>
                <div>
                ${comment.body}
                </div>
            </div>
            `
        }

    })
    showComments2 = !showComments2

    document.getElementById(`comments${id}`).innerHTML += 
    `
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="comment" aria-label="Recipient's username" aria-describedby="button-addon2" id="post-comment${id}">
        <button class="btn btn-outline-secondary" type="button" id="button-post-comment${id}" onclick="sendComment(${id})">Post</button>
    </div>
    `
}
getPosts(`https://tarmeezacademy.com/api/v1/posts?limit=20&page=1`,'contain-posts') 
var i=2
$(window).scroll(function() {
if($(window).scrollTop() + $(window).height() > $(document).height()-10) {
    getPosts(`https://tarmeezacademy.com/api/v1/posts?limit=20&page=${i}`,'contain-posts')
    if(i<169)
        i++
}
});
var comment_count
function sendComment(id) {
    comment_count = document.getElementById(`comment-count${id}`).innerHTML
    console.log(comment_count)
    var number = parseInt(comment_count)
    console.log(number)
    number++
    txt = "post-comment"+id
    value = document.getElementById(txt).value;
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,{
        "body": value,
    },{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept' : 'application/json'
        }
    })
    showComments(id);
    document.getElementById(`comment-count${id}`).innerHTML = number
    setTimeout(function() {
        document.getElementById(`a-comment${id}`).click()
    },1000)
}


function showTags(id) {
    axios.get(`https://tarmeezacademy.com/api/v1/tags/1/posts`,{
        headers: {
            "accept": 'application/json',
        }
    }).then((response) => {

        for(data of response.data.data) {
            if(id == data.id){
                for(tag of data.tags){
                    document.getElementById(`tags${id}`).innerHTML += 
                    `
                    <h6 style="display: inline;background-color: #dfdada;border-radius: 50px;padding: 5px 25px;}">${tag.name}</h6>
                    `
                }
            }
        }
    })
}

function addPost() {
    token = localStorage.getItem('token')
    title = document.getElementById('exampleFormControlInput189').value
    body = document.getElementById('exampleFormControlTextarea1').value
    var inp = document.getElementById('input-img');
    function upload() {
        const fr = new FileReader();
        fr.onload = () => {
            localStorage.setItem('img' ,fr.result);
        }
        fr.readAsDataURL(inp.files[0])
    }
    axios.post('https://tarmeezacademy.com/api/v1/posts',{
        "title": title,
        "body": body,
        "image": localStorage.getItem('img'),
    },{
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    }).then(function(response) {
        
    console.log(response)
        // location.reload()
    })
    
}

function close2() {
    window.onscroll = function() {
        window.scrollTo(0,$(window).scrollTop());
    }
}
var buttonid
function edit2(id) {
    buttonid = id
}

function Edit() {
    axios.put(`https://tarmeezacademy.com/api/v1/posts/${buttonid}`,{
        "title": document.getElementById('exampleFormControlInput190').value,
        "body": document.getElementById('exampleFormControlTextarea32').value
    },{
        headers: {
            "Accept": "application/json",
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then((resposne)=>{console.log(resposne)
        location.reload()})
}

var buttonidd
function delete2(id) {
    buttonidd = id
}

function Delete2() {
    console.log(buttonidd)
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${buttonidd}`,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then((resposne)=>{console.log(resposne);location.reload()})
}

// function Update() {
//     axios.put('https://tarmeezacademy.com/api/v1/updatePorfile',{
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + localStorage.getItem('token')
//         }
//     },{
//         username: "",
         
//     })
// }