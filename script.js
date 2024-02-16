// product Counter
function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

// -------------------------------------------------------
// Fetch data from the API
fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
)
  .then((response) => response.json())
  .then((data) => {
    const product = data.product;

    document.getElementById("product-name").textContent = product.title;

    document.getElementById("product-main-image").src = product.images[0].src;

    const productImageSlider = document.getElementById("product-image-slider");
    product.images.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.src;
      productImageSlider.appendChild(img);
    });

    // Calculate discount percentage
    const price = parseFloat(product.price.replace("$", "").replace(",", ""));
    const compareAtPrice = parseFloat(
      product.compare_at_price.replace("$", "").replace(",", "")
    );
    const discountPercentage =
      ((compareAtPrice - price) / compareAtPrice) * 100;

    // Update product price with discount percentage
    document.getElementById("product-price").innerHTML = `
    <div>
        <span class="offer-price">${product.price}</span>
        <sup><span class="discount-perc">${discountPercentage.toFixed(
          1
        )}% OFF</span></sup>
    </div>
    <div>
        <span class="sale-price">${product.compare_at_price}</span>
    </div>`;
    // Update product color options
    const productColor = document.getElementById("product-color");
    product.options.forEach((option) => {
      if (option.name.toLowerCase() === "color") {
        const optionDiv = document.createElement("div");
        optionDiv.className = "product-color";
        optionDiv.innerHTML = `<h4>${option.name}</h4>`;
        const optionLayout = document.createElement("div");
        optionLayout.className = "color-layout";
        option.values.forEach((value) => {
          const valueKey = Object.keys(value)[0];
          const input = document.createElement("input");
          input.type = "radio";
          input.name = option.name.toLowerCase();
          input.value = valueKey;
          input.classList.add("color-input");
          const label = document.createElement("label");
          label.for = valueKey;
          label.classList.add(valueKey.toLowerCase());
          label.addEventListener("click", () => {
            input.checked = true;
          });
          optionLayout.appendChild(input);
          optionLayout.appendChild(label);
        });
        optionDiv.appendChild(optionLayout);
        productColor.appendChild(optionDiv);
      }
    });

    // Update product size options
    const productSize = document.getElementById("product-size");
    product.options.forEach((option) => {
      if (option.name.toLowerCase() === "size") {
        const optionDiv = document.createElement("div");
        optionDiv.className = "product-size";
        optionDiv.innerHTML = `<h4>${option.name}</h4>`;
        const optionLayout = document.createElement("div");
        optionLayout.className = "size-layout";
        option.values.forEach((value) => {
          const wrapperDiv = document.createElement("div");
          wrapperDiv.className = "size-wrapper";

          const input = document.createElement("input");
          input.type = "radio";
          input.name = option.name.toLowerCase();
          input.value = value;
          input.classList.add("size-input");

          const label = document.createElement("label");
          label.for = value;
          label.textContent = value;

          // Add event listener to each size input
          input.addEventListener("change", function () {
            document.querySelectorAll(".size-wrapper").forEach((div) => {
              div.classList.remove("checked");
            });
            if (input.checked) {
              wrapperDiv.classList.add("checked");
            }
          });
          wrapperDiv.appendChild(input);
          wrapperDiv.appendChild(label);
          optionLayout.appendChild(wrapperDiv);
        });
        optionDiv.appendChild(optionLayout);
        productSize.appendChild(optionDiv);
      }
    });

    // Update product description
    document.getElementById("product-details").innerHTML = product.description;

    let selectedColor = "";
    let selectedSize = "";

    const colorInputs = document.querySelectorAll(".color-input");
    const sizeInputs = document.querySelectorAll(".size-input");
    console.log(colorInputs);
    console.log(sizeInputs);

    // Function to update selected variant data
    function updateSelectedVariantData() {
      const colorInputs = document.querySelectorAll(".color-input");
      const sizeInputs = document.querySelectorAll(".size-input");

      colorInputs.forEach((input) => {
        if (input.checked) {
          selectedColor = input.value;
        }
      });

      sizeInputs.forEach((input) => {
        if (input.checked) {
          selectedSize = input.value;
        }
      });
    }

    document.querySelectorAll(".color-input").forEach((input) => {
      input.addEventListener("change", updateSelectedVariantData);
    });

    document.querySelectorAll(".size-input").forEach((input) => {
      input.addEventListener("change", updateSelectedVariantData);
    });

    document
      .getElementById("add-to-cart")
      .addEventListener("click", function () {
        if (selectedColor && selectedSize) {
          const productName =
            document.getElementById("product-name").textContent;
          const message = `${productName} with Color ${selectedColor} and Size ${selectedSize} added to cart`;
          const addToCartMessage = document.getElementById(
            "add-to-cart-message"
          );
          addToCartMessage.textContent = message;
          addToCartMessage.style.display = "block";

          selectedColor = "";
          selectedSize = "";
        } else {
          alert("Please select color and size before adding to cart");
        }
      });
  })
  .catch((error) => console.error("Error fetching data:", error));

function decreaseCount(event, element) {
  const input = element.nextElementSibling;
  if (input.value > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

function increaseCount(event, element) {
  const input = element.previousElementSibling;
  input.value = parseInt(input.value) + 1;
}
