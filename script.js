//Vado a creare un container per metterci dentro le cards dei libri

// Creo prima una row con un titolo che dice "Tutti i prodotti"
let row = document.createElement("div");
row.classList.add("row");
document.body.appendChild(row); // Aggiungo la riga al corpo del documento

let titleSection = document.createElement("h3"); // Creo un nuovo elemento h2 per il titolo
titleSection.innerText = "Tutti i nostri prodotti";
titleSection.classList.add("mt-3")

// Aggiungo il titolo alla riga appena creata
row.appendChild(titleSection);
row.classList.add("text-center");
row.classList.add("mt-4");

//Creo un container per le cards
let container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);
container.classList.add("mt-4");
container.classList.add("d-flex");
container.classList.add("gap-5");
container.classList.add("justify-content-center");
container.classList.add("flex-wrap");
container.classList.add("bg-white");

// Carica i dati da localStorage quando la pagina viene caricata
let savedCards = JSON.parse(localStorage.getItem("savedCards")) || [];
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//Vado a recuperare i dati dall'API:
fetch("https://striveschool-api.herokuapp.com/books")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
   
    let dati = data;
    dati.forEach((dato) => {
      let card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("mt-4");
      card.style.marginBottom="180px";
      card.style.height = "400px";
      card.style.width = "250px";
      card.classList.add("d-flex");
      card.classList.add("flex-column");
      card.classList.add("align-items-center");
      card.classList.add("gap-3");
      card.classList.add("index");
      let imgCard = document.createElement("img"); // Creo un elemento img per l'immagine
      imgCard.src = dato.img; // Imposto l'attributo src dell'elemento img con l'URL dell'immagine dai tuoi dati
      imgCard.classList.add("card-img-top"); // Aggiungo la classe Bootstrap "card-img-top" per la formattazione
      imgCard.style.marginTop = "10px";
      imgCard.style.width = "230px";
      imgCard.style.height = "330px";
      imgCard.onclick=() => (window.location=`productDetails.html?bookId=${idLibro}`);
      let titolo = document.createElement("h2");
      titolo.innerText = dato.title;
      titolo.style.fontSize = "16px";
      titolo.style.textAlign = "center";
      titolo.classList.add("titolo-libro");
      let review = document.createElement("div");
      review.classList.add("d-flex");
      review.style.height = "40px";
      review.style.width = "100%";
      review.classList.add("justify-content-center");
      for (let i = 0; i < 5; i++) {
        let starIcon = document.createElement("i");
        starIcon.classList.add("bi", "bi-star-fill", "text-secondary");
        review.appendChild(starIcon);
      }
      let price = document.createElement("h6");
      price.innerText = (dato.price).toFixed(2) + " $";
      price.style.fontSize = "20px";
      price.classList.add("bookPrice");
      let genere = document.createElement("h6");
      genere.style.fontWeight="normal";
      genere.classList.add("text-capitalize");
      genere.innerText = "Genere: " + dato.category;
      let idLibro = dato.asin;
      let pulsanti = document.createElement("div");
      pulsanti.classList.add("d-flex");
      pulsanti.classList.add("w-100");
      pulsanti.style.height = "100px";
      pulsanti.classList.add("gap-4");
      pulsanti.classList.add("justify-content-center");
      let add = document.createElement("div");
      let addButton = document.createElement("button");
      addButton.style.border = "none";
      addButton.style.backgroundColor = "white";
      let cartIcon = document.createElement("i");
      cartIcon.classList.add("bi", "bi-cart-plus");
      let saveIcon = document.createElement("i");
      saveIcon.classList.add("bi", "bi-heart");
      let save = document.createElement("div");
      let saveButtons = document.createElement("button");
      cartIcon.style.fontSize = "30px";
      saveIcon.style.fontSize = "28px";
      saveIcon.style.position = "relative";
      saveIcon.style.top = "3px";
      saveIcon.classList.add("saveIcon");
      saveIcon.addEventListener("click", function () {
        if (saveIcon.classList.contains("bi-heart")) {
          saveIcon.classList.remove("bi-heart");
          saveIcon.classList.add("bi-heart-fill");
        } else {
          saveIcon.classList.remove("bi-heart-fill");
          saveIcon.classList.add("bi-heart");
        }
      });

      // Aggiungi un evento di click all'icona del carrello
      cartIcon.addEventListener("click", function () {
   
        if (cartIcon.classList.contains("bi-cart-plus")) {
          cartIcon.classList.remove("bi-cart-plus");
          cartIcon.classList.add("bi-cart-check-fill");
        } else {
          cartIcon.classList.remove("bi-cart-check-fill");
          cartIcon.classList.add("bi-cart-plus");
        }
  
      });

      saveButtons.style.backgroundColor = "white";
      saveButtons.style.border = "none";
      saveButtons.classList.add("saveButton");

      // Aggiungi un evento click a saveIcon
      saveIcon.addEventListener("click", function () {
        // Trova la card genitore
        let parentCard = saveIcon.closest(".card");

        // Accedi al titolo e all'immagine dalla card genitore
        let titolo = parentCard.querySelector(".titolo-libro").innerText;
        let imgSrc = parentCard.querySelector(".card-img-top").src;
        let price = parentCard.querySelector(".bookPrice").innerText;

        // Crea un oggetto per rappresentare la card salvata
        let savedCard = {
          titolo: titolo,
          imgSrc: imgSrc,
          price: price,
        };

        // Verifica se la card è già stata salvata
        let index = savedCards.findIndex(
          (card) => card.titolo === titolo && card.imgSrc === imgSrc
        );
        if (index === -1) {
          // Se la card non è stata salvata, aggiungila all'array
          savedCards.push(savedCard);
          console.log("Card salvata:", savedCard);
        } else {
          // Se la card è già stata salvata, rimuovila dall'array
          savedCards.splice(index, 1);
          console.log("Card rimossa:", savedCard);
        }

        console.log(savedCards);

        // Salva i dati aggiornati in localStorage
        localStorage.setItem("savedCards", JSON.stringify(savedCards));
      });

      cartIcon.addEventListener("click", function () {
        // Trova la card genitore
        let parentCard = cartIcon.closest(".card");

        // Accedi al titolo e all'immagine dalla card genitore
        let titolo = parentCard.querySelector(".titolo-libro").innerText;
        let imgSrc = parentCard.querySelector(".card-img-top").src;
        let price = parentCard.querySelector(".bookPrice").innerText;

        // Crea un oggetto per rappresentare la card salvata
        let cartItem = {
          titolo: titolo,
          imgSrc: imgSrc,
          price: price,
        };

        // Verifica se la card è già stata salvata
        let index = -1;
        cartItems.forEach((item, i) => {
          if (item.titolo === titolo && item.imgSrc === imgSrc) {
            index = i;
          }
        });

        if (index === -1) {
          // Se la card non è stata salvata, aggiungila all'array
          cartItems.push(cartItem);
          console.log("Card salvata:", cartItem);
        } else {
          // Se la card è già stata salvata, rimuovila dall'array
          cartItems.splice(index, 1);
          console.log("Card rimossa:", cartItem);
        }

        // Salva i dati aggiornati in localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      });

      cartIcon.classList.add("iconaCarrello");

      card.appendChild(imgCard); // Aggiungo l'elemento img come figlio della carta
      card.appendChild(titolo);
      card.appendChild(genere);
      card.appendChild(review);
      card.appendChild(price);
      card.appendChild(pulsanti);
      pulsanti.appendChild(add);
      pulsanti.appendChild(save);
      add.appendChild(addButton);
      addButton.appendChild(cartIcon);
      save.appendChild(saveButtons);
      saveButtons.appendChild(saveIcon);
      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Si è verificato un errore:", error);
  });

console.log(cartItems.length);






