
 const getResours = async(url) => {
  const res = await fetch(url)
  
  if(!res.ok){
    throw new Error(`Errors - ${res.ok}`)
  }

  return await res.json();
}

const getAllSlids = async () => {
  const res = await getResours(`https://solovey.com.ua/test/data.json`)
  console.log(res.sneakers)
  return res.sneakers
}

window.addEventListener("load", function(){

const items = getAllSlids()

class SliderItem {
  render() {
    const slider = document.querySelector('.slider');
    items.then(res => {
      res.forEach(({image_url, model, link, price}) => {
        let temp =  `
        <a href="${link}">
        <div class="slider__item">
          <div class="slider__logo">
            <svg width="100" height="36" viewBox="0 0 99 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="path" d="M10.865 35.2955C7.94499 35.1795 5.556 34.3805 3.688 32.8965C3.3315 32.613 2.482 31.763 2.197 31.4045C1.4395 30.452 0.924498 29.525 0.580998 28.4965C-0.476002 25.3305 0.0679975 21.176 2.137 16.6165C3.9085 12.713 6.642 8.84151 11.411 3.47951C12.1135 2.69051 14.2055 0.382996 14.219 0.382996C14.224 0.382996 14.11 0.580499 13.9665 0.820999C12.7265 2.898 11.6655 5.34449 11.0875 7.46249C10.159 10.861 10.271 13.7775 11.4155 16.039C12.205 17.597 13.5585 18.9465 15.0805 19.6925C17.745 20.998 21.646 21.106 26.41 20.0085C26.738 19.9325 42.991 15.618 62.528 10.4205C82.065 5.2225 98.0525 0.973001 98.055 0.976501C98.0605 0.981001 52.665 20.406 29.0995 30.4835C25.3675 32.079 24.3695 32.482 22.615 33.098C18.13 34.673 14.1125 35.4245 10.865 35.2955Z" fill="black" stroke="#000000" stroke-width="1"/>
              </svg>
          </div>
          <div class="slider__body">
            <div class="slider__title active">
              ${model}
            </div>
            <div class="slider__price active" >
              € ${price}
              <span class="price"></span>
            </div>
            <div class="slider__img">
              <img src="${image_url}" alt="">
            </div>
          </div>
          <div class="slider__btn"><span class="btn">ORDER NOW!</span></div>
        </div>
      </a>
        `
        slider.insertAdjacentHTML('afterBegin', temp);
      })

    })
   
  }
}
const sliderItem = new SliderItem()
sliderItem.render()

setTimeout(() => {
  $('.slider').slick({
    arrows:false,
    Infinity:true,
    autoplay: true
  });
}, 500);
  
  $('.slider__price').addClass('active')

  $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $('.path').css('display', 'none');
      $('.slider__price').removeClass('active')
      $('.slider__title').removeClass('active')

      document.querySelector('.price').innerHTML = ''
      
    });
    
    $('.slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
      $('.path').css('display', 'block');
      $('.path').addClass('active');
      $('.slider__price').addClass('active')
      $('.slider__price').addClass('end-prise')
      $('.slider__title').addClass('active')

      setTimeout(() => {
        $('.path').removeClass('active')
        document.querySelector('.path').style.fill = "black"
        document.querySelector('.path').style.strokDashoffset = "1000"
      }, 1200)
  });

})