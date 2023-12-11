/* eslint-disable react/prop-types */

import { Button } from "flowbite-react";
import { useState } from "react";


export const CommentInput = ({
    btnLabel,
    formSubmitHanlder,
    formCancelHandler = null,
    initialText = "",
    loading = false,
}) => {
    const [value, setValue] = useState(initialText);
    const submitHandler = (e) => {
        e.preventDefault();
        formSubmitHanlder(value);
        setValue("");
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <textarea placeholder="Input your comment ... " className="my-5 h-40 rounded-md py-2 px-3 text-slate-800 w-full" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                <div className="flex flex-row gap-3">
                {formCancelHandler && (
                    <Button
                        color="failure"
                        onClick={formCancelHandler}
                        className="rounded-lg"
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    disabled={loading}
                    type="submit"
                    className="btn-dark font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {btnLabel} Comment
                </Button>
                </div>
            </form>
        </div>
    )
}
