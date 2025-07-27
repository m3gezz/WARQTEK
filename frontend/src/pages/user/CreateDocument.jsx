import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "../../components/ui/label";
import { documentTypes } from "../../assets/data/documentsTypes";
import { pickUp } from "../../assets/data/pickUp";
import { useForm } from "react-hook-form";
import Error from "../../components/custom/Error";
import { useMainContext } from "../../contexts/MainContext";
import Spinner from "../../components/custom/Spinner";
import DoneCreation from "../../components/custom/DoneCreation";
import { Client } from "../../axios/axios";

const schema = z
  .object({
    pick: z.enum(pickUp),
    email: z.string().email().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    postal: z.string().optional(),
    reason: z.string().trim().min(20, "The reason is too short"),
    documentType: z.enum(documentTypes),
  })
  .superRefine((data, ctx) => {
    if (data.pick === "Mail") {
      if (!data.address || data.address.trim().length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address"],
          message: "Address is required for mail delivery.",
        });
      }

      if (!data.city || data.city.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["city"],
          message: "City is required for mail delivery.",
        });
      }

      if (!data.postal || !/^\d{4,10}$/.test(data.postal)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["postal"],
          message: "Postal code must be 4–10 digits for mail delivery.",
        });
      }
    }

    if (data.pick === "Email") {
      if (!data.email || !z.string().email().safeParse(data.email).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "A valid email is required for email delivery.",
        });
      }
    }
  });

export default function CreateDocument() {
  const { token, user } = useMainContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, submitCount },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      documentType: "School Certificate",
      pick: "Email",
      email: user.email,
      address: "",
      city: "",
      postal: "",
      reason: "",
    },
  });

  const selectedDocument = watch("documentType");
  const selectedPick = watch("pick");

  const onSubmit = async (data) => {
    setLoading(true);
    const document = {
      document_type: data.documentType,
      delivery_method: data.pick,
      email: data.email,
      address: data.address,
      city: data.city,
      postal_code: data.postal,
      reason: data.reason,
    };

    try {
      await Client.get("/sanctum/csrf-cookie");
      await Client.post("/api/documents", document, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpen(true);
    } catch (err) {
      if (err.response?.status === 422 && err.response.data.errors) {
        const serverErrors = err.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: serverErrors[field][0],
          });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-[90%] max-w-200 mx-auto my-20">
        <CardHeader className="select-none">
          <CardTitle className="text-2xl">Request Documents</CardTitle>
          <CardDescription>
            Find the exact government document, certificate, or application you
            need and fill the fields needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
            <section className="flex select-none py-4 justify-center gap-10 flex-wrap items-center">
              <CardTitle className="w-full text-3xl text-center">
                Administrative Documents <br />
                {errors.documentType && (
                  <Error>{errors.documentType.message}</Error>
                )}
              </CardTitle>
              {documentTypes.map((type, index) => (
                <div key={index}>
                  <label
                    htmlFor={type}
                    className={`${
                      selectedDocument == type
                        ? "bg-foreground text-background"
                        : "bg-background text-foreground"
                    }  border-2 border-foreground px-8 py-2 rounded-3xl`}
                  >
                    {type}
                  </label>
                  <input
                    type="radio"
                    {...register("documentType")}
                    id={type}
                    value={type}
                    className="hidden"
                  />
                </div>
              ))}
            </section>
            <section className="flex select-none p-4 justify-center gap-8 flex-wrap items-center">
              <CardTitle className="w-full text-3xl text-center">
                Preferred Delivery Method <br />
                {errors.pick && <Error>{errors.pick.message}</Error>}
              </CardTitle>
              {pickUp.map((type, index) => (
                <div key={index}>
                  <label
                    htmlFor={type}
                    className={`${
                      selectedPick == type
                        ? "bg-foreground text-background"
                        : "bg-background text-foreground"
                    }  border-2 border-foreground px-8 py-2 rounded-3xl`}
                  >
                    {type}
                  </label>
                  <input
                    type="radio"
                    {...register("pick")}
                    id={type}
                    value={type}
                    className="hidden"
                  />
                </div>
              ))}
            </section>
            <section className="space-y-10 w-[80%] mx-auto">
              {selectedPick == "Email" && (
                <div className="space-y-3">
                  <Label htmlFor="email">Select the email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && <Error>{errors.email.message}</Error>}
                </div>
              )}
              {selectedPick == "Mail" && (
                <div className="space-y-10">
                  <div className="space-y-3">
                    <Label htmlFor="address">Enter your address</Label>
                    <Input
                      type="text"
                      id="address"
                      placeholder="Address"
                      {...register("address")}
                    />
                    {errors.address && <Error>{errors.address.message}</Error>}
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="city">Enter your city</Label>
                    <Input
                      type="text"
                      id="city"
                      placeholder="City"
                      {...register("city")}
                    />
                    {errors.city && <Error>{errors.city.message}</Error>}
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="postal">Enter your postal code</Label>
                    <Input
                      type="text"
                      id="postal"
                      placeholder="Postal code"
                      {...register("postal")}
                    />
                    {errors.postal && <Error>{errors.postal.message}</Error>}
                  </div>
                </div>
              )}
              {selectedPick == "Pickup" && (
                <div className="space-y-2 max-w-sm mx-auto text-center">
                  You will be able to get your document in the nearest
                  institution in after 24h from the submission
                </div>
              )}
              <div className="grid w-full gap-3">
                <Label htmlFor="reason">The reason for this request</Label>
                <Textarea
                  placeholder="Type your reason here."
                  id="reason"
                  {...register("reason")}
                />
                {errors.reason && <Error>{errors.reason.message}</Error>}
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <Button
                  className="w-full"
                  disabled={loading || errors.documents}
                >
                  {loading ? <Spinner /> : "Submit"}
                </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center select-none m-2 leading-8">
                      <DoneCreation />
                      The{" "}
                      <span className="text-green-800">
                        {selectedDocument}
                      </span>{" "}
                      request has been submitted successfully !
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              {errors.documents && (
                <Error>
                  <p className="text-center p-2">{errors.documents.message}</p>
                </Error>
              )}
            </section>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
