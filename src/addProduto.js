document.getElementById("add-product-button").addEventListener("click", function() {
    document.getElementById("add-product-modal").style.display = "block";
    document.getElementsByClassName("modal-title")[0].innerHTML = "Novo Produto";
    document.getElementsByClassName("btn-update")[0].style.display = 'none'
  });
  
  // Fecha o modal ao clicar no botão "X" (ou em qualquer outra parte da tela)
  document.getElementsByClassName("btn-close")[0].addEventListener("click", function() {
    document.getElementById("add-product-modal").style.display = "none";
    document.getElementsByClassName("modal-title")[0].innerHTML = "";
  });
  
  window.onclick = function(event) {
    if (event.target == document.getElementById("add-product-modal")) {
      document.getElementById("add-product-modal").style.display = "none";
    }
  }

  const dropArea = document.getElementById('image-upload');
  const fileInput = document.getElementById('file-input');
  const previewImage = document.getElementById('preview-image');
  const previewFilename = document.getElementById('filename');

  // Impede o comportamento padrão do navegador ao arrastar e soltar
  dropArea.addEventListener('dragenter', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.add('dragged-over');
  });

  dropArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.remove('dragged-over');
  });

  dropArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

  dropArea.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropArea.classList.remove('dragged-over');

    // Obtenha o arquivo arrastado
    const file = e.dataTransfer.files[0];
    if (!file) {
      return;
    }
    fileInput.files = e.dataTransfer.files;
    previewImage.src = URL.createObjectURL(file);
    previewFilename.textContent = file.name;
  });

  fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) {
      return;
    }
    previewImage.src = URL.createObjectURL(file);
    previewFilename.textContent = file.name;
  });

  document.querySelector('.btn-save').addEventListener('click', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const dataRemessa = document.getElementById('data-remessa').value;
    const categoria = document.getElementById('categorias').value;
  
    const fileInput = document.getElementById('file-input');
    const reader = new FileReader();
  
    if (nome.trim() === '' || descricao.trim() === '' || preco.trim() === '') {
      alert('Preencha todos os campos corretamente.');
      return;
    }
  
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = function() {
      const base64Image = reader.result.split(',')[1];
  
      const data = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        dataRemessa: dataRemessa,
        categoria: categoria,
        imagem: base64Image
      };
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(data)
      };
  
      fetch('http://localhost:3000/api/products', options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao adicionar produto');
          }
          return response.json();
        })
        .then(data => {
          // Trate a resposta do servidor aqui
          const modal = document.querySelector('.modal');
          modal.style.display = 'none';

          // Limpa os campos do formulário
          const form = document.querySelector('#add-product-form');
          form.reset();

          // Atualiza a lista de produtos
          loadProducts();

          // Exibe uma mensagem de sucesso
          alert('Produto adicionado com sucesso!');
        })
        .catch(error => {
          // Trate o erro aqui
        });
    };
  });
  
  