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
         // start spinner
         toggleSpinner(true);
    const cardContainer = document.getElementById('card-container')
      
    cardContainer.textContent='';
    category.forEach(value =>{
      const {image_url, title, details, author,total_view } = value
        console.log(value);
        const div = document.createElement('div')
        div.innerHTML= `
        <div class="card mb-3 border border-0 shadow-lg" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start " alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.length >400?details.slice(0, 400) +' ...' :details}</p>
              <div class="d-flex justify-content-between">
             <div> <img src="${author.img}" class="rounded-circle author" alt="...">
             <a>${author.name ?author.name :'No data found'}</a></div>
             <p><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
             <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
             <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
           </svg></span> ${total_view ? total_view: 'No view'}</p>
              <button href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalNews('${value._id}')" >show Details</button 
              </div>
            </div>
          </div>
        </div>
      </div>
        `
        cardContainer.appendChild(div)
    })
    // stop spinner
      toggleSpinner(false);
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
  <p class="card-text">${value.details}</p>
  <p>Id : ${value._id}</p>
  <p>Rating : ${value.rating.number ? value.rating.number: 'No Rating'}
  <p> Published-Date : ${value.author. published_date}
  <div class="d-flex justify-content-between">
  <div> <img src="${value.author.img}" class="rounded-circle author" alt="...">
  <a>${value.author.name ? value.author.name :'No data found'}</a></div>
  <p> <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg></span> ${value.total_view ? value.total_view: 'No view'}</p></div>
  ` 
 }
 // loader
 const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader')
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
 }
loadCategorys();