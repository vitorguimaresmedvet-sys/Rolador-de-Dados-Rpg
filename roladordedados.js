/*================================================
=        ROLADOR DE DADOS RPG — CORE JS          =
================================================*/

/*================================================
=              RPG TOOLKIT ENGINE                =
================================================*/

const RPGToolkit = {

    rolarDado(lados) {
        return Math.floor(Math.random() * lados) + 1;
    },

    rolarDados(qtd, lados) {

        let resultados = [];
        let soma = 0;
        for (let i = 0; i < qtd; i++) {

            let r = RPGToolkit.rolarDado(lados);

            resultados.push(r);
            soma += r;

            /* exploding dice
            if (parte.includes("!")) {
        
                while (r === dado) {
        
                    r = RPGToolkit.rolarDado(dado);
        
                    resultados.push(r);
                    soma += r;
        
                }
        
            }*/

        }
        /*for (let i = 0; i < qtd; i++) {

            const r = this.rolarDado(lados);

            resultados.push(r);
            soma += r;

        }*/

        return { resultados, soma };

    }

};


/*================================================
=              VARIÁVEIS GLOBAIS                 =
================================================*/


let ultimoResultado = null;
let ultimaExpressao = null;
const resultadoTexto = document.getElementById("resultadoTexto");
let modoOculto = false;
let macrosUsuario = {};
const tabelasRpg = {};

/*================================================
=               EVENTOS DA INTERFACE             =
================================================*/

document.getElementById("btnReroll").addEventListener("click", function () {

    if (ultimaExpressao) {
        executarExpressaoUI(ultimaExpressao);
        //rolarExpressao(ultimaExpressao);
    }

});

/*document.getElementById("btnReroll").addEventListener("click", function () {

    if (ultimaExpressao) {
        document.getElementById("expressao").value = ultimaExpressao;
        roladorDeDados();
    }

});*/

const seletorDados = document.getElementById("dados");
const inputCustom = document.getElementById("ladosCustom");

seletorDados.addEventListener("change", function () {

    if (this.value === "custom") {
        inputCustom.style.display = "block";
    } else {
        inputCustom.style.display = "none";
    }

});
/*if (ultimaExpressao) {
            rolarExpressao(ultimaExpressao);
        };*/


/*================================================
=           PARSER DE EXPRESSÕES RPG             =
================================================*/

