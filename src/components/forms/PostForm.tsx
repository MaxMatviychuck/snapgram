import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Models } from 'appwrite'
import { useNavigate } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "@/components/shared/FileUploader"
import { PostValidationSchema } from "@/lib/validation"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"

interface PostFormProps {
    post?: Models.Document;
    action: 'create' | 'update';
}

const PostForm = ({ post, action }: PostFormProps) => {
    const { mutateAsync: createPost, isPending: isLoadingCreatePost }
        = useCreatePost();

    const { mutateAsync: updatePost, isPending: isLoadingUpdatePost }
        = useUpdatePost();

    const { user } = useUserContext();
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof PostValidationSchema>>({
        resolver: zodResolver(PostValidationSchema),
        defaultValues: {
            caption: post ? post.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(',') : "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidationSchema>) {
        if (post && action === 'update') {

            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageUrl: post.imageUrl,
                imageId: post.$id
            })

            if (!updatedPost) {
                toast({
                    title: 'Please try again'
                })
            }

            return navigate(`/post/${post.$id}`);

        }

        const newPost = await createPost({
            ...values,
            userId: user.id
        })

        if (!newPost) {
            toast({
                title: 'Please try again'
            })
        }

        navigate('/');
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="shad-textarea custom-scrollbar"
                                    placeholder="shadcn"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input
                                    className="shad-input"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Tags (separated by comma " , ")</FormLabel>
                            <FormControl>
                                <Input
                                    className="shad-input"
                                    type="text"
                                    placeholder="Art, Expression, Learn"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div
                    className="flex gap-4 items-center justify-end"
                >
                    <Button type="button" className="shad-button_dark_4">Cancel</Button>
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap"
                        disabled={isLoadingCreatePost || isLoadingUpdatePost}
                    >
                        {(isLoadingCreatePost || isLoadingUpdatePost) && 'Loading...'}
                        {action === 'update' ? 'Update' : 'Create'}
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default PostForm