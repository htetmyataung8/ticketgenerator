function generateTicket() {
  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('id').value.trim();
  const qrdata = document.getElementById('qrdata').value.trim();

  if (!name || !id || !qrdata) {
    alert("Please fill all fields.");
    return;
  }

  document.getElementById('ticketName').textContent = name;
  document.getElementById('ticketID').textContent = id;

  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = ""; // Clear previous QR
  new QRCode(qrContainer, {
    text: qrdata,
    width: 100,
    height: 100
  });

  document.getElementById('ticket').style.display = 'block';
  document.getElementById('downloadSection').style.display = 'block';
}

function downloadTicket() {
  const ticket = document.getElementById("ticket");
  const type = document.getElementById("downloadType").value;

  const name = document.getElementById("name").value.trim().replace(/\s+/g, '_');
  const id = document.getElementById("id").value.trim().replace(/\s+/g, '_');

  if (!name || !id) {
    alert("Missing name or ID for filename.");
    return;
  }

  const filename = `${name}_${id}`;

  html2canvas(ticket).then(canvas => {
    if (type === "png") {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${filename}.png`;
      link.click();
    } else if (type === "pdf") {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${filename}.pdf`);
    }
  });
}
