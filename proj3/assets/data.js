function renderItems(collection, filter) {
	const collectionList = document.getElementById("collection");

	// Clear any existing items from the collection list
	collectionList.innerHTML = "";

	// Loop through the collection and create a dish container for each item
	for (let i = 0; i < collection.length; i++) {
		// Check if the current item should be filtered out based on the filter value
		if (filter === "recommend" && !collection[i].recommend) {
			continue;
		}

		const dishContainer = document.createElement("div");
		dishContainer.classList.add("dish-container");

		const dishName = document.createElement("h2");
		dishName.innerText = collection[i].name;
		dishContainer.appendChild(dishName);

		// Create a button to toggle the accordion
		const accordionBtn = document.createElement("button");
		accordionBtn.innerText = "Details";
		accordionBtn.classList.add("accordion-btn");
		dishContainer.appendChild(accordionBtn);

		const dishDetails = document.createElement("div");
		dishDetails.classList.add("accordion-content");

		const ingredients = document.createElement("p");
		ingredients.innerText = "Ingredients: " + collection[i].ingredients;
		dishDetails.appendChild(ingredients);

		const description = document.createElement("p");
		description.innerText = collection[i].description;
		dishDetails.appendChild(description);

		const level = document.createElement("p");
		level.innerText = "Difficulty level: " + collection[i].level;
		dishDetails.appendChild(level);

		// Hide dish details by default
		dishDetails.style.maxHeight = null;

		dishContainer.appendChild(dishDetails);

		collectionList.appendChild(dishContainer);

		// Add event listener to the accordion button to toggle the accordion
		accordionBtn.addEventListener("click", function() {
			dishContainer.classList.toggle("active");
			if (dishDetails.style.maxHeight) {
				dishDetails.style.maxHeight = null;
			} else {
				dishDetails.style.maxHeight = dishDetails.scrollHeight + "px";
			}
		});
	}
}

function generateRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// Set the background color of the page to a random color
document.body.style.backgroundColor = generateRandomColor();

// Fetch gets your JSON file.
fetch("assets/data.json")
	.then(function (response) {
		return response.json();
	})
	.then(function (collection) {
		// And passes the data to the function, above!
		renderItems(collection.reverse(), "all"); // In reverse order
	});

// Add event listeners to the filter buttons
const recommendFilterBtn = document.getElementById("recommend-btn");
const allFilterBtn = document.getElementById("all-btn");

recommendFilterBtn.addEventListener("click", function () {
	const filter = "recommend";
	fetch("assets/data.json")
		.then(function (response) {
			return response.json();
		})
		.then(function (collection) {
			renderItems(collection, filter);
		});
});

allFilterBtn.addEventListener("click", function () {
	const filter = "all";
	fetch("assets/data.json")
		.then(function (response) {
			return response.json();
		})
		.then(function (collection) {
			renderItems(collection, filter);
		});
});
