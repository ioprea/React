export default function ActiveBook (state = null, action) { 
    switch(action.type) {
        case 'BOOK_SELECTED':
            return action.payload;
    }
    return state
}