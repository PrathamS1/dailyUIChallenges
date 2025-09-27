import BackToHome from "./BackToHome";
import {
  Mail,
  Download,
  Link2,
  CreditCard,
  Printer,
} from "lucide-react";

const sampleInvoice = {
  id: "INV-2025-09126",
  currency: "USD",
  issuedDate: "2025-09-26",
  dueDate: "2025-10-10",
  status: "Pending",
  from: {
    name: "Pratham Singh",
    company: "Flowind",
    address: "Bangalore, India",
    email: "support@flowind.ai",
    website: "flowind.ai",
  },
  to: {
    name: "Client Name",
    company: "Organization Inc.",
    address: "12 Corporate Ave, Mumbai, India",
    email: "client@organization.com",
  },
  items: [
    { description: "Design & Development (10 pages)", quantity: 1, rate: 2000 },
    { description: "CMS Integration & Testing", quantity: 1, rate: 500 },
    { description: "Hosting (1 year)", quantity: 1, rate: 120 },
  ],
  taxPercent: 18,
  discount: 0,
  paidAmount: 500,
  paymentUrl: "https://pay.example.com/inv/INV-2025-09126",
  paymentTerms: "Net 14",
  paymentMethod: "Bank transfer / Card / UPI",
  notes: [
    "Thank you for the opportunity to collaborate on this project.",
    "I am available for reasonable post-delivery support and clarifications.",
    "Minor adjustments or fixes will be handled to ensure smooth implementation.",
  ],
  terms: [
    "Payment is due within 14 calendar days of the invoice date.",
    "Late payments may attract an administrative surcharge.",
    "Services may be paused until outstanding balances are cleared.",
  ],
};

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(value = 0, currency = "USD") {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
    }).format(value);
  } catch {
    return (value || 0).toFixed(2) + " " + (currency || "");
  }
}

