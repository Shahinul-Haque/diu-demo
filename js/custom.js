
/*!
 * classie v1.0.0
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );



function init() {
        window.addEventListener('scroll', function(e){
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 300,
                header = document.querySelector("header");
            if (distanceY > shrinkOn) {
                classie.add(header,"smaller");
            } else {
                if (classie.has(header,"smaller")) {
                    classie.remove(header,"smaller");
                }
            }
        });
    }
    window.onload = init();



/*-- mega menu --*/
$(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');       
        }
    );
});





$(document).ready(function() {
  $('#media').carousel({
    pause: true,
    interval: false,
  });
});





(function($) {
  $.simpleTicker =function(element, options) {
    var defaults = {
      speed : 1000,
      delay : 3000,
      easing : 'swing',
      effectType : 'slide'
    }

    var param = {
      'ul' : '',
      'li' : '',
      'initList' : '',
      'ulWidth'  : '',
      'liHeight' : '',
      'tickerHook' : 'tickerHook',
      'effect' : {}
    }

    var plugin = this;
        plugin.settings = {}

    var $element = $(element),
        element = element;

    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      param.ul = element.children('ul');
      param.li = element.find('li');
      param.initList = element.find('li:first');
      param.ulWidth  = param.ul.width();
      param.liHeight = param.li.height();

      element.css({height:(param.liHeight)});
      param.li.css({top:'0',left:'0',position:'absolute'});

      //dispatch
      switch (plugin.settings.effectType) {
        case 'fade':
          plugin.effect.fade();
          break;
        case 'roll':
          plugin.effect.roll();
          break;
        case 'slide':
          plugin.effect.slide();
          break;
      }
      plugin.effect.exec();
    }

    plugin.effect = {};

    plugin.effect.exec = function() {
      param.initList.css(param.effect.init.css)
                    .animate(param.effect.init.animate,plugin.settings.speed,plugin.settings.easing)
                    .addClass(param.tickerHook);
      if (element.find(param.li).length > 1) {
        setInterval(function(){
          element.find('.' + param.tickerHook)
                 .animate(param.effect.start.animate,plugin.settings.speed,plugin.settings.easing)
                 .next()
                 .css(param.effect.next.css)
                 .animate(param.effect.next.animate,plugin.settings.speed,plugin.settings.easing)
                 .addClass(param.tickerHook)
                 .end()
                 .appendTo(param.ul)
                 .css(param.effect.end.css)
                 .removeClass(param.tickerHook);
        },plugin.settings.delay);
      }
    }

    plugin.effect.fade = function() {
      param.effect = {
        'init' : {
          'css' : {display:'block',opacity:'0'},
          'animate' : {opacity:'1',zIndex:'98'}
        },
        'start' : {
          'animate' : {opacity:'0'}
        },
        'next' : {
          'css' : {display:'block',opacity:'0',zIndex:'99'},
          'animate' : {opacity:'1'}
        },
        'end' : {
          'css' : {display:'none',zIndex:'98'}
        }
      }
    }

    plugin.effect.roll = function() {
      param.effect = {
        'init' : {
          'css' : {top:'3em',display:'block',opacity:'0'},
          'animate' : {top:'0',opacity:'1',zIndex:'98'}
        },
        'start' : {
          'animate' : {top:'-3em',opacity:'0'}
        },
        'next' : {
          'css' : {top:'3em',display:'block',opacity:'0',zIndex:'99'},
          'animate' : {top:'0',opacity:'1'}
        },
        'end' : {
          'css' : {zIndex:'98'}
        }
      }
    }
  

    plugin.effect.slide = function() {
      param.effect = {
        'init' : {
          'css' : {left:(200),display:'block',opacity:'0'},
          'animate' : {left:'0',opacity:'1',zIndex:'98'}
        },
        'start' : {
          'animate' : {left:(-(200)),opacity:'0'}
        },
        'next' : {
          'css' : {left:(param.ulWidth),display:'block',opacity:'0',zIndex:'99'},
          'animate' : {left:'0',opacity:'1'}
        },
        'end' : {
          'css' : {zIndex:'98'}
        }
      }
    }

    plugin.init();
  }

  $.fn.simpleTicker = function(options) {
    return this.each(function() {
      if (undefined == $(this).data('simpleTicker')) {
        var plugin = new $.simpleTiecker(this, options);
        $(this).data('simpleTicker', plugin);
      }
    });
  }
})(jQuery);



$(function(){
  $.simpleTicker($("#ticker-fade"),{'effectType':'fade'});
  $.simpleTicker($("#ticker-roll"),{'effectType':'roll'});
  $.simpleTicker($("#ticker-slide"),{'effectType':'slide'});
  $.simpleTicker($("#ticker-one-item"),{'effectType':'fade'});
});



