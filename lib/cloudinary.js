export async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "anon_confession");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
    { method: "POST", body: data }
  );

  return await res.json();
}
