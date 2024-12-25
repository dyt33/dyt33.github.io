// 轮播图自动播放设置
document.addEventListener('DOMContentLoaded', function() {
    const carouselElement = document.querySelector('#mainCarousel');
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        wrap: true,
        touch: true // 启用Bootstrap的触摸支持
    });
    
    // 添加导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselElement.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, false);
    
    carouselElement.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // 向左滑动
            carousel.next();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // 向右滑动
            carousel.prev();
        }
    }
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            carousel.prev();
        } else if (e.key === 'ArrowRight') {
            carousel.next();
        }
    });
    
    // 在移动端优化触摸体验
    if ('ontouchstart' in window) {
        carouselElement.style.cursor = 'grab';
        carouselElement.addEventListener('touchstart', () => {
            carouselElement.style.cursor = 'grabbing';
        });
        carouselElement.addEventListener('touchend', () => {
            carouselElement.style.cursor = 'grab';
        });
    }

    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 表单输入优化
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        // 添加焦点效果
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
        
        // 实时验证
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
            }
        });
    });

}); 