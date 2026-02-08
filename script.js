let slotsData = [];
let currentSlot = 0;

const colors = [
  "",
  "BLACK",
  "DARK_BLUE",
  "BLUE",
  "DARK_GREEN",
  "GREEN",
  "DARK_RED",
  "RED",
  "GOLD",
  "YELLOW",
  "WHITE",
  "AQUA",
  "DARK_AQUA",
  "LIGHT_PURPLE",
  "DARK_PURPLE",
  "GRAY",
  "DARK_GRAY",
];

function fillSelect(id) {
  const select = document.getElementById(id);
  colors.forEach((c) => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c || "RESET";
    select.appendChild(option);
  });
}

fillSelect("colorNameInput");
fillSelect("colorLoreInput");

document.getElementById("generateGrid").addEventListener("click", () => {
  let slotCount = parseInt(document.getElementById("slotCount").value);
  if (slotCount < 9 || slotCount > 54) return alert("Nombre de slots : 9 → 54");

  if (slotCount % 9 !== 0) {
    alert(
      "Le nombre de slots doit être un multiple de 9. Arrondi au multiple le plus proche.",
    );
    slotCount = Math.round(slotCount / 9) * 9;
    document.getElementById("slotCount").value = slotCount; // met à jour le champ
  }
  
  const container = document.getElementById("gridContainer");
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(9, 60px)`;

  slotsData = Array(slotCount)
    .fill(null)
    .map(() => ({
      item: "",
      name: "",
      colorname: "",
      lore: "",
      colorlore: "",
      price: "",
      command: "",
    }));

  for (let i = 0; i < slotCount; i++) {
    const slotDiv = document.createElement("div");
    slotDiv.classList.add("slot");
    slotDiv.textContent = i;
    slotDiv.addEventListener("click", () => editSlot(i));
    container.appendChild(slotDiv);
  }
});

function editSlot(slot) {
  currentSlot = slot;
  const data = slotsData[slot];

  document.getElementById("slotNumber").textContent = slot;
  document.getElementById("itemInput").value = data.item;
  document.getElementById("nameInput").value = data.name;
  document.getElementById("colorNameInput").value = data.colorname;
  document.getElementById("loreInput").value = data.lore;
  document.getElementById("colorLoreInput").value = data.colorlore;
  document.getElementById("priceInput").value = data.price;
  document.getElementById("commandInput").value = data.command;

  document.getElementById("editorPanel").classList.remove("hidden");
}

document.getElementById("saveSlot").addEventListener("click", () => {
  slotsData[currentSlot] = {
    item: document.getElementById("itemInput").value,
    name: document.getElementById("nameInput").value,
    colorname: document.getElementById("colorNameInput").value,
    lore: document.getElementById("loreInput").value,
    colorlore: document.getElementById("colorLoreInput").value,
    price: document.getElementById("priceInput").value,
    command: document.getElementById("commandInput").value,
  };
  document.getElementById("editorPanel").classList.add("hidden");
});

document.getElementById("closeEditor").addEventListener("click", () => {
  document.getElementById("editorPanel").classList.add("hidden");
});

document.getElementById("exportYaml").addEventListener("click", () => {
  const yamlLines = [
    "GUI:",
    "  Shop:",
    `    size: ${slotsData.length}`,
    "    content:",
  ];
  slotsData.forEach((slot, index) => {
    const hasData =
      slot.item ||
      slot.name ||
      slot.colorname ||
      slot.lore ||
      slot.colorlore ||
      slot.price ||
      slot.command;
    if (hasData) {
      yamlLines.push(`      ${index}:`);
      yamlLines.push(`        item: ${slot.item || ""}`);
      yamlLines.push(`        name: "${slot.name || ""}"`);
      yamlLines.push(`        colorname: ${slot.colorname || ""}`);
      yamlLines.push(`        lore: ${slot.lore || ""}`);
      yamlLines.push(`        colorlore: ${slot.colorlore || ""}`);
      yamlLines.push(`        price: ${slot.price || ""}`);
      yamlLines.push(`        command: "${slot.command || ""}"`);
    }
  });
  yamlLines.push("    default: LIGHT_GRAY_STAINED_GLASS_PANE");

  document.getElementById("yamlOutput").textContent = yamlLines.join("\n");
});
