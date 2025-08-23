"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../_utils/supabase/server";
import { getCurrentUser } from "./getCurrentUser";
import {
  ALLOWED_TYPES,
  deleteImagesFromBucket,
  MAX_FILE_SIZE,
  uploadSingleImageToBucket,
} from "./helpers";
import { redirect } from "next/navigation";
import { getBlogById } from "./blogApi";

export async function addBlog(bolgBody, formData) {
  const supabase = await createClient();
  // Check if user is logged in and is an admin
  const user = await getCurrentUser();
  if (!user || user?.user_metadata?.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  // get form data
  const name = formData.get("name")?.slice(0, 100);
  const category = formData.get("category")?.slice(0, 100);
  const description = formData.get("description")?.slice(0, 100);
  const image = formData.get("image");
  const blogContent = bolgBody.value;
  const blogCategoryId = Number(bolgBody.selectedCategory);

  //   check for empty fields
  if (!name || !category || !image || !description)
    return { error: "Please fill required fields" };

  //   check image type and size
  if (
    image &&
    image.size > 0 &&
    (!ALLOWED_TYPES.includes(image.type) || image.size > MAX_FILE_SIZE)
  ) {
    return { error: "Blog image must be JPG, PNG or WEBP and less than 1MB" };
  }

  let imagePath;
  //   upload image
  if (image && image.size > 0) {
    const resUpload = await uploadSingleImageToBucket(
      supabase,
      image,
      "blog-image",
    );
    if (resUpload.error) return { error: resUpload.error };
    imagePath = resUpload?.publicUrl;
  }
  //   insert data to the database
  const { error: insertError } = await supabase.from("blog").insert([
    {
      name,
      category,
      blogContent,
      image: imagePath,
      userId: user.id,
      description,
      category: blogCategoryId,
    },
  ]);

  if (insertError) {
    // Rollback uploaded image if DB insert fails

    await supabase.storage.from("blog-image").remove([imageName]);
    return { error: "Unable to add blog. Please try after a while" };
  }
  revalidatePath(`/dashboard/blog`);

  redirect("/dashboard/blog");
}

export async function editBlog(blogBody, formData) {
  const supabase = await createClient();
  // Check if user is logged in and is an admin
  const user = await getCurrentUser();
  if (!user || user?.user_metadata?.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  const name = formData.get("name")?.slice(0, 100);
  const category = formData.get("category");
  const description = formData.get("description")?.slice(0, 1000);
  const image = formData.get("image");
  const existingImage = formData.get("existingImage");
  const blogContent = blogBody.value;
  const blogId = blogBody.blogId;

  if (!name || !category || !blogContent || !description)
    return { error: "Please fill required fields" };

  //   check image type and size
  if (
    image &&
    image.size > 0 &&
    (!ALLOWED_TYPES.includes(image.type) || image.size > MAX_FILE_SIZE)
  ) {
    return { error: "Blog image must be JPG, PNG or WEBP and less than 1MB" };
  }
  let imagePath;
  //   upload image
  if (image && image.size > 0) {
    const resUpload = await uploadSingleImageToBucket(
      supabase,
      image,
      "blog-image",
    );

    if (resUpload.error) return { error: resUpload.error };
    imagePath = resUpload?.publicUrl;

    const oldImagePath = existingImage?.split("/").pop();
    oldImagePath &&
      (await supabase.storage.from("blog-image").remove([oldImagePath]));
  }
  // update DB

  const { error: updateError } = await supabase
    .from("blog")
    .update({
      name,
      category,
      blogContent,
      description,
      image: image.size > 0 ? imagePath : existingImage,
    })
    .eq("id", blogId);

  if (updateError) return { error: "Something went wrong. Please try later" };

  revalidatePath(`/dashboard/blog/edit-blog/${blogId}`);
  revalidatePath(`/dashboard/blog`);

  redirect("/dashboard/blog");
}

export async function deleteBlog(id) {
  const supabase = await createClient();
  // Check if user is logged in and is an admin
  const user = await getCurrentUser();
  if (!user || user?.user_metadata?.role !== "admin")
    return { error: "You are not allowed to perform this action" };

  // get current blog
  const blog = await getBlogById(id);
  const blogImageUrl = blog?.image;

  //1) delete blog
  const { error: deleteError } = await supabase
    .from("blog")
    .delete()
    .eq("id", id);
  if (deleteError) return { error: "Unable to delete blog. Please try again" };

  // 2) delete image from bucket
  if (blogImageUrl) {
    const resDelete = await deleteImagesFromBucket(
      supabase,
      [blogImageUrl],
      "blog-image",
    );
    if (resDelete?.error) {
      return { error: resDelete?.error };
    }
  }

  revalidatePath(`/dashboard/blog`);
}
