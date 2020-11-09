document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    var selected = document.querySelector("[name=quantity]").value;
    fetch(`https://api.coinpaprika.com/v1/ticker`)
        .then((result) => result.json())
        .then((data) => {
            const markup = data

                .filter((coin) => Number.parseInt(coin.rank, 10) <= selected)
                .sort((a, b) =>
                    Number.parseInt(a.rank, 10) > Number.parseInt(b.rank, 10)
                        ? 1
                        : -1
                )
                .map(
                    (coin) =>
                        `
                       <div class="mutat">
                            <label class="lab js_rank"> Rank:
                                <div class="block ">${coin.rank}</div>
                            </label >
                            <label class="lab"> Name:
                                <div class="block ">${coin.name}</div>
                            </label >
                            <label class="lab js_price"> Price_USD:
                                <div class="block ">${coin.price_usd}</div>
                            </label >
                            <label class="lab js_volume"> 24h_Volume_USD:
                                <div class="block ">${coin.volume_24h_usd}</div>
                            </label >
                            <label class="lab js_market"> Market_cap_USD:
                                <div class="block ">${coin.market_cap_usd}</div>
                            </label >
                            <label class="lab js_change"> Change_24h_%:
                                <div class="block ">${coin.percent_change_24h}</div>
                            </label >
                            <label class="lab js_symbol"> Symbol:
                                <div class="block ">${coin.symbol}</div>
                            </label > 

                       </div>   `
                )

                .join("");

            document.querySelector(".mutat_container").innerHTML = markup;
            Show(".js_price_check", ".js_price");
            Show(".js_rank_check", ".js_rank");
            Show(".js_volume_check", ".js_volume");
            Show(".js_market_check", ".js_market");
            Show(".js_change_check", ".js_change");
            Show(".js_symbol_check", ".js_symbol");
        });
});

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const coin_name = document.querySelector("[name=text]").value;

    fetch(`https://api.coinpaprika.com/v1/coins`)
        .then((result) => result.json())
        .then((data) => {
            const filteredData = data.filter(
                (coin) => coin.name.toLowerCase() === coin_name.toLowerCase()
            );
            const coin_id = filteredData.map((coin) => coin.id);

            fetch(`https://api.coinpaprika.com/v1/coins/${coin_id}`)
                .then((result) => result.json())
                .then((data) => {
                    const link = data.whitepaper.link;
                    const markup = `
                    <a class="whiteLink" href="${link}" target="_blank">Click here, to get  ${data.name.toUpperCase()}'s whitepaper</a>
                    `;
                    document.querySelector(
                        ".link_container"
                    ).innerHTML = markup;
                });
        });
});

function Show(check_class, show_class) {
    var tag = document.querySelector(check_class).checked;
    var x, i;
    x = document.querySelectorAll(show_class);
    if (tag === true) {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "block";
        }
    } else {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
    }
}

function dateTime() {
    var dt = new Date();
    document.querySelector(".datetime").innerHTML = dt.toLocaleString();
}
function tik() {
    setInterval(dateTime, 1000);
}

tik();
