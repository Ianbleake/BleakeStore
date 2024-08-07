const getAll = () => {
  return fetch('https://fakestoreapi.com/products')
    .then(res => res.json());
};

const getProduct = () => {
  fetch('https://fakestoreapi.com/products/1')
            .then(res=>res.json())
}

const create = () => {
  fetch('https://fakestoreapi.com/products',{
    method:"POST",
    body:JSON.stringify(
        {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }
    )
  })
      .then(res=>res.json())
      .then(json=>console.log(json))
}

const updateProduct = () => {
  fetch('https://fakestoreapi.com/products/7',{
    method:"PUT",
    body:JSON.stringify(
        {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }
    )
  })
      .then(res=>res.json())
      .then(json=>console.log(json))
}

const deleteProduct = ()=>{
  fetch('https://fakestoreapi.com/products/6',{
    method:"DELETE"
  })
      .then(res=>res.json())
      .then(json=>console.log(json))
}


const productsServices = { getAll , getProduct, create, updateProduct, deleteProduct };

export default productsServices;
