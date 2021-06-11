<template>
  <div class="marquee js-marquee mb-50">
    <div class="marquee-wrapper js-marquee-wrapper" reverse>
      <h1  style="line-height: 0"><p :class="{'color-green':is_index}"><span>&#10072;</span>{{text}}</p></h1>

    </div>
  </div>
</template>

<script>
export default {
  props:['text','is_index'],
  data() {
    return {}
  },
  mounted() {
    let marquee = { elements: {} }, globals = {}, requiredReps = 0;

    marquee.init = function() {
        Object.keys(marquee.elements).forEach(function(key) {

            var textEl = marquee.elements[key].getElementsByTagName('p')[0];
            var parentEl = 	textEl.parentNode;
            var requiredReps = (textEl.clientWidth > globals.width ? 2 : ( Math.ceil( globals.width / textEl.clientWidth ) + 1));

            for (let i = 0; i < requiredReps; i++) {
                var dupEl = textEl.cloneNode(true);
                parentEl.appendChild(dupEl);
            }

            marquee.animate(marquee.elements[key]);
        });
    }

    marquee.setup = function(cb){
        globals.width = document.documentElement.clientWidth;

        marquee.elements = document.getElementsByClassName('js-marquee');

        if(cb !== undefined && typeof cb === 'function') {
            cb();
        }
    }

    marquee.animate = function(row) {
        var progress = 0;
        var wrapper = row.getElementsByClassName('js-marquee-wrapper')[0];
        var speed = wrapper.getAttribute('reverse') !== null ? -1 : 1;

        var start = null;

        function step(timestamp) {

            progress	= progress + 1 * speed;

            if(progress ===  globals.width * speed) {
                progress = 0;
            }

            wrapper.style.transform = 'translate('+ progress +'px, 0px) translateZ(0px)';

            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    };
    marquee.setup(marquee.init);
  },
}
</script>


