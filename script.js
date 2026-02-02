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
    colorArr.forEach((color) => {
      colorContainer.innerHTML += `
        <div class="color-wrapper-div">
                <img src="${color.image.bare}"/>
                <p>${color.hex.value}</p>
        </div>
        `;
    });
  } catch (err) {
    console.error(err);
  }
}
