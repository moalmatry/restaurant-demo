import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string({ required_error: "please enter phone number" }).refine(
    (val) => {
      const phoneRegex =
        /^[+]?[0-9]{1,4}?[-.\s]?(\([0-9]{1,3}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
      return phoneRegex.test(val);
    },
    {
      message: "Invalid phone number format",
    }
  ),
});

export type LoginInput = z.infer<typeof loginSchema>;
