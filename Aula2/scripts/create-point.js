function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => { 
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const ufValue = event.target.value; 
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    const indexOfSelectedState = event.target.selectedIndex; 
    const stateInput = document.querySelector("input[name=state]");
    stateInput.value = event.target.options[indexOfSelectedState].text;

    clearSelecectOptions(citySelect);
    citySelect.innerHTML = `<option value="0">(selecione a Cidade)</option>`;

    fetch(url)
        .then(res => res.json())
        .then(cities => { 
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            citySelect.disabled = false;
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


function clearSelecectOptions(comboBox) {
    while (comboBox.options.length > 0) {                
        comboBox.remove(0);
    }        
}