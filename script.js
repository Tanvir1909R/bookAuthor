const counters = document.querySelectorAll(".auto_counter");
const bar = document.querySelector('.bar');
const chapterNavContainer = document.querySelector('.chapterNavigations')
const cardContainer = document.querySelector('.chepterText')
// handle nav btn 
bar.addEventListener('click',()=>{
    document.querySelector('.navLinks').classList.toggle("activeNav");
})

// on scroll nav bar animation 
window.addEventListener('scroll',()=>{
  if(window.scrollY > 0){
    document.getElementById('header').classList.add('headerActive')
  }else{
    document.getElementById('header').classList.remove('headerActive')
  }
})

// hender counter on the counter section 
counters.forEach((counter) => {
  counter.innerHTML = 0;
  const updateCouont = () => {
    const targetcount = +counter.getAttribute("data-id");
    const startCount = +counter.innerHTML;
    const inrc = targetcount / 100;
    if (startCount < targetcount) {
      counter.innerHTML = `${Math.floor(startCount + inrc)}`;
      setTimeout(updateCouont, 50);
    } else {
      counter.innerHTML = targetcount;
    }
  };
  updateCouont();
});

// fecth links
fetch('./data/chapterLinks.json')
.then((res) => res.json())
.then((data) => showData(data))

const showData = (data)=>{
  data.forEach((d)=>{
    let linkHtml = `
      <div class="chapterLink ${d.card.cardId}">
        <span class="dash"></span>
        <span onclick="scrollToId('${d.card.cardId}')">${d.linkText}</span>
      </div>
    `;
    let cardHtml = `
      <div id="${d.card.cardId}" class="card">
        <h1>${d.card.cardTitle}</h1>
        <p>${d.card.cardBody}</p>
      </div>
    `;
    chapterNavContainer.innerHTML += linkHtml;
    cardContainer.innerHTML += cardHtml;
  })
}
function scrollToId(ID){
  const card = document.getElementById(ID);
  const link = document.getElementsByClassName(ID);
  card.scrollIntoView({
    behavior: "smooth",
    block:"center",
  })
  linkActive( card, link)
}
const linkActive = (card, link)=>{
  window.addEventListener('scroll',()=>{
    const cardPosition = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight/3;
      if(windowHeight >= cardPosition){
        link[0].classList.add('chapterLinkActive');
      }else{
        link[0].classList.remove('chapterLinkActive');
      }
    })
}
