const form = document.querySelector('#search-form > form');
const input: HTMLInputElement | null = document.querySelector('#input-localizacao');

const sectionTempoInfo = document.querySelector('#tempo-info');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if(!input || !sectionTempoInfo) return

  const localizacao = input.value;

  if(localizacao.length < 3) {
    alert('O local precisa ter pelo menos 3 letras.');
    return;
  }

  try {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=d9b3558166b6c7898e47f5b2f35f966a&lang=pt_br&units=metric`);

  const dados = await resposta.json();

  const infos = {
    temperatura: Math.round(dados.main.temp),
    local: dados.name,
    icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
  };

  sectionTempoInfo.innerHTML = `
    <div class="tempo-dados">
      <h2 class="text-[#eebbc3] text-lg font-medium mb-1">${infos.local}</h2>
      <span class="text-4xl font-bold text-[#8f5cff]">${infos.temperatura}°C</span>
    </div>

    <img src="${infos.icone}" class="w-16 h-16" />
  `
  } catch (err) {
    console.log('Erro na obtenção dos dados da API.', err);
  }

});
