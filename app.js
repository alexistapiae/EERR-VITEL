const DATA = {
  coplanar: {
    title: 'Montaje coplanar',
    kitName: 'Kit accesorios montaje coplanar para 4 paneles',
    kitSku: '2800794150',
    main: [
      { description: 'Kit accesorios montaje coplanar para 4 paneles', sku: '2800794150', perKit: 1 },
      { description: 'Riel 4800 mm', sku: '2800794014', perKit: 2 }
    ],
    accessories: [
      { description: 'Soporte tipo L (L FEET)', perKit: 8 },
      { description: 'Conector tierra entre paneles', perKit: 6 },
      { description: 'Clip de cables', perKit: 4 },
      { description: 'End clamp', perKit: 4 },
      { description: 'Mid clamp', perKit: 6 },
      { description: 'Conector metálico tierra entre rieles', perKit: 2 },
      { description: 'Conector unión de riel', perKit: 2 }
    ]
  },
  angulo: {
    title: 'Montaje con ángulo / ajustable',
    kitName: 'Kit accesorios montaje con ángulo para 4 paneles',
    kitSku: '2800794154',
    main: [
      { description: 'Kit accesorios montaje con ángulo para 4 paneles', sku: '2800794154', perKit: 1 },
      { description: 'Riel 4800 mm', sku: '2800794014', perKit: 2 }
    ],
    accessories: [
      { description: 'Soporte delantero ajustable', perKit: 4 },
      { description: 'Barra extensible 15-30', perKit: 4 },
      { description: 'Conector tierra entre paneles', perKit: 6 },
      { description: 'Clip de cables', perKit: 4 },
      { description: 'End clamp', perKit: 4 },
      { description: 'Mid clamp', perKit: 6 },
      { description: 'Conector metálico tierra entre rieles', perKit: 2 },
      { description: 'Unión de riel', perKit: 2 }
    ]
  }
};

const panelCount = document.getElementById('panelCount');
const mountType = document.getElementById('mountType');
const projectName = document.getElementById('projectName');
const mainItems = document.getElementById('mainItems');
const accessoryItems = document.getElementById('accessoryItems');

function formatNumber(value) { return new Intl.NumberFormat('es-CL').format(value); }
function getState() {
  const panels = Math.max(1, Number.parseInt(panelCount.value || '1', 10));
  const kits = Math.ceil(panels / 4);
  const type = mountType.value;
  return { panels, kits, type, config: DATA[type] };
}
function row(cells) { return `<tr>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`; }
function render() {
  const { panels, kits, config } = getState();
  document.getElementById('resultTitle').textContent = config.title;
  document.getElementById('kpiPanels').textContent = formatNumber(panels);
  document.getElementById('kpiKits').textContent = formatNumber(kits);
  document.getElementById('dateStamp').textContent = new Date().toLocaleDateString('es-CL');

  mainItems.innerHTML = config.main.map(item => row([
    item.description,
    item.sku,
    formatNumber(item.perKit * kits)
  ])).join('');
  accessoryItems.innerHTML = config.accessories.map(item => row([
    item.description,
    formatNumber(item.perKit * kits)
  ])).join('');
}
function buildSummary() {
  const { panels, kits, config } = getState();
  const project = projectName.value.trim() || 'Proyecto sin nombre';
  const lines = [
    `Calculadora de Estructuras FV`,
    `Proyecto: ${project}`,
    `Tipo de montaje: ${config.title}`,
    `Paneles: ${panels}`,
    `Kits requeridos: ${kits}`,
    '',
    'Ítems principales:',
    ...config.main.map(i => `- ${i.description} | SKU ${i.sku} | Cantidad ${i.perKit * kits}`),
    '',
    'Accesorios:',
    ...config.accessories.map(i => `- ${i.description}: ${i.perKit * kits}`)
  ];
  return lines.join('\n');
}

document.getElementById('calculatorForm').addEventListener('submit', event => { event.preventDefault(); render(); });
[panelCount, mountType, projectName].forEach(el => el.addEventListener('input', render));
document.getElementById('copyBtn').addEventListener('click', async () => {
  await navigator.clipboard.writeText(buildSummary());
  const btn = document.getElementById('copyBtn');
  const old = btn.textContent;
  btn.textContent = 'Resumen copiado';
  setTimeout(() => btn.textContent = old, 1400);
});
document.getElementById('printBtn').addEventListener('click', () => window.print());
render();
