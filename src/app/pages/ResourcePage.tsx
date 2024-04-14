import React from "react";
import { useParams } from "react-router-dom";

export function ResourcePage() {
  const { resource, key } = useParams();
  return (
    <div>
      <h1>{resource}</h1>
      <h3>{key}</h3>
    </div>
  );
}
