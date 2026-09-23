(function () {
  // 1. TIME-OF-DAY BACKGROUND TINT
  function applyTimeTint() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return;
    var hour = new Date().getHours() + new Date().getMinutes() / 60;
    var stops = [
      [0,   242,239,232,0.00],
      [5,   242,239,232,0.00],
      [6,   255,220,180,0.08],
      [8,   255,235,200,0.05],
      [12,  230,245,255,0.04],
      [15,  242,239,232,0.00],
      [17,  255,210,160,0.07],
      [19,  240,190,150,0.09],
      [21,  200,180,220,0.06],
      [23,  242,239,232,0.00],
      [24,  242,239,232,0.00],
    ];
    var i = 0;
    while (i < stops.length - 1 && stops[i+1][0] <= hour) i++;
    var s0 = stops[i], s1 = stops[Math.min(i+1, stops.length-1)];
    var t = s1[0] > s0[0] ? (hour - s0[0]) / (s1[0] - s0[0]) : 0;
    var lerp = function(a,b){ return Math.round(a+(b-a)*t); };
    var r=lerp(s0[1],s1[1]), g=lerp(s0[2],s1[2]), b=lerp(s0[3],s1[3]);
    var a=(s0[4]+(s1[4]-s0[4])*t).toFixed(3);
    document.documentElement.style.setProperty('--bg-tint','rgba('+r+','+g+','+b+','+a+')');
  }
  applyTimeTint();
  setInterval(applyTimeTint, 5*60*1000);

  // 2. HERO PARALLAX
  var heroImg = document.querySelector('.hero-image');
  if (heroImg) {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          heroImg.style.transform = 'translateY(' + (window.scrollY * 0.30) + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // 3. POST TITLE HOVER DRIFT
  var titles = document.querySelectorAll('.post-title');
  titles.forEach(function(el) {
    el.style.transition = 'transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94), color 0.15s';
    el.addEventListener('mouseenter', function() { el.style.transform = 'translateX(4px)'; });
    el.addEventListener('mouseleave', function() { el.style.transform = 'translateX(0)'; });
  });
})();
