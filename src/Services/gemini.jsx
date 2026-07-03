import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are an AI Invoice Generator.

Always return ONLY valid JSON.

Never explain anything.

Never use markdown.

Schema:

{
  "company":{
    "name":"",
    "email":"",
    "phone":"",
    "address":"",
    "gstNumber":""
  },

  "customer":{
    "name":"",
    "email":"",
    "phone":"",
    "address":""
  },

  "invoiceInfo":{
    "invoiceNumber":"",
    "invoiceDate":"",
    "dueDate":"",
    "currency":"INR",
    "status":"Draft"
  },

  "items":[
    {
      "name":"",
      "qty":1,
      "price":0
    }
  ],

  "tax":{
    "gst":18,
    "discount":0,
    "shipping":0
  }
}
`;

function cleanJSON(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

function normalizeInvoice(data) {
  return {
    company: {
      name: data.company?.name ?? "",
      email: data.company?.email ?? "",
      phone: data.company?.phone ?? "",
      address: data.company?.address ?? "",
      gstNumber: data.company?.gstNumber ?? "",
    },

    customer: {
      name: data.customer?.name ?? "",
      email: data.customer?.email ?? "",
      phone: data.customer?.phone ?? "",
      address: data.customer?.address ?? "",
    },

    invoiceInfo: {
      invoiceNumber:
        data.invoiceInfo?.invoiceNumber ??
        `INV-${Date.now()}`,

      invoiceDate:
        data.invoiceInfo?.invoiceDate ??
        new Date().toISOString().split("T")[0],

      dueDate:
        data.invoiceInfo?.dueDate ?? "",

      currency:
        data.invoiceInfo?.currency ?? "INR",

      status:
        data.invoiceInfo?.status ?? "Draft",
    },

    items:
      data.items?.map((item) => ({
        name: item.name ?? "",
        qty: Number(item.qty) || 1,
        price: Number(item.price) || 0,
      })) ?? [],

    tax: {
      gst: Number(data.tax?.gst) || 18,
      discount: Number(data.tax?.discount) || 0,
      shipping: Number(data.tax?.shipping) || 0,
    },
  };
}

export async function generateInvoice(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${SYSTEM_PROMPT}

User Request:

${prompt}`,
  });

  let text = response.text;

  text = cleanJSON(text);

  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch (err) {
    console.error(text);
    throw new Error("Invalid JSON returned by Gemini.");
  }

  return normalizeInvoice(parsed);
}