"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { useEffect, useState } from "react";

export default function PaginationButton({
  totalPages = 1,
}: {
  totalPages?: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  //   const [totalPages, setTotalPages] = useState<number>(maxPages); // assuming there's a way to retrieve total pages

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    // Assuming there's a function to retrieve total pages from server-side
    // setTotalPages(getTotalPages());
  }, [pathname, searchParams]);

  const handlePrevious = () => {
    const newPage = page - 1;
    setPage(newPage);
    updatePageParam(newPage);
  };

  const handleNext = () => {
    const newPage = page + 1;
    setPage(newPage);
    updatePageParam(newPage);
  };

  const updatePageParam = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-end space-x-2 p-4 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={page >= totalPages} // Disable next button if on last page
      >
        Next
      </Button>
    </div>
  );
}
