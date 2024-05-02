"use client";
import { useFormState } from "react-dom";
import {
  RegistrationSchema,
  registrationSchema,
} from "@/lib/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { onRegisterAction } from "@/actions/register-action";
import { onRegisterFormActionAction } from "@/actions/register-form-data-actions";

export default function RegistrationForm() {
  const form = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      zipCode: "",
    },
  });

  const [formState, formAction] = useFormState(onRegisterFormActionAction, {
    message: "",
  });

  const onSubmit = async (data: RegistrationSchema) => {
    const formData = new FormData();
    formData.append("first", data.first);
    formData.append("last", data.last);
    formData.append("email", data.email);

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    fetch("/api/register-form", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    await onRegisterAction(data);
    //await onRegisterFormActionAction(formData);
  };

  return (
    <Form {...form}>
      <div>{formState?.message}</div>
      <form
        action={formAction}
        className="space-y-8"
        // onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormDescription>Your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormDescription>Your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormDescription>Your zipcode (NNNNN).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {formState?.message ? "Register done!" : "Register"}
        </Button>
      </form>
    </Form>
  );
}
