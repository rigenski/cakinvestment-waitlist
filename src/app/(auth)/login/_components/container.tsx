"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authLogin } from "@/services/auth";
import { TLoginRequest, TVerifyResponse } from "@/services/auth/types";
import { setAdminSession } from "@/utils/admin-session";
import { setSession } from "@/utils/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password harus diisi"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const ADMIN_EMAIL = "admin@test.com";
const ADMIN_PASSWORD = "admin123";

export default function Container() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const authLoginMutation = useMutation({
    mutationFn: authLogin,
    onSuccess: (data) => {
      setSession(data.content as TVerifyResponse);
      toast.success(data.message);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    // Check if admin credentials
    if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
      try {
        await setAdminSession();

        toast.success("Login berhasil");

        router.push("/admin");
        router.refresh();
      } catch (error) {
        toast.error("Terjadi kesalahan saat login");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Email atau password salah");
    }
  };

  return (
    <section className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="w-full max-w-md">
          {/* Logo for Mobile */}
          <div className="mb-6 flex justify-center sm:mb-8">
            <Image
              src="/logo.png"
              alt="CAK Investment Club"
              width={180}
              height={60}
              className="h-8 w-auto sm:h-10"
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Header */}
                <div>
                  <h1 className="text-foreground text-2xl font-semibold sm:text-3xl lg:text-4xl">
                    Login
                  </h1>
                  <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
                    Masuk ke akun Anda untuk mengakses dashboard
                  </p>
                </div>

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Masukkan email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Masukkan password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-gradient-to-b from-[#013599] to-[#295FC9] px-4 py-2.5 font-semibold text-white hover:from-[#012a7a] hover:to-[#1e4da3] sm:px-6 sm:py-3"
                  size="lg"
                >
                  {isLoading ? "Memproses..." : "Masuk"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
