const colorContainer = document.getElementById("container");
const formEl = document.getElementById("form");
const baseURL = "https://www.thecolorapi.com";
const endPoint = "/scheme";

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const seedColor = formData.get("color-picker").substring(1);
  const colorMode = formData.get("color-mode");

  const fetchURL = `${baseURL}${endPoint}?hex=${seedColor}&mode=${colorMode}&count=6`;
  console.log(fetchURL);

  fetchColors(fetchURL);
});

async function fetchColors(url) {
  try {
    const res = await fetch(url);
    const color = await res.json();
    console.log(color);
    const colorArr = color.colors;
    renderColor(colorArr);
  } catch (err) {
    console.error(err);
  }
}

function renderColor(colorArr) {
  colorContainer.innerHTML = "";
  colorArr.forEach((color) => {
    colorContainer.innerHTML += `
        <div class="color-wrapper-div">
                <div class="background-div" style="background-color:${color.hex.value}"></div>
                <p>${color.hex.value}</p>
        </div>
        `;
  });
}
