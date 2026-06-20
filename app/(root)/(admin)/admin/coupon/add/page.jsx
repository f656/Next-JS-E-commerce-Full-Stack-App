/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import Editor from "@/components/Application/Admin/Editor";
import MediaModal from "@/components/Application/Admin/MediaModal";
import ButtonLoading from "@/components/Application/ButtonLoading";
import Select from "@/components/Application/Select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { showToast } from "@/lib/showToast";
import { zSchema } from "@/lib/zodSchema";
import { ADMIN_COUPON_SHOW, ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_COUPON_SHOW, label: "Coupons" },
  { href: "", label: "Add Coupon" },
];

const AddCoupon = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = zSchema.pick({
    code:true,
    discountPercentage: true,
    minShoppingAmount: true,
    validity:true
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
     code:"",
    discountPercentage: "",
    minShoppingAmount: "",
    validity:0
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data: response } = await axios.post("/api/coupon/create", values);
      if (!response.success) {
        throw new Error(response.message);
      }
      showToast(response.message, "success");
      form.reset();
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]">
          <h4 className="text-xl font-semibold">ADD Coupon</h4>
        </CardHeader>
        <CardContent className="pb-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                (data) => {
                  console.log("SUBMIT DATA:", data);
                  onSubmit(data);
                },
                (errors) => {
                  console.log("VALIDATION ERRORS:", errors);
                },
              )}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div className="">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Code <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter coupon code"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="">
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Discount Percentage{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Discount Percentage"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="minShoppingAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Min. Shopping Amount{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Min. Shopping Amount"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="validity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Validity{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="Enter Validity"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="mb-3 mt-5">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Add Coupon"
                  className="cursor-pointer "
                />
              </div>
              <div className="text-center"></div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCoupon;
