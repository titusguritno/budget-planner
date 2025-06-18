"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BudgetItem } from "@/types/budget";

type BudgetItemProps = {
  onAdd: (item: BudgetItem) => void;
};
