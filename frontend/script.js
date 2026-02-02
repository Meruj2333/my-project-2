const  $=s=>document.querySelector(s)
fetch('http://localhost:3001/').then(res=>res.json()).then(data=>{
    console.table(data);
})

$('#save').onclick=()=>{
    let fieldEl=$('#field')
    fetch('http://localhost:3001/add',{
        method: 'POST',
        body: JSON.stringify({value:fieldEl.value}),
        headers: {'Content-Type': 'application/json'},

    }).then(res=>{
        console.log(res)
    })
}