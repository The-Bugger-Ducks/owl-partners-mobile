import { useState, useEffect } from "react";

export function useThrottle(value: string, func: any, delay = 500) {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleInputChange = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(value), delay);
    };

    handleInputChange();

    return () => clearTimeout(timeout);
  }, [value, delay]);
}
