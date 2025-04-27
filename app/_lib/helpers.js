export function formatToAED(amount) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const extractImagePath = (publicUrl) => {
  const prefix = "/storage/v1/object/public/activity-images/";
  const pathIndex = publicUrl.indexOf(prefix);
  if (pathIndex === -1) return null;
  return publicUrl.substring(pathIndex + prefix.length);
};

export const preferredDatesArr = [
  {
    id: 110,
    name: "United Arab Emirates (UAE)",
    value: "uae",
  },
  {
    id: 111,
    name: "United Kingdom (UK)",
    value: "uk",
  },
  {
    id: 112,
    name: "Ireland",
    value: "Ireland",
  },
  {
    id: 113,
    name: "Australia",
    value: "Australia",
  },
  {
    id: 114,
    name: "USA",
    value: "USA",
  },
  {
    id: 115,
    name: "Canada",
    value: "Canada",
  },
  {
    id: 115,
    name: "Europe",
    value: "Europe",
  },
  {
    id: 116,
    name: "India",
    value: "India",
  },
  {
    id: 117,
    name: "Middle East",
    value: "Middle East",
  },
  {
    id: 118,
    name: "South Africa",
    value: "South Africa",
  },
  {
    id: 119,
    name: "Asia",
    value: "Asia",
  },
  {
    id: 120,
    name: "Others",
    value: "Others",
  },
];

export const faqsArr = [
  {
    question: "How fast will you reply?",
    answer: "Usually within a few hours – often faster on WhatsApp.",
  },
  {
    question: "Can you create custom stag packages?",
    answer: "Absolutely – tell us your dream, we’ll make it happen.",
  },
  {
    question: "Can you help with last-minute plans?",
    answer: "Yes! Dubai is built for quick legends.",
  },
  {
    question: "How do payments work?",
    answer: "We’ll send you easy, secure options based on your package.",
  },
];
