import jsPDF from "jspdf";
import "jspdf-autotable";
import { OrderDetail } from "../types/types";

export const generatePDF = (
  orderDetails: OrderDetail[],
  purchaseDate: Date,
  totalPrice: number,
  discount: number,
  deliveryCharges: number,
  finalTotalPrice: number
) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text("RefHub Bookstore", 14, 22);
  doc.setFontSize(12);
  doc.text("123 Book St., Fiction City, Storyland", 14, 28);
  doc.text("Phone: (123) 456-7890", 14, 34);
  doc.text("Email: info@bookstore.com", 14, 40);

  // Invoice title
  doc.setFontSize(16);
  doc.text("Invoice", 14, 50);

  // Invoice details
  doc.setFontSize(12);
  doc.text(`Purchase Date: ${purchaseDate.toLocaleDateString()} ${purchaseDate.toLocaleTimeString()}`, 14, 58);

  // Table columns
  const tableColumn = ["Description", "Details"];
  const tableRows: (string | number)[][] = [
    ...orderDetails.map(item => [
      `Title: ${item.bookTitle}\nAuthor: ${item.author}`,
      `Quantity: ${item.quantity}\nUnit Price: $${item.unitPrice.toFixed(2)}\nTotal: $${item.totalPrice.toFixed(2)}`
    ]),
    ["Total Price", `$${totalPrice.toFixed(2)}`],
    ["Discount", `-$${discount.toFixed(2)}`],
    ["Delivery Charges", `+$${deliveryCharges.toFixed(2)}`],
    ["Final Total Price", `$${finalTotalPrice.toFixed(2)}`]
  ];

  (doc as any).autoTable({
    startY: 65,
    head: [tableColumn],
    body: tableRows,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] }
  });

  // Footer
  doc.setFontSize(10);
  doc.text("Thank you for your purchase!", 14, (doc as any).lastAutoTable.finalY + 10);
  doc.text("Please contact us if you have any questions about your order.", 14, (doc as any).lastAutoTable.finalY + 16);

  doc.save("receipt.pdf");
};