export default function InvoiceCard({ invoice = sampleInvoice, onPay }) {
  const items = invoice.items || [];
  const subtotal = items.reduce(
    (acc, it) => acc + (it.quantity ?? 1) * (it.rate ?? 0),
    0
  );
  const taxAmount = invoice.taxPercent
    ? +(subtotal * (invoice.taxPercent / 100))
    : invoice.tax || 0;
  const discount = invoice.discount || 0;
  const total = subtotal - discount + taxAmount;
  const paid = invoice.paidAmount || 0;
  const balance = Math.max(0, total - paid);

  const handlePay = () => {
    if (typeof onPay === "function") return onPay(invoice);
    if (invoice.paymentUrl) return window.open(invoice.paymentUrl, "_blank");
    alert("No payment link provided.");
  };

  const copyPayment = async () => {
    if (!invoice.paymentUrl) return alert("No payment link to copy.");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(invoice.paymentUrl);
        alert("Payment link copied");
      } catch {
        alert("Could not copy");
      }
    } else {
      alert("Clipboard not available");
    }
  };

  return (
    <>
      <BackToHome />
      <article className="max-w-4xl mx-auto bg-white border my-10 border-gray-400 rounded-2xl p-6 print:p-0 print:border-0">
        {/* HEADER */}
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-18 h-18 rounded-lg overflow-hidden flex items-center justify-center text-white">
              <img
                src="/flowind.png"
                className="w-full h-full invert object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">
                {invoice.from.company || invoice.from.name}
              </h1>
              <p className="text-xs text-gray-600">{invoice.from.address}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />{" "}
                  <span>{invoice.from.email}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  · <span>{invoice.from.website}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 print:hidden">
            <div className="text-xs font-medium px-3 py-1 rounded-full border border-black text-black">
              {invoice.status}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePay}
                className="inline-flex items-center gap-2 ring-0 ring-black hover:ring-1 hover:ring-offset-2 transition-all ease-in-out bg-black text-white px-4 py-2 rounded-lg text-sm"
              >
                <CreditCard className="w-4 h-4" /> Pay
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 border border-black text-black px-3 py-2 rounded-lg text-sm"
              >
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <button
                onClick={copyPayment}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200"
              >
                <Link2 className="w-3.5 h-3.5" /> Copy link
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        </header>

        {/* BILL / META */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2 p-4 rounded-lg bg-gray-50">
            <div className="text-xs text-gray-600">Billed To</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-black mt-1">
                  {invoice.to.name}
                  {invoice.to.company ? ` • ${invoice.to.company}` : ""}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {invoice.to.address}
                </div>
                <div className="text-xs text-gray-600">{invoice.to.email}</div>
              </div>

              <div className="text-right text-xs text-gray-600">
                <div className="font-semibold text-black">
                  Invoice #{invoice.id}
                </div>
                <div className="mt-1">
                  Issued:{" "}
                  <span className="font-medium text-black">
                    {formatDate(invoice.issuedDate)}
                  </span>
                </div>
                <div>
                  Due:{" "}
                  <span className="font-medium text-black">
                    {formatDate(invoice.dueDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-600">Payment</div>
            <div className="text-sm font-medium mt-2 text-black">
              {invoice.paymentTerms || "Due on receipt"}
            </div>
            <div className="text-xs text-gray-600 mt-3">Method</div>
            <div className="text-sm mt-1 flex items-center gap-2 text-gray-700">
              <CreditCard className="w-4 h-4" />
              {invoice.paymentMethod}
            </div>
          </div>
        </section>

        {/* LINE ITEMS */}
        <h3 className="mt-6 font-medium">Invoice Details</h3>
        <section className="mt-6 overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full w-full">
            <thead>
              <tr className="bg-white">
                <th className="p-4 text-left text-xs text-gray-600">
                  Description
                </th>
                <th className="p-4 text-right text-xs text-gray-600 hidden sm:table-cell">
                  Qty
                </th>
                <th className="p-4 text-right text-xs text-gray-600">Rate</th>
                <th className="p-4 text-right text-xs text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {items.map((it, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-4 align-top">
                    <div className="text-sm font-medium text-black">
                      {it.description}
                    </div>
                    {it.notes && (
                      <div className="text-xs text-gray-600 mt-1">
                        {it.notes}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-right hidden sm:table-cell align-top">
                    {it.quantity ?? 1}
                  </td>
                  <td className="p-4 text-right align-top">
                    {formatCurrency(it.rate || 0, invoice.currency)}
                  </td>
                  <td className="p-4 text-right align-top">
                    {formatCurrency(
                      (it.quantity ?? 1) * (it.rate || 0),
                      invoice.currency
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* NOTES & TOTALS - corrected layout */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          <div className="sm:col-span-2 flex flex-col gap-4">
            {invoice.notes && (
              <div>
                <div className="text-xs text-gray-600">Notes</div>
                <div className="mt-2 text-sm text-gray-800 bg-gray-50 p-3 rounded-md">
                  {invoice.notes.map((note, idx) => (
                    <p key={idx} className="mb-1 last:mb-0">
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs text-gray-600">Terms</div>
              <div className="mt-2 text-xs text-gray-600 p-3">
                {invoice.terms.map((term, idx) => (
                  <p key={idx} className="mb-1 last:mb-0">
                    {term}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Totals box (no internal CTA) */}
          <div>
            <div className="rounded-lg border border-gray-200 p-4 bg-white">
              <div className="flex justify-between text-sm text-gray-700">
                <div>Subtotal</div>
                <div className="font-medium text-black">
                  {formatCurrency(subtotal, invoice.currency)}
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-700 mt-3">
                <div>Discount</div>
                <div className="font-medium text-black">
                  {formatCurrency(discount, invoice.currency)}
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-700 mt-3">
                <div>
                  Tax {invoice.taxPercent ? `(${invoice.taxPercent}%)` : ""}
                </div>
                <div className="font-medium text-black">
                  {formatCurrency(taxAmount, invoice.currency)}
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                <div className="text-sm text-gray-700">Total</div>
                <div className="text-lg font-semibold text-black">
                  {formatCurrency(total, invoice.currency)}
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-700 mt-3">
                <div>Paid</div>
                <div className="font-medium text-black">
                  {formatCurrency(paid, invoice.currency)}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-700">Amount Due</div>
                <div
                  className={`text-lg font-bold ${
                    balance > 0 ? "text-black" : "text-gray-600"
                  }`}
                >
                  {formatCurrency(balance, invoice.currency)}
                </div>
              </div>
            </div>

            {/* CTA: placed below totals, outside totals box (clearly separated) */}
            <div className="mt-3 print:hidden">
              <button
                onClick={handlePay}
                className="w-full inline-flex items-center justify-center gap-2 ring-0 ring-black hover:ring-1 hover:ring-offset-2 transition-all ease-in-out cursor-pointer px-4 py-2 bg-black text-white rounded-lg"
              >
                <CreditCard className="w-4 h-4" /> Pay{" "}
                {formatCurrency(balance, invoice.currency)}
              </button>

              <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                <button
                  onClick={copyPayment}
                  className="inline-flex items-center gap-2 px-2 py-1 rounded-md border border-gray-200"
                >
                  {" "}
                  <Link2 className="w-3.5 h-3.5" /> Copy link
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-2 py-1 rounded-md border border-gray-200"
                  >
                    {" "}
                    <Printer className="w-3.5 h-3.5" /> Print
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-2 py-1 rounded-md border border-gray-200"
                  >
                    {" "}
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
