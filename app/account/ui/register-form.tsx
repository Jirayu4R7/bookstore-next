"use client";
import AlertIcon from "@/app/components/icons/AlertIcon";
import { Input } from "@/app/components/ui/input";
import { resgister } from "@/lib/store/server/account/actions";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import { useToast } from "@/app/components/ui/use-toast";
import { useFormStatus } from "react-dom";

export const registrationSchema = z.object({
  fullname: z.string().min(1, { message: "Full Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="primary-btn-color mx-auto min-w-56 rounded px-8 py-2 font-sans font-medium md:px-5 md:py-1"
    >
      Register
    </button>
  );
}

export default function RegisterForm() {
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      // fullname: "fullname",
      // email: "email@mail.com",
      // password: "123456",
      fullname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registrationSchema>) {
    const resultValidated = registrationSchema.safeParse(values);
    if (resultValidated.success) {
      const result = await resgister(resultValidated.data);
      if (result.success) {
        toast({
          description: "Resgister successfully.",
          duration: 1500,
        });
        form.reset();
      } else {
        setErrorMessage(result?.error);
      }
    }
  }
  return (
    <>
      <section className="flex-1 pt-8 md:pl-10 md:pt-0 xl:pl-20">
        <h2 className="text-xl font-bold">Register</h2>

        {errorMessage && (
          <span className="error inline-block align-text-bottom">
            <AlertIcon className="mr-1 stroke-2 align-middle" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="text"
                    aria-label="Full Name"
                    placeholder="Full Name"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="email"
                    aria-label="E-mail"
                    placeholder="example@mail.com"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="password"
                    aria-label="Password"
                    placeholder="Password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-3 flex w-full">
              <SubmitButton />
              {/* <button
                type="submit"
                className="primary-btn-color mx-auto min-w-56 rounded px-8 py-2 font-sans font-medium md:px-5 md:py-1"
              >
                Register
              </button> */}
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
