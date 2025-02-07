"use client";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import zod from "zod";
import { contactSchema } from "@/schema";
import { Input } from "../ui/input";
import {
  useFetchContactInfoQuery,
  useUpdateContactInfoMutation,
} from "@/lib/features/api/contactApiSlice";
import toast from "react-hot-toast";
import { FetchQueryError } from "@/types/interface";
import Loader from "../Loader";
import { Button } from "../ui/button";

const Contact = () => {
  const { data } = useFetchContactInfoQuery();
  const contactInfo = data?.payload;

  const [updateContactInfoApi, { isLoading }] = useUpdateContactInfoMutation();

  const form = useForm<zod.infer<typeof contactSchema>>({
    defaultValues: {
      whatsapp: contactInfo?.whatsapp || "",
      facebook: contactInfo?.facebook || "",
      telegram: contactInfo?.telegram || "",
    },
  });

  const handleSaveContact = (data: zod.infer<typeof contactSchema>) => {
    updateContactInfoApi({
      facebook: data.facebook,
      whatsapp: data.whatsapp,
      telegram: data.telegram,
    })
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success("Contact Info updated");
        }
      })
      .catch((error: FetchQueryError) => {
        if (error.data.message) {
          toast.error(error.data.message);
        } else {
          toast.error("Unknown Error Try agin");
        }
      });
  };

  useEffect(() => {
    if (contactInfo) {
      form.reset({
        whatsapp: contactInfo?.whatsapp || "",
        facebook: contactInfo?.facebook || "",
        telegram: contactInfo?.telegram || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactInfo]);

  return (
    <div className="bg-primary-foreground shadow-md p-4 rounded-md md:p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSaveContact)}>
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook (URL)</FormLabel>
                <FormControl>
                  <Input placeholder="Facebook.." {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Whatsapp (Phone)</FormLabel>
                <FormControl>
                  <Input placeholder="Whatsapp.." {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telegram (URL)</FormLabel>
                <FormControl>
                  <Input placeholder="Telegram.." {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size={"sm"} className="mt-1">Save</Button>
        </form>
      </Form>

      {isLoading && <Loader />}
    </div>
  );
};

export default Contact;
