function carregarRelatos() {
    const relatos = JSON.parse(localStorage.getItem("relatos")) || [];
    const lista = document.getElementById("lista-relatos");
    lista.innerHTML = "";

    if (relatos.length === 0) return;

    // Criamos um "palco" para o movimento
    const scrollTrack = document.createElement("div");
    scrollTrack.classList.add("scroll-track");

    // Função para criar o card
    const criarCard = (r, i) => {
        return `
            <article class="relato-card">
                <div class="relato-header">
                    <span class="user-anonimo"><strong>${r.nome || "Anônima"}</strong>${r.idade ? ", " + r.idade + " anos" : ""}</span>
                    <span class="data-relato">${r.data}</span>
                </div>
                <p class="relato-texto">"${r.texto}"</p>
                <div class="relato-footer-acoes">
                    <span class="tag-superacao">Superação</span>
                </div>
            </article>
        `;
    };

    // Para o loop ser infinito, precisamos de pelo menos dois conjuntos de cards
    const conteudoCards = relatos.map((r, i) => criarCard(r, i)).join('');
    
    // Inserimos duas vezes para criar a ilusão de continuidade
    scrollTrack.innerHTML = conteudoCards + conteudoCards;
    
    lista.appendChild(scrollTrack);
}

// No seu arquivo relatos.js
document.getElementById("formRelato").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const botao = document.querySelector('.btn-enviar');
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const texto = document.getElementById("texto").value;

    // Bloqueia o botão para evitar cliques múltiplos acidentais
    botao.textContent = "Publicando...";
    botao.disabled = true;

    // Simula o tempo de envio
    setTimeout(() => {
        const relatos = JSON.parse(localStorage.getItem("relatos")) || [];
        
        relatos.push({ 
            nome, 
            idade, 
            texto, 
            data: new Date().toLocaleDateString("pt-BR") 
        });

        localStorage.setItem("relatos", JSON.stringify(relatos));

        e.target.reset(); // Limpa os campos
        botao.textContent = "Publicar Relato";
        botao.disabled = false;

        alert("Relato publicado com sucesso!");
        carregarRelatos(); // Atualiza a lista na tela
    }, 1000);
});

// Editar relato
function editarRelato(index) {
    const relatos = JSON.parse(localStorage.getItem("relatos"));
    const novoTexto = prompt("Edite seu relato:", relatos[index].texto);
    
    if (novoTexto !== null && novoTexto.trim() !== "") {
        relatos[index].texto = novoTexto;
        localStorage.setItem("relatos", JSON.stringify(relatos));
        carregarRelatos();
    }
}

// Deletar relato
function deletarRelato(index) {
    if (confirm("Tem certeza que deseja excluir este relato?")) {
        const relatos = JSON.parse(localStorage.getItem("relatos"));
        relatos.splice(index, 1);
        localStorage.setItem("relatos", JSON.stringify(relatos));
        carregarRelatos();
    }
}

// Inicializar ao carregar a página
document.addEventListener("DOMContentLoaded", carregarRelatos);