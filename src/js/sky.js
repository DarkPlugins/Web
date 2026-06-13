(function(){
  const sky = document.getElementById('sky');
  const balloonFiles = [
    'src/img/ballons/ballons_1.png',
    'src/img/ballons/ballons_2.png'
  ];

  const spawnIntervalMs = 2500;
  const maxBalloons = 25;
  const minDuration = 9000;
  const maxDuration = 20000;
  const minScale = 0.6;
  const maxScale = 1.3;

  function rand(min, max){ return Math.random() * (max - min) + min; }
  function choose(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

  function createBalloon(){
    if (sky.children.length >= maxBalloons) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'balloon';

    const img = document.createElement('img');
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'block';
    img.draggable = false;
    img.alt = 'Ballon';
    img.src = choose(balloonFiles);

    // Random start position, size, duration, drift, rotation
    const leftPct = rand(2, 95);
    const scale = rand(minScale, maxScale).toFixed(2);
    const duration = Math.floor(rand(minDuration, maxDuration));
    const delay = Math.floor(rand(0, 1200));
    const drift = Math.floor(rand(-120, 120)) + 'px';
    const rot = Math.floor(rand(-12,12)) + 'deg';

    wrapper.style.left = leftPct + '%';
    wrapper.style.setProperty('--scale', scale);
    wrapper.style.setProperty('--drift', drift);
    wrapper.style.setProperty('--rot', rot);
    wrapper.style.animation = `rise ${duration}ms linear ${delay}ms forwards`;
    wrapper.style.zIndex = String(1000 - Math.floor(scale * 100));

    wrapper.appendChild(img);
    sky.appendChild(wrapper);

    setTimeout(()=> {
      if (wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
    }, duration + delay + 500);
  }

  let spawnTimer = setInterval(createBalloon, spawnIntervalMs);

    // Visibility change: pause/resume
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(spawnTimer);
    else {
      clearInterval(spawnTimer);
      spawnTimer = setInterval(createBalloon, spawnIntervalMs);
    }
  });

  // Generate the first pair of balloons immediately (visual feedback)
  for (let i=0;i<6;i++) setTimeout(createBalloon, i*200);
})();