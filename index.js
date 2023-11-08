const getDetailsFromToken = async (token) => {
  let url = `https://api.coingecko.com/api/v3/coins/${token}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const updateDetailsFromToken = async (token) => {
  const data = await getDetailsFromToken(token);

  let { image, name, symbol, market_cap_rank, market_data } = data;

  document.getElementById("rank").textContent = market_cap_rank;
  document.getElementById("image").src = image.thumb;
  document.getElementById("cap").textContent = `$ ${convertIntoBillion(
    market_data.market_cap.usd
  )} B USD`;
  document.getElementById(
    "amount"
  ).innerHTML = `<b>${market_data.current_price.usd}</b> USD `;
  document.getElementById("volume").textContent = `$ ${convertIntoBillion(
    market_data.total_volume.usd
  )} B USD`;
  document.getElementById(
    "name"
  ).textContent = `${name} (${symbol.toUpperCase()})`;
  document.getElementById("rank").textContent = market_cap_rank;
};

const convertIntoBillion = (val) => {
  let num = val / 1000000000;

  return num.toFixed(2);
};

const token = document.currentScript.getAttribute("token-name");

if (token) {
  updateDetailsFromToken(token);
} else {
  console.log("error");
}
