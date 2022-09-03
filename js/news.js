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
 const displayCategorysDetails = category =>{
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent='';
    category.forEach(value =>{
      const {image_url, title, details, author,total_view } = value
        console.log(value);
        const div = document.createElement('div')
        div.innerHTML= `
        <div class="card mb-3 p-4" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start " alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title fs-2">${title}</h5>
              <p class="card-text fs-5">${details.length > 400?details.slice(0, 400) +' ...' :details}</p>
              <div class="d-flex justify-content-between">
             <div> <img src="${author.img}" class="rounded-circle author" alt="...">
             <a>${author.name ?author.name :'No name'}</a></div>
              <p>${total_view ?total_view: 'No view'}</p>
              <button href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalNews('${value._id}')" >show Details</button 
              </div>
            </div>
          </div>
        </div>
      </div>
        `
        cardContainer.appendChild(div)
    })
 }
      const loadModalNews =async(news_id) =>{
      const url =` https://openapi.programming-hero.com/api/news/${news_id}`
      const res = await fetch(url)
      const data = await res.json()
      displayNewsDetails(data.data[0])
 }
 const displayNewsDetails = value =>{
  console.log(value)
  const modalTitle = document.getElementById('exampleModalLabel')
  modalTitle.innerText = value.title
  const modalBody = document.getElementById('modal-body')
  modalBody.innerHTML = `
  <img src="${value.image_url}" class="img-fluid rounded-start " alt="...">
  `
 
  
 }
loadCategorys();