document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os containers de stats
    const allStats = document.querySelectorAll('.stats');

    allStats.forEach(statsContainer => {
        // Para cada bloco de stats, encontra os botões e valores
        const buttons = statsContainer.querySelectorAll('button');

        buttons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Cada botão está próximo a um <p> que mostra o valor
                const valueElement = btn.parentElement.querySelectorAll('p')[1]; // Segundo <p> do pai
                let value = parseInt(valueElement.textContent);

                // Se botão for "-", diminui. Se for "+", aumenta.
                if (btn.textContent.trim() === '-') {
                    value = Math.max(0, value - 1); // Evita valores negativos
                } else if (btn.textContent.trim() === '+') {
                    value += 1;
                }

                valueElement.textContent = value;
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const personagens = document.querySelectorAll(".pers1");

    personagens.forEach((pers, index) => {
        const nomeInput = pers.querySelector("input");
        const statFields = pers.querySelectorAll(".stats > div");

        // Carrega os dados do localStorage
        const data = JSON.parse(localStorage.getItem(`personagem${index}`));
        if (data) {
            nomeInput.value = data.nome;
            statFields.forEach((field, i) => {
                const valor = field.querySelectorAll("p")[1]; // o segundo <p>
                valor.textContent = data.stats[i];
            });
        }

        // Salvar nome
        nomeInput.addEventListener("input", () => {
            savePersonagem(index);
        });

        // Configurar botões de + e -
        statFields.forEach((field, i) => {
            const valor = field.querySelectorAll("p")[1]; // o segundo <p>
            const minus = field.querySelectorAll("button")[0];
            const plus = field.querySelectorAll("button")[1];

            minus.addEventListener("click", () => {
                valor.textContent = Math.max(0, parseInt(valor.textContent) - 1);
                savePersonagem(index);
            });

            plus.addEventListener("click", () => {
                valor.textContent = parseInt(valor.textContent) + 1;
                savePersonagem(index);
            });
        });

        // Função para salvar
        function savePersonagem(idx) {
            const stats = Array.from(statFields).map(field => {
                return parseInt(field.querySelectorAll("p")[1].textContent);
            });

            const dados = {
                nome: nomeInput.value,
                stats: stats
            };

            localStorage.setItem(`personagem${idx}`, JSON.stringify(dados));
        }
    });
});
