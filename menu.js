

const menu = document.getElementById("menu");
Array.from(document.getElementsByClassName("menu-item"))


.forEach((item,index) => {
    item.onmouseover = () => {
        menu.dataset.activeIndex = index;
        menu.classList.add("menu-hovered");
    }

    item.onmouseout = () => {
        menu.classList.remove("menu-hovered");
    }
});

const textContainer = document.querySelector(".text-container");



//Text up and down cursor effect
let currentYAxis = 0;
let velocityY = 0;
const smoothingFactor = .1; // Adjust as needed

// Function to calculate velocity based on mouse movement
function calculateVelocity(target, current, velocity, smoothing) {
  return (target - current) * smoothing + velocity * (1 - smoothing);
}

window.addEventListener("mousemove", (e) => {
  const targetYAxis = (e.clientY / window.innerHeight - 0.5) * 120; // Adjust the multiplier for the desired effect
  velocityY = calculateVelocity(targetYAxis, currentYAxis, velocityY, smoothingFactor);
  currentYAxis += velocityY;
  textContainer.style.transform = `translateY(${currentYAxis}px)`;
});


// Get all menu items and their corresponding videos
const menuItems = document.querySelectorAll(".menu-item");

// Add event listeners to each menu item
menuItems.forEach((menuItem) => {
    menuItem.addEventListener('mouseenter', () => {
        menuItem.querySelector('.circle').style.transform = 'scale(5)';
    });

    menuItem.addEventListener('mouseleave', () => {
        menuItem.querySelector('.circle').style.transform = 'scale(1)';
    });
});

menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent the default link behavior

        // Get the href attribute to determine the target page
        const targetPage = menuItem.getAttribute("href");

        // Add the "page-transition" class to trigger the transition effect
        document.body.classList.add("page-transition");

        // Wait for the transition to complete before navigating to the target page
        setTimeout(() => {
            window.location.href = targetPage;
        }, 500); // Adjust the delay to match your transition duration
    });
});






// Mouse effects
const coords ={x:0,y:0};
const circles = document.querySelectorAll(".circle");
// Select all circles

// Add event listeners to each menu item
menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('mouseenter', () => {
        // Hide all circles
        circles.forEach(circle => {
            circle.style.display = 'none';
        });

        // Show the corresponding circle for the hovered menu item
        const circleToShow = circles[index];
        circleToShow.style.display = 'block';
    });

    menuItem.addEventListener('mouseleave', () => {
        // Show all circles when not hovering
        circles.forEach(circle => {
            circle.style.display = 'block';
        });
    });
});
const colors = ["#51005c", "#58005d", "#6a005e", "#84005e", "#a1005b", "#bf0554", "#d82b49", "#eb4a3c", "#f7672c", "#fd7e1c", "#ff8d0a", "#ff9300"];

circles.forEach(function(circle,index) {
    circle.x=0;
    circle.y=0;
});



window.addEventListener("mousemove",function(e){
    coords.x=e.clientX;
    coords.y=e.clientY;

    
});

function animateCircles(){
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function(circle,index){
        circle.style.left=x-12+"px";
        circle.style.top=y-12+"px";

        circle.style.scale = (circles.length-index) / (circles.length);

        circle.x=x;
        circle.y=y;

        const nextCircle = circles[index +1] || circles[0];
        x+= (nextCircle.x - x)* 0.4;
        y+= (nextCircle.y - y)* 0.4;
    });
    requestAnimationFrame(animateCircles);
}

animateCircles();


const menuVideos = document.querySelectorAll(".menu-video");

let activeVideoIndex = -1; // Initialize to -1 to indicate no active video


menuItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
        // Pause and hide the currently active video
        if (activeVideoIndex !== -1) {
            menuVideos[activeVideoIndex].pause();
            menuVideos[activeVideoIndex].style.display = "none";
        }

        // Play and display the video associated with the hovered item
        const currentVideo = menuVideos[index];
        currentVideo.style.display = "block";
        currentVideo.currentTime = 0; // Reset playback to the start
        currentVideo.play();
        activeVideoIndex = index; // Update the active video index
    });

    item.addEventListener("mouseleave", () => {
        // No need to pause or hide videos on mouseleave; they will keep playing
    });
});
const blueInVideo = document.querySelector("#menu-video-blue-in");
const blueConstantVideo = document.querySelector("#menu-video-blue-constant");