function rolarExpressao(expr = null) {
    let expressao = (expr || document.getElementById("expressao").value).trim().toLowerCase();

    //let expressao = (expr || document.getElementById("expressao").value).replace(/\s+/g, "").toLowerCase();

    if (expressao === "/help") {
        mostrarAjuda();
        return null;
    }

    if (expressao === "/clear") {

        limparResultado();
        return null;

    }

    if (expressao === "/stats") {

        const stats = JSON.parse(localStorage.getItem("statsDados"));

        alert("Total de rolagens: " + stats.totalRolagens);

        return null;

    }
    if (expressao.startsWith("/npc")) {

        const partes = expressao.split(" ");

        if (partes[1] === "ext") {

            window.open("https://negatherium.com/npc-generator/", "_blank");

            return null;

        }

        const npc = gerarNPC();

        alert("🎲 NPC Gerado:\n\n" + npc);

        return null;

    }

    /*if (expressao.startsWith("/npc")) {

        const npc = gerarNPC();

        alert("🎲 NPC Gerado:\n\n" + npc);

        return null;

    }*/

    if (expressao.startsWith("/nomes")) {

        const partes = expressao.split(" ");

        if (partes[1] === "ext") {

            window.open("https://www.geradornomes.botecodigital.dev.br", "_blank");

            return null;

        }

        const qtd = parseInt(partes[1]) || 1;

        const nomes = gerarNomes(qtd);

        resultadoTexto.innerHTML =
            `🎲 Nomes gerados:<br><br>${nomes.join("<br>")}`;
        //alert("🎲 Nomes gerados:\n\n" + nomes.join("\n"));

        return null;

    }
    /*if (expressao.startsWith("/nomes")) {

        const partes = expressao.split(" ");

        const qtd = parseInt(partes[1]) || 1;

        const nomes = gerarNomes(qtd);

        alert("🎲 Nomes gerados:\n\n" + nomes.join("\n"));

        return null;

    }*/

    if (expressao.startsWith("/dungeon")) {

        const partes = expressao.split(" ");

        if (partes[1] === "ext") {

            window.open("https://watabou.github.io/dungeon.html", "_blank");

            return null;

        }

        const dungeon = gerarDungeon();

        alert("🏰 Dungeon gerada:\n" + dungeon);

        return null;

    }

    if (expressao === "/ficha") {

        gerarFichaRapida();

        return null;

    }

    if (expressao === "/hist") {

        alert("Histórico disponível na tela.");

        return null;

    }

    const tabelas = {

        tesouro: [
            "Poção de Cura",
            "100 moedas de ouro",
            "Espada mágica",
            "Mapa misterioso",
            "Anel encantado"
        ]

    };

    if (tabelas[expressao]) {

        const lista = tabelas[expressao];
        const r = Math.floor(Math.random() * lista.length);

        alert("🎲 Resultado da tabela: " + lista[r])

        return null;

    } 

    let nomeRolagem = "";

    if (macros[expressao]) {
        expressao = macros[expressao];
    }
    if (macrosUsuario[expressao]) {

        expressao = macrosUsuario[expressao];
    }
    if (expressao.startsWith("/monstro") || expressao.startsWith("/tesouro") || expressao.startsWith("/encontro ") || expressao.startsWith("/tesouroRaro") || expressao.startsWith("/npc") || expressao.startsWith("/nomes") || expressao.startsWith("/dungeon")) {
        const nome = expressao.replace("/monstro", "").replace("/tesouro", "").replace("/encontro", "").replace("/tesouroRaro", "").replace("/npc", "").replace("/nomes", "").replace("/dungeon", "").trim();
        const url = "https://2014.5e.tools/bestiary.html#aarakocra_mm" + nome.toLowerCase().replace(/\s+/g, "-");
        const url2 = "https://2014.5e.tools/lootgen.html#lootgen" + nome.toLowerCase().replace(/\s+/g, "-");
        const url3 = "https://2014.5e.tools/encountergen.html#encountergen" + nome.toLowerCase().replace(/\s+/g, "-");
        const url4 = "https://TESOURORARO" + nome.toLowerCase().replace(/\s+/g, "-");
        const url5 = "https://negatherium.com/npc-generator/" + nome.toLowerCase().replace(/\s+/g, "-");
        const url6 = "https://www.geradornomes.botecodigital.dev.br" + nome.toLowerCase().replace(/\s+/g, "-");
        const url7 = "https://DUNGEON" + nome.toLowerCase().replace(/\s+/g, "-");

        window.open(url, "_blank");
        window.open(url2, "_blank");
        window.open(url3, "_blank");
        window.open(url4, "_blank");
        window.open(url5, "_blank");
        window.open(url6, "_blank");
        window.open(url7, "_blank");
        return null;
    }

    /*if (tabelasRpg[expressao]) {

        const lista = tabelasRpg[expressao];

        const r = Math.floor(Math.random() * lista.length);

        alert("🎲 " + lista[r]);

        return null;

    }*/
    if (expressao.includes(":")) {

        const partesNome = expressao.split(":");

        nomeRolagem = partesNome[0];

        expressao = partesNome[1];

    }
    if (!expressao) {
        alert("Digite uma expressão.");
        return null;
    }

    const dicePoolMatch = expressao.match(/(\d+)d(\d+)>=(\d+)/);

    if (dicePoolMatch) {

        const qtd = parseInt(dicePoolMatch[1]);
        const dado = parseInt(dicePoolMatch[2]);
        const alvo = parseInt(dicePoolMatch[3]);

        let resultados = [];
        let sucessos = 0;

        for (let i = 0; i < qtd; i++) {

            const r = Math.floor(Math.random() * dado) + 1;

            resultados.push(r);

            if (r >= alvo) sucessos++;

        }

        return { resultados, soma: sucessos, nomeRolagem: "Dice Pool" };

    }

    const partes = expressao.match(/[+-]?\d*d?\d+/g);
    let validacao = /^([+-]?\d*d\d+|[+-]?\d+)([+-](\d*d\d+|\d+))*$/;

    if (!validacao.test(expressao)) {
        alert("Expressão inválida.");
        return null;
    }

    if (!partes) {
        alert("Expressão inválida.");
        return null;
    }

    let resultados = [];
    let soma = 0;

    //Success/Failure: 1d20>=15 → conta quantos resultados foram 15 ou mais

    const sucessoMatch = expressao.match(/(\d*)d(\d+)>=(\d+)/);

    if (sucessoMatch) {
        const qtd = parseInt(sucessoMatch[1]) || 1;
        const dado = parseInt(sucessoMatch[2]);
        const alvo = parseInt(sucessoMatch[3]);

        let resultados = [];
        let sucessos = 0;

        for (let i = 0; i < qtd; i++) {

            const r = Math.floor(Math.random() * dado) + 1;

            resultados.push(r);

            if (r >= alvo) {
                sucessos++;
            }

        }
        const dadosVisuais = document.getElementById("dadosVisuais");
        dadosVisuais.innerHTML =
            resultados.map(r => `<div class="dado">${r}</div>`).join("");
        return { resultados, soma: sucessos };
    }

    partes.forEach(parte => {

        if (parte.includes("d")) {

            let [qtd, dado] = parte.split("d");

            // trata casos como d20 ou +d20
            if (qtd === "" || qtd === "+") qtd = 1;
            if (qtd === "-") qtd = -1;

            qtd = parseInt(qtd);
            dado = parseInt(dado);

            if (isNaN(dado)) {
                alert("Expressão inválida");
                return null;
            }

            for (let i = 0; i < qtd; i++) {//Exploding dice: 2d6! → se tirar o máximo (6), rola novamente e soma

                let r = Math.floor(Math.random() * dado) + 1;

                resultados.push(r);
                soma += r;
             
                if (parte.includes("!")) {
                    while (r === dado) {

                        r = Math.floor(Math.random() * dado) + 1;
                        resultados.push(r);
                        soma += r;
                    }
                }
                if (parte.includes("r1") && r === 1) {

                    r = Math.floor(Math.random() * dado) + 1;

                    resultados.push(r);
                    soma += r;

                }
            }


        } else {

            soma += parseInt(parte);

        }

    });

    const dadosVisuais = document.getElementById("dadosVisuais");

    dadosVisuais.innerHTML =
        resultados.map(r => `<div class="dado">${r}</div>`).join("");

    //keep highest/lowest 
    const kh = expressao.match(/kh(\d+)/);
    const kl = expressao.match(/kl(\d+)/);

    if (kh) {
        const manter = parseInt(kh[1]);
        resultados.sort((a, b) => b - a);
        resultados = resultados.slice(0, manter);
        soma = resultados.reduce((a, b) => a + b, 0);
    }
    if (kl) {

        const manter = parseInt(kl[1]);

        resultados.sort((a, b) => a - b);

        resultados = resultados.slice(0, manter);

        soma = resultados.reduce((a, b) => a + b, 0);

    }

    /*================================================
    =           VERIFICAÇÃO DE DIFICULDADE           =
    ================================================*/
    const dificuldadeMatch = expressao.match(/>=\d+/);

    if (dificuldadeMatch) {

        const dificuldade = parseInt(dificuldadeMatch[0].replace(">=", ""));

        if (soma >= dificuldade) {

            nomeRolagem += " ✅ Sucesso";

        } else {

            nomeRolagem += " ❌ Falha";

        }

    }


    return { resultados, soma, nomeRolagem };





}; 

