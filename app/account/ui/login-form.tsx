"use client";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useToast } from "@/app/components/ui/use-toast";
import { login } from "@/lib/store/server/account/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(3),
  password: z.string().min(6).max(32),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="primary-btn-color mx-auto min-w-56 rounded px-8 py-2 font-sans font-medium md:px-5 md:py-1"
    >
      Login
    </button>
  );
}

export default function LoginForm() {
  const ref = useRef(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      // defaultValue="user1@email.com"
      // defaultValue="123456"
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const resultValidated = loginSchema.safeParse(values);
    if (resultValidated.success) {
      // const formData = new FormData();
      // formData.append("email", resultValidated.data.email);
      // formData.append("password", resultValidated.data.password);
      const result = await login(resultValidated.data);
      if (result.success) {
        toast({
          description: "Login successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          description: "E-mail or Password incorrect.",
        });
      }
    }
  }

  return (
    <>
      <section className="flex-1 pb-8 md:pb-0 md:pr-10 xl:pr-20">
        <h2 className="text-xl font-bold">Login</h2>
        <Form {...form}>
          <form
            ref={ref}
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Input
                    aria-label="E mail"
                    placeholder="example@mail.com"
                    type="email"
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
                    aria-label="Password"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-3 flex w-full">
              <SubmitButton />
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
