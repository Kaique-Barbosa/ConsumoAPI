const chaveApi = "a2992e25";

const formPesquisa = document.querySelector("form");

formPesquisa.onsubmit = (ev) =>{
    ev.preventDefault();

    const pesquisa = ev.target.pesquisa.value;
    
    if(pesquisa == ""){
        alert("preencha um campo")
        return;
    }
    // para pegar a descrição devo alterar a url para ?t= porem quando faço isso retorna um erro no forEach, mas tenho retorno do json
    //depois tirar os comentarios da linha 52
    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${chaveApi}&plot=short`)
    .then(result => result.json())
    .then(json => carregalista(json))
    
}

// setTimeout(2000)

const carregalista = (json) => {
    const lista = document.querySelector(".filmes");
    lista.innerHTML = "";
    // console.log(json)

    if(json.Response == "False"){
        alert("NENHUM FILME ENCONTRADO");
        return;
    }

    if(Array.isArray(json.Search)){

        json.Search.forEach(element => {
            // console.log(element)
            
            let item = document.createElement('div');
            item.classList.add('card');
            
            item.innerHTML = `
            <img src="${element.Poster}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${element.Title}</h5>
            <p class="card-text">Tipo: ${element.Type}.</p>
            <p class="card-text">Ano: ${element.Year}.</p>
            </div>`;
            console.log(element);
            
            lista.appendChild(item);
        });
    }   // FUTURAMENTE INCREMENTAR UMA BUSCA POR TITULO, POREM SO IRA ME RETORNAR O FILME DO TITULO EM ESPECIFICO
    // else{
    //      // Tratar o caso específico para a busca por título
    //     let item = document.createElement('div');
    //     item.classList.add('card');

    //     item.innerHTML = `
    //     <img src="${json.Poster}" class="card-img-top" alt="...">
    //     <div class="card-body">
    //         <h5 class="card-title">${json.Title}</h5>
    //         <p class="card-text">${json.Plot}.</p>
    //     </div>`;
    //     console.log(json);
    //     lista.appendChild(item);
    // }
}
