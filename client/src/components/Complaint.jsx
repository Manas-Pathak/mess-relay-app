import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import {
    ThumbUpOffAltOutlined,
    ThumbUp,
    ThumbDownOffAltOutlined,
    ThumbDown,
    TaskAltOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setUpdatedComplaint } from "state";

const Complaint = ({
    complaintId,
    fullName,
    hostel,
    room,
    description,
    picturePath,
    upvotes,
    downvotes,
    resolved,
    isAdmin,
}) => {
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [isResolved, setIsResolved] = useState(false);

    const dispatch = useDispatch();

    const patchUpvoteClick = async () => {
        const updatedVote = upvotes + 1;
        const response = await fetch(
            `http://localhost:3001/student/complaint/upvote/${complaintId}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ upvote: updatedVote }),
            }
        );
        const updatedComplaint = await response.json();
        dispatch(setUpdatedComplaint({ complaint: updatedComplaint }));
        setIsUpvoted(!isUpvoted);
    };

    const patchDownvoteClick = async () => {
        const downdatedVote = downvotes + 1;
        const response = await fetch(
            `http://localhost:3001/student/complaint/downvote/${complaintId}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ downvote: downdatedVote }),
            }
        );
        const updatedComplaint = await response.json();
        dispatch(setUpdatedComplaint({ complaint: updatedComplaint }));
        setIsDownvoted(!isDownvoted);
    };

    const patchResolveClick = () => {
        setIsResolved(!isResolved);
    };

    return (
        <Box
            borderRadius={"0.75rem"}
            padding="1.5rem 1.5rem 0.75rem 1.5rem"
            border={"1px solid"}
            margin={"1rem 1rem"}
        >
            <Typography>{description}</Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="complaint pic"
                    style={{
                        borderRadius: "0.75rem",
                        marginTop: "0.75rem",
                    }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <Box
                display={"flex"}
                // justifyContent={"space-between"}
                alignItems={"center"}
            >
                <IconButton onClick={patchUpvoteClick} disabled={isUpvoted}>
                    <Box ml={"1rem"} mr={"1rem"}>
                        {upvotes}
                    </Box>
                    {isUpvoted ? <ThumbUp /> : <ThumbUpOffAltOutlined />}
                    <Typography>Upvote</Typography>
                </IconButton>

                <IconButton onClick={patchDownvoteClick} disabled={isDownvoted}>
                    <Box ml={"1rem"} mr={"1rem"}>
                        {downvotes}
                    </Box>
                    {isDownvoted ? <ThumbDown /> : <ThumbDownOffAltOutlined />}
                    <Typography>Downvote</Typography>
                </IconButton>

                <Box>
                    {isAdmin && (
                        <>
                            {isResolved ? (
                                <IconButton onClick={patchResolveClick}>
                                    <TaskAltOutlined />
                                </IconButton>
                            ) : (
                                <Button onClick={patchResolveClick}>
                                    MARK RESOLVED
                                </Button>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Complaint;
