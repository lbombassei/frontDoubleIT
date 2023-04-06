
function loadProducts() {
  fetch('http://localhost:3000/api/products', {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  })
    .then(response => {
      if (response.status === 403) {
        throw new Error('Não autorizado');
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      const produtosDiv = document.getElementById('product-list');
      produtosDiv.innerHTML = '';
      const rowDiv = document.createElement('div');
      rowDiv.className = 'row';

      data.produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'col-sm-6 col-md-4 col-lg-3 mb-4';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card h-100';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        if (produto.foto.startsWith("img/")) {
          img.src = produto.foto;
        } else {
          img.src = "data:image/png;base64," + produto.foto;
        }
        img.alt = produto.nome;
        cardDiv.appendChild(img);

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body d-flex flex-column justify-content-between';

        const iconesDiv = document.createElement('div');
        iconesDiv.className = 'icones align-self-end';

        const editarLink = document.createElement('a');
        editarLink.href = '#';
        editarLink.className = "edit mr-2";
        editarLink.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        iconesDiv.appendChild(editarLink);

        const excluirLink = document.createElement('a');
        excluirLink.href = '#';
        excluirLink.className = "delete";
        excluirLink.innerHTML = '<i class="fa-solid fa-trash"></i>';
        iconesDiv.appendChild(excluirLink);

        cardBodyDiv.appendChild(iconesDiv);

        const nome = document.createElement('h5');
        nome.className = "card-title";
        nome.textContent = produto.nome;
        cardBodyDiv.appendChild(nome);

        const descricao = document.createElement('p');
        descricao.className = 'card-text';
        descricao.textContent = produto.descricao;
        cardBodyDiv.appendChild(descricao);

        const preco = document.createElement('h6');
        preco.className = 'card-subtitle mb-2 text-muted';
        preco.textContent = `R$ ${produto.preco}`;
        cardBodyDiv.appendChild(preco);

        const categorias = document.createElement('div');
        categorias.className = 'categorias mt-auto';
        const categoriaArray = produto.categoria.split(',');
        categoriaArray.forEach(categoria => {
          const categoriaSpan = document.createElement('span');
          categoriaSpan.className = 'categoria-item';
          categoriaSpan.textContent = categoria.trim();
          categorias.appendChild(categoriaSpan);
        });
        cardBodyDiv.appendChild(categorias);

        cardDiv.appendChild(cardBodyDiv);
        produtoDiv.appendChild(cardDiv);
        rowDiv.appendChild(produtoDiv);

        editarLink.addEventListener('click', function(event) {
          event.preventDefault();
          editProduct(produto);
        });
        excluirLink.addEventListener('click', function(event) {
          event.preventDefault();
          confirmDeleteProduct(produto.id);
        });
      });

      produtosDiv.appendChild(rowDiv);
    })
    .catch(error => {
      if (error.message === 'Não autorizado') {
        window.location.href = 'view/login.html';
      } else {
        console.error('Erro ao obter os produtos:', error);
      }
    });
}



const myProductsButton = document.getElementById('meus-produtos');
myProductsButton.addEventListener('click', function() {
  const welcomeMessage = document.querySelector('.welcome-message');
  welcomeMessage.style.display = 'none';

  document.getElementById('produtos-lista').style.display= 'block'
  const tituloProdutos = document.getElementById('titulo-produtos');
  tituloProdutos.style.display = 'block';
  tituloProdutos.innerText = "Meus Produtos."

  const addProduto = document.getElementById('add-product-button');
  addProduto.style.display = 'block';
  loadProducts();
});

const inicioButton = document.getElementById('inicio');
inicioButton.addEventListener('click', () =>{
  document.getElementsByClassName('welcome-message')[0].style.display = 'block';
  document.getElementById('produtos-lista').style.display= 'none'
});
