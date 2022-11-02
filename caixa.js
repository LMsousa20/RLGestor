async function buscarPedidos() {
    let respostaAPI = await fetch(`${linkApiPedidos}`);
    console.log(respostaAPI)
    let listaAPI = await respostaAPI.json()
    console.log(listaAPI);
    rederizarLista(listaAPI)
   
}

function rederizarLista(lista) {
    listaPreenchida = '';
    lista.forEach(pedidos => {
        if (pedidos.pago === false) {
            listaPreenchidaPedidos += `
             <tr>
             <td name="prod-comanda">${pedidos.comanda}</td>
             <td name="prod-produto">${pedidos.produto}</td>
             <td name="prod-quantidade">${(pedidos.quantidade)}</td>
             <td name="prod-ponto">${pedidos.valor}</td>
             <td name="prod-opcoes"><input type="button" class="btn btn-sm btn-secondary" value="PAGO?" onclick="editar(${pedidos.id})"></td>
         </tr>          
             `;}})
             document.getElementById('pedidos-a-consulta').innerHTML = listaPreenchidaPedidos;
            }


// function rederizarComandas(pedidos) {

//     if(pedidos.pronto === true) {
//         let ComandoAberta = pedidos.comanda;
//         console.log(ComandoAberta);
//         if (salao.indexOf(ComandoAberta) === -1) {
//             salao.push(ComandoAberta)
//             console.log(salao)
//             descriptComanda += `${pedidos.produto}<br>`;
//             console.log(descriptComanda)
                               
//            }
//        }
      

//     salao.forEach(N => {
//         listaPreenchida +=
//             `
        
//              <div class="card" style="min-width: 100px ;">
//                  <div class="card-body">
//                      <h5>Comanda ${N}</h5>
//                      <p class="card-text">Comandas Abertas</p>
//                      <a href="#" class="card-link">Finalizar Comanda</a>
//                  </div>
//              </div>
//         `
//     }),

//         document.getElementById('comandas-a-consulta').innerHTML = listaPreenchida;
// }


async function editar(idList) {
    let enviar = {
        method: "PUT",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                "pago": true,
            })
    }
    let envio = await fetch(`${linkApiPedidos}${idList}`, enviar);
    buscarPedidos();

}

let listaPreenchida = '';
let listaPreenchidaPedidos = '';
let listaLocal;
let linkApiPedidos = "https://6358a6f7c27556d289416240.mockapi.io/Pedidos/"
let salao = [];
let descriptComanda = [];
buscarPedidos()

setTimeout(function () {
    window.location.reload();
}, 9000);