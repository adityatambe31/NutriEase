"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { submitContactForm } from "@/features/form-action";
import { motion } from "framer-motion";
import { contact } from "@/config/landing-page";

interface ContactFormProps {
  data: {
    contact: typeof contact;
  };
}

export function ContactForm({ data }: ContactFormProps) {
  const { section, form } = data.contact[0]; // Fixed: destructure both section and form
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setPending(true);
    try {
      const response = await submitContactForm(formData);
      setMessage(response.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section id={section.id} className="py-12 md:py-12 lg:py-15">
      <div className={`relative max-w-(--breakpoint-2xl) mx-auto px-4 md:px-6 `}>
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, transform: "translateX(5px)" }}
            animate={{ opacity: 1, transform: "translateX(0)" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <form action={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {form.name.label}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={form.name.placeholder}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    {form.email.label}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={form.email.placeholder}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    {form.message.label}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={form.message.placeholder}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending
                    ? form.submitButton.loadingText
                    : form.submitButton.text}
                </Button>
                {message && (
                  <p className="text-sm text-center mt-4 text-muted-foreground">
                    {message}
                  </p>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
