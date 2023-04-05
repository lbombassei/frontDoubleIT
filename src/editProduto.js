function editProduct(produtoDiv) {
  const nome = produtoDiv.nome;
  const descricao = produtoDiv.descricao;
  const preco = produtoDiv.preco
  const categorias = produtoDiv.categoria;
  const foto = produtoDiv.foto;
  const idProduto = produtoDiv.id;
  const idUsuario = produtoDiv.usuario_id;
  const categoriaArray = categorias.split(',');
 
  const addProductModal = document.querySelector('#add-product-modal');
  addProductModal.style.display = 'block'
  document.getElementsByClassName("modal-title")[0].innerHTML = "Editar Produto";
  // Selecionando os campos do formulário
  const nomeInput = addProductModal.querySelector('#nome');
  const descricaoInput = addProductModal.querySelector('#descricao');
  const precoInput = addProductModal.querySelector('#preco');
  const categoriasInput = addProductModal.querySelector('#categorias');
  const fileInput1 = addProductModal.querySelector('#file-input');
  const previewImage1 = addProductModal.querySelector('#preview-image');

  nomeInput.value = nome;
  descricaoInput.value = descricao;
  precoInput.value = preco;
  categoriasInput.value = categoriaArray;
  if (foto.startsWith("img/")) {
    previewImage1.setAttribute('src', foto);
  } else {
    previewImage1.setAttribute('src', "data:image/png;base64," + foto);
  }
  
  
  const saveButton = addProductModal.querySelector('.btn-save');
  saveButton.style.display = 'none';

  const submitButton = addProductModal.querySelector('.btn-update');
  submitButton.style.display = 'block'
  submitButton.addEventListener('click', function(event) { 
    event.preventDefault();
    const base64Image = previewImage1.getAttribute('src').split(',')[1];
    const produto = {
      nome: nomeInput.value,
      descricao: descricaoInput.value,
      preco: precoInput.value,
      categoria: categoriasInput.value,
      foto: base64Image,
      id: idProduto,
      usuario_id: idUsuario
    };
    console.log(produto)
    fetch(`http://localhost:3000/api/products/${idProduto}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto)
    })
      .then(response => {
        if (response.status === 403) {
          throw new Error('Não autorizado');
        }
        return response.json();
      })
      .then(data => {
        console.log('Produto atualizado com sucesso:', data);
        // Recarrega a lista de produtos após atualizar um produto
        loadProducts();
        // Limpa o formulário
        nomeInput.value = '';
        descricaoInput.value = '';
        precoInput.value = '';
        categoriasInput.value = '';
        previewImage1.setAttribute('src', '');
        // Fecha o modal
        const modalCloseButton = addProductModal.querySelector('.btn-close');
        modalCloseButton.click();
      })
      .catch(error => {
        if (error.message === 'Não autorizado') {
          window.location.href = 'view/login.html';
        } else {
          console.error('Erro ao atualizar o produto:', error);
        }
      });
  });
}