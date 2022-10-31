async function buscarProdutosPedidos() {
    let respostaAPIprodutos = await fetch("https://6358a6f7c27556d289416240.mockapi.io/Produtos");
    let listaAPIprodutos = await respostaAPIprodutos.json()
    listaLocal = listaAPIprodutos;
    listaPreenchida='';


    listaAPIprodutos.forEach(x => {
        listaPreenchida += `
        <option value="${x.produto}">${x.produto}</option>
         
        `
        
    });
    document.getElementById('produtosLista').innerHTML = listaPreenchida;
}

async function adicionarProduto() {

    if (quantidade.value !== '') {

        let enviar = {
            method: "POST",
            headers: { "content-type": "application/json", },
            body: JSON.stringify(
                {
                    "produto": produtosLista.value,
                    "quantidade": quantidade.value,
                    "pontodacarne": pontodacarne.value,
                    "pronto": false,
                    "pago": false,
                    "valor": valor.value,
                    "comanda": comanda.value,

                }),
        }
        let enviando = await fetch('https://6358a6f7c27556d289416240.mockapi.io/Pedidos', enviar)
        alert('CADASTRADO')
        buscarProdutosGarcon();
    } else {
        alert('Informar quantidade')
        quantidade.style.border = '1px solid red';

    }

        produtosLista.value='';
        quantidade.value='';
        valor.value='';
        comanda.value='';
        pontodacarne.value='';

}

function precoUnitario(){
   
    let valorPedido = listaLocal.filter(valor => valor.produto === produtosLista.value)
    let num1 = valorPedido[0].preco.toFixed(2)
    console.log(num1)
    precodoproduto.value = num1;
 }

function calculandoPreco(){
   let valorPedido = listaLocal.filter(valor => valor.produto === produtosLista.value)
   let num = valorPedido[0].preco * quantidade.value
   valor.value = num.toFixed(2);
   console.log(num)
}

async function buscarProdutosGarcon(){
    let respostaAPI = await fetch(`https://6358a6f7c27556d289416240.mockapi.io/Pedidos/`);
    console.log(respostaAPI)
    let listaAPI= await respostaAPI.json()
    console.log(listaAPI);
    rederizarLista(listaAPI)
}

function rederizarLista(lista){
    listaPreenchida ='';
    lista.forEach(pedidos => {
        if(pedidos.pronto === false){
       listaPreenchida +=`
        <tr>
        <td name="prod-comanda">${pedidos.comanda}</td>
        <td name="prod-produto">${pedidos.produto}</td>
        <td name="prod-quantidade">${(pedidos.quantidade)}</td>
        <td name="prod-ponto">${pedidos.pontodacarne}</td>
        <td name="prod-opcoes"><input type="button" class="btn btn-sm btn-danger" value="Cancelar" onclick="excluirpedidos(${pedidos.id})"></td>
    </tr>          
        `}
    });
    document.getElementById('pedidos-a-consulta').innerHTML = listaPreenchida;
}

async function excluirpedidos(idList) {
    let enviar = {
        method: "DELETE",
        headers: { "content-type": "application/json", }
    }
    
    let envio = await fetch(`https://6358a6f7c27556d289416240.mockapi.io/Pedidos/${idList}`, enviar)

    buscarProdutosGarcon();
}

let listaPreenchida = '';
let fornecedoresPreenchida = '<option selected>Escolher Fornecedor...</option>';
let listaLocal;
let modalaberto = false;
buscarProdutosPedidos()
buscarProdutosGarcon()
let precos = [];