/*const dificuldadeMatch = expressao.match(/>=\d+/);

if (dificuldadeMatch) {

    const dificuldade = parseInt(dificuldadeMatch[0].replace(">=", ""));

    const sucesso = soma >= dificuldade;

    const resultadoTexto = document.getElementById("resultadoTexto");

    resultadoTexto.innerHTML += sucesso
        ? `<br>✅ SUCESSO (>= ${dificuldade})`
        : `<br>❌ FALHA (< ${dificuldade})`;

}*/


/*================================================
=                 MACROS RPG                     =
================================================*/

const macros = {
    "/atk": "1d20+5",
    "/dano": "2d6+3",
    "/cura": "1d8+2",
    "/testeForca": "1d20+5",
    "/init": "1d20+2"

};

/* const tabelasRpg = {

    loot: [
        "Poção de Cura",
        "Adaga Enferrujada",
        "10 moedas de ouro",
        "Pergaminho mágico",
        "Chave misteriosa"
    ],

    encontro: [
        "Goblin",
        "Lobo",
        "Mercador viajante",
        "Armadilha escondida",
        "Bando de bandidos"
    ],
    tesouroRaro: [
        "Espada +1",
        "Armadura Élfica",
        "Poção de Invisibilidade",
        "Anel de Proteção",
        "Varinha Arcana"
    ],
    npc: [
        "Camponês",
        "Ferreiro",
        "Guerreiro humano",
        "Mago élfico",
        "Ladino halfling",
        "Clérigo anão",
        "Bardo viajante"
    ],
    nomes: [
        "Arthos",
        "Lyrion",
        "Kael",
        "Valeria",
        "Thorn",
        "Eldric"
    ],
    dungeon: [
        "Sala com goblins",
        "Armadilha de flechas",
        "Câmara com tesouro",
        "Passagem secreta",
        "Sala do chefe"
    ],

};*/

macrosUsuario = JSON.parse(localStorage.getItem("macrosUsuario")) || {};

/*================================================
            FUNCIONAMENTO DAS EXPRESSOES        
================================================*/

function executarExpressaoUI(expr = null) {

    const dados = rolarExpressao(expr);

    if (!dados) return;

    ultimaExpressao = expr || document.getElementById("expressao").value;

    document.getElementById("btnReroll").style.display = "block";

    resultadoTexto.innerHTML =
        `🎲 ${dados.nomeRolagem ? dados.nomeRolagem : "Rolagem"}:<br>
        Dados: [${dados.resultados.join(", ")}]<br>
        <strong>Total: ${dados.soma}</strong>`;

    salvarHistorico(dados.resultados, null, dados.soma, ultimaExpressao);
}

/*function executarExpressaoUI(expr) {
    const dados = rolarExpressao(expr);

    if (!dados) return;

    resultadoTexto.innerHTML =
        `🎲 ${expr}<br>
        Dados: [${dados.resultados.join(", ")}]<br>
        <strong>Total: ${dados.soma}</strong>`;

    salvarHistorico(dados.resultados, null, dados.soma, expr);
}*/

/*================================================
=            GERADOR DE NPC PROCEDURAL           =
================================================*/

function gerarNPC() {

    const nomesNPC = ["Arthos", "Lyrion", "Kael", "Valeria", "Thorn", "Eldric", "Mira", "Dorian", "Selene", "Garrick", "Isolde", "Fenris", "Lyra", "Theron", "Elara", "Riven", "Seraphina", "Draven", "Alaric", "Sylas", "Cassandra", "Lucian", "Rowan", "Elysia", "Darius", "Marina", "Kieran", "Selene", "Gideon", "Aria"];

    const classes = ["Guerreiro", "Mago", "Ladino", "Clérigo", "Bardo", "Ranger", "Paladino", "Feiticeiro", "Druida", "Monge", "Bruxo", "Cavaleiro", "Apotequeiro", "Mercenário", "Ferreiro", "Camponês", "Nobre", "Viajante", "Guarda", "Sacerdote", "Comerciante", "Alquimista"];

    const raças = ["Humano", "Elfo", "Anão", "Halfling", "Orc", "Gnomo", "Meio-Elfo", "Meio-Orc", "Tiefling", "Dragonborn", "Aasimar", "Kenku", "Tabaxi", "Lizardfolk", "Firbolg"];

    const tracos = ["Corajoso", "Astuto", "Leal", "Cruel", "Generoso", "Solitário", "Amigável", "Misterioso", "Impulsivo", "Calculista", "Honesto", "Enganador", "Valente", "Covarde", "Curioso", "Cicatriz no rosto", "Olhos dourados", "Voz rouca", "Muito nervoso", "Fala devagar", "Riso fácil", "Sempre com um plano", "Medo de água", "Acredita em superstições", "Gosta de animais", "Viciado em jogos de azar", "Ama música", "Tem um segredo obscuro", "Busca vingança", "Protege um ente querido", "Tem um mentor importante", "Carrega um item misterioso", "Falante"];

    const nomesNPC2 = nomesNPC[Math.floor(Math.random() * nomesNPC.length)];
    const classe = classes[Math.floor(Math.random() * classes.length)];
    const raça = raças[Math.floor(Math.random() * raças.length)];
    const traco1 = tracos[Math.floor(Math.random() * tracos.length)];
    let traco2;
    do {
        traco2 = Math.floor(Math.random() * tracos.length);
    } while (traco1 === traco2);
    const tracos2 = tracos[traco2];
    return `Nome: ${nomesNPC2}\nClasse: ${classe}\nRaça: ${raça}\nTraços: ${traco1}, ${traco2}`;
}

