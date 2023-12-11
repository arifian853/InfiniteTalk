import Post from '../models/postData.model.js'
import Comment from '../models/commentData.model.js'
import { uploadPicture } from '../middleware/uploadPictureMiddleware.js';
import { fileRemover } from '../utils/fileRemover.js';
import { v4 as uuidv4 } from 'uuid';

const CreatePost = async (req, res, next) => {
    const { title, caption, tags } = req.body;

    try {
        const post = new Post({
            title,
            caption,
            slug: uuidv4(),
            body: {
                type: 'doc',
                content: [],
            },
            photo: "", // This will be updated with the image filename after uploading
            user: req.user._id,
            tags,
        });

        // Save the post without the image first
        const createdPost = await post.save();

        // Now, handle image upload
        const upload = uploadPicture.single("postImage");

        upload(req, res, async function (err) {
            if (err) {
                // If an error occurs during image upload, handle it
                const error = new Error("An unknown error occurred when uploading image: " + err.message);
                next(error);
            } else {
                // If image upload is successful, update the post with the image filename
                if (req.file) {
                    createdPost.photo = req.file.filename;
                    await createdPost.save();
                }

                // Respond with the created post
                res.json(createdPost);
            }
        });
    } catch (error) {
        next(error);
    }
};

const UpdatePost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });

        if (!post) {
            const error = new Error("Post not found");
            next(error);
            return;
        }

        const upload = uploadPicture.single("postPicture");

        const handleUpdatePostData = async (data) => {
            const { title, caption, slug, body, tags, categories } = JSON.parse(data);
            post.title = title || post.title;
            post.caption = caption || post.caption;
            post.slug = slug || post.slug;
            post.body = body || post.body;
            post.tags = tags || post.tags;
            post.categories = categories || post.categories;
            const updatedPost = await post.save();
            return res.json(updatedPost);
        };

        upload(req, res, async function (err) {
            if (err) {
                const error = new Error(
                    "An unknown error occured when uploading " + err.message
                );
                next(error);
            } else {
                // every thing went well
                if (req.file) {
                    let filename;
                    filename = post.photo;
                    if (filename) {
                        fileRemover(filename);
                    }
                    post.photo = req.file.filename;
                    handleUpdatePostData(req.body.document);
                } else {
                    let filename;
                    filename = post.photo;
                    post.photo = "";
                    fileRemover(filename);
                    handleUpdatePostData(req.body.document);
                }
            }
        });
    } catch (error) {
        next(error);
    }
}

const DeletePost = async (req, res, next) => {
    try {
        const post = await Post.findOneAndDelete({ slug: req.params.slug });

        if (!post) {
            const error = new Error("Post was not found");
            return next(error);
        }

        await Comment.deleteMany({ post: post._id });

        return res.json({
            message: "Post is successfully deleted",
        });
    } catch (error) {
        next(error);
    }
};

const GetPost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate([
            {
                path: "user",
                select: ["avatar", "fullName", "mentor", "program"],
            },
            // {
            //     path: "categories",
            //     select: ["title"],
            // },
            {
                path: "comments",
                match: {
                    check: true,
                    parent: null,
                },
                populate: [
                    {
                        path: "user",
                        select: ["avatar", "fullName", "mentor", "program"],
                    },
                    {
                        path: "replies",
                        match: {
                            check: true,
                        },
                        populate: [
                            {
                                path: "user",
                                select: ["avatar", "fullName", "mentor", "program"],
                            },
                        ],
                    },
                ],
            },
        ]);

        if (!post) {
            const error = new Error("Post was not found");
            return next(error);
        }

        return res.json(post);
    } catch (error) {
        next(error);
    }
};

const GetAllPosts = async (req, res, next) => {
    try {
        const filter = req.query.searchKeyword;
        let where = {};
        if (filter) {
            where.title = { $regex: filter, $options: "i" };
        }
        let query = Post.find(where);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * pageSize;
        const total = await Post.find(where).countDocuments();
        const pages = Math.ceil(total / pageSize);

        res.header({
            "x-filter": filter,
            "x-totalcount": JSON.stringify(total),
            "x-currentpage": JSON.stringify(page),
            "x-pagesize": JSON.stringify(pageSize),
            "x-totalpagecount": JSON.stringify(pages),
        });

        if (page > pages) {
            return res.json([]);
        }

        const result = await query
            .skip(skip)
            .limit(pageSize)
            .populate([
                {
                    path: "user",
                    select: ["avatar", "fullName", "mentor", "program"],
                },
            ])
            .sort({ updatedAt: "desc" });

        return res.json(result);
    } catch (error) {
        next(error);
    }
};

export {
    CreatePost,
    UpdatePost,
    DeletePost,
    GetPost,
    GetAllPosts
};
