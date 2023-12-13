import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetSinglePost, UpdatePost } from "../../Services/index/posts";
import toast from "react-hot-toast";
import stables from "../../Constants/stables";
import { Spinner } from "flowbite-react";
import { HiOutlineCamera } from "react-icons/hi";
import CreatableSelect from "react-select/creatable";


export const EditPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState(null);

  const postSlug = slug;

  const { data, isLoading, isError } = useQuery({
    queryFn: () => GetSinglePost({ slug }),
    queryKey: ["posts", slug],
    onSuccess: (data) => {
      setInitialPhoto(data?.photo);
      setTitle(data.title);
      setTags(data.tags);
    },
    refetchOnWindowFocus: false,
  });

  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return UpdatePost({
        updatedData,
        slug,
        token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", slug]);
      toast.success("Post is updated");
      navigate(`/post/${slug}`);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let reponse = await fetch(url);
        let blob = await reponse.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );

      updatedData.append("postPicture", picture);
    }

    updatedData.append(
      "document",
      JSON.stringify({ title, tags, caption, slug: postSlug, })
    );

    mutateUpdatePostDetail({
      updatedData,
      slug: postSlug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your Post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  let isPostDataLoaded = !isLoading && !isError;

  return (
    <>
      {
        isLoading ? (
          <div className="h-screen flex flex-col justify-center items-center">
            <p className="text-3xl text-white">Loading<Spinner /></p>
          </div>
        ) : isError ? (
          <div className="h-screen flex flex-col justify-center items-center">
            <span>Error fetching data</span>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="w-11/12 flex flex-col justify-center items-center md:my-10 my-5 bg-slate-800 text-white rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : initialPhoto ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : (
                <div className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center">
                  <HiOutlineCamera className="w-7 h-auto text-primary" />
                </div>
              )}

              <div className="flex flex-col justify-start gap-3 m-3 md:w-10/12 w-full px-3">
                <input
                  type="file"
                  className="rounded-md py-2 px-3 text-slate-800 bg-white"
                  id="postPicture"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5"
                >
                  Delete Image
                </button>

                <label className="d-label" htmlFor="title">
                  <span className="d-label-text">Title</span>
                </label>
                <input
                  id="title"
                  value={title}
                  className="rounded-md py-2 px-3 text-slate-800 w-full"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={data?.title}
                />

                <label className="d-label" htmlFor="caption">
                  <span className="d-label-text">Caption</span>
                </label>
                <textarea
                  id="caption"
                  value={caption}
                  className="rounded-md h-32 py-2 px-3 text-slate-800 w-full"
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={data?.caption}
                />
                <label className="d-label">
                  <span className="d-label-text">Tags</span>
                </label>
                {isPostDataLoaded && (
                  <CreatableSelect
                    defaultValue={data.tags.map((tag) => ({
                      value: tag,
                      label: tag,
                    }))}
                    isMulti
                    onChange={(newValue) =>
                      setTags(newValue.map((item) => item.value))
                    }
                    className="relative z-20"
                  />
                )}
                <br />
                <button
                  disabled={isLoadingUpdatePostDetail}
                  type="button"
                  onClick={handleUpdatePost}
                  className="w-full bg-green-500 text-slate-800 font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Update Post
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
