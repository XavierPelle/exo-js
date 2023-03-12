function createMarkup(markup_name, text, parent, attribute) {
    const markup = document.createElement(markup_name);
    markup.textContent = text;
    parent.appendChild(markup);
    if (attribute && attribute.hasOwnProperty("name")) {
      markup.setAttribute(attribute.name, attribute.value);
    }
    return markup;
  }

fetch('https://geo.api.gouv.fr/regions')
  .then(response => response.json()) 
  .then(regions => {
    const selectionRegion = document.getElementById('selectionRegion'); 
    regions.forEach(region => {
      const option = document.createElement('option'); 
      option.value = region.code; 
      option.text = region.nom; 
      selectionRegion.appendChild(option); 
    });
  })
  .catch(error => console.error(error)); 

const selectionRegion = document.getElementById('selectionRegion'); 
const selectionDepartement = document.getElementById('selectionDepartement');

selectionRegion.addEventListener('change', () => {
  const regionCode = selectionRegion.value; 
  const departementsEndpoint = `https://geo.api.gouv.fr/regions/${regionCode}/departements`; 
  fetch(departementsEndpoint)
    .then(response => response.json()) 
    .then(departements => {
      selectionDepartement.innerHTML = '<option value="">Sélectionnez un département</option>';
      departements.forEach(departement => {
        const option = document.createElement('option');
        option.value = departement.code;
        option.text = departement.nom;
        selectionDepartement.appendChild(option);
      });
    })
    .catch(error => console.error(error)); 
});

const selectionCommune = document.getElementById("selectionCommune");

function afficherCommunes(departementCode) {

    const url = `https://geo.api.gouv.fr/departements/${departementCode}/communes`;


  fetch(url)
    .then((response) => response.json())
    .then((communes) => {

      selectionCommune.innerHTML = "";

      communes.forEach((commune) => {
        const option = document.createElement("option");
        option.value = commune.code;
        option.text = commune.nom;
        selectionCommune.appendChild(option);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

selectionDepartement.addEventListener("change", (event) => {
  const departementCode = event.target.value;
  if (departementCode !== "") {
    afficherCommunes(departementCode);
  } else {
    selectionCommune.innerHTML = "";
  }
});

selectionCommune.addEventListener("change", (event) => {

  const communeCode = event.target.value;
  const url = `https://geo.api.gouv.fr/communes/${communeCode}`;

  fetch(url)
    .then((response) => response.json())
    .then((commune) => {
      const infoCommune = createMarkup("section",`Nom de la ville: ${commune.nom} ` , document.body, {});
      const infoPopulation = createMarkup("section",`Nombre d'habitant: ${commune.population}` , document.body, {});
      const infoCode = createMarkup("section",`Code postale: ${commune.codesPostaux}` , document.body, {});
    })
    .catch((error) => {
      console.log(error);
    });
});
