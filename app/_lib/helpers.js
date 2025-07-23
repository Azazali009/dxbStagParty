import DOMPurify from "isomorphic-dompurify";

export function formatToAED(amount) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
export async function deleteImagesFromBucket(
  supabase,
  imageUrls = [],
  bucketName,
) {
  if (!imageUrls.length) return { error: "No image URLs provided" };

  // sab image paths extract karo
  const imagePaths = imageUrls
    .map((url) => decodeURIComponent(url.split(`/${bucketName}/`)[1]))
    .filter((path) => !!path); // null ya undefined hatao

  if (!imagePaths.length) return { error: "No valid image paths extracted" };

  const { error: storageError } = await supabase.storage
    .from(bucketName)
    .remove(imagePaths);

  if (storageError) {
    console.log("Image deletion error:", storageError);
    return { error: "Unable to delete images. Please try again later." };
  }
  return { success: true };
}

export async function uploadSingleImageToBucket(supabase, file, bucketName) {
  if (!file) return { error: "No file provided" };

  const uniqueFileName = `${Math.random()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(uniqueFileName, file);

  if (uploadError) {
    console.log("Upload error:", uploadError);
    return { error: "Unable to upload image. Please try again later." };
  }

  const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${uniqueFileName}`;

  return { success: true, path: uniqueFileName, publicUrl };
}

export let toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["link", "image", "video", "formula"], // add's image support
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

export function sanitizeHtml(dirty) {
  return DOMPurify.sanitize(dirty);
}

