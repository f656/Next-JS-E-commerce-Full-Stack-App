/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import ButtonLoading from "@/components/Application/ButtonLoading";
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
import { zSchema } from "@/lib/zodSchema";
import { ADMIN_DASHBOARD, ADMIN_MEDIA_EDIT } from "@/routes/AdminPanelRoute";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imgPlaceHolder from "@/public/assets/images/img-placeholder.webp";
import axios from "axios";
import { showToast } from "@/lib/showToast";

const breadcrumbData = [
  {
    href: ADMIN_DASHBOARD,
    label: "Home",
  },
  {
    href: ADMIN_MEDIA_EDIT,
    label: "Media",
  },
  {
    href: "#",
    label: "Edit Media",
  },
];

const EditMedia = ({ params }) => {
  const { id } = use(params);
  const { data: mediaData } = useFetch(`/api/media/get/${id}`);
  const [loading, setLoading] = useState(false);
  // console.log(mediaData);

  const formSchema = zSchema.pick({
    _id: true,
    alt: true,
    title: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      alt: "",
      title: "",
    },
  });

  useEffect(() => {
    if (mediaData && mediaData.success) {
      const data = mediaData.data;
      form.reset({
        _id: data._id,
        alt: data.alt,
        title: data.title,
      });
    }
  }, [mediaData]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: response } = await axios.put(
        "/api/media/update",
        values,
      );
      if (!response.success) {
        throw new Error(response.message);
      }

      showToast(response.message, "success");
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
          <h4 className="text-xl font-semibold">Edit Media</h4>
        </CardHeader>
        <CardContent className="pb-2">
          <Form {...form}>
            <div className="mb-5">
              <Image
                src={mediaData?.data?.secure_url || imgPlaceHolder}
                width={150}
                height={150}
                alt={mediaData?.alt || "Image"}
              />
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="alt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alt</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter alt text"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Title"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Update Media"
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

export default EditMedia;
