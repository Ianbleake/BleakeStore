
const getAll = () => {
  fetch('https://fakestoreapi.com/users')
            .then(res=>res.json())
}

const addUser = () => {
  fetch('https://fakestoreapi.com/users',{
    method:"POST",
    body:JSON.stringify(
        {
            email:'John@gmail.com',
            username:'johnd',
            password:'m38rmF$',
            name:{
                firstname:'John',
                lastname:'Doe'
            },
            address:{
                city:'kilcoole',
                street:'7835 new road',
                number:3,
                zipcode:'12926-3874',
                geolocation:{
                    lat:'-37.3159',
                    long:'81.1496'
                }
            },
            phone:'1-570-236-7033'
        }
    )
})
    .then(res=>res.json())
    .then(json=>console.log(json))
}

const updateUser = () => {
  fetch('https://fakestoreapi.com/users',{
    method:"POST",
    body:JSON.stringify(
        {
            email:'John@gmail.com',
            username:'johnd',
            password:'m38rmF$',
            name:{
                firstname:'John',
                lastname:'Doe'
            },
            address:{
                city:'kilcoole',
                street:'7835 new road',
                number:3,
                zipcode:'12926-3874',
                geolocation:{
                    lat:'-37.3159',
                    long:'81.1496'
                }
            },
            phone:'1-570-236-7033'
        }
    )
})
    .then(res=>res.json())
    .then(json=>console.log(json))
}

const deleteUser = ()=>{
  fetch('https://fakestoreapi.com/users/6',{
    method:"DELETE"
})
    .then(res=>res.json())
    .then(json=>console.log(json))
}


const userServices = { getAll ,addUser , updateUser, deleteUser }

export default userServices