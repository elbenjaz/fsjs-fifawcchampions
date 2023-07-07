const search = () => {
    let place     = document.querySelector("#wcc-place").value,
        /*
        yearFrom  = document.querySelector("#wcc-year-from").value,
        yearTo    = document.querySelector("#wcc-year-to").value,
        */
        [{value: yearFrom}, {value: yearTo }] = document.querySelectorAll("#wcc-year input"),
        text      = document.querySelector("#wcc-text").value,
        requiredFields = true;

    let feedback     = document.querySelector("#wc-feedback"),
        results      = document.querySelector("#wc-results"),
        totalResults = 0;

    feedback.innerHTML = "";

    if (requiredFields && (place === "" || yearFrom === "" || yearTo === "")) {
        results.innerHTML = "";

        //alert("Please fill in place and year.");
        feedback.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <h4><i class="fa-solid fa-triangle-exclamation"></i> Please fill in place and year.</h4>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        return false;
    }

    document.querySelector("#wc-search").classList.add("loading");

    let html = `<h3 class="mt-3 text-center">Total results: <span id="wcchampions-results-total"></span></h3>
                <div id="wcchampions">`;

        fifawcchampions.forEach(champion => {
            let filterPlace     = requiredFields || place ? champion.place == Number(place) : true,
                filterYearFrom  = requiredFields || yearFrom ? champion.year >= Number(yearFrom) : true,
                filterYearTo    = requiredFields || yearTo ? champion.year <= Number(yearTo) : true;
                filterText      = text ? new RegExp(text, "i").test(champion.country) : true;

            if (filterPlace && filterYearFrom & filterYearTo && filterText) {
                html += `<div class="wcchampions-item">
                             <img src="${champion.flag}">

                             <b><i class="fa-solid fa-trophy" data-place="${champion.place}"></i> ${champion.country}</b>

                             <div class="d-flex justify-content-between">
                                 <p>Place #${champion.place}</p>
                                 <p>Year ${champion.year}</p>
                             </div>

                             <p>WC ${champion.worldcup}</p>

                             <button class="btn btn-primary">
                                 <i class="fa-solid fa-photo-film"></i> Play multimedia
                             </button>
                         </div>`;
                totalResults++;
            }
        });

        html += `</div>`;

    results.innerHTML = html;
    document.querySelector("#wcchampions-results-total").innerHTML = totalResults;
};

let searchBtn = document.querySelector("#wc-search");
    searchBtn.addEventListener("click", search),
    searchBtn.addEventListener("animationend", e => e.target.classList.remove("loading"));

document.querySelectorAll(".wc-filter").forEach(e => e.addEventListener("change", search));

search();
