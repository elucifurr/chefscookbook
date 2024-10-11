"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import Form from "@components/Form";

const UpdateRecipe = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("id");

  const [post, setPost] = useState({ title: "", content: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/recipe/${recipeId}`);
      const data = await response.json();

      setPost({
        title: data.title,
        content: data.content,
        tag: data.tag,
      });
    };

    if (recipeId) getPromptDetails();
  }, [recipeId]);

  const updateRecipe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!recipeId) return alert("Missing RecipeId!");

    try {
      const response = await fetch(`/api/recipe/${recipeId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateRecipe}
    />
  );
};



const Page = () => {
    return (
        <Suspense>
            <UpdateRecipe />
        </Suspense>
    )
}

export default Page