import axios from "axios";

export const CreateNewComment = async ({
    token,
    desc,
    slug,
    parent,
    replyOnUser,
}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(
            "https://infinite-talk-api.onrender.com/api/comments/createComment",
            {
                desc,
                slug,
                parent,
                replyOnUser,
            },
            config
        );
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const UpdateComment = async ({ token, desc, commentId }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(
            `https://infinite-talk-api.onrender.com/api/comments/updateComment/${commentId}`,
            {
                desc,
            },
            config
        );
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const DeleteComment = async ({ token, commentId }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.delete(`https://infinite-talk-api.onrender.com/api/comments/deleteComment/${commentId}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};