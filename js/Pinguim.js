document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.video-tv');
    const content = document.querySelector('.content');
    const binaryBackground = document.getElementById('binary-background');

 
    function generateBinaryLine() {
        let line = '';
        for (let i = 0; i < 100; i++) { 
            line += Math.floor(Math.random() * 2); 
        }
        return line;
    }


    function animateBinary() {
        const line = generateBinaryLine();
        const div = document.createElement('div');
        div.textContent = line;
        div.style.position = 'absolute';
        div.style.left = Math.random() * 100 + 'vw'; 
        div.style.top = '-20px'; 
        binaryBackground.appendChild(div);

        const interval = setInterval(() => {
            div.style.top = (parseFloat(div.style.top) + 2) + 'px';
            if (parseFloat(div.style.top) > window.innerHeight) {
                clearInterval(interval);
                div.remove();
            }
        }, 50); 
    }

  
    setInterval(animateBinary, 800);
});
