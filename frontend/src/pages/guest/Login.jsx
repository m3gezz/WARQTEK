import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "../../components/custom/Spinner";
import { Client } from "../../axios/axios";
import { useMainContext } from "../../contexts/MainContext";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .trim()
    .min(5, "Password too short")
    .max(50, "Password too long"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { handleToken, handleUser } = useMainContext();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await Client.get("/sanctum/csrf-cookie");
      const response = await Client.post("/api/login", data);
      handleToken(response.data.token);
      handleUser(response.data.user);
    } catch (err) {
      const errors = err.response?.data?.errors;

      if (errors) {
        Object.keys(errors).forEach((field) => {
          form.setError(field, {
            type: "server",
            message: errors[field][0],
          });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="my-10 mx-auto w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription>Enter the right email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormDescription>Enter your email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password123"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Spinner /> : "Log in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>
            Don't have an account ?
            <Button variant="link" className="font-bold text-warqtek">
              <a>check here</a>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
