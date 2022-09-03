const loadData = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.news_category)

}
const displayData = values =>{
    const menuBar = document.getElementById('navbarNav')
    values.forEach(value => {
        // console.log(value); 
        const li = document.createElement('li')
        li.classList.add('navbar-nav')
        li.innerHTML=` 
        <a class="navbar-brand" href="#">${value.category_name}</a>
        `
        menuBar.appendChild(li);   
    });
}
loadData();