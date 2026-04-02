document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll("[data-include]");
    
    elements.forEach(el => {
        const file = el.getAttribute("data-include");
        fetch(file)
            .then(response => {
                if (response.ok) return response.text();
                throw new Error("Erro ao carregar componente");
            })
            .then(data => {
                el.innerHTML = data;
            })
            .catch(err => console.error(err));
    });
});

function enviarSocorro() {
    const confirmacao = confirm("Deseja enviar um pedido de socorro silencioso com sua localização atual?");
    if (confirmacao) {
        alert("Pedido enviado com sucesso. Mantenha a calma, a ajuda está a caminho.");
    }
}