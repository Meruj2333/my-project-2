const  $=s=>document.querySelector(s)
fetch('http://localhost:3001/profile', {
    credentials: 'include'
}).then(res=>res.json()).then(data=>{
    if(data.message){
        return
    }
    console.table(data);
    $('#guestArea').classList.add('d-none');
    $('#appArea').classList.remove('d-none');
    if(data.newValue.role==='admin'){
        $('#adminTabBtn').classList.remove('d-none');
    }



})

$('#regBtn').onclick=(e)=>{
    e.preventDefault()

    let regName=$('#regName')
    let regEmail=$('#regEmail')
    let regPassword=$('#regPassword')
    let regPassword2=$('#regPassword2')
    let regIsAdmin=$('#regIsAdmin')
if(!regName.value ||!regEmail.value||!regPassword.value||!regPassword2.value||regPassword.value.length<6||regPassword.value!==regPassword2.value){
    alert("sxal")
    return false
}



    fetch('http://localhost:3001/register',{
        method: 'POST',
        body: JSON.stringify({name:regName.value,email:regEmail.value,password:regPassword.value,isAdmin:regIsAdmin.checked}),
        headers: {'Content-Type': 'application/json',
            'Accept': 'application/json',

        },
        credentials: 'include',

    }).then(res=>{
        if(res.ok){
            return res.json()
        }
        throw res.error
    }).then(data=>{
        $('#guestArea').classList.add('d-none');
        $('#appArea').classList.remove('d-none');    })
}



$('#btnLogout').onclick=()=>{
    fetch('http://localhost:3001/logout', {
        credentials: 'include'
    }).then(res=>res.json()).then(data=>{
        console.table(data);
        $('#guestArea').classList.remove('d-none');
        $('#appArea').classList.add('d-none');

    })
}

$('#adminTabBtn').onclick=()=>{
    fetch('http://localhost:3001/admin', {
        credentials: 'include'
    }).then(res=>res.json()).then(data=>{
        console.table(data);


    })
}

$('#loginBtn').onclick = (e) => {
    e.preventDefault();

    const email = $('#loginEmail').value;
    const password = $('#loginPassword').value;

    fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(data => {
            if(data.message){
                alert(data.message);
                return;
            }

            alert("Login Successful ✅");

            $('#guestArea').classList.add('d-none');
            $('#appArea').classList.remove('d-none');
        })
        .catch(err => console.log(err));
};
$('#changePas').onclick = (e) => {
    e.preventDefault();
    $('#tabProfile').classList.add('d-none');
    $('#tabChangePass').classList.remove('d-none');
}
$('#profileBtn').onclick = (e) => {
    e.preventDefault();
    $('#tabProfile').classList.remove('d-none');
    $('#tabChangePass').classList.add('d-none');
}
$('#saveNewPas').onclick = (e) => {
    e.preventDefault();
   let curPass=$('#curPass').value
    let newPass=$('#newPass').value
    let newPass2=$('#newPass2').value
    fetch('http://localhost:3001/changePass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ curPass, newPass, newPass2},)
    })
        .then(res => res.json())
        .then(data => {
            if(data.message){
                alert(data.message);
                return;
            }

            alert("change ✅");

        })
        .catch(err => console.log(err));

}

$('#saveChange').onclick = (e) => {
    e.preventDefault();
    let newName=$('#profileName').value
    fetch('http://localhost:3001/changeName', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ newName})
    })
        .then(res => res.json())
        .then(data => {
            if(data.message){
                alert(data.message);
                return;
            }

            alert("change ✅");

        })
        .catch(err => console.log(err));

}