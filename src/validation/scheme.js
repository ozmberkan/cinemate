import z from "zod";

export const registerScheme = z.object({
  email: z.string().min(1, "Lütfen en az bir karakter giriniz."),
  username: z.string().min(1, "Lütfen en az bir karakter giriniz."),
  password: z.string().min(1, "Lütfen en az bir karakter giriniz."),
});

export const loginScheme = z.object({
  email: z.string().min(1, "Lütfen en az bir karakter giriniz."),
  password: z.string().min(1, "Lütfen en az bir karakter giriniz."),
});