/*================================================
=            GERADOR DE NOMES PROCEDURAL           =
================================================*/
function gerarNomes(qtd = 1) {

    const base = ["Arthos", "Lyrion", "Kael", "Valeria", "Thorn", "Eldric", "Mira", "Dorian", "Selene", "Garrick", "Isolde", "Fenris", "Lyra", "Theron", "Elara", "Riven", "Seraphina", "Draven", "Alaric", "Sylas", "Cassandra", "Lucian", "Rowan", "Elysia", "Darius", "Marina", "Kieran", "Selenze", "Gideon", "Aria", "Zara", "Xander", "Yara", "Vex", "Wren", "Ulric", "Talia", "Soren", "Rhea", "Quinn", "Peregrine", "Orin", "Nyla", "Marek", "Luna", "Kara", "Jax", "Iris", "Hale", "Gwen", "Fynn", "Eira", "Dax", "Cora", "Bryn", "Alden", "Zane", "Yvonne", "Vera", "Wes", "Ulani", "Tobias", "Sable", "Rivenor", "Quilla", "Pax", "Orla", "Nico", "Mirael", "Lysander", "Kariel", "Jade", "Ivar", "Haven", "Gideonel", "Fiora", "Elias", "Daphne", "Cyrus", "Briar", "Arielle", "Zarek", "Yariel", "Vesper", "Wrenor", "Ulrican", "Talion", "Soriel", "Rheia", "Quillon", "Peregrin", "Orion", "Nymera", "Marekth", "Lunara", "Kareth", "Jaxon", "Irisa", "Halen", "Gwyneira", "Fynric", "Eirwen", "Daxor", "Corvin", "Bryndis", "Aldric", "Zarekhan", "Yvoria", "Veridan", "Wesric", "Ulanor", "Tobriel", "Sableth", "Rivara", "Quillan", "Paxor", "Orlan", "Nicor"];

    let lista = [];

    for (let i = 0; i < qtd; i++) {

        const nome = base[Math.floor(Math.random() * base.length)];

        lista.push(nome);

    }

    return lista;

}

/*================================================
=           GERADOR DE DUNGEON ASCII             =
================================================*/

function gerarDungeon() {

    const salas = [

        `
|-----|
|     |
|  X  |
|     |
|-----|
`,

        `
|----|====|
|         |
|   🧟    |
|         |
|----|====|
`,

        `
|------|
|      |
|  💰  |
|      |
|--==--|
`,

        `
|--==--|
|      |
|  ☠   |
|      |
|--==--|
`,

        // curva
        `
    |====|
    |    |
|---|    |
|        |
|   🧟   |
|        |
|--------|
`,

        // curva inversa
        `
|====|
|    |
|    |---|
|        |
|   💰   |
|        |
|--------|
`,

        // entroncamento T
        `
    |====|
    |    |
|---| 🧟 |---|
|           |
|           |
|-----------|
`,

        // entroncamento Y
        `
      |==|
     /    \\
|---|  💰  |---|
     \\    /
      |==|
`,

        // entroncamento W
        `
|==|   |==|
  |     |
|--| 🧟 |--|
  |     |
|==|   |==|
`,

        // sala redonda
        `
   _____
 /       \\
|   💰    |
|         |
 \\_______/
`,

        // sala redonda com inimigo
        `
   _____
 /       \\
|   🧟    |
|         |
 \\_______/
`,

        // arena grande
        `
|-----------|
|           |
|   🧟  ☠   |
|     💰    |
|           |
|-----------|
`,

        // corredor longo
        `
|==|====|==|====|==|
       🧟
|==|====|==|====|==|
`,

        // sala com pilares
        `
|-----------|
|  O     O  |
|     💰    |
|  O     O  |
|-----------|
`,

        // sala secreta
        `
    |----|
====| 💰 |====
    |----|
`

    ];

    const r = Math.floor(Math.random() * salas.length);

    return salas[r];

}

/*================================================
=           TESOURO RARO PROCEDURAL              =
================================================*/

