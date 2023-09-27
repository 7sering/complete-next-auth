import vine from "@vinejs/vine";

export const registerSchema = vine.object({
  name: vine.string().trim().minLength(2).maxLength(30),
  email: vine.string().email(),
  password: vine.string().minLength(8).maxLength(30).confirmed(),
});
