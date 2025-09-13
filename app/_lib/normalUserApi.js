import { createClient } from "../_utils/supabase/client";

const supabase = createClient();

export async function updateUserProfile({
  userId,
  fullName,
  avatar,
  password,
}) {
  //   const imageName = `${Math.random()}-${avatar.name}`;
  //   const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user-avatar/${imageName}`;
  //   1. upload user image
  //   if (avatar && avatar.size > 0) {
  //     const { error: storageError } = await supabase.storage
  //       .from("user-avatar")
  //       .upload(imageName, avatar);
  //     if (storageError) {
  //       console.log(storageError);
  //       throw new Error("Some server error has occurred while uploading image.");
  //     }
  //   }
  // 2. Update Supabase Auth metadata
  const { error: authUpdateError } = await supabase.auth.updateUser({
    data: {
      full_name: "azaz",
      //   avatar_url: imagePath,
    },
    // ...(password && { password }),
  });
  if (authUpdateError) {
    console.log(authUpdateError);
    throw new Error("Failed to update Supabase Auth user");
  }
  // 3. Update your custom users table
  const { error: userTableError } = await supabase
    .from("users")
    .update({
      fullName: "azaz",
      avatar: imagePath,
    })
    .eq("id", userId);
  if (userTableError) {
    throw new Error("Failed to update custom user profile");
  }
}