function gerarTesouroRaro() {

    const qualidade = [
        "Antigo", "Místico", "Arcano", "Lendário", "Esquecido", "Proibido", "Sagrado", "Profano", "Celestial", "Infernal",
        "Venenoso", "Flamejante", "Gélido", "Elétrico", "Sônico", "Vibrante", "Etéreo", "Sombrio", "Luminoso", "Tempestuoso",
        "Vórtice", "Abissal", "Dracônico", "Elemental", "Fantasmagórico", "Golemico", "Rúnico", "Maldito", "Bendito", "Consagrado",
        "Corrompido", "Purificado", "Ancestral", "Primordial", "Astral", "Planar", "Dimensional", "Caótico", "Ordenado", "Solar",
        "Lunar", "Estelar", "Cósmico", "Titânico", "Colossal", "Minúsculo", "Sanguíneo", "Obsidiano", "Cristalino", "Adamantino",
        "Mithral", "Férreo", "Dourado", "Argênteo", "Esmeralda", "Rubino", "Safira", "Ônix", "Perolado", "Nebuloso",
        "Crepuscular", "Auroral", "Glacial", "Volcânico", "Sísmico", "Tóxico", "Radiante", "Umbral", "Necromântico", "Vital",
        "Alquímico", "Arcano-Puro", "Espiritual", "Guardião", "Errante", "Sentinela", "Predatório", "Indomável", "Selvagem", "Nômade",
        "Imortal", "Eterno", "Transcendente", "Profético", "Oracular", "Silencioso", "Ecoante", "Vinculado", "Desperto", "Adormecido"
    ];

    const tipo = [
        "Espada", "Amuleto", "Anel", "Cajado", "Armadura", "Adaga", "Elmo", "Escudo", "Botas", "Luvas",
        "Capa", "Colar", "Bracelete", "Pingente", "Manto", "Báculo", "Martelo", "Machado", "Lança", "Chicote",
        "Florete", "Foice", "Clava", "Manopla", "Tiara", "Broche", "Flecha", "Aljava", "Pergaminho", "Livro",
        "Orbe", "Varinha", "Cetro", "Grimório", "Relíquia", "Artefato", "Talismã", "Totem", "Insígnia", "Emblema",
        "Símbolo", "Medalhão", "Ampulheta", "Espelho", "Máscara", "Estatueta", "Gema", "Cristal", "Essência", "Fragmento",
        "Núcleo", "Coração Arcano", "Sombra Encapsulada", "Luz Aprisionada", "Frasco", "Elixir", "Poção", "Ampola",
        "Cálice", "Coroa", "Diadema", "Cinturão", "Baldric", "Brinco", "Lente Arcana", "Monóculo", "Lanterna", "Chave",
        "Mapa", "Bússola", "Selo", "Sinete", "Códice", "Tomo", "Pergaminho Selado", "Urna", "Relicário", "Incensário",
        "Corrente", "Grilhão", "Placa Rúnica", "Tabela Arcana", "Pedra", "Obelisco", "Ídolo", "Fóssil", "Osso", "Pena",
        "Garra", "Escama", "Dente", "Chifre", "Coração Cristalino", "Motor Arcano", "Engrenagem", "Autômato", "Esfera", "Prisma"
    ];
    const poder = [
        "da Chama", "da Tempestade", "da Lua", "das Sombras", "da Eternidade", "do Vento", "da Terra", "da Água", "do Gelo", "do Trovão",
        "da Luz", "do Caos", "da Ordem", "do Abismo", "do Céu", "do Inferno", "da Vida", "da Morte", "do Tempo", "do Espaço",
        "da Realidade", "da Ilusão", "da Força", "da Agilidade", "da Sabedoria", "do Conhecimento", "do Medo", "da Coragem", "da Fúria", "da Serenidade",
        "da Proteção", "do Poder", "da Velocidade", "da Regeneração", "da Destruição", "da Criação", "da Transmutação", "da Necromancia", "da Divinação", "do Encantamento",
        "da Maldição", "da Benção", "do Vínculo", "da Separação", "do Retorno", "do Esquecimento", "da Revelação", "do Sacrifício", "da Redenção", "da Ruína",
        "do Destino", "da Sorte", "do Infortúnio", "da Vingança", "da Justiça", "da Traição", "do Amor", "do Ódio", "da Esperança", "do Desespero",
        "do Eclipse", "da Aurora", "do Crepúsculo", "da Tempestade Eterna", "do Vazio", "do Cosmos", "das Estrelas", "das Marés", "das Profundezas", "das Montanhas",
        "da Floresta", "das Cinzas", "da Lava", "dos Ventos Uivantes", "dos Relâmpagos", "dos Ecos", "dos Sonhos", "dos Pesadelos", "das Almas", "dos Espíritos",
        "dos Ancestrais", "dos Dragões", "dos Titãs", "dos Gigantes", "dos Elementos", "dos Planos", "dos Portais", "dos Segredos", "dos Mistérios", "dos Juramentos"
    ];

    const q = qualidade[Math.floor(Math.random() * qualidade.length)];
    const t = tipo[Math.floor(Math.random() * tipo.length)];
    const p = poder[Math.floor(Math.random() * poder.length)];

    return `${q} ${t} ${p}`;

}

/*================================================
=            CONFIGURAÇÃO DE SISTEMAS            =
================================================*/


const sistemasRpg = {
    "D&D 5e": {
        ataque: "1d20+modificador",
        dano: "2d6+3",
        vantagens: true
    },
    "Shadowrun": {
        ataque: "1d6>=5"
    },
    "Call of Cthulhu": {
        ataque: "1d100"
    },
    "GURPS": {
        ataque: "3d6"
    },
    "Storytelling": {
        ataque: "1d10"
    }
};


/*================================================
=           MOTOR PRINCIPAL DE ROLAGEM           =
================================================*/

