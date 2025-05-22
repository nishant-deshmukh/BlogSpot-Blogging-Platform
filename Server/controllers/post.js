import { db } from "../db.js"
import jwt from "jsonwebtoken";

export const getAllPosts = (req, res) => {
    const q = req.query.cat
        ? "SELECT * FROM posts WHERE category=?"
        : req.query.search
        ? "SELECT * FROM posts WHERE title LIKE ?"
        : "SELECT * FROM posts";

    const values = req.query.cat
        ? [req.query.cat]
        : req.query.search
        ? [`%${req.query.search}%`]
        : [];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const getSinglePost = (req, res) => {
    const q = "SELECT `username`,`title`,`desc`,p.img,`category`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data[0])
    })
}

export const getMyPosts = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "SELECT p.*, u.username FROM posts p JOIN users u ON p.uid = u.id WHERE p.uid = ?";

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};


export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not Authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.date,
            userInfo.id,
            req.body.category
        ];

        const q = "INSERT INTO `posts` (`title`, `desc`, `img`, `date`, `uid`, `category`) VALUES (?)";
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post Added");
        });
    });
};


export const updatePost = (req, res) => {
    console.log("-----> UPDATE POST <-----");
    const token = req.cookies.access_token

    if (!token) return res.status(401).json("Not Authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        console.log("token genuine");

        const postId = req.params.id;
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
        ]

        const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=? WHERE id=? AND uid=?";
        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows === 0) {
                return res.status(403).json("You can only update your own post or post not found!");
            }
            return res.json("Post Updated");
        })
    })
}


export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.json("Not Authenticated");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("JWT Token is Not Valid")

        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id`=? AND `uid`=?"

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your post !")

            return res.json("Post Deleted")


        })
    })
}