import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const ButtonLoading = ({
  type,
  text,
  loading,
  className,
  onclick,
  ...props
}) => {
  return (
    <Button
      type={type}
      onClick={onclick}
      disabled={loading}
      className={cn("", className)}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      {text}
    </Button>
  );
};

export default ButtonLoading;
