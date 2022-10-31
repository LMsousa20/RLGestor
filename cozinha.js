async function buscarPedidos(){
    let respostaAPI = await fetch(`${linkApiPedidos}`);
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
        <td name="prod-opcoes"><input type="button" class="btn btn-sm btn-success" value="PRONTO" onclick="editar(${pedidos.id})"></td>
    </tr>          
        `}
    });
    document.getElementById('pedidos-a-consulta').innerHTML = listaPreenchida;
}


async function editar(idList) {
    let enviar = {
        method: "PUT",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                "pronto": true,
            })
    }
     let envio = await fetch(`${linkApiPedidos}${idList}`, enviar);
     buscarPedidos();
 
}

let listaPreenchida ='';
let listaLocal;
let linkApiPedidos = "https://6358a6f7c27556d289416240.mockapi.io/Pedidos/"
buscarPedidos()

setTimeout(function(){
    window.location.reload();
}, 9000);