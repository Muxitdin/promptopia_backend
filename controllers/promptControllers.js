import Prompt from "../models/Prompt.js";

export const getAllPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.find().populate("author");
        res.json(prompts).status(200);
    } catch (error) {
        console.log(error)
    }
};

export const CreateNewPrompt = async (req, res) => {
    try {
        const { content, tag, author } = req.body
        const promptData = { content, tag, author }
        
        const newPrompt = await Prompt.create(promptData)
        res.status(201).json(newPrompt);
    } catch (error) {
        console.log(error)
    }
};

export const UpdatePrompt = async (req, res) => {
    try {
        // console.log(req.params.id);
        const updatedPrompt = await Prompt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPrompt);
    } catch (error) {
        console.log(error);
    }
}

export const DeletePrompt = async (req, res) => {
    try {
        const deletedPrompt = await Prompt.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedPrompt);
    } catch (error) {
        console.log(error)
    }
}