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
