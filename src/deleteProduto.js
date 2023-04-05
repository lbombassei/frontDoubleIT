function deleteProduct(idProduto) {

    fetch(`http://localhost:3000/api/products/${idProduto}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 403) {
          throw new Error('Não autorizado');
        }
        return response.json();
      })
      .then(data => {
        console.log('Produto excluído com sucesso:', data);
        // Recarrega a lista de produtos após excluir um produto
        loadProducts();
        
      })
      .catch(error => {
        if (error.message === 'Não autorizado') {
          window.location.href = 'view/login.html';
        } else {
          console.error('Erro ao excluir o produto:', error);
        }
      });
  
}

function confirmDeleteProduct(idProduto) {
  Swal.fire({
    title: 'Tem certeza?',
    text: "Você não será capaz de reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, exclua!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteProduct(idProduto);
    }
  });
}