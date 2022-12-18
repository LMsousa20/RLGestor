async function buscarProdutosPedidos() {
    let respostaAPIprodutos = await fetch("https://6358a6f7c27556d289416240.mockapi.io/Produtos");
    let listaAPIprodutos = await respostaAPIprodutos.json()
    listaLocal = listaAPIprodutos;
    listaPreenchida='';


    listaAPIprodutos.forEach(x => {
        listaPreenchida += `
        <li value="${x.produto}"><div class="itens"><p>${x.produto}</p><p>Valor R$: ${x.preco}</p></div></li>
         
        `
        
    });
    document.getElementById('produtosLista').innerHTML = listaPreenchida;
}


async function buscarProdutosGarcon(){
    let respostaAPI = await fetch(`https://6358a6f7c27556d289416240.mockapi.io/Pedidos/`);
    console.log(respostaAPI)
    let listaAPI= await respostaAPI.json()
    console.log(listaAPI);
    rederizarLista(listaAPI)
}


let listaPreenchida = '';
let fornecedoresPreenchida = '<option selected>Escolher Fornecedor...</option>';
buscarProdutosPedidos()
let precos = [];



