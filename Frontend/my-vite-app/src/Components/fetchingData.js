const baseUrl = "https://kudos-board-api-b269.onrender.com/Kudos_board"

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

export async function deleteBoard(id) {
    try{
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error('Failed to delete board',error.message);
        return false;
    }
}

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

export async function togglePinStatus(cardId){
    try{
        const response = await fetch(`${baseUrl}/cards/${cardId}/isPinned`,{method: 'PUT'});
        if (!response.ok)
            throw new Error (`Response status: ${response.status}`);
            return await response.json();
    } catch (error) {
        console.error('Failed to pin card',error.message);
        return null
    }
}


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


export async function getCommentsForCard(boardId, cardId) {
    try{
        const response = await fetch(`${baseUrl}/${boardId}/cards/${cardId}/comments`);
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch comments',error.message);
        return [];
    }
}


export async function createComment(boardId, cardId, commentData) {
    try{
        const response = await fetch(`${baseUrl}/${boardId}/cards/${cardId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        });
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to create comment',error.message);
    }
}
