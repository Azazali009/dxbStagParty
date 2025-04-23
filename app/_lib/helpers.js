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
