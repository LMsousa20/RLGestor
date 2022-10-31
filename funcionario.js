async function buscarProdutos(){
    let respostaAPI = await fetch("https://6358a6f7c27556d289416240.mockapi.io/Produtos");
    console.log(respostaAPI)
    let listaAPI= await respostaAPI.json()
    console.log(listaAPI);
    rederizarLista(listaAPI)
}

function rederizarLista(lista){
    listaPreenchida ='';
    lista.forEach(x => {
       listaPreenchida +=`
        <tr>
        <td name="prod-id">${x.id}</td>
        <td name="prod-produto">${x.produto}</td>
        <td name="prod-preco">${(x.preco)}</td>
        <td name="prod-custo">${x.custo}</td>
        <td name="prod-codigo">${x.codigo}</td>
        <td name="prod-fornecedor">${x.fornecedor}</td>
        <td name="prod-opcoes"><input type="button" class="btn btn-sm btn-danger" value="Excluir" onclick="excluir(${x.id})"></td>
    </tr>          
        `
    });
    document.getElementById('produtos-a-consulta').innerHTML = listaPreenchida;
}

async function adicionarProduto() {
    let enviar = {
        method: "POST",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                "produto": produto.value,
                "preco": preco.value,
                "codigo": codigo.value,
                "custo": custo.value,
                "fornecedor": fornecedor.value,

            }),
    }
    let enviando = await fetch('https://6358a6f7c27556d289416240.mockapi.io/Produtos', enviar)
    buscarProdutos();
    alert('cadastrado')
    document.getElementById('cadstro-de-produtos').style.display = 'none' ;
    modalaberto = false;
    
}

function abremodal() {

    if(modalaberto === false){
        document.getElementById('cadstro-de-produtos').style.display = 'block' ;
        modalaberto = true;
        console.log('abriu')
    }
}

async function excluir(idList) {
    let enviar = {
        method: "DELETE",
        headers: { "content-type": "application/json", }
    }
 
    let envio = await fetch(`https://6358a6f7c27556d289416240.mockapi.io/Produtos/${idList}`, enviar)

    buscarProdutos();
}

let listaPreenchida ='';
let listaLocal;
let modalaberto= false;
document.getElementById('cadstro-de-produtos').style.display = 'none' ;
buscarProdutos()