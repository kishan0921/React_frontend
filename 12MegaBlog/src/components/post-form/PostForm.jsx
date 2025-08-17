import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


// 
export default function PostForm({ post }) {

    // Hume kuch information cahahiye, and jab bhi aap form use krenge, aise hi information chahiye hoga
    // and useForm aapko kaafi information de skta hai.

    //to hum information se lenge, like register, handlesubmit , watch, setValue , control, getValues

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
       // and additionally, aap useForm ke ander aap 1 object bhi pass kr skte h, and usske ander jo bhi value aap pass krna chahte hai aap de skte h
        // to mai default value pass kr raha hu.
        // default value ky h? - wo value hai to hum actually use krenge.
        defaultValues: {

            // and ye value aayegi kaha se , to jab bhi koi post pe click krega then ye value aa jaayegi.
            // jab bhi edit button pe click krunga then ye post ki saari value chahiye.
            // agar post hai to usska titile use kr lo , nahi to empty pass kr rahe h
            title: post?.title || "",
            // issi tarah agar koi url(slug) hai to use kr lenge, nahi to empty
            slug: post?.$id || "",
            //Post ke ander content hai to use kr lo nahi to empty de do.
            content: post?.content || "",
            // post ke ander status h , to use kr lo nahi to empty de do.
            status: post?.status || "active",
        },
    });

    //  ab naviagtion bhi ke lete hai 
    const navigate = useNavigate();
    //Ab mujhe userData chahiyhe, and ye mujhe state se milega wohaa hi rakhaa hua hai.
     // to mai useSelector ko bol raha hu userData mujhe de do.
    const userData = useSelector((state) => state.auth.userData);

    // Now, agar user ne form submit kr diya hai to kya kro.
    // to pehle 1 submit name ka form banate hai, and dekhenge ky chiz kaise kaam krti h
    // ab 2 cases h to, 
    // 1st case , koi post hai to update kar do , 
    // 2nd case , koi post nahi hai to create kar do.

    // to ek submit banate hai and async ke ander ki saara data jaayega.
    const submit = async (data) => {

        // 1st case , post hai to update kar do , 
        if (post) {

            // to sabse pehle file ko handle krenge,
            // file ko lo and upload kr do
            // data se aap image [0] 1st index waala le lenge. and agar image nahi hai then(:) null kro
            // appwrite ki service use krke file ko upload kr do (from data se 1st index waala image)
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            // ab agar aapke pass file aa chuki h, to purani image delete bhi to kro
            if (file) {
                // appwriteService ka use krke purani image ko delete kr do
                appwriteService.deleteFile(post.featuredImage);
            }


            // ab uppar jo change kiye hai post ke ander , usse update krenge

            const dbPost = await appwriteService.updatePost(post.$id, {
                // spread kr diye data ko , and usko update krenge
                ...data,
                // and bas ek field overwrite krna hoga jo ki yaha update kiye h featured image
                // agar file hai to file ki id se overwrite kro , warna undefined kro
                featuredImage: file ? file.$id : undefined,
            });

            // ab agar dbPost hua to user ko navigate kr do
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } 
         // 2nd case , koi post nahi hai to create kar do.
        else {
            // ab file ko handle krenge
            // data se aap image [0] 1st index waala le lenge.
            // appwrite ki service use krke file ko upload kr do
            const file = await appwriteService.uploadFile(data.image[0]);

            
            // agar file hai to
            if (file) {
                // sabse pehle file ki id le lete hai.
                const fileId = file.$id;

                // ab humara pass data hai, and usske ander featuredImage h to usko file id se overwrite/update kro
                data.featuredImage = fileId;
                
                // ab uppar 1 property update kiye , and baaki baachi hui property create kr do
                const dbPost = await appwriteService.createPost({ ...data, 
                    // user data se userid le lenge
                    // and userData jo hai, wo hum store se laa rahe h
                    userId: userData.$id });


            // ab agar dbPost hua to user ko navigate kr do
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };


    // ab new concepts dekhte hai, jo ki help krega interview clear krwane me.
    // ab ye slug transform ky krta hai ?
    // 2 inputs fields hai,ek title and slug h, 
    // title ko watch krna hai and slug ke ander value generate krni h
    // agar user kahi pe ( ) space deta hai to mujhe ussko replace krna h - (dash me)
    
    // sabse pehle useCallback le lete hai and usske ander value pass kr rahe h
    const slugTransform = useCallback((value) => {

        // agar value h and value ka type bhi check kr lete h string h ya  nahi
        if (value && typeof value === "string")
            // then return kr denge value ko
            return value
            // saari value ko trim kr do
                .trim()
                // and lower case kr do
                .toLowerCase()
                // and replace kr do
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                // and replace kr do
                .replace(/\s/g, "-");

        // and agar value nahi h to empty return kro
        return "";
    }, 
    // useCallback ke ander 2nd argument me dependency hoti hai, but abhi need nhi h to empty
    []);

    // Interview Ques : uppr jo slugTransform banaye h, ussko use kaise krna h ?


    
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
