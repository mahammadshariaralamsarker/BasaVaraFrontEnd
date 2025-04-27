import React from "react";
import { Properties } from "./properties/page";
import FilterPage from "@/components/ui/core/FilterPage";

const tenant = () => {
  return (
    <div>
      <FilterPage/>
      <Properties />
    </div>
  );
};

export default tenant;