export const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const faqs = [
  {
    id: 111,
    question: "How do I book a stag party with DXB Stag Parties?",
    answer:
      "Our platform is designed for easy online booking. Browse experiences or packages, select your preferences, and book everything directly through the website — no waiting, no back-and-forth. If you have questions or need help, our team is available via WhatsApp or email, and a concierge can assist you. For a next-level service, you can book a dedicated stag concierge or chaperone who will act as your on-site fixer and personal planner. This premium service comes at an additional cost but guarantees a stress-free weekend.",
    type: "Booking & Planning",
  },
  {
    id: 222,
    question: "Can I customise a package or build my own itinerary?",
    answer:
      "Yes. You can either start with a themed package and tweak it, or build your own lineup from scratch using our activities. Our system handles it all online — or contact us if you need assistance.",
    type: "Booking & Planning",
  },
  {
    id: 333,
    question: "Do I have to pay for the full group upfront?",
    answer:
      "No. Our system allows individual payments so each group member can pay their share. You can also assign costs to specific guests (like splitting the groom’s share).",
    type: "Booking & Planning",
  },
  {
    id: 444,
    question: "Can we add or remove people after booking?",
    answer:
      "Yes, as long as it’s within the supplier’s change window. Just reach out and we’ll adjust your group size if availability allows.",
    type: "Booking & Planning",
  },
  {
    id: 555,
    question: "Is there a minimum group size?",
    answer:
      "Most activities require a minimum of 4–6 people. Premium packages like yachts or exclusive lounges may require 8–10 minimum. Each listing shows the required group size.",
    type: "Booking & Planning",
  },
  {
    id: 666,
    question: "What’s the payment process?",
    answer:
      "Once you choose your experiences, payment is made online at checkout. We don’t offer refundable holds — payment is required to confirm any booking.For last-minute or VIP-level requests, we offer an Express Concierge option at a cost, which includes personal planning, express handling, and a dedicated stag manager.",
    type: "Payments & Deposits",
  },
  {
    id: 777,
    question: "How do individual payments work?",
    answer:
      "When you confirm a booking, each guest receives a personal payment link. Everyone pays their share securely, and the organiser can track who’s paid.",
    type: "Payments & Deposits",
  },
  {
    id: 888,
    question: "Can we pay in a different currency?",
    answer:
      "Prices are listed in AED, but we accept all major international cards. Your bank will handle the conversion automatically.",
    type: "Payments & Deposits",
  },
  {
    id: 999,
    question: "Can we split the groom’s cost across the group?",
    answer:
      "Yes. During checkout, you can choose to divide the groom’s share across everyone else. Our system handles the math for you.",
    type: "Payments & Deposits",
  },
  {
    id: 1010,
    question: "Where do we meet for each activity?",
    answer:
      "Your final itinerary will include all meeting points, contact info, and arrival times. It’s sent to the organiser and each group member before the weekend.",
    type: "The Weekend Itself",
  },
  {
    id: 1011,
    question: "Do you provide transport between activities?",
    answer:
      "Yes — you can add transport options like private vans, limos, or even party buses during booking. Let us know if you want an upgrade.",
    type: "The Weekend Itself",
  },
  {
    id: 1012,
    question: "Can we drink alcohol at all activities?",
    answer:
      "Only at licensed venues (clubs, bars, restaurants, yachts). Alcohol is not permitted at public desert activities or sports zones.",
    type: "The Weekend Itself",
  },
  {
    id: 1013,
    question: "What happens if we’re late?",
    answer:
      "Late arrivals may result in shorter sessions or missed experiences. Suppliers have different grace periods — check your itinerary and stay punctual!",
    type: "The Weekend Itself",
  },
  {
    id: 1014,
    question: "Is it legal to have a stag party in Dubai?",
    answer:
      "Yes — Dubai welcomes groups, but there are rules. Public nudity, extreme drunkenness, or disorderly behaviour can get you fined or worse. Keep the wildness to private venues, and you’re good.",
    type: "Dubai-Specific Info",
  },
  {
    id: 1015,
    question: "Are there dress or behaviour restrictions?",
    answer:
      "Yes, especially in public. No offensive costumes, no toplessness, and no swearing at strangers. In private venues, you can relax — but stay respectful.",
    type: "Dubai-Specific Info",
  },
  {
    id: 1016,
    question: "Can we bring alcohol ourselves?",
    answer:
      " Yes — tourists can now purchase alcohol legally from licensed retailers by presenting a passport. You’ll be registered in-store and granted a temporary license. Bars, clubs, and restaurants still serve alcohol freely to tourists. Just don’t drink in public or bring your own alcohol into unlicensed areas.",
    type: "Dubai-Specific Info",
  },
  {
    id: 1017,
    question: "Can we cancel activities after booking?",
    answer:
      "Each supplier has a cancellation policy, typically allowing cancellations 7–14 days, some are 30 days, in advance. Inside that window, charges may apply.",
    type: "Changes & Cancellations",
  },
  {
    id: 1018,
    question: "What if someone drops out?",
    answer:
      "We can adjust the group size if enough notice is given, though late changes may still incur charges depending on the supplier.",
    type: "Changes & Cancellations",
  },
  {
    id: 1019,
    question: "Can we reschedule?",
    answer:
      "Yes — if requested early enough. Late reschedules may be treated as cancellations depending on supplier availability and timing.",
    type: "Changes & Cancellations",
  },
  {
    id: 1020,
    question: "Is DXB Stag Parties an agency?",
    answer:
      "No. We’re a direct platform that hand-picks Dubai’s best stag-friendly experiences. We work with top-rated suppliers to ensure quality and avoid random third-party listings.",
    type: "General Support",
  },
  {
    id: 1021,
    question: "Do we get support during the weekend?",
    answer:
      "Yes. You’ll have a WhatsApp contact for support before and during your trip. Book the Stag Concierge Service if you want someone available on the ground with you at all times.",
    type: "General Support",
  },
  {
    id: 1022,
    question: " What if something goes wrong?",
    answer:
      "Contact us immediately. We’ll liaise with the supplier to try to fix the issue — but keep in mind that delays, drunken damage, or no-shows are outside our control.",
    type: "General Support",
  },
  {
    id: 1022,
    question: " Do you offer hen parties too?",
    answer:
      "We do! Visit DXB Hen Parties for stylish, female-friendly experiences — from glam pool days to yacht brunches and everything in between.",
    type: "General Support",
  },
];

export function parseDuration(durationStr) {
  if (!durationStr) return { amount: 0, unit: "minutes" };

  const match = durationStr.match(/(\d+)-?(\d+)?\s*(mins?|hr|hours?)/i);

  if (!match) return { amount: 0, unit: "minutes" };

  const amount = parseInt(match[1]); // take the lower bound
  const unitRaw = match[3]?.toLowerCase();

  let unit = "minutes";
  if (unitRaw.includes("hr")) unit = "hours";

  return { amount, unit };
}