// Flag to track if we've switched to the constant video
let switchedToConstant = false;

// Add an event listener to the "blue_in" video for when it ends
blueInVideo.addEventListener("ended", () => {
    if (!switchedToConstant) {
        // Pause and hide the "blue_in" video
        blueInVideo.pause();
        blueInVideo.style.display = "none";

        // Show and play the "blue_constant" video
        blueConstantVideo.style.display = "block";
        blueConstantVideo.currentTime = 0; // Reset playback to the start
        blueConstantVideo.play();

        // Update the flag
        switchedToConstant = true;
    }
});

// Add an event listener to the "blue_constant" video for when it ends
blueConstantVideo.addEventListener("ended", () => {
    // Pause and hide the "blue_constant" video
    blueConstantVideo.pause();
    blueConstantVideo.style.display = "none";

    // Show and play the "blue_in" video
    blueInVideo.style.display = "block";
    blueInVideo.currentTime = 0; // Reset playback to the start
    blueInVideo.play();

    // Update the flag
    switchedToConstant = false;
});const drag = {
  src:   null,
  items: $demo.querySelectorAll(':scope > li'),
}

function handleDrop(e) {
  e?.stopPropagation()

  if (drag.src != this) {
    if (document.startViewTransition)
      document.startViewTransition(() => 
        swapSiblings(drag.src, this))
    else 
      swapSiblings(drag.src, this)
  }
}

function handleDragStart(e) {
  requestAnimationFrame(() => {
    this.style.opacity = '.4'
  })
  e.dataTransfer.setData("text/html", this.outerHTML)
  drag.src = this
  // e.dataTransfer.effectAllowed = 'move'
}

function handleDragOver(e) {
  e?.preventDefault()
  // e.dataTransfer.dropEffect = 'move'
}

function handleDragEnter(e) {
  this.classList.add('over')
}

function handleDragLeave(e) {
  this.classList.remove('over')
}

function handleDragEnd(e) {
  this.style.opacity = '1'

  drag.items.forEach(item => {
    item.classList.remove('over')
  })
}

function swapSiblings(sib1, sib2) {
  let p1 = sib1.previousSibling
  let p2 = sib2.previousSibling

  p1.after(sib2)
  p2.after(sib1)
}

drag.items.forEach(item => {
  item.addEventListener('dragstart', handleDragStart, false)
  item.addEventListener('dragenter', handleDragEnter, false)
  item.addEventListener('dragover', handleDragOver, false)
  item.addEventListener('dragleave', handleDragLeave, false)
  item.addEventListener('drop', handleDrop, false)
  item.addEventListener('dragend', handleDragEnd, false)
})

// Function to load the calculator HTML and CSS
function loadCalculator() {
  const calculatorContainer = document.getElementById('calculator-container');
  
  // Load HTML content (assuming you have the calculator's HTML in a variable)
  // Replace 'calculatorHTML' with your actual HTML content
  calculatorContainer.innerHTML = calculatorHTML;

  // Load Calculator Styles (assuming you have the SCSS compiled as CSS)
  const calculatorStyles = document.createElement('link');
  calculatorStyles.rel = 'stylesheet';
  calculatorStyles.href = 'calculator.css'; // Replace with the correct path
  document.head.appendChild(calculatorStyles);
}

// Call the function to load the calculator when needed (e.g., on scroll)
// You can use a scroll event listener to trigger this.
// Example:
window.addEventListener('scroll', () => {
  const calculatorContainer = document.getElementById('calculator-container');
  const calculatorOffset = calculatorContainer.getBoundingClientRect().top;

  // Load the calculator when it comes into view
  if (calculatorOffset < window.innerHeight) {
      loadCalculator();
  }
});