function roladorDeDados() {

    //resultadoTexto
    //const resultadoTexto = document.getElementById("resultadoTexto");
    //const expressao = document.getElementById("expressao").value;
    const inputExpressao = document.getElementById("expressao");

    const expressao = inputExpressao ? inputExpressao.value : "";

    ultimaExpressao = expressao;
    document.getElementById("btnReroll").style.display = "block";

    /*function roladorDeDados() {
    
        const expressao = document.getElementById("expressao").value;
        ultimaExpressao = expressao;
        document.getElementById("btnReroll").style.display = "block";*/

    /*----------------------------------------------
    |      MODO EXPRESSÃO (ex: 2d6+3 / macros)     |
    ----------------------------------------------*/

    //if (expressao) {
    if (expressao && expressao.trim() !== "") {

        const dados = rolarExpressao();
        resultadoTexto
        //const resultadoTexto = document.getElementById("resultadoTexto");
        if (!dados) return;

        resultadoTexto.innerHTML =
            `🎲 ${dados.nomeRolagem ? dados.nomeRolagem : "Expressão"}:<br>
            Dados: [${dados.resultados.join(", ")}]<br>
            <strong>Total: ${dados.soma}</strong>`;

        salvarHistorico(dados.resultados, null, dados.soma, expressao);

        return;

    }
    registrarRolagem();

    /*----------------------------------------------
    |      CONFIGURAÇÃO DO DADO SELECIONADO        |
    ----------------------------------------------*/

    /*const dadoSelecionado = parseInt(document.getElementById("dados").value);*/
    let dadoSelecionado = document.getElementById("dados").value;

    if (dadoSelecionado === "custom") {

        dadoSelecionado = parseInt(document.getElementById("ladosCustom").value);

    } else {

        dadoSelecionado = parseInt(dadoSelecionado);

    }

    const quantidade = parseInt(document.getElementById("quantidadeDeDados").value);
    let modificador = 0;
    /*const modificador = parseInt(document.getElementById("modificador").value) || 0;*/
    const tipoRolagem = document.getElementById("vantagem").value;

    let soma = 0;
    let resultados = [];

    if (!dadoSelecionado || !quantidade) {
        alert("Selecione um dado e a quantidade.");
        return;
    }

    /*----------------------------------------------
    |      SISTEMA DE VANTAGEM / DESVANTAGEM       |
    ----------------------------------------------*/

    // D20 vantagem/desvantagem
    if (dadoSelecionado === 20 && quantidade === 1 && tipoRolagem !== "normal") {

        const d1 = Math.floor(Math.random() * 20) + 1;
        const d2 = Math.floor(Math.random() * 20) + 1;

        resultados.push(d1, d2);

        if (tipoRolagem === "vantagem") {
            soma = Math.max(d1, d2);
        } else {
            soma = Math.min(d1, d2);
        }

    } else {

        /*------------------------------------------
        |           ROLAGEM NORMAL DE DADOS        |
        ------------------------------------------*/

        for (let i = 0; i < quantidade; i++) {

            const resultado = Math.floor(Math.random() * dadoSelecionado) + 1;
            resultados.push(resultado);
            soma += resultado;

        }

    }

    /*----------------------------------------------
    |                MODO GM (OCULTO)              |
    ----------------------------------------------*/

    if (modoOculto) {

        resultadoTexto.innerHTML = "🎲 Rolagem secreta feita.";

        return;

    }

    soma += modificador;

    resultadoTexto
    //const resultadoTexto = document.getElementById("resultadoTexto");

    /*----------------------------------------------
    |             ANIMAÇÃO DE ROLAGEM              |
    ----------------------------------------------*/

    resultadoTexto.innerHTML = "🎲 Rolando dados...";
    const dadosVisuais = document.getElementById("dadosVisuais");

    let animacao = setInterval(() => {

        resultadoTexto.innerHTML = "🎲 Rolando dados...";

        dadosVisuais.innerHTML = "";

        for (let i = 0; i < quantidade; i++) {

            const r = Math.floor(Math.random() * dadoSelecionado) + 1;

            dadosVisuais.innerHTML += `<div class="dado face${r}">${r}</div>`;

        }

    }, 100);

    setTimeout(() => {

        clearInterval(animacao);

        /*------------------------------------------
        |          RESULTADO FINAL DA ROLAGEM      |
        ------------------------------------------*/

        resultadoTexto
        //const resultadoTexto = document.getElementById("resultadoTexto");

        resultadoTexto.innerHTML =
            `🎲 ${quantidade}d${dadoSelecionado} ${modificador >= 0 ? "+" : ""}${modificador}<br>
            Dados: [${resultados.join(", ")}] <br>
            <strong>Resultado: ${soma}</strong>`;

        resultadoTexto.style.transform = "scale(1.2)";

        setTimeout(() => {
            resultadoTexto.style.transform = "scale(1)";
        }, 200);
        /*if (dadoSelecionado === 20 && quantidade === 1) {

            if (resultados.includes(20)) {
                alert("🔥 SUCESSO CRÍTICO!");
            }

            if (resultados.includes(1)) {
                alert("💀 FALHA CRÍTICA!");
            }

        }*/

        

        /*------------------------------------------
        |           SISTEMA DE CRÍTICO             |
        ------------------------------------------*/

        if (dadoSelecionado === 20 && quantidade === 1) {

            if (resultados.includes(20)) {
                resultadoTexto.classList.add("critico");
                resultadoTexto.innerHTML += "<br>🔥 CRÍTICO!";
            }

            if (resultados.includes(1)) {
                resultadoTexto.classList.add("falhaCritica");
                resultadoTexto.innerHTML += "<br>💀 FALHA CRÍTICA!";
            }

        }

        const dadosVisuais = document.getElementById("dadosVisuais");

        dadosVisuais.innerHTML = resultados.map(r => `<div class="dado">${r}</div>`).join("");

        ultimoResultado = resultados;

        salvarHistorico(resultados, modificador, soma);

    }, 600);
    resultadoTexto.classList.remove("critico", "falhaCritica");
        
        if (tipo === "resultado") {
        item.style.display = "list-item";
        }

}


/*================================================
=                HISTÓRICO DE ROLAGENS           =
================================================*/

function filtrarHistorico(tipo) {

    const itens = document.querySelectorAll("#historico p, #historico div");

    itens.forEach(item => {

        if (tipo === "todos") {

            item.style.display = "list-item";

            return;

        }

        if (tipo === "dados") {

            if (item.innerText.includes("d")) {

                item.style.display = "list-item";

            } else {

                item.style.display = "none";

            }

        }

        if (tipo === "sistema") {

            if (!item.innerText.includes("d")) {

                item.style.display = "list-item";

            } else {

                item.style.display = "none";

            }

        }

    });

}

