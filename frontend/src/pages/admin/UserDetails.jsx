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
import { Input } from "../../components/ui/input";

export default function UserDetails() {
  const { idUser } = useParams();
  const { token } = useMainContext();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [edLoading, setEdLoading] = useState(false);
  const navigate = useNavigate();
  const password = useRef();

  const fetchUser = async () => {
    setLoading(true);

    try {
      await Client.get("/sanctum/csrf-cookie");
      const response = await Client.get(`/api/admin/users/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
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
      await Client.delete(`/api/admin/users/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/users");
    } catch (err) {
      console.error(err.message);
    } finally {
      setDelLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passValue = password.current.value;
    if (!passValue || passValue == "" || passValue.trim().length < 6) return;

    setEdLoading(true);

    try {
      const newUser = { ...user, password: passValue };
      await Client.get("/sanctum/csrf-cookie");
      await Client.put(`/api/admin/users/${idUser}`, newUser, {
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
    fetchUser();
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
            <CardTitle>{user.last_name + " " + user.first_name}</CardTitle>
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
          <CardContent className="space-y-2">
            <div className="border-2 p-2 rounded-md w-[90%] space-y-2">
              <CardTitle>Email</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
            <form
              onSubmit={handleSubmit}
              className="border-2 p-2 rounded-md w-[90%] space-y-2"
            >
              <CardTitle>Password</CardTitle>
              <CardDescription className="flex justify-between">
                <Input
                  type={"password"}
                  className={"w-[70%]"}
                  ref={password}
                  placeholder="Enter a new password"
                />
                <Button disabled={edLoading}>
                  {edLoading ? <Spinner /> : "Change"}
                </Button>
              </CardDescription>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
