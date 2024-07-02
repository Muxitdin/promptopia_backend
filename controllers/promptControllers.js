import Prompt from "../models/Prompt.js";
import Auth from "../models/Auth.js";

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
        res.status(201).json({data: newPrompt, message: "Prompt created succesqqqsfully"});
    } catch (error) {
        console.log(error)
    }
};

export const UpdatePrompt = async (req, res) => {
    try {
        // console.log(req.params.id);
        const updatedPrompt = await Prompt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: updatedPrompt, message: "Prompt updated succesfully" });
    } catch (error) {
        console.log(error);
    }
}

export const DeletePrompt = async (req, res) => {
    try {
        const deletedPrompt = await Prompt.findByIdAndDelete(req.params.id);
        res.status(200).json({ data: deletedPrompt, message: "Prompt deleted succesfully"});
    } catch (error) {
        console.log(error)
    }
}