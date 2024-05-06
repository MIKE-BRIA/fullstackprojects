"use server";

export async function shareBlog(formData) {
  const blog = {
    writer: formData.get("name"),
    email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    blog: formData.get("blog"),
  };

  console.log(blog);
}
