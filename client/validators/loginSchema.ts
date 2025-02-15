import i18nLocale from "@/lib/locales/i18n";
import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string({ required_error: i18nLocale.t("loginScreen.invalidPhoneNumber") })
    .refine(
      (val) => {
        const phoneRegex =
          /^[+]?[0-9]{1,4}?[-.\s]?(\([0-9]{1,3}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
        return phoneRegex.test(val);
      },
      {
        message: i18nLocale.t("loginScreen.invalidPhoneNumber"),
      }
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;
