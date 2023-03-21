import { jsPDF } from "jspdf";
import QRCode from "qrcode";

const printQr = async (text, name) => {
  try {
    // Generate the data URL of the QR code
    const qrCodeDataURL = await QRCode.toDataURL(text, { width: 128, margin: 1 });

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add the QR code to the PDF
    const imgWidth = 128;
    const imgHeight = 128;
    pdf.addImage(qrCodeDataURL, "PNG", 0, 0, imgWidth, imgHeight);

    // Save the PDF
    pdf.save(`${name}QRCode.pdf`);
  } catch (error) {
    console.error("Error generating QR code PDF:", error);
  }
};


export default printQr;
