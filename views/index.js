const user = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');

const myForm = document.getElementById('myForm');

myForm.addEventListener('submit',onSubmit);

var edit = null;

 async function onSubmit(e){

    e.preventDefault();

    const user1 = user.value;
    const phone1 = phone.value;
    const email1 = email.value;
    
    const obj = {
        user1,
        phone1,
        email1
    }

   if(edit)
   {

    try{

        delete obj._id;
        await axios.put(`https://crudcrud.com/api/d9ec410705b2462da0f0301d2ce1c311/data/${edit}`,obj);
    
        obj._id = 'edit';
    
        showProducts(obj);
    
        edit = null;
    

    }
    catch(err){
        console.log(err);
    }
    
   }
   else{

    try{
         const response = await axios.post("http://localhost:3000/user/add-user",obj);
         showProducts(response.data.newUserDetail);
        console.log(response.data.newUserDetail);
    }
    catch(err){
        console.log(err);
    }

   }

}


const showProducts = (object)=>{

    const parentEl = document.getElementById('username');
    const childEl = document.createElement('li');
    const deleteChild = document.createElement('input');
    const editChild = document.createElement('input');

    deleteChild.type = 'button';
    deleteChild.value = 'delete';

    editChild.type = 'button';
    editChild.value = 'edit';

    editChild.onclick = () =>{
         edit = object._id;

        parentEl.removeChild(childEl);
        document.getElementById('name').value = object.name;
        document.getElementById('phone').value = object.phone;
        document.getElementById('email').value = object.email;
    }

    deleteChild.onclick = async () =>{
        try{
            await axios.delete(`http://localhost:3000/user/delete-user/${object.id}`);
            parentEl.removeChild(childEl);
    
        }
        catch(err){
            console.log(err);
        }
       
    }

    childEl.textContent = object.name + " - " + object.phone + " - " + object.email;
    childEl.appendChild(deleteChild);
    childEl.appendChild(editChild);
    parentEl.appendChild(childEl);


}

window.addEventListener("DOMContentLoaded",async ()=>{
    const res = await axios.get("http://localhost:3000/user/get-user",)
    

    try{
        for(var i=0;i<res.data.allUsers.length;i++){
            showProducts(res.data.allUsers[i]);
        }
        console.log(res.data.allUsers);

    }
    catch(err){
        console.log(err);
    }

    // console.log(res);
})

