
const line1 = document.querySelectorAll(".lineimg")
Array.prototype.map.call(line1,(key,index) =>{
    
    key.onmousedown = e => handleOnDown(e);

    key.ontouchstart = e => handleOnDown(e.touches[0]);

    key.onmouseup = e => handleOnUp(e);

    key.ontouchend = e => handleOnUp(e.touches[0]);

    key.onmousemove = e => handleOnMove(e);

    key.ontouchmove = e => handleOnMove(e.touches[0]);


    const track = key
    
    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
    
    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";  
      track.dataset.prevPercentage = track.dataset.percentage;
    }
    
    const handleOnMove = e => {
      if(track.dataset.mouseDownAt === "0") return;
      
      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;
      
      const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      track.dataset.percentage = nextPercentage
      
      
      track.animate({
        transform: `translate(${nextPercentage}%, ${index*110-50}%)`
      }, { duration: 1200, fill: "forwards" });
      
      for(const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
      }
    }
})


/* -- Had to add extra lines for touch events -- */
