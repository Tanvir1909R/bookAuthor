const counters = document.querySelectorAll(".auto_counter");
const bar = document.querySelector('.bar');


// handle nav btn 
bar.addEventListener('click',()=>{
    document.querySelector('.navLinks').classList.toggle("activeNav");
})

// on scroll nav bar animation 
window.addEventListener('scroll',()=>{
  if(window.scrollY > 100){
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
