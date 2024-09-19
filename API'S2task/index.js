var sub=document.getElementById("submit");
sub.addEventListener("click",changeData);

function changeData()
{
    fetch("https://randomuser.me/api/")
    .then(function response(response)
     {
        return response.json();

     })

     .then(function data(user)
     {

      console.log(user)
 
        const info=user.results[0];

        console.log(info);
         

         document.getElementById("name").value=info.name.first +" "+info.name.last;
         
         document.getElementById("email").value=info.email;
         document.getElementById("age").value=info.dob.age;
         
         document.getElementById("contact").value=info.phone;

         
         document.getElementById("city").value=info.location.city;
         document.getElementById("dob").value= new Date(info.dob.date).toDateString();

         document.getElementById("address").value=info.location.state+""+info.location.street.number;

         document.getElementById("pic").src=info.picture.large
         
         
         

     })

     .catch(function(error) {
        console.error('Error:', error);
    });

    

    }