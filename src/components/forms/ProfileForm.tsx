import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "@/components/shared/FileUploader"
import { ProfileValidationSchema } from "@/lib/validation"
import { useUpdateProfile } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"

const ProfileForm = () => {
    const { toast } = useToast();
    const { pathname } = useLocation();
    const { user } = useUserContext();

    const isProfile = pathname.includes(`/profile/${user.id}`);

    const { mutateAsync: updateProfile, isPending: isLoadingUpdateProfile }
        = useUpdateProfile();

    console.log('user', user);

    const form = useForm<z.infer<typeof ProfileValidationSchema>>({
        resolver: zodResolver(ProfileValidationSchema),
        defaultValues: {
            bio: user?.bio ?? "",
            email: user?.email ?? "",
            name: user?.name ?? "",
            username: user?.username ?? "",
            file: [],
        },
    })

    async function onSubmit(values: z.infer<typeof ProfileValidationSchema>) {
        if (user) {

            const updatedProfile = await updateProfile({
                ...values,
                name: values.name,
                username: values.username,
                email: values.email,
                bio: values.bio,
                imageUrl: user.imageUrl,
                imageId: user.id,
                userId: user.id,

            })

            if (!updatedProfile) {
                toast({
                    title: 'Please try again'
                })
            }
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            {!isProfile && <FormLabel className="shad-form_label">Add Photos</FormLabel>}
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={user?.imageUrl}
                                    type='profile'
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">bio</FormLabel>
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
                <div
                    className="flex gap-4 items-center justify-end"
                >
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap"
                        disabled={isLoadingUpdateProfile}
                    >
                        {isLoadingUpdateProfile ? 'Loading...' : 'Update Profile'}
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default ProfileForm