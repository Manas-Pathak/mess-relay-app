import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    notifs: [],
    complaints: [],
    messMenu: [],
    expenses: [],
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setNotifs: (state, action) => {
            state.notifs = action.payload.notifs;
        },
        addNotif: (state, action) => {
            state.notifs.push(action.payload);
        },
        deleteNotif: (state, action) => {
            const updatedNotif = state.notifs.filter(
                (notif) => notif._id !== action.payload._id
            );
            state.notifs = updatedNotif;
        },
        setComplaints: (state, action) => {
            state.complaints = action.payload.complaints;
        },
        addComplaint: (state, action) => {
            state.complaints.push(action.payload);
        },
        setUpdatedComplaint: (state, action) => {
            const updatedComplaints = state.complaints.map((complaint) => {
                if (complaint._id === action.payload.complaint._id)
                    return action.payload.complaint;
                return complaint;
            });
            state.complaints = updatedComplaints;
        },
        setMessMenu: (state, action) => {
            state.messMenu = action.payload.messMenu;
        },
        setUpdateMessMenu: (state, action) => {
            const updatedMessMenu = state.messMenu.map((menu) => {
                if (menu._id === action.payload.menu._id)
                    return action.payload.menu;
                return menu;
            });
            state.messMenu = updatedMessMenu;
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload.expenses;
        },
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
        },
    },
});

export const {
    setMode,
    setLogin,
    setLogout,
    setNotifs,
    addNotif,
    deleteNotif,
    setComplaints,
    addComplaint,
    setUpdatedComplaint,
    setMessMenu,
    setUpdateMessMenu,
    setExpenses,
    addExpense,
} = appSlice.actions;
export default appSlice.reducer;
