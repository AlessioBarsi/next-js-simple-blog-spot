'use client';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

type LinkButtonProps = {
  text: string;
  page: string;
};

export default function LinkButton({ text, page }: LinkButtonProps) {
  return (
    <div>
      <Button asChild variant='outline'>
        <Link href={`/${page}`}>{text}</Link>
      </Button>
    </div>
  );
}