const getAll = () => {
  return fetch('https://fakestoreapi.com/products')
    .then(res => res.json());
};

const getProduct = () => {
  // Añadir return para asegurar que retorna la promesa
  return fetch('https://fakestoreapi.com/products/1')
    .then(res => res.json());
};

const create = (newProductObjet) => {
  return fetch('https://fakestoreapi.com/products', {
    method: "POST",
    body: JSON.stringify(newProductObjet),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json());
};

const updateProduct = () => {
  return fetch('https://fakestoreapi.com/products/7', {
    method: "PUT",
    body: JSON.stringify({
      title: 'test product',
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json());
};

const deleteProduct = () => {
  return fetch('https://fakestoreapi.com/products/6', {
    method: "DELETE"
  })
    .then(res => res.json());
};

const productsServices = { getAll, getProduct, create, updateProduct, deleteProduct };

export default productsServices;
