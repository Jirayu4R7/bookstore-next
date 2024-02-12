import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 pt-20">
      <QuestionMarkCircledIcon className="h-24 w-24 text-primary" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested.</p>
      <Link href="/dashboard/book">
        <Button>Go Back</Button>
      </Link>
    </main>
  );
}
