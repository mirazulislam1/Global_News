const loadCategorys = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategorys(data.data.news_category)

}
const displayCategorys = categorys =>{
    const menuBar = document.getElementById('navbarNav')
    categorys.forEach(category => {
        console.log(category); 
        const li = document.createElement('li')
        li.classList.add('navbar-nav')
        li.innerHTML=` 
        <a class="navbar-brand" href="#" onclick="loadCategorysDetails('${category.category_id}')">${category.category_name}</a>
        `
        menuBar.appendChild(li);   
    });
}
 const loadCategorysDetails =async (category_id) =>{
    const url= `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url);
    const data = await res.json()
    displayCategorysDetails(data.data)
 }
 const displayCategorysDetails = values =>{
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent='';
    values.forEach(value =>{
        console.log(value);
        const div = document.createElement('div')
        div.innerHTML= `
        <div class="card mb-3 p-4 m-4" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${value.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${value.title}</h5>
              <p class="card-text">${value.details.slice(0, 400) +' ...'}</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
        `
        cardContainer.appendChild(div)
    })
 }
loadCategorys();