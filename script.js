const loadAllPets = async () => {
  document.getElementById("loading").classList.remove("hidden");
  setTimeout(function () {
    document.getElementById("loading").classList.add("hidden");
    displayAllPets(sortedPrice.pets);
  }, 2000);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  sortedPrice = await response.json();
};

const displayAllPets = (pets) => {
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";
  pets.forEach((pet) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-base-100 border">
                    <figure class="px-6 pt-6">
                        <img class="w-full md:h-40 lg:h-48 xl:h-60 rounded-2xl" src=${
                          pet.image
                        } alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title font-bold">${pet.pet_name}</h2>
                        <div class="text-description">
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/breed.png" alt="">
                                <p>Breed: ${
                                  pet.breed ? pet.breed : "Not Found"
                                }</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/calendar.png" alt="">
                                <p>Birth: ${
                                  pet.date_of_birth
                                    ? pet.date_of_birth
                                    : "Not Found"
                                }</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/gander.png" alt="">
                                <p>Gender: ${
                                  pet.gender ? pet.gender : "Not Found"
                                }</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/dollar.png" alt="">
                                <p>Price: ${
                                  pet.price ? pet.price + "$" : "Not Available"
                                }</p>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="card-actions items-center justify-center">
                            <button  onclick=likedImage('${
                              pet.image
                            }') class="btn btn-sm btn-ghost border border-gray-200 text-primary font-bold text-lg"><img
                                    src="images/like.png" alt=""></button>
                            <button id=${pet.petId} onclick=adoptBtn(${
      pet.petId
    })
                                class="btn btn-sm btn-ghost border border-gray-200 text-primary font-bold text-lg">Adopt</button>
                            <button onclick=petDetails('${pet.petId}')
                                class="btn btn-sm btn-ghost border border-gray-200 text-primary font-bold text-lg">Details</button>

                        </div>
                    </div>
                </div>
        
        `;
    petsContainer.appendChild(div);
  });
};

const categoryBtn = async (categoryName) => {
  const categoryButtons = document.getElementsByClassName('categoryButtons');
  for (const btn of categoryButtons) {
    btn.classList.remove('active-btn', 'rounded-full')
  }
  document.getElementById(categoryName).classList.add('active-btn', 'rounded-full')

  document.getElementById("pets-container").innerHTML = "";
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById(categoryName).classList.add("active-btn");
  setTimeout(function () {
    document.getElementById("loading").classList.add("hidden");
    displayByCategory(data.data);
  }, 2000);

  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await res.json();
};

const displayByCategory = async (pets) => {
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";
  if (pets.length == 0) {
    petsContainer.classList.remove("grid");
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex justify-center items-center text-center flex-col space-y-8 col-span-3 border bg-base-200 rounded-xl p-8">
            <div>
              <img src="images/error.webp" alt="">
            </div>
            <h2 class="text-4xl font-black">No Information Available</h2>
            <p class="text-description">Oops! It looks like there are no pets here right now. Try browsing other sections.</p>
        </div>
        `;
    petsContainer.appendChild(div);
  } 
  else {
    petsContainer.classList.add("grid");
    pets.forEach((e) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card bg-base-100 border">
                    <figure class="px-6 pt-6">
                        <img class="w-full rounded-2xl" src=${
                          e.image
                        } alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title font-bold">${e.pet_name}</h2>
                        <div class="text-description">
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/breed.png" alt="">
                                <p>Breed: ${e.breed ? e.breed : "Not Found"}</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/calendar.png" alt="">
                                <p>Birth: ${
                                  e.date_of_birth
                                    ? e.date_of_birth
                                    : "Not Found"
                                }</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/gander.png" alt="">
                                <p>Gender: ${
                                  e.gender ? e.gender : "Not Found"
                                }</p>
                            </div>
                            <div class="flex items-center gap-2 text-base">
                                <img src="images/dollar.png" alt="">
                                <p>Price: ${
                                  e.price ? e.price + "$" : "Not Available"
                                }</p>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="card-actions items-center justify-center">
                            <button onclick=likedImage('${
                              e.image
                            }') class="btn btn-sm btn-ghost border border-gray-200 text-primary font-bold text-lg"><img
                                    src="images/like.png" alt=""></button>
                            <button id=${e.petId} onclick=adoptBtn('${e.petId}')
                                class="btn btn-sm btn-ghost border border-gray-200 text-primary font-bold text-lg">Adopt</button>
                            <button onclick=petDetails('${e.petId}')
                                class="btn btn-sm btn-ghost border border-gray-200 text-primary font-bold text-lg">Details</button>

                        </div>
                    </div>
                </div>
        `;
      petsContainer.appendChild(div);
    });
  }
};

const categories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayCategories(data.categories);
};

const displayCategories = (category) => {
  const categoriesConatiner = document.getElementById("categories");
  category.forEach((e) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div id=${e.category} onclick="categoryBtn('${e.category}')" class="categoryButtons cursor-pointer flex items-center gap-2 border py-10 md:px-20 lg:px-24 rounded-3xl justify-center font-inter hover:bg-gray-50 transition-all">
                    <img class="w-14" src=${e.category_icon} alt="">
                    <h2 class="text-xl font-black">${e.category}</h2>
                </div>
        `;
    categoriesConatiner.appendChild(div);
  });
};

