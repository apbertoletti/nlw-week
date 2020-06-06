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

    citySelect.innerHTML = `<option value="0">(selecione a Cidade)</option>`;
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cities => { 
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false;
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

    
const collectedItems = document.querySelector("input[name=items]") 
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adiciona ou remove uma classe CSS no elemento
    itemLi.classList.toggle("selected")

    /* Recupera o datasetId dos elementos */
    const itemId = itemLi.dataset.id;

    const alredySelected = selectedItems.findIndex(i => i == itemId);
    if (alredySelected != -1) {
        const filteredItens = selectedItems.filter(i => i != itemId)
        selectedItems = filteredItens
    }
    else
        selectedItems.push(itemId)

    /* Atualiza o campo escondido com os itens selecionados */
    collectedItems.value = selectedItems;
}