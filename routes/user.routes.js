import express, { Router } from "express";

const router = Router();


router.post("/signup", (req, res) => {
  res.send("sign up page")
})

export default router;