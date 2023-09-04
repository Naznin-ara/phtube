
let totalview =[];
const loadData = async () =>{
    let res = await fetch(` https://openapi.programming-hero.com/api/videos/categories`);
    let datas = await res.json();
    let data = datas.data;
    loadTabButton(data);
}
// load catagory dynamically
const loadTabButton = (data) =>{
    const tabsection = document.getElementById('tabsection');

    for(let item of data){
        const div = document.createElement('div');
        div.innerHTML = `<button class="bg-gray-200 rounded-lg px-4 py-3 hover:bg-[#FF1F3D] hover:text-white transition-all" id="btn" onclick="handleLoadData('${item.category_id}')">${item.category}</button> `
        tabsection.appendChild(div);
        const btn = document.getElementById('btn');
       if(item.category == "All"){
        btn.style.backgroundColor = "#FF1F3D";
        btn.style.color = "white";
       }
    }
}

const handleLoadData = async (id) =>{
    let res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    let datas = await res.json();
    let data = datas.data;
    alldataLoad(data);
}
// load all data by catagory
const alldataLoad = (items) =>{
    const cardContainer = document.getElementById('cardContainer');
    const otherdiv = document.getElementById('otherdiv');
    cardContainer.innerHTML = "";
    otherdiv.innerHTML="";
    totalview = items;
    // if there is no content
    if(items.length==0){
        const div = document.createElement('div');
        div.innerHTML = ` <div class="flex flex-col justify-center items-center">
        <img src="./image/Icon.png" alt="">
        <h1 class="text-2xl font-extrabold w-[400px] text-center mt-6">Oops!! Sorry, There is no
             content here</h1>
        </div>`
   otherdiv.appendChild(div);
    }

    for(let item of items){
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `<div class="card card-compact w-full lg:w-[300px] h-auto lg:h-[300px] bg-green-100 shadow-xl">
        <figure><img class="w-[300px] h-[200px]" src="${item.thumbnail}" alt="Shoes" /></figure>
        <div class="card-body">
            <div class="flex justify-center items-start gap-8 ">
                <img src="${item?.authors[0]?.profile_picture}" class="w-[40px] h-[40px] rounded-full" alt="">
                 <div class="flex flex-col justify-center items-start">
                    <h2 class="text-base font-bold">${item?.title}</h2>
                    <div class="flex justify-center items-center">
                        <p class="text-[#111111B3]">${item?.authors[0]?.profile_name}</p>
                        <div  class="ml-2" id="verify">
                        ${item.authors[0].verified?`<img src="./image/fi_10629607.svg" alt="">`:''}
                        </div>
                    </div>
                    <p class="text-[#111111B3]">${item?.others?.views}</p>
            </div>
                
            </div>
          </div>
          <div >${item?.others?.posted_date?`<div class="pl-4 py-2 flex justify-center items-center text-[12px] absolute w-[136px] h-[25px] bg-[#171717] text-white bottom-[107px] right-[8px] rounded-md" >${Math.round((Math.round(item.others.posted_date/60))/60)}hr ${(Math.round(item.others.posted_date/60))%60}min ago</div>`:''}</div>
      </div>`
    
    cardContainer.appendChild(cardDiv);
}
   
}
// sorting by view
const sortByView = () =>{
    let arr = totalview.sort((a,b) =>{
        let arr1 = a.others.views.slice(0,3);
        let arr2 = b.others.views.slice(0,3);
        let arr3 = parseFloat(arr1);
        let arr4 = parseFloat(arr2);
        return arr4-arr3;
    })
    alldataLoad(arr);
    return arr;
}
const openBlog =()=>{
    window.location.href = "blog.html";
}
handleLoadData('1000');
loadData();