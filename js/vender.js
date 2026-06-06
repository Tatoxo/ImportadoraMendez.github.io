const form = document.getElementById("sellForm");
const telefonoInput = document.getElementById("telefonoInput");
const anioInput = document.getElementById("anioInput");
const kmInput = document.getElementById("kmInput");
const precioInput = document.getElementById("precioInput");
const photoInput = document.getElementById("photoInput");
const previewContainer = document.getElementById("previewContainer");
const msg = document.getElementById("formMessage");
const sendBtn = document.getElementById("sendBtn");

const WHATSAPP_NUMBER = "50242754206";

/* FORMATEOS AUTOMÁTICOS */

telefonoInput.addEventListener("input", e => {
  const digits = e.target.value.replace(/\D/g, "").slice(0,8);
  e.target.value = digits.length > 4
    ? digits.slice(0,4) + "-" + digits.slice(4)
    : digits;
});

anioInput.addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0,4);
});

kmInput.addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g, "");
});

precioInput.addEventListener("input", e => {
  let value = e.target.value.replace(/\D/g, "");
  value = Number(value).toLocaleString("es-GT");
  e.target.value = value;
});

/* PREVIEW IMÁGENES */
photoInput.addEventListener("change", function () {
  previewContainer.innerHTML = "";
  const files = Array.from(this.files);

  if (files.length > 7) {
    alert("Máximo 7 imágenes.");
    this.value = "";
    return;
  }

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

/* SUBMIT */
form.addEventListener("submit", function(e){
  e.preventDefault();

  sendBtn.classList.add("loading");
  sendBtn.innerText = "Procesando...";

  const data = new FormData(form);

  const message = `
🚘 *SOLICITUD PARA VENDER VEHÍCULO*

👤 Nombre: ${data.get("nombre")}
📞 Teléfono: +502 ${telefonoInput.value}
📧 Email: ${data.get("email")}

🚗 Vehículo: ${data.get("marca")} ${data.get("modelo")}
📅 Año: ${data.get("anio")}
🛣 Kilometraje: ${data.get("km")} km
💰 Precio esperado: Q ${data.get("precio")}

📝 Estado:
${data.get("descripcion")}

📸 Adjuntaré las fotos del vehículo en este chat.

Solicito evaluación y oferta.
  `;

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

  setTimeout(() => {
    window.open(url, "_blank");
    sendBtn.classList.remove("loading");
    sendBtn.innerText = "Enviar Evaluación →";
  }, 600);
});