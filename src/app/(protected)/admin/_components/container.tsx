"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

type WaitlistItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};

type WaitlistResponse = {
  content: WaitlistItem[];
  pagination: {
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
  };
  message: string;
  errors: unknown;
};

export default function Container() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useQuery<WaitlistResponse>({
    queryKey: ["waitlist", search, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
      });
      if (search) {
        params.append("search", search);
      }
      const res = await fetch(`/api/admin/waitlist?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch waitlist");
      return res.json();
    },
  });

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      window.location.href = "/api/admin/logout";
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      // Fetch all data at once using all=true parameter
      const params = new URLSearchParams({
        all: "true",
      });
      if (search) {
        params.append("search", search);
      }

      const res = await fetch(`/api/admin/waitlist?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch data for export");
      const responseData: WaitlistResponse = await res.json();

      if (!responseData.content || responseData.content.length === 0) {
        toast.error("Tidak ada data untuk diekspor");
        setIsExporting(false);
        return;
      }

      const allData = responseData.content;

      // Prepare data for Excel
      const excelData = allData.map((item, index) => ({
        No: index + 1,
        Nama: item.name,
        Email: item.email,
        "No. HP": item.phone,
        "Tanggal Daftar": (() => {
          const date = new Date(item.created_at);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${year}/${month}/${day} ${hours}:${minutes}`;
        })(),
      }));

      // Create workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Waitlist");

      // Set column widths
      const colWidths = [
        { wch: 5 }, // No
        { wch: 25 }, // Nama
        { wch: 30 }, // Email
        { wch: 15 }, // No. HP
        { wch: 25 }, // Tanggal Daftar
      ];
      ws["!cols"] = colWidths;

      // Export to file
      const fileName = `waitlist_${new Date().toISOString().split("T")[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);

      toast.success(`Data berhasil diekspor ke Excel (${allData.length} data)`);
    } catch (error) {
      toast.error("Gagal mengekspor data");
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const waitlistData = data?.content || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="CAK Investment Club"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <Button
              variant="secondary"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Logout"}
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Waitlist Data</h2>
          <p className="mt-1 text-sm text-gray-600">
            Kelola data waitlist pengguna yang mendaftar
          </p>
        </div>

        {/* Search and Export */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Cari berdasarkan nama, email, atau no. HP..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Button
            onClick={handleExportExcel}
            disabled={isLoadingData || waitlistData.length === 0 || isExporting}
            className="rounded-full bg-gradient-to-b from-[#013599] to-[#295FC9] px-6 py-2.5 font-semibold text-white hover:from-[#012a7a] hover:to-[#1e4da3] disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengekspor...
              </>
            ) : (
              "Export ke Excel"
            )}
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
          {isLoadingData ? (
            <div className="flex min-h-[400px] items-center justify-center p-8">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[#013599]" />
                <p className="text-sm text-gray-600">Memuat data...</p>
              </div>
            </div>
          ) : waitlistData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {search
                ? "Tidak ada data yang ditemukan"
                : "Belum ada data waitlist"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      No. HP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Tanggal Daftar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {waitlistData.map((item, index) => {
                    const globalIndex =
                      ((data?.pagination.page || 1) - 1) *
                        (data?.pagination.limit || 10) +
                      index +
                      1;
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                          {globalIndex}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.phone}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {(() => {
                            const date = new Date(item.created_at);
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0",
                            );
                            const day = String(date.getDate()).padStart(2, "0");
                            const hours = String(date.getHours()).padStart(
                              2,
                              "0",
                            );
                            const minutes = String(date.getMinutes()).padStart(
                              2,
                              "0",
                            );
                            return `${year}/${month}/${day} ${hours}:${minutes}`;
                          })()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!isLoadingData &&
          data?.pagination &&
          data.pagination.totalPage > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Menampilkan{" "}
                <span className="font-medium">
                  {(data.pagination.page - 1) * data.pagination.limit + 1}
                </span>{" "}
                -{" "}
                <span className="font-medium">
                  {Math.min(
                    data.pagination.page * data.pagination.limit,
                    data.pagination.totalData,
                  )}
                </span>{" "}
                dari{" "}
                <span className="font-medium">{data.pagination.totalData}</span>{" "}
                data
                {search && ` untuk pencarian "${search}"`}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1 || isLoadingData}
                >
                  Sebelumnya
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: data.pagination.totalPage },
                    (_, i) => i + 1,
                  )
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (page === 1 || page === data.pagination.totalPage)
                        return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      return false;
                    })
                    .map((page, index, array) => {
                      const showEllipsis =
                        index > 0 && array[index] - array[index - 1] > 1;
                      return (
                        <div key={page} className="flex items-center gap-1">
                          {showEllipsis && (
                            <span className="px-2 text-gray-500">...</span>
                          )}
                          <Button
                            variant={
                              currentPage === page ? "default" : "secondary"
                            }
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            disabled={isLoadingData}
                            className={
                              currentPage === page
                                ? "bg-gradient-to-b from-[#013599] to-[#295FC9] text-white hover:from-[#012a7a] hover:to-[#1e4da3]"
                                : ""
                            }
                          >
                            {page}
                          </Button>
                        </div>
                      );
                    })}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(data.pagination.totalPage, prev + 1),
                    )
                  }
                  disabled={
                    currentPage === data.pagination.totalPage || isLoadingData
                  }
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          )}

        {/* Summary for single page */}
        {!isLoadingData &&
          data?.pagination &&
          data.pagination.totalPage <= 1 &&
          waitlistData.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Menampilkan {waitlistData.length} data
              {search && ` untuk pencarian "${search}"`}
            </div>
          )}
      </main>
    </div>
  );
}
