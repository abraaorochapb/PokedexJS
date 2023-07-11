function pesquisar() {
  var conteudo = document.querySelector('.conteudo');
  var pesquisar = document.querySelector('.pesquisa').value.toLowerCase();

  fetch(`https://pokeapi.co/api/v2/pokemon/${pesquisar}`)
    .then(response => response.json())
    .then(data => {
      
      fetch(data.species.url)
        .then(response => response.json())
        .then(speciesData => {
          
          if (data.id < 650){
          var generationName = speciesData.generation.name;
          conteudo.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif" class="img-pokemon"> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${data.id}.gif" class="img-pokemon">
            <h2>${data.name}</h2>
            <bold>Numero: ${data.id}</bold> <br>
            <bold>Tipo: ${data.types.map((tipo) => tipo.type.name)}</bold> <br>
            <bold>Geração: ${generationName}</bold>
          `;
          
          document.querySelector('.pesquisa').value = '';
        }
          else if (data.id >= 650 && data.id <= 898){
            var generationName = speciesData.generation.name;
          conteudo.innerHTML = `
            <img src="${data.sprites.front_default}" class="img-pokemon"> <img src="${data.sprites.back_default}" class="img-pokemon">
            <h2>${data.name}</h2>
            <bold>Numero: ${data.id}</bold> <br>
            <bold>Tipo: ${data.types.map((tipo) => tipo.type.name)}</bold> <br>
            <bold>Geração: ${generationName}</bold>
          `;

          document.querySelector('.pesquisa').value = '';
        } else{
          conteudo.innerHTML = `<h1>Esta Pokédex está atualiazada apenas até a Oitava Geração!<h1>`
          document.querySelector('.pesquisa').value = '';
        }
        });
        
    }).catch(error => {
      var conteudo = document.querySelector('.conteudo');
      conteudo.innerHTML = `<h1>Pokémon não encontrado, tente novamente!<h1>`;
    })
}

var input = document.querySelector('.pesquisa');
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    pesquisar();
  }
});