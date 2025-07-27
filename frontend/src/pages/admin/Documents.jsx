import React, { useEffect, useState } from "react";
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

export default function Documents() {
  const { token } = useMainContext();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [last, setLast] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/admin/documents/details/${id}`);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      await Client.get("/sanctum/csrf-cookie");
      const response = await Client.get(`/api/admin/documents?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLast(response.data.last_page);
      setDocuments(response.data.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <main className="w-[90%] mx-auto select-none max-w-300 border-4 rounded-2xl mt-10 py-10 border-warqtek">
      <h1 className="text-center mb-10 text-4xl">Track the recent requests</h1>
      <Table className="border-separate border-spacing-x-2 border-spacing-y-2">
        <TableCaption>A list of the recent document requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-green-300 rounded-md">Document</TableHead>
            <TableHead className="bg-green-400 text-center rounded-md">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow className="text-center">
              <TableCell colSpan={2}>
                <div className="mx-auto w-fit py-2">
                  <Spinner />
                </div>
              </TableCell>
            </TableRow>
          ) : documents.length > 0 ? (
            documents.map((document) => (
              <TableRow
                className="text-center"
                key={document.id}
                onClick={() => handleClick(document.id)}
              >
                <TableCell className="text-left rounded-md">
                  {document.document_type}
                </TableCell>
                <TableCell className="rounded-md">{document.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center" key={"1"}>
              <TableCell colSpan={2}>
                No documents requests where found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center pt-4 px-10 w-[90%] mx-auto">
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
