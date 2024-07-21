import z from "zod";

export const verifySchema = z.object({
  code: z
    .string({
      message: "Verification code is expected to be a string",
    })
    .length(6, "Verification code must be 6 characters long"),
});
