// Carrosel dos Elos
const carroselElos = document.querySelector('.carrosel-elos')
const botoesCarrosselElos = document.querySelectorAll(".elos-valorant .icon")
const primeiraLarguraBotao = document.querySelector('.card-elo').offsetWidth
const carroselElosFilhos = [...carroselElos.children]

let isDragging = false, startX, startScrollLeft

botoesCarrosselElos.forEach(btnElo => {
    btnElo.addEventListener('click', () => {
        carroselElos.scrollLeft += btnElo.id === "botaoEloEsquerdo" ? -primeiraLarguraBotao : primeiraLarguraBotao
    })
})


const dragStart = (e) => {
    isDragging = true
    carroselElos.classList.add("dragging")
    startX = e.pageX;
    startScrollLeft = carroselElos.scrollLeft
}

const dragging = (e) => {
    if (!isDragging) return
    carroselElos.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = () => {
    isDragging = false
    carroselElos.classList.remove("dragging")
}

carroselElos.addEventListener("mousedown", dragStart)
carroselElos.addEventListener("mousemove", dragging)
document.addEventListener("mouseup", dragStop)

//radio buttons fix

let elos = document.querySelectorAll('.card-elo input[type=radio]');

// Adiciona um evento de clique para cada radio button
elos.forEach(function (elo) {
    elo.addEventListener('click', function () {
        // Desmarca todos os outros radio buttons de elo
        elos.forEach(function (outroElo) {
            if (outroElo !== elo) {
                outroElo.checked = false;
            }
        });
    });
});

//Imagem dos agentes

fetch("https://valorant-api.com/v1/agents").then(resposta => {
    if (!resposta.ok) {
        throw new Error('Não foi possível extrair os dados da API')
    }
    return resposta.json()
}).then(data => {

    data.data.forEach(agente => {
        const displayName = agente.displayName
        const displayIconSmall = agente.displayIconSmall

        let imgClass = displayName.toLowerCase().replace("/", "-") + "-img"

        if (displayName === "KAY/O") {
            imgClass = "kayo-img"
        }

        const img = document.querySelector(`.${imgClass}`)

        if (!img) {
            throw new Error(`Não foi possível encontrar a imagem para o agente ${displayName}`)
        }

        img.src = displayIconSmall
    })
}).catch(error => {
    console.error(error)
})


document.addEventListener("DOMContentLoaded", function () {
    const botoesAgente = document.querySelectorAll(".botao-agente")

    botoesAgente.forEach(botao => {
        botao.addEventListener("click", function (e) {
            e.preventDefault()
            botoesAgente.forEach(botao => {
                botao.classList.remove("selecionado")
            });
            botao.classList.add("selecionado")
        })
    })
})


// #################################################################

// Formulario

function pegarNickname() {
    const nickname = document.querySelector("#nickname").value
    return nickname
}

function pegarFuncao() {
    const funcao = document.querySelector("#funcao").value
    return funcao
}

function pegarElo() {
    const campoDosElos = document.querySelector('.elos-valorant');
    const eloMarcado = campoDosElos.querySelector('input[type=radio]:checked')

    if (eloMarcado) {

        const idElo = eloMarcado.id

        const descricaoElo = eloMarcado.parentElement.querySelector('.descricao-elo').innerText

        const regexPontos = /([+-]?\d*\.?\d+)/; 
        const pontosEncontrados = descricaoElo.match(regexPontos)

        const pontos = pontosEncontrados && pontosEncontrados.length > 0 ? parseFloat(pontosEncontrados[0]) : 0

        return [idElo, pontos]
    } else {
        return [null, 0]
    }
}

function pegarAgente() {
    const camadaAgentes = document.querySelector('.camada-3-criador')
    const elementoSelecionado = camadaAgentes.querySelector('.selecionado')

    if (elementoSelecionado) {
        let agente = elementoSelecionado.id
        agente = agente.slice(4, agente.length)
        agente = agente.charAt(0).toUpperCase() + agente.slice(1) // 
        return agente
    } else {
        return null
    }
}

function pegarStats() {
    const KAST = Number(document.querySelector('#kast').value)
    const ACS = Number(document.querySelector('#acs').value)
    const ADR = Number(document.querySelector('#adr').value)
    const DDA = Number(document.querySelector('#dda').value)
    const KDR = Number(document.querySelector('#kdr').value)
    const HSR = Number(document.querySelector('#hsr').value)

     const pesos = {
        ACS: 2.20,
        ADR: 2.15,
        HSR: 2.05,
        DDA: 2.15,
        KAST: 2.35,
        KDR: 2.10
    }
    const overAll = ((ACS * pesos.ACS + ADR * pesos.ADR + HSR * pesos.HSR + DDA * pesos.DDA + KAST * pesos.KAST + KDR * pesos.KDR) / (pesos.ACS + pesos.ADR + pesos.HSR + pesos.DDA + pesos.KAST + pesos.KDR)).toFixed(0)

    const kastArredondado = KAST.toFixed(0)
    const acsArredondado = ACS.toFixed(0)
    const adrArredondado = ADR.toFixed(0)
    const ddaArredondado = DDA.toFixed(0)
    const hsrArredondado = HSR.toFixed(0)

    return [overAll, kastArredondado, acsArredondado, adrArredondado, ddaArredondado, KDR, hsrArredondado]
}

function pegarFoto() {
    const inputImagem = document.getElementById('foto-jogador')

    if (inputImagem.files && inputImagem.files[0]) {
        const reader = new FileReader()

        reader.onload = function (e) {
            const urlImagem = e.target.result;

            const divCartinha = document.querySelector('.camada-1-cartinha')

            divCartinha.style.backgroundImage = `url(${urlImagem})`
        };

        reader.readAsDataURL(inputImagem.files[0])
    }
}

document.querySelector('.btn-upload-foto').addEventListener("click", function(e) {
    e.preventDefault()
    document.querySelector('#foto-jogador').click()
})

function criarCard() {
    const overCartinha = document.querySelector('.overall-cartinha')
    const nickcartinha = document.querySelector('.nickname-cartinha')
    const funcaoCartinha = document.querySelector('.funcao-cartinha')
    const agenteCartinha = document.querySelector('.agente-cartinha')
    const eloCartinha = document.querySelector('.elo-cartinha')
    const kastCartinha = document.querySelector('#kast-cartinha')
    const acsCartinha = document.querySelector('#acs-cartinha')
    const adrCartinha = document.querySelector('#adr-cartinha')
    const ddaCartinha = document.querySelector('#dda-cartinha')
    const kdrCartinha = document.querySelector('#kdr-cartinha')
    const hsrCartinha = document.querySelector('#hsr-cartinha')
    const fotoCartinha = document.querySelector('.camada-1-cartinha')

    nickcartinha.innerText = pegarNickname()
    funcaoCartinha.innerText = pegarFuncao()
    agenteCartinha.innerText = pegarAgente()

    const eloEPontosExtras = pegarElo()

    console.log(pegarElo())
    
    eloCartinha.src = `images/elos/${eloEPontosExtras[0]}.png`
    const stats = pegarStats()

    let overAllFinal = Math.round(Number(stats[0]) + Number(eloEPontosExtras[1]))

    if (overAllFinal > 99) {
        overAllFinal = 99
    } 

    overCartinha.innerText = overAllFinal
    kastCartinha.innerText = `${stats[1]}%`
    acsCartinha.innerText = stats[2]
    adrCartinha.innerText = stats[3]
    ddaCartinha.innerText = stats[4]
    kdrCartinha.innerText = stats[5]
    hsrCartinha.innerText = `${stats[6]}%`

    pegarFoto()
}


const btnVoltar = document.querySelector('.btn-voltar')

btnVoltar.addEventListener('click', function (e) {
    window.location.reload()
})

// Gerar Cartinha
const botaoGerarCard = document.querySelector('#btn-gerar-card')

botaoGerarCard.addEventListener('click', function (e) {
    e.preventDefault()
    criarCard()
    const cardJogador = document.querySelector(".card-jogador")
    const criadorDeCard = document.querySelector('.criador-de-card')
    criadorDeCard.style.display = "none"
    cardJogador.style.display = "flex"
})