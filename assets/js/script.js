
$('.count').each(function () {
  $(this).prop('Counter',0).animate({
      Counter: $(this).text()
  }, {
      duration: 1000,
      easing: 'swing',
      step: function (now) {
          $(this).text(Math.ceil(now));
      }
  });
});


$('#profile').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    vertical: true, // This makes the carousel vertical
    center: true,
    autoplay:true,
    autoplayTimeout:2500,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:1,
            nav:false
        },
        1000:{
            items:1,
            nav:true,
            loop:true
        }
    }
})

$('#profile-c').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    vertical: true, 
    autoplay: true,
    animateIn: 'slideInUp',
    autoplayTimeout: 2500,
    slideSpeed: 1,     // Minimal slide speed
    rewindSpeed: 1, 
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 1,
        nav: true,
        loop: true,
      }
    }
  });

  $(document).ready(function() {
    const container = $("#cont");
    const boxes = $(".box");
    const circles = $(".circle");

    let isBoxDragging = false;
    let isCircleDragging = false;
    let boxStartX, boxStartY, circleStartAngle, circleStartX, circleStartY, activeBox, activeCircle;

    const initialBoxPositions = {};
    const initialCircleTransforms = {};

    boxes.each(function(index) {
      const box = $(this);
      initialBoxPositions[index] = { left: box.css("left"), top: box.css("top") };
    });

    circles.each(function(index) {
      const circle = $(this);
      initialCircleTransforms[index] = circle.css("transform");
    });

    function resetBoxAndCirclePositions() {
      boxes.each(function(index) {
        const box = $(this);
        box.css(initialBoxPositions[index]);
      });

      circles.each(function(index) {
        const circle = $(this);
        circle.css("transform", initialCircleTransforms[index]);
      });
    }

    boxes.on("mousedown", function(e) {
      isBoxDragging = true;
      activeBox = $(this);
      const boxRect = activeBox[0].getBoundingClientRect();
      boxStartX = e.clientX - boxRect.left;
      boxStartY = e.clientY - boxRect.bottom;
    });

    circles.on("mousedown", function(e) {
      isCircleDragging = true;
      activeCircle = $(this);
      const circleRect = activeCircle[0].getBoundingClientRect();
      const circleCenterX = circleRect.left + circleRect.width / 2;
      const circleCenterY = circleRect.top + circleRect.height / 2;
      circleStartAngle = Math.atan2(e.clientY - circleCenterY, e.clientX - circleCenterX);
      circleStartX = e.clientX - circleRect.left;
      circleStartY = e.clientY - circleRect.top;
    });

    $(document).on("mousemove", function(e) {
      if (isBoxDragging && activeBox) {
        const containerRect = container[0].getBoundingClientRect();
        const newX = e.clientX - containerRect.left - boxStartX;
        const newY = e.clientY - containerRect.top - boxStartY;
        if (newX >= 0 && newX + activeBox.width() <= container.width() && newY >= 0 && newY + activeBox.height() <= container.height()) {
          activeBox.css({ left: newX + "px", top: newY + "px" });
        }
      }

      if (isCircleDragging && activeCircle) {
        const containerRect = container[0].getBoundingClientRect();
        const circleCenterX = circleStartX;
        const circleCenterY = circleStartY;
        const newAngle = Math.atan2(e.clientY - circleCenterY, e.clientX - circleCenterX) - circleStartAngle;
        const newLeft = e.clientX - containerRect.left - circleStartX;
        const newTop = e.clientY - containerRect.top - circleStartY;
        if (newLeft >= 0 && newLeft + activeCircle.width() <= container.width() && newTop >= 0 && newTop + activeCircle.height() <= container.height()) {
          activeCircle.css({ transform: `translate(${newLeft}px, ${newTop}px) rotate(${newAngle}rad)` });
        }
      }
    });

    $(document).on("mouseup", function() {
      isBoxDragging = false;
      isCircleDragging = false;
      activeBox = null;
      activeCircle = null;
    });

    let animationFrame;

    function updateElementPosition() {
    }

    $(document).on("mousemove", function(e) {
      if (isBoxDragging) {
      }

      if (isCircleDragging) {
      }

      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateElementPosition);
    });

    setInterval(resetBoxAndCirclePositions, 2000);
  });
