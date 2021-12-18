const inputForm = document.querySelector("#search")
const result = document.querySelector(".result")

const searchState = async searchText => {
    const res = await fetch("data.json");

    const states = await res.json();

    let matches = states.filter(state => {
        const reg = new RegExp(`^${searchText}`,"gi");
        return state.name.match(reg) || state.abbr.match(reg)
    });

    if(searchText.length === 0){
        matches = []
        result.innerHTML = ""
    }

    outputHtml(matches)

}

// Show Result in html

const outputHtml = matches => {
    if(matches.length > 0){
        var html = matches.map(match => `
            <div class="item">
            <h3>${match.name} <span>${match.abbr}</span></h3>
            <h4>Capital</h4>
            <p>${match.capital}</p>
            </div>
        `).join('')

        result.innerHTML = html;

    }

}

inputForm.addEventListener("input",() => searchState(inputForm.value))

