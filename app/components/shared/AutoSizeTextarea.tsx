"use client";

import {
  type TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function AutoSizeTextarea(props: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [resizeTextarea]);

  return (
    <textarea
      {...props}
      className={`min-h-[40px] max-h-[220px] w-full resize-none overflow-y-auto bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none ${
        props.className || ""
      }`}
      ref={textareaRef}
      rows={1}
    />
  );
}
