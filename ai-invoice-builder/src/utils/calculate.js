export function calculateInvoice(invoice) {

  const subtotal = invoice.items.reduce((sum, item) => {

    return sum + item.qty * item.price;

  }, 0);

  const gstAmount =
    subtotal * invoice.tax.gst / 100;

  const shipping =
    Number(invoice.tax.shipping);

  const discount =
    Number(invoice.tax.discount);

  const grandTotal =
    subtotal +
    gstAmount +
    shipping -
    discount;

  return {

    subtotal,

    gstAmount,

    shipping,

    discount,

    grandTotal,

  };

}