// liked images
const likedImage = (image) => {
  const likedImageContainer = document.getElementById("liked-image-container");
  const div = document.createElement("div");
  div.innerHTML = `
  <img class="border rounded-2xl p-2" src=${image} alt="">
  `;
  likedImageContainer.appendChild(div);
};

// details button
const petDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  my_modal_5.showModal();
  displayPetDetails(data.petData);
};

const displayPetDetails = (pet) => {
  const detailsModal = document.getElementById("details-modal");
  detailsModal.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card bg-base-100">
                      <figure class="px-1 pt-1 md:px-6 md:pt-6">
                          <img class="w-full md:h-40 lg:h-48 xl:h-60 rounded-2xl" src=${
                            pet.image
                          } alt="Shoes" class="rounded-xl" />
                      </figure>
                      <div class="card-body">
                          <h2 class="card-title font-bold">${pet.pet_name}</h2>
                          <div class="text-description grid grid-cols-1 md:grid-cols-2">
                              <div class="flex items-center gap-2 text-base">
                                  <img src="images/breed.png" alt="">
                                  <p>Breed: ${
                                    pet.breed ? pet.breed : "Not Found"
                                  }</p>
                              </div>
                              <div class="flex items-center gap-2 text-base">
                                  <img src="images/calendar.png" alt="">
                                  <p>Birth: ${
                                    pet.date_of_birth
                                      ? pet.date_of_birth
                                      : "Not Found"
                                  }</p>
                              </div>
                              <div class="flex items-center gap-2 text-base">
                                  <img src="images/gander.png" alt="">
                                  <p>Gender: ${
                                    pet.gender ? pet.gender : "Not Found"
                                  }</p>
                              </div>
                              <div class="flex items-center gap-2 text-base">
                                  <img src="images/dollar.png" alt="">
                                  <p>Price: ${
                                    pet.price
                                      ? pet.price + "$"
                                      : "Not Available"
                                  }</p>
                              </div>
                              </div>
                              <div class="flex items-center gap-2 text-base text-description">
                                  <img src="images/gander.png" alt="">
                                  <p>Vaccinated status: ${
                                    pet.vaccinated_status
                                  }</p>
                              </div>
                          <div class="divider"></div>
                          <div>
                              <h2 class="text-lg font-bold">Details Information</h2>
                              <p>${pet.pet_details}</p>
                          </div>
                      </div>
                      <div class="modal-action flex justify-center">
                          <form method="dialog" class="w-full">
                              <!-- if there is a button in form, it will close the modal -->
                              <button class="btn w-full">Cancle</button>
                          </form>
                      </div>
                  </div>
    `;
  detailsModal.appendChild(div);
};

const countDown = (petId) => {
  let i = 2;
  const countDown = setInterval(() => {
    document.getElementById("countdown").textContent = i;
    i--;
    if (i < 1) {
      clearInterval(countDown);
      document.getElementById("my_modal_5").close();
      const adopt = document.getElementById(petId);
      adopt.innerText = "Adopted";
      adopt.disabled = true;
    }
  }, 1000);
};

// Adopt button
const adoptBtn = (petId) => {
  countDown(petId);
  const detailsModal = document.getElementById("details-modal");
  detailsModal.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card bg-base-100 text-center">
        <div><i class="fa-solid fa-handshake text-primary text-5xl"></i></div>
        <h2 class="text-5xl font-black">Congrates</h2>
        <p class="mb-2 mt-4 text-lg text-description">Adoption Process is Start for your Pet</p>
        <div id="countdown" class="text-5xl font-bold text-center">3</div>           
    </div>
    `;
  detailsModal.appendChild(div);
  my_modal_5.showModal();
};

// array to sort pets in decending order
let sortedPrice = [];
const sortPrice = () => {
  const sortedByPrice = [...sortedPrice.pets].sort((a, b) => b.price - a.price);
  displayAllPets(sortedByPrice);
};

const sortBtn = () => {
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById('pets-container').innerHTML = '';
  setTimeout(function () {
    document.getElementById("loading").classList.add("hidden");
    sortPrice()
  }, 2000);

};
categories();
loadAllPets();
