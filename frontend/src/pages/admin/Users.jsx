import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "../../components/custom/Spinner";
import { Client } from "../../axios/axios";
import { useMainContext } from "../../contexts/MainContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Users() {
  const { token } = useMainContext();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [last, setLast] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const input = useRef();

  const handleClick = (id) => {
    navigate(`/admin/users/details/${id}`);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      await Client.get("/sanctum/csrf-cookie");
      const response = await Client.get(`/api/admin/users?page=${page}`, {
        params: {
          search: search,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLast(response.data.last_page);
      setUsers(response.data.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = input.current.value.trim();
    if (search.length < 0) return;
    setSearch(search);
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <main className="w-[90%] mx-auto select-none max-w-300 border-4 rounded-2xl mt-10 py-10 border-warqtek">
      <h1 className="text-center mb-10 text-4xl">Track The users</h1>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center p-2 mx-auto max-w-150"
      >
        <Input
          placeholder="Search by email"
          id="search"
          ref={input}
          className={"w-[80%]"}
        />
        <Button>Find</Button>
      </form>
      <Table className="border-separate border-spacing-x-2 border-spacing-y-2">
        <TableCaption>A list of the users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-green-400 rounded-md">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow className="text-center">
              <TableCell>
                <div className="mx-auto w-fit py-2">
                  <Spinner />
                </div>
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((user) => (
              <TableRow
                className="text-center"
                key={user.id}
                onClick={() => handleClick(user.id)}
              >
                <TableCell className="text-left rounded-md">
                  {user.email}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center" key={"1"}>
              <TableCell>No users where found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center px-10 w-[90%] mx-auto">
        <Button
          disabled={page <= 1 || loading}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Prev
        </Button>
        <h1 className="text-lg font-semibold text-warqtek">{page}</h1>
        <Button
          disabled={page == last || loading}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </main>
  );
}
