// const baseUrl = "https://kudos-board-api-b269.onrender.com/Kudos_board" // render server (turn it on when I need to make code live)
const baseUrl = "http://localhost:8000/Kudos_board"

// GET all boards
export async function getAllBoards() {
    try{
        const response = await fetch (baseUrl);
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
    }
    return await response.json();
} catch (error) {
    console.error('Failed to fetch all boards',error.message);
}
}

//Create a board
export async function createBoard(data) {
    try{
    const response = await
    fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error (`Response status: ${response.status}`);
    }
    const board = await response.json();
    return board;
} catch (error) {
    console.error('Failed to create board',error.message);
}
}

// Delete a board
export async function deleteBoard(id) {
    try{
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        // const data = await response.json();
        return true;
    } catch (error) {
        console.error('Failed to delete board',error.message);
        return false;
    }
}

// Get cards for a specific board
export async function getCardsForBoard(boardId) {
    try{
        const response = await fetch(`${baseUrl}/${boardId}/cards`);
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch board',error.message);
        return [];
    }
}

//Get a specific card
export async function getCard() {
    try{
        const response = await fetch(`${baseUrl}/:boardId/cards/:id`);
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch card',error.message);
    }
}

// Create a card
export async function createCard(boardId,cardData) {
    try{
        const response = await fetch(`${baseUrl}/${boardId}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cardData),
        });
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to create card',error.message);
    }
}

// Upvote a card
export async function upvoteCards(id){
    try{
        const response = await fetch(`${baseUrl}/cards/${id}/upvote`,{method: "PATCH"});
        if (!response.ok)
            throw new Error (`Response status: ${response.status}`);
            return await response.json();
    } catch (error) {
        console.error('Failed to upvote card',error.message);
        return null
    }
}

// Delete a card
export async function deleteCard(boardId, cardId) {
    try{
        const response = await fetch(`${baseUrl}/${boardId}/cards/${cardId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to delete card',error.message);
return null;
    }
}
