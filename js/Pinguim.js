document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.video-tv');
    const content = document.querySelector('.content');
    const binaryBackground = document.getElementById('binary-background');

    // Definindo o tempo de exibição do vídeo em milissegundos (5000ms = 5 segundos)
    const videoDuration = 5000;

    // Após 5 segundos, escondemos o vídeo e mostramos o conteúdo
    setTimeout(function() {
        videoContainer.style.display = 'none'; // Esconde o vídeo
        content.style.display = 'block'; // Mostra o conteúdo
    }, videoDuration);

    // Função para gerar uma linha binária
    function generateBinaryLine() {
        let line = '';
        for (let i = 0; i < 100; i++) { // 100 números binários
            line += Math.floor(Math.random() * 2); // Gera 0 ou 1
        }
        return line;
    }

    // Função para animar a linha binária
    function animateBinary() {
        const line = generateBinaryLine();
        const div = document.createElement('div');
        div.textContent = line;
        div.style.position = 'absolute';
        div.style.left = Math.random() * 100 + 'vw'; // Posição horizontal aleatória
        div.style.top = '-20px'; // Começa acima da tela
        binaryBackground.appendChild(div);

        // Animação
        const interval = setInterval(() => {
            div.style.top = (parseFloat(div.style.top) + 2) + 'px'; // Move para baixo
            if (parseFloat(div.style.top) > window.innerHeight) { // Remove o div quando sair da tela
                clearInterval(interval);
                div.remove();
            }
        }, 50); // Ajuste a velocidade da animação
    }

    // Gera uma nova linha a cada 500 ms
    setInterval(animateBinary, 500);
});
