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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TWaitlistRequest = {
  name: string;
  email: string;
  phone: string;
};

type TWaitlistResponse = {
  content: {
    id: string;
    name: string;
    email: string;
    phone: string;
    created_at: string;
  };
  message: string;
  errors: unknown;
};

const waitlistSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama wajib diisi" })
    .max(80, { message: "Nama maksimal 80 karakter" }),
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" }),
  phone: z
    .string()
    .min(5, { message: "No. HP minimal 5 digit" })
    .max(20, { message: "No. HP maksimal 20 digit" }),
});

export default function Container() {
  const form = useForm<TWaitlistRequest>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (payload: TWaitlistRequest) => {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: TWaitlistResponse = await res.json();

      if (!res.ok) {
        const message =
          res.status === 409
            ? "Email atau No. HP sudah terdaftar."
            : data?.message || "Gagal mendaftar.";
        throw new Error(message);
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Kamu berhasil masuk waitlist!");
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (value: TWaitlistRequest) => {
    waitlistMutation.mutate(value);
  };

  return (
    <section className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side - Waitlist Form */}
      <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8 sm:px-6 lg:w-1/2 lg:px-8 lg:py-12">
        <div className="w-full max-w-md">
          {/* Logo for Mobile */}
          <div className="mb-6 flex justify-center sm:mb-8 lg:hidden">
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
                    Gabung Waitlist
                  </h1>
                  <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
                    Masukkan data diri kamu untuk bergabung waitlist dan
                    dapatkan akses ke komunitas kami.
                  </p>
                </div>

                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          placeholder="hi@filanita.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No. HP</FormLabel>
                      <FormControl>
                        <Input placeholder="628xxxxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={waitlistMutation.isPending}
                  className="w-full rounded-full bg-gradient-to-b from-[#013599] to-[#295FC9] px-4 py-2.5 font-semibold text-white hover:from-[#012a7a] hover:to-[#1e4da3] sm:px-6 sm:py-3"
                  size="lg"
                >
                  {waitlistMutation.isPending
                    ? "Memproses..."
                    : "Gabung Sekarang"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden w-1/2 px-4 py-6 lg:block lg:px-6 lg:py-8 xl:px-8 xl:py-12">
        <div className="h-full w-full rounded-2xl bg-gradient-to-br from-[#013599] via-[#1a4bb5] to-[#295FC9]">
          <div className="flex h-full w-full flex-col justify-center bg-[url('/app/login/welcome-bg.png')] bg-contain bg-top bg-no-repeat p-6 lg:p-8 xl:p-12">
            <div className="mx-auto w-full max-w-xl">
              {/* Logo */}
              <div className="mb-4 lg:mb-6">
                <Image
                  src="/logo-light.png"
                  alt="CAK Investment Club"
                  width={240}
                  height={240}
                  className="h-8 w-auto lg:h-10"
                />
              </div>

              {/* Main Content */}
              <div className="mb-6 lg:mb-8">
                <h2 className="mb-2 text-2xl font-semibold text-white lg:text-3xl">
                  Selamat Datang
                </h2>
                <p className="mb-3 text-sm text-blue-50/90 lg:mb-4 lg:text-base">
                  Cak Investment Club membantu kamu belajar investasi yang lebih
                  cerdas melalui data pasar yang akurat dan insight mendalam.
                </p>
              </div>

              {/* Feature Card */}
              <div className="bg-card rounded-2xl p-6 shadow-xl lg:rounded-3xl lg:p-8">
                <h3 className="text-foreground mb-3 text-xl font-semibold lg:mb-4 lg:text-2xl">
                  Dapatkan Arah Belajar
                  <br /> Investasi yang Tepat
                </h3>

                {/* Profile Images */}
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
                  <p className="text-muted-foreground text-sm lg:text-base">
                    Jadi yang pertama menikmati cara termudah untuk memantau
                    portofolio, memahami pasar, dan menemukan peluang investasi
                    yang sesuai dengan tujuanmu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
