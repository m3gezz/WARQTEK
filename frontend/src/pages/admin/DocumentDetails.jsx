import React, { useEffect, useRef, useState } from "react";
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
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [edLoading, setEdLoading] = useState(false);
  const navigate = useNavigate();
  const select = useRef();

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
      setUser(response.data.user);
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

      navigate("/admin");
    } catch (err) {
      console.error(err.message);
    } finally {
      setDelLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEdLoading(true);

    try {
      const selectValue = select.current.value;
      if (selectValue === document.status) {
        return;
      }

      const newDocument = { ...document, status: selectValue };
      await Client.get("/sanctum/csrf-cookie");
      await Client.put(`/api/documents/${idDocument}`, newDocument, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin");
    } catch (err) {
      console.error(err.message);
    } finally {
      setEdLoading(false);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);
  return (
    <>
      {loading ? (
        <div className="mx-auto w-fit my-30">
          <Spinner />
        </div>
      ) : (
        <Card className="max-w-200 mx-auto mt-10">
          <CardHeader>
            <CardTitle>{document.document_type}</CardTitle>
            <CardDescription className="text-blue-400">
              {user.last_name + " " + user.first_name}
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
              <CardTitle>Status</CardTitle>
              <CardDescription>
                <form
                  className="flex justify-between items-center"
                  onSubmit={handleSubmit}
                >
                  <select ref={select} className="border-2 rounded-sm p-1">
                    <option value={document.status}>{document.status}</option>
                    {document.status === "processing" && (
                      <>
                        <option value="on going">on going</option>
                        <option value="ready">ready</option>
                      </>
                    )}
                    {document.status === "on going" && (
                      <>
                        <option value="ready">ready</option>
                        <option value="processing">processing</option>
                      </>
                    )}
                    {document.status === "ready" && (
                      <>
                        <option value="processing">processing</option>
                        <option value="on going">on going</option>
                      </>
                    )}
                  </select>
                  <Button disabled={edLoading}>
                    {edLoading ? <Spinner /> : "Change"}
                  </Button>
                </form>
              </CardDescription>
            </div>
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
    </>
  );
}
