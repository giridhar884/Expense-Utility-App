document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const data={username,password,role};
    console.log(data);
    //Build an XHR Request
    const xhr=new XMLHttpRequest();
    xhr.open("POST","login.php",true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload=function(e){
        if(xhr.status===200){
            console.log(this.responseText);
            window.location="employee-dashboard.html";
        }else{
            console.log("Authentication FAiled!!")
            console.log(this.responseText);
            document.getElementById("errorMessage").innerHTML=this.responseText;
        }
    };
    xhr.send(data);
    }   
);
