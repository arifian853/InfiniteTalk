/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import stables from "../../Constants/stables";
import { FaCommentAlt } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <div
      data-aos="zoom-in"
      className={'bg-slate-800 text-white rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]'}
    >
      <Link to={`/post/${post.slug}`}>
        <img
          src={
            post.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
              : "no-img.png"
          }
          alt="title"
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        />
      </Link>
      <div className="p-5">
        <Link to={`/post/${post.slug}`}>
          <h1 className="font-semibold text-xl md:text-2xl lg:text-[28px] hover:underline">
            {post.title}
          </h1>
        </Link>
        <p className="mt-2 text-md line-clamp-2">
          {post.caption}
        </p>

        <p className="font-semibold text-md">
          {
            post.tags && post.tags.length > 0 ? <span> Tags : {post.tags.join(', ')} </span> : ""
          }
        </p>

        <span className="font-semibold opacity-70">
          {new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            hour12: false,
            minute: 'numeric',
            timeZone: 'Asia/Jakarta',
          }).format(new Date(post.createdAt))}
        </span>

        <div className="flex flex-col mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={
                post.user.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : "user.png"
              }
              alt="post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h1 className="font-semibold">
                <span className="px-1">{post.user.fullName}</span> <br />
                {post.user.mentor ? <span className="rounded-md text-slate-800 bg-green-300 px-2 py-1 text-xs">Mentor @ {post.user.program}</span> : <span className="rounded-md text-slate-800 bg-blue-300 px-2 py-1 text-xs">Mentee @ {post.user.program}</span>}
              </h1>
            </div>
          </div>
          <p className="mt-4 font-semibold text-md">
            {post.comments && post.comments.length > 0 ? <span className="flex items-center gap-2"> <FaCommentAlt /> {post.comments.length} Comments</span> : "No comments yet"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;