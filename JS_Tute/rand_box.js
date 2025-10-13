let bg={
    0: '#2C3E50',      // Rich navy blue
    1: '#E74C3C',       // Vibrant red-orange
    2: '#27AE60',   // Fresh forest green
    3: '#F39C12',  // Warm golden yellow
    4:'#8E44AD'
}
let c={
    0: '#1ABC9C',      // Balanced blue-green
    1: '#EC7063',     // Warm pink-orange
    2: '#BB8FCE',      // Light purple-pink
    3: '#82B366',          // Muted yellow-green
    4: '#F8C471'          // Soft yellow-orange
}

function random(){
    return Math.round(Math.random()*4);
}
document.querySelectorAll(".box").forEach(el => {
    el.style.backgroundColor = bg[random()];
    el.style.color = c[random()];
})
