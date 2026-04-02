function carregarRelatos() {
    const relatos = JSON.parse(localStorage.getItem("relatos")) || [];
    const lista = document.getElementById("lista-relatos");
    lista.innerHTML = "";

    if (relatos.length === 0) {
        lista.innerHTML = "<p style='text-align:center; color:#999;'>Nenhum relato publicado ainda.</p>";
        return;
    }

    const scrollTrack = document.createElement("div");
    scrollTrack.classList.add("scroll-track");

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
                    <div class="botoes-adm">
                        <button class="btn-editar" onclick="editarRelato(${i})">Editar</button>
                        <button class="btn-excluir" onclick="deletarRelato(${i})">Excluir</button>
                    </div>
                </div>
            </article>
        `;
    };

    const conteudoCards = relatos.map((r, i) => criarCard(r, i)).join('');
    
    scrollTrack.innerHTML = conteudoCards + conteudoCards;
    
    lista.appendChild(scrollTrack);
}

document.getElementById("formRelato").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const botao = document.querySelector('.btn-enviar');
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const texto = document.getElementById("texto").value;

    botao.textContent = "Publicando...";
    botao.disabled = true;

    setTimeout(() => {
        const relatos = JSON.parse(localStorage.getItem("relatos")) || [];
        
        relatos.push({ 
            nome, 
            idade, 
            texto, 
            data: new Date().toLocaleDateString("pt-BR") 
        });

        localStorage.setItem("relatos", JSON.stringify(relatos));

        e.target.reset(); 
        botao.textContent = "Publicar Relato";
        botao.disabled = false;

        alert("Relato publicado com sucesso!");
        carregarRelatos(); 
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

document.addEventListener("DOMContentLoaded", carregarRelatos);