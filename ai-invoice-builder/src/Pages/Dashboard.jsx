import { useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import CompanyInfo from "../components/CompanyInfo";
import CustomerInfo from "../components/CustomerInfo";
import InvoiceInfo from "../components/InvoiceInfo";
import AIInput from "../components/AIInput";
import ProductTable from "../components/ProductTable";
import TotalCard from "../components/TotalCard";
import InvoicePreview from "../components/InvoicePreview";

import defaultInvoice from "../data/defaultInvoice";
import { calculateInvoice } from "../utils/calculate";

export default function Dashboard() {

  const [invoice, setInvoice] = useState(defaultInvoice);

  const totals = useMemo(() => {
    return calculateInvoice(invoice);
  }, [invoice]);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <CompanyInfo
            invoice={invoice}
            setInvoice={setInvoice}
          />

          <CustomerInfo
            invoice={invoice}
            setInvoice={setInvoice}
          />

        </div>

        <div className="mb-6">

          <InvoiceInfo
            invoice={invoice}
            setInvoice={setInvoice}
          />

        </div>

        <div className="mb-6">

          <AIInput
            invoice={invoice}
            setInvoice={setInvoice}
          />

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">

            <ProductTable
              invoice={invoice}
              setInvoice={setInvoice}
            />

          </div>

          <div>

            <TotalCard
              invoice={invoice}
              setInvoice={setInvoice}
              totals={totals}
            />

          </div>
              <div className="mt-10">
          <InvoicePreview invoice={invoice} />
              </div>


        </div>

      </div>

    </div>
  );
}