requestAnimatonFrame = requestAnimationFrame || webkitRequestAnimaitonFrame || mozRequestAnimationFrame || msRequestAnimationFrame;

// carousel 

var button = null;
var count = 0;
var counter;

carousel ();

function carousel (){
  
  var indexSlide = document.getElementsByClassName("slide");
    for (var i = 0; i < indexSlide.length; i++ ){
       indexSlide[i].classList.remove("active"); 
    };
  
  count++;
  
  if (count > indexSlide.length) {
    count = 1;
    
    indexSlide[count - 1].classList.add("active");
    } else {
    indexSlide[count - 1].classList.add("active");
  };
};

function newCarousel(button){
  
  var indexSlide = document.getElementsByClassName("slide");
    for (var i = 0; i < indexSlide.length; i++ ){
       indexSlide[i].classList.remove("active"); 
  };

  if( button !== null ) {
      indexSlide[button].classList.add("active");
  }
};


// bar - duration

var slideTime = 5; //seconds
var length = slideTime * 1000;
var progressTime = length / 100 ;



//progress bar 

  
window.onload = progressBar;

function progressBar(slideTime){ 

  var start = Date.now();

  var id =  window.setInterval(draw, progressTime);

  var target = document.getElementsByClassName("feedback-slider-nav-dot-anim")[count - 1];


  function draw() {
    var delta = 100 * (Date.now() - start) / length;

    if ( delta > 100 ){
        delta = 100;   
        target.style.width = 0 + "px";     
        clearInterval(id); 
    } else {        
      target.style.width = (Math.round(delta) + "%");    
    }
  };    
};


var reId;

function newProgressBar( slideTime, button){ 

  start = Date.now();
  
  reId =  window.setTimeout(reDraw, progressTime);
  

  var newTarget = document.getElementsByClassName("feedback-slider-nav-dot-anim")[button];
  var resetTarget = document.getElementsByClassName("feedback-slider-nav-dot-anim");

  function reDraw() {
    
    delta = 100 * (Date.now() - start) / length;
  
    if ( delta > 100 ){
      delta = 100;   
        newTarget.style.width = 0 + "px";  
        clearTimeout(reId); 
      } else {           
        for(var j = 0; j < resetTarget.length ; j++ ){          
        resetTarget[j].style.width =  0 + "%";
      }        
      newTarget.style.width = (Math.round(delta) + "%");
      requestAnimationFrame(reDraw);
      }
    };
};

// nav-dot click

function click(e) {

  if ( e.target && e.target.nodeName == 'LI' ) {
      var click = document.getElementById('slider-dots');
      for (var h = 0, len = click.children.length; h < len; h++){
        (function(button){
          click.children[h].onclick = function(){
                count = button + 1;   
                stopLoop();                          
                newCarousel(button);                 
                clearTimeout(reId);
                newProgressBar(slideTime, button);          
                loop();                     
          };   
        })(h);
      }
  };
 
};
window.document.querySelector('.feedback-slider-nav-wrapper').addEventListener( 'click', click, true);
// window.document.querySelector('.feedback-slider-nav-wrapper').removeEventListener( 'click', click, true);

var set;
function loop(){
  set = window.setTimeout( function ouy (){
      carousel();
      progressBar(slideTime);
      set = setTimeout(ouy, length);       
    },length);
  };
loop();

function stopLoop() {
    clearTimeout(set);
};
//  // get browser width
 window.addEventListener("resize", resized);
  function resized(){
    var index = document.getElementsByClassName("feedback-image-wrapper");
     if ( window.innerWidth > 1230 ){
       
         var wpicf = this.innerWidth / 2 + 102.5;
        
         for (var i = 0; i < index.length; i++ ){
            index[i].style.width = wpicf + "px";
         }
       } else {
        
         wpicf = ((this.innerWidth * 7) / 12) - 5;
       
         for ( i = 0; i < index.length; i++ ){
            index[i].style.width = wpicf + "px";
         }
       }
  }





(function( $ ) {

    //Function to animate slider captions 
    function doAnimations( elems ) {
        //Cache the animationend event in a variable
        var animEndEv = 'webkitAnimationEnd animationend';
        
        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }
    
    //Variables on page load 
    var $myCarousel = $('#carousel-example-generic'),
        $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        
    //Initialize carousel 
    $myCarousel.carousel();
    
    //Animate captions in first slide on page load 
    doAnimations($firstAnimatingElems);
    
    //Pause carousel  
    $myCarousel.carousel('pause');
    
    
    //Other slides to be animated on carousel slide event 
    $myCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });  
    $('#carousel-example-generic').carousel({
        interval:2000,
        pause: "false"
    });
    
})(jQuery); 

