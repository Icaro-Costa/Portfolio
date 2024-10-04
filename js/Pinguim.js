document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('errorVideo');
    const content = document.querySelector('.content');

    // Definindo o tempo de exibição do vídeo em milissegundos (5000ms = 5 segundos)
    const videoDuration = 5000;

    // Após 5 segundos, escondemos o vídeo e mostramos o conteúdo
    setTimeout(function() {
        document.querySelector('.video-container').style.display = 'none';
        content.style.display = 'block';
    }, videoDuration);
});
