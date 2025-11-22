import Faq from '../models/Faq.js';

export const getAllFaqs = async (req, res) => {
    try {
        const faqs = await Faq.find().sort({ createdAt: -1 });
        res.json(faqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createFaq = async (req, res) => {
    const faq = new Faq({
        question: req.body.question,
        answer: req.body.answer
    });

    try {
        const newFaq = await faq.save();
        res.status(201).json(newFaq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateFaq = async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });

        if (req.body.question) faq.question = req.body.question;
        if (req.body.answer) faq.answer = req.body.answer;

        const updatedFaq = await faq.save();
        res.json(updatedFaq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteFaq = async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });

        await faq.deleteOne();
        res.json({ message: 'FAQ deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
