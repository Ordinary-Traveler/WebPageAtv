// Carregar relatos do LocalStorage
function carregarRelatos() {
    const relatos = JSON.parse(localStorage.getItem("relatos")) || [];
    const lista = document.getElementById("lista-relatos");
    lista.innerHTML = "";

    relatos.forEach((r, i) => {
        const card = document.createElement("article");
        card.classList.add("relato-card");
        card.innerHTML = `
            <div class="relato-header">
                <span class="user-anonimo"><strong>${r.nome || "Anônima"}</strong>${r.idade ? ", " + r.idade + " anos" : ""}</span>
                <span class="data-relato">${r.data}</span>
            </div>
            <p class="relato-texto">"${r.texto}"</p>
            <div class="relato-footer-acoes">
                <span class="tag-superacao">Superação</span>
                <div class="botoes-adm">
                    <button class="btn-editar" onclick="editarRelato(${i})">Editar</button>
                    <button class="btn-excluir" onclick="deletarRelato(${i})">Excluir</button>
                </div>
            </div>
        `;
        lista.appendChild(card);
    });
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