
const getAll = () => {
  return fetch('https://fakestoreapi.com/users')
    .then(res=>res.json());
};

const Create = (userObjet)=> {
  return fetch('https://fakestoreapi.com/users',{
    method:"POST",
    body:JSON.stringify(userObjet)
  })
    .then(res=>res.json())
}


const userServices = { getAll, Create }

export default userServices;