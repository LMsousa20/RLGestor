async function buscarFornecedores(){
    let respostaAPI = await fetch(`${linkApi}`);
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
        <td name="prod-razao">${x.razao}</td>
        <td name="prod-cnpj">${(x.cnpj)}</td>
        <td name="prod-telefone">${x.telefone}</td>
        <td name="prod-opcoes"><input type="button" class="btn btn-sm btn-danger" value="Excluir" onclick="excluir(${x.id})"></td>
    </tr>          
        `
    });
    document.getElementById('produtos-a-consulta').innerHTML = listaPreenchida;
}

async function adicionarFornecedores() {
    let enviar = {
        method: "POST",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                "razao": razao.value,
                "cnpj": cnpj.value,
                "telefone": telefone.value,
               
            }),
    }
    let enviando = await fetch(`${linkApi}`, enviar)
    buscarFornecedores();
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
 
    let envio = await fetch(`${linkApi}/${idList}`, enviar)

    buscarFornecedores();
}

let listaPreenchida ='';
let listaLocal;
let modalaberto= false;
document.getElementById('cadstro-de-produtos').style.display = 'none' ;
let linkApi = "https://6358a6f7c27556d289416240.mockapi.io/fornecedores"
buscarFornecedores()