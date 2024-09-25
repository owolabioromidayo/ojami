import express, { Request, Response } from "express";

import { ChatOpenAI } from '@langchain/chat_models';
import { OpenAIEmbeddings } from '@langchain/embeddings';
import { FAISS } from '@langchain/community/vectorstores/faiss';
import { RunnableMap, RunnablePassthrough } from '@langchain/core/schema/runnable';
import { PromptTemplate } from '@langchain/core/prompts';
import fs from 'fs';
import path from 'path';


const router = express.Router();
const openaiKey = process.env.OPENAI_API_KEY;

const llm = new ChatOpenAI({ model: "gpt-3.5-turbo" });

let vectorstore: any;

fs.readFile(path.join(__dirname, 'catalogue.json'), 'utf-8', (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    vectorstore = FAISS.fromTexts(
        jsonData.map((d: any) => String(d)),
        new OpenAIEmbeddings({ apiKey: openaiKey })
        
    );
});



const businessPrepPrompt = `You are a very helpful sales-rep for gatewaydevice, a growing Instagram store for selling technology hardware and accessories.`;

const SYSTEM_TEMPLATE = `Think logically. Reason step by step. Understand numbers and their relations. Always keep things from your the context in memory and reason accordingly. You work in a professional manner and work on sales and upselling and matching users with potential products they are likely to buy using ground truth and step by step reasoning. Follow this role as defined : ${businessPrepPrompt}`;

const START_PROMPT = "Introduce yourself";
const FILTER_PROMPT = `Based on our previous history, I have been trying to get something from your catalogue. Please continue to guide me and filter down recommendations`;

const SUMMARIZATION_TEMPLATE = new PromptTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language. Chat History: {chat_history} Follow Up Input: {question} Standalone question:`);

function formatChatHistory(chatHistory: Array<{ text: string }>): string {
    return chatHistory.map(dialogueTurn => `Human: ${dialogueTurn.text}`).join('\n');
}

async function summarizeConversation(conversation: any[], userQ: string) {
    const formattedHistory = formatChatHistory(conversation);
    const inputs = new RunnableMap({
        standalone_question: new RunnablePassthrough().assign({
            chat_history: () => formattedHistory,
            question: userQ
        }),
        template: SUMMARIZATION_TEMPLATE,
        llm
    });
    return inputs;
}

async function queryCgpt(prompt: string, userQ: string) {
    const chatTemplate = {
        messages: [
            { role: "system", content: `${SYSTEM_TEMPLATE}\n${prompt}` },
            { role: "user", content: userQ }
        ]
    };
    const response = await llm(chatTemplate);
    return response.content;
}

async function generateStartResponse(conversation: any[], metadata: any) {
    const resp = await queryCgpt(START_PROMPT, "");
    metadata.state = "filtering_loop";
    return { resp, metadata };
}

async function generateFilterResponse(conversation: any[], metadata: any) {
    const summarization = await summarizeConversation(conversation.slice(0, -1), "");
    const resp = await queryCgpt(FILTER_PROMPT, summarization);
    
    // Further logic for handling choices and updating metadata...

    return { resp, metadata };
}

// Define other functions like handleItemChosen, awaitConfirmation, etc.

const stateGraph = {
    start: { func: generateStartResponse },
    filtering_loop: { func: generateFilterResponse },
    // Add other states...
};

async function processCgpt(conversation: any[], metadata: any) {
    const stateFunc = stateGraph[metadata.state].func;
    return await stateFunc(conversation, metadata);
}

app.post('/ai_chat', extractJson, async (req, res) => {
    const { conversation, metadata } = req.body;
    const { text, updatedMetadata } = await processCgpt(conversation, metadata);
    
    res.json({ text, metadata: updatedMetadata });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});