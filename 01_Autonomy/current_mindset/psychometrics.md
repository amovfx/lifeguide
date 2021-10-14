#Psychometric testing

Psychometric testing is a fancy way of saying “personality test.” As stated earlier, 
it’s full-blown pseudoscience. Yet, what they do give insight into is a wide variety of personality 
traits and behaviors which you may discover about yourself. When you do these tests, you will identify some behaviors 
you do, and it will help you label your actions with emotions. It will give insight into who you are, but take 
all these tests with a grain of salt. One different answer to the questions can give you 
different results. Your personality is not fixed at birth, and you can change anything about yourself that you want to.
There are a variety of tests that you can do to learn more about yourself.

These tests measure personality attributes. Ideal for dating sites and  corporations training comunication and teamwork. 
Even though they are a bit like reading a horoscope, you 
can use these to gain insight into your strengths and weaknesses. They are helpful for identifying and labeling your behaviour.
You can search for tests like the “Ocean Model”, RHETI or Meyers Briggs. 

Keep in mind, personality is not fixed, it is fluid and you can shape yourself into whom you want to be.

<script>
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            window.location.href = "http://www.w3schools.com"
        } else {
            window.location.href = "http://www.google.com"
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
        } else { 
            /* up swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
</script>




