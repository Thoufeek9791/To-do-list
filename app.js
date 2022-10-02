

let inputFood = document.getElementById("input-food");
      let inputBtn = document.getElementById("input-btn");
      let response = document.getElementById("response");
      let foodContainer = document.getElementById("food-container");
      let nolistEl = document.getElementById('no-list');
      let localStorsgeKey = "foodItems";

      let isFirstInput = true;

      const addItems = (item) => {
        const newFoodItemEL = document.createElement("li");
        newFoodItemEL.className = "food-item";
        const divItem = document.createElement("div");
        const divRemoveBtn = document.createElement("div");
        newFoodItemEL.append(divItem, divRemoveBtn);
        foodContainer.append(newFoodItemEL);

        divRemoveBtn.parentElement.setAttribute("onclick", "removeItem(event)");

        divItem.textContent = item;

        divRemoveBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      };

      document.addEventListener("DOMContentLoaded", () => {
        const fetchedFoodItems = [
          ...JSON.parse(localStorage.getItem(localStorsgeKey)),
        ];
        // console.log(fetchedFoodItems)

        fetchedFoodItems.forEach((foodItem) => {
          document.querySelector("ul").style.display = "block";
          addItems(foodItem.foodItem)
        });

      });

      inputBtn.addEventListener("click", () => {
        // Removing by inserting html code in the foodContainer
        //please uncomment the code and test to see the differences between creating elements and inserting elements
        // foodContainer.insertAdjacentHTML("beforeend", `<li class="food-item">
        //     <div>${inputFood.value}</div>
        //     <div class="close" onclick="removeItem(event)">
        //          <i class="fa-solid fa-xmark"></i>
        //     </div>
        // </li>`)

        //Removing by creating elements using dom

        if (isFirstInput) {
          document.querySelector("ul").style.display = "block";
        }

        addItems(inputFood.value);

        localStorage.setItem(
          localStorsgeKey,
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("fooditem") || "[]"),
            { foodItem: inputFood.value }
          ])
        );

        refreshUI();
      });

      removeItem = (event) => {
        const existingEl = event.target.parentNode.parentNode;
        existingEl.remove();

        const fetchedFoodItems = [...JSON.parse(localStorage.getItem(localStorsgeKey))];


        fetchedFoodItems.forEach((item) => {

          if(item.foodItem === existingEl.innerText) {
            fetchedFoodItems.splice(fetchedFoodItems.indexOf(item),1);
          }
        })


        localStorage.setItem(localStorsgeKey, JSON.stringify(fetchedFoodItems));
        refreshUI();
        
      };

      const refreshUI = () => {

        if(foodContainer.children.length > 0) {
            //remove the image;
            nolistEl.hidden = true;
        }

        else {
            nolistEl.hidden = false;
        }
      }