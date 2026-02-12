import { readFile, writeFile } from "fs/promises";

export async function readUsers() {
    try {
        const fileData = await readFile("users.json", "utf-8");
        return JSON.parse(fileData);
    } catch (err) {
        return {};
    }
}

export async function writeUsers(data) {
    await writeFile("users.json", JSON.stringify(data, null, 2));
}
