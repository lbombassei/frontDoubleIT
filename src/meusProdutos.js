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
      while (produtosDiv.firstChild) {
        produtosDiv.removeChild(produtosDiv.firstChild);
      }
      
      data.produtos.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'produto';

        const iconesDiv = document.createElement('div');
        iconesDiv.className = 'icones';

        const editarLink = document.createElement('a');
        editarLink.href = '#';
        editarLink.className = "edit";
        
        editarLink.innerHTML = '<i class="fa-solid fa-pencil " ></i>';
        iconesDiv.appendChild(editarLink);

        const excluirLink = document.createElement('a');
        excluirLink.href = '#';
        excluirLink.className = "delete"
        excluirLink.innerHTML = '<i class="fa-solid fa-trash " ></i>';
        iconesDiv.appendChild(excluirLink);

        produtoDiv.appendChild(iconesDiv);

        const img = document.createElement('img');
        img.style.maxWidth = '239px';
        img.style.maxHeight = '139px';
        img.style.width = 'auto';
        img.style.height = 'auto';
        if (produto.foto.startsWith("img/")) {
          img.src = produto.foto;
        } else {
          img.src = "data:image/png;base64," + produto.foto;
        }
        img.className = "image";
        img.alt = produto.nome;
        produtoDiv.appendChild(img);

        const nome = document.createElement('h3');
        nome.className = "nome";
        nome.textContent = produto.nome;
        produtoDiv.appendChild(nome);

        const descricao = document.createElement('p');
        descricao.className = 'descricao';
        descricao.textContent = produto.descricao;
        produtoDiv.appendChild(descricao);

        const preco = document.createElement('div');
        preco.className = 'preco';
        preco.textContent = `R$ ${produto.preco}`;
        produtoDiv.appendChild(preco);

        const categorias = document.createElement('div');
        categorias.className = 'categorias';
        const categoriaArray = produto.categoria.split(',');
        categoriaArray.forEach(categoria => {
          const categoriaSpan = document.createElement('span');
          categoriaSpan.className = 'categoria-item';
          categoriaSpan.textContent = categoria.trim();
          categorias.appendChild(categoriaSpan);
        });
        produtoDiv.appendChild(categorias);

        produtosDiv.appendChild(produtoDiv);

        editarLink.addEventListener('click', function(event) {
          event.preventDefault();
          editProduct(produto);
        });
        excluirLink.addEventListener('click', function(event) {
          event.preventDefault();
          confirmDeleteProduct(produto.id);
        });
      });
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

  const tituloProdutos = document.getElementById('titulo-produtos');
  tituloProdutos.style.display = 'block';
  tituloProdutos.innerText = "Meus Produtos."

  const addProduto = document.getElementById('add-product-button');
  addProduto.style.display = 'block';
  loadProducts();
});


