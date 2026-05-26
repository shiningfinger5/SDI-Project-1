class TVSearch {
  constructor() {
    this.url = "https://api.tvmaze.com";
    this.findButton = document.querySelector("#find-button");
    this.resultsContainer = document.querySelector("#results-container");
    this.detailsContainer = document.querySelector("#details-container");
    this.inputField = document.getElementById("Search");
  }

  searchBarResults() {
    this.inputField.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        const inputValue = this.inputField.value;

        fetch(`${this.url}/search/shows?q=${inputValue}`)
          .then(results => results.json())
          .then(data => {
            console.log(data);
            this.showResults(data);
          });
      }
    });
  }

  getSelectedGenres() {
    const checkedBoxes = document.querySelectorAll(".genre-filters input:checked");
    const genres = [];

    for (let checkedbox of checkedBoxes) {
      genres.push(checkedbox.value);
    }

    return genres;
  }

  findShows() {
    const selectedGenres = this.getSelectedGenres();

    let searchTerm = selectedGenres[0];

    if (!searchTerm) {
      searchTerm = "";
    }

    console.log("Selected genres:", selectedGenres);
    console.log("Searching for:", searchTerm);

    fetch(`${this.url}/search/shows?q=${searchTerm}`)
      .then(results => results.json())
      .then(data => {
        console.log(data);
        this.showResults(data);
      });
  }

  showResults(data) {
    this.resultsContainer.innerHTML = "";

    for (let result of data) {
      const show = result.show;

      const showElement = document.createElement("p");
      showElement.textContent = `${show.name} - ${show.genres.join(", ")}`;

      showElement.addEventListener("click", () => {
        this.displayDetails(show);
      });

      this.resultsContainer.appendChild(showElement);
    }
  }

  displayDetails(show) {
    this.detailsContainer.innerHTML = "";

    const titleElement = document.createElement("h2");
    titleElement.textContent = show.name;

    const imageElement = document.createElement("img");

    if (show.image) {
      imageElement.src = show.image.medium;
      imageElement.alt = show.name;
    }

    const summaryElement = document.createElement("div");
    summaryElement.innerHTML = show.summary;

    this.detailsContainer.appendChild(titleElement);

    if (show.image) {
      this.detailsContainer.appendChild(imageElement);
    }

    this.detailsContainer.appendChild(summaryElement);
  }

  start() {
    this.findButton.addEventListener("click", () => {
      this.findShows();
    });

    this.searchBarResults();
  }
}

const project = new TVSearch();
project.start();