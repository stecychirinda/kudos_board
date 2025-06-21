const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fetch = require("node-fetch");
const { parse } = require("dotenv");

router.get("/", async (req, res) => {
  const kudo_board = await prisma.Kudos_Board.findMany();
  res.json(kudo_board);
});

router.post("/", async (req, res) => {
  const allowedCategories = ["Celebration", "Thank_You", "Inspiration"];
  if (!req.body.title || !allowedCategories.includes(req.body.category)) {
    return res.status(400).json({ message: "Title and Category are required" });
  }
  try {
    const { title, category, author = "Anonymous", gif_url } = req.body;
    const newBoard = await prisma.Kudos_Board.create({
      data: {
        title,
        category,
        author,
        gif_url,
      },
    });
    res.status(201).json(newBoard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create board" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.Kudos_Card.deleteMany({
      where: { boardId: parseInt(id) },
    });
    const deletedBoard = await prisma.Kudos_Board.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedBoard);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete board" });
  }
});

router.get("/:boardId/cards", async (req, res) => {
  try {
    const { boardId } = req.params;
    const cards = await prisma.Kudos_Card.findMany({
      where: { boardId: parseInt(boardId) },
    });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cards" });
  }
});

router.get("/:boardId/cards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const card = await prisma.Kudos_Card.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch card" });
  }
});

router.post("/:boardId/cards", async (req, res) => {
  const {
    title,
    description,
    gif_url,
    author = "Anonymous",
    Kudos_count = 0,
  } = req.body;
  const { boardId } = req.params;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and Description are required" });
  }
  try {
    const newCard = await prisma.Kudos_Card.create({
      data: {
        title,
        description,
        author,
        Kudos_count,
        gif_url,
        board: { connect: { id: parseInt(boardId) } },
      },
    });
    res.status(201).json(newCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create card" });
  }
});

router.patch("/cards/:id/upvote", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updated = await prisma.Kudos_Card.update({
      where: { id },
      data: { Kudos_count: { increment: 1 } },
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update card" });
  }
});

router.put("/cards/:id/isPinned", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cardExists = await prisma.Kudos_Card.findUnique({
      where: { id },
    });
    if (!cardExists) {
      return res.status(404).json({ message: "Card not found" });
    }
    const updated = await prisma.Kudos_Card.update({
      where: { id },
      data: { isPinned: !cardExists.isPinned },
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update card" });
  }
});

router.delete("/:boardId/cards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.Kudos_Comment.deleteMany({
      where: { cardId: parseInt(id) },
    });
    const deletedCard = await prisma.Kudos_Card.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete card" });
  }
});

router.get("/:boardId/cards/:cardId/comments", async (req, res) => {
  try {
    const { cardId } = req.params;
    const comments = await prisma.Kudos_Comment.findMany({
      where: { cardId: parseInt(cardId) },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

router.post("/:boardId/cards/:cardId/comments", async (req, res) => {
  const { message, author = "Anonymous" } = req.body;
  const { cardId } = req.params;
  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }
  try {
    const newComment = await prisma.Kudos_Comment.create({
      data: {
        message,
        author,
        card: { connect: { id: parseInt(cardId) } },
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create comment" });
  }
});

module.exports = router;
