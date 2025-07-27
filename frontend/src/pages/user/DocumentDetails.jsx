import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../components/ui/button";
import { Client } from "../../axios/axios";
import { useMainContext } from "../../contexts/MainContext";
import Spinner from "../../components/custom/Spinner";

export default function DocumentDetails() {
  const { idDocument } = useParams();
  const { token } = useMainContext();
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDocument = async () => {
    setLoading(true);

    try {
      await Client.get("/sanctum/csrf-cookie");
      const response = await Client.get(`/api/documents/${idDocument}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDocument(response.data.document);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDelLoading(true);

    try {
      await Client.get("/sanctum/csrf-cookie");
      await Client.delete(`/api/documents/${idDocument}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/user/documents");
    } catch (err) {
      console.error(err.message);
    } finally {
      setDelLoading(false);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);
  return (
    <main className="select-none">
      {loading ? (
        <div className="mx-auto w-fit my-30">
          <Spinner />
        </div>
      ) : (
        <Card className="max-w-200 mx-auto mt-10">
          <CardHeader>
            <CardTitle>{document.document_type}</CardTitle>
            <CardDescription
              className={`text-green-400 ${
                document.status === "processing" && "text-blue-400"
              } ${document.status === "on going" && "text-yellow-400"}`}
            >
              {document.status}
            </CardDescription>
            <CardAction>
              <Button
                variant="destructive"
                disabled={delLoading}
                onClick={handleDelete}
              >
                {delLoading ? <Spinner /> : "Delete"}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2 flex flex-col items-center">
            <div className="border-2 p-2 rounded-md w-[90%] space-y-2">
              <CardTitle>Email</CardTitle>
              <CardDescription>{document.email}</CardDescription>
            </div>
            <div className="border-2 p-2 rounded-md w-[90%] space-y-2">
              <CardTitle>Delivery method</CardTitle>
              <CardDescription>{document.delivery_method}</CardDescription>
            </div>
            <div className="border-2 p-2 rounded-md w-[90%] space-y-2">
              <CardTitle>Address</CardTitle>
              <CardDescription>
                {document.address ? document.address : "No address given"}
              </CardDescription>
            </div>
            <div className="border-2 p-2 rounded-md w-[90%] space-y-2">
              <CardTitle>City</CardTitle>
              <CardDescription>
                {document.city ? document.city : "No city given"}
              </CardDescription>
            </div>
            <div className="border-2 p-2 rounded-md w-[90%] space-y-2">
              <CardTitle>Postal code</CardTitle>
              <CardDescription>
                {document.postal_code
                  ? document.postal_code
                  : "No postal code given"}
              </CardDescription>
            </div>
            <div className="border-2 p-2 rounded-md w-[90%] space-y-2">
              <CardTitle>Submitted at</CardTitle>
              <CardDescription>
                {document.created_at && document.created_at.slice(0, 10)}
                {" in "}
                {document.created_at && document.created_at.slice(11, 16)}
              </CardDescription>
            </div>
            <div className="border-2 p-2 rounded-md w-[90%] space-y-2">
              <CardTitle>Reason</CardTitle>
              <CardDescription>{document.reason}</CardDescription>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
