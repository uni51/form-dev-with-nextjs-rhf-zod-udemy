"use client";

import { Input } from "../ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";

const MailForm = () => {
  const form = useForm();

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={() => {
          form.handleSubmit(onSubmit);
        }}
        className="container flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default MailForm;