function salvarHistorico(resultados, modificador, soma, expressao = "") {

    const historico = document.getElementById("historico");

    let linha;

    //if (expressao) {
    if (expressao && expressao.trim() !== "") {

        linha =
            `<p>${expressao} → [${resultados.join(", ")}] = <strong>${soma}</strong></p>`;

    } else {

        linha =
            `<p>${resultados.join(" + ")} ${modificador >= null ? "+" : ""}${modificador} = ${soma}</p>`;

    }

    historico.innerHTML = linha + historico.innerHTML;

    localStorage.setItem("historicoDados", historico.innerHTML);

    let historicoJSON = JSON.parse(localStorage.getItem("historicoJSON")) || [];

    historicoJSON.unshift({
        resultados: resultados,
        modificador: modificador,
        soma: soma,
        expressao: expressao,
        timestamp: Date.now()
    });

    //historicoJSON = historicoJSON.slice(0, 30);

    localStorage.setItem("historicoJSON", JSON.stringify(historicoJSON));

}


/*================================================
=             CONTROLES DA INTERFACE             =
================================================*/

function limparResultado() {

    document.getElementById("resultadoTexto").innerHTML = "🎲 Aguardando rolagem...";
    document.getElementById("historico").innerHTML = "<h3>Histórico de Rolagens</h3>";
    localStorage.removeItem("historicoDados");
    document.getElementById("dadosVisuais").innerHTML = "";
    document.getElementById("dados").value = "";
    document.getElementById("quantidadeDeDados").value = "";
    //document.getElementById("modificador").value = "";
    document.getElementById("expressao").value = "";
    document.getElementById("btnReroll").style.display = "none";
    ultimaExpressao = null;


}

function copiarResultado() {

    const texto =
        document.getElementById("resultadoTexto").innerText;

    navigator.clipboard.writeText(texto);

    alert("Resultado copiado!");

}

function alternarTema() {

    document.body.classList.toggle("dark");

}

function mostrarAjuda() {
    document.getElementById("janelaAjuda").style.display = "flex";
}

function fecharAjuda() {
    document.getElementById("janelaAjuda").style.display = "none";
}

/*function mostrarAjuda() {

    alert(`
🎲 COMANDOS DO ROLADOR

EXPRESSÕES
2d6+3
1d20
4d6kh3
2d6!
3d10r1

SUCESSO
1d20>=15

MACROS
/atk
/dano
/cura
/init
/clear
/stats
/hist
/ficha
/npc
/npc ext (abre gerador externo)
/nomes x (x = numero de 1 a 10)
/nomes ext (abre gerador externo)
/dungeon (gera mapa)
/dungeon ext (abre gerador externo)

5ETOOLS
/monstro goblin
/tesouro
/encontro

ATALHOS
ENTER → rolar
ESC → limpar
`);
}*/


/*================================================
=                ATALHOS DE TECLADO              =
================================================*/

document.getElementById("expressao").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        executarExpressaoUI();
    }
});
/*document.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        roladorDeDados();
    }

    if (e.key === "Escape") {
        limparResultado();
    }

});*/


/*================================================
=                  MODO GM (SECRETO)             =
================================================*/

//let modoOculto = false;

function modoGM() {

    modoOculto = !modoOculto;

    document.body.classList.toggle("gmMode");

    alert(modoOculto ? "Modo GM ativo" : "Modo GM desativado");

}

/*================================================
=            ESTATÍSTICAS DE ROLAGEM             =
================================================*/

let estatisticas = JSON.parse(localStorage.getItem("statsDados")) || {
    totalRolagens: 0
};

function registrarRolagem() {

    estatisticas.totalRolagens++;

    localStorage.setItem("statsDados", JSON.stringify(estatisticas));

}

/*================================================
=           PRESETS DE ROLAGEM RPG               =
================================================*/

const presetsRolagem = {

    ataque: "1d20+5",

    dano: "2d6+3",

    iniciativa: "1d20+2"

};

/*================================================
=           PROBABILIDADE DE ROLAGEM             =
================================================*/

function probabilidade(dados, lados, alvo) {

    let total = Math.pow(lados, dados);

    let sucesso = 0;

    for (let i = alvo; i <= lados; i++) {

        sucesso++;

    }

    return (sucesso / lados) * 100;

}

/*================================================
=              SISTEMA DE PLUGINS RPG            =
================================================*/

const pluginsRPG = [];

function registrarPlugin(plugin) {

    pluginsRPG.push(plugin);

}

/*================================================
=              MINI FICHA RÁPIDA                 =
================================================*/

function gerarFichaRapida() {

    const hp = Math.floor(Math.random() * 20) + 10;
    const ca = Math.floor(Math.random() * 10) + 10;
    const iniciativa = Math.floor(Math.random() * 5);

    alert(`📜 Ficha rápida

HP: ${hp}
CA: ${ca}
Iniciativa: +${iniciativa}
`);

}

/*================================================
=            FAVORITOS DE ROLAGEM                =
================================================*/

let favoritos = JSON.parse(localStorage.getItem("favoritosDados")) || [];

function salvarFavorito() {

    const input = document.getElementById("expressao");

    if (!input.value) return;

    favoritos.push(input.value);

    localStorage.setItem("favoritosDados", JSON.stringify(favoritos));

    renderFavoritos();

}

function renderFavoritos() {

    const lista = document.getElementById("listaFavoritos");

    lista.innerHTML = "";

    favoritos.forEach(expr => {

        const btn = document.createElement("button");

        btn.innerText = expr;
        btn.classList.add("btn-favorito");

        btn.onclick = () => executarExpressaoUI(expr);

        lista.appendChild(btn);

    });

}

