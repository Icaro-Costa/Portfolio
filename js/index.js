document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.getElementById('snowContainer');
    const button = document.getElementById('toggleSnowButton');
    let snowActive = false;

    function createSnowflakes() {
        snowContainer.innerHTML = ''; 
        const numFlakes = 100; 
        for (let i = 0; i < numFlakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDuration = `${Math.random() * 3 + 5}s`;
            snowflake.style.animationDelay = `${Math.random() * 10}s`;
            snowflake.style.width = `${Math.random() * 10 + 5}px`;
            snowflake.style.height = snowflake.style.width; // Mantém a forma redonda
            snowContainer.appendChild(snowflake);
        }
    }

    button.addEventListener('click', () => {
        snowActive = !snowActive;

        if (snowActive) {
            snowContainer.style.display = 'block';
            createSnowflakes();
            button.textContent = 'Desativar Neve';
        } else {
            snowContainer.style.display = 'none';
            button.textContent = 'Ativar Neve';
        }
    });
});