/*function renderFavoritos() {

    const barra = document.getElementById("barraFavoritos");

    barra.innerHTML = "";

    favoritos.forEach(expr => {

        const btn = document.createElement("button");

        btn.innerText = expr;

        btn.onclick = () => executarExpressaoUI(expr);

        barra.appendChild(btn);

    });

}*/

function listarFavoritos() {
    renderFavoritos();
}

/*let favoritos = [];

function salvarFavorito() {

    const input = document.getElementById("expressao");

    if (!input.value) return;

    favoritos.push(input.value);

    alert("⭐ Rolagem salva nos favoritos!");

}

function listarFavoritos() {

    if (favoritos.length === 0) {

        alert("Nenhum favorito ainda.");

        return;

    }

    alert("⭐ Favoritos:\n\n" + favoritos.join("\n"));

}*/

/*================================================
=         PAINEL EXPRESSÃO AVANÇADA              =
================================================*/

function toggleExpressao() {

    const painel = document.getElementById("painelExpressao");

    if (painel.style.display === "none") {
        painel.style.display = "block";
    } else {
        painel.style.display = "none";
    }

}

/*================================================
=         Botão de Dano Dinâmico                =
================================================*/

function danoPersonalizado() {
    const expr = prompt("Digite o Dano (exp.: 2d6+3):");

    if (!expr) return;

    executarExpressaoUI(expr);
}

/*================================================
=          SISTEMA DE DADOS POR RPG              =
================================================*/

const sistemasDados = {

    dnd5ed: [4, 6, 8, 10, 12, 20],
    storytelling: [10],
    gurps: [6],
    callOfCthulhu: [100],
    shadowrun: [6]

};

document.getElementById("sistemasRpg").addEventListener("change", function () {

    const sistema = this.value;
    const dadosSelect = document.getElementById("dados");

    dadosSelect.innerHTML = `
            <option value="">Selecione um dado</option>
            <option value="custom">Outro Dado</option>`;

    const dados = sistemasDados[sistema];

    dados.forEach(d => {

        const opt = document.createElement("option");

        opt.value = d;
        opt.textContent = "D" + d;

        dadosSelect.appendChild(opt);

    });

});

/*================================================
=                INICIALIZAÇÃO APP               =
================================================*/

window.onload = function () {

    const salvo = localStorage.getItem("historicoDados");

    if (salvo) {
        document.getElementById("historico").innerHTML = salvo;
    }
    const stats = JSON.parse(localStorage.getItem("statsDados"));

    if (stats) {

        const historico = document.getElementById("historico");

        historico.innerHTML +=
            `<p>📊 Total de rolagens: ${stats.totalRolagens}</p>`;

    }
    /*const hist = localStorage.getItem("historicoDados");
    if (hist) {
        document.getElementById("historico").innerHTML = hist;
    }*/
    function renderFavoritos() { console.log("Sistema de favoritos em standby."); 

    }
    renderFavoritos();
}

function roladorDeDados() {
    const input = document.getElementById("expressao").value;
    if (input) {
        executarExpressaoUI(input);
    } else {
        const qtd = document.getElementById("quantidadeDeDados").value;
        const dado = document.getElementById("dados").value === "custom" ? 
                     document.getElementById("ladosCustom").value : 
                     document.getElementById("dados").value;
        if (qtd && dado) executarExpressaoUI(`${qtd}d${dado}`);
    }
}

function executarExpressaoUI(expr) {
    const res = rolarExpressao(expr);
    if (res) {
        resultadoTexto.innerHTML = `🎲 Resultado: ${res.soma} <br><small>(${res.resultados.join(' + ')})</small>`;
        ultimaExpressao = expr;
        document.getElementById("btnReroll").style.display = "inline-block";
    }
}



function executarExpressaoUI(expr = null) {
    const resultado = rolarExpressao(expr);
    if (!resultado) return;

    const texto = resultado.nomeRolagem ? 
        `${resultado.nomeRolagem}: ${resultado.soma}` : 
        `Total: ${resultado.soma}`;
    
    document.getElementById("resultadoTexto").innerHTML = `🎲 ${texto}`;
    ultimaExpressao = expr || document.getElementById("expressao").value;
    
    // Mostra o botão de Reroll
    document.getElementById("btnReroll").style.display = "inline-block";
    
    // Registra no histórico e estatísticas
    if(typeof salvarHistorico === "function") {
        salvarHistorico(resultado.resultados, 0, resultado.soma, ultimaExpressao);
    }
    if(typeof registrarRolagem === "function") registrarRolagem();
}

function roladorDeDados() {
    const inputExpressao = document.getElementById("expressao").value;
    if (inputExpressao.trim() !== "") {
        executarExpressaoUI(inputExpressao);
    } else {
        // Se o campo de texto estiver vazio, usa os seletores (dropdowns)
        const qtd = document.getElementById("quantidadeDeDados").value;
        const dado = document.getElementById("dados").value === "custom" ? 
                     document.getElementById("ladosCustom").value : 
                     document.getElementById("dados").value;
        
        if (!dado || !qtd) {
            alert("Selecione um dado e a quantidade ou digite uma expressão.");
            return;
        }
        executarExpressaoUI(`${qtd}d${dado}`);
    }
}

function danoPersonalizado() {
    executarExpressaoUI('/dano');
}

function mostrarAjuda() {
    document.getElementById("janelaAjuda").style.display = "flex";
}

function fecharAjuda() {
    document.getElementById("janelaAjuda").style.display = "none";
}

function modoGM() {
    modoOculto = !modoOculto;
    alert(modoOculto ? "Modo GM Ativado (Rolagens Ocultas)" : "Modo GM Desativado");
}